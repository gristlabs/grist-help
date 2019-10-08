# Importing more data

You can import a file to [start a new Grist document](creating-doc.md), or to
add data to an existing document. Grist supports imports of Excel, CSV, JSON, and
tab-separated files.

You can also import any of these formats from a URL, using the "Import from URL" option.

## The Import dialog

When you import data into an existing document, Grist opens an import dialog to
show you what will be imported. This dialog offers available import options,
lets you choose whether to create a new table or add to an existing one, and
shows a preview of the data.

![import-dialog](images/import-dialog.png)

The "Import options" link on the top right is sometimes useful when importing
delimited files. Grist guesses the settings to parse the data (such as the
field delimiter), but if it guesses incorrectly, you can adjust the settings.

## Guessing data structure

In all cases, when you import a file, Grist makes guesses about the structure of the file.

For Excel files, Grist treats each sheet as a separated table. For CSV and
other delimited formats, one file becomes one table. For both Excel and
delimited files, Grist tries to detect whether the headers are included and
which line they occur in. If Grist detects there are no headers, it will name
columns as "A", "B", "C", etc.

Grist automatically tries to parse numbers, dates, and boolean fields to detect
the most suitable type for each column. It tries to be lossless: e.g. if it
marks a column as numeric, any text values in it (such as "N/A") will remain in
the imported table, but shown highlighted because of the type mismatch.

You can always rename tables and columns after an import, as well as convert types.

## Import to an existing table

By default, Grist imports new data as new tables, but the Import dialog allows
you to change the destination and import data into an existing table.

To import cleanly into an existing table, the new data must have column names
exactly matching the columns in the destination table.

This is best suited for importing multiple datasets in the same format. For
instance, you could import a bank statement as a new table, then import more
statements from other months into the same table.

For developers, the [Grist API](api.md) offers a more powerful way to add data
to a Grist document.
