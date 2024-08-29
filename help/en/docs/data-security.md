---
title: Data security
---

# Data Security

Grist is available as a hosted service ("Grist SaaS") running
on infrastructure managed by Grist Labs. It can also be installed
on your own infrastructure ("Self-Managed Grist"). In either case,
we take measures to secure your data that you should know about.

## Grist SaaS

Our general privacy policy and terms are at
<https://www.getgrist.com/privacy> and
<https://www.getgrist.com/terms>. In addition, here is a summary of
specific measures that relate to Grist documents that we host on
your behalf:

  * Grist servers operate in the Amazon Web Services (AWS) cloud
    infrastructure, in the United States.
  * [AWS S3](https://aws.amazon.com/s3/) is used for long-term
    storage, and stores documents in encrypted form. Data is stored in
    the United States.
  * Grist employees never look at your data and cannot open your
    documents. The one exception is if you choose to share a document
    with customer support in order to get help with an issue.
  * When being operated on, your data will by necessity exist in
    unencrypted form in some of Grist's internal systems. Only select
    key employees have full access to these systems, and policy
    prohibits them from looking inside documents.
  * Secure HTTPS is used for all access to Grist via public internet
    (both website and API calls).
  * Regular backups of Grist documents are made, and are stored in
    encrypted form. Grist retains more frequent snapshots of recent
    changes, and less frequent ones as you go back in time.
  * If you delete a document, it will persist for 30 days in a Trash
    folder under your control. At any time a "Delete forever" option
    can be used to immediately purge a document in this folder. All
    automatic backups are purged along with the document.

The hosted Grist product has not at this time gone through
certification or auditing for SOC 2, ISO 27001, HIPAA, or GDPR
compliance. If you need specific documentation, please contact
customer support. You can also nudge us to prioritize certification
over feature development at [this issue](https://github.com/gristlabs/grist-core/issues/47).

## Self-Managed Grist

For Self-Managed Grist, you are in complete control of where servers
operate and where data is stored. Here are some security
considerations to bear in mind:

 * Grist software is distributed via the `gristlabs` organization
   on [github](https://github.com/gristlabs) and
   [docker hub](https://hub.docker.com/u/gristlabs). Please
   exercise diligence if accessing software elsewhere,
   since the software you install will have full access to your
   data.
 * Grist documents support powerful Python formulas. Please
   pay attention to instructions for [configuring sandboxing](self-managed.md#how-do-i-sandbox-documents)
   if your team may be working with untrusted documents.
 * Grist by default is welcoming to anonymous users, allowing
   them to create and edit their own documents. You may wish to
   [configure a stricter arrangement](https://support.getgrist.com/self-managed/#how-do-i-set-up-authentication).
 * Grist does not make external services mandatory, since that would
   introduce unnecessary obstacles in some scenarios. For example,
   an individual editing a Grist document offline on their own
   desktop shouldn't need to install a PostgreSQL database first.
   But it is important to evaluate what you need in your situation rather than
   simply sticking with the defaults. Please
   read about [the data Grist stores](https://support.getgrist.com/self-managed/#what-files-does-grist-store)
   and your options for where to store it.
 * It is important to [keep your Grist installation up to date](https://support.getgrist.com/self-managed/#how-do-i-upgrade-my-installation).
