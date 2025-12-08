---
title: Assistant
---

Assistant for self-hosters {: .tag-ee }
==============

!!! warning "Note"
    This documentation refers to the current [Assistant](/assistant), which is only available on the Enterprise edition. You can find the documentation for the legacy AI Formula Assistant [here](ai-assistant-legacy.md).

## How to set up the Assistant

You can use the [Assistant](/assistant) in self-hosted Grist with your AI provider of choice or a local model. The Assistant currently only supports chat completion API endpoints such as those provided by OpenAI (e.g. `/v1/chat/completions`), and models that support tool calling and structured output.

To enable the Assistant, specify the completion endpoint to use by setting the `ASSISTANT_CHAT_COMPLETION_ENDPOINT` environment variable as follows:

```sh
ASSISTANT_CHAT_COMPLETION_ENDPOINT=https://api.openai.com/v1/chat/completions
```

If no completion endpoint is specified, `https://api.openai.com/v1/chat/completions` will be used by default.

If the completion endpoint you are using requires authentication, such as the OpenAI endpoint above, you must also set the `ASSISTANT_API_KEY` environment variable. You can obtain an OpenAI API key by [signing up for an account](https://auth.openai.com/create-account) and [generating an API key](https://platform.openai.com/api-keys). Refer to the documentation for your provider on how to obtain an API key.

### Using OpenRouter

The Assistant can also be used with OpenRouter to access a wide range of models, such as Anthropic's Claude Sonnet. As before, you'll need to set `ASSISTANT_CHAT_COMPLETION_ENDPOINT` and `ASSISTANT_API_KEY` to OpenRouter's chat completion
endpoint and your OpenRouter API key, respectively.

```sh
ASSISTANT_CHAT_COMPLETION_ENDPOINT=https://openrouter.ai/api/v1/chat/completions
ASSISTANT_API_KEY=your_openrouter_api_key_here
```

You may then specify the model to use by setting `ASSISTANT_MODEL`:

```sh
ASSISTANT_MODEL=anthropic/claude-sonnet-4.5
```

The Assistant is know to work with the following OpenRouter models:

 * `openai/gpt-4o-2024-08-06` (last tested: 10-02-2025)
 * `anthropic/claude-sonnet-4.5` (last tested: 10-02-2025)

If a model you don't see has worked for you, you may [open a pull request](https://github.com/gristlabs/grist-help/edit/master/help/en/docs/install/assistant.md) and add it to the list.

## Environment variables

 * `ASSISTANT_CHAT_COMPLETION_ENDPOINT`: the chat completion endpoint to use (default: `https://api.openai.com/v1/chat/completions`)
 * `ASSISTANT_API_KEY`: an API key to include in requests to the chat completion endpoint
 * `ASSISTANT_MODEL`: the value of the `model` parameter for the chat completion endpoint (default: `gpt-4o-2024-08-06`)
 * `ASSISTANT_LONGER_CONTEXT_MODEL`: if set, retry requests that exceed context limits with this model
 * `ASSISTANT_MAX_TOOL_CALLS`: the maximum number of tool calls allowed in a single request (default: `10`)
