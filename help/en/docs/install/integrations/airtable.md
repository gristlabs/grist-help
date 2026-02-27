---
title: Airtable
---

# Airtable Integration

## Importing from Airtable

You can [import data from Airtable](https://support.getgrist.com/imports/#import-from-airtable) without any additional
configuration by using Airtable’s personal access tokens.

For enhanced security and convenience, we recommend using OAuth2 based
authentication (["Connect with Airtable"](https://support.getgrist.com/imports/#import-from-airtable)).
However, this method requires an initial setup.

You will need to register a new OAuth2 integration with Airtable by
following [their official guide](https://airtable.com/developers/web/guides/oauth-integrations).

During the Airtable integration setup, ensure you configure the following settings:

* **Redirect URI:** `https://<grist domain>/oauth2/airtable/callback`
* **Scopes:** `data.records:read, schema.bases:read`

Once the integration is successfully set up in Airtable, you must configure your Grist installation by setting the
following environment variables:

| Environment variable          | Value                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------|
| OAUTH2_AIRTABLE_CLIENT_ID   | Use the “Client id” value displayed in your Airtable integration settings.                        |
| OAUTH2_AIRTABLE_CLIENT_SECRET | Press “Generate client secret” in the Airtable integration settings, and use the resulting value. |
| OAUTH2_GRIST_HOST             | If `APP_HOME_URL` isn’t set, this should be set to the URL of your Grist instance in the format `protocol://domain:port`, with the port number being optional. (e.g. `https://grist.example.org`) |

After setting the environment variables, **restart your Grist instance** to apply the configuration changes. You’ll now
be able to [import from Airtable](https://support.getgrist.com/imports/#import-from-airtable) using “Connect with
Airtable”. 
