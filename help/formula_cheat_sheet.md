Formula Cheat Sheet
=========

Grist has a powerful data engine to calculate the cells of your tables using formulas. Grist formulas are written
in [Python](https://docs.python.org/3.9/library/_), the most popular language for data science. We also have a suite of Excel-like [functions](http://127.0.0.1:8000/functions/), with all-uppercase names. 

If you don't see what you're looking for, post in the [Community Forum](https://community.getgrist.com/) and we'll be able to help you out!

## Math Functions

<span></span><section class="cheat-sheet">
#### Simple Math (add, subtract, multiply divide)

Uses `+` , `-` , `/` and `*` operators to complete calculations.

<span></span><details><summary>
#### Example of Simple Math
</summary>

Chestwood Art Studio ships art across the country and has the option of monthly payments over the course of 12 months.

We have the subtotal, the tax (based on the state it is shipping to) and Amount Due Monthly. This formula column uses addition, multiplication and division.

<span class="screenshot-large">*![simple-math](images/formula-cheat-sheet/simple-math.png)*</span>

The formula used here is:
```
($Subtotal + ($Subtotal*$Tax)) / 12
```
We add the subtotal to the calculated tax then divide this by 12 months to get our Amount Due Monthly.
</details>

<span></span><details><summary>
#### Troubleshooting Errors
</summary>

`#TypeError`: Confirm all columns used in the formula are of [Numeric](https://support.getgrist.com/col-types/#numeric-columns) type.
</details>
</section>

<span></span><section class="cheat-sheet">
#### max and min

Allows you to find the [max](https://support.getgrist.com/functions/#max) or [min](https://support.getgrist.com/functions/#min) values in a list.

<span></span><details><summary>
#### Examples using MAX() and MIN()
</summary>
**Max**: Classes table of the [Class Enrollment](https://templates.getgrist.com/doc/afterschool-program) template.

<span class="screenshot-large">*![max](images/formula-cheat-sheet/max.png)*</span>

The formula used in the 'Spots Left' column of the Classes table is:
```
max($Max_Students - $Count, 0) or "Full"
```
Here, the max value is determined from either `$Max_Students - $Count` or `0`. If `$Max_Students - $Count = 0`, then no max can be determined and the value returned is "Full".

**Min**: Contacts table of the [Lightweight CRM](https://templates.getgrist.com/doc/lightweight-crm) template.

<span class="screenshot-large">*![min](images/formula-cheat-sheet/min.png)*</span>

The formula used in the 'Due' column of the Contacts table is:
```
items = Interactions.lookupRecords(Contact=$id, Type="To-Do")
return min(items.Date) if items else None
```
Let's break this down. 

`Interactions.lookupRecords(Contact=$id, Type="To-Do")` finds all records in the Interactions table where 
the Contacts match and the Type is To-Do. This returns a list of records that we assign to the variable `items`. 

Next, all Dates assigned to the records in our item list are evaluated to find the minimum date. This is the record that is returned. So, we see the date of the task that is due the soonest. 

If there are no items in the list, nothing is returned and the field is left blank.
</details>
</section>

<span></span><section class="cheat-sheet">
#### Sum

Use the [SUM()](https://support.getgrist.com/functions/#sum) function when you want to sum values across a row. If you want to sum values in a column, use [Summary Tables](https://support.getgrist.com/summary-tables/).

<span></span><details><summary>
#### Example of SUM()
</summary>

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder/p/6) template**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-custom-product-builder.png)*</span>

The formula used in the Total Cost column of the Select or Add New Products table is:
```
SUM($Requirements.Cost)
```
The Requirements column is a [hidden column](https://support.getgrist.com/page-widgets/#configuring-field-lists) in this table. It is a reference list column that pulls data from the Build Requirements table. 

Our formula uses the Requirements column to access the Build Requirements table then pulls the cost for each record in the table. 

We use SUM() to sum the costs from each record.

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager) template**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-inventory-manager.png)*</span>

The formula used in the Received column of the All Products table is:
```
SUM(Incoming_Order_Line_Items.lookupRecords(SKU=$id).Received_Qty)
```
We use the [lookupRecords](https://support.getgrist.com/functions/#lookuprecords) function to find all records in the Incoming Order Line Items table where the SKU matches the SKU in this row then pull the value in the Received Qty column for each of those records. We use SUM() to find the sum of those values.

The Qty on Order and Sold columns of the All Products table are also great examples of the SUM() function.

**Check out another example in our Community Forum:** [Creating a Sum of Net and Gross profit from multiple tables](https://community.getgrist.com/t/creating-a-sum-of-net-and-gross-profit-from-multiple-tables/668)
</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparing Values: < , > , <= , >=

Allows you to compare numerical values. If Sales = `$1200` and Running Cost = `$1650`, `"Gains" if Sales > Running Cost else "Loss"` would return `Loss`.

<span></span><details><summary>
#### Examples comparing values
</summary>

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager) template**

<span class="screenshot-large">*![comparing-values-stock-alert](images/formula-cheat-sheet/comparing-values-stock-alert.png)*</span>

The formula used here is:
```
if $In_Stock + $QTY_on_Order > 5:
  return "In Stock"
if $In_Stock + $QTY_on_Order > 0:
  return "Low Stock"
if $In_Stock + $QTY_on_Order <= 0:
  return "OUT OF STOCK"
```
Here, we have three different **if-return** statements; if `x` is true, return `some_value`. Once a statement is true and a value is returned, the formula stops. 

First, if the value in the In Stock column plus the value in the Qty On Order column are greater than 5, return "In Stock". 

Next, if the value in the In Stock column plus the value in the Qty On Order column are greater than 0, return "Low Stock". It's implied that the value is less than or equal to 5 because the first statement would have to be false for this to be evaluated. 

Last, if the value in the In Stock column plus the value in the Qty On Order column are less than or equal to 0, return "OUT OF STOCK".

**[Influencer Outreach](https://templates.getgrist.com/qPxe3srL7H28/Influencer-Outreach) template**

<span class="screenshot-large">*![comparing-values-interactions](images/formula-cheat-sheet/comparing-values-interactions.png)*</span>

The formula used in the Interactions? column of the Opportunities table is:
```
len(Interactions.lookupRecords(Influencer=$id))>0
```
We use the [lookupRecords](https://support.getgrist.com/functions/#lookuprecords) function to find all records in the Interactions table where the Influencer matches the Name in this row.

We use [len()](https://support.getgrist.com/functions/#len) to count the number of records found. If there are more than zero records, the formula is evaluated to be true and the toggle will be toggled on. If there are zero records, the formula is evaluated to be false.

**[Internal Links Tracker for SEO](https://templates.getgrist.com/j9ZH7rPGafbH/Internal-Links-Tracker-for-SEO) template**

<span class="screenshot-large">*![comparing-values-orphaned](images/formula-cheat-sheet/comparing-values-orphaned.png)*</span>

The formula used in the Orphaned? column of the Orphaned Pages table is:
```
len(Links.lookupRecords(To=$id))<1
```
We use the [lookupRecords](https://support.getgrist.com/functions/#lookuprecords) function to find all records in the Links table where the link in the To column matches the link listed in the Slug column of this row.

We use [len()](https://support.getgrist.com/functions/#len) to count the number of records found. If it's less than 1, the formula is evaluated to be true and the checkbox will be checked. If it's equal to or greater than 1, the formula is evaluated to be false.

The No Internal Links? column of the [Pages Without Links to Other Pages](https://templates.getgrist.com/j9ZH7rPGafbH/Internal-Links-Tracker-for-SEO/p/5#a1.s10.r2.c33) table is another example of comparing values.
</details>
</section>


<span></span><section class="cheat-sheet">
#### Converting from String to Float

**[String](https://www.w3schools.com/python/python_strings.asp)**: A sequence of characters that once defined, cannot be changed. See [Python str() Function](https://www.w3schools.com/python/ref_func_str.asp) for converting a specified value to a string.

**[Integer](https://www.w3schools.com/python/python_numbers.asp)**: A whole number, without decimals. See [Python int() Function](https://www.w3schools.com/python/ref_func_int.asp) for converting a specified value to an integer number.

**[Float](https://www.w3schools.com/python/gloss_python_float.asp)**: Real numbers that can store decimal values. Also called floating point number. See [Python float() Function](https://www.w3schools.com/python/ref_func_float.asp) for converting a specified value into a floating point number.

<span></span><details><summary>
#### Example converting a string to a float
</summary>

**[Mixing Products](https://public.getgrist.com/v4vj2PDZS4jf/Community-665/m/fork)**

<span class="screenshot-large">*![string-to-float](images/formula-cheat-sheet/string-to-float.png)*</span>

The formula used in the Total Prod column is:
```
mix_list_str = $Mix_Product.Lt_per_100_Lt
mix_list_float = [float(i) for i in mix_list_str]
x = [Lt * $Water/100 for Lt in mix_list_float]
l = $Mix_Product.Product
' '.join('{} {}'.format(first, second) for first, second in zip(l, x))
```
Let's break this down.

`$Mix_Product` represents the Mix Product column, a reference list column that pulls data from the Product column of Table1. We can use this column as a link to Table1 to pull other data. `$Mix_Product.Lt_per_100_Lt` uses the reference list column, Mix Product, to pull values from the Lt per 100 Lt column of Table1 for the products listed in the Mix Product column of Table2 then assigns this list of values to the variable `mix_list_str`. This is the same formula used in the Lt per 100 Lt column of Table2 so you can see the value it returns in row 1 of Table2. It returns a list: `['0.5', '1']`. This list is evaluated as a string rather than numerical values. We need to convert each value in this list to a float.

In our next formula, `[float(i) for i in mix_list_str]`, we iterate through the list that was assigned in the first equation to `mix_list_str` and convert each value to a floating-point number. We want to convert to a float rather than integer because not all values are whole numbers and contain decimals. `i` is a variable representing each value. So each value in `mix_list_str` is evaluated in the equation `float(i)`. `float(0.5)` converts `0.5` to a float and `float(1)` converts `1` to a float. Now, we assign our list of floats to the variable `mix_list_float`.

We can now use our float values in a mathematical equation. Once again, we iterate through the list that was assigned to the variable `mix_list_float`. In our equation `[Lt * $Water/100 for Lt in mix_list_float]`, `Lt` represents each value in `mix_list_float` and `$Water` represents the value found in the Water column which is `1000`. We evaluate the equation `Lt * 1000/100` when `Lt = 0.5` and `Lt = 1` which returns the list `[5.0, 10.0]`. We assign this list to the variable `x`.

In the first equation, we used our reference list column, Mix Product, as our link to Table1 in order to pull data from Table1 into Table2. We use this method again in `$Mix_Product.Product` to pull data from the Product column of Table1. This returns a list of products; `[Prod A, Prod B]`. We assign this list to the variable `l`.

Finally, we use the [join()](https://www.w3schools.com/python/ref_string_join.asp) method to combine our two lists. `' '` is our starting (empty) string. We use Python's [format method](https://www.w3schools.com/python/ref_string_format.asp) to format our string. `{}` is a placeholder for each variable listed in `.format()`. Last, we use Python's [zip() function](https://www.w3schools.com/python/ref_func_zip.asp) to pair the first values from each list together and then pair the second values in each list together. `l` is assigned as our `first` list and `x` is assigned as our `second` list. `l = [Prod A, Prod B]` and `x = [5.0, 10.0]`. Zipping our lists into `'{} {}'.format(first, second)` gives us `Prod A 5.0` in our first iteration and `Prod B 10.0` in our second iteration. Our final return value is `Prod A 5.0 Prod B 10.0`.
</details>
</section>


<span></span><section class="cheat-sheet">
#### Rounding Numbers

Specify the number of decimal places to give in a result using the [ROUND()](https://support.getgrist.com/functions/#round) function. If Average Temperature = `46.5`, `round($Average_Temperature)` would return `47`

<span></span><details><summary>
#### Example of rounding numbers
</summary>
**[Mixing Products](https://public.getgrist.com/v4vj2PDZS4jf/Community-665/m/fork)**

<span class="screenshot-large">*![round](images/formula-cheat-sheet/round.png)*</span>

The formula used in the Rounded Value column is:
```
mix_list_str = $Mix_Product.Lt_per_100_Lt
mix_list_float = [float(i) for i in mix_list_str]
x = [Lt * $Water/100 for Lt in mix_list_float]
round_x = [ROUND(num, 2) for num in x]
l = $Mix_Product.Product
' '.join('{} {}'.format(first, second) for first, second in zip(l, round_x))
```
Let's break this down.

`$Mix_Product` represents the Mix Product column, a reference list column that pulls data from the Product column of Table1. We can use this column as a link to Table1 to pull other data. `$Mix_Product.Lt_per_100_Lt` uses the reference list column, Mix Product, to pull values from the Lt per 100 Lt column of Table1 for the products listed in the Mix Product column of Table2 then assigns this list of values to the variable `mix_list_str`. This is the same formula used in the Lt per 100 Lt column of Table2 so you can see the value it returns in row 1 of Table2. It returns a list: `['0.2355', '1.2579']`. This list is evaluated as a string rather than numerical values. We need to convert each value in this list to a float.

In our next formula, `[float(i) for i in mix_list_str]`, we iterate through the list that was assigned in the first equation to `mix_list_str` and convert each value to a floating-point number. We want to convert to a float rather than integer because not all values are whole numbers and contain decimals. `i` is a variable representing each value. So each value in `mix_list_str` is evaluated in the equation `float(i)`. `float(0.2355)` converts `0.2355` to a float and `float(1.2579)` converts `1.2579` to a float. Now, we assign our list of floats to the variable `mix_list_float`.

We can now use our float values in a mathematical equation. Once again, we iterate through the list that was assigned to the variable `mix_list_float`. In our equation `[Lt * $Water/100 for Lt in mix_list_float]`, `Lt` represents each value in `mix_list_float` and `$Water` represents the value found in the Water column which is `1000`. We evaluate the equation `Lt * 1000/100` when `Lt = 0.2355` and `Lt = 1.2579` which returns the list `[2.355, 12.579]`. We assign this list to the variable `x`.

To round the values in `x` to two decimal places, we need to evaluate the equation `ROUND(num, 2)` where num represents each value in our list and 2 specifies the number of decimal places we want to round to. This returns the list `[2.36, 12.58]` which we assign to the variable round_x.

In the first equation, we used our reference list column, Mix Product, as our link to Table1 in order to pull data from Table1 into Table2. We use this method again in `$Mix_Product.Product` to pull data from the Product column of Table1. This returns a list of products; `[Prod A, Prod B]`. We assign this list to the variable `l`.

Finally, we use the [join()](https://www.w3schools.com/python/ref_string_join.asp) method to combine our two lists. `' '` is our starting (empty) string. We use Python's [format method](https://www.w3schools.com/python/ref_string_format.asp) to format our string. `{}` is a placeholder for each variable listed in `.format()`. Last, we use Python's [zip() function](https://www.w3schools.com/python/ref_func_zip.asp) to pair the first values from each list together and then pair the second values in each list together. `l` is assigned as our `first` list and `round_x` is assigned as our `second` list. `l = [Prod A, Prod B]` and `round_x = [2.36, 12.58]`. Zipping our lists into `'{} {}'.format(first, second)` gives us `Prod A 2.36` in our first iteration and `Prod B 12.58` in our second iteration. Our final return value is `Prod A 2.36 Prod B 12.58`.
</details>
</section>


<span></span><section class="cheat-sheet">
#### Specify Minimum Number of Digits

Allows you to specify the minimum number of digits returned in a numerical column by adding leading zeros. If x = 5, `str(x).zfill(3)` or `str('{:0>3}').format(x)` would return `005`.

<span></span><details><summary>
#### Example of Specifying Minimum Number of Digits
</summary>

**Community Example: [Using Row ID](https://public.getgrist.com/p4zvsX9asVCc/2179-Using-id/p/1)**

<span class="screenshot-large">*![min-digits](images/formula-cheat-sheet/min-digits.png)*</span>

The formula used in the 5-digit ID column of the ID Examples table is:
```
"TCH" + str('{:0>5}'.format($id))
```

`'{:0>5}'.format($id)` takes the unique row ID and formats it to be a minimum of 5 digits. `str()` converts this number to a string. We then add this string to our first string `"TCH"` to get our final value. If the `$id` is longer than 5 digits, the formula returns the string unmodified.

We can do the same thing using the [`str.zfill()`](https://docs.python.org/3/library/stdtypes.html#str.zfill) method.

<span class="screenshot-large">*![min-digits-zfill](images/formula-cheat-sheet/min-digits-zfill.png)*</span>

The formula used in the zfill Method column of the ID Examples table is:
```
str($id).zfill(5)
```
`str($id)` converts the row ID to a string. `.zfill(x)` returns a copy of the string with leading zeros to make a string of length `x`. In our example, it adds leading zeros to make the string 5 characters in length. Again, if the `$id` is longer than 5 digits, the formula returns the string unmodified. 

</details>

<span></span><details><summary>
#### Troubleshooting Errors
</summary>
`#TypeError`: can only concatenate str (not "int") to str

If you mean to use the row ID as a character rather than a numerical value, be sure to convert it to string using `str()`.


<span class="screenshot-large">*![string-type-error](images/formula-cheat-sheet/string-type-error.png)*</span>
{: .screenshot-half }

</details>
</section>

## Working with Strings

<span></span><section class="cheat-sheet">
#### Combining Text From Multiple Columns

**Method 1:** If you have a First Name column and a Last Name column, you can combine these columns to have a Full Name column. If First Name = `George` and Last Name = `Washington`, `$First_Name + " " + $Last_Name` would return `George Washington`.

**Method 2:** If you have additional formatting, an easier way to do this would be using Python's [String format() method](https://www.w3schools.com/python/ref_string_format.asp). The `format()` method formats the specified value(s) and inserts them inside the string's placeholder, `{}`. Using the same example as above, our formula would be `"{} {}".format($First_Name, $Last_Name)`.

Note: You can click on columns to insert them into your formulas, rather than typing them in.

<span></span><details><summary>
#### Examples of Method 1
</summary>
**[Class Enrollment](https://templates.getgrist.com/doc/afterschool-program) template**

<span class="screenshot-large">*![combining-text-students](images/formula-cheat-sheet/combining-text-students.png)*</span>

The formula used in the Full Name column of the Students table is:
```
$Last_Name + ", " + $First_Name
```
Here, we are combining the value found in the Last Name column with a comma followed by a space followed by the value from the First Name column. When adding any extra characters or spaces, place these between double quotes, as we did in the example with `", "`. 

An alternative combination of these columns for Full Name could be `$First_Name + " " + $Last_Name`. For the example in row 1, First Name is `Brockie` and Last Name is `Raddon` so the value returned would be `Brockie Raddon`.

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager) template**

<span class="screenshot-large">*![combining-text-sku](images/formula-cheat-sheet/combining-text-sku.png)*</span>

The formula used in the SKU column of the All Products table is:
```
$Brand.Brand_Code+"-"+$Color.Code+"-"+$Size
```
Brand is a reference column that pulls data from the Name Brand column of the Add Products table. We use this reference column in `$Brand.Brand_Code` to pull data from the Brand Code column of the Add Products table. 

Color is a reference column that pulls data from the Color column of the Color table. We use this reference column in `$Color.Code` to pull data from the Code column of the Color table. 

Each of the values found in `$Brand.Brand_Code` and `$Color.Code`are combined with the value in the Size column with a `-` between each of the three values to make up the SKU.
</details>

<span></span><details><summary>
#### Examples Method 2
</summary>
**[Tracking Time + Invoicing](https://templates.getgrist.com/bReAxyLmzmEQ/Tracking-Time-Invoicing) template**

<span class="screenshot-large">*![combining-text-project-name](images/formula-cheat-sheet/combining-text-project-name.png)*</span>

The formula used in the Project Name column of the Projects table is:
```
"{}: {}".format($Client.Name, $Name)
```
Let's break this down. 

Everything between double quotes `"` is our string. The curly brackets `{}` are placeholders for the values found using `.format()` which is Python's string format() method. 

The first set of curly brackets are replaced with the value found in `$Client.Name`. Client is a reference column that pulls data for a specific record from the Clients table. `$Client.Name` is using our reference column, Client to pull data from the Name column of the Clients table. 

The second set of curly brackets are replaced with the value found in the Name column of this table.

Although the Client column shows the value that we want, we can't use `$Client` like we did `$Name`. This is because the Client column is a reference column. It is referencing the <em>entire</em> record but uses the value from the Name column of the Clients table as a visual representation of that record. Under the column configuration panel on the right hand side, we can change what column value we see for the record. In the screenshot below, 'Show Column' was changed from Name to Email.

<span class="screenshot-large">*![reference-client-email](images/formula-cheat-sheet/reference-client-email.png)*</span>
{: .screenshot-half }

It doesn't change the data, it just changes the label on that data in the Client column. It's still pointing to the same record but now shows a different label. `$Client.Name` pulls the Name for the record that is referenced in the Client column, regardless of the label we see.

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder) template**

<span class="screenshot-large">*![combining-text-components](images/formula-cheat-sheet/combining-text-components.png)*</span>

The formula used in the All Components column of the CONTRACT_BUILDER Card is:
```
'\n'.join(sorted(
  "{} — {:g} {}".format(comp.Component, quantity, comp.Unit)
  for (comp, quantity) in $Components.items()
))
```
We are using the [join() method](https://www.w3schools.com/python/ref_string_join.asp), [sorted() function](https://www.w3schools.com/python/ref_func_sorted.asp) and [format() method](https://www.w3schools.com/python/ref_string_format.asp) method all in one!

`'\n'.join()` adds a new line between each item in the list.

`sorted()` sorts the items in the list alphabetically.

This leaves us with the following:

```
"{} — {:g} {}".format(comp.Component, quantity, comp.Unit)
  for (comp, quantity) in $Components.items()
```
We'll work through this backwards. First, we need to take a look at the Components column which is a [hidden column](https://support.getgrist.com/page-widgets/#configuring-field-lists) in the All Contracts table. 

<span class="screenshot-large">*![combining-text-components-hidden](images/formula-cheat-sheet/combining-text-components-hidden.png)*</span>

This column is a list of components and their associated quantities for the contract. In the `for` loop, we assign each item in the list of components two variables, comp and quantity. For `Components[3]: 6.0`, comp = `Components[3]` and quantity = `6.0`. `Components[#]` specifies a Component in the Components table by Row ID. `Components[3]` is the component assigned `3` as it's row id.

<span class="screenshot-large">*![components-row-id](images/formula-cheat-sheet/components-row-id.png)*</span>
{: .screenshot-half }

Now, we run each item from the list above through the equation `"{} — {:g} {}".format(comp.Component, quantity, comp.Unit)`.

`comp.Component` replaces the first set of `{}`. `comp` is the variable with our component ID so `comp.Component` finds the value in the Component column associated with that row ID. For `Components[3]`, `comp.Component` is Nozzle. 

`quantity` replaces the second set of `{}`. Again, the quantity is the second variable in our list. For `Components[3]: 6.0`, quantity is `6.0`. Our second set of `{}` are not empty. They include `:g`. This converts the value to a floating-point number. 

`comp.Unit` replaces the last set of `{}`. `comp` is the variable with our component ID so `comp.Unit` finds the value in the Unit column associated with that row ID. For `Components[3]`, `comp.Unit` is `None`.

**[Email Contacts](https://templates.getgrist.com/3HfynRQwpHPy/Email-Contacts) template**

<span class="screenshot-large">*![combining-text-email](images/formula-cheat-sheet/combining-text-email.png)*</span>

The formula used in the Body column of the Advanced Compose table is:
```
"Dear %s,\n\nWelcome to the %s team!" % ($Contact_Name_as_Plaintext, $Team)
```
This technique uses the `%` operator instead of the `format()` method. Format specifiers begin with `%` followed by a character that represents the data type. `%s` is a placeholder for a string. The first `%s` is replaced with the value found in the Contact Name as Plaintext column which is a [hidden column](https://support.getgrist.com/page-widgets/#configuring-field-lists) and the second `%s` is replaced by the value in the Team column.

`\n` adds a new line.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Splitting Strings of Text

Split a string using Python's [split()](https://docs.python.org/3/library/stdtypes.html#str.split) method. If Full Name = `George Washington`, `$Full_Name.split(" ")` would return `[George, Washington]`.

<span></span><details><summary>
#### Example of Simple Math
</summary>

**Community Example: [Colors](https://public.getgrist.com/2tv3e8qxpNFP/Community-715/p/2)**

<span class="screenshot-large">*![split-hyperlink](images/formula-cheat-sheet/split-hyperlink.png)*</span>

The formula in the Color Reference (Just URL) column of Table 2 is:
```
split = $Color_Reference.Color.split(" ")
return split[-1]
```
`$Color_Reference.Color` uses the reference column, Color Reference to pull data from the table it is referencing, Table 1. Specifically, it pulls the value from the Color column of Table 1. 

Color is a text column that contains a hyperlink with a label. We only see the label in Table 1 but as you can see in the screenshot above, pink is expanded to show the entire string which contains "Pink"" followed by the URL. You can also see this in the Color Reference Column of Table 2. We want to get the link by itself in Color Reference (Just URL). We can do this using Python's [split()](https://docs.python.org/3/library/stdtypes.html#str.split) method.

`.split(" ")` allows us to split the string anywhere there is a space `(" ")`. In the Color column, there is a label followed by a space followed by the URL. The value from the Color column is split into a list containing two items `Label` and `URL`. This list is assigned to the variable `split`. 

We want to return the last item in the list `split` in order to get our `URL`. The last item in a list always has index `[-1]`. `return split[-1]` returns the last item in the list `split`. 

Alternatively, `URL` could be considered the second item in the list. The first item in a list has index `[0]` therefore `URL` would have index `[1]` and we could change our final line to `return split [1]` to get the same value.
</details>
</section>


<span></span><section class="cheat-sheet">
#### Direct Link to Gmail History for a Contact

If you store contacts in Grist, and use Gmail to email them, you can create a formula that will open Gmail to a list of conversations with that contact. 

**Read about it in the Community:** [Pull up Gmail history for a particular contact](https://community.getgrist.com/t/pull-up-gmail-history-for-a-particular-contact/517)

<span></span><details><summary>
#### Troubleshooting
</summary>
Is your URL still showing after you added a label? Make sure your Column Type is Text and Cell Format is Hyperlink.

<span class="screenshot-large">*![text-hyperlink](images/formula-cheat-sheet/text-hyperlink.png)*</span>

</details>
</section>


<span></span><section class="cheat-sheet">
#### Joining Values Between Two Lists

When you want to join information from a reference list, you can use Python's [join() method](https://www.w3schools.com/python/ref_string_join.asp).

<span></span><details><summary>
#### Examples of Joining Lists
</summary>
**Community Example: [Sum Reference list](https://community.getgrist.com/t/sum-reference-list/665)**

<span class="screenshot-large">*![joining-lists-mix-product](images/formula-cheat-sheet/joining-lists-mix-product.png)*</span>

The formula used in the Total Prod column of Table2 is:
```
mix_list_str = $Mix_Product.Lt_per_100_Lt
mix_list_float = [float(i) for i in mix_list_str]
x = [Lt * $Water/100 for Lt in mix_list_float]
l = $Mix_Product.Product
' '.join('{} {}'.format(first, second) for first, second in zip(l, x))
```
Let's break this down.

`$Mix_Product` represents the Mix Product column, a reference list column that pulls data from the Product column of Table1. We can use this column as a link to Table1 to pull other data. `$Mix_Product.Lt_per_100_Lt` uses the reference list column, Mix Product, to pull values from the Lt per 100 Lt column of Table1 for the products listed in the Mix Product column of Table2 then assigns this list of values to the variable `mix_list_str`. This is the same formula used in the Lt per 100 Lt column of Table2 so you can see the value it returns in row 1 of Table2. It returns a list: `['0.5', '1']`. This list is evaluated as a string rather than numerical values. We need to convert each value in this list to a float.

In our next formula, `[float(i) for i in mix_list_str]`, we iterate through the list that was assigned in the first equation to `mix_list_str` and convert each value to a floating-point number. We want to convert to a float rather than integer because not all values are whole numbers and contain decimals. `i` is a variable representing each value. So each value in `mix_list_str` is evaluated in the equation `float(i)`. `float(0.5)` converts `0.5` to a float and `float(1)` converts `1` to a float. Now, we assign our list of floats to the variable `mix_list_float`.

We can now use our float values in a mathematical equation. Once again, we iterate through the list that was assigned to the variable `mix_list_float`. In our equation `[Lt * $Water/100 for Lt in mix_list_float]`, `Lt` represents each value in `mix_list_float` and `$Water` represents the value found in the Water column which is `1000`. We evaluate the equation `Lt * 1000/100` when `Lt = 0.5` and `Lt = 1` which returns the list `[5.0, 10.0]`. We assign this list to the variable `x`.

In the first equation, we used our reference list column, Mix Product, as our link to Table1 in order to pull data from Table1 into Table2. We use this method again in `$Mix_Product.Product` to pull data from the Product column of Table1. This returns a list of products; `[Prod A, Prod B]`. We assign this list to the variable `l`.

Finally, we use the [join()](https://www.w3schools.com/python/ref_string_join.asp) method to combine our two lists, `[5.0, 10.0]` and `[Prod A, Prod B]`. `' '` is our starting (empty) string. We use Python's [format method](https://www.w3schools.com/python/ref_string_format.asp) to format our string. `{}` is a placeholder for each variable listed in `.format()`. Last, we use Python's [zip() function](https://www.w3schools.com/python/ref_func_zip.asp) to pair the first values from each list together and then pair the second values in each list together. `l` is assigned as our `first` list and `x` is assigned as our `second` list. `l = [Prod A, Prod B]` and `x = [5.0, 10.0]`. Zipping our lists into `'{} {}'.format(first, second)` gives us `Prod A 5.0` in our first iteration and `Prod B 10.0` in our second iteration. Our final return value is `Prod A 5.0 Prod B 10.0`.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Finding Duplicates

You can find duplicates in a single column or across multiple columns either using conditional formatting or with a helper column.

**Read about it in the Community:** [Ensure unique values or detect duplicates](https://community.getgrist.com/t/ensure-unique-values-or-detect-duplicates/76)

<span></span><details><summary>
#### Finding Duplicates in a Single Column
</summary>
**Community Example: [Finding Duplicates in a Single Column](https://public.getgrist.com/3CJkcpF7wu9Q/-1790/p/4)**

#### Find Duplicates in a Single Column Using Conditional Formatting
<span class="screenshot-large">*![duplicates-single-conditional-formatting](images/formula-cheat-sheet/duplicates-single-conditional-formatting.png)*</span>

The conditional formula used in the Grocery List column of the Duplicates in a Single Column table is:
```
len(Duplicates_in_a_Single_Column.lookupRecords(Grocery_List=$Grocery_List))>1
```

Let's break this down, working from the inside > out.
```
Duplicates_in_a_Single_Column.lookupRecords(Grocery_List=$Grocery_List)
```
This is a lookupRecords function that follows the format of: 
```
[Table_Name].lookupRecords([A]=$[B])
``` 
Where `[Table_Name]` is the name of the table you want to lookup data in. `[A]` is the column in the table being looked up (named at the beginning of the formula) and `[B]` is the column in the current table / the table you are entering the formula in.

This formula looks up records in the Duplicates In a Single Column table where a record in the Grocery List column matches another record in the same column.

`len()` counts the number of records in our list. Since each duplicate will match with the other, it should appear twice in our list. This is why `len() > 1`.

If `len() > 1`, our formula is true and the conditional cell color is applied to these cells. 

If `len() <= 1`, our formula is false and the cell color is unchanged.

#### Find Duplicates in a Single Column Using a Helper Column
<span class="screenshot-large">*![duplicates-single-column](images/formula-cheat-sheet/duplicates-single-column.png)*</span>

The formula used in the Duplicate? column of the Duplicates in a Single Column table is:

```
if len(Duplicates_in_a_Single_Column.lookupRecords(Grocery_List=$Grocery_List))>1:
  return "True"
else:
  return ""
```

Another way this could be written is:

```
"True" if len(Duplicates_in_a_Single_Column.lookupRecords(Grocery_List=$Grocery_List))>1 else ""
```
This is the format used in the Community post linked above this example.

Most of this formula is familiar as we used in the conditional formatting example above. First, we lookup all records in the Grocery List column of the Duplicates in a Single Column table. `len()` counts the records in the list. If the count is greater than 1, duplicates exist and our formula returns `"True"`. If it's less than or equal to 1, the formula returns `""` which returns a blank value.

</details>

<span></span><details><summary>
#### Finding Duplicates Across Multiple Columns
</summary>
**Community Example: [Finding Duplicates Across Multiple Columns](https://public.getgrist.com/3CJkcpF7wu9Q/-1790/p/3)**

#### Find Duplicates Across Multiple Columns Using Conditional Formatting
<span class="screenshot-large">*![duplicates-multiple-conditional-formatting](images/formula-cheat-sheet/duplicates-multiple-conditional-formatting.png)*</span>

The first conditional formula in the Grocery List column of the Duplicates Across Multiple Columns table is:
```
len(Duplicates_Across_Multiple_Columns.lookupRecords(Grocery_List=$Grocery_List))>1
```
We walked through this formula in the conditional formatting example in [Finding Duplicates in a Single Column](#find-duplicates-in-a-single-column-using-conditional-formatting). 

When this formula is true, the cell color is orange. We can see that `Eggs` appears twice in the Grocery List column.

The second conditional formula in the Grocery List column is:
```
len(Duplicates_Across_Multiple_Columns.lookupRecords(Kitchen_Inventory=$Grocery_List))>0
```
This formula is similar to our first formula. Before, we compared values within the same column. This time, we are comparing values in different columns. 

The order of comparison is important within this formula. 

The formula for [lookupRecords](references-lookups.md/#lookuprecords) follows the format:
```
[Table_Name].lookupRecords([A]=$[B])
```
[Table_Name] is the name of the table you want to lookup data in. [A] is the column in the table being looked up and **[B] is the column you are entering the formula in**. We are entering this formula in the Grocery List column so [B] must be Grocery List.

`len()` counts how many records are found in our lookupRecords formula. Because records only count when they match with another, our formula is `True` if `len() > 0` and our cells become red. If no match is found, our formula is false and the cell is unchanged.

The first formula for the Kitchen Inventory column is:
```
len(Duplicates_Across_Multiple_Columns.lookupRecords(Kitchen_Inventory=$Kitchen_Inventory))>1
```
This formula is finding duplicates within the Kitchen Inventory column. If duplicates exist, the cell color would be orange. 

The second formula for the Kitchen Inventory column is:
```
len(Duplicates_Across_Multiple_Columns.lookupRecords(Grocery_List=$Kitchen_Inventory))>0
```
This formula looks up records that match between the Grocery List and Kitchen Inventory columns. 

Again, the format for lookupRecords is `[Table_Name].lookupRecords([A]=$[B])` and **[B] is the column you are entering the formula in**.

You'll notice that `Butter` is a duplicate within the Kitchen Inventory column but the cell is red, not orange. Conditional formatting runs top to bottom. First, we check for duplicates within the column and because `butter` has a duplicate, it becomes orange. Then, we check for duplicates across both columns and because `butter` is also a duplicate here, it then becomes red.

#### Find Duplicates Across Multiple Columns Using a Helper Column
<span class="screenshot-large">*![duplicates-multiple-columns](images/formula-cheat-sheet/duplicates-multiple-columns.png)*</span>

The formula used in the Duplicates Across Columns? column of the Duplicates Across Multiple Columns table is:

```
"True" if len(Duplicates_Across_Multiple_Columns.lookupRecords(Grocery_List=$Kitchen_Inventory)) or len(Duplicates_Across_Multiple_Columns.lookupRecords(Kitchen_Inventory=$Grocery_List))>0 else ""
```

This is quite lengthy. Let's break it down.

`"True" if [...] > 0 else ""`. The formula will return `"True"` if everything within `[...]` is found to be greater than zero. If less than or equal to zero, the formula will return `""` which returns a blank value. Next, we'll discuss everything in the middle.

`Duplicates_Across_Multiple_Columns.lookupRecords(Grocery_List=$Kitchen_Inventory)` looks ups records in the Duplicates Across Multiple Columns table where a value in the Grocery List column matches a value in the Kitchen Inventory column. 

`len()` counts the number of records in that list.

Next, `Duplicates_Across_Multiple_Columns.lookupRecords(Kitchen_Inventory=$Grocery_List)` looks up records in the Duplicates Across Multiple Columns table where a value in the Kitchen Inventory column matches a value in the Grocery List column.

`len()` counts the number of records in that list.

Now, if either of these lookups return more than zero records, the statement is found to be true so the formula returns `"True"`. If zero records are found, the statement is found to be false and the formula returns `""`.

We have to [lookupRecords](https://support.getgrist.com/functions/#lookuprecords) in both directions (`Grocery_List=$Kitchen_Inventory` and `Kitchen_Inventory=$Grocery_List`) so each duplicate gets marked. For example, if we only looked up records using `Grocery_List=$Kitchen_Inventory`, only the `Milk` value in the Kitchen Inventory column would be marked as a duplicate. We need to look up records in the other direction so the `Milk` value in the Grocery List column gets marked as a duplicate as well. 

Remember, this formula only checks for duplicates across the columns. It does not check for duplicates within each of the columns. We can add to this formula to check for all duplicates.

The formula used in the ALL DUPLICATES column of the Duplicates Across Multiple Columns table is:

```
if len(Duplicates_Across_Multiple_Columns.lookupRecords(Kitchen_Inventory=$Kitchen_Inventory))>1:
  return "DUP in Kitchen Inventory"
elif len(Duplicates_Across_Multiple_Columns.lookupRecords(Grocery_List=$Grocery_List))>1:
  return "DUP in Grocery List"
elif len(Duplicates_Across_Multiple_Columns.lookupRecords(Grocery_List=$Kitchen_Inventory)) or len(Duplicates_Across_Multiple_Columns.lookupRecords(Kitchen_Inventory=$Grocery_List))>0:
    return "DUP"
else:
  return ""
```

The `if` and first `elif` statments are the same equations we saw in our [Finding Duplicates in a Single Column](#find-duplicates-in-a-single-column-using-using-a-helper-column) example.

The `if` statement looks up records in the Duplicates Across Multiple Columns table where a record in the Kitchen Inventory column matches another record in the same column. `len()` counts the number of records in this list. If `len() > 1`, our formula is found to be true and returns `"DUP in Kitchen Inventory"`.

The first `elif` statement looks up records in the Duplicates Across Multiple Columns table where a record in the Grocery List column matches another record in the same column. `len()` counts the number of records in this list. If `len() > 1`, our formula is found to be true and returns `"DUP in Grocery List"`.

Since each duplicate will match with the other, it should appear twice in our list. This is why `len() > 1` for the two equations above.

The second `elif` statement is the same equation used in the Duplicates Across Columns? column, discussed above. This formula looks ups records in the Duplicates Across Multiple Columns table where a value in the Grocery List column matches a value in the Kitchen Inventory column or vice versa. `len()` counts the number of records in that list. If `len() > 0`, our formula is found to be true and returns `"DUP"`.

If all statements are found to be false, our formula returns our `else` statement, `""` which we see as a blank entry.

Keep in mind that the formula runs top to bottom so once a statement is found to be true for a value, it moves to the next value in the list. For example, row 5 `Butter` returns `DUP in Kitchen Inventory` but is also a duplicate across columns and could return `DUP`. Because the formula checks for duplicates within the column first, it returns `DUP in Kitchen Inventory`. Row 7 `Butter` returns `DUP` because there are no duplicate values for `Butter` in the Grocery List column. The first two statments are found to be false then the third statement is found to be true and returns `DUP`. 

</details>

<span></span><details><summary>
#### Alternative Method to Finding Duplicates
</summary>
An alternative method to finding duplicates is to use a helper table. In this example, your helper table will tell you how many of each item is listed. The result from the helper table will be used in your formula for duplicates.

<span class="screenshot-large">*![duplicates-alternate-method](images/formula-cheat-sheet/duplicates-alternate-method.png)*</span>

The formula used in the Items column of the Helper Table is:
```
from collections import Counter
c = Counter()
c.update(Alternate_Method.all.Grocery_List)
c.update(Alternate_Method.all.Kitchen_Inventory)
return c
```

First, we import the [Counter](https://docs.python.org/3/library/collections.html#collections.Counter) subclass from the [collections](https://docs.python.org/3/library/collections.html#module-collections) class.

We create a new, empty [counter](https://docs.python.org/3/library/collections.html#collections.Counter) using `c = Counter()`.

We use the [update()](https://docs.python.org/3/library/collections.html#collections.Counter) method to count the elements in our two lists, `Alternate_Method.all.Grocery_List` which counts all elements in the Grocery List column of the Alternate Method table and `Alternate_Method.all.Kitchen_Inventory` which counts all elements in the Kitchen Inventory column of the Alternate Method table.

`return c` returns the counts of all elements in both the Grocery List and Kitchen Inventory columns of the Alternate Method table. This is the final value you see in row 1 of the Items column of the Helper Table - a list that includes the label of each element and the total count for each element.

Now we can use this value in the formula for the Duplicate? column of the Alternate Method table:

```
counters = Helper_Table.lookupOne().Items
dups = counters.get($Grocery_List, 0) + counters.get($Kitchen_Inventory, 0) > 2
"DUP" if dups else ""
```

`Helper_Table.lookupOne().Items` looks up the first record in the Items column of the Helper Table. The first record also happens to be our only record. We assign this record to the variable `counters`.

`counters.get($Grocery_List, 0) + counters.get($Kitchen_Inventory, 0)` uses Python's [get()](https://www.w3schools.com/python/ref_dictionary_get.asp) method to get the counts for the values in the Grocery List and Kitchen Inventory columns for each row. If the total across the row is greater than 2, `dups` is found to be True. For example, in row 1, we have `Milk` in the Grocery List column and `Deli Ham` in the Kitchen Inventory column. Milk has a count of 2 in the Items column of the Helper Table and Deli Ham has a count of 1. When we add these two values together, we get 3 which is greater than 2 and `dups` is found to be True.

<span class="screenshot-large">*![duplicates-alternate-get](images/formula-cheat-sheet/duplicates-alternate-get.png)*</span>

`"DUP" if dups else ""` returns `"DUP"` if `dups` is found to be True. If `dups` is found to be false, it returns `""` which returns a blank value. In our example with Milk and Deli Ham, `dups` is found to be True and `"DUP"` is returned in the Duplicate? column.
</details>
</section>



<span></span><section class="cheat-sheet">
#### Using a Record's Unique Identifier in Formulas

When a record is created, it is assigned a numeric id (available as `$id` in formulas) that is unique within that table. You can reveal the row ID by adding a formula column where the formula is `$id`{: .formula}.

<span></span><details><summary>
#### Examples Using Row ID in Formulas
</summary>
You can reveal the ID with the formula `$id`

<span class="screenshot-large">*![row-id](images/formula-cheat-sheet/row-id.png)*</span>
{: .screenshot-half }

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder) template**

<span class="screenshot-large">*![row-id-trigger](images/formula-cheat-sheet/row-id-trigger.png)*</span>

The formula used in the Contract No. column of the Contract Builder table is:
```
$id + 500
```
Here, we are using a trigger formula to create a unique Contract Number when a record is created.

**[Class Enrollment](https://templates.getgrist.com/doc/afterschool-program) template**

<span class="screenshot-large">*![id-reverse-lookup](images/formula-cheat-sheet/id-reverse-lookup.png)*</span>

The formula used in the Count column of the Classes table is:
```
len(Enrollments.lookupRecords(Class=$id, Status="Confirmed"))
```
This is refered to as a Reverse Lookup. We can use the row id to match a record in another table where a reference column is used. LookupRecords follows the format `[Table_Name].lookupRecords([A]=$[B])`. `[Table_Name]` is the name of the table you want to lookup data in. `[A]` is the column in the table being looked up (named at the beginning of the formula) and `[B]` is the column in the current table / the table you are entering the formula in. Lookup Records creates a list of records that match the criteria listed. `len()` counts how many records are in that list.

Here, we are looking up records from the Enrollments table where the record called out in the Class column (our reference column) has the same row ID as the row in the table you are entering the formula. Additionally, the value in the Status column of the Enrollments table is `Confirmed`. We'll walk through this.

The table we are looking up records in is the Enrollments table. Our criteria comes from the Class column and the Status column.The criteria for Status is straightforward; the value must be `Confirmed` in order to be included in our list of records. Class is a bit more complicated. As we see in the screenshot below, Class is a reference column that pulls data from the Classes table. Here, the Class column shows `2018F-Stars`.

<span class="screenshot-large">*![id-reference-class-code](images/formula-cheat-sheet/id-reference-class-code.png)*</span>

A reference column points to the <em>entire</em> record, not just the value you see here in the Class column. Using the configuration panel on the right hand side of the screen, you can pick any column from the originating table to show. For this example, the Class column shows the value from the Class Code column of the Classes table but it points to the entire record where the class code is `2018F-Stars`. 

<span class="screenshot-large">*![id-class-id](images/formula-cheat-sheet/id-class-id.png)*</span>

As you can see in this screenshot, the Row ID for this particular record is `1` and because we are calculating the Count for the row with `Row ID = 1`, it will count all records in the Enrollment table where Class shows `2018F-Stars` and Status is `Confirmed`. 
</details>
</section>


<span></span><section class="cheat-sheet">
#### Removing Duplicates From a List

You can remove duplicates from a list with help from Python's [append()](https://docs.python.org/3/tutorial/datastructures.html) method.

<span></span><details><summary>
#### Example of Removing Duplicates from a List
</summary>

**Community Example: [Removing Duplicates From a List](https://public.getgrist.com/3pZUMdP2bJx6/1957/p/3)**

<span class="screenshot-large">*![removing-duplicates](images/formula-cheat-sheet/removing-duplicates.png)*</span>

The formula in the All Divisions column of the Abroad Trips table is:
```
confirmed_div = $Attending_Confirmed.Role_Division
pending_div = $Attending_Pending.Role_Division
full_list = confirmed_div + pending_div
result = []
[result.append(div) for div in full_list if div not in result]
return sorted(result)
```
We will walk through this one line at a time.

Attending-Confirmed is a Reference List column that pulls data from the EMPLOYEES table. `$Attending_Confirmed.Role_Division` pulls the value from the Role Division column of the EMPLOYEES table for each employee listed in the Attending-Confirmed column, creating a list. We assign this list of role divisions to the variable `confirmed_div`.

Attending-Pending is also a Reference List column that pulls data from the EMPLOYEES table. `$Attending_Pending.Role_Division` does the same as above except now we pull the role division for each employee in the Attending-Pending column. We assign this list to the variable `pending_div`.

We create a list of all role divisions by adding the two lists together and assigning this combined list to the variable `full_list`.

`result=[]` creates an empty list, assigned to the variable `result`.

Our `for` loop appends (adds) each `div` to our list `result` as it iterates through our list `full_list` if the `div` is not already in `result`. For example, if our list is `[Div A, Div C, Div A, Div D]`, it would add the first two items from the list then when it gets to the third item in the list, `Div A`, it would recognize that `Div A` has already been added to `result` and skips to the next item in the list, `Div D`.

Note that `div` is a variable that represents each item in our list. In our case, it represents each role division. This variable can be named anything as long as it remains contstant throughout the `for` loop. 

`return sorted(result)` uses the [sorted()](https://docs.python.org/3/library/functions.html#sorted) method to return our appended list `result`, sorted alphabetically.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Setting Default Values for New Records

You can set default values for when a new record is created and save yourself the trouble of having to fill in the same fields with the same values time after time.

**Read about it in the Community:** [Default values on the widget](https://community.getgrist.com/t/default-values-on-the-widget/689/4)

</section>

## Working with dates and times

<span></span><section class="cheat-sheet">
#### Automatic Date, Time and Author Stamps

You can automatically add the date or time a record was created or updated as well as who made the change.

<span></span><details><summary>
#### Examples of Automatic Date, Time and Author Stamps
</summary>
**[Grant Application Tracker](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker) template**

<span class="screenshot-large">*![date-time-trigger-formula](images/formula-cheat-sheet/date-time-trigger-formula.png)*</span>

The formula used in the Last Updated column of the Tasks table is:
```
NOW()
```
This is a [trigger formula](https://support.getgrist.com/formulas/#trigger-formulas) that triggers when a change is made to any field for this record. When a change is made, this formula runs its calculation. `NOW()` calculates the current time and date for the [time zone](https://support.getgrist.com/dates/#time-zones) selected. 

<span class="screenshot-large">*![created-by-trigger](images/formula-cheat-sheet/created-by-trigger.png)*</span>

The formula used in the Created By column of the Tasks table is:
```
user.Name
```
This is a [trigger formula](https://support.getgrist.com/formulas/#trigger-formulas) that triggers when a new record is created. When the record is created, this formula runs its calculation. `user.Name` looks up the user account that is logged into Grist and returns the name associated with that account. 

</details>

<span></span><details><summary>
#### Troubleshooting Errors
</summary>
If the time value in your datetime column is not calculating, check your formula. If `TODAY()` is used in DateTime, the time will always show 12:00am as you see below. `NOW()` is used for DateTime columns. `TODAY()` is used for Date.

<span class="screenshot-large">*![today-vs-now-error](images/formula-cheat-sheet/today-vs-now-error.png)*</span>

<span></span><div class="deflist">

- `#AttributeError`

    You have likely entered `user.name` but the formula is `user.Name`. Keep an eye on capitalization!

- `#NameError`

    You may have entered `username` or `userName`. The correct formula is `user.Name`. 

Another possibility is that this was entered in as a Formula column rather than a trigger formula column. Convert it to a trigger formula and this should resolve the problem.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Filtering Data within a Specified Amount of Time

Using the [`EDATE()`](https://support.getgrist.com/functions/#edate) function and [comparision operators](#comparing-values), you can determine if a date falls within a specific range then apply a filter.

<span></span><details><summary>
#### Example Filtering Data that 'Falls in 1 Month Range`
</summary>
**Community Example:** [Filtering Data Within a 1-Month Range](https://public.getgrist.com/4zxVeFtGNt7n/1844)
<span class="screenshot-large">*![1-month-range](images/formula-cheat-sheet/1-month-range.png)*</span>
The formula used in the Falls in 1 Month Range? column of the Interactions table is:
```
TODAY() >= $Date >=  EDATE(TODAY(),-1)
```
[`TODAY()`](https://support.getgrist.com/functions/#today) returns the current date. 

`$Date` is the name of a column in our table, which is a [Date](https://support.getgrist.com/col-types/#date-columns) type column.

[`EDATE(start_date, months)`](https://support.getgrist.com/functions/#edate) returns the date that is the given number of months before or after the `start_date`. In this example, it returns the date that is one month prior to the start date, `TODAY()`.

This formula is true if the date value in the Date column falls between `TODAY()` and our `EDATE()` which is one month ago. If the date value in the Date column does not fall between these two dates, the formula returns false.

We can use this column to filter our data. If we only want to see interactions that fall within the 1 Month Range, we would filter to only include `true` values. If we want to see interactions that fall outside of the 1 Month Range, we would filter to only include `false` values.

<span class="screenshot-large">*![add-filter](images/formula-cheat-sheet/add-filter.png)*</span>

</details>

<span></span><details><summary>
#### Troubleshooting Errors
</summary>

<span></span><div class="deflist">

- `#TypeError`:

    <span class="screenshot-large">*![1-month-range-type-error](images/formula-cheat-sheet/1-month-range-type-error.png)*</span>

    Because `$Date` is a [Date](https://support.getgrist.com/col-types/#date-columns) type column, `TODAY()` must be used in formulas comparing dates. [`NOW()`](https://support.getgrist.com/functions/#now) is a DateTime formula that should only be used with other DateTime values. For example, if the `$Date` column was a [DateTime](https://support.getgrist.com/col-types/#datetime-columns) type column, `NOW()` would need to be used rather than `TODAY()` because it includes the time component.

    `NOW()` is date and time. `TODAY()` is only date.
</div>

</details>
