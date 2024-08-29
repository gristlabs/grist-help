---
title: Forwarded headers
---

Forwarded Headers
=================

You may have a middleware that does authentication and then passes identity
on to web applications in a header. If you do, then Grist can be configured
to respect that header.

!!! warning "Warning"
    **The redirection logic for authentication using forwarded headers currently
    assumes a [single team site](../self-managed.md#how-do-i-set-up-a-team)
    configuration, and may misbehave for multi-site configurations.**

To make this work, here is what you'll need to do:

  - Set `GRIST_FORWARD_AUTH_HEADER` to a header that will contain
    authorized user emails, say `x-forwarded-user`. This needs to
	match what your middleware will set.
  - Make sure the `/auth/login` path is handled by your middleware
    before reaching Grist.
  - Set `GRIST_FORWARD_AUTH_LOGOUT_PATH` to a path that will trigger
    a logout for your middleware (for example, `/_oauth/logout`).
    Make sure that the logout path is handled by your middleware!
  - If you want to allow anonymous access in some cases, make sure all
    other Grist paths are free of your middleware. Grist will
    trigger the middleware (by redirecting to `/auth/login`) as needed.
    It's a good idea to strip `GRIST_FORWARD_AUTH_HEADER` from outside requests
    on all paths that aren't handled by your middleware.
  - Your middleware may allow you to specify where to forward the user to
    after logging out. That should be `/signed-out` on the Grist site.

## Example: traefik-forward-auth

[traefik-forward-auth](https://github.com/thomseddon/traefik-forward-auth)
is "A minimal forward authentication service that provides OAuth/SSO
login and authentication for the traefik reverse proxy/load balancer."

  - The `GRIST_FORWARD_AUTH_HEADER` should be `X-Forwarded-User`,
    and this should be set in the `authResponseHeaders` settings for
	traefik.

  - The `GRIST_FORWARD_AUTH_LOGOUT_PATH` should be `/_oauth/logout`,
    unless you have changed the default `url-path` setting for
    traefik-forward-auth.

  - `LOGOUT_REDIRECT` for traefik-forward-auth should be
    `https://<grist-site>/signed-out`.

There are worked examples at [A template for self-hosting Grist with traefik and docker compose](https://community.getgrist.com/t/a-template-for-self-hosting-grist-with-traefik-and-docker-compose/856) and [Grist Omnibus](https://github.com/gristlabs/grist-omnibus).

## Troubleshooting

For many, this method of authentication works great. A user with multiple
web apps served by the same middleware had difficulty coordinating logouts.
That could be resolved by applying the middleware to all Grist paths
and setting `GRIST_IGNORE_SESSION=true` so Grist has no separate notion
of who is signed in. But then sharing some documents with everyone
publically (without signing in) became a problem. Note that with `GRIST_IGNORE_SESSION=true`,
Grist will trust `GRIST_FORWARD_AUTH_HEADER` on all requests, so it is imperative that you have
middleware that overrides or strips this header for _all_ outside requests before forwarding them
to Grist.

If on the contrary you want to be sure the user must be logged in before
using Grist in any way, you can set `GRIST_FORCE_LOGIN=true`.
