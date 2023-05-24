# Custom Layouts

You can easily add multiple widgets to one page, as described in [Page widgets](page-widgets.md),
and link them as described in [Linking widgets](linking-widgets.md). It is also easy to customize
their arrangement.

Move the mouse cursor over the title of the widget. A small drag icon will appear over to the left
of the title. When you press this icon, you can drag the entire widget to a different place on the
screen.

<span class="screenshot-large">*![layout-start-drag](images/custom-layouts/layout-start-drag.png)*</span>
{: .screenshot-half }

As you move it close to the edge of the screen, or the edge of another widget, you'll see a dashed
outline -- sometimes more than one -- where the widget can be dropped.

<span class="screenshot-large">*![layout-drop-areas](images/custom-layouts/layout-drop-areas.png)*</span>
{: .screenshot-half }

Release the mouse to reposition this widget.

To resize widgets, move the mouse cursor between two widgets until a dashed line appear. Drag this
dashed line to resize.

<span class="screenshot-large">*![layout-resizing](images/custom-layouts/layout-resizing.png)*</span>
{: .screenshot-half }

To expand a widget, click the expand icon at the upper-right of the widget. This will open a full-page view of the widget.

<span class="screenshot-large">*![layout-expand-widgets](images/custom-layouts/layout-expand-widgets.png)*</span>
{: .screenshot-half }

To collapse a widget, click and drag a widget to the widget tray at the top of the page.

<span class="screenshot-large">*![layout-collapse-widget](images/custom-layouts/layout-collapse-widget.png)*</span>
{: .screenshot-half }

When you click on a collapsed widget, it opens in a full-page view. To restore it to the main page, just drag the collapsed widget to the desired location.

## Layout recommendations

While there is no limit to how complicated a layout you can create, you should aim for simple
layouts that will be easy to use for your users (even when you are the only user!)

One rule of thumb is that a widget controlled by another "selector" widget (see [Linking
widgets](linking-widgets.md)) should be to the right or below it.

Here are some common layouts.

## Layout: List and detail

The most common one is to have a list of items on the left, with one or more widgets on the right
providing more information. For instance, the Lightweight CRM example includes a list of people on
the left, with a person's card and a table of related interactions to the right of the list.

![layout-list-detail](images/custom-layouts/layout-list-detail.png)

In this usage, you might want to include in the list only the minimal information you need,
perhaps only a contact's name. If your table has many columns, a quick way to leave only a few is
via the widget options in the right-side panel. In the table widget, click the three-dot menu on
the top right, and select "Widget options".

<span class="screenshot-large">*![layout-widget-options](images/custom-layouts/layout-widget-options.png)*</span>
{: .screenshot-half }

You'll see a list of "Visible Columns". Click "Select
all" link on top of that list:

<span class="screenshot-large">*![layout-hide-selected](images/custom-layouts/layout-hide-selected.png)*</span>
{: .screenshot-half }

Now uncheck the few fields you want to keep, and click "Hide columns" to hide the rest.

## Layout: Spreadsheet plus

Sometimes a wide spreadsheet with many columns is convenient. If you'd like to see more info
associated with the rows of this spreadsheet, you can add widgets below it. These could be details
linked to the spreadsheet, or [summary tables](summary-tables.md) that show totals or other global
info.

For instance, here is a possible layout based on the Lightweight CRM example. It shows contacts as
a wide spreadsheet, and below that includes sections with an overall summary, and interactions for
the selected contact.

![layout-spreadsheet-plus](images/custom-layouts/layout-spreadsheet-plus.png)

## Layout: Summary and details

Sometimes it's useful to divide up a large dataset into subsets. For instance, you might have
credit card transactions, and want a way to view them one month at a time. To do it, you'll use a
"Month" column, creating one [with a formula](dates.md) if needed. Then create a summary table
grouped by "Month" (see [Summary tables](summary-tables.md), and link the table of transactions to
it.

![layout-summary-details](images/custom-layouts/layout-summary-details.png)

We can then select a month and see a spreadsheet of only the transactions in that month.

## Layout: Charts dashboard

If you have many charts, you can just lay them out in a grid to create a top-level dashboard.

![widget_chart_examples](images/custom-layouts/widget_chart_examples.png)

For dynamic charts in which data is selected by another table, a layout like
[List-and-detail](#layout-list-and-detail) above would work well. One tip is to include both a Table
widget and a Chart widget, configured and linked the same way, and differing only in the widget
type:

![layout-chart-table](images/custom-layouts/layout-chart-table.png)

Having a table alongside the chart can be a useful reference, as well as provide more context to
what is visible in the chart.
