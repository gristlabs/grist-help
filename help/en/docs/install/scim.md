---
title: SCIM
---

SCIM {: .tag-core .tag-ee }
====

## Use case and difference with SSO systems 

Grist supports authentication via [OIDC](oidc.md) or [SAML](saml.md) to allow users to log in securely. However, when managing large organizations with dynamic user bases, manual user management (creation, updating, and deactivation) can become complex and time-consuming. This is where SCIM becomes essential for user lifecycle management.

### **The Role of OIDC or SAML**

Protocols like **OIDC** and **SAML** focus primarily on **authentication** and **authorization**, ensuring that users can securely log in and access Grist. These protocols support **Single Sign-On (SSO)**, allowing users to authenticate once and gain seamless access to multiple services, including Grist, without repeatedly entering credentials. However, while OIDC and SAML excel at verifying who a user is, they do not manage **user provisioning**, **deprovisioning**, or ongoing user lifecycle tasks such as:

- Automatically creating new users when they join the organization.
- Assigning or updating roles and permissions across Grist and other services.
- Deactivating or deleting users when they leave the company, ensuring they no longer have access.

For organizations leveraging Grist alongside other online services, manually handling these tasks—especially at scale—becomes inefficient and error-prone. This is where **SCIM** offers significant value, by providing a standardized way to automate user management across multiple platforms, including Grist, enabling consistent and efficient user provisioning and deprovisioning across the entire service ecosystem.

### **Benefits of Using SCIM in Grist**

1. **Automation**: SCIM automates the management of users and their roles, reducing the need for manual intervention and minimizing human error. This is crucial for large organizations where keeping track of user access and permissions is a continuous task.

2. **Consistency**: By syncing user data from a central identity provider to Grist, SCIM ensures that user profiles and permissions are consistent across systems, improving security and user experience.

3. **Efficiency**: With SCIM, IT administrators can save time and effort by automating user onboarding and offboarding, especially when integrated with existing identity management solutions like Okta, Azure AD, or other identity providers that support SCIM.

4. **Security**: By automatically deactivating users when they leave the organization, SCIM reduces the risk of orphaned accounts that could be exploited. This ensures that only active employees have access to the platform.

## The Standard

For more details on the SCIM standard, refer to the official IETF specifications: [RFC7643](https://www.rfc-editor.org/rfc/rfc7643) and [RFC7644](https://www.rfc-editor.org/rfc/rfc7644).

## The API

The SCIM implementation is documented in the [Grist Rest API reference](/api/#tag/scim).

## Enabling and configuring SCIM

Below is a list of environment variables you may use to configure SCIM:

- `GRIST_ENABLE_SCIM`: set its value to `true` so you enable the SCIM endpoints;
- `GRIST_SCIM_USER`: (optional) give this variable the email address of an account to give it access to the SCIM endpoints.

!!! Note "About GRIST_SCIM_USER"
    Although instance administrators (identified by the emails set in `GRIST_DEFAULT_EMAIL` or `GRIST_SUPPORT_EMAIL`) can access SCIM endpoints, it is recommended to create a dedicated account using `GRIST_SCIM_USER` for your identity provider to interact with these endpoints. This follows the [principle of least privilege](https://en.wikipedia.org/wiki/Principle_of_least_privilege).
