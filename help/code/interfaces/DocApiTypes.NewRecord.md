# Interface: NewRecord

[DocApiTypes](../modules/DocApiTypes.md).NewRecord

JSON schema for api /record endpoint. Used in POST method for adding new records.

## Table of contents

### Properties

- [fields](DocApiTypes.NewRecord.md#fields)

## Properties

### fields

• `Optional` **fields**: `Object`

Initial values of cells in record. Optional, if not set cells are left
blank.

#### Index signature

▪ [coldId: `string`]: [`CellValue`](../modules/GristData.md#cellvalue)
