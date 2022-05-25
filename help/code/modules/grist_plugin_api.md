# Module: grist-plugin-api

## Table of contents

### Interfaces

- [ColumnToMap](../interfaces/grist_plugin_api.columntomap.md)
- [GristColumn](../interfaces/grist_plugin_api.gristcolumn.md)
- [GristDocAPI](../interfaces/grist_plugin_api.gristdocapi.md)
- [GristTable](../interfaces/grist_plugin_api.gristtable.md)
- [GristView](../interfaces/grist_plugin_api.gristview.md)
- [InteractionOptions](../interfaces/grist_plugin_api.interactionoptions.md)
- [InteractionOptionsRequest](../interfaces/grist_plugin_api.interactionoptionsrequest.md)
- [ParseOptionSchema](../interfaces/grist_plugin_api.parseoptionschema.md)
- [ParseOptions](../interfaces/grist_plugin_api.parseoptions.md)
- [ReadyPayload](../interfaces/grist_plugin_api.readypayload.md)
- [RenderOptions](../interfaces/grist_plugin_api.renderoptions.md)
- [RowRecord](../interfaces/grist_plugin_api.rowrecord.md)
- [RowRecords](../interfaces/grist_plugin_api.rowrecords.md)
- [WidgetAPI](../interfaces/grist_plugin_api.widgetapi.md)
- [WidgetColumnMap](../interfaces/grist_plugin_api.widgetcolumnmap.md)

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
- [getOption](grist_plugin_api.md#getoption)
- [getOptions](grist_plugin_api.md#getoptions)
- [getTable](grist_plugin_api.md#gettable)
- [mapColumnNames](grist_plugin_api.md#mapcolumnnames)
- [mapColumnNamesBack](grist_plugin_api.md#mapcolumnnamesback)
- [onNewRecord](grist_plugin_api.md#onnewrecord)
- [onOptions](grist_plugin_api.md#onoptions)
- [onRecord](grist_plugin_api.md#onrecord)
- [onRecords](grist_plugin_api.md#onrecords)
- [ready](grist_plugin_api.md#ready)
- [setOption](grist_plugin_api.md#setoption)
- [setOptions](grist_plugin_api.md#setoptions)
- [setSelectedRows](grist_plugin_api.md#setselectedrows)

## Variables

### checkers

• `Const` **checkers**: `Pick`<ICheckerSuite, ``"ParseOptions"`` \| ``"ParseFileResult"`` \| ``"FileSource"`` \| ``"ParseOptionSchema"`` \| ``"GristTables"`` \| ``"RenderTarget"`` \| ``"RenderOptions"`` \| ``"GristColumn"`` \| ``"GristTable"`` \| ``"ImportSource"`` \| ``"FileContent"`` \| ``"FileListItem"`` \| ``"URL"`` \| ``"CustomSectionAPI"`` \| ``"EditOptionsAPI"`` \| ``"ParseFileAPI"`` \| ``"ComponentKind"`` \| ``"GristAPI"`` \| ``"GristDocAPI"`` \| ``"GristView"`` \| ``"ImportSourceAPI"`` \| ``"ImportProcessorAPI"`` \| ``"InternalImportSourceAPI"`` \| ``"Storage"`` \| ``"WidgetAPI"``\>

We also create and export a global checker object that includes all of the types above.

___

### docApi

• `Const` **docApi**: [GristDocAPI](../interfaces/grist_plugin_api.gristdocapi.md) & [GristView](../interfaces/grist_plugin_api.gristview.md)

A collection of methods for fetching document data. The
fetchSelectedTable and fetchSelectedRecord methods are
overridden to decode data by default.

___

### sectionApi

• `Const` **sectionApi**: `CustomSectionAPI`

Interface for the mapping of a custom widget.

___

### selectedTable

• `Const` **selectedTable**: [TableOperations](../interfaces/tableoperations.tableoperations-1.md)

Get the current selected table (for custom widgets).

___

### viewApi

• `Const` **viewApi**: [GristView](../interfaces/grist_plugin_api.gristview.md)

Interface for the records backing a custom widget.

___

### widgetApi

• `Const` **widgetApi**: [WidgetAPI](../interfaces/grist_plugin_api.widgetapi.md)

Interface for the state of a custom widget.

## Functions

### allowSelectBy

▸ `Const` **allowSelectBy**(): `Promise`<void\>

Shortcut for [GristView.allowSelectBy](../interfaces/grist_plugin_api.gristview.md#allowselectby).

#### Returns

`Promise`<void\>

___

### clearOptions

▸ `Const` **clearOptions**(): `Promise`<void\>

Shortcut for [WidgetAPI.clearOptions](../interfaces/grist_plugin_api.widgetapi.md#clearoptions)

#### Returns

`Promise`<void\>

___

### fetchSelectedRecord

▸ **fetchSelectedRecord**(`rowId`, `options?`): `Promise`<any\>

Fetches current selected record as for [GristView.fetchSelectedRecord](../interfaces/grist_plugin_api.gristview.md#fetchselectedrecord),
but decoding data by default, replacing e.g. ['D', timestamp] with
a moment date. Option `keepEncoded` skips the decoding step.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowId` | `number` |
| `options?` | `Object` |

#### Returns

`Promise`<any\>

___

### fetchSelectedTable

▸ **fetchSelectedTable**(`options?`): `Promise`<any\>

Fetches data backing the widget as for [GristView.fetchSelectedTable](../interfaces/grist_plugin_api.gristview.md#fetchselectedtable),
but decoding data by default, replacing e.g. ['D', timestamp] with
a moment date. Option `keepEncoded` skips the decoding step.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | `Object` |

#### Returns

`Promise`<any\>

___

### getOption

▸ `Const` **getOption**(`key`): `Promise`<any\>

Shortcut for [WidgetAPI.getOption](../interfaces/grist_plugin_api.widgetapi.md#getoption)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<any\>

___

### getOptions

▸ `Const` **getOptions**(): `Promise`<``null`` \| object\>

Shortcut for [WidgetAPI.getOptions](../interfaces/grist_plugin_api.widgetapi.md#getoptions)

#### Returns

`Promise`<``null`` \| object\>

___

### getTable

▸ **getTable**(`tableId?`): [TableOperations](../interfaces/tableoperations.tableoperations-1.md)

Get access to a table in the document. If no tableId specified, this
will use the current selected table (for custom widgets).
If a table does not exist, there will be no error until an operation
on the table is attempted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `tableId?` | `string` |

#### Returns

[TableOperations](../interfaces/tableoperations.tableoperations-1.md)

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

#### Returns

`any`

___

### onNewRecord

▸ **onNewRecord**(`callback`): `void`

For custom widgets, add a handler that will be called whenever the
new (blank) row is selected.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`mappings`: [WidgetColumnMap](../interfaces/grist_plugin_api.widgetcolumnmap.md) \| ``null``) => `unknown` |

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
| `callback` | (`options`: `any`, `settings`: [InteractionOptions](../interfaces/grist_plugin_api.interactionoptions.md)) => `unknown` |

#### Returns

`void`

___

### onRecord

▸ **onRecord**(`callback`): `void`

For custom widgets, add a handler that will be called whenever the
row with the cursor changes - either by switching to a different row, or
by some value within the row potentially changing.  Handler may
in the future be called with null if the cursor moves away from
any row.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`data`: [RowRecord](../interfaces/grist_plugin_api.rowrecord.md) \| ``null``, `mappings`: [WidgetColumnMap](../interfaces/grist_plugin_api.widgetcolumnmap.md) \| ``null``) => `unknown` |

#### Returns

`void`

___

### onRecords

▸ **onRecords**(`callback`): `void`

For custom widgets, add a handler that will be called whenever the
selected records change.  Handler will be called with a list of records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | (`data`: [RowRecord](../interfaces/grist_plugin_api.rowrecord.md)[], `mappings`: [WidgetColumnMap](../interfaces/grist_plugin_api.widgetcolumnmap.md) \| ``null``) => `unknown` |

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
| `settings?` | [ReadyPayload](../interfaces/grist_plugin_api.readypayload.md) |

#### Returns

`void`

___

### setOption

▸ `Const` **setOption**(`key`, `value`): `Promise`<void\>

Shortcut for [WidgetAPI.setOption](../interfaces/grist_plugin_api.widgetapi.md#setoption)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`Promise`<void\>

___

### setOptions

▸ `Const` **setOptions**(`options`): `Promise`<void\>

Shortcut for [WidgetAPI.setOptions](../interfaces/grist_plugin_api.widgetapi.md#setoptions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`Promise`<void\>

___

### setSelectedRows

▸ `Const` **setSelectedRows**(`rowIds`): `Promise`<void\>

Shortcut for [GristView.setSelectedRows](../interfaces/grist_plugin_api.gristview.md#setselectedrows).

#### Parameters

| Name | Type |
| :------ | :------ |
| `rowIds` | `number`[] |

#### Returns

`Promise`<void\>
