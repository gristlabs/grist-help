# Impression d'Étiquettes d'Adresse

Imprimez-vous des étiquettes d'adresse ? En général, cela implique quelques étapes : d'abord exporter les adresses, puis les importer dans Word ou un autre logiciel capable de les disposer pour un type d'étiquette particulier.

<center>
<img src="/examples/images/2020-10-print-labels/labels-intro.png" alt="Étiquettes d'Adresse" width=329 height=276>
</center>

Si vous maintenez des adresses dans Grist -- ou utilisez des étiquettes pour des badges nominatifs, des conteneurs de stockage, des affaires d'enfants, ou [d'autres utilisations créatives](https://www.shutterfly.com/designs/7-creative-uses-for-address-labels) -- vous pouvez ajouter une vue personnalisée pour avoir vos étiquettes imprimables disponibles en un clic.

## Modèle Prêt à l'Emploi

Laissez-moi d'abord partager un modèle. Plus tard, je décrirai comment ajouter la même fonctionnalité à un document existant, par exemple pour ajouter des étiquettes d'adresse à côté des données de [CRM](../lightweight-crm.md) ou de [Paie](2020-09-payroll.md).

Le modèle est disponible à : <https://templates.getgrist.com/9nNr9uQwoXWA/Print-Mailing-Labels>{:target="\_blank"}.

Vous pouvez l'utiliser immédiatement. Il suffit de taper vos propres adresses.

Le modèle montre quelques variations de ce que vous pouvez faire.

### Étiquettes pour une table d'adresses

C'est ce que vous voyez sur la première page :

![Page des Étiquettes d'Adresse](../examples/images/2020-10-print-labels/address-labels-page.png)

Vous pouvez utiliser le menu déroulant en haut de la vue des étiquettes pour sélectionner la taille des étiquettes, en fonction du papier d'étiquettes que vous prévoyez d'utiliser.

Ce qui est réellement imprimé est une colonne cachée nommée `LabelText`. Si vous affichez cette colonne, ou la trouvez dans la page "Adresses" (où elle est visible), vous verrez que c'est une formule qui assemble toutes les parties d'une adresse. (Nous entrerons dans les [détails de cette formule](#ajouter-la-formule-labeltext) ci-dessous.)

Pour imprimer les étiquettes, sélectionnez "Imprimer la vue" dans le menu au-dessus de la vue des étiquettes (voir aussi les [Notes d'Impression](#notes-dimpression) ci-dessous) :

<span class="screenshot-large">*![Menu d'Impression](../examples/images/2020-10-print-labels/print-menu.png)*</span>
{: .screenshot-half }

### Une feuille d'étiquettes pour la même adresse

Si vous avez besoin de nombreuses étiquettes identiques, par exemple pour une adresse de retour, ajoutez une autre colonne nommée `LabelCount`. Ceci est illustré dans la page "Feuilles d'Étiquettes".

![Page des Feuilles d'Étiquettes](../examples/images/2020-10-print-labels/label-sheets-page.png)

Si vous avez plusieurs adresses dans la table et que vous souhaitez n'en imprimer qu'une seule, il suffit de définir le compte à zéro pour les adresses que vous ne souhaitez pas inclure.

### Une liste filtrée d'étiquettes

Il existe plusieurs façons d'imprimer seulement quelques étiquettes à partir d'une table plus grande, et celles-ci sont illustrées dans le modèle lié :

1. La page "Étiquettes d'Adresse" inclut un bouton de filtre pour `État`, qui permet un filtrage simple par état. Vous pouvez cliquer sur le bouton `+` pour créer facilement des filtres supplémentaires comme celui-ci :

    <span class="screenshot-large">*![Bouton de Filtre](../examples/images/2020-10-print-labels/filter-button.png)*</span>
    {: .screenshot-half }

2. Pour imprimer seulement quelques étiquettes à partir d'une table plus grande, vous pouvez utiliser la colonne `LabelCount` avec une formule. Cette formule peut produire 1 pour une étiquette qui doit être incluse, ou 0 pour une étiquette qui ne doit pas l'être. La page "Filtré par Formule" montre un exemple, avec la formule simple qui inclut uniquement les adresses de Californie : `IF($State == "CA", 1, 0)`{: .formula} :

    ![Page Filtrée](../examples/images/2020-10-print-labels/filtered-page.png)

3. La page "Filtré Manuellement" inclut une colonne `Sélectionner pour Imprimer`. Cliquez sur n'importe quel bouton pour inclure la ligne correspondante dans la feuille d'étiquettes.

[ALLER AU MODÈLE](https://templates.getgrist.com/9nNr9uQwoXWA/Print-Mailing-Labels){:target="\_blank"}
{: .grist-button }

<br/>

## Ajouter des Étiquettes à Votre Document

Si vous avez un document avec des adresses, vous pouvez ajouter une page avec des étiquettes d'adresse, et les étiquettes seront là -- à jour et prêtes pour vous -- chaque fois que vous l'ouvrez.

Je vais supposer que vous avez déjà une page qui montre une table avec des adresses. Peut-être s'appelle-t-elle "Personnes", "Clients" ou "Employés". Ouvrez le menu à côté du nom de la page dans le panneau de gauche, et cliquez sur "Dupliquer" :

<span class="screenshot-large">*![Dupliquer la Page](../examples/images/2020-10-print-labels/duplicate-page.png)*</span>
{: .screenshot-half }

Cela vous donne une nouvelle page. Nous ajouterons les étiquettes ici, pour éviter de prendre de la place sur la page que vous utilisez à d'autres fins.

### Ajouter la formule LabelText

Ensuite, ajoutez une colonne à la table avec les adresses, et nommez-la `LabelText`. Tapez une formule qui produit une adresse formatée sur plusieurs lignes. Voici un exemple, mais vous devrez peut-être renommer, ajouter ou supprimer des champs en fonction des noms de vos colonnes :

```python
"%s\n%s %s\n%s, %s %s" % ($Name, $Street1, $Street2, $City, $State, $Zip)
```

Notez qu'il s'agit de la syntaxe Python pour formater des chaînes de caractères. Voici un guide bref pour décoder cela :

- Chaque `%s` est remplacé par la valeur suivante de la liste entre parenthèses après `%`.
- `\n` insère une nouvelle ligne.
- `$Name` etc. sont des variables Grist correspondant aux champs de l'enregistrement actuel.

### Ajouter la Vue Personnalisée

Cliquez sur le bouton `Ajouter Nouveau` et sélectionnez `Ajouter une Vue à la Page`. Dans la boîte de dialogue qui apparaît, sélectionnez la vue `Personnalisée` et la table qui contient les adresses :

<span class="screenshot-large">*![Ajouter une Page](../examples/images/2020-10-print-labels/add-page.png)*</span>
{: .screenshot-half }

Cliquez sur `Ajouter à la Page`.

Ouvrez le menu au-dessus de la vue et sélectionnez "Options de la Vue" :

<span class="screenshot-large">*![Options de la Vue](../examples/images/2020-10-print-labels/widget-options.png)*</span>
{: .screenshot-half }

Dans le panneau de droite qui s'ouvre, dans la section "Personnalisé", entrez l'URL de la vue qui implémente la fonctionnalité des étiquettes d'adresse :

`https://gristlabs.github.io/grist-widget/printlabels/`

Ensuite, changez le menu déroulant "Accès" de `aucun` à `lire la table`.

Vous devriez maintenant voir vos étiquettes ! Si ce n'est pas le cas, vérifiez que `LabelText` est listé ci-dessous sous "Colonnes Visibles". (Si c'est sous "Colonnes Cachées", cliquez sur l'icône "œil" pour le rendre visible à la vue.)

<span class="screenshot-large">*![Colonnes Visibles](../examples/images/2020-10-print-labels/visible-columns.png)*</span>
{: .screenshot-half }

Vous pouvez ajouter une autre colonne nommée `LabelCount` pour imprimer plusieurs étiquettes ou en omettre certaines. Si vous le faites, assurez-vous simplement de l'ajouter aux "Colonnes Visibles" de la Vue Personnalisée, car ce sont les seules colonnes disponibles pour elle.

### Définir la Taille Préférée des Étiquettes

La vue des étiquettes se souvient de la dernière taille d'étiquette que vous avez choisie. Si vous préférez qu'elle s'ouvre toujours à une taille fixe, vous pouvez ajouter la taille préférée dans l'URL de la vue (dans le panneau de droite), par exemple :

`https://gristlabs.github.io/grist-widget/printlabels/#labels10`

Les tailles disponibles sont `labels8`, `labels10`, `labels20`, `labels30`, `labels60` et `labels80`, chacune correspondant à un type standard de papier d'étiquettes (tous basés sur le format de papier US Letter).

Dans le document d'exemple, cela est illustré dans la vue sur la page "Filtré".

## Notes d'Impression

La vue utilise le navigateur pour l'impression. Pour correspondre exactement aux tailles du papier d'étiquettes, vérifiez bien que vous n'avez pas de paramètres qui changeraient l'échelle, et vérifiez l'Aperçu avant impression avant d'imprimer. S'il y a une échelle définie, elle doit être "100%", et des options telles que "Ignorer l'Échelle et Réduire pour Adapter à la Largeur de la Page" doivent être désactivées.

## Personnalisation Supplémentaire

Cette fonctionnalité est construite en utilisant les [Vues Personnalisées](../widget-custom.md). Elle vous permet, ou permet à un développeur tiers, de la personnaliser davantage en utilisant HTML, CSS et Javascript. Pour les développeurs intéressés, le code de cette vue est disponible à <https://github.com/gristlabs/grist-widget/tree/master/printlabels>.

<span class="screenshot-large">*![Profitez des Étiquettes](../examples/images/2020-10-print-labels/enjoy-label.png)*</span>
{: .screenshot-half }