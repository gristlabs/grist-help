# Glossary

## Bar Chart

This is a classic [chart type](widget-chart.md#bar-chart), where the
values in a column are shown as the heights of a series of rectangles.

## Column

A vertical series of cells in a table.  Columns in Grist have names.
Each cell in a column is in a different row.
Typically columns have data about a single aspect of many entities,
whereas rows have data about many aspects of a single entity.

## Column Options

Every column's appearance and behavior can be customized.  When there are intuitive
ways to make such customizations, we implement them, but they can always be done
systematically by clicking on the column header, clicking on the drop-down, and
selecting "Column Options".

## Column Type

Columns have types, which control the appearance of cells in that column and the
method used to edit them.  You can [change the column type](col-types.md#specifying-a-type)
at will. The [Text Column Type](col-types.md#text-columns) is suited to strings of any
length; the [Date Column Type](col-types.md#date-columns) is specialized for storing and
editing calendar dates; the [Reference Column Type](col-types.md#reference-columns)
is for storing and editing links to other tables; the
[Integer Column Type](col-types.md#integer-columns) is strictly for whole numbers;
the [Numeric Column Type](col-types.md#numeric-columns) is for any kind of number; etc.

## Dashboard

A dashboard is just another name for a page, typically organized to give a
summary or overview of a document's data.  Grist is well suited to constructing
dashboards, by creating pages with suitably [linked widgets](linking-widgets.md).

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

## Drag handle

This is an icon to facilitate reorganizing views or lists visually.
On a desktop computer, when hovering over a drag handle, the mouse
cursor becomes a hand with fingers spread out as if to grip something.
The drag handle for a widget is just to the left of the widget's title.
There is an example of using this drag handle in the [investment research demo](investment-research.md#chart-graph-plot).

## Field

A field is a column shown in a Card View.  The terms column, field,
and series are not different in substance, but are different terms
that make more sense for different widgets.  In a Table View, we talk
about columns.  In a Chart View, we talk about series.  And in a Card
View, we talk about fields.  A field has layout properties that are
meaningful within a Card, but would not be meaningful in other contexts.

## Import

To import to Grist means to take data from other sources (on your
computer or on the internet) and place that data in a Grist document.
Examples of importing include:

 - Take a CSV file on your computer, and create a Grist document
   with the same content (see: [start a new Grist document](creating-doc.md)).
 - Take an Excel file on your computer, and add the data from it to an existing
   Grist document (see: [importing more data](imports.md)).
 - Take a JSON file on the internet, and add the data from it to an existing
   Grist document (see: [importing more data](imports.md)).
 - Calling Grist's API from a program and adding data read from another source
   (see: [Grist API](rest-api.md)).

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

## Pie Chart

This is a classic [chart type](widget-chart.md#pie-chart), where a circle is
sliced up according to values in a column.

## Record

A record is the data in one row of a table, comprising the data in the
individual cells of that row.  It has a unique identifier, usually hidden but
available in formulas as `id`.

## Row

A horizontal series of cells in a table.  Each cell in a row belongs to
a different column.  The data stored in a row is also called a record.
Typically rows have data about different aspects a single entity, whereas
columns have data about a single aspect of many entities.

## Sort

The order in which rows of a table is shown is called the sort order.
An example of changing the sort order of a table is given in the
[CRM tutorial](lightweight-crm.md#to-do-tasks-for-contacts).

## Table

Data is stored in tables.  Tables have named [columns](col-types.md), and a sequence of rows
containing values for those columns.  Every row has a numeric id (available
as `$id` in formulas) that is unique within that table.

## Widget

A page contains sections, such as table grids or charts, which we call
"page widgets".  They are used for [viewing or editing
data](page-widgets.md) in tables.
Types of page widgets include [Card Widgets](widget-card.md), [Chart Widgets](widget-chart.md),
as well as the classic spreadsheet-style table grid (called a [Table Widget](widget-table.md)).

## Widget Options

Every widget can have its appearance and behavior customized.  How this is done varies
between widget, but can always be done systematically by clicking on the
three-dot menu on the top right of a widget and selecting "Widget options".

## Wrap Text

What happens to the content in a column cell when it is very long depends on
the "Wrap Text" setting.  If the setting is not enabled, the cell size is not
affected by the content, and only the part of the content that fits within the
cell will be shown.  If the setting *is* enabled, the height of the cell is
increased so that all the content is visible (by wrapping).  An example of
wrapping is given in the [CRM tutorial](lightweight-crm.md#linking-tables-visually).

