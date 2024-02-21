# Interface: TableOperations

[TableOperations](../modules/TableOperations.md).TableOperations

Offer CRUD-style operations on a table.

## Table of contents

### Methods

- [create](TableOperations.TableOperations.md#create)
- [destroy](TableOperations.TableOperations.md#destroy)
- [getTableId](TableOperations.TableOperations.md#gettableid)
- [update](TableOperations.TableOperations.md#update)
- [upsert](TableOperations.TableOperations.md#upsert)

## Methods

### create

▸ **create**(`records`, `options?`): `Promise`<[`MinimalRecord`](DocApiTypes.MinimalRecord.md)\>

Create a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | [`NewRecord`](DocApiTypes.NewRecord.md) |
| `options?` | [`OpOptions`](TableOperations.OpOptions.md) |

#### Returns

`Promise`<[`MinimalRecord`](DocApiTypes.MinimalRecord.md)\>

___

### destroy

▸ **destroy**(`recordIds`): `Promise`<`void`\>

Delete a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `recordIds` | `number` \| `number`[] |

#### Returns

`Promise`<`void`\>

___

### getTableId

▸ **getTableId**(): `Promise`<`string`\>

Determine the tableId of the table.

#### Returns

`Promise`<`string`\>

___

### update

▸ **update**(`records`, `options?`): `Promise`<`void`\>

Update a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | [`Record`](DocApiTypes.Record.md) \| [`Record`](DocApiTypes.Record.md)[] |
| `options?` | [`OpOptions`](TableOperations.OpOptions.md) |

#### Returns

`Promise`<`void`\>

___

### upsert

▸ **upsert**(`records`, `options?`): `Promise`<`void`\>

Add or update a record or records.

#### Parameters

| Name | Type |
| :------ | :------ |
| `records` | [`AddOrUpdateRecord`](DocApiTypes.AddOrUpdateRecord.md) \| [`AddOrUpdateRecord`](DocApiTypes.AddOrUpdateRecord.md)[] |
| `options?` | [`UpsertOptions`](TableOperations.UpsertOptions.md) |

#### Returns

`Promise`<`void`\>
