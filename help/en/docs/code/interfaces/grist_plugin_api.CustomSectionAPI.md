# Interface: CustomSectionAPI

[grist-plugin-api](../modules/grist_plugin_api.md).CustomSectionAPI

Interface for the mapping of a custom widget.

## Table of contents

### Methods

- [configure](grist_plugin_api.CustomSectionAPI.md#configure)
- [mappings](grist_plugin_api.CustomSectionAPI.md#mappings)

## Methods

### configure

▸ **configure**(`customOptions`): `Promise`<`void`\>

Initial request from a Custom Widget that wants to declare its requirements.

#### Parameters

| Name | Type |
| :------ | :------ |
| `customOptions` | [`InteractionOptionsRequest`](grist_plugin_api.InteractionOptionsRequest.md) |

#### Returns

`Promise`<`void`\>

___

### mappings

▸ **mappings**(): `Promise`<``null`` \| [`WidgetColumnMap`](grist_plugin_api.WidgetColumnMap.md)\>

Returns current widget configuration (if requested through configuration method).

#### Returns

`Promise`<``null`` \| [`WidgetColumnMap`](grist_plugin_api.WidgetColumnMap.md)\>
