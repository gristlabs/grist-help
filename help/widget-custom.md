# Page widget: Custom

!!! warning "Custom widgets are an experimental feature"
    The design of custom widgets is likely to change.  For example,
    configuration options may be added or removed, and the API for
    communicating with the document may be replaced entirely.

The **Custom** widget allows an advanced user to insert almost
anything in their document.  To use it currently requires knowledge of
web development, and access to a public web server (for example,
GitHub Pages).

This widget will show a webpage hosted externally.  The webpage should
be owned and controlled by you.  To configure the Custom widget:

 * Choose a URL for the webpage to show.

 * Choose an access level for the page.
   - *None*: the webpage is shown in the widget, but it has no access to
     the Grist document containing the widget.
   - *Full*: the webpage is shown in the widget, and has full access to
     read and modify the Grist document containing the widget.

The bulk of the configuration happens outside Grist, when preparing
the webpage.  Grist offers an API to such webpages, available by
including the following:

```
<script src="https://docs.getgrist.com/grist-plugin-api.js"></script>
```

This makes a global `grist` javascript object available.  To
initialize it, and get access to the Grist document, call:

```
grist.ready();
```

You can now call the following methods on `grist.docApi`:

 * `listTables`: returns a promise for a list of strings, containing the
   ids of every table in the document.
 * `fetchTable(tableId)`: returns a promise for the contents of the specified
   table, in the same format as the [REST API](https://support.getgrist.com/#api-docs.html#tag/docs/paths/~1docs~1{docId}~1tables~1{tableId}~1data/get).

