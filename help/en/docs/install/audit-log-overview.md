# Audit log overview {: .tag-ee }

Grist supports real-time monitoring of activity in your installation by
streaming logs of audit events to an external security information and event
management (SIEM) system like Splunk.

## What are audit logs?

Audit logs are a record of events triggered by actions performed within your
installation that help you answer questions like "when was a workspace
removed?" or "who invited a collaborator to a document?" Audit logs can
can help maintain compliance and identify misuse of organization resources.

## About audit log events

Audit log events include the action that occurred, who performed the action,
when and where the action occurred, and any additional details about the action
in question.

For example, the `document.create` action occurs when a document is created
in your installation, and includes details like the ID and name of the created
document and its workspace.

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

For a full list of events that may appear, see
["Audit log events for your self-managed instance"](audit-log-events.md).

## Streaming audit log events

Installation admins can configure streaming of audit log events to external
SIEM systems from the Admin Panel. For more information, see
["Audit log streaming."](audit-log-streaming.md)
