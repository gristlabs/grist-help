# Limites

Pour vous aider à évaluer si Grist répondra à vos besoins, voici une liste des limitations qui s'appliquent à son fonctionnement.

## Nombre de documents

Pour tous les plans, le nombre de documents n'est pas limité.

Pour éviter l'utilisation abusive du système par des outils d'automatisation, les espaces d'équipe peuvent être limités à 1 000 documents. Si vous rencontrez cette limite pour une utilisation légitime, veuillez contacter le support pour l'augmenter.

Les anciens plans gratuits avaient une limite de dix documents. En savoir plus sur les [limites héritées](#legacy-limits).

## Nombre de collaborateurs

Pour les espaces d'équipe sur tous les plans, il n'y a pas de limite au nombre de membres de l'équipe qui peuvent être ajoutés à l'espace. Pour les plans payants, le nombre de membres de l'équipe détermine le prix. Consultez notre [page de tarification](https://www.getgrist.com/pricing) pour plus de détails.

Les membres de l'équipe ajoutés à votre espace d'équipe peuvent hériter de l'accès aux espaces de travail ou aux documents au sein de cette organisation. En savoir plus sur le [partage d'équipe](team-sharing.md).

Sur les espaces personnels et d'équipe, chaque document peut être partagé avec jusqu'à 2 invités gratuits qui n'affectent pas le prix du plan, même sur les plans payants.

## Nombre de tables par document

Il y a une limite de 500 tables autorisées par document. C'est une limite souple. Si vous vous retrouvez avec un grand nombre de tables, envisagez de fusionner celles qui ont la même structure. Par exemple, si vous avez une table pour chaque type de produit, envisagez d'utiliser une seule table avec le type de produit comme colonne supplémentaire.

## Lignes par document

Sur le plan gratuit, les documents ont une limite de 5 000 lignes. La limite pour les plans Pro et Business est de 100 000 et 150 000 lignes, respectivement.

Les documents sont également soumis à des limites de taille de données, comme décrit ci-dessous.

## Taille des données

Il y a une limite stricte à la taille totale des données d'un document, déterminée comme la limite de lignes multipliée par 2KB. Cela signifie que les documents sur le plan gratuit ont une limite de taille de données de 10MB, tandis que les documents des plans Pro et Business ont des limites de 200MB et 300MB, respectivement. Cette valeur correspond approximativement à la taille des données en format CSV. Vous pouvez voir la taille actuelle des données d'un document sur la [page 'Données sources'](https://support.getgrist.com/raw-data/#usage).

Pour des raisons de mémoire et de performance, il est recommandé de ne pas dépasser une taille de données de 20MB. Les documents dépassant 20MB peuvent ralentir ou rencontrer des limites de mémoire en fonction de leur complexité. Par exemple, un document avec 100 000 lignes et 24 colonnes numériques atteindrait cette limite recommandée. Pour aider à optimiser les formules sur de grands documents, vous pouvez utiliser le [chronomètre de formule](https://support.getgrist.com/formula-timer/) intégré.

Les pièces jointes sont comptées séparément. Les pièces jointes plus les données dans un seul document sont limitées à 1GB pour tous les plans.

## Téléchargements

Les téléchargements sont limités à 50MB, à la fois pour les pièces jointes et pour importer des données. Notez qu'une importation dans cette limite peut entraîner un document qui dépasse la limite de taille de document, auquel cas le téléchargement est toujours susceptible d'échouer.

## Limites de l'API

Les plans gratuits sont limités à 5 000 appels API par document et par jour. Les plans Pro et Business augmentent la limite à 40 000 et 60 000 appels par document et par jour, respectivement.

Les plans gratuits peuvent être limités à 5 requêtes API par seconde par document. Le plan d'équipe n'impose pas une telle limite de débit.

Par ailleurs, il y a une limite de concurrence de 10 pour tous les plans : si 10 requêtes API autorisées sont actuellement en cours de traitement pour un document particulier, toute autre requête API sera rejetée (avec le code d'état HTTP 429) jusqu'à ce qu'au moins une des requêtes initiales soit terminée. Un client qui attend qu'une requête soit terminée avant d'envoyer la suivante ne devrait pas atteindre cette limite (en supposant qu'il est le seul client accédant au document).

La taille du corps de toute requête API individuelle est limitée à 1MB. En particulier, cela signifie que les requêtes ajoutant ou mettant à jour plusieurs enregistrements peuvent devoir être divisées en lots qui tiennent dans cette limite.

## Disponibilité des documents

De temps en temps, lors des mises à jour et des transitions opérationnelles, les documents Grist individuels peuvent devenir inaccessibles pendant quelques secondes. Veuillez en tenir compte lors de l'utilisation de l'API de Grist.

## Limites héritées

Les anciens plans personnels gratuits ont les limites suivantes :

* 10 documents par espace
* Pas d'espaces de travail
* 100 000 lignes

Pour déterminer si vous êtes sur un espace personnel hérité, cliquez sur le nom de votre espace (@votre-nom) en haut à gauche. Les espaces personnels sur le plan hérité indiqueront "Espace personnel (hérité)" dans le menu déroulant.

Sur le plan gratuit actuel, tous les espaces personnels et d'équipe partagent les mêmes limites que celles décrites ci-dessus et sur notre [page de tarification](https://www.getgrist.com/pricing).