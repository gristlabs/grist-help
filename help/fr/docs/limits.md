# Limites

Pour vous aider à évaluer si Grist fonctionnera pour un cas d’usage que vous avez en tête, voici une liste de limitations qui s’appliquent à son fonctionnement.

## Nombre de documents

Pour tous les plans, aucune limite de document n'est appliquée.

Pour éviter toute utilisation abusive accidentelle du système par des outils d'automatisation, les espaces d'équipe peuvent être limités à 1 000 documents. Si vous rencontrez une telle limite pour une utilisation légitime, veuillez contacter le support pour l'augmenter.

Les anciens plans gratuits avaient une limite de dix documents. En savoir plus sur [les anciennes limites](#legacy-limits).

## Nombre de collaborateurs

Pour les espaces d'équipe de tous les forfaits, il n'y a aucune limite au nombre de membres de l'équipe qui peuvent être ajoutés au site. Pour les forfaits payants, le nombre de membres de l'équipe détermine le prix. Consultez notre [page de tarification](https://www.getgrist.com/pricing) pour plus de détails.

Les membres de l'équipe ajoutés à votre site d'équipe peuvent hériter de l'accès aux espaces de travail ou aux documents au sein de cette organisation. En savoir plus sur [le partage d'équipe](team-sharing.md) .

Sur les espaces personnels et d'équipe, chaque document peut être partagé avec jusqu'à 2 invités gratuits qui n'affectent pas le prix du forfait, même sur les forfaits payants.

## Nombre de tables par document

La limite autorisée est de 500 tables par document. Il s'agit d'une limite souple. Si vous vous retrouvez avec un grand nombre de tables, envisagez de fusionner ceux qui ont la même structure. Par exemple, si vous avez une table pour chaque type de produit, envisagez d'utiliser une seul table avec le type de produit comme colonne supplémentaire.

## Lignes par document

Avec le plan gratuit, les documents ont une limite de 5 000 lignes. La limite pour les plans Pro et Business est respectivement de 100 000 et 150 000 lignes.

Les documents sont également soumis à des limitations de taille de données, comme décrit ci-dessous.

## Taille des données

La taille totale des données d'un document est limitée, elle est déterminée en multipliant la limite de lignes par 2 Ko. Cela signifie que les documents du plan Free ont une limite de taille de données de 10 Mo, tandis que les documents des plans Pro et Business ont des limites de 200 Mo et 300 Mo respectivement. Cette valeur correspond approximativement à la taille des données au format CSV. Vous pouvez voir la taille actuelle des données d'un document sur la [page « Données brutes »](https://support.getgrist.com/raw-data/#usage) .

Pour des raisons de mémoire et de performances, la taille des données recommandée est limitée à 20 Mo. Les documents dépassant 20 Mo peuvent ralentir ou atteindre des limites de mémoire en fonction de leur complexité. Par exemple, un document contenant 100 000 lignes et 24 colonnes numériques atteindrait cette limite recommandée. Pour optimiser les formules sur des documents volumineux, vous pouvez utiliser le [minuteur de formule](https://support.getgrist.com/formula-timer/) intégré.

Les pièces jointes sont comptabilisées séparément. Les pièces jointes et les données d'un même document sont limitées à 1 Go sur tous les forfaits.

## Téléchargements

Les téléversements sont limités à 50 Mo, tant pour les pièces jointes que pour l'importation de données. Notez qu'une importation dans cette limite peut entraîner un document dépassant la taille limite du document, auquel cas le téléchargement risque toujours d'échouer.

## Limites de l'API

Les plans gratuits sont limités à 5 000 appels API par document et par jour. Les plans Pro et Business augmentent la limite à 40 000 et 60 000 appels par document et par jour, respectivement.

Les plans gratuits peuvent être limités à 5 requêtes API par seconde et par document. Le plan d'équipe n'impose pas une telle limite de débit.

Par ailleurs, il existe une limite de simultanéité de 10 pour tous les plans : si 10 requêtes API autorisées sont actuellement en cours de traitement pour un document particulier, toutes les autres requêtes API seront rejetées (avec le code d'état HTTP 429) jusqu'à ce qu'au moins une des requêtes d'origine soit terminée. Un client qui attend qu'une requête soit terminée avant d'envoyer la suivante n'atteindra pas cette limite (en supposant qu'il soit le seul client à accéder au document).

La taille du corps de chaque requête API individuelle est limitée à 1 Mo. En particulier, cela signifie que les demandes d'ajout ou de mise à jour de plusieurs enregistrements peuvent devoir être divisées en lots qui respectent cette limite.

## Disponibilité des documents

De temps à autre, lors des mises à niveau et des transitions opérationnelles, certains documents Grist peuvent devenir inaccessibles pendant quelques secondes. Veuillez en tenir compte lorsque vous utilisez l'API de Grist.

## Limites héritées

Les anciens forfaits personnels gratuits ont les limites suivantes :

- 10 documents par espace d'équipe
- Pas de dossier
- 100 000 lignes

Pour déterminer si vous utilisez un espace personnel existant, cliquez sur le nom de votre site (@votre-nom) en haut à gauche. Les sites personnels sur le plan existant afficheront « Site personnel (ancien) » dans le menu déroulant.

Dans le plan gratuit actuel, tous les espaces personnels et d'équipe partagent les mêmes limites que celles décrites ci-dessus et sur notre [page de tarification](https://www.getgrist.com/pricing) .
