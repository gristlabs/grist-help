# Questions Fréquemment Posées

[TOC]

<br>
<br>
---
<br>
<br>

## Comptes

### Puis-je ajouter plusieurs équipes au même compte de connexion Grist ?

Oui ! Vous pouvez créer plusieurs espaces d'équipe. Chaque espace d'équipe peut être sur le plan gratuit ou un plan payant. Chaque espace d'équipe sur un plan payant est associé à son propre abonnement et est facturé séparément.

1. **Nouvel espace d'équipe.** Si vous souhaitez créer un nouvel espace d'équipe, naviguez vers votre espace personnel à [docs.getgrist.com](https://docs.getgrist.com/), puis cliquez sur le nom du site en haut à gauche (@votre-nom) pour ouvrir une liste de sites. Cliquez sur '+ Créer un nouvel espace d'équipe'. Dans la fenêtre contextuelle, sélectionnez le plan à utiliser.

2. **Ajouter un compte à un espace d'équipe.** Vous pouvez posséder ou être membre de plusieurs espaces d'équipe. Si vous avez plusieurs comptes de connexion Grist, vous pouvez également ajouter votre deuxième compte en tant que membre de l'équipe. Lorsque vous êtes dans l'espace d'équipe que vous possédez, ouvrez le menu utilisateur et cliquez sur 'Gérer les utilisateurs'.

**Le saviez-vous ?**

Un seul espace d'équipe peut bien fonctionner pour une organisation avec plusieurs équipes (ou sous-équipes). Vous pouvez utiliser des espaces de travail au sein d'un espace d'équipe, et [gérer l'accès à ceux-ci](workspaces.md#managing-access) pour créer des zones séparées pour différentes équipes.

### Puis-je ajouter plusieurs comptes de connexion à Grist ?

Oui ! Pour ajouter plusieurs comptes à Grist, ouvrez le [menu utilisateur](glossary.md#user-menu) en cliquant sur l'icône de profil en haut à droite de Grist, puis cliquez sur 'Ajouter un compte'.

Vous pouvez maintenant facilement passer d'un compte à l'autre, et d'une équipe à l'autre, depuis le menu utilisateur.

### Comment puis-je mettre à jour les paramètres de mon profil ?

Ouvrez le [menu utilisateur](glossary.md#user-menu) en cliquant sur l'icône de profil en haut à droite de Grist, puis sélectionnez 'Paramètres du profil'.

À partir de là, vous pouvez gérer le nom associé à votre compte, mettre à jour le thème de Grist en mode clair ou sombre, définir une langue et créer et gérer une clé API. Pour en savoir plus sur notre API, consultez [Grist API](rest-api.md#grist-api).

**Souhaitez-vous aider à traduire Grist ?**

Nous utilisons [Weblate](https://hosted.weblate.org/engage/grist/) pour gérer les traductions et accueillons les traducteurs bénévoles ! Si vous souhaitez traduire Grist dans une nouvelle langue (merci !), faites-nous savoir quelle langue dans ce [fil de discussion de la communauté](https://community.getgrist.com/t/translating-grist/2086), et nous ajouterons la langue sur Weblate.

### Comment puis-je changer l'adresse e-mail que j'utilise pour Grist ?

Il n'est pas possible de changer l'e-mail associé à votre compte Grist. Cependant, il est possible de transférer la propriété des documents et des espaces d'équipe entre deux comptes e-mail Grist que vous possédez. Cela changerait effectivement votre e-mail Grist. [Apprenez comment](FAQ.md#how-to-manage-ownership-of-my-team-site).

Il est possible de gérer plusieurs comptes dans Grist. Pour ajouter un autre compte, ouvrez le [menu utilisateur](glossary.md#user-menu) en cliquant sur l'icône de profil en haut à droite de Grist, puis cliquez sur 'Ajouter un compte'.

Vous pouvez maintenant facilement passer d'un compte à l'autre, et d'une équipe à l'autre, depuis le menu utilisateur.

### Comment puis-je supprimer mon compte ?

Vous pouvez supprimer votre compte dans 'Paramètres du profil' en sélectionnant 'Supprimer le compte' sous 'Confidentialité & Données'. Veuillez noter que cette action est permanente.

Besoin de supprimer un espace d'équipe ? En savoir plus [ici](teams.md#billing-account).

---

## Plans

### Pourquoi ai-je plusieurs sites ?

Tous les utilisateurs de Grist ont accès à un espace personnel gratuit. L'espace personnel est toujours nommé en commençant par '@' et est toujours situé à [docs.getgrist.com](https://docs.getgrist.com/). Chaque document dans cet espace peut être partagé avec jusqu'à deux invités gratuitement. En savoir plus sur les plans gratuits sur notre [page de tarification](https://www.getgrist.com/pricing/).

Les documents partagés avec vous depuis d'autres comptes personnels seront affichés dans votre espace personnel dans des espaces de travail nommés avec '@Nom' pour indiquer le propriétaire de ce document.

Vous pouvez naviguer entre votre [espace personnel](teams.md#understanding-personal-sites) et [espaces d'équipe](teams.md) en cliquant dans le coin supérieur gauche pour ouvrir un menu déroulant des sites auxquels vous avez accès.

<center>*![Naviguer entre les sites](images/faq/personal-and-team-site.png)*</center>

### Comment gérer la propriété de mon espace d'équipe ?

**Ajouter un deuxième propriétaire**

1. Ouvrez l'espace d'équipe auquel vous souhaitez ajouter un deuxième propriétaire.

2. Cliquez sur 'Gérer les utilisateurs' sous le [menu utilisateur](glossary.md#user-menu) en cliquant sur l'icône de profil en haut à droite de Grist.

3. Ajoutez la nouvelle adresse e-mail en tant que Propriétaire, et cliquez sur Confirmer.

4. Vous pouvez également aller à 'Compte de facturation' (également sous le menu utilisateur) et ajouter le nouveau propriétaire en tant que Gestionnaire de facturation.

**Transférer la propriété**

1. Suivez les étapes 1 à 3 ci-dessus pour ajouter un deuxième propriétaire.

4. Allez à 'Compte de facturation' (également sous le menu utilisateur) et ajoutez le nouveau Propriétaire en tant que [Gestionnaire de facturation](team-sharing.md#billing-permissions).

5. Le nouveau Propriétaire doit se connecter, ouvrir l'espace d'équipe, et visiter à nouveau les pages 'Gérer les utilisateurs' et 'Compte de facturation' pour supprimer le propriétaire d'origine. Cela transférera essentiellement la propriété de l'espace d'équipe au nouveau compte.

Il n'est pas possible d'ajouter un deuxième propriétaire à, ou de transférer la propriété d'un [compte personnel](teams.md#understanding-personal-sites).

**Le saviez-vous ?**

Si vous transférez la propriété d'un espace d'équipe entre deux comptes e-mail Grist que vous possédez, vous pouvez plus facilement transférer la propriété en vous connectant avec plusieurs comptes. Pour vous connecter avec un autre compte, ouvrez le menu utilisateur et cliquez sur 'Ajouter un compte'. Vous pouvez maintenant facilement passer d'un compte à l'autre, et d'une équipe à l'autre, depuis le menu utilisateur. Suivez les étapes ci-dessus pour transférer la propriété d'un compte à l'autre.

### Puis-je modifier le nom et le sous-domaine de mon équipe ?

Vous pouvez modifier le nom de votre site et le sous-domaine depuis la page de facturation. Ouvrez le [menu utilisateur](glossary.md#user-menu) en cliquant sur l'icône de profil en haut à droite de Grist, puis cliquez sur ['Compte de facturation'](teams.md#billing-account).

<center>*![Accès public](images/faq/edit-subdomain.png)*</center>

---

## Documents et données

### Puis-je déplacer des documents entre les sites ?

Oui ! Suivez ces étapes pour déplacer des documents entre les sites.

1. Ouvrez le document que vous souhaitez déplacer et cliquez sur l'icône de partage (<span class="grist-icon" style="--icon: var(--icon-Share)"></span>), puis cliquez sur 'Dupliquer le document' dans le menu.

2. Sélectionnez le site (organisation) vers lequel vous souhaitez transférer le document.

Cela créera une copie, vous aurez donc toujours le document original dans votre site d'origine. Vous pouvez toujours le supprimer.

En savoir plus sur [la copie de documents](copying-docs.md).

### Combien de lignes puis-je avoir ?

En règle générale, Grist fonctionne mieux pour les documents de moins de 100 000 lignes. La limite réelle dépend également du nombre de tables, de colonnes et de la taille moyenne des données dans chaque cellule. Une façon de l'estimer est de mesurer la taille des données lorsqu'elles sont au format CSV : la limite est d'environ 20 Mo dans ce format. Par exemple, un document avec 200 000 lignes et 12 colonnes numériques atteindrait cette limite.

Les pièces jointes sont comptées séparément. Les pièces jointes plus les données dans un seul document sont limitées à 1 Go.

[En savoir plus sur les limites](limits.md).

### Grist accepte-t-il les caractères non anglais ?

Les caractères non anglais sont pris en charge dans les étiquettes de colonnes, mais pas dans les identifiants de colonnes, qui sont le nom Python de la colonne utilisé dans les formules. Lors de l'importation d'un fichier dans Grist, les caractères non anglais sont importés en tant que valeurs dans les cellules, mais ne sont pas importés dans les étiquettes de colonnes (alias en-têtes). Les étiquettes de colonnes sont approximées avec des caractères anglais. Vous pouvez renommer les étiquettes de colonnes pour inclure des caractères non anglais après l'importation.

Pour [modifier les étiquettes et les identifiants de colonnes](col-types.md#renaming-columns) séparément, ouvrez le panneau de création et sélectionnez le menu de la colonne. Cliquez sur l'icône de lien qui joint l'étiquette à l'identifiant pour activer la modification de l'identifiant de la colonne. Bien que les caractères non anglais ne soient pas pris en charge, il est possible de modifier les identifiants pour les rendre plus clairs et conviviaux à utiliser dans les formules.

<center>*![Modification des étiquettes et des identifiants de colonnes](images/faq/editing-col-label-id.png)*</center>

### Comment puis-je additionner le total d'une colonne ?

Pour résumer plusieurs enregistrements, vous avez besoin de [tables de synthèse](summary-tables.md).

La principale différence entre Grist et les tableurs comme Excel ou Google Sheets est que Grist est une base de données, donc chaque ligne dans une grille représente un enregistrement (par exemple, une personne, une transaction bancaire, etc.). Puisqu'une somme sur plusieurs enregistrements n'est pas le même type d'enregistrement, Grist propose de résumer les données sous forme de vue séparée, qui peut être modifiée pour calculer des données de synthèse encore plus puissantes.

Par exemple, supposons que vous ayez une table de commandes de boutique en ligne appelée `Commandes` et que vous souhaitiez additionner les revenus des ventes de toutes les commandes. En haut du menu de gauche, cliquez sur le bouton 'Ajouter nouveau' et sélectionnez 'Ajouter une page' ou 'Ajouter une vue à la page'. Dans le sélecteur de vue, sélectionnez la table `Commandes` puis cliquez sur l'icône de somme (<span class="grist-icon" style="--icon: var(--icon-Pivot)"></span>) à côté. Ajoutez la page ou la vue à votre document. Fait ! Vous avez maintenant créé une table de synthèse qui, par défaut, compte tous les enregistrements dans la table `Commandes` et additionne toutes les colonnes [numériques](col-types.md#numeric-columns) et [entiers](col-types.md#integer-columns), telles que le montant vendu dans chaque commande.

Les tables de synthèse peuvent faire plus qu'une simple somme des colonnes d'une table. En quelques clics, vous pouvez résumer les commandes *par mois* pour calculer le nombre de commandes et le revenu total des ventes dans chaque mois pour lequel vous avez des données.

Allez plus loin et supposons que vous ayez plusieurs boutiques en ligne. Avec Grist, vous pouvez enregistrer toutes les commandes de vente de toutes les boutiques et mois dans la même table. Ensuite, vous pouvez résumer par mois *et* par boutique.

Lorsque vous ajoutez plus de mois (ou de boutiques !) à la table des commandes, la table de synthèse se mettra automatiquement à jour, ce qui est une autre différence clé avec les tableurs. Dans Excel, vous devriez étendre la plage de votre formule, ou ajouter plus de feuilles et modifier les formules chaque fois que vous ajoutez plus de commandes de vente, de mois ou de boutiques. Dans Grist, vous créez la table de synthèse une fois, et laissez Grist faire le travail futur pour vous.

En plus de notre article sur les [tables de synthèse](summary-tables.md), nous avons un [tutoriel vidéo et un guide de suivi](examples/2021-06-timesheets.md) qui fournit un exemple de création d'un tableau de bord avec des tables de synthèse.

---

## Partage

### Quelle est la différence entre un membre de l'équipe et un invité ?

Les membres de l'équipe ont tous accès à un [espace d'équipe](teams.md), qui est situé à une URL avec un sous-domaine personnalisé, tel que `votre-équipe.getgrist.com`. Sur les plans payants, le nombre de membres de l'équipe détermine le prix.

Par défaut, les documents au sein d'un espace d'équipe peuvent être accessibles par tous les membres de l'équipe. Ce défaut peut être modifié pour ne partager que certains [documents](team-sharing.md) ou certains [espaces de travail](workspaces.md) avec des membres spécifiques de l'équipe.

Les invités, en revanche, sont invités à des documents particuliers, mais ne sont pas ajoutés à votre équipe. Tous les documents dans Grist, y compris ceux sur les espaces personnels, sont autorisés jusqu'à 2 invités gratuits, et n'affectent pas le prix du plan.

### Puis-je uniquement partager des documents Grist avec mon équipe ?

Il existe de nombreuses façons de partager des données Grist avec des non-membres de l'équipe.

1. **Invités.** Chaque document peut être partagé avec 2 invités (non-membres de l'équipe) sans frais supplémentaires.
2. **Partage de lien.** Dans les paramètres de partage, il y a une option pour activer [l'accès public](sharing.md#public-access-and-link-sharing). Le rôle d'accès public peut être défini sur visualiseur ou éditeur. Toute personne ayant un lien peut voir (ou modifier) vos données. Ces vues ne seraient pas comptées dans le nombre d'utilisateurs de votre plan. Le document est visible par toute personne ayant le lien, donc faites preuve de prudence lorsque vous travaillez avec des données sensibles.

<center>*![Accès public](images/faq/link-sharing.png)*</center>

3. **Partage de lien en lecture seule restreint.** Avec le partage de lien en lecture seule, il est possible de restreindre davantage ce que les gens peuvent voir en utilisant les permissions avancées de Grist pour définir des paramètres d'URL spécifiques appelés [clés de lien](access-rules.md#link-keys) qui déterminent quelles tables, colonnes ou lignes sont affichées lorsqu'un lien spécifique est partagé.

4. **Intégration en lecture seule.** Les [pages](page-widgets.md#pages) Grist peuvent être intégrées dans des sites Web dans une iframe. [Apprenez comment](embedding.md).

---

## Grist et votre site Web/application

### Puis-je intégrer Grist dans mon site Web ?

Oui, il est possible d'intégrer des [pages](page-widgets.md#pages) Grist en tant que données en lecture seule dans un site Web dans une iframe.

`<iframe src="https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true"></iframe>`

Remplacez l'URL écrite dans le code ci-dessus par l'URL de la page Grist que vous souhaitez intégrer, suivie de `?embed=true` à la fin de l'URL.

En savoir plus sur [l'intégration de Grist](embedding.md).

### Puis-je utiliser Grist comme backend de mon application Web ?

L'utilisation de Grist comme solution backend directement pour un site Web ou une application Web n'est pas encore prise en charge. Nous n'avons pas encore de méthode d'authentification pour ce cas d'utilisation. La méthode de clé API n'est généralement pas appropriée pour une utilisation Web, car la clé serait accessible à tout spectateur de la page Web, ce qui est généralement indésirable. Nous sommes intéressés à prendre en charge cela à l'avenir et accueillons les idées et les commentaires dans notre [forum communautaire](https://community.getgrist.com/).