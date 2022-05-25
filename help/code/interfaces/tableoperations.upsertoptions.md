# Interface: UpsertOptions

[TableOperations](../modules/tableoperations.md).UpsertOptions

Extra options for upserts.

## Hierarchy

- [OpOptions](tableoperations.opoptions.md)

  ↳ **UpsertOptions**

## Table of contents

### Properties

- [add](tableoperations.upsertoptions.md#add)
- [allowEmptyRequire](tableoperations.upsertoptions.md#allowemptyrequire)
- [onMany](tableoperations.upsertoptions.md#onmany)
- [parseStrings](tableoperations.upsertoptions.md#parsestrings)
- [update](tableoperations.upsertoptions.md#update)

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

• `Optional` **onMany**: ``"none"`` \| ``"first"`` \| ``"all"``

Whether to update none, one, or all matching records. Defaults to "first".

___

### parseStrings

• `Optional` **parseStrings**: `boolean`

Whether to parse strings based on the column type. Defaults to true.

#### Inherited from

[OpOptions](tableoperations.opoptions.md).[parseStrings](tableoperations.opoptions.md#parsestrings)

___

### update

• `Optional` **update**: `boolean`

Permit updating a record. Defaults to true.
