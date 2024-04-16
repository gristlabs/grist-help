Colonne de Paternité
===================

Il est parfois utile d'avoir des colonnes qui enregistrent le nom de la personne
qui a créée une nouvelle ligne ou mis à jour de la donnée. Grist permet de créer
facilement ce type de colonnes. Grist va suivre automatiquement les
modifications apportées au document dans l'onglet "Historique du document", mais
il est parfois pratique de disposer de ces informations sous forme de tableau
pour les formules et les filtres, et les colonnes de Paternité vous permettent
de le faire.

## Une colonne "Créé par"

Supposons que nous voulions remplir automatiquement une colonne avec le nom du
créateur de chaque nouvelle ligne au fur et à mesure qu'elles sont ajoutées.
Pour commencer, ajouter une colonne appelée (par exemple) `Créé par`. Dans les
options de colonne du panneau latéral (voir [Colonnes](col-types.md) pour un
rappel), cliquez sur l'action `Définir une formule d'initialisation`.

![créer une colonne Créé Par](images/formulas/formulas-created-by-convert.png)

Définissez `user.Name`{ : .formula} comme formule de la colonne. Il existe
d'autres possibilités, comme `user.Email`{ : .formula}, ou `user.UserID`{ :
.formula}, etc. Les informations disponibles sur l'utilisateur sont les mêmes
que dans les [Permissions Avancées](access-rules.md#access-rule-conditions).
L'horodatage est également disponible (voir [Colonnes
d'horodatage](timestamps.md)). Mais restons-en à `user.Name`{ : .formula} pour
l'instant.

![une colonne Créé par](images/formulas/formulas-created-by-final.png)

Maintenant, afin de paramétrer la colonne pour chaque nouvelle ligne créée,
assurez-vous que l'option `Appliquer sur les nouvelles lignes uniquement` est
cochée. Et c'est tout! Maintenant, à chaque fois qu'une nouvelle ligne est
créée, la colonne `Créé par` aura le nom de l'utilisateur qui a créé cette ligne

![un exemple Créé par](images/formulas/formulas-created-by-autofill.png)


## Une colonne "Mis à jour par"

Si nous voulons une colonne qui enregistre le nom de la dernière personne qui a
modifié une ligne (par opposition à la personne qui a créé la ligne), la
procédure est similaire à [une colonne "Créé
par"](authorship.md#a-created-by-column), mais au lieu de "Appliquer sur les
nouvelles lignes uniquement", sélectionnez "Réappliquer en cas de modification
de la ligne". Sélectionnez ensuite `N'importe quel champ` (en supposant que vous
voulez que tout changement dans une ligne soit considéré comme une mise à jour)
et appuyez sur `OK`. Par ailleurs, vous pouvez également choisir que certaines
colonnes en particulier qui, lorsqu'elles seront mises à jour, déclencheront la
formule.

![une colonne Mise à jour par](images/formulas/formulas-updated-by-setup.png)

Voici un exemple de la nouvelle colonne à l'œuvre - lorsque `Cotton Candy v
Candy Floss` est mise à jour, un nom d'utilisateur apparaît pour cette ligne :

![une colonne Mise à jour par](images/formulas/formulas-updated-by-autofill.png)

!!! note "Il est toujours possible pour un utilisateur de modifier manuellement
les cellules dans les colonnes `Créé par` et `Mis à jour par`. Si vous ne voulez
pas que cela soit autorisé, utilisez les [Permissions Avancées](access-rules.md)
pour l'interdire."

