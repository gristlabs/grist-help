# Grist Help Center

Repository for Grist documentation and tutorials.

## Where are the docs published?

The public site is at <https://support.getgrist.com/>, served using GitHub Pages.

The content is hosted at <https://github.com/dsagal/grist-help/>. On changes to master (such as
when a pull request is merged), the public site gets automatically republished.

Previews of pull requests are automatically built by Netlify, and made available at URLs such as
<https://deploy-preview-153--grist-help-preview.netlify.app/>. These are shown in the PR
Conversation tab.

## Setting up local environment

``` sh
python3 -m venv env
./env/bin/pip install -r requirements.txt
./env/bin/mkdocs serve
```

Then visit <http://localhost:8000/> to preview documentation. All the articles,
as well as static files, are under `/help/en/docs` subdirectory. While `mkdocs serve`
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

This is now automatically done by Netlify. Whenever you create a pull request, Netlify will build
the site from your branch, and make it available at a URL like
<https://deploy-preview-153--grist-help-preview.netlify.app/>. A link is placed into the
Conversation tab of the pull request.

Any further pushes to this branch will cause the site to update. It may take Netlify a few minutes
to notice the push, and takes about a minute more to rebuild the preview site.

## Publishing changes live

This is now automatically done by GitHub Actions, whenever a commit is made to master, or a pull
request is merged into master. You can see the history of these builds here: [Publish Live
workflow](https://github.com/gristlabs/grist-help/actions/workflows/publish-live.yml).

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

To update `help/en/docs/functions.md` from the documentation comments in Grist, run:

```
./build-functions.sh <path-to-grist-checkout>
```

It replaces content between `BEGIN mkpydocs`/`END mkpydocs` markers in `help/en/docs/functions.md`. You
can edit text outside of those markers directly.

## Updating plugin API reference

To update `help/en/docs/code` from the documentation comments in Grist, run:

```
./build-plugin-api.sh <path-to-grist-checkout>
```

You need to first run `yarn install` in your Grist checkout directory.

## License

This work is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License](LICENSE.txt).
