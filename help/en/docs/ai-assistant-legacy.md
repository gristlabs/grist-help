---
title: AI Formula Assistant (Legacy)
---

AI Formula Assistant (Legacy)
==============

!!! warning "Note"
    This documentation refers to the legacy AI Formula Assistant, which is only available on the [Community edition](https://github.com/gristlabs/grist-core){:target="\_blank"}. You can find the documentation for the current Assistant [here](assistant.md).

Grist’s AI Formula Assistant simplifies the hardest part of spreadsheets — formulas. The assistant only does one thing, write formulas in response to plain language queries. 

When asking the assistant a question there’s no need to specify column IDs or explain the structure of your data. When you submit a question to the assistant, Grist sends your question and your data’s schema (in part or whole) to an AI provider ([OpenAI](https://openai.com/){:target="\_blank"} by default) so that the assistant may better understand your document. You can view your data’s schema in [code view.](formulas.md#code-viewer)

No data is shared with the provider unless a user submits a question to the assistant. Learn more about [how data is used](ai-assistant-legacy.md#data-use-policy).

## How to use the AI Assistant

Create a [formula column](formulas.md) and click either the expand icon or the “use AI Assistant” link text in the cell. 

<span class="screenshot-large">*![Opening AI Assistant](images/ai-assistant-legacy/formula-cell-editor.png)*</span>
{: .screenshot-half }

This will open an expanded formula editor with the AI Assistant chat below it. Simply describe what you want the formula to do. [Here are some tips.](ai-assistant-legacy.md#best-practices)

When you apply a suggested formula, you will see the formula previewed in the column. If you are happy with the formula, click “Save”. Otherwise click “Cancel” to discard changes to the formula.

<span class="screenshot-large">*![AI Formula Assistant](images/ai-assistant-legacy/ai-assistant-dialog.png)*</span>
{: .screenshot-half }

## AI Assistant for self-hosters

For self-hosters looking to connect their Grist instance, set the [AI Assistant-related environment variables](https://github.com/gristlabs/grist-core#ai-formula-assistant-related-variables-all-optional){:target="\_blank"}. 

The above variables also enable the use of other models (including self-hostable ones). See [these instructions](install/ai-assistant-legacy.md#using-openrouter) for more information.

Learn more about [self-hosting Grist](self-managed.md). 

## Best Practices

* It helps to understand how [formulas](formulas.md) work in Grist, especially when compared to traditional spreadsheets. In Grist, a single formula applies to a whole column.  If you’ve worked with spreadsheets before, you may be surprised that you don’t need to specify row numbers, like `B1 * C1`. If you’re new to Grist, you might want to try something simple without the assistant to see how formulas behave, e.g. `$Price * $Tax`.  

* Setting a column header before submitting a question improves results. For example, “Net Profit” provides more context than a column labeled “D”.

* Set the [column type](col-types.md) of the formula column before asking the assistant for help. This helps the assistant guess what type of values you’d like returned.

* Think about the type of value you expect to see in the formula, and frame the question with that in mind. For example, if you want a formula that returns True or False in a [Toggle column](col-types.md#toggle-columns), ask a yes-or-no question. Otherwise, the assistant may suggest a formula that lists all rows where something is true (and is technically correct), but you were hoping for a simple true or false per row.

* The assistant is conversational. If you are not satisfied with a suggested formula, explain to the assistant where the formula fell short and ask it to make a change.

* Sometimes the assistant gets stuck on a bad idea. If it keeps insisting on a particular formula method, consider clearing the conversation and starting over. Click the three dot menu in the AI Assistant header to clear a conversation. 

<span class="screenshot-large">*![Clear AI Assistant Conversation](images/ai-assistant-legacy/clear-conversation.png)*</span>
{: .screenshot-half }


* Remember that Grist formulas apply to the whole column. If you want sums of rows, you need a [summary table](summary-tables.md). You may add more formulas to summary tables, and ask the assistant to help you.

## Data Use Policy

If you use Grist at getgrist.com, this article does not apply to you. See the
current Assistant's [data use policy](assistant.md#data-use-policy) instead.

If your self-hosted Grist installation is configured to use this legacy
assistant, your question and your document's schema are sent to the AI
provider the installation is set up with. The provider's privacy and usage
policies govern how your data is handled; your administrator can tell you
which provider is in use.

If you administer a self-hosted installation, you choose the provider and model
(see [AI Assistant for self-hosters](#ai-assistant-for-self-hosters) above).
Review that provider's data and usage policies before enabling the assistant.
