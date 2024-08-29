---
title: SAML
---

SAML {: .tag-core .tag-ee }
====

Configuration for SAML, useful for enterprise single-sign-on logins.
A good informative overview of SAML is at <https://www.okta.com/integrate/documentation/saml/>

Note:

  * SP is "Service Provider", in our case, the Grist application.
  * IdP is the "Identity Provider", somewhere users log into, e.g. Okta or Google Apps.

We will need one or more certificates from the IdP, in PEM format. This is a public
key that Grist will use to check messages from the IdP are legit.

We will need a private and public key pair for Grist to use when communicating with
the IdP. The IdP will need to know the public key for Grist, to check messages from
Grist are legit.

Expected environment variables:

  * `GRIST_SAML_SP_HOST` - this is just the base URL of the Grist site,
    such as `https://<grist-domain>` (when SAML is active, there will
	be a `/saml/assert` endpoint available here for implementing the protocol).
  * `GRIST_SAML_SP_KEY` - path to a file with our private key, in PEM format.
    This is the private key of the key pair created for Grist to use with the IdP.
  * `GRIST_SAML_SP_CERT` - path to file with our public key, in PEM format.
    This is the public key of the key pair created for Grist to use with the IdP.
	It is not the public key/certificate of the IdP.
  * `GRIST_SAML_IDP_LOGIN` - login url to redirect user to for log-in.
  * `GRIST_SAML_IDP_LOGOUT` - logout URL to redirect user to for log-out.
  * `GRIST_SAML_IDP_SKIP_SLO` - if set and non-empty, don't attempt "Single Logout"
    SAML flow, but simply redirect to `GRIST_SAML_IDP_LOGOUT` after clearing session.
	Whether this flow is possible will depend on the IdP.
  * `GRIST_SAML_IDP_CERTS` - comma-separated list of paths for certificates
    from the IdP, in PEM format. This is not the private or public key created for Grist.
  * `GRIST_SAML_IDP_UNENCRYPTED` - if set and non-empty, allow unencrypted assertions,
    relying on https for privacy.

## Example: Auth0

For example, when running on localhost and http, settings that work with the
[Auth0 SAML IdP](https://auth0.com/docs/protocols/saml-protocol/configure-auth0-as-saml-identity-provider) are:

  * `GRIST_SAML_IDP_SKIP_SLO` not set
  * `GRIST_SAML_SP_HOST` = `http://localhost:8484`
  * `GRIST_SAML_IDP_UNENCRYPTED` = `1`
  * `GRIST_SAML_IDP_LOGIN` = `https://...auth0.com/samlp/xxxx`
  * `GRIST_SAML_IDP_LOGOUT` = `https://...auth0.com/samlp/xxxx`  (these are same for Auth0)
  * `GRIST_SAML_IDP_CERTS` = `.../auth0.pem` (downloaded per Auth0 instructions)
  * `GRIST_SAML_SP_KEY` = `.../saml.pem` (created)
  * `GRIST_SAML_SP_CERT` = `.../saml.crt` (created)

When used with docker, make sure that the key and certificate files are accessible
within a shared volume. The key/cert pair were created following instructions here:

  * [Auth0: use custom certificate to sign requests](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/sign-and-encrypt-saml-requests#use-a-custom-key-to-sign-requests)
  * [Auth0 as the SAML identity provider](https://auth0.com/docs/protocols/saml-protocol/saml-sso-integrations/sign-and-encrypt-saml-requests#auth0-as-the-saml-identity-provider)

In your Auth0 settings also make sure that:

 * The "Application Callback URL" is set to `https://<grist-domain>/saml/assert`.

## Example: Authentik

In [Authentik](https://goauthentik.io/), add a Provider called `Grist` with:

  * ACS URL: `https://<grist-domain>/saml/assert`
  * Set Service provider binding to `Post`
  * Select or add a signing certificate. You'll need to download this to use as `GRIST_SAML_IDP_CERTS` in Grist configuration.
  * Add a verification certificate. This will be the public part of a key pair your create for `GRIST_SAML_SP_KEY`/`GRIST_SAML_SP_CERT` in Grist configuration.

Then, still in Authentik, add an Application also called `Grist` (I’m not very imaginative) that:

  * Uses the `Grist` Provider.
  * Has `Launch URL` set to `https://<grist-domain>`.

The Grist settings follow the same pattern as for Auth0. The login and
logout URLs with Authentik at the time of writing look like:

  * `GRIST_SAML_IDP_LOGIN` = `https://...authentik.../application/saml/grist/sso/binding/redirect/`
  * `GRIST_SAML_IDP_LOGOUT` = `https://...authentik.../if/session-end/grist/`

## Example: Google

In [Google Admin](https://admin.google.com/), under the "Apps" section, in "Web and Mobile Apps", add a new custom SAML app.

Set the app name, description and icon to your liking, and click on Next.

Take note of the contents of the field `SSO URL`, and download the provided certificate.

Configure the app in Google Admin as follows:

  * ACS URL: `https://<grist-domain>/saml/assert`
  * Entity ID: `https://<grist-domain>/saml/metadata.xml`
  * Check the Signed Response checkbox.
  * Leave `Start URL` empty, and the `Name ID` settings as default.

Click on Next, and optionally, under Attributes, add two mappings for automatic name population:

  * Google Directory attribute `First Name` set to App attribute `FirstName`
  * Google Directory attribute `Last Name` set to App attribute `LastName` 

Then click on Finish, and configure Grist's settings:

  * `GRIST_SAML_IDP_SKIP_SLO` = `true`
  * `GRIST_SAML_SP_HOST` = `https://<grist-domain>`
  * `GRIST_SAML_IDP_UNENCRYPTED` = `true`
  * `GRIST_SAML_IDP_LOGIN` = `https://accounts.google.com/o/saml2/idp?idpid=xxxx` (provided to you by Google as `SSO URL`)
  * `GRIST_SAML_IDP_LOGOUT` = `https://<grist-domain>` (since Google does not support Single Logout, just return the user to the homepage)
  * `GRIST_SAML_IDP_CERTS` = `.../google.pem` (provided to you by Google earlier)
  * `GRIST_SAML_SP_KEY` = `.../saml.pem`
  * `GRIST_SAML_SP_CERT` = `.../saml.crt`

To create the keypair used in `GRIST_SAML_SP_KEY` and `GRIST_SAML_SP_CERT`, follow the same instructions as for Auth0 and Authentik.

Note: Google does not verify incoming SAML messages, so they do not allow uploading a public key for that purpose.

## Troubleshooting

We expect IdP to provide us with name_id, a unique identifier for the user.
We also use optional attributes for the user's name, for which we accept any of:

  * FirstName
  * LastName
  * http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname
  * http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname

You may need to tweak your IdP's defaults to match Grist's expectations.
