---
title: Time and user stamps
---

# Guide des Horodatages Automatiques et des Utilisateurs

Il est parfois utile de savoir quand un enregistrement a été mis à jour ou créé pour la dernière fois, et par qui. Grist rend
simple la création de colonnes qui horodatent un enregistrement ou ajoutent le nom d'un utilisateur lorsqu'il est mis à jour ou
créé. Cela permet de trier les enregistrements par ancienneté, de déterminer depuis combien de temps un enregistrement existe,
ou de suivre rapidement la dernière modification jusqu'à son auteur.

Ceci est particulièrement utile lorsque l'on travaille en équipe. Supposons que vous ayez un document de suivi des opportunités
de vente. Il peut être utile de savoir la dernière fois qu'un commercial a agi sur une opportunité particulière, et de déterminer
combien de temps cette opportunité est en attente.

Nous avons créé un tutoriel basé sur notre
[Suivi des Demandes de Subvention](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker){:target="\_blank"}
modèle. Pour suivre ce guide, commencez par cette
[version incomplète du modèle](https://public.getgrist.com/kziQC7AXenxy/Automatic-Time-and-User-Stamps/p/8){:target="\_blank"}
qui manque de colonnes d'horodatage et de nom d'utilisateur. Nous les recréerons ensemble dans ce tutoriel.
Créez une copie et modifiez le modèle en suivant ce guide.

[Ouvrir le Modèle de Tutoriel](https://public.getgrist.com/kziQC7AXenxy/Automatic-Time-and-User-Stamps/p/8){:target="\_blank"}
{: .grist-button}

## Aperçu du Modèle : Suivi des Demandes de Subvention

<iframe width="560" height="315" src="https://www.youtube.com/embed/8ujW4H7FGlE?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Dans ce modèle, une ONG axée sur les projets de conservation des océans suit ses demandes de subvention
soumis à des fondations axées sur la mer. Voici une répartition de la structure du document.

* Le `Tableau de Bord des Demandes` montre toutes les demandes, les détails des demandes, les détails des fondations, et
  les tâches associées dans une vue utile.
* `Tâches par Personnel` liste le personnel de l'ONG, les demandes qu'ils supervisent, et les tâches
  assignées à chaque membre de l'équipe.
* `Nos Programmes` liste les programmes que l'ONG cherche à financer.
* `Vue d'ensemble de notre Financement` fournit une vue d'ensemble du financement avec deux graphiques : (i) répartition des fonds
  dans le pipeline de collecte de fonds, et (ii) répartition du financement total attribué à des programmes spécifiques de l'ONG.
* `Fondations avec lesquelles nous travaillons` liste les fondations auxquelles l'ONG a demandé des financements. Cette
  page liste également les demandes et les tâches associées.

## Création de Colonnes d'Horodatage

<iframe width="560" height="315" src="https://www.youtube.com/embed/ZrH9BK4iDGg?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Les colonnes peuvent horodater un enregistrement lorsqu'il est créé ou mis à jour en utilisant la formule `NOW()`{: .formula}.
Ajoutons une colonne au table `Tâches` pour suivre la dernière mise à jour d'une tâche. Cela peut être accompli en trois étapes.

1. Dans la table `Tâches`, créez une colonne intitulée ‘Dernière Mise à Jour’ et dans les types de colonne, sélectionnez
   **DateHeure** pour choisir votre [format de date et heure](../col-types.md#datetime-columns) souhaité.
2. Convertissez la colonne en une colonne de données en cliquant sur le menu déroulant `ACTIONS` dans le panneau de création.
   Cela empêche la formule de se déclencher à chaque chargement du document. Une fois convertie en colonne de données, entrez la formule `NOW()`{: .formula}. Vous verrez deux options de case à cocher sous la formule.
    - `Appliquer aux nouveaux enregistrements` déclenche la formule uniquement lorsqu'un enregistrement est créé.
    - `Appliquer aux modifications d'enregistrement` déclenche la formule lorsqu'un enregistrement est mis à jour.
3. Sélectionnez `Appliquer aux modifications d'enregistrement` pour ouvrir un sous-menu où vous pouvez sélectionner quels champs, lorsqu'ils sont mis à jour, déclencheront la formule. Dans ce cas, nous sélectionnerons `Tout Champ`, ce qui signifie que la mise à jour de n'importe quel champ dans cet enregistrement déclenchera la mise à jour de la formule d'horodatage.

Super ! Vous suivez maintenant la dernière mise à jour d'une tâche. Ensuite, vous voudrez peut-être savoir qui a créé une
tâche car cette personne peut avoir le plus d'informations sur les objectifs et les paramètres de la tâche.
C'est tout aussi simple à créer dans Grist que les horodatages.

## Création de Colonnes de Nom d'Utilisateur

<iframe width="560" height="315" src="https://www.youtube.com/embed/OKjtvx9nGpc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Les colonnes de nom d'utilisateur sont créées en utilisant les mêmes étapes que les horodatages, sauf pour un détail — la
formule est `user.Name`{: .formula}. Ajoutons une colonne à la table `Tâches` pour suivre qui a créé une tâche.

1. Dans la table `Tâches`, créez une colonne intitulée ‘Créé Par’ et dans les types de colonne, sélectionnez **Texte**
   et [modifiez le format](../col-types.md#text-columns) si vous le souhaitez.
2. Convertissez la colonne de formule en une colonne de données et entrez la formule `user.Name`{: .formula}.
3. Sélectionnez `Appliquer aux nouveaux enregistrements` pour que la formule ne se déclenche que lorsqu'un nouvel enregistrement est créé.

Il existe d'autres possibilités en plus de `user.Name` telles que `user.Email` ou un `user.UserID` unique. Les informations utilisateur disponibles sont les mêmes que celles des [conditions de règle d'accès](../access-rules.md#access-rule-conditions).

**Note.** Il est toujours possible pour un utilisateur de modifier manuellement les cellules avec des formules d'horodatage ou de nom d'utilisateur. Si vous ne voulez pas que cela soit autorisé, utilisez les
[permissions avancées](../access-rules.md) pour l'interdire.

Et voilà ! Vous avez créé des colonnes qui capturent les informations d'utilisateur et d'horodatage basées sur des
déclencheurs spécifiques, comme lorsque un enregistrement est mis à jour ou créé. Bravo !

## Approfondir : Combiner les horodatages et les noms d'utilisateur en utilisant des formules

En général, il est préférable de garder les informations d'horodatage et de nom d'utilisateur dans des colonnes séparées afin de
pouvoir trier et filtrer par ces colonnes. Cependant, il peut y avoir des moments où il serait utile de capturer les informations
d'horodatage et de nom d'utilisateur dans la même colonne. Ajoutons une telle colonne à la table `Demandes`.

1. Dans la table `Demandes`, créez une colonne intitulée ‘Créé Le’ et convertissez-la en une colonne de données.
   Dans les types de colonne, sélectionnez Texte.
2. Entrez la formule `"{:%b %d, %Y} par {}".format(NOW(), user.Name)`{: .formula}.
    - La partie entre guillemets est une chaîne de format. Chaque ensemble d'accolades `{}` dans celle-ci est remplacé
      par la valeur suivante entre parenthèses après `.format`.
    - Notez que le format de la date est défini dans les accolades correspondantes `{}`. Le format est défini
      avec un deux-points `:` suivi des codes Python spécifiques `%b`, `%d`, `%Y`. [Voici un tableau résumant
      toutes les options de format de date disponibles en Python](https://strftime.org/).
3. Sélectionnez `Appliquer aux nouveaux enregistrements` pour que la formule ne se déclenche que lorsqu'un nouvel enregistrement est créé.

**Besoin de plus d'aide ?** Visitez le [modèle final](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker){:target="\_blank"}
ou contactez-nous à <support@getgrist.com>.
