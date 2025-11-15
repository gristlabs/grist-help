---
title: Full telemetry
---

# Niveau de télémétrie : complet
Ceci est un niveau de télémétrie approprié pour une utilisation interne par un service hébergé, avec `GRIST_TELEMETRY_URL` défini sur un point de terminaison contrôlé par l'opérateur du service.

## apiUsage
Déclenché lorsqu'une requête HTTP avec une clé API est effectuée.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| method | string | La méthode de la requête HTTP (par exemple GET, POST, PUT). |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| userAgent | string | L'en-tête de la requête HTTP User-Agent. |

## beaconOpen
Déclenché lorsque HelpScout Beacon est ouvert.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |

## beaconArticleViewed
Déclenché lorsqu'un article est ouvert dans HelpScout Beacon.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| articleId | string | L'identifiant de l'article. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |

## beaconEmailSent
Déclenché lorsqu'un email est envoyé dans HelpScout Beacon.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |

## beaconSearch
Déclenché lorsqu'une recherche est effectuée dans HelpScout Beacon.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| searchQuery | string | La requête de recherche. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |

## documentForked
Déclenché lorsqu'un document est forké.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | Un hash de l'identifiant du document. |
| siteId | number | L'identifiant du site contenant le document forké. |
| siteType | string | Le type du site. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| forkIdDigest | string | Un hash de l'identifiant du fork. |
| forkDocIdDigest | string | Un hash de l'identifiant complet du fork, incluant l'identifiant du tronc et l'identifiant du fork. |
| trunkIdDigest | string | Un hash de l'identifiant du tronc. |
| isTemplate | boolean | Si le tronc est un modèle. |
| lastActivity | date | Horodatage de la dernière mise à jour du document tronc. |

## documentOpened
Déclenché lorsqu'un document public ou un modèle est ouvert.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | Un hash de l'identifiant du document. |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type du site. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| isPublic | boolean | Si le document est public. |
| isSnapshot | boolean | Si un instantané a été ouvert. |
| isTemplate | boolean | Si le document est un modèle. |
| lastUpdated | date | Horodatage de la dernière mise à jour du document. |

## documentUsage
Déclenché à l'ouverture et à la fermeture du document, ainsi qu'à chaque heure pendant qu'un document est ouvert.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| docIdDigest | string | Un hash de l'identifiant du document. |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type du site. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| triggeredBy | string | Ce qui a causé le déclenchement de cet événement. Peut être soit "docOpen", "interval", ou "docClose". |
| isPublic | boolean | Si le document est public. |
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
| numColumnsWithConditionalFormatting | number | Le nombre de colonnes avec un formatage conditionnel dans le document. |
| numFormulaColumns | number | Le nombre de colonnes de formules dans le document. |
| numTriggerFormulaColumns | number | Le nombre de colonnes de formules de déclenchement dans le document. |
| numSummaryFormulaColumns | number | Le nombre de colonnes de formules de résumé dans le document. |
| numFieldsWithConditionalFormatting | number | Le nombre de champs avec un formatage conditionnel dans le document. |
| numTables | number | Le nombre de tables dans le document. |
| numOnDemandTables | number | Le nombre de tables à la demande dans le document. |
| numTablesWithConditionalFormatting | number | Le nombre de tables avec un formatage conditionnel dans le document. |
| numSummaryTables | number | Le nombre de tables de résumé dans le document. |
| numCustomWidgets | number | Le nombre de vues personnalisées dans le document. |
| customWidgetIds | string[] | Une liste des identifiants de plugins pour chaque vue personnalisée dans le document. Les identifiants des vues non créées par Grist Labs sont remplacés par "externalId". |

## processMonitor
Déclenché toutes les 5 secondes.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| heapUsedMB | number | Taille du tas JS utilisé, en MiB. |
| heapTotalMB | number | Taille totale du tas, en MiB, allouée pour JS par V8. |
| cpuAverage | number | Fraction (typiquement entre 0 et 1) de l'utilisation du CPU. Inclut tous les threads, donc peut dépasser 1. |
| intervalMs | number | Intervalle (en millisecondes) sur lequel `cpuAverage` est rapporté. |

## sendingWebhooks
Déclenché lors de l'envoi de webhooks.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| numEvents | number | Le nombre d'événements dans le lot de webhooks envoyés. |
| docIdDigest | string | Un hash de l'identifiant du document. |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type du site. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |

## signupVerified
Déclenché après qu'un utilisateur a vérifié avec succès son compte lors de l'inscription. Non déclenché dans grist-core.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| isAnonymousTemplateSignup | boolean | Si l'utilisateur a consulté des modèles avant de s'inscrire. |
| templateId | string | L'identifiant du modèle que l'utilisateur a consulté en dernier avant de s'inscrire, le cas échéant. |

## siteMembership
Déclenché quotidiennement.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type du site. |
| numOwners | number | Le nombre d'utilisateurs avec un rôle de propriétaire dans ce site. |
| numEditors | number | Le nombre d'utilisateurs avec un rôle d'éditeur dans ce site. |
| numViewers | number | Le nombre d'utilisateurs avec un rôle de visualiseur dans ce site. |

## siteUsage
Déclenché quotidiennement.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type du site. |
| inGoodStanding | boolean | Si l'abonnement du site est en règle. |
| stripePlanId | string | L'identifiant du plan Stripe associé à ce site. |
| numDocs | number | Le nombre de documents dans ce site. |
| numWorkspaces | number | Le nombre d'espaces de travail dans ce site. |
| numMembers | number | Le nombre de membres du site. |
| lastActivity | date | Un horodatage de la mise à jour la plus récente effectuée sur un document du site. |

## tutorialProgressChanged
Déclenché lors des changements de progression du tutoriel.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| tutorialForkIdDigest | string | Un hash de l'identifiant du fork du tutoriel. |
| tutorialTrunkIdDigest | string | Un hash de l'identifiant du tronc du tutoriel. |
| lastSlideIndex | number | L'index basé sur 0 de la dernière diapositive du tutoriel que l'utilisateur avait ouverte. |
| numSlides | number | Le nombre total de diapositives dans le tutoriel. |
| percentComplete | number | Pourcentage d'achèvement du tutoriel. |

## tutorialRestarted
Déclenché lorsqu'un tutoriel est redémarré.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| tutorialForkIdDigest | string | Un hash de l'identifiant du fork du tutoriel. |
| tutorialTrunkIdDigest | string | Un hash de l'identifiant du tronc du tutoriel. |
| docIdDigest | string | Un hash de l'identifiant du document. |
| siteId | number | L'identifiant du site. |
| siteType | string | Le type du site. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |
| access | string | Le niveau d'accès au document de l'utilisateur qui a déclenché cet événement. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |

## watchedVideoTour
Déclenché lorsque la visite vidéo est fermée.

| Champ | Type | Description |
| ----- | ---- | ----------- |
| watchTimeSeconds | number | Le nombre de secondes écoulées dans le lecteur vidéo. |
| userId | number | L'identifiant de l'utilisateur qui a déclenché cet événement. |
| altSessionId | string | Un identifiant aléatoire basé sur la session pour l'utilisateur qui a déclenché cet événement. |
