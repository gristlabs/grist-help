Aide-mémoire des Formules
=========

Grist dispose d'un moteur de données puissant pour calculer les cellules de vos tables à l'aide de formules. Les formules Grist sont écrites en [Python](https://docs.python.org/3/library/){:target="\_blank"}, le langage le plus populaire pour la science des données. Nous avons également une suite de [fonctions](functions.md) similaires à Excel, avec des noms en majuscules. Voici quelques notes utiles :

- Les formules s'appliquent à toute la colonne
- Les champs sont inclus dans les formules sous la forme `$ColumnID`.
- Python est sensible à la casse, y compris pour les noms de tables et de colonnes Grist. Si l'ID de votre colonne est `title`, la formule utilisera `$title`, où les deux sont en minuscules.
- Vous pouvez écrire du Python multi-lignes dans les formules (utilisez <code class="keys">*Shift* + *Enter*</code> pour
  ajouter des lignes), y compris des instructions, des variables, des imports, etc.
- Le code Grist s'exécute dans un sandbox sécurisé, sans accès à quoi que ce soit en dehors de votre document.

Si vous ne trouvez pas ce que vous cherchez, postez dans le [Forum Communautaire](https://community.getgrist.com/) et nous pourrons vous aider !

## Fonctions Mathématiques

<span></span><section class="cheat-sheet">
#### Mathématiques Simples (addition, soustraction, multiplication, division)

Utilise les opérateurs `+` , `-` , `/` et `*` pour effectuer des calculs.

<span></span><details><summary>
#### Exemple de Mathématiques Simples
</summary>

Le studio d'art Chestwood expédie des œuvres d'art à travers le pays et propose l'option de paiements mensuels sur une période de 12 mois.

Nous avons le sous-total, la taxe (basée sur l'état vers lequel il est expédié) et le montant dû mensuellement. Cette colonne de formule utilise l'addition, la multiplication et la division.

<span class="screenshot-large">*![simple-math](images/formula-cheat-sheet/simple-math.png)*</span>

La formule utilisée ici est :
```
($Subtotal + ($Subtotal*$Tax)) / 12
```
Nous ajoutons le sous-total à la taxe calculée, puis nous divisons cela par 12 mois pour obtenir notre montant dû mensuellement.
</details>

<span></span><details><summary>
#### Dépannage des Erreurs
</summary>

`#TypeError` : Confirmez que toutes les colonnes utilisées dans la formule sont de type [Numérique](col-types.md#numeric-columns).
</details>
</section>

<span></span><section class="cheat-sheet">
#### max et min

Vous permet de trouver les valeurs [max](functions.md#max) ou [min](functions.md#min) dans une liste.

<span></span><details><summary>
#### Exemples utilisant MAX() et MIN()
</summary>
*[MAX()](functions.md#max) et [MIN()](functions.md#min) en majuscules sont des fonctions de tableur qui nécessitent une syntaxe spécifique. La syntaxe des formules de tableur est résumée dans notre [référence des fonctions](functions.md). max() et min() en minuscules sont des fonctions Python.*

**Max** : Table des classes du modèle [Inscription aux cours](https://templates.getgrist.com/doc/afterschool-program){:target="\_blank"}.

<span class="screenshot-large">*![max](images/formula-cheat-sheet/max.png)*</span>

La formule utilisée dans la colonne 'Places restantes' de la table des classes est :
```
max($Max_Students - $Count, 0) ou "Complet"
```
Cette formule indique le nombre de places restantes dans une classe, ou le texte 'Complet' lorsque la classe est pleine ou sur-inscrite.

Nous construisons une liste entre parenthèses composée de deux éléments : `$Max_Students - $Count` et `0`. La formule renvoie le plus grand des deux.

Lorsque `$Count` est inférieur à `$Max_Students`, la différence `$Max_Students - $Count` est positive et représente les places restantes dans la classe. Lorsque `$Count` dépasse `$Max_Students`, la classe est alors pleine ou sur-inscrite, et `$Max_Students - $Count` est négatif. Le maximum entre un nombre négatif et 0 sera 0, donc `max($Max_Students - $Count, 0)` est 0. Cela représente une classe pleine. L'ajout de `ou "Complet"` est appliqué lorsque la valeur est fausse, ce qui signifie qu'un 0 est remplacé par le texte `"Complet"`.

**Min** : Table des contacts du modèle [CRM léger](https://templates.getgrist.com/doc/lightweight-crm){:target="\_blank"}.

<span class="screenshot-large">*![min](images/formula-cheat-sheet/min.png)*</span>

La formule utilisée dans la colonne 'À faire' de la table des contacts est :
```
items = Interactions.lookupRecords(Contact=$id, Type="À faire")
return min(items.Date) if items else None
```
Décomposons cela.

`Interactions.lookupRecords(Contact=$id, Type="À faire")` trouve tous les enregistrements dans la table Interactions où les Contacts correspondent et le Type est À faire. Cela renvoie une liste d'enregistrements que nous assignons à la variable `items`.

Ensuite, nous utilisons la [notation pointée](references-lookups.md#reference-columns-and-dot-notation) pour trouver toutes les Dates assignées aux enregistrements de notre liste `items`. Ces dates sont évaluées pour trouver la date minimale. C'est la valeur qui est renvoyée. Ainsi, nous voyons la date de la tâche qui est due le plus tôt.

S'il n'y a aucun élément dans la liste, rien n'est renvoyé et le champ reste vide.

Dans l'exemple MAX(), la liste contient deux éléments : `$Max_Students - $Count` et `0`, et la formule renvoie le plus grand des deux. Dans l'exemple min(), la variable `items` extrait une liste d'enregistrements basée sur les arguments de [lookupRecords](references-lookups.md#lookuprecords), liste les dates et renvoie la plus petite date. Notez qu'il s'agit d'une fonction Python. Si nous avions écrit la formule comme MIN(), une fonction de feuille de calcul, la formule ne fonctionnerait pas car la formule de feuille de calcul nécessite un [format très spécifique](functions.md#min).

</details>
</section>

<span></span><section class="cheat-sheet">
#### Somme

Utilisez la fonction [SUM()](functions.md#sum) lorsque vous souhaitez additionner une liste de valeurs disponibles dans une cellule. Si vous souhaitez additionner des valeurs dans une colonne, utilisez les [Tables de synthèse](summary-tables.md).

<span></span><details><summary>
#### Exemple de SUM()
</summary>

**[Modèle de Créateur de Produits Personnalisés](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder/p/6){:target="\_blank"} template**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-custom-product-builder.png)*</span>

La formule utilisée dans la colonne Coût Total de la table Sélectionner ou Ajouter de Nouveaux Produits est :
```
SUM($Requirements.Cost)
```
La colonne Requirements est une [colonne cachée](page-widgets.md#configuring-field-lists) dans cette table. Elle est une colonne de liste de référence qui extrait des données de la table des Exigences de Construction.

Notre formule utilise la colonne Exigences pour accéder à la table des Exigences de Construction, puis extrait le coût pour chaque enregistrement dans la table.

Nous utilisons SUM() pour additionner les coûts de chaque enregistrement.

**[Gestionnaire d'Inventaire](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} modèle**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-inventory-manager.png)*</span>

La formule utilisée dans la colonne Reçu de la table Tous les Produits est :
```
SUM(Incoming_Order_Line_Items.lookupRecords(SKU=$id).Received_Qty)
```
Nous utilisons la fonction [lookupRecords](functions.md#lookuprecords) pour trouver tous les enregistrements dans la table des Articles de Commande Entrante où le SKU correspond au SKU de cette ligne, puis extraire la valeur dans la colonne Quantité Reçue pour chacun de ces enregistrements. Nous utilisons SUM() pour trouver la somme de ces valeurs.

Les colonnes Quantité en Commande et Vendue de la table [Tous les Produits](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/1){:target="\_blank"} sont également de bons exemples de la fonction SUM().

**Découvrez un autre exemple dans notre Forum Communautaire :** [Créer une Somme de Bénéfice Net et Brut à partir de plusieurs tables](https://community.getgrist.com/t/creating-a-sum-of-net-and-gross-profit-from-multiple-tables/668){:target="\_blank"}
</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparaison pour l'égalité : == et !=

Lors de la comparaison pour l'égalité en Python, nous utilisons `==` pour 'égal à' et `!=` pour 'différent de'. Si `$A` est 2 et `$B` est 3, la formule `$A == $B` renverrait `False`, tandis que la formule `$A != $B` serait `True`.

<span></span><details><summary>
#### Exemples utilisant `==`
</summary>

**[Gestionnaire d'Inventaire](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/10){:target="\_blank"} modèle**

<span class="screenshot-large">*![equality-received-qty](images/formula-cheat-sheet/equality-received-qty.png)*</span>

La formule utilisée dans la colonne Quantité reçue de la table Incoming Order Line Items est :
```
if $Order.Status =='Received':
  return $Qty
else:
  return None
```
La colonne Order de la table Incoming Order Line Items est une colonne de référence qui pointe vers la colonne Order Number de la table Incoming Orders. `$Order.Status` utilise la notation par point pour extraire la valeur de la colonne Status de la table Incoming Orders. Si la valeur dans cette colonne est égale à `Received`, la valeur de la colonne Qty sera retournée. Si la valeur n'est pas égale à `Received`, rien n'est retourné.

<span class="screenshot-large">*![equality-date-received](images/formula-cheat-sheet/equality-date-received.png)*</span>

La formule utilisée dans la colonne Date Received de la table [Create New Order](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/16#a1.s35.r11.c82){:target="\_blank"} est :
```
if $Status == "Received":
  return NOW()
```
Ceci est une [formule déclencheur](formulas.md#trigger-formulas) qui est déclenchée lorsqu'un changement est apporté à la colonne Status. Si la valeur dans la colonne Status est égale à `Received`, la date actuelle est retournée. Si les valeurs ne sont pas égales, rien n'est retourné.

</details>
<span></span><details><summary>
#### Exemples utilisant `!=`
</summary>

**[Gestion de Projet](https://templates.getgrist.com/hifkng53AxyQ/Project-Management/p/9){:target="\_blank"} template**

<span class="screenshot-large">*![inequality-missed-deadline](images/formula-cheat-sheet/inequality-missed-deadline.png)*</span>

La formule utilisée dans la colonne Missed Deadline de la table Missed Deadline est :
```
TODAY()> $Due_Date and $Status != "Completed"
```
Si la date actuelle est supérieure à la date donnée dans la colonne Due Date **et** que la valeur dans la colonne Status n'est pas égale à `Completed`, la formule est `True`. Si l'une de ces déclarations est fausse, la formule est `False`.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparaison de Valeurs : < , > , <= , >=

Vous permet de comparer des valeurs numériques. Si Sales est égal à `1200` et Running_Cost est égal à `1650`, `"Gains" if $Sales > $Running_Cost else "Loss"` retournerait `Loss`.

<span></span><details><summary>
#### Exemples de comparaison de valeurs
</summary>

**[Gestionnaire de Stock](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} modèle**

<span class="screenshot-large">*![comparing-values-stock-alert](images/formula-cheat-sheet/comparing-values-stock-alert.png)*</span>

La formule utilisée dans la colonne Alerte Stock de la table Tous les Produits est :
```
if $In_Stock + $QTY_on_Order > 5:
  return "En Stock"
if $In_Stock + $QTY_on_Order > 0:
  return "Stock Faible"
else:
  return "RUPTURE DE STOCK"
```
Ici, nous avons deux déclarations **if-return** différentes ; si `x` est vrai, retourner `some_value`. Une fois qu'une déclaration est vraie et qu'une valeur est retournée, la formule s'arrête. Si les deux sont fausses, `RUPTURE DE STOCK` est retourné.

Tout d'abord, si la valeur dans la colonne En Stock plus la valeur dans la colonne QTY en Commande est supérieure à 5, retourner "En Stock".

Ensuite, si la valeur dans la colonne En Stock plus la valeur dans la colonne QTY en Commande est supérieure à 0, retourner "Stock Faible". Il est implicite que la valeur est inférieure ou égale à 5 car la première déclaration doit être fausse pour que celle-ci soit évaluée.

Enfin, si toutes les déclarations sont fausses, retourner "RUPTURE DE STOCK".


**[Suivi des Liens Internes pour le SEO](https://templates.getgrist.com/j9ZH7rPGafbH/Internal-Links-Tracker-for-SEO){:target="\_blank"} modèle**

<span class="screenshot-large">*![comparing-values-orphaned](images/formula-cheat-sheet/comparing-values-orphaned.png)*</span>

La formule utilisée dans la colonne Orphelin ? de la table Pages Orphelines est :
```
len(Links.lookupRecords(To=$id))<1
```
Nous utilisons la fonction [lookupRecords](functions.md#lookuprecords) pour trouver tous les enregistrements dans la table Links où le lien dans la colonne To correspond au lien listé dans la colonne Slug de cette ligne.

Nous utilisons [len()](functions.md#len) pour compter le nombre d'enregistrements trouvés. Si c'est inférieur à 1, la formule est évaluée comme vraie et la case à cocher sera cochée. Si elle est égale ou supérieure à 1, la formule est évaluée comme fausse.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Conversion de chaîne de caractères en flottant

**[Chaîne de caractères](https://www.w3schools.com/python/python_strings.asp){:target="\_blank"}** : Une séquence de caractères ou des extraits de texte. En code, les chaînes de caractères sont entre guillemets, par exemple `'Hello'` ou `"-12"` (ce sont trois caractères entre guillemets, contrairement à un nombre négatif). Voir [Fonction str() de Python](https://www.w3schools.com/python/ref_func_str.asp){:target="\_blank"} pour convertir une valeur spécifiée en chaîne de caractères.

**[Flottant](https://www.w3schools.com/python/gloss_python_float.asp){:target="\_blank"}** : Nombres réels pouvant stocker des valeurs décimales. Aussi appelé nombre à virgule flottante. Voir [Fonction float() de Python](https://www.w3schools.com/python/ref_func_float.asp){:target="\_blank"} pour convertir une valeur spécifiée en nombre à virgule flottante.

**[Entier](https://www.w3schools.com/python/python_numbers.asp){:target="\_blank"}** : Un nombre entier, sans décimales. Voir [Fonction int() de Python](https://www.w3schools.com/python/ref_func_int.asp){:target="\_blank"} pour convertir une valeur spécifiée en nombre entier.

<span></span><details><summary>
#### Exemple de conversion d'une chaîne de caractères en flottant
</summary>

**[Commandes d'œuvres d'art](https://public.getgrist.com/fR4erkJzSpBd/Artwork-Orders/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![string-to-float](images/formula-cheat-sheet/string-to-float.png)*</span>

La formule utilisée dans la colonne Prix de vente est :
```
if $Appraisal_Value.endswith("k"):
  return float($Appraisal_Value.rstrip("k")) * 1000
return float($Appraisal_Value)
```
Dans cet exemple, la colonne Valeur d'évaluation est une colonne de texte contenant des caractères alphanumériques. Pour utiliser cette valeur dans des formules mathématiques, nous devons la convertir de chaîne de caractères en flottant.

Si la valeur dans la colonne Valeur d'évaluation se termine par "k", nous utilisons d'abord [rstrip()](https://docs.python.org/3/library/stdtypes.html#str.rstrip){:target="\_blank"} pour supprimer "k" de la chaîne dans la colonne Valeur d'Évaluation.

Maintenant que nous n'avons que des caractères numériques, nous utilisons [float()](https://docs.python.org/3/library/functions.html?highlight=float#float){:target="\_blank"} pour convertir notre chaîne en nombre flottant.

Parce que K représente 1000 et que nous l'avons supprimé de la valeur, nous multiplions notre nombre flottant par 1000.

Si la valeur dans la colonne Valeur d'Évaluation ***ne*** se termine ***pas*** par "k", et ne contient que des caractères numériques, nous pouvons simplement utiliser [float()](https://docs.python.org/3/library/functions.html?highlight=float#float){:target="\_blank"} pour convertir notre chaîne en nombre flottant.

</details>

<span></span><details><summary>
#### Dépannage
</summary>
si vous essayez d'utiliser différentes colonnes avec des valeurs *numériques* dans une formule mathématique mais que vous voyez une erreur, vérifiez les types de colonnes pour chacune des colonnes utilisées dans la formule. Toutes doivent être de type [Numérique](col-types.md#numeric-columns).

<span class="screenshot-large">*![column-type-numeric](images/formula-cheat-sheet/column-type-numeric.png)*</span>
{: .screenshot-half }

[float()](https://docs.python.org/3/library/functions.html#float){:target="\_blank"} n'est nécessaire que lorsque vous traitez des valeurs alphanumériques comme nous le voyons dans l'[exemple](#example-converting-a-string-to-a-float).

**TypeError: can't multiply sequence by non-int of type 'float'**
<span class="screenshot-large">*![multiply-non-int-float-type-error](images/formula-cheat-sheet/multiply-non-int-float-type-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente de **multiplier** des valeurs provenant de plusieurs colonnes, dont au moins une n'est pas une colonne de type [Numérique](col-types.md#numeric-columns). Dans la capture d'écran ci-dessous, la colonne Taxe est une colonne de type [Texte](col-types.md#text-columns).
<span class="screenshot-large">*![multiply-non-int-error-tax-text](images/formula-cheat-sheet/multiply-non-int-error-tax-text.png)*</span>
Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.
<span class="screenshot-large">*![multiply-non-int-error-tax-numeric](images/formula-cheat-sheet/multiply-non-int-error-tax-numeric.png)*</span>

**TypeError: unsupported operand type(s) for /: 'float' and 'str'**
<span class="screenshot-large">*![division-float-string-error](images/formula-cheat-sheet/division-float-string-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente de **diviser** des valeurs provenant de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans l'exemple ci-dessus, la colonne '# de Paiements' est une colonne de type [Choix](col-types.md#choice-columns).

Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.

**TypeError: unsupported operand type(s) for +: 'float' and 'str'**
<span class="screenshot-large">*![addition-float-string-error](images/formula-cheat-sheet/addition-float-string-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente d'**additionner** des valeurs provenant de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans l'exemple ci-dessus, la colonne Taxe est une colonne de type [Texte](col-types.md#text-columns).

Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.

**TypeError: unsupported operand type(s) for -: 'float' and 'str'**
<span class="screenshot-large">*![subtraction-float-string-error](images/formula-cheat-sheet/subtraction-float-string-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente de **soustraire** des valeurs provenant de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans l'exemple ci-dessus, la colonne Remise est une colonne de type [Texte](col-types.md#text-columns).

Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Arrondir les nombres

Spécifiez le nombre de décimales à donner dans un résultat en utilisant la fonction [ROUND()](functions.md#round). Si la Température Moyenne est égale à `46.5`, `ROUND($Average_Temperature)` renverra `47`.

<span></span><details><summary>
#### Exemple d'arrondissement des nombres
</summary>
**Modèle [Paie](https://templates.getgrist.com/5pHLanQNThxk/Payroll/p/2){:target="\_blank"}**

<span class="screenshot-large">*![round-payment](images/formula-cheat-sheet/round-payment.png)*</span>

La formule utilisée dans la colonne Paiement est :
```
ROUND($Hours*$Per_Hour, 2)
```
La fonction [ROUND()](functions.md#round) suit le format `ROUND(value, places)` qui arrondit la valeur donnée au nombre de décimales spécifié. Notre formule trouve la valeur de `$Hours*$Per_Hour` puis arrondit cette valeur à `2` décimales.

**[Mélange de Produits](https://public.getgrist.com/v4vj2PDZS4jf/Community-665/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![round](images/formula-cheat-sheet/round.png)*</span>

La formule utilisée dans la colonne Valeur Arrondie est :
```
mix_list_str = $Mix_Product.Lt_per_100_Lt
mix_list_float = [float(i) for i in mix_list_str]
x = [Lt * $Water/100 for Lt in mix_list_float]
round_x = [ROUND(num, 2) for num in x]
l = $Mix_Product.Product
' '.join('{} {}'.format(first, second) for first, second in zip(l, round_x))
```
Décomposons cela.

`$Mix_Product` représente la colonne Mix Product, une colonne de liste de références qui extrait des données de la colonne Product de Table1. Nous pouvons utiliser cette colonne comme un lien vers Table1 pour extraire d'autres données. `$Mix_Product.Lt_per_100_Lt` utilise la colonne de liste de références, Mix Product, pour extraire les valeurs de la colonne Lt per 100 Lt de Table1 pour les produits listés dans la colonne Mix Product de Table2, puis assigne cette liste de valeurs à la variable `mix_list_str`. C'est la même formule utilisée dans la colonne Lt par 100 Lt de Table2 afin que vous puissiez voir la valeur qu'elle renvoie dans la ligne 1 de Table2. Elle renvoie une liste : `['0.2355', '1.2579']`. Cette liste est évaluée comme une chaîne de caractères plutôt que comme des valeurs numériques. Nous devons convertir chaque valeur de cette liste en nombre flottant.

Dans notre prochaine formule, `[float(i) for i in mix_list_str]`, nous parcourons la liste qui a été assignée dans la première équation à `mix_list_str` et convertissons chaque valeur en nombre flottant. Nous voulons convertir en flottant plutôt qu'en entier car toutes les valeurs ne sont pas des nombres entiers et contiennent des décimales. `i` est une variable représentant chaque valeur. Ainsi, chaque valeur dans `mix_list_str` est évaluée dans l'équation `float(i)`. `float(0.2355)` convertit `0.2355` en flottant et `float(1.2579)` convertit `1.2579` en flottant. Maintenant, nous assignons notre liste de flottants à la variable `mix_list_float`.

Nous pouvons maintenant utiliser nos valeurs flottantes dans une équation mathématique. Encore une fois, nous parcourons la liste qui a été assignée à la variable `mix_list_float`. Dans notre équation `[Lt * $Water/100 for Lt in mix_list_float]`, `Lt` représente chaque valeur dans `mix_list_float` et `$Water` représente la valeur trouvée dans la colonne Water qui est `1000`. Nous évaluons l'équation `Lt * 1000/100` lorsque `Lt = 0.2355` et `Lt = 1.2579` ce qui renvoie la liste `[2.355, 12.579]`. Nous assignons cette liste à la variable `x`.

Pour arrondir les valeurs de `x` à deux décimales, nous devons évaluer l'équation `ROUND(num, 2)` où num représente chaque valeur de notre liste et 2 spécifie le nombre de décimales que nous voulons arrondir. Cela renvoie la liste `[2.36, 12.58]` que nous assignons à la variable `round_x`.

Dans la première équation, nous avons utilisé notre colonne de référence, Mix Product, comme notre lien vers Table1 afin de tirer des données de Table1 dans Table2. Nous utilisons cette méthode à nouveau dans `$Mix_Product.Product` pour tirer des données de la colonne Product de Table1. Cela renvoie une liste de produits ; `[Prod A, Prod B]`. Nous assignons cette liste à la variable `l`.

Enfin, nous utilisons la méthode [join()](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"} pour combiner nos deux listes. `' '` est notre chaîne de départ (vide). Nous utilisons la [méthode format](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"} de Python pour formater notre chaîne. `{}` est un espace réservé pour chaque variable listée dans `.format()`. Enfin, nous utilisons la [fonction zip()](https://www.w3schools.com/python/ref_func_zip.asp){:target="\_blank"} de Python pour appairer les premières valeurs de chaque liste ensemble, puis appairer les secondes valeurs de chaque liste ensemble. `l` est assignée comme notre `première` liste et `round_x` est assignée comme notre `deuxième` liste. `l = [Prod A, Prod B]` et `round_x = [2.36, 12.58]`. Appairer nos listes dans `'{} {}'.format(first, second)` nous donne `Prod A 2.36` dans notre première itération et `Prod B 12.58` dans notre deuxième itération. Notre valeur de retour finale est `Prod A 2.36 Prod B 12.58`.
</details>
</section>


<span></span><section class="cheat-sheet">
#### Formater les nombres avec des zéros initiaux

Vous permet de spécifier le nombre minimum de chiffres retournés dans une colonne numérique en ajoutant des zéros initiaux. Si x = 5, `str(x).zfill(3)` ou `'{:0>3}'.format(x)` retournerait `005`.

<span></span><details><summary>
#### Formater les nombres avec des zéros initiaux
</summary>

**Exemple Communautaire: [Utilisation de l'ID de ligne](https://public.getgrist.com/p4zvsX9asVCc/2179-Using-id/p/1){:target="\_blank"}**

<span class="screenshot-large">*![min-digits](images/formula-cheat-sheet/min-digits.png)*</span>

La formule utilisée dans la colonne ID à 5 chiffres de la table d'exemples d'ID est :
```
'TCH{:0>5}'.format($id)
```

`'{:0>5}'.format($id)` prend l'ID de ligne unique et le formate pour avoir un minimum de 5 chiffres. Nous ajoutons ensuite cela à notre chaîne `"TCH"` pour obtenir notre valeur finale. Si le `$id` est plus long que 5 chiffres, la formule retourne la chaîne non modifiée.

Nous pouvons faire la même chose en utilisant la méthode [`str.zfill()`](https://docs.python.org/3/library/stdtypes.html#str.zfill){:target="\_blank"}.

<span class="screenshot-large">*![min-digits-zfill](images/formula-cheat-sheet/min-digits-zfill.png)*</span>

La formule utilisée dans la colonne Méthode zfill du tableau d'exemples d'ID est :
```
str($id).zfill(5)
```
`str($id)` convertit l'ID de la ligne en chaîne de caractères. `.zfill(x)` renvoie une copie de la chaîne avec des zéros en tête pour obtenir une chaîne de longueur `x`. Dans notre exemple, cela ajoute des zéros en tête pour obtenir une chaîne de 5 caractères de longueur. Encore une fois, si le `$id` est plus long que 5 chiffres, la formule renvoie la chaîne non modifiée.

</details>

<span></span><details><summary>
#### Dépannage des erreurs
</summary>
`#TypeError`: peut seulement concaténer str (pas "int") à str

Si vous souhaitez combiner une chaîne de caractères et une valeur numérique, assurez-vous de la convertir en chaîne de caractères en utilisant `str()`.

<span class="screenshot-large">*![string-type-error](images/formula-cheat-sheet/string-type-error.png)*</span>
{: .screenshot-half }

</details>
</section>

## Travailler avec des chaînes de caractères

<span></span><section class="cheat-sheet">
#### Combiner du texte de plusieurs colonnes

**Méthode 1 :** Si vous avez une colonne Prénom et une colonne Nom de famille, vous pouvez combiner ces colonnes pour obtenir une colonne Nom complet. Si le prénom est `George` et le nom de famille est `Washington`, `$First_Name + " " + $Last_Name` renverrait `George Washington`.

**Méthode 2 :** Si vous avez un formatage supplémentaire, un moyen plus simple de le faire serait d'utiliser la [méthode format() de Python](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"}. La méthode `format()` formate la ou les valeurs spécifiées et les insère à la place de l'espace réservé, `{}`. En utilisant le même exemple que ci-dessus, notre formule serait `"{} {}".format($First_Name, $Last_Name)`.

Remarque : Vous pouvez cliquer sur les colonnes pour les insérer dans vos formules, plutôt que de les taper.

<span></span><details><summary>
#### Exemples utilisant la Méthode 1
</summary>
**[Inscription en classe](https://templates.getgrist.com/doc/afterschool-program) modèle{:target="\_blank"}**

<span class="screenshot-large">*![combining-text-students](images/formula-cheat-sheet/combining-text-students.png)*</span>

La formule utilisée dans la colonne Nom Complet de la table Étudiants est :
```
$Last_Name + ", " + $First_Name
```
Ici, nous combinons la valeur trouvée dans la colonne Nom de Famille avec une virgule suivie d'un espace suivi de la valeur de la colonne Prénom. Lors de l'ajout de caractères ou d'espaces supplémentaires, placez-les entre guillemets doubles, comme nous l'avons fait dans l'exemple avec `", "`. 

Une combinaison alternative de ces colonnes pour le Nom Complet pourrait être `$First_Name + " " + $Last_Name`. Pour l'exemple de la ligne 1, le Prénom est `Brockie` et le Nom de Famille est `Raddon`, donc la valeur retournée serait `Brockie Raddon`.

**[Gestionnaire d'inventaire](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} modèle**

<span class="screenshot-large">*![combining-text-sku](images/formula-cheat-sheet/combining-text-sku.png)*</span>

La formule utilisée dans la colonne SKU de la table Tous les Produits est :
```
$Brand.Brand_Code+"-"+$Color.Code+"-"+$Size
```
Marque est une colonne de référence qui extrait des données de la colonne Nom de Marque de la table Ajouter des Produits. Nous utilisons cette colonne de référence dans `$Brand.Brand_Code` pour extraire des données de la colonne Code de Marque de la table Ajouter des Produits. 

Couleur est une colonne de référence qui extrait des données de la colonne Couleur de la table Couleur. Nous utilisons cette colonne de référence dans `$Color.Code` pour extraire des données de la colonne Code de la table Couleur. 

Chacune des valeurs trouvées dans `$Brand.Brand_Code` et `$Color.Code` est combinée avec la valeur de la colonne Taille avec un `-` entre chacune des trois valeurs pour constituer le SKU.
</details>

<span></span><details><summary>
#### Exemples utilisant la Méthode 2
</summary>
**[Suivi du Temps + Facturation](https://templates.getgrist.com/bReAxyLmzmEQ/Tracking-Time-Invoicing){:target="\_blank"} modèle**

<span class="screenshot-large">*![combining-text-project-name](images/formula-cheat-sheet/combining-text-project-name.png)*</span>

La formule utilisée dans la colonne Nom du Projet de la table Projets est :
```
"{}: {}".format($Client.Name, $Name)
```
Décomposons cela.

Tout ce qui se trouve entre les guillemets doubles `"` est notre chaîne de caractères. Les accolades `{}` sont des espaces réservés pour les valeurs trouvées en utilisant `.format()`, qui est la méthode de formatage de chaînes de caractères en Python.

Le premier ensemble d'accolades est remplacé par la valeur trouvée dans `$Client.Name`. Client est une colonne de référence qui extrait des données pour un enregistrement spécifique de la table Clients. `$Client.Name` utilise notre colonne de référence, Client, pour extraire des données de la colonne Nom de la table Clients.

Le deuxième ensemble d'accolades est remplacé par la valeur trouvée dans la colonne Nom de cette table.

Bien que la colonne Client affiche la valeur que nous souhaitons, nous ne pouvons pas utiliser `$Client` comme nous avons utilisé `$Name`. Cela est dû au fait que la colonne Client est une colonne de référence. Elle fait référence à l'<em>ensemble</em> de l'enregistrement mais utilise la valeur de la colonne Nom de la table Clients comme représentation visuelle de cet enregistrement. Dans le panneau de configuration de la colonne sur le côté droit, nous pouvons changer la valeur de la colonne que nous voyons pour l'enregistrement. Dans la capture d'écran ci-dessous, 'Afficher la Colonne' a été changé de Nom à Email.

<span class="screenshot-large">*![reference-client-email](images/formula-cheat-sheet/reference-client-email.png)*</span>
{: .screenshot-half }

Cela ne change pas les données, cela change simplement l'étiquette de ces données dans la colonne Client. Elle pointe toujours vers le même enregistrement mais affiche maintenant une étiquette différente. `$Client.Name` extrait le Nom de l'enregistrement référencé dans la colonne Client, indépendamment de l'étiquette que nous voyons.

**[Modèle de Constructeur de Produit Personnalisé](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder){:target="\_blank"} template**

<span class="screenshot-large">*![combining-text-components](images/formula-cheat-sheet/combining-text-components.png)*</span>

La formule utilisée dans la colonne Tous les Composants de la Carte CONTRACT_BUILDER est :
```
'\n'.join(sorted(
  "{} — {:g}{}".format(comp.Component, quantity, comp.Unit)
  for (comp, quantity) in $Components.items()
))
```
Nous utilisons la [méthode join()](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"}, la [fonction sorted()](https://www.w3schools.com/python/ref_func_sorted.asp){:target="\_blank"} et la [méthode format()](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"} toutes en une seule fois !

`'\n'.join()` ajoute une nouvelle ligne entre chaque élément de la liste.

`sorted()` trie les éléments de la liste par ordre alphabétique.

Cela nous laisse avec ce qui suit :

```
"{} — {:g} {}".format(comp.Component, quantity, comp.Unit)
  for (comp, quantity) in $Components.items()
```
Nous allons travailler à l'envers. Tout d'abord, nous devons examiner la colonne Components qui est une [colonne cachée](page-widgets.md#configuring-field-lists) dans la table All Contracts.

<span class="screenshot-large">*![combining-text-components-hidden](images/formula-cheat-sheet/combining-text-components-hidden.png)*</span>

Cette colonne est une liste de composants et de leurs quantités associées pour le contrat. Dans la boucle `for`, nous attribuons à chaque élément de la liste des composants deux variables, comp et quantity. Pour `Components[3]: 6.0`, comp = `Components[3]` et quantity = `6.0`. `Components[#]` spécifie un composant dans la table Components par ID de ligne. `Components[3]` est le composant assigné `3` comme ID de ligne.

<span class="screenshot-large">*![components-row-id](images/formula-cheat-sheet/components-row-id.png)*</span>
{: .screenshot-half }

Maintenant, nous passons chaque élément de la liste ci-dessus à travers l'équation `"{} — {:g} {}".format(comp.Component, quantity, comp.Unit)`.

`comp.Component` remplace le premier ensemble de `{}`. `comp` est la variable avec notre ID de composant, donc `comp.Component` trouve la valeur dans la colonne Component associée à cet ID de ligne. Pour `Components[3]`, `comp.Component` est Nozzle.

`quantity` remplace le deuxième ensemble de `{}`. Encore une fois, la quantité est la deuxième variable dans notre liste. Pour `Components[3]: 6.0`, la quantité est `6.0`. Notre deuxième ensemble de `{}` n'est pas vide. Il inclut `:g`*. Cela convertit la valeur en un nombre à virgule flottante.

`comp.Unit` remplace le dernier ensemble de `{}`. `comp` est la variable avec notre ID de composant, donc `comp.Unit` trouve la valeur dans la colonne Unit associée à cet ID de ligne. Pour `Components[3]`, `comp.Unit` est `None`.

*Notez que `{:g}` formate les nombres à virgule flottante d'une manière particulière qui omet les décimales lorsqu'elles ne sont pas nécessaires. Il existe de nombreuses options disponibles dans les espaces réservés pour formater les nombres, les dates, etc. En savoir plus sur les espaces réservés [ici](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"}.

**[Modèle de Contacts Email](https://templates.getgrist.com/3HfynRQwpHPy/Email-Contacts){:target="\_blank"}**

<span class="screenshot-large">*![combining-text-email](images/formula-cheat-sheet/combining-text-email.png)*</span>

La formule utilisée dans la colonne Body de la table Advanced Compose est :
```
"Dear %s,\n\nWelcome to the %s team!" % ($Contact_Name_as_Plaintext, $Team)
```
Cette technique utilise l'opérateur `%` au lieu de la méthode `format()`. Les spécificateurs de format commencent par `%` suivi d'un caractère représentant le type de données. `%s` est un espace réservé pour une chaîne de caractères. Le premier `%s` est remplacé par la valeur trouvée dans la colonne "Contact Name as Plaintext" qui est une [colonne cachée](page-widgets.md#configuring-field-lists) et le deuxième `%s` est remplacé par la valeur dans la colonne Team.

`\n` ajoute une nouvelle ligne.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Fractionner des chaînes de texte

Fractionnez une chaîne en utilisant la méthode [split()](https://docs.python.org/3/library/stdtypes.html#str.split){:target="\_blank"} de Python. Si Full Name est `George Washington`, `$Full_Name.split(" ")` renverrait `[George, Washington]`.

<span></span><details><summary>
#### Exemple de fractionnement de chaînes de texte
</summary>

**Exemple de la communauté : [Couleurs](https://public.getgrist.com/2tv3e8qxpNFP/Community-715/p/2){:target="\_blank"}**

<span class="screenshot-large">*![split-hyperlink](images/formula-cheat-sheet/split-hyperlink.png)*</span>

La formule dans la colonne "Référence de Couleur (Juste URL)" du Tableau 2 est :
```
split = $Color_Reference.Color.split(" ")
return split[-1]
```
`$Color_Reference.Color` utilise la cible de référence, "Référence de Couleur" pour extraire des données de la table à laquelle elle fait référence, le Tableau 1. Plus précisément, elle extrait la valeur de la colonne Couleur du Tableau 1.

Couleur est une colonne de texte qui contient un hyperlien avec une étiquette. Nous voyons seulement l'étiquette dans le Tableau 1 mais comme vous pouvez le voir dans la capture d'écran ci-dessus, la valeur dans la cellule 'rose' est étendue pour montrer la chaîne entière qui contient "rose" suivi de l'URL. Vous pouvez aussi voir cela dans la colonne "Référence de Couleur" du Tableau 2. Nous voulons obtenir le lien seul dans "Référence de Couleur (Juste URL)". Nous pouvons le faire en utilisant la méthode [split()](https://docs.python.org/3/library/stdtypes.html#str.split){:target="\_blank"} de Python.

`.split(" ")` nous permet de diviser la chaîne partout où il y a un espace `(" ")`. Dans la colonne Couleur, il y a une étiquette suivie d'un espace suivi de l'URL. La valeur de la colonne Couleur est divisée en une liste contenant deux éléments `Étiquette` et `URL`. Cette liste est assignée à la variable `split`.

Nous voulons retourner le dernier élément de la liste `split` afin d'obtenir notre `URL`. Le dernier élément d'une liste a toujours l'index `[-1]`. `return split[-1]` retourne le dernier élément de la liste `split`.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Lien Direct vers l'Historique Gmail pour un Contact

Si vous stockez des contacts dans Grist, et utilisez Gmail pour leur envoyer des emails, vous pouvez créer une formule qui ouvrira Gmail sur une liste de conversations avec ce contact.

**Lisez à ce sujet dans la Communauté :** [Afficher l'historique Gmail pour un contact particulier](https://community.getgrist.com/t/pull-up-gmail-history-for-a-particular-contact/517){:target="\_blank"}

<span></span><details><summary>
#### Dépannage
</summary>
Votre URL s'affiche-t-elle toujours après avoir ajouté une étiquette ? Assurez-vous que le Type de Colonne est Texte et le Format de Cellule est Hyperlien.

<span class="screenshot-large">*![text-hyperlink](images/formula-cheat-sheet/text-hyperlink.png)*</span>

</details>
</section>


<span></span><section class="cheat-sheet">
#### Joindre une Liste de Chaînes de Caractères

Lorsque vous souhaitez joindre une liste de chaînes de caractères, vous pouvez utiliser la [méthode join() de Python](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"}.

<span></span><details><summary>
#### Exemple de Jointure d'une Liste
</summary>
**Exemple Communautaire : [Exemple de .join()](https://public.getgrist.com/2L3J99j7zW23/join-Example/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![join-list-values-example](images/formula-cheat-sheet/join-list-values-example.png)*</span>

La formule utilisée dans la colonne Publicité du tableau des Ouvertures de 2022 est :
```
"Prochainement dans une ville près de chez vous !\n" + " : ".join($New_Location_s_in_2022)
```
Ici, nous joignons plusieurs chaînes de caractères pour créer notre publicité.

`"Prochainement dans une ville près de chez vous !\n"` est retourné presque exactement comme nous le voyons, à l'exception des guillemets `""` et de `\n` à la fin de la chaîne.

Les guillemets `""` spécifient qu'il s'agit d'une chaîne de caractères et `\n` est en fait un caractère de nouvelle ligne qui peut être utilisé pour spécifier une nouvelle ligne au sein d'une chaîne.

`" : ".join($New_Location_s_in_2022)` est également une chaîne de caractères mais utilise la [méthode join() de Python](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"} pour joindre des valeurs de notre colonne [liste de choix](col-types.md#choice-list-columns), "Nouveaux Emplacements en 2022". Ce que nous voyons entre guillemets avant `.join` est ce qui séparera chaque valeur de notre liste.

Dans cet exemple, chaque valeur est séparée par un espace, `:` et un autre espace.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Trouver des doublons

Vous pouvez trouver des doublons dans une colonne en utilisant soit le formatage conditionnel, soit une colonne d'assistance.

**Lisez à ce sujet dans la Communauté :** [Assurer des valeurs uniques ou détecter des doublons](https://community.getgrist.com/t/ensure-unique-values-or-detect-duplicates/76){:target="\_blank"}

<span></span><details><summary>
#### Exemple de Recherche de Doublons
</summary>
**Exemple de la Communauté : [Recherche de Doublons](https://public.getgrist.com/3CJkcpF7wu9Q/-1790/p/4){:target="\_blank"}**

<span class="screenshot-large">*![duplicates-single-column](images/formula-cheat-sheet/duplicates-single-column.png)*</span>

La formule utilisée dans la colonne Doublon ? de la table Doublons est :
```
len(Duplicates.lookupRecords(Grocery_List=$Grocery_List))>1
```

Décomposons cela, en travaillant de l'intérieur vers l'extérieur.
```
Duplicates.lookupRecords(Grocery_List=$Grocery_List)
```
C'est une fonction [lookupRecords](functions.md#lookuprecords) qui suit le format :
```
[Table_Name].lookupRecords([A]=$[B])
```

Où `[Table_Name]` est le nom de la table dans laquelle vous souhaitez rechercher des données. `[A]` est la colonne dans la table recherchée (nommée au début de la formule) et `[B]` est la colonne dans la table actuelle / la table dans laquelle vous entrez la formule.

Cette formule recherche des enregistrements dans la table Doublons où un enregistrement dans la colonne Liste de courses correspond à un autre enregistrement dans la même colonne.

`len()` compte le nombre d'enregistrements dans notre liste. Puisque chaque doublon correspondra à l'autre, il devrait apparaître deux fois dans notre liste. C'est pourquoi `len() > 1`.

Si `len() > 1`, la formule est vraie. Si `len() <= 1`, la formule est fausse.

Cette même formule peut être utilisée dans le formatage conditionnel. Cela peut être vu dans la colonne 'Liste de courses' de la table Doublons.

<span class="screenshot-large">*![duplicates-single-conditional-formatting](images/formula-cheat-sheet/duplicates-single-conditional-formatting.png)*</span>

Si `len() > 1`, notre formule est vraie et la couleur de cellule conditionnelle est appliquée à ces cellules.

Si `len() <= 1`, notre formule est fausse et la couleur de la cellule reste inchangée.

</details>

</section>

<span></span><section class="cheat-sheet">
#### Utilisation de l'identifiant unique d'un enregistrement dans les formules

Lorsqu'un enregistrement est créé, il se voit attribuer un identifiant numérique (disponible sous `$id` dans les formules) qui est unique au sein de cette table. Vous pouvez révéler l'ID de la ligne en ajoutant une colonne de formule où la formule est `$id`{: .formula}.

<span></span><details><summary>
#### Exemples d'utilisation de l'ID de ligne dans les formules
</summary>
Vous pouvez révéler l'ID avec la formule `$id`

<span class="screenshot-large">*![row-id](images/formula-cheat-sheet/row-id.png)*</span>
{: .screenshot-half }

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder){:target="\_blank"} modèle**

<span class="screenshot-large">*![row-id-trigger](images/formula-cheat-sheet/row-id-trigger.png)*</span>

La formule utilisée dans la colonne Numéro de Contrat de la table Contract Builder est :
```
$id + 500
```
Ici, nous utilisons une formule de déclenchement pour créer un numéro de contrat unique lorsqu'un enregistrement est créé.

**[Class Enrollment](https://templates.getgrist.com/doc/afterschool-program){:target="\_blank"} modèle**

<span class="screenshot-large">*![id-reverse-lookup](images/formula-cheat-sheet/id-reverse-lookup.png)*</span>

La formule utilisée dans la colonne Compte de la table Classes est :
```
len(Enrollments.lookupRecords(Class=$id, Status="Confirmed"))
```
Cela est appelé une recherche inverse. Nous pouvons utiliser l'ID de la ligne pour faire correspondre un enregistrement dans une autre table où une colonne de référence est utilisée. LookupRecords suit le format `[Table_Name].lookupRecords([A]=$[B])`. `[Table_Name]` est le nom de la table dans laquelle vous souhaitez rechercher des données. `[A]` est la colonne dans la table recherchée (nommée au début de la formule) et `[B]` est la colonne dans la table actuelle / la table dans laquelle vous entrez la formule. Lookup Records crée une liste d'enregistrements qui correspondent aux critères énumérés. `len()` compte combien d'enregistrements se trouve dans cette liste.

Ici, nous recherchons des enregistrements dans la table Enrollments où l'enregistrement mentionné dans la colonne Class (notre colonne de référence) a le même ID de ligne que la ligne dans la table où vous entrez la formule. De plus, la valeur dans la colonne Status de la table Enrollments doit être `Confirmed`. Nous allons passer en revue cela.

La table dans laquelle nous recherchons des enregistrements est la table Enrollments. Nos critères proviennent de la colonne Class et de la colonne Status. Le critère pour Status est simple : la valeur doit être `Confirmed` pour être incluse dans notre liste d'enregistrements. Class est un peu plus compliqué. Comme nous le voyons dans la capture d'écran ci-dessous, Class est une colonne de référence qui extrait des données de la table Classes. Ici, la colonne Class affiche `2018F-Stars`.

<span class="screenshot-large">*![id-reference-class-code](images/formula-cheat-sheet/id-reference-class-code.png)*</span>

Une colonne de référence pointe vers l'<em>ensemble</em> de l'enregistrement, pas seulement la valeur que vous voyez ici dans la colonne Class. En utilisant le panneau de configuration sur le côté droit de l'écran, vous pouvez choisir n'importe quelle colonne de la table d'origine à afficher. Pour cet exemple, la colonne Class affiche la valeur de la colonne Class Code de la table Classes mais elle pointe vers l'ensemble de l'enregistrement où le code de la classe est `2018F-Stars`.

<span class="screenshot-large">*![id-class-id](images/formula-cheat-sheet/id-class-id.png)*</span>

Comme vous pouvez le voir dans cette capture d'écran, l'ID de ligne pour cet enregistrement particulier est `2` et comme nous calculons le nombre pour la ligne avec `Row ID = 2`, il comptera tous les enregistrements dans la table Enrollment où Class affiche `2018F-Stars` et Status est `Confirmed`.

**[Restaurant Custom Orders](https://templates.getgrist.com/e4gEm7dt4cgB/Restaurant-Custom-Orders){:target="\_blank"} modèle**

<span class="screenshot-large">*![inequality-restaurant-bom](images/formula-cheat-sheet/inequality-restaurant-bom.png)*</span>

La formule de déclenchement utilisée dans la colonne BOM # de la table Bill of Materials est :
```
MAX(o.BOM_ for o in Bill_Of_Materials.all if o.id != $id) + 1
```
Tout d'abord, nous allons parcourir la formule à l'intérieur des parenthèses, puis travailler vers l'extérieur.

Ici, `o` est une variable représentant chaque enregistrement dans notre table. `o.BOM_` représente le numéro BOM pour chaque enregistrement et `o.id` représente l'ID de la ligne pour chaque enregistrement. Il s'agit d'une boucle `for` qui crée une liste des numéros BOM pour chaque enregistrement dans la table Bill of Materials lorsque l'ID de l'enregistrement n'est pas égal à l'ID de cette ligne.

`MAX()` trouve le numéro BOM maximum dans la liste, puis `+ 1` pour obtenir notre valeur finale.

Il s'agit d'une formule de déclenchement qui ne s'applique qu'aux nouveaux enregistrements. Lorsqu'un nouvel enregistrement est créé, la formule trouve le numéro BOM le plus élevé dans la table, puis ajoute 1 pour avoir un numéro BOM unique pour le nouvel enregistrement.

</details>
</section>


<span></span><section class="cheat-sheet">
#### Suppression des doublons d'une liste

Vous pouvez supprimer les doublons d'une liste avec l'aide de la méthode [set()](https://docs.python.org/3/tutorial/datastructures.html#sets){:target="\_blank"} de Python.

<span></span><details><summary>
#### Exemple de suppression des doublons d'une liste
</summary>

**Exemple de la communauté : [Suppression des doublons d'une liste](https://public.getgrist.com/3pZUMdP2bJx6/1957/p/3){:target="\_blank"}**

<span class="screenshot-large">*![suppression-doublons](images/formula-cheat-sheet/removing-duplicates.png)*</span>

La formule dans la colonne Toutes les Divisions de la table Voyages à l'étranger est :
```
confirmed_div = $Attending_Confirmed.Role_Division.Division
pending_div = $Attending_Pending.Role_Division.Division
full_list = confirmed_div + pending_div
return sorted(set(full_list))
```
Nous allons parcourir cela ligne par ligne.

Attending-Confirmed est une colonne de liste de références qui extrait des données de la table EMPLOYEES. `$Attending_Confirmed.Role_Division` extrait la valeur de la colonne Role Division de la table EMPLOYEES. La colonne Role Division dans la table EMPLOYEES est elle-même une colonne de référence, qui pointe vers un enregistrement dans la table Divisions. [Chaining](references-lookups.md#chaining) nous permet de spécifier quelles informations nous voulons de cet enregistrement. Dans ce cas, nous voulons la Division. Nous étendons notre formule à `$Attending_Confirmed.Role_Division.Division`. La Division est trouvée pour chaque employé listé dans la colonne Attending-Confirmed, créant une liste. Nous assignons cette liste de divisions à la variable `confirmed_div`.

Attending-Pending est également une colonne de liste de références qui extrait des données de la table EMPLOYEES. `$Attending_Pending.Role_Division.Division` fait la même chose que ci-dessus, sauf que maintenant nous extrayons la division pour chaque employé dans la colonne Attending-Pending. Nous assignons cette liste à la variable `pending_div`.

Nous créons une liste de toutes les divisions en ajoutant les deux listes ensemble et en assignant cette liste combinée à la variable `full_list`.

`return sorted(set(full_list))` utilise d'abord la méthode [set()](https://docs.python.org/3/tutorial/datastructures.html#sets){:target="\_blank"} de Python pour créer une liste sans divisions dupliquées. Nous utilisons ensuite la méthode [sorted()](https://docs.python.org/3/library/functions.html#sorted){:target="\_blank"} pour retourner notre ensemble de divisions, triées par ordre alphabétique.

Notez que la formule ci-dessus peut être encore simplifiée à :
```
sorted(
  set($Attending_Confirmed.Role_Division.Division) |
  set($Attending_Pending.Role_Division.Division)
)
```

<span class="screenshot-large">*![removing-duplicates-simplified](images/formula-cheat-sheet/removing-duplicates-simplified.png)*</span>

</details>
</section>


<span></span><section class="cheat-sheet">
#### Définir des valeurs par défaut pour les nouveaux enregistrements

Vous pouvez définir des valeurs par défaut pour la création d'un nouvel enregistrement et vous éviter la peine de remplir les mêmes champs avec les mêmes valeurs à chaque fois.

**Lisez à ce sujet dans la Communauté :** [Valeurs par défaut sur la vue](https://community.getgrist.com/t/default-values-on-the-widget/689/4){:target="\_blank"}

</section>

## Travailler avec les dates et les heures

<span></span><section class="cheat-sheet">
#### Horodatages Automatiques de Date, Heure et Auteur

Vous pouvez automatiquement ajouter la date ou l'heure à laquelle un enregistrement a été créé ou mis à jour, ainsi que l'auteur de la modification.

<span></span><details><summary>
#### Exemples d'Horodatages Automatiques de Date, Heure et Auteur
</summary>
**[Suivi des Demandes de Subvention](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker){:target="\_blank"} modèle**

<span class="screenshot-large">*![date-time-trigger-formula](images/formula-cheat-sheet/date-time-trigger-formula.png)*</span>

La formule utilisée dans la colonne Dernière Mise à Jour de la table des Tâches est :
```
NOW()
```
Ceci est une [formule de déclenchement](formulas.md#trigger-formulas) qui se déclenche lorsqu'une modification est apportée à n'importe quel champ de cet enregistrement. Lorsqu'une modification est apportée, cette formule exécute son calcul. `NOW()` calcule l'heure et la date actuelles pour le [fuseau horaire](dates.md#time-zones) sélectionné.

<span class="screenshot-large">*![created-by-trigger](images/formula-cheat-sheet/created-by-trigger.png)*</span>

La formule utilisée dans la colonne Créé Par de la table des Tâches est :
```
user.Name
```
Ceci est une [formule de déclenchement](formulas.md#trigger-formulas) qui se déclenche lorsqu'un nouvel enregistrement est créé. Lorsque l'enregistrement est créé, cette formule exécute son calcul. `user.Name` recherche le compte utilisateur connecté à Grist et renvoie le nom associé à ce compte.

</details>

<span></span><details><summary>
#### Dépannage des Erreurs
</summary>
Si la valeur de l'heure dans votre colonne datetime ne se calcule pas, vérifiez votre formule. Si `TODAY()` est utilisé dans DateTime, l'heure affichera toujours 12:00am comme vous le voyez ci-dessous. `NOW()` est utilisé pour les colonnes DateTime. `TODAY()` est utilisé pour la Date.

<span class="screenshot-large">*![today-vs-now-error](images/formula-cheat-sheet/today-vs-now-error.png)*</span>

<span></span><div class="deflist">

- `#AttributeError`

    Vous avez probablement entré `user.name` mais la formule est `user.Name`. Faites attention à la capitalisation !

- `#NameError`

    Vous avez peut-être entré `username` ou `userName`. La formule correcte est `user.Name`.

Une autre possibilité est que cela ait été entré dans une colonne de formule plutôt que dans une colonne de formule de déclenchement. Convertissez-la en une formule de déclenchement et cela devrait résoudre le problème.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Filtrer les Données dans un Intervalle de Temps Spécifié

En utilisant la fonction [`DATEADD()`](functions.md#dateadd) et les [opérateurs de comparaison](#comparing-values), vous pouvez déterminer si une date tombe dans un intervalle spécifique, puis appliquer un filtre.

<span></span><details><summary>
#### Exemple de Filtrage des Données qui 'Tombent dans un Intervalle de 1 Mois'
</summary>

**Exemple Communautaire :** [Filtrage des Données dans un Intervalle de 1 Mois](https://public.getgrist.com/4zxVeFtGNt7n/1844){:target="\_blank"}

<span class="screenshot-large">*![intervalle-1-mois](images/formula-cheat-sheet/1-month-range.png)*</span>
La formule utilisée dans la colonne Tombe dans un Intervalle de 1 Mois ? de la table Interactions est :
```
TODAY() >= $Date >= DATEADD(TODAY(),months=-1)
```
[`TODAY()`](functions.md#today) renvoie la date actuelle.

`$Date` est le nom d'une colonne dans notre table, qui est une colonne de type [Date](col-types.md#date-columns).

[`DATEADD(start_date, days=0, months=0, years=0, weeks=0)`](functions.md#dateadd) renvoie la date qui est le nombre donné de jours, mois, années ou semaines avant ou après la `start_date`. Dans cet exemple, elle renvoie la date qui est un mois avant la date de début, `TODAY()`.

Cette formule est vraie si la valeur de la date dans la colonne Date se situe entre `TODAY()` et notre date `DATEADD()` qui est il y a un mois. Si la valeur de la date dans la colonne Date ne se situe pas entre ces deux dates, la formule renvoie faux.

Nous pouvons utiliser cette colonne pour filtrer nos données. Si nous voulons seulement voir les interactions qui tombent dans l'Intervalle de 1 Mois, nous filtrerons pour n'inclure que les valeurs `true`. Si nous voulons voir les interactions qui tombent en dehors de l'Intervalle de 1 Mois, nous filtrerons pour n'inclure que les valeurs `false`.

<span class="screenshot-large">*![add-filter](images/formula-cheat-sheet/add-filter.png)*</span>

</details>

<span></span><details><summary>
#### Dépannage des erreurs
</summary>

<span></span><div class="deflist">

- `#TypeError`:

    <span class="screenshot-large">*![1-month-range-type-error](images/formula-cheat-sheet/1-month-range-type-error.png)*</span>

    Parce que `$Date` est une colonne de type [Date](col-types.md#date-columns), `TODAY()` doit être utilisé dans les formules comparant des dates. [`NOW()`](functions.md#now) est une formule DateTime qui ne doit être utilisée qu'avec d'autres valeurs DateTime. Par exemple, si la colonne `$Date` était de type [DateTime](col-types.md#datetime-columns), `NOW()` devrait être utilisé plutôt que `TODAY()` car il inclut le composant temps.

    `NOW()` est date et heure. `TODAY()` est uniquement la date.
</div>

</details>
