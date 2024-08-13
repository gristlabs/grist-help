Python
-------

Les formules de Grist sont écrites en Python, le langage le plus populaire pour la science des données.
L'intégralité de la [bibliothèque standard de Python](https://docs.python.org/3/library/) est à votre disposition.
à votre disposition. Pour ceux qui ont une expérience des tableurs, nous avons également ajouté une suite de fonctions de type Excel, avec des noms en majuscules.
avec des noms en majuscules. Voici la [liste complète des fonctions](functions.md).
Les formules Python sont évaluées dans un sandbox, sans accès à l'internet, ni à un
système de fichiers persistant.

## Versions de Python prises en charge

Nous supportons actuellement deux versions de Python :

 * Python 3 (spécifiquement 3.11 au moment de la rédaction)
 * Python 2 (spécifiquement 2.7)

Les documents nouvellement créés sur notre service hébergé utilisent Python 3 par défaut, tandis que les documents plus anciens (créés avant novembre 2021 environ) utilisent Python 2 par défaut.
(créés avant novembre 2021 environ) utilisent Python 2 par défaut. Pour savoir quelle version de Python
un document spécifique utilise, regardez ses [Paramètres du document](creating-doc.md#document-settings).
Le paramètre `Engine` peut être `python2`, `python3`, ou vide.
Un paramètre vide implique `python2`.

Si vous avez des droits d'édition sur un document, vous pouvez modifier le paramètre `Engine`,
et le document sera alors rechargé avec toutes les formules interprétées en utilisant la version de Python que vous avez spécifiée.
version de Python que vous avez spécifiée. Nous vous recommandons d'être prudent.
Une formule qui fonctionne comme prévu dans une version de Python peut produire des erreurs dans une autre, ou (pire) donner des résultats erronés dans une autre version.
dans une autre, ou (pire) donner des résultats erronés.

! !! avertissement "Warning"
    **Certaines formules peuvent échouer ou donner des résultats erronés si elles sont utilisées avec une version de Python différente de celle pour laquelle elles ont été écrites.
    différente de celle pour laquelle elles ont été écrites.**

Python 2 a atteint sa fin de vie en janvier 2020, donc si vous cherchez en ligne de l'aide sur Python,
les réponses que vous trouverez sont de plus en plus susceptibles d'être pour Python 3. Si vous avez un document
qui utilise Python 2 et que vous souhaitez passer à Python 3, nous vous recommandons de lire le document suivant
[Tester l'effet d'un changement de version de Python](python.md#testing-the-effect-of-changing-python-versions)
et [Différences entre les versions de Python](python.md#differences-between-python-versions).
Veillez à vérifier tous les tableaux et toutes les colonnes, ainsi que les formalismes ordinaires et les formules de déclenchement.
Nous serions heureux de connaître votre expérience et de vous aider en cas de problème,
sur le [forum communautaire](https://community.getgrist.com/).

Grist auto-hébergé peut utiliser n'importe quelle version de Python avec laquelle vous le configurez, mais gardez à l'esprit que nous ne testons activement que les versions prises en charge.
que nous ne testons activement que les versions supportées.

## Tester l'effet du changement de version de Python

Grist possède des fonctionnalités qui peuvent vous aider à évaluer les conséquences d'un changement de la version de Python utilisée par un document.
version de Python utilisée par un document.

 * La fonctionnalité [Travailler sur une copie](copying-docs.md#trying-out-changes) est utile pour
   expérimenter la modification de la version de Python sans affecter votre document jusqu'à ce que vous soyez prêt.
   jusqu'à ce que vous soyez prêt. L'option "Comparer avec l'original" vous permet de visualiser les cellules modifiées, le cas échéant.
   visualiser les cellules qui ont été modifiées, le cas échéant. Veillez à examiner tous les tableaux et toutes les colonnes.
 * L'onglet [Activité de l'historique du document](document-history.md#activity)
   (avec l'option "Tous les tableaux" sélectionnée) vous permet d'examiner plus en détail ce qui a été modifié.
   changé.
 * Veillez à tester toutes les [formules de déclenchement](formulas.md#trigger-formulas) que vous pourriez avoir, car le code Python n'est pas disponible pour toutes les formules de déclenchement.
   car le code Python qu'elles contiennent ne sera pas exercé tant que vous n'aurez pas spécifiquement
   déclencher ces formules.
 * Vous pouvez utiliser le [visualisateur de code](formulas.md#code-viewer) pour vous rappeler rapidement toutes les formules d'un document.
   vous rappeler rapidement toutes les formules d'un document, afin de les vérifier systématiquement.

## Différences entre les versions de Python

Il existe des différences importantes entre Python 2 et 3. Il se peut que les formules doivent
être modifiées afin d'obtenir les mêmes résultats lors du passage d'une version de Python à l'autre.
et les versions de Python. Il existe de nombreuses ressources en ligne telles que celle-ci
[feuille de contrôle de compatibilité](https://python-future.org/compatible_idioms.html)
qui peuvent vous aider à déterminer le problème lorsque vous rencontrez une différence, et
des idées sur la manière de le résoudre. Nous énumérons ici les cas les plus courants que nous avons
dans les formules Grist.

### Division de nombres entiers

Dans Python 2, diviser des nombres entiers donne un nombre entier, donc `9 / 2` est `4`.
Dans Python 3, c'est `4.5`. Pour une feuille de calcul, c'est une réponse beaucoup plus sensée,
mais si vous comptez sur le comportement de Python 2, nous vous suggérons de passer à l'opérateur `//`, qui est cohérent entre les versions (`//`).
qui est cohérent entre les versions (`9 // 2` est `4` pour les deux).

Par exemple, le modèle [General Ledger](https://templates.getgrist.com/2YwYBWpREY2a/General-Ledger)
avait une formule Python 2 pour calculer le trimestre à partir d'une date (ainsi une `Date` de
`2021-08-15` donne un `Trimestre` de `2021 Q3`) comme suit :

```py
"%s Q%s" % ($Date.year, CEILING($Date.month, 3) / 3)
```

lors du passage à Python 3, il fallait le corriger :

```py
"%s Q%s" % ($Date.year, CEILING($Date.month, 3) // 3)
```

Dans le cas contraire, les quarts sont devenus des fractions !

### Certaines importations sont réorganisées

Python dispose d'une bibliothèque standard utile, mais certaines parties ont été déplacées entre Python 2 et 3.
déplacées entre Python 2 et 3.
Par exemple, plusieurs de nos modèles contiennent des formules pour construire des URL,
pour ouvrir des recherches personnalisées par exemple, ou pour ouvrir un email pré-rempli
avec les valeurs calculées `To`, `CC`, et `Subject`.
Python dispose d'aides pratiques pour la construction d'URL,
mais ils ont un peu changé d'une version de Python à l'autre.
Notre exemple [Lightweight CRM](https://templates.getgrist.com/doc/lightweight-crm)
avait une formule Python 2 comme celle-ci pour lancer une recherche d'emails dans
Gmail :

```
from urllib import quote_plus
"Recherche Gmail https://mail.google.com/mail/u/0/#search/%s" % quote_plus($Email)
```

Dans Python 3, la ligne d'importation a dû être modifiée en :

```
from urllib.parse import quote_plus
```

### Changement subtil dans l'arrondi

Python 3 change la fonction intégrée `round()` qui arrondit comme beaucoup de gens l'ont appris à l'école
(quand on arrondit `.5`, on arrondit toujours vers le haut)
à ce que l'on appelle "l'arrondi du banquier" (où l'on arrondit de `.5` au nombre pair le plus proche).
au nombre pair le plus proche). Cette méthode est généralement considérée comme une amélioration, car elle permet d'atténuer
un biais en faveur des grands nombres qui peut devenir significatif à l'échelle.
Mais il peut être surprenant de voir les chiffres changer de cette manière dans un document établi.
document établi.

Si vous avez vraiment besoin de l'arrondi de Python 2, remplacez tous les appels à la fonction Python `round` par la fonction [ROUND](functions.md#round) compatible avec Excel.

```
round($val, 2)
```

serait remplacée par :

```
ROUND($val, 2)
```

### Gestion du texte Unicode

Python 2 ne brille pas par sa capacité à gérer les textes internationaux et les emojis.
Nous avons atténué de nombreux problèmes en fixant l'encodage par défaut à `utf8` pour tous les documents.
à `utf8` pour tous les documents. Néanmoins, lorsque vous passez de Python 2 à
Python 3, vous pouvez constater des changements de type ou des erreurs. Considérons cette formule de Python 2
pour générer un hachage à sens unique d'une adresse électronique :

```
import hashlib
hashlib.sha256($Email).hexdigest()
```

Dans Python 3, cela échoue avec `TypeError : Les objets Unicode doivent être encodés avant le hachage`,
ce qui peut être résolu en remplaçant `$Email` par `$Email.encode()` :

```
import hashlib
hashlib.sha256($Email.encode()).hexdigest()
```
