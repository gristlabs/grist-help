# Interface: FetchSelectedOptions

[grist-plugin-api](../modules/grist_plugin_api.md).FetchSelectedOptions

Options for functions which fetch data from the selected table or record:

- [onRecords](../modules/grist_plugin_api.md#onrecords)
- [onRecord](../modules/grist_plugin_api.md#onrecord)
- [fetchSelectedRecord](../modules/grist_plugin_api.md#fetchselectedrecord)
- [fetchSelectedTable](../modules/grist_plugin_api.md#fetchselectedtable)
- [GristView.fetchSelectedRecord](grist_plugin_api.GristView.md#fetchselectedrecord)
- [GristView.fetchSelectedTable](grist_plugin_api.GristView.md#fetchselectedtable)

The different methods have different default values for `keepEncoded` and `format`.

## Table of contents

### Properties

- [format](grist_plugin_api.FetchSelectedOptions.md#format)
- [includeColumns](grist_plugin_api.FetchSelectedOptions.md#includecolumns)
- [keepEncoded](grist_plugin_api.FetchSelectedOptions.md#keepencoded)

## Properties

### format

• `Optional` **format**: ``"columns"`` \| ``"rows"``

- `rows`, the returned data will be an array of objects, one per row, with column names as keys.
- `columns`, the returned data will be an object with column names as keys, and arrays of values.

___

### includeColumns

• `Optional` **includeColumns**: ``"shown"`` \| ``"normal"`` \| ``"all"``

- `shown` (default): return only columns that are explicitly shown
  in the right panel configuration of the widget. This is the only value that doesn't require full access.
- `normal`: return all 'normal' columns, regardless of whether the user has shown them.
- `all`: also return special invisible columns like `manualSort` and display helper columns.

___

### keepEncoded

• `Optional` **keepEncoded**: `boolean`

- `true`: the returned data will contain raw [CellValue](../modules/GristData.md#cellvalue)'s.
- `false`: the values will be decoded, replacing e.g. `['D', timestamp]` with a moment date.
