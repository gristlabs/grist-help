---
title: Suggestions
---

# Suggestions

!!! warning "Note"
    Suggestions are experimental and have many limitations in their current form. They are also subject to change and withdrawal.

Previously, making changes to data in a Grist document was either in real time, or done by copying a document and replacing the original with the new version. If you enable suggestions, you can now manage collaborative changes with a workflow similar to [version control](https://en.wikipedia.org/wiki/Version_control){:target="\_blank"} in computer science. 

A user makes changes in a personal copy without modifying the original document, then submits these suggestions to be reviewed by the document owner prior to integration. This workflow can be useful in more sensitive contexts, or for crowdsourcing data easily with additional quality control. 

## Limitations

In their current experimental state, suggestions have the following limitations:
  * They only track changes to data (not structre, views, widgets, formulas, or other metadata).
  * They only work for documents **without** access rules.
  * They only work for documents **without** forms.
  * They need to be enabled on a per-document basis.

## Enabling suggestions

To enable suggestions, go to 'Document Settings' and check the toggle "Enable suggestions". Once this is enabled, all users (signed-in and guests) will be able to make suggestions. 