# Interface: RowRecords

[GristData](../modules/GristData.md).RowRecords

Map of column ids to `CellValue` arrays, where array indexes correspond to
rows.

### CellValue

Each `CellValue` may either be a primitive (e.g. `true`, `123`, `"hello"`, `null`)
or a tuple (JavaScript Array) representing a Grist object. The first element of the tuple
is a string character representing the object code. For example, `["L", "foo", "bar"]`
is a `CellValue` of a Choice List column, where `"L"` is the type, and `"foo"` and
`"bar"` are the choices.

### Grist Object Types

| Code | Type           |
| ---- | -------------- |
| L    | List           |
| l    | LookUp         |
| O    | Dict           |
| D    | DateTime       |
| d    | Date           |
| C    | Censored       |
| R    | Reference      |
| r    | ReferenceList  |
| E    | Exception      |
| P    | Pending        |
| U    | Unmarshallable |
| V    | Version        |
