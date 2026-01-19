---
title: Assistant de Formule IA (Legacy)
---

Assistant de Formule IA (Legacy) {: .tag-core }
==============

!!! warning "Note"
    Cette documentation fait référence à l'Assistant de Formule IA legacy, qui n'est disponible que sur l'[édition Communautaire](https://github.com/gristlabs/grist-core){:target="\_blank"}. Vous pouvez trouver la documentation pour l'Assistant actuel [ici](../assistant.md).

## Comment configurer l'Assistant IA

Vous pouvez utiliser l'Assistant de Formule IA dans Grist auto-hébergé avec votre fournisseur d'IA de choix ou un modèle local. L'Assistant de Formule IA ne supporte actuellement que les points de terminaison d'API de complétion de chat tels que ceux fournis par OpenAI (par exemple `/v1/chat/completions`).

Pour activer l'Assistant, spécifiez le point de terminaison de complétion à utiliser en définissant la variable d'environnement `ASSISTANT_CHAT_COMPLETION_ENDPOINT` comme suit :

```sh
ASSISTANT_CHAT_COMPLETION_ENDPOINT=https://api.openai.com/v1/chat/completions
```

Si aucun point de terminaison de complétion n'est spécifié, `https://api.openai.com/v1/chat/completions` sera utilisé par défaut.

Si le point de terminaison de complétion que vous utilisez nécessite une authentification, comme le point de terminaison OpenAI ci-dessus, vous devez également définir la variable d'environnement `ASSISTANT_API_KEY`. Vous pouvez obtenir une clé API OpenAI en [créant un compte](https://auth.openai.com/create-account) et en [générant une clé API](https://platform.openai.com/api-keys). Référez-vous à la documentation de votre fournisseur pour savoir comment obtenir une clé API.

### Utilisation d'OpenRouter

L'Assistant peut également être utilisé avec OpenRouter pour accéder à une large gamme de modèles, tels que Claude Sonnet d'Anthropic. Comme précédemment, vous devrez définir `ASSISTANT_CHAT_COMPLETION_ENDPOINT` et `ASSISTANT_API_KEY` sur le point de terminaison de complétion de chat d'OpenRouter et votre clé API OpenRouter, respectivement.

```sh
ASSISTANT_CHAT_COMPLETION_ENDPOINT=https://openrouter.ai/api/v1/chat/completions
ASSISTANT_API_KEY=your_openrouter_api_key_here
```

Vous pouvez ensuite spécifier le modèle à utiliser en définissant `ASSISTANT_MODEL` :

```sh
ASSISTANT_MODEL=anthropic/claude-3.7-sonnet
```

## Variables d'environnement

Référez-vous à la liste complète des [variables d'environnement liées à l'Assistant IA ici](https://github.com/gristlabs/grist-core#ai-formula-assistant-related-variables-all-optional){:target="\_blank"}.
