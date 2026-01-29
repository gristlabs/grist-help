---
title: Authentication overview
---

# Authentication overview

Authentication secures your Grist installation by requiring users to verify their identity with an external identity provider using methods such as OIDC and SAML. Together with [sharing](../sharing.md) and [access rules](../access-rules.md), authentication enables secure collaboration by limiting access to documents and other resources on your installation to permitted users only.

## Getting started

Grist offers several authentication methods to help satisfy each organization's specific security requirements. If you're not sure which method to use, we recommend [Sign in with getgrist.com](sign-in-with-grist.md).

### Sign in with getgrist.com {: .tag-core .tag-ee}
Sign in with getgrist.com allows users on your Grist server to sign in using their account on getgrist.com, which is the cloud version of Grist managed by Grist Labs.

If you don’t already have an existing login solution to integrate with Grist, getgrist.com authentication is the simplest way to get authentication up and running. User registration and authentication are fully handled by Grist Labs, while your documents and data stay on your server.

getgrist.com authentication is built on the industry-standard OAuth 2.0 and OpenID Connect (OIDC) protocols. When signing in, users will be redirected to the getgrist.com sign-in page to log in or register. After authenticating using their getgrist.com credentials, they'll be redirected back to your Grist server and signed in with the same credentials.

[Learn more about setting up Sign in with getgrist.com](sign-in-with-grist.md).

### OpenID Connect (OIDC) {: .tag-core .tag-ee}
OIDC allows users on your Grist server to sign in using an external identity provider that supports the OIDC standard.

When signing in, users will be redirected to your chosen identity provider's login page to authenticate. After successful authentication, they'll be redirected back to your Grist server and signed in as the user verified by the provider.

[Learn more about setting up OIDC](oidc.md).

### SAML {: .tag-core .tag-ee}
SAML allows users on your Grist server to sign in using an external identity provider that supports the SAML 2.0 standard.


When signing in, users will be redirected to your chosen identity provider's login page to authenticate. After successful authentication, they'll be redirected back to your Grist server and signed in as the user verified by the provider.

[Learn more about setting up SAML](saml.md).

### Forwarded headers {: .tag-core .tag-ee}
Forwarded headers allow your Grist server to trust authentication performed by an external proxy such as [Traefik ForwardAuth](https://doc.traefik.io/traefik/reference/routing-configuration/http/middlewares/forwardauth/).

When a user accesses Grist, the proxy handles authentication and forwards verified user information through HTTP headers. Grist uses these headers to identify the user.

[Learn more about setting up forwarded headers](forwarded-headers.md).

### GristConnect {: .tag-ee}
GristConnect is a Grist-centric implementation of [DiscourseConnect](https://meta.discourse.org/t/setup-discourseconnect-official-single-sign-on-for-discourse-sso/13045), a [Discourse](https://discourse.org/) feature to configure Single Sign-On (SSO). You can use GristConnect if your site or SSO supports DiscourseConnect or can be extended to support GristConnect.

[Learn more about setting up GristConnect](grist-connect.md).
