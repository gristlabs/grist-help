---
title: Prepare invoices
---

# Préparation des factures

Si vous enregistrez qui est facturé pour quoi dans Grist, il peut être pratique de générer des factures directement à côté de ces enregistrements. Ce tutoriel vous montre comment configurer un document comme celui-ci :

![Facture](../examples/images/2020-08-invoices/final-invoice.png)

Vous pouvez trouver un modèle fini à l'adresse <https://templates.getgrist.com/9NH6D58FmxwP/Invoicing>{:target="\_blank"}.
Si vous souhaitez ajouter des factures à un document existant et les faire fonctionner comme vous le souhaitez, comprendre ce tutoriel devrait vous y aider.

## Configuration d'une table de factures

Tout d'abord, créez une table pour enregistrer les factures en
[créant un document vide](../creating-doc.md) et en renommant `Table1` en `Factures` :

![Facture](../examples/images/2020-08-invoices/make-invoices-table.png)

Maintenant, ajoutons une vue à côté de la table pour voir les factures terminées.
Il existe toutes sortes de styles de factures possibles, donc Grist permet aux développeurs web de créer les leurs en utilisant des Widgets Personnalisés. Nous utiliserons un exemple de style de facture publié par Grist, mais si cela ne correspond pas à vos besoins, tout développeur web pourrait l'ajuster pour vous.

Cliquez sur `Ajouter Nouveau`, puis `Ajouter Widget à la Page`. Ensuite :

  * Pour `Sélectionner Widget`, choisissez `Personnalisé` puisque nous utiliserons un Widget Personnalisé.
  * Pour `Sélectionner Données`, choisissez `Factures` puisque nous afficherons les données de la table des factures.
  * Pour `Sélectionner Par`, choisissez `FACTURES` afin que le Widget Personnalisé affiche les données de la facture actuellement sélectionnée par l'utilisateur.

![Facture](../examples/images/2020-08-invoices/add-custom-widget.png)

Super, nous avons maintenant deux vues, une Vue Table qui contiendra les données des factures, et une Vue Personnalisée qui affichera ces données sous forme de facture bien formatée et imprimable. La Vue Personnalisée commence par être vide ; sélectionnez `Options du Widget` pour spécifier ce que nous voulons y mettre :

![Facture](../examples/images/2020-08-invoices/widget-options.png)

Dans la section `PERSONNALISÉ` où il est indiqué `URL complète de la page web à afficher`, mettez ce lien :

> [https://gristlabs.github.io/grist-widget/invoices/](https://gristlabs.github.io/grist-widget/invoices/)

Et réglez `Accès` sur `lire table`. Cela accorde au Widget Personnalisé l'accès en lecture à la table des Factures.

![Facture](../examples/images/2020-08-invoices/set-url.png)

Maintenant, placez ce que vous voulez dans une ligne de la table des Factures (j'ai juste ajouté le numéro `1`). Une facture incomplète apparaîtra immédiatement :

![Facture](../examples/images/2020-08-invoices/empty-invoice.png)

La facture incomplète montre quels noms de colonnes utiliser pour contrôler quelles parties de la facture. Une boîte noire supplémentaire montre quelles colonnes le widget comprend, quelles colonnes il ignore, et quelles colonnes supplémentaires le widget pourrait utiliser.
Actuellement, il dit qu'il ne reconnaît aucune des colonnes présentes, qu'il attend des colonnes comme `Numéro`, `Client`, `Articles`, etc., et qu'il ignore les colonnes par défaut `A`, `B` et `C` dans la table des Factures.

En regardant le début de la facture, nous voyons un espace pour un numéro de facture,
`NUMÉRO DE FACTURE : #Numéro`. Renommons donc la colonne `A` en `Numéro`,
nous pourrions laisser la valeur à 1, mais cela donnerait l'impression que nous n'avons pas encore fait beaucoup d'affaires. Je vais choisir de définir le numéro de facture comme étant `$id + 51371`{: .formula},
où `$id` est un identifiant numérique auto-incrémenté attribué à chaque ligne.
Mais vous pouvez le définir manuellement ou avec une formule différente. Dès qu'il est défini, la facture se met à jour :

![Facture](../examples/images/2020-08-invoices/add-number.png)

La prochaine colonne suggérée par la boîte d'aide est `Client`, alors
renommons la colonne `B` en `Client`. Plus tard, nous donnerons des informations sur le client de manière structurée, mais pour l'instant, mettons juste du texte ici (utilisez <code class="keys">*Shift* + *Entrée*</code> pour insérer des sauts de ligne) :

![Facture](../examples/images/2020-08-invoices/add-client.png)

Super, maintenant la boîte Client est remplie. La prochaine colonne suggérée est `Articles`,
alors renommons la colonne `C` en `Articles`. Plus tard, nous donnerons des informations sur les articles de manière structurée, mais pour l'instant, mettons juste du texte ici :

![Facture](../examples/images/2020-08-invoices/add-items.png)

Et maintenant la Description est définie. Il nous manque un total, alors ajoutons une
colonne appelée `Total` et définissons-la à `100` :

![Facture](../examples/images/2020-08-invoices/add-total.png)

La facture ne se mettra pas à jour immédiatement. C'est la première nouvelle colonne que nous avons ajoutée - jusqu'à présent, nous les avons renommées. Lorsque nous avons créé le Widget Personnalisé,
il a reçu l'accès aux colonnes qui existaient au moment de la création.
Pour permettre au widget de voir la nouvelle colonne, ouvrez à nouveau `Options du Widget` et déplacez
`Total` de `Colonnes Cachées` à `Colonnes Visibles` :

![Facture](../examples/images/2020-08-invoices/add-total-visible.png)

Super, la facture s'est mise à jour. Maintenant, définissons qui émet la facture en
ajoutant une colonne `Émetteur` (n'oubliez pas de la rendre visible pour le widget
via `Options du Widget`).

![Facture](../examples/images/2020-08-invoices/add-invoicer.png)

Comme dernière étape pour créer une facture utilisable, ajoutons une colonne `Émise`
et mettons-y la date d'aujourd'hui (n'oubliez pas de la rendre visible pour le widget
via `Options du Widget`). Dès que la facture a une date, la boîte d'aide noire
disparaîtra :

![Facture](../examples/images/2020-08-invoices/add-issued.png)

D'accord ! Si quelqu'un m'envoyait cela, je le paierais. Vous devriez me donner un coup de pouce en
lui donnant une date d'échéance. Ajoutons une colonne `Échéance` et définissons-la à
un mois à partir de la date `Émise`. N'oubliez pas de rendre la colonne `Échéance`
visible pour le widget via `Options du Widget`. Assurez-vous également de
[définir le Type de Colonne](../col-types.md#specifying-a-type) pour
`Émise` sur `Date` sinon vous ne pourrez pas faire de calculs de date dessus (ce sera
juste une chaîne de caractères).

![Facture](../examples/images/2020-08-invoices/add-due.png)

S'il y a des instructions spéciales à accompagner avec la facture, nous pouvons ajouter une colonne `Note`.
N'oubliez pas de la rendre visible pour le widget via `Options du Widget`.

![Facture](../examples/images/2020-08-invoices/add-note.png)

## Entrer les informations du client

Maintenant, faisons deux changements utiles à la configuration de la facture :

 * Mettre les informations du client dans une table séparée, pour ne pas avoir à ressaisir leur
   adresse à chaque fois que nous les facturons (et nous pouvons importer les adresses en vrac).
 * Entrer les articles et les prix dans une table, pour que les factures multi-articles soient faciles à faire
   (et nous pouvons utiliser des formules et des recherches pour les prix si nous le souhaitons).

Avant de le faire, nous devons informer Grist que le contenu de la facture
dépendra de ces autres tables, afin qu'il puisse la mettre à jour lorsque quelque chose
change, et s'assurer que la facture ait accès à tout ce dont elle a besoin.
Créez une colonne nommée `Références` et donnez-lui cette formule :

```
= RECORD(rec, expand_refs=1)
```

Cela signifie "prendre l'enregistrement actuel et l'emballer, y compris
tout ce qu'il référence directement". Étant donné que Grist est une feuille de calcul, cela
implique également "mettre à jour tout ce qui dépend de cette colonne si
quelque chose dans les références change". N'oubliez pas de rendre la
colonne `Références` visible pour le widget via `Options du Widget`, afin
que le widget soit mis à jour au fur et à mesure que nous ajoutons et modifions le matériel référencé.

Lorsque le widget de facture voit une colonne nommée "Références", il remplit la facture en utilisant les
valeurs "emballées" dans cette colonne, plutôt que les champs individuels de la facture. Le bénéfice sera
vu dans l'étape suivante, car ces valeurs emballées peuvent inclure des données provenant d'enregistrements liés.

![Facture](../examples/images/2020-08-invoices/add-references.png)

Ensuite, plaçons les informations du client dans une table séparée. Ajoutez une nouvelle table
à la page pour entrer les informations de l'entreprise en cliquant
sur `Ajouter Nouveau`, `Ajouter Widget à la Page`, puis `Sélectionner Widget > Table` et
`Sélectionner Données > Nouvelle Table` :

![Facture](../examples/images/2020-08-invoices/add-businesses.png)

Puis renommez la table en `Entreprises`. Vider également la colonne `Client`
pour que nous puissions voir l'aide sur ce que le widget attend là :

![Facture](../examples/images/2020-08-invoices/add-businesses-rename.png)

Le widget suggère les colonnes `Nom`, `Rue1`, `Rue2`, `Ville`, `État`
et `Code Postal`. Fournissons donc ces colonnes dans notre table `Entreprises`,
et remplissons-les pour un client exemple. Ensuite, placez le même `Nom` dans
la colonne `Client`, et dans `Options de Colonne` définissez le Type de Colonne sur
`Référence`. Référez-vous à `Entreprises` `Nom` si Grist ne le devine pas automatiquement.

![Facture](../examples/images/2020-08-invoices/add-a-business.png)

Une fois que vous appuyez sur `Appliquer`, vous verrez une section Client
bien formatée.

![Facture](../examples/images/2020-08-invoices/link-client.png)

## Entrer les informations de l'émetteur

Nous pourrions faire la même chose pour la colonne `Émetteur` que nous avons fait pour la colonne `Client`,
et en faire une référence à la table `Entreprises` ou une table séparée.
Cependant, si vous utilisez toujours le même nom et la même adresse pour
votre entreprise, vous pouvez éviter de configurer une référence en entrant une formule comme celle-ci dans la
colonne `Émetteur` (commencez à taper avec <code class="keys">**=**</code> pour en faire une formule) :

```python
{
  "Nom": "Applaudissements Tonitruants",
  "Rue1": "6502 Route Automatisée",
  "Ville": "New York",
  "État": "NY",
  "Code Postal": "10003",
  "Email": "applaudissements@tonnerre.com",
  "Téléphone": "+1-800-YAY-YAYS",
  "Site Web": "applaudissements.com"
}
```

Puis définissez le Type de Colonne pour `Émetteur` sur `Any` dans le panneau de droite.

![Facture](../examples/images/2020-08-invoices/link-invoice.png)

Remarquez comment les emails, les numéros de téléphone et les liens sont spécialement formatés par le
widget.

## Entrer les informations des articles

Maintenant, configurons la liste des articles et des prix
qui est au cœur d'une facture. Videz la colonne `Articles` pour
voir ce que nous pouvons y mettre. Elle montrera que `Articles` peut être une liste,
où chaque article a une `Description`, un `Prix`, une `Quantité` et un `Total`.
Ajoutons donc une table `Articles` comme nous avons ajouté `Entreprises`,
et donnons-lui ces quatre colonnes. Nous pouvons définir `Total` avec cette formule simple :

`$Prix * $Quantité`{: .formula}

![Facture](../examples/images/2020-08-invoices/add-items-table.png)

Maintenant, nous devons tirer ces articles dans la table `Factures` pour que
le Widget Personnalisé y ait accès. Définissez la colonne `Articles` sur
la formule `Articles.lookupRecords()`{: .formula}, puis réinitialisez
son type de colonne sur `Any`. Cette formule nécessite un peu plus de travail,
ce que nous ferons bientôt, mais commençons par cela.

![Facture](../examples/images/2020-08-invoices/add-items-lookup.png)

Super, notre facture se met à jour correctement ! Supprimez la colonne `Total`
pour obtenir une colonne calculée automatiquement :

![Facture](../examples/images/2020-08-invoices/plausible-invoice.png)

Il est probablement plus confortable d'éditer les factures
comme une Vue Fiche plutôt qu'une Vue Table, alors changeons cela
en utilisant `Options du Widget`, `Table`, `Changer Widget`, `Fiche`, `Enregistrer`.
Vous pouvez [personnaliser la mise en page de la fiche](../widget-card.md#editing-card-layout) à votre goût.

![Facture](../examples/images/2020-08-invoices/invoice-card.png)

Pour ajouter une nouvelle facture, cliquez sur le petit `+` au-dessus de la fiche des factures,
définissez une date `Émise`, et choisissez soit le Client existant soit ajoutez
un nouveau.

![Facture](../examples/images/2020-08-invoices/invoice-new.png)

Une fois que nous avons une deuxième facture, il devient clair que nous avons négligé la
formule pour collecter les articles de la facture - toutes les factures contiennent
tous les articles. Pas de problème, nous pouvons être plus spécifiques en ajoutant une colonne `Facture`
aux `Articles` et en la configurant pour faire référence à des `Factures` spécifiques :

![Facture](../examples/images/2020-08-invoices/add-invoice-column.png)

Une fois cela fait, nous pouvons saupoudrer un peu de poussière de fée Grist, et
aller dans `Options du Widget` pour la Vue Table `ARTICLES`, cliquer sur
`Changer Widget`, et définir `SÉLECTIONNER PAR` sur `FICHE FACTURES`. Une fois
cela enregistré, seuls les articles de la facture actuellement sélectionnée
sont affichés. Encore mieux, lorsque vous ajoutez de nouveaux articles, la colonne `facture`
est automatiquement définie sur la facture que vous visualisez.
Vous pouvez donc simplement masquer la colonne `facture` et l'oublier.

![Facture](../examples/images/2020-08-invoices/link-items-to-invoice.png)

Maintenant, informons le Widget Personnalisé des articles à utiliser en mettant à jour la
formule `Articles` pour être plus précise :

```
Articles.lookupRecords(Facture=$id)
```

![Facture](../examples/images/2020-08-invoices/items-formula.png)

Avec cela, entrer de nouvelles factures devient un jeu d'enfant !

 * Cliquez sur `+` pour ajouter une nouvelle fiche de facture.
 * Choisissez le client, définissez la date d'émission.
 * Ajoutez des articles.
 * Terminé !

## Finition

Vous pouvez ajuster la configuration à votre goût.
Par exemple, je choisirais d'ajouter de nouveaux clients sur une page séparée (`B` ou `Entreprises` sur
le panneau de gauche) car c'est relativement peu fréquent ; vous pourriez choisir
de garder cela sur la même page. Je n'ai pas besoin de déductions ou de taxes, si vous en avez besoin
vous pourriez ajouter des colonnes et/ou des formules pour cela. Le widget de facture personnalisé fonctionne
pour moi tel quel, mais si j'avais besoin de modifier quelque chose, je pourrais copier le dépôt GitHub
dans lequel il se trouve et le changer un peu (ou engager un développeur web pour le faire pour moi - ils
n'ont pas besoin d'être des experts Grist).

Pour les développeurs intéressés, le code GitHub est ici :
<https://github.com/gristlabs/grist-widget/tree/master/invoices>.

![Facture](../examples/images/2020-08-invoices/final-invoice.png)

Amusez-vous bien et bonne chance pour être payé !
