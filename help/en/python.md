Python
-------

Grist formulas are written in Python, the most popular language for data science.
The entirety of [Python's standard library](https://docs.python.org/3/library/) is available
to you. For those with a spreadsheet background, we've also added a suite of Excel-like
functions, with all-uppercase names. Here's the [full list of functions](functions.md).
Python formulas are evaluated in a sandbox, without internet access, and without a
persistent filesystem.

## Supported Python versions

We currently support two versions of Python:

 * Python 3 (specifically 3.11 at the time of writing)
 * Python 2 (specifically 2.7)

Newly created documents on our hosted service use Python 3 by default, while older documents
(created before November 2021 approximately) use Python 2 by default. To tell which version of Python
a specific document uses, look at its [Document Settings](creating-doc.md#document-settings).
The `Engine` setting may be `python2`, `python3`, or blank.
A blank setting implies `python2`.

If you have editing rights on a document, you can change the `Engine` setting,
and the document will then reload with all formulas now interpreted using the
version of Python you have specified. We recommend caution in doing so.
A formula that works as intended in one version of Python may give errors
in another, or (worse) give the wrong results.

!!! warning "Some formulas may fail or give wrong results if used with a version of Python that is different from the one for which they were written."

Python 2 reached its end of life in January 2020, so if you look online for python help,
the answers you find are more and more likely to be for Python 3. If you have a document
that uses Python 2, and you'd like to switch it to use Python 3, we recommend reading
[Testing the effect of changing Python versions](python.md#testing-the-effect-of-changing-python-versions)
and [Differences between Python versions](python.md#differences-between-python-versions).
Be sure to check all tables and columns, and both regular formalas and trigger formulas.
We'd be interested to hear your experience, and to help with any problems,
on the [community forum](https://community.getgrist.com/).

Self-hosted Grist may use any version of Python you configure it with, but bear in
mind we actively test only the supported versions.

## Testing the effect of changing Python versions

Grist has some features that can help you evaluate the consequences of changing the
Python version a document uses.

 * The [Work on a Copy](copying-docs.md#trying-out-changes) feature is useful to
   experiment with changing the Python version without affecting your document until
   you are ready. There is a "Compare with original" option that will let you
   visualize which cells changed, if any. Be sure to look at all tables and columns.
 * The [Activity tab of Document History](document-history.md#activity)
   (with "All Tables" selected) lets you review in more detail what has
   changed.
 * Be careful to test any [trigger formulas](formulas.md#trigger-formulas) you may
   have, since the Python code in them won't be exercised until you specifically
   trigger these formulas.
 * You can use the [code viewer](formulas.md#code-viewer) to quickly remind yourself
   of all formulas in a document, so you can systematically check them all.

## Differences between Python versions

There are important differences between Python 2 and 3. Formulas may need
to be changed in order to give the same results when switching between Python
versions. There are many online resources such as this
[compatibility cheatsheet](https://python-future.org/compatible_idioms.html)
which can help figure out what the issue is when you hit a difference, and
get ideas on how to resolve it. Here, we list common cases we've
seen in Grist formulas.

### Division of whole numbers

In Python 2, dividing whole numbers gives a whole number, so `9 / 2` is `4`.
In Python 3, it is `4.5`. For a spreadsheet, this is a much more sensible answer,
but if you rely on the Python 2 behavior, we suggest you switch to the `//` operator
which is consistent between versions (`9 // 2` is `4` for both).

For example the [General Ledger](https://templates.getgrist.com/2YwYBWpREY2a/General-Ledger)
template had a Python 2 formula for computing the quarter from a date (so a `Date` of
`2021-08-15` gave a `Quarter` of `2021 Q3`) as follows:

```py
"%s Q%s" % ($Date.year, CEILING($Date.month, 3) / 3)
```

when switching to Python 3, this needed correcting to:

```py
"%s Q%s" % ($Date.year, CEILING($Date.month, 3) // 3)
```

Otherwise Quarters became fractional!

### Some imports are reorganized

Python has a useful standard library, but some parts of it were
moved around between Python 2 and 3.
For example, several of our templates have formulas to construct URLs,
to open custom searches for example, or to open a pre-populated email
with calculated `To`, `CC`, and `Subject` values.
Python has handy helpers for constructing URLs,
but they moved around a bit between Python versions.
Our [Lightweight CRM](https://templates.getgrist.com/doc/lightweight-crm)
example had a Python 2 formula like this to kick off a search for emails in
Gmail:

```
from urllib import quote_plus
"Gmail search https://mail.google.com/mail/u/0/#search/%s" % quote_plus($Email)
```

In Python 3, the import line needed changing to:

```
from urllib.parse import quote_plus
```

### Subtle change in rounding

Python 3 switches the built-in function `round()` from rounding the way many people learned in school
(where when rounding `.5`, you always round up)
to what is called "banker's rounding" (where you round from `.5` to the
nearest even number). This is generally accepted as an improvement, mitigating
a bias to larger numbers that can become significant at scale.
But it could be a surprise to see numbers change like this in an established
document.

If you really need Python 2's rounding, replace any calls to Python's
`round` function with the Excel-compatible [ROUND](functions.md#round) function. For example:

```
round($val, 2)
```

would be replaced with:

```
ROUND($val, 2)
```

### Unicode text handling

Python 2 does not shine at handling international text and emojis.
We have mitigated many problems by setting the default encoding
to `utf8` for all documents. Nevertheless, when switching from Python 2 to
Python 3, you may see type changes or errors. Consider this Python 2 formula
to generate a one-way hash of an email address:

```
import hashlib
hashlib.sha256($Email).hexdigest()
```

In Python 3 this fails with `TypeError: Unicode-objects must be encoded before hashing`,
which can be resolved by replacing `$Email` with `$Email.encode()`:

```
import hashlib
hashlib.sha256($Email.encode()).hexdigest()
```
