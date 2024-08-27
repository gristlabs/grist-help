# Règles d'accès pour restreindre les enregistrements en double

Supposons que nous ayons une table listant les aéroports, et que nous voulions
interdire l'entrée d'un nouvel enregistrement avec le même code d'aéroport qu'un existant.
Dans la table, nous pouvons ajouter une colonne nommée `Count` qui compte combien
d'enregistrements ont le même code :

![Table des aéroports](images/2023-01-acl-memo/access-rules-dupe-setup.png)

Pour comprendre cette formule, visitez notre [aide-mémoire des formules](../formula-cheat-sheet.md#finding-duplicates) pour trouver des doublons.

Maintenant, nous pouvons ajouter une règle d'accès pour interdire toute mise à jour ou création d'enregistrement qui entraînerait un `Count` supérieur à un. Nous pouvons également inclure une note pour expliquer le problème :

![Règle de duplication](images/2023-01-acl-memo/access-rules-dupe-rule.png)

!!! note "newRec" 
    Cette variable est disponible pour la création et la mise à jour des enregistrements/lignes, et contient l'état d'une ligne après une modification proposée, vous permettant de permettre ou de refuser sélectivement certaines modifications. Voir [vérification des nouvelles valeurs](../access-rules.md/#checking-new-values) pour plus de détails.

Maintenant, si nous essayons d'ajouter une nouvelle ligne avec un code existant, nous obtenons une erreur utile :

![Erreur de duplication](images/2023-01-acl-memo/access-rules-dupe-forbidden.png)

Voir [Conditions des règles d'accès](../access-rules.md#access-rule-conditions) pour plus de détails sur l'écriture des conditions des règles d'accès, et [Formules](../formulas.md) pour en savoir plus sur l'utilisation des formules dans les colonnes.