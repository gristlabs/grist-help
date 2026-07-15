# Interface: LinkingInfo

[grist-plugin-api](../modules/grist_plugin_api.md).LinkingInfo

Linking state of a custom widget's section, reported to the widget via InteractionOptions.

## Table of contents

### Properties

- [asSource](grist_plugin_api.LinkingInfo.md#assource)
- [asTarget](grist_plugin_api.LinkingInfo.md#astarget)

## Properties

### asSource

• **asSource**: `boolean`

True if at least one other section uses this section as its link source.

___

### asTarget

• **asTarget**: ``null`` \| [`LinkType`](../modules/grist_plugin_api.md#linktype)

If this section is a link target (driven by another section), the type of that link.
Null if no incoming link.
