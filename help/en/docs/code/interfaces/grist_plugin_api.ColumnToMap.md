# Interface: ColumnToMap

[grist-plugin-api](../modules/grist_plugin_api.md).ColumnToMap

API definitions for CustomSection plugins.

## Table of contents

### Properties

- [allowMultiple](grist_plugin_api.ColumnToMap.md#allowmultiple)
- [description](grist_plugin_api.ColumnToMap.md#description)
- [name](grist_plugin_api.ColumnToMap.md#name)
- [optional](grist_plugin_api.ColumnToMap.md#optional)
- [strictType](grist_plugin_api.ColumnToMap.md#stricttype)
- [title](grist_plugin_api.ColumnToMap.md#title)
- [type](grist_plugin_api.ColumnToMap.md#type)

## Properties

### allowMultiple

• `Optional` **allowMultiple**: `boolean`

Allow multiple column assignment, the result will be list of mapped table column names.

___

### description

• `Optional` **description**: ``null`` \| `string`

Optional long description of a column (used as a help text in section mapping).

___

### name

• **name**: `string`

Column name that Widget expects. Must be a valid JSON property name.

___

### optional

• `Optional` **optional**: `boolean`

Mark column as optional all columns are required by default.

___

### strictType

• `Optional` **strictType**: `boolean`

Match column type strictly, so "Any" will require "Any" and not any other type.

___

### title

• `Optional` **title**: ``null`` \| `string`

Title or short description of a column (used as a label in section mapping).

___

### type

• `Optional` **type**: `string`

Column types (as comma separated list), by default "Any", what means that any type is
allowed (unless strictType is true).
