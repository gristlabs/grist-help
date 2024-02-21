# Interface: WidgetAPI

[grist-plugin-api](../modules/grist_plugin_api.md).WidgetAPI

API to manage Custom Widget state.

## Table of contents

### Methods

- [clearOptions](grist_plugin_api.WidgetAPI.md#clearoptions)
- [getOption](grist_plugin_api.WidgetAPI.md#getoption)
- [getOptions](grist_plugin_api.WidgetAPI.md#getoptions)
- [setOption](grist_plugin_api.WidgetAPI.md#setoption)
- [setOptions](grist_plugin_api.WidgetAPI.md#setoptions)

## Methods

### clearOptions

▸ **clearOptions**(): `Promise`<`void`\>

Clears all the options.

#### Returns

`Promise`<`void`\>

___

### getOption

▸ **getOption**(`key`): `Promise`<`any`\>

Get single value from Widget options object.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`Promise`<`any`\>

___

### getOptions

▸ **getOptions**(): `Promise`<``null`` \| `object`\>

Gets all options stored by the widget. Options are stored as plain JSON object.

#### Returns

`Promise`<``null`` \| `object`\>

___

### setOption

▸ **setOption**(`key`, `value`): `Promise`<`void`\>

Store single value in the Widget options object (and create it if necessary).

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `value` | `any` |

#### Returns

`Promise`<`void`\>

___

### setOptions

▸ **setOptions**(`options`): `Promise`<`void`\>

Replaces all options stored by the widget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |

#### Returns

`Promise`<`void`\>
