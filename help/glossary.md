# Glossary

## Document

A Grist document is a collection of related data. If you work with
databases, think of it as a single database. If you work with
spreadsheets, think of it as a single spreadsheet.

Like databases and spreadsheets, the data in a Grist document is
organized as a set of tables.  How this data is viewed and edited is
unusually flexible.  Grist documents are organized visually into
pages. Pages contain widgets that offer different ways to view and
edit tables.

To work with Grist, the first step is typically to [create a document](creating-doc.md).

## Page

Grist documents are organized visually into pages.  Each page allows
you to view or edit one or more tables.  The nature of these viewers
and editors (called "page widgets") is flexible, as is their layout.

A single table can be viewed (or edited) from multiple widgets in
one or many pages.  And a single page can contain widgets for viewing (or editing)
many tables.

Pages are listed in the document ([in the panel on the
left](page-widgets.md#pages)).  In this list, they may be rearranged
and grouped, with several "subpages" nested within a single page.

## Widget

A page contains sections, such as table grids or charts, which we call
"page widgets".  They are used for [viewing or editing
data](page-widgets.md) in tables.
Types of page widgets include [cards and charts](page-widgets.md#page-widget)
as well as the classic [spreadsheet-style table grid](widget-table.md).

## Table

Data is stored in tables.  Tables have named [columns](col-types.md), and a sequence of rows
containing values for those columns.  Every row has a numeric id (available
as `$id` in formulas) that is unique within that table.
