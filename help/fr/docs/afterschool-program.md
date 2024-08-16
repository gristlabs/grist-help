# Comment gérer les données commerciales {: data-toc-label='Intro' }

Grist brille lorsque vos données commerciales ont une certaine complexité. Dans cet exemple, nous allons examiner une organisation qui organise des activités parascolaires pour les enfants.

N'hésitez pas à consulter le document [Inscription en classe](https://templates.getgrist.com/doc/afterschool-program), disponible sur notre page [Exemples & Modèles](https://public.getgrist.com/p/templates).

Dans cet exercice, nous allons montrer comment planifier, concevoir et créer un tel document.

## Planification

Un peu de planification à l'avance vous aidera à obtenir une solution plus rapidement. Pensez aux types de données avec lesquelles vous travaillez et aux types de flux de travail dont vous aurez besoin. Vous n'avez pas besoin de tout anticiper au début. Vous pouvez facilement ajouter de la complexité plus tard, comme vous le verrez ci-dessous.

Notre organisation propose un certain nombre de cours pour les enfants. Chaque cours a un instructeur et plusieurs étudiants. Les étudiants peuvent s'inscrire à plusieurs cours et peuvent revenir année après année. Pour chaque cours, nous voudrons voir la liste des étudiants inscrits et s'il reste des places disponibles. Lorsqu'un parent appelle, nous voulons un moyen pratique d'inscrire un nouvel étudiant, ou de modifier ou annuler l'inscription d'un étudiant.

Si cela ressemble à la création d'une application, c'est exactement ce que nous faisons. Comme vous le verrez, cependant, ce n'est pas plus difficile que de créer une feuille de calcul.

## Modélisation des données

Plus vous modélisez bien vos données commerciales, plus votre travail sera facile. D'une certaine manière, vous faites de la conception de base de données ainsi que la création d'une application personnalisée. Grist rend simplement cela plus facile.

Commençons par les cours et leurs instructeurs.

Nous avons besoin d'une liste de cours et d'instructeurs. Le même instructeur peut enseigner différents cours, donc les instructeurs et les cours vivront dans des tables différentes. Appelons-les "Classes" et "Staff". Chaque cours a un seul instructeur, donc une des propriétés d'un cours sera l'instructeur de ce cours.

## Cours et Instructeurs

Lorsque vous commencez de zéro, vous créez un nouveau document vide (voir [Créer un document](creating-doc.md)), renommez la table vide initiale "Table1" en "Classes", ajoutez les colonnes dont vous avez besoin et saisissez quelques cours. Pour suivre les étapes de ce tutoriel, vous pouvez importer [Classes.csv](./unlocalized-assets/afterschool-program/Classes.csv){: data-wm-adjusted=1 } (ou simplement vous référer au document d'exemple "Programme parascolaire").

![add-classes](images/afterschool-program/add-classes.png)

Pour la table Staff, cliquez sur le bouton "Ajouter nouveau" et sélectionnez "Ajouter une table vide". Renommez-la en "Staff", créez quelques colonnes et entrez des données sur les instructeurs. Ou importez [Staff.csv](./unlocalized-assets/afterschool-program/Staff.csv) pour utiliser des données d'exemple et gagner quelques étapes.

![add-staff](images/afterschool-program/add-staff.png)

Nous voulons que la colonne *Instructor* dans la table `Classes` soit une référence à la table `Staff`. Actuellement, la table `Staff` n'a pas de colonne qui identifie de manière unique chaque enregistrement. Pour configurer les références, il est bon d'en ajouter une. Dans ce cas, nous ajouterons une colonne "Full Name" à la table `Staff`.

## Formules

Cliquez sur la page "Staff" et ajoutez une colonne "Full Name" en utilisant le menu de la colonne ou le raccourci <code class="keys">*Alt* + **=**</code>, et tapez "Full Name" dans l'en-tête de la nouvelle colonne.

<span class="screenshot-large">*![fullname-rename](images/afterschool-program/fullname-rename.png)*</span>
{: .screenshot-half }

Créez une formule en tapant une valeur dans n'importe quelle cellule de la nouvelle colonne, en commençant par le signe égal (“=”). Entrez la formule comme `$Last_Name + ", " + $First_Name`{: .formula }. Vous pouvez utiliser une syntaxe similaire à Excel pour le même effet : `CONCAT($Last_Name, ", ", $First_Name)`{: .formula }.

<span class="screenshot-large">*![fullname-formula](images/afterschool-program/fullname-formula.png)*</span>
{: .screenshot-half }

  - Dans Grist, une formule s'applique toujours à chaque enregistrement de la table.
  - Grist prend en charge Python dans les formules, ainsi que la plupart des fonctions Excel, qui ont des noms en majuscules.

Comme les formules s'appliquent à chaque ligne,