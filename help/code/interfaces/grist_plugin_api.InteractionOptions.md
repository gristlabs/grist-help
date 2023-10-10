# Interface: InteractionOptions

[grist-plugin-api](../modules/grist_plugin_api.md).InteractionOptions

Widget configuration set and approved by Grist, sent as part of ready message.

## Table of contents

### Properties

- [accessLevel](grist_plugin_api.InteractionOptions.md#accesslevel)
- [theme](grist_plugin_api.InteractionOptions.md#theme)

## Properties

### accessLevel

• **accessLevel**: `string`

Granted access level.

___

### theme

• **theme**: `any`

Information about the current Grist theme.

Includes the theme appearance ("light" or "dark"), and a mapping of UI elements to
CSS color values. The CSS values are also accessible within a widget via CSS variables
prefixed with "--grist-theme-" (e.g. `var(--grist-theme-text)`).

NOTE: the variables aren't yet finalized and may change in the future.
