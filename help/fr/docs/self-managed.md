---
title: Self-managed Grist
---

---
description: Les éléments essentiels pour créer et maintenir une installation Grist autogérée.
---

# Grist Autogéré

[TOC]

## Les essentiels

### Qu'est-ce que Grist Autogéré ?

Il existe quatre variantes de Grist :

  * **SaaS** (Software as a Service) : Grist est disponible en tant que service hébergé
    sur [docs.getgrist.com](https://docs.getgrist.com).
    Aucune installation nécessaire. Plans gratuits et payants, avec des limites d'utilisation.
  * **Application de bureau** : Grist est disponible en tant qu'application de bureau, construite avec Electron.
    Elle est disponible en téléchargement sur [https://github.com/gristlabs/grist-desktop/releases](https://github.com/gristlabs/grist-desktop/releases).
    Cette application de bureau n'a pas besoin d'internet et n'est liée à aucun compte ou service en ligne.
  * **Entreprise Autogérée** : Grist est disponible en tant qu'application sous licence
    installée par des entreprises sur leur propre infrastructure
    avec notre support et assistance. Contient des fonctionnalités propriétaires
    développées pour des entreprises avec des besoins particuliers.
  * **Noyau Autogéré** : Grist est disponible en tant qu'application gratuite installée
    par des développeurs citoyens sur leur propre infrastructure avec le soutien de la communauté.
    Les documents Grist créés avec nos offres SaaS et Entreprise
    peuvent être ouverts et modifiés avec le Noyau, et vice versa. Cela établit
    les documents Grist comme un format fiable pour l'archivage et l'échange.

Grist Autogéré, qu'il s'agisse de l'Entreprise ou du Noyau, est installé et configuré de
la même manière, comme décrit dans les sections suivantes. Pour plus de clarté, les sections sont étiquetées
avec la variante à laquelle elles s'appliquent, par exemple :
{: .tag-core .tag-ee }

Le code source complet de Grist Noyau est toujours disponible sur
[github.com/gristlabs/grist-core](https://github.com/gristlabs/grist-core/)
et est sous une licence Apache-2.0. Vous pouvez utiliser et redistribuer le Noyau
librement, selon les termes de la licence de logiciel libre.
Le code source complet de Grist Entreprise
est également disponible, sur
[github.com/gristlabs/grist-ee](https://github.com/gristlabs/grist-ee/),
sous une licence propriétaire qui ne confère aucun droit automatique
d'utiliser ou de redistribuer le logiciel. Vous pouvez évaluer l'Entreprise
pendant 30 jours en utilisant les instructions dans les sections suivantes,
ou [vous inscrire à notre plan Grist Entreprise](https://www.getgrist.com/pricing)
et obtenir du support.

### Comment installer Grist ? {: .tag-core .tag-ee }

Le moyen le plus simple d'installer Grist est en tant que conteneur. Nous allons
décrire comment faire en utilisant [Docker](https://www.docker.com/),
mais il existe de nombreux autres outils et services pour exécuter
des conteneurs.

Pour essayer Grist avec Docker, créez un répertoire vide pour que Grist y stocke des données (par exemple `~/grist`) et ensuite vous pouvez faire :

```
docker run -p 8484:8484 \
  -v ~/grist:/persist \
  -e GRIST_SESSION_SECRET=inventez-un-secret-ici \
  -it gristlabs/grist
```

Vous devriez alors pouvoir visiter `http://localhost:8484` dans
votre navigateur. Vous pourrez déjà créer et modifier des documents Grist,
et ouvrir et modifier des documents téléchargés depuis une autre
installation Grist (comme notre SaaS).

Si vous utilisez un autre outil ou service, voici les points importants :

 * Le nom de l'image principale est `gristlabs/grist`, qui est notre image Docker combinée Noyau et Entreprise.
   L'image `gristlabs/grist-oss` existe également, qui utilise uniquement du code libre et open source. Cette image utilise uniquement Grist
   Noyau, et n'a pas de fonctionnalités d'entreprise disponibles.
   (Pour certains outils comme Podman, vous devrez peut-être préfixer ces noms d'image avec `docker.io/`.)
 * Un volume (ou montage, ou répertoire) doit être disponible à l'emplacement
   `/persist` dans le conteneur. Il peut être initialement vide - Grist
   le remplira. Sans ce volume, rien de ce que vous faites ne sera stocké à long terme.
 * Le port `8484` sur le conteneur doit être exposé. Cela peut être changé
   si vous définissez également la variable d'environnement `PORT` pour le conteneur.
 * La variable d'environnement `GRIST_SESSION_SECRET` doit être définie
   sur quelque chose de secret pour le conteneur.

Installé de cette manière, Grist est accessible uniquement par vous. En général, vous voudrez
prendre au moins les étapes suivantes :

  * [Configurer le sandboxing](self-managed.md#how-do-i-sandbox-documents) - cela est important pour
    limiter ce que les formules peuvent faire.
  * [Servir depuis un hôte public](self-managed.md#how-do-i-run-grist-on-a-server)
    afin de pouvoir collaborer en direct avec d'autres.
  * Activer une méthode d'authentification afin que les utilisateurs puissent se connecter. Souvent, vous voudrez
    connecter Grist à un service "SSO" (Single Sign-On) que vous utilisez déjà.
    Nous supportons certaines méthodes d'authentification très
    [générales](self-managed.md#how-do-i-set-up-authentication) qui couvrent de nombreux cas,
    et une [méthode d'authentification spéciale](self-managed.md#are-there-other-authentication-methods) pour des cas personnalisés.
  * Envisager d'activer le [support des snapshots](self-managed.md#how-do-i-set-up-snapshots) si vous souhaitez que Grist gère les sauvegardes de documents.

#### Grist sur AWS

Vous pouvez également héberger Grist sur AWS. Des instructions complètes sur cette méthode d'hébergement sont disponibles sur la page Grist [AWS Marketplace](install/aws-marketplace.md).

### Comment sandboxer des documents ? {: .tag-core .tag-ee }

Grist permet des formules très puissantes, utilisant Python. Nous recommandons
de définir la variable d'environnement `GRIST_SANDBOX_FLAVOR` sur `gvisor` si
votre matériel le prend en charge (la plupart le feront), pour exécuter des formules dans chaque
document dans un sandbox isolé des autres documents et isolé
du réseau.

```
docker run ...
  -e GRIST_SANDBOX_FLAVOR=gvisor \
  ...
```

Pour vérifier que les formules sont évaluées dans un sandbox,
vous pouvez créer un document et ensuite vérifier que cette formule
donne un résultat vide :

```
import glob
glob.glob('/etc/*')
```

Voici quelques raisons pour lesquelles le sandboxing `gvisor`, tel que configuré pour
Grist, peut échouer, et ce que vous pouvez faire pour diagnostiquer le problème.

#### XSAVE non disponible

Votre processeur peut ne pas être pris en charge. Sur `x86_64`, Sandy Bridge
ou plus récent est nécessaire. Vérifiez que le drapeau processeur `XSAVE` est défini.
Voici un moyen rapide de tester cela :

```sh
grep -q '\bxsave\b' /proc/cpuinfo && echo "XSAVE activé" || echo "XSAVE manquant"
```

#### PTRACE non disponible

La capacité `SYS_PTRACE` peut ne pas être disponible. Si vous exécutez
dans docker, vous pourriez essayer de l'accorder explicitement, si vous êtes
à l'aise avec sa mise à disposition :

```
docker run ...
  --cap-add=SYS_PTRACE
  ...
```

Dans certains environnements cloud tels que AWS ECS, vous devrez peut-être
énumérer explicitement cette capacité dans votre configuration de conteneur.

### Comment exécuter Grist sur un serveur ? {: .tag-core .tag-ee }

Nous vous suggérons de vous familiariser avec tous les autres aspects de
l'autogestion sur cette page avant de servir Grist depuis un hôte public
(surtout [Sandboxing](self-managed.md#how-do-i-sandbox-documents)).
Lorsque vous le ferez, il est important de dire à Grist d'où il sera servi,
en utilisant la variable `APP_HOME_URL`. Par exemple, si vous allez
servir depuis `https://grist.example.com`, faites savoir à Grist comme ceci :

```
docker run ...
  -e APP_HOME_URL="https://grist.example.com" \
  ...
```

Vous devrez placer un "proxy inverse" devant Grist pour
gérer la "terminaison SSL" (décryptage du trafic chiffré) en utilisant
un certificat qui établit la propriété du site. Si vous ne savez pas
ce que cela signifie, vous pourriez essayer d'utiliser le
[Grist Omnibus](https://github.com/gristlabs/grist-omnibus) qui
emballe Grist avec un proxy inverse qui utilisera [Let's Encrypt](https://letsencrypt.org/) pour obtenir un certificat
pour vous automatiquement.

Un travail important d'un tel proxy est de rediriger correctement
les connexions [websocket](https://en.wikipedia.org/wiki/WebSocket). Cela
représente deux exigences :

  1. Assurez-vous que le proxy utilise HTTP 1.1
  2. Passez les en-têtes HTTP nécessaires Upgrade, Connection et Host afin
     qu'une connexion HTTP puisse être mise à niveau vers une connexion websocket.

Par exemple, voici une configuration minimale pour
[nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/),
un choix possible pour un proxy inverse.

```
server {
    server_name grist.example.com;

    location / {
        proxy_pass http://localhost:8484;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;

        # Support WebSocket
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

    }
}
```

Cette configuration gérera le trafic HTTP de base et les websockets. Elle
nécessite encore une configuration SSL/TLS supplémentaire. Une option simple pour
l'auto-hébergement à petite échelle est d'utiliser [`certbot` par l'EFF](https://certbot.eff.org/).

### Comment configurer une équipe ? {: .tag-core .tag-ee }

Grist a un concept de "sites d'équipe" qui sont des zones indépendamment gérées et
nommées contenant leurs propres espaces de travail et documents. Les sites d'équipe
peuvent avoir des sous-domaines distincts (comme sur les [sites d'équipe hébergés](teams.md) de notre SaaS),
ou être distingués par
un préfixe de chemin spécial. Cela n'a souvent pas de sens pour les installations autogérées, où il y a une seule équipe. Avec un seul domaine et
une seule équipe, le préfixe de chemin spécial (qui ressemble à `/o/<team-name>`)
est un gaspillage d'espace peu élégant dans les URL. Vous pouvez donc indiquer à Grist d'utiliser une seule équipe en définissant `GRIST_SINGLE_ORG` ("org" ou "organisation" est un synonyme pour équipe) :

```
docker run ...
  -e GRIST_SINGLE_ORG=cool-beans
```

Le nom de l'équipe ne doit utiliser que des caractères minuscules a-z, des chiffres
0-9, et le tiret (`-`). Vous voudrez également peut-être vous pencher sur
[Personnalisation du style](self-managed.md#how-do-i-customize-styling) pour cacher les éléments d'interface utilisateur
dont vous n'avez pas besoin.

### Comment configurer l'authentification ? {: .tag-core .tag-ee }

L'authentification peut être configurée de plusieurs manières pour Grist Noyau et Entreprise, en utilisant
SAML, OpenID Connect ou des en-têtes transférés. Entre les deux, de nombreux SSO populaires peuvent être connectés
comme les connexions Google ou Microsoft.

  * [SAML](install/saml.md).
  * [OpenID Connect](install/oidc.md)
  * [En-têtes transférés](install/forwarded-headers.md).

Pour toute méthode d'authentification, vous voudrez également envisager de définir
les variables suivantes :

  * `COOKIE_MAX_AGE` : (optionnel) date d'expiration pour le cookie de session Grist,
    lorsqu'il est défini sur `none`, le cookie de session sera en mode `Session` - il doit être supprimé après la fermeture d'un navigateur. S'il est défini sur un
    nombre, les unités de ce nombre sont des millisecondes.
  * `GRIST_FORCE_LOGIN` : (optionnel) lorsqu'il est défini sur `true`, cela
    indiquera à Grist de rediriger les utilisateurs anonymes vers une page de connexion.

Pour notre SaaS, nous utilisons un système d'authentification personnalisé basé sur AWS
Cognito. Actuellement, nous n'avons pas de plans pour le publier dans le Noyau
ou l'Entreprise.

### Existe-t-il d'autres méthodes d'authentification ? {: .tag-ee }

Si les utilisateurs de votre site se connectent via WordPress, ou via un mécanisme personnalisé
que vous avez développé, vous voudrez peut-être envisager
[GristConnect](install/grist-connect.md), disponible pour Grist Entreprise.

### Comment activer Grist Entreprise ? {: .tag-ee }

Grist Entreprise peut être activé en visitant le panneau d'administration et en cliquant sur le bouton 'Activer les fonctionnalités Grist Entreprise'.
Cela fera redémarrer Grist automatiquement.

![Bouton d'activation Entreprise sur le panneau d'administration](images/admin-panel/enterprise-toggle.png)

Vous devriez maintenant avoir une version non activée de Grist Entreprise, avec une période d'essai de 30 jours.

Les clés d'activation sont utilisées pour exécuter Grist Entreprise après une période d'essai
de 30 jours écoulée.
Obtenez une clé d'activation en [vous inscrivant à Grist Entreprise](https://www.getgrist.com/pricing).
Vous n'avez pas besoin d'une clé d'activation pour exécuter Grist Noyau, et pouvez revenir au Noyau à tout moment en utilisant le bouton dans le panneau d'administration.

Placez le contenu de votre clé d'activation dans une variable d'environnement appelée
`GRIST_ACTIVATION`, ou placez-la dans un répertoire accessible à Grist et
fournissez le chemin complet vers le fichier avec la variable d'environnement
`GRIST_ACTIVATION_FILE`. Sans la clé d'activation, il y aura une
bannière indiquant que Grist est en mode d'essai. Une fois la clé d'activation détectée,
cette bannière disparaîtra. Le remplacement de la clé d'activation nécessitera
un redémarrage de Grist.

```
docker run ...
  -e GRIST_ACTIVATION=<la-clé-d'activation-ici> \
  -it gristlabs/grist
```

---

## Personnalisation

### Comment personnaliser le style ? {: .tag-core .tag-ee }

L'interface utilisateur de Grist a de nombreux éléments, dont certains peuvent ne pas être pertinents pour vous.
Pour les installations autogérées de Grist,
vous pouvez désactiver de nombreux éléments en utilisant `GRIST_HIDE_UI_ELEMENTS`.
Ceci est une liste séparée par des virgules des parties de l'interface utilisateur à cacher.
Les noms autorisés des parties sont :
`helpCenter,billing,templates,multiSite,multiAccounts`.
Les éléments de l'interface utilisateur présents sont également affectés par le fait que `GRIST_SINGLE_ORG` soit défini.


```
docker run
  ...
  -e GRIST_HIDE_UI_ELEMENTS=helpCenter,billing,templates,multiSite,multiAccounts \
  ...
```

Par défaut, les pages de l'interface utilisateur de Grist ont ` - Grist` ajouté à leur titre. Vous pouvez
changer cela en définissant `GRIST_PAGE_TITLE_SUFFIX` :

```
docker run
  ...
  -e GRIST_PAGE_TITLE_SUFFIX=" - Cool Beans" \
  ...
```

Vous pouvez définir le suffixe sur `"_blank"` pour le supprimer complètement.

Vous pouvez également remplacer le style CSS du site si vous définissez
`APP_STATIC_INCLUDE_CUSTOM_CSS` sur `true`.

```
docker run
  ...
  -e APP_STATIC_INCLUDE_CUSTOM_CSS=true \
  ...
```

Cela chargera un fichier `custom.css` supplémentaire. Vous pouvez trouver
un exemple de tel fichier dans le
[dépôt Grist Noyau](https://github.com/gristlabs/grist-core/blob/main/static/custom.css).

Le fichier inclut la plupart de nos variables CSS globales pour les couleurs, et quelques
variables pour le logo affiché dans le coin supérieur gauche. Il n'y a
vraiment aucune limite à ce qui peut figurer dans le fichier, donc la spécification de styles arbitraires est possible. Notez que toutes les règles CSS doivent utiliser
`!important` pour s'assurer qu'elles ont la plus haute priorité. Sinon,
il est possible que des règles plus spécifiques incluses par notre framework prennent
le pas.

Pour remplacer `custom.css`, vous pouvez faire votre propre copie et vous assurer que Grist l'utilise. Si le fichier CSS est dans votre répertoire actuel, alors
faites :

```
docker run
  ...
  -v $PWD/custom.css:/grist/static/custom.css
  ...
```

Il est possible de diriger Grist pour charger des ressources statiques depuis un CDN en
définissant `APP_STATIC_URL`. Si vous le faites, et que vous utilisez du CSS personnalisé,
vous devrez vous assurer que le CSS personnalisé est disponible depuis cette URL de base.

### Comment lister des widgets personnalisés ? {: .tag-core .tag-ee }

Dans notre SaaS, Grist a une [liste de widgets personnalisés préconstruits](https://support.getgrist.com/newsletters/2022-02/#custom-widgets-menu) disponibles dans l'interface utilisateur.
Vous pouvez faire en sorte que votre installation autogérée propose la même liste en
définissant ce qui suit :

```
docker run
  ...
  -e GRIST_WIDGET_LIST_URL="https://github.com/gristlabs/grist-widget/releases/download/latest/manifest.json" \
  ...
```

C'est optionnel. Si vous laissez la variable non définie, les documents avec
des widgets personnalisés fonctionneront toujours bien, mais vous devrez entrer une URL complète lorsque vous ajoutez des widgets personnalisés plutôt que de choisir une option dans un
menu déroulant.

Vous pouvez rendre votre propre liste de widgets disponible en forkant
[github.com/gristlabs/grist-widget](https://github.com/gristlabs/grist-widget)
ou en préparant manuellement un fichier `.json` sur un serveur public dans le même
format que notre `manifest.json`.

### Comment configurer des notifications par e-mail ? {: .tag-ee }

Dans Grist SaaS, nous envoyons des e-mails tels que des invitations à partager un
document en utilisant [SendGrid](https://sendgrid.com/).
Le même mécanisme est disponible dans Grist Entreprise. Il n'y a pas encore d'équivalent dans Grist Noyau.

Vous devrez définir une clé API SendGrid :

```
docker run
  ...
  -e SENDGRID_API_KEY=SG.XXXXXXX.XXXXX \
  ...
```

Vous devrez rendre un fichier `config.json` disponible à la
racine du volume mappé à `/persist`. Son contenu doit être
le suivant :

```
{
  "sendgrid": {
    "api": {
      "prefix": "https://api.sendgrid.com/v3",
      "enroll": "/marketing/contacts",
      "search": "/marketing/contacts/search",
      "searchByEmail": "/marketing/contacts/search/emails",
      "listRemove": "/marketing/lists/{{id}}/contacts",
      "send": "/mail/send"
    },
    "address": {
      "from": {
        "email": "<l'adresse-e-mail@doit-venir-de>",
        "name": "le nom à afficher avec l'e-mail"
      }
    },
    "template": {
      "invite": "d-f9.....",
      "billingManagerInvite": "d-f9.....",
      "memberChange": "d-b3....."
    },
    "list": {
      "singleUserOnboarding": "b22..."
    },
    "unsubscribeGroup": {
      "invites": 19...,
      "billingManagers": 19....
    }
  }
}
```

Voici la signification des clés dans ce fichier :

  * `sendgrid.api` - Les valeurs doivent rester inchangées par rapport à ce qui est
    défini dans l'exemple. Cela contrôle la version de l'API et
    les points de terminaison. Grist cible actuellement la v3 de l'API web de SendGrid.
  * `sendgrid.address` - Doit être défini sur une adresse e-mail vérifiée et
    le nom d'un expéditeur SendGrid. Cela contrôle l'adresse "De" de tous
    les e-mails envoyés via SendGrid (par exemple, les invitations envoyées au nom des utilisateurs Grist).
  * `sendgrid.template` - Mappe les actions Grist aux identifiants de modèles d'e-mail SendGrid.
    Ceux-ci sont pour les e-mails transactionnels qui sont envoyés à la suite
    d'une action se produisant dans Grist.
  * `sendgrid.template.invite` - Ceci est pour les e-mails envoyés aux utilisateurs qui
    sont invités à des documents, des espaces de travail ou des sites.
  * `sendgrid.template.memberChange` - Ceci est pour les e-mails envoyés aux
    responsables de la facturation lorsque des utilisateurs sont ajoutés/retirés des sites.
  * `sendgrid.list` - Mappe les actions Grist aux identifiants de listes de marketing SendGrid.
    Ceux-ci sont pour des e-mails automatisés en cours qui sont envoyés à tous
    les utilisateurs qui sont inscrits dans une liste particulière.
  * `sendgrid.list.singleUserOnboarding` - Les nouveaux utilisateurs Grist sont
    automatiquement ajoutés à cette liste lors de leur première connexion. Cela est adapté
    pour envoyer des e-mails d'intégration réguliers aux utilisateurs.
  * `sendgrid.unsubscribeGroup` - Mappe les types d'e-mails aux identifiants de groupes de désinscription SendGrid.
    Ceux-ci permettent aux utilisateurs de se désinscrire de la réception de certains types d'e-mails (via le lien dans l'e-mail).
  * `sendgrid.unsubscribeGrist.invites` - Si défini, les e-mails d'invitation peuvent être
    supprimés via le lien de désinscription dans les e-mails.
  * `sendgrid.unsubscribeGrist.billingManagers` - Si défini, les e-mails envoyés
    spécifiquement aux responsables de la facturation (par exemple, changements d'adhésion) peuvent être
    supprimés via le lien de désinscription dans les e-mails.

Pour référence, il existe des exemples de modèles SendGrid dans
[example-sendgrid-templates.zip](./install/example-sendgrid-templates.zip)
basés sur une exportation des modèles SendGrid pour notre SaaS.

### Comment ajouter plus de packages python ? {: .tag-core .tag-ee }

L'ensemble des packages python disponibles pour une utilisation dans les formules n'est actuellement
pas configurable. Vous pouvez ajouter des packages de toute façon si vous êtes prêt à
construire et installer votre propre version de Grist.

!!! avertissement "Avertissement"

    **Les documents Grist créés sur une installation avec des packages python personnalisés 
    ne ramèneront pas ces packages s'ils sont copiés vers une autre installation. 
    Les formules utilisant des packages python personnalisés donneront des erreurs lorsque ces packages ne seront pas disponibles.**

Créez un répertoire vide et ajoutez ce qui suit, dans un fichier appelé
`Dockerfile` :

```
FROM gristlabs/grist  # ou grist-oss ou grist-omnibus

RUN \
  apt update && apt install -y openssl && \
  python3 -m pip install phonenumbers
```

Remplacez `phonenumbers` par le package python ou les packages que vous souhaitez
installer. Vous pouvez maintenant construire votre image Grist personnalisée en exécutant un
`docker build` dans le répertoire contenant le `Dockerfile` :

```sh
# remplacez "custom" par un nom d'utilisateur ou de l'organisation.
docker build -t custom/grist .
```

Une fois terminé, vous pouvez utiliser `custom/grist` à la place de `gristlabs/grist(-ee)` dans
[Comment installer Grist](self-managed.md#how-do-i-install-grist),
et votre bibliothèque python sera désormais disponible à l'importation dans les formules.

Si vous souhaitez que l'importation soit effectuée automatiquement, afin de ne pas avoir à le faire dans
les formules, cela nécessite actuellement un changement de code dans
[sandbox/grist/gencode.py](https://github.com/gristlabs/grist-core/blob/e95b2154051d5a8393bb005af49565d08117106a/sandbox/grist/gencode.py#L173).
Si vous êtes à l'aise avec les modifications de code, alors les instructions de construction
du dépôt [grist-core](https://github.com/gristlabs/grist-core/) sont l'endroit où commencer.

### Comment configurer des webhooks ? {: .tag-core .tag-ee }

Il est possible d'utiliser des webhooks pour activer des intégrations avec des services externes. La [documentation des webhooks](webhooks.md) contient plus de détails.

Notez que lors de l'auto-hébergement, seuls les services externes autorisés par la
[variable d'environnement `ALLOWED_WEBHOOK_DOMAINS`](https://github.com/gristlabs/grist-core?tab=readme-ov-file#environment-variables)
sont autorisés. [Il y a des préoccupations de sécurité](webhooks.md#security) avec
l'autorisation de tout domaine, car les services internes de Grist peuvent devenir vulnérables
à la manipulation.

---

## Opérations

### Quelles sont les exigences matérielles pour héberger Grist ? {: .tag-core .tag-ee }

Pour héberger Grist en tant que conteneur Linux, voici une configuration connue
pour une variété de charges de travail modérées :

 * 8 Go de RAM
 * 2 CPU
 * 20 Go de disque

Grist est emballé pour les architectures CPU suivantes :

 * x86_64 (Sandy Bridge ou plus récent si le sandboxing est activé)
 * ARM64

Chaque document Grist est une base de données séparée, donc il est difficile de
déclarer des exigences minimales absolues sans savoir quels documents seront utilisés. Dans les tests, le [modèle de recherche d'investissement](https://templates.getgrist.com/doc/investment-research)
fonctionne confortablement servi depuis un conteneur Grist avec :

  * 100 Mo de RAM sans sandboxing activé.
  * 200 Mo de RAM avec sandboxing activé.
  * 1 CPU.

Les exigences en mémoire et en CPU évolueront avec le nombre de documents
utilisés simultanément par votre équipe.

[Le sandboxing](self-managed.md#how-do-i-sandbox-documents) est un problème important pour servir
Grist. Il est réalisé en utilisant [gvisor](https://gvisor.dev/). Le sandboxing dépend de
la disponibilité de certaines capacités, et peut être indisponible dans
des environnements qui n'autorisent pas ou manquent ces capacités. Le sandboxing de Grist est connu
pour fonctionner dans les environnements suivants :

 * Conteneurs docker réguliers non privilégiés avec les paramètres de sécurité par défaut.
 * Instances AWS EC2.
 * Conteneurs AWS Fargate, avec `SYS_PTRACE` défini dans `linuxParameters.capabilities`.

Le sandboxing de Grist a été signalé comme échouant à s'initialiser sur des processeurs Intel plus anciens qui ne prennent pas en charge la fonctionnalité `XSAVE` (prise en charge par
Sandy Bridge et ultérieur).

### Quels fichiers Grist stocke-t-il ? {: .tag-core .tag-ee }

Lorsqu'il est installé en tant que conteneur, Grist s'attend à avoir accès à un
volume persistant, ou à un répertoire partagé avec l'hôte, dans lequel il
stocke tout ce qui doit durer au-delà d'un redémarrage de conteneur.
Concrètement, si vous avez démarré Grist exactement comme décrit dans
[Comment installer Grist](self-managed.md#how-do-i-install-grist),
ce répertoire serait `~/grist`. Voici ce que vous y trouveriez :

 * Un sous-répertoire appelé `docs`, contenant des fichiers `*.grist`.
   Ce sont des documents Grist. Les documents Grist sont des bases de données SQLite,
   donc vous pouvez inspecter ces fichiers avec l'utilitaire standard `sqlite3`.
   Vous pouvez également les télécharger sur une autre installation de
   Grist (comme notre service hébergé) et les visualiser/éditer là-bas.
   Si vous déplacez ou renommez ces fichiers, Grist ne les reconnaîtra plus.
   Si le [support des snapshots](self-managed.md#how-do-i-set-up-snapshots)
   est configuré, il y aura des fichiers supplémentaires à côté de chaque fichier `.grist`
   pour suivre son état de stockage.

 * Un fichier appelé `grist-sessions.db`. Cela contient des informations
   pour prendre en charge les sessions de navigateur avec Grist. C'est une base de données SQLite.
   Si [redis est configuré](self-managed.md#what-is-a-state-store),
   cela est utilisé à la place de ce fichier.

 * Un fichier appelé `home.sqlite3`. Cela contient des informations sur
   les équipes, les espaces de travail et les documents (métadonnées uniquement, telles que les noms,
   plutôt que le contenu des documents tels que les tables et les cellules). C'est une
   base de données SQLite. Elle est appelée la
   [base de données principale](self-managed.md#what-is-a-home-database)
   et si PostgreSQL est configuré, cela est utilisé à la place de ce fichier.

 * Si vous utilisez Grist Omnibus, il y a d'autres fichiers, y compris :

     - Un répertoire `auth`, avec une base de données SQLite pour suivre l'état de connexion,
       et un stockage de tous les certificats créés.
     - Un répertoire `param`, avec des secrets inventés pour l'installation.

### Qu'est-ce qu'une base de données "principale" ? {: .tag-core .tag-ee }

Grist stocke des métadonnées sur les utilisateurs, les documents, les espaces de travail, etc. dans une
base de données appelée la "base de données principale". Cela ne contient pas le
matériel à l'intérieur des documents tels que les tables et les colonnes, mais contient des noms de documents et des heures de création, par exemple. Par défaut, Grist
créera une base de données principale dans un fichier Sqlite dans le répertoire `/persist`.
Pour utiliser à la place une base de données PostgreSQL, créez la
base de données ainsi qu'un utilisateur ayant un accès suffisant pour créer des tables,
et définissez les variables suivantes :

* TYPEORM_TYPE - défini sur postgres
* TYPEORM_DATABASE - défini sur le nom de la base de données, par exemple home
* TYPEORM_USERNAME - défini sur le nom d'utilisateur postgres ayant des droits sur la base de données
* TYPEORM_PASSWORD - défini sur le mot de passe postgres ayant des droits sur la base de données
* TYPEORM_HOST - défini sur le nom d'hôte de la base de données, par exemple grist.mumble.rds.amazonaws.com
* TYPEORM_PORT - défini sur le numéro de port de la base de données si ce n'est pas le défaut pour PostgreSQL

Grist est connu pour fonctionner avec PostgreSQL des versions 10 à 14 (les versions ultérieures
devraient également fonctionner, mais n'ont pas été spécifiquement testées au moment de la rédaction).

### Qu'est-ce qu'un magasin d'état ? {: .tag-core .tag-ee }

Grist peut être configuré pour utiliser Redis comme cache d'état externe. Pour
la plupart des fonctionnalités de Grist, cela est optionnel. Il est requis pour le support des webhooks, et recommandé pour le support des snapshots. Pour l'utiliser, il suffit de définir `REDIS_URL` sur quelque chose comme
`redis://hostname/N` où `N` est un numéro de base de données redis.

```
docker run
  ...
  -e REDIS_URL="redis://hostname/N"
  ...
```

### Comment configurer des snapshots ? {: .tag-core .tag-ee }

La fonctionnalité de stockage cloud de Grist permet la synchronisation automatique des documents Grist
et des versions de documents vers un bucket compatible S3
(disponible pour toutes les versions de Grist) ou vers un stockage Azure (dans Grist Entreprise).

Voici un exemple d'exécution de Grist localement, avec des snapshots stockés
dans une instance MinIO de test :

```sh
# Créer un réseau
docker network create grist

# Démarrer Redis dans notre réseau (recommandé pour les snapshots)
docker run --rm --network grist --name redis redis

# Démarrer MinIO dans notre réseau
docker run --rm --network grist --name minio \
  -v /tmp/minio:/data \
  -p 9000:9000 -p 9001:9001 \
  -e MINIO_ROOT_USER=grist -e MINIO_ROOT_PASSWORD=admingrist \
   -it minio/minio server /data -console-address ":9001"

# Visitez http://localhost:9000 et configurez un bucket appelé grist-docs.
# Assurez-vous d'activer la versioning sur le bucket.

# Connectez Grist à Redis et MinIO
docker run --rm --network grist \
  -e GRIST_DOCS_MINIO_ACCESS_KEY=grist \
  -e GRIST_DOCS_MINIO_SECRET_KEY=admingrist \
  -e GRIST_DOCS_MINIO_USE_SSL=0 \
  -e GRIST_DOCS_MINIO_BUCKET=grist-docs \
  -e GRIST_DOCS_MINIO_ENDPOINT=minio \
  -e GRIST_DOCS_MINIO_PORT=9000 \
  -e REDIS_URL=redis://redis \
  -v /tmp/grist:/persist -p 8484:8484 -it gristlabs/grist
```

Voici des drapeaux pour faire parler Grist à un bucket AWS S3 en utilisant le client MinIO :
```
  ...
  -e GRIST_DOCS_MINIO_ACCESS_KEY=$AWS_ACCESS_KEY_ID \
  -e GRIST_DOCS_MINIO_SECRET_KEY=$AWS_SECRET_ACCESS_KEY \
  -e GRIST_DOCS_MINIO_ENDPOINT=s3.amazonaws.com \
  -e GRIST_DOCS_MINIO_BUCKET=grist-docs \
  ...
```

Selon les [spécifications de MinIO](https://min.io/docs/minio/linux/developers/go/API.html#:~:text=Default%20value%20is%20us-east,us-east-1), la région par défaut du bucket est `us-east-1`. Cette région par défaut peut être remplacée en utilisant le drapeau `GRIST_DOCS_MINIO_BUCKET_REGION`.

Pour plus de détails, et d'autres options, voir [Stockage Cloud](install/cloud-storage.md).

### Comment contrôler la télémétrie ? {: .tag-core }

Par défaut, les installations Grist ne "téléphonent pas" à un service central.
Il est utile de leur permettre de le faire, pour donner à Grist Labs un aperçu limité de votre utilisation, à travers des mesures appelées
télémétrie. Cela aidera à guider le développement et à attirer l'attention sur
les utilisateurs autogérés en tant que groupe.

Le moyen le plus simple pour un propriétaire d'une installation Grist de choisir d'envoyer
la télémétrie à Grist Labs est de cliquer sur le bouton "Opter pour la télémétrie" sur la bannière "Support Grist" sur la page principale de l'installation.
Si vous ne souhaitez pas opter pour cela, vous pouvez ignorer la bannière.
La bannière est affichée uniquement au propriétaire de l'installation.
Le propriétaire de l'installation est l'utilisateur dont l'adresse e-mail
correspond à la variable d'environnement `GRIST_DEFAULT_EMAIL` (si définie).

<span class="screenshot-large">*![Télémétrie auto-hébergée](images/newsletters/2023-07/core-telemetry-opt-in.png)*</span>
{: .screenshot-half }

Vous pouvez contrôler la télémétrie à tout moment en utilisant la page "Support Grist",
si vous êtes le propriétaire de l'installation.

<span class="screenshot-large">*![Contrôler la télémétrie](images/support-page-link.png)*</span>
{: .screenshot-half }

Plutôt que d'utiliser des boutons pour opter pour la télémétrie,
vous pouvez définir la variable d'environnement `GRIST_TELEMETRY_LEVEL` sur
`limited`. Cela a le même effet que le bouton "Opter pour la télémétrie".
La variable d'environnement `GRIST_TELEMETRY_LEVEL`,
si définie, prend la priorité sur tout paramètre effectué de manière interactive.
Les valeurs recommandées sont `limited` ou `off`.

Dans tous les cas, lisez [télémétrie limitée](telemetry-limited.md) pour des détails exacts
sur les données envoyées, et [aperçu de la télémétrie](telemetry.md) pour plus d'explications.
Une méthode interactive pour contrôler la télémétrie n'est actuellement disponible que pour les versions Grist Noyau. Dans tous les cas,
le défaut est de ne pas envoyer de télémétrie.

### Comment mettre à jour mon installation ? {: .tag-core .tag-ee }

Nous publions actuellement de nouvelles images Grist Noyau et Entreprise à
environ des intervalles hebdomadaires. Grist gère toutes les migrations qui
peuvent être nécessaires pour les documents ou les bases de données qu'il utilise.
Des utilitaires tels que [Watchtower](https://containrrr.dev/watchtower/) peuvent
maintenir votre version de Grist à jour pour vous.

### Que faire si j'ai besoin d'une haute disponibilité ? {: .tag-ee }

Nous avons développé une expertise dans l'hébergement d'installations Grist très occupées,
avec de nombreux utilisateurs, y compris comment mettre à jour avec un minimum de perturbation,
et comment évoluer pour gérer une charge lourde. Nous serions heureux d'aider
les clients Entreprise ayant des besoins de cette nature.
