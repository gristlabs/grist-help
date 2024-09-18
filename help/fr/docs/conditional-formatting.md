---
title: Conditional formatting
---

Mise en forme conditionnelle
============================

Le style des cellules peut changer en fonction des règles conditionnelles. Les règles conditionnelles sont écrites sous forme de formules. La mise en forme conditionnelle peut s'appliquer à une ligne entière ou aux cellules d'une colonne.

Pour ajouter une mise en forme conditionnelle à une colonne particulière, sélectionnez la colonne, allez à la section `STYLE DE CELLULE` du [panneau de création](glossary.md#creator-panel) sous l'onglet `Colonne`, et cliquez sur `Ajouter un style conditionnel`.

*![Ajouter un style conditionnel](images/columns/add-conditional-style.png)*
{: .screenshot-half}

Dans cet exemple, nous avons une liste d'éleveurs de chiens qui ont élevé des pur-sang champions. Appliquons une mise en forme conditionnelle à la colonne Éleveur en fonction du nombre de chiens champions. Nous aimerions mettre en surbrillance en or les éleveurs ayant plus de 2 champions.

![Écrire des règles conditionnelles](images/columns/first-conditional-rule.png)

Ici, la formule conditionnelle est `$Number_of_Champions > 2`{: .formula}.

Nous aimerions également mettre en surbrillance les éleveurs ayant 1 ou 2 chiens champions en bleu, et ceux ayant 0 chien champion en marron. Cliquez sur `Ajouter une autre règle` pour ajouter plus de styles conditionnels.

![Règles conditionnelles multiples](images/columns/multiple-conditional-rules.PNG)

Pour ajouter une mise en forme conditionnelle aux lignes, allez à la section `STYLE DE LIGNE` du [panneau de création](glossary.md#creator-panel) sous l'onglet `Table > Vue`, et cliquez sur `Ajouter un style conditionnel`.

![Styles de ligne conditionnels](images/newsletters/2022-08/conditional-row.png)

Ordre des règles
----------------

Notez que Grist applique les règles dans l'ordre. Les styles appliqués par des règles ultérieures remplaceront ceux appliqués par des règles antérieures.

Que se passerait-il si nous échangions les deux dernières règles dans l'exemple ci-dessus ?

![Ordre des règles conditionnelles](images/columns/conditional-rules-order.PNG)

Remarquez que Gen Hamamoto, qui a 0 chien champion, n'est pas mis en surbrillance en marron. C'est parce qu'après avoir appliqué le deuxième style conditionnel, `$Number_of_Champions == 0`{: .formula}, Grist a appliqué le troisième, `$Number_of_Champions <= 2`{: .formula}, qui s'applique également à Gen Hamamoto et le colore en bleu.
