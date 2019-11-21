# Column Transformations {: data-toc-label='' }

Grist offers two ways to transform all values in a column. One is to change the type of the
column, and the other is to apply a formula-based transformation.

## Type conversions

When converting between different column types, Grist has sensible default behavior,
but makes that behavior easy to revise. For example, suppose you have a column of integers.
To convert that column to text, open the column options as described in
[Specifying a type](col-types.md#specifying-a-type), and find the column type section.
Change the column type to text in the dropdown.  You'll notice that a
"cancel/revise/apply" dialog opens beside the dropdown.

*![Tally to text](images/columns/columns-tally-convert.png)*
{: .screenshot-half }

To change how the conversion is done, click `Revise`.  You'll see
a formula box with the default conversion method,
`grist.Text.typeConvert($tally)`.  This means "do default conversion
to text for the `tally` column".  you can replace this with any formula you
like.  For example:

*![Tally to lines](images/columns/columns-tally-convert-lines.png)*
{: .screenshot-half }

Code for converting to unicode tally lines is left as an exercise to
the reader.  To preview the results of the conversion, click "preview".
When you are satisfied with the conversion, click "apply".  To abandon
the conversion, click "cancel".

## Formula-based transforms

Spreadsheets are convenient tools for cleaning up data using [formulas](formulas.md).
For example, imagine you had zip codes that have lost leading zeros - you can easily
reformat them with a quick formula:

![Motivating transformations](images/columns/columns-zip-columns.png)

We could now [freeze the results](formulas.md#freeze-a-formula-column) and delete the
original data if we don't need it anymore.

If you know you're going to throw away the original data like this,
Grist offers column transformations as a faster way to systematically
modify all cells of a column. Find the "Transform" section
at the bottom of the column options side panel (see [Columns](col-types.md) for
how to open this panel).

![Column transformations](images/columns/columns-transformer.png)

When you click the orange "lightning" button, Grist prompts you with a formula,
`return $zip` in this case.  You can edit this formula to make some change to
the selected column.  For example `return $zip + 1` would add one to the zip code.
You can preview the effect your formula would have, and when you are happy, hit
"Apply".  In our case, where we want to add leading zeros, we'll need to first
change our column type to be `Text` (assuming it is currently `Integer` - if it
`Numeric` convert to `Integer` first and then to `Text` to avoid decimal points).
Once done, we can use our formula for adding leading zeros:

![Column transformation preview](images/columns/columns-transformer-preview.png)

When happy, press "Apply" to replace the cell values with their new versions.
Likewise, the `response` column could be transformed with the formula into true/false
values with `$response[0] == 'y'`, and then set as a [toggle column](col-types.md#toggle-columns).
