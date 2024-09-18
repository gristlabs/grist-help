---
title: Credit card expenses
---

# Découper et Analyser les Dépenses

Grist offre un moyen pratique d'explorer rapidement vos transactions par carte de crédit, par exemple si vous souhaitez voir les transactions par :

- Catégorie
- Membre de la carte
- Mois
- Combinaison de l'un des éléments ci-dessus

Voici un exemple utilisant des données d'American Express (rédigées pour des raisons de confidentialité, bien sûr). Voir ci-dessous pour l'utiliser comme modèle pour vos propres données.

Cette première page est un tableau de bord : elle montre quelques graphiques récapitulatifs — vos dépenses par mois, et deux graphiques circulaires pour vous permettre de voir rapidement quel membre de la carte ou quelle catégorie a le plus de dépenses.

![Tableau de Bord](../examples/images/2020-06-credit-card-dashboard.png)

Les trois pages suivantes montrent des répartitions par Catégorie, Membre de la carte et par Mois. En plus des totaux par Catégorie, vous pouvez cliquer sur n'importe quelle Catégorie pour voir toutes les transactions qu'elle contient, puis cliquer sur n'importe quelle transaction pour voir ses détails complets.

![Par Catégorie](../examples/images/2020-06-credit-card-by-category.png)

Voici l'[exemple avec des données d'échantillon](https://templates.getgrist.com/2i9WoHs2oRzK/Credit-Card-Activity-Template-AmEx/){:target="\_blank"} que vous pouvez essayer.

Pour l'utiliser avec vos propres données, commencez par télécharger vos transactions. Pour les cartes de crédit American Express :

1. Connectez-vous sur <https://americanexpress.com>{:target="\_blank"}
2. Allez dans l'onglet “Statements & Activity”, puis sélectionnez “View By Year” ou “Custom Date Range”.
3. Cliquez sur l'icône “Download your Transactions”.
4. Lorsque vous êtes invité à choisir le format de téléchargement, sélectionnez “CSV” et cochez la case qui dit “Include all additional transaction details”.

Pour importer ces données dans Grist :

1. Ouvrez le [modèle ici](https://public.getgrist.com/mMbk6UEHoHYf/AmEx-Activity-Template/m/fork){:target="\_blank"}.
2. Cliquez sur le bouton "Add New" et choisissez "Import from file".
3. Dans la boîte de dialogue qui s'affiche, changez “To” table de “New Table” à “Activity”, comme suit :

<span class="screenshot-large">*![Destination de l'importation](images/2020-06-credit-card-import-destination.png)*</span>
{: .screenshot-half }

Cliquez sur "Import", et vous avez terminé. Vos données sont prêtes à être explorées.

!!! tip "Note"
    Lorsque vous commencez avec un lien de modèle, votre copie du document n'est initialement pas sauvegardée. Pour conserver ces données pour plus tard, cliquez sur “Save Copy”, et donnez un nom au document. Vous verrez le document plus tard sur votre page d'accueil Grist à <https://docs.getgrist.com>.

Un modèle comme celui-ci ne prend pas longtemps à préparer. Il utilise une combinaison de [tables de synthèse](../summary-tables.md) et de [liaison de vues](../linking-widgets.md).

Vous avez des retours ou des améliorations à proposer ? Veuillez nous les partager par email à <support@getgrist.com>.
