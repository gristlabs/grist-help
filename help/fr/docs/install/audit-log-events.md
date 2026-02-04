---
title: Audit log events
---

# Événements de journaux d'audit pour votre instance auto-gérée {: .tag-ee }

## config

### config.create

Un élément de configuration a été créé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| config | `object` | L'élément de configuration créé. |
| config.id | `number` | L'ID de l'élément de configuration. |
| config.key | `string` | La clé de l'élément de configuration. |
| config.value | `any` | La valeur de l'élément de configuration. |
| config.site *(optionnel)* | `object` | Le site auquel appartient cet élément de configuration. |
| config.site.id | `number` | L'ID du site. |
| config.site.name | `string` | Le nom du site. |
| config.site.domain | `string` | Le domaine du site. |

#### Exemple

```json
{
  "config": {
    "id": 18,
    "key": "audit_log_streaming_destinations",
    "value": [
      {
        "id": "ee6971af-80f5-4654-9bd2-5c6ab33e7ccf",
        "name": "splunk",
        "url": "https://hec.example.com:8088/services/collector/event",
        "token": "Splunk B5A79AAD-D822-46CC-80D1-819F80D7BFB0"
      }
    ],
    "site": {
      "id": 42,
      "name": "Grist Labs",
      "domain": "gristlabs"
    }
  }
}
```

### config.delete

Un élément de configuration a été supprimé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| config | `object` | L'élément de configuration supprimé. |
| config.id | `number` | L'ID de l'élément de configuration. |
| config.key | `string` | La clé de l'élément de configuration. |
| config.value | `any` | La valeur de l'élément de configuration. |
| config.site *(optionnel)* | `object` | Le site auquel appartenait cet élément de configuration. |
| config.site.id | `number` | L'ID du site. |
| config.site.name | `string` | Le nom du site. |
| config.site.domain | `string` | Le domaine du site. |

#### Exemple

```json
{
  "config": {
    "id": 18,
    "key": "audit_log_streaming_destinations",
    "value": [
      {
        "id": "ee6971af-80f5-4654-9bd2-5c6ab33e7ccf",
        "name": "splunk",
        "url": "https://hec.example.com:8088/services/collector/event",
        "token": "Splunk B5A79AAD-D822-46CC-80D1-819F80D7BFB0"
      }
    ],
    "site": {
      "id": 42,
      "name": "Grist Labs",
      "domain": "gristlabs"
    }
  }
}
```

### config.update

Un élément de configuration a été mis à jour.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | Les versions précédentes des ressources affectées. |
| previous.config | `object` | L'élément de configuration précédent. |
| previous.config.id | `number` | L'ID de l'élément de configuration. |
| previous.config.key | `string` | La clé de l'élément de configuration. |
| previous.config.value | `any` | La valeur de l'élément de configuration. |
| previous.config.site *(optionnel)* | `object` | Le site auquel appartient cet élément de configuration. |
| previous.config.site.id | `number` | L'ID du site. |
| previous.config.site.name | `string` | Le nom du site. |
| previous.config.site.domain | `string` | Le domaine du site. |
| current | `object` | Les versions actuelles des ressources affectées. |
| current.config | `object` | L'élément de configuration actuel. |
| current.config.id | `number` | L'ID de l'élément de configuration. |
| current.config.key | `string` | La clé de l'élément de configuration. |
| current.config.value | `any` | La valeur de l'élément de configuration. |
| current.config.site *(optionnel)* | `object` | Le site auquel appartient cet élément de configuration. |
| current.config.site.id | `number` | L'ID du site. |
| current.config.site.name | `string` | Le nom du site. |
| current.config.site.domain | `string` | Le domaine du site. |

#### Exemple

```json
{
  "previous": {
    "config": {
      "id": 18,
      "key": "audit_log_streaming_destinations",
      "value": [
        {
          "id": "ee6971af-80f5-4654-9bd2-5c6ab33e7ccf",
          "name": "splunk",
          "url": "https://hec.example.com:8088/services/collector/event",
          "token": "Splunk B5A79AAD-D822-46CC-80D1-819F80D7BFB0"
        }
      ],
      "site": {
        "id": 42,
        "name": "Grist Labs",
        "domain": "gristlabs"
      }
    }
  },
  "current": {
    "config": {
      "id": 18,
      "key": "audit_log_streaming_destinations",
      "value": [
        {
          "id": "ee6971af-80f5-4654-9bd2-5c6ab33e7ccf",
          "name": "splunk",
          "url": "https://hec.example.com:8088/services/collector/event",
          "token": "Splunk B5A79AAD-D822-46CC-80D1-819F80D7BFB0"
        },
        {
          "id": "8f421760-14e9-4d11-b10a-f51d82041e0f",
          "name": "other",
          "url": "https://other.example.com/events"
        }
      ],
      "site": {
        "id": 42,
        "name": "Grist Labs",
        "domain": "gristlabs"
      }
    }
  }
}
```

## document

### document.change_access

L'accès d'un document a été modifié.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |
| access_changes | `object` | Les modifications d'accès. |
| access_changes.public_access *(optionnel)* | `string` ou `null` | Le nouveau niveau d'accès public. |
| access_changes.max_inherited_access *(optionnel)* | `string` ou `null` | Le nouveau niveau d'accès maximum qui peut être hérité de l'espace de travail ou du site du document. |
| access_changes.users *(optionnel)* | `Array<object>` | Les nouveaux niveaux d'accès des utilisateurs individuels. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  },
  "access_changes": {
    "public_access": "viewers",
    "max_inherited_access": null,
    "users": [
      {
        "id": 146,
        "name": "Flapjack Toasty",
        "email": "flapjack@example.com",
        "access": "owners"
      }
    ]
  }
}
```

### document.clear_all_webhook_queues

Les files d'attente de webhooks d'un document ont été effacées.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document créé. |
| document.id | `string` | L'ID du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.clear_webhook_queue

La file d'attente de webhook d'un document a été effacée.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document. |
| document.id | `string` | L'ID du document. |
| webhook | `object` | Le webhook. |
| webhook.id | `string` | L'ID du webhook. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  },
  "webhook": {
    "id": "17f8328e-0523-41fe-89aa-ae180bebb26e"
  }
}
```

### document.create

Un document a été créé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document créé. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |
| document.workspace | `object` | L'espace de travail du document. |
| document.workspace.id | `number` | L'ID de l'espace de travail. |
| document.workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop",
    "workspace": {
      "id": 97,
      "name": "Secret Plans"
    }
  }
}
```

### document.delete

Un document a été supprimé définitivement.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document supprimé. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

### document.deliver_webhook_events

Un webhook d'un document a livré avec succès des événements.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document. |
| document.id | `string` | L'ID du document. |
| webhook | `object` | Le webhook. |
| webhook.id | `string` | L'ID du webhook. |
| webhook.events | `object` | Les événements de webhook livrés. |
| webhook.events.delivered_to | `string` | Où les événements de webhook ont été livrés. |
| webhook.events.quantity | `number` | Le nombre d'événements de webhook qui ont été livrés. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  },
  "webhook": {
    "id": "17f8328e-0523-41fe-89aa-ae180bebb26e",
    "events": {
      "delivered_to": "example.com",
      "quantity": 3
    }
  }
}
```

### document.duplicate

Un document a été dupliqué.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| original | `object` | Les ressources qui ont été dupliquées. |
| original.document | `object` | Le document qui a été dupliqué. |
| original.document.id | `string` | L'ID du document. |
| original.document.name | `string` | Le nom du document. |
| duplicate | `object` | Les ressources nouvellement dupliquées. |
| duplicate.document | `object` | Le document nouvellement dupliqué. |
| duplicate.document.id | `string` | L'ID du document. |
| duplicate.document.name | `string` | Le nom du document. |
| duplicate.document.workspace | `object` | L'espace de travail du document. |
| duplicate.document.workspace.id | `number` | L'ID de l'espace de travail |
| options | `object` | Les options utilisées pour dupliquer le document. |
| options.as_template | `boolean` | Inclure la structure sans aucune donnée. |

#### Exemple

```json
{
  "original": {
    "document": {
      "id": "mRM8ydxxLkc6Ewo56jsDGx",
      "name": "Project Lollipop"
    }
  },
  "duplicate": {
    "document": {
      "id": "fFKKA6qjXJd9sNLhpw6iPn",
      "name": "Project Lollipop V2",
      "workspace": {
        "id": 92
      }
    }
  },
  "options": {
    "as_template": false
  }
}
```

### document.fork

Un document a été dupliqué (fork).

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document qui a été dupliqué. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |
| fork | `object` | Le document nouvellement dupliqué. |
| fork.id | `string` | L'ID du fork. |
| fork.document_id | `string` | L'ID du document. |
| fork.url_id | `string` | L'ID d'URL. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  },
  "fork": {
    "id": "fGGyPYea1ueFiVW382uuAY",
    "document_id": "mRM8ydxxLkc6Ewo56jsDGx~fGGyPYea1ueFiVW382uuAY~9",
    "url_id": "mRM8ydxxLkc6~fGGyPYea1ueFiVW382uuAY~9"
  }
}
```

### document.modify

Un document a été modifié.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| action | `object` | L'action. |
| action.num | `number` | Le numéro de l'action. |
| action.hash | `string` ou `null` | Le hash de l'action. |
| document | `object` | Le document. |
| document.id | `string` | L'ID du document. |

#### Exemple

```json
{
  "action": {
    "num": 7,
    "hash": "825f859cf9628d9df90c1b25e31c723bb1c05c061cab6d1d9ccfea340e68d638"
  },
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.move

Un document a été déplacé vers un autre espace de travail.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | Les versions précédentes des ressources affectées. |
| previous.document | `object` | Le document précédent. |
| previous.document.id | `string` | L'ID du document. |
| previous.document.name | `string` | Le nom du document. |
| previous.document.workspace | `object` | L'espace de travail du document. |
| previous.document.workspace.id | `number` | L'ID de l'espace de travail. |
| previous.document.workspace.name | `string` | Le nom de l'espace de travail. |
| current | `object` | Les versions actuelles des ressources affectées. |
| current.document | `object` | Le document actuel. |
| current.document.id | `string` | L'ID du document. |
| current.document.name | `string` | Le nom du document. |
| current.document.workspace | `object` | L'espace de travail du document. |
| current.document.workspace.id | `number` | L'ID de l'espace de travail. |
| current.document.workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "previous": {
    "document": {
      "id": "mRM8ydxxLkc6Ewo56jsDGx",
      "name": "Project Lollipop",
      "workspace": {
        "id": 97,
        "name": "Secret Plans"
      }
    }
  },
  "current": {
    "document": {
      "id": "mRM8ydxxLkc6Ewo56jsDGx",
      "name": "Project Lollipop",
      "workspace": {
        "id": 98,
        "name": "Not So Secret Plans"
      }
    }
  }
}
```

### document.move_to_trash

Un document a été déplacé dans la corbeille.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document supprimé. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

### document.open

Un document a été ouvert.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document ouvert. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |
| document.url_id | `string` | L'ID d'URL. |
| document.fork_id *(optionnel)* | `string` | L'ID du fork. |
| document.snapshot_id *(optionnel)* | `string` | L'ID de l'instantané. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop",
    "url_id": "mRM8ydxxLkc6~fGGyPYea1ueFiVW382uuAY~9",
    "fork_id": "fGGyPYea1ueFiVW382uuAY"
  }
}
```

### document.pin

Un document a été épinglé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document épinglé. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

### document.reload

Un document a été rechargé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document rechargé. |
| document.id | `string` | L'ID du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.rename

Un document a été renommé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | Les versions précédentes des ressources affectées. |
| previous.document | `object` | Le document précédent. |
| previous.document.id | `number` | L'ID du document. |
| previous.document.name | `string` | Le nom du document. |
| current | `object` | Les versions actuelles des ressources affectées. |
| current.document | `object` | Le document actuel. |
| current.document.id | `number` | L'ID du document. |
| current.document.name | `string` | Le nom du document. |

#### Exemple

```json
{
  "previous": {
    "document": {
      "id": "mRM8ydxxLkc6Ewo56jsDGx",
      "name": "Project Lollipop"
    }
  },
  "current": {
    "document": {
      "id": "mRM8ydxxLkc6Ewo56jsDGx",
      "name": "Competitive Analysis"
    }
  }
}
```

### document.replace

Un document a été remplacé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document qui a été remplacé. |
| document.id | `string` | L'ID du document. |
| fork *(optionnel)* | `object` | Le fork avec lequel le document a été remplacé. |
| fork.document_id | `string` | L'ID du document. |
| snapshot *(optionnel)* | `object` | L'instantané avec lequel le document a été remplacé. |
| snapshot.id | `string` | L'ID de l'instantané. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  },
  "fork": {
    "document_id": "mRM8ydxxLkc6Ewo56jsDGx~fGGyPYea1ueFiVW382uuAY~9"
  }
}
```

### document.restore_from_trash

Un document a été restauré depuis la corbeille.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document restauré. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |
| document.workspace | `object` | L'espace de travail du document. |
| document.workspace.id | `number` | L'ID de l'espace de travail. |
| document.workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop",
    "workspace": {
      "id": 97,
      "name": "Secret Plans"
    }
  }
}
```

### document.run_sql_query

Une requête SQL a été exécutée sur un document.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document interrogé. |
| document.id | `string` | L'ID du document. |
| sql_query | `object` | La requête SQL. |
| sql_query.statement | `string` | L'instruction SQL. |
| sql_query.arguments *(optionnel)* | `Array<string | number>` | Les arguments passés aux paramètres dans l'instruction SQL. |
| options | `object` | Les options utilisées pour interroger le document. |
| options.timeout_ms *(optionnel)* | `number` | Délai d'expiration en millisecondes après lequel les opérations sur le document seront interrompues. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  },
  "sql_query": {
    "statement": "SELECT * FROM Pets WHERE popularity >= ?",
    "arguments": [
      50
    ]
  },
  "options": {
    "timeout_ms": 500
  }
}
```

### document.send_to_google_drive

Un document a été envoyé vers Google Drive.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document envoyé. |
| document.id | `string` | L'ID du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.truncate_history

L'historique d'un document a été tronqué.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document. |
| document.id | `string` | L'ID du document. |
| options | `object` | Les options utilisées pour tronquer l'historique du document. |
| options.keep_n_most_recent | `number` | Le nombre d'actions d'historique récentes à conserver. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  },
  "options": {
    "keep_n_most_recent": 3
  }
}
```

### document.unpin

Un document a été désépinglé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | Le document désépinglé. |
| document.id | `string` | L'ID du document. |
| document.name | `string` | Le nom du document. |

#### Exemple

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

## site

### site.change_access

L'accès d'un site a été modifié.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| site | `object` | Le site. |
| site.id | `number` | L'ID du site. |
| site.name | `string` | Le nom du site. |
| site.domain | `string` | Le domaine du site. |
| access_changes | `object` | Les modifications d'accès. |
| access_changes.users | `Array<object>` | Les nouveaux niveaux d'accès des utilisateurs individuels. |

#### Exemple

```json
{
  "site": {
    "id": 42,
    "name": "Grist Labs",
    "domain": "gristlabs"
  },
  "access_changes": {
    "users": [
      {
        "id": 146,
        "name": "Flapjack Toasty",
        "email": "flapjack@example.com",
        "access": "owners"
      }
    ]
  }
}
```

### site.create

Un site a été créé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| site | `object` | Le site créé. |
| site.id | `number` | L'ID du site. |
| site.name | `string` | Le nom du site. |
| site.domain | `string` | Le domaine du site. |

#### Exemple

```json
{
  "site": {
    "id": 42,
    "name": "Grist Labs",
    "domain": "gristlabs"
  }
}
```

### site.delete

Un site a été supprimé définitivement.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| site | `object` | Le site supprimé. |
| site.id | `number` | L'ID du site. |
| site.name | `string` | Le nom du site. |
| site.domain | `string` | Le domaine du site. |

#### Exemple

```json
{
  "site": {
    "id": 42,
    "name": "Grist Labs",
    "domain": "gristlabs"
  }
}
```

### site.rename

Un site a été renommé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | Les versions précédentes des ressources affectées. |
| previous.site | `object` | Le site précédent. |
| previous.site.id | `number` | L'ID du site. |
| previous.site.name | `string` | Le nom du site. |
| previous.site.domain | `string` | Le domaine du site. |
| current | `object` | Les versions actuelles des ressources affectées. |
| current.site | `object` | Le site actuel. |
| current.site.id | `number` | L'ID du site. |
| current.site.name | `string` | Le nom du site. |
| current.site.domain | `string` | Le domaine du site. |

#### Exemple

```json
{
  "previous": {
    "site": {
      "id": 42,
      "name": "Grist Labs",
      "domain": "gristlabs"
    }
  },
  "current": {
    "site": {
      "id": 42,
      "name": "ACME Unlimited",
      "domain": "acme"
    }
  }
}
```

## user

### user.change_name

Le nom d'un utilisateur a été modifié.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | Les versions précédentes des ressources affectées. |
| previous.user | `object` | L'utilisateur précédent. |
| previous.user.id | `number` | L'ID de l'utilisateur. |
| previous.user.name | `string` | Le nom de l'utilisateur. |
| previous.user.email *(optionnel)* | `string` | L'e-mail de l'utilisateur. |
| current | `object` | Les versions actuelles des ressources affectées. |
| current.user | `object` | L'utilisateur actuel. |
| current.user.id | `number` | L'ID de l'utilisateur. |
| current.user.name | `string` | Le nom de l'utilisateur. |
| current.user.email *(optionnel)* | `string` | L'e-mail de l'utilisateur. |

#### Exemple

```json
{
  "previous": {
    "user": {
      "id": 146,
      "name": "Flapjack Waffleflap",
      "email": "flapjack@example.com"
    }
  },
  "current": {
    "user": {
      "id": 146,
      "name": "Flapjack Toasty",
      "email": "flapjack@example.com"
    }
  }
}
```

### user.create_api_key

Une clé API utilisateur a été créée.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| user | `object` | L'utilisateur. |
| user.id | `number` | L'ID de l'utilisateur. |
| user.name | `string` | Le nom de l'utilisateur. |
| user.email *(optionnel)* | `string` | L'e-mail de l'utilisateur. |

#### Exemple

```json
{
  "user": {
    "id": 146,
    "name": "Flapjack Waffleflap",
    "email": "flapjack@example.com"
  }
}
```

### user.delete

Un utilisateur a été supprimé définitivement.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| user | `object` | L'utilisateur. |
| user.id | `number` | L'ID de l'utilisateur. |
| user.name | `string` | Le nom de l'utilisateur. |
| user.email *(optionnel)* | `string` | L'e-mail de l'utilisateur. |

#### Exemple

```json
{
  "user": {
    "id": 146,
    "name": "Flapjack Waffleflap",
    "email": "flapjack@example.com"
  }
}
```

### user.delete_api_key

Une clé API utilisateur a été supprimée.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| user | `object` | L'utilisateur. |
| user.id | `number` | L'ID de l'utilisateur. |
| user.name | `string` | Le nom de l'utilisateur. |
| user.email *(optionnel)* | `string` | L'e-mail de l'utilisateur. |

#### Exemple

```json
{
  "user": {
    "id": 146,
    "name": "Flapjack Waffleflap",
    "email": "flapjack@example.com"
  }
}
```

## workspace

### workspace.change_access

L'accès d'un espace de travail a été modifié.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | L'espace de travail. |
| workspace.id | `number` | L'ID de l'espace de travail. |
| workspace.name | `string` | Le nom de l'espace de travail. |
| access_changes | `object` | Les modifications d'accès. |
| access_changes.max_inherited_access *(optionnel)* | `string` ou `null` | Le nouveau niveau d'accès maximum qui peut être hérité du site de l'espace de travail. |
| access_changes.users *(optionnel)* | `Array<object>` | Les nouveaux niveaux d'accès des utilisateurs individuels. |

#### Exemple

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  },
  "access_changes": {
    "max_inherited_access": "editors",
    "users": [
      {
        "id": 146,
        "name": "Flapjack Toasty",
        "email": "flapjack@example.com",
        "access": "editors"
      }
    ]
  }
}
```

### workspace.create

Un espace de travail a été créé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | L'espace de travail créé. |
| workspace.id | `number` | L'ID de l'espace de travail. |
| workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```

### workspace.delete

Un espace de travail a été supprimé définitivement.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | L'espace de travail supprimé. |
| workspace.id | `number` | L'ID de l'espace de travail. |
| workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```

### workspace.move_to_trash

Un espace de travail a été déplacé dans la corbeille.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | L'espace de travail supprimé. |
| workspace.id | `number` | L'ID de l'espace de travail. |
| workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```

### workspace.rename

Un espace de travail a été renommé.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | Les versions précédentes des ressources affectées. |
| previous.workspace | `object` | L'espace de travail précédent. |
| previous.workspace.id | `number` | L'ID de l'espace de travail. |
| previous.workspace.name | `string` | Le nom de l'espace de travail. |
| current | `object` | Les versions actuelles des ressources affectées. |
| current.workspace | `object` | L'espace de travail actuel. |
| current.workspace.id | `number` | L'ID de l'espace de travail. |
| current.workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "previous": {
    "workspace": {
      "id": 97,
      "name": "Secret Plans"
    }
  },
  "current": {
    "workspace": {
      "id": 97,
      "name": "Retreat Docs"
    }
  }
}
```

### workspace.restore_from_trash

Un espace de travail a été restauré depuis la corbeille.

#### Détails

| Propriété | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | L'espace de travail restauré. |
| workspace.id | `number` | L'ID de l'espace de travail. |
| workspace.name | `string` | Le nom de l'espace de travail. |

#### Exemple

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```
