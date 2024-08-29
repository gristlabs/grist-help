---
title: Cloud storage
---

Stockage Cloud {: .tag-core .tag-ee }
=============

Cette fonctionnalité permet la synchronisation automatique des documents Grist et des versions de documents vers des magasins compatibles S3 tels que MinIO (ou AWS S3 lui-même).

Grist Enterprise prend en charge nativement les comptes de stockage Azure et AWS S3 en utilisant le client officiel d'AWS.

Il est conseillé d'avoir [Redis activé](../self-managed.md#what-is-a-state-store) lors de l'utilisation du stockage cloud, car c'est la configuration la mieux testée.

Activer la création de snapshots entraîne un grand changement dans la façon dont les documents sont stockés, et il est préférable de le faire avant de créer des documents. Sauvegardez votre travail avant de modifier cette configuration.

Magasins compatibles S3 via le client MinIO {: .tag-core .tag-ee }
-----

Activez cette option en définissant les variables d'environnement suivantes :

  * Définissez `GRIST_DOCS_MINIO_ACCESS_KEY` et `GRIST_DOCS_MINIO_SECRET_KEY`.
  * Définissez `GRIST_DOCS_MINIO_BUCKET` sur le nom d'un bucket versionné que vous avez créé. Il est important que le bucket ait la versioning activée.
  * Définissez `GRIST_DOCS_MINIO_ENDPOINT` sur le nom d'hôte approprié - sans protocole, sans port.
  * (Optionnel) Définissez `GRIST_DOCS_MINIO_USE_SSL` sur `1` pour utiliser le protocole `https` (par défaut) ou `0` pour `http`.
  * (Optionnel) Définissez `GRIST_DOCS_MINIO_PORT` sur le port à utiliser, si le port par défaut pour le protocole (80/443) n'est pas correct.
  * (Optionnel) Définissez `GRIST_DOCS_MINIO_PREFIX` sur le préfixe de vos documents, par défaut "docs/".
  * (Optionnel) Définissez `GRIST_DOCS_MINIO_BUCKET_REGION` sur la région de votre bucket, par défaut "us-east-1".

Si vous utilisez AWS S3, le point de terminaison à utiliser est `s3.amazonaws.com`, et il n'est pas nécessaire de définir un numéro de port ou un indicateur SSL. Les clés d'accès et secrètes sont vos `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY`. Assurez-vous de créer un bucket versionné à l'avance.

Azure {: .tag-ee }
-----

Pour Azure :

  * Créez un compte de stockage dans le portail Azure.
  * Pour le service blob du compte de stockage, assurez-vous que la versioning est activée.
  * Obtenez une chaîne de connexion à partir de la section Clés d'accès du compte de stockage. Elle peut ressembler à `DefaultEndpointsProtocol=https;AccountName=...`.
  * Placez la chaîne de connexion dans une variable d'environnement appelée `AZURE_STORAGE_CONNECTION_STRING`. 
  * Définissez le nom d'un conteneur de stockage Azure dans une variable d'environnement appelée `GRIST_AZURE_CONTAINER`. Un exemple de nom de conteneur est `my-grist-docs`.
  * Définissez un préfixe tel que `v1/` dans une variable d'environnement appelée `GRIST_AZURE_PREFIX`.

S3 avec le client AWS natif {: .tag-ee}
-----

Pour S3 :

  * Définissez le nom du bucket S3 dans une variable d'environnement appelée `GRIST_DOCS_S3_BUCKET`. Un exemple de nom de bucket est `my-grist-docs`.
  * Définissez un préfixe tel que `v1/` dans une variable d'environnement appelée `GRIST_DOCS_S3_PREFIX`.
  * Organisez l'accès en utilisant les nombreuses options d'AWS ; sinon, vous pouvez définir les variables `AWS_ACCESS_KEY_ID` et `AWS_SECRET_ACCESS_KEY`.

Utilisation une fois configuré {: .tag-core .tag-ee}
-----

Une fois la configuration du stockage externe en place, démarrez Grist normalement pour Grist autogéré. Au démarrage, il devrait y avoir une ligne comme :

`info: == grist.externalStorage.[s3|azure|minio].active: true`

Tous les documents seront lus et enregistrés dans le bucket S3 ou le conteneur Azure correspondant. La configuration est la plus simple sur une nouvelle installation de Grist sans aucun document Grist préexistant.

Une fois en fonctionnement, il est conseillé de configurer la "gestion du cycle de vie" du compte de stockage pour définir les limites souhaitées sur la durée de conservation des versions. Grist n'a aucune exigence à ce sujet, c'est strictement selon vos préférences.
