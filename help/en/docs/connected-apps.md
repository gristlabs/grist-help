---
title: Connected apps
---

# Connected apps

Letting something — a script, an integration, an AI agent — act on your
Grist data has typically meant sharing an [API key](rest-api.md). An API key
carries your full account access. Whatever holds it can do anything you can
do, on every document you can see, until you rotate the key.

That's the same risk as handing out your password.

Connected apps are the alternative. When a tool needs to act on your Grist
data, it asks for permission. You choose which documents to grant it, and you
can revoke that grant later — without affecting anything else.

## What you control

When an app asks to connect, you see what it's asking for and decide whether
to grant it.

- **Whether to authorize at all.** You see the app's name, who registered it,
  and the permissions it's asking for before deciding.
- **Which documents it can touch.** Authorize it on the documents you choose,
  or on a whole workspace, or on everything. Documents you don't authorize stay
  out of reach.
- **When the access ends.** Revoke the app from your account at any time — its
  tokens stop working immediately. Tokens are also short-lived and rotate
  automatically.

The permissions an app can ask for are set by the app — read records, write
records, change document structure, manage webhooks, download the document.
You see the list in plain English before you authorize, and you can decline
if it asks for too much.

[Access rules](access-rules.md) still apply on top of any of this. An
authorized app sees and changes only the data your own role and access rules
let *you* see and change — never the underlying data, and never more than you
have yourself.

## Authorizing an app

When a third-party tool, AI agent, or partner application asks to connect to
your Grist account, you'll see a consent screen showing:

- The app's name, who registered it, and a contact email.
- The permissions it's requesting, in plain English (for example, "Read
  records from your documents").
- A choice between **All documents** and **Selected resources** — pick the
  specific documents, workspaces, or team sites the app should be able to
  reach.

Authorize only what the app actually needs. You can come back later to widen
or narrow that selection.

## Managing authorized apps

Visit your [Profile Settings](https://docs.getgrist.com/account) → **Authorized
apps** to see every app you've granted access to. For each one, you can see:

- The scopes you granted.
- Which documents or workspaces the app can reach.
- When it was last used.

Click an app to change which documents it can access, or to revoke it.
**Revoking takes effect immediately** — the app's tokens stop working before
its next request.

## API keys vs. connected apps

| | API key | Connected app |
|---|---|---|
| Scope of access | Everything you can see | Documents you choose |
| What it can do | Anything you can do | Only what it asked for |
| Tied to | Your account | A specific app and grant |
| Revoke without losing other access? | No (one key per account) | Yes (revoke any one app) |

API keys remain the right choice for your own scripts and one-off automations
where you simply *are* the actor. For anything that runs on someone else's
infrastructure — another product, an AI agent, an internal app used by
several people — prefer a connected app.

For organizations, this means a principle of least privilege users can
actually apply: *"For any integration that supports it, use the connected
app rather than an API key. Each connection is scoped to specific documents,
can be revoked individually, and is listed under Authorized apps in your
account settings."*

## AI agents and third-party tools

The same model covers AI agents that act on your Grist data. An agent that
helps with one project can be granted read access to that project's
documents only, and nothing else. If you stop using it, revoke its access
from your Authorized apps page.

## On self-hosted Grist {: .tag-ee }

When you run Grist on your own infrastructure, the OAuth server runs there
too. Authorization, token issuance, validation, and revocation all happen on
systems you control. You don't have to trust an outside service with the
keys to your data — you can run the lock yourself.

Connected apps require the Enterprise edition of Grist. See [OAuth
apps](oauth-apps.md) for how to build apps that connect this way.
