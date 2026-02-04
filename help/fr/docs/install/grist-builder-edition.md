---
title: Grist Builder Edition
---

Grist Builder Edition {: .tag-core .tag-ee }
============

Grist Builder Edition est une image de machine virtuelle offerte pour certains fournisseurs de cloud. Il contient tout ce dont vous avez besoin pour exécuter une instance Grist auto-hébergée avec une configuration minimale. Il peut être trouvé aux emplacements suivants :

* [AWS Marketplace](https://aws.amazon.com/marketplace/pp/prodview-tew3ygop5xxy4)
* [Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/grist.grist-builder-edition)

Une fois que vous avez sélectionné une offre, suivez la procédure habituelle pour chaque fournisseur de cloud pour démarrer une machine virtuelle. Vous devrez autoriser l'accès SSH pour la machine virtuelle, ainsi que l'accès HTTP et HTTPS. Cela correspond respectivement aux ports réseau TCP 22, 80 et 443.

### Comment se connecter à l'instance Grist

L'instance Grist doit être gérée par SSH ou un accès console équivalent. Les détails sur la connexion via SSH peuvent être trouvés aux endroits suivants :

* Windows : [https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh](https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh)
* Linux : [https://www.ssh.com/academy/ssh/command](https://www.ssh.com/academy/ssh/command)
* macOS : [https://www.servermania.com/kb/articles/ssh-mac](https://www.servermania.com/kb/articles/ssh-mac)

Une fois connecté, suivez les instructions affichées dans la console. D'autres détails techniques concernant la configuration peuvent être trouvés dans [le README fourni avec l'installation](https://github.com/gristlabs/grist-pack/blob/main/dist/README.md).

Si vous avez besoin d'aide avec la configuration initiale, lisez ci-dessous pour des instructions spécifiques pour chaque fournisseur de cloud.

#### AWS

Lors du déploiement, vous devriez avoir été demandé à propos de la création ou de l'utilisation de paires de clés. Vous pouvez utiliser cette paire pour vous connecter via SSH depuis votre terminal/bash. L'utilisateur par défaut pour l'instance EC2 Grist est nommé `ubuntu`, et vous pouvez vous connecter à `ubuntu@[ec2-instance-public-ip]`.

**Note :** Vous devez utiliser le fichier `*.pem` que vous avez reçu lors de la génération de paires de clés sur AWS.

Si vous ne souhaitez pas vous connecter via SSH, AWS fournit l'option de se connecter depuis la console AWS en utilisant le bouton "Connecter" :

![Capture d'écran AWS Connect](../images/aws-connect.png)

#### Azure

Lors du déploiement de la machine virtuelle, vous pouvez être demandé d'utiliser des clés SSH ou un mot de passe, ainsi que l'utilisateur par défaut pour vous connecter. L'utilisateur par défaut est nommé `azureuser`, et vous pouvez vous connecter en tant que `azureuser@[azure-vm-public-ip]`.

**Note :** Si vous choisissez d'utiliser la méthode par défaut des clés SSH, vous devez utiliser le fichier `*.pem` que vous avez reçu lorsque Azure a généré des paires de clés.

Il existe d'autres méthodes pour se connecter. Cliquez sur l'onglet "Connecter" dans la barre latérale de la machine virtuelle dans le portail web Azure si vous avez besoin d'autres options.

![Capture d'écran Azure connect](../images/azure-connect.png)

## Configuration de l'authentification

En plus des connexions par nom d'utilisateur et mot de passe via [Authelia](https://www.authelia.com/), nous supportons également Google ou Microsoft comme fournisseurs OpenID. Pour configurer d'autres fournisseurs d'authentification, veuillez vous référer à [la documentation dex](https://dexidp.io/docs/getting-started/).

Pour configurer l'authentification Grist avec Google ou Microsoft, vous devez avoir une application enregistrée auprès du fournisseur correspondant :

* Microsoft : [https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
* Google : [https://support.google.com/cloud/answer/6158849?hl=en](https://support.google.com/cloud/answer/6158849?hl=en)

## Autres informations importantes

* L'instance EC2 Grist devrait avoir l'option "Magasin persistant" cochée.
* Par défaut, Grist Builder Edition stocke la configuration cryptographique d'authentification et toutes les données sous `/home/grist/persist`. Supprimer ce dossier entraînera une perte de toutes les données de tous les documents.
* Si vous utilisez la version legacy basée sur [Grist Omnibus](https://github.com/gristlabs/grist-omnibus), veuillez vous référer à [la documentation legacy](aws-marketplace-legacy.md).
