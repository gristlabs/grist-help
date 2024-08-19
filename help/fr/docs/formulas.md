Formules
========

Grist dispose d'un moteur de données puissant pour calculer les cellules de vos
tableaux à l'aide de formules. Il dispose même d'un [Assistant de Formule IA](ai-assistant.md) pour vous aider à écrire des formules. Si vous avez déjà utilisé des tableurs ou des expressions de base de données, vous serez en terrain connu - mais il y a quelques particularités que vous voudrez connaître, alors restez dans les parages.

Commençons par une utilisation classique des tableurs. Supposons que vous ayez
une liste de produits que vous avez commandés, la quantité commandée,
et le prix unitaire de chacun. Vous avez créé une colonne pour afficher
la quantité multipliée par le prix unitaire, mais vous voulez que l'ordinateur fasse
cette partie pour vous.

<span class="screenshot-large">*![formulas-price](images/formulas/formulas-price.png)*</span>
{: .screenshot-half }

Sélectionnez simplement une cellule dans la colonne que vous souhaitez remplir, et appuyez sur la touche <code class="keys">**=**</code> pour
indiquer à Grist que vous souhaitez entrer une formule, plutôt qu'une valeur.

<span class="screenshot-large">*![formulas-price-equal](images/formulas/formulas-price-equal.png)*</span>
{: .screenshot-half }

Avez-vous remarqué, lorsque vous avez fait cela, que les étiquettes des colonnes ont
légèrement changé ? "Produit" est devenu "$Produit", et "Prix Unitaire"
est devenu "$Prix\_Unitaire". C'est Grist qui vous indique comment
se référer à ces colonnes dans votre formule. Tapez simplement `$Quantité * $Prix_Unitaire`{: .formula }.
Vous trouverez une fonction d'auto-complétion prête à vous aider.
Ou si vous n'aimez pas taper, cliquez sur la colonne Quantité, tapez le
symbole de multiplication, puis cliquez sur la colonne Prix Unitaire.
Votre formule devrait ressembler à ceci :

<span class="screenshot-large">*![formulas-price-multiply](images/formulas/formulas-price-multiply.png)*</span>
{: .screenshot-half }

Pour contrôler l'ID de colonne, comme "$Prix\_Unitaire", utilisé dans les formules, consultez
[Renommer les colonnes](col-types.md#renaming-columns).

Appuyez sur <code class="keys">*Entrée*</code>, et votre formule est appliquée à toutes les cellules de la colonne.

<span class="screenshot-large">*![formulas-price-final](images/formulas/formulas-price-final.png)*</span>
{: .screenshot-half }

Si vous avez déjà travaillé avec des tableurs, vous pourriez être surpris
de ne pas avoir besoin de spécifier les numéros de ligne, comme `B1 * C1`.
Dans Grist, une seule formule s'applique à toute une colonne.
Vous n'avez pas à vous soucier de la remplir pour toutes les lignes,
et vous pouvez vous référer aux valeurs de la même ligne sans problème.

Vous pouvez formater les colonnes numériques pour qu'elles soient plus esthétiques en [définissant le type de colonne](col-types.md#specifying-a-type) sur `Numérique`, et en sélectionnant des options de formatage appropriées :

<span class="screenshot-large">*![formulas-price-final](images/formulas/formulas-price-formatted.png)*</span>
{: .screenshot-half }

## Comportement des colonnes

Lorsque nous fournissons une formule pour une colonne, nous disons à Grist de mettre à jour sa valeur à chaque changement
dans un document. Nous ne pouvons plus taper une valeur dans la cellule, car sa valeur est
déterminée uniquement par la formule.

Une colonne de formule est l'un des trois comportements de colonne possibles, que vous pouvez contrôler à l'aide de
la section `COMPORTEMENT DE LA COLONNE` dans le panneau de création :

- `Colonne de données` maintient les données, que vous pouvez mettre à jour ou effacer manuellement, ou éventuellement
calculer à l'aide de [formules de déclenchement](formulas.md#trigger-formulas).
- `Colonne de formule` reflète toujours le résultat du calcul de la formule, et est maintenue
à jour par Grist.
- `Colonne vide` est un état pour une nouvelle colonne. Taper une valeur dans celle-ci la transformera en
Colonne de données, tandis que taper une formule la transformera en Colonne de formule.

![formulas-column-behavior](images/formulas/formulas-column-behavior.png)

En utilisant la section `COMPORTEMENT DE LA COLONNE`, vous pouvez manuellement changer le comportement de la colonne. Les options les plus
courantes sont disponibles sous forme de boutons d'action verts en bas, et d'autres options sont
disponibles dans le menu de comportement. Selon le comportement actuel de la colonne, celles-ci sont :

- L'action `Définir une formule` convertit une colonne vide en colonne de formule.
- L'action `Définir une formule d'initialisation` ou `Convertir en formule d'initialisation` définit un déclencheur sur une colonne
(plus de détails sur les déclencheurs dans la section suivante [Formules de déclenchement](formulas.md#trigger-formulas) ).
- L'action `Transformer en colonne de données` convertit une colonne vide en colonne de données régulière.
- `Convertir la colonne en données` convertit une colonne de formule en colonne de données régulière (vous pouvez en lire
plus sur cette fonctionnalité dans la section 
[Geler une colonne de formule](formulas.md#freeze-a-formula-column) ).
- `Effacer et transformer en formule` efface toutes les données d'une colonne et la convertit en
colonne de formule. (Nous disons "effacer" pour rappeler que les données existantes dans la colonne seront
perdues. Elles seront remplacées par les résultats de calcul de la formule.)
- `Effacer et réinitialiser` efface toutes les données et réinitialise complètement la colonne à son état initial de `Colonne vide`.

![formulas-column-behavior-options](images/formulas/formulas-column-behavior-options.png)

## Python

Les formules de Grist sont écrites en Python, le langage le plus populaire pour la science des données.
L'ensemble de la [bibliothèque standard de Python](https://docs.python.org/3/library/) est disponible
pour vous. Pour ceux qui ont une expérience des tableurs, nous avons également ajouté une suite de fonctions similaires à Excel, avec des noms en majuscules. Voici la [liste complète des fonctions](functions.md).
Les documents Grist peuvent utiliser Python 2 ou Python 3, consultez notre [guide Python](python.md)
pour plus de détails.

## Formules qui opèrent sur plusieurs lignes

Si vous êtes un utilisateur de tableurs, vous pourriez vouloir avoir
des lignes spéciales à la fin de votre tableau qui ont des formules
différentes du reste. Dans Grist, nous vous recommandons d'ajouter une
vue à votre page à la place. Pour des cas d'utilisation courants, les [Tableaux de synthèse](summary-tables.md) peuvent être exactement ce dont vous avez besoin. Ou si vous
souhaitez configurer les choses vous-même, vous pouvez ajouter une vue de tableau supplémentaire comme
ceci (voir [Vues de page](page-widgets.md) pour plus de détails) :

![formulas-widgets](images/formulas/formulas-widgets.png)

Ceci est juste un autre tableau, nous donnant un endroit pour mettre des formules en dehors
de la structure du tableau Matériaux. Par exemple, si nous voulions
compter combien de produits il y a dans ce tableau, nous pourrions utiliser cette
formule :

```py
len(Materials.all)
```

Chaque tableau de votre document est disponible par son nom dans les formules,
comme un [UserTable](functions.md#usertable). Cette formule utilise
la méthode [all](functions.md#all) pour accéder aux lignes du tableau, mais
ne fait rien d'autre que les compter.

Voici une formule pour calculer le prix moyen, en utilisant la fonction similaire à Excel
[AVERAGE](functions.md#average) :

```py
AVERAGE(Materials.all.Price)
```

La méthode [all](functions.md#all) renvoie un [RecordSet](functions.md#recordset),
qui permet de parcourir les colonnes individuelles de cette manière. De manière équivalente,
nous pourrions utiliser une [compréhension de liste](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) en Python :

```py
AVERAGE(material.Price for material in Materials.all)
```

Si vous n'êtes pas familier avec Python, il vaut la peine de suivre
un tutoriel. Il en existe des milliers en ligne, y compris ce
[tutoriel officiel](https://docs.python.org/3/tutorial/index.html).
Python vous sera utile pour toutes sortes de travaux de données, pas seulement Grist.

La compréhension de liste est utile une fois que nous faisons quelque chose de nuancé. Par exemple,
voici une formule pour lister les noms des produits avec une quantité supérieure à 80 :

```py
[m.Product for m in Materials.all if m.Quantity > 80]
```

Ceci est une compréhension de liste, mais maintenant avec une condition. Le résultat est une liste,
qui est rendue sous forme de texte dans une cellule.

Python peut aider de d'autres manières dans votre recherche de lignes. Par exemple, voici une formule
pour trouver le nom du produit avec la plus grande quantité :

```py
max(Materials.all, key=lambda m: m.Quantity).Product
```

Les formules sont sensibles à la casse, avec des fonctions similaires à Excel en majuscules (`MAX`), et
le Python régulier généralement en minuscules (`max`).

Pour des correspondances exactes, il existe un raccourci pour éviter l'itération appelé
[lookupRecords](functions.md#lookuprecords), ou
[lookupOne](functions.md#lookupone) pour des correspondances uniques.
Il suffit de passer les valeurs des colonnes que vous souhaitez faire correspondre.
Par exemple, voici une formule pour rechercher le nom du produit d'un matériau
avec une quantité de 52 :

```py
Materials.lookupOne(Quantity=52).Product
```

Pour des tableaux très volumineux, il est sage d'utiliser autant que possible les recherches, plutôt
que d'itérer à travers les lignes.

En revenant à notre document d'exemple, vous pouvez maintenant voir comment nous avons calculé les
colonnes `Total Dépensé`, `Quantité Moyenne`, et `Produit le Plus Commandé` :

Colonne | Formule
--- | ---
Total Dépensé | `SUM(Materials.all.Price)`
Quantité Moyenne | `AVERAGE(Materials.all.Quantity)`
Produit le Plus Commandé | `max(Materials.all, key=lambda m: m.Quantity).Product`

Séparer les calculs de cette manière du corps de vos données
peut demander un certain temps d'adaptation, mais travailler de cette manière peut aider
à garder votre document plus organisé. Et cela apporte d'autres avantages.
Par exemple, nous pourrions changer le formatage de la vue de synthèse
via le panneau latéral :

![formulas-widgets-card](images/formulas/formulas-widgets-card.png)

## Varier la formule par ligne

Avoir une formule qui s'applique à toutes les lignes est pratique et réduit les risques d'erreurs.

Si vous avez besoin de faire changer le comportement d'une colonne pour différentes lignes, il est possible d'utiliser une
condition dans la formule. Par exemple, voici un remplacement pour
la formule `Materials.Price` qui ignore le prix et affiche zéro pour les produits dont le nom se termine
par "(Échantillon)" :

```
if $Product.endswith("(Échantillon)"):
  return 0
else:
  return $Quantity * $Unit_Price
```

## Visionneuse de code

Une fois que vous avez beaucoup de formules, ou si vous avez été invité à un document
et souhaitez avoir un aperçu de ses formules, une visionneuse de code
est disponible avec un résumé en Python pur du document.

![formulas-code-view](images/formulas/formulas-code-view.png)

## Valeurs spéciales disponibles dans les formules

Pour ceux qui sont familiers avec Python, voici les valeurs supplémentaires disponibles
dans Grist :

 * `rec` est la ligne actuelle. La syntaxe `$colonne` est une abréviation pour
   `rec.colonne`. La variable `rec` est de type [Record](functions.md#record).
 * `table` est le tableau actuel, et est de type [UserTable](functions.md#usertable).
 * Les tableaux de votre document sont disponibles par leur nom, et sont également de
   type [UserTable](functions.md#usertable).
 * De nombreuses fonctions supplémentaires de tableur sont disponibles, voir la
   [liste complète des fonctions](functions.md).

Si votre tableau ou colonne contient un espace dans son nom, ou d'autres caractères
qui sont gênants en Python, ces caractères sont remplacés par un
tiret bas. L'auto-complétion peut vous aider si vous n'êtes pas sûr. 
Vous pouvez également contrôler les "ids" des colonnes et des tableaux dans le panneau latéral droit.

## Geler une colonne de formule

Si vous souhaitez enregistrer le résultat de votre formule en tant que valeurs simples, vous pouvez simplement changer
le comportement de la colonne de `Colonne de formule` à `Colonne de données`. Ouvrez d'abord les options de la colonne dans
le panneau latéral :

![formulas-column-options](images/formulas/formulas-column-options.png)

Maintenant, cliquez sur `Colonne de formule` et sélectionnez l'option `Convertir la colonne en données`.

![formulas-action-menu](images/formulas/formulas-action-menu.png)

Remarquez qu'il n'y a plus de signe ``=`` dans les cellules de la colonne, montrant qu'elle
n'est plus une formule. Les cellules ne changeront plus si d'autres cellules dont elles dépendaient
changent.

![formulas-turn-off-formula](images/formulas/formulas-turn-off-formula.png)

La formule originale est sauvegardée mais reste inactive. Elle peut être utile
à nouveau si vous souhaitez reconvertir la colonne en colonne de formule, ou
l'utiliser comme une [formule d'initialisation](formulas.md#trigger-formulas).

Le panneau latéral a beaucoup d'autres paramètres pratiques, tels que le formatage des cellules
(nombre de chiffres après la virgule, couleur, etc.). Les options s'appliquent
autant aux colonnes de formule qu'aux colonnes régulières.

## Recherches

Les fonctions de Grist [lookupOne](functions.md#lookupone) et
[lookupRecords](functions.md#lookuprecords) sont utiles pour énumérer
des sous-ensembles de vos données. Par exemple, supposons que nous ajoutions une colonne `Catégorie`
à notre tableau `Matériaux`, et que nous souhaitions lister tous les produits appartenant
à une catégorie spécifique. Nous pouvons le faire en utilisant `TABLE.lookupRecords`, où `TABLE` est le tableau d'intérêt, et en lui fournissant les valeurs des colonnes
à faire correspondre. Par exemple, `Materials.lookupRecords(Category='Ship')`{: .formula}, comme ici :

![formulas-column-options](images/formulas/formulas-lookup-unsorted.png)

Si vous suivez, consultez [Ajouter un champ](widget-card.md#adding-a-field)
pour des détails sur la façon d'ajouter un nouveau champ à une fiche. Si vous vous souciez de l'ordre
des résultats, `lookupRecords` prend un paramètre optionnel `sort_by`. Par exemple,
nous pourrions utiliser cette formule pour trier par le nom du produit lui-même :

```py
Materials.lookupRecords(Category='Ship', sort_by='Product').Product
```

Si vous souhaitez trier par plusieurs colonnes, rappelez-vous que vous pouvez créer une colonne de formule cachée qui combine les données de la manière que vous souhaitez, puis trier par celle-ci.

L'ordre des enregistrements retournés par `lookupRecords` peut ne pas correspondre à l'ordre des lignes
que vous voyez dans un tableau. Pour obtenir cet ordre, utilisez `sort_by='manualSort'`. C'est une
colonne interne qui est mise à jour avec l'ordre de tri établi manuellement
des lignes.

Si vous faites beaucoup de recherches, veuillez envisager
si les [Tableaux de synthèse](summary-tables.md) et
[Formules de synthèse](summary-tables.md#summary-formulas) pourraient être
ce que vous recherchez.

## Récursion

Les recherches sont pratiques pour les formules récursives. Supposons que nous ayons un tableau comptant combien d'événements nous avons par jour, et que nous voulions ajouter une somme cumulative de ces comptes d'événements.
Une façon de le faire est avec une formule comme celle-ci :

```py
yesterday = Events.lookupOne(date=$date - datetime.timedelta(days=1))
$events + (yesterday.cumulative or 0)
```

![formulas-recursion](images/formulas/formulas-recursion.png)

Pour plus de clarté, nous avons divisé cette formule en deux lignes. La première ligne
crée une variable pointant vers la ligne du jour précédent. La deuxième
ligne calcule la valeur que nous voulons dans la cellule. Note Python : la valeur
de la dernière ligne est automatiquement retournée (vous pourriez la préfixer avec
`return` si vous le souhaitez).

Remarquez le `yesterday.cumulative or 0`. Pour la première ligne dans le
tableau, il n'y aura pas de jour précédent. Dans ce cas, `lookupOne` renvoie
un enregistrement vide spécial, pour lequel `yesterday.cumulative` sera
`None`.

Si vous souhaitez simplifier cette formule, ou si vous utilisez souvent la
même recherche dans plusieurs formules, il serait utile de faire de
`yesterday` une [colonne de référence](col-refs.md). Ajoutez simplement
une colonne de référence, et donnez-lui une formule qui correspond à la façon dont
nous avons défini `yesterday` ici.

Pour entrer réellement cette formule dans une cellule, vous utiliseriez
<code class="keys">*Shift* + *Entrée*</code> pour diviser les lignes.

## Formules de Déclenchement

Les colonnes de formule sont excellentes pour les valeurs calculées - celles déterminées par
d'autres données dans le document. Il peut également être utile de stocker des données indépendantes
dans une colonne, mais d'utiliser toujours une formule pour les calculer dans certaines
situations. C'est exactement ce que proposent les Formules de Déclenchement. C'est une
fonctionnalité très puissante qui vous permet de créer une colonne
[Horodatage](timestamps.md) ou [Auteur](authorship.md),
de recalculer vos données en fonction
d'un [ensemble de conditions](examples/2021