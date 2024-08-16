Aide-mémoire des formules
=========

Grist dispose d'un moteur de données puissant pour calculer les cellules de vos tables à l'aide de formules. Les formules Grist sont écrites en [Python](https://docs.python.org/3/library/){:target="\_blank"}, le langage le plus populaire pour la science des données. Nous avons également une suite de [fonctions](functions.md) similaires à celles d'Excel, avec des noms en majuscules. Voici quelques notes utiles :

- Les formules s'appliquent à toute la colonne
- Les champs sont inclus dans les formules sous la forme `$ColumnID`.
- Python est sensible à la casse, y compris pour les noms de tables et de colonnes Grist. Si votre ID de colonne est `title`, la formule utilisera `$title`, où les deux sont en minuscules.
- Vous pouvez écrire du Python multi-lignes dans les formules (utilisez <code class="keys">*Shift* + *Enter*</code> pour ajouter des lignes), y compris des déclarations, des variables, des imports, etc.
- Le code Grist s'exécute dans une sandbox sécurisée, sans accès à quoi que ce soit en dehors de votre document.

Si vous ne trouvez pas ce que vous cherchez, postez sur le [Forum Communautaire](https://community.getgrist.com/) et nous pourrons vous aider !

## Fonctions Mathématiques

<span></span><section class="cheat-sheet">
#### Mathématiques simples (addition, soustraction, multiplication, division)

Utilise les opérateurs `+` , `-` , `/` et `*` pour effectuer des calculs.

<span></span><details><summary>
#### Exemple de mathématiques simples
</summary>

Chestwood Art Studio expédie des œuvres d'art à travers le pays et propose des paiements mensuels sur une période de 12 mois.

Nous avons le sous-total, la taxe (en fonction de l'état où il est expédié) et le montant dû mensuellement. Cette colonne de formule utilise l'addition, la multiplication et la division.

<span class="screenshot-large">*![simple-math](images/formula-cheat-sheet/simple-math.png)*</span>

La formule utilisée ici est :
```
($Subtotal + ($Subtotal*$Tax)) / 12
```
Nous ajoutons le sous-total à la taxe calculée, puis nous divisons cela par 12 mois pour obtenir notre montant dû mensuellement.
</details>

<span></span><details><summary>
#### Dépannage des erreurs
</summary>

`#TypeError`: Confirmez que toutes les colonnes utilisées dans la formule sont de type [Numérique](col-types.md#numeric-columns).
</details>
</section>

<span></span><section class="cheat-sheet">
#### max et min

Vous permet de trouver les valeurs [max](functions.md#max) ou [min](functions.md#min) dans une liste.

<span></span><details><summary>
#### Exemples utilisant MAX() et MIN()
</summary>
*[MAX()](functions.md#max) et [MIN()](functions.md#min) en majuscules sont des fonctions de feuille de calcul qui nécessitent une syntaxe spécifique. La syntaxe des formules de feuille de calcul est résumée dans notre [référence des fonctions](functions.md). max() et min() en minuscules sont des fonctions Python.*

**Max**: Tableau des Classes du modèle [Class Enrollment](https://templates.getgrist.com/doc/afterschool-program){:target="\_blank"}.

<span class="screenshot-large">*![max](images/formula-cheat-sheet/max.png)*</span>

La formule utilisée dans la colonne 'Spots Left' du tableau des Classes est :
```
max($Max_Students - $Count, 0) or "Full"
```
Cette formule montre le nombre de places restantes dans une classe, ou le texte 'Full' lorsque la classe est complète ou sursouscrite.

Nous construisons une liste entre les parenthèses composée de deux éléments : `$Max_Students - $Count` et `0`. La formule renvoie le plus grand des deux.

Lorsque `$Count` est inférieur à `$Max_Students`, la différence `$Max_Students - $Count` est positive et représente les places restantes dans la classe. Lorsque `$Count` dépasse `$Max_Students`, alors la classe est complète ou sursouscrite, et `$Max_Students - $Count` est négatif. Le maximum d'un nombre négatif et de 0 sera 0, donc `max($Max_Students - $Count, 0)` est 0. Cela représente une classe complète. L'ajout de `or "Full"` est appliqué lorsque la valeur est fausse, ce qui signifie qu'un 0 est remplacé par le texte `"Full"`.

**Min**: Tableau des Contacts du modèle [Lightweight CRM](https://templates.getgrist.com/doc/lightweight-crm){:target="\_blank"}.

<span class="screenshot-large">*![min](images/formula-cheat-sheet/min.png)*</span>

La formule utilisée dans la colonne 'Due' du tableau des Contacts est :
```
items = Interactions.lookupRecords(Contact=$id, Type="To-Do")
return min(items.Date) if items else None
```
Décomposons cela.

`Interactions.lookupRecords(Contact=$id, Type="To-Do")` trouve tous les enregistrements dans le tableau Interactions où les Contacts correspondent et le Type est To-Do. Cela renvoie une liste d'enregistrements que nous assignons à la variable `items`.

Ensuite, nous utilisons la [notation par points](references-lookups.md#reference-columns-and-dot-notation) pour trouver toutes les Dates assignées aux enregistrements de notre liste `items`. Ces dates sont évaluées pour trouver la date minimale. C'est la valeur qui est renvoyée. Ainsi, nous voyons la date de la tâche qui est due le plus tôt.

S'il n'y a pas d'éléments dans la liste, rien n'est renvoyé et le champ reste vide.

Dans l'exemple de MAX(), la liste contient deux éléments : `$Max_Students - $Count` et `0`, et la formule renvoie le plus grand. Dans l'exemple de min(), la variable `items` tire une liste d'enregistrements basée sur les arguments de [lookupRecords](references-lookups.md#lookuprecords), liste les dates et renvoie la plus petite date. Notez qu'il s'agit d'une fonction Python. Si nous avions écrit la formule comme MIN(), une fonction de feuille de calcul, la formule ne fonctionnerait pas car la formule de feuille de calcul nécessite un [format très spécifique](functions.md#min).

</details>
</section>

<span></span><section class="cheat-sheet">
#### Sum

Utilisez la fonction [SUM()](functions.md#sum) lorsque vous souhaitez additionner une liste de valeurs disponibles dans une cellule. Si vous souhaitez additionner les valeurs d'une colonne, utilisez les [Tableaux de synthèse](summary-tables.md).

<span></span><details><summary>
#### Exemple de SUM()
</summary>

**[Custom Product Builder](https://templates.getgrist.com/gZmzYoGdS6b1/Custom-Product-Builder/p/6){:target="\_blank"} modèle**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-custom-product-builder.png)*</span>

La formule utilisée dans la colonne Total Cost du tableau Select or Add New Products est :
```
SUM($Requirements.Cost)
```
La colonne Requirements est une [colonne cachée](page-widgets.md#configuring-field-lists) dans ce tableau. C'est une colonne de liste de références qui tire les données du tableau Build Requirements.

Notre formule utilise la colonne Requirements pour accéder au tableau Build Requirements puis tire le coût de chaque enregistrement dans le tableau.

Nous utilisons SUM() pour additionner les coûts de chaque enregistrement.

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} modèle**

<span class="screenshot-large">*![sum](images/formula-cheat-sheet/sum-inventory-manager.png)*</span>

La formule utilisée dans la colonne Received du tableau All Products est :
```
SUM(Incoming_Order_Line_Items.lookupRecords(SKU=$id).Received_Qty)
```
Nous utilisons la fonction [lookupRecords](functions.md#lookuprecords) pour trouver tous les enregistrements dans le tableau Incoming Order Line Items où le SKU correspond au SKU de cette ligne, puis tirer la valeur dans la colonne Received Qty pour chacun de ces enregistrements. Nous utilisons SUM() pour trouver la somme de ces valeurs.

Les colonnes Qty on Order et Sold du tableau [All Products](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/1){:target="\_blank"} sont également de bons exemples de la fonction SUM().

**Consultez un autre exemple dans notre Forum Communautaire :** [Créer une somme de bénéfice net et brut à partir de plusieurs tables](https://community.getgrist.com/t/creating-a-sum-of-net-and-gross-profit-from-multiple-tables/668){:target="\_blank"}
</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparaison pour l'égalité : == et !=

Lors de la comparaison pour l'égalité en Python, nous utilisons `==` pour 'égal' et `!=` pour 'n'est pas égal'. Si `$A` est 2 et `$B` est 3, la formule `$A == $B` renverrait `False`, tandis que la formule `$A != $B` serait `True`.

<span></span><details><summary>
#### Exemples utilisant `==`
</summary>

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/10){:target="\_blank"} modèle**

<span class="screenshot-large">*![equality-received-qty](images/formula-cheat-sheet/equality-received-qty.png)*</span>

La formule utilisée dans la colonne Received Qty du tableau Incoming Order Line Items est :
```
if $Order.Status =='Received':
  return $Qty
else:
  return None
```
La colonne Order du tableau Incoming Order Line Items est une colonne de référence qui pointe vers la colonne Order Number du tableau Incoming Orders. `$Order.Status` utilise la notation par points pour tirer la valeur de la colonne Status du tableau Incoming Orders. Si la valeur dans cette colonne est égale à `Received`, la valeur de la colonne Qty sera renvoyée. Si la valeur n'est pas égale à `Received`, rien n'est renvoyé.

<span class="screenshot-large">*![equality-date-received](images/formula-cheat-sheet/equality-date-received.png)*</span>

La formule utilisée dans la colonne Date Received du tableau [Create New Order](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager/p/16#a1.s35.r11.c82){:target="\_blank"} est :
```
if $Status == "Received":
  return NOW()
```
C'est une [formule déclencheur](formulas.md#trigger-formulas) qui est déclenchée lorsqu'un changement est apporté à la colonne Status. Si la valeur dans la colonne Status est égale à `Received`, la date actuelle est renvoyée. Si les valeurs ne sont pas égales, rien n'est renvoyé.

</details>
<span></span><details><summary>
#### Exemples utilisant `!=`
</summary>

**[Project Management](https://templates.getgrist.com/hifkng53AxyQ/Project-Management/p/9){:target="\_blank"} modèle**

<span class="screenshot-large">*![inequality-missed-deadline](images/formula-cheat-sheet/inequality-missed-deadline.png)*</span>

La formule utilisée dans la colonne Missed Deadline du tableau Missed Deadline est :
```
TODAY()> $Due_Date and $Status != "Completed"
```
Si la date actuelle est supérieure à la date donnée dans la colonne Due Date **et** que la valeur dans la colonne Status n'est pas égale à `Completed`, la formule est `True`. Si l'une de ces déclarations est fausse, la formule est `False`.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Comparaison des valeurs : < , > , <= , >=

Vous permet de comparer des valeurs numériques. Si Sales est égal à `1200` et Running_Cost est égal à `1650`, `"Gains" if $Sales > $Running_Cost else "Loss"` renverrait `Loss`.

<span></span><details><summary>
#### Exemples de comparaison des valeurs
</summary>

**[Inventory Manager](https://templates.getgrist.com/sXsBGDTKau1F/Inventory-Manager){:target="\_blank"} modèle**

<span class="screenshot-large">*![comparing-values-stock-alert](images/formula-cheat-sheet/comparing-values-stock-alert.png)*</span>

La formule utilisée dans la colonne Stock Alert du tableau All Products est :
```
if $In_Stock + $QTY_on_Order > 5:
  return "In Stock"
if $In_Stock + $QTY_on_Order > 0:
  return "Low Stock"
else:
  return "OUT OF STOCK"
```
Ici, nous avons deux déclarations **if-return** différentes ; si `x` est vrai, renvoyer `some_value`. Une fois qu'une déclaration est vraie et qu'une valeur est renvoyée, la formule s'arrête. Si les deux sont fausses, `OUT OF STOCK` est renvoyé.

Tout d'abord, si la valeur dans la colonne In Stock plus la valeur dans la colonne Qty On Order sont supérieures à 5, renvoyer "In Stock".

Ensuite, si la valeur dans la colonne In Stock plus la valeur dans la colonne Qty On Order sont supérieures à 0, renvoyer "Low Stock". Il est implicite que la valeur est inférieure ou égale à 5 car la première déclaration doit être fausse pour que celle-ci soit évaluée.

Enfin, si toutes les déclarations sont fausses, renvoyer "OUT OF STOCK".

**[Internal Links Tracker for SEO](https://templates.getgrist.com/j9ZH7rPGafbH/Internal-Links-Tracker-for-SEO){:target="\_blank"} modèle**

<span class="screenshot-large">*![comparing-values-orphaned](images/formula-cheat-sheet/comparing-values-orphaned.png)*</span>

La formule utilisée dans la colonne Orphaned? du tableau Orphaned Pages est :
```
len(Links.lookupRecords(To=$id))<1
```
Nous utilisons la fonction [lookupRecords](functions.md#lookuprecords) pour trouver tous les enregistrements dans le tableau Links où le lien dans la colonne To correspond au lien indiqué dans la colonne Slug de cette ligne.

Nous utilisons [len()](functions.md#len) pour compter le nombre d'enregistrements trouvés. Si c'est inférieur à 1, la formule est évaluée comme vraie et la case à cocher sera cochée. Si c'est égal ou supérieur à 1, la formule est évaluée comme fausse.

</details>
</section>

<span></span><section class="cheat-sheet">
#### Conversion de chaîne en flottant

**[String](https://www.w3schools.com/python/python_strings.asp){:target="\_blank"}** : Une séquence de caractères ou des extraits de texte. Dans le code, les chaînes sont entre guillemets, par exemple `'Hello'` ou `"-12"` (ce sont trois caractères entre guillemets, par opposition à un nombre négatif). Voir [Fonction Python str()](https://www.w3schools.com/python/ref_func_str.asp){:target="\_blank"} pour convertir une valeur spécifiée en chaîne.

**[Float](https://www.w3schools.com/python/gloss_python_float.asp){:target="\_blank"}** : Nombres réels pouvant stocker des valeurs décimales. Également appelé nombre à virgule flottante. Voir [Fonction Python float()](https://www.w3schools.com/python/ref_func_float.asp){:target="\_blank"} pour convertir une valeur spécifiée en nombre à virgule flottante.

**[Integer](https://www.w3schools.com/python/python_numbers.asp){:target="\_blank"}** : Un nombre entier, sans décimales. Voir [Fonction Python int()](https://www.w3schools.com/python/ref_func_int.asp){:target="\_blank"} pour convertir une valeur spécifiée en nombre entier.

<span></span><details><summary>
#### Exemple de conversion d'une chaîne en flottant
</summary>

**[Artwork Orders](https://public.getgrist.com/fR4erkJzSpBd/Artwork-Orders/m/fork){:target="\_blank"}**

<span class="screenshot-large">*![string-to-float](images/formula-cheat-sheet/string-to-float.png)*</span>

La formule utilisée dans la colonne Sale Price est :
```
if $Appraisal_Value.endswith("k"):
  return float($Appraisal_Value.rstrip("k")) * 1000
return float($Appraisal_Value)
```
Dans cet exemple, la colonne Appraisal Value est une colonne de texte contenant des caractères alphanumériques. Pour utiliser cette valeur dans des formules mathématiques, nous devons convertir de chaîne en flottant.

Si la valeur dans la colonne Appraisal Value se termine par "k", nous utilisons d'abord [rstrip()](https://docs.python.org/3/library/stdtypes.html#str.rstrip){:target="\_blank"} pour supprimer "k" de la chaîne dans la colonne Appraisal Value.

Maintenant que nous avons uniquement des caractères numériques, nous utilisons [float()](https://docs.python.org/3/library/functions.html?highlight=float#float){:target="\_blank"} pour convertir notre chaîne en flottant.

Parce que K représente 1000 et que nous avons supprimé cela de la valeur, nous multiplions notre flottant par 1000.

Si la valeur dans la colonne Appraisal Value ***ne se termine pas*** par "k" et contient uniquement des caractères numériques, nous pouvons simplement utiliser [float()](https://docs.python.org/3/library/functions.html?highlight=float#float){:target="\_blank"} pour convertir notre chaîne en flottant.

</details>

<span></span><details><summary>
#### Dépannage
</summary>
si vous essayez d'utiliser différentes colonnes avec des valeurs *numériques* dans une formule mathématique mais que vous voyez une erreur, vérifiez les types de colonnes pour chacune des colonnes utilisées dans la formule. Toutes doivent être de type [Numérique](col-types.md#numeric-columns).

<span class="screenshot-large">*![column-type-numeric](images/formula-cheat-sheet/column-type-numeric.png)*</span>
{: .screenshot-half }

[float()](https://docs.python.org/3/library/functions.html#float){:target