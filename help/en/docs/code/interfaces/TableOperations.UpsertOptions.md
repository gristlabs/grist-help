# Interface: UpsertOptions

[TableOperations](../modules/TableOperations.md).UpsertOptions

Extra options for upserts.

## Hierarchy

- [`OpOptions`](TableOperations.OpOptions.md)

  ↳ **`UpsertOptions`**

## Table of contents

### Properties

- [add](TableOperations.UpsertOptions.md#add)
- [allowEmptyRequire](TableOperations.UpsertOptions.md#allowemptyrequire)
- [onMany](TableOperations.UpsertOptions.md#onmany)
- [parseStrings](TableOperations.UpsertOptions.md#parsestrings)
- [update](TableOperations.UpsertOptions.md#update)

## Properties

### add

• `Optional` **add**: `boolean`

Permit inserting a record. Defaults to true.

___

### allowEmptyRequire

• `Optional` **allowEmptyRequire**: `boolean`

Allow "wildcard" operation. Defaults to false.

___

### onMany

• `Optional` **onMany**: ``"all"`` \| ``"none"`` \| ``"first"``

Whether to update none, one, or all matching records. Defaults to "first".

___

### parseStrings

• `Optional` **parseStrings**: `boolean`

Whether to parse strings based on the column type. Defaults to true.

#### Inherited from

[OpOptions](TableOperations.OpOptions.md).[parseStrings](TableOperations.OpOptions.md#parsestrings)

___

### update

• `Optional` **update**: `boolean`

Permit updating a record. Defaults to true.
