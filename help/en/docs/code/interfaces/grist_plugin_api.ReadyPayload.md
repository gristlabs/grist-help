# Interface: ReadyPayload

[grist-plugin-api](../modules/grist_plugin_api.md).ReadyPayload

Options when initializing connection to Grist.

## Hierarchy

- `Omit`<[`InteractionOptionsRequest`](grist_plugin_api.InteractionOptionsRequest.md), ``"hasCustomOptions"``\>

  ↳ **`ReadyPayload`**

## Table of contents

### Properties

- [allowSelectBy](grist_plugin_api.ReadyPayload.md#allowselectby)
- [columns](grist_plugin_api.ReadyPayload.md#columns)
- [onEditOptions](grist_plugin_api.ReadyPayload.md#oneditoptions)
- [requiredAccess](grist_plugin_api.ReadyPayload.md#requiredaccess)

## Properties

### allowSelectBy

• `Optional` **allowSelectBy**: `boolean`

Show widget as linking source.

#### Inherited from

Omit.allowSelectBy

___

### columns

• `Optional` **columns**: [`ColumnsToMap`](../modules/grist_plugin_api.md#columnstomap)

Tells Grist what columns Custom Widget expects and allows user to map between existing column names
and those requested by Custom Widget.

#### Inherited from

Omit.columns

___

### onEditOptions

• `Optional` **onEditOptions**: () => `unknown`

#### Type declaration

▸ (): `unknown`

Handler that will be called by Grist to open additional configuration panel inside the Custom Widget.

##### Returns

`unknown`

___

### requiredAccess

• `Optional` **requiredAccess**: `string`

Required access level. If it wasn't granted already, Grist will prompt user to change the current access
level.

#### Inherited from

Omit.requiredAccess
