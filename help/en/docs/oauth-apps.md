---
title: OAuth apps
---

# OAuth apps

OAuth apps let an external tool, AI agent, or partner application act on a
Grist user's data on their behalf, with permissions and document scope the
user controls.

For end-user framing of the same feature — what users see when they authorize
your app — see [Connected apps](connected-apps.md). This page covers how to
build one.

## When to use OAuth instead of API keys

A Grist [API key](rest-api.md) is fine when *you* are the actor: scripts you
run yourself, one-off automations, integrators where a user pastes their own
key into their own account.

Prefer OAuth when:

- **You're building software for someone else's team.** A custom proposal
  generator, a survey app, an operations dashboard — each user on the
  customer's team connects to their employer's Grist with their own
  permissions and their own attribution. You never hold customer credentials,
  and the customer's existing access rules apply automatically.
- **You're connecting an internal app that acts as each user.** Retool,
  Appsmith, in-house web apps, custom dashboards. Edits flow into Grist
  under each user's own name; the app itself never holds anyone's key.
- **You're building an AI agent.** The user grants access to specific
  documents, can revoke at any time, and you don't need to ask them to mint
  an API key.

## Availability

OAuth apps are part of the Enterprise edition of Grist (`grist-ee` and
`grist-saas`). They are not available in `grist-core`.

On self-hosted installations the OAuth server runs on your infrastructure;
authentication, token issuance, validation, and revocation happen on systems
you control.

## Register an OAuth app

Visit your [Profile Settings](https://docs.getgrist.com/account) →
**Developer** → **OAuth apps** → **Register app**.

You'll provide:

- **Application name** — shown on the consent screen.
- **Application URI** — the app's homepage URL. If you don't supply a
  redirect URI, Grist will use `<application-URI>/oauth2/callback`.
- **Redirect URI** — where users return after authorizing. Must match
  exactly when your app starts the flow. You can add more redirect URIs
  later from the app's settings page.

After registering, copy the **client ID** and **client secret**. The secret
is shown once. If you lose it, you can regenerate it from the app's
settings page — old credentials stop working immediately.

From the app's settings page you can also edit the application URI,
support contact, description, and the set of scopes the app is allowed to
request.

## The authorization flow

OAuth apps use the OAuth 2.0 authorization code flow with **PKCE
required**. There is no implicit or password grant.

Discovery endpoints publish the rest:

```
GET https://<your-grist-server>/.well-known/openid-configuration
GET https://<your-grist-server>/.well-known/oauth-authorization-server
```

These return the authorization, token, revocation, JWKS, and userinfo
endpoints. The examples below show the conventional paths.

### 1. Send the user to the authorization endpoint

```
GET /oidc/auth
  ?response_type=code
  &client_id=<CLIENT-ID>
  &redirect_uri=<YOUR-REDIRECT-URI>
  &scope=doc:read+offline_access
  &state=<CSRF-TOKEN>
  &code_challenge=<PKCE-CHALLENGE>
  &code_challenge_method=S256
```

Include `offline_access` if your app needs a refresh token for long-lived
access. Without it the user will need to re-authorize each session.

The user signs in (if needed), picks which documents, workspaces, or team
sites to grant, and confirms. Grist redirects back to your `redirect_uri`
with `?code=...&state=...`.

### 2. Exchange the code for tokens

```
POST /oidc/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic base64(client_id:client_secret)

grant_type=authorization_code
&code=<CODE>
&redirect_uri=<YOUR-REDIRECT-URI>
&code_verifier=<PKCE-VERIFIER>
```

The response includes `access_token`, `refresh_token` (if `offline_access`
was granted), `expires_in`, `token_type: "Bearer"`, and the granted
`scope`.

Access tokens start with `grist_at_` and refresh tokens with `grist_rt_`.
They are opaque — do not try to decode them.

### 3. Call the Grist API

Pass the access token in the `Authorization` header, the same way as an
API key:

```sh
curl -H "Authorization: Bearer grist_at_..." \
  https://<your-grist-server>/api/docs/<DOC-ID>/tables/<TABLE-ID>/records
```

Endpoints check the granted scopes and the granted resource list. A
request for a document the user didn't include in the grant returns 403,
even though the user themselves has access to that document.

### 4. Refresh

```
POST /oidc/token
Content-Type: application/x-www-form-urlencoded
Authorization: Basic base64(client_id:client_secret)

grant_type=refresh_token
&refresh_token=<REFRESH-TOKEN>
```

Refresh tokens rotate. Each refresh may return a new refresh token; if it
does, store it and discard the old one. Tokens used past their TTL or after
the grant has been revoked return `invalid_grant`.

### Revoke

```
POST /oidc/token/revocation
Content-Type: application/x-www-form-urlencoded
Authorization: Basic base64(client_id:client_secret)

token=<ACCESS-OR-REFRESH-TOKEN>
```

Users can also revoke your app from their Authorized apps page at any
time. When they do, all of that user's tokens for your app stop working
immediately.

## Scopes

| Scope | Grants |
|---|---|
| `doc:read` | Read records, schema, and document structure. |
| `doc:write` | Create, update, and delete records. |
| `doc.schema:write` | Update document structure and formulas. Equivalent to the **Structure** permission in [access rules](access-rules.md); formulas can bypass access rules. |
| `doc:download` | Download the full document and run SQL queries. |
| `doc:webhooks` | Manage [webhooks](webhooks.md). |
| `offline_access` | Issue a refresh token. Request `prompt=consent` when starting the flow. |

Grist also accepts the standard OIDC identity scopes `openid`, `email`, and
`profile` for sign-in flows.

[Access rules](access-rules.md) apply on top of scopes: an authorized app
sees and changes only what the authorizing user could see and change.

## Granting access to specific documents

When the user authorizes your app, they can choose **All documents** or pick
specific documents, workspaces, or team sites. The selection is enforced on
every API call. Your app does not need to do anything to support this —
calls to non-granted documents simply return 403.

If your app needs access to a document the user didn't grant, the user can
adjust the grant from their Authorized apps page, or you can prompt them to
re-authorize.

## Token lifetimes

Defaults on a current Grist installation:

- Access token: 1 hour.
- Refresh token: 60 days, rotated on use.
- The underlying grant persists until the user revokes it.

A monthly automation that uses its refresh token at least every 30 days will
keep working indefinitely. Operators may change these values.

## Notes for production

- **Keep your client secret on a server**, not in a browser or mobile app.
- **Discovery is authoritative.** Use the discovery document to find
  endpoints rather than hardcoding paths, so your app keeps working if
  Grist's mount points change.
- **Token prefixes (`grist_at_`, `grist_rt_`) are stable.** You can use them
  to recognize Grist credentials in logs without inspecting payloads.
- **Resource indicators (RFC 8707) are not used.** Per-document granting is
  expressed through the consent screen and enforced server-side; clients
  request scopes only.

## Related

- [Connected apps](connected-apps.md) — end-user view of the same feature.
- [REST API usage](rest-api.md) — calling Grist with an access token uses
  the same endpoints as an API key.
- [API reference](api.md) — full list of endpoints.
