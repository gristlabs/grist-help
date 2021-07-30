# Automatic Time and User Stamps Guide

It is sometimes useful to know when a record was last updated or created, and by whom. Grist makes
it simple to create columns that stamp the time or a user’s name to a record when it is updated or
created. This makes it possible to sort records by age, determine how long a record has
existed, or quickly track the most recent edit to its author.

This is especially useful when working in a team. Suppose you have a document tracking sales
opportunities. It may be useful to know the last time a sales person took action on a particular
opportunity, and further determine for how long that opportunity has been pending.

We’ve created a tutorial based on our
[Grant Application Tracker](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker){:target="\_blank"}
template. To follow along with this guide, start with this
[incomplete version of the template](https://public.getgrist.com/kziQC7AXenxy/Automatic-Time-and-User-Stamps/p/8){:target="\_blank"}
that is missing time and user stamp columns. We will recreate those together in this tutorial.
Create a copy and edit the template as you follow along with this guide.

[Open Tutorial Template](https://public.getgrist.com/kziQC7AXenxy/Automatic-Time-and-User-Stamps/p/8){:target="\_blank"}
{: .grist-button}

## Template Overview: Grant Application Tracker

<iframe width="560" height="315" src="https://www.youtube.com/embed/8ujW4H7FGlE?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In this template, an NGO focused on ocean conservation projects tracks their grant applications
submitted to marine-focused foundations. Here’s a breakdown of the document structure.

* The `Applications Dashboard` shows all applications, application details, foundation details, and
  related tasks in one helpful view.
* `Tasks by Staff` lists the NGO’s personnel, the applications they’re overseeing, and tasks
  assigned to each team member.
* `Our Programs` lists the programs the NGO is seeking to fund.
* `Our Funding Overview` provides an overview of funding with two charts: (i) breakdown of funds
  in the fundraising pipeline, and (ii) breakdown of total funding awarded to specific NGO
  programs.
* `Foundations We Work With` lists the foundations to which the NGO has applied for funding. This
  page also lists related applications and tasks.

## Creating Time Stamp Columns

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZrH9BK4iDGg?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Columns can stamp the time when a record was created or updated by using the `NOW()`{: .formula}
formula. Let’s add a column to the `Tasks` table to track when a task was last updated. This can
be accomplished in three steps.

1. In the `Tasks` table, create a column labeled ‘Last Updated’  and in column types, select
   **DateTime** to select your desired [format for date and time](../col-types.md#datetime-columns).
2. Convert the column to a data column by clicking the `ACTIONS` dropdown in the creator panel.
   This prevents the formula from triggering whenever the document loads. Once converted to a data
   column, enter the `NOW()`{: .formula} formula. You will see two checkbox options below the formula.
    - `Apply to new records` triggers the formula only when a record is created.
    - `Apply on record changes` triggers the formula when a record is updated.
3. Select `Apply on record changes` to open a submenu where you may select which fields, when
   updated, will trigger the formula. In this case, we'll select `Any Field` which means that
   updating any field in this record will trigger the time stamp formula to update.

Great! You are now tracking when a task was last updated. Next, you may want to know who created a
task because that person may have the most information about the task’s goals and parameters.
That’s just as simple to create in Grist as time stamps.

## Creating User Stamp Columns

<iframe width="560" height="315" src="https://www.youtube.com/embed/OKjtvx9nGpc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

User stamps are created using the exact same steps as time stamps, expect for one detail — the
formula is `user.Name`{: .formula}. Let’s add a column to the `Tasks` table to track who created a
task.

1. In the `Tasks` table, create a column labeled ‘Created By’ and in column types, select **Text**
   and [modify the format](../col-types.md#text-columns) if you wish.
2. Convert formula column to a data column and enter the `user.Name`{: .formula} formula.
3. Select `Apply to new records` so that the formula only triggers when a new record is created.

There are other possibilities available in addition to `user.Name` such as `user.Email` or a
unique `user.UserID`. The user information available is the same as that in [access rule
conditions](../access-rules.md#access-rule-conditions).

**Note.** It is still possible for a user to manually edit cells with time stamp or user stamp
formulas. If you don't want that to be allowed, use
[access rules](../access-rules.md) to forbid it.

And that’s it! You’ve created columns that capture user and time stamp information based on
specific triggers, such as when a record is updated or created. Great job!

## Dig Deeper: Combining time and user stamps using formulas

Typically it is best practice to keep time and user stamp information in separate columns so that
you may later sort and filter by those columns. However, there may be times when it would be
useful to capture both time and user stamp information in the same column. Let’s add such a column
to the `Applications` table.

1. In the `Applications` table, create a column labeled ‘Created At’ and convert to a data column.
   In column types, select Text.
2. Enter the formula `"{:%b %d, %Y} by {}".format(NOW(), user.Name)`{: .formula}.
    - The part in quotes is a format string. Each set of curly brackets `{}` in it gets replaced
      with the next value in parentheses after `.format`.
    - Note that the format of the date is set within the corresponding `{}`. The format is set
      with a colon `:` followed by the specific Python codes `%b`, `%d`, `%Y`. [Here is a table summarizing
      all the date format options available in Python](https://strftime.org/).
3. Select `Apply to new records` so that the formula only triggers when a new record is created.

**Need more help?** Visit the [final template](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker){:target="\_blank"}
or contact us at <support@getgrist.com>.
