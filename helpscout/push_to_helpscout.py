#!/usr/bin/env python3

# Command to run from checkout:
#   env/bin/mkdocs build -c -f helpscout/mkdocs.yml -d site2
#
# With HELPSCOUT_DOCS_API_KEY in .helpscout, run:
#   env $(cat .helpscout) ./env/bin/python helpscout/push_to_helpscout.py

import os
import pprint
from urllib.parse import urljoin, urlparse
import requests
from bs4 import BeautifulSoup

DOCS_API_KEY = os.environ['HELPSCOUT_DOCS_API_KEY']
DOCS_BASE_URL = 'https://docsapi.helpscout.net/v1'
COLLECTION_NAME = "Grist Help Center"
ROOT = 'helpscout/site2'
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
    print("Request body", e.response.request.body)
    raise e

class DocsPusher:
  def __init__(self):
    self._dryrun = bool(os.environ.get("DRYRUN"))
    self._sess = requests.Session()
    self._sess.auth = (DOCS_API_KEY, 'X')
    self._sess.hooks = {
        'response': process_response
    }
    self._site_id = self.findSiteId()
    self._coll_id = self.findCollectionId()

  def findSiteId(self):
    if self._dryrun:
      return "DRYRUN_SITEID"
    resp = self._sess.get(f"{DOCS_BASE_URL}/sites").json()
    return next(x for x in resp["sites"]["items"] if x["subDomain"] == SITE_SUBDOMAIN)["id"]

  def findCollectionId(self):
    if self._dryrun:
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
      resp = self._sess.post(f"{DOCS_BASE_URL}/assets/article",
          data={
            "key": DOCS_API_KEY,
            "articleId": article_id,
            "assetType": "image",
          },
          files={"file": f}
      ).json()
      return resp["filelink"]

  def uploadArticle(self, articles, path, orig_name):
    print(f"Uploading {orig_name} from {path}")
    slug = orig_name
    with open(path, 'r', encoding='utf8') as f:
      text = f.read()

    parsed = BeautifulSoup(text, features="html.parser")

    # Extract title from the fist H1 tag.
    name = orig_name
    title = parsed.find(['h1', 'h2'])
    if title:
      name = title.text.rstrip('#')
      title.decompose()
    print("NAME (TITLE):", name)

    article = {}
    if self._dryrun:
      article_id = f"DRYRUN_{orig_name}"
      article = articles[name] = self.getArticle(article_id)
    elif name not in articles:
      print(f"Creating {name}")
      resp = self._sess.post(f"{DOCS_BASE_URL}/articles", json={
        'collectionId': self._coll_id,
        'status': 'notpublished',
        'name': name,
        'slug': slug,
      })
      article_id = os.path.basename(resp.headers["Location"].rstrip("/"))
    else:
      article_id = articles[name]["id"]

    # Upload all images
    for img in parsed.find_all('img'):
      src = img['src']
      if src.startswith("/"):
        img_path = os.path.normpath(os.path.join(ROOT, src.lstrip("/")))
      else:
        img_path = os.path.normpath(os.path.join(os.path.dirname(path), src))
      img['src'] = self.uploadImage(article_id, img_path)
      short_new_path = img['src'].split('/', 7)[-1]
      print(f"Replacing image {src} -> {short_new_path}")

    text = parsed.prettify()

    print(f"Updating {name}")
    if not self._dryrun:
      resp = self._sess.put(f"{DOCS_BASE_URL}/articles/{article_id}", json={
        'status': 'published',
        'text': text,
        'name': name,
        'slug': slug,
      })

    article = articles[name] = self.getArticle(article_id)
    from_path = urlparse(article["publicUrl"]).path
    to_url = urljoin(MAIN_SITE, f"/{orig_name}/")
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


  def getArticle(self, article_id):
    if self._dryrun:
      return {"publicUrl": f"https://DRYRUN/{article_id}"}
    return self._sess.get(f"{DOCS_BASE_URL}/articles/{article_id}").json()["article"]

  def listArticles(self):
    articles = []
    if not self._dryrun:
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
    print("ARTICLES")
    for a in articles.values():
      print(a["id"], a["publicUrl"], a["name"])

    for (dirpath, dirnames, filenames) in os.walk(ROOT):
      name = os.path.basename(dirpath)
      for f in filenames:
        if f == "index.html" and "widget" in name:
          self.uploadArticle(articles, f"{dirpath}/{f}", name)

DocsPusher().run()
