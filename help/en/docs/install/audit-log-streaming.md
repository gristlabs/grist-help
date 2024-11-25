# Audit log streaming {: .tag-ee }

Grist can stream audit log events from your installation to an external
destination, such as a security information and event management (SIEM) system.

You can add, update, or delete a streaming destination at any time, and stream
to multiple destinations. Events from all team sites within your installation
will be included in the stream.

Events are streamed in real-time. Only events that occurred after a streaming
destination was added will be sent to that destination.

**Note:** You must be an installation administrator to view or modify streaming
destinations.

## Adding streaming destinations

Grist currently supports streaming to destinations with HTTP Event Collector
(HEC) endpoints, such as Splunk, or destinations that can accept structured JSON
over HTTP. Follow the instructions for your destination:

* [Splunk (HEC)](#streaming-to-splunk-hec)
* [Other (HTTP)](#streaming-to-other-destinations-http)

### Streaming to Splunk (HEC)

To stream to destinations with HEC endpoints, a format used by Splunk and
Splunk-compatible services, you need to set up an HEC endpoint that is
reachable from your Grist installation. You can also use a tool like
[Vector](https://vector.dev/) which supports receiving HEC events. See
[Splunk's documentation](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector)
for more information.

1. Click the profile icon in the top-right corner of Grist.
2. Click **Admin Panel**.
3. Under "Audit Logs", click **Log Streaming**.
4. Under "Destinations", click **Start streaming** or **Add destination**.
5. Under "Destination", click **Splunk**.
6. Under "URL", enter the HEC endpoint to send events to.
7. Under "Token", enter "Splunk " followed by the HEC token (e.g. `Splunk B5A79AAD-D822-46CC-80D1-819F80D7BFB0`).
8. Click **Add destination**.

### Streaming to other destinations (HTTP)

To stream to other HTTP destinations, you need to set up an endpoint that is
reachable from your Grist installation and accepts structured JSON with the
following format:

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

1. Click the profile icon in the top-right corner of Grist.
2. Click **Admin Panel**.
3. Under "Audit Logs", click **Log Streaming**.
4. Under "Destinations", click **Start streaming** or **Add destination**.
5. Under "Destination", click **Other**.
6. Under "URL", enter the HTTP endpoint to send events to.
7. Under "Token", enter the value to include in the Authorization header, if applicable.
8. Click **Add destination**.

## Updating streaming destinations

1. Click the profile icon in the top-right corner of Grist.
2. Click **Admin Panel**.
3. Under "Audit Logs", click **Log Streaming**.
4. Under "Destinations", click **...** for the destination you want to update.
5. Modify the destination, URL, and/or token.
6. Click **Save**.

## Deleting streaming destinations

1. Click the profile icon in the top-right corner of Grist.
2. Click **Admin Panel**.
3. Under "Audit Logs", click **Log Streaming**.
4. Under "Destinations", click **...** for the destination you want to delete.
5. Click **Delete**.
6. Click **Delete** again in the confirmation modal that appears.
