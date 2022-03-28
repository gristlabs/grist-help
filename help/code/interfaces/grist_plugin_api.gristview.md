# Interface: GristView

[grist-plugin-api](../modules/grist_plugin_api.md).GristView

Interface for the data backing a single widget.

## Table of contents

### Methods

- [allowSelectBy](grist_plugin_api.gristview.md#allowselectby)
- [fetchSelectedRecord](grist_plugin_api.gristview.md#fetchselectedrecord)
- [fetchSelectedTable](grist_plugin_api.gristview.md#fetchselectedtable)
- [setSelectedRows](grist_plugin_api.gristview.md#setselectedrows)

## Methods

### allowSelectBy

▸ **allowSelectBy**(): `Promise`<void\>

Allow custom widget to be listed as a possible source for linking with SELECT BY.

#### Returns

`Promise`<void\>

___

### fetchSelectedRecord

▸ **fetchSelectedRecord**(`rowId`): `Promise`<any\>

Similar TODO to `fetchSelectedTable()` for return type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowId` | `number` |

#### Returns

`Promise`<any\>

___

### fetchSelectedTable

▸ **fetchSelectedTable**(): `Promise`<any\>

Like [GristDocAPI.fetchTable](grist_plugin_api.gristdocapi.md#fetchtable), but gets data for the custom section specifically, if there is any.
TODO: return type is Promise{[colId: string]: CellValue[]}> but cannot be specified because
ts-interface-builder does not properly support index-signature.

#### Returns

`Promise`<any\>

___

### setSelectedRows

▸ **setSelectedRows**(`rowIds`): `Promise`<void\>

Set the list of selected rows to be used against any linked widget. Requires `allowSelectBy()`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowIds` | `number`[] |

#### Returns

`Promise`<void\>
