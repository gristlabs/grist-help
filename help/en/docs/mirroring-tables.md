---
title: Mirroring tables
---

# Mirroring tables from other documents

You can keep read-only copies of tables from other Grist documents in your own document by creating a **sync**. 
These mirrored tables are automatically kept in sync with the source document's tables. 
This is useful for keeping one shared list – such as clients, products, or staff – in a single document, 
and using it from many others.

Mirrored tables are managed entirely by Grist. You cannot edit their data, add or
remove columns, or delete the table. You can still show the data in
[pages and widgets](page-widgets.md), add [summary tables](summary-tables.md), access the data
from formulas in other tables, and customise how they're displayed.

If you need editable, independent copies of a table, you can do a
[one-time copy of tables from another document](copying-docs.md#copying-data-from-another-document).

!!! note "Beta"
    Table syncing is a beta feature. Some of its current [limits](#limits) may be removed in
    future versions. It is available on Business plan and above, as well as in the full
    edition of self-hosted Grist.

## Allowing syncing from a table

Before a table can be synced from, an owner of its document must allow it. To allow syncing, open
the [Raw Data](raw-data.md) page, click the three-dot menu next to the table, and select
'Allow syncing'.

<!-- TODO: screenshot – the 'Allow syncing' menu item on the Raw Data page -->

Anyone who can view the document can then sync the table into their own documents. The table
is marked 'Allowed' on the Raw Data page. A table that others can sync:

- cannot be renamed
- cannot have data hidden with [access rules](access-rules.md)
- cannot have more than 10,000 rows 
- cannot have references to other tables (see [limits](#limits))
- cannot have formulas (see [limits](#limits))

For that reason, you cannot allow syncing on a table that already has access rules. Due to the formula restrictions,
syncing is also not available for [summary tables](summary-tables.md).

To stop sharing a table, select 'Disable syncing' from the same menu. Anyone who can edit the schema
can disable syncing. Documents that sync from that table stop getting updates from it, but keep the
rows they already have.

## Adding syncs to your document

To set up a new sync, you must be an owner of your document. You also need access to the
document you intend to sync from, and its access rules must not hide any part of the tables from you.

Open the Raw Data page and click 'Sync tables' above the list of tables. Then:

1. Select the site, workspace, and document to sync from, and click 'Continue'.
2. Check the tables you want. Only tables that allow syncing are listed, with their row
   counts.
3. Click 'Sync tables'.

<!-- TODO: screenshot – the 'Sync tables' dialog, table selection step -->

This will prepare the first sync, and the new tables should appear in your document after a short delay. 
For larger tables, this may take some additional time.

## What stays in sync

A synced table updates on its own, less than a minute after the document it comes from changes.

The sync updates:
- rows – added, changed, and deleted rows
- columns – added, removed, and renamed columns, with their type, label, and formatting
- the table name

The sync does not update pages, widgets, [conditional formatting](conditional-formatting.md),
column descriptions, or [access rules](access-rules.md). Those belong to your document, and
you can set them up as you like.

!!! note
A sync reads the other document with the access of the person who set it up, no matter
who else uses your document. People with no access to the other document still get the
updates. If the person who set up the sync loses access, the sync stops

## Checking the status of your mirrored tables

You can view the status of each synced table on the Raw Data page. Each table shows when it last synced,
with a link to document it comes from. The link is only shown to people who can open that document, and
only document owners can see the time and status.

<!-- TODO: screenshot – a synced table on the Raw Data page, with status and source link -->

## When syncing stops

When a sync cannot run anymore, its tables show 'Stopped' with a warning icon on the Raw Data
page. The tables keep their rows and stay read-only. A sync stops when:

- the person who set it up lost access to the document the tables come from, or is no longer
  an owner of your document
- the document the tables come from was deleted
- syncing was disabled on the table
- a column that cannot sync yet, such as a formula column, was added to the table

Once the cause is fixed – for example, access is restored – select 'Sync all now' to resume.
If the sync cannot be fixed, you can [disconnect the tables](#disconnecting-synced-tables).

## Disconnecting synced tables

To turn synced tables back into normal tables, open the Raw Data page, click the three-dot
menu next to the table, and select 'Disconnect'. Only document owners can disconnect.

Disconnecting applies to all tables that were synced together in one step – the confirmation
lists them. The tables keep their rows and columns and become editable, but no longer get
updates.

## Limits

While table syncing is in beta:

- A sync is limited to 10,000 rows in total across its tables.
- Tables with formula columns, Reference or Reference List columns, or Attachments columns
  cannot be synced yet. Columns with a
  [trigger formula](formulas.md#trigger-formulas) can – they arrive as ordinary data columns
  holding the calculated values.
- A document can share its tables, or sync tables in, but not both.
- You can sync from a document on a different team site, but not from a different Grist
  installation.
