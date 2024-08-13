Permissions avancées
==============

Chaque document Grist peut être [partagé avec d'autres](sharing.md) en utilisant l'option « Gérer les utilisateurs » dans le menu Partager (<span class="grist-icon" style="--icon: var(--icon-Share)"></span>). Les utilisateurs peuvent être invités en tant que spectateurs (lecture seule), éditeurs ou propriétaires (voir [Partager un document](sharing.md) pour un rappel sur ces rôles). Un document peut également être [partagé publiquement](sharing.md#public-access-and-link-sharing) avec des permissions en lecture ou écriture. Parfois, il est nécessaire d'aller plus loin et préciser qui peut voir ou modifier certaines parties d'un document. Les permissions avancées nous donnent ce pouvoir.

Seuls les propriétaires d'un document peuvent modifier les permissions avancées. A l'ouverture du document, les propriétaires voient un outil appelé <span class="app-menu-item"><span class="grist-icon" style="--icon: var(--icon-EyeShow)"></span> Permissions Avancées</span> dans la barre latérale gauche. Cliquez sur cet outil pour visualiser et modifier les permissions avancées. Les règles sont également accessibles via l'option `Gérer les utilisateurs` du menu de partage <span class="grist-icon" style="--icon: var(--icon-Share)"></span> avec le bouton `Ouvrir les règles d'accès` (disponible uniquement pour les propriétaires du document).

Imaginons que nous dirigeons une petite entreprise, dont l'activité est la distribution et la livraison d'objets peu insolites. L'entreprise est gérée à l'aide d'un document avec deux tables, `Orders` (commandes) et `Financials` (finances). Nous recrutons de nouveaux employés et souhaitons partager le document avec eux tout en limitant leur accès à ce dont ils ont besoin.

![Permissions avancées](images/access-rules/access-rules-example.png)

## Règles par défaut

Pour voir les permissions avancées pour un document, visitez sa page de permissions avancées en cliquant sur <span class="app-menu-item"><span class="grist-icon" style="--icon : var(--icon-EyeShow)"></span> Règles d'accès</span> dans la barre latérale gauche. Si aucune règle personnalisée n'a encore été créée n'a été créée, la page des permissions avancées contient les `Règles par défaut` pour notre document :

![Permissions avancées](images/access-rules/access-rules-page.png)

Ces règles stipulent, en résumé, que les propriétaires et les éditeurs peuvent faire tout ce qu'ils veulent dans le document, que les spectateurs ne peuvent que lire le document et que tous les autres ont le droit d'y accéder. document, que les spectateurs ne peuvent que lire le document, et que tous les autres sont l'accès est interdit à tous les autres. Ces règles ne peuvent pas être modifiées, mais elles peuvent être mais elles peuvent être outrepassées. Pour savoir si un groupe de règles autorise une certaine permission ([Lire, Mettre à jour, Créer, Supprimer ou Structure](access-rules.md#access-rule-permissions)), lisez les règles de haut en bas, et trouver la première règle applicable qui autorise (vert) ou refuse (rouge) cette permission. Nous verrons de nombreux exemples au fur et à mesure que nous avancerons.

## Verrouiller la structure

Par défaut, les propriétaires et les éditeurs ont les mêmes pouvoirs au sein d'un document. de créer ou de supprimer des tableaux ou des colonnes, d'écrire des formules, de réorganiser des pages, etc,
et ainsi de suite.

Supposons que nous souhaitions que seuls les propriétaires initiaux du document soient autorisés à en modifier sa structure, car nous prévoyons d'inviter d'autres collaborateurs spécialisés en tant qu'éditeurs.
Pour ce faire, décochez la case de la première règle répertoriée sous "Règles avancées" afin d'empêcher les éditeurs de modifier la structure.

![Permissions avancées](images/access-rules/access-rules-lock-structure.png)

Une fois les modifications apportées, le bouton "Sauvegarder" devient d'un vert invitant. Nous cliquons sur `SAVE` pour que la règle prenne effet.

**Important.** Il s'agit d'une première étape importante pour tout document dans lequel vous avez l'intention de bloquer l'accès aux éditeurs. 
Sans leur refuser l'autorisation de structure (`S`), toute personne ayant un accès d'édition pourra créer ou modifier des formules. Puisque les calculs de formules ne sont pas limités par des permissions avancées, un utilisateur déterminé pourrait les utiliser pour récupérer n'importe quelle donnée d'un document. Pour se prémunir contre cela, il faut refuser l'autorisation de structure aux utilisateurs dont l'accès doit être limité.

## Créer une table privée

Pour s'assurer que seuls les Propriétaires peuvent accéder à une table, comme la table `Financials` dans notre exemple, nous cliquons sur `Add Table Rules` et sélectionnons le nom de la table, `Financials`.
Cela crée un nouveau groupe de règles vide appelé `Règles pour la table Financials`.
Ensuite, nous ajoutons une condition pour tout utilisateur qui n'est pas un Propriétaire (`user.Access != OWNER`), avec toutes les permissions refusées. En sélectionnant `Deny All` dans la liste déroulante à côté de `R` `U` `C` `D` est un moyen rapide de refuser toutes les permissions, ou vous pouvez cliquer sur chaque permission individuellement pour les désactiver. vous pouvez cliquer sur chaque permission individuellement pour les mettre en rouge. `R` est Lecture (*Read*), `U` est Mise à jour ("Update"), `C` est Création (*Create*) et `D` est Suppression (*Delete*) (voir [Access rule
permissions](access-rules.md#access-rule-permissions)). Structure (`S`) ne sont pas disponibles au niveau de la table. Une fois que vous avez terminé, cliquez sur `SAVE`.

![Règles d'accès](images/access-rules/access-rules-private-table.png)

Nous pouvons maintenant partager le document avec un membre de l'équipe spécialisé dans les livraisons, par exemple. Nous [partageons le document](sharing.md) avec eux en tant que afin que les restrictions que nous avons mises en place s'appliquent à eux. Ils ne verront pas le document dans la barre latérale de gauche, et les tentatives d'ouverture seront refusées :

![Permissions avancées](images/access-rules/access-rules-private-table-is-hidden.png)

## Règles par défaut

Lors de la rédaction de règles d'accès pour des tables spécifiques, il est assez courant de répéter la même règle pour de nombreuses tables - par exemple, toujours accorder aux propriétaires les en lecture et en écriture. Pour ajouter automatiquement un ensemble de règles à toutes les nouvelles règles de table, vous pouvez écrire des "règles par défaut". Il existe une case à cocher au-dessus des règles par défaut qui facilite le cas courant en un seul clic. Cliquez dessus pour rédiger une règle par défaut qui accorde automatiquement aux propriétaires un accès complet chaque fois que des règles de table sont ajoutées. Cliquez sur l'icône `>` pour décompresser le tableau des règles par défaut afin de modifier les règles par défaut.

![access-rules-default-owner-access](images/access-rules/access-rules-default-owner-access.png)

## Restreindre l'accès aux colonnes

Nous pouvons restreindre l'accès d'un collaborateur aux colonnes. Dans notre exemple, nous pourrions souhaiter donner à un spécialiste des livraisons un accès plus limité à la table `Ordres`. Peut-être qu'il n'a pas besoin de voir la colonne `Orders`. Peut-être n'a-t-il pas besoin de voir la colonne `Email`, ou la colonne `Piece` avec les détails du détails sur le contenu du colis.

Cliquez sur `Add Table Rules` et sélectionnez `Orders` pour créer un groupe de règles pour la table `Ordres`. Maintenant, dans le groupe `Règles pour la table Commandes`, cliquez sur l'icône à trois points (...), et sélectionnez `Add Column Rule` :

![Règles d'accès](images/access-rules/column-rule.png)

Dans la zone `Columns` nous avons un nouveau menu déroulant `[Add Column]` pour ajouter toutes les colonnes auxquelles nous voulons que la règle s'applique (dans notre cas, `Email` et `Piece`).
Pour la condition, nous pourrions utiliser `user.Email == 'kiwi@getgrist.com'`. Cela permet de vérifier l'adresse électronique de Kimberly, notre spécialiste fictif de la livraison.
Nous pourrions également vérifier par nom ou par identifiant numérique. Nous désactivons toutes les permissions disponibles pour cet utilisateur sur ces colonnes :

![Permissions avancées](images/access-rules/access-rules-limit-columns-full-rules.png)

Maintenant que les règles sont prêtes, cliquez sur "Sauvegarder".

Si nous avons un autre employé spécialisé dans la recherche d'objets et qui a besoin de voir un ensemble différent de colonnes, nous pouvons le faire. Par exemple, nous ajoutons ici une règle pour ne pas montrer les colonnes `Address` et `Phone` à l'utilisateur `Charon` :

![Règles d'accès](images/access-rules/access-rules-sourcing-single.png)

## Voir comme un autre utilisateur

Un moyen pratique de vérifier si les permissions avancées fonctionnent comme prévu est d'utiliser la fonction "Voir en tant que", disponible dans le menu déroulant "Voir en tant que". Cela permet à un propriétaire d'ouvrir le document comme s'il était l'une des personnes avec lesquelles le document est partagé, afin de voir ce que son collègue verrait. Le propriétaire ne "devient" pas ce collègue, modifications qu'il apporte seront enregistrées comme provenant de lui-même et non du collègue. mais il voit le document du point de vue de son collègue.

![Règles d'accès](images/access-rules/access-rules-view-as.png)

Dans notre exemple, nous pourrions sélectionner Kiwi, et le document s'ouvrirait à nouveau, avec une grande bannière indiquant que nous le visualisons en tant que Kiwi. Les colonnes `Piece` et `Email` sont manquantes, et la table `Financials` est supprimée :

![Règles d'accès](images/access-rules/access-rules-view-as-kiwi.png)

Vous pouvez également vérifier les données brutes pour confirmer que seuls les tableaux, les colonnes et les lignes prévus sont exposées.

![Permissions avancées](images/access-rules/access-rules-view-as-kiwi-raw-data.png)

Lorsque nous sommes convaincus que tout se passe comme prévu, nous cliquons sur le bouton vert `View as Yourself` pour fermer cette prévisualisation, et le document se rechargera.

## Tables d'appairage utilisateur

Si nous réussissons et que nous recrutons de nombreux fournisseurs et livreurs, il serait fastidieux de les ajouter un par un aux règles serait fastidieux. Une solution consiste à utiliser des "tables d'appairage d'utilisateurs". Vous pouvez ajouter à votre document une table qui classe les utilisateurs comme vous le souhaitez, puis utiliser ces classes dans vos règles d'accès.
Vous pouvez ajouter une table à votre document qui classe les utilisateurs comme vous le souhaitez, puis utiliser ces classes dans vos permissions avancées. Par exemple, nous pouvons
créer une table appelée "Équipe" et lui donner deux colonnes, "Courriel" et "Rôle", où "Rôle" est un choix d'utilisateur.
`Rôle` est un choix entre `Sourcing` et `Delivery`.

![Permissions avancées](images/access-rules/access-rules-team-table.png)

Maintenant, nous pouvons dire à Grist de rendre les informations de cette table disponibles pour les règles d'accès, en cliquant sur `Add User Attributes`.
en cliquant sur `Add User Attributes`. Donnez à l'attribut le nom de votre choix (c'est ainsi que nous nous y référerons dans les formules), comme par exemple
nom que vous voulez (c'est ainsi que nous nous y référerons dans les formules), comme `Team`. Choisissez la table
à lire (ici aussi `Team`). Donnez une propriété à l'utilisateur pour qu'il la compare aux lignes de cette table.
lignes de cette table - dans notre cas, nous utiliserons `user.Email`. Et la colonne à comparer avec
la colonne `Email`.

![Règles d'accès](images/access-rules/access-rules-team-attribute.png)

Sauvegardez cela. Nous pouvons maintenant mettre à jour nos règles pour qu'elles soient plus générales. Nous constatons avec l'autocomplétion que nous avons une nouvelle variable
autocomplete que nous avons une nouvelle variable `user.Team` disponible dans les condtions. Cette variable
Elle rend les colonnes de `Team` disponibles, comme `user.Team.Role`. Maintenant, nous pouvons
vérifier si l'utilisateur a un rôle particulier, et appliquer les permissions qui vont avec
qui vont avec :

![Permissions avancées](images/access-rules/access-rules-team-rules.png)

C'est très bien ! En effectuant une vérification ponctuelle, Charon voit les colonnes attendues pour quelqu'un qui travaille dans le domaine du
Sourcing. Et si nous recrutons quelqu'un d'autre pour travailler avec eux, nous pouvons simplement les ajouter dans le tableau "Équipe", sans avoir à modifier les règles.
dans la table `Team`, sans changer les règles.

![Règles d'accès](images/access-rules/access-rules-view-as-charon.png)

## Contrôle d'accès au niveau de la ligne

Dans notre exemple, au fur et à mesure que les commandes sont traitées, elles passent de la phase d'approvisionnement à la phase de livraison.
à la livraison. Il n'est donc pas nécessaire que les deux groupes voient toutes les commandes en même temps.
en même temps. Ajoutons une colonne appelée `Stage` qui peut être définie comme `Sourcing` ou
`Delivery`, afin que nous puissions mettre à jour les permissions avancées pour n'afficher que les commandes pertinentes.

![Permissions avancées](images/access-rules/access-rules-stage-column.png)

Dans le groupe `Règles pour les commandes de table`, cliquez sur l'icône à trois points (...), et sélectionnez `Ajouter une règle par défaut` pour ajouter une règle qui n'est pas limitée à des colonnes spécifiques.
sélectionnez `Ajouter une règle par défaut` pour ajouter une règle qui n'est pas limitée à des colonnes spécifiques.
Pour commencer, refusons l'accès à toutes les lignes pour les non-propriétaires, puis rajoutons celles que nous voulons.
celles que nous voulons. Nous pouvons faire cela avec la condition `user.Access != OWNER`
avec les permissions `Deny All`. Ensuite, nous ajoutons une autre règle par défaut en cliquant sur `+`,
et ajoutons la condition `user.Team.Role == rec.Stage`. La variable `rec` nous permet
d'exprimer des règles qui dépendent du contenu d'un enregistrement particulier. Ici,
nous vérifions si la colonne `Stage` d'un enregistrement correspond au rôle de l'utilisateur. Si c'est le cas, nous
autorisons `R` l'accès en lecture :

![Permissions avancées](images/access-rules/table-wide-rule-big.png)

Voici à quoi ressemble la table de Kimberly (en train de faire des livraisons) :

![Permissions avancées](images/access-rules/access-rules-stage-kiwi.png)

Et voici à quoi ressemble le tableau avec Charon (qui fait du sourcing) :

![Permissions avancées](images/access-rules/access-rules-stage-charon.png)

Kimberly et Charon ont désormais un accès en lecture seule au tableau. Les propriétaires ont toujours
l'accès en écriture à toutes les lignes et colonnes.

!!! note "Comprendre les colonnes de référence dans les permissions avancées" Vous pouvez limiter l'accès des membres de l'équipe de données aux seules lignes pertinentes pour leur travail.
l'accès des membres de l'équipe de données aux seules lignes pertinentes pour leur travail. Une façon de le faire est de relier tous les enregistrements de toutes les tables aux membres de l'équipe concernés.
Une façon de le faire est de relier tous les enregistrements de toutes les tables à leurs membres d'équipe respectifs.
Par exemple, les enregistrements de prospects et de ventes peuvent faire référence au commercial responsable de ces enregistrements.
responsable de ces enregistrements. Cette brève vidéo explique comment procéder.

    <iframe width="560" height="315" src="https://www.youtube.com/embed/ZL3rHdAZzfY?rel=0" frameborder="0" allow="accelerometer ; autoplay ; encrypted-media ; gyroscope ; picture-in-picture" allowfullscreen></iframe>

## Vérification des nouvelles valeurs

Les permissions avancées permettent de n'autoriser que certaines modifications du document. Supposons que
nous voulons que les gens de `Delivery` puissent changer `Stage` de `Delivery` en `Done`, sans leur donner les droits arbitraires d'éditer cette colonne.
`Done`, sans leur donner le droit arbitraire d'éditer cette colonne. Nous pouvons
leur accorder ce droit exceptionnel de la manière suivante. Dans le groupe `Règles pour la table Orders`
cliquez sur l'icône à trois points (...), et sélectionnez `Add Column Rule`. Définissez `[Ajouter
Column]` à `Stage`, et marquez la permission U/Update à accorder. Pour la condition
utilisez ceci :

```
(user.Team.Role == 'Delivery' et
  rec.Stage == 'Delivery' et
  newRec.Stage == 'Done')
```

Ceci vérifie que l'utilisateur a le rôle Livraison, que l'enregistrement est dans l'étape Livraison, et que l'utilisateur essaie de changer l'étape en `Done`.
et que l'utilisateur essaie de changer le stage en `Done`. La variable `newRec`
est une variante de `rec` disponible lorsque l'utilisateur propose de modifier un enregistrement.
d'un enregistrement, `rec` contenant son état avant le changement, et `newRec` son état après le changement proposé.
état après la modification proposée.

![Règles d'accès](images/access-rules/access-rules-delivery-done-rule.png)

Maintenant, si nous voyons la table comme Kiwi, et que nous essayons de changer un `Stage` en `Sourcing`, nous sommes refusés :

![Règles d'accès](images/access-rules/access-rules-delivery-done-forbid.png)

Si nous changeons un `Stage` en `Done`, cela fonctionne, et l'enregistrement disparaît de la vue
puisqu'il n'est plus dans l'étape `Delivery` :

![Règles d'accès](images/access-rules/access-rules-delivery-done-allow.png)

## Clés de liaison

Il est parfois utile de donner accès à une petite partie spécifique du document,
par exemple une seule ligne d'un tableau. Grist propose une fonctionnalité appelée "clés de lien"
qui peut être utile à cet effet. Tous les paramètres de l'URL d'un document Grist qui se terminent par un trait de soulignement sont mis à la disposition de l'accès au document.
sont mis à la disposition des permissions avancées dans une variable `user.LinkKey`. Ainsi, par exemple, si l'URL d'un document se termine par
par exemple, si l'URL d'un document se termine par `....?Token_=xx-xx-xx&Flavor_=vanilla`,
alors `user.LinkKey.Token` sera défini à `xx-xx-xx-xx` et `user.LinkKey.Flavor` à `vanilla`.
à `vanilla`. Travaillons sur un exemple pour voir comment cela peut être utile.

Supposons que nous ayons une table de `Commandes` et que nous souhaitions occasionnellement partager avec quelqu'un des
des informations sur une seule commande avec quelqu'un d'autre. Pour ce faire, nous avons besoin d'un code difficile à deviner pour chaque commande.
avons besoin d'une sorte de code difficile à deviner pour chaque commande, qui peut être utilisé pour y accéder.
pour y accéder. Grist dispose d'une fonction [`UUID()`](functions.md#uuid) qui donne un identifiant unique,
unique, aléatoire et difficile à deviner, alors ajoutons une colonne `UUID` avec la formule
`=UUID()` :

![Permissions avancées](images/access-rules/access-rules-linkkey-uuid-formula.png)

En fait, nous voulons que `UUID()` ne soit appelé qu'une seule fois par ordre, lorsque nous le créons,
et qu'elle ne soit jamais recalculée (parce qu'elle changerait alors). Ainsi, dans la barre latérale droite, nous
convertissons la colonne de formule en colonne de données, en gelant ses valeurs :

![Règles d'accès](images/access-rules/access-rules-linkkey-uuid-convert.png)

Cette opération convertit notre formule en une formule de déclenchement. Nous définissons la formule pour qu'elle s'applique aux
nouveaux enregistrements :

![Règles d'accès](images/access-rules/access-rules-linkkey-uuid-data.png)

A ce stade, nous avons un code solide et difficile à deviner pour chaque commande dans la colonne `UUID`
qui sera créée au fur et à mesure que nous ajouterons de nouvelles commandes. Il peut être pratique à ce stade
de construire des liens vers le document avec ce code intégré. Grist dispose d'une aide
pour cela, appelé [`SELF_HYPERLINK`](functions.md#self_hyperlink). Pour ajouter une clé de lien
pour ajouter une clé de lien appelée `<NAME>`, il suffit d'utiliser cette fonction avec l'argument `LinkKey_<NAME>`.
comme argument. Dans notre cas, nous passons `LinkKey_UUID=$UID` pour intégrer la valeur de la colonne
`UUID` dans l'URL. Nous avons également défini `label=$Ref` pour contrôler l'étiquette texte du lien dans la feuille de calcul.
du lien dans la feuille de calcul. Pour afficher le lien, nous définissons le type de colonne à
`Text` et définissons l'option `HyperLink` :

![Permissions avancées](images/access-rules/access-rules-linkkey-link.png)

Une fois que nous avons ces liens, nous pouvons faire un peu de ménage en cachant les colonnes `UUID` et `Ref`
(voir [Opérations sur les colonnes](widget-table.md#column-operations) pour une
pour un rappel sur la façon de procéder) :

![Permissions avancées](images/access-rules/access-rules-linkkey-prune.png)

Les liens ne font rien de spécial pour l'instant, mais nous avons tout ce qu'il faut pour que cela se produise maintenant.
pour que cela se produise. Voici un exemple de permissions avancées permettant à toute personne ayant un UUID
dans leur URL de lire n'importe quelle commande avec un UUID correspondant (dans ce cas, seuls les propriétaires peuvent lire les commandes).
lire les commandes dans ce cas) :

![Règles d'accès](images/access-rules/access-rules-linkkey-rule.png)

Et voici ce qu'un non-propriétaire voit maintenant, avec l'UUID du premier ordre dans son
URL :

![Permissions avancées](images/access-rules/access-rules-linkkey-use.png)

Ce n'est que le début des possibilités. Les clés de lien peuvent donner accès à
à plusieurs lignes dans plusieurs tables. Elles peuvent être utilisées dans les [Tables d'appairage utilisateur](#user-attribute-tables). Et les données auxquelles elles donnent accès peuvent se trouver dans des tableaux, des cartes, des listes de cartes, des graphiques et des vues personnalisées.

Consultez [un autre exemple](https://support.getgrist.com/examples/2021-04-link-keys/) pour approfondir pour approfondir votre compréhension des clés de lien.

## Conditions de la règle d'accès

Les conditions d'une permission avancée contiennent une formule exprimant le moment où la règle doit s'appliquer. Une condition vide s'appliquera toujours. Lorsqu'une condition s'applique à une action, les permissions associées à la condition sont définies comme autorisées ou refusées pour cette action si aucune règle antérieure du même groupe ne les a encore définies. Lorsqu'une condition ne s'applique pas, aucune autorisation n'est définie par cette règle, mais d'autres règles peuvent les définir.

Les formules sont écrites dans un sous-ensemble restreint de Python. Les variables qui peuvent être disponibles dans les permissions avancées sont `user`, `rec`, et `newRec`.

La variable `user` contient les membres suivants :

* `user.Access` : un des `owners`, `editors`, ou `viewers`, indiquant comment le document a été partagé avec l'utilisateur (voir [Partager un document](sharing.md)).
* `user.Email` : l'adresse email de l'utilisateur (ou `anon@getgrist.com` pour les utilisateurs qui ne sont pas connectés).
* `user.UserID` : un identifiant numérique associé à l'utilisateur.
* `user.Name` : le nom de l'utilisateur (ou `Anonymous` s'il n'est pas disponible).
* `user.LinkKey` : un objet avec les paramètres de l'URL de contrôle d'accès. Les paramètres de contrôle d'accès se terminent par un trait de soulignement (qui est ensuite supprimé). Uniquement
  disponible dans le client web, pas dans l'API.
* `user.SessionID` : une chaîne unique assignée aux utilisateurs anonymes pour la durée de la session de l'utilisateur. Pour les utilisateurs connectés, `user.SessionID` est toujours `"u"` l'identifiant numérique de l'utilisateur.

Pour un exemple d'utilisation de la variable `user`, lisez [Default rules](access-rules.md#default-rules).

La variable `rec` contient l'état d'un enregistrement/rangée individuel, pour les conditions qui doivent en tenir compte. Lorsqu'elle est utilisée, cette règle devient spécifique à une ligne. Cela permet, par exemple, de rendre certaines lignes visibles que par certains utilisateurs, ou d'interdire la modification de certaines lignes par certains utilisateurs. Pour un exemple d'utilisation de la variable `rec`, lisez [Row-level access control](access-rules.md#row-level-access-control).

La variable `newRec` est disponible pour la création et la mise à jour des enregistrements et des lignes, et contient l'état d'une ligne après une modification proposée, ce qui permet d'autoriser ou de refuser certaines d'autoriser ou de refuser certaines modifications. Pour un exemple d'utilisation de la variable `newRec`, lisez [Vérification des nouvelles valeurs](access-rules.md#checking-new-values).

Les opérations prises en charge dans les formalismes de condition sont actuellement les suivantes : `and`, `or`, `+`, `-`, `*`, `/`, `%`, `==`, `!=`, `<`, `<=`, `>`, `>=`, `is`, `is not`, `in`, `not in`.
Les variables supportées sont : `user`, `rec`, `newRec` dont les membres sont accessibles avec `.`. Les chaînes de caractères, les nombres et les listes sont également supportés. Si une opération dont vous avez besoin n'est pas disponible, examinez si vous pouvez faire une partie du travail dans une formule dans la table elle-même (voir [Access rule memos](access-rules.md#access-rule-memos) pour un exemple).

Les commentaires sont autorisés, en utilisant `#` ou `"""`. S'il y a un commentaire dans une règle, alors le premier commentaire d'une règle qui aboutit à un refus d'une action sera d'une action sera signalé à l'utilisateur comme une indication de la raison pour laquelle l'action n'a pas été autorisée. Voir [Access rule memos](access-rules.md#access-rule-memos) pour un exemple.

## Permissions des règles d'accès

Une permission détermine si un utilisateur peut effectuer un type d'action particulier.
Les permissions avancées de Grist traitent actuellement de 5 types d'actions, auxquelles sont attribués des acronymes d'une seule lettre pour des raisons de commodité :

* `R` - permission de lire les cellules.
* `U` - permission de mettre à jour les cellules.
* `C` - permission de créer des lignes.
* `D` - permission d'effacer des lignes.
* `S` - permission de changer la structure du tableau.

La permission de structure `S` est disponible dans le groupe de règles d'accès par défaut.
Les règles de colonnes n'ont pas les permissions `C` create et `D` delete, qui doivent être gérées dans les règles de tables par défaut.

**Note:** L'autorisation `S` est très puissante. Elle permet d'écrire des formules qui peuvent accéder à n'importe quelle donnée du document sans tenir compte des règles. Puisque la permission `S` est activée par défaut pour les éditeurs et les propriétaires, n'importe quel utilisateur sera en mesure de modifier une formule et de récupérer n'importe quelle donnée.

En d'autres termes, le fait d'avoir la permission `S` permet de contourner d'autres règles qui empêchent l'accès aux données. Pour cette raison, la désactiver -- comme décrit ci-dessus dans [Verrouiller la structure](#lock-down-structure) -- est une première étape importante pour limiter l'accès aux données.


## Mémos de règles d'accès

Lorsqu'un utilisateur reçoit un message d'erreur lui refusant l'accès en raison d'une permissions avancées, il peut être utile de donner des détails spécifiques qui l'aideront à comprendre le problème. Pour ce faire, vous pouvez ajouter un mémo à la condition. Tout d'abord, cliquez sur l'icône à droite de votre condition.

![Icône de commentaire](images/access-rules/access-rules-comment-icon.png)

Tapez le message d'erreur que vous souhaitez afficher dans la zone de saisie. Veillez à enregistrer vos modifications.

![Commentaire ajouté](images/access-rules/access-rules-comment-added.png)

Lorsque la règle empêche un utilisateur d'effectuer une action, le mémo apparaît sous la forme d'une notification.

![Erreur de duplication](images/access-rules/access-rules-dupe-forbidden.png)

Pour une explication du fonctionnement de cette règle d'accès particulière, voir [Règles d'accès pour restreindre les doublons](examples/2023-01-acl-memo.md)

## Exemples de règles d'accès

Outre l'exemple détaillé d'utilisation des permissions avancées dans cette section, nous allons rassemblons ici des exemples complets de modèles de règles d'accès et de guides.

- Listes de prospects](examples/2021-03-leads.md) : Une liste très simple de pistes, attribuées à des personnes pour en assurer le suivi, le contrôle des affectations étant réservé aux propriétaires du document. 
- [Équipe de vente basée sur les comptes](https://templates.getgrist.com/38Dz6nMtzvwC/Account-based-Sales-Team) : CRM de vente avec des affaires et des contacts assignés à des représentants commerciaux. Les représentants ne peuvent voir que contacts et les affaires qui leur sont propres, alors que les responsables peuvent tout voir.
- [Don public](https://templates.getgrist.com/vP7WpQp89hLi/Public-Giveaway) : Un organisateur de concours publics qui utilise des permissions avancées pour faire respecter les règles des concours sans exiger des demandeurs qu'ils se connectent à Grist.
- [Simple Sondage](https://templates.getgrist.com/jd234iH1zDsL/Simple-Poll) : Un sondage simple géré dans Grist avec des permissions avancées pour limiter une réponse par
  visiteur.
- [Liste communautaire](https://templates.getgrist.com/dKztiPYamcCp/Crowdsourced-List) : Liste publique avec des permissions avancées pour permettre aux modérateurs d'éditer presque tout, mais limitant les visiteurs à ne faire et à ne modifier que leurs propres contributions.
- [Feuille de temps](https://templates.getgrist.com/oGxD8EnzeVs6/Time-Sheets) : Modèle pour saisir les feuilles de temps des entrepreneurs. Les permissions avancées permettent aux entrepreneurs de
  consulter uniquement l'historique de leurs feuilles de temps et de ne modifier que le mois en cours.
- [Gestion de projet](https://templates.getgrist.com/hifkng53AxyQ/Project-Management/) : Suivi des tâches par événement et signalisation des tâches à risque. Les règles d'accès limitent les permissions par département et étendent les autorisations des responsables.
