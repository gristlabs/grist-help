---
title: References and lookups
---

Utiliser des références et des recherches dans les formules
=========

Les colonnes [Référence et Liste de Références](col-refs.md) dans Grist permettent à une table de créer une référence explicite à une autre. Un exemple courant de cela est visible dans le modèle [Inscription en Classe](https://templates.getgrist.com/doc/afterschool-program).

Sur la page du Personnel, nous avons une liste de membres du personnel. Sur la page des classes, nous avons une colonne de référence étiquetée Instructeur qui fait référence aux enregistrements de notre page du Personnel.

<span class="screenshot-large">*![reference-column](images/references-lookups/reference-column.png)*</span>

Gardez à l'esprit qu'il ne s'agit pas seulement de référencer la colonne Nom Complet, mais l'ensemble de l'enregistrement associé à l'instructeur sélectionné.

## Colonnes de référence et notation par points

Utiliser une colonne de Référence dans une formule peut faciliter l'obtention de données de l'enregistrement référencé. Pour ce faire, nous utilisons la notation par points. Elle utilise le format `$A.B` où `A` est le nom de la colonne de référence et `B` est le nom de la colonne dans la table référencée dont nous voulons extraire des données.

Voyons cela en action sur la page [Vue d'Inscription](https://templates.getgrist.com/doc/afterschool-program/p/7) du modèle d'Inscription en Classe. La notation par points est utilisée dans la colonne Class_Times de la table INSCRIPTIONS, située en bas à droite de la page de la Vue d'Inscription.

<span class="screenshot-large">*![class-times](images/references-lookups/class-times.png)*</span>

Nous pouvons voir que la colonne Class_Times utilise une formule avec la notation par points. En utilisant le format `$A.B` décrit ci-dessus, nous pouvons comprendre que Class est le nom de la colonne de référence et Times est le nom de la colonne dans la table référencée.

Retrouvons cela à l'endroit d'où cela provient - puisque la colonne de référence est Class, nous pouvons consulter les informations de cette colonne pour découvrir de quelle table elle provient.

<span class="screenshot-large">*![reference-classes](images/references-lookups/reference-classes.png)*</span>

La colonne Class fait référence aux données de la table Classes. Par conséquent, la colonne Class_Times extrait des données de la colonne Times de la table Classes.

<span class="screenshot-large">*![classes-times](images/references-lookups/classes-times.png)*</span>

## Chaînage

Si la recherche de référence renvoie une référence, cela peut être chaîné.

Peut-être voulons-nous ajouter le numéro de téléphone de l'instructeur à la table des Inscriptions. Nous pouvons utiliser la colonne de référence Class pour extraire les informations de l'instructeur de la table Classes.

<span class="screenshot-large">*![chaining-class-instructor](images/references-lookups/chaining-class-instructor.png)*</span>

Comme vous pouvez le voir dans la capture d'écran ci-dessus, la colonne de l'instructeur est elle-même une colonne de référence. Si nous suivons le format précédent, notre notation par points serait ```$Class.Instructor``` mais la colonne de l'instructeur pointe vers l'ensemble de l'enregistrement de l'instructeur, donc nous devons lui indiquer quelle information nous voulons de cet enregistrement, créant ainsi une chaîne.

La colonne de l'instructeur fait référence à la table du Personnel, donc nous y naviguons pour découvrir quelle colonne nous devons utiliser pour obtenir le numéro de téléphone. La colonne qui contient le numéro de téléphone de l'instructeur est Téléphone.

<span class="screenshot-large">*![chaining-instructor-phone](images/references-lookups/chaining-instructor-phone.png)*</span>

En rassemblant tout cela, notre notation par points pour le numéro de téléphone de l'instructeur serait ```$Class.Instructor.Phone```

<span class="screenshot-large">*![instructor-phone](images/references-lookups/instructor-phone.png)*</span>

Que se passe-t-il si nous laissons nos formules comme `$Class.Instructor` ? Vous verrez un ID d'enregistrement numérique de l'enregistrement dans la table du Personnel auquel la colonne de l'instructeur pointe.

<span class="screenshot-large">*![class-instructor](images/references-lookups/class-instructor.png)*</span>
{: .screenshot-half }

C'est ce qu'une colonne de référence stocke réellement. Si vous changez le type de cette colonne de formule en Référence, vous pourrez sélectionner une colonne à afficher, comme le Nom Complet.

<span class="screenshot-large">*![reference-class-instructor](images/references-lookups/reference-class-instructor.png)*</span>

Une autre façon de voir le nom est de chaîner la notation par points, comme nous l'avons fait pour le téléphone : `$Class.Instructor.Full_Name`.

<span class="screenshot-large">*![instructor-details](images/references-lookups/instructor-details.png)*</span>

## lookupOne

Une autre façon de pointer vers un enregistrement est d'utiliser la fonction `Table.lookupOne(...)`. [lookupOne](https://support.getgrist.com/functions/#lookupone) vous permet de rechercher un enregistrement par certains champs, similaire à la fonction VLOOKUP d'Excel. En fait, la version de Grist de VLOOKUP est simplement un alias pour lookupOne. lookupOne est rarement utile dans Grist, car l'utilisation d'une colonne de type Référence est généralement la solution préférée pour connecter des enregistrements. Cependant, dans certaines occasions, lookupOne peut être utile.

Une situation est lorsque vous avez deux ensembles de données qui se chevauchent même s'ils représentent quelque chose de différent et proviennent peut-être de sources différentes. Un exemple de cela peut être trouvé dans notre document [Sponsors et Participants d'Événements (Références et Recherches)](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/m/fork) qui est une version modifiée du modèle Sponsors et Participants d'Événements, disponible dans notre [galerie de modèles](https://public.getgrist.com/p/templates).

Disons que vous organisez un événement et que vous avez une liste de participants inscrits, ainsi que des Sponsors. Les participants inscrits sont stockés dans la table Toutes les Inscriptions, peut-être peuplée via une intégration de formulaire.

<span class="screenshot-large">*![attendees](images/references-lookups/attendees.png)*</span>
{: .screenshot-half }

Les sponsors sont listés dans une table séparée, avec des champs liés à leur parrainage, et peut-être maintenue par une autre équipe.

<span class="screenshot-large">*![sponsors](images/references-lookups/sponsors.png)*</span>

Les deux tables contiennent des adresses e-mail qui identifient les participants et les sponsors. Parfois, un sponsor peut s'inscrire pour assister à l'événement. Dans ce cas, vous aurez un enregistrement de Participant avec une adresse e-mail qui apparaît également dans la table des Sponsors. C'est utile à savoir pour quelqu'un qui consulte la liste des participants.

Vous pouvez rechercher un enregistrement dans la table des sponsors par adresse e-mail en utilisant une formule lookupOne. La colonne Sponsor dans la table Toutes les Inscriptions fait exactement cela en utilisant cette formule :

```
Sponsors.lookupOne(Contact_Email=$Registration_Email)
```

Cette formule vérifie si un Contact Email de la table des Sponsors correspond à un Registration Email de la table Toutes les Inscriptions.

Le format général pour une formule lookupOne est : 
```
[Table_Name].lookupOne([A]=$[B])
```
`[Table_Name]` est le nom de la table dans laquelle vous souhaitez rechercher des données. `[A]` est la colonne dans la table qui est recherchée (nommée au début de la formule) et `[B]` est la colonne dans la table actuelle / la table dans laquelle vous entrez la formule.

<span class="screenshot-large">*![sponsors-lookupone-text](images/references-lookups/sponsors-lookupone-text.png)*</span>

Une telle formule renvoie une référence. Dans la capture d'écran ci-dessus, vous pouvez voir que le résultat de la recherche renvoie `Sponsors[#]`. Le numéro qu'il renvoie entre crochets est l'ID d'enregistrement du résultat de la recherche. Lorsqu'il renvoie `Sponsors[0]`, aucune correspondance n'a été trouvée.

Il est souvent judicieux de créer une colonne pour le résultat de la recherche et de changer son type en Référence, comme vous le voyez dans la capture d'écran ci-dessous. Ensuite, s'il y a une correspondance, la colonne de référence pointera vers l'ensemble de l'enregistrement correspondant. Comme toute colonne de référence, vous pouvez sélectionner quel champ de cet enregistrement afficher. Dans cet exemple, il montre le champ Société de l'enregistrement correspondant dans la table des Sponsors.

<span class="screenshot-large">*![sponsors-lookupone](images/references-lookups/sponsors-lookupone.png)*</span>

## lookupOne et notation par points

Parce que lookupOne crée une référence à un enregistrement, nous pouvons utiliser la notation par points pour rechercher des champs supplémentaires dans cet enregistrement.

Dans l'[exemple](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/p/1) ci-dessus, `Sponsors.lookupOne(Contact_Email=$Registration_Email)` vérifie si un Contact Email de la table des Sponsors correspond à un Registration Email de la table Toutes les Inscriptions.

Que se passerait-il si nous voulions également rechercher le niveau de sponsor ?

Nous pouvons ajouter `.Sponsor_Level` à la formule lookupOne, et, si une correspondance est trouvée, rechercher la valeur dans la colonne de niveau de sponsor pour l'enregistrement correspondant.

La formule complète serait `Sponsors.lookupOne(Contact_Email=$Registration_Email).Sponsor_Level`.

<span class="screenshot-large">*![sponsor-level-lookupone](images/references-lookups/sponsor-level-lookupone.png)*</span>

Maintenant, nous avons le Niveau de Sponsor listé dans la table Toutes les Inscriptions pour ces participants dont les e-mails apparaissent également sur la liste des sponsors.

## lookupOne et sort_by ##

Lorsque la fonction `lookupOne` rencontre plusieurs résultats correspondants, elle renvoie le premier par ID de ligne. Le paramètre optionnel `sort_by` peut être utilisé pour trier ces résultats par un autre champ, afin de déterminer lequel serait renvoyé comme première correspondance. Vous pouvez également préfixer l'ID de colonne avec "-" pour inverser l'ordre.

Par exemple, considérons cet exemple du modèle [Inscription en Classe](https://templates.getgrist.com/doc/afterschool-program). Ce modèle suit l'inscription à des cours extrascolaires et autres - enregistrant des informations pour les étudiants, les familles et le personnel.

Sur cette page, nous avons une liste d'étudiants et leurs informations respectives.

<span class="screenshot-large">*![student-table](images/references-lookups/students-final-2.png)*</span>

De plus, nous avons une page Familles qui décrit le parent de chaque étudiant et nous aimerions savoir quel étudiant dans chaque famille est le plus âgé. Nous créerions donc une colonne étudiant le plus âgé.

<span class="screenshot-large">*![family-table](images/references-lookups/families-final-2.png)*</span>

Ensuite, la formule suivante examinerait la table des Étudiants, trouverait les étudiants spécifiques associés à chaque famille, les trierait par leur date de naissance et renverrait l'étudiant ayant la date de naissance la plus ancienne : 

`Students.lookupOne(Family=$id, sort_by="Birthday")`

Dans ce cas, cela renverrait : Raddon, Brockie.

Alternativement, si nous voulons trouver l'étudiant le plus jeune, la formule inclurait "-": 

`Students.lookupOne(Family=$id, sort_by="-Birthday”)`

Dans ce cas, cela renverrait : Raddon, Care.

## Comprendre les ensembles d'enregistrements

Parfois, un enregistrement peut référencer plusieurs enregistrements dans une autre table. Plusieurs références peuvent être faites avec une Colonne de Liste de Références.

Un excellent exemple de cela est visible dans le modèle [Suivi d'Habitudes](https://templates.getgrist.com/1BR9vm6GPTGX/Habit-Tracker).

Sur la page Habitudes + Objectifs, nous avons une liste d'habitudes et un objectif sur la fréquence à laquelle nous souhaitons accomplir cette habitude. Sur la page Suivi d'Habitudes, nous avons une colonne de Liste de Références étiquetée Habitudes Complétées qui fait référence aux enregistrements de notre page Habitudes + Objectifs.

La seule différence entre une colonne de Référence et une colonne de Liste de Références est la capacité de sélectionner plusieurs références. Cela crée un ensemble d'enregistrements qui peuvent être utilisés dans des formules.

<span class="screenshot-large">*![habit-tracker](images/references-lookups/habit-tracker.png)*</span>

## Listes de références et notation par points

Tout comme avec les références, vous pouvez utiliser la Notation par Points avec les listes de références.

En s'appuyant sur notre précédent [exemple](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/p/3) de participants à une conférence, supposons que nous avons une liste de personnes inscrites à un événement et que nous voulons trouver le solde pour chaque inscrit. Pour ce faire, nous pouvons utiliser la notation par points.

Ici, `$Registrants` est une liste de références. Notre Great Outdoors Expo a 4 inscrits. Nous pouvons voir la liste des inscrits dans la colonne Registrants. Cette liste est une référence à la colonne Nom de la table Toutes les Inscriptions.

<span class="screenshot-large">*![reference-list-registrants](images/references-lookups/reference-list-registrants.png)*</span>

Avec une liste de références, la notation par points renvoie une liste de tous les champs sélectionnés ;

<span class="screenshot-large">*![registrants-balance](images/references-lookups/registrants-balance.png)*</span>

`$Registrants.Balance` est une liste des Soldes pour chaque participant dans la liste de `$Registrants`. Cela suit le format `$[A].[B]` où `[A]` est le nom de la colonne de Liste de Références et `[B]` est le nom de la colonne dans la table référencée dont vous souhaitez extraire des données. Nous apprendrons comment trouver la somme de ces soldes dans [Travailler avec des ensembles d'enregistrements](#working-with-record-sets).

## lookupRecords

Vous pouvez également obtenir une liste de références en utilisant [lookupRecords](https://support.getgrist.com/functions/#lookuprecords).

La formule pour lookupRecords suit ce format :

```
[Table_Name].lookupRecords([A]=$[B])
```

`[Table_Name]` est le nom de la table dans laquelle vous souhaitez rechercher des données. `[A]` est la colonne dans la table qui est recherchée (nommée au début de la formule) et `[B]` est la colonne dans la table actuelle / la table dans laquelle vous entrez la formule.

Supposons que nous souhaitions obtenir une liste des événements auxquels chaque personne de notre [Liste d'E-mails](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/p/4) a assisté. Nous pouvons utiliser lookupRecords pour cela. Tout d'abord, nous devons rechercher des enregistrements où l'e-mail figurant dans la table Toutes les Inscriptions correspond à un e-mail de cette liste. Ensuite, trouver l'événement associé à chacun de ces enregistrements.

En suivant le format ci-dessus, notre formule initiale est :
```
All_Registrations.lookupRecords(Registration_Email=$Email)
```

<span class="screenshot-large">*![lookup-records](images/references-lookups/lookup-records.png)*</span>

`All_Registrations.lookupRecords(Registration_Email=$Email)` renvoie une liste d'ID d'enregistrement pour chaque enregistrement dans la table Toutes les Inscriptions où l'Email d'Inscription correspond à l'Email dans cette ligne de la table Liste d'E-mails. Ensuite, nous devons trouver l'Événement associé à chacun de ces enregistrements. Pour ce faire, nous pouvons utiliser la notation par points.

`All_Registrations.lookupRecords(Registration_Email=$Email).Event` renverra la valeur de la colonne Événement pour chaque enregistrement trouvé.

<span class="screenshot-large">*![lookup-records-dot-notation](images/references-lookups/lookup-records-dot-notation.png)*</span>

Nous avons vu des résultats similaires en utilisant la fonction [lookupOne](#lookupone). Il est utile de changer le type de colonne en Liste de Références, comme vous le voyez dans la capture d'écran ci-dessous. Ensuite, s'il y a une correspondance, la colonne de liste de références pointera vers l'ensemble de l'enregistrement pour chaque correspondance. Comme toute colonne de liste de références, vous pouvez sélectionner quel champ vous souhaitez afficher pour les enregistrements correspondants. Dans cet exemple, il montre le champ Événement de la table des Événements pour chaque enregistrement correspondant dans la table des Participants.

<span class="screenshot-large">*![lookup-records-reference-list](images/references-lookups/lookup-records-reference-list.png)*</span>

## Recherches inversées

lookupRecords fonctionne un peu différemment si une référence existe entre deux tables. Avec une recherche inversée, nous pouvons utiliser l'ID d'enregistrement pour trouver un enregistrement.

Chaque ligne a un ID numérique (disponible en tant que `$id` dans les formules) qui est unique dans cette table. Vous pouvez révéler l'ID en ajoutant une colonne de formule où la formule est `$id`{: .formula}

<span class="screenshot-large">*![row-id](images/references-lookups/row-id.png)*</span>
{: .screenshot-half }

Jetons un œil à la colonne des Inscrits de la table [Événements](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/p/3).

<span class="screenshot-large">*![lookup-records-id](images/references-lookups/lookup-records-id.png)*</span>

La formule utilisée ici est `All_Registrations.lookupRecords(Event=$id)`. Nous utilisons l'ID pour trouver une correspondance car dans la table Toutes les Inscriptions, la colonne Événement est une colonne de référence, ce qui signifie que sa valeur est l'ID d'un enregistrement.

Parce que All_Registrations.Event est une colonne de référence pointant vers un enregistrement d'Événement dans la table Événements, nous pouvons faire correspondre l'ID stocké dans la colonne de référence avec les ID des enregistrements dans la table Événements. C'est pourquoi l'argument dans la formule est `Event=$id`.

Nous utilisons la référence existante, juste à l'envers - d'où le nom, Recherche Inversée.

<span class="screenshot-large">*![reverse-lookup](images/references-lookups/reverse-lookup.png)*</span>

Si vous souhaitez une vidéo explicative d'une recherche inversée, nous avons un exemple dans notre [Webinaire Construire avec Grist - Formules d'Initialisation vs Formules](https://www.youtube.com/watch?v=0qVDPZd2w9I&t=788s).

## Travailler avec des ensembles d'enregistrements

lookupRecords peut également être utilisé dans d'autres formules.

`SUM()` peut être utile pour trouver la somme de tous les nombres dans une liste d'enregistrements. Une fois que vous avez trouvé votre liste d'enregistrements en utilisant la fonction lookupRecords et la notation par points, vous pouvez utiliser `SUM()` pour additionner toutes les valeurs renvoyées, comme vous le voyez dans cette formule :

```
SUM(Table.lookupRecords(Column_A=$Column_B).Column_C)
```

Vous pouvez également le faire sur une liste de références car une liste de références est la même chose, une liste d'enregistrements.

```
SUM($RefList.Column)
```

Dans la section [Listes de références et notation par points](#reference-lists-and-dot-notation), nous avons utilisé la colonne Registrants et la notation par points pour trouver le solde pour chaque personne de notre liste d'Inscrits. Nous pouvons utiliser `SUM()` avec notre formule précédente pour trouver le solde total.
```
SUM($Registrants.Balance)
```
<span class="screenshot-large">*![registrants-balance-sum](images/references-lookups/registrants-balance-sum.png)*</span>

Nous pouvons également utiliser lookupRecords pour obtenir la liste des références, plutôt que d'utiliser une colonne de liste de références, puis trouver la somme du solde pour tous les inscrits. Cette méthode est utilisée dans la colonne des Revenus des Billets de la table [Événements](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/p/3) en utilisant la formule suivante :

```
SUM(All_Registrations.lookupRecords(Event=$id).Balance)
```

`All_Registrations.lookupRecords(Event=$id).Balance` trouve tous les enregistrements dans la table Toutes les Inscriptions où la colonne Événement correspond à l'ID de la ligne dans cette table, Événements. En utilisant la notation par points, nous trouvons le Solde pour chacun des enregistrements trouvés. Ensuite, `SUM()` additionne les soldes de tous les enregistrements trouvés.

<span class="screenshot-large">*![lookup-records-registrants-balance-sum](images/references-lookups/lookup-records-registrants-balance-sum.png)*</span>

Vous pouvez également itérer à travers une Liste de Références en utilisant une boucle `for` en Python. Un exemple de cela peut être vu dans la colonne Solde ('for' loop) dans la table Événements. Lors de l'itération, chaque élément est une Référence, donc la notation par points peut également être utilisée ici. Pour trouver la somme du solde pour tous les inscrits, nous utilisons la formule suivante :

```
SUM(person.Balance for person in $Registrants)
```
Cela fait la même chose que notre formule lookupRecords que nous avons vue ci-dessus. `$Registrants` est notre liste de références. Pour chaque enregistrement (`person`) dans notre liste d'Inscrits, nous trouvons le Solde. Ensuite, nous additionnons tous les soldes ensemble. Dans cette formule, `person` est une variable qui représente chaque élément de notre liste et pourrait être remplacée par n'importe quelle autre variable.

<span class="screenshot-large">*![reference-list-for-loop-sum](images/references-lookups/reference-list-for-loop-sum.png)*</span>

Si vous souhaitez en savoir plus sur [Structures de Données et Compréhension de Liste](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) en Python 3, [Python.org](http://python.org/) est une excellente ressource.

`len()` peut être utile pour obtenir le nombre d'éléments dans une liste. Une fois que vous avez trouvé votre liste d'enregistrements en utilisant la fonction lookupRecords, vous pouvez utiliser `len()` pour compter le nombre d'enregistrements renvoyés, comme vous le voyez dans cette formule :

```
len(Table.lookupRecords(Column_A=$Column_B))
```

Vous pouvez également le faire sur une liste de références.

```
len($RefList)
```

Nous voulons voir combien d'événements nos Sponsors ont assisté. Nous pouvons utiliser lookupRecords pour cela. La formule suivante est utilisée dans la colonne Événements Assistés de la table [Sponsors](https://public.getgrist.com/6kTypo2FtSsf/Event-Sponsors-Attendees-References-and-Lookups/p/2).

```
len(All_Registrations.lookupRecords(Sponsor=$id))
```

<span class="screenshot-large">*![attendees-lookuprecords](images/references-lookups/attendees-lookuprecords.png)*</span>

Décomposons les deux parties de cette formule, en travaillant de l'intérieur vers l'extérieur.

`All_Registrations.lookupRecords(Sponsor=$id)` recherche des correspondances où l'enregistrement dans la colonne Sponsor de la table Toutes les Inscriptions a le même ID que l'enregistrement dans cette ligne de la table Sponsors. Tous les enregistrements dans la table Toutes les Inscriptions qui correspondent sont ajoutés à une liste d'enregistrements. Essayez d'écrire la formule sans `len()` pour voir ce que Grist renvoie. Cela devrait ressembler à quelque chose comme ça.

<span class="screenshot-large">*![without-len](images/references-lookups/without-len.png)*</span>
{: .screenshot-half }

C'est une liste d'enregistrements.

`len()` compte combien d'enregistrements se trouvent dans cette liste.

<span class="screenshot-large">*![len](images/references-lookups/len.png)*</span>
{: .screenshot-half }

Nous pouvons également inclure plusieurs arguments dans une formule lookupRecords. Un exemple de cela peut être trouvé dans la colonne Compte de la table Classes du modèle [Inscription en Classe](https://public.getgrist.com/doc/eW4nqWfK1k3K~8iDuMy8ApPXvzhcemSiYsS~14207/p/6). Cette colonne nous montre combien d'étudiants sont inscrits dans chaque classe. La formule utilisée ici est :

```
len(Enrollments.lookupRecords(Class=$id, Status="Confirmed"))
```

<span class="screenshot-large">*![lookup-records-multiple](images/references-lookups/lookup-records-multiple.png)*</span>

Cette recherche utilise deux champs. Elle recherchera des enregistrements dans la table des Inscriptions où le Statut est "Confirmé" et la colonne Class correspond à l'ID de la ligne dans cette table. Comme la colonne Class fait référence à la table Classes, nous utilisons l'ID d'enregistrement `$id` dans la recherche.

Enfin, `len()` compte les éléments dans la liste renvoyée par `Enrollments.lookupRecords(Class=$id, Status="Confirmed")`.

La moyenne, le minimum et le maximum sont quelques-unes des autres fonctions qui peuvent être utilisées avec les formules lookupRecords. Consultez toutes les fonctions disponibles sur notre page [Référence des fonctions](functions.md).
