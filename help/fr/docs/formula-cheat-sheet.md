# Fiche de Formules

Grist dispose d'un puissant moteur de données pour calculer les cellules de vos tables à l'aide de formules. Les formules Grist sont écrites en [Python](https://docs.python.org/3/library/){:target="\_blank"}, le langage le plus populaire pour la science des données. Nous avons également une suite de [fonctions](functions.md) semblables à celles d'Excel, avec des noms en majuscules. Voici quelques notes utiles :

- Les formules s'appliquent à toute la colonne.
- Les champs sont inclus dans les formules sous la forme `$ColumnID`.
- Python est sensible à la casse, y compris pour les noms de table et de colonne Grist. Si l'ID de votre colonne est `title`, la formule utilisera `$title`, où les deux sont en minuscules.
- Vous pouvez écrire du code Python multi-lignes dans les formules (utilisez <code class="keys">*Shift* + *Enter*</code> pour ajouter des lignes), y compris des instructions, des variables, des imports, etc.
- Le code Grist s'exécute dans un sandbox sécurisé, sans accès à quoi que ce soit en dehors de votre document.

Si vous ne trouvez pas ce que vous cherchez, postez dans le [Forum Communautaire](https://community.getgrist.com/) et nous pourrons vous aider !

## Fonctions Mathématiques

<span></span><section class="cheat-sheet">
#### Mathématiques Simples (addition, soustraction, multiplication, division)

Utilise les opérateurs `+`, `-`, `/` et `*` pour effectuer des calculs.

<span></span><details><summary>
#### Exemple de Mathématiques Simples
</summary>

Chestwood Art Studio expédie des œuvres d'art à travers le pays et a la possibilité de paiements mensuels sur une période de 12 mois.

Nous avons le sous-total, la taxe (basée sur l'état de destination) et le montant dû mensuel. Cette colonne de formule utilise l'addition, la multiplication et la division.

<span class="screenshot-large">*![simple-math](images/formula-cheat-sheet/simple-math.png)*</span>

La formule utilisée ici est :
```
($Subtotal + ($Subtotal*$Tax)) / 12
```
Nous ajoutons le sous-total à la taxe calculée, puis divisons cela par 12 mois pour obtenir notre montant dû mensuel.
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
*[MAX()](functions.md#max) et [MIN()](functions.md#min) lorsqu'ils sont en majuscules sont des fonctions de tableur qui nécessitent une syntaxe spécifique. La syntaxe des formules de tableur est résumée dans notre [référence de fonctions](functions.md). max() et min() en minuscules sont des fonctions Python.*

**Max** : Table des classes du modèle [Class Enrollment](https://templates.getgrist.com/doc/afterschool-program){:target="\_blank"}.

<span class="screenshot-large">*![max](images/formula-cheat-sheet/max.png)*</span>

La formule utilisée dans la colonne 'Spots Left' de la table des Classes est :
```
max($Max_Students - $Count, 0) or "Full"
```
Cette formule montre le nombre de places restantes dans une classe, ou le texte 'Full' lorsque la classe est pleine ou surabonnée.

Nous construisons une liste entre les parenthèses composée de deux éléments : `$Max_Students - $Count` et `0`. La formule renvoie le plus grand des deux.

Lorsque `$Count` est inférieur à `$Max_Students`, la différence `$Max_Students - $Count` est positive et représente les places restantes dans la classe. Lorsque `$Count` dépasse `$Max_Students`, alors la classe est pleine ou surabonnée, et `$Max_Students - $Count` est négatif. Le maximum d'un nombre négatif et de 0 sera 0, donc `max($Max_Students - $Count, 0)` est 0. Cela représente une classe pleine. L'ajout de `or "Full"` est appliqué lorsque la valeur est fausse, ce qui signifie qu'un 0 est remplacé par le texte `"Full"`.

**Min** : Table des contacts du modèle [Lightweight CRM](https://templates.getgrist.com/doc/lightweight-crm){:target="\_blank"}.

<span class="screenshot-large">*![min](images/formula-cheat-sheet/min.png)*</span>

La formule utilisée dans la colonne 'Due' de la table des Contacts est :
```
items = Interactions.lookupRecords(Contact=$id, Type="To-Do")
return min(items.Date) if items else None
```
Décomposons cela.

`Interactions.lookupRecords(Contact=$id, Type="To-Do")` trouve tous les enregistrements dans la table Interactions où les Contacts correspondent et le Type est To-Do. Cela renvoie une liste d'enregistrements que nous assignons à la variable `items`.

Ensuite, nous utilisons la [notation par points](references-lookups.md#reference-columns-and-dot-notation) pour trouver toutes les Dates assignées aux enregistrements de notre liste `items`. Ces dates sont évaluées pour trouver la date minimale. C'est la valeur qui est renvoyée. Ainsi, nous voyons la date de la tâche qui est due le plus tôt.

S'il n'y a pas d'éléments dans la liste, rien n'est renvoyé et le champ reste vide.

Dans l'exemple MAX(), la liste a deux éléments : `$Max_Students - $Count` et `0`, et la formule renvoie le plus grand des deux. Dans l'exemple min(), la variable `items` tire une liste d'enregistrements basée sur les arguments [lookupRecords](references-lookups.md#lookuprecords), énumérant les dates et renvoyant la plus petite date. Notez que c'est une fonction Python. Si nous avions écrit la formule comme MIN(), une fonction de tableur, la formule ne fonctionnerait pas car la formule de tableur nécessite un [format très spécifique](functions.md#min).

</details>
</section>

<span></span><section class="cheat-sheet">
#### Somme

Utilisez la fonction [SUM()](functions.md#sum) lorsque vous souhaitez additionner une liste de valeurs disponibles dans une cellule. Si vous souhaitez additionner des valeurs dans une colonne, utilisez [Tables de Résumé](summary-tables.md).

<span></span><details><summary>
#### Exemple de SUM()
</summary>

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder/p/6){:target="\_blank"} template**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-custom-product-builder.png)*</span>

La formule utilisée dans la colonne Coût Total de la table Sélectionner ou Ajouter de Nouveaux Produits est :
```
SUM($Requirements.Cost)
```
La colonne Requirements est une [colonne cachée](page-widgets.md#configuring-field-lists) dans cette table. C'est une colonne de liste de référence qui tire des données de la table Build Requirements.

Notre formule utilise la colonne Requirements pour accéder à la table Build Requirements, puis tire le coût pour chaque enregistrement dans la table.

Nous utilisons SUM() pour additionner les coûts de chaque enregistrement.

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} template**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-inventory-manager.png)*</span>

La formule utilisée dans la colonne Reçu de la table Tous les Produits est :
```
SUM(Incoming_Order_Line_Items.lookupRecords(SKU=$id).Received_Qty)
```
Nous utilisons la fonction [lookupRecords](functions.md#lookuprecords) pour trouver tous les enregistrements dans la table Incoming Order Line Items où le SKU correspond au SKU dans cette ligne, puis tirer la valeur dans la colonne Received Qty pour chacun de ces enregistrements. Nous utilisons SUM() pour trouver la somme de ces valeurs.

Les colonnes Qty on Order et Sold de la table [Tous les Produits](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/1){:target="\_blank"} sont également de bons exemples de la fonction SUM().

**Consultez un autre exemple dans notre Forum Communautaire :** [Créer une somme de bénéfice net et brut à partir de plusieurs tables](https://community.getgrist.com/t/creating-a-sum-of-net-and-gross-profit-from-multiple-tables/668){:target="\_blank"}
</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparer pour l'égalité : == et !=

Lors de la comparaison pour l'égalité en Python, nous utilisons `==` pour 'égal' et `!=` pour 'différent'. Si `$A` est 2 et `$B` est 3, la formule `$A == $B` renverrait `False`, tandis que la formule `$A != $B` serait `True`.

<span></span><details><summary>
#### Exemples utilisant `==`
</summary>

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/10){:target="\_blank"} template**

<span class="screenshot-large">*![equality-received-qty](images/formula-cheat-sheet/equality-received-qty.png)*</span>

La formule utilisée dans la colonne Received Qty de la table Incoming Order Line Items est :
```
if $Order.Status =='Received':
  return $Qty
else:
  return None
```
La colonne Order de la table Incoming Order Line Items est une colonne de référence qui pointe vers la colonne Order Number de la table Incoming Orders. `$Order.Status` utilise la notation par points pour tirer la valeur de la colonne Status de la table Incoming Orders. Si la valeur dans cette colonne est égale à `Received`, la valeur de la colonne Qty sera renvoyée. Si la valeur n'est pas égale à `Received`, rien n'est renvoyé.

<span class="screenshot-large">*![equality-date-received](images/formula-cheat-sheet/equality-date-received.png)*</span>

La formule utilisée dans la colonne Date Received de la table [Create New Order](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/16#a1.s35.r11.c82){:target="\_blank"} est :
```
if $Status == "Received":
  return NOW()
```
C'est une [formule d'initialisation](formulas.md#trigger-formulas) qui est déclenchée lorsqu'un changement est effectué dans la colonne Status. Si la valeur dans la colonne Status est égale à `Received`, la date actuelle est renvoyée. Si les valeurs ne sont pas égales, rien n'est renvoyé.

</details>
<span></span><details><summary>
#### Exemples utilisant `!=`
</summary>

**[Project Management](https://templates.getgrist.com/hifkng53AxyQ/Project-Management/p/9){:target="\_blank"} template**

<span class="screenshot-large">*![inequality-missed-deadline](images/formula-cheat-sheet/inequality-missed-deadline.png)*</span>

La formule utilisée dans la colonne Missed Deadline de la table Missed Deadline est :
```
TODAY()> $Due_Date and $Status != "Completed"
```
Si la date actuelle est supérieure à la date donnée dans la colonne Due Date **et** que la valeur dans la colonne Status n'est pas égale à `Completed`, la formule est `True`. Si l'une de ces affirmations est fausse, la formule est `False`.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparer des Valeurs : < , > , <= , >=

Vous permet de comparer des valeurs numériques. Si Sales est égal à `1200` et Running_Cost est égal à `1650`, `"Gains" if $Sales > $Running_Cost else "Loss"` renverrait `Loss`.

<span></span><details><summary>
#### Exemples de comparaison de valeurs
</summary>

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} template**

<span class="screenshot-large">*![comparing-values-stock-alert](images/formula-cheat-sheet/comparing-values-stock-alert.png)*</span>

La formule utilisée dans la colonne Stock Alert de la table Tous les Produits est :
```
if $In_Stock + $QTY_on_Order > 5:
  return "In Stock"
if $In_Stock + $QTY_on_Order > 0:
  return "Low Stock"
else:
  return "OUT OF STOCK"
```
Ici, nous avons deux déclarations **if-return** différentes ; si `x` est vrai, renvoyer `some_value`. Une fois qu'une déclaration est vraie et qu'une valeur est renvoyée, la formule s'arrête. Si les deux sont fausses, `OUT OF STOCK` est renvoyé.

Tout d'abord, si la valeur dans la colonne In Stock plus la valeur dans la colonne Qty On Order est supérieure à 5, renvoyez "In Stock".

Ensuite, si la valeur dans la colonne In Stock plus la valeur dans la colonne Qty On Order est supérieure à 0, renvoyez "Low Stock". Il est implicite que la valeur est inférieure ou égale à 5 car la première déclaration devrait être fausse pour que cela soit évalué.

Enfin, si toutes les déclarations sont fausses, renvoyez "OUT OF STOCK".

**[Internal Links Tracker for SEO](https://templates.getgrist.com/j9ZH7rPGafbH/Internal-Links-Tracker-for-SEO){:target="\_blank"} template**

<span class="screenshot-large">*![comparing-values-orphaned](images/formula-cheat-sheet/comparing-values-orphaned.png)*</span>

La formule utilisée dans la colonne Orphaned? de la table Orphaned Pages est :
```
len(Links.lookupRecords(To=$id))<1
```
Nous utilisons la fonction [lookupRecords](functions.md#lookuprecords) pour trouver tous les enregistrements dans la table Links où le lien dans la colonne To correspond au lien listé dans la colonne Slug de cette ligne.

Nous utilisons [len()](functions.md#len) pour compter le nombre d'enregistrements trouvés. S'il est inférieur à 1, la formule est évaluée comme vraie et la case à cocher sera cochée. S'il est égal ou supérieur à 1, la formule est évaluée comme fausse.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Conversion de String en Float

**[String](https://www.w3schools.com/python/python_strings.asp){:target="\_blank"}** : Une séquence de caractères ou d'extraits de texte. Dans le code, les chaînes sont entre guillemets, par exemple `'Hello'` ou `"-12"` (ce sont trois caractères entre guillemets, par opposition à un nombre négatif). Voir [Fonction str() de Python](https://www.w3schools.com/python/ref_func_str.asp){:target="\_blank"} pour convertir une valeur spécifiée en chaîne.

**[Float](https://www.w3schools.com/python/gloss_python_float.asp){:target="\_blank"}** : Nombres réels qui peuvent stocker des valeurs décimales. Également appelés nombres à virgule flottante. Voir [Fonction float() de Python](https://www.w3schools.com/python/ref_func_float.asp){:target="\_blank"} pour convertir une valeur spécifiée en un nombre à virgule flottante.

**[Integer](https://www.w3schools.com/python/python_numbers.asp){:target="\_blank"}** : Un nombre entier, sans décimales. Voir [Fonction int() de Python](https://www.w3schools.com/python/ref_func_int.asp){:target="\_blank"} pour convertir une valeur spécifiée en un nombre entier.

<span></span><details><summary>
#### Exemple de conversion d'une chaîne en float
</summary>

**[Artwork Orders](https://public.getgrist.com/fR4erkJzSpBd/Artwork-Orders/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![string-to-float](images/formula-cheat-sheet/string-to-float.png)*</span>

La formule utilisée dans la colonne Sale Price est :
```
if $Appraisal_Value.endswith("k"):
  return float($Appraisal_Value.rstrip("k")) * 1000
return float($Appraisal_Value)
```
Dans cet exemple, la colonne Appraisal Value est une colonne de texte qui contient des caractères alphanumériques. Afin d'utiliser cette valeur dans des formules mathématiques, nous devons convertir de string à float.

Si la valeur dans la colonne Appraisal Value se termine par "k", nous utilisons d'abord [rstrip()](https://docs.python.org/3/library/stdtypes.html#str.rstrip){:target="\_blank"} pour supprimer "k" de la chaîne dans la colonne Appraisal Value.

Maintenant que nous n'avons que des caractères numériques, nous utilisons [float()](https://docs.python.org/3/library/functions.html?highlight=float#float){:target="\_blank"} pour convertir notre chaîne en float.

Comme K représente 1000 et que nous avons supprimé cela de la valeur, nous multiplions notre float par 1000.

Si la valeur dans la colonne Appraisal Value ***ne se termine pas*** par "k", et ne contient que des caractères numériques, nous pouvons simplement utiliser [float()](https://docs.python.org/3/library/functions.html?highlight=float#float){:target="\_blank"} pour convertir notre chaîne en float.

</details>

<span></span><details><summary>
#### Dépannage
</summary>
Si vous essayez d'utiliser différentes colonnes avec des valeurs *numériques* dans une formule mathématique mais que vous voyez une erreur, vérifiez les types de colonnes pour chacune des colonnes utilisées dans la formule. Toutes doivent être de type [Numérique](col-types.md#numeric-columns).

<span class="screenshot-large">*![column-type-numeric](images/formula-cheat-sheet/column-type-numeric.png)*</span>
{: .screenshot-half }

[float()](https://docs.python.org/3/library/functions.html#float){:target="\_blank"} n'est nécessaire que lorsque vous traitez des valeurs alphanumériques comme nous le voyons dans l'[exemple](#example-converting-a-string-to-a-float).

**TypeError : impossible de multiplier une séquence par un type non-int de 'float'**
<span class="screenshot-large">*![multiply-non-int-float-type-error](images/formula-cheat-sheet/multiply-non-int-float-type-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente de **multiplier** des valeurs de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans la capture d'écran ci-dessous, la colonne Tax est une colonne [Texte](col-types.md#text-columns).
<span class="screenshot-large">*![multiply-non-int-error-tax-text](images/formula-cheat-sheet/multiply-non-int-error-tax-text.png)*</span>
Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.
<span class="screenshot-large">*![multiply-non-int-error-tax-numeric](images/formula-cheat-sheet/multiply-non-int-error-tax-numeric.png)*</span>

**TypeError : type d'opérande non pris en charge pour / : 'float' et 'str'**
<span class="screenshot-large">*![division-float-string-error](images/formula-cheat-sheet/division-float-string-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente de **diviser** des valeurs de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans l'exemple ci-dessus, la colonne '# of Payments' est une colonne [Choice](col-types.md#choice-columns).

Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.

**TypeError : type d'opérande non pris en charge pour + : 'float' et 'str'**
<span class="screenshot-large">*![addition-float-string-error](images/formula-cheat-sheet/addition-float-string-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente d'**ajouter** des valeurs de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans l'exemple ci-dessus, la colonne Tax est une colonne [Texte](col-types.md#text-columns).

Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.

**TypeError : type d'opérande non pris en charge pour - : 'float' et 'str'**
<span class="screenshot-large">*![subtraction-float-string-error](images/formula-cheat-sheet/subtraction-float-string-error.png)*</span>
Cette erreur se produit lorsqu'une formule tente de **soustraire** des valeurs de plusieurs colonnes, dont au moins une n'est pas de type [Numérique](col-types.md#numeric-columns). Dans l'exemple ci-dessus, la colonne Discount est une colonne [Texte](col-types.md#text-columns).

Lorsque nous changeons le type de colonne en [Numérique](col-types.md#numeric-columns), l'erreur est résolue.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Arrondir les Nombres

Spécifiez le nombre de décimales à donner dans un résultat en utilisant la fonction [ROUND()](functions.md#round). Si la Température Moyenne est égale à `46.5`, `ROUND($Average_Temperature)` renverrait `47`.

<span></span><details><summary>
#### Exemple d'arrondi des nombres
</summary>
**[Payroll](https://templates.getgrist.com/5pHLanQNThxk/Payroll/p/2){:target="\_blank"} template**

<span class="screenshot-large">*![round-payment](images/formula-cheat-sheet/round-payment.png)*</span>

La formule utilisée dans la colonne Payment est :
```
ROUND($Hours*$Per_Hour, 2)
```
La fonction [ROUND()](functions.md#round) suit le format `ROUND(value, places)` qui arrondira la valeur donnée au nombre de décimales spécifié. Notre formule trouve la valeur pour `$Hours*$Per_Hour` puis arrondit cette valeur à `2` décimales.

**[Mixing Products](https://public.getgrist.com/v4vj2PDZS4jf/Community-665/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![round](images/formula-cheat-sheet/round.png)*</span>

La formule utilisée dans la colonne Rounded Value est :
```
mix_list_str = $Mix_Product.Lt_per_100_Lt
mix_list_float = [float(i) for i in mix_list_str]
x = [Lt * $Water/100 for Lt in mix_list_float]
round_x = [ROUND(num, 2) for num in x]
l = $Mix_Product.Product
' '.join('{} {}'.format(first, second) for first, second in zip(l, round_x))
```
Décomposons cela.

`$Mix_Product` représente la colonne Mix Product, une colonne de liste de référence qui tire des données de la colonne Product de Table1. Nous pouvons utiliser cette colonne comme un lien vers Table1 pour tirer d'autres données. `$Mix_Product.Lt_per_100_Lt` utilise la colonne de liste de référence, Mix Product, pour tirer des valeurs de la colonne Lt per 100 Lt de Table1 pour les produits listés dans la colonne Mix Product de Table2, puis assigne cette liste de valeurs à la variable `mix_list_str`. C'est la même formule utilisée dans la colonne Lt per 100 Lt de Table2, donc vous pouvez voir la valeur qu'elle renvoie dans la ligne 1 de Table2. Elle renvoie une liste : `['0.2355', '1.2579']`. Cette liste est évaluée comme une chaîne plutôt que comme des valeurs numériques. Nous devons convertir chaque valeur de cette liste en float.

Dans notre prochaine formule, `[float(i) for i in mix_list_str]`, nous itérons à travers la liste qui a été assignée dans la première équation à `mix_list_str` et convertissons chaque valeur en un nombre à virgule flottante. Nous voulons convertir en float plutôt qu'en entier car toutes les valeurs ne sont pas des nombres entiers et contiennent des décimales. `i` est une variable représentant chaque valeur. Donc chaque valeur dans `mix_list_str` est évaluée dans l'équation `float(i)`. `float(0.2355)` convertit `0.2355` en float et `float(1.2579)` convertit `1.2579` en float. Maintenant, nous assignons notre liste de floats à la variable `mix_list_float`.

Nous pouvons maintenant utiliser nos valeurs float dans une équation mathématique. Encore une fois, nous itérons à travers la liste qui a été assignée à la variable `mix_list_float`. Dans notre équation `[Lt * $Water/100 for Lt in mix_list_float]`, `Lt` représente chaque valeur dans `mix_list_float` et `$Water` représente la valeur trouvée dans la colonne Water qui est `1000`. Nous évaluons l'équation `Lt * 1000/100` lorsque `Lt = 0.2355` et `Lt = 1.2579`, ce qui renvoie la liste `[2.355, 12.579]`. Nous assignons cette liste à la variable `x`.

Pour arrondir les valeurs dans `x` à deux décimales, nous devons évaluer l'équation `ROUND(num, 2)` où num représente chaque valeur dans notre liste et 2 spécifie le nombre de décimales que nous voulons arrondir. Cela renvoie la liste `[2.36, 12.58]` que nous assignons à la variable round_x.

Dans la première équation, nous avons utilisé notre colonne de liste de référence, Mix Product, comme notre lien vers Table1 afin de tirer des données de Table1 dans Table2. Nous utilisons cette méthode à nouveau dans `$Mix_Product.Product` pour tirer des données de la colonne Product de Table1. Cela renvoie une liste de produits ; `[Prod A, Prod B]`. Nous assignons cette liste à la variable `l`.

Enfin, nous utilisons la méthode [join()](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"} pour combiner nos deux listes. `' '` est notre chaîne de départ (vide). Nous utilisons la méthode [format](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"} de Python pour formater notre chaîne. `{}` est un espace réservé pour chaque variable listée dans `.format()`. Enfin, nous utilisons la fonction [zip()](https://www.w3schools.com/python/ref_func_zip.asp){:target="\_blank"} de Python pour associer les premières valeurs de chaque liste ensemble, puis associer les deuxièmes valeurs de chaque liste ensemble. `l` est assigné comme notre liste `first` et `round_x` est assigné comme notre liste `second`. `l = [Prod A, Prod B]` et `round_x = [2.36, 12.58]`. En zippant nos listes dans `'{} {}'.format(first, second)`, nous obtenons `Prod A 2.36` dans notre première itération et `Prod B 12.58` dans notre seconde itération. Notre valeur de retour finale est `Prod A 2.36 Prod B 12.58`.
</details>
</section>

<span></span><section class="cheat-sheet">
#### Formatage des nombres avec des zéros en tête

Vous permet de spécifier le nombre minimum de chiffres renvoyés dans une colonne numérique en ajoutant des zéros en tête. Si x = 5, `str(x).zfill(3)` ou `'{:0>3}'.format(x)` renverrait `005`.

<span></span><details><summary>
#### Formatage des nombres avec des zéros en tête
</summary>

**Exemple Communautaire : [Utilisation de Row ID](https://public.getgrist.com/p4zvsX9asVCc/2179-Using-id/p/1){:target="\_blank"}**

<span class="screenshot-large">*![min-digits](images/formula-cheat-sheet/min-digits.png)*</span>

La formule utilisée dans la colonne ID à 5 chiffres de la table ID Examples est :
```
'TCH{:0>5}'.format($id)
```

`'{:0>5}'.format($id)` prend l'ID de ligne unique et le formate pour avoir un minimum de 5 chiffres. Nous ajoutons ensuite cela à notre chaîne `"TCH"` pour obtenir notre valeur finale. Si l'ID `$id` est plus long que 5 chiffres, la formule renvoie la chaîne sans modification.

Nous pouvons faire la même chose en utilisant la méthode [`str.zfill()`](https://docs.python.org/3/library/stdtypes.html#str.zfill){:target="\_blank"}.

<span class="screenshot-large">*![min-digits-zfill](images/formula-cheat-sheet/min-digits-zfill.png)*</span>

La formule utilisée dans la colonne zfill Method de la table ID Examples est :
```
str($id).zfill(5)
```
`str($id)` convertit l'ID de ligne en chaîne. `.zfill(x)` renvoie une copie de la chaîne avec des zéros en tête pour faire une chaîne de longueur `x`. Dans notre exemple, cela ajoute des zéros en tête pour faire la chaîne de 5 caractères de long. Encore une fois, si l'ID `$id` est plus long que 5 chiffres, la formule renvoie la chaîne sans modification.

</details>

<span></span><details><summary>
#### Dépannage des Erreurs
</summary>
`#TypeError` : ne peut concaténer que str (pas "int") à str

Si vous souhaitez combiner une chaîne et une valeur numérique, assurez-vous de la convertir en chaîne en utilisant `str()`.

<span class="screenshot-large">*![string-type-error](images/formula-cheat-sheet/string-type-error.png)*</span>
{: .screenshot-half }

</details>
</section>

## Travailler avec des Chaînes

<span></span><section class="cheat-sheet">
#### Combinaison de Texte de Plusieurs Colonnes

**Méthode 1 :** Si vous avez une colonne Prénom et une colonne Nom, vous pouvez combiner ces colonnes pour avoir une colonne Nom Complet. Si le Prénom est `George` et le Nom est `Washington`, `$First_Name + " " + $Last_Name` renverrait `George Washington`.

**Méthode 2 :** Si vous avez un formatage supplémentaire, une manière plus simple de le faire serait d'utiliser la [méthode format() de Python](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"}. La méthode `format()` formate les valeurs spécifiées et les insère à la place du placeholder, `{}`. En utilisant le même exemple que ci-dessus, notre formule serait `"{} {}".format($First_Name, $Last_Name)`.

Remarque : Vous pouvez cliquer sur les colonnes pour les insérer dans vos formules, plutôt que de les taper.

<span></span><details><summary>
#### Exemples utilisant la Méthode 1
</summary>
**[Class Enrollment](https://templates.getgrist.com/doc/afterschool-program) template{:target="\_blank"}**

<span class="screenshot-large">*![combining-text-students](images/formula-cheat-sheet/combining-text-students.png)*</span>

La formule utilisée dans la colonne Nom Complet de la table des Étudiants est :
```
$Last_Name + ", " + $First_Name
```
Ici, nous combinons la valeur trouvée dans la colonne Last Name avec une virgule suivie d'un espace suivi de la valeur de la colonne First Name. Lorsque vous ajoutez des caractères ou des espaces supplémentaires, placez-les entre guillemets doubles, comme nous l'avons fait dans l'exemple avec `", "`. 

Une combinaison alternative de ces colonnes pour le Nom Complet pourrait être `$First_Name + " " + $Last_Name`. Pour l'exemple dans la ligne 1, le Prénom est `Brockie` et le Nom est `Raddon`, donc la valeur renvoyée serait `Brockie Raddon`.

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} template**

<span class="screenshot-large">*![combining-text-sku](images/formula-cheat-sheet/combining-text-sku.png)*</span>

La formule utilisée dans la colonne SKU de la table Tous les Produits est :
```
$Brand.Brand_Code+"-"+$Color.Code+"-"+$Size
```
Brand est une colonne de référence qui tire des données de la colonne Name Brand de la table Add Products. Nous utilisons cette colonne de référence dans `$Brand.Brand_Code` pour tirer des données de la colonne Brand Code de la table Add Products.

Color est une colonne de référence qui tire des données de la colonne Color de la table Color. Nous utilisons cette colonne de référence dans `$Color.Code` pour tirer des données de la colonne Code de la table Color.

Chacune des valeurs trouvées dans `$Brand.Brand_Code` et `$Color.Code` est combinée avec la valeur dans la colonne Size avec un `-` entre chacune des trois valeurs pour constituer le SKU.
</details>

<span></span><details><summary>
#### Exemples utilisant la Méthode 2
</summary>
**[Tracking Time + Invoicing](https://templates.getgrist.com/bReAxyLmzmEQ/Tracking-Time-Invoicing){:target="\_blank"} template**

<span class="screenshot-large">*![combining-text-project-name](images/formula-cheat-sheet/combining-text-project-name.png)*</span>

La formule utilisée dans la colonne Nom du Projet de la table des Projets est :
```
"{}: {}".format($Client.Name, $Name)
```
Décomposons cela.

Tout ce qui se trouve entre guillemets doubles `"` est notre chaîne. Les accolades `{}` sont des espaces réservés pour les valeurs trouvées à l'aide de `.format()` qui est la méthode de formatage de chaîne de Python.

Le premier ensemble d'accolades est remplacé par la valeur trouvée dans `$Client.Name`. Client est une colonne de référence qui tire des données pour un enregistrement spécifique de la table Clients. `$Client.Name` utilise notre colonne de référence, Client pour tirer des données de la colonne Name de la table Clients.

Le deuxième ensemble d'accolades est remplacé par la valeur trouvée dans la colonne Name de cette table.

Bien que la colonne Client montre la valeur que nous voulons, nous ne pouvons pas utiliser `$Client` comme nous l'avons fait avec `$Name`. Cela est dû au fait que la colonne Client est une colonne de référence. Elle fait référence à l'**entier** enregistrement mais utilise la valeur de la colonne Name de la table Clients comme représentation visuelle de cet enregistrement. Dans le panneau de configuration de la colonne sur le côté droit, nous pouvons changer quelle valeur de colonne nous voyons pour l'enregistrement. Dans la capture d'écran ci-dessous, 'Show Column' a été changé de Name à Email.

<span class="screenshot-large">*![reference-client-email](images/formula-cheat-sheet/reference-client-email.png)*</span>
{: .screenshot-half }

Cela ne change pas les données, cela change simplement l'étiquette sur ces données dans la colonne Client. Cela pointe toujours vers le même enregistrement mais montre maintenant une étiquette différente. `$Client.Name` tire le Nom pour l'enregistrement qui est référencé dans la colonne Client, peu importe l'étiquette que nous voyons.

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder){:target="\_blank"} template**

<span class="screenshot-large">*![combining-text-components](images/formula-cheat-sheet/combining-text-components.png)*</span>

La formule utilisée dans la colonne All Components de la carte CONTRACT_BUILDER est :
```
'\n'.join(sorted(
  "{} — {:g} {}".format(comp.Component, quantity, comp.Unit)
  for (comp, quantity) in $Components.items()
))
```
Nous utilisons la méthode [join()](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"}, la fonction [sorted()](https://www.w3schools.com/python/ref_func_sorted.asp){:target="\_blank"} et la méthode [format()](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"} toutes en une seule fois !

`'\n'.join()` ajoute une nouvelle ligne entre chaque élément de la liste.

`sorted()` trie les éléments de la liste par ordre alphabétique.

Cela nous laisse avec le suivant :

```
"{} — {:g} {}".format(comp.Component, quantity, comp.Unit)
  for (comp, quantity) in $Components.items()
```
Nous allons travailler à l'envers. Tout d'abord, nous devons examiner la colonne Components qui est une [colonne cachée](page-widgets.md#configuring-field-lists) dans la table All Contracts.

<span class="screenshot-large">*![combining-text-components-hidden](images/formula-cheat-sheet/combining-text-components-hidden.png)*</span>

Cette colonne est une liste de composants et de leurs quantités associées pour le contrat. Dans la boucle `for`, nous assignons chaque élément de la liste de composants à deux variables, comp et quantity. Pour `Components[3]: 6.0`, comp = `Components[3]` et quantity = `6.0`. `Components[#]` spécifie un Composant dans la table Components par ID de ligne. `Components[3]` est le composant assigné `3` comme son ID de ligne.

<span class="screenshot-large">*![components-row-id](images/formula-cheat-sheet/components-row-id.png)*</span>
{: .screenshot-half }

Maintenant, nous exécutons chaque élément de la liste ci-dessus à travers l'équation `"{} — {:g} {}".format(comp.Component, quantity, comp.Unit)`.

`comp.Component` remplace le premier ensemble de `{}`. `comp` est la variable avec notre ID de composant donc `comp.Component` trouve la valeur dans la colonne Component associée à cet ID de ligne. Pour `Components[3]`, `comp.Component` est Nozzle.

`quantity` remplace le deuxième ensemble de `{}`. Encore une fois, la quantité est la deuxième variable dans notre liste. Pour `Components[3]: 6.0`, quantity est `6.0`. Notre deuxième ensemble de `{}` n'est pas vide. Ils incluent `:g`*. Cela convertit la valeur en un nombre à virgule flottante.

`comp.Unit` remplace le dernier ensemble de `{}`. `comp` est la variable avec notre ID de composant donc `comp.Unit` trouve la valeur dans la colonne Unit associée à cet ID de ligne. Pour `Components[3]`, `comp.Unit` est `None`.

*Notez que `{:g}` formate les nombres à virgule flottante d'une manière particulière qui omet les décimales lorsqu'elles ne sont pas nécessaires. Il existe de nombreuses options disponibles dans les espaces réservés pour formater des nombres, des dates, etc. En savoir plus sur les espaces réservés [ici](https://www.w3schools.com/python/ref_string_format.asp){:target="\_blank"}.

**[Email Contacts](https://templates.getgrist.com/3HfynRQwpHPy/Email-Contacts){:target="\_blank"} template**

<span class="screenshot-large">*![combining-text-email](images/formula-cheat-sheet/combining-text-email.png)*</span>

La formule utilisée dans la colonne Body de la table Advanced Compose est :
```
"Dear %s,\n\nWelcome to the %s team!" % ($Contact_Name_as_Plaintext, $Team)
```
Cette technique utilise l'opérateur `%` au lieu de la méthode `format()`. Les spécificateurs de format commencent par `%` suivi d'un caractère qui représente le type de données. `%s` est un espace réservé pour une chaîne. Le premier `%s` est remplacé par la valeur trouvée dans la colonne "Contact Name as Plaintext" qui est une [colonne cachée](page-widgets.md#configuring-field-lists) et le deuxième `%s` est remplacé par la valeur dans la colonne Team.

`\n` ajoute une nouvelle ligne.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Division de Chaînes de Texte

Divisez une chaîne en utilisant la méthode [split()](https://docs.python.org/3/library/stdtypes.html#str.split){:target="\_blank"} de Python. Si le Nom Complet est `George Washington`, `$Full_Name.split(" ")` renverrait `[George, Washington]`.

<span></span><details><summary>
#### Exemple de Division de Chaînes de Texte
</summary>

**Exemple Communautaire : [Colors](https://public.getgrist.com/2tv3e8qxpNFP/Community-715/p/2){:target="\_blank"}**

<span class="screenshot-large">*![split-hyperlink](images/formula-cheat-sheet/split-hyperlink.png)*</span>

La formule dans la colonne "Color Reference (Just URL)" de la Table 2 est :
```
split = $Color_Reference.Color.split(" ")
return split[-1]
```
`$Color_Reference.Color` utilise la colonne de référence, "Color Reference" pour tirer des données de la table qu'elle référence, Table 1. Spécifiquement, elle tire la valeur de la colonne Color de Table 1.

Color est une colonne de texte qui contient un hyperlien avec une étiquette. Nous ne voyons que l'étiquette dans Table 1 mais comme vous pouvez le voir dans la capture d'écran ci-dessus, la valeur dans la cellule 'pink' est développée pour montrer toute la chaîne qui contient "pink" suivie de l'URL. Vous pouvez également voir cela dans la colonne "Color Reference" de la Table 2. Nous voulons obtenir le lien par lui-même dans "Color Reference (Just URL)". Nous pouvons le faire en utilisant la méthode [split()](https://docs.python.org/3/library/stdtypes.html#str.split){:target="\_blank"} de Python.

`.split(" ")` nous permet de diviser la chaîne partout où il y a un espace `(" ")`. Dans la colonne Color, il y a une étiquette suivie d'un espace suivi de l'URL. La valeur de la colonne Color est divisée en une liste contenant deux éléments `Label` et `URL`. Cette liste est assignée à la variable `split`.

Nous voulons renvoyer le dernier élément de la liste `split` afin d'obtenir notre `URL`. Le dernier élément d'une liste a toujours l'index `[-1]`. `return split[-1]` renvoie le dernier élément de la liste `split`.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Lien Direct vers l'Historique Gmail pour un Contact

Si vous stockez des contacts dans Grist et utilisez Gmail pour les email, vous pouvez créer une formule qui ouvrira Gmail sur une liste de conversations avec ce contact.

**Lisez à ce sujet dans la Communauté :** [Afficher l'historique Gmail pour un contact particulier](https://community.getgrist.com/t/pull-up-gmail-history-for-a-particular-contact/517){:target="\_blank"}

<span></span><details><summary>
#### Dépannage
</summary>
Votre URL s'affiche-t-elle toujours après avoir ajouté une étiquette ? Assurez-vous que votre Type de Colonne est Texte et que le Format de Cellule est Hyperlien.

<span class="screenshot-large">*![text-hyperlink](images/formula-cheat-sheet/text-hyperlink.png)*</span>

</details>
</section>

<span></span><section class="cheat-sheet">
#### Joindre une Liste de Chaînes

Lorsque vous souhaitez joindre une liste de chaînes, vous pouvez utiliser la méthode [join() de Python](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"}.

<span></span><details><summary>
#### Exemple de Jointure d'une Liste
</summary>
**Exemple Communautaire : [.join() Exemple](https://public.getgrist.com/2L3J99j7zW23/join-Example/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![join-list-values-example](images/formula-cheat-sheet/join-list-values-example.png)*</span>

La formule utilisée dans la colonne Advertisement de la table 2022 Grand Openings est :
```
"Coming soon to a city near you!\n" + " : ".join($New_Location_s_in_2022)
```
Ici, nous joignons plusieurs chaînes pour créer notre publicité.

`"Coming soon to a city near you!\n"` est renvoyé presque exactement comme nous le voyons, à l'exception des guillemets `""` et `\n` à la fin de la chaîne.

Les guillemets `""` spécifient qu'il s'agit d'une chaîne et `\n` est en fait un caractère de nouvelle ligne qui peut être utilisé pour spécifier une nouvelle ligne dans une chaîne.

`" : ".join($New_Location_s_in_2022)` est également une chaîne mais utilise la méthode [join() de Python](https://www.w3schools.com/python/ref_string_join.asp){:target="\_blank"} pour joindre les valeurs de notre colonne de [liste de choix](col-types.md#choice-list-columns), "New Locations in 2022". Ce que nous voyons entre guillemets avant `.join` est ce qui séparera chaque valeur de notre liste.

Dans cet exemple, chaque valeur est séparée par un espace, `:` et un autre espace.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Trouver des Doublons

Vous pouvez trouver des doublons dans une colonne en utilisant soit le formatage conditionnel, soit une colonne d'aide.

**Lisez à ce sujet dans la Communauté :** [Assurer des valeurs uniques ou détecter des doublons](https://community.getgrist.com/t/ensure-unique-values-or-detect-duplicates/76){:target="\_blank"}

<span></span><details><summary>
#### Exemple de Trouver des Doublons
</summary>
**Exemple Communautaire : [Finding Duplicates](https://public.getgrist.com/3CJkcpF7wu9Q/-1790/p/4){:target="\_blank"}**

<span class="screenshot-large">*![duplicates-single-column](images/formula-cheat-sheet/duplicates-single-column.png)*</span>

La formule utilisée dans la colonne Duplicate? de la table Duplicates est :
```
len(Duplicates.lookupRecords(Grocery_List=$Grocery_List))>1
```

Décomposons cela, en travaillant de l'intérieur vers l'extérieur.
```
Duplicates.lookupRecords(Grocery_List=$Grocery_List)
```
Ceci est une fonction [lookupRecords](functions.md#lookuprecords) qui suit le format :
```
[Table_Name].lookupRecords([A]=$[B])
``` 
Où `[Table_Name]` est le nom de la table dans laquelle vous souhaitez rechercher des données. `[A]` est la colonne dans la table étant recherchée (nommée au début de la formule) et `[B]` est la colonne dans la table actuelle / la table dans laquelle vous entrez la formule.

Cette formule recherche des enregistrements dans la table Duplicates où un enregistrement dans la colonne Grocery List correspond à un autre enregistrement dans la même colonne.

`len()` compte le nombre d'enregistrements dans notre liste. Puisque chaque doublon correspondra à l'autre, il devrait apparaître deux fois dans notre liste. C'est pourquoi `len() > 1`.

Si `len() > 1`, la formule est vraie. Si `len() <= 1`, la formule est fausse.

Cette même formule peut être utilisée dans le formatage conditionnel. Cela peut être vu dans la colonne 'Grocery List' de la table Duplicates.

<span class="screenshot-large">*![duplicates-single-conditional-formatting](images/formula-cheat-sheet/duplicates-single-conditional-formatting.png)*</span>

Si `len() > 1`, notre formule est vraie et la couleur de cellule conditionnelle est appliquée à ces cellules.

Si `len() <= 1`, notre formule est fausse et la couleur de cellule reste inchangée.

</details>

</section>

<span></span><section class="cheat-sheet">
#### Utilisation de l'Identifiant Unique d'un Enregistrement dans les Formules

Lorsqu'un enregistrement est créé, il se voit attribuer un ID numérique (disponible sous la forme `$id` dans les formules) qui est unique au sein de cette table. Vous pouvez révéler l'ID de ligne en ajoutant une colonne de formule où la formule est `$id`{: .formula}.

<span></span><details><summary>
#### Exemples d'Utilisation de l'ID de Ligne dans les Formules
</summary>
Vous pouvez révéler l'ID avec la formule `$id`

<span class="screenshot-large">*![row-id](images/formula-cheat-sheet/row-id.png)*</span>
{: .screenshot-half }

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder){:target="\_blank"} template**

<span class="screenshot-large">*![row-id-trigger](images/formula-cheat-sheet/row-id-trigger.png)*</span>

La formule utilisée dans la colonne Contract No de la table Contract Builder est :
```
$id + 500
```
Ici, nous utilisons une formule d'initialisation pour créer un numéro de contrat unique lors de la création d'un enregistrement.

**[Class Enrollment](https://templates.getgrist.com/doc/afterschool-program){:target="\_blank"} template**

<span class="screenshot-large">*![id-reverse-lookup](images/formula-cheat-sheet/id-reverse-lookup.png)*</span>

La formule utilisée dans la colonne Count de la table des Classes est :
```
len(Enrollments.lookupRecords(Class=$id, Status="Confirmed"))
```
Ceci est appelé une recherche inversée. Nous pouvons utiliser l'ID de ligne pour faire correspondre un enregistrement dans une autre table où une colonne de référence est utilisée. LookupRecords suit le format `[Table_Name].lookupRecords([A]=$[B])`. `[Table_Name]` est le nom de la table dans laquelle vous souhaitez rechercher des données. `[A]` est la colonne dans la table étant recherchée (nommée au début de la formule) et `[B]` est la colonne dans la table actuelle / la table dans laquelle vous entrez la formule. Lookup Records crée une liste d'enregistrements qui correspondent aux critères énumérés. `len()` compte combien d'enregistrements sont dans cette liste.

Ici, nous recherchons des enregistrements dans la table Enrollments où l'enregistrement mentionné dans la colonne Class (notre colonne de référence) a le même ID de ligne que la ligne dans la table dans laquelle vous entrez la formule. De plus, la valeur dans la colonne Status de la table Enrollments est `Confirmed`. Nous allons décomposer cela.

La table dans laquelle nous recherchons des enregistrements est la table Enrollments. Nos critères proviennent de la colonne Class et de la colonne Status. Le critère pour Status est simple ; la valeur doit être `Confirmed` pour être incluse dans notre liste d'enregistrements. Class est un peu plus compliqué. Comme nous le voyons dans la capture d'écran ci-dessous, Class est une colonne de référence qui tire des données de la table Classes. Ici, la colonne Class montre la valeur de la colonne Class Code de la table Classes mais elle pointe vers l'enregistrement entier où le code de classe est `2018F-Stars`.

<span class="screenshot-large">*![id-reference-class-code](images/formula-cheat-sheet/id-reference-class-code.png)*</span>

Une colonne de référence pointe vers l'**entier** enregistrement, pas seulement la valeur que vous voyez ici dans la colonne Class. En utilisant le panneau de configuration sur le côté droit de l'écran, vous pouvez choisir n'importe quelle colonne de la table d'origine à afficher. Pour cet exemple, la colonne Class montre la valeur de la colonne Class Code de la table Classes mais elle pointe vers l'enregistrement entier où le code de classe est `2018F-Stars`.

<span class="screenshot-large">*![id-class-id](images/formula-cheat-sheet/id-class-id.png)*</span>

Comme vous pouvez le voir dans cette capture d'écran, l'ID de ligne pour cet enregistrement particulier est `2` et parce que nous calculons le Count pour la ligne avec `Row ID = 2`, il comptera tous les enregistrements dans la table Enrollment où Class montre `2018F-Stars` et Status est `Confirmed`.

**[Restaurant Custom Orders](https://templates.getgrist.com/e4gEm7dt4cgB/Restaurant-Custom-Orders){:target="\_blank"} template**

<span class="screenshot-large">*![inequality-restaurant-bom](images/formula-cheat-sheet/inequality-restaurant-bom.png)*</span>

La formule d'initialisation utilisée dans la colonne BOM # de la table Bill of Materials est :
```
MAX(o.BOM_ for o in Bill_Of_Materials.all if o.id != $id) + 1
```
Tout d'abord, nous allons examiner la formule à l'intérieur des parenthèses, puis travailler vers l'extérieur.

Ici, `o` est une variable représentant chaque enregistrement dans notre table. `o.BOM_` représente le BOM # pour chaque enregistrement et `o.id` représente l'ID de ligne pour chaque enregistrement. C'est une boucle `for` qui crée une liste des BOM # pour chaque enregistrement dans la table Bill of Materials lorsque l'ID d'enregistrement n'est pas égal à l'ID de cette ligne.

`MAX()` trouve le maximum des BOM # dans la liste puis `+ 1` pour obtenir notre valeur finale.

C'est une formule d'initialisation qui ne s'applique qu'aux nouveaux enregistrements. Lorsqu'un nouvel enregistrement est créé, la formule trouve le plus grand BOM # dans la table puis ajoute 1 pour que nous ayons un BOM # unique pour le nouvel enregistrement.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Suppression des Doublons d'une Liste

Vous pouvez supprimer des doublons d'une liste avec l'aide de la méthode [set()](https://docs.python.org/3/tutorial/datastructures.html#sets){:target="\_blank"} de Python.

<span></span><details><summary>
#### Exemple de Suppression des Doublons d'une Liste
</summary>

**Exemple Communautaire : [Removing Duplicates From a List](https://public.getgrist.com/3pZUMdP2bJx6/1957/p/3){:target="\_blank"}**

<span class="screenshot-large">*![removing-duplicates](images/formula-cheat-sheet/removing-duplicates.png)*</span>

La formule dans la colonne All Divisions de la table Abroad Trips est :
```
confirmed_div = $Attending_Confirmed.Role_Division.Division
pending_div = $Attending_Pending.Role_Division.Division
full_list = confirmed_div + pending_div
return sorted(set(full_list))
```
Nous allons décomposer cela ligne par ligne.

Attending-Confirmed est une colonne de liste de référence qui tire des données de la table EMPLOYEES. `$Attending_Confirmed.Role_Division` tire la valeur de la colonne Role Division de la table EMPLOYEES. La colonne Role Division dans la table EMPLOYEES est elle-même une colonne de référence, qui pointe vers un enregistrement dans la table Divisions. [Chaining](references-lookups.md#chaining) nous permet de spécifier quelles informations nous voulons de cet enregistrement. Dans ce cas, nous voulons la Division. Nous développons notre formule pour `$Attending_Confirmed.Role_Division.Division`. La Division est trouvée pour chaque employé listé dans la colonne Attending-Confirmed, créant une liste. Nous assignons cette liste de divisions à la variable `confirmed_div`.

Attending-Pending est également une colonne de liste de référence qui tire des données de la table EMPLOYEES. `$Attending_Pending.Role_Division.Division` fait la même chose que ci-dessus sauf que maintenant nous tirons la division pour chaque employé dans la colonne Attending-Pending. Nous assignons cette liste à la variable `pending_div`.

Nous créons une liste de toutes les divisions en ajoutant les deux listes ensemble et en assignant cette liste combinée à la variable `full_list`.

`return sorted(set(full_list))` utilise d'abord la méthode [set()](https://docs.python.org/3/tutorial/datastructures.html#sets){:target="\_blank"} de Python pour créer une liste sans doublons. Nous utilisons ensuite la méthode [sorted()](https://docs.python.org/3/library/functions.html#sorted){:target="\_blank"} pour renvoyer notre ensemble de divisions, trié par ordre alphabétique.

Notez que la formule ci-dessus peut être simplifiée encore plus à :
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
#### Définir des Valeurs par Défaut pour de Nouveaux Enregistrements

Vous pouvez définir des valeurs par défaut pour lorsque un nouvel enregistrement est créé et vous épargner le tracas de devoir remplir les mêmes champs avec les mêmes valeurs encore et encore.

**Lisez à ce sujet dans la Communauté :** [Valeurs par défaut sur le widget](https://community.getgrist.com/t/default-values-on-the-widget/689/4){:target="\_blank"}

</section>

## Travailler avec des dates et des heures

<span></span><section class="cheat-sheet">
#### Tampons Automatiques de Date, Heure et Auteur

Vous pouvez automatiquement ajouter la date ou l'heure à laquelle un enregistrement a été créé ou mis à jour ainsi que qui a effectué le changement.

<span></span><details><summary>
#### Exemples de Tampons Automatiques de Date, Heure et Auteur
</summary>
**[Grant Application Tracker](https://templates.getgrist.com/sC5CAW41bVZU/Grant-Application-Tracker){:target="\_blank"} template**

<span class="screenshot-large">*![date-time-trigger-formula](images/formula-cheat-sheet/date-time-trigger-formula.png)*</span>

La formule utilisée dans la colonne Last Updated de la table Tasks est :
```
NOW()
```
C'est une [formule d'initialisation](formulas.md#trigger-formulas) qui se déclenche lorsqu'un changement est effectué dans n'importe quel champ pour cet enregistrement. Lorsqu'un changement est effectué, cette formule exécute son calcul. `NOW()` calcule l'heure et la date actuelles pour le [fuseau horaire](dates.md#time-zones) sélectionné.

<span class="screenshot-large">*![created-by-trigger](images/formula-cheat-sheet/created-by-trigger.png)*</span>

La formule utilisée dans la colonne Created By de la table Tasks est :
```
user.Name
```
C'est une [formule d'initialisation](formulas.md#trigger-formulas) qui se déclenche lorsqu'un nouvel enregistrement est créé. Lorsque l'enregistrement est créé, cette formule exécute son calcul. `user.Name` recherche le compte utilisateur qui est connecté à Grist et renvoie le nom associé à ce compte.

</details>

<span></span><details><summary>
#### Dépannage des Erreurs
</summary>
Si la valeur de temps dans votre colonne datetime ne se calcule pas, vérifiez votre formule. Si `TODAY()` est utilisé dans DateTime, l'heure affichera toujours 12:00 am comme vous le voyez ci-dessous. `NOW()` est utilisé pour les colonnes DateTime. `TODAY()` est utilisé pour la Date.

<span class="screenshot-large">*![today-vs-now-error](images/formula-cheat-sheet/today-vs-now-error.png)*</span>

<span></span><div class="deflist">

- `#AttributeError`

    Vous avez probablement entré `user.name` mais la formule est `user.Name`. Faites attention à la capitalisation !

- `#NameError`

    Vous avez peut-être entré `username` ou `userName`. La formule correcte est `user.Name`. 

Une autre possibilité est que cela a été entré en tant que colonne de formule plutôt qu'en tant que colonne de formule d'initialisation. Convertissez-la en formule d'initialisation et cela devrait résoudre le problème.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Filtrer les Données dans une Durée Spécifiée

En utilisant la fonction [`DATEADD()`](functions.md#dateadd) et les [opérateurs de comparaison](#comparing-values), vous pouvez déterminer si une date tombe dans une plage spécifique puis appliquer un filtre.

<span></span><details><summary>
#### Exemple de Filtrage des Données qui 'Tombe dans une Plage de 1 Mois'
</summary>

**Exemple Communautaire :** [Filtrage des Données dans une Plage de 1 Mois](https://public.getgrist.com/4zxVeFtGNt7n/1844){:target="\_blank"}

<span class="screenshot-large">*![1-month-range](images/formula-cheat-sheet/1-month-range.png)*</span>
La formule utilisée dans la colonne Falls in 1 Month Range? de la table Interactions est :
```
TODAY() >= $Date >=  DATEADD(TODAY(),months=-1)
```
[`TODAY()`](functions.md#today) renvoie la date actuelle.

`$Date` est le nom d'une colonne dans notre table, qui est de type [Date](col-types.md#date-columns).

[`DATEADD(start_date, days=0, months=0, years=0, weeks=0)`](functions.md#dateadd) renvoie la date qui est le nombre donné de jours, mois, années ou semaines avant ou après la `start_date`. Dans cet exemple, elle renvoie la date qui est un mois avant la date de départ, `TODAY()`.

Cette formule est vraie si la valeur de date dans la colonne Date tombe entre `TODAY()` et notre date `DATEADD()` qui est un mois auparavant. Si la valeur de date dans la colonne Date ne tombe pas entre ces deux dates, la formule renvoie faux.

Nous pouvons utiliser cette colonne pour filtrer nos données. Si nous ne voulons voir que les interactions qui tombent dans la Plage de 1 Mois, nous filtrerions pour n'inclure que les valeurs `true`. Si nous voulons voir les interactions qui tombent en dehors de la Plage de 1 Mois, nous filtrerions pour n'inclure que les valeurs `false`.

<span class="screenshot-large">*![add-filter](images/formula-cheat-sheet/add-filter.png)*</span>

</details>

<span></span><details><summary>
#### Dépannage des Erreurs
</summary>

<span></span><div class="deflist">

- `#TypeError` :

    <span class="screenshot-large">*![1-month-range-type-error](images/formula-cheat-sheet/1-month-range-type-error.png)*</span>

    Parce que `$Date` est une colonne de type [Date](col-types.md#date-columns), `TODAY()` doit être utilisé dans les formules comparant des dates. [`NOW()`](functions.md#now) est une formule DateTime qui ne doit être utilisée qu'avec d'autres valeurs DateTime. Par exemple, si la colonne `$Date` était une colonne de type [DateTime](col-types.md#datetime-columns), `NOW()` devrait être utilisé plutôt que `TODAY()` car il inclut le composant temps.

    `NOW()` est date et heure. `TODAY()` est seulement date.
</div>

</details>
