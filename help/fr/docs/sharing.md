---
title: Sharing a document
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/vJpcC3-FHF8?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Partage

Pour collaborer dans Grist, vous pouvez inviter d'autres utilisateurs à accéder à un document. Pour les plans d'équipe,
vous pouvez également ajouter des utilisateurs à votre espace d'équipe ou à un dossier (voir
[Partage d'équipe](team-sharing.md)).

Lorsque le document est ouvert, cliquez sur l'icône de partage
(<span class="grist-icon" style="--icon: var(--icon-Share)"></span>)
en haut à droite de l'écran. Cela ouvre un menu avec des options de partage et d'exportation.
Sélectionnez "Gérer les utilisateurs".

![sharing-doc-menu](images/sharing/sharing-doc-menu.png)

Cette option est également disponible sur la page d'accueil de Grist, lorsque vous cliquez sur l'icône à trois points à droite du nom d'un document.

![sharing-doclist-menu](images/sharing/sharing-doclist-menu.png)

Si l'élément "Gérer les utilisateurs" est grisé, cela signifie que vous n'avez pas la permission de
voir ou gérer les paramètres de partage de ce document.

La boîte de dialogue de partage qui s'ouvre liste les utilisateurs qui ont accès au
document. Pour ajouter un utilisateur, entrez l'adresse e-mail de cet utilisateur et appuyez sur "Entrée" ou cliquez sur
"Inviter un nouveau membre" dans le menu déroulant.

![sharing-add-user](images/sharing/sharing-add-user.png)

Vous pouvez sélectionner un rôle pour tout utilisateur invité, puis cliquer sur "Confirmer" pour enregistrer les modifications et envoyer les invitations.

![sharing-roles](images/sharing/sharing-roles.png)

## Rôles

Il y a trois rôles principaux pris en charge par Grist :

- **Lecteur** : permet à un utilisateur de voir le document mais pas d'y apporter des modifications.
  Certaines opérations comme le tri et le filtrage fonctionneront sans affecter
  les autres utilisateurs du document. C'est le rôle par défaut lorsque vous tapez une adresse e-mail.

- **Éditeur** : permet à un utilisateur de voir ou de modifier les données, la structure ou les formules du document,
  mais pas ses paramètres de partage.

- **Propriétaire** : donne à un utilisateur des permissions complètes sur le document, y compris pour voir et modifier ses
  paramètres de partage. Un document peut avoir un ou plusieurs propriétaires. Si vous êtes capable d'ouvrir la
  boîte de dialogue "Gérer les utilisateurs", vous avez le rôle de "propriétaire". Vous ne pouvez pas changer votre propre
  accès, mais votre accès peut être réduit ou supprimé par un autre propriétaire.

L'option d'hériter de l'accès n'affecte pas les plans individuels, et est expliquée
dans l'article [Partage d'équipe](team-sharing.md).

## Accès public et partage de lien

Si vous souhaitez partager votre document avec un public plus large, vous pouvez le rendre accessible publiquement.
Ouvrez le menu de partage en cliquant sur l'icône de partage 
(<span class="grist-icon" style="--icon: var(--icon-Share)"></span>) en haut à droite de l'écran et en sélectionnant "Gérer les utilisateurs". Activez le menu déroulant à côté de "Accès public" et sélectionnez "Activé" :

<span class="screenshot-large">*![public access toggle](./images/newsletters/2020-09/public-access-toggle.png)*</span>

Une fois que vous cliquez sur "confirmer", toute personne ayant le lien vers votre document
pourra le voir. Elle ne sera pas obligée d'avoir un compte Grist.

Le bouton "Copier le lien" est pratique pour le partage de lien. Vous pouvez copier le lien dans le presse-papiers pour
le coller dans un e-mail, un tweet ou ailleurs.

Vous pouvez également permettre à toute personne ayant le lien de modifier votre document. Il suffit de
changer le rôle pour l'accès public en Éditeur.

<span class="screenshot-large">*![public access editor](./images/newsletters/2020-09/public-access-editor.png)*
</span>

Notez que cela permet à **n'importe qui** ayant le lien de modifier
**absolument tout** dans votre document, y compris de supprimer toutes les
données. En cas de problème, vous pouvez récupérer les versions précédentes de votre
document dans la section des instantanés de
[Historique du document.](./automatic-backups.md#examining-backups)

!!! note "Partager une vue intégrée"
    Ajouter `?embed=true` ou `?style=singlePage` à la fin de l'URL de la page d'un document rend le document sans la barre d'outils en haut, le menu de la page à gauche ou le panneau du créateur à droite. `?style=singlePage` peut être modifié et suit les permissions avancées, tandis que `?embed=true` est en lecture seule. Pour en savoir plus sur l'intégration, voir [Intégration de Grist](embedding.md).

[Les permissions avancées](access-rules.md) peuvent être combinées avec le partage de lien en lecture seule, c'est-à-dire lorsque le rôle d'accès public est défini sur "Lecteur". Lisez-en plus sur
[Les clés de lien](access-rules.md#link-keys) pour apprendre comment définir des règles qui
limitent les parties de vos données que les utilisateurs peuvent voir lorsqu'ils accèdent à votre document
via un lien particulier.

Les permissions avancées sont prises en charge avec le partage de lien lorsque l'accès public
est défini sur "Lecteur" ou "Éditeur".

## Quitter un document

Les non-propriétaires peuvent consulter leurs détails d'accès à un document en cliquant sur l'icône de partage
(<span class="grist-icon" style="--icon: var(--icon-Share)"></span>) en haut à droite de l'écran et en sélectionnant "Détails d'accès".

![Access Details](images/newsletters/2022-05/access-details.png)

Depuis la fenêtre contextuelle des détails d'accès, vous pouvez cliquer sur l'icône de la corbeille pour quitter un document.

![Access Details](images/sharing/sharing-access-details.png)
