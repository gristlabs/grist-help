---
title: Contrôles d'administration
---

# Contrôles d'administration

Les Contrôles d'administration de Grist fournissent une vue complète des utilisateurs et des ressources dans une installation
Grist. Ils sont disponibles sur tous les plans Enterprise, qu'ils soient gérés par Grist Labs ou hébergés sur vos
propres serveurs.

## Accéder aux Contrôles d'administration

Les Contrôles d'administration ne sont disponibles que pour l'[administrateur de l'installation](self-managed.md#quest-ce-que-le-compte-administratif) Grist. Lorsque vous êtes connecté en tant qu'administrateur sur votre site, ouvrez le Panneau d'administration soit depuis la section 'Ressources Grist'
en bas à gauche de l'écran, soit depuis le menu déroulant de l'utilisateur.

*![Panneau d'administration dans les outils](images/admin-controls/admin-panel-in-tools.png)*
{: .screenshot-half }

*![Panneau d'administration dans le menu utilisateur](images/admin-controls/admin-panel-in-user-menu.png)*
{: .screenshot-half }

Le Panneau d'administration s'ouvre sur la page _Installation_, où vous pouvez configurer les paramètres de l'installation. Le panneau de gauche liste également 'Contrôles d'administration', avec des pages pour _Utilisateurs_, _Organisations_, _Espaces de travail_,
et _Documents_.

*![Pages de la zone d'administration](images/admin-controls/admin-area-pages.png)*
{: .screenshot-half }

## Page Utilisateurs

La page _Utilisateurs_ liste tous les utilisateurs de votre installation. Les détails incluent :

- `Nom`
- `E-mail`
- `Première connexion` : quand l'utilisateur s'est connecté pour la première fois.
- `Dernière connexion` : la dernière fois que l'utilisateur s'est connecté.
- `Clé API` : si l'utilisateur a créé une clé API (la clé API réelle n'est pas affichée).
- `Organisations` / `Espaces de travail` / `Documents` : combien de chaque type de ressource cet utilisateur a accès.

Cliquez sur le lien dans la colonne **Nom**, ou utilisez le bouton 'Afficher les détails' pour développer les détails pour l'utilisateur
sélectionné. Vous pouvez également ouvrir les détails en appuyant sur la touche <code class="keys">*Espace*</code>. Les détails
incluent une carte avec les informations de l'utilisateur, et des listes d'organisations, d'espaces de travail, et de
documents auxquels cet utilisateur peut accéder. Chaque ligne montre le niveau d'accès que l'utilisateur a à cette
ressource, et les détails pour la ressource.

*![page-utilisateurs-avec-détails](images/admin-controls/users-page-with-details.png)*

### Supprimer un utilisateur

Une action spéciale disponible sur la page _Utilisateurs_ est 'Supprimer l'utilisateur'. Elle est disponible sous le bouton 'Actions' en haut à droite de la carte de détails de l'utilisateur développée, ou dans les menus contextuels de ligne ou de cellule comme élément 'Actions > Supprimer l'utilisateur'.

*![supprimer-utilisateur-dans-bouton-actions](images/admin-controls/remove-user-in-action-button.png)*
{: .screenshot-half }

*![supprimer-utilisateur-dans-menu-ligne](images/admin-controls/remove-user-in-row-menu.png)*
{: .screenshot-half }

Supprimer un utilisateur supprime cet utilisateur entièrement de partout sur votre site. Cette opération ne peut pas être
annulée. Vous devez confirmer la suppression en tapant l'adresse e-mail de l'utilisateur.

<span class="screenshot-large">*![supprimer-compte](images/admin-controls/delete-account.png)*</span>
{: .screenshot-half }

Si l'utilisateur possède des ressources de site d'équipe, vous aurez l'option d'assigner un autre utilisateur pour reprendre son accès au niveau propriétaire. Par défaut,
vous (l'administrateur de l'installation) deviendrez propriétaire de toutes ces ressources.

<span class="screenshot-large">*![supprimer-compte-avec-sélecteur](images/admin-controls/delete-account-with-selector.png)*</span>
{: .screenshot-half }

Notez que le site personnel de l'utilisateur (supporté sur certaines configurations), y compris tous les espaces de travail
et documents qu'il contient, sera supprimé entièrement lorsqu'un utilisateur est supprimé. Il n'y a pas d'option pour
préserver les matériaux du site personnel lors de la suppression d'un utilisateur. Pour préserver les documents, l'utilisateur à
supprimer peut [transférer ses documents](FAQ.md#puis-je-deplacer-des-documents-entre-les-sites) vers un site d'équipe
_avant_ d'être supprimé.

## Ressources

Les trois pages restantes listent les trois types de ressources auxquelles les utilisateurs peuvent accéder :
organisations, espaces de travail et documents.

### Organisations

Grist permet à une seule installation d'héberger plusieurs "organisations", également appelées "sites d'équipe",
chacune avec son propre ensemble de membres d'équipe, espaces de travail et documents. Il est plus courant qu'un
compte Enterprise ait un seul site d'équipe, mais les Contrôles d'administration incluent une liste d'
organisations qu'il y en ait une ou plusieurs.

De plus, chaque utilisateur a par défaut un "site personnel" associé, qui est simplement une autre
organisation avec un seul membre.

La page _Organisations_ liste toutes les organisations de votre installation. En plus des informations de base, elle montre
le nombre d'espaces de travail, de documents et d'utilisateurs dans l'organisation. La colonne **Invités** montre
le nombre d'utilisateurs qui ne sont pas membres de l'organisation mais qui ont reçu l'accès à l'un des
documents qu'elle contient.

### Espaces de travail

Une organisation se compose d'espaces de travail, qui contiennent des documents Grist. La page _Espaces de travail_ liste
tous les espaces de travail dans toutes les organisations, y compris les sites personnels. Avec les détails de base, elle montre le nombre de documents dans chaque espace de travail et les utilisateurs avec accès.

La colonne **Invités** affiche le nombre d'utilisateurs qui ne sont pas membres de l'organisation mais qui ont
reçu l'accès à un document dans cet espace de travail.

De plus, la colonne **Utilisateurs de documents supplémentaires** affiche le nombre de membres de l'organisation qui n'ont pas
reçu l'accès à cet espace de travail mais qui ont reçu l'accès à au moins un des documents qu'il contient.

### Documents

Un document est le composant central de Grist. La page _Documents_ liste tous les documents dans toutes les
organisations, y compris les sites personnels. Avec les détails de base, elle fournit des informations pertinentes supplémentaires :

- `Utilisateurs` : combien de membres de l'organisation ont accès à ce document.
- `Invités` : combien d'utilisateurs en dehors de l'organisation ont accès à ce document.
- `Public` : ce document est-il [partagé publiquement par lien](sharing.md#acces-public-et-partage-de-lien) (peut être ouvert par quiconque a le lien).
- `Lignes d'utilisation`, `Octets de données d'utilisation`, `Octets de pièces jointes d'utilisation` : données
  d'utilisation du document, telles qu'elles sont affichées dans la page Données brutes (voir [Utilisation](raw-data.md#utilisation)). Ce n'est pas en temps réel,
  mais est mis à jour périodiquement pendant qu'un document est ouvert.

*![page-documents](images/admin-controls/docs-page.png)*

### Fonctionnalité partagée pour toutes les ressources

Les pages pour les trois types de ressources partagent une fonctionnalité commune.

Pour voir plus de détails sur une ressource sélectionnée, cliquez sur le lien dans la colonne **Nom**, utilisez le bouton 'Afficher les détails', ou appuyez sur le raccourci <code
class="keys">*Espace*</code>.

Dans la section développée, vous trouverez des détails supplémentaires sur la ressource, une liste des utilisateurs avec accès, et des listes de matériel contenu. Pour une organisation, cela inclut ses espaces de travail et documents, tandis que pour un espace de travail, cela inclut ses documents.

L'onglet 'Utilisateurs' affiche tous les utilisateurs avec accès à la ressource sélectionnée, avec leur niveau d'accès affiché
dans la première colonne.

*![organisations-avec-détails](images/admin-controls/orgs-with-details.png)*

Toutes les tables supportent les fonctionnalités standard de [tri et filtrage](search-sort-filter.md) de Grist. Vous pouvez également redimensionner et réorganiser les colonnes, mais ces modifications de vue ne seront pas sauvegardées.

Deux actions, 'Ouvrir le document' et 'Voir le partage', sont disponibles pour chaque ressource. Elles peuvent être accédées depuis le bouton 'Actions' lorsque la carte de détails est développée, ou depuis le menu de ligne ou le menu contextuel de cellule dans la liste principale des ressources.

*![actions-ressource-dans-menu-ligne](images/admin-controls/resource-actions-in-row-menu.png)*
{: .screenshot-half }

L'action `Ouvrir l'organisation` / `Ouvrir l'espace de travail` / `Ouvrir le document` ouvre la ressource donnée dans une nouvelle
page. Notez que les permissions normales s'appliquent. Si vous n'avez pas été
ajouté à cette ressource, vous verrez une page 'Accès refusé' ou 'Non trouvé'.

*![actions-ressource-dans-bouton-actions](images/admin-controls/resource-actions-in-action-button.png)*
{: .screenshot-half }

L'action `Voir le partage` ouvre le dialogue de partage pour la ressource en mode lecture seule. Elle ne
permet pas de modifier l'accès. Elle fournit des données similaires à ce qui est disponible dans l'onglet 'Utilisateurs', présentées dans une interface similaire au dialogue de partage standard de Grist.
