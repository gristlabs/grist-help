Importing and exporting data
============================

Importing
---------

You can import a file to [start a new Grist document](intro.md#creating-a-new-document), or to add
tables to an existing document. Imports of Excel, CSV, and tab-separated files are supported, while
other formats (such as HTML, PDF, and plain text) may or may not work depending on their structure.

In all cases, when you import a file, Grist makes guesses about the structure of the file.

### Tables to import

For Excel files, Grist imports each sheet as a new table, using the sheet name to name the tables.
For CSV and other delimited formats, one file becomes one table, and the filename determines the
table name.

### Column names

For both Excel and delimited files, Grist tries to guess whether or not headers are included and
which line they occur in. If Grist guesses there are no headers, it will name columns as "A", "B",
"C", etc.

You can always rename columns after an import, using the Field side pane.

!!! note
    Currently, if Grist thinks your first line of data is headers, you both need to rename columns
    to something sensible, and you lose the first row of data. At the moment, you can only recover
    it by inserting a new row and populating it manually; or by adding headers to the original
    data and re-importing.

### Column types

Grist guesses the [data types](datatypes) for columns based on the data in the column. It
automatically tries to parse numbers, dates, and boolean fields to detect the most suitable type
to set the column to. Grist tries to be lossless: e.g. if it marks a column as numeric, any text
values in it (such as "N/A") will remain in the imported table, but shown highlighted because of
the type mismatch.

If Grist guesses a type wrong, you can convert it, as well as do arbitrary transformations to the
imported values, by changing the type in the Field side pane.
