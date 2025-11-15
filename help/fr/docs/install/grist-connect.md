---
title: GristConnect
---

GristConnect {: .tag-ee }
============

Discourse est un logiciel de forum populaire conçu pour être intégré à de nombreux sites (y compris [le nôtre](https://community.getgrist.com)). Il est ennuyeux si les utilisateurs ont besoin d'un identifiant pour un forum séparé de leur identifiant sur le reste d'un site. Le protocole créé par Discourse pour résoudre ce problème est bien fait et s'appelle [DiscourseConnect](https://meta.discourse.org/t/discourseconnect-official-single-sign-on-for-discourse-sso/13045). Nous avons décidé de faire en sorte que Grist prenne en charge le même protocole, de sorte que tout logiciel disposant de plugins permettant à Discourse d'utiliser ses identifiants (comme WordPress) puisse également permettre à Grist d'utiliser ses identifiants. Ce n'est pas une norme officielle, nous avons donc appelé notre implémentation "GristConnect" plutôt que "DiscourseConnect".

La configuration de GristConnect nécessite quelques réglages pour Grist, ainsi qu'un plugin ou un codage personnalisé pour votre site ou SSO. Les paramètres Grist sont les suivants :

  * `GRIST_CONNECT_URL` : définir cette variable d'environnement activera GristConnect. Il doit s'agir d'une adresse URL d'un site externe vers lequel les utilisateurs seront redirigés lors d'une demande de connexion/inscription.
  * `GRIST_CONNECT_SECRET` : (obligatoire) une clé secrète, utilisée pour signer (hacher) les paramètres de requête dans les URL utilisées pendant le flux de connexion.
  * `GRIST_CONNECT_LOGOUT_URL` : (optionnel) une adresse URL vers laquelle les utilisateurs seront redirigés après s'être déconnectés. Par défaut - la page de déconnexion existante de Grist.
  * `GRIST_CONNECT_ENDPOINT` : (optionnel) un point de terminaison de rappel exposé par Grist où les utilisateurs doivent être redirigés après une tentative de connexion réussie sur le site du fournisseur d'identité externe (valeur par défaut : `/connect/login`).

Pour votre site ou SSO, vous pouvez constater que le logiciel que vous utilisez prend en charge DiscourseConnect, auquel cas vous pouvez l'activer et le coordonner avec les paramètres Grist. Sinon, voici les détails exacts de ce qui doit se passer :

  * Lorsque les utilisateurs essaient de se connecter à Grist, ils sont redirigés vers une `GRIST_CONNECT_URL` avec des paramètres de requête signés, par exemple, `https://auth-provider.example.com?sso=PAYLOADBASE64&sig=cAlculateDHash`
  * La charge utile est une chaîne de requête encodée en Base64 contenant :
    - `nonce` - un jeton unique généré par Grist
    - `return_url` - une URL pour rediriger l'utilisateur après une connexion réussie - cela sera toujours défini sur l'URL complète de Grist pour `GRIST_CONNECT_ENDPOINT`.
  * L'utilisateur doit se connecter en utilisant l'écran de connexion de `GRIST_CONNECT_URL`.
  * Un fournisseur externe doit créer une nouvelle charge utile encodée en URL avec les paramètres suivants :
    - `nonce` - (obligatoire) un jeton envoyé par Grist
    - `external_id` - (obligatoire) toute chaîne unique à l'utilisateur et qui ne changera jamais
    - `email` - (obligatoire) un email utilisateur valide
    - `name` - (obligatoire) un nom d'utilisateur
    - `avatar_url` - (optionnel) une URL vers la photo de profil de l'utilisateur. Notez que Grist acceptera également le paramètre `picture` pour le même objectif.
    - Cette charge utile doit être encodée en base64 et correctement échappée pour être une chaîne de requête valide.
  * Un fournisseur doit calculer un hachage HMAC_SHA256 de la charge utile.
  * Un utilisateur doit rediriger vers le point de terminaison `GRIST_CONNECT_ENDPOINT` avec des paramètres de chaîne de requête signés, par exemple, `https://grist.customhost.com/connect/login?sso=ENCODEDPAYLOD&sig=HASH`
  * Grist créera un nouvel utilisateur ou mettra à jour un utilisateur existant. Les utilisateurs seront identifiés par le paramètre *external_id*.
  * L'utilisateur sera connecté à Grist.
