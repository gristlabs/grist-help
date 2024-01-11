# Module: GristData

## Table of contents

### Enumerations

- [GristObjCode](../enums/GristData.GristObjCode.md)

### Interfaces

- [RowRecord](../interfaces/GristData.RowRecord.md)
- [RowRecords](../interfaces/GristData.RowRecords.md)

### Type Aliases

- [CellValue](GristData.md#cellvalue)

## Type Aliases

### CellValue

Ƭ **CellValue**: `number` \| `string` \| `boolean` \| ``null`` \| [[`GristObjCode`](../enums/GristData.GristObjCode.md), ...unknown[]]

Possible types of cell content.

Each `CellValue` may either be a primitive (e.g. `true`, `123`, `"hello"`, `null`)
or a tuple (JavaScript Array) representing a Grist object. The first element of the tuple
is a string character representing the object code. For example, `["L", "foo", "bar"]`
is a `CellValue` of a Choice List column, where `"L"` is the type, and `"foo"` and
`"bar"` are the choices.

### Grist Object Types

| Code | Type           |
| ---- | -------------- |
| `L`  | List, e.g. `["L", "foo", "bar"]` or `["L", 1, 2]` |
| `l`  | LookUp, as `["l", value, options]` |
| `O`  | Dict, as `["O", {key: value, ...}]` |
| `D`  | DateTimes, as `["D", timestamp, timezone]`, e.g. `["D", 1704945919, "UTC"]` |
| `d`  | Date, as `["d", timestamp]`, e.g. `["d", 1704844800]` |
| `C`  | Censored, as `["C"]` |
| `R`  | Reference, as `["R", table_id, row_id]`, e.g. `["R", "People", 17]` |
| `r`  | ReferenceList, as `["r", table_id, row_id_list]`, e.g. `["r", "People", [1,2]]` |
| `E`  | Exception, as `["E", name, ...]`, e.g. `["E", "ValueError"]` |
| `P`  | Pending, as `["P"]` |
| `U`  | Unmarshallable, as `["U", text_representation]` |
| `V`  | Version, as `["V", version_obj]` |
