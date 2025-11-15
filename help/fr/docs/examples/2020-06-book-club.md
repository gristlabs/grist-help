---
title: Book club links
---

# Listes de Livres avec Recherche en Bibliothèque et en Magasin

S'il y a une chose meilleure que lire un livre, c'est lire avec des amis.
Organiser un club de lecture est assez simple. Le club fonctionnera mieux si tout le monde
obtient effectivement le livre et a des opinions sur ce qu'il faut lire la prochaine fois. Grist peut aider
avec tout cela.

Pour inciter tout le monde à obtenir le livre, il est utile d'avoir des liens pour
emprunter le livre à votre bibliothèque locale et pour acheter le livre dans votre
magasin local (ou non local). Et pour des idées sur ce qu'il faut lire la prochaine fois,
il est utile de pouvoir facilement suggérer des livres et de
découvrir les livres que d'autres suggèrent via des sites comme GoodReads, Wikipedia et
Amazon.

Supposons que nous commencions par une simple table de livres, avec les titres des livres et les noms des auteurs.
Pour emprunter ou acheter le livre, il est préférable d'avoir son code ISBN unique, afin qu'il n'y ait aucune ambiguïté ou
confusion. Une chose que nous pouvons faire est d'ajouter un lien pour rechercher un livre
sur [isbnsearch.org](https://isbnsearch.org)
par son titre et son auteur. Pour ce faire, ajoutez une nouvelle colonne, puis définissez-la comme une
[colonne HyperLink](../col-types.md#text-columns) :

![Créer un chercheur d'ISBN](../examples/images/2020-06-book-club-find-isbn.png)

Ce que nous allons faire, c'est remplir cette colonne en utilisant une formule qui prend le
titre du livre et le nom de l'auteur, et les utilise comme mots-clés pour rechercher sur
le site [isbnsearch.org](https://isbnsearch.org). Voici la formule :

```py
import urllib
keywords = ($Title or "") + " " + ($Author or "")
"[isbn] https://isbnsearch.org/search?s=" + urllib.quote(keywords)
```

Les URL avec des espaces, des apostrophes ou d'autres lettres étranges que vous pourriez trouver dans
les noms nécessitent un encodage spécial, nous avons donc utilisé le module python `urllib` pour nous assurer
que tout est encodé correctement. Maintenant, nous avons un lien `[isbn]` pratique à côté de chaque livre :

![Formule de lien ISBN](../examples/images/2020-06-book-club-isbn-link.png)

Nous pouvons cliquer sur la flèche à côté de `[isbn]`, localiser le livre et noter son code ISBN
dans une nouvelle colonne :

![Commencer](../examples/images/2020-06-book-club-isbn-search-result.png)

Ensuite, nous pouvons l'ajouter à notre liste de livres. Maintenant que nous avons un coup de main pour trouver les ISBN,
ajoutons quelques livres de plus :

![Commencer](../examples/images/2020-06-book-club-all-isbn.png)

## Recherche en bibliothèque et en magasin

Une fois que nous avons l'ISBN, ajouter un lien pour acheter le livre est facile. Voici une formule
pour le site [indiebound.org](https://indiebound.org), qui aux États-Unis est susceptible
d'avoir une librairie indépendante près de chez vous en tant que membre :

```py
"[buy] https://indiebound.org/book/" + $ISBN
```

Si vous n'avez pas de librairie locale, il y a Amazon, ou à peu près n'importe quel site
que vous aimez (trouvez simplement une page de recherche sur leur site et faites correspondre le modèle).

```py
import urllib
keywords = ($Title or "") + " " + ($Author or "") + " " + ($ISBN or "")
"[amazon] https://www.amazon.com/s?i=stripbooks&k=" + urllib.quote($keywords)
```

Les nouveaux liens ressemblent à ceci :

![Commencer](../examples/images/2020-06-book-club-buy.png)

Cliquer sur le lien `[buy]` près d'un livre nous amène maintenant à ce livre sur
[indiebound.org](https://indiebound.org).

![Commencer](../examples/images/2020-06-book-club-indie.png)

Pour votre bibliothèque locale, la même idée est très probablement applicable. Par exemple, dans
le nord du New Jersey, aux États-Unis, voici ce que vous voulez :

```py
import urllib
prefix = "[borrow] https://catalog.bccls.org/polaris/search/searchresults.aspx?ctx=placeholder&type=Keyword&by=ISBN&term="
prefix + urllib.quote($ISBN)
```

Et voici comment consulter Goodreads pour voir ce que les gens pensent d'un livre :

```py
"[opinion] https://www.goodreads.com/search?q=" + $ISBN
```

Et Wikipedia pour commencer une plongée en profondeur :

```py
import urllib
keywords = ($Title or "") + " " + ($Author.Name or "")
"[wikipedia] https://en.wikipedia.org/wiki/Special:Search/" + urllib.quote(keywords)
```

Une fois que nous avons tous ces liens, il est logique d'ajouter une [vue fiche](../linking-widgets.md#same-record-linking) afin que nous puissions les disposer :

![Commencer](../examples/images/2020-06-book-club-card.png)

## Modèle prêt à l'emploi

Voici une
[exemple de liste de livres](https://templates.getgrist.com/hdXy57qLiyNf/Book-Club){:target="\_blank"}
avec laquelle vous pouvez jouer. Les livres répertoriés peuvent ne pas être à votre goût, bien sûr ! Ajustez selon vos préférences.
