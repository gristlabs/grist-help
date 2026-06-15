---
title: Technical docs
---

# Technical docs

This section is for developers and system administrators. It covers connecting external
services to Grist, extending Grist with custom widgets, and installing and configuring
a self-hosted Grist instance.

## Building integrations

Grist has a [REST API](api.md) for reading and modifying documents, workspaces,
and team sites programmatically, with
[client libraries](rest-api.md#api-clients) available in several languages and
an interactive [API Console](https://docs.getgrist.com/apiconsole).

You can react to data changes in real time using [webhooks](webhooks.md), connect Grist to
thousands of other apps through [integrator platforms](integrators.md) like Zapier, n8n,
and Make, or [embed](embedding.md) live Grist views directly into your website. The
[Custom Widget API](code/README.md) lets you create entirely new widget types that
interact with Grist documents. If you're building a third-party tool, AI agent, or
internal app that needs to act on a user's data on their behalf, register it as an
[OAuth app](oauth-apps.md), which users can authorize on specific documents and
can revoke at any time.

## Self-hosted Grist

Grist can be [installed on your own infrastructure](self-managed.md) using Docker. The
self-hosted section covers installation, storage, the
[Admin Panel](admin-panel.md),
[authentication](install/authentication-overview.md) (OIDC, SAML, and other methods),
and more.

Grist Community edition is free, open-source and fully functional for many use cases. The
[full version of Grist](self-managed.md#how-do-i-enable-the-full-edition-of-grist) adds features for organizations that need tighter security, compliance, and
operational control, including
[audit logging](install/audit-log-overview.md) with
[streaming to SIEM systems](install/audit-log-streaming.md),
[Admin Controls](admin-controls.md) for managing users and resources,
[cloud storage](install/cloud-storage.md) integration (Azure, S3),
[email notifications](self-managed.md#how-do-i-set-up-email-notifications),
and an [AI Assistant](assistant.md) configurable with your own AI provider.
