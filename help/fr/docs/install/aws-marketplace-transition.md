Transition vers Grist Builder Edition {: .tag-core .tag-ee }
=============

Grist Builder Edition remplace l'offre AWS Marketplace basée sur
Omnibus.

# Transition des documents Grist

Il est possible de copier vos documents Grist vers Builder Edition.

1. Notez la variable `EMAIL` sous `~/grist/gristParameters`.
2. Démarrez [une instance Grist Builder Edition](grist-builder-edition.md).
3. Suivez [les instructions pour exécuter le script bootstrap](https://github.com/gristlabs/grist-pack/tree/main/dist#quickstart),
   en utilisant la valeur de `EMAIL` pour la valeur `DEFAULT_EMAIL`. Voir
   [ici](../self-managed.md#quest-ce-que-le-compte-administratif) pour
   plus de détails concernant cette variable.
   
   Vous n'avez pas besoin d'exécuter `docker compose up`, mais cela peut être utile
   pour vérifier votre configuration avant de continuer.

Par défaut, cela devrait créer un répertoire vide à
`/home/grist/persist/grist` dans l'instance EC2 Grist Builder Edition.
Les fichiers suivants de l'offre Omnibus doivent être copiés dans
ce répertoire :

* `~/grist-persist/home.sqlite3`
* Le répertoire `~/grist-persist/docs` entier

Voir également ["Quels fichiers Grist stocke-t-il ?"](../self-managed.md#quels-fichiers-grist-stocke-t-il) pour une
explication de ce que sont ces fichiers.

Il existe quelques méthodes standard pour copier des fichiers entre des instances EC2.

## Volume EBS

Vous pouvez [utiliser un volume EBS multi-attache](https://docs.aws.amazon.com/ebs/latest/userguide/working-with-multi-attach.html).
Avec cette méthode, vous montez le volume sur les deux images de machine et l'utilisez
pour stocker ou copier les fichiers entre instances. Idéalement, vous pouvez monter
le volume EBS à `/home/grist/persist/grist` dans l'instance EC2 cible.

## `scp`

La méthode traditionnelle pour copier des fichiers entre instances est `scp`, un mécanisme de
transfert de fichiers sur le protocole SSH. Une petite complication est que
l'utilisateur vers lequel copier, `grist` dans l'instance EC2 cible, par défaut
n'a pas de connexion SSH activée. Nous recommandons de copier vers l'utilisateur par défaut
`ubuntu`, de se connecter à l'instance EC2 Grist Builder Edition, et
ensuite de déplacer les fichiers de l'utilisateur `ubuntu` vers l'utilisateur
`grist` à l'emplacement `persist`. Assurez-vous que la propriété des fichiers est également
transférée, en utilisant la commande `chown`.

# Transition des utilisateurs Grist

De nouveaux utilisateurs peuvent avoir besoin d'être créés dans Grist Builder Edition
correspondant à l'utilisateur de l'offre Omnibus. Grist identifie les utilisateurs
par leur adresse e-mail.

Pour les utilisateurs qui se sont connectés via Google, Microsoft ou tout autre fournisseur OpenID
Connect, la configuration du fournisseur OIDC correspondant dans l'instance EC2
cible est suffisante. Cela peut être activé dans le fichier d'environnement
`/home/grist/.env` dans l'instance EC2 Grist Builder Edition.

Pour les utilisateurs qui se sont connectés via la combinaison e-mail/mot de passe intégrée de Dex,
leurs identifiants de connexion peuvent être transférés vers Authelia dans
Grist Builder Edition. Consultez le fichier
`/home/grist/persist/users_database.yml` dans l'instance EC2 Grist Builder Edition
pour les détails.
