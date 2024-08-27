# Guide des Tables de Résumé

## Maîtriser les Tables de Résumé avec 2 Concepts

Dans Grist, les tables de résumé sont l'outil principal de l'analyse de données. Elles sont similaires aux tableaux croisés dynamiques dans les feuilles de calcul et aux fonctions de regroupement dans les bases de données. Elles permettent de résumer les tables en regroupant les enregistrements en catégories spécifiques. Par exemple, si vous avez une table de champions olympiques, il peut être utile de regrouper les enregistrements des champions par pays ou par sport — ou par une combinaison de pays _et_ de sport.

Une fois les enregistrements triés en catégories utiles, vous pouvez ensuite vouloir calculer des sommes en utilisant ces groupes d'enregistrements. Grist utilise un champ spécial astucieux, disponible dans les formules sous la forme de `$group`.

Les tables de résumé facilitent la création de pages dans lesquelles vous pouvez rapidement capturer des informations utiles sur les données. Vous pouvez apprendre à le faire en apprenant deux concepts : créer des tables de résumé et utiliser `$group` dans les formules. Nous avons créé un modèle simple (<https://public.getgrist.com/x527ESJATWNS/Time-Sheets-Tutorial>) que vous pouvez copier et éditer en suivant ce guide.

## Utiliser les Tables de Résumé pour Analyser les Données

<iframe width="560" height="315" src="https://www.youtube.com/embed/wSyip0KQRbI?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Dans notre exemple, vous travaillez pour le département RH d'une usine de bonbons qui embauche des contractuels travaillant pour divers départements. Dans le modèle, votre équipe a créé un suivi avancé des feuilles de temps. Il y a une page où les contractuels peuvent facilement ajouter des feuilles de temps pour des mois sélectionnés. Il serait utile d'avoir des pages supplémentaires qui résument les dépenses par mois, par département et par contractuel. Votre objectif dans ce tutoriel est de construire ces pages de résumé.

## Créer des Tables de Résumé

<iframe width="560" height="315" src="https://www.youtube.com/embed/n11mamU78GY?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Étape 1 : Créer une table de résumé

Commençons par créer une table de résumé qui regroupe les enregistrements dans la table des feuilles de temps par mois. Grist facilite la création de tables de résumé. Cliquez simplement sur `Ajouter Nouveau` > `Ajouter Page` > `Entrées de Feuille de Temps` > <span class="grist-icon-lg" style="--icon: var(--icon-Pivot)"></span> > `Mois`.

Cela générera une table de résumé avec quelques colonnes. Dans ce cas, nous avons les trois colonnes suivantes.

1. Première Colonne : Liste des groupes de mois, de janvier à juin 2021.
2. Deuxième Colonne : Un décompte du nombre total d'enregistrements dans chaque mois, par exemple en janvier il y a 12 enregistrements de feuilles de temps.
3. Troisième Colonne : Une somme des heures travaillées dans chaque mois, par exemple en janvier le total des heures travaillées dans ces 12 enregistrements de feuilles de temps est de 81 heures.

   Note : Grist additionnera automatiquement toutes les colonnes numériques, vous faisant gagner du temps.

### Étape 2 : Créer des tables de résumé avec plusieurs catégories

Il peut être utile de regrouper également les feuilles de temps par une combinaison de catégories. Par exemple, nous pouvons vouloir savoir combien de temps et d'argent ont été dépensés sur un compte particulier dans un mois particulier, ou sur un employé spécifique dans un compte et un mois spécifiques.

Lors de la création d'une table de résumé, vous pouvez sélectionner plusieurs colonnes par lesquelles regrouper les données. Ajoutons deux nouvelles tables de résumé. Lors de l'ajout de ces vues, assurez-vous de `Sélectionner Par` la première vue que nous avons créée sur cette page. Cela liera les tables de sorte que la sélection d'un mois dans la première vue mettra à jour dynamiquement les enregistrements dans les nouvelles vues. Pas sûr de comprendre pourquoi ? Révisez [lien des vues](../linking-widgets.md).

1. `Ajouter Nouveau` > `Ajouter Vue à la Page` > `Entrées de Feuille de Temps` >
   <span class="grist-icon-lg" style="--icon: var(--icon-Pivot)"></span> >
   `Mois` et `Compte`
2. `Ajouter Nouveau` > `Ajouter Vue à la Page` > `Entrées de Feuille de Temps` >
   <span class="grist-icon-lg" style="--icon: var(--icon-Pivot)"></span> >
   `Mois` et `Compte` et `Employé`

Pour visualiser plus facilement ces données, faites glisser et déposez les nouvelles tables de manière à ce qu'elles soient disposées verticalement. Vous pouvez également vouloir masquer les colonnes de décompte.

Super ! Mais maintenant nous voulons ajouter le total des dépenses en dollars dans chacune de ces catégories. C'est simple à faire avec des formules de résumé.

## Calculer les Totaux en Utilisant des Formules de Résumé

<iframe width="560" height="315" src="https://www.youtube.com/embed/4-ihoU1m3rc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_Suivez-vous la vidéo ? Visitez la [solution du tutoriel](https://public.getgrist.com/uR353rDVZhmX/Time-Sheets-Template-Solution) si vous êtes bloqué. Notez qu'il y a des permissions avancées en place pour la solution du tutoriel qui vous empêcheront de voir certaines pages et la plupart des données. Faites une copie pour devenir le propriétaire du document et voir toutes les données et pages._

### Étape 1 : Comprendre le champ $group dans les formules

Dans Grist, `$group` est un objet Python spécial qui représente une collection d'enregistrements résumés par la ligne de résumé actuelle.

Si vous regardez la formule dans la colonne `Heures Travaillées`, vous verrez `SUM($group.Heures_Travaillées)`. Cela prend la **somme** des **Heures Travaillées** dans un **groupe**. Dans cet exemple, dans la ligne 1, le groupe est janvier 2021. Ainsi, dans cette ligne, la formule additionne les heures travaillées dans le groupe de janvier 2021. Dans la ligne 2, le groupe est février 2021 et la formule additionne les heures travaillées en février.

Si vous jetez un coup d'œil à la colonne `count`, que nous avons précédemment masquée, vous trouverez la formule `len($group)`. La fonction `len` (qui signifie longueur) compte tous les enregistrements appartenant au groupe résumé dans une ligne particulière.

Une autre façon d'exprimer un ensemble d'enregistrements est de parcourir la liste des enregistrements dans un groupe en utilisant une variable. Vous pouvez nommer la variable comme vous le souhaitez ; nous utiliserons `r` (pour "record"). Nous pouvons réécrire la formule dans `Heures Travaillées` comme `sum(r.Heures_Travaillées for r in $group)`.

### Étape 2 : Utiliser $group dans les formules

Calculons le total des dépenses en dollars pour les heures travaillées dans chaque mois.

La formule est `sum(r.Heures_Travaillées * r.FeuilleDeTemps.Taux_Horaire for r in $group)`.

Puisque chaque enregistrement `r` dans le groupe est un enregistrement dans la table sous-jacente (`Entrées de Feuille de Temps`), `r.Heures_Travaillées` se réfère au champ dans cette table.

Dans la table `Entrées de Feuille de Temps`, la colonne `FeuilleDeTemps` est une colonne de référence qui fait référence à un enregistrement entier dans la table `Feuilles de Temps`. Ainsi, nous devons spécifier davantage quel champ de l'enregistrement référencé doit être inclus dans le calcul de la formule, qui dans ce cas est `Taux_Horaire`. Pour en savoir plus sur les colonnes de référence, visitez notre [guide des colonnes de référence](2021-05-reference-columns.md).

Nous pouvons appliquer la même formule aux deux autres tables de résumé sur cette page. Dans la deuxième table, la fonction `$group` regroupe les éléments dans le même mois ET compte. Dans la troisième table, la fonction `$group` regroupe les dépenses dans le même mois ET compte ET par le même employé.

Et c'est tout ! Vous l'avez fait. Vous avez reconstruit la page de résumé mensuel. Voyez si vous pouvez appliquer ces concepts pour reconstruire la page de résumé des contractuels.

!!!tip "Le saviez-vous ?"

    Si nécessaire, vous pouvez également ajouter des conditions à cette formule. Par exemple,
    `sum(r.Heures_Travaillées * r.FeuilleDeTemps.Taux_Horaire for r in $group if r.Heures_Travaillées > 0)`
    n'additionnera que les enregistrements dans lesquels il y a une valeur positive dans le champ `Heures Travaillées`.

    Visitez notre [référence des fonctions](../functions.md#_group) pour en savoir plus.

*Besoin de plus d'aide ?* Visitez la [solution du tutoriel](https://public.getgrist.com/uR353rDVZhmX/Time-Sheets-Template-Solution) ou contactez-nous à <support@getgrist.com>.

Notez qu'il y a des permissions avancées en place pour la solution du tutoriel qui vous empêcheront de voir certaines pages et la plupart des données. Faites une copie pour devenir le propriétaire du document et voir toutes les données et pages.