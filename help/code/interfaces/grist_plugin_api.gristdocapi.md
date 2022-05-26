# Interface: GristDocAPI

[grist-plugin-api](../modules/grist_plugin_api.md).GristDocAPI

Allows getting information from and interacting with the Grist document to which a plugin or widget is attached.

## Table of contents

### Methods

- [applyUserActions](grist_plugin_api.gristdocapi.md#applyuseractions)
- [fetchTable](grist_plugin_api.gristdocapi.md#fetchtable)
- [getDocName](grist_plugin_api.gristdocapi.md#getdocname)
- [listTables](grist_plugin_api.gristdocapi.md#listtables)

## Methods

### applyUserActions

▸ **applyUserActions**(`actions`, `options?`): `Promise`<any\>

Applies an array of user actions.

#### Parameters

| Name | Type |
| :------ | :------ |
| `actions` | `any`[][] |
| `options?` | `any` |

#### Returns

`Promise`<any\>

___

### fetchTable

▸ **fetchTable**(`tableId`): `Promise`<any\>

Returns a complete table of data as [RowRecords](grist_plugin_api.rowrecords.md), including the
'id' column. Do not modify the returned arrays in-place, especially if used
directly (not over RPC).

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableId` | `string` |

#### Returns

`Promise`<any\>

___

### getDocName

▸ **getDocName**(): `Promise`<string\>

Returns an identifier for the document.

#### Returns

`Promise`<string\>

___

### listTables

▸ **listTables**(): `Promise`<string[]\>

Returns a sorted list of table IDs.

#### Returns

`Promise`<string[]\>
