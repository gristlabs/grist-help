# Creating Proposals

If you are keeping business details and contracts in Grist, it can be convenient
to generate proposals and contracts right there, alongside those records. You can use the [Markdown Custom Widget](../widget-custom.md#markdown) to create a custom 'form' for Proposals, Contracts, or many other types of documents. This tutorial shows you how to set up a document like this:

*![Proposal](/examples/images/2023-07-proposals-contracts/final-proposal.png)*

You can find a finished template here: [📝 Proposals & Contracts Template](https://public.getgrist.com/nyPmvvea8c54/-Proposals-Contracts/m/fork){:target="\_blank"}.

If you'd like to add a proposal to an existing document, understanding this tutorial should get you there.

## Setting up a Project table

First of all, make a table to record project details by
[creating an empty document](../creating-doc.md) and renaming `Table1` to `Projects`:

*![Projects](/examples/images/2023-07-proposals-contracts/make-projects-table.png)*

We'll create our Proposal template alongside our `Projects` table. 

We can insert column IDs as placeholders in our Proposal template that will then be replaced by the cell value for the selected project. For example, in the screenshot below, the value in the **Project Name** column will replace the variable `{Project_Name}` in the proposal template on the right. Seeing the available columns while creating our proposal will make it easier to populate those variables.

*![Projects](/examples/images/2023-07-proposals-contracts/column-placeholders.png)*

## Creating templates

Let's add a new table, `Templates`, to the page to store our template data. Add two columns: **Name** and **Template Formatting**. 

*![Templates](/examples/images/2023-07-proposals-contracts/templates-table.png)*

Now, let's add a custom widget beside the table to view our **Template Formatting**. Click the green 'Add New' button then 'Add widget to page'. Under 'Select Widget', select 'Custom' and under 'Select Data', select `Templates`. Under 'Select By', select `Templates` again.

*![Add Custom Widget](/examples/images/2023-07-proposals-contracts/add-custom-widget.png)*

Configure the custom widget by selecting 'Markdown' from the 'Custom' dropdown. Since we will be editing the template directly in the custom widget, you must allow 'Full document access' under Access Level so the widget can update the `Templates` table. 

Under 'Content', select the column **Template Formatting**. This is the column that will be updated when we make edits within the custom widget.

*![Markdown Widget](/examples/images/2023-07-proposals-contracts/markdown-configuration.png)*
{: .screenshot-half }

Create a Template in the `Templates` table by entering a value in the **Name** column. Then, start editing the template formatting within the custom widget. 

*![Proposal Template](/examples/images/2023-07-proposals-contracts/create-proposal-template-1.png)*

The widget uses Markdown formatting to format the text. For help on Markdown, click the `?` at the top of the widget to view the [Markdown Guide](https://www.markdownguide.org/basic-syntax/).

*![markdown-help](/examples/images/2023-07-proposals-contracts/markdown-help.png)*
{: .screenshot-half }

When you click the 'save' icon, formatting from the widget will populate the **Template Formatting** column.

![Proposal Template](/examples/images/2023-07-proposals-contracts/create-proposal-template.png)

We will exclusively use the custom widget to edit the template formatting so this column can be hidden from the table view. To hide the column, right-click on the column header then 'Hide column'.

![Hide Column](/examples/images/2023-07-proposals-contracts/hide-formatting-column.png)

In your template, you'll have details and text that remain the same across all projects such as formatting, section headers and your own company's information. That is the information you'll type directly into the template. You'll also have information that changes, such as **Project Name** or **Customer Name**. We can use variables containing column IDs as placeholders for that dynamic data. 

**Project Name**, **Customer Name** and **Customer Address** will all change based on the selected Project. So, this is information we should store in our `Projects` table.

Add the columns **Project Name**, **Customer Name** and **Customer Address** to the `Projects` table.

![Projects Table](/examples/images/2023-07-proposals-contracts/project-customer-columns.png)

We can use the column IDs for each of these columns as placeholders in our template with the format `{COLUMN_ID}`. A column's ID can be found under the 'Table' tab of the Creator Panel, directly under the Column Label.

![Variables](/examples/images/2023-07-proposals-contracts/project-name-variable.png)

Finish building out your template to fit your needs. Be sure to add a column to your `Projects` table for all variable information.

![Proposal](/examples/images/2023-07-proposals-contracts/proposal-template.png)

Finally, we need to add a formula column that will create our unique proposals. This formula column will combine the template formatting we just created with our project-specifc data. Add a new column to the `Projects` table with the following formula:
```
# Finds all data associated with this record
class Find_Data(dict):
  def __missing__(self, key):
    return getattr(rec, key)

# Finds the "Proposal" template in the Templates table
template = Templates.lookupOne(Name="Proposal").Template_Formatting

# Formats the template with fields from this table as well as fields from the referenced table
template.format_map(Find_Data())
```

![Proposal Formula](/examples/images/2023-07-proposals-contracts/proposal-formula.png)

## Setting up a proposal dashboard

Next, we'll want to populate our proposal template with actual project data! Start creating a *Proposal Dashboard* by adding a new page to your document. Click the green 'Add New' button then 'Add Page'.

Under 'Select Widget', select 'Table' and under 'Select Data', select `Projects`.

![Add Project Table](/examples/images/2023-07-proposals-contracts/add-projects-table.png)

You'll notice that having this information in a table view is a bit busy. A [Card widget](../widget-card.md) will help simplify our view.

Add a new widget to the page by clicking the green 'Add New' button then 'Add widget to page'. Under 'Select Widget', select 'Card' and under 'Select Data', select `Projects`. Under 'Select By', select `Projects` and add to page.

![Add Project Card](/examples/images/2023-07-proposals-contracts/add-projects-card.png)

Your dashboard should look similar to the screenshot below.

![project-dashboard-start](/examples/images/2023-07-proposals-contracts/project-dashboard-start.png)

Now that we have all of our Project details in a Card view, we can hide them from our table view. Under the 'Table' tab of the Creator Panel, select all columns except **Project Name** and **Customer Name** then click the green 'Hide Columns' button.

*![Hide Columns](/examples/images/2023-07-proposals-contracts/hide-project-columns.png)*
{: .screenshot-half }

Keeping most project details in the Card widget, rather than the Table widget, simplifies our dashboard. You can easily see all projects in the Table widget, and when you want to see details for a specific project, select the project and the Card widget will update to show you project details.

![project-table-card](/examples/images/2023-07-proposals-contracts/project-table-card.png)

Finally, we'll want to add a view of our project-specific proposal. Add a new custom widget to the page by clicking the green 'Add New' button then 'Add widget to page'. Under 'Select Widget', select 'Custom' and under 'Select Data', select `Projects`. Under 'Select By', select `Projects` and add to page.

*![Add custom Widget](/examples/images/2023-07-proposals-contracts/add-custom-project-widget.png)*

Configure the custom widget by selecting 'Markdown' from the 'Custom' dropdown. You must allow 'Full document access'. 

Under 'Content', select the column **Proposal**. This is the formula column that combines our template formatting with our project-specific data.

*![Configure Custom Widget](/examples/images/2023-07-proposals-contracts/proposal-custom-widget-configuration.png)*
{: .screenshot-half }

[Customize your layout](../custom-layouts.md) by rearranging and resizing widgets.

Add project details for a new project and see how your proposal updates to display the newly added data.

*![Populated Proposal](/examples/images/2023-07-proposals-contracts/populated-proposal.png)*

## Entering customer information

Now, let's make two useful changes to the Project set-up:

 * Put customer information in a separate table, so we don't have to re-enter their
   address every time we create a proposal for them (and we can import the addresses in bulk).
* Update the formula in the **Proposal** column of the `Projects` table to look for information in another table.  

First, create a new table called `Customers` for customer-specific information like **Name** and **Address**.

*![Customers Table](/examples/images/2023-07-proposals-contracts/customers-table.png)*

Some of this data is included in our Projects data set. To avoid duplicating data, we need to update our **Customer Name** and **Customer Address** columns to pull from our `Customers` table. 

On our *Proposals Dashboard* page, select the **Customer Name** field then update the column type to *Reference*. Confirm that 'Data from Table' is set to `Customers` and 'Show Column' is **Name**. 

*![customer-name-reference](/examples/images/2023-07-proposals-contracts/customer-name-reference.png)*

Next, we need to update the **Customer Address** field to pull the address for the customer listed in the **Customer Name** column. 

Update the **Customer Address** column to use the following formula:
```
$Customer_Name.Address
```
This formula uses our reference column, **Customer**, along with [dot notation](../references-lookups.md#reference-columns-and-dot-notation), to pull the value from the **Address** column of the referenced table.

When you take a look at a proposal for an existing project, you'll notice that the **Customer Name** no longer populates. This is because of the way reference columns store data. Although under 'Show Column', we chose to see the value from the **Name** column of the referenced table, reference columns actually store a record's ID. That is what we are seeing now in the proposal. 

*![proposal-reference](/examples/images/2023-07-proposals-contracts/proposal-reference.png)*

We can modify our formula in the **Proposal** column to look for data in other tables.

In the `Projects` table, update the formula in the **Proposals** column to the following:
```
# Finds all data associated with this record
class Find_Data(dict):
  def __missing__(self, key):
    return getattr(rec, key)

# Finds the "Proposal" template in the Templates table
template = Templates.lookupOne(Name="Proposal").Template_Formatting

# Formats the template with fields from this table as well as fields from the referenced table
template.format_map(Find_Data(
  Customer_Name = $Customer_Name.Name,
))
```
In the last portion of the formula, we can specify variables that pull from other tables.

`Customer_Name = $Customer_Name.Name` is for our reference column, **Customer Name**. It uses [dot notation](../references-lookups.md#reference-columns-and-dot-notation) to specify what data to pull from the referenced table. 

!!! note "Note: Customer Address"
    The **Customer Address** column can be deleted from the `Projects` table completely. This data is already stored in the `Customers` table and our **Customer Name** column is a reference column pointing to this table. We can use this reference column to pull any other information from the `Customers` table to include in our proposal. If you choose to delete **Customer Address** from the `Projects` table, update the last section of formula to the following:

    ```
    template.format_map(Find_data(
      Customer_Name = $Customer_Name.Name,
      Customer_Address = $Customer_Name.Address.replace('\n', '<br>'),
    ))
    ```

    This tells the formula what to use in place of the variable `{Customer_Address}`.

## Printing and Saving

Once your proposal is ready to go, you can print it or save it as a PDF. Click the three-dot icon at the upper-right of the widget then select 'Print widget'.

*![print-proposal](/examples/images/2023-07-proposals-contracts/print-proposal.png)*

From here, you can either select a printer or choose 'Save as PDF' from the 'Destination' dropdown.

*![print-or-pdf](/examples/images/2023-07-proposals-contracts/print-or-pdf.png)*

## Setting up multiple forms

You can add more form templates by following the same steps that we have just completed. 

Add a new template to the `Templates` table then build out the template using variables containing column IDs for any data that is project-specific. If you have some sections that are the same as another form, copy it over to save yourself the trouble of retyping!

*![contract-template](/examples/images/2023-07-proposals-contracts/contract-template.png)*

Create a dashboard where you can select a project and enter details for this form then preview the form in a custom widget. 

*![contract-dashboard](/examples/images/2023-07-proposals-contracts/contract-dashboard.png)*

Don't forget, you'll need to add a formula column that combines the new form template with details for the selected project!

*![contract-formula](/examples/images/2023-07-proposals-contracts/contract-formula.png)*

This formula column is what you'll select under the 'Content' dropdown while configuring the [Markdown Custom Widget](../widget-custom.md#markdown).

*![contract-widget-configuration](/examples/images/2023-07-proposals-contracts/contract-widget-configuration.png)*

