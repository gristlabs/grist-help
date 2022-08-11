Self-Managed Grist
==================

There are three flavors of Grist:

  * **SaaS** (Software as a Service): Grist is available as a hosted service
    at [docs.getgrist.com](https://docs.getgrist.com).
    No installation needed. Free and paid plans, with usage limits.
  * **Self-Managed Enterprise**: Grist is available as a licensed application
    installed by enterprises on their own infrastructure
    with our support and backing. Contains proprietary features
	developed for enterprises with particular needs.
  * **Self-Managed Core**: Grist is available as a free application installed
    by citizen developers on their own infrastructure with community support.
    Grist documents created with our SaaS and Enterprise offerings
	can be opened and edited with Core, and vice versa. This establishes
	Grist documents as a reliable format for archiving and interchange.

Self-Managed Grist, be it Enterprise or Core, is installed and configured in
much the same way, as described in the following
sections. For clarity, the sections are tagged
with which flavor they apply to, for example:
{: .tag-core .tag-ee }

The full source code for Grist Core is always available at 
[github.com/gristlabs/grist-core](https://github.com/gristlabs/grist-core/)
and is under an Apache-2.0 license. You may use and redistribute Core
freely, under the terms of the free software license.
The full source for Grist Enterprise
is also available, at 
[github.com/gristlabs/grist-ee](https://github.com/gristlabs/grist-ee/),
under a proprietary license that does not grant any automatic
rights to use or redistribute the software. You can evaluate Enterprise
for 30 days using the instructions in the following sections,
or [sign up for our Grist Enterprise plan](https://www.getgrist.com/pricing)
and get support.

## Installation {: .tag-core .tag-ee }

The easiest way to run Grist is as a container. We will
describe how using [Docker](https://www.docker.com/),
but there are many other tools and services for running
containers.

To try Grist out,
make an empty directory for Grist to store material in
(say `~/grist`) and then for Grist Core you can do:

```
docker run -p 8484:8484 \
  -v ~/grist:/persist \
  -e GRIST_SESSION_SECRET=invent-a-secret-here \
  -it gristlabs/grist
```

For Grist Enterprise use `gristlabs/grist-ee` instead of
`gristlabs/grist`.

You should then be able to visit `http://localhost:8484` in
your browser. Already you will be able to open and edit Grist documents
downloaded from another installation (such as our SaaS), making sure all
the features you expect are present, including the ability to export the
documents again.

If using some other tool or service, here are the important points:

 * The container name is `gristlabs/grist` or `gristlabs/grist-ee`
   (for some tools, you may need to prefix these names with `docker.io/`.
 * A volume, or mount, or directory, needs to be available at location
   `/persist` within the container. It can be initially empty - Grist
   will populate it. Without this volume, nothing you do will be stored long-term.
 * Port `8484` on the container needs to be exposed. This can be changed
   if you also set the `PORT` environment variable for the container.
 * The environment variable `GRIST_SESSION_SECRET` should be set 
   to something secret for the container.

Installed this way, Grist is accessible only to you. Typically you want to
take at least the following steps:

  * [Set up sandboxing](self-managed.md#sandboxing) - this is important to
    place bounds on what formulas can do.
  * [Serve from a public host](self-managed.md#serving-from-a-public-host)
    so you can collaborate live with others.
  * Enable an authentication method so users can log in. Often you'll want
    to hook Grist up to an "SSO" (Single Sign-On) service you already use.
	We support some very 
    [general authentication methods](self-managed.md#general-authentication-methods) that cover many cases,
	and a [special authentication method](self-managed.md#special-authentication-methods) for custom cases.

## Sandboxing {: .tag-core .tag-ee }

Grist allows for very powerful formulas, using Python.  We recommend
setting the environment variable `GRIST_SANDBOX_FLAVOR` to `gvisor` if
your hardware supports it (most will), to run formulas in each
document within a sandbox isolated from other documents and isolated
from the network.

```
docker run ...
  -e GRIST_SANDBOX_FLAVOR=gvisor \
  ...
```

To sanity-check that formulas are being evaluated within a sandbox,
you can create a document and then check that this formula
gives an empty result:

```
import glob 
glob.glob('/etc/*')
```

## Serving from a public host {: .tag-core .tag-ee }

We suggest that you become familiar with all the other aspects of
self-management on this page before serving Grist from a public host
(especially [Sandboxing](self-managed.md#sandboxing)).
When you do, it is important to tell Grist where it will be served
from, using the `APP_HOME_URL` variable. For example, if you will
be serving from `https://grist.example.com`, let Grist know like
this:

```
docker run ...
  -e APP_HOME_URL="https://grist.example.com" \
  ...
```

You will need to place a "reverse proxy" in front of Grist to
handle "ssl termination" (decrypting encypted traffic) using 
a certificate that establishes ownership of the site. If you don't
know what this means, you could try using the
[Grist Omnibus](https://github.com/paulfitz/grist-omnibus) which
packages Grist with a reverse proxy that will 
use [Let's Encrypt](https://letsencrypt.org/) to get a certificate
for you automatically.

## Activation key {: .tag-ee }

Activation keys are used to run Grist Enterprise after a trial period
of 30 days has expired.
Get an activation key by [signing up for Grist Enterprise](https://www.getgrist.com/pricing).
You don't need an activation key to run Grist Core.
 
Place the contents of your activation key in an environment variable called
`GRIST_ACTIVATION`, or place it in a directory available to Grist and
provide the full path to the file with the environment variable
`GRIST_ACTIVATION_FILE`. Without the activation key, there will be a
banner stating that Grist is in trial mode. Once the activation key is detected,
this banner will go away. Replacing the activation key will require
restarting Grist.

```
docker run ...
  -e GRIST_ACTIVATION=<activation-key-goes-here> \
  -it gristlabs/grist-ee
```

## Teams {: .tag-core .tag-ee }

Grist has a concept of "team sites" that are independently managed and
named areas containing their own workspaces and documents.  Team sites
can have distinct subdomains, or be distinguished by a special path
prefix.  This often does not make sense for self-managed
installations, where there is a single team.  With a single domain and
a single team, the special path prefix (which looks like `/o/<team-name>`)
is an inelegant waste of space in URLs. So you can direct Grist to
use a single team by setting `GRIST_SINGLE_ORG` ("org" or "organization"
is a synonym for team):

```
docker run ...
  -e GRIST_SINGLE_ORG=cool-beans
```

The name of the team should use only the characters A-Z, a-z, 0-9, and the
hyphen (`-`).  You may also want to look into
[Custom styling](self-managed.md#custom-styling) to hide any UI elements
you don't need.

## Custom styling {: .tag-core .tag-ee }

There are two environment variables useful for tweaking the Grist UI:

The Grist UI has many elements, some of which may not be relevant to you.
You can turn off many elements using *GRIST_HIDE_UI_ELEMENTS*.
This is comma-separated list of parts of the UI to hide.
Allowed names of parts: helpCenter,billing,templates,multiSite,multiAccounts.
The UI elements present is also affected by whether *GRIST_SINGLE_ORG* is set.


```
docker run
  ...
  -e GRIST_HIDE_UI_ELEMENTS=helpCenter,billing,templates,multiSite,multiAccounts \
  ...
```

It is a good idea to hide at least `billing` since these elements are
functional only on our SaaS.

By default pages of the Grist UI have ` - Grist` added to their title. You can
change this by setting `GRIST_PAGE_TITLE_SUFFIX`

```
docker run
  ...
  -e GRIST_PAGE_TITLE_SUFFIX=" - Cool Beans" \
  ...
```

You can set the suffix to `_blank` to entirely remove it.

You can also override the CSS styling of the site if you set
`APP_STATIC_INCLUDE_CUSTOM_CSS` to `true`.

```
docker run
  ...
  -e APP_STATIC_INCLUDE_CUSTOM_CSS=true \
  ...
```

This will load an extra `custom.css` file. You can find
an example of such a file in the
[Grist Core repository](https://github.com/gristlabs/grist-core/blob/main/static/custom.css).

The file includes most of our global CSS variables for colors, and a
few variables for the logo shown in the top-left corner. There’s
really no limit to what can go in the file, so specifying arbitrary
styles is possible. Note that all CSS rules should use
`!important` to make sure they have the highest precedence. Otherwise,
it’s possible for more specific rules included by our framework to take
precedence.

To override `custom.css`, you can made your own copy and make
sure Grist uses it. If the CSS file is in your current directory, then
do:

```
docker run
  ...
  -v $PWD/custom.css:/grist/static/custom.css
  ...
```

It is possible to direct Grist to load static resources from a CDN by
setting `APP_STATIC_URL`. If you do so, and you are using custom CSS,
you'll need to ensure the custom CSS is available from that base URL.

## List of custom widgets {: .tag-core .tag-ee }

In our SaaS, Grist has a [list of pre-built custom widgets](https://support.getgrist.com/newsletters/2022-02/#custom-widgets-menu) available in the UI.
You can have your install offer the same list by setting the following:

```
docker run
  ...
  -e GRIST_WIDGET_LIST_URL="https://github.com/gristlabs/grist-widget/releases/download/latest/manifest.json" \
  ...
```

This is optional. If you leave the variable unset, documents with
custom widgets will still work fine, but you'll need to enter a full
URL when adding custom widgets rather than picking an option from a
drop-down.

You can make your own list of widgets available by forking
[github.com/gristlabs/grist-widget](https://github.com/gristlabs/grist-widget)
or by manually preparing a `.json` file on a public server in the same
format as our `manifest.json`.


## Configure a "home" database {: .tag-core .tag-ee }

Grist stores metadata about users, documents, workspaces, etc in a
database called the "home" database. This does not contain the
material inside documents such as tables and columns, but does contain
document names and creation times, for example.  By default, Grist
will create a home database in an Sqlite file within the /persist
directory. To use instead a PostgreSQL database, create one (version
11 **or earlier**) and a user with sufficient access to create tables,
and set the following variables:

* TYPEORM_TYPE - set to postgres
* TYPEORM_DATABASE - set to name of database, e.g. home
* TYPEORM_USERNAME - set to postgres username with rights to the database
* TYPEORM_PASSWORD - set to postgres password with rights to the database
* TYPEORM_HOST - set to hostname of database, e.g. grist.mumble.rds.amazonaws.com
* TYPEORM_PORT - set to port number of database if not the default for PostgreSQL

Currently, we support PostgreSQL up to and including version 11 (please
contact this if it is a blocker for you and we'll prioritize generalizing this).

## Configure a state store {: .tag-core .tag-ee }

Grist can be configured to use Redis as an external state cache. For
most Grist functionality, this is optional. It is required for webhook
support. To use, just set `REDIS_URL` to something like
`redis://hostname/N` where `N` is a redis database number.

```
docker run
  ...
  -e REDIS_URL="redis://hostname/N"
  ...
```

## Configuring S3 or Azure storage {: .tag-ee }

This feature allows automatic syncing of Grist documents and document
versions to an S3 or Azure storage account. It is not currently available
in Grist Core.

For Azure, you will need a setting like:

```
docker run
  ...
  -e AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=..." \
  -e GRIST_AZURE_CONTAINER=my-grist-docs \
  -e GRIST_AZURE_PREFIX=v1/ \
  ...
```

For S3, you will need something like:

```
docker run
  ...
  -e GRIST_DOCS_S3_BUCKET=my-grist-docs \
  -e GRIST_DOCS_S3_PREFIX=v1/ \
  ...
```

For details, see [Cloud Storage](install/cloud-storage.md).

## General authentication methods {: .tag-core .tag-ee }

For our SaaS, we use a system based around AWS Cognito that we do not intend
to inflict on the world, and which is not available in Grist Core or Enterprise.

Authentication can be set up in many ways for Grist Core and Enterprise, using
SAML or forwarded headers. It is hard to give short instructions for this
step, as there is a lot of variety in the SSOs people have connected Grist with.

  * [SAML](install/saml.md).
  * [Forwarded headers](install/forwarded-headers.md).

For any authentication method, you may want to consider setting the
following variables:

  * `COOKIE_MAX_AGE`: (optional) expiration date for Grist session
    cookie, when set to `none` session cookie will be in a `Session`
    mode - it should be removed after closing a browser. If set to a
    number, the units of the number are milliseconds.
  * `GRIST_FORCE_LOGIN`: (optional) when set to `true` this will
    instruct Grist to redirect anonymous users to a login page.

## Special authentication methods {: .tag-ee }

If users on your site login via WordPress, or via a custom mechanism
you developed, you may want to consider
[GristConnect](install/grist-connect.md).

## Sending emails {: .tag-ee }

In Grist SaaS, we send emails such as invitations to share a 
document using [SendGrid](https://sendgrid.com/). The same mechanism
is available in Grist Enterprise. There is not yet an equivalent in
Grist Core.

You will need to set a SendGrid API key:

```
docker run
  ...
  -e SENDGRID_API_KEY=SG.XXXXXXX.XXXXX \
  ...
```

You will need to make a file `config.json` available in the
root of the volume mapped to `/persist`. Its contents should be
as follows:

```
{
  "sendgrid": {
    "api": {
      "prefix": "https://api.sendgrid.com/v3",
      "enroll": "/marketing/contacts",
      "search": "/marketing/contacts/search",
      "searchByEmail": "/marketing/contacts/search/emails",
      "listRemove": "/marketing/lists/{{id}}/contacts",
      "send": "/mail/send"
    },
    "address": {
      "from": {
        "email": "<the-email-address@mails-should-be-from>",
        "name": "the name to show with email"
      }
    },
    "template": {
      "invite": "d-f9.....",
      "billingManagerInvite": "d-f9.....",
      "memberChange": "d-b3....."
    },
    "list": {
      "singleUserOnboarding": "b22..."
    },
    "unsubscribeGroup": {
      "invites": 19...,
      "billingManagers": 19....
    }
  }
}
```

Here are the meanings of the keys in this file:

  * `sendgrid.api` - Values should remain unchanged from what’s
    defined in the sample. These control API versioning and
    endpoints. Grist currently targets v3 of SendGrid's web API.
  * `sendgrid.address` - Should be set to a verified email address and
    name of a SendGrid sender. This controls the "From" address of all
    emails sent via SendGrid (e.g. invites sent on behalf of Grist
    users).
  * `sendgrid.template` - Maps Grist actions to SendGrid email templates
    ids. These are for transactional emails that are sent as a result
    of some action occurring in Grist.
  * `sendgrid.template.invite` - This is for emails sent to users that
    are invited to documents, workspaces, or sites.
  * `sendgrid.template.memberChange` - This is for emails sent to
    billing managers when users are added/removed from sites.
  * `sendgrid.list` - Maps Grist actions to SendGrid marketing list
    ids. These are for on-going automated emails that are sent to all
    users who are enrolled in a particular list.
  * `sendgrid.list.singleUserOnboarding` - New Grist users are
    automatically added to this list on first-login. This is suitable
    for sending regular onboarding emails to users.
  * `sendgrid.unsubscribeGroup` - Maps email types to SendGrid
    unsubscribe group ids. These are for allowing users to unsubscribe
    from receiving certain types of emails (via the link in the
    email).
  * `sendgrid.unsubscribeGrist.invites` - If set, invite emails can be
    suppressed via the unsubscribe link in emails.
  * `sendgrid.unsubscribeGrist.billingManagers` - If set, emails sent
    specifically to billing managers (e.g. membership changes) can be
    suppressed via the unsubscribe link in emails.

For reference, there are example SendGrid templates in
[example-sendgrid-templates.zip](/install/example-sendgrid-templates.zip)
based on an export of the SendGrid templates for our SaaS.

## Upgrades {: .tag-core .tag-ee }

We currently release new Grist Core and Enterprise images at
approximately weekly intervals.
Utilities such as [Watchtower](https://containrrr.dev/watchtower/) can
keep your version of Grist up to date for you.

## High availability {: .tag-ee }

We have developed expertise in hosting very busy Grist installations,
with many users, including how to upgrade with minimal disruption,
and how to scale out to handle heavy load. We would be happy to help
Enterprise clients with needs of this nature.

