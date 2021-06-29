# Grist Help Center

Repository for Grist documentation and tutorials.

## Where are the docs published?

The public site is at <https://support.getgrist.com/>

The preview site is at <https://support-preview.getgrist.com/>

Both are served using GitHub Pages. The public version is hosted at
<https://github.com/dsagal/grist-help/>. The preview version is hosted at
<https://github.com/grist-jenkins/grist-help/>.

## Setting up local environment

``` sh
python3 -m venv env
./env/bin/pip install -r requirements.txt
./env/bin/mkdocs serve
```

Then visit <http://localhost:8000/> to preview documentation. All the articles,
as well as static files, are under `/help` subdirectory. While `mkdocs serve`
is running, you may make changes there, and the open page will refresh to show
the changes.

While `mkdocs serve` is running, you can run `./check_links.sh` to check
for broken links in the site.  It will print out a lot of chatter, then
if there are broken links, conclude with a section like this:

```
...
Found 5 broken links.

http://localhost:8000/col-refs/col-types
http://localhost:8000/afterschool-program/page-widgets.md/
http://localhost:8000/api/'+e+'
http://localhost:8000/api/%3C/textarea%3E%3Cimg%20src=x%20abc=1//
http://localhost:8000/api/'+u(e)+'

FINISHED --2020-03-13 10:38:07--
Total wall clock time: 1.3s
Downloaded: 36 files, 2.0M in 0.009s (226 MB/s)
```

## Publishing for preview

Add the preview repo as a remote. Ask for access to
<https://github.com/grist-jenkins/grist-help/> if you don't have it. You'll
need push access to this repo to publish for preview.

``` sh
git remote add preview https://github.com/grist-jenkins/grist-help.git
git pull --all
```

After you've made changes, publish them to <https://support-preview.getgrist.com>:

``` sh
./publish-preview.sh
```

## Publishing changes live

You'll need push access to <https://github.com/dsagal/grist-help/>. The
following command will publish changes to <https://support.getgrist.com>:

``` sh
./env/bin/mkdocs gh-deploy
```

## Editing the API

The API is documented in `api/grist.yml`.  When editing this file, you
can watch changes at `http://localhost:9090` by running:

``` sh
./api/preview.sh
```

Once you're done, add the results to the main documentation with:

``` sh
./api/build.sh
```

## Updating function reference

To update `help/functions.md` from the documentation comments in Grist, run:

```
./build-functions.sh <path-to-grist-checkout>
```

It replaces content between `BEGIN mkpydocs`/`END mkpydocs` markers in `help/functions.md`. You
can edit text outside of those markers directly.
