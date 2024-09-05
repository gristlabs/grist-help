---
title: Function reference
---
<style>
    /* Aligne les en-têtes des fonctions avec la flèche "développer" */
    .wm-page-content summary h4 {
      display: inline-block;
      font-size: 14px;
    }
</style>

# Référence des Fonctions {: data-toc-label='' }

Les formules Grist prennent en charge la plupart des fonctions Excel, ainsi que le langage de programmation Python.

Le tableau ci-dessous répertorie les fonctions spécifiques à Grist, ainsi que l'ensemble des fonctions similaires à Excel incluses.
De plus, l'ensemble de la [bibliothèque standard Python](https://docs.python.org/3/library/) est
disponible. Pour en savoir plus sur l'utilisation des formules dans Grist, consultez [Introduction aux Formules](formulas.md).

[Grist utilise Python (version 3.11)](python.md) pour les formules. Vous pouvez utiliser presque toutes les fonctionnalités de
Python (voir [documentation Python](https://docs.python.org/3.11/)). Voici quelques notes utiles :

- Python est sensible à la casse, y compris pour les noms de table et de colonne Grist. Les fonctions similaires à Excel sont
  toujours en majuscules. Par exemple, [**if**](https://docs.python.org/3/tutorial/controlflow.html#if-statements)
  est un mot-clé Python, tandis que [**IF**](#if) est une fonction similaire à Excel.
- Comparez pour l'égalité en utilisant `==`, à la place du `=` unique d'Excel (qui en Python signifie l'assignation).
  "Différent" utilise `!=` à la place de `<>` d'Excel.
- Vous pouvez écrire du Python multi-lignes dans les formules (utilisez <code class="keys">*Shift* + *Enter*</code> pour
  ajouter des lignes), y compris des déclarations, des variables, des imports, etc.
- Le code Grist s'exécute dans un sandbox sécurisé, sans accès à quoi que ce soit en dehors de votre document.

<!-- BEGIN mkpydocs table -->
| Category | Functions |
| --- | --- |
| Grist | <a  href="#record">Record</a> ou <a  href="#record"> rec</a>, <a  href="#_field">$Field</a> ou <a  href="#_field"> rec.Field</a>, <a  href="#_group">$group</a> ou <a  href="#_group"> rec.group</a>, <a  href="#recordset">RecordSet</a>, <a  href="#find_">find.*</a>, <a  href="#usertable">UserTable</a>, <a  href="#all">all</a>, <a  href="#lookupone">lookupOne</a>, <a  href="#lookuprecords">lookupRecords</a> |
| Cumulatif | <a  href="#next">NEXT</a>, <a  href="#previous">PREVIOUS</a>, <a  href="#rank">RANK</a> |
| Date | <a  href="#date">DATE</a>, <a  href="#dateadd">DATEADD</a>, <a  href="#datedif">DATEDIF</a>, <a  href="#datevalue">DATEVALUE</a>, <a  href="#date_to_xl">DATE_TO_XL</a>, <a  href="#day">DAY</a>, <a  href="#days">DAYS</a>, <a  href="#dtime">DTIME</a>, <a  href="#edate">EDATE</a>, <a  href="#eomonth">EOMONTH</a>, <a  href="#hour">HOUR</a>, <a  href="#isoweeknum">ISOWEEKNUM</a>, <a  href="#minute">MINUTE</a>, <a  href="#month">MONTH</a>, <a  href="#moonphase">MOONPHASE</a>, <a  href="#now">NOW</a>, <a  href="#second">SECOND</a>, <a  href="#today">TODAY</a>, <a  href="#weekday">WEEKDAY</a>, <a  href="#weeknum">WEEKNUM</a>, <a  href="#xl_to_date">XL_TO_DATE</a>, <a  href="#year">YEAR</a>, <a  href="#yearfrac">YEARFRAC</a> |
| Info | <a class="unimplemented" href="#cell">CELL</a>, <a class="unimplemented" href="#isblank">ISBLANK</a>, <a  href="#isemail">ISEMAIL</a>, <a  href="#iserr">ISERR</a>, <a  href="#iserror">ISERROR</a>, <a  href="#islogical">ISLOGICAL</a>, <a  href="#isna">ISNA</a>, <a  href="#isnontext">ISNONTEXT</a>, <a  href="#isnumber">ISNUMBER</a>, <a  href="#isref">ISREF</a>, <a  href="#isreflist">ISREFLIST</a>, <a  href="#istext">ISTEXT</a>, <a  href="#isurl">ISURL</a>, <a  href="#n">N</a>, <a  href="#na">NA</a>, <a  href="#peek">PEEK</a>, <a  href="#record_2">RECORD</a>, <a class="unimplemented" href="#request">REQUEST</a>, <a class="unimplemented" href="#type">TYPE</a> |
| Logique | <a  href="#and">AND</a>, <a  href="#false">FALSE</a>, <a  href="#if">IF</a>, <a  href="#iferror">IFERROR</a>, <a  href="#not">NOT</a>, <a  href="#or">OR</a>, <a  href="#true">TRUE</a> |
| Lookup | <a  href="#lookupone_2">lookupOne</a>, <a  href="#lookuprecords_2">lookupRecords</a>, <a class="unimplemented" href="#address">ADDRESS</a>, <a class="unimplemented" href="#choose">CHOOSE</a>, <a class="unimplemented" href="#column">COLUMN</a>, <a class="unimplemented" href="#columns">COLUMNS</a>, <a  href="#contains">CONTAINS</a>, <a class="unimplemented" href="#getpivotdata">GETPIVOTDATA</a>, <a class="unimplemented" href="#hlookup">HLOOKUP</a>, <a class="unimplemented" href="#hyperlink">HYPERLINK</a>, <a class="unimplemented" href="#index">INDEX</a>, <a class="unimplemented" href="#indirect">INDIRECT</a>, <a class="unimplemented" href="#lookup">LOOKUP</a>, <a class="unimplemented" href="#match">MATCH</a>, <a class="unimplemented" href="#offset">OFFSET</a>, <a class="unimplemented" href="#row">ROW</a>, <a class="unimplemented" href="#rows">ROWS</a>, <a  href="#self_hyperlink">SELF_HYPERLINK</a>, <a  href="#vlookup">VLOOKUP</a> |
| Maths | <a  href="#abs">ABS</a>, <a  href="#acos">ACOS</a>, <a  href="#acosh">ACOSH</a>, <a  href="#arabic">ARABIC</a>, <a  href="#asin">ASIN</a>, <a  href="#asinh">ASINH</a>, <a  href="#atan">ATAN</a>, <a  href="#atan2">ATAN2</a>, <a  href="#atanh">ATANH</a>, <a  href="#ceiling">CEILING</a>, <a  href="#combin">COMBIN</a>, <a  href="#cos">COS</a>, <a  href="#cosh">COSH</a>, <a  href="#degrees">DEGREES</a>, <a  href="#even">EVEN</a>, <a  href="#exp">EXP</a>, <a  href="#fact">FACT</a>, <a  href="#factdouble">FACTDOUBLE</a>, <a  href="#floor">FLOOR</a>, <a  href="#gcd">GCD</a>, <a  href="#int">INT</a>, <a  href="#lcm">LCM</a>, <a  href="#ln">LN</a>, <a  href="#log">LOG</a>, <a  href="#log10">LOG10</a>, <a  href="#mod">MOD</a>, <a  href="#mround">MROUND</a>, <a  href="#multinomial">MULTINOMIAL</a>, <a  href="#num">NUM</a>, <a  href="#odd">ODD</a>, <a  href="#pi">PI</a>, <a  href="#power">POWER</a>, <a  href="#product">PRODUCT</a>, <a  href="#quotient">QUOTIENT</a>, <a  href="#radians">RADIANS</a>, <a  href="#rand">RAND</a>, <a  href="#randbetween">RANDBETWEEN</a>, <a  href="#roman">ROMAN</a>, <a  href="#round">ROUND</a>, <a  href="#rounddown">ROUNDDOWN</a>, <a  href="#roundup">ROUNDUP</a>, <a  href="#seriessum">SERIESSUM</a>, <a  href="#sign">SIGN</a>, <a  href="#sin">SIN</a>, <a  href="#sinh">SINH</a>, <a  href="#sqrt">SQRT</a>, <a  href="#sqrtpi">SQRTPI</a>, <a class="unimplemented" href="#subtotal">SUBTOTAL</a>, <a  href="#sum">SUM</a>, <a class="unimplemented" href="#sumif">SUMIF</a>, <a class="unimplemented" href="#sumifs">SUMIFS</a>, <a  href="#sumproduct">SUMPRODUCT</a>, <a class="unimplemented" href="#sumsq">SUMSQ</a>, <a  href="#tan">TAN</a>, <a  href="#tanh">TANH</a>, <a  href="#trunc">TRUNC</a>, <a  href="#uuid">UUID</a> |
| Horaire | <a  href="#schedule">SCHEDULE</a> |
| Statistiques | <a class="unimplemented" href="#avedev">AVEDEV</a>, <a  href="#average">AVERAGE</a>, <a  href="#averagea">AVERAGEA</a>, <a class="unimplemented" href="#averageif">AVERAGEIF</a>, <a class="unimplemented" href="#averageifs">AVERAGEIFS</a>, <a  href="#average_weighted">AVERAGE_WEIGHTED</a>, <a class="unimplemented" href="#binomdist">BINOMDIST</a>, <a class="unimplemented" href="#confidence">CONFIDENCE</a>, <a class="unimplemented" href="#correl">CORREL</a>, <a  href="#count">COUNT</a>, <a  href="#counta">COUNTA</a>, <a class="unimplemented" href="#covar">COVAR</a>, <a class="unimplemented" href="#critbinom">CRITBINOM</a>, <a class="unimplemented" href="#devsq">DEVSQ</a>, <a class="unimplemented" href="#expondist">EXPONDIST</a>, <a class="unimplemented" href="#fdist">FDIST</a>, <a class="unimplemented" href="#fisher">FISHER</a>, <a class="unimplemented" href="#fisherinv">FISHERINV</a>, <a class="unimplemented" href="#forecast">FORECAST</a>, <a class="unimplemented" href="#f_dist">F_DIST</a>, <a class="unimplemented" href="#f_dist_rt">F_DIST_RT</a>, <a class="unimplemented" href="#geomean">GEOMEAN</a>, <a class="unimplemented" href="#harmean">HARMEAN</a>, <a class="unimplemented" href="#hypgeomdist">HYPGEOMDIST</a>, <a class="unimplemented" href="#intercept">INTERCEPT</a>, <a class="unimplemented" href="#kurt">KURT</a>, <a class="unimplemented" href="#large">LARGE</a>, <a class="unimplemented" href="#loginv">LOGINV</a>, <a class="unimplemented" href="#lognormdist">LOGNORMDIST</a>, <a  href="#max">MAX</a>, <a  href="#maxa">MAXA</a>, <a  href="#median">MEDIAN</a>, <a  href="#min">MIN</a>, <a  href="#mina">MINA</a>, <a class="unimplemented" href="#mode">MODE</a>, <a class="unimplemented" href="#negbinomdist">NEGBINOMDIST</a>, <a class="unimplemented" href="#normdist">NORMDIST</a>, <a class="unimplemented" href="#norminv">NORMINV</a>, <a class="unimplemented" href="#normsdist">NORMSDIST</a>, <a class="unimplemented" href="#normsinv">NORMSINV</a>, <a class="unimplemented" href="#pearson">PEARSON</a>, <a class="unimplemented" href="#percentile">PERCENTILE</a>, <a class="unimplemented" href="#percentrank">PERCENTRANK</a>, <a class="unimplemented" href="#percentrank_exc">PERCENTRANK_EXC</a>, <a class="unimplemented" href="#percentrank_inc">PERCENTRANK_INC</a>, <a class="unimplemented" href="#permut">PERMUT</a>, <a class="unimplemented" href="#poisson">POISSON</a>, <a class="unimplemented" href="#prob">PROB</a>, <a class="unimplemented" href="#quartile">QUARTILE</a>, <a class="unimplemented" href="#rank_avg">RANK_AVG</a>, <a class="unimplemented" href="#rank_eq">RANK_EQ</a>, <a class="unimplemented" href="#rsq">RSQ</a>, <a class="unimplemented" href="#skew">SKEW</a>, <a class="unimplemented" href="#slope">SLOPE</a>, <a class="unimplemented" href="#small">SMALL</a>, <a class="unimplemented" href="#standardize">STANDARDIZE</a>, <a  href="#stdev">STDEV</a>, <a  href="#stdeva">STDEVA</a>, <a  href="#stdevp">STDEVP</a>, <a  href="#stdevpa">STDEVPA</a>, <a class="unimplemented" href="#steyx">STEYX</a>, <a class="unimplemented" href="#tdist">TDIST</a>, <a class="unimplemented" href="#tinv">TINV</a>, <a class="unimplemented" href="#trimmean">TRIMMEAN</a>, <a class="unimplemented" href="#ttest">TTEST</a>, <a class="unimplemented" href="#t_inv">T_INV</a>, <a class="unimplemented" href="#t_inv_2t">T_INV_2T</a>, <a class="unimplemented" href="#var">VAR</a>, <a class="unimplemented" href="#vara">VARA</a>, <a class="unimplemented" href="#varp">VARP</a>, <a class="unimplemented" href="#varpa">VARPA</a>, <a class="unimplemented" href="#weibull">WEIBULL</a>, <a class="unimplemented" href="#ztest">ZTEST</a> |
| Texte | <a  href="#char">CHAR</a>, <a  href="#clean">CLEAN</a>, <a  href="#code">CODE</a>, <a  href="#concat">CONCAT</a>, <a  href="#concatenate">CONCATENATE</a>, <a  href="#dollar">DOLLAR</a>, <a  href="#exact">EXACT</a>, <a  href="#find">FIND</a>, <a  href="#fixed">FIXED</a>, <a  href="#left">LEFT</a>, <a  href="#len">LEN</a>, <a  href="#lower">LOWER</a>, <a  href="#mid">MID</a>, <a  href="#phone_format">PHONE_FORMAT</a>, <a  href="#proper">PROPER</a>, <a  href="#regexextract">REGEXEXTRACT</a>, <a  href="#regexmatch">REGEXMATCH</a>, <a  href="#regexreplace">REGEXREPLACE</a>, <a  href="#replace">REPLACE</a>, <a  href="#rept">REPT</a>, <a  href="#right">RIGHT</a>, <a  href="#search">SEARCH</a>, <a  href="#substitute">SUBSTITUTE</a>, <a  href="#t">T</a>, <a  href="#tasteme">TASTEME</a>, <a class="unimplemented" href="#text">TEXT</a>, <a  href="#trim">TRIM</a>, <a  href="#upper">UPPER</a>, <a  href="#value">VALUE</a> |
<!-- END mkpydocs table -->

<!-- BEGIN mkpydocs docs -->
### Grist
<details markdown><summary >
#### <code>class __Record__</code> {: #record data-toc-label="Record" }
</summary>
Un Enregistrement représente un enregistrement de données. C'est le principal moyen d'accéder aux valeurs dans les formules. Un
Enregistrement pour une table particulière a une propriété pour chaque colonne de données et de formule dans la table.

Dans une formule, `$field` est traduit en `rec.field`, où `rec` est l'Enregistrement pour lequel la
formule est évaluée.

Par exemple :
```
def Nom_Complet(rec, table):
  return rec.Prenom + ' ' + rec.NomDeFamille

def Longueur_Nom(rec, table):
  return len(rec.Nom_Complet)
```
</details>
<details markdown><summary >
#### <code>__$__*Field* ou __rec__*.Field*</code> {: #_field data-toc-label="$Field" }
</summary>
Accède au champ nommé "Field" de l'enregistrement actuel. Par exemple, `$Prenom` ou `rec.Prenom`.
</details>
<details markdown><summary >
#### <code>__$group__</code> {: #_group data-toc-label="$group" }
</summary>
Dans une [table de résumé](summary-tables.md), `$group` est un champ spécial
contenant la liste des Enregistrements qui sont résumés par la ligne de résumé actuelle. Par exemple, la
formule `len($group)` compte le nombre de ces enregistrements étant résumés dans chaque ligne.

Voir [Ensemble d'Enregistrements](#recordset) pour les propriétés utiles offertes par l'objet retourné.

Exemples :
```
sum($group.Montant)                        # Somme du champ Montant dans les enregistrements correspondants
sum(r.Montant for r in $group)             # Même que sum($group.Montant)
sum(r.Montant for r in $group if r > 0)    # Somme uniquement des montants positifs
sum(r.Actions * r.Prix for r in $group)   # Somme des produits actions * prix
```
</details>
<details markdown><summary >
#### <code>class __RecordSet__</code> {: #recordset data-toc-label="RecordSet" }
</summary>
Un Ensemble d'Enregistrements représente une collection d'enregistrements, comme retourné par `Table.lookupRecords()` ou
la propriété `$group` dans les vues de résumé.

Un Ensemble d'Enregistrements permet d'itérer à travers les enregistrements :
```
sum(r.Montant for r in Etudiants.lookupRecords(Prenom="John", NomDeFamille="Doe"))
min(r.DateEcheance for r in Tâches.lookupRecords(Propriétaire="Bob"))
```

Les Ensembles d'Enregistrements fournissent également un moyen pratique d'accéder à la liste des valeurs pour un champ particulier pour
tous les enregistrements, comme `record_set.Field`. Par exemple, les exemples ci-dessus sont équivalents à :
```
sum(Etudiants.lookupRecords(Prenom="John", NomDeFamille="Doe").Montant)
min(Tâches.lookupRecords(Propriétaire="Bob").DateEcheance)
```

Vous pouvez obtenir le nombre d'enregistrements dans un Ensemble d'Enregistrements en utilisant `len`, par exemple `len($group)`.
</details>
<details markdown><summary >
#### <code>RecordSet.**find.\***(value)</code> {: #find_ data-toc-label="find.*" }
</summary>
Un ensemble de méthodes pour trouver des valeurs dans des ensembles d'enregistrements triés, comme retourné par
[`lookupRecords`](#lookuprecords). Par exemple :
```
Transactions.lookupRecords(..., order_by="Date").find.lt($Date)
Table.lookupRecords(..., order_by=("Foo", "Bar")).find.le(foo, bar)
```

Si l'attribut `find` est masqué par une colonne utilisateur du même nom, vous pouvez utiliser `_find` à la place.

Les méthodes disponibles sont :

- __`lt`__: (moins que) trouver l'enregistrement le plus proche avec des valeurs de tri < les valeurs données
- __`le`__: (moins que ou égal à) trouver l'enregistrement le plus proche avec des valeurs de tri <= les valeurs données
- __`gt`__: (plus que) trouver l'enregistrement le plus proche avec des valeurs de tri > les valeurs données
- __`ge`__: (plus que ou égal à) trouver l'enregistrement le plus proche avec des valeurs de tri >= les valeurs données
- __`eq`__: (égal à) trouver l'enregistrement le plus proche avec des valeurs de tri == les valeurs données

Exemple de [notre modèle de Paie](https://templates.getgrist.com/5pHLanQNThxk/Payroll).
Chaque personne a un historique de taux de paiement, dans la table Taux. Pour trouver un taux applicable à une
date donnée, voici comment vous pouvez le faire à l'ancienne :
```python
# Obtenez tous les taux pour la Personne et le Rôle dans cette ligne.
taux = Taux.lookupRecords(Personne=$Personne, Rôle=$Rôle)

# Sélectionnez uniquement les taux dont le Début_Taux est à ou avant la Date de cette ligne.
taux_passés = [r for r in taux if r.Début_Taux <= $Date]

# Sélectionnez le dernier des taux_passés, c'est-à-dire le maximum par Début_Taux.
taux = max(taux_passés, key=lambda r: r.Début_Taux)

# Retournez le Taux_Horaire du taux pertinent.
return taux.Taux_Horaire
```

Avec les nouvelles méthodes, c'est beaucoup plus simple :
```python
taux = Taux.lookupRecords(Personne=$Personne, Rôle=$Rôle, order_by="Début_Taux")
taux = taux.find.le($Date)
return taux.Taux_Horaire
```

Notez que cela est également beaucoup plus rapide lorsqu'il y a de nombreux taux pour la même Personne et Rôle.
</details>
<details markdown><summary >
#### <code>class __UserTable__</code> {: #usertable data-toc-label="UserTable" }
</summary>
Chaque table de données dans le document est représentée dans le code par une instance de la classe `UserTable`.
Ces noms sont toujours en majuscules. Une UserTable fournit un accès à tous les enregistrements dans la table,
ainsi que des méthodes pour rechercher des enregistrements particuliers.

Chaque table dans le document est disponible pour toutes les formules.
</details>
<details markdown><summary >
#### <code>UserTable.__all__</code> {: #all data-toc-label="all" }
</summary>
La liste de tous les enregistrements dans cette table.

Par exemple, cela évalue le nombre d'enregistrements dans la table `Etudiants`.
```
len(Etudiants.all)
```

Cela évalue la somme du champ `Population` pour chaque enregistrement dans la table `Pays`.
```
sum(r.Population for r in Pays.all)
```
</details>
<details markdown><summary >
#### <code>UserTable.__lookupOne__(Field_In_Lookup_Table=value, ...)</code> {: #lookupone data-toc-label="lookupOne" }
</summary>
Retourne un [Enregistrement](#record) correspondant aux arguments field=value donnés. La valeur peut être n'importe quelle
expression,
le plus souvent un champ de la ligne actuelle (par exemple, `$SomeField`) ou une constante (par exemple, une chaîne entre guillemets
comme `"Some Value"`).

Par exemple :
```
Personnes.lookupOne(Prenom="Lewis", NomDeFamille="Carroll")
Personnes.lookupOne(Email=$Email_Travail)
```

En savoir plus sur [lookupOne](references-lookups.md#lookupone).

Si plusieurs enregistrements sont trouvés, le premier match est retourné. Vous pouvez définir le paramètre optionnel `order_by`
au ID de colonne par lequel trier les correspondances, pour déterminer lequel d'entre eux est
retourné en premier. Par défaut, l'enregistrement avec le plus petit ID de ligne est retourné.

Voir [`lookupRecords`](#lookuprecords) pour les détails de toutes les options disponibles et du comportement de
`order_by` (et de son alternative héritée, `sort_by`).

Par exemple :
```
Tâches.lookupOne(Projet=$id, order_by="Priorité")  # Tâche avec la plus petite Priorité.
Taux.lookupOne(Personne=$id, order_by="-Date")      # Taux avec la dernière Date.
```
</details>
<details markdown><summary >
#### <code>UserTable.__lookupRecords__(Field_In_Lookup_Table=value, ...)</code> {: #lookuprecords data-toc-label="lookupRecords" }
</summary>
Retourne un [Ensemble d'Enregistrements](#recordset) correspondant aux arguments field=value donnés. La valeur peut être
n'importe quelle expression,
le plus souvent un champ de la ligne actuelle (par exemple, `$SomeField`) ou une constante (par exemple, une chaîne entre guillemets
comme `"Some Value"`) (exemples ci-dessous).

Par exemple :
```
Personnes.lookupRecords(Email=$Email_Travail)
Personnes.lookupRecords(Prenom="George", NomDeFamille="Washington")
```

Vous pouvez définir le paramètre optionnel `order_by` au ID de colonne par lequel trier les résultats.
Vous pouvez préfixer l'ID de colonne avec "-" pour inverser l'ordre. Vous pouvez également spécifier plusieurs
IDs de colonnes sous forme de tuple (par exemple, `order_by=("Compte", "-Date")`).

Par exemple :
```
Transactions.lookupRecords(Compte=$Compte, order_by="Date")
Transactions.lookupRecords(Compte=$Compte, order_by="-Date")
Transactions.lookupRecords(Actif=True, order_by=("Compte", "-Date"))
```

Pour les enregistrements avec des champs `order_by` égaux, les résultats sont triés selon leur apparence
dans les vues (ce qui est déterminé par la colonne spéciale `manualSort`). Vous pouvez définir `order_by=None`
pour correspondre à l'ordre des enregistrements dans des vues non triées.

Par défaut, sans `order_by`, les enregistrements sont triés par ID de ligne, comme si avec `order_by="id"`.

Pour des raisons de compatibilité, `sort_by` peut être utilisé à la place de `order_by`, mais ne permet qu'un
seul champ, et revient à l'ID de ligne (plutôt qu'à `manualSort`).

Voir [Ensemble d'Enregistrements](#recordset) pour les propriétés utiles offertes par l'objet retourné. En
particulier, des méthodes comme [`.find.le`](#find_) permettent de rechercher des valeurs les plus proches.

Voir [CONTIENT](#contains) pour un exemple utilisant `UserTable.lookupRecords` pour trouver des enregistrements
où un champ de type liste (tel que `Liste de Choix` ou `Liste de Références`) contient la valeur donnée.

En savoir plus sur [lookupRecords](references-lookups.md#lookuprecords).
</details>
### Cumulatif
<details markdown><summary >
#### <code>__NEXT__(rec, *, group_by=(), order_by)</code> {: #next data-toc-label="NEXT" }
</summary>
Trouve l'enregistrement suivant dans la table selon l'ordre spécifié par `order_by`, et
le regroupement spécifié par `group_by`. Voir [`PRÉCÉDENT`](#previous) pour plus de détails.
</details>
<details markdown><summary >
#### <code>__PREVIOUS__(rec, *, group_by=(), order_by)</code> {: #previous data-toc-label="PREVIOUS" }
</summary>
Trouve l'enregistrement précédent dans la table selon l'ordre spécifié par `order_by`, et
le regroupement spécifié par `group_by`. Chacun de ces arguments peut être un ID de colonne ou un tuple de
IDs de colonnes, et `order_by` permet aux IDs de colonnes d'être préfixés par "-" pour inverser l'ordre de tri.

Par exemple,
```python
PRÉCÉDENT(rec, order_by="Date")    # L'enregistrement précédent lorsqu'il est trié par date croissante.
PRÉCÉDENT(rec, order_by="-Date")   # L'enregistrement précédent lorsqu'il est trié par date décroissante.
```

Vous pouvez utiliser `group_by` pour rechercher l'enregistrement précédent dans un groupe filtré. Par exemple,
cela trouve l'enregistrement précédent avec le même Compte que `rec`, lorsque les enregistrements sont filtrés par le
Compte de `rec` et triés par date croissante :
```python
PRÉCÉDENT(rec, group_by="Compte", order_by="Date")
```

Lorsque plusieurs enregistrements ont les mêmes valeurs `order_by` (par exemple, la même Date dans les exemples ci-dessus),
l'ordre est déterminé par la position relative des lignes dans les vues. Cela se fait en interne en
retombant sur la colonne spéciale `manualSort` et la colonne ID de ligne `id`.

Utilisez `order_by=None` pour trouver l'enregistrement précédent dans une table non triée (lorsque les lignes peuvent être
réarrangées en les faisant glisser manuellement). Par exemple :
```python
PRÉCÉDENT(rec, order_by=None)      # L'enregistrement précédent dans la liste non triée des enregistrements.
```

Vous pouvez spécifier plusieurs IDs de colonnes sous forme de tuple, pour `group_by` et `order_by`. Cela peut être
utilisé pour correspondre aux vues triées par plusieurs colonnes. Par exemple :
```python
PRÉCÉDENT(rec, group_by=("Compte", "Année"), order_by=("Date", "-Montant"))
```
</details>
<details markdown><summary >
#### <code>__RANK__(rec, *, group_by=(), order_by, order='asc')</code> {: #rank data-toc-label="RANK" }
</summary>
Retourne le rang (ou la position) de cet enregistrement dans la table selon l'ordre spécifié par
`order_by`, et le regroupement spécifié par `group_by`. Voir [`PRÉCÉDENT`](#previous) pour les détails de
ces paramètres.

Le paramètre `order` peut être `"asc"` (qui est la valeur par défaut) ou `"desc"`.

Lorsque `order` est `"asc"` ou omis, le premier enregistrement dans le groupe dans l'ordre trié aurait
le rang de 1. Lorsque `order` est `"desc"`, le dernier enregistrement dans l'ordre trié aurait le rang
de 1.

S'il y a plusieurs groupes, il y aura plusieurs enregistrements avec le même rang. En particulier,
chaque groupe aura un enregistrement avec le rang 1.

Par exemple, `RANG(rec, group_by="Année", order_by="Score", order="desc")` retournera le rang de
l'enregistrement actuel (`rec`) parmi tous les enregistrements de sa table pour la même année, ordonné par
score décroissant.
</details>
### Date
<details markdown><summary >
#### <code>__DATE__(year, month, day)</code> {: #date data-toc-label="DATE" }
</summary>
Retourne l'objet `datetime.datetime` qui représente une date particulière.
La fonction DATE est la plus utile dans les formules où l'année, le mois et le jour sont des formules, pas
des constantes.

Si l'année est comprise entre 0 et 1899 (inclus), ajoute 1900 pour calculer l'année.

```python
>>> DATE(108, 1, 2)
datetime.date(2008, 1, 2)
```

```python
>>> DATE(2008, 1, 2)
datetime.date(2008, 1, 2)
```

Si le mois est supérieur à 12, passe à l'année suivante.

```python
>>> DATE(2008, 14, 2)
datetime.date(2009, 2, 2)
```

Si le mois est inférieur à 1, soustrait ce nombre de mois plus 1, du premier mois de l'année.

```python
>>> DATE(2008, -3, 2)
datetime.date(2007, 9, 2)
```

Si le jour est supérieur au nombre de jours dans le mois donné, passe aux mois suivants.

```python
>>> DATE(2008, 1, 35)
datetime.date(2008, 2, 4)
```

Si le jour est inférieur à 1, soustrait ce nombre de jours plus 1, du premier jour du mois donné.

```python
>>> DATE(2008, 1, -15)
datetime.date(2007, 12, 16)
```
</details>
<details markdown><summary >
#### <code>__DATEADD__(start_date, days=0, months=0, years=0, weeks=0)</code> {: #dateadd data-toc-label="DATEADD" }
</summary>
Retourne la date un certain nombre de jours, mois, années ou semaines à partir de `start_date`. Vous pouvez
spécifier les arguments dans n'importe quel ordre si vous spécifiez les noms des arguments. Utilisez des valeurs négatives pour soustraire.

Par exemple, `DATEADD(date, 1)` est identique à `DATEADD(date, days=1)`, et ajoute un jour à
`date`. `DATEADD(date, years=1, days=-1)` ajoute un an moins un jour.

```python
>>> DATEADD(DATE(2011, 1, 15), 1)
datetime.date(2011, 1, 16)
```

```python
>>> DATEADD(DATE(2011, 1, 15), months=1, days=-1)
datetime.date(2011, 2, 14)
```

```python
>>> DATEADD(DATE(2011, 1, 15), years=-2, months=1, days=3, weeks=2)
datetime.date(2009, 3, 4)
```

```python
>>> DATEADD(DATE(1975, 4, 30), years=50, weeks=-5)
datetime.date(2025, 3, 26)
```

</details>
<details markdown><summary >
#### <code>__DATEDIF__(start_date, end_date, unit)</code> {: #datedif data-toc-label="DATEDIF" }
</summary>
Calcule le nombre de jours, mois ou années entre deux dates.
L'unité indique le type d'information que vous souhaitez retourner :

  - "Y" : Le nombre d'années complètes dans la période.
  - "M" : Le nombre de mois complets dans la période.
  - "D" : Le nombre de jours dans la période.
  - "MD" : La différence entre les jours dans start_date et end_date. Les mois et années des
    dates sont ignorés.
  - "YM" : La différence entre les mois dans start_date et end_date. Les jours et années des
    dates sont ignorés.
  - "YD" : La différence entre les jours de start_date et end_date. Les années des dates sont
    ignorées.

Deux années complètes dans la période (2)

```python
>>> DATEDIF(DATE(2001, 1, 1), DATE(2003, 1, 1), "Y")
2
```

440 jours entre le 1er juin 2001 et le 15 août 2002 (440)

```python
>>> DATEDIF(DATE(2001, 6, 1), DATE(2002, 8, 15), "D")
440
```

75 jours entre le 1er juin et le 15 août, en ignorant les années des dates (75)

```python
>>> DATEDIF(DATE(2001, 6, 1), DATE(2012, 8, 15), "YD")
75
```

La différence entre 1 et 15, en ignorant les mois et les années des dates (14)

```python
>>> DATEDIF(DATE(2001, 6, 1), DATE(2002, 8, 15), "MD")
14
```
</details>
<details markdown><summary >
#### <code>__DATEVALUE__(date_string, tz=None)</code> {: #datevalue data-toc-label="DATEVALUE" }
</summary>
Convertit une date qui est stockée sous forme de texte en un objet `datetime`.

```python
>>> DATEVALUE("1/1/2008")
datetime.datetime(2008, 1, 1, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> DATEVALUE("30-Jan-2008")
datetime.datetime(2008, 1, 30, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> DATEVALUE("2008-12-11")
datetime.datetime(2008, 12, 11, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> DATEVALUE("5-JUL").replace(year=2000)
datetime.datetime(2000, 7, 5, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

En cas d'ambiguïté, préférez le format M/J/A.

```python
>>> DATEVALUE("1/2/3")
datetime.datetime(2003, 1, 2, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```
</details>
<details markdown><summary >
#### <code>__DATE_TO_XL__(date_value)</code> {: #date_to_xl data-toc-label="DATE_TO_XL" }
</summary>
Convertit un objet `date` ou `datetime` Python en le numéro de série utilisé par
Excel, avec le 30 décembre 1899 comme numéro de série 1.

Voir XL_TO_DATE pour plus d'explications.

```python
>>> DATE_TO_XL(datetime.date(2008, 1, 1))
39448.0
```

```python
>>> DATE_TO_XL(datetime.date(2012, 3, 14))
40982.0
```

```python
>>> DATE_TO_XL(datetime.datetime(2012, 3, 14, 1, 30))
40982.0625
```
</details>
<details markdown><summary >
#### <code>__DAY__(date)</code> {: #day data-toc-label="DAY" }
</summary>
Retourne le jour d'une date, sous forme d'entier allant de 1 à 31. Identique à `date.day`.

```python
>>> DAY(DATE(2011, 4, 15))
15
```

```python
>>> DAY("5/31/2012")
31
```

```python
>>> DAY(datetime.datetime(1900, 1, 1))
1
```

</details>
<details markdown><summary >
#### <code>__DAYS__(end_date, start_date)</code> {: #days data-toc-label="DAYS" }
</summary>
Retourne le nombre de jours entre deux dates. Identique à `(end_date - start_date).days`.

```python
>>> DAYS("3/15/11","2/1/11")
42
```

```python
>>> DAYS(DATE(2011, 12, 31), DATE(2011, 1, 1))
364
```

```python
>>> DAYS("2/1/11", "3/15/11")
-42
```

</details>
<details markdown><summary >
#### <code>__DTIME__(value, tz=None)</code> {: #dtime data-toc-label="DTIME" }
</summary>
Retourne la valeur convertie en un objet `datetime` Python. La valeur peut être une
`chaîne`, une `date` (interprétée comme minuit ce jour-là), une `heure` (interprétée comme
une heure de la journée aujourd'hui), ou un `datetime` existant.

Le `datetime` retourné aura son fuseau horaire défini sur l'argument `tz`, ou le fuseau horaire par défaut du document lorsque `tz` est omis ou None. Si l'entrée est elle-même un
`datetime` avec le fuseau horaire défini, il est retourné sans changement (sans modifications de son fuseau horaire).

```python
>>> DTIME(datetime.date(2017, 1, 1))
datetime.datetime(2017, 1, 1, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> DTIME(datetime.date(2017, 1, 1), 'Europe/Paris')
datetime.datetime(2017, 1, 1, 0, 0, tzinfo=moment.tzinfo('Europe/Paris'))
```

```python
>>> DTIME(datetime.datetime(2017, 1, 1))
datetime.datetime(2017, 1, 1, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> DTIME(datetime.datetime(2017, 1, 1, tzinfo=moment.tzinfo('UTC')))
datetime.datetime(2017, 1, 1, 0, 0, tzinfo=moment.tzinfo('UTC'))
```

```python
>>> DTIME(datetime.datetime(2017, 1, 1, tzinfo=moment.tzinfo('UTC')), 'Europe/Paris')
datetime.datetime(2017, 1, 1, 0, 0, tzinfo=moment.tzinfo('UTC'))
```

```python
>>> DTIME("1/1/2008")
datetime.datetime(2008, 1, 1, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

</details>
<details markdown><summary >
#### <code>__EDATE__(start_date, months)</code> {: #edate data-toc-label="EDATE" }
</summary>
Retourne la date qui est le nombre donné de mois avant ou après `start_date`. Utilisez
EDATE pour calculer les dates d'échéance ou de maturité qui tombent le même jour du mois que la
date d'émission.

```python
>>> EDATE(DATE(2011, 1, 15), 1)
datetime.date(2011, 2, 15)
```

```python
>>> EDATE(DATE(2011, 1, 15), -1)
datetime.date(2010, 12, 15)
```

```python
>>> EDATE(DATE(2011, 1, 15), 2)
datetime.date(2011, 3, 15)
```

```python
>>> EDATE(DATE(2012, 3, 1), 10)
datetime.date(2013, 1, 1)
```

```python
>>> EDATE(DATE(2012, 5, 1), -2)
datetime.date(2012, 3, 1)
```

</details>
<details markdown><summary >
#### <code>__EOMONTH__(start_date, months)</code> {: #eomonth data-toc-label="EOMONTH" }
</summary>
Retourne la date du dernier jour du mois qui est le nombre indiqué de mois avant ou
après start_date. Utilisez EOMONTH pour calculer les dates d'échéance ou de maturité qui tombent le dernier jour
du mois.

```python
>>> EOMONTH(DATE(2011, 1, 1), 1)
datetime.date(2011, 2, 28)
```

```python
>>> EOMONTH(DATE(2011, 1, 15), -3)
datetime.date(2010, 10, 31)
```

```python
>>> EOMONTH(DATE(2012, 3, 1), 10)
datetime.date(2013, 1, 31)
```

```python
>>> EOMONTH(DATE(2012, 5, 1), -2)
datetime.date(2012, 3, 31)
```

</details>
<details markdown><summary >
#### <code>__HOUR__(time)</code> {: #hour data-toc-label="HOUR" }
</summary>
Identique à `time.hour`.

```python
>>> HOUR(XL_TO_DATE(0.75))
18
```

```python
>>> HOUR("7/18/2011 7:45")
7
```

```python
>>> HOUR("4/21/2012")
0
```

</details>
<details markdown><summary >
#### <code>__ISOWEEKNUM__(date)</code> {: #isoweeknum data-toc-label="ISOWEEKNUM" }
</summary>
Retourne le numéro de la semaine ISO de l'année pour une date donnée.

```python
>>> ISOWEEKNUM("3/9/2012")
10
```

```python
>>> [ISOWEEKNUM(DATE(2000 + y, 1, 1)) for y in [0,1,2,3,4,5,6,7,8]]
[52, 1, 1, 1, 1, 53, 52, 1, 1]
```

</details>
<details markdown><summary >
#### <code>__MINUTE__(time)</code> {: #minute data-toc-label="MINUTE" }
</summary>
Retourne les minutes d'un `datetime`, sous forme d'entier de 0 à 59.
Identique à `time.minute`.

```python
>>> MINUTE(XL_TO_DATE(0.75))
0
```

```python
>>> MINUTE("7/18/2011 7:45")
45
```

```python
>>> MINUTE("12:59:00 PM")
59
```

```python
>>> MINUTE(datetime.time(12, 58, 59))
58
```

</details>
<details markdown><summary >
#### <code>__MONTH__(date)</code> {: #month data-toc-label="MONTH" }
</summary>
Retourne le mois d'une date représentée, sous forme d'entier de 1 (janvier) à 12 (décembre).
Identique à `date.month`.

```python
>>> MONTH(DATE(2011, 4, 15))
4
```

```python
>>> MONTH("5/31/2012")
5
```

```python
>>> MONTH(datetime.datetime(1900, 1, 1))
1
```

</details>
<details markdown><summary >
#### <code>__MOONPHASE__(date, output='emoji')</code> {: #moonphase data-toc-label="MOONPHASE" }
</summary>
Retourne la phase de la lune à la date donnée. La sortie par défaut est un emoji de phase lunaire.

- Avec `output="days"`, la sortie est l'âge de la lune en jours (nouvelle lune étant 0).
- Avec `output="fraction"`, la sortie est la fraction du mois lunaire depuis la nouvelle lune.

Le calcul n'est pas astronomiquement précis, mais suffisant pour les loups et les marins.

NE PAS utiliser `output="lunacy"`.

```python
>>> MOONPHASE(datetime.date(1900, 1, 1), "days")
0.0
```

```python
>>> MOONPHASE(datetime.date(1900, 1, 1), "fraction")
0.0
```

```python
>>> MOONPHASE(datetime.datetime(1900, 1, 1)) == '🌑'
True
```

```python
>>> MOONPHASE(datetime.date(1900, 1, 15)) == '🌕'
True
```

```python
>>> MOONPHASE(datetime.date(1900, 1, 30)) == '🌑'
True
```

```python
>>> [MOONPHASE(DATEADD(datetime.date(2023, 4, 1), days=4*n)) for n in range(8)] == ['🌔', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓']
True
```

```python
>>> [round(MOONPHASE(DATEADD(datetime.date(2023, 4, 1), days=4*n)), 1) for n in range(8)]
[10.4, 14.4, 18.4, 22.4, 26.4, 0.9, 4.9, 8.9]
```

</details>
<details markdown><summary >
#### <code>__NOW__(tz=None)</code> {: #now data-toc-label="NOW" }
</summary>
Retourne l'objet `datetime` pour l'heure actuelle.
</details>
<details markdown><summary >
#### <code>__SECOND__(time)</code> {: #second data-toc-label="SECOND" }
</summary>
Retourne les secondes d'un `datetime`, sous forme d'entier de 0 à 59.
Identique à `time.second`.

```python
>>> SECOND(XL_TO_DATE(0.75))
0
```

```python
>>> SECOND("7/18/2011 7:45:13")
13
```

```python
>>> SECOND(datetime.time(12, 58, 59))
59
```

</details>
<details markdown><summary >
#### <code>__TODAY__(tz=None)</code> {: #today data-toc-label="TODAY" }
</summary>
Retourne l'objet `date` pour la date actuelle.
</details>
<details markdown><summary >
#### <code>__WEEKDAY__(date, return_type=1)</code> {: #weekday data-toc-label="WEEKDAY" }
</summary>
Retourne le jour de la semaine correspondant à une date. Le jour est donné sous forme d'entier, allant
de 1 (dimanche) à 7 (samedi), par défaut.

Return_type détermine le type de la valeur retournée.

  - 1 (par défaut) - Retourne 1 (dimanche) à 7 (samedi).
  - 2   - Retourne 1 (lundi) à 7 (dimanche).
  - 3   - Retourne 0 (lundi) à 6 (dimanche).
  - 11  - Retourne 1 (lundi) à 7 (dimanche).
  - 12  - Retourne 1 (mardi) à 7 (lundi).
  - 13  - Retourne 1 (mercredi) à 7 (mardi).
  - 14  - Retourne 1 (jeudi) à 7 (mercredi).
  - 15  - Retourne 1 (vendredi) à 7 (jeudi).
  - 16  - Retourne 1 (samedi) à 7 (vendredi).
  - 17  - Retourne 1 (dimanche) à 7 (samedi).

```python
>>> WEEKDAY(DATE(2008, 2, 14))
5
```

```python
>>> WEEKDAY(DATE(2012, 3, 1))
5
```

```python
>>> WEEKDAY(DATE(2012, 3, 1), 1)
5
```

```python
>>> WEEKDAY(DATE(2012, 3, 1), 2)
4
```

```python
>>> WEEKDAY("3/1/2012", 3)
3
```

</details>
<details markdown><summary >
#### <code>__WEEKNUM__(date, return_type=1)</code> {: #weeknum data-toc-label="WEEKNUM" }
</summary>
Retourne le numéro de la semaine d'une date spécifique. Par exemple, la semaine contenant le 1er janvier est la
première semaine de l'année, et est numérotée semaine 1.

Return_type détermine quelle semaine est considérée comme la première semaine de l'année.

  - 1 (par défaut) - La semaine 1 est la première semaine commençant dimanche qui contient le 1er janvier.
  - 2   - La semaine 1 est la première semaine commençant lundi qui contient le 1er janvier.
  - 11  - La semaine 1 est la première semaine commençant lundi qui contient le 1er janvier.
  - 12  - La semaine 1 est la première semaine commençant mardi qui contient le 1er janvier.
  - 13  - La semaine 1 est la première semaine commençant mercredi qui contient le 1er janvier.
  - 14  - La semaine 1 est la première semaine commençant jeudi qui contient le 1er janvier.
  - 15  - La semaine 1 est la première semaine commençant vendredi qui contient le 1er janvier.
  - 16  - La semaine 1 est la première semaine commençant samedi qui contient le 1er janvier.
  - 17  - La semaine 1 est la première semaine commençant dimanche qui contient le 1er janvier.
  - 21  - Approche ISO 8601 : La semaine 1 est la première semaine commençant lundi qui contient le 4 janvier.
        Équivalemment, c'est la semaine qui contient le premier jeudi de l'année.

```python
>>> WEEKNUM(DATE(2012, 3, 9))
10
```

```python
>>> WEEKNUM(DATE(2012, 3, 9), 2)
11
```

```python
>>> WEEKNUM('1/1/1900')
1
```

```python
>>> WEEKNUM('2/1/1900')
5
```
</details>
<details markdown><summary >
#### <code>__XL_TO_DATE__(value, tz=None)</code> {: #xl_to_date data-toc-label="XL_TO_DATE" }
</summary>
Convertit un numéro de série Excel fourni représentant une date en un objet `datetime`.
La valeur est interprétée comme le nombre de jours depuis le 30 décembre 1899.

(Cela correspond à l'interprétation de Google Sheets. Excel commence avec le 31 décembre 1899 mais considère à tort
1900 comme une année bissextile. Excel pour Mac doit être configuré pour utiliser le système de date 1900,
c'est-à-dire décocher l'option "Utiliser le système de date 1904".)

Le `datetime` retourné aura son fuseau horaire défini sur l'argument `tz`, ou le fuseau horaire par défaut du document lorsque `tz` est omis ou None.

```python
>>> XL_TO_DATE(41100.1875)
datetime.datetime(2012, 7, 10, 4, 30, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> XL_TO_DATE(39448)
datetime.datetime(2008, 1, 1, 0, 0, tzinfo=moment.tzinfo('America/New_York'))
```

```python
>>> XL_TO_DATE(40982.0625)
datetime.datetime(2012, 3, 14, 1, 30, tzinfo=moment.tzinfo('America/New_York'))
```
</details>
<details markdown><summary >
#### <code>__YEAR__(date)</code> {: #year data-toc-label="YEAR" }
</summary>
Retourne l'année correspondant à une date sous forme d'entier.
Identique à `date.year`.

```python
>>> YEAR(DATE(2011, 4, 15))
2011
```

```python
>>> YEAR("5/31/2030")
2030
```

```python
>>> YEAR(datetime.datetime(1900, 1, 1))
1900
```

</details>
<details markdown><summary >
#### <code>__YEARFRAC__(start_date, end_date, basis=0)</code> {: #yearfrac data-toc-label="YEARFRAC" }
</summary>
Calcule la fraction de l'année représentée par le nombre de jours entiers entre deux dates.

Basis est le type de base de comptage des jours à utiliser.

  * `0` (par défaut) - US (NASD) 30/360
  * `1`   - Actuel/actuel
  * `2`   - Actuel/360
  * `3`   - Actuel/365
  * `4`   - Européen 30/360
  * `-1`  - Actuel/actuel (variation Google Sheets)

Cette fonction est utile pour les calculs financiers. Pour la compatibilité avec Excel, elle par défaut
utilise le calendrier standard NASD. Pour une utilisation dans des contextes non financiers, l'option `-1` est
probablement le meilleur choix.

Voir <https://en.wikipedia.org/wiki/360-day_calendar> pour l'explication des
méthodes US 30/360 et Européenne 30/360. Voir <http://www.dwheeler.com/yearfrac/> pour l'analyse de
l'implémentation particulière d'Excel.

Fraction de l'année entre le 1/1/2012 et le 30/7/12, en omettant l'argument Basis.

```python
>>> "%.8f" % YEARFRAC(DATE(2012, 1, 1), DATE(2012, 7, 30))
'0.58055556'
```

Fraction entre les mêmes dates, en utilisant l'argument de base Actuel/Actuel. Parce que 2012 est une année bissextile, elle a une base de 366 jours.

```python
>>> "%.8f" % YEARFRAC(DATE(2012, 1, 1), DATE(2012, 7, 30), 1)
'0.57650273'
```

Fraction entre les mêmes dates, en utilisant l'argument de base Actuel/365. Utilise une base de 365 jours.

```python
>>> "%.8f" % YEARFRAC(DATE(2012, 1, 1), DATE(2012, 7, 30), 3)
'0.57808219'
```
</details>
### Info
<details markdown><summary class="unimplemented">
#### <code>__CELL__(info_type, reference)</code> {: #cell data-toc-label="CELL" }
</summary>
Retourne les informations demandées sur la cellule spécifiée. Cela n'est pas implémenté dans Grist.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__ISBLANK__(value)</code> {: #isblank data-toc-label="ISBLANK" }
</summary>
Retourne si une valeur fait référence à une cellule vide. Elle n'est pas implémentée dans Grist. Pour vérifier une
chaîne vide, utilisez `value == ""`.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__ISEMAIL__(value)</code> {: #isemail data-toc-label="ISEMAIL" }
</summary>
Retourne si une valeur est une adresse email valide.

Notez que la vérification de la validité des emails n'est pas une science exacte. La norme technique considère de nombreuses
adresses email comme valides qui ne sont pas utilisées dans la pratique, et ne seraient pas considérées comme valides par la plupart
des utilisateurs. Au lieu de cela, nous suivons l'implémentation de Google Sheets, avec quelques différences, notées ci-dessous.

```python
>>> ISEMAIL("Abc.123@example.com")
True
```

```python
>>> ISEMAIL("Bob_O-Reilly+tag@example.com")
True
```

```python
>>> ISEMAIL("John Doe")
False
```

```python
>>> ISEMAIL("john@aol...com")
False
```

</details>
<details markdown><summary >
#### <code>__ISERR__(value)</code> {: #iserr data-toc-label="ISERR" }
</summary>
Vérifie si une valeur est une erreur. En d'autres termes, elle retourne vrai
si l'utilisation de `value` directement provoquerait une exception.

NOTE : Grist implémente cela en enveloppant automatiquement l'argument pour utiliser l'évaluation paresseuse.

Une approche plus Pythonique pour vérifier les erreurs est :
```
try:
  ... value ...
except Exception, err:
  ... faire quelque chose à propos de l'erreur ...
```

Par exemple :

```python
>>> ISERR("Hello")
False
```
</details>
<details markdown><summary >
#### <code>__ISERROR__(value)</code> {: #iserror data-toc-label="ISERROR" }
</summary>
Vérifie si une valeur est une erreur ou une valeur invalide. Elle est similaire à `ISERR`, mais retourne également vrai pour une valeur invalide telle que NaN ou une valeur textuelle dans une colonne Numérique.

NOTE : Grist implémente cela en enveloppant automatiquement l'argument pour utiliser l'évaluation paresseuse.

```python
>>> ISERROR("Hello")
False
```

```python
>>> ISERROR(AltText("fail"))
True
```

```python
>>> ISERROR(float('nan'))
True
```
</details>
<details markdown><summary >
#### <code>__ISLOGICAL__(value)</code> {: #islogical data-toc-label="ISLOGICAL" }
</summary>
Vérifie si une valeur est `True` ou `False`.

```python
>>> ISLOGICAL(True)
True
```

```python
>>> ISLOGICAL(False)
True
```

```python
>>> ISLOGICAL(0)
False
```

```python
>>> ISLOGICAL(None)
False
```

```python
>>> ISLOGICAL("Test")
False
```

</details>
<details markdown><summary >
#### <code>__ISNA__(value)</code> {: #isna data-toc-label="ISNA" }
</summary>
Vérifie si une valeur est l'erreur `#N/A`.

```python
>>> ISNA(float('nan'))
True
```

```python
>>> ISNA(0.0)
False
```

```python
>>> ISNA('text')
False
```

```python
>>> ISNA(float('-inf'))
False
```

</details>
<details markdown><summary >
#### <code>__ISNONTEXT__(value)</code> {: #isnontext data-toc-label="ISNONTEXT" }
</summary>
Vérifie si une valeur n'est pas textuelle.

```python
>>> ISNONTEXT("asdf")
False
```

```python
>>> ISNONTEXT("")
False
```

```python
>>> ISNONTEXT(AltText("text"))
False
```

```python
>>> ISNONTEXT(17.0)
True
```

```python
>>> ISNONTEXT(None)
True
```

```python
>>> ISNONTEXT(datetime.date(2011, 1, 1))
True
```

</details>
<details markdown><summary >
#### <code>__ISNUMBER__(value)</code> {: #isnumber data-toc-label="ISNUMBER" }
</summary>
Vérifie si une valeur est un nombre.

```python
>>> ISNUMBER(17)
True
```

```python
>>> ISNUMBER(-123.123423)
True
```

```python
>>> ISNUMBER(False)
True
```

```python
>>> ISNUMBER(float('nan'))
True
```

```python
>>> ISNUMBER(float('inf'))
True
```

```python
>>> ISNUMBER('17')
False
```

```python
>>> ISNUMBER(None)
False
```

```python
>>> ISNUMBER(datetime.date(2011, 1, 1))
False
```

</details>
<details markdown><summary >
#### <code>__ISREF__(value)</code> {: #isref data-toc-label="ISREF" }
</summary>
Vérifie si une valeur est un enregistrement de table.

Par exemple, si une colonne `personne` est de type Référence à la table `Personnes`,
alors `ISREF($personne)` est `True`.
De même, `ISREF(Personnes.lookupOne(name=$name))` est `True`. Pour tout autre type de valeur,
`ISREF()` évaluerait à `False`.

```python
>>> ISREF(17)
False
```

```python
>>> ISREF("Roger")
False
```

</details>
<details markdown><summary >
#### <code>__ISREFLIST__(value)</code> {: #isreflist data-toc-label="ISREFLIST" }
</summary>
Vérifie si une valeur est un [`Ensemble d'Enregistrements`](#recordset),
le type de valeurs dans les colonnes de Liste de Références.

Par exemple, si une colonne `personnes` est de type Liste de Références à la table `Personnes`,
alors `ISREFLIST($personnes)` est `True`.
De même, `ISREFLIST(Personnes.lookupRecords(name=$name))` est `True`. Pour tout autre type de valeur,
`ISREFLIST()` évaluerait à `False`.

```python
>>> ISREFLIST(17)
False
```

```python
>>> ISREFLIST("Roger")
False
```

</details>
<details markdown><summary >
#### <code>__ISTEXT__(value)</code> {: #istext data-toc-label="ISTEXT" }
</summary>
Vérifie si une valeur est textuelle.

```python
>>> ISTEXT("asdf")
True
```

```python
>>> ISTEXT("")
True
```

```python
>>> ISTEXT(AltText("text"))
True
```

```python
>>> ISTEXT(17.0)
False
```

```python
>>> ISTEXT(None)
False
```

```python
>>> ISTEXT(datetime.date(2011, 1, 1))
False
```

</details>
<details markdown><summary >
#### <code>__ISURL__(value)</code> {: #isurl data-toc-label="ISURL" }
</summary>
Vérifie si une valeur est une URL valide. Elle n'a pas besoin d'être entièrement qualifiée, ni d'inclure
"http://" et "www". Elle ne suit pas une norme, mais tente de fonctionner de manière similaire à ISURL dans
Google Sheets, et de retourner True pour du texte qui est probablement une URL.

Les protocoles valides incluent ftp, http, https, gopher, mailto, news, telnet et aim.

```python
>>> ISURL("http://www.getgrist.com")
True
```

```python
>>> ISURL("https://foo.com/test_(wikipedia)#cite-1")
True
```

```python
>>> ISURL("mailto://user@example.com")
True
```

```python
>>> ISURL("http:///a")
False
```

</details>
<details markdown><summary >
#### <code>__N__(value)</code> {: #n data-toc-label="N" }
</summary>
Retourne la valeur convertie en un nombre. Vrai/Faux sont convertis en 1/0. Une date est convertie en
numéro de série de style Excel de la date. Tout le reste est converti en 0.

```python
>>> N(7)
7
```

```python
>>> N(7.1)
7.1
```

```python
>>> N("Even")
0
```

```python
>>> N("7")
0
```

```python
>>> N(True)
1
```

```python
>>> N(datetime.datetime(2011, 4, 17))
40650.0
```

</details>
<details markdown><summary >
#### <code>__NA__()</code> {: #na data-toc-label="NA" }
</summary>
Retourne l'erreur "valeur non disponible", `#N/A`.

```python
>>> math.isnan(NA())
True
```

</details>
<details markdown><summary >
#### <code>__PEEK__(func)</code> {: #peek data-toc-label="PEEK" }
</summary>
Évalue l'expression donnée sans créer de dépendances
ou nécessiter que les valeurs référencées soient à jour, en utilisant quelle que soit la valeur qu'il trouve dans une cellule.
Ceci est utile pour prévenir les erreurs de référence circulaire, en particulier dans les formules de déclenchement.

Par exemple, si la formule pour `A` dépend de `$B` et la formule pour `B` dépend de `$A`,
cela provoquerait normalement une erreur de référence circulaire car chaque valeur doit être
calculée avant l'autre. Mais si `A` utilise `PEEK($B)` alors il obtiendra simplement la valeur
déjà stockée dans `$B` sans nécessiter que `$B` soit d'abord calculé à la dernière valeur.
Ainsi, `A` sera calculé en premier, et `B` pourra utiliser `$A` sans problèmes.
</details>
<details markdown><summary >
#### <code>__RECORD__(record_or_list, dates_as_iso=False, expand_refs=0)</code> {: #record_2 data-toc-label="RECORD" }
</summary>
Retourne un dictionnaire Python avec tous les champs de l'enregistrement donné. Si une liste d'enregistrements est donnée,
retourne une liste de dictionnaires Python correspondants.

Si dates_as_iso est défini, les valeurs Date et DateTime sont converties en chaîne en utilisant le format ISO 8601.

Si expand_refs est défini à 1 ou plus, les valeurs de Référence sont remplacées par une représentation RECORD
de l'enregistrement référencé, en développant le nombre donné de niveaux.

Les valeurs d'erreur présentes dans les cellules de l'enregistrement sont remplacées par une valeur None, et une clé spéciale de
"_error_" est ajoutée contenant les messages d'erreur pour ces cellules. Par exemple :
`{"Ratio": None, "_error_": {"Ratio": "ZeroDivisionError: integer division or modulo by zero"}}`

Notez qu'il faut faire attention à éviter les références circulaires lors de l'utilisation de RECORD(), car cela crée une
dépendance sur chaque cellule de l'enregistrement. Dans le cas de RECORD(rec), la cellule contenant cet appel
sera omise du dictionnaire résultant.

Par exemple :
```
RECORD($Personne)
RECORD(rec)
RECORD(Personnes.lookupOne(Prenom="Alice"))
RECORD(Personnes.lookupRecords(Département="RH"))
```
</details>
<details markdown><summary class="unimplemented">
#### <code>__REQUEST__(url, params=None, headers=None, method='GET', data=None, json=None)</code> {: #request data-toc-label="REQUEST" }
</summary>

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__TYPE__(value)</code> {: #type data-toc-label="TYPE" }
</summary>
Retourne un nombre associé au type de données passé dans la fonction. Cela n'est pas
implémenté dans Grist. Utilisez `isinstance(value, type)` ou `type(value)`.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
### Logique
<details markdown><summary >
#### <code>__AND__(logical_expression, *logical_expressions)</code> {: #and data-toc-label="AND" }
</summary>
Renvoie True si tous les arguments sont logiquement vrais, et False si l'un d'eux est faux.
Identique à `all([valeur1, valeur2, ...])`.


```python
>>> AND(1)
True
```

```python
>>> AND(0)
False
```

```python
>>> AND(1, 1)
True
```

```python
>>> AND(1,2,3,4)
True
```

```python
>>> AND(1,2,3,4,0)
False
```

</details>
<details markdown><summary >
#### <code>__FALSE__()</code> {: #false data-toc-label="FALSE" }
</summary>
Renvoie la valeur logique `False`. Vous pouvez également utiliser la valeur `False` directement. Cette
fonction est fournie principalement pour la compatibilité avec d'autres programmes de tableur.


```python
>>> FALSE()
False
```

</details>
<details markdown><summary >
#### <code>__IF__(logical_expression, value_if_true, value_if_false)</code> {: #if data-toc-label="IF" }
</summary>
Renvoie une valeur si une expression logique est `True` et une autre si elle est `False`.

L'expression Python équivalente est :
```
valeur_si_vrai si expression_logique sinon valeur_si_faux
```

Comme Grist prend en charge les formules multi-lignes, vous pouvez également utiliser des blocs Python tels que :
```
if expression_logique:
  return valeur_si_vrai
else:
  return valeur_si_faux
```

NOTE : Grist suit le modèle Excel en n'évaluant qu'une des expressions de valeur, en
enveloppant automatiquement les expressions pour utiliser l'évaluation paresseuse. Cela permet à `IF(False, 1/0, 1)`
d'évaluer à `1` plutôt que de lever une exception.


```python
>>> IF(12, "Oui", "Non")
'Oui'
```

```python
>>> IF(None, "Oui", "Non")
'Non'
```

```python
>>> IF(True, 0.85, 0.0)
0.85
```

```python
>>> IF(False, 0.85, 0.0)
0.0
```
</details>
<details markdown><summary >
#### <code>__IFERROR__(value, value_if_error='')</code> {: #iferror data-toc-label="IFERROR" }
</summary>
Renvoie le premier argument s'il n'est pas une valeur d'erreur, sinon renvoie le deuxième argument s'il
est présent, ou une chaîne vide si le deuxième argument est absent.

NOTE : Grist gère les valeurs qui lèvent une exception en les enveloppant pour utiliser l'évaluation paresseuse.


```python
>>> IFERROR(float('nan'), "**NAN**")
'**NAN**'
```

```python
>>> IFERROR(17.17, "**NAN**")
17.17
```

```python
>>> IFERROR("Texte")
'Texte'
```

```python
>>> IFERROR(AltText("bonjour"))
''
```
</details>
<details markdown><summary >
#### <code>__NOT__(logical_expression)</code> {: #not data-toc-label="NOT" }
</summary>
`True`. Identique à `not expression_logique`.


```python
>>> NOT(123)
False
```

```python
>>> NOT(0)
True
```

</details>
<details markdown><summary >
#### <code>__OR__(logical_expression, *logical_expressions)</code> {: #or data-toc-label="OR" }
</summary>
Renvoie True si l'un des arguments est logiquement vrai, et faux si tous les
arguments sont faux.
Identique à `any([valeur1, valeur2, ...])`.


```python
>>> OR(1)
True
```

```python
>>> OR(0)
False
```

```python
>>> OR(1, 1)
True
```

```python
>>> OR(0, 1)
True
```

```python
>>> OR(0, 0)
False
```

```python
>>> OR(0,False,0.0,"",None)
False
```

```python
>>> OR(0,None,3,0)
True
```

</details>
<details markdown><summary >
#### <code>__TRUE__()</code> {: #true data-toc-label="TRUE" }
</summary>
Renvoie la valeur logique `True`. Vous pouvez également utiliser la valeur `True` directement. Cette
fonction est fournie principalement pour la compatibilité avec d'autres programmes de tableur.


```python
>>> TRUE()
True
```

</details>
### Recherche
<details markdown><summary >
#### <code>UserTable.__lookupOne__(Field_In_Lookup_Table=value, ...)</code> {: #lookupone_2 data-toc-label="lookupOne" }
</summary>
Renvoie un [Enregistrement](#record) correspondant aux arguments champ=valeur donnés. La valeur peut être n'importe quelle
expression,
le plus souvent un champ dans la ligne actuelle (par exemple, `$SomeField`) ou une constante (par exemple, une chaîne entre guillemets
comme `"Some Value"`).

Par exemple :
```
People.lookupOne(First_Name="Lewis", Last_Name="Carroll")
People.lookupOne(Email=$Work_Email)
```

En savoir plus sur [lookupOne](references-lookups.md#lookupone).

Si plusieurs enregistrements sont trouvés, le premier match est renvoyé. Vous pouvez définir le paramètre optionnel `order_by`
au ID de colonne par lequel trier les correspondances, pour déterminer lequel d'entre eux est
renvoyé en premier. Par défaut, l'enregistrement avec le plus petit ID de ligne est renvoyé.

Voir [`lookupRecords`](#lookuprecords) pour des détails sur toutes les options disponibles et le comportement de
`order_by` (et de son alternative héritée, `sort_by`).

Par exemple :
```
Tasks.lookupOne(Project=$id, order_by="Priority")  # Tâche avec la plus petite priorité.
Rates.lookupOne(Person=$id, order_by="-Date")      # Taux avec la dernière date.
```
</details>
<details markdown><summary >
#### <code>UserTable.__lookupRecords__(Field_In_Lookup_Table=value, ...)</code> {: #lookuprecords_2 data-toc-label="lookupRecords" }
</summary>
Renvoie un [Ensemble d'Enregistrements](#recordset) correspondant aux arguments champ=valeur donnés. La valeur peut être
n'importe quelle expression,
le plus souvent un champ dans la ligne actuelle (par exemple, `$SomeField`) ou une constante (par exemple, une chaîne entre guillemets
comme `"Some Value"`) (exemples ci-dessous).

Par exemple :
```
People.lookupRecords(Email=$Work_Email)
People.lookupRecords(First_Name="George", Last_Name="Washington")
```

Vous pouvez définir le paramètre optionnel `order_by` au ID de colonne par lequel trier les résultats.
Vous pouvez préfixer l'ID de colonne avec "-" pour inverser l'ordre. Vous pouvez également spécifier plusieurs
ID de colonnes sous forme de tuple (par exemple, `order_by=("Account", "-Date")`).

Par exemple :
```
Transactions.lookupRecords(Account=$Account, order_by="Date")
Transactions.lookupRecords(Account=$Account, order_by="-Date")
Transactions.lookupRecords(Active=True, order_by=("Account", "-Date"))
```

Pour les enregistrements avec des champs `order_by` égaux, les résultats sont triés selon leur apparition
dans les vues (ce qui est déterminé par la colonne spéciale `manualSort`). Vous pouvez définir `order_by=None`
pour correspondre à l'ordre des enregistrements dans des vues non triées.

Par défaut, sans `order_by`, les enregistrements sont triés par ID de ligne, comme si avec `order_by="id"`.

Pour des raisons de compatibilité, `sort_by` peut être utilisé à la place de `order_by`, mais ne permet qu'un
seul champ, et revient à l'ID de ligne (plutôt qu'à `manualSort`).

Voir [Ensemble d'Enregistrements](#recordset) pour des propriétés utiles offertes par l'objet renvoyé. En
particulier, des méthodes comme [`.find.le`](#find_) permettent de rechercher les valeurs les plus proches.

Voir [CONTIENT](#contains) pour un exemple utilisant `UserTable.lookupRecords` pour trouver des enregistrements
où un champ d'un type de liste (tel que `Liste de Choix` ou `Liste de Références`) contient la valeur donnée.

En savoir plus sur [lookupRecords](references-lookups.md#lookuprecords).
</details>
<details markdown><summary class="unimplemented">
#### <code>__ADDRESS__(row, column, absolute_relative_mode, use_a1_notation, sheet)</code> {: #address data-toc-label="ADDRESS" }
</summary>
Renvoie une référence de cellule sous forme de chaîne.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__CHOOSE__(index, choice1, choice2)</code> {: #choose data-toc-label="CHOOSE" }
</summary>
Renvoie un élément d'une liste de choix en fonction de l'index.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__COLUMN__(cell_reference=None)</code> {: #column data-toc-label="COLUMN" }
</summary>
Renvoie le numéro de colonne d'une cellule spécifiée, avec `A=1`.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__COLUMNS__(range)</code> {: #columns data-toc-label="COLUMNS" }
</summary>
Renvoie le nombre de colonnes dans un tableau ou un intervalle spécifié.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__CONTAINS__(value, match_empty=no_match_empty)</code> {: #contains data-toc-label="CONTAINS" }
</summary>
Utilisez ce marqueur avec [UserTable.lookupRecords](#lookuprecords) pour trouver des enregistrements
où un champ d'un type de liste (tel que `Liste de Choix` ou `Liste de Références`) contient la valeur donnée.

Par exemple :

    MoviesTable.lookupRecords(genre=CONTAINS("Drama"))

renverra des enregistrements dans `MoviesTable` où la colonne `genre`
est une liste ou un autre conteneur tel que `["Comedy", "Drama"]`,
c'est-à-dire `"Drama" in $genre`.

Notez que la colonne recherchée (par exemple, `genre`)
doit avoir des valeurs d'un type de conteneur tel que liste, tuple ou ensemble.
En particulier, les valeurs ne doivent pas être des chaînes, par exemple `"Comedy-Drama"` ne correspondra pas
même si `"Drama" in "Comedy-Drama"` est `True` en Python.
Cela ne correspondra également pas aux sous-chaînes dans les éléments du conteneur, par exemple `["Comedy-Drama"]`.

Vous pouvez éventuellement passer un deuxième argument `match_empty` pour indiquer une valeur qui
devrait être comparée aux listes vides dans la colonne recherchée.

Par exemple, étant donné cette formule :

    MoviesTable.lookupRecords(genre=CONTAINS(g, match_empty=''))

Si `g` est `''` (c'est-à-dire égal à `match_empty`), alors la colonne `genre` dans les enregistrements renvoyés
sera soit une liste vide (ou un autre conteneur) soit une liste contenant `g` comme d'habitude.
</details>
<details markdown><summary class="unimplemented">
#### <code>__GETPIVOTDATA__(value_name, any_pivot_table_cell, original_column_1, pivot_item_1=None, *args)</code> {: #getpivotdata data-toc-label="GETPIVOTDATA" }
</summary>
Extrait une valeur agrégée d'un tableau croisé dynamique qui correspond aux en-têtes de ligne et de colonne spécifiés.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__HLOOKUP__(search_key, range, index, is_sorted)</code> {: #hlookup data-toc-label="HLOOKUP" }
</summary>
Recherche horizontale. Recherche dans la première ligne d'un intervalle pour une clé et renvoie la valeur d'une cellule spécifiée dans la colonne trouvée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__HYPERLINK__(url, link_label)</code> {: #hyperlink data-toc-label="HYPERLINK" }
</summary>
Crée un lien hypertexte à l'intérieur d'une cellule.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__INDEX__(reference, row, column)</code> {: #index data-toc-label="INDEX" }
</summary>
Renvoie le contenu d'une cellule, spécifié par un décalage de ligne et de colonne.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__INDIRECT__(cell_reference_as_string)</code> {: #indirect data-toc-label="INDIRECT" }
</summary>
Renvoie une référence de cellule spécifiée par une chaîne.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__LOOKUP__(search_key, search_range_or_search_result_array, result_range=None)</code> {: #lookup data-toc-label="LOOKUP" }
</summary>
Recherche dans une ligne ou une colonne pour une clé et renvoie la valeur de la cellule dans une plage de résultats située à la même position que la ligne ou la colonne de recherche.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__MATCH__(search_key, range, search_type)</code> {: #match data-toc-label="MATCH" }
</summary>
Renvoie la position relative d'un élément dans un intervalle qui correspond à une valeur spécifiée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__OFFSET__(cell_reference, offset_rows, offset_columns, height, width)</code> {: #offset data-toc-label="OFFSET" }
</summary>
Renvoie une référence de plage décalée d'un nombre spécifié de lignes et de colonnes à partir d'une référence de cellule de départ.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__ROW__(cell_reference)</code> {: #row data-toc-label="ROW" }
</summary>
Renvoie le numéro de ligne d'une cellule spécifiée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__ROWS__(range)</code> {: #rows data-toc-label="ROWS" }
</summary>
Renvoie le nombre de lignes dans un tableau ou un intervalle spécifié.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__SELF_HYPERLINK__(label=None, page=None, **kwargs)</code> {: #self_hyperlink data-toc-label="SELF_HYPERLINK" }
</summary>
Crée un lien vers le document actuel. Tous les paramètres sont optionnels.

La chaîne renvoyée est au format URL, éventuellement précédée d'une étiquette et d'un espace
(le format attendu pour les colonnes de texte Grist avec l'option HyperLink activée).

Un numéro de page numérique peut être fourni, ce qui créera un lien vers la
page spécifiée. Pour trouver le numéro de page numérique dont vous avez besoin, visitez une page
et examinez son URL pour une partie `/p/NN`.

Un nombre quelconque d'arguments sous la forme `LinkKey_NOM` peut être fourni, pour définir
les valeurs `user.LinkKey.NOM` qui seront disponibles dans les règles d'accès. Par exemple,
si une règle permet aux utilisateurs de voir des lignes lorsque `user.LinkKey.Code == rec.Code`,
nous pourrions vouloir créer des liens avec `SELF_HYPERLINK(LinkKey_Code=$Code)`.


```python
>>> SELF_HYPERLINK()
u'https://docs.getgrist.com/sbaltsirg/Example'
```

```python
>>> SELF_HYPERLINK(label='doc')
u'doc https://docs.getgrist.com/sbaltsirg/Example'
```

```python
>>> SELF_HYPERLINK(page=2)
u'https://docs.getgrist.com/sbaltsirg/Example/p/2'
```

```python
>>> SELF_HYPERLINK(LinkKey_Code='X1234')
u'https://docs.getgrist.com/sbaltsirg/Example?Code_=X1234'
```

```python
>>> SELF_HYPERLINK(label='order', page=3, LinkKey_Code='X1234', LinkKey_Name='Bi Ngo')
u'order https://docs.getgrist.com/sbaltsirg/Example/p/3?Code_=X1234&Name_=Bi+Ngo'
```

```python
>>> SELF_HYPERLINK(Linky_Link='Link')
Traceback (most recent call last):
...
TypeError: unexpected keyword argument 'Linky_Link' (not of form LinkKey_NAME)
```

</details>
<details markdown><summary >
#### <code>__VLOOKUP__(table, **field_value_pairs)</code> {: #vlookup data-toc-label="VLOOKUP" }
</summary>
Recherche verticale. Recherche dans la table donnée pour un enregistrement correspondant aux arguments `champ=valeur` donnés. Si plusieurs enregistrements correspondent, renvoie l'un d'eux. Si aucun ne correspond, renvoie l'enregistrement vide spécial.

L'objet renvoyé est un enregistrement dont les champs sont disponibles en utilisant la syntaxe `.champ`. Par exemple,
`VLOOKUP(Employees, EmployeeID=$EmpID).Salary`.

Notez que `VLOOKUP` n'est pas couramment nécessaire dans Grist, puisque les [Colonnes de Référence](col-refs.md) sont
le meilleur moyen de lier des données entre des tables, et permettent une utilisation simple et efficace telle que `$Person.Age`.

`VLOOKUP` est exactement équivalent à `table.lookupOne(**champ_valeur_paires)`. Voir
[lookupOne](#lookupone).

Par exemple :
```
VLOOKUP(People, First_Name="Lewis", Last_Name="Carroll")
VLOOKUP(People, First_Name="Lewis", Last_Name="Carroll").Age
```
</details>
### Math
<details markdown><summary >
#### <code>__ABS__(value)</code> {: #abs data-toc-label="ABS" }
</summary>
Renvoie la valeur absolue d'un nombre.


```python
>>> ABS(2)
2
```

```python
>>> ABS(-2)
2
```

```python
>>> ABS(-4)
4
```

</details>
<details markdown><summary >
#### <code>__ACOS__(value)</code> {: #acos data-toc-label="ACOS" }
</summary>
Renvoie le cosinus inverse d'une valeur, en radians.


```python
>>> round(ACOS(-0.5), 9)
2.094395102
```

```python
>>> round(ACOS(-0.5)*180/PI(), 10)
120.0
```

</details>
<details markdown><summary >
#### <code>__ACOSH__(value)</code> {: #acosh data-toc-label="ACOSH" }
</summary>
Renvoie le cosinus hyperbolique inverse d'un nombre.


```python
>>> ACOSH(1)
0.0
```

```python
>>> round(ACOSH(10), 7)
2.9932228
```

</details>
<details markdown><summary >
#### <code>__ARABIC__(roman_numeral)</code> {: #arabic data-toc-label="ARABIC" }
</summary>
Calcule la valeur d'un chiffre romain.


```python
>>> ARABIC("LVII")
57
```

```python
>>> ARABIC('mcmxii')
1912
```

</details>
<details markdown><summary >
#### <code>__ASIN__(value)</code> {: #asin data-toc-label="ASIN" }
</summary>
Renvoie le sinus inverse d'une valeur, en radians.


```python
>>> round(ASIN(-0.5), 9)
-0.523598776
```

```python
>>> round(ASIN(-0.5)*180/PI(), 10)
-30.0
```

```python
>>> round(DEGREES(ASIN(-0.5)), 10)
-30.0
```

</details>
<details markdown><summary >
#### <code>__ASINH__(value)</code> {: #asinh data-toc-label="ASINH" }
</summary>
Renvoie le sinus hyperbolique inverse d'un nombre.


```python
>>> round(ASINH(-2.5), 9)
-1.647231146
```

```python
>>> round(ASINH(10), 9)
2.99822295
```

</details>
<details markdown><summary >
#### <code>__ATAN__(value)</code> {: #atan data-toc-label="ATAN" }
</summary>
Renvoie l'arc tangente d'une valeur, en radians.


```python
>>> round(ATAN(1), 9)
0.785398163
```

```python
>>> ATAN(1)*180/PI()
45.0
```

```python
>>> DEGREES(ATAN(1))
45.0
```

</details>
<details markdown><summary >
#### <code>__ATAN2__(x, y)</code> {: #atan2 data-toc-label="ATAN2" }
</summary>
Renvoie l'angle entre l'axe x et un segment de ligne allant de l'origine (0,0) à la paire de coordonnées spécifiée (`x`,`y`), en radians.


```python
>>> round(ATAN2(1, 1), 9)
0.785398163
```

```python
>>> round(ATAN2(-1, -1), 9)
-2.35619449
```

```python
>>> ATAN2(-1, -1)*180/PI()
-135.0
```

```python
>>> DEGREES(ATAN2(-1, -1))
-135.0
```

```python
>>> round(ATAN2(1,2), 9)
1.107148718
```

</details>
<details markdown><summary >
#### <code>__ATANH__(value)</code> {: #atanh data-toc-label="ATANH" }
</summary>
Renvoie le sinus hyperbolique inverse d'un nombre.


```python
>>> round(ATANH(0.76159416), 9)
1.00000001
```

```python
>>> round(ATANH(-0.1), 9)
-0.100335348
```

</details>
<details markdown><summary >
#### <code>__CEILING__(value, factor=1)</code> {: #ceiling data-toc-label="CEILING" }
</summary>
Arrondit un nombre à la multiple supérieure la plus proche du facteur, ou à l'entier le plus proche si le facteur est
ommis ou 1.


```python
>>> CEILING(2.5, 1)
3
```

```python
>>> CEILING(-2.5, -2)
-4
```

```python
>>> CEILING(-2.5, 2)
-2
```

```python
>>> CEILING(1.5, 0.1)
1.5
```

```python
>>> CEILING(0.234, 0.01)
0.24
```

</details>
<details markdown><summary >
#### <code>__COMBIN__(n, k)</code> {: #combin data-toc-label="COMBIN" }
</summary>
Renvoie le nombre de façons de choisir un certain nombre d'objets dans un ensemble d'une taille donnée d'objets.


```python
>>> COMBIN(8,2)
28
```

```python
>>> COMBIN(4,2)
6
```

```python
>>> COMBIN(10,7)
120
```

</details>
<details markdown><summary >
#### <code>__COS__(angle)</code> {: #cos data-toc-label="COS" }
</summary>
Renvoie le cosinus d'un angle donné en radians.


```python
>>> round(COS(1.047), 7)
0.5001711
```

```python
>>> round(COS(60*PI()/180), 10)
0.5
```

```python
>>> round(COS(RADIANS(60)), 10)
0.5
```

</details>
<details markdown><summary >
#### <code>__COSH__(value)</code> {: #cosh data-toc-label="COSH" }
</summary>
Renvoie le cosinus hyperbolique de tout nombre réel.


```python
>>> round(COSH(4), 6)
27.308233
```

```python
>>> round(COSH(EXP(1)), 7)
7.6101251
```

</details>
<details markdown><summary >
#### <code>__DEGREES__(angle)</code> {: #degrees data-toc-label="DEGREES" }
</summary>
Convertit une valeur d'angle en radians en degrés.


```python
>>> round(DEGREES(ACOS(-0.5)), 10)
120.0
```

```python
>>> DEGREES(PI())
180.0
```

</details>
<details markdown><summary >
#### <code>__EVEN__(value)</code> {: #even data-toc-label="EVEN" }
</summary>
Arrondit un nombre à l'entier pair supérieur le plus proche, en arrondissant loin de zéro.


```python
>>> EVEN(1.5)
2
```

```python
>>> EVEN(3)
4
```

```python
>>> EVEN(2)
2
```

```python
>>> EVEN(-1)
-2
```

</details>
<details markdown><summary >
#### <code>__EXP__(exponent)</code> {: #exp data-toc-label="EXP" }
</summary>
Renvoie le nombre d'Euler, e (~2.718) élevé à une puissance.


```python
>>> round(EXP(1), 8)
2.71828183
```

```python
>>> round(EXP(2), 7)
7.3890561
```

</details>
<details markdown><summary >
#### <code>__FACT__(value)</code> {: #fact data-toc-label="FACT" }
</summary>
Renvoie la factorielle d'un nombre.


```python
>>> FACT(5)
120
```

```python
>>> FACT(1.9)
1
```

```python
>>> FACT(0)
1
```

```python
>>> FACT(1)
1
```

```python
>>> FACT(-1)
Traceback (most recent call last):
  ...
ValueError: factorial() not defined for negative values
```

</details>
<details markdown><summary >
#### <code>__FACTDOUBLE__(value)</code> {: #factdouble data-toc-label="FACTDOUBLE" }
</summary>
Renvoie la "double factorielle" d'un nombre.


```python
>>> FACTDOUBLE(6)
48
```

```python
>>> FACTDOUBLE(7)
105
```

```python
>>> FACTDOUBLE(3)
3
```

```python
>>> FACTDOUBLE(4)
8
```

</details>
<details markdown><summary >
#### <code>__FLOOR__(value, factor=1)</code> {: #floor data-toc-label="FLOOR" }
</summary>
Arrondit un nombre à l'entier multiple inférieur le plus proche de la signification spécifiée.


```python
>>> FLOOR(3.7,2)
2
```

```python
>>> FLOOR(-2.5,-2)
-2
```

```python
>>> FLOOR(2.5,-2)
Traceback (most recent call last):
  ...
ValueError: facteur argument invalide
```

```python
>>> FLOOR(1.58,0.1)
1.5
```

```python
>>> FLOOR(0.234,0.01)
0.23
```

</details>
<details markdown><summary >
#### <code>__GCD__(value1, *more_values)</code> {: #gcd data-toc-label="GCD" }
</summary>
Renvoie le plus grand commun diviseur de un ou plusieurs entiers.


```python
>>> GCD(5, 2)
1
```

```python
>>> GCD(24, 36)
12
```

```python
>>> GCD(7, 1)
1
```

```python
>>> GCD(5, 0)
5
```

```python
>>> GCD(0, 5)
5
```

```python
>>> GCD(5)
5
```

```python
>>> GCD(14, 42, 21)
7
```

</details>
<details markdown><summary >
#### <code>__INT__(value)</code> {: #int data-toc-label="INT" }
</summary>
Arrondit un nombre à l'entier le plus proche qui est inférieur ou égal à lui.


```python
>>> INT(8.9)
8
```

```python
>>> INT(-8.9)
-9
```

```python
>>> 19.5-INT(19.5)
0.5
```

</details>
<details markdown><summary >
#### <code>__LCM__(value1, *more_values)</code> {: #lcm data-toc-label="LCM" }
</summary>
Renvoie le plus petit multiple commun de un ou plusieurs entiers.


```python
>>> LCM(5, 2)
10
```

```python
>>> LCM(24, 36)
72
```

```python
>>> LCM(0, 5)
0
```

```python
>>> LCM(5)
5
```

```python
>>> LCM(10, 100)
100
```

```python
>>> LCM(12, 18)
36
```

```python
>>> LCM(12, 18, 24)
72
```

</details>
<details markdown><summary >
#### <code>__LN__(value)</code> {: #ln data-toc-label="LN" }
</summary>
Renvoie le logarithme d'un nombre, base e (nombre d'Euler).


```python
>>> round(LN(86), 7)
4.4543473
```

```python
>>> round(LN(2.7182818), 7)
1.0
```

```python
>>> round(LN(EXP(3)), 10)
3.0
```

</details>
<details markdown><summary >
#### <code>__LOG__(value, base=10)</code> {: #log data-toc-label="LOG" }
</summary>
Renvoie le logarithme d'un nombre donné une base.


```python
>>> LOG(10)
1.0
```

```python
>>> LOG(8, 2)
3.0
```

```python
>>> round(LOG(86, 2.7182818), 7)
4.4543473
```

</details>
<details markdown><summary >
#### <code>__LOG10__(value)</code> {: #log10 data-toc-label="LOG10" }
</summary>
Renvoie le logarithme d'un nombre, base 10.


```python
>>> round(LOG10(86), 9)
1.934498451
```

```python
>>> LOG10(10)
1.0
```

```python
>>> LOG10(100000)
5.0
```

```python
>>> LOG10(10**5)
5.0
```

</details>
<details markdown><summary >
#### <code>__MOD__(dividend, divisor)</code> {: #mod data-toc-label="MOD" }
</summary>
Renvoie le résultat de l'opérateur modulo, le reste après une opération de division.


```python
>>> MOD(3, 2)
1
```

```python
>>> MOD(-3, 2)
1
```

```python
>>> MOD(3, -2)
-1
```

```python
>>> MOD(-3, -2)
-1
```

</details>
<details markdown><summary >
#### <code>__MROUND__(value, factor)</code> {: #mround data-toc-label="MROUND" }
</summary>
Arrondit un nombre à l'entier multiple le plus proche d'un autre.


```python
>>> MROUND(10, 3)
9
```

```python
>>> MROUND(-10, -3)
-9
```

```python
>>> round(MROUND(1.3, 0.2), 10)
1.4
```

```python
>>> MROUND(5, -2)
Traceback (most recent call last):
  ...
ValueError: facteur argument invalide
```

</details>
<details markdown><summary >
#### <code>__MULTINOMIAL__(value1, *more_values)</code> {: #multinomial data-toc-label="MULTINOMIAL" }
</summary>
Renvoie la factorielle de la somme des valeurs divisée par le produit des factorielles des valeurs.


```python
>>> MULTINOMIAL(2, 3, 4)
1260
```

```python
>>> MULTINOMIAL(3)
1
```

```python
>>> MULTINOMIAL(1,2,3)
60
```

```python
>>> MULTINOMIAL(0,2,4,6)
13860
```

</details>
<details markdown><summary >
#### <code>__NUM__(value)</code> {: #num data-toc-label="NUM" }
</summary>
Pour une valeur flottante Python qui est en fait un entier, renvoie un type entier Python.
Sinon, renvoie la valeur inchangée. Cela est parfois utile lorsqu'une valeur provient d'une
colonne numérique Grist (représentée comme des flottants), mais lorsque des valeurs int sont en fait attendues.


```python
>>> NUM(-17.0)
-17
```

```python
>>> NUM(1.5)
1.5
```

```python
>>> NUM(4)
4
```

```python
>>> NUM("NA")
'NA'
```

</details>
<details markdown><summary >
#### <code>__ODD__(value)</code> {: #odd data-toc-label="ODD" }
</summary>
Arrondit un nombre à l'entier impair supérieur le plus proche.


```python
>>> ODD(1.5)
3
```

```python
>>> ODD(3)
3
```

```python
>>> ODD(2)
3
```

```python
>>> ODD(-1)
-1
```

```python
>>> ODD(-2)
-3
```

</details>
<details markdown><summary >
#### <code>__PI__()</code> {: #pi data-toc-label="PI" }
</summary>
Renvoie la valeur de Pi à 14 décimales.


```python
>>> round(PI(), 9)
3.141592654
```

```python
>>> round(PI()/2, 9)
1.570796327
```

```python
>>> round(PI()*9, 8)
28.27433388
```

</details>
<details markdown><summary >
#### <code>__POWER__(base, exponent)</code> {: #power data-toc-label="POWER" }
</summary>
Renvoie un nombre élevé à une puissance.


```python
>>> POWER(5,2)
25.0
```

```python
>>> round(POWER(98.6,3.2), 3)
2401077.222
```

```python
>>> round(POWER(4,5.0/4), 9)
5.656854249
```

</details>
<details markdown><summary >
#### <code>__PRODUCT__(factor1, *more_factors)</code> {: #product data-toc-label="PRODUCT" }
</summary>
Renvoie le résultat de la multiplication d'une série de nombres. Chaque argument peut être un nombre ou
un tableau.


```python
>>> PRODUCT([5,15,30])
2250
```

```python
>>> PRODUCT([5,15,30], 2)
4500
```

```python
>>> PRODUCT(5,15,[30],[2])
4500
```
</details>
<details markdown><summary >
#### <code>__QUOTIENT__(dividend, divisor)</code> {: #quotient data-toc-label="QUOTIENT" }
</summary>
Renvoie un nombre divisé par un autre, sans le reste.


```python
>>> QUOTIENT(5, 2)
2
```

```python
>>> QUOTIENT(4.5, 3.1)
1
```

```python
>>> QUOTIENT(-10, 3)
-3
```

</details>
<details markdown><summary >
#### <code>__RADIANS__(angle)</code> {: #radians data-toc-label="RADIANS" }
</summary>
Convertit une valeur d'angle en degrés en radians.


```python
>>> round(RADIANS(270), 6)
4.712389
```

</details>
<details markdown><summary >
#### <code>__RAND__()</code> {: #rand data-toc-label="RAND" }
</summary>
Renvoie un nombre aléatoire entre 0 inclus et 1 exclus.
</details>
<details markdown><summary >
#### <code>__RANDBETWEEN__(low, high)</code> {: #randbetween data-toc-label="RANDBETWEEN" }
</summary>
Renvoie un entier aléatoire uniformément entre deux valeurs, inclusif.
</details>
<details markdown><summary >
#### <code>__ROMAN__(number, form_unused=None)</code> {: #roman data-toc-label="ROMAN" }
</summary>
Formate un nombre en chiffres romains. Le deuxième argument est ignoré dans cette implémentation.


```python
>>> ROMAN(499,0)
'CDXCIX'
```

```python
>>> ROMAN(499.2,0)
'CDXCIX'
```

```python
>>> ROMAN(57)
'LVII'
```

```python
>>> ROMAN(1912)
'MCMXII'
```

</details>
<details markdown><summary >
#### <code>__ROUND__(value, places=0)</code> {: #round data-toc-label="ROUND" }
</summary>
Arrondit un nombre à un certain nombre de décimales,
par défaut au nombre entier le plus proche si le nombre de places n'est pas donné.

Arrondit loin de zéro ('vers le haut' pour les nombres positifs)
en cas d'égalité, c'est-à-dire lorsque le dernier chiffre est 5.


```python
>>> ROUND(1.4)
1.0
```

```python
>>> ROUND(1.5)
2.0
```

```python
>>> ROUND(2.5)
3.0
```

```python
>>> ROUND(-2.5)
-3.0
```

```python
>>> ROUND(2.15, 1)
2.2
```

```python
>>> ROUND(-1.475, 2)
-1.48
```

```python
>>> ROUND(21.5, -1)
20.0
```

```python
>>> ROUND(626.3,-3)
1000.0
```

```python
>>> ROUND(1.98,-1)
0.0
```

```python
>>> ROUND(-50.55,-2)
-100.0
```

```python
>>> ROUND(0)
0.0
```

</details>
<details markdown><summary >
#### <code>__ROUNDDOWN__(value, places=0)</code> {: #rounddown data-toc-label="ROUNDDOWN" }
</summary>
Arrondit un nombre à un certain nombre de décimales, en arrondissant toujours vers le bas vers zéro.


```python
>>> ROUNDDOWN(3.2, 0)
3
```

```python
>>> ROUNDDOWN(76.9,0)
76
```

```python
>>> ROUNDDOWN(3.14159, 3)
3.141
```

```python
>>> ROUNDDOWN(-3.14159, 1)
-3.1
```

```python
>>> ROUNDDOWN(31415.92654, -2)
31400
```

</details>
<details markdown><summary >
#### <code>__ROUNDUP__(value, places=0)</code> {: #roundup data-toc-label="ROUNDUP" }
</summary>
Arrondit un nombre à un certain nombre de décimales, en arrondissant toujours vers le haut loin de zéro.


```python
>>> ROUNDUP(3.2,0)
4
```

```python
>>> ROUNDUP(76.9,0)
77
```

```python
>>> ROUNDUP(3.14159, 3)
3.142
```

```python
>>> ROUNDUP(-3.14159, 1)
-3.2
```

```python
>>> ROUNDUP(31415.92654, -2)
31500
```

</details>
<details markdown><summary >
#### <code>__SERIESSUM__(x, n, m, a)</code> {: #seriessum data-toc-label="SERIESSUM" }
</summary>
Étant donné les paramètres x, n, m et a, renvoie la somme de la série de puissance a_1*x^n + a_2*x^(n+m)
+ ... + a_i*x^(n+(i-1)m), où i est le nombre d'entrées dans la plage `a`.


```python
>>> SERIESSUM(1,0,1,1)
1
```

```python
>>> SERIESSUM(2,1,0,[1,2,3])
12
```

```python
>>> SERIESSUM(-3,1,1,[2,4,6])
-132
```

```python
>>> round(SERIESSUM(PI()/4,0,2,[1,-1./FACT(2),1./FACT(4),-1./FACT(6)]), 6)
0.707103
```

</details>
<details markdown><summary >
#### <code>__SIGN__(value)</code> {: #sign data-toc-label="SIGN" }
</summary>
Étant donné un nombre d'entrée, renvoie `-1` s'il est négatif, `1` s'il est positif, et `0` s'il est zéro.


```python
>>> SIGN(10)
1
```

```python
>>> SIGN(4.0-4.0)
0
```

```python
>>> SIGN(-0.00001)
-1
```

</details>
<details markdown><summary >
#### <code>__SIN__(angle)</code> {: #sin data-toc-label="SIN" }
</summary>
Renvoie le sinus d'un angle donné en radians.


```python
>>> round(SIN(PI()), 10)
0.0
```

```python
>>> SIN(PI()/2)
1.0
```

```python
>>> round(SIN(30*PI()/180), 10)
0.5
```

```python
>>> round(SIN(RADIANS(30)), 10)
0.5
```

</details>
<details markdown><summary >
#### <code>__SINH__(value)</code> {: #sinh data-toc-label="SINH" }
</summary>
Renvoie le sinus hyperbolique de tout nombre réel.


```python
>>> round(2.868*SINH(0.0342*1.03), 7)
0.1010491
```

</details>
<details markdown><summary >
#### <code>__SQRT__(value)</code> {: #sqrt data-toc-label="SQRT" }
</summary>
Renvoie la racine carrée positive d'un nombre positif.


```python
>>> SQRT(16)
4.0
```

```python
>>> SQRT(-16)
Traceback (most recent call last):
  ...
ValueError: math domain error
```

```python
>>> SQRT(ABS(-16))
4.0
```

</details>
<details markdown><summary >
#### <code>__SQRTPI__(value)</code> {: #sqrtpi data-toc-label="SQRTPI" }
</summary>
Renvoie la racine carrée positive du produit de Pi et du nombre positif donné.


```python
>>> round(SQRTPI(1), 6)
1.772454
```

```python
>>> round(SQRTPI(2), 6)
2.506628
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__SUBTOTAL__(function_code, range1, range2)</code> {: #subtotal data-toc-label="SUBTOTAL" }
</summary>
Renvoie un sous-total pour une plage verticale de cellules en utilisant une fonction d'agrégation spécifiée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__SUM__(value1, *more_values)</code> {: #sum data-toc-label="SUM" }
</summary>
Renvoie la somme d'une série de nombres. Chaque argument peut être un nombre ou un tableau.
Les valeurs non numériques sont ignorées.


```python
>>> SUM([5,15,30])
50
```

```python
>>> SUM([5.,15,30], 2)
52.0
```

```python
>>> SUM(5,15,[30],[2])
52
```
</details>
<details markdown><summary class="unimplemented">
#### <code>__SUMIF__(records, criterion, sum_range)</code> {: #sumif data-toc-label="SUMIF" }
</summary>
Renvoie une somme conditionnelle sur une plage.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__SUMIFS__(sum_range, criteria_range1, criterion1, *args)</code> {: #sumifs data-toc-label="SUMIFS" }
</summary>
Renvoie la somme d'une plage en fonction de plusieurs critères.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__SUMPRODUCT__(array1, *more_arrays)</code> {: #sumproduct data-toc-label="SUMPRODUCT" }
</summary>
Multiplie les composants correspondants dans deux tableaux de taille égale,
et renvoie la somme de ces produits.


```python
>>> SUMPRODUCT([3,8,1,4,6,9], [2,6,5,7,7,3])
156
```

```python
>>> SUMPRODUCT([], [], [])
0
```

```python
>>> SUMPRODUCT([-0.25], [-2], [-3])
-1.5
```

```python
>>> SUMPRODUCT([-0.25, -0.25], [-2, -2], [-3, -3])
-3.0
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__SUMSQ__(value1, value2)</code> {: #sumsq data-toc-label="SUMSQ" }
</summary>
Renvoie la somme des carrés d'une série de nombres et/ou de cellules.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__TAN__(angle)</code> {: #tan data-toc-label="TAN" }
</summary>
Renvoie la tangente d'un angle donné en radians.


```python
>>> round(TAN(0.785), 8)
0.99920399
```

```python
>>> round(TAN(45*PI()/180), 10)
1.0
```

```python
>>> round(TAN(RADIANS(45)), 10)
1.0
```

</details>
<details markdown><summary >
#### <code>__TANH__(value)</code> {: #tanh data-toc-label="TANH" }
</summary>
Renvoie la tangente hyperbolique de tout nombre réel.


```python
>>> round(TANH(-2), 6)
-0.964028
```

```python
>>> TANH(0)
0.0
```

```python
>>> round(TANH(0.5), 6)
0.462117
```

</details>
<details markdown><summary >
#### <code>__TRUNC__(value, places=0)</code> {: #trunc data-toc-label="TRUNC" }
</summary>
Tronque un nombre à un certain nombre de chiffres significatifs en omettant les chiffres moins significatifs.


```python
>>> TRUNC(8.9)
8
```

```python
>>> TRUNC(-8.9)
-8
```

```python
>>> TRUNC(0.45)
0
```

</details>
<details markdown><summary >
#### <code>__UUID__()</code> {: #uuid data-toc-label="UUID" }
</summary>
Génère un identifiant de chaîne formaté UUID aléatoire.

Puisque UUID() produit une valeur différente chaque fois qu'il est appelé, il est préférable de l'utiliser dans
[formule de déclenchement](formulas.md#trigger-formulas) pour de nouveaux enregistrements.
Cela ne calculerait UUID() qu'une seule fois et figerait la valeur calculée. En revanche, une formule ordinaire peut être recalculée à chaque fois que le document est rechargé, produisant une valeur différente pour
UUID() à chaque fois.
</details>
### Horaire
<details markdown><summary >
#### <code>__SCHEDULE__(schedule, start=None, count=10, end=None)</code> {: #schedule data-toc-label="SCHEDULE" }
</summary>
Renvoie la liste des objets `datetime` générés selon la chaîne `horaire`. Commence à
`début`, qui par défaut est NOW(). Génère au maximum `compte` résultats (10 par défaut). Si `fin` est donné, s'arrête là.

L'horaire a le format "INTERVALLE : SLOTS, ...". Par exemple :

    annuel : Jan-15, Apr-15, Jul-15  -- Trois fois par an aux dates données à minuit.
    annuel : 1/15, 4/15, 7/15        -- Identique à ce qui précède.
    mensuel : /1 14h, /15 14h        -- Le 1er et le 15 de chaque mois, à 14h.
    3-mois : /10, +1m /20           -- Tous les 3 mois le 10 du mois 1, le 20 du mois 2.
    hebdomadaire : Lu 9h, Ma 9h, Ve 14h  -- Trois fois par semaine à des heures spécifiées.
    2-semaines : Lu, +1s Ma             -- Toutes les 2 semaines le lundi de la semaine 1, le mardi de la semaine 2.
    quotidien : 07:30, 21:00             -- Deux fois par jour à des heures spécifiées.
    2-jours : 00h, 16h, +1j 08h       -- Trois fois tous les deux jours, espacés uniformément.
    horaire : :15, :45                -- 15 minutes avant et après chaque heure.
    4-heures : :00, 1:20, 2:40         -- Trois fois toutes les 4 heures, espacés uniformément.
    10-minutes : +0s                  -- Toutes les 10 minutes à la minute.

L'INTERVALLE doit être soit de la forme `N-unité` où `N` est un nombre et `unité` est l'un des `année`,
`mois`, `semaine`, `jour`, `heure`; ou l'un des alias : `annuel`, `mensuel`, `hebdomadaire`, `quotidien`,
`horaire`, qui signifient `1-année`, `1-mois`, etc.

Les SLOTS prennent en charge les unités suivantes :

    `Jan-15` ou `1/15`    -- Mois et jour du mois ; disponible lorsque l'INTERVALLE est basé sur l'année.
    `/15`                 -- Jour du mois, disponible lorsque l'INTERVALLE est basé sur le mois.
    `Lun`, `Lu`, `Vendredi` -- Jour de la semaine (ou abréviation), lorsque l'INTERVALLE est basé sur la semaine.
    10h, 13h30, 15h45   -- Heure de la journée, disponible pour des intervalles basés sur le jour ou plus longs.
    :45, :00              -- Minutes de l'heure, disponibles lorsque l'INTERVALLE est basé sur l'heure.
    +1j, +15j             -- Combien de jours ajouter au début de l'INTERVALLE.
    +1s                   -- Combien de semaines ajouter au début de l'INTERVALLE.
    +1m                   -- Combien de mois ajouter au début de l'INTERVALLE.

Les SLOTS sont toujours relatifs à l'INTERVALLE plutôt qu'à `début`. Les intervalles basés sur la semaine commencent
le dimanche. Par exemple, `hebdomadaire : +1j, +4j` est identique à `hebdomadaire : Lun, Jeu`, et génère des heures
les lundis et jeudis, quel que soit `début`.

Le premier temps généré est déterminé par l'*unité* de l'INTERVALLE sans tenir compte du multiple. Par exemple, à la fois "2-semaine : Lun" et "3-semaine : Lun" commencent le premier lundi après `début`, et
génèrent ensuite soit tous les deuxièmes soit tous les troisièmes lundis après cela. De même, `24-heures : :00`
commence avec le premier début d'heure après `début` (pas avec minuit), puis se répète toutes les 24 heures. Pour commencer avec la minuit après `début`, utilisez `quotidien : 0:00`.

Pour les unités d'intervalle d'un jour ou plus, si l'heure de la journée n'est pas spécifiée, elle par défaut à minuit.

Le fuseau horaire de `début` détermine le fuseau horaire des temps générés.


```python
>>> def show(dates): return [d.strftime("%Y-%m-%d %H:%M") for d in dates]

```

```python
>>> start = datetime(2018, 9, 4, 14, 0);   # 14h le mardi 4 septembre 2018.

```


```python
>>> show(SCHEDULE('annual: Jan-15, Apr-15, Jul-15, Oct-15', start=start, count=4))
['2018-10-15 00:00', '2019-01-15 00:00', '2019-04-15 00:00', '2019-07-15 00:00']
```


```python
>>> show(SCHEDULE('annual: 1/15, 4/15, 7/15', start=start, count=4))
['2019-01-15 00:00', '2019-04-15 00:00', '2019-07-15 00:00', '2020-01-15 00:00']
```


```python
>>> show(SCHEDULE('monthly: /1 14h, /15 17h', start=start, count=4))
['2018-09-15 17:00', '2018-10-01 14:00', '2018-10-15 17:00', '2018-11-01 14:00']
```


```python
>>> show(SCHEDULE('3-months: /10, +1m /20', start=start, count=4))
['2018-09-10 00:00', '2018-10-20 00:00', '2018-12-10 00:00', '2019-01-20 00:00']
```


```python
>>> show(SCHEDULE('weekly: Lu 9h, Ma 9h, Ve 14h', start=start, count=4))
['2018-09-07 14:00', '2018-09-10 09:00', '2018-09-11 09:00', '2018-09-14 14:00']
```


```python
>>> show(SCHEDULE('2-semaines: Lu, +1s Ma', start=start, count=4))
['2018-09-11 00:00', '2018-09-17 00:00', '2018-09-25 00:00', '2018-10-01 00:00']
```


```python
>>> show(SCHEDULE('quotidien: 07:30, 21:00', start=start, count=4))
['2018-09-04 21:00', '2018-09-05 07:30', '2018-09-05 21:00', '2018-09-06 07:30']
```


```python
>>> show(SCHEDULE('2-jours: 00h, 16h, +1j 08h', start=start, count=4))
['2018-09-04 16:00', '2018-09-05 08:00', '2018-09-06 00:00', '2018-09-06 16:00']
```


```python
>>> show(SCHEDULE('horaire: :15, :45', start=start, count=4))
['2018-09-04 14:15', '2018-09-04 14:45', '2018-09-04 15:15', '2018-09-04 15:45']
```


```python
>>> show(SCHEDULE('4-heures: :00, +1H :20, +2H :40', start=start, count=4))
['2018-09-04 14:00', '2018-09-04 15:20', '2018-09-04 16:40', '2018-09-04 18:00']
```

</details>
### Statistiques
<details markdown><summary class="unimplemented">
#### <code>__AVEDEV__(value1, value2)</code> {: #avedev data-toc-label="AVEDEV" }
</summary>
Calcule la moyenne des magnitudes des écarts des données par rapport à la moyenne d'un ensemble de données.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__AVERAGE__(value, *more_values)</code> {: #average data-toc-label="AVERAGE" }
</summary>
Renvoie la valeur moyenne numérique dans un ensemble de données, en ignorant les valeurs non numériques.

Chaque argument peut être une valeur ou un tableau. Les valeurs qui ne sont pas des nombres, y compris les valeurs logiques
et vides, et les représentations textuelles de nombres, sont ignorées.


```python
>>> AVERAGE([2, -1.0, 11])
4.0
```

```python
>>> AVERAGE([2, -1, 11, "Bonjour"])
4.0
```

```python
>>> AVERAGE([2, -1, "Bonjour", DATE(2015,1,1)], True, [False, "123", "", 11])
4.0
```

```python
>>> AVERAGE(False, True)
Traceback (most recent call last):
  ...
ZeroDivisionError: float division by zero
```

</details>
<details markdown><summary >
#### <code>__AVERAGEA__(value, *more_values)</code> {: #averagea data-toc-label="AVERAGEA" }
</summary>
Renvoie la valeur moyenne numérique dans un ensemble de données, en comptant les valeurs non numériques comme 0.

Chaque argument peut être une valeur ou un tableau. Les valeurs qui ne sont pas des nombres, y compris les dates et les représentations textuelles de nombres, sont comptées comme 0 (zéro). La valeur logique de True est comptée comme 1, et False comme 0.


```python
>>> AVERAGEA([2, -1.0, 11])
4.0
```

```python
>>> AVERAGEA([2, -1, 11, "Bonjour"])
3.0
```

```python
>>> AVERAGEA([2, -1, "Bonjour", DATE(2015,1,1)], True, [False, "123", "", 11.5])
1.5
```

```python
>>> AVERAGEA(False, True)
0.5
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__AVERAGEIF__(criteria_range, criterion, average_range=None)</code> {: #averageif data-toc-label="AVERAGEIF" }
</summary>
Renvoie la moyenne d'une plage en fonction de critères.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__AVERAGEIFS__(average_range, criteria_range1, criterion1, *args)</code> {: #averageifs data-toc-label="AVERAGEIFS" }
</summary>
Renvoie la moyenne d'une plage en fonction de plusieurs critères.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__AVERAGE_WEIGHTED__(pairs)</code> {: #average_weighted data-toc-label="AVERAGE_WEIGHTED" }
</summary>
Étant donné une liste de paires (valeur, poids), trouve la moyenne des valeurs pondérées par les
poids correspondants. Ignore toutes les paires avec une valeur ou un poids non numérique.

Si vous avez deux listes, de valeurs et de poids, utilisez la fonction intégrée Python zip() pour créer une
liste de paires.


```python
>>> AVERAGE_WEIGHTED(((95, .25), (90, .1), ("X", .5), (85, .15), (88, .2), (82, .3), (70, None)))
87.7
```

```python
>>> AVERAGE_WEIGHTED(zip([95, 90, "X", 85, 88, 82, 70], [25, 10, 50, 15, 20, 30, None]))
87.7
```

```python
>>> AVERAGE_WEIGHTED(zip([95, 90, False, 85, 88, 82, 70], [.25, .1, .5, .15, .2, .3, True]))
87.7
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__BINOMDIST__(num_successes, num_trials, prob_success, cumulative)</code> {: #binomdist data-toc-label="BINOMDIST" }
</summary>
Calcule la probabilité de tirer un certain nombre de succès (ou un nombre maximum de succès) dans un certain nombre d'essais donné une population d'une certaine taille contenant un certain nombre de succès, avec remplacement des tirages.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__CONFIDENCE__(alpha, standard_deviation, pop_size)</code> {: #confidence data-toc-label="CONFIDENCE" }
</summary>
Calcule la largeur de la moitié de l'intervalle de confiance pour une distribution normale.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__CORREL__(data_y, data_x)</code> {: #correl data-toc-label="CORREL" }
</summary>
Calcule r, le coefficient de corrélation de produit-moment de Pearson d'un ensemble de données.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__COUNT__(value, *more_values)</code> {: #count data-toc-label="COUNT" }
</summary>
Renvoie le nombre de valeurs numériques et de dates/datetime dans un ensemble de données,
ignorant d'autres types de valeurs.

Chaque argument peut être une valeur ou un tableau. Les valeurs qui ne sont pas des nombres ou des dates, y compris les valeurs logiques
et vides, et les représentations textuelles de nombres, sont ignorées.


```python
>>> COUNT([2, -1.0, 11])
3
```

```python
>>> COUNT([2, -1, 11, "Bonjour"])
3
```

```python
>>> COUNT([DATE(2000, 1, 1), DATE(2000, 1, 2), DATE(2000, 1, 3), "Bonjour"])
3
```

```python
>>> COUNT([2, -1, "Bonjour", DATE(2015,1,1)], True, [False, "123", "", 11.5])
4
```

```python
>>> COUNT(False, True)
0
```

</details>
<details markdown><summary >
#### <code>__COUNTA__(value, *more_values)</code> {: #counta data-toc-label="COUNTA" }
</summary>
Renvoie le nombre de toutes les valeurs dans un ensemble de données, y compris les valeurs non numériques.

Chaque argument peut être une valeur ou un tableau.


```python
>>> COUNTA([2, -1.0, 11])
3
```

```python
>>> COUNTA([2, -1, 11, "Bonjour"])
4
```

```python
>>> COUNTA([2, -1, "Bonjour", DATE(2015,1,1)], True, [False, "123", "", 11.5])
9
```

```python
>>> COUNTA(False, True)
2
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__COVAR__(data_y, data_x)</code> {: #covar data-toc-label="COVAR" }
</summary>
Calcule la covariance d'un ensemble de données.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__CRITBINOM__(num_trials, prob_success, target_prob)</code> {: #critbinom data-toc-label="CRITBINOM" }
</summary>
Calcule la plus petite valeur pour laquelle la distribution binomiale cumulative est supérieure ou égale à un critère spécifié.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__DEVSQ__(value1, value2)</code> {: #devsq data-toc-label="DEVSQ" }
</summary>
Calcule la somme des carrés des écarts basés sur un échantillon.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__EXPONDIST__(x, lambda_, cumulative)</code> {: #expondist data-toc-label="EXPONDIST" }
</summary>
Renvoie la valeur de la fonction de distribution exponentielle avec un lambda spécifié à une valeur spécifiée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__FDIST__(x, degrees_freedom1, degrees_freedom2)</code> {: #fdist data-toc-label="FDIST" }
</summary>
Calcule la distribution de probabilité F à droite (degré de diversité) pour deux ensembles de données
avec l'entrée x donnée. Également appelée distribution de Fisher-Snedecor ou distribution F de Snedecor.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__FISHER__(value)</code> {: #fisher data-toc-label="FISHER" }
</summary>
Renvoie la transformation de Fisher d'une valeur spécifiée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__FISHERINV__(value)</code> {: #fisherinv data-toc-label="FISHERINV" }
</summary>
Renvoie la transformation inverse de Fisher d'une valeur spécifiée.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__FORECAST__(x, data_y, data_x)</code> {: #forecast data-toc-label="FORECAST" }
</summary>
Calcule la valeur y attendue pour un x spécifié basé sur une régression linéaire d'un ensemble de données.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__F_DIST__(x, degrees_freedom1, degrees_freedom2, cumulative)</code> {: #f_dist data-toc-label="F_DIST" }
</summary>
Calcule la distribution de probabilité F à gauche (degré de diversité) pour deux ensembles de données
avec l'entrée x donnée. Également appelée distribution de Fisher-Snedecor ou distribution F de Snedecor.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__F_DIST_RT__(x, degrees_freedom1, degrees_freedom2)</code> {: #f_dist_rt data-toc-label="F_DIST_RT" }
</summary>
Calcule la distribution de probabilité F à droite (degré de diversité) pour deux ensembles de données
avec l'entrée x donnée. Également appelée distribution de Fisher-Snedecor ou distribution F de Snedecor.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__GEOMEAN__(value1, value2)</code> {: #geomean data-toc-label="GEOMEAN" }
</summary>
Calcule la moyenne géométrique d'un ensemble de données.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__HARMEAN__(value1, value2)</code> {: #harmean data-toc-label="HARMEAN" }
</summary>
Calcule la moyenne harmonique d'un ensemble de données.

<span class="grist-tip">Note</span>Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__HYPGEOMDIST__(num_successes, num_draws, successes_in_pop, pop_size)</code> {: #hypgeomdist data-toc-label="HYPGEOMDIST" }
</summary>
Calcule la probabilité de tirer un certain nombre de succès dans un certain nombre d'essais, étant donné une population d'une certaine taille contenant un certain nombre de succès, sans remplacement des tirages.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__INTERCEPT__(data_y, data_x)</code> {: #intercept data-toc-label="INTERCEPT" }
</summary>
Calcule la valeur y à laquelle la ligne résultant de la régression linéaire d'un ensemble de données va intersecter l'axe y (x=0).

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__KURT__(value1, value2)</code> {: #kurt data-toc-label="KURT" }
</summary>
Calcule la kurtose d'un ensemble de données, qui décrit la forme, et en particulier le "pic" de cet ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__LARGE__(data, n)</code> {: #large data-toc-label="LARGE" }
</summary>
Renvoie le n-ième plus grand élément d'un ensemble de données, où n est défini par l'utilisateur.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__LOGINV__(x, mean, standard_deviation)</code> {: #loginv data-toc-label="LOGINV" }
</summary>
Renvoie la valeur de la distribution cumulative log-normale inverse avec une moyenne et un écart type donnés à une valeur spécifiée.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__LOGNORMDIST__(x, mean, standard_deviation)</code> {: #lognormdist data-toc-label="LOGNORMDIST" }
</summary>
Renvoie la valeur de la distribution cumulative log-normale avec une moyenne et un écart type donnés à une valeur spécifiée.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__MAX__(value, *more_values)</code> {: #max data-toc-label="MAX" }
</summary>
Renvoie la valeur maximale d'un ensemble de données, en ignorant les valeurs autres que les nombres et les dates/datetime.

Chaque argument peut être une valeur ou un tableau. Les valeurs qui ne sont pas des nombres ou des dates, y compris les valeurs logiques et les valeurs vides, ainsi que les représentations textuelles de nombres, sont ignorées. Renvoie 0 si les arguments ne contiennent aucun nombre ou date.

```python
>>> MAX([2, -1.5, 11.5])
11.5
```

```python
>>> MAX([2, -1.5, "Hello"], True, [False, "123", "", 11.5])
11.5
```

```python
>>> MAX(True, -123)
-123
```

```python
>>> MAX("123", -123)
-123
```

```python
>>> MAX("Hello", "123", True, False)
0
```

```python
>>> MAX(DATE(2015, 1, 1), DATE(2015, 1, 2))
datetime.date(2015, 1, 2)
```

```python
>>> MAX(DATE(2015, 1, 1), datetime.datetime(2015, 1, 1, 12, 34, 56))
datetime.datetime(2015, 1, 1, 12, 34, 56)
```

```python
>>> MAX(DATE(2015, 1, 2), datetime.datetime(2015, 1, 1, 12, 34, 56))
datetime.date(2015, 1, 2)
```

</details>
<details markdown><summary >
#### <code>__MAXA__(value, *more_values)</code> {: #maxa data-toc-label="MAXA" }
</summary>
Renvoie la valeur numérique maximale d'un ensemble de données.

Chaque argument peut être une valeur d'un tableau. Les valeurs qui ne sont pas des nombres, y compris les dates et les représentations textuelles de nombres, sont comptées comme 0 (zéro). La valeur logique de True est comptée comme 1, et False comme 0. Renvoie 0 si les arguments ne contiennent aucun nombre.

```python
>>> MAXA([2, -1.5, 11.5])
11.5
```

```python
>>> MAXA([2, -1.5, "Hello", DATE(2015, 1, 1)], True, [False, "123", "", 11.5])
11.5
```

```python
>>> MAXA(True, -123)
1
```

```python
>>> MAXA("123", -123)
0
```

```python
>>> MAXA("Hello", "123", DATE(2015, 1, 1))
0
```

</details>
<details markdown><summary >
#### <code>__MEDIAN__(value, *more_values)</code> {: #median data-toc-label="MEDIAN" }
</summary>
Renvoie la valeur médiane d'un ensemble de données numériques, en ignorant les valeurs non numériques.

Chaque argument peut être une valeur ou un tableau. Les valeurs qui ne sont pas des nombres, y compris les valeurs logiques et les valeurs vides, ainsi que les représentations textuelles de nombres, sont ignorées.

Produit une erreur si les arguments ne contiennent aucun nombre.

La médiane est le nombre du milieu lorsque toutes les valeurs sont triées. Ainsi, la moitié des valeurs dans l'ensemble de données sont inférieures à la médiane, et l'autre moitié est supérieure. S'il y a un nombre pair de valeurs dans l'ensemble de données, renvoie la moyenne des deux nombres du milieu.

```python
>>> MEDIAN(1, 2, 3, 4, 5)
3
```

```python
>>> MEDIAN(3, 5, 1, 4, 2)
3
```

```python
>>> MEDIAN(range(10))
4.5
```

```python
>>> MEDIAN("Hello", "123", DATE(2015, 1, 1), 12.3)
12.3
```

```python
>>> MEDIAN("Hello", "123", DATE(2015, 1, 1))
Traceback (most recent call last):
  ...
ValueError: MEDIAN requires at least one number
```

</details>
<details markdown><summary >
#### <code>__MIN__(value, *more_values)</code> {: #min data-toc-label="MIN" }
</summary>
Renvoie la valeur minimale d'un ensemble de données, en ignorant les valeurs autres que les nombres et les dates/datetimes.

Chaque argument peut être une valeur ou un tableau. Les valeurs qui ne sont pas des nombres ou des dates, y compris les valeurs logiques et les valeurs vides, ainsi que les représentations textuelles de nombres, sont ignorées. Renvoie 0 si les arguments ne contiennent aucun nombre ou date.

```python
>>> MIN([2, -1.5, 11.5])
-1.5
```

```python
>>> MIN([2, -1.5, "Hello"], True, [False, "123", "", 11.5])
-1.5
```

```python
>>> MIN(True, 123)
123
```

```python
>>> MIN("-123", 123)
123
```

```python
>>> MIN("Hello", "123", True, False)
0
```

```python
>>> MIN(DATE(2015, 1, 1), DATE(2015, 1, 2))
datetime.date(2015, 1, 1)
```

```python
>>> MIN(DATE(2015, 1, 1), datetime.datetime(2015, 1, 1, 12, 34, 56))
datetime.date(2015, 1, 1)
```

```python
>>> MIN(DATE(2015, 1, 2), datetime.datetime(2015, 1, 1, 12, 34, 56))
datetime.datetime(2015, 1, 1, 12, 34, 56)
```

</details>
<details markdown><summary >
#### <code>__MINA__(value, *more_values)</code> {: #mina data-toc-label="MINA" }
</summary>
Renvoie la valeur numérique minimale d'un ensemble de données.

Chaque argument peut être une valeur d'un tableau. Les valeurs qui ne sont pas des nombres, y compris les dates et les représentations textuelles de nombres, sont comptées comme 0 (zéro). La valeur logique de True est comptée comme 1, et False comme 0. Renvoie 0 si les arguments ne contiennent aucun nombre.

```python
>>> MINA([2, -1.5, 11.5])
-1.5
```

```python
>>> MINA([2, -1.5, "Hello", DATE(2015, 1, 1)], True, [False, "123", "", 11.5])
-1.5
```

```python
>>> MINA(True, 123)
1
```

```python
>>> MINA("-123", 123)
0
```

```python
>>> MINA("Hello", "123", DATE(2015, 1, 1))
0
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__MODE__(value1, value2)</code> {: #mode data-toc-label="MODE" }
</summary>
Renvoie la valeur la plus courante dans un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__NEGBINOMDIST__(num_failures, num_successes, prob_success)</code> {: #negbinomdist data-toc-label="NEGBINOMDIST" }
</summary>
Calcule la probabilité de tirer un certain nombre d'échecs avant un certain nombre de succès, étant donné une probabilité de succès dans des essais indépendants.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__NORMDIST__(x, mean, standard_deviation, cumulative)</code> {: #normdist data-toc-label="NORMDIST" }
</summary>
Renvoie la valeur de la fonction de distribution normale (ou fonction de distribution cumulative normale) pour une valeur spécifiée, une moyenne et un écart type.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__NORMINV__(x, mean, standard_deviation)</code> {: #norminv data-toc-label="NORMINV" }
</summary>
Renvoie la valeur de la fonction de distribution normale inverse pour une valeur spécifiée, une moyenne et un écart type.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__NORMSDIST__(x)</code> {: #normsdist data-toc-label="NORMSDIST" }
</summary>
Renvoie la valeur de la fonction de distribution cumulative normale standard pour une valeur spécifiée.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__NORMSINV__(x)</code> {: #normsinv data-toc-label="NORMSINV" }
</summary>
Renvoie la valeur de la fonction de distribution normale standard inverse pour une valeur spécifiée.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PEARSON__(data_y, data_x)</code> {: #pearson data-toc-label="PEARSON" }
</summary>
Calcule r, le coefficient de corrélation produit-moment de Pearson d'un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PERCENTILE__(data, percentile)</code> {: #percentile data-toc-label="PERCENTILE" }
</summary>
Renvoie la valeur à un certain percentile d'un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PERCENTRANK__(data, value, significant_digits=None)</code> {: #percentrank data-toc-label="PERCENTRANK" }
</summary>
Renvoie le rang en pourcentage (percentile) d'une valeur spécifiée dans un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PERCENTRANK_EXC__(data, value, significant_digits=None)</code> {: #percentrank_exc data-toc-label="PERCENTRANK_EXC" }
</summary>
Renvoie le rang en pourcentage (percentile) de 0 à 1 exclusif d'une valeur spécifiée dans un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PERCENTRANK_INC__(data, value, significant_digits=None)</code> {: #percentrank_inc data-toc-label="PERCENTRANK_INC" }
</summary>
Renvoie le rang en pourcentage (percentile) de 0 à 1 inclusif d'une valeur spécifiée dans un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PERMUT__(n, k)</code> {: #permut data-toc-label="PERMUT" }
</summary>
Renvoie le nombre de façons de choisir un certain nombre d'objets à partir d'un ensemble d'une taille donnée d'objets, en tenant compte de l'ordre.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__POISSON__(x, mean, cumulative)</code> {: #poisson data-toc-label="POISSON" }
</summary>
Renvoie la valeur de la fonction de distribution de Poisson (ou fonction de distribution cumulative de Poisson) pour une valeur et une moyenne spécifiées.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__PROB__(data, probabilities, low_limit, high_limit=None)</code> {: #prob data-toc-label="PROB" }
</summary>
Étant donné un ensemble de valeurs et des probabilités correspondantes, calcule la probabilité qu'une valeur choisie au hasard tombe entre deux limites.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__QUARTILE__(data, quartile_number)</code> {: #quartile data-toc-label="QUARTILE" }
</summary>
Renvoie une valeur la plus proche d'un certain quartile d'un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__RANK_AVG__(value, data, is_ascending=None)</code> {: #rank_avg data-toc-label="RANK_AVG" }
</summary>
Renvoie le rang d'une valeur spécifiée dans un ensemble de données. S'il y a plus d'une entrée de la même valeur dans l'ensemble de données, le rang moyen des entrées sera renvoyé.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__RANK_EQ__(value, data, is_ascending=None)</code> {: #rank_eq data-toc-label="RANK_EQ" }
</summary>
Renvoie le rang d'une valeur spécifiée dans un ensemble de données. S'il y a plus d'une entrée de la même valeur dans l'ensemble de données, le meilleur rang des entrées sera renvoyé.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__RSQ__(data_y, data_x)</code> {: #rsq data-toc-label="RSQ" }
</summary>
Calcule le carré de r, le coefficient de corrélation produit-moment de Pearson d'un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__SKEW__(value1, value2)</code> {: #skew data-toc-label="SKEW" }
</summary>
Calcule l'asymétrie d'un ensemble de données, qui décrit la symétrie de cet ensemble de données par rapport à la moyenne.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__SLOPE__(data_y, data_x)</code> {: #slope data-toc-label="SLOPE" }
</summary>
Calcule la pente de la ligne résultant de la régression linéaire d'un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__SMALL__(data, n)</code> {: #small data-toc-label="SMALL" }
</summary>
Renvoie le n-ième plus petit élément d'un ensemble de données, où n est défini par l'utilisateur.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__STANDARDIZE__(value, mean, standard_deviation)</code> {: #standardize data-toc-label="STANDARDIZE" }
</summary>
Calcule l'équivalent normalisé d'une variable aléatoire donnée la moyenne et l'écart type de la distribution.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__STDEV__(value, *more_values)</code> {: #stdev data-toc-label="STDEV" }
</summary>
Calcule l'écart type basé sur un échantillon, en ignorant les valeurs non numériques.

```python
>>> STDEV([2, 5, 8, 13, 10])
4.277849927241488
```

```python
>>> STDEV([2, 5, 8, 13, 10, True, False, "Test"])
4.277849927241488
```

```python
>>> STDEV([2, 5, 8, 13, 10], 3, 12, 15)
4.810702354423639
```

```python
>>> STDEV([2, 5, 8, 13, 10], [3, 12, 15])
4.810702354423639
```

```python
>>> STDEV([5])
Traceback (most recent call last):
  ...
ZeroDivisionError: float division by zero
```

</details>
<details markdown><summary >
#### <code>__STDEVA__(value, *more_values)</code> {: #stdeva data-toc-label="STDEVA" }
</summary>
Calcule l'écart type basé sur un échantillon, en considérant le texte comme la valeur `0`.

```python
>>> STDEVA([2, 5, 8, 13, 10])
4.277849927241488
```

```python
>>> STDEVA([2, 5, 8, 13, 10, True, False, "Test"])
4.969550137731641
```

```python
>>> STDEVA([2, 5, 8, 13, 10], 1, 0, 0)
4.969550137731641
```

```python
>>> STDEVA([2, 5, 8, 13, 10], [1, 0, 0])
4.969550137731641
```

```python
>>> STDEVA([5])
Traceback (most recent call last):
  ...
ZeroDivisionError: float division by zero
```

</details>
<details markdown><summary >
#### <code>__STDEVP__(value, *more_values)</code> {: #stdevp data-toc-label="STDEVP" }
</summary>
Calcule l'écart type basé sur une population entière, en ignorant les valeurs non numériques.

```python
>>> STDEVP([2, 5, 8, 13, 10])
3.8262252939417984
```

```python
>>> STDEVP([2, 5, 8, 13, 10, True, False, "Test"])
3.8262252939417984
```

```python
>>> STDEVP([2, 5, 8, 13, 10], 3, 12, 15)
4.5
```

```python
>>> STDEVP([2, 5, 8, 13, 10], [3, 12, 15])
4.5
```

```python
>>> STDEVP([5])
0.0
```

</details>
<details markdown><summary >
#### <code>__STDEVPA__(value, *more_values)</code> {: #stdevpa data-toc-label="STDEVPA" }
</summary>
Calcule l'écart type basé sur une population entière, en considérant le texte comme la valeur `0`.

```python
>>> STDEVPA([2, 5, 8, 13, 10])
3.8262252939417984
```

```python
>>> STDEVPA([2, 5, 8, 13, 10, True, False, "Test"])
4.648588495446763
```

```python
>>> STDEVPA([2, 5, 8, 13, 10], 1, 0, 0)
4.648588495446763
```

```python
>>> STDEVPA([2, 5, 8, 13, 10], [1, 0, 0])
4.648588495446763
```

```python
>>> STDEVPA([5])
0.0
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__STEYX__(data_y, data_x)</code> {: #steyx data-toc-label="STEYX" }
</summary>
Calcule l'erreur standard de la valeur y prédite pour chaque x dans la régression d'un ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__TDIST__(x, degrees_freedom, tails)</code> {: #tdist data-toc-label="TDIST" }
</summary>
Calcule la probabilité pour la distribution t de Student avec une entrée donnée (x).

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__TINV__(probability, degrees_freedom)</code> {: #tinv data-toc-label="TINV" }
</summary>
Calcule l'inverse de la fonction TDIST à deux queues.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__TRIMMEAN__(data, exclude_proportion)</code> {: #trimmean data-toc-label="TRIMMEAN" }
</summary>
Calcule la moyenne d'un ensemble de données en excluant une certaine proportion de données des extrémités haute et basse de l'ensemble de données.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__TTEST__(range1, range2, tails, type)</code> {: #ttest data-toc-label="TTEST" }
</summary>
Renvoie la probabilité associée au test t. Détermine si deux échantillons sont susceptibles de provenir des mêmes deux populations sous-jacentes ayant la même moyenne.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__T_INV__(probability, degrees_freedom)</code> {: #t_inv data-toc-label="T_INV" }
</summary>
Calcule l'inverse négatif de la fonction TDIST à une queue.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__T_INV_2T__(probability, degrees_freedom)</code> {: #t_inv_2t data-toc-label="T_INV_2T" }
</summary>
Calcule l'inverse de la fonction TDIST à deux queues.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__VAR__(value1, value2)</code> {: #var data-toc-label="VAR" }
</summary>
Calcule la variance basée sur un échantillon.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__VARA__(value1, value2)</code> {: #vara data-toc-label="VARA" }
</summary>
Calcule une estimation de la variance basée sur un échantillon, en considérant le texte comme la valeur `0`.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__VARP__(value1, value2)</code> {: #varp data-toc-label="VARP" }
</summary>
Calcule la variance basée sur une population entière.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__VARPA__(value1, value2)</code> {: #varpa data-toc-label="VARPA" }
</summary>
Calcule la variance basée sur une population entière, en considérant le texte comme la valeur `0`.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__WEIBULL__(x, shape, scale, cumulative)</code> {: #weibull data-toc-label="WEIBULL" }
</summary>
Renvoie la valeur de la fonction de distribution de Weibull (ou fonction de distribution cumulative de Weibull) pour une forme et une échelle spécifiées.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary class="unimplemented">
#### <code>__ZTEST__(data, value, standard_deviation)</code> {: #ztest data-toc-label="ZTEST" }
</summary>
Renvoie la valeur P à deux queues d'un test Z avec distribution standard.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
### Texte
<details markdown><summary >
#### <code>__CHAR__(table_number)</code> {: #char data-toc-label="CHAR" }
</summary>
Convertit un nombre en un caractère selon la table Unicode actuelle.
Identique à `unichr(number)`.

```python
>>> CHAR(65)
u'A'
```

```python
>>> CHAR(33)
u'!'
```

</details>
<details markdown><summary >
#### <code>__CLEAN__(text)</code> {: #clean data-toc-label="CLEAN" }
</summary>
Renvoie le texte avec les caractères non imprimables supprimés.

Cela supprime à la fois les caractères avec des valeurs de 0 à 31, et d'autres caractères Unicode dans la catégorie "caractères de contrôle".

```python
>>> CLEAN(CHAR(9) + "Rapport mensuel" + CHAR(10))
u'Rapport mensuel'
```

</details>
<details markdown><summary >
#### <code>__CODE__(string)</code> {: #code data-toc-label="CODE" }
</summary>
Renvoie la valeur de la carte Unicode numérique du premier caractère de la chaîne fournie.
Identique à `ord(string[0])`.

```python
>>> CODE("A")
65
```

```python
>>> CODE("!")
33
```

```python
>>> CODE("!A")
33
```

</details>
<details markdown><summary >
#### <code>__CONCAT__(string, *more_strings)</code> {: #concat data-toc-label="CONCAT" }
</summary>
Joint ensemble de chaînes de texte en une seule chaîne. Également disponible sous le nom
`CONCATENATE`. Semblable à l'expression Python `"".join(array_of_strings)`.

```python
>>> CONCAT("Population de ruisseau pour ", "truite", " ", "espèces", " est ", 32, "/mile.")
u'Population de ruisseau pour truite espèces est 32/mile.'
```

```python
>>> CONCAT("Dans ", 4, " jours, c'est ", datetime.date(2016,1,1))
u'Dans 4 jours, c'est 2016-01-01'
```

```python
>>> CONCAT("abc")
u'abc'
```

```python
>>> CONCAT(0, "abc")
u'0abc'
```

```python
>>> assert CONCAT(2, u" crème ", u"brûlée") == u'2 crème brûlée'
```

</details>
<details markdown><summary >
#### <code>__CONCATENATE__(string, *more_strings)</code> {: #concatenate data-toc-label="CONCATENATE" }
</summary>
Joint ensemble de chaînes de texte en une seule chaîne. Également disponible sous le nom
`CONCAT`. Semblable à l'expression Python `"".join(array_of_strings)`.

```python
>>> CONCATENATE("Population de ruisseau pour ", "truite", " ", "espèces", " est ", 32, "/mile.")
u'Population de ruisseau pour truite espèces est 32/mile.'
```

```python
>>> CONCATENATE("Dans ", 4, " jours, c'est ", datetime.date(2016,1,1))
u'Dans 4 jours, c'est 2016-01-01'
```

```python
>>> CONCATENATE("abc")
u'abc'
```

```python
>>> CONCATENATE(0, "abc")
u'0abc'
```

```python
>>> assert CONCATENATE(2, u" crème ", u"brûlée") == u'2 crème brûlée'
```

```python
>>> assert CONCATENATE(2,  " crème ", u"brûlée") == u'2 crème brûlée'
```

```python
>>> assert CONCATENATE(2,  " crème ",  "brûlée") == u'2 crème brûlée'
```

</details>
<details markdown><summary >
#### <code>__DOLLAR__(number, decimals=2)</code> {: #dollar data-toc-label="DOLLAR" }
</summary>
Formate un nombre en un montant en dollars formaté, avec des décimales arrondies à la place spécifiée (.
Si la valeur des décimales est omise, elle est par défaut à 2.

```python
>>> DOLLAR(1234.567)
'$1,234.57'
```

```python
>>> DOLLAR(1234.567, -2)
'$1,200'
```

```python
>>> DOLLAR(-1234.567, -2)
'($1,200)'
```

```python
>>> DOLLAR(-0.123, 4)
'($0.1230)'
```

```python
>>> DOLLAR(99.888)
'$99.89'
```

```python
>>> DOLLAR(0)
'$0.00'
```

```python
>>> DOLLAR(10, 0)
'$10'
```

</details>
<details markdown><summary >
#### <code>__EXACT__(string1, string2)</code> {: #exact data-toc-label="EXACT" }
</summary>
Teste si deux chaînes sont identiques. Identique à `string2 == string2`.

```python
>>> EXACT("mot", "mot")
True
```

```python
>>> EXACT("Mot", "mot")
False
```

```python
>>> EXACT("m ot", "mot")
False
```

</details>
<details markdown><summary >
#### <code>__FIND__(find_text, within_text, start_num=1)</code> {: #find data-toc-label="FIND" }
</summary>
Renvoie la position à laquelle une chaîne est d'abord trouvée dans le texte.

La recherche est sensible à la casse. La position renvoyée est 1 si within_text commence par find_text.
start_num spécifie le caractère à partir duquel commencer la recherche, par défaut à 1 (le premier
caractère de within_text).

Si find_text n'est pas trouvé, ou si start_num est invalide, lève une ValueError.

```python
>>> FIND("M", "Miriam McGovern")
1
```

```python
>>> FIND("m", "Miriam McGovern")
6
```

```python
>>> FIND("M", "Miriam McGovern", 3)
8
```

```python
>>> FIND(" #", "Hello world # Test")
12
```

```python
>>> FIND("gle", "Google", 1)
4
```

```python
>>> FIND("GLE", "Google", 1)
Traceback (most recent call last):
...
ValueError: substring not found
```

```python
>>> FIND("page", "homepage")
5
```

```python
>>> FIND("page", "homepage", 6)
Traceback (most recent call last):
...
ValueError: substring not found
```

</details>
<details markdown><summary >
#### <code>__FIXED__(number, decimals=2, no_commas=False)</code> {: #fixed data-toc-label="FIXED" }
</summary>
Formate un nombre avec un nombre fixe de décimales (2 par défaut), et des virgules.
Si no_commas est True, alors omet les virgules.

```python
>>> FIXED(1234.567, 1)
'1,234.6'
```

```python
>>> FIXED(1234.567, -1)
'1,230'
```

```python
>>> FIXED(-1234.567, -1, True)
'-1230'
```

```python
>>> FIXED(44.332)
'44.33'
```

```python
>>> FIXED(3521.478, 2, False)
'3,521.48'
```

```python
>>> FIXED(-3521.478, 1, True)
'-3521.5'
```

```python
>>> FIXED(3521.478, 0, True)
'3521'
```

```python
>>> FIXED(3521.478, -2, True)
'3500'
```

</details>
<details markdown><summary >
#### <code>__LEFT__(string, num_chars=1)</code> {: #left data-toc-label="LEFT" }
</summary>
Renvoie une sous-chaîne de longueur num_chars à partir du début de la chaîne donnée. Si num_chars est
omise, elle est supposée être 1. Identique à `string[:num_chars]`.

```python
>>> LEFT("Prix de vente", 4)
'Sale'
```

```python
>>> LEFT('Suède')
'S'
```

```python
>>> LEFT('Texte', -1)
Traceback (most recent call last):
...
ValueError: num_chars invalid
```

</details>
<details markdown><summary >
#### <code>__LEN__(text)</code> {: #len data-toc-label="LEN" }
</summary>
Renvoie le nombre de caractères dans une chaîne de texte, ou le nombre d'éléments dans une liste. Identique à
[`len`](https://docs.python.org/3/library/functions.html#len) en python.
Voir [Ensemble d'enregistrements](#recordset) pour un exemple d'utilisation de `len` sur une liste d'enregistrements.

```python
>>> LEN("Phoenix, AZ")
11
```

```python
>>> LEN("")
0
```

```python
>>> LEN("     Un   ")
11
```

</details>
<details markdown><summary >
#### <code>__LOWER__(text)</code> {: #lower data-toc-label="LOWER" }
</summary>
Convertit une chaîne spécifiée en minuscules. Identique à `text.lower()`.

```python
>>> LOWER("E. E. Cummings")
'e. e. cummings'
```

```python
>>> LOWER("Apt. 2B")
'apt. 2b'
```

</details>
<details markdown><summary >
#### <code>__MID__(text, start_num, num_chars)</code> {: #mid data-toc-label="MID" }
</summary>
Renvoie un segment d'une chaîne, commençant à start_num. Le premier caractère dans le texte a
start_num 1.

```python
>>> MID("Flux de fluide", 1, 5)
'Fluid'
```

```python
>>> MID("Flux de fluide", 7, 20)
'Flow'
```

```python
>>> MID("Flux de fluide", 20, 5)
''
```

```python
>>> MID("Flux de fluide", 0, 5)
Traceback (most recent call last):
...
ValueError: start_num invalid
```

</details>
<details markdown><summary >
#### <code>__PHONE_FORMAT__(value, country=None, format=None)</code> {: #phone_format data-toc-label="PHONE_FORMAT" }
</summary>
Formate un numéro de téléphone.

Sans arguments optionnels, le numéro doit commencer par "+" et le préfixe d'appel international,
et sera formaté comme un numéro international, par exemple `+12345678901` devient `+1 234-567-8901`.

L'argument `country` permet de spécifier un code de pays à 2 lettres (par exemple "US" ou "GB") pour
interpréter les numéros de téléphone qui ne commencent pas par "+". Par exemple, `PHONE_FORMAT('2025555555', 'US')`
serait considéré comme un numéro américain et formaté comme "(202) 555-5555". Les numéros de téléphone qui commencent par
"+" ignorent `country`. Par exemple, `PHONE_FORMAT('+33555555555', 'US')` est un numéro français car '+33'
est le préfixe international pour la France.

L'argument `format` spécifie le format de sortie, selon ce tableau :

  - `"#"` ou `"NATL"` (par défaut) - utilise le format national, sans le préfixe d'appel international, lorsque c'est possible. Par exemple `(234) 567-8901` pour "US", ou `02 34 56 78 90` pour "FR". Si
    `country` est omis, ou le numéro ne correspond pas au pays donné, le format international est utilisé à la place.
  - `"+"` ou `"INTL"` - format international, par exemple `+1 234-567-8901` ou
    `+33 2 34 56 78 90`.
  - `"*"` ou `"E164"` - format E164, comme international mais sans séparateurs, par exemple
    `+12345678901`.
  - `"tel"` ou `"RFC3966"` - format adapté à utiliser comme un [hyperlien](col-types.md#hyperlinks),
    par exemple 'tel:+1-234-567-8901'.

Lorsque vous spécifiez l'argument `format`, vous pouvez omettre l'argument `country`. C'est-à-dire
`PHONE_FORMAT(value, "tel")` est équivalent à `PHONE_FORMAT(value, None, "tel")`.

Pour plus de détails, voir la bibliothèque Python [phonenumbers](https://github.com/daviddrysdale/python-phonenumbers)
qui sous-tend cette fonction.

```python
>>> PHONE_FORMAT("+12345678901")
u'+1 234-567-8901'
```

```python
>>> PHONE_FORMAT("2345678901", "US")
u'(234) 567-8901'
```

```python
>>> PHONE_FORMAT("2345678901", "GB")
u'023 4567 8901'
```

```python
>>> PHONE_FORMAT("2345678901", "GB", "+")
u'+44 23 4567 8901'
```

```python
>>> PHONE_FORMAT("+442345678901", "GB")
u'023 4567 8901'
```

```python
>>> PHONE_FORMAT("+12345678901", "GB")
u'+1 234-567-8901'
```

```python
>>> PHONE_FORMAT("(234) 567-8901")
Traceback (most recent call last):
...
NumberParseException: (0) Missing or invalid default region.
```

```python
>>> PHONE_FORMAT("(234)567 89-01", "US", "tel")
u'tel:+1-234-567-8901'
```

```python
>>> PHONE_FORMAT("2/3456/7890", "FR", '#')
u'02 34 56 78 90'
```

```python
>>> PHONE_FORMAT("+33234567890", '#')
u'+33 2 34 56 78 90'
```

```python
>>> PHONE_FORMAT("+33234567890", 'tel')
u'tel:+33-2-34-56-78-90'
```

```python
>>> PHONE_FORMAT("tel:+1-234-567-8901", country="US", format="*")
u'+12345678901'
```

```python
>>> PHONE_FORMAT(33234567890)
Traceback (most recent call last):
...
TypeError: Le numéro de téléphone doit être une valeur textuelle. Si vous formatez une valeur d'une colonne Numérique, convertissez d'abord cette colonne en Texte.
```

</details>
<details markdown><summary >
#### <code>__PROPER__(text)</code> {: #proper data-toc-label="PROPER" }
</summary>
Met en majuscule chaque mot dans une chaîne spécifiée. Il convertit la première lettre de chaque mot en
majuscule, et toutes les autres lettres en minuscules. Identique à `text.title()`.

```python
>>> PROPER('ceci est un TITRE')
'Ceci Est Un Titre'
```

```python
>>> PROPER('2-way street')
'2-Way Street'
```

```python
>>> PROPER('76BudGet')
'76Budget'
```

</details>
<details markdown><summary >
#### <code>__REGEXEXTRACT__(text, regular_expression)</code> {: #regexextract data-toc-label="REGEXEXTRACT" }
</summary>
Extrait la première partie du texte qui correspond à l'expression régulière.

```python
>>> REGEXEXTRACT("Google Doc 101", "[0-9]+")
'101'
```

```python
>>> REGEXEXTRACT("Le prix aujourd'hui est de $826.25", "[0-9]*\.[0-9]+[0-9]+")
'826.25'
```

S'il y a une expression entre parenthèses, elle est renvoyée au lieu de la correspondance entière.

```python
>>> REGEXEXTRACT("(Contenu) entre crochets", "\(([A-Za-z]+)\)")
'Content'
```

```python
>>> REGEXEXTRACT("Foo", "Bar")
Traceback (most recent call last):
...
ValueError: REGEXEXTRACT text does not match
```

</details>
<details markdown><summary >
#### <code>__REGEXMATCH__(text, regular_expression)</code> {: #regexmatch data-toc-label="REGEXMATCH" }
</summary>
Renvoie si un morceau de texte correspond à une expression régulière.

```python
>>> REGEXMATCH("Google Doc 101", "[0-9]+")
True
```

```python
>>> REGEXMATCH("Google Doc", "[0-9]+")
False
```

```python
>>> REGEXMATCH("Le prix aujourd'hui est de $826.25", "[0-9]*\.[0-9]+[0-9]+")
True
```

```python
>>> REGEXMATCH("(Contenu) entre crochets", "\(([A-Za-z]+)\)")
True
```

```python
>>> REGEXMATCH("Foo", "Bar")
False
```

</details>
<details markdown><summary >
#### <code>__REGEXREPLACE__(text, regular_expression, replacement)</code> {: #regexreplace data-toc-label="REGEXREPLACE" }
</summary>
Remplace toutes les parties du texte correspondant à l'expression régulière donnée par le texte de remplacement.

```python
>>> REGEXREPLACE("Google Doc 101", "[0-9]+", "777")
'Google Doc 777'
```

```python
>>> REGEXREPLACE("Google Doc", "[0-9]+", "777")
'Google Doc'
```

```python
>>> REGEXREPLACE("Le prix est de $826.25", "[0-9]*\.[0-9]+[0-9]+", "315.75")
'Le prix est de $315.75'
```

```python
>>> REGEXREPLACE("(Contenu) entre crochets", "\(([A-Za-z]+)\)", "Mot")
'Mot entre crochets'
```

```python
>>> REGEXREPLACE("Foo", "Bar", "Baz")
'Foo'
```

</details>
<details markdown><summary >
#### <code>__REPLACE__(text, position, length, new_text)</code> {: #replace data-toc-label="REPLACE" }
</summary>
Remplace une partie d'une chaîne de texte par une chaîne de texte différente. La position est comptée à partir de 1.

```python
>>> REPLACE("abcdefghijk", 6, 5, "*")
'abcde*k'
```

```python
>>> REPLACE("2009", 3, 2, "10")
'2010'
```

```python
>>> REPLACE('123456', 1, 3, '@')
'@456'
```

```python
>>> REPLACE('foo', 1, 0, 'bar')
'barfoo'
```

```python
>>> REPLACE('foo', 0, 1, 'bar')
Traceback (most recent call last):
...
ValueError: position invalid
```

</details>
<details markdown><summary >
#### <code>__REPT__(text, number_times)</code> {: #rept data-toc-label="REPT" }
</summary>
Renvoie le texte spécifié répété un certain nombre de fois. Identique à `text * number_times`.

Le résultat de la fonction REPT ne peut pas dépasser 32767 caractères, sinon cela lève une
ValueError.

```python
>>> REPT("*-", 3)
'*-*-*-'
```

```python
>>> REPT('-', 10)
'----------'
```

```python
>>> REPT('-', 0)
''
```

```python
>>> len(REPT('---', 10000))
30000
```

```python
>>> REPT('---', 11000)
Traceback (most recent call last):
...
ValueError: number_times invalid
```

```python
>>> REPT('-', -1)
Traceback (most recent call last):
...
ValueError: number_times invalid
```

</details>
<details markdown><summary >
#### <code>__RIGHT__(string, num_chars=1)</code> {: #right data-toc-label="RIGHT" }
</summary>
Renvoie une sous-chaîne de longueur num_chars à partir de la fin d'une chaîne spécifiée. Si num_chars est
omise, elle est supposée être 1. Identique à `string[-num_chars:]`.

```python
>>> RIGHT("Prix de vente", 5)
'Price'
```

```python
>>> RIGHT('Numéro de stock')
'r'
```

```python
>>> RIGHT('Texte', 100)
'Texte'
```

```python
>>> RIGHT('Texte', -1)
Traceback (most recent call last):
...
ValueError: num_chars invalid
```

</details>
<details markdown><summary >
#### <code>__SEARCH__(find_text, within_text, start_num=1)</code> {: #search data-toc-label="SEARCH" }
</summary>
Renvoie la position à laquelle une chaîne est d'abord trouvée dans le texte, en ignorant la casse.

La recherche est sensible à la casse. La position renvoyée est 1 si within_text commence par find_text.
start_num spécifie le caractère à partir duquel commencer la recherche, par défaut à 1 (le premier
caractère de within_text).

Si find_text n'est pas trouvé, ou si start_num est invalide, lève une ValueError.

```python
>>> SEARCH("e", "Déclarations", 6)
7
```

```python
>>> SEARCH("marge", "Marge bénéficiaire")
8
```

```python
>>> SEARCH(" ", "Marge bénéficiaire")
7
```

```python
>>> SEARCH('"', 'Le "patron" est ici.')
5
```

```python
>>> SEARCH("gle", "Google")
4
```

```python
>>> SEARCH("GLE", "Google")
4
```

</details>
<details markdown><summary >
#### <code>__SUBSTITUTE__(text, old_text, new_text, instance_num=None)</code> {: #substitute data-toc-label="SUBSTITUTE" }
</summary>
Remplace le texte existant par du nouveau texte dans une chaîne. Il est utile lorsque vous connaissez le sous-texte à
remplacer. Utilisez REPLACE lorsque vous connaissez la position du texte à remplacer.

Si instance_num est donné, il spécifie quelle occurrence de old_text remplacer. Si omis, toutes
les occurrences sont remplacées.

Identique à `text.replace(old_text, new_text)` lorsque instance_num est omis.

```python
>>> SUBSTITUTE("Données de vente", "Ventes", "Coût")
u'Données de coût'
```

```python
>>> SUBSTITUTE("Trimestre 1, 2008", "1", "2", 1)
u'Trimestre 2, 2008'
```

```python
>>> SUBSTITUTE("Trimestre 1, 2011", "1", "2", 3)
u'Trimestre 1, 2012'
```
</details>
<details markdown><summary >
#### <code>__T__(value)</code> {: #t data-toc-label="T" }
</summary>
Renvoie la valeur si la valeur est du texte, ou la chaîne vide lorsque la valeur n'est pas du texte.

```python
>>> T('Texte')
u'Texte'
```

```python
>>> T(826)
u''
```

```python
>>> T('826')
u'826'
```

```python
>>> T(False)
u''
```

```python
>>> T('100 points')
u'100 points'
```

```python
>>> T(AltText('Texte'))
u'Texte'
```

```python
>>> T(float('nan'))
u''
```

</details>
<details markdown><summary >
#### <code>__TASTEME__(food)</code> {: #tasteme data-toc-label="TASTEME" }
</summary>
Pour un morceau de texte donné, décide s'il est savoureux ou non.

Ce n'est pas sérieux. Cela est apparu comme un œuf de Pâques, et est conservé en tant que tel. C'est en fait un puzzle
pour comprendre la règle simple sous-jacente. Cela a été étonnamment rarement résolu, même après
avoir lu le code source, qui est librement disponible et peut divertir les fans de Python.

```python
>>> TASTEME('Banane')
True
```

```python
>>> TASTEME('Ail')
False
```

</details>
<details markdown><summary class="unimplemented">
#### <code>__TEXT__(number, format_type)</code> {: #text data-toc-label="TEXT" }
</summary>
Convertit un nombre en texte selon un format spécifié. Il n'est pas encore implémenté dans
Grist. Vous pouvez utiliser les fonctions Python similaires str() pour convertir des nombres en chaînes, et
optionnellement format() pour spécifier le format du nombre.

<span class="grist-tip">Note</span> Cette fonction n'est pas actuellement implémentée dans Grist.
</details>
<details markdown><summary >
#### <code>__TRIM__(text)</code> {: #trim data-toc-label="TRIM" }
</summary>
Supprime tous les espaces du texte sauf pour les espaces simples entre les mots. Notez que TRIM ne
supprime pas d'autres espaces blancs tels que les caractères de tabulation ou de nouvelle ligne.

```python
>>> TRIM(" Premier trimestre\n    Bénéfices     ")
'Premier trimestre\n Bénéfices'
```

```python
>>> TRIM("")
''
```

</details>
<details markdown><summary >
#### <code>__UPPER__(text)</code> {: #upper data-toc-label="UPPER" }
</summary>
Convertit une chaîne spécifiée en majuscules. Identique à `text.upper()`.

```python
>>> UPPER("e. e. cummings")
'E. E. CUMMINGS'
```

```python
>>> UPPER("Apt. 2B")
'APT. 2B'
```

</details>
<details markdown><summary >
#### <code>__VALUE__(text)</code> {: #value data-toc-label="VALUE" }
</summary>
Convertit une chaîne dans des formats de date, d'heure ou de nombre acceptés en un nombre ou une date.

```python
>>> VALUE("$1,000")
1000
```

```python
>>> assert VALUE("16:48:00") - VALUE("12:00:00") == datetime.timedelta(0, 17280)
```

```python
>>> VALUE("01/01/2012")
datetime.datetime(2012, 1, 1, 0, 0)
```

```python
>>> VALUE("")
0
```

```python
>>> VALUE(0)
0
```

```python
>>> VALUE("826")
826
```

```python
>>> VALUE("-826.123123123")
-826.123123123
```

```python
>>> VALUE(float('nan'))
nan
```

```python
>>> VALUE("Invalid")
Traceback (most recent call last):
...
ValueError: le texte ne peut pas être analysé en un nombre
```

```python
>>> VALUE("13/13/13")
Traceback (most recent call last):
...
ValueError: le texte ne peut pas être analysé en un nombre
```

</details>