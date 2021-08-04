# Limits

To help you assess whether Grist will work for a use-case you have in
mind, here is a list of limitations that apply to its operation.

## Number of documents

The number of documents is limited to 10 in free plans.
Paid plans allow up to 1000 documents per user, which may
be increased via a support request.

## Number of collaborators

In free plans, each document may be shared with 2 other users,
not counting the creator.  The set of collaborators can be different
for each document.

In paid plans, documents can be shared with 2 other users without
extra cost just as in the free plans.  Paid plans also allow you to
add users to a "team" with paid seats, granting rights to users
systematically on sets of documents.

## Number of tables per document

There is a limit of 500 on the number of tables allowed per document.
This is a soft limit.  If you find yourself with a large number of
tables, consider merging ones that have the same structure.  For
example, if you have a table for each product type, consider using a single
table with the product type as an extra column.

## Size of documents

As a rule of thumb, Grist works best for documents under 100,000 rows. The actual limit depends
also on the number of tables, columns, and the average size of data in each cell. One way to
estimate it is to measure the size of the data when it is in CSV format: the limit is around 20MB
in this format. For example, a document with 200,000 rows and 12 numeric columns would reach that.

Attachments are counted separately. Attachments plus data in a single document are limited to 1GB.

## Upload limits

Uploads are limited to 50MB, both for attachments and to import data. Note that an import within
this limit may result in a document that exceeds the document size limit, in which case the upload
is still likely to fail.

## Document availability

From time to time, during upgrades and operational transitions,
individual Grist documents may become inaccessible for a period of
some seconds.  Please bear this in mind when using Grist's API.

Separately, if 10 authorized API requests are currently being
processed for a particular document, any other API requests will be
rejected (with HTTP status code 429) until at least one of the original requests
completes.  A client that waits for one request to complete
before sending the next would not hit this limit (assuming it is
the sole client accessing the document).
