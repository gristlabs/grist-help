# Access Rules to Restrict Duplicate Records

Suppose we have a table listing airports, and we want to
forbid entry of a new record with the same airport code as an existing
one.  In the table, we can add a formula `Count` that counts how many
records have the same code as each other:

![Airport table](images/2023-01-acl-memo/access-rules-dupe-setup.png)

Now, we can add an access rule to forbid any record update or creation that would
result in a `Count` above one.  We can also include a memo to explain the problem:

![Duplicate rule](images/2023-01-acl-memo/access-rules-dupe-rule.png)

Now if we try to add a new row with an existing code, we get a helpful error:

![Duplicate error](images/2023-01-acl-memo/access-rules-dupe-forbidden.png)

See [Access rule conditions](access-rules.md#access-rule-conditions) for details
on the restrictions on condition formulas, and
[Formulas](formulas.md) for details on regular full-powered formulas.
