#!/usr/bin/env python3

# Command to run from checkout:
#   env/bin/mkdocs build -c -f helpscout/mkdocs.yml
#
# With HELPSCOUT_DOCS_API_KEY in .helpscout, run:
#   env $(cat .helpscout) ./env/bin/python helpscout/push_to_helpscout.py
#
# Extra environment variables
#   DRYRUN=1  scan files and parse images, but don't actually talk to HelpScout.
#   DRYRUN=R  read from HelpScout, but don't write to it.
#   PREFIX=   Only process articles starting with this prefix (useful for testing).
#             Implies NODELETE
#   NOCLEAN=1 Don't delete from HelpScout articles that aren't being synced.

import hashlib
import mimetypes
import os
import re
from urllib.parse import unquote, urljoin, urlparse
import requests
from bs4 import BeautifulSoup, Comment

DOCS_API_KEY = os.environ['HELPSCOUT_DOCS_API_KEY']
DOCS_BASE_URL = 'https://docsapi.helpscout.net/v1'
COLLECTION_NAME = "Grist Help Center"
ROOT = 'hscout/site'
SITE_SUBDOMAIN = "grist"
MAIN_SITE = 'https://support.getgrist.com'

def process_response(r, *args, **kwargs): # pylint:disable=unused-argument
  try:
    r.raise_for_status()
  except requests.RequestException as e:
    try:
      print("Request failed", e.response.json())
    except Exception:
      print("Request failed", e.response.text)
    print("Request url", e.response.request.url)
    #print("Request body", e.response.request.body[:1000])
    raise e

class DocsPusher:
  def __init__(self):
    self._dryrun = bool(os.environ.get("DRYRUN"))       # No writing to helpscout if True
    self._noread = self._dryrun and os.environ.get("DRYRUN") != "R"  # No reading helpscout either
    self._prefix = os.environ.get("PREFIX")
    self._noclean = bool(os.environ.get("NOCLEAN")) or bool(self._prefix)  # Don't delete articles
    self._sess = requests.Session()
    self._sess.auth = (DOCS_API_KEY, 'X')
    self._sess.hooks = {
        'response': process_response
    }
    self._site_id = self.findSiteId()
    self._coll_id = self.findCollectionId()

  def findSiteId(self):
    if self._noread:
      return "DRYRUN_SITEID"
    resp = self._sess.get(f"{DOCS_BASE_URL}/sites").json()
    return next(x for x in resp["sites"]["items"] if x["subDomain"] == SITE_SUBDOMAIN)["id"]

  def findCollectionId(self):
    if self._noread:
      c = {"name": COLLECTION_NAME, "number": "DRYRUN", "id": "DRYRUN"}
    else:
      resp = self._sess.get(f"{DOCS_BASE_URL}/collections").json()
      c = next(x for x in resp["collections"]["items"] if x["name"] == COLLECTION_NAME)
    print(f"Collection {c['name']} (number={c['number']} id={c['id']})")
    return c["id"]

  def uploadImage(self, article_id, img_path):
    with open(img_path, 'rb') as f:
      if self._dryrun:
        return f"DRYRUN/{img_path}"
      print(f"Uploading {img_path} to {article_id}")
      ctype, _ = mimetypes.guess_type(img_path)
      resp = self._sess.post(f"{DOCS_BASE_URL}/assets/article",
          data={
            "key": DOCS_API_KEY,
            "articleId": article_id,
            "assetType": "image",
          },
          files={"file": (os.path.basename(img_path), f, ctype)},
      ).json()
      return resp["filelink"]

  def uploadArticle(self, articles, path, orig_name):
    slug = orig_name.replace("/", "-")
    with open(path, 'r', encoding='utf8') as f:
      text = f.read()

    parsed = BeautifulSoup(text, features="html.parser")

    # Extract title from the fist H1 tag.
    name = orig_name
    title = parsed.find(['h1', 'h2'])
    if title:
      name = title.text.rstrip('#')
      title.decompose()

    print(f"Uploading {path} -> {slug} {name!r}")

    if name in articles:
      article_id = articles[name]["id"]
      article = articles[name] = self.getArticle(article_id)
    elif self._dryrun:
      article_id = f"DRYRUN_{orig_name}"
      article = articles[name] = self.getArticle(article_id)
    else:
      print(f"Creating {name}")
      resp = self._sess.post(f"{DOCS_BASE_URL}/articles", json={
        'collectionId': self._coll_id,
        'status': 'notpublished',
        'name': name,
        'slug': slug,
      })
      article_id = os.path.basename(resp.headers["Location"].rstrip("/"))
      article = {}

    # We want a way to tell if an article has changed since what's in HelpScout. We do it by
    # storing in HelpScout a hash of the article's original contents (before replacing images).
    # There isn't a handy extra field in the API, so we'll store it right in the article body,
    # as a comment of the form <!-- article-hash XXX -->
    new_hash = calc_hash(text)
    hscout_text = article.get('text') or ""
    m = re.search(r'<!--\s*article-hash (\w+)\s*-->', hscout_text)
    if m and m.group(1) == new_hash:
      print(f" - skipping because article unchanged; same hash {new_hash}")
      return name

    # Upload all images
    for img in parsed.find_all('img'):
      src = img['src']
      if src.startswith("https://") or src.startswith("http://"):
        continue
      src = unquote(src)
      if src.startswith("/"):
        img_path = os.path.normpath(os.path.join(ROOT, src.lstrip("/")))
      else:
        img_path = os.path.normpath(os.path.join(os.path.dirname(path), src))
      img['src'] = self.uploadImage(article_id, img_path)
      short_new_path = img['src'].split('/', 7)[-1]
      print(f" - Replacing image {src} -> {short_new_path}")

    # Insert a comment that we'll use later to avoid re-uploading the article with images when its
    # unchanged.
    parsed.head.insert(-1, Comment(f'article-hash {new_hash}'))
    new_text = parsed.prettify()

    print(f" - Updating {slug} {name!r}")
    if not self._dryrun:
      resp = self._sess.put(f"{DOCS_BASE_URL}/articles/{article_id}", json={
        'status': 'published',
        'text': new_text,
        'name': name,
        'slug': slug,
      })

    article = articles[name] = self.getArticle(article_id)
    from_path = urlparse(article["publicUrl"]).path
    to_url = urljoin(MAIN_SITE, f"/{orig_name}/")
    self.setRedirect(from_path, to_url)
    return name

  def setRedirect(self, from_path, to_url):
    print(f"Setting redirect {from_path} -> {to_url}")
    if not self._dryrun:
      found = self._sess.get(f"{DOCS_BASE_URL}/redirects", params={
        "siteId": self._site_id,
        "url": from_path,
      }).json()["redirectedUrl"]
      if not found:
        self._sess.post(f"{DOCS_BASE_URL}/redirects", json={
          "siteId": self._site_id,
          "urlMapping": from_path,
          "redirect": to_url,
        })
      elif found["redirect"] != to_url:
        self._sess.put(f"{DOCS_BASE_URL}/redirects/{found['id']}", json={
          "siteId": self._site_id,
          "urlMapping": from_path,
          "redirect": to_url,
        })

  def deleteArticle(self, article_id):
    print(f"Deleting {article_id}")
    if not self._dryrun:
      self._sess.delete(f"{DOCS_BASE_URL}/articles/{article_id}")

  def getArticle(self, article_id):
    if self._noread or article_id.startswith("DRYRUN_"):
      return {"publicUrl": f"https://DRYRUN/{article_id}"}
    return self._sess.get(f"{DOCS_BASE_URL}/articles/{article_id}").json()["article"]

  def listArticles(self):
    articles = []
    if not self._noread:
      page = 1
      pages = 1
      while page <= pages:
        resp = self._sess.get(f"{DOCS_BASE_URL}/collections/{self._coll_id}/articles",
            json={"page": page}).json()
        articles.extend(resp["articles"]["items"])
        page += 1
        pages = resp["articles"]["pages"]
    return {a["name"]: a for a in articles}

  def run(self):
    articles = self.listArticles()
    print(f"FOUND {len(articles)} ARTICLES")
    #for a in articles.values():
    #  print(a["id"], a["publicUrl"], a["name"])

    wanted = set()
    for (dirpath, dirnames, filenames) in os.walk(ROOT):
      name = os.path.basename(dirpath)
      for f in filenames:
        if f != "index.html":
          # Each article is generated as index.html file in its own subdirectory.
          continue
        relpath = os.path.relpath(dirpath, ROOT)
        if not self._prefix or relpath.startswith(self._prefix):
          name = self.uploadArticle(articles, f"{dirpath}/{f}", relpath)
          wanted.add(name)

    if not self._noclean:
      for name, article in articles.items():
        if name not in wanted:
          self.deleteArticle(article["id"])


def calc_hash(text):
  h = hashlib.new('sha1')
  h.update(text.encode('utf8'))
  return h.hexdigest()


DocsPusher().run()
