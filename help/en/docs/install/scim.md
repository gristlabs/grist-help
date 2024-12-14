---
title: SCIM
---

SCIM {: .tag-core .tag-ee }
====

!!! warning "🚧 Status of SCIM"
    As of November 2024, the SCIM endpoint is experimental and in active development. Also please note that group management is not supported yet.

## Use case and difference with SSO systems 

Grist supports authentication via [OIDC](oidc.md) or [SAML](saml.md) to allow users to log in securely. However, when managing large organizations with dynamic user bases, manual user management (creation, updating, and deletion of accounts) can become complex and time-consuming. This is where the System for Cross-domain Identity Management (SCIM) comes in.

### The role of OIDC or SAML

Protocols like OIDC and SAML focus primarily on authentication and authorization, ensuring that users can securely log in and access Grist. These protocols support Single Sign-On (SSO), allowing users to authenticate once and gain seamless access to multiple services, including Grist. However, these protocols do not manage user lifecycle tasks such as:

- Provisioning and deprovisioning users as soon as they enter or leave your organization, respectively.
- Assigning users to groups so they are given access to resources.
- Updating your users' information.

### Benefits of using SCIM in Grist

This is for all of the tasks mentioned above where SCIM intervene. For example, when you make changes to users or user groups in an identity provider, SCIM will automatically propagate those changes across every service provider (i.e. Grist) that supports the SCIM API.

Also, SCIM allows you to deprovision users as soon as they leave. This ensures that they cannot log in without waiting their sessions to expire, which is a step toward complying with the GDPR if your organization is based in Europe.

## The standard

For more details on the SCIM standard, refer to the official IETF specifications: [RFC7643](https://www.rfc-editor.org/rfc/rfc7643) and [RFC7644](https://www.rfc-editor.org/rfc/rfc7644).

## The API

The SCIM implementation is documented in the [Grist Rest API reference](/api/#tag/scim).

## Enabling and configuring SCIM

Below is a list of environment variables you may use to configure SCIM:

- `GRIST_ENABLE_SCIM`: set its value to `true` so you enable the SCIM endpoints.
- `GRIST_SCIM_USER`: (optional) give this variable the email address of an account to give it access to the SCIM endpoints.

!!! Note "About GRIST_SCIM_USER"
    Although instance administrators (identified by the emails set in `GRIST_DEFAULT_EMAIL` or `GRIST_SUPPORT_EMAIL`) can access SCIM endpoints, it is recommended to create a dedicated account using `GRIST_SCIM_USER` for your identity provider to interact with these endpoints. This follows the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).
