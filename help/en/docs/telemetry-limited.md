---
title: Limited telemetry
---

# Telemetry level: limited
This is a telemetry level appropriate for self-hosting instances of Grist.
Data is transmitted to Grist Labs.

## documentForked
Triggered when a document is forked.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| access | string | The document access level of the user that triggered this event. |
| forkIdDigest | string | A hash of the fork id. |
| forkDocIdDigest | string | A hash of the full id of the fork, including the trunk id and fork id. |
| trunkIdDigest | string | A hash of the trunk id. |
| isTemplate | boolean | Whether the trunk is a template. |
| lastActivity | date | Timestamp of the last update to the trunk document. |

## documentOpened
Triggered when a public document or template is opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| access | string | The document access level of the user that triggered this event. |
| isPublic | boolean | Whether the document is public. |
| isSnapshot | boolean | Whether a snapshot was opened. |
| isTemplate | boolean | Whether the document is a template. |
| lastUpdated | date | Timestamp of when the document was last updated. |

## documentUsage
Triggered on doc open and close, as well as hourly while a document is open.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| access | string | The document access level of the user that triggered this event. |
| triggeredBy | string | What caused this event to trigger. May be either "docOpen", "interval", or "docClose". |
| isPublic | boolean | Whether the document is public. |
| rowCount | number | The number of rows in the document. |
| dataSizeBytes | number | The total size of all data in the document, excluding attachments. |
| attachmentsSize | number | The total size of all attachments in the document. |
| numAccessRules | number | The number of access rules in the document. |
| numUserAttributes | number | The number of user attributes in the document. |
| numAttachments | number | The number of attachments in the document. |
| attachmentTypes | string[] | A list of unique file extensions compiled from all of the document's attachments. |
| numCharts | number | The number of charts in the document. |
| chartTypes | string[] | A list of chart types of every chart in the document. |
| numLinkedCharts | number | The number of linked charts in the document. |
| numLinkedWidgets | number | The number of linked widgets in the document. |
| numColumns | number | The number of columns in the document. |
| numColumnsWithConditionalFormatting | number | The number of columns with conditional formatting in the document. |
| numFormulaColumns | number | The number of formula columns in the document. |
| numTriggerFormulaColumns | number | The number of trigger formula columns in the document. |
| numSummaryFormulaColumns | number | The number of summary formula columns in the document. |
| numFieldsWithConditionalFormatting | number | The number of fields with conditional formatting in the document. |
| numTables | number | The number of tables in the document. |
| numOnDemandTables | number | The number of on-demand tables in the document. |
| numTablesWithConditionalFormatting | number | The number of tables with conditional formatting in the document. |
| numSummaryTables | number | The number of summary tables in the document. |
| numCustomWidgets | number | The number of custom widgets in the document. |
| customWidgetIds | string[] | A list of plugin ids for every custom widget in the document. The ids of widgets not created by Grist Labs are replaced with "externalId". |

## sendingWebhooks
Triggered when sending webhooks.

| Field | Type | Description |
| ----- | ---- | ----------- |
| numEvents | number | The number of events in the batch of webhooks being sent. |
| docIdDigest | string | A hash of the doc id. |
| access | string | The document access level of the user that triggered this event. |

## siteMembership
Triggered daily.

| Field | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | The site id. |
| siteType | string | The site type. |
| numOwners | number | The number of users with an owner role in this site. |
| numEditors | number | The number of users with an editor role in this site. |
| numViewers | number | The number of users with a viewer role in this site. |

## siteUsage
Triggered daily.

| Field | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | The site id. |
| siteType | string | The site type. |
| inGoodStanding | boolean | Whether the site's subscription is in good standing. |
| numDocs | number | The number of docs in this site. |
| numWorkspaces | number | The number of workspaces in this site. |
| numMembers | number | The number of site members. |
| lastActivity | date | A timestamp of the most recent update made to a site document. |

## watchedVideoTour
Triggered when the video tour is closed.

| Field | Type | Description |
| ----- | ---- | ----------- |
| watchTimeSeconds | number | The number of seconds elapsed in the video player. |

