# Interface: GristView

[grist-plugin-api](../modules/grist_plugin_api.md).GristView

Interface for the data backing a single widget.

## Table of contents

### Methods

- [allowSelectBy](grist_plugin_api.GristView.md#allowselectby)
- [fetchSelectedRecord](grist_plugin_api.GristView.md#fetchselectedrecord)
- [fetchSelectedTable](grist_plugin_api.GristView.md#fetchselectedtable)
- [setCursorPos](grist_plugin_api.GristView.md#setcursorpos)
- [setSelectedRows](grist_plugin_api.GristView.md#setselectedrows)

## Methods

### allowSelectBy

▸ **allowSelectBy**(): `Promise`<`void`\>

Deprecated now. It was used for filtering selected table by `setSelectedRows` method.
Now the preferred way it to use ready message.

#### Returns

`Promise`<`void`\>

___

### fetchSelectedRecord

▸ **fetchSelectedRecord**(`rowId`, `options?`): `Promise`<`any`\>

Fetches selected record by its `rowId`. By default, `options.keepEncoded` is `true`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowId` | `number` |
| `options?` | [`FetchSelectedOptions`](grist_plugin_api.FetchSelectedOptions.md) |

#### Returns

`Promise`<`any`\>

___

### fetchSelectedTable

▸ **fetchSelectedTable**(`options?`): `Promise`<`any`\>

Like [GristDocAPI.fetchTable](grist_plugin_api.GristDocAPI.md#fetchtable),
but gets data for the custom section specifically, if there is any.
By default, `options.keepEncoded` is `true` and `format` is `columns`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`FetchSelectedOptions`](grist_plugin_api.FetchSelectedOptions.md) |

#### Returns

`Promise`<`any`\>

___

### setCursorPos

▸ **setCursorPos**(`pos`): `Promise`<`void`\>

Sets the cursor position to a specific row and field. `sectionId` is ignored. Used for widget linking.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`CursorPos`](grist_plugin_api.CursorPos.md) |

#### Returns

`Promise`<`void`\>

___

### setSelectedRows

▸ **setSelectedRows**(`rowIds`): `Promise`<`void`\>

Set the list of selected rows to be used against any linked widget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowIds` | ``null`` \| `number`[] |

#### Returns

`Promise`<`void`\>
