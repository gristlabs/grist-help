# Interface: ReadyPayload

[grist-plugin-api](../modules/grist_plugin_api.md).ReadyPayload

Options when initializing connection to Grist.

## Hierarchy

- `Omit`<[InteractionOptionsRequest](grist_plugin_api.interactionoptionsrequest.md), ``"hasCustomOptions"``\>

  ↳ **ReadyPayload**

## Table of contents

### Properties

- [columns](grist_plugin_api.readypayload.md#columns)
- [onEditOptions](grist_plugin_api.readypayload.md#oneditoptions)
- [requiredAccess](grist_plugin_api.readypayload.md#requiredaccess)

## Properties

### columns

• `Optional` **columns**: `ColumnsToMap`

Tells Grist what columns Custom Widget expects and allows user to map between existing column names
and those requested by Custom Widget.

#### Inherited from

Omit.columns

___

### onEditOptions

• **onEditOptions**: () => `unknown`

Handler that will be called by Grist to open additional configuration panel inside the Custom Widget.

#### Type declaration

▸ (): `unknown`

##### Returns

`unknown`

___

### requiredAccess

• `Optional` **requiredAccess**: `string`

Required access level. If it wasn't granted already, Grist will prompt user to change the current access
level.

#### Inherited from

Omit.requiredAccess
