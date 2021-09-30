# Summary Tables Guide

## Mastering Summary Tables with 2 Concepts

In Grist, summary tables are the workhorse of data analysis. They are similar to pivot tables in
spreadsheets, and group-by functions in databases. They make it possible to summarize tables by
grouping records into specific categories. For example, if you have a table of Olympic champions,
it may be useful to group champion records by country or by sport — or by a combination of country
_and_ sport.

Once records are sorted into useful categories, you may then want to compute sums using those
record groups. Grist makes use of a nifty special field, available in formulas as `$group`.

Summary tables make it easy to build pages in which you can quickly capture useful data insights.
You can learn to do this by learning two concepts: creating summary tables, and using `$group` in
formulas. We’ve created a simple template
(<https://public.getgrist.com/x527ESJATWNS/Time-Sheets-Tutorial>) that you can copy and edit as
you follow along with this guide.

## Using Summary Tables to Analyze Data

<iframe width="560" height="315" src="https://www.youtube.com/embed/wSyip0KQRbI?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In our example, you work for the HR department of a candy factory that hires contractors that work
for various departments. In the template, your team has created an advanced time sheet tracker.
There is a page where contractors can easily add time sheets for select months. It would be useful
to have additional pages that summarize expenses by month, by department, and by contractor. Your
goal in this tutorial is to build those summary pages.


## Creating Summary Tables

<iframe width="560" height="315" src="https://www.youtube.com/embed/n11mamU78GY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Step 1: Create a summary table

Let's start by creating a summary table that groups records in the time sheet table by month.
Grist makes it easy to create summary tables. Simply click on `Add New` > `Add Page` >
`Time Sheet Entries` > <span class="grist-icon-lg" style="--icon: var(--icon-Pivot)"></span> > `Months`.

Doing so will generate a summary table with some columns. In this case we have the following three columns.

1. First Column: List of month groups, January through June of 2021.
2. Second Column: A count of the total number of records in each month, e.g. in January there are 12 time sheet records.
3. Third Column: A sum of hours worked in each month, e.g. in January the total hours worked in
   those 12 time sheet records is 81 hours.

   Note: Grist will automatically take any numerical columns and add them up, saving you some time.

### Step 2: Create summary tables with multiple categories

It may be useful to also group timesheets by a combination of categories. For example, we may want
to know how much time and money was spent on a particular account in a particular month, or on a
specific employee in an specific account and month.

When creating a summary table, you can select multiple columns by which to group data. Let’s add
two new summary tables. When adding these widgets, be sure to `Select By` the first widget we
created on this page. This will link the tables so that selecting a month in the first widget will
dynamically update records in the new widgets. Not sure why? Brush up on [linking
widgets](../linking-widgets.md).

1. `Add New` > `Add Widget to Page` > `Time Sheet Entries` >
   <span class="grist-icon-lg" style="--icon: var(--icon-Pivot)"></span> >
   `Months` and `Account`
2. `Add New` > `Add Widget to Page` > `Time Sheet Entries` >
   <span class="grist-icon-lg" style="--icon: var(--icon-Pivot)"></span> >
   `Months` and `Account` and `Employee`

To more easily view this data, drag and drop the new tables so that they tile vertically. You may
also want to hide the count columns.

Great! But now we want to add the total dollar spend in each of these categories. That's simple to
do with summary formulas.


## Calculating Totals Using Summary Formulas

<iframe width="560" height="315" src="https://www.youtube.com/embed/4-ihoU1m3rc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Following along with the video? Visit the [tutorial
solution](https://public.getgrist.com/uR353rDVZhmX/Time-Sheets-Template-Solution) if you get
stuck. Note that there are access rules in place for the tutorial solution which will prevent you
from seeing certain pages and most data. Make a copy to become the document owner and see all data
and pages._


### Step 1: Understanding $group field in formulas

In Grist, `$group` is a special Python object that represents a collection of records that are
summarized by the current summary line.

If you look at the formula in the `Hours Worked` column, you will see `SUM($group.Hours_Worked)`.
That is taking the **sum** of **Hours Worked** in a **group**. In this example, in row 1, the
group is January 2021. Thus, in that row, the formula is adding hours worked in the January 2021
group. In row 2, the group is February 2021 and the formula sums hours worked in February.

If you take a peek at the `count` column, which we hid previously, you’ll find the formula
`len($group)`. The function `len` (which stands for length) counts all the records that belong to
the group being summarized in a particular row.

Another way to express a set of records is by scanning through the list of records in a group
using a variable. You can name the variable as you wish; we will use `r` (for "record"). We can
rewrite the formula in `Hours Worked` as `sum(r.Hours_Worked for r in $group)`.

### Step 2: Using $group in formulas

Let’s calculate the total dollar spend on hours worked in each month.

The formula is `sum(r.Hours_Worked * r.TimeSheet.Hourly_Rate for r in $group)`.

Since each record `r` in the group is a record in the underlying table (`Time Sheet Entries`),
`r.Hours_Worked` refers to the field in that table.

In the `Time Sheet Entries` table, the column `TimeSheet` is a reference column that is
referencing an entire record in the `Time Sheets` table. Thus, we have to further specify which
field from the referenced record should be included in the formula's calculation, which in this
case is `Hourly_Rate`. To learn more about reference columns, visit our
[Reference column guide](2021-05-reference-columns.md).

We can apply the same formula to the other two summary tables on this page. In the second table,
the `$group` function is grouping things in the same month AND account. In the third table, the
`$group` function is grouping expenses in the same month AND account AND by the same employee.

And that's it! You did it. You rebuilt the month summary page. See if you can apply these concepts
to rebuild the contractor summary page.


!!!tip "Did you know?"

    If needed, you can also add conditions to this formula. For example,
    `sum(r.Hours_Worked * r.TimeSheet.Hourly_Rate for r in $group if r.Hours_Worked > 0)`
    will only add up records in which there is a positive value in the field `Hours Worked`.

    Visit our [function reference](../functions.md#_group) to learn more.

*Need more help?* Visit the [tutorial solution](https://public.getgrist.com/uR353rDVZhmX/Time-Sheets-Template-Solution) or contact
us at <support@getgrist.com>.

Note that there are access rules in place for the tutorial solution which will prevent you from
seeing certain pages and most data. Make a copy to become the document owner and see all data and
pages.
