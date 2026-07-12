# Interface: AddOrUpdateRecord

[DocApiTypes](../modules/DocApiTypes.md).AddOrUpdateRecord

JSON schema for api /record endpoint. Used with PUT method for adding or updating records.

## Table of contents

### Properties

- [fields](DocApiTypes.AddOrUpdateRecord.md#fields)
- [require](DocApiTypes.AddOrUpdateRecord.md#require)

## Properties

### fields

• `Optional` **fields**: `Object`

The values we will place in particular columns, either overwriting values in
an existing record, or setting initial values in a new record.

#### Index signature

▪ [colId: `string`]: [`CellValue`](../modules/GristData.md#cellvalue)

___

### require

• **require**: { `[colId: string]`: [`CellValue`](../modules/GristData.md#cellvalue);  } & { `id?`: `number`  }

The values we expect to have in particular columns, either by matching with
an existing record, or creating a new record.
