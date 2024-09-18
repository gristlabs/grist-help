---
title: Python versions
---

Python
-------

Les formules Grist sont écrites en Python, le langage le plus populaire pour la science des données.
L'intégralité de la [bibliothèque standard de Python](https://docs.python.org/3/library/) est disponible
pour vous. Pour ceux ayant une expérience avec les tableurs, nous avons également ajouté une suite de fonctions similaires à Excel, avec des noms en majuscules. Voici la [liste complète des fonctions](functions.md).
Les formules Python sont évaluées dans un sandbox, sans accès à Internet, et sans système de fichiers persistant.

## Versions de Python supportées

Nous supportons actuellement deux versions de Python :

 * Python 3 (spécifiquement 3.11 au moment de l'écriture)
 * Python 2 (spécifiquement 2.7)

Les documents nouvellement créés sur notre service hébergé utilisent Python 3 par défaut, tandis que les documents plus anciens (créés avant environ novembre 2021) utilisent Python 2 par défaut. Pour savoir quelle version de Python un document spécifique utilise, regardez ses [Paramètres du document](creating-doc.md#document-settings).
Le paramètre `Engine` peut être `python2`, `python3`, ou vide.
Un paramètre vide implique `python2`.

Si vous avez des droits d'édition sur un document, vous pouvez changer le paramètre `Engine`,
et le document se rechargera alors avec toutes les formules maintenant interprétées en utilisant la
version de Python que vous avez spécifiée. Nous recommandons la prudence en le faisant.
Une formule qui fonctionne comme prévu dans une version de Python peut donner des erreurs
dans une autre, ou (pire) donner de mauvais résultats.

!!! warning "Avertissement"
    **Certaines formules peuvent échouer ou donner de mauvais résultats si elles sont utilisées avec une version de Python différente de celle pour laquelle elles ont été écrites.**

Python 2 a atteint sa fin de vie en janvier 2020, donc si vous cherchez de l'aide en ligne pour Python,
les réponses que vous trouvez sont de plus en plus susceptibles d'être pour Python 3. Si vous avez un document
qui utilise Python 2, et que vous souhaitez le passer à Python 3, nous vous recommandons de lire
[Tester l'effet du changement de versions de Python](python.md#testing-the-effect-of-changing-python-versions)
et [Différences entre les versions de Python](python.md#differences-between-python-versions).
Assurez-vous de vérifier toutes les tables et colonnes, ainsi que les formules régulières et les formules de déclenchement.
Nous serions intéressés d'entendre votre expérience, et de vous aider avec tout problème,
sur le [forum communautaire](https://community.getgrist.com/).

Grist auto-hébergé peut utiliser n'importe quelle version de Python avec laquelle vous le configurez, mais gardez à l'esprit que nous testons activement uniquement les versions supportées.

## Tester l'effet du changement de versions de Python

Grist dispose de certaines fonctionnalités qui peuvent vous aider à évaluer les conséquences du changement de la version de Python utilisée par un document.

 * La fonctionnalité [Travailler sur une copie](copying-docs.md#trying-out-changes) est utile pour
   expérimenter le changement de version de Python sans affecter votre document jusqu'à ce que
   vous soyez prêt. Il y a une option "Comparer avec l'original" qui vous permettra
   de visualiser quelles cellules ont changé, le cas échéant. Assurez-vous de vérifier toutes les tables et colonnes.
 * L'[onglet Activité de l'Historique du document](document-history.md#activity)
   (avec "Toutes les tables" sélectionné) vous permet de revoir plus en détail ce qui a
   changé.
 * Soyez prudent pour tester toutes les [formules de déclenchement](formulas.md#trigger-formulas) que vous pourriez
   avoir, car le code Python qu'elles contiennent ne sera pas exécuté tant que vous ne déclencherez pas spécifiquement ces formules.
 * Vous pouvez utiliser le [visualiseur de code](formulas.md#code-viewer) pour vous rappeler rapidement
   de toutes les formules dans un document, afin de pouvoir les vérifier systématiquement.

## Différences entre les versions de Python

Il existe des différences importantes entre Python 2 et 3. Les formules peuvent nécessiter
d'être modifiées pour donner les mêmes résultats lors du passage entre les versions de Python. Il existe de nombreuses ressources en ligne telles que cette
[feuille de triche de compatibilité](https://python-future.org/compatible_idioms.html)
qui peuvent aider à comprendre quel est le problème lorsque vous rencontrez une différence, et
donner des idées sur la façon de le résoudre. Ici, nous listons des cas courants que nous avons
vus dans les formules Grist.

### Division des nombres entiers

En Python 2, diviser des nombres entiers donne un nombre entier, donc `9 / 2` est `4`.
En Python 3, c'est `4.5`. Pour un tableur, c'est une réponse beaucoup plus sensée,
mais si vous comptez sur le comportement de Python 2, nous vous suggérons de passer à l'opérateur `//`
qui est cohérent entre les versions (`9 // 2` est `4` pour les deux).

Par exemple, le modèle [Grand Livre](https://templates.getgrist.com/2YwYBWpREY2a/General-Ledger)
avait une formule Python 2 pour calculer le trimestre à partir d'une date (donc une `Date` de
`2021-08-15` donnait un `Trimestre` de `2021 T3`) comme suit :

```py
"%s T%s" % ($Date.year, CEILING($Date.month, 3) / 3)
```

lors du passage à Python 3, cela devait être corrigé en :

```py
"%s T%s" % ($Date.year, CEILING($Date.month, 3) // 3)
```

Sinon, les trimestres devenaient fractionnels !

### Certains imports sont réorganisés

Python a une bibliothèque standard utile, mais certaines parties ont été
déplacées entre Python 2 et 3.
Par exemple, plusieurs de nos modèles ont des formules pour construire des URL,
pour ouvrir des recherches personnalisées par exemple, ou pour ouvrir un email pré-rempli
avec des valeurs calculées pour `To`, `CC`, et `Subject`.
Python a des assistants pratiques pour construire des URL,
mais ils ont été déplacés un peu entre les versions de Python.
Notre exemple [CRM léger](https://templates.getgrist.com/doc/lightweight-crm)
avait une formule Python 2 comme celle-ci pour lancer une recherche d'emails dans
Gmail :

```
from urllib import quote_plus
"Gmail search https://mail.google.com/mail/u/0/#search/%s" % quote_plus($Email)
```

En Python 3, la ligne d'importation devait être changée en :

```
from urllib.parse import quote_plus
```

### Changement subtil dans l'arrondi

Python 3 change la fonction intégrée `round()` de l'arrondi tel que beaucoup de gens l'ont appris à l'école
(où lors de l'arrondi de `.5`, vous arrondissez toujours vers le haut)
à ce qui est appelé "l'arrondi bancaire" (où vous arrondissez de `.5` au
nombre pair le plus proche). Cela est généralement accepté comme une amélioration, atténuant
un biais vers des nombres plus grands qui peut devenir significatif à grande échelle.
Mais cela pourrait être une surprise de voir les nombres changer ainsi dans un
document établi.

Si vous avez vraiment besoin de l'arrondi de Python 2, remplacez tous les appels à la fonction
`round` de Python par la fonction compatible Excel [ROUND](functions.md#round). Par exemple :

```
round($val, 2)
```

serait remplacé par :

```
ROUND($val, 2)
```

### Gestion du texte Unicode

Python 2 n'excelle pas dans la gestion du texte international et des emojis.
Nous avons atténué de nombreux problèmes en définissant l'encodage par défaut
à `utf8` pour tous les documents. Néanmoins, lors du passage de Python 2 à
Python 3, vous pouvez voir des changements de type ou des erreurs. Considérez cette formule Python 2
pour générer un hachage à sens unique d'une adresse email :

```
import hashlib
hashlib.sha256($Email).hexdigest()
```

En Python 3, cela échoue avec `TypeError: Unicode-objects must be encoded before hashing`,
ce qui peut être résolu en remplaçant `$Email` par `$Email.encode()` :

```
import hashlib
hashlib.sha256($Email.encode()).hexdigest()
```
