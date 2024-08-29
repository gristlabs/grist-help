---
title: Reference columns guide
---

# Guide des Colonnes de Référence

## Maîtriser les Colonnes de Référence en 3 Étapes

Dans Grist, les colonnes de référence sont l'outil clé pour organiser les données relationnelles. Les colonnes de référence indiquent à Grist que deux tables distinctes sont liées et spécifient quels enregistrements au sein de ces tables sont liés. Par exemple, si vous avez une table de `Chiens` et une table de `Propriétaires de Chiens`, vous pouvez vouloir que chaque *enregistrement* de chien fasse explicitement référence à l'*enregistrement* de son propriétaire dans `Propriétaires de Chiens`.

Les colonnes de référence sont un outil puissant pour rechercher des données à partir d'une table liée et pour créer des mises en page hautement productives. Vous pouvez apprendre à le faire en trois étapes faciles. [Nous avons créé un modèle simple](https://public.getgrist.com/1ujorYjuX3xb/Job-Application-Reference-Column-Tutorial) que vous pouvez copier et modifier en suivant ce guide.

## Utiliser les Colonnes de Référence pour Organiser les Données Liées

Dans notre exemple, vous êtes un graphiste postulant à des emplois, et vous utilisez Grist pour suivre votre processus de candidature. Dans le modèle, vous avez quatre tables : `Candidatures`, `Étapes`, `Tâches`, et `Contacts`. Votre objectif est de relier les données pertinentes entre les tables et de créer un tableau de bord personnalisé où vous pouvez facilement voir le statut de chaque candidature, et ajouter de nouvelles candidatures et de nouvelles étapes facilement.

[Dans ce tableau de bord](https://templates.getgrist.com/bhW5b6DhciXb/Job-Application-Tracker/), cliquer sur chaque candidature montre uniquement les étapes liées à cette candidature. Nous pouvons créer cette relation en utilisant des colonnes de référence.

Créons ce tableau de bord ensemble.

## Étape 1 : Créer des Références

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y0MKoz2RXEQ?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Les colonnes de référence sont un type de colonne disponible sous TYPE DE COLONNE. Il est utile de penser à la table avec la colonne de référence comme la **_table de référence_**, et à la table qui est référencée comme la **_table sous-jacente_**.

### Convertir des Colonnes de Texte en Colonnes de Référence

Si vous avez déjà du texte dans la colonne sélectionnée, définissez le TYPE DE COLONNE dans le panneau de droite sur "Référence". Grist devinera la table sous-jacente et la colonne que vous souhaitez afficher dans la colonne de référence. Vous pouvez revoir et modifier cette supposition et définir la table sous-jacente et la colonne d'affichage appropriées. DONNÉES DE LA TABLE pointe vers la table sous-jacente. AFFICHER LA COLONNE définit la valeur d'affichage dans la colonne de référence.

Par exemple, dans la table `Étapes`, convertissez la colonne `Rôle` en une colonne de référence. DONNÉES DE LA TABLE doit pointer vers `Candidatures`. AFFICHER LA COLONNE doit être défini sur `Rôle`. Notez que la colonne de référence fait référence à l'**_ensemble de l'enregistrement_** et que vous choisissez quelle colonne afficher dans la colonne de référence.

**Astuce :** Vous pouvez facilement identifier les colonnes de référence par les icônes de maillon de chaîne dans les cellules de la colonne.

### Créer des Colonnes de Référence

Dans la table `Contacts`, nous avons une liste de contacts qui ne sont associés à aucune candidature ou entreprise. Créons une nouvelle colonne appelée `Entreprise`, définissons son type sur Référence, et pointons vers `Candidatures` comme table sous-jacente avec `Entreprise` comme affichage dans la colonne de référence.

Cliquez sur la cellule vide pour ouvrir un menu déroulant et sélectionnez manuellement l'entreprise pour laquelle chaque contact travaille. Regardez l'adresse e-mail pour un indice.

Note : Vous pouvez toujours cliquer sur une cellule de Colonne de Référence pour ouvrir le menu déroulant et sélectionner une nouvelle valeur.

## Étape 2 : Rechercher des Données Supplémentaires dans l'Enregistrement Référencé

<iframe width="560" height="315" src="https://www.youtube.com/embed/_7KEUKnwI74?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Rappelez-vous que la colonne de référence fait référence à une autre table et corrèle deux enregistrements spécifiques. Bien que vous voyiez une colonne spécifique dans l'**_affichage_** de la colonne de référence, la référence est faite à l'**_ensemble de l'enregistrement_**. Cela nous permet de rechercher des champs de données supplémentaires dans l'enregistrement lié en utilisant une formule simple. Essayons cela.

À l'étape 1, dans la table `Étapes`, nous avons créé une colonne de référence appelée `Rôle`. Il serait utile de voir également pour chaque enregistrement `Étape`, l'entreprise pertinente. Par exemple, dans la ligne 1, nous voyons l'événement de l'étape "Rejeté!" pour le rôle "Responsable du Design Numérique". Il n'est pas immédiatement apparent de quelle entreprise il s'agit. Utilisons la colonne de référence `Rôle` pour rechercher facilement l'entreprise listée dans l'enregistrement "Responsable du Design Numérique" dans la table `Candidatures`. Pour ce faire, nous créons une colonne appelée `Entreprise` et nous utilisons la formule `$Role.Entreprise`{: .formula}.

La structure de la formule est
`$[ID de la Colonne de Référence dans la Table de Référence].[ID de la Colonne dans la Table Sous-jacente]`{: .formula}.
Grist complétera également automatiquement des parties de la formule pendant que vous la tapez.

Il y a une autre façon d'ajouter plusieurs colonnes à partir d'une table sous-jacente. Si vous êtes intéressé à en savoir plus, visitez la [section d'aide sur les colonnes de référence](../col-refs.md#including-multiple-fields-from-a-reference) de notre site web.

## Étape 3 : Créer une Mise en Page Hautement Productive avec des Tables Liées

L'une des fonctionnalités les plus puissantes de Grist est la capacité de lier des tables liées sur la même page pour créer des mises en page hautement productives. Dans le tableau de bord final montré au début de ce tutoriel, nous avons vu que cliquer sur une candidature remplissait une vue des étapes liées à cette candidature.

Faisons cela maintenant en ajoutant `Étapes` comme vue à la page `Candidatures`. ([Révisez les vues ici](../page-widgets.md#page-widgets).) Ajouter la table comme vue de Liste de Fiches rend les données plus faciles à visualiser. De même, vous pouvez vouloir changer la table `Candidatures` en une vue de Liste de Fiches.

Dans le menu LISTE DE FICHES à droite, sélectionnez DONNÉES pour définir les règles de sélection des données. Sous SÉLECTIONNER PAR, vous verrez l'option "LISTE_DE_FICHES CANDIDATURES". Cette option est uniquement disponible parce qu'à l'étape 1, nous avons créé une référence de la table `Étapes` à la table `Candidatures` dans la colonne de référence `Rôle`. Cette référence indique à Grist quelles étapes sont liées à quelles candidatures.

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZYJgPkcMhJU?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Félicitations ! Vous savez maintenant comment utiliser les colonnes de référence pour organiser des données liées, donner une structure à vos données, et créer des vues liées dans des mises en page productives. Si vous le souhaitez, comparez votre document à la [solution du tutoriel](https://public.getgrist.com/2xHXr5km5jkn/Job-Application-Reference-Column-Tutorial-Solution).

### Approfondir : Combiner des Formules et des Colonnes de Référence

Si vous êtes à l'aise avec les formules, essayez d'utiliser des formules dans les colonnes de référence pour rendre Grist un outil encore plus puissant. Dans la [solution du tutoriel](https://public.getgrist.com/2xHXr5km5jkn/Job-Application-Reference-Column-Tutorial-Solution), nous avons utilisé une formule pour faire plus.

La formule dans le champ `Dernière Étape` dans la vue `Candidatures` recherche la date la plus récente dans les enregistrements liés dans la table `Étapes`. Ainsi, ajouter une nouvelle étape avec une date plus récente mettrait automatiquement à jour ce champ. Vous pouvez en apprendre plus sur [les formules de recherche sur notre site web](../formulas.md#lookups).

Parce que `Dernière Étape` est à la fois une colonne de formule **_et_** une colonne de référence, nous avons également fait ce qui suit en suivant la formule décrite à l'étape 2 de ce tutoriel.

Le champ `Statut` utilise la formule `$Dernière_Étape.Tour`{: .formula} pour rechercher le statut du tour de l'étape liée. Le champ `Mis à Jour Le` utilise la formule `$Dernière_Étape.Date`{: .formula} pour rechercher la date de l'étape liée.

En faisant cela, le statut et la date se mettent également à jour automatiquement lorsque le champ `Dernière Étape` se met à jour.

**Besoin d'aide supplémentaire ?** Jetez un coup d'œil à la [solution du tutoriel](https://public.getgrist.com/2xHXr5km5jkn/Job-Application-Reference-Column-Tutorial-Solution), ou contactez-nous à <support@getgrist.com>.
