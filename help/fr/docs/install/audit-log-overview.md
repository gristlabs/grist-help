# Aperçu des journaux d'audit {: .tag-ee }

Grist supporte la surveillance en temps réel de l'activité dans votre installation en
diffusant des journaux d'événements d'audit vers un système externe de gestion des informations et événements de sécurité
(SIEM) tel que Splunk.

## Qu'est-ce que les journaux d'audit ?

Les journaux d'audit sont un enregistrement d'événements déclenchés par des actions effectuées dans votre
installation qui vous aident à répondre à des questions comme "quand un espace de travail
a-t-il été supprimé ?" ou "qui a invité un collaborateur à un document ?" Les journaux d'audit peuvent
aider à maintenir la conformité et à identifier la mauvaise utilisation des ressources de l'organisation.

## À propos des événements de journaux d'audit

Les événements de journaux d'audit incluent l'action qui s'est produite, qui a effectué l'action,
quand et où l'action s'est produite, et tous les détails supplémentaires concernant l'action
en question.

Par exemple, l'action `document.create` se produit lorsqu'un document est créé
dans votre installation, et inclut des détails comme l'ID et le nom du document créé
et son espace de travail.

```json
{
  "id": "806ed0d9-7d25-4df2-9a6c-f7d2f6b8dba6",
  "action": "document.create",
  "actor": {
    "type": "user",
    "user": {
      "id": 146,
      "email": "flapjack@example.com",
      "name": "Flapjack Toasty"
    }
  },
  "context": {
    "ip_address": "39.139.42.243",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "session_id": "ixVo6maPbcgd1vvoj93teT",
    "site": {
      "id": 42,
      "name": "Grist Labs",
      "domain": "gristlabs"
    }
  },
  "timestamp": "2024-11-13T06:00:51.518Z",
  "details": {
    "document": {
      "id": "4cq1mNTkQmEF5KsUVGiy6H",
      "name": "Untitled document"
    }
  }
}
```

Pour une liste complète des événements qui peuvent apparaître, voir
["Événements de journaux d'audit pour votre instance auto-gérée"](audit-log-events.md).

## Diffusion des événements de journaux d'audit

Les administrateurs d'installation peuvent configurer la diffusion des événements de journaux d'audit vers des systèmes
SIEM externes depuis le Panneau d'administration. Pour plus d'informations, voir
["Diffusion des journaux d'audit."](audit-log-streaming.md)
