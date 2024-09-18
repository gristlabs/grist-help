---
title: Glossary
---

# Glossaire

## Diagramme à Barres

Il s'agit d'un [type de diagramme](widget-chart.md#bar-chart) classique, où les valeurs d'une colonne sont représentées par la hauteur d'une série de rectangles.

## Colonne

Une colonne est une série verticale de cellules dans une table. Les colonnes dans Grist ont des noms. Chaque cellule d'une colonne se trouve dans une ligne différente. Lorsque les données d'une colonne sont présentes dans une fiche, nous l'appelons un champ. Lorsqu'une table de données est représentée sous forme de graphique, nous nous référons à chaque colonne comme une série. D'un point de vue modélisation des données, les colonnes contiennent généralement des données sur un seul aspect de nombreuses entités du monde réel, tandis que les lignes contiennent des données sur de nombreux aspects d'une seule entité.

## Options de Colonne

L'apparence et le comportement de chaque colonne peuvent être personnalisés en cliquant sur l'en-tête de la colonne, en cliquant sur le menu déroulant, et en sélectionnant "Options de Colonne".

## Type de Colonne

Les colonnes ont des types, qui contrôlent l'apparence des cellules dans cette colonne et la méthode utilisée pour les éditer. Vous pouvez [changer le type de colonne](col-types.md#specifying-a-type) à volonté. Le [Type de Colonne Texte](col-types.md#text-columns) est adapté aux chaînes de caractères de toute longueur; le [Type de Colonne Date](col-types.md#date-columns) est spécialisé pour stocker et éditer des dates de calendrier; le [Type de Colonne Référence](col-types.md#reference-columns) est destiné à stocker et éditer des liens vers d'autres tables; le [Type de Colonne Numérique](col-types.md#numeric-columns) est pour tout type de nombre, etc.

## Panneau de Création

Le panneau de création est le menu de configuration à droite pour les vues et les colonnes.

## Tableau de Bord

Un tableau de bord est simplement un autre nom pour une page, généralement organisée pour donner un résumé ou un aperçu des données d'un document. Grist est bien adapté à la construction de tableaux de bord, en créant des pages avec des [vues liées](linking-widgets.md) de manière appropriée.

## Table de Données

Les données sont stockées dans des tables. Les tables ont des [colonnes](col-types.md) nommées, et une séquence de lignes contenant des valeurs pour ces colonnes. Chaque ligne a un identifiant numérique (disponible sous la forme `$id` dans les formules) qui est unique dans cette table.

La [page des données sources](raw-data.md) liste toutes les tables de données dans votre document.

## Document

Un document Grist est une collection de données connexes. Si vous travaillez avec des bases de données, pensez-y comme une seule base de données. Si vous travaillez avec des feuilles de calcul, pensez-y comme une seule feuille de calcul.

Comme les bases de données et les feuilles de calcul, les données dans un document Grist sont organisées en un ensemble de tables. La manière dont ces données sont visualisées et éditées est exceptionnellement flexible. Les documents Grist sont organisés visuellement en pages. Les pages contiennent des vues qui offrent différentes manières de visualiser et d'éditer les tables.

Pour travailler avec Grist, la première étape est généralement de [créer un document](creating-doc.md).

## Poignée de Déplacement

C'est une icône pour faciliter la réorganisation visuelle des vues ou des listes. Sur un ordinateur de bureau, lorsque vous survolez une poignée de déplacement, le curseur de la souris change. La poignée de déplacement pour une vue est juste à gauche du titre de la vue. Il y a un exemple d'utilisation de cette poignée de déplacement dans la [démonstration de recherche d'investissement](investment-research.md#chart-graph-plot).

## Mode Fiddle

Le mode fiddle est un mode spécial dans lequel certains documents Grist, tels que ceux de la [page des Exemples & Modèles](https://docs.getgrist.com/p/templates), s'ouvrent. Un document ouvert en mode fiddle aura une étiquette "fiddle" à côté du titre du document dans la barre supérieure.

En mode fiddle, toute modification d'un document entraînera la création d'une nouvelle copie non enregistrée (a.k.a "fork") de ce document; le document original restera inchangé. La copie peut être enregistrée via le bouton ou l'option de menu "Enregistrer la Copie".

Vous pouvez ajouter `/m/fork` à la fin de l'URL de n'importe quel document pour ouvrir ce document en mode fiddle (par exemple `https://public.getgrist.com/3NsoHE2mWtEp/Lead-list/m/fork`).

## Champ

Un champ est une colonne affichée dans une Vue Fiche. Les termes colonne, champ et série ne sont pas différents en substance, mais sont des termes différents qui ont plus de sens pour différentes vues. Dans une Vue Tableau, nous parlons de colonnes. Dans une Vue Graphique, nous parlons de séries. Et dans une Vue Fiche, nous parlons de champs. Un champ a des propriétés de mise en page qui sont significatives dans une Fiche, mais qui ne seraient pas significatives dans d'autres contextes.

## Importer

Importer dans Grist signifie prendre des données d'autres sources (sur votre ordinateur ou sur Internet) et placer ces données dans un document Grist. Des exemples d'importation incluent :

 - Prendre un fichier CSV sur votre ordinateur et créer un document Grist avec le même contenu (voir : [commencer un nouveau document Grist](creating-doc.md)).
 - Prendre un fichier Excel sur votre ordinateur et ajouter les données de celui-ci à un document Grist existant (voir : [importer plus de données](imports.md)).
 - Prendre un fichier JSON sur Internet et ajouter les données de celui-ci à un document Grist existant (voir : [importer plus de données](imports.md)).
 - Appeler l'API de Grist depuis un programme et ajouter des données lues à partir d'une autre source (voir : [API Grist](rest-api.md)).

## Recherches

Les formules de recherche vous permettent de "rechercher" des données dans d'autres tables.

[lookupOne](references-lookups.md#lookupone) vous permet de rechercher un seul enregistrement dans une autre table en faisant correspondre certaines données entre deux tables, similaire à VLOOKUP d'Excel.

[lookupRecords](references-lookups.md#lookuprecords) vous permet de rechercher plusieurs enregistrements dans une autre table en faisant correspondre certaines données entre deux tables.

Les recherches peuvent être combinées avec la notation pointée pour extraire des données des enregistrements référencés. [Apprenez comment.](references-lookups.md)

## Page

Les documents Grist sont organisés visuellement en pages. Chaque page vous permet de visualiser ou d'éditer une ou plusieurs tables. La nature de ces visualiseurs et éditeurs (appelés "vues de page") est flexible, tout comme leur disposition.

Une seule table peut être visualisée (ou éditée) à partir de plusieurs vues dans une ou plusieurs pages. Et une seule page peut contenir des vues pour visualiser (ou éditer) de nombreuses tables.

Les pages sont listées dans le document ([dans le panneau à gauche](page-widgets.md#pages)). Dans cette liste, elles peuvent être réorganisées et regroupées, avec plusieurs "sous-pages" imbriquées dans une seule page.

## Diagramme à Secteurs

Il s'agit d'un [type de diagramme](widget-chart.md#pie-chart) classique, où un cercle est découpé en tranches selon les valeurs d'une colonne.

## Enregistrement

Un enregistrement est les données d'une ligne d'une table, comprenant les données dans les cellules individuelles de cette ligne. Il a un identifiant unique, généralement caché mais disponible dans les formules sous la forme `id`. Dans une Vue Fiche ou une Vue Liste de Fiches, un enregistrement est représenté par une seule fiche.

## Ligne

Une série horizontale de cellules dans une table. Chaque cellule d'une ligne appartient à une colonne différente. Les données stockées dans une ligne sont également appelées un enregistrement. Typiquement, les lignes contiennent des données sur différents aspects d'une seule entité, tandis que les colonnes contiennent des données sur un seul aspect de nombreuses entités.

## Série

Les données d'une seule colonne affichées dans une Vue Graphique sont appelées une série. Les mêmes données dans une Vue Fiche sont appelées un champ, et dans une Vue Tableau sont appelées une colonne.

## Trier

L'ordre dans lequel les lignes d'une table sont affichées est appelé l'ordre de tri. Un exemple de changement de l'ordre de tri d'une table est donné dans le [tutoriel CRM](lightweight-crm.md#to-do-tasks-for-contacts).

## Formules de Déclenchement

Une [formule d'initialisation](formulas.md#trigger-formulas) est une formule qui recalcule vos données en fonction d'un ensemble de conditions que vous décidez. Elles permettent également de nettoyer les données lorsqu'une nouvelle valeur est entrée ([regarder le webinaire](https://www.youtube.com/watch?v=wwzm39ADslA&list=PL3Q9Tu1JOy_4p4g-uS_3LQrB_3Vm7CWe4&index=10&t=2282s){: target="\_blank"}), de fournir une [valeur par défaut](formula-cheat-sheet.md#setting-default-values-for-new-records) sensée pour une colonne ou de [créer des tampons de temps et d'auteur](formula-cheat-sheet.md#automatic-date-time-and-author-stamps).

## Menu Utilisateur

Le menu utilisateur est le menu qui s'ouvre en cliquant sur votre icône de profil en haut à droite de Grist. De là, vous pouvez gérer votre profil, ajouter des comptes Grist supplémentaires que vous possédez, et voir une liste des espaces d'équipe auxquels vous avez accès.

Selon l'endroit où vous vous trouvez, le menu utilisateur contiendra des options supplémentaires. Par exemple, depuis un [espace personnel](teams.md#understanding-personal-sites) vous verrez l'option de mettre à niveau votre plan vers un [espace d'équipe](teams.md). Depuis un espace d'équipe, selon votre rôle et vos permissions, vous pourrez peut-être [gérer la facturation](teams.md#billing-account) ou [éditer les membres de l'équipe](team-sharing.md). Depuis un document, vous trouverez une option pour éditer les paramètres du document.

*![paramètres du document](images/document-settings.png){: .screenshot4}*
{: .screenshot-half }

## Vue

Une page contient des sections, telles que des grilles de tableaux ou des graphiques, que nous appelons "vues de page". Elles sont utilisées pour [visualiser ou éditer des données](page-widgets.md) dans des tables. Les types de vues de page incluent les [Vues Fiche](widget-card.md), les [Vues Graphique](widget-chart.md), ainsi que la grille de tableau de style feuille de calcul classique (appelée [Vue Tableau](widget-table.md)).

## Options de Vue

Chaque vue de page peut avoir son apparence et son comportement personnalisés. La manière dont cela est fait varie selon la vue, mais peut toujours être fait systématiquement en cliquant sur le menu à trois points en haut à droite d'une vue et en sélectionnant "Options de Vue".

## Retour à la Ligne

Normalement, le contenu qui ne tient pas dans la largeur d'une cellule est tronqué, avec "..." indiquant qu'une partie des données est cachée. Lorsque le paramètre "Retour à la Ligne" est activé, les longues lignes seront renvoyées à la ligne suivante, et la cellule deviendra plus haute pour inclure tout le contenu. Un exemple de retour à la ligne est donné dans le [tutoriel CRM](lightweight-crm.md#linking-tables-visually).
