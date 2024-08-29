---
title: Limits
---

# Limits

To help you assess whether Grist will work for a use-case you have in
mind, here is a list of limitations that apply to its operation.

## Number of documents

On all plans, the number of documents is not limited.

To prevent accidental abuse of the system by automation
tools, team sites may be limited to 1,000 documents. If you encounter such a limit for legitimate
use, please contact support to increase it.

Older free plans had a limit of ten documents. Learn more about [legacy limits](#legacy-limits).

## Number of collaborators

For team sites on all plans, there is no limit on the number of team members that may be added to the site.  For paid plans, the number of team members determines the price. See our [pricing page](https://www.getgrist.com/pricing) for details.

Team members added to your team site may inherit access to workspaces or documents
within that organization. Learn more about [team
sharing](team-sharing.md).

On both personal and team sites, each document may be shared with up to 2 free guests who do not affect the plan price even on paid plans.

## Number of tables per document

There is a limit of 500 tables allowed per document.
This is a soft limit. If you find yourself with a large number of
tables, consider merging ones that have the same structure.  For
example, if you have a table for each product type, consider using a single
table with the product type as an extra column.

## Rows per document

On the Free plan, documents have a limit of 5,000 rows. The limit for Pro and Business plans is 100,000 and 150,000 rows, respectively.

Documents are also subject to data size limits, as described below.

## Data size

There is a hard limit to a document's total data size, determined as the row limit multiplied by 2KB. This means that documents on the Free plan have a data size limit of 10MB, with Pro and Business plan documents having limits of 200MB and 300MB, respectively. This value corresponds approximately to the size of the data in CSV format. You can see a document's current data size on the ['Raw Data' page](https://support.getgrist.com/raw-data/#usage).

For memory and performance reasons, there's a recommended data size limit of 20MB. Documents beyond 20MB may slow down or run into memory limits depending on their complexity. As an example, a document with 100,000 rows and 24 numeric columns would reach this recommended limit. To help optimize formulas on large documents, you can use the built-in [formula timer](https://support.getgrist.com/formula-timer/).

Attachments are counted separately. Attachments plus data in a single document are limited to 1GB on all plans.

## Uploads

Uploads are limited to 50MB, both for attachments and to import data. Note that an import within
this limit may result in a document that exceeds the document size limit, in which case the upload
is still likely to fail.

## API limits

Free plans are limited to 5,000 API calls per document per day. Pro and Business plans raise the limit to 40,000 and 60,000 calls per document per day, respectively.

Free plans may be rate limited to 5 API requests per second per document. The team plan does not impose
such a rate limit.

Separately, there is a concurrency limit of 10 for all plans: if 10 authorized API requests are
currently being processed for a particular document, any other API requests will be rejected (with
HTTP status code 429) until at least one of the original requests completes.  A client that waits
for one request to complete before sending the next would not hit this limit (assuming it is the
sole client accessing the document).

The size of the body of any individual API request is limited to 1MB. In particular, this means
that requests adding or updating multiple records may need to be split into batches that fit
within this limit.

## Document availability

From time to time, during upgrades and operational transitions,
individual Grist documents may become inaccessible for a period of
some seconds. Please bear this in mind when using Grist's API.

## Legacy limits

Older free personal plans have the following limits:

* 10 documents per site
* No workspaces
* 100,000 rows

To determine if you're on a legacy personal site, click on your site name (@your-name) in the top left. Personal sites on the legacy plan will say "Personal Site (Legacy)" in the dropdown menu.

On the current Free plan, all personal and team sites share the same limits as described above and on our [pricing page](https://www.getgrist.com/pricing).

