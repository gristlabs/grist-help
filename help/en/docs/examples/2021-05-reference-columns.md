---
title: Reference columns guide
---

# Reference Columns Guide

## Mastering Reference Columns in 3 Steps

In Grist, reference columns are the key tool to organize relational data. Reference columns tell
Grist that two separate tables are related, and specifies which records within those tables are
related. For example, if you have a table of `Dogs` and a table of `Dog Owners`, you may want each
dog’s *record* to explicitly reference their owner’s *record* in `Dog Owners`.

Reference columns are a powerful tool for looking up data from a related table, and for creating
highly productive layouts. You can learn to do this in three easy steps. [We’ve created a simple
template](https://public.getgrist.com/1ujorYjuX3xb/Job-Application-Reference-Column-Tutorial) you
can copy and edit as you follow along with this guide.

## Using Reference Columns to Organize Related Data

In our example, you are a graphic designer applying for jobs, and you are using Grist to keep
track of your job application process. In the template you have four tables: `Job Applications`,
`Milestones`, `Tasks`, and `Contacts`. Your goal is to relate relevant data between tables and
create a custom dashboard where you can easily view each job application’s status, and add new job
applications and new milestones easily.

[In this dashboard](https://templates.getgrist.com/bhW5b6DhciXb/Job-Application-Tracker/), clicking on each job application shows only the milestones related to that job
application. We can create this relationship using reference columns.

Let's create this dashboard together.

## Step 1: Creating References

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y0MKoz2RXEQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Reference columns are a type of column available under COLUMN TYPE. It is helpful to think of the
table with the reference column as the **_referencing table_**, and the table which is being
referenced as the **_underlying table_**.

### Converting Columns with Text into Reference Columns

If you already have text in the selected column, set the COLUMN TYPE in the right-side panel to
"Reference". Grist will guess the underlying table and column you want to show in the reference
column. You can review and edit this guess and set the appropriate underlying table and display
column. DATA FROM TABLE points to the underlying table. SHOW COLUMN sets the display value in the
reference column.

For example, in the `Milestones` table, convert the `Role` column into a reference column. DATA
FROM TABLE should point to `Job Applications`. SHOW COLUMN should be set to `Role`. Note that the
reference column is referencing the **_entire record_** and you are choosing which column to
display in the reference column.

**Tip:** You can easily identify reference columns by the chain link icons in the column’s cells.

### Creating Reference Columns

In the `Contacts` table we have a list of contacts that are not associated with any job
application or company. Let’s create a new column called `Company`, set its type to Reference, and
point to `Job Applications` as the underlying table with `Company` as the display in the reference
column.

Click on the empty cell to open a drop-down menu and manually select the company at which each
contact works. Look at the email address for a hint.

Note: You can always click on a Reference Column cell to open the drop-down menu and select a new
value.

## Step 2: Look up additional data in the referenced record

<iframe width="560" height="315" src="https://www.youtube.com/embed/_7KEUKnwI74?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Recall that the reference column is referencing another table, and correlating two specific
records. Although you see a specific column in the **_display_** of the reference column, the
reference is being made to the **_entire record_**. This allows us to look up additional data
fields in the related record using a simple formula. Let’s try it.

In step 1, in the `Milestones` table we created a reference column called `Role`. It would be useful to
also see for each `Milestone` record, the relevant company.  For example, in row 1 we see the
Milestone event “Rejected!” for the role "Head of Digital Design". It is not immediately apparent
which company this is. Let’s use the `Role` reference column to easily look up the company listed in
the "Head of Digital Design" record in the `Job Applications` table. To do so we create a column
called `Company` and we use the formula `$Role.Company`{: .formula}.

The formula structure is
`$[Reference Column ID in Referencing Table].[Column ID in Underlying Table]`{: .formula}.
Grist will also auto-complete parts of the formula as you type it.

There’s an alternative way to add multiple columns from an underlying table. If you’re interested
in learning more, visit our website’s [help section on reference
columns](../col-refs.md#including-multiple-fields-from-a-reference).


## Step 3: Create a Highly Productive Layout with Linked Tables

One of the most powerful features of Grist is the ability to link related tables in the same page
to create highly productive layouts. In the final dashboard shown at the start of this tutorial,
we saw that clicking on a job application would populate a view of milestones related to that job
application.

Let’s do that now by adding `Milestones` as a widget to the `Job Applications` page. ([Brush up on
widgets here](../page-widgets.md#page-widgets).) Adding the table as a
Card List widget makes the data easier to view. Similarly, you may want to change the `Job
Applications` table to a Card List widget.

In the CARD LIST menu on the right, select DATA to set data selection rules. Under SELECT BY you
will see the option "JOB_APPLICATIONS Card List". This option is only available because in step 1
we created a reference from the `Milestones` table to the `Job Applications` table in the `Role`
reference column. This reference tells Grist which milestones are related to which job
applications.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZYJgPkcMhJU?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


Congrats! You now know how to use reference columns to
organize related data, give your data structure, and create linked widgets in productive layouts.
If you’d like, compare your document to the
[tutorial solution](https://public.getgrist.com/2xHXr5km5jkn/Job-Application-Reference-Column-Tutorial-Solution).

### Dig Deeper: Combining formulas and reference columns.

If you’re comfortable with formulas, try using formulas in reference columns to make Grist an even
more powerful tool. In the [tutorial
solution](https://public.getgrist.com/2xHXr5km5jkn/Job-Application-Reference-Column-Tutorial-Solution), we’ve used a formula to do more.

The formula in the `Last Milestone` field in the `Job Applications` widget is looking up the most
recent date in related records in the `Milestones` table. Thus, adding a new milestone with a more
recent date would automatically update this field. You can learn more about [lookup formulas on
our website](../formulas.md#lookups).

Because `Last Milestone` is both a formula column **_and_** a reference column, we’ve also done
the following which follows the formula described in step 2 of this tutorial.

The `Status` field uses the formula `$Last_Milestone.Round`{: .formula} to look up the related
milestone’s round status. The `Updated On` field uses the formula
`$Last_Milestone.Date`{: .formula} to look up the related milestone's date.

By doing this, status and date also auto-update when the `Last Milestone` field updates.

**Still need help?** Take a peek at the
[tutorial solution](https://public.getgrist.com/2xHXr5km5jkn/Job-Application-Reference-Column-Tutorial-Solution), or contact us at <support@getgrist.com>.
