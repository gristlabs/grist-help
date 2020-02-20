# On-Demand Tables

!!! warning "On-demand tables are an experimental feature"
    The design of on-demand tables may change.  For example,
    configuration options may be added, or aspects of the behavior of
    on-demand tables may be changed entirely.

A defining feature of spreadsheets is the ability to update cells instantly as
data they depend on changes.  But sometimes a table is just a store of data,
without any fancy calculations needed.  In that case, you can choose to mark
the table as "On-Demand" in Grist.  Grist can then serve data from that table
faster, and make certain optimizations that may be helpful as the table gets
large and regular tables become slow.

When a table is marked "On-Demand":

  - The table remains available for viewing and editing.
  - Data in the table will not be available for use in formulas.
  
## Make an On-Demand Table

To make a table as "On Demand", open the right panel, pick the "Table" panel,
and the "Data" section.  Click on "Advanced Settings" and you should see a
"Make On-Demand" button.

![on-demand-button](images/on-demand/on-demand-button.png)

If you change your mind, and don't want the table to be "On-Demand" anymore,
you can find a button to undo this setting in the same place:

![on-demand-undo](images/on-demand/on-demand-undo.png)

Changing a table to become "On-Demand" or to stop being "On-Demand" will
force the document to reload for all users viewing it at that moment.

## Formulas, References and On-Demand Tables

In general, formulas and on-demand tables don't go together.  That said,
if you're careful you can use the following very simple formulas:

 * `$column` - where the `column` mentioned is not itself a formula.
   This copies data from another column verbatim.
 * `$reference.column` - where `reference` is a [reference column](col-refs.md),
   and `column` is not itself a formula.

Watch out: the content of cells in a formula column is not live for
on-demand tables - you need to reload the document to update it.

This formula support is enough to allow [linking widgets](linking-widgets.md).

From formulas in regular tables, you can't currently access the
content of on-demand tables.
