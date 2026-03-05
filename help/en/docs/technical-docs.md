---
title: Technical docs
---

# Technical docs

This section covers everything you need to build on Grist and run it on your own
infrastructure. Whether you're integrating Grist with other tools, embedding it in your
application, or self-hosting a Grist installation, you'll find the relevant guides here.

## Building integrations

Connect Grist to external services and build custom workflows using the API, webhooks,
and third-party platforms.

- [**REST API usage**](rest-api.md) — authenticate and make API calls to read and modify
  documents, workspaces, and sites.
- [**API reference**](api.md) — complete reference for all available API endpoints.
- [**Integrator services**](integrators.md) — connect Grist with platforms like Zapier,
  n8n, Make, Pabbly Connect, and others.
- [**Embedding**](embedding.md) — embed live Grist views, charts, and pages into your
  website or application.
- [**Webhooks**](webhooks.md) — get notified when rows are added or changed in a table.
- [**Plugin API**](code/README.md) — build custom widgets that interact with Grist
  documents.
- [**API client libraries**](rest-api.md#api-clients) — official and community client
  libraries in Python, JavaScript, Go, R, and more.

## Self-hosted Grist

Install and configure Grist on your own infrastructure — available as open-source
(Core) or with enterprise features.

- [**Self-managed Grist**](self-managed.md) — install Grist with Docker, configure
  sandboxing, storage, and environment variables.
- [**Cloud storage**](install/cloud-storage.md) — set up persistent storage for
  documents.
- [**Grist Builder Edition**](install/grist-builder-edition.md) — deploy a pre-packaged
  Grist from the AWS or Azure marketplace.
- [**Admin panel**](admin-panel.md) — manage installation settings, security, and
  versioning.
- [**Admin controls**](admin-controls.md) — manage users, organizations, workspaces,
  and documents.
- [**AI Assistant**](install/assistant.md) — configure AI features for your
  installation.

### Authentication

Set up user authentication for your self-hosted Grist. See the
[authentication overview](install/authentication-overview.md) for a comparison of
available methods, including [OIDC](install/oidc.md), [SAML](install/saml.md),
[forwarded headers](install/forwarded-headers.md), and more.

### Audit logs

Monitor activity on your installation with [audit logs](install/audit-log-overview.md).
You can [stream events](install/audit-log-streaming.md) to external systems like Splunk.

### Telemetry

Optionally share anonymous usage data to help improve Grist. See
[telemetry](telemetry.md) for configuration details.
