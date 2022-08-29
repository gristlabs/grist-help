# Limits

To help you assess whether Grist will work for a use-case you have in
mind, here is a list of limitations that apply to its operation.

## Number of documents

On all plans, the number of documents is not limited. 

To prevent accidental abuse of the system by automation
tools, team sites may be limited to 1000 documents. If you encounter such a limit for legitimate
use, please contact support to increase it.

Older free plans had a limit of ten documents. Learn more about [legacy limits.](#legacy-limits)

## Number of collaborators

For team sites on both the Free and Pro plan, there is no limit on the number of team members that may be added to the site.  For team sites on the Pro plan, the number of team members determines the price. See our [pricing page](https://www.getgrist.com/pricing) for details.

Team members added to your team site may inherit access to workspaces or documents
within that organization. Learn more about [team
sharing](team-sharing.md).

On both personal and team sites, each document may be shared with up to 2 free guests who do not affect the plan price even on the Pro plan.

## Number of tables per document

There is a limit of 500 tables allowed per document.
This is a soft limit. If you find yourself with a large number of
tables, consider merging ones that have the same structure.  For
example, if you have a table for each product type, consider using a single
table with the product type as an extra column.

## Rows per document

On the Free plan, documents have a limit of 5,000 rows.

On the Pro plan, document may have up to 100,000 rows. This is a rule of thumb. The actual limit depends
also on the number of tables, columns, and the average size of data in each cell. One way to
estimate it is to measure the size of the data when it is in CSV format: the limit is around 20MB
in this format. For example, a document with 200,000 rows and 12 numeric columns would reach that.

Attachments are counted separately. Attachments plus data in a single document are limited to 1GB on all plans.

## Upload limits

Uploads are limited to 50MB, both for attachments and to import data. Note that an import within
this limit may result in a document that exceeds the document size limit, in which case the upload
is still likely to fail.

## API limits

Free plans are limited to 5,000 API calls per document per day. Pro plans raise the limit to 40,000 calls per document per day.

Free plans may be rate limited to 5 API requests per second per document. The team plan does not impose
such a rate limit.

Separately, there is a concurrency limit of 10 for all plans: if 10 authorized API requests are
currently being processed for a particular document, any other API requests will be rejected (with
HTTP status code 429) until at least one of the original requests completes.  A client that waits
for one request to complete before sending the next would not hit this limit (assuming it is the
sole client accessing the document).

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

On the current Free plan, all personal and team sites share the same limits as described above and on our [pricing page.](https://www.getgrist.com/pricing)

