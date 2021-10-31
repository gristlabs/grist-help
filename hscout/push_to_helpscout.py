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
#             Only deletes extra articles with matching names.
#   NOCLEAN=1 Don't delete from HelpScout articles that aren't being synced.
#
# HelpScout API is documented at https://developer.helpscout.com/docs-api/

import hashlib
import mimetypes
import os
import re
from urllib.parse import unquote, urljoin, urlsplit
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
    self._noclean = bool(os.environ.get("NOCLEAN"))     # Don't delete articles
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

  def getOrCreateArticle(self, article_id, name, slug):
    """
    Finds an existing HelpScout article, or creates a new one if article_id is None.
    """
    if not article_id and self._dryrun:
      article_id = f"DRYRUN_{name}"

    if not article_id:
      resp = self._sess.post(f"{DOCS_BASE_URL}/articles", json={
        'collectionId': self._coll_id,
        'status': 'notpublished',
        'name': name,
        'slug': slug,
      })
      article_id = os.path.basename(resp.headers["Location"].rstrip("/"))
    return self.getArticle(article_id, name)

  def uploadImage(self, article_id, img_path):
    with open(img_path, 'rb') as f:
      if self._dryrun:
        return f"DRYRUN/{img_path}"
      print(f" - Uploading image (for article {article_id}): {img_path}")
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

  def uploadArticle(self, article):
    print(f" - Uploading {article.urlpath} ({article.name!r})")
    if not self._dryrun:
      resp = self._sess.put(f"{DOCS_BASE_URL}/articles/{article.article_id}", json={
        'status': 'published',
        'text': article.getTextToUpload(),
        'name': article.name,
        'slug': article.slug,
      })

    to_url = urljoin(MAIN_SITE, f"/{article.urlpath}/")
    self.setRedirect(article.getHelpScoutPath(), to_url)
    return article

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

  def getArticle(self, article_id, name):
    if self._noread or article_id.startswith("DRYRUN_"):
      return {"publicUrl": f"https://DRYRUN/{article_id}", "id": article_id, "name": name}
    return self._sess.get(f"{DOCS_BASE_URL}/articles/{article_id}").json()["article"]

  def listArticles(self):
    articles = []
    if not self._noread:
      page = 1
      pages = 1
      while page <= pages:
        resp = self._sess.get(f"{DOCS_BASE_URL}/collections/{self._coll_id}/articles",
            params={"page": page}).json()
        articles.extend(resp["articles"]["items"])
        page += 1
        pages = resp["articles"]["pages"]
    return articles

  def run(self):
    articlesList = self.listArticles()
    # for i, a in enumerate(articlesList):
    #   print(i, a["id"], a["publicUrl"], a["name"])
    print(f"FOUND {len(articlesList)} ARTICLES")

    # Each article has a unique name, which serves as its user-visible title, and it is how we can
    # find an article given a file.
    articles = {a["name"]: a for a in articlesList}

    # To translate links, we need a mapping from article paths to their HelpScout URL.
    # This mapping needs to include articles we haven't uploaded yet, so we use stages:
    #   1. find each article or create an empty one
    #   2. construct the mapping.
    #   3. translate each article (including links and images), and upload it.
    desired_articles = list(self._walk_articles())
    for article in desired_articles:
      article.parse()
      entry = articles.get(article.name)
      article.hc_article = self.getOrCreateArticle(entry and entry["id"],
          article.name, article.slug)

    # Construct the mapping from relative paths used in the original HTML files to HelpScout URLs.
    path_to_url_map = {a.urlpath: a.getHelpScoutPath() for a in desired_articles}

    # Translate links in all the desired articles, and upload those articles that have changed.
    for article in desired_articles:
      article.translateLinks(path_to_url_map)
      article.set_hash()
      if article.hasChanged():
        article.uploadAndReplaceImages(self.uploadImage)
        self.uploadArticle(article)

    if not self._noclean:
      ids_to_keep = set(article.article_id for article in articles)
      to_delete = [a for a in articlesList if a["id"] not in ids_to_keep]
      if self._prefix:
        # If limiting to a prefix, limit deletions only to extra HelpScout articles whose names
        # match something uploaded, i.e. duplicate versions or drafts of the same article.
        uploaded_names = set(article.name for article in articles)
        to_delete = [a for a in to_delete if a["name"] in uploaded_names]

      for article in to_delete:
        self.deleteArticle(article["id"])

  def _walk_articles(self):
    """
    Generator for Article objects representing HTML files to sync to HelpScout.
    """
    for (dirpath, dirnames, filenames) in os.walk(ROOT):
      name = os.path.basename(dirpath)
      for f in filenames:
        if f != "index.html":
          # Each article is generated as index.html file in its own subdirectory.
          continue
        urlpath = os.path.relpath(dirpath, ROOT)
        if not self._prefix or urlpath.startswith(self._prefix):
          yield DesiredArticle(f"{dirpath}/{f}", urlpath)


class DesiredArticle:
  def __init__(self, filepath, urlpath):
    """
    - filepath is the path to the file containing an HTML article to upload (e.g.
      '/ROOT/sharing/index.html')
    - urlpath is a URL path relative to the site root (e.g. 'sharing').
    """
    self.filepath = filepath
    self.urlpath = urlpath
    self.slug = urlpath.replace("/", "-")
    self.name = None            # set from the title in the file content
    self.parsed_html = None     # set from the file content (BeautifulSoup)
    self.article_id = None      # HelpScout ID, set when we look up or upload the article.
    self.new_hash = None        # Hash of the article, used to avoid re-uploading unchanged ones.

    # Article object from HelpScout (https://developer.helpscout.com/docs-api/objects/article/)
    self.hc_article = {}

  def getHelpScoutPath(self):
    return urlsplit(self.hc_article["publicUrl"]).path

  def parse(self):
    """
    Read and parse the file content, and set .parsed_html and .name fields.
    """
    with open(self.filepath, 'r', encoding='utf8') as f:
      text = f.read()

    self.parsed_html = BeautifulSoup(text, features="html.parser")

    # Extract the title from the first H1 tag; it is used as the HelpScout name, to be added on
    # top of the article. Note that HelpScout needs it to be unique.
    title = self.parsed_html.find(['h1', 'h2'])
    if title:
      self.name = title.text.rstrip('#')
      # If it's an H1 tag, remove it, since HelpScout already adds the article's name on top.
      if title.name == 'h1':
        title.decompose()

  def translateLinks(self, path_to_url_map):
    for link in self.parsed_html.find_all('a', href=True):
      abs_url = urljoin(self.urlpath, link['href'])
      new_url = path_to_url_map.get(abs_url)
      if new_url:
        print(f"Replacing {abs_url} (from {link['href']}) with {new_url}")
        link['href'] = new_url

  def set_hash(self):
    """
    Set .new_hash with the hash of the article's HTML in its current form. This will be inserted
    into the HTML before upload to allow skipping the upload when it hasn't changed.
    """
    new_text = self.parsed_html.prettify()
    self.new_hash = calc_hash(new_text)

  def hasChanged(self):
    # We want a way to tell if an article has changed since what's in HelpScout. We do it by
    # storing in HelpScout a hash of the article's contents (before replacing images, since we
    # want to avoid that work too). There isn't a handy extra field in the API, so we'll store it
    # right in the article body, as a comment of the form <!-- article-hash HASH_VALUE -->
    # TODO might want to replace images with their checksums so that replacing an image will cause
    # the article to be re-built and re-uploaded.
    assert self.new_hash, "Call setHash() before checking hasChanged()"
    hscout_text = self.hc_article.get('text') or ""
    m = re.search(r'<!--\s*article-hash (\w+)\s*-->', hscout_text)
    if m and m.group(1) == self.new_hash:
      return False
    return True

  def uploadAndReplaceImages(self, uploadImage):
    for img in self.parsed_html.find_all('img'):
      abs_url = urlsplit(urljoin(self.urlpath, img['src']))
      if abs_url.netloc:      # Looks like an absolute path to the image, don't replace it.
        continue
      img_path = os.path.join(ROOT, unquote(abs_url.path))
      img['src'] = uploadImage(self.article_id, img_path)

  def getTextToUpload(self):
    # Insert a comment that we'll use later to avoid re-uploading the article when it's unchanged.
    self.parsed_html.head.insert(-1, Comment(f'article-hash {self.new_hash}'))
    return self.parsed_html.prettify()


def calc_hash(text):
  h = hashlib.new('sha1')
  h.update(text.encode('utf8'))
  return h.hexdigest()


DocsPusher().run()
