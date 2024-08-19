# Comment analyser et visualiser des données {: data-toc-label='' }

Grist offre plusieurs moyens puissants d'analyser et de visualiser des données. Dans ce tutoriel, vous apprendrez à :

- Créer des tables de synthèse
- Créer et configurer des graphiques
- Lier des graphiques de manière dynamique

Pour expliquer ces fonctionnalités, nous utiliserons le document d'exemple “Recherche d'Investissement”[^doc_desc] qui inclut des entreprises et les investissements dans celles-ci jusqu'en 2013. Jetons un coup d'œil au document d'exemple, puis nous parlerons de la manière de le construire afin que vous puissiez appliquer ces outils à vos propres données.

[^doc_desc]: Téléchargez [crunchbase_companies_ny.csv](./unlocalized-assets/investment-research/crunchbase-companies-ny.csv) et [crunchbase_investments_ny.csv](./unlocalized-assets/investment-research/crunchbase-investments-ny.csv). Les données d'exemple incluent uniquement les données sur les “entreprises” et les “investissements”, et incluent uniquement des entreprises de New York pour les rendre plus petites et plus rapides. L'ensemble de données provient de [Kaggle](https://www.kaggle.com/mauriciocap/crunchbase2013).

## Explorer l'exemple

Ouvrez le document “[Recherche d'Investissement](https://templates.getgrist.com/doc/investment-research){: target="\_blank"}”, trouvé dans Exemples & Modèles sur votre page d'accueil Grist. La première chose que vous verrez est “Aperçu”. Cette page contient deux graphiques à côté de deux tables.

![1-overview-page](images/investment-research/1-overview-page.png)

- En haut à gauche, il y a un graphique circulaire montrant la répartition des investissements par catégorie. La table à côté contient les mêmes données sous forme tabulaire.
- En dessous du graphique circulaire se trouve un graphique à barres montrant le total des investissements levés par année. Il est également accompagné des mêmes données dans la table à côté sous forme tabulaire.

Tous ces graphiques et tables sont des exemples de “tables de synthèse”, que nous décrirons ci-dessous.

La page suivante, “Répartitions”, contient également deux tables et deux graphiques, mais ceux-ci sont liés de manière dynamique et offrent des informations beaucoup plus détaillées sur les données.

![2-breakdowns-page](images/investment-research/2-breakdowns-page.png)

- En haut à gauche se trouve une table montrant le financement total par année (la même table que nous avons vue sur la page précédente). Cette table sert de moteur pour le graphique à côté. Lorsque vous cliquez sur une année dans la table, le graphique circulaire se met à jour pour montrer la répartition des investissements cette année-là.

- De même, la table du bas montre les investissements par catégorie. Lorsque vous cliquez sur une catégorie, le graphique linéaire à côté se met à jour pour montrer l'historique du financement dans cette catégorie au fil des ans.

Notez à quel point cela est puissant et combien d'informations vous pouvez en tirer. Par exemple, vous pouvez voir que la catégorie Publicité a reçu beaucoup d'investissements à New York depuis 2007, mais a été dépassée par le E-commerce en 2013, tandis que la catégorie Mode a connu un pic majeur en 2011.

Sur la page suivante, “Détails de l'Entreprise”, nous pouvons voir les données granulaires de cet ensemble de données.

![3-company-details](images/investment-research/3-company-details.png)

Ici, nous voyons une liste d'entreprises et les catégories auxquelles elles appartiennent. Chaque entreprise affichée a un lien pointant vers son inscription sur le site Crunchbase. Sélectionner une entreprise affiche une fiche avec ses détails, ainsi qu'une liste de tous les investissements qu'elle a reçus.

C'est ici que nous commençons à voir la puissance de Grist. L'ensemble de données original est une feuille de calcul plate d'entreprises, et une feuille de calcul encore plus grande d'investissements. En affichant les données graphiquement, les données prennent vie, les rendant puissantes et utiles.

## Comment puis-je faire cela ? {: data-toc-label='' }

Avec Grist, présenter vos propres données sous forme graphique est à quelques étapes faciles. Commençons par la première étape.

## Obtenir les données

Importons les données sources. Nous allons importer deux fichiers CSV, chacun devenant sa propre table. Pour suivre, enregistrez d'abord les fichiers de [crunchbase_companies_ny.csv](./unlocalized-assets/investment-research/crunchbase-companies-ny.csv) et [crunchbase_investments_ny.csv](./unlocalized-assets/investment-research/crunchbase-investments-ny.csv) sur votre ordinateur. Ensuite, créez un document Grist en important le premier fichier depuis la page d'accueil.

![4-first-import](images/investment-research/4-first-import.png)

Ensuite, importez la deuxième table en utilisant le bouton “Ajouter Nouveau” et l'option “Importer depuis un fichier”.

![5-second-import](images/investment-research/5-second-import.png)

Dans la boîte de dialogue d'importation, terminez en cliquant sur “Importer” en bas à gauche.

Les tables que vous avez importées seront nommées “crunchbase_companies_ny” et “crunchbase_investments_ny”. Cliquez sur le nom en haut de la table pour ouvrir la boîte de dialogue et renommer chacune des tables en “Entreprises” et “Investissements”.

![6-rename-page](images/investment-research/6-rename-page.png)

## Rendre cela relationnel

La puissance de Grist provient de la structuration des données.

Regardez la table “Investissements”. Triez par la première colonne et vous remarquerez combien il y a de répétitions : chaque ligne contient les informations complètes de l'entreprise, ce qui duplique les données dans la table “Entreprises” et est répété plusieurs fois lorsque plusieurs investissements s'appliquent à la même entreprise.[^denormalized]

[^denormalized]: Une telle duplication est couramment observée dans les feuilles de calcul. Les données sous cette forme sont appelées “dénormalisées”.

La réalité est que chaque investissement s'applique à une seule entreprise. Chaque ligne d'investissement n'a besoin de contenir qu'une référence à une entreprise, et les données spécifiques à cet investissement.

Pour ce faire, trouvez une colonne qui identifie une entreprise de manière unique. Dans cet ensemble de données, la première colonne, “company_permalink”, le fait le mieux[^unique_id]. Cliquez sur la flèche dans l'en-tête de la colonne et cliquez sur “Options de colonne”. Cliquez sur la flèche à côté de “Texte” sous le “Type de colonne” dans la boîte de dialogue à droite de l'écran et sélectionnez “Référence” dans la liste.

[^unique_id]: Si vous n'avez pas de colonne d'identification unique, vous pouvez en construire une avec une formule.

*![7-set-reference](images/investment-research/7-set-reference.png)*
{: .screenshot-half }

Grist suggérera automatiquement de le faire une “Référence” à la table “Entreprises”, et d'afficher le “permalink” de l'entreprise référencée. Cliquez sur “Appliquer” pour enregistrer cette conversion.

![8-preview-reference](images/investment-research/8-preview-reference.png)

Renommons également cette colonne en “Entreprise”.

Dans Grist, les données dupliquées ne sont pas nécessaires et nous recommandons de les supprimer. Utiliser le raccourci `Option-Minus` (Mac) ou `Alt-Minus` (Windows) est un moyen rapide de supprimer des colonnes. Après avoir supprimé les colonnes de “company_name” à “company_city”, voici ce qui reste :

<span class="screenshot-large">*![9-remove-columns](images/investment-research/9-remove-columns.png)*</span>

Les données que vous avez supprimées ne sont pas perdues puisqu'elles étaient dupliquées – elles sont toujours disponibles dans la table “Entreprises” et peuvent être utilisées dans la formule d'un enregistrement d'Investissement comme, par exemple, `$Company.company_xxx`.

En fait, il existe un moyen pratique de créer ce type de formule. Créons-en une dont nous aurons besoin plus tard. Cliquez sur l'en-tête de la colonne “Entreprise”. Dans l'onglet Colonne du panneau de droite, vous verrez une section ‘Ajouter des colonnes référencées’. Cliquez sur ‘Ajouter une colonne’ pour ajouter la colonne “category_code”.

![10-add-referenced1](images/investment-research/10-add-referenced1.png)

Une nouvelle colonne sera ajoutée à la table avec la formule `$Company.category_code`. Pour chaque investissement, elle affiche le “category_code” de l'entreprise liée à son enregistrement d'investissement.

![11-add-referenced2](images/investment-research/11-add-referenced2.png)

## Résumer

La fonctionnalité puissante que vous attendiez est celle qui résume les données. [Les tables de synthèse](summary-tables.md) résument chaque colonne numérique dans une table de données. Nous voulons trouver la somme pour la colonne `funding_total_usd` dans la table Entreprises. Vérifiez que le type de colonne est défini sur 'Numérique' et formaté avec `$`.

![11.5-set-numeric](images/investment-research/11.5-set-numeric.png)

Pour utiliser cela, ajoutons une table montrant les entreprises regroupées par “category_code”.

Dans le menu “Ajouter Nouveau” en haut à gauche, sélectionnez “Ajouter une Page”. Dans la boîte de dialogue, sélectionnez “Table” et “Entreprises”, puis utilisez l'icône de sommation (<span class="grist-icon" style="--icon: var(--icon-Pivot)"></span>) pour sélectionner les colonnes “Grouper par” -- c'est-à-dire les colonnes par lesquelles résumer.

![12-start-summary](images/investment-research/12-start-summary.png)

Si vous ne sélectionnez aucune colonne, vous obtiendrez simplement une seule ligne de totaux. Si vous résumez par “category_code”, vous obtiendrez une ligne pour chaque valeur distincte de “category_code”. Faisons cela puis cliquons sur “Ajouter Page”.

![13-summary-added](images/investment-research/13-summary-added.png)

Ceci est similaire aux tableaux croisés dynamiques d'Excel. Chaque ligne représente le groupe d'enregistrements de la table source (“Entreprises”) qui ont une valeur particulière de “category_code”. Il y a un rappel de cela dans le titre de la table (“ENTREPRISES [par category_code]”).

De telles tables de synthèse peuvent (et doivent !) utiliser des formules. Les colonnes que vous choisissez lors de la création de la table sont les identifiants des groupes. Toutes les autres colonnes sont des colonnes de formule -- elles sont calculées. Dans les formules, le groupe d'enregistrements source résumé par une ligne est disponible sous la valeur “$group”.

Par exemple, vous verrez une colonne créée automatiquement appelée “count”. Si vous appuyez sur “Entrée”, vous verrez la formule qui s'y trouve -- `len($group)` -- qui est juste le nombre d'enregistrements dans ce groupe d'enregistrements, c'est-à-dire le nombre d'entreprises dans cette catégorie.

![14-summary-count-formula](images/investment-research/14-summary-count-formula.png)

Pour les colonnes numériques dans la table source, les tables de synthèse obtiennent automatiquement une colonne numérique du même nom contenant une somme, avec une formule telle que `SUM($group.funding_total_usd)`.

![15-summary-sum-formula](images/investment-research/15-summary-sum-formula.png)

!!! note "Une note pour les fans de Python"
    `$group` est un objet Python spécial. C'est une collection itérable d'enregistrements. Utiliser un attribut comme `$group.A` est un raccourci pour la liste des valeurs dans la colonne `A` de tous les enregistrements du groupe, c'est-à-dire que c'est à peu près équivalent à `[r.A for r in $group]`.

Parfois, ajouter les valeurs n'a pas de sens. Par exemple, la somme de “founded_year” est dénuée de sens. Il est préférable de supprimer cela et toute autre colonne dont nous n'avons pas besoin, ce qui nous laisse avec la colonne "funding_total_usd".

Puisque cette colonne contient de grands nombres, il est temps de regarder la section "Format de Nombre" de sa configuration, et de cliquer sur `,` (ou peut-être `$`) pour formater les nombres afin qu'ils soient plus lisibles.

![16-summary-remove-columns](images/investment-research/16-summary-remove-columns.png)

Ajoutons une deuxième table de synthèse. Sélectionnez à nouveau “Ajouter Nouveau” pour “Ajouter un Widget à la Page”. Pour obtenir un résumé par année, sélectionnez la table “Investissements” sous “Sélectionner les Données”, et utilisez à nouveau son symbole de somme (∑) pour sélectionner la colonne par laquelle résumer : “funded_year” puis cliquez sur “Ajouter à la page”.

![17-add-summary2](images/investment-research/17-add-summary2.png)

Cela produit une deuxième table de synthèse qui montre un enregistrement pour chaque année, chacun représentant un groupe de lignes “Investissements” pour cette année. La colonne la plus utile est “raised_amount_usd”, ajoutant tous les investissements réalisés cette année-là. Supprimons les colonnes non nécessaires.

Vous remarquerez des valeurs roses dans “raised_amount_usd”. C'est parce que Grist devine que le type de colonne est un entier. Les sommes roses sont des instances où les nombres dépassent la capacité de Javascript à gérer de grands entiers. Pour corriger cela, le type de la colonne doit être changé en “Numérique” (ce qui échange la précision contre la capacité à représenter des nombres très grands et très petits). Changez le type en “Numérique“ sous “Options de colonne”.

C'est encore un bon moment pour choisir un format de nombre plus convivial pour la colonne, et pour l'élargir afin d'adapter les nombres plus longs.

![18-change-int-to-numeric](images/investment-research/18-change-int-to-numeric.png)

## Graphique, diagramme, tracé

Vous pouvez créer un graphique à partir de n'importe quelles données. Pour cette page, nous voulons ajouter une version graphique de chaque table de synthèse. Sélectionnez à nouveau le bouton “Ajouter Nouveau”, choisissez “Ajouter un Widget à la Page”, sélectionnez “Graphique” comme widget, et la même table (Entreprises) et colonne de synthèse (category_code) qu'auparavant. Puis cliquez sur "Ajouter à la Page".

![19-add-chart1](images/investment-research/19-add-chart1.png)

Pour un graphique, vous devrez toujours le personnaliser par la suite.

Ouvrez le panneau de droite, et sélectionnez l'onglet “Graphique” / sous-onglet “Widget”.

Pour ce premier graphique, sous “Type de Graphique", sélectionnez “Graphique Circulaire”. Pour construire ce graphique, sélectionnez d'abord une étiquette, puis sélectionnez une série à résumer dans le graphique circulaire. Puisque nous voulons que le graphique montre “category_code” comme étiquettes, sélectionnez cette série dans le menu déroulant "Étiquette". Nous voulons utiliser “funding_total_usd” comme valeurs, donc cela devrait être listé en haut de la liste “séries” dans le panneau de configuration. Lorsque vous déplacez votre souris sur les éléments de cette liste, utilisez les doubles barres verticales qui apparaissent pour faire glisser et déposer une série en haut de la liste. Alternativement, vous pouvez masquer les autres séries de la liste en cliquant sur l'icône de corbeille.

![20-chart-vis-fields](images/investment-research/20-chart-vis-fields.png)

Ajoutons maintenant un graphique montrant une tendance par année. Ajoutez un autre “Widget à la page”, sélectionnez “Graphique” sous “Widget”, sélectionnez “Investissements” sous “Sélectionner les Données”, cliquez sur la sommation (<span class="grist-icon" style="--icon: var(--icon-Pivot)"></span>) pour grouper par “funded_year”, et cliquez sur “Ajouter à la Page”.

Pour personnaliser ce graphique, restez avec le type de graphique “Graphique à Barres”. Dans le menu déroulant "Axe X", sélectionnez la colonne à utiliser pour les valeurs de l'axe X (horizontal). Sous 'Séries', sélectionnez une deuxième (et éventuellement d'autres) colonne pour être les valeurs de l'axe Y (vertical).

![21-add-chart2](images/investment-research/21-add-chart2.png)

Vous pouvez réorganiser les sections à l'écran dans une configuration que vous aimeriez voir pour un tableau de bord. Déplacez votre souris vers le coin supérieur gauche de chaque section jusqu'à ce que vous voyiez une icône "poignée de tirage". Utilisez cette icône pour faire glisser chaque section à l'endroit souhaité par rapport aux autres sections. Une fois que vous avez terminé, renommez la page en survolant le nom de la page, puis en cliquant sur l'icône à trois points pour ouvrir le menu. Sélectionnez "Renommer" et renommez en “Aperçu”.

![22-rearrange-widgets](images/investment-research/22-rearrange-widgets.png)

## Graphiques dynamiques

Si vous avez lu nos autres tutoriels sur le lien des données, cela viendra naturellement. Les graphiques sont simplement une autre façon de montrer des données, et ils peuvent être liés de la même manière que les tables.

Pour notre exemple, nous allons ajouter une nouvelle page avec une table de synthèse : sélectionnez le widget “Table”, les données “Investissements”, groupez par “funded_year”, cliquez sur "Ajouter Page".

![23-dynamic-start](images/investment-research/23-dynamic-start.png)

Renommons cette nouvelle page “Répartitions”.

Ensuite, ajoutez un widget à cette page, en sélectionnant le widget “Graphique”, les données “Investissements”. Pour “Grouper par”, nous choisissons *deux* colonnes : “Company_category_code” et “funded_year”. C'est pourquoi nous avons ajouté la colonne “Company_category_code” plus tôt. Nous ne pouvons grouper les enregistrements d'investissement par le code de catégorie que si nous avons ce code pour chaque investissement.

Le menu déroulant “Sélectionner par” en bas à gauche de la boîte de dialogue répertorie les widgets déjà à l'écran qui peuvent contrôler la sélection des données dans le graphique que nous ajoutons. Dans “Sélectionner par”, choisissez “INVESTISSEMENTS [par funded_year]”, et cliquez sur “Ajouter à la Page”.

![24-dynamic-chart-start](images/investment-research/24-dynamic-chart-start.png)

!!! astuce ""
    **Remarque :** Si vous devez apporter des modifications à un widget que vous avez déjà ajouté, comme changer son type, ses paramètres “Grouper par” ou “Sélectionner par”, vous pouvez toujours le faire depuis l'onglet “Données” dans les paramètres du widget, en utilisant le bouton “Modifier la Sélection de Données”.

Nous voulons pouvoir sélectionner une année, puis afficher un graphique circulaire pour cette année qui affiche le total pour chaque code de catégorie. L'option “Sélectionner par” que nous avons choisie garantit que seules les données de l'année sélectionnée sont utilisées. Tout ce qui reste est de changer le type de graphique en “Graphique Circulaire”, et de définir “Étiquette” sur “Company_category_code” et "Série" sur “raised_amount_usd”.

![25-dynamic-vis-fields](images/investment-research/25-dynamic-vis-fields.png)

Remarque : Les graphiques ont besoin de plus d'espace à l'écran, donc nos petites captures d'écran auront meilleure allure si nous fermons les panneaux latéraux en cliquant sur les icônes d'ouverture (<span class="grist-icon" style="--icon: var(--icon-PanelLeft)"></span>, <span class="grist-icon" style="--icon: var(--icon-PanelRight)"></span>).

Ajoutons également un tri de la table par “funded_year”.

![26-dynamic-table-sort](images/investment-research/26-dynamic-table-sort.png)

En ce qui concerne le tri, le bouton mis en surbrillance au-dessus de la table vous rappelle que les paramètres de tri ne sont pas enregistrés automatiquement. Cliquez sur le bouton vert et sélectionnez “Enregistrer” pour le faire.

![27-dynamic-table-sort-save](images/investment-research/27-dynamic-table-sort-save.png)

Quel est le résultat ? Nous pouvons cliquer à travers les années (ou utiliser les touches fléchées), et voir la répartition par catégorie changer.

!!! astuce ""
    **Remarque :** Si cliquer à travers les années n'affecte pas le graphique, le graphique ne doit pas être lié. Vous pouvez vérifier et corriger cela en utilisant le menu "trois points" en haut à droite du graphique, en cliquant sur "Sélection de données", et en vous assurant que le menu déroulant "Sélectionner par" affiche "INVESTISSEMENTS [par funded_year]".

Pour compléter l'exemple, nous allons ajouter deux sections supplémentaires à cette page “Répartitions”. L'une sera une table répertoriant les catégories d'entreprises, et liée à cela sera un graphique montrant le montant de l'investissement dans cette catégorie au fil des ans.

Pour ajouter la table des catégories, utilisez "Ajouter un Widget à la Page", et sélectionnez le widget "Table", les données "Investissements", regroupées par "Company_category_code".

![28-dynamic-table2](images/investment-research/28-dynamic-table2.png)

La colonne “funded_year” dans la table résultante est dénuée de sens et doit être supprimée.

Pour la dernière étape, ajoutons un autre graphique. Nous devons nous rappeler de grouper par à la fois “Company_category_code” et “funded_year”, et de définir un widget “Sélectionner par” approprié pour cela. Puisqu'il y a deux tables sur cette page, vous avez le choix de laquelle contrôlera les données dans ce graphique. Dans ce cas, choisissez le widget que nous venons d'ajouter : “INVESTISSEMENTS [par Company_category_code]”.

![29-dynamic-chart2](images/investment-research/29-dynamic-chart2.png)

Comme dans la section précédente, nous configurons le graphique en sélectionnant “Type de Graphique” comme “Graphique à Barres”, et dans le menu déroulant “Axe X”, en sélectionnant “funded_year” et sous "Série", en sélectionnant “raised_amount_usd” et en masquant le reste.

![30-breakdowns-page-done](images/investment-research/30-breakdowns-page-done.png)

Nous pouvons maintenant cliquer à travers les catégories, et voir l'historique des investissements dans chacune.

## Prochaines étapes

Si vous n'êtes pas familier avec la manière dont nous avons créé la page “Détails de l'Entreprise” qui est présente dans l'exemple, visitez l'un de ces tutoriels précédents pour apprendre comment : ‘Comment construire un CRM léger’, ou ‘Gérer votre entreprise dans Grist’.

C'est tout ! Maintenant, allez analyser des données !