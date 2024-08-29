---
title: AWS Marketplace
---

AWS Marketplace {: .tag-core .tag-ee }
============

[Grist sur AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-kkchmamumozhq) a ce qu'il vous faut pour exécuter une instance Grist auto-hébergée avec une configuration minimale, et est basé sur [`grist-omnibus`](https://github.com/gristlabs/grist-omnibus). Vous trouverez ci-dessous les étapes complètes de configuration, y compris l'authentification via OpenID.

## Configuration de la première exécution

Après le déploiement de l'instance, Grist devrait être immédiatement disponible via le protocole HTTP sur un domaine autogénéré tel que `ec2-3-94-254-105.compute-1.amazonaws.com` (étiqueté `Public IPv4 DNS` par AWS).

Identifiants par défaut :

* email : admin@example.getgrist.com
* mot de passe : [instance-id]\*

\* L'ID de l'instance peut être trouvé sur la page EC2 dans la console AWS :
![Capture d'écran de l'ID de l'instance AWS](../images/aws-instance.png)

### Comment se connecter à l'instance Grist

Pendant le déploiement, il vous a été demandé de créer ou d'utiliser des paires de clés. Vous pouvez utiliser cette paire pour vous connecter via SSH depuis votre terminal/bash. L'utilisateur par défaut pour l'instance Grist EC2 s'appelle “ubuntu”, et vous pouvez vous connecter à `ubuntu@[ec2-instance-public-ip]`.

**Remarque :** Vous devez utiliser le fichier `*.pem` que vous avez reçu lors de la génération des paires de clés sur AWS. Les détails sur la connexion via SSH se trouvent aux endroits suivants :

* Windows : [https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh](https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh)
* Linux : [https://www.ssh.com/academy/ssh/command](https://www.ssh.com/academy/ssh/command)
* macOS : [https://www.servermania.com/kb/articles/ssh-mac](https://www.servermania.com/kb/articles/ssh-mac)

Si vous ne souhaitez pas vous connecter via SSH, AWS offre la possibilité de se connecter depuis la console AWS en utilisant le bouton “Connect” :

![Capture d'écran de la connexion AWS](../images/aws-connect.png)

## Configuration de domaine personnalisé et SSL pour un accès HTTPS

Les domaines personnalisés sont nécessaires pour un accès sécurisé à Grist. Si vous avez déjà un certificat SSL, vous pouvez utiliser le vôtre (comme décrit dans le [`README de grist-omnibus`](https://github.com/gristlabs/grist-omnibus/)). Sinon, Grist peut générer un certificat de Let’s Encrypt. Pour cela, un domaine valide et un email doivent être configurés :

1. Pointez le domaine vers l'adresse IP de l'instance Grist EC2. Si vous n'utilisez pas le [service Elastic IP](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/elastic-ip-addresses-eip.html), l'instance peut avoir une adresse IPv4 publique différente à chaque démarrage.
2. Connectez-vous à l'instance Grist EC2.
3. Définissez le paramètre URL dans le fichier `grist/gristParameters`. Vous avez besoin des privilèges administrateur pour effectuer cette action, vous pouvez donc ouvrir un éditeur en exécutant `sudo nano grist/gristParameters`.
4. Exécutez le script `restartGrist` avec `sudo ~/grist/restartGrist`.

Une fois les étapes ci-dessus terminées, vous devriez pouvoir accéder à Grist sur votre domaine personnalisé.

## Configuration de l'authentification

Nous supportons Google ou Microsoft en tant que fournisseurs OpenID. Pour configurer d'autres fournisseurs d'authentification, veuillez vous référer à la [documentation dex](https://dexidp.io/docs/getting-started/).

Pour configurer l'authentification Grist avec Google ou Microsoft, vous devez avoir une application enregistrée auprès du fournisseur correspondant :

* Microsoft : [https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
* Google : [https://support.google.com/cloud/answer/6158849?hl=en](https://support.google.com/cloud/answer/6158849?hl=en)

Une fois que vous avez votre ID client et votre secret, vous devez les transmettre au fichier `gristParameters` à l'intérieur de l'instance Grist EC2 :

1. Connectez-vous à l'instance Grist EC2.
2. Ouvrez `~/grist/gristParameters`.
3. Mettez à jour les sections `CLIENT_ID` et `CLIENT_SECRET` pour le(s) fournisseur(s) concerné(s).
    * Si vous n'utilisez qu'un seul fournisseur, laissez la deuxième section commentée.
4. Mettez à jour `ADMIN_EMAIL` dans le même fichier. Il doit correspondre à l'email que vous utiliserez pour vous connecter via votre fournisseur d'authentification. Par exemple : `ADMIN_EMAIL=frank@votre-organisation.com`
    * Si vous souhaitez changer le nom de votre équipe, mettez à jour `TEAM_NAME` dans le même fichier.
5. Exécutez `restartGrist` avec le flag clean en utilisant `sudo ~/grist/restartGrist clean` pour effacer les anciennes données de connexion. **Important :** Cela supprimera tous les documents Grist !

Une fois la configuration ci-dessus effectuée, vous devriez pouvoir vous connecter avec vos identifiants Google/Microsoft.

## Exécution de Grist dans un VPC séparé

`grist-omnibus` est conçu pour fonctionner sur chaque VPC par défaut du compte. Pour le faire fonctionner sur un VPC personnalisé, vous devrez configurer correctement tous les éléments du VPC. Pour plus d'informations sur cette configuration, lisez [ici](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html). Pour exécuter Grist sur un VPC, les éléments suivants doivent être correctement configurés :

* L'attribution d'un nom DNS public à l'instance Grist EC2 est autorisée.
* Le VPC peut être accessible depuis Internet (permettant à la passerelle Internet et aux tables de routage de gérer le trafic).
* Une connexion de groupe de sécurité depuis les ports 22 (SSH pour la configuration), 80 (connexion HTTP) et 433 (connexion HTTPS) est autorisée.

## Mise à jour de `grist-omnibus`

La version packagée de `grist-omnibus` se mettra à jour automatiquement avant chaque lancement. Pour mettre à jour `grist-omnibus` manuellement, redémarrez l'instance Grist EC2 ou connectez-vous via SSH et appelez `sudo ~/grist/restartGrist`.

Il n'y a actuellement aucun plan pour supporter l'environnement Grist AWS Marketplace en dehors de `grist-omnibus`.

## Autres informations importantes

* L'instance Grist EC2 doit avoir l'option “Persistent store” cochée.
* Grist stocke toutes les données dans le répertoire `~/grist-persist`. Supprimer ce dossier entraînera la perte de toutes les données de tous les documents.
* Ne supprimez pas `~/grist-persist/acme.json`, car il contient une clé privée de Let’s Encrypt. Le supprimer trop souvent peut entraîner le refus de Let’s Encrypt de délivrer de nouveaux certificats pour votre domaine.
