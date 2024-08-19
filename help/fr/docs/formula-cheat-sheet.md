# Feuille de triche des formules

Grist dispose d'un puissant moteur de données pour calculer les cellules de vos tables à l'aide de formules. Les formules Grist sont écrites en [Python](https://docs.python.org/3/library/){:target="\_blank"}, le langage le plus populaire pour la science des données. Nous avons également une suite de [fonctions](functions.md) similaires à celles d'Excel, avec des noms en majuscules. Voici quelques notes utiles :

- Les formules s'appliquent à toute la colonne
- Les champs sont inclus dans les formules sous la forme `$ColumnID`.
- Python est sensible à la casse, y compris pour les noms de table et de colonne Grist. Si votre ID de colonne est `title`, la formule utilisera `$title`, où les deux sont en minuscules.
- Vous pouvez écrire du code Python multi-lignes dans les formules (utilisez <code class="keys">*Shift* + *Enter*</code> pour ajouter des lignes), y compris des instructions, des variables, des imports, etc.
- Le code Grist s'exécute dans un sandbox sécurisé, sans accès à quoi que ce soit en dehors de votre document.

Si vous ne trouvez pas ce que vous cherchez, postez sur le [Forum Communautaire](https://community.getgrist.com/) et nous pourrons vous aider !

## Fonctions Mathématiques

<span></span><section class="cheat-sheet">
#### Mathématiques simples (addition, soustraction, multiplication, division)

Utilise les opérateurs `+`, `-`, `/` et `*` pour effectuer des calculs.

<span></span><details><summary>
#### Exemple de Mathématiques Simples
</summary>

Chestwood Art Studio expédie des œuvres d'art à travers le pays et propose des paiements mensuels sur une période de 12 mois.

Nous avons le sous-total, la taxe (en fonction de l'état d'expédition) et le montant dû mensuellement. Cette colonne de formule utilise l'addition, la multiplication et la division.

<span class="screenshot-large">*![simple-math](images/formula-cheat-sheet/simple-math.png)*</span>

La formule utilisée ici est :
```
($Subtotal + ($Subtotal*$Tax)) / 12
```
Nous ajoutons le sous-total à la taxe calculée, puis divisons cela par 12 mois pour obtenir notre montant dû mensuellement.
</details>

<span></span><details><summary>
#### Dépannage des erreurs
</summary>

`#TypeError` : Confirmez que toutes les colonnes utilisées dans la formule sont de type [Numérique](col-types.md#numeric-columns).