---
title: grist-plugin-api
---

# Module: grist-plugin-api

## Table of contents

### Interfaces

- [AccessTokenOptions](../interfaces/grist_plugin_api.AccessTokenOptions.md)
- [AccessTokenResult](../interfaces/grist_plugin_api.AccessTokenResult.md)
- [ColumnToMap](../interfaces/grist_plugin_api.ColumnToMap.md)
- [CursorPos](../interfaces/grist_plugin_api.CursorPos.md)
- [CustomSectionAPI](../interfaces/grist_plugin_api.CustomSectionAPI.md)
- [FetchSelectedOptions](../interfaces/grist_plugin_api.FetchSelectedOptions.md)
- [GristColumn](../interfaces/grist_plugin_api.GristColumn.md)
- [GristDocAPI](../interfaces/grist_plugin_api.GristDocAPI.md)
- [GristTable](../interfaces/grist_plugin_api.GristTable.md)
- [GristView](../interfaces/grist_plugin_api.GristView.md)
- [InteractionOptions](../interfaces/grist_plugin_api.InteractionOptions.md)
- [InteractionOptionsRequest](../interfaces/grist_plugin_api.InteractionOptionsRequest.md)
- [ParseOptionSchema](../interfaces/grist_plugin_api.ParseOptionSchema.md)
- [ParseOptions](../interfaces/grist_plugin_api.ParseOptions.md)
- [ReadyPayload](../interfaces/grist_plugin_api.ReadyPayload.md)
- [RenderOptions](../interfaces/grist_plugin_api.RenderOptions.md)
- [WidgetAPI](../interfaces/grist_plugin_api.WidgetAPI.md)
- [WidgetColumnMap](../interfaces/grist_plugin_api.WidgetColumnMap.md)

### Type Aliases

- [ColumnsToMap](grist_plugin_api.md#columnstomap)
- [UIRowId](grist_plugin_api.md#uirowid)

### Variables

- [checkers](grist_plugin_api.md#checkers)
- [docApi](grist_plugin_api.md#docapi)
- [sectionApi](grist_plugin_api.md#sectionapi)
- [selectedTable](grist_plugin_api.md#selectedtable)
- [viewApi](grist_plugin_api.md#viewapi)
- [widgetApi](grist_plugin_api.md#widgetapi)

### Functions

- [allowSelectBy](grist_plugin_api.md#allowselectby)
- [clearOptions](grist_plugin_api.md#clearoptions)
- [fetchSelectedRecord](grist_plugin_api.md#fetchselectedrecord)
- [fetchSelectedTable](grist_plugin_api.md#fetchselectedtable)
- [getAccessToken](grist_plugin_api.md#getaccesstoken)
- [getOption](grist_plugin_api.md#getoption)
- [getOptions](grist_plugin_api.md#getoptions)
- [getTable](grist_plugin_api.md#gettable)
- [mapColumnNames](grist_plugin_api.md#mapcolumnnames)
- [mapColumnNamesBack](grist_plugin_api.md#mapcolumnnamesback)
- [on](grist_plugin_api.md#on)
- [onNewRecord](grist_plugin_api.md#onnewrecord)
- [onOptions](grist_plugin_api.md#onoptions)
- [onRecord](grist_plugin_api.md#onrecord)
- [onRecords](grist_plugin_api.md#onrecords)
- [ready](grist_plugin_api.md#ready)
- [setCursorPos](grist_plugin_api.md#setcursorpos)
- [setOption](grist_plugin_api.md#setoption)
- [setOptions](grist_plugin_api.md#setoptions)
- [setSelectedRows](grist_plugin_api.md#setselectedrows)

## Type Aliases

### ColumnsToMap

Ƭ **ColumnsToMap**: (`string` \| [`ColumnToMap`](../interfaces/grist_plugin_api.ColumnToMap.md))[]

Tells Grist what columns a Custom Widget expects and allows users to map between existing column names
and those requested by the Custom Widget.

___

### UIRowId

Ƭ **UIRowId**: `number` \| ``"new"``

Represents the id of a row in a table. The value of the `id` column. Might be a number or 'new' value for a new row.

## Variables

### checkers

• `Const` **checkers**: `Pick`<`ICheckerSuite`, ``"CustomSectionAPI"`` \| ``"ParseOptions"`` \| ``"ParseFileResult"`` \| ``"FileSource"`` \| ``"ParseOptionSchema"`` \| ``"GristTables"`` \| ``"EditOptionsAPI"`` \| ``"ParseFileAPI"`` \| ``"RenderTarget"`` \| ``"RenderOptions"`` \| ``"ComponentKind"`` \| ``"GristAPI"`` \| ``"GristDocAPI"`` \| ``"GristView"`` \| ``"GristColumn"`` \| ``"GristTable"`` \| ``"ImportSourceAPI"`` \| ``"ImportProcessorAPI"`` \| ``"ImportSource"`` \| ``"FileContent"`` \| ``"FileListItem"`` \| ``"URL"`` \| ``"InternalImportSourceAPI"`` \| ``"Storage"`` \| ``"WidgetAPI"``\>

We also create and export a global checker object that includes all of the types above.

___

### docApi

• `Const` **docApi**: [`GristDocAPI`](../interfaces/grist_plugin_api.GristDocAPI.md) & [`GristView`](../interfaces/grist_plugin_api.GristView.md)

A collection of methods for fetching document data. The
fetchSelectedTable and fetchSelectedRecord methods are
overridden to decode data by default.

___

### sectionApi

• `Const` **sectionApi**: [`CustomSectionAPI`](../interfaces/grist_plugin_api.CustomSectionAPI.md)

Interface for the mapping of a custom widget.

___

### selectedTable

• `Const` **selectedTable**: [`TableOperations`](../interfaces/TableOperations.TableOperations.md)

Get the current selected table (for custom widgets).

___

### viewApi

• `Const` **viewApi**: [`GristView`](../interfaces/grist_plugin_api.GristView.md)

Interface for the records backing a custom widget.

___

### widgetApi

• `Const` **widgetApi**: [`WidgetAPI`](../interfaces/grist_plugin_api.WidgetAPI.md)

Interface for the state of a custom widget.

## Functions

### allowSelectBy

▸ **allowSelectBy**(): `Promise`<`void`\>

Deprecated now. It was used for filtering selected table by `setSelectedRows` method.
Now the preferred way it to use ready message.

#### Returns

`Promise`<`void`\>

___

### clearOptions

▸ **clearOptions**(): `Promise`<`void`\>

Clears all the options.

#### Returns

`Promise`<`void`\>

___

### fetchSelectedRecord

▸ **fetchSelectedRecord**(`rowId`, `options?`): `Promise`<`any`\>

Same as [GristView.fetchSelectedRecord](../interfaces/grist_plugin_api.GristView.md#fetchselectedrecord),
but the option `keepEncoded` is `false` by default.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowId` | `number` |
| `options` | [`FetchSelectedOptions`](../interfaces/grist_plugin_api.FetchSelectedOptions.md) |

#### Returns

`Promise`<`any`\>

___

### fetchSelectedTable

▸ **fetchSelectedTable**(`options?`): `Promise`<`any`\>

Same as [GristView.fetchSelectedTable](../interfaces/grist_plugin_api.GristView.md#fetchselectedtable),
but the option `keepEncoded` is `false` by default.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`FetchSelectedOptions`](../interfaces/grist_plugin_api.FetchSelectedOptions.md) |

#### Returns

`Promise`<`any`\>

___

### getAccessToken

▸ **getAccessToken**(`options?`): `Promise`<[`AccessTokenResult`](../interfaces/grist_plugin_api.AccessTokenResult.md)\>

Get an access token, for making API calls outside of the custom widget
API. There is no caching of tokens. The returned token can
be used to authorize regular REST API calls that access the content of the
document. For example, in a custom widget for a table with a `Photos` column
containing attachments, the following code will update the `src` of an
image with id `the_image` to show the attachment:
```js
grist.onRecord(async (record) => {
  const tokenInfo = await grist.docApi.getAccessToken({readOnly: true});
  const img = document.getElementById('the_image');
  const id = record.Photos[0];  // get an id of an attachment - there could be several
                                // in a cell, for this example we just take the first.
  const src = `${tokenInfo.baseUrl}/attachments/${id}/download?auth=${tokenInfo.token}`;
  img.setAttribute('src', src);
});
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`AccessTokenOptions`](../interfaces/grist_plugin_api.AccessTokenOptions.md) |

#### Returns

`Promise`<[`AccessTokenResult`](../interfaces/grist_plugin_api.AccessTokenResult.md)\>

___

### getOption

▸ **getOption**(`key`): `Promise`<`any`\>

Get single value from Widget options object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`any`\>

___

### getOptions

▸ **getOptions**(): `Promise`<``null`` \| `object`\>

Gets all options stored by the widget. Options are stored as plain JSON object.

#### Returns

`Promise`<``null`` \| `object`\>

___

### getTable

▸ **getTable**(`tableId?`): [`TableOperations`](../interfaces/TableOperations.TableOperations.md)

Get access to a table in the document. If no tableId specified, this
will use the current selected table (for custom widgets).
If a table does not exist, there will be no error until an operation
on the table is attempted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableId?` | `string` |

#### Returns

[`TableOperations`](../interfaces/TableOperations.TableOperations.md)

___

### mapColumnNames

▸ **mapColumnNames**(`data`, `options?`): `any`

Renames columns in the result using columns mapping configuration passed in ready method.
Returns null if not all required columns were mapped or not widget doesn't support
custom column mapping.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `options?` | `Object` |
| `options.columns?` | [`ColumnsToMap`](grist_plugin_api.md#columnstomap) |
| `options.mappings?` | ``null`` \| [`WidgetColumnMap`](../interfaces/grist_plugin_api.WidgetColumnMap.md) |
| `options.reverse?` | `boolean` |

#### Returns

`any`

___

### mapColumnNamesBack

▸ **mapColumnNamesBack**(`data`, `options?`): `any`

Offer a convenient way to map data with renamed columns back into the
form used in the original table. This is useful for making edits to the
original table in a widget with column mappings. As for mapColumnNames(),
we don't attempt to do these transformations automatically.

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `any` |
| `options?` | `Object` |
| `options.columns?` | [`ColumnsToMap`](grist_plugin_api.md#columnstomap) |
| `options.mappings?` | ``null`` \| [`WidgetColumnMap`](../interfaces/grist_plugin_api.WidgetColumnMap.md) |

#### Returns

`any`

___

### on

▸ **on**(`eventName`, `listener`): `Rpc`

Adds the `listener` function to the end of the listeners array for the
event named `eventName`. No checks are made to see if the `listener` has
already been added. Multiple calls passing the same combination of `eventName`and `listener` will result in the `listener` being added, and called, multiple
times.

```js
server.on('connection', (stream) => {
  console.log('someone connected!');
});
```

Returns a reference to the `EventEmitter`, so that calls can be chained.

By default, event listeners are invoked in the order they are added. The`emitter.prependListener()` method can be used as an alternative to add the
event listener to the beginning of the listeners array.

```js
const myEE = new EventEmitter();
myEE.on('foo', () => console.log('a'));
myEE.prependListener('foo', () => console.log('b'));
myEE.emit('foo');
// Prints:
//   b
//   a
```

**`Since`**

v0.1.101

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `eventName` | `string` \| `symbol` | The name of the event. |
| `listener` | (...`args`: `any`[]) => `void` | The callback function |

#### Returns

`Rpc`

___

### onNewRecord

▸ **onNewRecord**(`callback`): `void`

For custom widgets, add a handler that will be called whenever the
new (blank) row is selected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`mappings`: ``null`` \| [`WidgetColumnMap`](../interfaces/grist_plugin_api.WidgetColumnMap.md)) => `unknown` |

#### Returns

`void`

___

### onOptions

▸ **onOptions**(`callback`): `void`

For custom widgets, add a handler that will be called whenever the
widget options change (and on initial ready message). Handler will be
called with an object containing saved json options, or null if no options were saved.
The second parameter has information about the widgets relationship with
the document that contains it.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`options`: `any`, `settings`: [`InteractionOptions`](../interfaces/grist_plugin_api.InteractionOptions.md)) => `unknown` |

#### Returns

`void`

___

### onRecord

▸ **onRecord**(`callback`, `options?`): `void`

For custom widgets, add a handler that will be called whenever the
row with the cursor changes - either by switching to a different row, or
by some value within the row potentially changing.  Handler may
in the future be called with null if the cursor moves away from
any row.
By default, `options.keepEncoded` is `false`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`data`: ``null`` \| [`RowRecord`](../interfaces/GristData.RowRecord.md), `mappings`: ``null`` \| [`WidgetColumnMap`](../interfaces/grist_plugin_api.WidgetColumnMap.md)) => `unknown` |
| `options` | [`FetchSelectedOptions`](../interfaces/grist_plugin_api.FetchSelectedOptions.md) |

#### Returns

`void`

___

### onRecords

▸ **onRecords**(`callback`, `options?`): `void`

For custom widgets, add a handler that will be called whenever the
selected records change.
By default, `options.format` is `'rows'` and `options.keepEncoded` is `false`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`data`: [`RowRecord`](../interfaces/GristData.RowRecord.md)[], `mappings`: ``null`` \| [`WidgetColumnMap`](../interfaces/grist_plugin_api.WidgetColumnMap.md)) => `unknown` |
| `options` | [`FetchSelectedOptions`](../interfaces/grist_plugin_api.FetchSelectedOptions.md) |

#### Returns

`void`

___

### ready

▸ **ready**(`settings?`): `void`

Declare that a component is prepared to receive messages from the outside world.
Grist will not attempt to communicate with it until this method is called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `settings?` | [`ReadyPayload`](../interfaces/grist_plugin_api.ReadyPayload.md) |

#### Returns

`void`

___

### setCursorPos

▸ **setCursorPos**(`pos`): `Promise`<`void`\>

Sets the cursor position to a specific row and field. `sectionId` is ignored. Used for widget linking.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pos` | [`CursorPos`](../interfaces/grist_plugin_api.CursorPos.md) |

#### Returns

`Promise`<`void`\>

___

### setOption

▸ **setOption**(`key`, `value`): `Promise`<`void`\>

Store single value in the Widget options object (and create it if necessary).

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`Promise`<`void`\>

___

### setOptions

▸ **setOptions**(`options`): `Promise`<`void`\>

Replaces all options stored by the widget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

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
