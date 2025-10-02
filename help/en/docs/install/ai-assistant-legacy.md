---
title: AI Formula Assistant (Legacy)
---

AI Formula Assistant (Legacy) {: .tag-core }
==============

!!! warning "Note"
    This documentation refers to the legacy AI Formula Assistant, which is only available on the [Community edition](https://github.com/gristlabs/grist-core){:target="\_blank"}. You can find the documentation for the current Assistant [here](assistant.md).

## How to set up the AI Assistant

You can use the AI Formula Assistant in self-managed Grist with your AI provider of choice or a local model. The AI Formula Assistant currently only supports chat completion API endpoints such as those provided by OpenAI (e.g. `/v1/chat/completions`).

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
ASSISTANT_MODEL=anthropic/claude-3.7-sonnet
```

## Environment variables

Refer to the full list of [AI Assistant-related environment variables here](https://github.com/gristlabs/grist-core#ai-formula-assistant-related-variables-all-optional){:target="\_blank"}.
