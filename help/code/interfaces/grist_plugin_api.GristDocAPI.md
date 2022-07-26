# Interface: GristDocAPI

[grist-plugin-api](../modules/grist_plugin_api.md).GristDocAPI

Allows getting information from and interacting with the Grist document to which a plugin or widget is attached.

## Table of contents

### Methods

- [applyUserActions](grist_plugin_api.GristDocAPI.md#applyuseractions)
- [fetchTable](grist_plugin_api.GristDocAPI.md#fetchtable)
- [getAccessToken](grist_plugin_api.GristDocAPI.md#getaccesstoken)
- [getDocName](grist_plugin_api.GristDocAPI.md#getdocname)
- [listTables](grist_plugin_api.GristDocAPI.md#listtables)

## Methods

### applyUserActions

▸ **applyUserActions**(`actions`, `options?`): `Promise`<`any`\>

Applies an array of user actions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | `any`[][] |
| `options?` | `any` |

#### Returns

`Promise`<`any`\>

___

### fetchTable

▸ **fetchTable**(`tableId`): `Promise`<`any`\>

Returns a complete table of data as RowRecords, including the
'id' column. Do not modify the returned arrays in-place, especially if used
directly (not over RPC).

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableId` | `string` |

#### Returns

`Promise`<`any`\>

___

### getAccessToken

▸ **getAccessToken**(`options`): `Promise`<[`AccessTokenResult`](grist_plugin_api.AccessTokenResult.md)\>

Get a token for out-of-band access to the document. The returned token can
be used to authorize regular REST API calls that access the content of the
document. For example, in a custom widget for a table with a `Photos` column
containing attachments, the following code will update the `src` of an
image with id `the_image` to show the attachment:
```js
grist.onRecord(async (record) => {
  const tokenInfo = await grist.docApi.getAccessToken({readOnly: true});
  const img = document.getElementById('the_image');
  const id = record.Photos[0];  // get an id of an attachment - there could be several,
                                // we just take the first.
  const src = `${tokenInfo.baseUrl}/attachments/${id}/download?auth=${tokenInfo.token}`;
  img.setAttribute('src', src);
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`AccessTokenOptions`](grist_plugin_api.AccessTokenOptions.md) |

#### Returns

`Promise`<[`AccessTokenResult`](grist_plugin_api.AccessTokenResult.md)\>

___

### getDocName

▸ **getDocName**(): `Promise`<`string`\>

Returns an identifier for the document.

#### Returns

`Promise`<`string`\>

___

### listTables

▸ **listTables**(): `Promise`<`string`[]\>

Returns a sorted list of table IDs.

#### Returns

`Promise`<`string`[]\>
