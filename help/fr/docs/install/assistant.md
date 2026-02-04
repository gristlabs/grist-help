---
title: Assistant
---

Assistant pour les auto-hébergeurs {: .tag-ee }
==============

!!! warning "Note"
    Cette documentation fait référence à l'[Assistant](../assistant.md) actuel, qui n'est disponible que sur l'édition Enterprise. Vous pouvez trouver la documentation pour l'Assistant de Formule IA legacy [ici](ai-assistant-legacy.md).

## Comment configurer l'Assistant

Vous pouvez utiliser l'[Assistant](../assistant.md) dans Grist auto-hébergé avec votre fournisseur d'IA de choix ou un modèle local. L'Assistant ne supporte actuellement que les points de terminaison d'API de complétion de chat tels que ceux fournis par OpenAI (par exemple `/v1/chat/completions`), et les modèles qui supportent l'appel d'outils et la sortie structurée.

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
ASSISTANT_MODEL=anthropic/claude-sonnet-4.5
```

L'Assistant est connu pour fonctionner avec les modèles OpenRouter suivants :

 * `openai/gpt-4o-2024-08-06` (dernier test : 10-02-2025)
 * `anthropic/claude-sonnet-4.5` (dernier test : 10-02-2025)

Si un modèle que vous ne voyez pas a fonctionné pour vous, vous pouvez [ouvrir une pull request](https://github.com/gristlabs/grist-help/edit/master/help/en/docs/install/assistant.md) et l'ajouter à la liste.

## Variables d'environnement

 * `ASSISTANT_CHAT_COMPLETION_ENDPOINT` : le point de terminaison de complétion de chat à utiliser (par défaut : `https://api.openai.com/v1/chat/completions`)
 * `ASSISTANT_API_KEY` : une clé API à inclure dans les requêtes au point de terminaison de complétion de chat
 * `ASSISTANT_MODEL` : la valeur du paramètre `model` pour le point de terminaison de complétion de chat (par défaut : `gpt-4o-2024-08-06`)
 * `ASSISTANT_LONGER_CONTEXT_MODEL` : si défini, réessayer les requêtes qui dépassent les limites de contexte avec ce modèle
 * `ASSISTANT_MAX_TOOL_CALLS` : le nombre maximum d'appels d'outils autorisés dans une seule requête (par défaut : `10`)
