# Vue fiche : Formulaire

La vue formulaire vous permet de collecter des données dans une vue formulaire qui remplit votre table de données Grist lors de la soumission.

*![widget-form-intro](images/widget-form/widget-form-intro.png)*
{: .screenshot-half }

## Configurer vos données

Créez une table contenant les colonnes de données que vous souhaitez remplir via le formulaire.

*![widget-form-data-table](images/widget-form/widget-form-data-table.png)*

## Créer votre formulaire

Ajoutez une vue formulaire depuis le menu "Ajouter nouveau". Sélectionnez la table de données que vous souhaitez remplir avec les données du formulaire.

*![widget-form-add-widget](images/widget-form/widget-form-add-widget.png)*
{: .screenshot-half }

Ensuite, personnalisez le formulaire à votre guise !

Par défaut, la vue formulaire inclura des éléments pour les en-têtes et les descriptions ainsi que toutes les colonnes (champs) de la table de données sous-jacente.

*![widget-form-default-values](images/widget-form/widget-form-default-values.png)*

### Ajouter et supprimer des éléments

Pour ajouter des éléments supplémentaires au formulaire, cliquez sur l'icône + en bas du formulaire. Dans le menu, vous pouvez ajouter les éléments suivants :

1. **Nouvelle question :** Sélectionnez un type de colonne pour créer un nouveau champ. "••• Plus >" ouvrira un menu étendu listant tous les types de colonnes. Ajouter une nouvelle question ajoutera une nouvelle colonne à la table de données sous-jacente.
2. **Champs non appariés :** Liste tous les champs cachés de la table de données sous-jacente.
3. **Blocs de construction :** Personnalisez davantage en ajoutant ces éléments supplémentaires !

*![widget-form-elements-side](images/widget-form/widget-form-elements-side.png)*

Vous pouvez supprimer tout élément du formulaire en survolant l'objet et en cliquant sur l'icône de la corbeille pour supprimer. Vous pouvez masquer tout champ inutile du formulaire en survolant l'objet et en cliquant sur l'icône x.

*![widget-form-delete](images/widget-form/widget-form-delete.png)*

### Configurer les champs

Vous pouvez fournir des titres alternatifs pour vos champs de formulaire, plutôt que d'utiliser le même nom de colonne de la table de données sous-jacente. Par exemple, sur notre formulaire, nous avons un bouton bascule intitulé "Pouvons-nous vous contacter ?". Dans la table de données, cette colonne est étiquetée "Ok pour contacter ?". Les titres des champs peuvent être configurés sous l'onglet "Champ" du panneau de création.

*![widget-form-field-title](images/widget-form/widget-form-field-title.png)*

Pour rendre un champ de formulaire obligatoire, cochez la case à côté de "Champ obligatoire".

*![widget-form-required-field](images/widget-form/widget-form-required-field.png)*

Si un utilisateur tente de soumettre un formulaire sans remplir le champ obligatoire, il recevra une alerte pour remplir le champ.

*![widget-form-required-field-error](images/widget-form/widget-form-required-field-error.png)*
{: .screenshot-half }

### Configurer les blocs de construction

Les blocs de construction En-tête et Paragraphe peuvent être édités soit directement dans le bloc, soit depuis le panneau de création. Dans le panneau de création, vous avez des options d'alignement de texte disponibles.

*![widget-form-block-options](images/widget-form/widget-form-block-options.png)*

Pour un formatage supplémentaire, les deux éléments permettent l'utilisation du formatage Markdown. Pour obtenir de l'aide sur le formatage Markdown, consultez le [Guide Markdown](https://www.markdownguide.org/basic-syntax/).

*![widget-form-markdown](images/widget-form/widget-form-markdown.png)*

!!! note "Formatage HTML"
    Les balises HTML peuvent être utilisées dans le texte formaté en Markdown. Assurez-vous de séparer les éléments HTML de niveau bloc comme `<div>` et `<p>` des autres éléments en utilisant des lignes vides.

### Configurer les options de soumission

Vous avez également la possibilité de configurer différents paramètres pour le bouton "Soumettre". Vous pouvez changer l'étiquette du bouton, mettre à jour le texte de succès qui apparaît après la soumission d'un formulaire et choisir d'autoriser plusieurs soumissions de formulaire. Vous avez également la possibilité de sélectionner une URL spécifique vers laquelle rediriger après la soumission.

Ces options sont toutes disponibles sous l'onglet "Formulaire" et le sous-onglet "Soumission" du panneau de création.

*![widget-form-submission-options](images/widget-form/widget-form-submission-options.png)*
{: .screenshot-half }

## Publier votre formulaire

Une fois que vous avez terminé de personnaliser votre formulaire, vous avez la possibilité de prévisualiser votre formulaire avant de le publier.

*![widget-form-footer-options](images/widget-form/widget-form-footer-options.png)*

La prévisualisation vous permettra de voir à quoi ressemblera votre formulaire pour les utilisateurs finaux, sans le rendre disponible pour l'utilisation.

Après avoir confirmé que tout est comme vous le souhaitez, vous pouvez publier votre formulaire. Notez que seuls les utilisateurs ayant un accès "PROPRIÉTAIRE" ont la permission de publier un formulaire.

La première fois que vous publiez un formulaire, la popup d'information suivante apparaîtra, expliquant les permissions qu'un formulaire publié accorde.

*![widget-form-publish](images/widget-form/widget-form-publish.png)*

Une fois qu'un formulaire a été publié, un bouton apparaîtra pour copier le lien vers le formulaire. Partagez ce lien avec les utilisateurs finaux pour qu'ils remplissent votre formulaire ! Vous avez également la possibilité de dépublier votre formulaire. Notez que dépublier le formulaire désactivera le lien de partage. Les utilisateurs accédant au formulaire via ce lien verront alors une erreur.

*![widget-form-footer-options-published](images/widget-form/widget-form-footer-options-published.png)*

## Soumissions de formulaire

Après avoir partagé le lien vers votre formulaire publié, les utilisateurs finaux peuvent soumettre des données à votre document Grist via le formulaire.

*![widget-form-submission](images/widget-form/widget-form-submission.png)*

Toutes les données soumises apparaîtront dans votre table de données sous-jacente dans votre document Grist ! Collecter des données n'a jamais été aussi facile. 😍

*![widget-form-submission-table](images/widget-form/widget-form-submission-table.png)*