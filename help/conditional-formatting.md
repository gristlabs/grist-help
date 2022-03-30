Conditional Formatting
======================

Cell style can change based on conditional rules. Conditional rules are written as formulas. Conditional formatting applies to the entire column. To add conditional formatting to a particular column, go to the `Cell Style` section of the [creator panel](glossary.md#creator-panel) and click on `Add conditional style`.

![Add conditional style](../images/columns/add-conditional-style.png)
{: .screenshot-half }

In this example, we have a list dog breeders who have raised champion thoroughbreds. Let's apply conditional formatting to the Breeder column based on the number of champion dogs. We would like to highlight in gold any breeders with more than 2 champions.

![Writing conditional rules](../images/columns/first-conditional-rule.png)

We would also like to highlight breeders with 1 or 2 champion dogs in blue, and 0 champion dogs in brown. Click `Add another rule` to add more conditional styles. 

![Multiple conditional rules](../images/columns/multiple-conditional-rules.PNG)

Note that Grist applies the rules in order. What would happen if we swapped the last two rules? 

![Conditional rules order](../images/columns/conditional-rules-order.PNG)

Notice that Gen Hamamoto, who has 0 champion dogs, is not highlighted in brown. This is because after applying the second conditional style, `$Number_of_Champions == 0`, Grist applied the third, `$Number_of_Champions <= 2`, which applies to Gen Hamamoto as well and shades him blue. 