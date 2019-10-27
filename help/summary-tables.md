# Summary Tables

Summary tables are the workhorse of data analysis in Grist. They are similar to "pivot tables" in
spreadsheets, and to `GROUP BY` clauses in databases. They let you get table-wide totals or any
subtotals.

Summary tables have many uses:

  - Group projects by status, or by priority.
  - Summarize bank transactions by year, or quarter, or by category.
  - Group employees by position, or gender, or department.
  - Summarize by any combination, such as position *and* gender *and* department.
  - Group all records to calculate table-wide totals and statistics.

## Adding summaries

To add a summary table, click "Add New" button and select "Add Page" or "Add Widget to Page". In
the widget picker, click the summation icon
(<span class="grist-icon" style="--icon: var(--icon-Pivot)"></span>) next to the table you'd like
to summarize.

<span class="screenshot-large">*![summary-picker](images/summary-picker.png)*</span>
{: .screenshot-half }

When creating a summary table, you choose a field or a combination of fields by which data should
be grouped. These are called the "Group by" fields. The summary table will contain one row for
each group-by value. Grist's powerful formulas then allow artibrary calculations on the matching
subsets of the underlying data.

Keep in mind that the group-by fields determine *which* groups should exist in the summary table.
Do not select values you'd like to calculate (e.g. for average salary) as group-by fields; these will
be created using formulas in the next step.

!!! tip ""
    **Tip:** You can think of rows in a summary table as buckets into which your records will be
    placed. Group-by fields determine the labels for these buckets. For instance, a summary of
    projects grouped by status (e.g. "Active", "Completed", "NotStarted") will have three such
    buckets, one for each status. Every project goes into one of these three buckets. You can then
    easily calculate info for each folder, such as a count of projects or the total of their costs.

## Summary formulas

When you add a summary table, each of the selected group-by fields becomes a column in the new
table. *Everything* else in the summary table is calculated using formula columns. Some of these
columns are created automatically, as a convenience.

Specifically, a column `count` will be added to show the number of records in the group
represented by the current summary row. And for any numerical column in the original data, the
summary table will contain a same-named column with the total. For instance, the summary of
Employees grouped by Position would look like this:

<span class="screenshot-large">*![summary-result1](images/summary-result1.png)*</span>
{: .screenshot-half }

!!! tip ""
    **Tip:** A summary widget will have a header like "EMPLOYEES [by Position]", to
    indicate that it's showing summary data for the `Employees` table, grouped by "Position". You
    can click the title to rename it.

If you select a cell in a column like `count` or `AnnualPay` and hit <code
class="keys">*Enter*</code>, you'll see the formulas that calculate them:

  - `count` is `len($group)`
  - `AnnualPay` is `SUM($group.AnnualPay)`

The mysterious `$group` is simply another column, hidden by default (but you may unhide it). It contains for each cell the group of records represented by this summary row.

!!! tip ""
    **Side note for Python fans.**
    `$group` is a special Python object. It’s an iterable collection of records. Using an
    attribute like `$group.A` is a shorthand for the list of values in the `A` column of all the
    records in the group, similar to `[r.A for r in $group]`.

Often, the automatically created columns don't make sense. For instance, the sum of `PayRate`
isn't very meaningful. Simply delete such column, either using the column menu, or -- more easily
-- using the <code class="keys">*Alt* + *Minus*</code> keyboard shortcut.

You are free to change formulas for the automatically created columns, or to add new formula
columns. Note that summary tables do not allow adding *non*-formula columns.

For instance, you might want to change the formula for `PayRate` from `SUM($group.PayRate)` to
`AVERAGE($group.PayRate)`, which would be a more interesting value.

<span class="screenshot-large">*![summary-formula](images/summary-formula.png)*</span>
{: .screenshot-half }

Here are some useful recipies of formulas in summary tables:

  - **Average**:  
    `AVERAGE($group.PayRate)` or `SUM($group.PayRate) / $count`
  - **Standard deviation**:  
    `STDEV($group.PayRate)`
  - **Maximum or minimum**:  
    `MAX($group.PayRate)`, `MIN($group.PayRate)`
  - **Sum over a subset of records**:  
    `SUM(r.PayRate for r in $group if r.EmploymentStatus == "Active")`
  - **Weighted average**:  
    `AVERAGE_WEIGHTED(zip($group.Life_Expectancy, $group.Population))`

In fact, you may use the full power of Python to calculate what you'd like. As for any table, your
formula may refer to any of the columns in the summary table, not only `$group`.

## Changing summary columns

The group-by columns in a summary table are created when you add the widget. It's not possible to
modify the values in them, or to modify their settings, such as type. The settings and values of
the group-by columns reflect those in the underlying table. When new values appear in the
underlying table for the group-by columns, the summary tables will also get new rows
automatically.

What you may change is which columns the table is grouped by. Click the three dots on the top
right of the summary table, and click "Data selection":

<span class="screenshot-large">*![summary-widget-menu](images/summary-widget-menu.png)*</span>
{: .screenshot-half }

The settings in the side pane tell you which data is shown and how it's grouped:

<span class="screenshot-large">*![summary-settings](images/summary-settings.png)*</span>
{: .screenshot-half }

You can click "Edit Data Selection" button to open the same widget picker that you used to add the
summary table. You can now deselect some "Group by" fields and select others, and click "Save" to
update the summary table.

## Linking summary tables

[Just refer to existing article] Explain to summarize by more fields than it seems at first
glance.

## Charting summarized data

[Pick a couple examples] Refer also to existing examples

## Detaching summary tables

[Need a full-blown explanation]
