---
title: Full telemetry
---

# Telemetry level: full
This is a telemetry level appropriate for internal use by a hosted service, with
`GRIST_TELEMETRY_URL` set to an endpoint controlled by the operator of the service.

## apiUsage
Triggered when an HTTP request with an API key is made.

| Field | Type | Description |
| ----- | ---- | ----------- |
| method | string | The HTTP request method (e.g. GET, POST, PUT). |
| userId | number | The id of the user that triggered this event. |
| userAgent | string | The User-Agent HTTP request header. |

## assistantOpen
Triggered when the AI Assistant is first opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| version | number | The assistant version. May be either `1` or `2`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| context | object | The context in which the assistant is open (e.g. column id). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## assistantSend
Triggered when a message is sent to the AI Assistant.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| siteId | number | The id of the site. |
| siteType | string | The type of the site. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |
| version | number | The assistant version. May be either `1` or `2`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| context | object | The context in which the assistant is open (e.g. column id). |
| prompt | object | The role ("user" or "system"), content, and index of the message sent to the AI Assistant. |
| developerPromptVersion | string | The developer prompt version. May be either `"default"` or `"new-document"`. |

## assistantReceive
Triggered when a message is received from the AI Assistant.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| siteId | number | The id of the site. |
| siteType | string | The type of the site. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |
| version | number | The assistant version. May be either `1` or `2`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| context | object | The context in which the assistant is open (e.g. column id). |
| response | object | The content and index of the response received from the AI Assistant. |
| suggestedFormula | string | The formula suggested by the AI Assistant, if present. |

## assistantSave
Triggered when changes in the expanded formula editor are saved after the AI Assistant was opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| version | number | The assistant version. Always set to `1`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| context | object | The context in which the assistant is open (e.g. column id). |
| newFormula | string | The formula that was saved. |
| oldFormula | string | The formula that was overwritten. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## assistantCancel
Triggered when changes in the expanded formula editor are discarded after the AI Assistant was opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| version | number | The assistant version. Always set to `1`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| conversationLength | number | The number of messages sent and received since opening the AI Assistant. |
| context | object | The context in which the assistant is open (e.g. column id). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## assistantApplySuggestion
Triggered when a suggested formula from one of the received messages was applied and saved.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| version | number | The assistant version. Always set to `1`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| conversationLength | number | The number of messages sent and received since opening the AI Assistant. |
| conversationHistoryLength | number | The number of messages in the conversation's history. May be less than conversationLength if the conversation history was cleared in the same session. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## assistantClearConversation
Triggered when a conversation in the AI Assistant is cleared.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| version | number | The assistant version. May be either `1` or `2`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| context | object | The context in which the assistant is open (e.g. column id). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## assistantClose
Triggered when a formula is saved or discarded after the AI Assistant was opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| version | number | The assistant version. Always set to `1`. |
| conversationId | string | A random identifier for the current conversation with the assistant. |
| suggestionApplied | boolean | True if a suggested formula from one of the received messages was applied. |
| conversationLength | number | The number of messages sent and received since opening the AI Assistant. |
| conversationHistoryLength | number | The number of messages in the conversation's history. May be less than conversationLength if the conversation history was cleared in the same session. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## assistantStartDocument
Triggered when a user begins the process of creating a document using the AI Assistant.

| Field | Type | Description |
| ----- | ---- | ----------- |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| prompt | string | The message sent to the AI Assistant. |

## beaconOpen
Triggered when HelpScout Beacon is opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## beaconArticleViewed
Triggered when an article is opened in HelpScout Beacon.

| Field | Type | Description |
| ----- | ---- | ----------- |
| articleId | string | The id of the article. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## beaconEmailSent
Triggered when an email is sent in HelpScout Beacon.

| Field | Type | Description |
| ----- | ---- | ----------- |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## beaconSearch
Triggered when a search is made in HelpScout Beacon.

| Field | Type | Description |
| ----- | ---- | ----------- |
| searchQuery | string | The search query. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## ratedHelpCenterArticle
Sent by HelpCenter when user clicks thumbs-up or thumbs-down

| Field | Type | Description |
| ----- | ---- | ----------- |
| url | string | The URL of the visited page. |
| rating | string | Feedback from user ("thumbsUp" or "thumbsDown") |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## documentCreated
Triggered when a document is created.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the id of the created document. |
| sourceDocIdDigest | string | A hash of the id of the source document, if the document was duplicated from an existing document. |
| isImport | boolean | Whether the document was created by import. |
| isSaved | boolean | Whether the document was saved to a workspace. |
| fileType | string | If the document was created by import, the file extension of the file that was imported. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## documentForked
Triggered when a document is forked.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| siteId | number | The id of the site containing the forked document. |
| siteType | string | The type of the site. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |
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
| siteId | number | The site id. |
| siteType | string | The site type. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
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
| siteId | number | The site id. |
| siteType | string | The site type. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |
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

## processMonitor
Triggered every 5 seconds.

| Field | Type | Description |
| ----- | ---- | ----------- |
| heapUsedMB | number | Size of JS heap in use, in MiB. |
| heapTotalMB | number | Total heap size, in MiB, allocated for JS by V8.  |
| cpuAverage | number | Fraction (typically between 0 and 1) of CPU usage. Includes all threads, so may exceed 1. |
| intervalMs | number | Interval (in milliseconds) over which `cpuAverage` is reported. |

## sendingWebhooks
Triggered when sending webhooks.

| Field | Type | Description |
| ----- | ---- | ----------- |
| numEvents | number | The number of events in the batch of webhooks being sent. |
| docIdDigest | string | A hash of the doc id. |
| siteId | number | The site id. |
| siteType | string | The site type. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |

## signupFirstVisit
Triggered when a new user first opens the Grist app.

| Field | Type | Description |
| ----- | ---- | ----------- |
| loginMethod | string | The login method on getgrist.com. May be "Email + Password" or "Google". |
| siteId | number | The site id of first visit after signup. |
| siteType | string | The site type of first visit after signup. |
| userId | number | The id of the user that signed up. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## signupVerified
Triggered after a user successfully verifies their account during sign-up. Not triggered in grist-core.

| Field | Type | Description |
| ----- | ---- | ----------- |
| verificationMethod | string | The verification method. May be "code" or "link". |
| isAnonymousTemplateSignup | boolean | Whether the user viewed any templates before signing up. |
| templateId | string | The doc id of the template the user last viewed before signing up, if any. |

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
| stripePlanId | string | The Stripe Plan id associated with this site. |
| numDocs | number | The number of docs in this site. |
| numWorkspaces | number | The number of workspaces in this site. |
| numMembers | number | The number of site members. |
| lastActivity | date | A timestamp of the most recent update made to a site document. |
| earliestDocCreatedAt | date | A timestamp of the earliest non-deleted document creation time. |

## tutorialOpened
Triggered when a tutorial is opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| tutorialForkIdDigest | string | A hash of the tutorial fork id. |
| tutorialTrunkIdDigest | string | A hash of the tutorial trunk id. |
| lastSlideIndex | number | The 0-based index of the last tutorial slide the user had open. |
| numSlides | number | The total number of slides in the tutorial. |
| percentComplete | number | Percentage of tutorial completion. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## tutorialProgressChanged
Triggered on changes to tutorial progress.

| Field | Type | Description |
| ----- | ---- | ----------- |
| tutorialForkIdDigest | string | A hash of the tutorial fork id. |
| tutorialTrunkIdDigest | string | A hash of the tutorial trunk id. |
| lastSlideIndex | number | The 0-based index of the last tutorial slide the user had open. |
| numSlides | number | The total number of slides in the tutorial. |
| percentComplete | number | Percentage of tutorial completion. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## tutorialRestarted
Triggered when a tutorial is restarted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| tutorialForkIdDigest | string | A hash of the tutorial fork id. |
| tutorialTrunkIdDigest | string | A hash of the tutorial trunk id. |
| docIdDigest | string | A hash of the doc id. |
| siteId | number | The site id. |
| siteType | string | The site type. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |

## watchedVideoTour
Triggered when the video tour is closed.

| Field | Type | Description |
| ----- | ---- | ----------- |
| watchTimeSeconds | number | The number of seconds elapsed in the video player. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## answeredUseCaseQuestion
Triggered for each selected use case in the welcome questionnaire.

| Field | Type | Description |
| ----- | ---- | ----------- |
| useCase | string | The selected use case. If "Other", the response is also included. |
| userId | number | The id of the user that triggered this event. |

## clickedScheduleCoachingCall
Triggered when the link to schedule a coaching call is clicked.

| Field | Type | Description |
| ----- | ---- | ----------- |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## deletedAccount
Triggered when an account is deleted.

| Field | Type | Description |
| ----- | ---- | ----------- |

## createdSite
Triggered when a site is created.

| Field | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | The id of the site. |
| userId | number | The id of the user that triggered this event. |

## deletedSite
Triggered when a site is deleted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | The id of the site. |
| userId | number | The id of the user that triggered this event. |

## invitedMember
Triggered when users are added to a team site.

| Field | Type | Description |
| ----- | ---- | ----------- |
| count | number | The number of users added. |
| siteId | number | The id of the site. |

## uninvitedMember
Triggered when users are removed from a team site.

| Field | Type | Description |
| ----- | ---- | ----------- |
| count | number | The number of users removed. |
| siteId | number | The id of the site. |

## invitedDocUser
Triggered when users are added to a document.

| Field | Type | Description |
| ----- | ---- | ----------- |
| access | string | The access level granted to the added users. |
| count | number | The number of users added. |
| userId | number | The id of the user that triggered this event. |

## madeDocPublic
Triggered when public access to a document is enabled.

| Field | Type | Description |
| ----- | ---- | ----------- |
| access | string | The access level granted to public users. |
| userId | number | The id of the user that triggered this event. |

## madeDocPrivate
Triggered when public access to a document is disabled.

| Field | Type | Description |
| ----- | ---- | ----------- |
| userId | number | The id of the user that triggered this event. |

## openedTemplate
Triggered when a template is opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| templateId | string | The document id of the template. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## openedTemplateTour
Triggered when a document tour for a template is opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| templateId | string | The document id of the template. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## copiedTemplate
Triggered when a copy of a template is saved.

| Field | Type | Description |
| ----- | ---- | ----------- |
| templateId | string | The document id of the template. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## subscribedToPlan
Triggered on subscription to a plan.

| Field | Type | Description |
| ----- | ---- | ----------- |
| planName | string | The name of the plan. |
| userId | number | The id of the user that triggered this event. |

## cancelledPlan
Triggered on cancellation of a plan.

| Field | Type | Description |
| ----- | ---- | ----------- |
| planName | string | The name of the plan. |
| userId | number | The id of the user that triggered this event. |

## createdWorkspace
Triggered when a workspace is created.

| Field | Type | Description |
| ----- | ---- | ----------- |
| workspaceId | number | The id of the workspace. |
| userId | number | The id of the user that triggered this event. |

## deletedWorkspace
Triggered when a workspace is deleted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| workspaceId | number | The id of the workspace. |
| userId | number | The id of the user that triggered this event. |

## visitedPage
Triggered when a page is loaded.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. Only included on visits to doc pages. |
| url | string | The URL of the visited page. Link keys, doc ids, and other identifiers are excluded from the URL. |
| path | string | The path of the visited page (e.g. "app.html"). |
| userAgent | string | The User-Agent HTTP request header. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## openedDoc
Triggered when a document is opened.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## createdDoc-Empty
Triggered when a new empty document is created.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## createdDoc-FileImport
Triggered when a document is created via file import.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## createdDoc-CopyTemplate
Triggered when a document is created by saving a copy of a template.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## createdDoc-CopyDoc
Triggered when a document is created by saving a copy of a document.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## viewedWelcomeTour
Triggered when the Grist welcome tour is closed.

| Field | Type | Description |
| ----- | ---- | ----------- |
| percentComplete | number | Percentage of tour completion. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## viewedTip
Triggered when a tip is shown.

| Field | Type | Description |
| ----- | ---- | ----------- |
| tipName | string | The name of the tip. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## deletedDoc
Triggered when a document is deleted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## addedPage
Triggered when a page is added.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## deletedPage
Triggered when a page is deleted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## addedWidget
Triggered when a widget is added.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| widgetType | string | The widget type (e.g. "Form"). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## deletedWidget
Triggered when a widget is deleted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| widgetType | string | The widget type (e.g. "Form"). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## duplicatedWidget
Triggered when a widget is duplicated.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| destPage | string | The type of page the widget is being duplicated to. One of "SAME", "NEW", "OTHER" |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## linkedWidget
Triggered when a widget is linked.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| widgetType | string | The widget type (e.g. "Form"). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## unlinkedWidget
Triggered when a widget is unlinked.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| widgetType | string | The widget type (e.g. "Form"). |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## publishedForm
Triggered when a form is published.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## unpublishedForm
Triggered when a form is unpublished.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## visitedForm
Triggered when a published form is visited.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## submittedForm
Triggered when a published form is submitted.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| siteId | number | The site id. |
| siteType | string | The site type. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |
| access | string | The document access level of the user that triggered this event. |
| userId | number | The id of the user that triggered this event. |

## changedAccessRules
Triggered when a change to access rules is saved.

| Field | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | A hash of the doc id. |
| ruleCount | number | The number of access rules in the document. |
| userId | number | The id of the user that triggered this event. |
| altSessionId | string | A random, session-based identifier for the user that triggered this event. |

## checkedUpdateAPI
Triggered when the app checks for updates.

| Field | Type | Description |
| ----- | ---- | ----------- |
| deploymentId | string | The installation id of the client. |
| deploymentType | string | The deployment type of the client. |

