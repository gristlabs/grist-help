# Search, Sort, and Filter

Grist offers several ways to search within your data, or to organize data to be at your
fingertips.

## Searching

At the top of the document screen, you'll see a magnifying glass icon
(<span class="grist-icon" style="--icon: var(--icon-Search)"></span>)
which opens a spreadsheet-like search.

<span class="screenshot-large">*![Search Textbox](images/search-sort-filter/search-box.png)*</span>
{: .screenshot-half }


You can also start searching using the keyboard shortcut
<code class="keys">*⌘* *F*</code> (Mac) or <code class="keys">*Ctrl* + *F*</code> (Windows).

As you type into the search textbox, Grist will move the cursor to the next cell containing your
search text. If there are no more matches in the current widget or page, the cursor will move to
the next widget or switch to the next page.

## Sorting

It's easy to find a word in a dictionary, but it wouldn't be if the words weren't sorted!
Grist offers flexible and convenient sorting options, which are quite different from a traditional
spreadsheet.

To sort a table in Grist by a column, open the menu from the column's header and select "Sort":

<span class="screenshot-large">*![Column Menu Sort](images/search-sort-filter/column-menu-sort.png)*</span>
{: .screenshot-half }

In the same menu item, you can choose to sort in ascending or descending order.

**Difference from Excel**:
Importantly, sorting does not change any formula calculations, it only changes the order in which
you see the records. This is different from spreadsheets like Excel.

Another difference is that the sort setting is "active": if you add a record, or change a cell
that's used for sorting, the record will jump into its correct position in the sort order. See
[Saving Row Positions](#saving-row-positions) below for an option more similar to Excel's behavior.

### Multiple Columns
When a table is sorted, you can click another column to add it to the sort:

<span class="screenshot-large">*![Add to Sort](images/search-sort-filter/column-menu-add-sort.png)*</span>
{: .screenshot-half }

The second column determines the order of records whose values in the first column are the same.
You can add more columns to the sort. For example, you could:

- Sort employees first by Department, then by Last Name, then by First Name.
- Sort transactions first by Date, then by Amount.
- Sort tasks first by 'Is Completed' column, then by Priority.

### Saving Sort Settings

Because sorting only affects your view of data, you can sort data in a Grist document even if you
do not have edit access to it. If you *can* write to a document, then you can also save sort
settings.

When you change sorting on a table, the icon on top of it gets highlighted in green. Click it to
see the currently active setting, as well as the options to manipulate them (e.g. remove a column
from the sort), to save the setting, or to revert your changes:

<span class="screenshot-large">*![Widget Menu](images/search-sort-filter/widget-menu-sort.png)*</span>
{: .screenshot-half }

When you save sort settings, they will apply to the widget any time this page is opened, either by
you or other collaborators.

**Multiple Views**:
Just like you can create multiple pages showing data from the same table, you can have different
sort settings on each view of the data. E.g. you could have one view showing credit card
transactions sorted by date, and another showing them sorted by amount.

### Sorting from Side Panel
You can sort widgets other than Table, such as Card List or Chart, using the "Sort & Filter"
subtab in the side panel:

<span class="screenshot-large">*![Side Panel Sort](images/search-sort-filter/side-panel-sort.png)*</span>
{: .screenshot-half }

You can add one or more columns, save or revert settings and use advanced
sorting options.

### Advance sorting options
The "Sort & Filter" subtab exposes additional sorting options that might be useful for
various column types:

- `Use choice position` -- available on [Choice](col-types.md#choice-columns) column, sorts records using the configured
order of choice items, rather then their names.
- `Empty values last` -- in alphabetical order empty values are shown first by default, use
this option to put them at the end.
- `Natural sort` -- for Text column will treat multi-digit numbers in strings as if they were
a single character, allowing more human-friendly ordering. For example, using
`natural sort`, _Product10_ will be positioned after _Product2_.

<span class="screenshot-large">*![Side Panel Sorting Options](images/search-sort-filter/side-panel-sorting-options.png)*</span>
{: .screenshot-half }


### Saving Row Positions

When you use the side panel, you'll notice one extra button: "Update Data". If you click it, the
current position of the records relative to each other is saved, and the active sort by your
selected columns is turned off.

In other words, rows will no longer jump into place according to values in certain columns, but
will remain in the place they are in. You will also be able to reorder rows manually by dragging
them.


## Filtering

You can choose to see only a subset of data in a table by filtering for certain values in a
column. Open the column menu from any column's header, and click "Filter Data". You'll see a
dialog listing the values in the column:

<span class="screenshot-large">*![Filter Menu](images/search-sort-filter/filter-menu.png)*</span>
{: .screenshot-half }

Uncheck the values you don't want to see, or click "None" and then check only the values
you do want to see. The search bar at the top of the dialog lets you find values of
interest if the list is long.

Click "Apply" to apply your setting.

You can filter by more than one column. Only those rows will appear which match all of the
filters.

As with sorting, you can save filters to the view. Click the highlighted "Sort & Filter" icon on
top of the table:

<span class="screenshot-large">*![Widget Menu](images/search-sort-filter/widget-menu-filter.png)*</span>
{: .screenshot-half }

You'll see the columns for which there are active filters, and options to save the filter, or to
revert to saved settings.

As with sorting, you can create different widgets or pages showing the same table with different
filter settings. For example, you could have one page showing event attendees with status
"Confirmed" and another one showing those with status "Pending".

## Range Filtering

Certain column types allow for filtering within a range of values.

When filtering a numeric or integer type column, you have the option to filter within a range of numbers. For example, if you only want to see high-value purchases in a [table of credit card transactions](https://templates.getgrist.com/2i9WoHs2oRzK/Credit-Card-Activity-Template-AmEx/p/1), you could add a filter for the amount column and enter a minimum value of $500. The table would be filtered to show any transactions with an amount of $500 or greater.

<span class="screenshot-large">*![range-filtering-numeric](images/search-sort-filter/range-filtering-numeric.png)*</span>
{: .screenshot-half }

When filtering a date or datetime type column, you have the option to filter within a specified date range. The range can be entered into the "Start" and "End" fields, or selected on a calendar.

Perhaps you went on vacation and want to see all transactions during that time. We could add a filter to the Date column to see all transactions within the date range of the trip.

<span class="screenshot-large">*![range-filtering-date](images/search-sort-filter/range-filtering-date.png)*</span>
{: .screenshot-half }

You can also filter date and datetime type columns by a relative range, which is a range relative to today's date. For example, you might want to filter for tasks due in the next 14 days. That filter would update each day so that it is always filtering by 14 days into the future, relative to today's date. 

When filtering a date or datetime column, there are several relative ranges suggested as a shortcut, as seen in the image below.

<span class="screenshot-large">*![range-filtering-date-dynamic](images/search-sort-filter/range-filtering-date-dynamic.png)*</span>
{: .screenshot-half }

If you use the calendar to select a range of dates, you can also convert each absolute date into a relative date by selecting from the list of relative dates available.

<span class="screenshot-large">*![range-filtering-relative-date](images/search-sort-filter/range-filtering-relative-date.png)*</span>
{: .screenshot-half }

### Pinning Filters

Filters can be pinned at the top of a table for quick filtering. By default, filters will be pinned when first applied to a table. To unpin a filter, click the filter button then click the pin icon. If you unpin a filter button, any saved filters will still be applied but the button will no longer be visible.

<span class="screenshot-large">*![pinning-filters](images/search-sort-filter/pinning-filters.png)*</span>
{: .screenshot-half } 

It may be useful to save the buttons without any filtering to create a quick filter toolbar.

If you do save settings with filters applied, that saves it for future sessions and other team members will see the same thing.

<span class="screenshot-large">*![Filter Button Filter Selection](images/search-sort-filter/filter-button-filter-selection.png)*</span>
{: .screenshot-half } 

### Complex Filters

To filter for more complex conditions, create a new formula column and filter this column for
values of "true".

For example, to filter for "Persons with salary over $100,000 or a position of 'Board Member'",
you can use a formula like this:

  `$Salary > 100000 or $Position == 'Board Member'`{: .formula }

This will produce a column of true and false values, which you can filter for the value `true`.
