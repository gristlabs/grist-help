<iframe width="560" height="315" src="https://www.youtube.com/embed/fkn2YCxEvTc?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Référence et Listes de Références

## Vue d'ensemble

Les colonnes Référence et Liste de Références dans Grist permettent à une table de créer une référence explicite à une autre. Dans le monde des bases de données, cela est similaire à une clé étrangère. Dans le monde des tableurs, cela est similaire à un `VLOOKUP`, mais beaucoup plus puissant et plus facile à utiliser.

Dans ce guide, nous utiliserons le terme **table sous-jacente** pour la table qui liste toutes les valeurs disponibles, et **table de référence** pour la table qui utilise ces valeurs.

## Créer une nouvelle colonne de Référence

Supposons que nous ayons un document avec deux tables, Clients et Projets. La table Clients liste nos clients - noms, contacts, dates de signature - et la table Projets liste les projets que nous réalisons pour les clients.

![Motivation de la référence](images/columns/columns-reference-clients-projects.png)

Il y a toutes sortes de choses que Grist peut faire pour nous si nous lui indiquons que la colonne Client dans la table Projets fait référence aux clients listés dans la table Clients. Nous pouvons le faire en convertissant la colonne Client en une "colonne de référence". Ouvrez le panneau latéral des Options de Colonne (voir [Spécifier un type](col-types.md#specifying-a-type)) et définissez le "Type de Colonne" sur "Référence". Ajustez l'option "Données de la Table" pour être la table correcte que vous souhaitez croiser, et l'option "Afficher la Colonne" pour correspondre à la colonne de cette table que vous souhaitez afficher. Ensuite, cliquez sur "Appliquer" lorsque vous êtes satisfait du résultat.

![Configuration de la référence](images/columns/columns-reference-link-client.png)

!!! note "Comprendre la référence"
    La valeur de la colonne fait toujours référence à l'ensemble du **record** dans la table sous-jacente. La valeur affichée peut être n'importe quelle colonne de ce record, comme sélectionné dans `Afficher la Colonne`. Vous pouvez également inclure des colonnes supplémentaires à afficher comme expliqué plus tard.

Dans notre exemple, vous pouvez voir des petites icônes de lien apparaître dans les cellules de la colonne Client, montrant qu'elles ont été correctement croisées avec la table Clients. Une fois le type de colonne défini, vous pouvez commencer à taper dedans ou double-cliquer pour voir une liste déroulante de toutes les valeurs disponibles.

*![Sélection des valeurs déroulantes](images/column-ref-select-dropdown.png)*
{: .screenshot-half }

Notez que la table `Clients` et la colonne `Client` sont liées par le type de colonne plutôt que par le nom. Elles peuvent être nommées comme vous le souhaitez.

!!! note "Repérer les colonnes de référence"
    Vous pouvez dire que les valeurs dans une colonne représentent une référence par l'icône de lien qui apparaît à côté des valeurs.

Si vous tapez accidentellement une valeur qui n'est pas présente dans la table `Clients`, sa valeur sera mise en évidence comme invalide :

*![Valeur de référence invalide](images/column-ref-invalid.png)*
{: .screenshot-half }

## Ajouter des valeurs à une colonne de Référence

Parfois, il est utile d'ajouter une nouvelle valeur à la liste déroulante sans avoir à passer à la table sous-jacente. Les colonnes de référence rendent cela facile ! Il suffit de taper la valeur que vous souhaitez ajouter et de sélectionner la valeur `+` dans la liste déroulante. Grist ajoutera automatiquement un nouveau record contenant cette valeur à la table sous-jacente et insérera la référence appropriée :

*![Ajouter une valeur de référence](images/column-ref-add-value.png)*
{: .screenshot-half }

## Convertir une colonne de Texte en Référence

Lorsque vous travaillez avec des données existantes, il est courant d'avoir des valeurs textuelles existantes qui devraient vraiment être des valeurs de référence. Ne vous inquiétez pas, la conversion est simple ! Il suffit de changer le type de colonne en `Référence` et Grist trouvera et substituera automatiquement les valeurs correspondantes par des références. Si certaines valeurs ne sont pas trouvées, elles seront affichées comme invalides. Vous pouvez alors soit les ajouter à la table sous-jacente, soit sélectionner les valeurs appropriées pour elles.

Dans cet exemple, les trois premières valeurs correspondent parfaitement, mais `Forest Labs` est invalide car il n'existe pas dans la table `Clients` :

![Convertir les valeurs après](images/column-ref-convert-after.png)

## Inclure

### plusieurs champs d'une référence

Un grand avantage des colonnes de référence est qu'elles vous permettent d'intégrer facilement plusieurs colonnes de la table sous-jacente. Dans notre exemple, si vous souhaitez intégrer `$Client.Contact` à la table `Projets`, vous pouvez simplement sélectionner la colonne `Contact` dans la section `Ajouter des Colonnes Référencées` et elle sera automatiquement ajoutée à la table `Projets` :

![Colonnes supplémentaires insérées](images/column-ref-other-columns.png)

Si vous êtes à l'aise avec les formules, vous pouvez voir que la colonne ajoutée est simplement la formule `=$Client.Contact`. Si vous le souhaitez, vous pouvez obtenir le même résultat en ajoutant manuellement la colonne de formule. Vous pouvez également utiliser d'autres champs de la table `Clients` en référant à `$Client` dans les formules de la table `Projets`.

Notez que dans les formules, nous utilisons le nom de la *colonne* de référence (`$Client`) pour faire référence à un record lié, et non le nom de la table (qui est `Clients` ici). Ne laissez pas la similarité des noms dans cet exemple vous confondre.

*![Colonnes supplémentaires en tant que formules](images/column-ref-other-formula.png)*
{: .screenshot-half }

!!! note "Utiliser des références dans les formules"
    Vous avez peut-être remarqué que la table sous-jacente est `Clients` (pluriel) mais que la formule est `$Client.Contact` (singulier). C'est parce que la formule se réfère à la colonne de référence, **pas** à la table sous-jacente. Dans notre exemple, la colonne de référence est `Client`.

## Créer une nouvelle colonne de Liste de Références

Jusqu'à présent, notre exemple ne traitait que des projets ayant un seul client. Supposons que nous ayons également des projets avec plusieurs clients, et que nous souhaitions maintenir des références à tous depuis la colonne `Client` de la table `Projets`.

Nous pouvons indiquer à Grist que la colonne `Client` contient plusieurs références en changeant son type en "Liste de Références". Ce type de colonne peut référencer plusieurs records, et peut également être considéré comme une sélection multiple.

Ouvrez le panneau latéral des Options de Colonne (voir [Spécifier un type](col-types.md#specifying-a-type)) et définissez le "Type de Colonne" de `Client` sur "Liste de Références". Grist convertira automatiquement toutes vos références existantes en listes de références. Une fois que vous êtes satisfait du résultat, cliquez simplement sur "Appliquer" et la colonne `Client` sera prête à accepter autant de clients que vos projets en ont besoin.

![Configuration de la Liste de Références](images/columns/columns-reference-list-transform.png)

## Modifier les valeurs dans une colonne de Liste de Références

Pour apporter des modifications à une cellule de Liste de Références, double-cliquez simplement sur la cellule ou appuyez sur la touche <code class="keys">*Entrée*</code> après avoir sélectionné la cellule que vous souhaitez modifier. Vous pouvez également commencer à taper après avoir sélectionné une cellule si vous souhaitez écraser tout contenu existant. Cela ouvrira un éditeur comme celui de l'exemple ci-dessous.

*![Éditeur de Liste de Références](images/columns/columns-reference-list-editor.png)*
{: .screenshot-half }

Comme avec les colonnes de Référence, le menu de saisie semi-automatique se remplira de suggestions au fur et à mesure que vous tapez. Si vous tapez une valeur qui n'est pas présente dans la table référencée, vous pouvez sélectionner la valeur `+` pour ajouter une nouvelle ligne à la table référencée avec votre valeur.

Pour supprimer des références existantes, appuyez simplement sur la touche <code class="keys">*Retour arrière*</code>, ou déplacez votre curseur sur une référence et cliquez sur l'icône `X`.

Vous pouvez également réorganiser les références dans l'éditeur en les faisant glisser avec votre souris.

Pour enregistrer vos modifications et fermer l'éditeur, appuyez sur <code class="keys">*Entrée*</code> ou <code class="keys">*Tabulation*</code>, ou cliquez n'importe où en dehors de l'éditeur. Pour fermer l'éditeur et annuler toutes les modifications que vous avez apportées, appuyez sur <code class="keys">*Échap*</code>.

## Comprendre les colonnes de référence

Les cellules dans une colonne de référence identifient toujours un *record* entier dans la table référencée. Pour plus de commodité, vous pouvez sélectionner quelle colonne de ce record afficher en définissant "AFFICHER LA COLONNE". Cependant, la valeur de la cellule est *toujours* l'ID unique d'un record. De même, les Listes de Références stockent une liste d'IDs de records. Qu'est-ce que cela signifie vraiment ?

Jetons un coup d'œil au modèle [Inscription aux Cours](https://templates.getgrist.com/doc/afterschool-program/p/2/m/fork).

Dans la table Classes, la colonne Instructeur est une colonne de référence qui fait référence aux données de la table Staff. Le Nom Complet est sélectionné sous 'Afficher la Colonne' et est utilisé comme étiquette pour représenter le record de la table Staff qui est référencé ici.

*![explication des colonnes de référence](images/columns/columns-reference-explanation.png)*

Nous pouvons changer cette étiquette pour n'importe quelle autre valeur contenue dans le record. Changeons-la en 'ID de Ligne'.

<span class="screenshot-large">*![explication des colonnes de référence - afficher la colonne](images/columns/columns-reference-explanation-show-column.png)*</span>
{: .screenshot-half }

L'ID de ligne est ce qui est réellement stocké dans la colonne de Référence ou de Liste de Références. Avec cet ID, nous pouvons récupérer toutes les données associées à ce record.

*![explication des colonnes de référence - id de ligne](images/columns/columns-reference-explanation-rowid1.png)*

Dans la première ligne de la table Classes, nous voyons `Staff[2]` comme valeur dans la colonne Instructeur. Cela représente le record dans la table Staff avec l'ID de Ligne = `2`.

Nous pouvons naviguer vers la table Staff et voir quel record est assigné à l'ID de Ligne = `2`.

Pour voir l'ID unique d'un record, ajoutez une nouvelle colonne avec la formule = [`$id`](formula-cheat-sheet.md#using-a-records-unique-identifier-in-formulas).

*![explication des colonnes de référence - id de ligne](images/columns/columns-reference-explanation-rowid.png)*

Nous pouvons voir que la valeur dans la colonne Nom Complet pour le record avec l'ID de Ligne =`2` est `Dowbakin, Daniella`. Si nous revenons à nos paramètres d'origine pour la colonne Instructeur de la table Classes, où `Nom Complet` était sélectionné sous Afficher la Colonne, nous voyons que la valeur de Nom Complet associée à `Staff[2]` est `Dowbakin, Daniella`.

*![explication des colonnes de référence - nom complet](images/columns/columns-reference-explanation-fullname.png)*

## Filtrer les choix de Référence dans la liste déroulante

Lors de la saisie de données dans une colonne de référence, vous verrez une liste déroulante de toutes les valeurs disponibles à choisir. Parfois, la liste peut devenir longue et, dans certains cas, confuse. Par exemple, disons que vous suivez les changements de population dans les 1 000 villes les plus peuplées du monde. Lors de la saisie d'une ville dans la colonne de référence pour la sélection de la ville, la liste déroulante affiche toutes les 1 000 villes.

*![Liste déroulante de référence non filtrée](images/filter-reference-columns/unfiltered-cities.png)*
{: .screenshot-half }

Il serait utile que la liste déroulante des choix de villes soit filtrée en fonction du pays sélectionné dans la colonne `Pays`.

Pour filtrer la liste déroulante d'une colonne de référence, sélectionnez la colonne de référence puis définissez une "Condition de Liste Déroulante" dans le Panneau de Création sous l'onglet "Colonne".

*![Définir la condition de liste déroulante](images/filter-reference-columns/set-dropdown-condition.png)*
{: .screenshot-half }

Vous pouvez filtrer le choix de la liste déroulante en écrivant une condition sous forme de formule. L'attribut `choice` fait référence aux choix dans la liste déroulante. Dans ce cas, la formule est `choice.Country == $Country`.

*![Condition de filtre de liste déroulante de référence](images/filter-reference-columns/city-filter-condition.png)*
{: .screenshot-half }

*![Liste déroulante de référence filtrée](images/filter-reference-columns/filtered-cities.png)*
{: .screenshot-half }

Pourquoi cela a-t-il fonctionné ? La colonne de ville est une colonne de référence pointant vers une table `Cities` qui correspond aux pays et aux villes. Cette table ressemble à ceci.

*![Table de référence des villes](images/filter-reference-columns/cities-tables.png)*
{: .screenshot-half }

La condition de formule `choice.Country == $Country` recherche le pays de chaque choix dans la table `Cities` en utilisant un [lookup de référence](https://support.getgrist.com/references-lookups/#reference-columns-and-dot-notation), puis compare ces pays à la valeur entrée dans la colonne `Country` de la table `Population Rankings`.

*![Liste déroulante de référence filtrée mise en évidence](images/filter-reference-columns/filtered-cities-highlight.png)*
{: .screenshot-half }

La liste déroulante affiche maintenant uniquement les choix (c'est-à-dire les villes) dont le pays est égal au pays entré dans la colonne `Country`.

L'attribut `choice` peut également être utilisé lors de la définition des conditions de filtre de liste déroulante pour les colonnes [Choice](col-types.md#choice-columns) et [Choice List](col-types.md#choice-list-columns).

Notez que parce que le filtrage des listes déroulantes de référence est écrit sous forme de formules, le filtrage peut être très flexible et granulaire. Les utilisateurs expérimentés avec les [permissions avancées](https://support.getgrist.com/access-rules/) peuvent remarquer des similitudes dans la façon de penser à l'écriture de ces formules.