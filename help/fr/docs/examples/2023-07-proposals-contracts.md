# Création de Propositions

Si vous conservez des détails commerciaux et des contrats dans Grist, il peut être pratique de générer des propositions et des contrats directement là, à côté de ces enregistrements. Vous pouvez utiliser le [Widget Markdown Personnalisé](../widget-custom.md#markdown) pour créer un 'formulaire' personnalisé pour les Propositions, Contrats, ou de nombreux autres types de documents. Ce tutoriel vous montre comment configurer un document comme celui-ci :

*![Proposition](../examples/images/2023-07-proposals-contracts/final-proposal.png)*

Vous pouvez trouver un modèle terminé ici : [📝 Modèle de Propositions & Contrats](https://public.getgrist.com/nyPmvvea8c54/-Proposals-Contracts/m/fork){:target="\_blank"}.

Si vous souhaitez ajouter une proposition à un document existant, comprendre ce tutoriel devrait vous y aider.

## Configuration d'une table de Projet

Tout d'abord, créez une table pour enregistrer les détails du projet en
[créant un document vide](../creating-doc.md) et en renommant `Table1` en `Projets` :

*![Projets](../examples/images/2023-07-proposals-contracts/make-projects-table.png)*

Nous créerons notre modèle de Proposition à côté de notre table `Projets`.

Nous pouvons insérer des ID de colonnes comme des espaces réservés dans notre modèle de Proposition qui seront ensuite remplacés par la valeur de la cellule pour le projet sélectionné. Par exemple, dans la capture d'écran ci-dessous, la valeur de la colonne **Nom du Projet** remplacera la variable `{Nom_Projet}` dans le modèle de proposition à droite. Voir les colonnes disponibles lors de la création de notre proposition facilitera le remplissage de ces variables.

*![Projets](../examples/images/2023-07-proposals-contracts/column-placeholders.png)*

## Création de modèles

Ajoutons une nouvelle table, `Modèles`, à la page pour stocker nos données de modèle. Ajoutez deux colonnes : **Nom** et **Formatage du Modèle**.

*![Modèles](../examples/images/2023-07-proposals-contracts/templates-table.png)*

Maintenant, ajoutons un widget personnalisé à côté de la table pour visualiser notre **Formatage du Modèle**. Cliquez sur le bouton vert 'Ajouter Nouveau' puis 'Ajouter un widget à la page'. Sous 'Sélectionner le Widget', sélectionnez 'Personnalisé' et sous 'Sélectionner les Données', sélectionnez `Modèles`. Sous 'Sélectionner Par', sélectionnez `Modèles` à nouveau.

*![Ajouter Widget Personnalisé](../examples/images/2023-07-proposals-contracts/add-custom-widget.png)*

Configurez le widget personnalisé en sélectionnant 'Markdown' dans le menu déroulant 'Personnalisé'. Puisque nous allons éditer le modèle directement dans le widget personnalisé, vous devez autoriser 'Accès complet au document' sous Niveau d'Accès pour que le widget puisse mettre à jour la table `Modèles`.

Sous 'Contenu', sélectionnez la colonne **Formatage du Modèle**. C'est la colonne qui sera mise à jour lorsque nous ferons des modifications dans le widget personnalisé.

*![Widget Markdown](../examples/images/2023-07-proposals-contracts/markdown-configuration.png)*
{: .screenshot-half }

Créez un modèle dans la table `Modèles` en entrant une valeur dans la colonne **Nom**. Ensuite, commencez à éditer le formatage du modèle dans le widget personnalisé.

*![Modèle de Proposition](../examples/images/2023-07-proposals-contracts/create-proposal-template-1.png)*

Le widget utilise le formatage Markdown pour formater le texte. Pour obtenir de l'aide sur Markdown, cliquez sur le `?` en haut du widget pour consulter le [Guide Markdown](https://www.markdownguide.org/basic-syntax/).

*![aide-markdown](../examples/images/2023-07-proposals-contracts/markdown-help.png)*
{: .screenshot-half }

Lorsque vous cliquez sur l'icône 'enregistrer', le formatage du widget remplira la colonne **Formatage du Modèle**.

![Modèle de Proposition](../examples/images/2023-07-proposals-contracts/create-proposal-template.png)

Nous utiliserons exclusivement le widget personnalisé pour éditer le formatage du modèle afin que cette colonne puisse être masquée de la vue de la table. Pour masquer la colonne, faites un clic droit sur l'en-tête de la colonne puis 'Masquer la colonne'.

![Masquer Colonne](../examples/images/2023-07-proposals-contracts/hide-formatting-column.png)

Dans votre modèle, vous aurez des détails et du texte qui restent les mêmes pour tous les projets tels que le formatage, les en-têtes de section et les informations de votre propre entreprise. C'est l'information que vous taperez directement dans le modèle. Vous aurez également des informations qui changent, comme **Nom du Projet** ou **Nom du Client**. Nous pouvons utiliser des variables contenant des ID de colonnes comme espaces réservés pour ces données dynamiques.

**Nom du Projet**, **Nom du Client** et **Adresse du Client** changeront tous en fonction du Projet sélectionné. Donc, c'est l'information que nous devrions stocker dans notre table `Projets`.

Ajoutez les colonnes **Nom du Projet**, **Nom du Client** et **Adresse du Client** à la table `Projets`.

![Table des Projets](../examples/images/2023-07-proposals-contracts/project-customer-columns.png)

Nous pouvons utiliser les ID de colonnes pour chacune de ces colonnes comme espaces réservés dans notre modèle avec le format `{ID_COLONNE}`. L'ID d'une colonne peut être trouvé sous l'onglet 'Table' du Panneau du Créateur, directement sous l'Étiquette de la Colonne.

![Variables](../examples/images/2023-07-proposals-contracts/project-name-variable.png)

Terminez de construire votre modèle pour répondre à vos besoins. Assurez-vous d'ajouter une colonne à votre table `Projets` pour toutes les informations variables.

![Proposition](../examples/images/2023-07-proposals-contracts/proposal-template.png)

Enfin, nous devons ajouter une colonne de formule qui créera nos propositions uniques. Cette colonne de formule combinera le formatage du modèle que nous venons de créer avec nos données spécifiques au projet. Ajoutez une nouvelle colonne à la table `Projets` avec la formule suivante :
```
# Trouve toutes les données associées à cet enregistrement
class Find_Data(dict):
  def __missing__(self, key):
    return getattr(rec, key)

# Trouve le modèle "Proposition" dans la table Modèles
template = Templates.lookupOne(Name="Proposition").Template_Formatting

# Formate le modèle avec des champs de cette table ainsi que des champs de la table référencée
template.format_map(Find_Data())
```

![Formule de Proposition](../examples/images/2023-07-proposals-contracts/proposal-formula.png)

## Configuration d'un tableau de bord de proposition

Ensuite, nous voudrons remplir notre modèle de proposition avec des données de projet réelles ! Commencez à créer un *Tableau de Bord de Proposition* en ajoutant une nouvelle page à votre document. Cliquez sur le bouton vert 'Ajouter Nouveau' puis 'Ajouter Page'.

Sous 'Sélectionner le Widget', sélectionnez 'Table' et sous 'Sélectionner les Données', sélectionnez `Projets`.

![Ajouter Table de Projet](../examples/images/2023-07-proposals-contracts/add-projects-table.png)

Vous remarquerez que cette information dans une vue de table est un peu encombrée. Un [widget Fiche](../widget-card.md) aidera à simplifier notre vue.

Ajoutez un nouveau widget à la page en cliquant sur le bouton vert 'Ajouter Nouveau' puis 'Ajouter un widget à la page'. Sous 'Sélectionner le Widget', sélectionnez 'Fiche' et sous 'Sélectionner les Données', sélectionnez `Projets`. Sous 'Sélectionner Par', sélectionnez `Projets` et ajoutez à la page.

![Ajouter Fiche de Projet](../examples/images/2023-07-proposals-contracts/add-projects-card.png)

Votre tableau de bord devrait ressembler à la capture d'écran ci-dessous.

![début-tableau-de-bord-projet](../examples/images/2023-07-proposals-contracts/project-dashboard-start.png)

Maintenant que nous avons tous les détails de notre Projet dans une vue Fiche, nous pouvons les masquer de notre vue de table. Sous l'onglet 'Table' du Panneau du Créateur, sélectionnez toutes les colonnes sauf **Nom du Projet** et **Nom du Client** puis cliquez sur le bouton vert 'Masquer Colonnes'.

*![Masquer Colonnes](../examples/images/2023-07-proposals-contracts/hide-project-columns.png)*
{: .screenshot-half }

Garder la plupart des détails du projet dans le widget Fiche, plutôt que dans le widget Table, simplifie notre tableau de bord. Vous pouvez facilement voir tous les projets dans le widget Table, et lorsque vous souhaitez voir les détails d'un projet spécifique, sélectionnez le projet et le widget Fiche se mettra à jour pour vous montrer les détails du projet.

![table-fiche-projet](../examples/images/2023-07-proposals-contracts/project-table-card.png)

Enfin, nous voudrons ajouter une vue de notre proposition spécifique au projet. Ajoutez un nouveau widget personnalisé à la page en cliquant sur le bouton vert 'Ajouter Nouveau' puis 'Ajouter un widget à la page'. Sous 'Sélectionner le Widget', sélectionnez 'Personnalisé' et sous 'Sélectionner les Données', sélectionnez `Projets`. Sous 'Sélectionner Par', sélectionnez `Projets` et ajoutez à la page.

*![Ajouter Widget Personnalisé](../examples/images/2023-07-proposals-contracts/add-custom-project-widget.png)*

Configurez le widget personnalisé en sélectionnant 'Markdown' dans le menu déroulant 'Personnalisé'. Vous devez autoriser 'Accès complet au document'.

Sous 'Contenu', sélectionnez la colonne **Proposition**. C'est la colonne de formule qui combine notre formatage de modèle avec nos données spécifiques au projet.

*![Configurer Widget Personnalisé](../examples/images/2023-07-proposals-contracts/proposal-custom-widget-configuration.png)*
{: .screenshot-half }

[Personnalisez votre mise en page](../custom-layouts.md) en réorganisant et en redimensionnant les widgets.

Ajoutez des détails de projet pour un nouveau projet et voyez comment votre proposition se met à jour pour afficher les nouvelles données ajoutées.

*![Proposition Remplie](../examples/images/2023-07-proposals-contracts/populated-proposal.png)*

## Saisie des informations du client

Maintenant, faisons deux changements utiles à la configuration du Projet :

 * Mettez les informations du client dans une table séparée, afin que nous n'ayons pas à ressaisir leur adresse chaque fois que nous créons une proposition pour eux (et nous pouvons importer les adresses en masse).
* Mettez à jour la formule dans la colonne **Proposition** de la table `Projets` pour rechercher des informations dans une autre table.

Tout d'abord, créez une nouvelle table appelée `Clients` pour les informations spécifiques au client comme **Nom** et **Adresse**.

*![Table des Clients](../examples/images/2023-07-proposals-contracts/customers-table.png)*

Certaines de ces données sont incluses dans notre ensemble de données Projets. Pour éviter de dupliquer les données, nous devons mettre à jour nos colonnes **Nom du Client** et **Adresse du Client** pour qu'elles proviennent de notre table `Clients`.

Sur notre page *Tableau de Bord des Propositions*, sélectionnez le champ **Nom du Client** puis mettez à jour le type de colonne en *Référence*. Confirmez que 'Données de la Table' est réglé sur `Clients` et 'Afficher la Colonne' est **Nom**.

*![référence-nom-client](../examples/images/2023-07-proposals-contracts/customer-name-reference.png)*

Ensuite, nous devons mettre à jour le champ **Adresse du Client** pour extraire l'adresse du client listé dans la colonne **Nom du Client**.

Mettez à jour la colonne **Adresse du Client** pour utiliser la formule suivante :
```
$Customer_Name.Address
```
Cette formule utilise notre colonne de référence, **Nom du Client**, ainsi que la [notation par point](../references-lookups.md#reference-columns-and-dot-notation), pour extraire la valeur de la colonne **Adresse** de la table référencée.

Lorsque vous regardez une proposition pour un projet existant, vous remarquerez que le **Nom du Client** ne se remplit plus. Cela est dû à la façon dont les colonnes de référence stockent les données. Bien que sous 'Afficher la Colonne', nous ayons choisi de voir la valeur de la colonne **Nom** de la table référencée, les colonnes de référence stockent en réalité l'ID d'un enregistrement. C'est ce que nous voyons maintenant dans la proposition.

*![proposition-référence](../examples/images/2023-07-proposals-contracts/proposal-reference.png)*

Nous pouvons modifier notre formule dans la colonne **Proposition** pour rechercher des données dans d'autres tables.

Dans la table `Projets`, mettez à jour la formule dans la colonne **Propositions** avec ce qui suit :
```
# Trouve toutes les données associées à cet enregistrement
class Find_Data(dict):
  def __missing__(self, key):
    return getattr(rec, key)

# Trouve le modèle "Proposition" dans la table Modèles
template = Templates.lookupOne(Name="Proposition").Template_Formatting

# Formate le modèle avec des champs de cette table ainsi que des champs de la table référencée
template.format_map(Find_Data(
  Customer_Name = $Customer_Name.Name,
))
```
Dans la dernière partie de la formule, nous pouvons spécifier des variables qui tirent des données d'autres tables.

`Customer_Name = $Customer_Name.Name` est pour notre colonne de référence, **Nom du Client**. Il utilise la [notation par point](../references-lookups.md#reference-columns-and-dot-notation) pour spécifier quelles données extraire de la table référencée.

!!! note "Note : Adresse du Client"
    La colonne **Adresse du Client** peut être complètement supprimée de la table `Projets`. Ces données sont déjà stockées dans la table `Clients` et notre colonne **Nom du Client** est une colonne de référence pointant vers cette table. Nous pouvons utiliser cette colonne de référence pour extraire toute autre information de la table `Clients` à inclure dans notre proposition. Si vous choisissez de supprimer **Adresse du Client** de la table `Projets`, mettez à jour la dernière section de la formule comme suit :

    ```
    template.format_map(Find_Data(
      Customer_Name = $Customer_Name.Name,
      Customer_Address = $Customer_Name.Address.replace('\n', '<br>'),
    ))
    ```

    Cela indique à la formule quoi utiliser à la place de la variable `{Customer_Address}`.

## Impression et Enregistrement

Une fois votre proposition prête, vous pouvez l'imprimer ou l'enregistrer en PDF. Cliquez sur l'icône à trois points en haut à droite du widget puis sélectionnez 'Imprimer le widget'.

*![imprimer-proposition](../examples/images/2023-07-proposals-contracts/print-proposal.png)*

À partir de là, vous pouvez soit sélectionner une imprimante, soit choisir 'Enregistrer en PDF' dans le menu déroulant 'Destination'.

*![imprimer-ou-pdf](../examples/images/2023-07-proposals-contracts/print-or-pdf.png)*

## Configuration de plusieurs formulaires

Vous pouvez ajouter plus de modèles de formulaire en suivant les mêmes étapes que nous venons de compléter.

Ajoutez un nouveau modèle à la table `Modèles` puis construisez le modèle en utilisant des variables contenant des ID de colonnes pour toutes les données spécifiques au projet. Si vous avez des sections identiques à un autre formulaire, copiez-les pour vous éviter la peine de les retaper !

*![modèle-contrat](../examples/images/2023-07-proposals-contracts/contract-template.png)*

Créez un tableau de bord où vous pouvez sélectionner un projet et entrer des détails pour ce formulaire puis prévisualiser le formulaire dans un widget personnalisé.

*![tableau-de-bord-contrat](../examples/images/2023-07-proposals-contracts/contract-dashboard.png)*

N'oubliez pas, vous devrez ajouter une colonne de formule qui combine le nouveau modèle de formulaire avec les détails du projet sélectionné !

*![formule-contrat](../examples/images/2023-07-proposals-contracts/contract-formula.png)*

Cette colonne de formule est ce que vous sélectionnerez sous le menu déroulant 'Contenu' lors de la configuration du [Widget Markdown Personnalisé](../widget-custom.md#markdown).

*![configuration-widget-contrat](../examples/images/2023-07-proposals-contracts/contract-widget-configuration.png)*