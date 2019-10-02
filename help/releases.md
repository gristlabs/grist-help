# Grist Releases

## 0.13 (2018-06-12)

- Added importing from Google Drive and from SQL databases.
- Added importing JSON files.
- Improved import dialog with support for parse options, transforms, and previews.
- Better action history, supporting history of one table, and showing diffs of actions.
- Suggest auto-completions when editing formulas.
- Added step-through search.
- Support easier renames of columns, by clicking the selected column header.
- Allow deleting documents from the document list.
- Fixed CSV exports to respect table sort order.
- Improved application start-up time.

## 0.12 (2017-12-12)

- Document List now automatically displays new files
- Enhance imports to allow changing import options (work-in-progress)
- Usability improvements to Date Editor widget
- Added a sample document for a Capitalization table
- Fixed multiple bugs:
  - Defaulting to first tab when opening a document
  - Column filters causing errors on column deletion
  - Inconsistencies with datatype conversions

## 0.11 (2017-09-21)

- Formula editor now displays detailed formula errors, making them easier to fix.
- Automatically create backups when migrating a document to a new version.
- Improved Undo to jump to the location of the undone action.
- Streamline the behavior of "+" button for adding a new column.
- Improve the layout of charts and include labels for the data series.
- Field options are now by default shared across views.
- Fixed multiple bugs:
  - Pasting of Dates and References within a column.
  - Table renaming sometimes causing an error or incorrect record positioning.
  - Undo in cases of column transforms and column renaming.
  - Error when editing an Image cell.

## 0.10 (2017-07-25)

- Grist now supports software updates
- New display options for cells:
  - Word-wrapping for Text columns
  - Max decimals for Numeric columns
  - New switch widget for Toggle columns
- Added border and zebra-striping options to GridView
- Improved Help with better navigation and new articles
- Improved data formatting when copying to clipboard

## 0.9 (2017-04-17)

- Improve copy-paste and CSV export for Reference columns.
- Improve scrolling performance.
- Improve type conversions, including Text-to-Reference auto-suggest.
- Fix summary tables to use correct display options for group-by columns.
- Fix a bug with column renaming.
- Fix a rare bug with unexpected connection loss.

## 0.8 (2017-03-10)

- First release with Windows support!
- Improve handling of complex actions in action log and when using Undo.
- Assist formula editing by displaying columns' Python identifiers.
- Handle import logic within the secure sandbox (no more need for system Python).
- Several bug fixes.

## 0.7 (2017-01-06)

- Automatically adjust formulas when renaming columns and tables.
- Allow adding display columns when showing a reference to another table.
- Include column headers in CSV exports, and fix dates and references.
- Improve adding records to linked sections.
- Several bug fixes.

## 0.6 (2016-11-22)

- Added support for many Excel functions.
- Implemented shortcuts to insert current date/time.
- Made improvements to summary tables.
- Made views remember cursor and scroll position.
- Improvements to copy-paste functionality.
- Fixed sorting by reference columns.
- Added a few sample documents.

## 0.5 (2016-10-27)

- Implemented many common spreadsheet functions.
- Added ability to delete multiple selected rows.
- Added ability to clear multiple selected cells.
- Added menu item listing recent documents.
- Improved the look of application top bar.
- Improved summary tables.

## 0.4 (2016-08-12)

- Switched to use NaCL-based sandbox.
- Implemented collection of usage and performance metrics.
- Improved Table deletion.
- Implemented Shift-Click to select multiple cells.
- Redesigned the document list.
- Several bug fixes.


## 0.3 (2016-07-21)

- Improves Mac application menu and title.
- Fixes several issues with Excel imports
- Fixes bug with updating values in Reference columns.


## 0.2 (2016-06-30)

- Attempting our second release!


## 0.1 (2016-06-30)

- First release of Grist
