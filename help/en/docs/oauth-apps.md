---
title: OAuth apps
---

# OAuth apps

OAuth apps let an external tool, AI agent, or partner application act on a
Grist user's data on their behalf, with permissions and document scope the
user controls.

This page is reference material for building one. Grist's OAuth server is
standard OAuth 2.0 authorization code flow with PKCE, plus OpenID Connect
for identity. For the protocol itself, see [oauth.net](https://oauth.net/2/)
and [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749); this page
documents only what is Grist-specific.

For the end-user view of the same feature — what users see when they
authorize your app — see [Connected apps](connected-apps.md).

!!! note "Availability"
    OAuth apps are part of the Enterprise edition of Grist (`grist-ee` and
    `grist-saas`). On self-hosted installations the OAuth server runs on
    your infrastructure; authentication, token issuance, validation, and
    revocation all happen on systems you control.

## When OAuth fits better than an API key

A Grist [API key](rest-api.md) is fine when *you* are the actor: scripts
you run yourself, one-off automations, integrators where a user pastes
their own key into their own account.

Prefer OAuth when:

- **You're building software for someone else's team.** Each user connects
  to their employer's Grist with their own permissions and attribution.
  You never hold customer credentials.
- **You're connecting an internal app that acts as each user.** Retool,
  Appsmith, in-house dashboards. Edits flow into Grist under each user's
  own name; the app itself holds no user keys.
- **You're building an AI agent.** The user grants access to specific
  documents and can revoke at any time.

## Discovery

```
GET https://<your-grist-server>/.well-known/openid-configuration
GET https://<your-grist-server>/.well-known/oauth-authorization-server
```

Both URLs return the same document. It lists the authorization, token,
revocation, userinfo, and JWKS endpoints, plus supported scopes, grant
types, and PKCE methods. Use it instead of hardcoding paths.

## Register an app

Visit your [Profile Settings](https://docs.getgrist.com/account) →
**Developer** → **OAuth apps**.

![OAuth apps list in Profile Settings](images/oauth-apps/oauth-apps-list.png)

Click **Register app** and fill in:

- **Application name** — shown on the consent screen.
- **Application URI** — the app's homepage URL.
- **Redirect URI** — where users return after authorizing. Must use
  `https://`; `http://` is allowed only for `localhost`, `127.0.0.1`, and
  `[::1]`. Must match exactly when your app starts the flow. If you omit
  one here, Grist uses `<application-URI>/oauth2/callback`.

![Register-app form](images/oauth-apps/register-app.png)

After registering, copy the **client ID** and **client secret**. The
secret is shown once. From the app's settings page you can add more
redirect URIs, pick which scopes the app is allowed to request, edit the
support contact and description, and regenerate the secret — regeneration
invalidates the previous secret immediately.

![App settings page](images/oauth-apps/app-settings.png)

## Scopes

| Scope | Grants |
|---|---|
| `doc:read` | Read records, schema, and document structure. |
| `doc:write` | Create, update, and delete records. |
| `doc.schema:write` | Update document structure and formulas. Equivalent to the **Structure** permission in [access rules](access-rules.md); formulas can bypass access rules. |
| `doc:download` | Download the full document and run SQL queries. |
| `doc:webhooks` | Manage [webhooks](webhooks.md). |
| `offline_access` | Issue a refresh token. Requires `prompt=consent` on the authorization request. |

Grist also accepts the standard OIDC identity scopes `openid`, `email`,
and `profile` for sign-in flows.

[Access rules](access-rules.md) apply on top of scopes: an authorized app
sees and changes only what the authorizing user can see and change.

## Per-document grants

When the user authorizes your app, they choose **All documents** or pick
specific documents, workspaces, or team sites. The selection is enforced
on every API call: a request for a document outside the grant returns
`403`, even if the user themselves can access that document. Your app
does not need to do anything to support this.

If your app needs a document the user didn't grant, the user can adjust
the selection from their Authorized apps page (see
[Connected apps](connected-apps.md)), or you can prompt them to
re-authorize.

## Tokens

| | Access token | Refresh token |
|---|---|---|
| Prefix | `grist_at_` | `grist_rt_` |
| Format | Opaque — do not parse | Opaque — do not parse |
| Default TTL | 1 hour | 60 days |
| Rotation | n/a | Rotated when used past a fraction of its lifetime; the response may include a new `refresh_token` — if so, store it and discard the old one. |

The underlying grant persists until the user revokes it. A job that
refreshes at least once every 30 days keeps working indefinitely.
Operators may change these defaults.

Revoke a token per [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009):

```
POST /oidc/revocation
```

Accepts either an access or refresh token. Users can also revoke from
their Authorized apps page; doing so invalidates every token issued under
that grant.

## Grist-specific constraints

- **PKCE is required** for every client, S256 recommended.
- **Confidential clients only.** Every registered app has a client
  secret; `token_endpoint_auth_method=none` is not supported. Keep the
  secret on a server, not in a browser or mobile app.
- **`offline_access` requires `prompt=consent`** on the authorization
  request. Without it the request fails with
  `invalid_request: offline_access scope requires prompt=consent`.
- **Resource indicators ([RFC 8707](https://datatracker.ietf.org/doc/html/rfc8707))
  are not used.** Per-document selection happens on the consent screen
  and is enforced server-side; clients request scopes only.
- **Token prefixes (`grist_at_`, `grist_rt_`) are stable** — use them to
  recognize Grist credentials in logs without inspecting payloads.

## Quick start

A minimal end-to-end flow, by way of `curl`:

```sh
# 1. Send the user to:
https://<server>/oidc/auth
    ?response_type=code
    &client_id=<CLIENT-ID>
    &redirect_uri=<REDIRECT-URI>
    &scope=doc:read+offline_access
    &state=<CSRF-TOKEN>
    &code_challenge=<PKCE-CHALLENGE>
    &code_challenge_method=S256
    &prompt=consent

# 2. They return to <REDIRECT-URI>?code=...&state=...
#    Verify state matches, then exchange the code:
curl -u "<CLIENT-ID>:<CLIENT-SECRET>" https://<server>/oidc/token \
  -d grant_type=authorization_code \
  -d code=<CODE> \
  -d redirect_uri=<REDIRECT-URI> \
  -d code_verifier=<PKCE-VERIFIER>
# → { access_token, refresh_token, expires_in, token_type: "Bearer", scope }

# 3. Call the API the same way as with an API key:
curl -H "Authorization: Bearer grist_at_..." \
  https://<server>/api/docs/<DOC-ID>/tables/<TABLE-ID>/records

# 4. Refresh later:
curl -u "<CLIENT-ID>:<CLIENT-SECRET>" https://<server>/oidc/token \
  -d grant_type=refresh_token -d refresh_token=<REFRESH-TOKEN>
```

Errors follow the OAuth 2.0 format: an HTTP 4xx with a JSON body of
`{"error": "...", "error_description": "..."}`.

## Related

- [Connected apps](connected-apps.md) — end-user view of the same feature.
- [REST API usage](rest-api.md) — calling Grist with an access token uses
  the same endpoints as an API key.
- [API reference](api.md) — full list of endpoints.

### Background reading

- [OAuth 2.0](https://oauth.net/2/), [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749)
- [PKCE](https://oauth.net/2/pkce/), [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)
- [OpenID Connect Core](https://openid.net/specs/openid-connect-core-1_0.html)
