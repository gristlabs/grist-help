# Créer des Liens Uniques en 4 Étapes

Dans Grist, les "clés de lien" sont des paramètres d'URL qui, lorsqu'ils sont combinés avec la variable `user.LinkKey` dans les [permissions avancées](https://support.getgrist.com/access-rules/), détermineront quelles données un destinataire de lien est autorisé à voir.

Vous pouvez apprendre à le faire en quatre étapes faciles.
[Nous avons créé un modèle simple](https://public.getgrist.com/cBRGq2QKzTSC/Private-Tutor-LinkKey-Tutorial)
que vous pouvez copier et modifier en suivant ce guide.

Dans notre exemple, vous êtes un tuteur privé qui utilise Grist pour suivre les heures, les paiements et les données des clients.
Vous souhaitez partager l'historique des sessions et des paiements avec les parents via un lien qui ne montre que les données de leur famille. Une façon simple de le faire serait de définir des permissions avancées qui limitent la vue d'un destinataire de lien uniquement aux enregistrements liés à leur famille.

Faisons cela maintenant.

![Vue du tuteur et de la famille](images/2021-04-link-keys/full-v-limited-access-animated.gif)
*Le tuteur privé peut voir toutes les données, mais un parent ne peut voir que les données de sa famille.*
{: .wide-img-caption}

## Étape 1 : Créer un identifiant unique

Dans la table des familles, créez une nouvelle colonne dans laquelle vous utiliserez la fonction [`UUID()`](../functions.md#uuid) de Grist pour générer et attribuer une clé unique à chaque famille.

![Créer un UUID pour chaque famille](images/2021-04-link-keys/private-tutor-uuid.png)

Convertissez la colonne en colonne de données pour figer ses valeurs.

<span class="screenshot-large">*![Convertir en colonne de données](../examples/images/2021-04-link-keys/convert-to-data-column.png)*</span>
{: .screenshot-half }

Vous remarquerez que notre formule a changé en formule d'initialisation. Sélectionnez 'Appliquer aux nouveaux enregistrements'. Cela garantira que les nouvelles lignes se verront également attribuer un identifiant unique.

<span class="screenshot-large">*![Appliquer aux nouveaux enregistrements](../examples/images/2021-04-link-keys/apply-to-new-records.png)*</span>
{: .screenshot-half }

## Étape 2 : Connecter l'UUID aux enregistrements dans d'autres tables

Dans les tables Étudiants, Sessions et Paiements, ajoutez une colonne qui lie chaque enregistrement à l'UUID de la famille référencée. Nommez ces colonnes "UUID", avec la formule simple `$Family.UUID`{: .formula}.
Vous ne savez pas comment cela fonctionne ? Révisez les puissantes [colonnes de référence](../col-refs.md#reference-and-reference-lists) de Grist.

![Utiliser des colonnes de référence pour récupérer l'UUID](images/2021-04-link-keys/private-tutor-reference-UUID.png)

**Astuce :** La formule `$Family.UUID`{: .formula} récupère l'UUID de l'enregistrement référencé dans la colonne Famille.

## Étape 3 : Créer des liens uniques

Dans la table des familles, créez une nouvelle colonne dans laquelle vous utiliserez la fonction [`SELF_HYPERLINK()`](../functions.md#self_hyperlink) de Grist pour générer des hyperliens. Utilisez la formule `SELF_HYPERLINK(LinkKey_UUID=$UUID)`{: .formula} pour créer une clé de lien appelée "UUID" qui définit le paramètre d'URL à un `$UUID` spécifique dans un enregistrement. Convertissez le type de colonne en Texte > Hyperlien.

![Créer des liens uniques](images/2021-04-link-keys/private-tutor-UUID-links.png)

**Comment cela fonctionne-t-il ?** Le lien généré pour "Raddon, Fin" est `.../Private-Tutor-recUUID/p/9?UUID_=6752c258-443d-4a2c-800d-1491da265b72`. La "clé de lien" est la partie de l'URL qui lit `?UUID_=6752c258-443d-4a2c-800d-1491da265b72`.

## Étape 4 : Créer des permissions avancées

Ouvrez la page des Permissions Avancées depuis le panneau de gauche et créez des règles pour donner un accès limité à vos clients. Réfléchissons à qui devrait accéder à chaque table et quelles parties de celle-ci devraient être accessibles.

 1. Vous, le propriétaire du document, devez avoir un accès complet pour Lire (R), Mettre à jour (U), Créer (C) et Supprimer (D) des enregistrements dans chaque table. Ajoutez la règle `user.Access in [OWNER]` à _chaque table_ pour accorder aux propriétaires un accès complet. Pourquoi `user.Access` ? Consultez les [conditions des permissions avancées](../access-rules.md#access-rule-conditions) pour en savoir plus.

 2. Les parents consultant le document doivent avoir un accès en lecture seule uniquement aux enregistrements liés à leur famille. Dans les étapes précédentes, nous avons créé un identifiant unique (UUID) pour chaque famille, connecté les enregistrements pertinents dans toutes les tables à un UUID, et généré des URL avec des clés de lien incluant ces UUID. Maintenant, nous devons créer des permissions avancées qui correspondent aux UUID et aux clés de lien URL.

    Pour ce faire, ajoutez la règle `user.LinkKey.UUID == rec.UUID` à _chaque table_. Cela indique à Grist de regarder la clé de lien de l'URL (nommée UUID) et de la faire correspondre aux enregistrements incluant ce même UUID. Définissez l'accès en lecture seule en cliquant sur le menu déroulant à côté de "permissions".

 3. Assurez-vous que l'accès public est activé dans le panneau "Gérer les utilisateurs" (voir [Partage](../sharing.md)).

**Astuce :** Ne modifiez pas les règles par défaut. L'accès au niveau des lignes est accordé dans les tables pertinentes.

![Créer des liens uniques](images/2021-04-link-keys/private-tutor-UUID-acl.png)

Vous l'avez fait ! Ce n'est que le début. Il y a beaucoup plus que vous pouvez faire avec les clés de lien. Consultez [un autre exemple](../access-rules.md#link-keys) pour approfondir encore plus votre compréhension des clés de lien.

**Besoin d'aide supplémentaire ?** Consultez la [solution du tutoriel ici](https://public.getgrist.com/9ZQvegsao3zT/Private-Tutor-LinkKey-Tutorial-Solution?UUID_=039170d0-c4d6-4a43-a357-3cb0fd10822f).
Faites une copie pour voir toutes les données :

<span class="screenshot-large">*![faire-une-copie](images/2021-04-link-keys/make-a-copy.png)*</span>
{: .screenshot-half }