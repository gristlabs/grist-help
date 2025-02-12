---
title: Document settings
---

## Document settings

While a document is open, you can access the document's settings from the user menu or from the Tools menu in the left-hand navigation panel.

*![document-settings](images/document-settings.png){: .screenshot4}*
{: .screenshot-half }

The Document Settings page allows you to configure key defaults for your document, including:

- **Timezone:** Sets the default timezone, affecting date and datetime calculations.
- **Locale:** Determines regional formatting for dates and numbers.
- **Currency:** Defines the default currency symbol and format used in the document.

<span class="screenshot-large">*![document-settings-details](images/document-settings/document-settings-details.png)*</span>

You can also change how the document opens for users:

- **Regular:** Standard document behavior. All users access and edit the same shared document.
- **Template:** Document automatically opens in [fiddle mode](glossary.md#fiddle-mode), allowing users to make temporary edits without saving changes to the original. If they want to keep changes, they must save a copy.
- **Tutorial:** Document automatically opens as a user-specific copy, which they can edit freely without affecting others.

### Data Engine

The Data Engine section provides tools to monitor and optimize document performance:

- **Formula Timer:** Grist’s built-in [formula timer](formula-timer.md) measures how long each formula takes to evaluate. This helps identify slow-performing formulas that may impact how quickly a document opens or responds to changes.
- **Reload Data Engine:** Performs a hard reset of the data engine, forcing the document to reload. This can help resolve certain performance issues.
- **Python Version:** Allows you to switch the Python version used for formulas. We recommend using Python 3, but be aware that changing this setting may affect existing formulas.

<span class="screenshot-large">*![document-settings-data-engine](images/document-settings/document-settings-data-engine.png)*</span>

### API

The API section provides tools for integrating your document with external services and automating tasks. It includes:

- **Document ID:** A unique identifier for API use, referred to as `doId` within our [API documentation](api.md).
- **API Console:** A built-in web interface for testing API calls directly.
- **Webhooks:** Allow you to notify external services when rows are added or modified in a table. See our [Webhooks documentation](webhooks.md) for setup details.

<span class="screenshot-large">*![document-settings-api](images/document-settings/document-settings-api.png)*</span>

