# Making Invoices with Custom Widgets

If you are keeping records of who is charged what in Grist, it can be convenient
to generate invoices right there and then beside those records.  This tutorial
shows you how to do that.  You can find a finished template here GIVE LINK.
If you'd like to add invoices to an existing document, making them work the
way you want, understanding this tutorial should get you there.

First of all, make a table to record invoices:

![Invoice](/examples/images/2020-08-invoices/make-invoices-table.png)

Now, let's add an invoice widget beside the table to view the invoices.
There are all sorts of possible styles of invoice, so Grist lets web
developers create their own using Custom Widgets.  We'll use an example
invoice style published by Grist, but if it doesn't match your needs
any web developer could tweak it for you.

Click on `Add New`, then `Add Widget to Page`.  Then:

  * For `Select Widget` choose `Custom` since we'll be using a Custom Widget.
  * For `Select Data` choose `Invoices` since we'll be viewing data from the invoices table.
  * For `Select By` choose `INVOICES` so that the Custom Widget will show data from the
    selected row of that Table Widget.

![Invoice](/examples/images/2020-08-invoices/add-custom-widget.png)

Great, now we have two widgets, a Table Widget that will have invoice data,
and a Custom Widget that will view that data as a nicely formatted, printable invoice.
The Custom Widget starts off blank; select `Widget options` to specify what we want in
it:

![Invoice](/examples/images/2020-08-invoices/widget-options.png)

In the `CUSTOM` settings section where it says `Full URL of webpage to show`, put this
link:

```
# THIS IS NOT YET LIVE
https://gristlabs.github.io/grist-widget/invoices/
```

And set `Access` to `read table`.  This grants the Custom Widget access to read the
Invoices table.

![Invoice](/examples/images/2020-08-invoices/set-url.png)

Now place anything you like in a row of the Invoices table (I just added the number `1`).
An incomplete invoice will immediately show up:

![Invoice](/examples/images/2020-08-invoices/empty-invoice.png)

The incomplete invoice shows what column names to use to control what parts of the
invoice.  An extra black box shows what columns the widget understands, what columns
it is ignoring, and what extra columns the widget could make use of.
Currently it is saying that it is ignoring the default `A`, `B`, and `C` columns
we have, and would like to see columns called `number`, `client`, `items` etc.

Looking at the start of the invoice we see a space for an invoice number,
`INVOICE NUMBER: #number`.  So let's rename the `A` column to `number`,
we could leave the value as 1, but then it looks like we haven't done much
business yet.  I'm going to choose the set the invoice number to be `= $id + 51371`,
where `$id` is an auto-incrementing numeric identifier assigned to each row.
But you could set it manually or with a different formula.  As soon as it is
set, the invoice updates:

![Invoice](/examples/images/2020-08-invoices/add-number.png)

The next column the incomplete invoice help suggests is `client`, so
let's rename the `B` column to `client`.  Later we will give client
information in a structured way, but for now let's just put some text
here (use <code class="keys">*Shift* + *Enter*</code> to insert line breaks):

![Invoice](/examples/images/2020-08-invoices/add-client.png)

Great, now the Client box is filled out.  The next suggested column is `items`,
so let's rename the `C` column to `items`.  Later we will give item
information in a structured way, but for now let's just put some text here:

![Invoice](/examples/images/2020-08-invoices/add-items.png)

And now the Description is set.  We're missing a total, so let's add a
column called `total` and set it to `100`:

![Invoice](/examples/images/2020-08-invoices/add-total.png)

The invoice won't update immediately.  This is the first new column we've
added - until now we've been renaming them.  When we created the Custom Widget,
it was given access to the columns that existed at the time of creation.
To let the widget see the new column, open `Widget options` again and move
`total` from `Hidden Columns` to `Visible Columns`:

![Invoice](/examples/images/2020-08-invoices/add-total-visible.png)

Great, the invoice updated.  Now let's set who the invoicer is from, by
adding an `invoicer` column (remember to make it visible to the widget
via `Widget options`).

![Invoice](/examples/images/2020-08-invoices/add-invoicer.png)

As a last step to creating a usable invoice, let's make an `issued`
column and put today's date in it (remember to make it visible to the widget
via `Widget options`).  As soon as the invoice has a date, the black help
box will disappear:

![Invoice](/examples/images/2020-08-invoices/add-issued.png)

Okay!  If someone sent me that, I'd pay it.  You should nudge me by
giving it a due date though.  Let's make a `due` column and set it to
a month from the `issued` date (remember to make it visible to the widget
via `Widget options`).

![Invoice](/examples/images/2020-08-invoices/add-due.png)

ROUND ABOUT HERE I SHOULD EXPLAIN THE info COLUMN.
I forgot to take a screenshot when setting it up!
Here's what I did, hopefully we can simplify.
I may have done it just before the dates, can't remember, will check.

```
import json
result = RECORD(rec, expand_refs=1)
if "items" in result:
  try:
    for item in result["items"]:
      item["invoice"] = None
  except:
    pass
return json.dumps(result)
```

We can do better for entering invoicer information (to get fancier
formatting) and client information (to be able to enter it faster or
link with existing tables).  Let's add a new table to the page for
entering business information.  Click on `Add New`, `Add Widget to
Page`, then `Select Widget > Table` and `Select Data > New Table`:

![Invoice](/examples/images/2020-08-invoices/add-businesses.png)

Then rename the table to `Businesses` and empty the `invoicer` column
so we can see help about what the Custom Widget can handle there:

![Invoice](/examples/images/2020-08-invoices/add-businesses-rename.png)

The Custom Widget suggests `invoicer.name`, `invoicer.street1`, ... 
`invoicer.website` columns.  This is supposed to mean an `invoicer`
column that is a reference to something with `name`, `street1`, ..., `website`
columns.  So let's provide those columns in our `Businesses` table,
and fill them in for ourselves as the invoicer:

![Invoice](/examples/images/2020-08-invoices/add-a-business.png)

Now let's set the `invoicer` to reference that.  One way to do that
is just to write the `name` in it (`Thunderous Applause`), then
go to `Widget options`, `Column`, `Column Type` and choose `Reference`.
If we spelled the name right, Grist will be able to guess the
reference we wanted to make, otherwise just tell it:

![Invoice](/examples/images/2020-08-invoices/link-invoicer-before.png)

Once you hit `Apply`, you will see a nicely formatted invoicer
section:

![Invoice](/examples/images/2020-08-invoices/link-invoicer-after.png)

We can do the same thing now for the `client` column.  Delete what is
in it, and you'll see the same kinds of columns can be given to it
as for the `invoicer`.  So we can add a row to our `Businesses`
column and reference that:

![Invoice](/examples/images/2020-08-invoices/link-client.png)

Okay!  All that remains to restructure is the list of items and prices
that is at the heart of an invoice.  Clear the `items` column to
see what we can put there.  It will show that `items` can be a list,
where each item has a `description`, `price`, `quantity`, and `total`.
So we go ahead and add an `Items` table like we added `Businesses`,
and give it those four columns.  To be fancy, we set total to be a
formula:

![Invoice](/examples/images/2020-08-invoices/add-items-table.png)

Now we need to pull these items into the `Invoices` table so that
the Custom Widget gets access to them.  Reset the column type of
the `items` column to be `Any`, and then set it to the formula
`=Items.lookupRecords()`.  This formula needs a little more work,
which we'll do soon, but let's just start with that.

![Invoice](/examples/images/2020-08-invoices/add-items-lookup.png)

Great, our invoice is updating nicely!  Remove the `total` column
to get an automatically calculated one:

![Invoice](/examples/images/2020-08-invoices/plausible-invoice.png)

Okay, that is one invoice.  But we're hopefully going to be making
plenty of invoices.  So let's do some fit and finish to make that
work comfortably.

It is probably more comfortable to edit invoices
as a Card Widget than a Table Widget, so feel free to change that
using `Widget options`, `Table`, `Change Widget`, `Card`, `Save`.

And if we are a small business always invoicing as the same name
and address, we could set `invoicer` to a specific business rather
than selecting it, and then just hide that column.

![Invoice](/examples/images/2020-08-invoices/single-invoicer.png)

Once we have a second invoice, it becomes clear we skimped on the
formula for collecting invoice items - all the invoices contain
all the items.  So we get more specific by adding an `invoice`
column to `Items` and setting it up to refer to specific `Invoices`:

![Invoice](/examples/images/2020-08-invoices/add-invoice-column.png)

Once that is done we can sprinkle on some Grist fairy dust, and
go to `Widget options` for the `ITEMS` Table Widget, click
`Change Widget`, and set `SELECT BY` to `INVOICES Card`.  Once
that is saved, only the items for the currently selected invoice
are shown.  Even better, when you add new items, the `invoice`
column is automatically set to the invoice you are viewing.
So you can just hide the `invoice` column and forget about it.

![Invoice](/examples/images/2020-08-invoices/link-items-to-invoice.png)

With that, entering new invoices is a breeze!

 * Click `+` to add a new invoice card.
 * Pick the client, set the issue date.
 * Add items.
 * Done!

Here's my choice of set-up.  I added a `note` column for any ad-hoc
instructions or explanations I need to give, and tweaked the layout a
bit.  I've opted to add new clients on a separate page (`B` or `Businesses` on
the left panel) since that is relatively infrequent for me; you could choose
to keep that on the same page.  I don't needs deductions or taxes, if you do
you could add columns and/or formulas for those.  The invoice custom widget works
for me as is, but if I needed to tweak anything I could copy the github repository
it is in and change it a bit (or hire a web developer to do that for me - they
don't need to be Grist experts).

![Invoice](/examples/images/2020-08-invoices/final-invoice.png)


