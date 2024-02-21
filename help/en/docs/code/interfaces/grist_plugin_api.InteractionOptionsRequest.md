# Interface: InteractionOptionsRequest

[grist-plugin-api](../modules/grist_plugin_api.md).InteractionOptionsRequest

Initial message sent by the CustomWidget with initial requirements.

## Table of contents

### Properties

- [allowSelectBy](grist_plugin_api.InteractionOptionsRequest.md#allowselectby)
- [columns](grist_plugin_api.InteractionOptionsRequest.md#columns)
- [hasCustomOptions](grist_plugin_api.InteractionOptionsRequest.md#hascustomoptions)
- [requiredAccess](grist_plugin_api.InteractionOptionsRequest.md#requiredaccess)

## Properties

### allowSelectBy

• `Optional` **allowSelectBy**: `boolean`

Show widget as linking source.

___

### columns

• `Optional` **columns**: [`ColumnsToMap`](../modules/grist_plugin_api.md#columnstomap)

Tells Grist what columns Custom Widget expects and allows user to map between existing column names
and those requested by Custom Widget.

___

### hasCustomOptions

• `Optional` **hasCustomOptions**: `boolean`

Instructs Grist to show additional menu options that will trigger onEditOptions callback, that Widget
can use to show custom options screen.

___

### requiredAccess

• `Optional` **requiredAccess**: `string`

Required access level. If it wasn't granted already, Grist will prompt user to change the current access
level.
