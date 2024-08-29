---
title: Limited telemetry
---

# Niveau de télémétrie : limité
Il s'agit d'un niveau de télémétrie approprié pour les instances auto-hébergées de Grist.
Les données sont transmises à Grist Labs.

## documentForked
Déclenché lorsqu'un document est dupliqué.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | Un hachage de l'identifiant du document. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| forkIdDigest | string | Un hachage de l'identifiant de la duplication. |
| forkDocIdDigest | string | Un hachage de l'identifiant complet de la duplication, incluant l'identifiant du tronc et l'identifiant de la duplication. |
| trunkIdDigest | string | Un hachage de l'identifiant du tronc. |
| isTemplate | boolean | Indique si le tronc est un modèle. |
| lastActivity | date | Horodatage de la dernière mise à jour du document tronc. |

## documentOpened
Déclenché lorsqu'un document public ou un modèle est ouvert.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | Un hachage de l'identifiant du document. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| isPublic | boolean | Indique si le document est public. |
| isSnapshot | boolean | Indique si une capture instantanée a été ouverte. |
| isTemplate | boolean | Indique si le document est un modèle. |
| lastUpdated | date | Horodatage de la dernière mise à jour du document. |

## documentUsage
Déclenché à l'ouverture et à la fermeture d'un document, ainsi qu'à chaque heure pendant qu'un document est ouvert.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | Un hachage de l'identifiant du document. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| triggeredBy | string | Ce qui a causé le déclenchement de cet événement. Peut être soit "docOpen", "interval", ou "docClose". |
| isPublic | boolean | Indique si le document est public. |
| rowCount | number | Le nombre de lignes dans le document. |
| dataSizeBytes | number | La taille totale de toutes les données dans le document, à l'exclusion des pièces jointes. |
| attachmentsSize | number | La taille totale de toutes les pièces jointes dans le document. |
| numAccessRules | number | Le nombre de permissions avancées dans le document. |
| numUserAttributes | number | Le nombre de propriétés d'utilisateur dans le document. |
| numAttachments | number | Le nombre de pièces jointes dans le document. |
| attachmentTypes | string[] | Une liste des extensions de fichiers uniques compilées à partir de toutes les pièces jointes du document. |
| numCharts | number | Le nombre de graphiques dans le document. |
| chartTypes | string[] | Une liste des types de graphiques de chaque graphique dans le document. |
| numLinkedCharts | number | Le nombre de graphiques liés dans le document. |
| numLinkedWidgets | number | Le nombre de vues liées dans le document. |
| numColumns | number | Le nombre de colonnes dans le document. |
| numColumnsWithConditionalFormatting | number | Le nombre de colonnes avec mise en forme conditionnelle dans le document. |
| numFormulaColumns | number | Le nombre de colonnes de formules dans le document. |
| numTriggerFormulaColumns | number | Le nombre de colonnes de formules déclencheuses dans le document. |
| numSummaryFormulaColumns | number | Le nombre de colonnes de formules récapitulatives dans le document. |
| numFieldsWithConditionalFormatting | number | Le nombre de champs avec mise en forme conditionnelle dans le document. |
| numTables | number | Le nombre de tables dans le document. |
| numOnDemandTables | number | Le nombre de tables à la demande dans le document. |
| numTablesWithConditionalFormatting | number | Le nombre de tables avec mise en forme conditionnelle dans le document. |
| numSummaryTables | number | Le nombre de tables récapitulatives dans le document. |
| numCustomWidgets | number | Le nombre de vues personnalisées dans le document. |
| customWidgetIds | string[] | Une liste des identifiants de plugins pour chaque vue personnalisée dans le document. Les identifiants des vues non créées par Grist Labs sont remplacés par "externalId". |

## sendingWebhooks
Déclenché lors de l'envoi de webhooks.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| numEvents | number | Le nombre d'événements dans le lot de webhooks envoyés. |
| docIdDigest | string | Un hachage de l'identifiant du document. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |

## siteMembership
Déclenché quotidiennement.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type de site. |
| numOwners | number | Le nombre d'utilisateurs avec un rôle de propriétaire dans ce site. |
| numEditors | number | Le nombre d'utilisateurs avec un rôle d'éditeur dans ce site. |
| numViewers | number | Le nombre d'utilisateurs avec un rôle de visionneur dans ce site. |

## siteUsage
Déclenché quotidiennement.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type de site. |
| inGoodStanding | boolean | Indique si l'abonnement du site est en règle. |
| numDocs | number | Le nombre de documents dans ce site. |
| numWorkspaces | number | Le nombre d'espaces de travail dans ce site. |
| numMembers | number | Le nombre de membres du site. |
| lastActivity | date | Un horodatage de la mise à jour la plus récente effectuée sur un document du site. |

## watchedVideoTour
Déclenché lorsque la visite vidéo est fermée.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| watchTimeSeconds | number | Le nombre de secondes écoulées dans le lecteur vidéo. |
