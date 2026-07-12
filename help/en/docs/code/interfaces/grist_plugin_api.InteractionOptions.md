# Interface: InteractionOptions

[grist-plugin-api](../modules/grist_plugin_api.md).InteractionOptions

Widget configuration set and approved by Grist, sent as part of ready message.

## Table of contents

### Properties

- [accessLevel](grist_plugin_api.InteractionOptions.md#accesslevel)
- [linking](grist_plugin_api.InteractionOptions.md#linking)

## Properties

### accessLevel

• **accessLevel**: `string`

Granted access level.

___

### linking

• `Optional` **linking**: [`LinkingInfo`](grist_plugin_api.LinkingInfo.md)

Linking state of this section at the time of the message. May be absent on older
Grist builds that do not support linking information; when present, fields inside
describe whether this section is a link target and/or a link source.
