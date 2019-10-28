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
