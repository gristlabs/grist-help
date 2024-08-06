# Limites

Pour vous aider à évaluer si Grist fonctionnera pour un cas d’usage que vous avez en tête, voici une liste de limitations qui s’appliquent à son fonctionnement.

## Nombre de documents

Pour tous les plans, aucune limite de document n'est appliquée.

Pour éviter toute utilisation abusive accidentelle du système par des outils d'automatisation, les espaces d'équipe peuvent être limités à 1 000 documents. Si vous rencontrez une telle limite pour une utilisation légitime, veuillez contacter le support pour l'augmenter.

Les anciens plans gratuits avaient une limite de dix documents. En savoir plus sur [les anciennes limites](#legacy-limits).

## Number of collaborators

Pour les espaces d'équipe de tous les forfaits, il n'y a aucune limite au nombre de membres de l'équipe qui peuvent être ajoutés au site. Pour les forfaits payants, le nombre de membres de l'équipe détermine le prix. Consultez notre [page de tarification](https://www.getgrist.com/pricing) pour plus de détails.

Team members added to your team site may inherit access to workspaces or documents within that organization. Learn more about [team sharing](team-sharing.md).

Sur les espaces personnels et d'équipe, chaque document peut être partagé avec jusqu'à 2 invités gratuits qui n'affectent pas le prix du forfait, même sur les forfaits payants.

## Nombre de tables par document

La limite autorisée est de 500 tables par document. Il s'agit d'une limite souple. Si vous vous retrouvez avec un grand nombre de tables, envisagez de fusionner ceux qui ont la même structure. Par exemple, si vous avez une table pour chaque type de produit, envisagez d'utiliser une seul table avec le type de produit comme colonne supplémentaire.

## Rows per document

On the Free plan, documents have a limit of 5,000 rows. The limit for Pro and Business plans is 100,000 and 150,000 rows, respectively.

Les documents sont également soumis à des limitations de taille de données, comme décrit ci-dessous.

## Data size

There is a hard limit to a document's total data size, determined as the row limit multiplied by 2KB. This means that documents on the Free plan have a data size limit of 10MB, with Pro and Business plan documents having limits of 200MB and 300MB, respectively. This value corresponds approximately to the size of the data in CSV format. You can see a document's current data size on the ['Raw Data' page](https://support.getgrist.com/raw-data/#usage).

For memory and performance reasons, there's a recommended data size limit of 20MB. Documents beyond 20MB may slow down or run into memory limits depending on their complexity. As an example, a document with 100,000 rows and 24 numeric columns would reach this recommended limit. To help optimize formulas on large documents, you can use the built-in [formula timer](https://support.getgrist.com/formula-timer/).

Attachments are counted separately. Attachments plus data in a single document are limited to 1GB on all plans.

## Uploads

Les téléversements sont limités à 50 Mo, tant pour les pièces jointes que pour l'importation de données. Notez qu'une importation dans cette limite peut entraîner un document dépassant la taille limite du document, auquel cas le téléchargement risque toujours d'échouer.

## API limits

Free plans are limited to 5,000 API calls per document per day. Pro and Business plans raise the limit to 40,000 and 60,000 calls per document per day, respectively.

Free plans may be rate limited to 5 API requests per second per document. The team plan does not impose such a rate limit.

Separately, there is a concurrency limit of 10 for all plans: if 10 authorized API requests are currently being processed for a particular document, any other API requests will be rejected (with HTTP status code 429) until at least one of the original requests completes.  A client that waits for one request to complete before sending the next would not hit this limit (assuming it is the sole client accessing the document).

The size of the body of any individual API request is limited to 1MB. In particular, this means that requests adding or updating multiple records may need to be split into batches that fit within this limit.

## Document availability

From time to time, during upgrades and operational transitions, individual Grist documents may become inaccessible for a period of some seconds. Please bear this in mind when using Grist's API.

## Legacy limits

Older free personal plans have the following limits:

- 10 documents par espace d'équipe
- Pas de dossier
- 100,000 rows

Pour déterminer si vous utilisez un espace personnel existant, cliquez sur le nom de votre site (@votre-nom) en haut à gauche. Les sites personnels sur le plan existant afficheront « Site personnel (ancien) » dans le menu déroulant.

Dans le plan gratuit actuel, tous les espaces personnels et d'équipe partagent les mêmes limites que celles décrites ci-dessus et sur notre [page de tarification](https://www.getgrist.com/pricing) .
