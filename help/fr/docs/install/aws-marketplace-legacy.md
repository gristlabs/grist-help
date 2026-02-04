AWS Marketplace (Legacy) {: .tag-core .tag-ee }
=============

!!! warning "Note"
    Cette documentation fait référence à la version legacy de Grist sur AWS Marketplace, basée sur [Grist Omnibus](https://github.com/gristlabs/grist-omnibus). Vous pouvez trouver la documentation pour l'offre actuelle [ici](grist-builder-edition.md). Consultez également nos [notes de transition](aws-marketplace-transition.md).

## Configuration du premier lancement

Après avoir déployé l'instance, Grist devrait être immédiatement disponible via le protocole HTTP sur un domaine autogénéré tel que `ec2-3-94-254-105.compute-1.amazonaws.com` (étiqueté `Public IPv4 DNS` par AWS).

Identifiants par défaut :

* e-mail : admin@example.getgrist.com
* mot de passe : [instance-id]\*

\* L'ID d'instance peut être trouvé sur la page EC2 dans la console AWS :
![Capture d'écran de l'ID d'instance AWS](../images/aws-instance.png)

## Configuration du domaine personnalisé et SSL pour l'accès HTTPS

Les domaines personnalisés sont requis pour un accès sécurisé à Grist. Si vous avez déjà un certificat SSL, vous pouvez utiliser le vôtre (comme décrit dans le README [`grist-omnibus`](https://github.com/gristlabs/grist-omnibus/)). Sinon, Grist peut générer un certificat depuis Let's Encrypt. Pour cela, un domaine valide et un e-mail doivent être configurés :

1. Pointez le domaine vers l'adresse IP de l'instance EC2 Grist. Si vous n'utilisez pas le [service Elastic IP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html), l'instance peut avoir une adresse IPv4 publique différente à chaque démarrage.
2. Connectez-vous à l'instance EC2 Grist.
3. Définissez le paramètre URL dans le fichier `grist/gristParameters`. Vous avez besoin de privilèges administrateur pour effectuer cette action, donc vous pouvez ouvrir un éditeur en exécutant `sudo nano grist/gristParameters`.
4. Exécutez le script `restartGrist` avec `sudo ~/grist/restartGrist`.

Une fois les étapes ci-dessus terminées, vous devriez pouvoir accéder à Grist sur votre domaine personnalisé.

## Configuration de l'authentification

Une fois que vous avez [votre ID client Microsoft ou Google et secret](grist-builder-edition.md#configuration-de-lauthentification), vous devrez les passer au fichier `gristParameters` à l'intérieur de l'instance EC2 Grist :

1. Connectez-vous à l'instance EC2 Grist.
2. Ouvrez `~/grist/gristParameters`.
3. Mettez à jour les sections `CLIENT_ID` et `CLIENT_SECRET` pour le(s) fournisseur(s) concerné(s).
    * Si vous utilisez un seul fournisseur, laissez la deuxième section commentée.
4. Mettez à jour `ADMIN_EMAIL` dans le même fichier. Il devrait correspondre à l'e-mail que vous utiliserez pour vous connecter via votre fournisseur d'authentification. Par exemple : `ADMIN_EMAIL=frank@your-organization.com`
    * Si vous souhaitez changer le nom de votre équipe, mettez à jour `TEAM_NAME` dans le même fichier.
5. Exécutez `restartGrist` avec l'indicateur clean en utilisant `sudo ~/grist/restartGrist clean` pour effacer les anciennes données de connexion. **Important :** Cela supprimera tous les documents Grist !

Une fois ce qui précède configuré, vous devriez pouvoir vous connecter avec vos identifiants Google/Microsoft.

## Exécution de Grist dans un VPC séparé

`grist-omnibus` est conçu pour fonctionner sur chaque VPC par défaut du compte. Pour le faire fonctionner sur un VPC personnalisé, vous devrez configurer correctement tous les éléments VPC. Pour plus d'informations sur cette configuration, lisez [ici](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html). Pour exécuter Grist sur un VPC, ce qui suit doit être correctement configuré :

* L'assignation d'un nom DNS public à l'instance EC2 Grist est autorisée.
* Le VPC peut être accessible depuis internet (permettant à la passerelle internet et aux tables de routage de gérer le trafic).
* Une connexion de groupe de sécurité depuis les ports 22 (SSH pour la configuration), 80 (connexion HTTP) et 433 (connexion HTTPS) est autorisée.

## Mise à jour de `grist-omnibus`

La version empaquetée de `grist-omnibus` se mettra à jour automatiquement avant chaque lancement. Pour mettre à jour `grist-omnibus` manuellement, redémarrez l'instance EC2 Grist ou connectez-vous via SSH et appelez `sudo ~/grist/restartGrist`.

# Autres informations importantes

* Grist stocke toutes les données dans le répertoire `~/grist-persist`. Supprimer ce dossier entraînera une perte de toutes les données de tous les documents.
* Ne supprimez pas `~/grist-persist/acme.json`, car il contient une clé privée de Let's Encrypt. Le supprimer trop souvent peut entraîner le refus de Let's Encrypt d'émettre d'autres certificats depuis votre domaine.
