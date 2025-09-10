---
title: Audit log events
---

# Audit log events for your self-managed instance {: .tag-ee }

## config

### config.create

A configuration item was created.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| config | `object` | The created configuration item. |
| config.id | `number` | The configuration item ID. |
| config.key | `string` | The configuration item key. |
| config.value | `any` | The configuration item value. |
| config.site *(optional)* | `object` | The site this configuration item belongs to. |
| config.site.id | `number` | The site ID. |
| config.site.name | `string` | The site name. |
| config.site.domain | `string` | The site domain. |

#### Sample

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

A configuration item was deleted.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| config | `object` | The deleted configuration item. |
| config.id | `number` | The configuration item ID. |
| config.key | `string` | The configuration item key. |
| config.value | `any` | The configuration item value. |
| config.site *(optional)* | `object` | The site this configuration item belonged to. |
| config.site.id | `number` | The site ID. |
| config.site.name | `string` | The site name. |
| config.site.domain | `string` | The site domain. |

#### Sample

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

A configuration item was updated.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | The previous versions of affected resources. |
| previous.config | `object` | The previous configuration item. |
| previous.config.id | `number` | The configuration item ID. |
| previous.config.key | `string` | The configuration item key. |
| previous.config.value | `any` | The configuration item value. |
| previous.config.site *(optional)* | `object` | The site this configuration item belongs to. |
| previous.config.site.id | `number` | The site ID. |
| previous.config.site.name | `string` | The site name. |
| previous.config.site.domain | `string` | The site domain. |
| current | `object` | The current versions of affected resources. |
| current.config | `object` | The current configuration item. |
| current.config.id | `number` | The configuration item ID. |
| current.config.key | `string` | The configuration item key. |
| current.config.value | `any` | The configuration item value. |
| current.config.site *(optional)* | `object` | The site this configuration item belongs to. |
| current.config.site.id | `number` | The site ID. |
| current.config.site.name | `string` | The site name. |
| current.config.site.domain | `string` | The site domain. |

#### Sample

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

A document's access was changed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |
| access_changes | `object` | The access changes. |
| access_changes.public_access *(optional)* | `string` or `null` | The new public access level. |
| access_changes.max_inherited_access *(optional)* | `string` or `null` | The new maximum access level that can be inherited from the document's workspace or site. |
| access_changes.users *(optional)* | `Array<object>` | The new access levels of individual users. |

#### Sample

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

A document's webhook queues were cleared.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The created document. |
| document.id | `string` | The document ID. |

#### Sample

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.clear_webhook_queue

A document's webhook queue was cleared.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The document. |
| document.id | `string` | The document ID. |
| webhook | `object` | The webhook. |
| webhook.id | `string` | The webhook ID. |

#### Sample

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

A document was created.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The created document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |
| document.workspace | `object` | The document's workspace. |
| document.workspace.id | `number` | The workspace ID. |
| document.workspace.name | `string` | The workspace name. |

#### Sample

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

A document was permanently deleted.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The deleted document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |

#### Sample

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

### document.deliver_webhook_events

A document's webhook successfully delivered events.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The document. |
| document.id | `string` | The document ID. |
| webhook | `object` | The webhook. |
| webhook.id | `string` | The webhook ID. |
| webhook.events | `object` | The delivered webhook events. |
| webhook.events.delivered_to | `string` | Where the webhook events were delivered to. |
| webhook.events.quantity | `number` | The number of webhook events that were delivered. |

#### Sample

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

A document was duplicated.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| original | `object` | The resources that were duplicated. |
| original.document | `object` | The document that was duplicated. |
| original.document.id | `string` | The document ID. |
| original.document.name | `string` | The document name. |
| duplicate | `object` | The newly-duplicated resources. |
| duplicate.document | `object` | The newly-duplicated document. |
| duplicate.document.id | `string` | The document ID. |
| duplicate.document.name | `string` | The document name. |
| duplicate.document.workspace | `object` | The document's workspace. |
| duplicate.document.workspace.id | `number` | The workspace ID |
| options | `object` | The options used to duplicate the document. |
| options.as_template | `boolean` | Include the structure without any data. |

#### Sample

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

A document was forked.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The document that was forked. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |
| fork | `object` | The newly-forked document. |
| fork.id | `string` | The fork ID. |
| fork.document_id | `string` | The document ID. |
| fork.url_id | `string` | The URL ID. |

#### Sample

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

A document was modified.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| action | `object` | The action. |
| action.num | `number` | The action number. |
| action.hash | `string` or `null` | The action hash. |
| document | `object` | The document. |
| document.id | `string` | The document ID. |

#### Sample

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

A document was moved to a different workspace.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | The previous versions of affected resources. |
| previous.document | `object` | The previous document. |
| previous.document.id | `string` | The document ID. |
| previous.document.name | `string` | The document name. |
| previous.document.workspace | `object` | The document's workspace. |
| previous.document.workspace.id | `number` | The workspace ID. |
| previous.document.workspace.name | `string` | The workspace name. |
| current | `object` | The current versions of affected resources. |
| current.document | `object` | The current document. |
| current.document.id | `string` | The document ID. |
| current.document.name | `string` | The document name. |
| current.document.workspace | `object` | The document's workspace. |
| current.document.workspace.id | `number` | The workspace ID. |
| current.document.workspace.name | `string` | The workspace name. |

#### Sample

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

A document was moved to the trash.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The removed document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |

#### Sample

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

### document.open

A document was opened.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The opened document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |
| document.url_id | `string` | The URL ID. |
| document.fork_id *(optional)* | `string` | The fork ID. |
| document.snapshot_id *(optional)* | `string` | The snapshot ID. |

#### Sample

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

A document was pinned.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The pinned document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |

#### Sample

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx",
    "name": "Project Lollipop"
  }
}
```

### document.reload

A document was reloaded.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The reloaded document. |
| document.id | `string` | The document ID. |

#### Sample

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.rename

A document was renamed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | The previous versions of affected resources. |
| previous.document | `object` | The previous document. |
| previous.document.id | `number` | The document ID. |
| previous.document.name | `string` | The document name. |
| current | `object` | The current versions of affected resources. |
| current.document | `object` | The current document. |
| current.document.id | `number` | The document ID. |
| current.document.name | `string` | The document name. |

#### Sample

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

A document was replaced.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The document that was replaced. |
| document.id | `string` | The document ID. |
| fork *(optional)* | `object` | The fork that the document was replaced with. |
| fork.document_id | `string` | The document ID. |
| snapshot *(optional)* | `object` | The snapshot that the document was replaced with. |
| snapshot.id | `string` | The snapshot ID. |

#### Sample

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

A document was restored from the trash.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The restored document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |
| document.workspace | `object` | The document's workspace. |
| document.workspace.id | `number` | The workspace ID. |
| document.workspace.name | `string` | The workspace name. |

#### Sample

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

A SQL query was run against a document.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The queried document. |
| document.id | `string` | The document ID. |
| sql_query | `object` | The SQL query. |
| sql_query.statement | `string` | The SQL statement. |
| sql_query.arguments *(optional)* | `Array<string | number>` | The arguments passed to parameters in the SQL statement. |
| options | `object` | The options used to query the document. |
| options.timeout_ms *(optional)* | `number` | Timeout in milliseconds after which operations on the document will be interrupted. |

#### Sample

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

A document was sent to Google Drive.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The sent document. |
| document.id | `string` | The document ID. |

#### Sample

```json
{
  "document": {
    "id": "mRM8ydxxLkc6Ewo56jsDGx"
  }
}
```

### document.truncate_history

A document's history was truncated.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The document. |
| document.id | `string` | The document ID. |
| options | `object` | The options used to truncate the document's history. |
| options.keep_n_most_recent | `number` | The number of recent history actions to keep. |

#### Sample

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

A document was unpinned.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| document | `object` | The unpinned document. |
| document.id | `string` | The document ID. |
| document.name | `string` | The document name. |

#### Sample

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

A site's access was changed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| site | `object` | The site. |
| site.id | `number` | The site ID. |
| site.name | `string` | The site name. |
| site.domain | `string` | The site domain. |
| access_changes | `object` | The access changes. |
| access_changes.users | `Array<object>` | The new access levels of individual users. |

#### Sample

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

A site was created.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| site | `object` | The created site. |
| site.id | `number` | The site ID. |
| site.name | `string` | The site name. |
| site.domain | `string` | The site domain. |

#### Sample

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

A site was permanently deleted.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| site | `object` | The deleted site. |
| site.id | `number` | The site ID. |
| site.name | `string` | The site name. |
| site.domain | `string` | The site domain. |

#### Sample

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

A site was renamed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | The previous versions of affected resources. |
| previous.site | `object` | The previous site. |
| previous.site.id | `number` | The site ID. |
| previous.site.name | `string` | The site name. |
| previous.site.domain | `string` | The site domain. |
| current | `object` | The current versions of affected resources. |
| current.site | `object` | The current site. |
| current.site.id | `number` | The site ID. |
| current.site.name | `string` | The site name. |
| current.site.domain | `string` | The site domain. |

#### Sample

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

A user's name was changed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | The previous versions of affected resources. |
| previous.user | `object` | The previous user. |
| previous.user.id | `number` | The user ID. |
| previous.user.name | `string` | The user's name. |
| previous.user.email *(optional)* | `string` | The user's email. |
| current | `object` | The current versions of affected resources. |
| current.user | `object` | The current user. |
| current.user.id | `number` | The user ID. |
| current.user.name | `string` | The user's name. |
| current.user.email *(optional)* | `string` | The user's email. |

#### Sample

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

A user API key was created.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| user | `object` | The user. |
| user.id | `number` | The user ID. |
| user.name | `string` | The user's name. |
| user.email *(optional)* | `string` | The user's email. |

#### Sample

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

A user was permanently deleted.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| user | `object` | The user. |
| user.id | `number` | The user ID. |
| user.name | `string` | The user's name. |
| user.email *(optional)* | `string` | The user's email. |

#### Sample

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

A user API key was deleted.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| user | `object` | The user. |
| user.id | `number` | The user ID. |
| user.name | `string` | The user's name. |
| user.email *(optional)* | `string` | The user's email. |

#### Sample

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

A workspace's access was changed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | The workspace. |
| workspace.id | `number` | The workspace ID. |
| workspace.name | `string` | The workspace name. |
| access_changes | `object` | The access changes. |
| access_changes.max_inherited_access *(optional)* | `string` or `null` | The new maximum access level that can be inherited from the workspace's site. |
| access_changes.users *(optional)* | `Array<object>` | The new access levels of individual users. |

#### Sample

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

A workspace was created.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | The created workspace. |
| workspace.id | `number` | The workspace ID. |
| workspace.name | `string` | The workspace name. |

#### Sample

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```

### workspace.delete

A workspace was permanently deleted.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | The deleted workspace. |
| workspace.id | `number` | The workspace ID. |
| workspace.name | `string` | The workspace name. |

#### Sample

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```

### workspace.move_to_trash

A workspace was moved to the trash.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | The removed workspace. |
| workspace.id | `number` | The workspace ID. |
| workspace.name | `string` | The workspace name. |

#### Sample

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```

### workspace.rename

A workspace was renamed.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| previous | `object` | The previous versions of affected resources. |
| previous.workspace | `object` | The previous workspace. |
| previous.workspace.id | `number` | The workspace ID. |
| previous.workspace.name | `string` | The workspace name. |
| current | `object` | The current versions of affected resources. |
| current.workspace | `object` | The current workspace. |
| current.workspace.id | `number` | The workspace ID. |
| current.workspace.name | `string` | The workspace name. |

#### Sample

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

A workspace was restored from the trash.

#### Details

| Property | Type | Description |
| -------- | ---- | ----------- |
| workspace | `object` | The restored workspace. |
| workspace.id | `number` | The workspace ID. |
| workspace.name | `string` | The workspace name. |

#### Sample

```json
{
  "workspace": {
    "id": 97,
    "name": "Secret Plans"
  }
}
```
