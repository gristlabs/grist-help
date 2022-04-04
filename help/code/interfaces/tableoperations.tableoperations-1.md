# Interface: TableOperations

[TableOperations](../modules/tableoperations.md).TableOperations

Offer CRUD-style operations on a table.

## Table of contents

### Methods

- [create](tableoperations.tableoperations-1.md#create)
- [destroy](tableoperations.tableoperations-1.md#destroy)
- [getTableId](tableoperations.tableoperations-1.md#gettableid)
- [update](tableoperations.tableoperations-1.md#update)
- [upsert](tableoperations.tableoperations-1.md#upsert)

## Methods

### create

▸ **create**(`records`, `options?`): `Promise`<MinimalRecord\>

Create a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | `NewRecord` |
| `options?` | [OpOptions](tableoperations.opoptions.md) |

#### Returns

`Promise`<MinimalRecord\>

▸ **create**(`records`, `options?`): `Promise`<MinimalRecord[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | `NewRecord`[] |
| `options?` | [OpOptions](tableoperations.opoptions.md) |

#### Returns

`Promise`<MinimalRecord[]\>

___

### destroy

▸ **destroy**(`recordId`): `Promise`<number\>

Delete a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `recordId` | `number` |

#### Returns

`Promise`<number\>

▸ **destroy**(`recordIds`): `Promise`<number[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `recordIds` | `number`[] |

#### Returns

`Promise`<number[]\>

___

### getTableId

▸ **getTableId**(): `Promise`<string\>

Determine the tableId of the table.

#### Returns

`Promise`<string\>

___

### update

▸ **update**(`records`, `options?`): `Promise`<void\>

Update a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | `Record` \| `Record`[] |
| `options?` | [OpOptions](tableoperations.opoptions.md) |

#### Returns

`Promise`<void\>

___

### upsert

▸ **upsert**(`records`, `options?`): `Promise`<void\>

Add or update a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | `AddOrUpdateRecord` \| `AddOrUpdateRecord`[] |
| `options?` | [UpsertOptions](tableoperations.upsertoptions.md) |

#### Returns

`Promise`<void\>
