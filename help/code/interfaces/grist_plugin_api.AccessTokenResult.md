# Interface: AccessTokenResult

[grist-plugin-api](../modules/grist_plugin_api.md).AccessTokenResult

Access token information, including the token string itself, a base URL for
API calls for which the access token can be used, and the time-to-live the
token was created with.

## Table of contents

### Properties

- [baseUrl](grist_plugin_api.AccessTokenResult.md#baseurl)
- [token](grist_plugin_api.AccessTokenResult.md#token)
- [ttlMsecs](grist_plugin_api.AccessTokenResult.md#ttlmsecs)

## Properties

### baseUrl

• **baseUrl**: `string`

The base url of the API for which the token can be used. Currently tokens
are associated with a single document, so the base url will be something
like `https://..../api/docs/DOCID`

Access tokens currently only grant access to endpoints dealing with the
internal content of a document (such as tables and cells) and not its
metadata (such as the document name or who it is shared with).

___

### token

• **token**: `string`

The token string, which can currently be provided in an api call as a
query parameter called "auth"

___

### ttlMsecs

• **ttlMsecs**: `number`

Number of milliseconds the access token will remain valid for
after creation. This will be several minutes.
