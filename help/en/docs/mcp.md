---
title: "Grist MCP server"
description: "Connect Claude and other MCP-aware tools to Grist team sites and documents."
---

!!! danger "DRAFT DOCUMENT"
    This is a DRAFT document. The features described here are NOT enabled yet.

Model Context Protocol (MCP) is an open standard that lets AI assistants access external data. Any
MCP-aware tool (such as Claude or ChatGPT) can use Grist's MCP server to work with your team sites
and documents: list and search tables, read and query rows, add or update rows, and create new
documents and tables.

For Grist's built-in AI assistant, see [AI Assistant](assistant.md).

## Setting up the MCP server

The Grist MCP server is available on Grist SaaS and on self-hosted Grist Enterprise plans. Pick
the section that matches your setup.

### Grist SaaS

Grist SaaS exposes a single, universal MCP URL:

**MCP URL:** `https://docs.getgrist.com/api/mcp`

The same URL works for every team site and your personal site. Any MCP client that supports OAuth
can use it. Below we cover Claude.ai and Claude Desktop, Claude Code in the terminal, and the
generic OAuth path that other clients follow.

You will need a Grist account (any plan, including the free personal site) and an MCP client that
supports remote, OAuth-authenticated servers. On the Claude side, that means a plan that supports
custom connectors.

!!! info "Beta feature"
    MCP support is currently a beta feature available to all Grist users. Availability is subject
    to change.

#### Claude.ai or Claude Desktop

!!! warning "Directory listing pending review"
    The Grist listing in the Claude directory is still under Anthropic review and is not active
    yet. Until it goes live, use the **Connect Grist to Claude** button below.

The **Connect Grist to Claude** button opens Claude's 'Add custom connector' dialog with the Grist
name and MCP URL pre-filled, so you only need to confirm the dialog and sign in.

[Connect Grist to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=Grist&connectorUrl=https%3A%2F%2Fdocs.getgrist.com%2Fapi%2Fmcp){:target="_blank"}

After clicking the button:

1. In the 'Add custom connector' dialog, click 'Add'.
2. Sign in with your usual Grist credentials (Google or email).
3. Review the permissions and click 'Allow' on the consent screen.

<span class="screenshot-full">*![add-connector](images/mcp/add-connector.png)*</span>
{: .screenshot-half }

#### Claude Code (terminal)

Add the Grist MCP server with a single command:

```sh
claude mcp add --transport http grist https://docs.getgrist.com/api/mcp
```

Claude Code triggers the OAuth flow on first use, opening a browser for you to sign in to Grist
and approve the permissions.

#### Other MCP clients

Any MCP client that supports OAuth-authenticated remote MCP servers can connect to Grist SaaS by
adding the universal URL above as a custom connector. The sign-in and consent flow is the same.

### Self-hosted Grist

Self-hosted Grist exposes the same MCP endpoint on your own instance:

**MCP URL:** `https://<your-grist-host>/api/mcp`

Substitute your own host. The same URL covers every team site on that instance. Any MCP client
that supports OAuth can connect to it.

There is no Claude directory listing for self-hosted Grist, so the **Connect Grist to Claude**
button does not apply here. Add Grist by hand as a custom connector instead.

#### Claude.ai or Claude Desktop

1. In Claude.ai or Claude Desktop, open 'Settings' → 'Connectors'.
2. Click 'Add custom connector' and paste your MCP URL.
3. Sign in with your usual Grist credentials (Google or email).
4. Review the permissions and click 'Allow' on the consent screen.

#### Claude Code (terminal)

```sh
claude mcp add --transport http grist https://<your-grist-host>/api/mcp
```

Claude Code triggers the OAuth flow on first use.

#### Other MCP clients

Any MCP client that supports OAuth-authenticated remote MCP servers can connect using your MCP
URL above.

### Permissions Grist requests

After you click 'Add', your MCP client redirects you to Grist to sign in.

<span class="screenshot-full">*![grist-account-picker](images/mcp/grist-account-picker.png)*</span>
{: .screenshot-half }

Grist's consent screen then asks your MCP client for a set of OAuth scopes. Each scope has a label,
and the underlying scope name is shown in parentheses.

* **Identify you** (`openid`, `email`, `profile`): confirm who you are, and pass your name and email
  to the client so it can show your account.
* **Stay signed in** (`offline_access`): keep the connection working without asking you to sign in
  again, including when the client acts on your behalf while you are away, such as a long-running
  task or a scheduled run.
* **Read documents** (`doc:read`): list and query tables, records, columns, and attachments.
* **Modify records** (`doc:write`): add, update, and remove rows.
* **Modify schema** (`doc.schema:write`): add, rename, or remove tables and columns.
* **Download documents** (`doc:download`): export full documents as CSV or Excel.
* **Manage webhooks** (`doc:webhooks`): create, read, update, and delete document webhooks.

A client does not have to ask for every permission up front. It can request only what it needs at
first, such as read-only access, and you approve that on the consent screen. If a tool later needs
more, some clients ask you to approve the extra permission then and there, and carry on once you
do. If yours does not, reconnect Grist from your client's connector settings and approve the wider
access.

### Choosing which resources your MCP client can access

<span class="screenshot-full">*![grist-consent](images/mcp/grist-consent.png)*</span>
{: .screenshot-half }

The same consent screen also asks which Grist resources the client can reach. You have two options:

* **All documents (now and in the future).** The client can see and act on every team site,
  workspace, and document your account has access to, including ones you create later. This is the
  default.
* **Selected resources.** Pick specific team sites, workspaces, or documents. You can mix levels,
  for example a whole workspace plus a single document from elsewhere. Up to 50 resources per
  connection.

Selecting a parent grants access to everything inside it. If you select a workspace, you do not need
to also select the documents inside it.

You can change this selection later from the 'Authorized apps' page in your Grist account
settings, without disconnecting the client. Changes can take up to an hour to propagate to
already-connected apps. To apply them immediately, disconnect and reconnect Grist from your client's
connector settings.

<span class="screenshot-full">*![authorized-apps](images/mcp/authorized-apps.png)*</span>
{: .screenshot-half }

## Available tools

Grist's MCP server exposes a set of tools for working with your documents, grouped into five
categories. The tools act on your behalf, so they can only reach what your account can reach. The
permissions you grant on the consent screen narrow this further, so you can limit what the connector
is allowed to do.

!!! note "Note"
    Every tool name is prefixed with `grist_` when called (so `list_docs` is `grist_list_docs`). The prefix is omitted below for readability.

### Discovery

Find what you have access to.

* `list_orgs` lists your team sites.
* `list_workspaces` lists workspaces inside a team site.
* `list_docs` lists documents inside a workspace.
* `get_doc_info` returns metadata about a single document.
* `get_user_profile` returns the account you are connected as (name and email), so you can confirm
  which Grist account the client is using.
* `help` returns a short overview of what the server can do.

Try asking:

* "What Grist documents do I have?"
* "Show me everything in my Marketing team site."

### Reading data

Query and inspect document content.

* `query_document` runs a natural-language or SQL-style query across the tables in a document.
* `list_records` returns rows from a single table.
* `get_tables` and `get_table_columns` describe a document's structure.

Try asking:

* "How many open deals are in my CRM?"
* "List contacts I haven't talked to in 90 days."
* "What's total revenue by client this quarter in my Invoices document?"

### Writing data

Modify records.

* `add_records` appends new rows.
* `update_records` modifies existing rows by row id.
* `remove_records` deletes rows.

Try asking:

* "Add a new client called Acme Corp to my CRM with the email ops@acme.com."
* "Mark task #42 as done in my Project Tracker."
* "Remove every row in Tickets where Status is 'Archived'."

### Managing documents and schema

Create and reshape documents.

* `create_doc` makes a new document in a workspace.
* `create_table` and `add_table_column` extend the schema.
* `update_table_column` changes column type, formula, or label.

Other tools: `add_table`, `rename_table`, `remove_table`, `remove_table_column`.

Try asking:

* "Start a new document for tracking my expenses."
* "Add a Priority column to Tasks with options Low, Medium, High."
* "Rename the Notes column to Comments in my CRM."

### Pages and widgets

Manage a document's pages and widgets.

* `get_pages` lists the pages in a document.
* `add_page_widget` adds a widget to a page (Table, Card, Card List, Chart, Calendar, Custom, and so
  on).
* `update_page_widget` changes a widget's title, table, view configuration, or layout.

Other tools: `update_page`, `remove_page`, `get_page_widgets`, `remove_page_widget`,
`get_page_widget_select_by_options`, `set_page_widget_select_by`, `get_available_custom_widgets`.

Try asking:

* "Add a chart page to my Sales document showing revenue by month."
* "Put a Card View of Contacts on the Overview page."
* "Remove the Internal Notes page from my Project Tracker."

## Examples

These examples use Claude.ai. The first time Claude calls a Grist tool, it asks for your approval.
You can choose 'Always allow' to skip the prompt for that tool on future calls.

<span class="screenshot-full">*![tool-call-approval](images/mcp/tool-call-approval.png)*</span>
{: .screenshot-half }

You can use the Grist MCP server to:

* **Query structured data in plain language:** "In my CRM document, who has an open task due in the
  next 7 days?"
* **Bulk-update records:** "In my Deliveries document, update all dates to follow ISO 8601
  formatting."
* **Start a document from scratch:** "Create a new document called 'Reviewer Sandbox' with a Sample
  table that has the properly-typed columns: Name, Value, Created."

After Claude finishes, the new or updated document appears in Grist alongside the conversation.

<span class="screenshot-full">*![end-result](images/mcp/end-result.png)*</span>
{: .screenshot-half }

## Data handling

When you call a Grist tool from your MCP client, the data that the tool returns is sent to that
client's AI provider so the model can use it in its response.

* Transport is HTTPS/TLS end-to-end.
* The MCP server holds no data of its own. Every request is authenticated against your existing
  Grist account and access rules.
* The OAuth token is scoped to the permissions you granted at connect time. You can revoke it any
  time from Grist's account settings.

!!! warning "Warning"
    Treat the connector like sharing a document with a colleague. Anything you ask the client to read or write will be visible to its AI provider.

See the [Grist Privacy Policy](https://www.getgrist.com/privacy/){:target="_blank"} for details.

## FAQ

### What does the Grist MCP server cost?

During the pilot period the Grist MCP server is available to all Grist users at no extra cost. After
the pilot it will be tied to a plan, but the details have not been decided yet. This page will be
updated once they are announced.

Your MCP client may have its own requirements (for example, some clients only allow custom
connectors on a paid plan). This depends on the provider, so check their pricing page for details.

### How does the MCP server handle my data?

See the [Data handling](#data-handling) section above.

### Can I have multiple Grist connectors?

Yes. Most MCP clients let you add the same MCP server more than once under different connector
names, so you can keep separate connections (for example, signed in as different Grist accounts). In
Claude, the directory listing supports only a single connection, but the [custom connector
path](#claudeai-or-claude-desktop) does not stop you from adding the same URL again under a different
name.

### How do I connect with a different Grist account?

Two options, available in most clients:

1. Disconnect Grist from your client's connector settings, then reconnect. When the consent screen
  appears, sign in with the other account.
2. Add Grist as a custom connector a second time under a different name, and sign in with the other
  account during the consent step. Both connections then live side by side.

### Can I connect my self-hosted Grist?

Yes. Add Grist as a [custom connector](#claudeai-or-claude-desktop) and use your own host in the
MCP URL: `https://<your-grist-host>/api/mcp`. In Claude, note that the directory listing connects to
Grist SaaS only, so self-hosted instances must be added as a custom connector.

### Why am I seeing a "missing scope" error?

A tool tried to use a permission the connection does not have. For example, if you only approved
read access, write tools like `add_records` will refuse to run.

Some clients ask you to approve the missing permission right away, after which the tool runs. If
yours does not, disconnect Grist in the client's connector settings and reconnect, approving the
access you want to allow. From the connector settings page you can also see every Grist tool the
client has access to and adjust which ones require approval.

<span class="screenshot-full">*![claude-connector-settings](images/mcp/claude-connector-settings.png)*</span>
{: .screenshot-half }

### Why am I seeing a "doc not found" error?

Usually one of:

* The document was deleted, moved, or renamed.
* You do not have access to the document with the account you authorized your client under.
* You are asking your client to look in a different team site than the one the document lives in.

First, check which Grist account you used when you connected. If you are not sure, ask the AI
something like "which Grist account am I logged in as?" and it will report the connected account's
name and email. If you have several Grist accounts (for example, a personal one and a work
one), the document might live under a different account. Open [docs.getgrist.com](https://docs.getgrist.com), confirm the document
exists under the account you used to connect, and check that you have at least view access.

If you are not sure which account is connected, the quickest fix is to disconnect Grist in your
client's connector settings and reconnect, signing in with the right account this time.

If the document is in a different team site, ask the AI to list your team sites first with
`list_orgs`.
