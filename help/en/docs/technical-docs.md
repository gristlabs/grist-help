---
title: Technical docs
---

# Technical docs

This section is for developers and system administrators. It covers connecting external
services to Grist, extending Grist with custom widgets, and installing and configuring
a self-hosted Grist instance.

## Building integrations

Grist has a [REST API](rest-api.md) for reading and modifying documents, workspaces,
and team sites programmatically, with
[client libraries](rest-api.md#api-clients) available in several languages. You can
react to data changes in real time using [webhooks](webhooks.md), connect Grist to
thousands of other apps through [integrator platforms](integrators.md) like Zapier, n8n,
and Make, or [embed](embedding.md) live Grist views directly into your website. The
[Custom Widget API](code/README.md) lets you create entirely new widget types that
interact with Grist documents.

## Self-hosted Grist

Grist can be [installed on your own infrastructure](self-managed.md) using Docker. The self-hosted section covers installation, storage, the [admin panel](admin-panel.md),
[authentication](install/authentication-overview.md) (OIDC, SAML, and other methods), and more.
