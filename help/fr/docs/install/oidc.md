---
title: OIDC
---

OpenID Connect {: .tag-core .tag-ee }
====

Configuration pour OIDC, utile pour les connexions single-sign-on des organisations.
Un bon aperçu informatif de l'OIDC est disponible sur <https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc>

Remarque :

  * SP est le "Fournisseur de Services", dans notre cas, l'application Grist.
  * IdP est le "Fournisseur d'Identité", là où les utilisateurs se connectent, par exemple Keycloak, Authelia, ...
  * OIDC est l'acronyme pour OpenID Connect

Variables d'environnement attendues :

  * `GRIST_OIDC_IDP_ISSUER` - l'URL de l'émetteur pour l'IdP, passé à node-openid-client, voir : <https://github.com/panva/node-openid-client/blob/a84d022f195f82ca1c97f8f6b2567ebcef8738c3/docs/README.md#issuerdiscoverissuer>.
    **Cette variable active le système de connexion OIDC.**
  * `GRIST_OIDC_IDP_CLIENT_ID` - l'ID client pour l'application, tel qu'enregistré auprès de l'IdP.
  * `GRIST_OIDC_IDP_CLIENT_SECRET` - le secret client pour l'application, tel qu'enregistré auprès de l'IdP.
  * `GRIST_OIDC_IDP_SCOPES` (optionnel) - les scopes à demander à l'IdP, sous forme de liste séparée par des espaces. Par défaut `"openid email profile"`.
  * `GRIST_OIDC_SP_HOST` (optionnel) - il s'agit simplement de l'URL de base du site Grist,
    tel que `https://<grist-domain>` (lorsque OIDC est actif, il y aura un point de terminaison `/oauth2/callback` disponible ici pour implémenter le protocole).
    Si omis, `APP_HOME_URL` sera utilisé.
  * `GRIST_OIDC_IDP_END_SESSION_ENDPOINT` (optionnel) - Si défini, remplace le `end_session_endpoint` de l'IdP par
    une URL alternative pour rediriger l'utilisateur lors de la déconnexion (pour un IdP qui a un point de terminaison de déconnexion mais ne supporte pas
    la spécification OIDC RP-Initiated Logout).
  * `GRIST_OIDC_IDP_SKIP_END_SESSION_ENDPOINT` (optionnel) - Si défini sur "true", lors de la déconnexion, il n'y aura
    aucune tentative d'appeler le `end_session_endpoint` de l'IdP (l'utilisateur restera connecté à l'IdP).
    Vous ne devez le définir sur "true" que si l'IdP ne fournit pas un tel point de terminaison (par exemple si vous utilisez Gitlab).
  * `GRIST_OIDC_SP_PROFILE_NAME_ATTR` (optionnel) - La clé de la propriété d'utilisateur à utiliser pour le nom de l'utilisateur. Si omis,
    le nom sera la concaténation de `given_name` + `family_name` s'ils sont fournis ou la propriété `name` sinon.
  * `GRIST_OIDC_SP_PROFILE_EMAIL_ATTR` (optionnel) - La clé de la propriété d'utilisateur à utiliser pour l'email de l'utilisateur. Par défaut "email".
  * `GRIST_OIDC_IDP_ENABLED_PROTECTIONS` (optionnel) - Une liste séparée par des virgules des protections à activer. Les valeurs prises en charge sont `PKCE`, `STATE`, `NONCE`.
    Par défaut `PKCE,STATE`, qui sont les paramètres recommandés. Il est fortement recommandé d'activer `STATE`,
    et au moins l'un de `PKCE` ou `NONCE`, selon ce que votre fournisseur OIDC requiert/supporte.
  * `GRIST_OIDC_IDP_ACR_VALUES` (optionnel) - Une liste séparée par des espaces des valeurs ACR à demander à l'IdP.
  * `GRIST_OIDC_IDP_EXTRA_CLIENT_METADATA` (optionnel) - Un objet JSON avec des métadonnées client supplémentaires à passer à openid-client.
    Sachez que la définition de cet objet peut remplacer toutes les autres valeurs passées au client openid.
    Plus d'infos : https://github.com/panva/node-openid-client/tree/main/docs#new-clientmetadata-jwks-options

## Exemple : Gitlab

Voir [comment créer une application OAuth2 dans Gitlab dans cette documentation](https://docs.gitlab.com/ee/integration/oauth_provider.html). Lors de la création de l'application, définissez l'URI de redirection sur `https://<grist-domain>/oauth2/callback` (ou `http://localhost:8484/oauth2/callback` si testé localement, changez `8484` pour le port que vous écoutez) et sélectionnez les scopes que vous spécifierez dans `GRIST_OIDC_IDP_SCOPES`.

Une fois l'application configurée, démarrez Grist avec ces paramètres :

```shell
GRIST_OIDC_SP_HOST=https://<grist-domain> # ou http://localhost:8484
GRIST_OIDC_IDP_ISSUER=https://gitlab.com/.well-known/openid-configuration
GRIST_OIDC_IDP_SCOPES=openid profile email

# l'ID client généré par Gitlab pour l'application
GRIST_OIDC_IDP_CLIENT_ID=...

# le secret client généré par Gitlab pour l'application
GRIST_OIDC_IDP_CLIENT_SECRET=...

# Gitlab ne propose pas `end_session_endpoint`
GRIST_OIDC_IDP_SKIP_END_SESSION_ENDPOINT=true
```

Ce format est adapté pour un fichier `.env` ou similaire. Lors d'une invocation shell, n'oubliez pas de citer les valeurs avec des espaces, comme `GRIST_OIDC_IDP_SCOPES="openid profile email"`.

## Exemple : Auth0

Créez une application dans Auth0 [comme expliqué dans cette documentation](https://auth0.com/docs/get-started/auth0-overview/create-applications) (vous pouvez sélectionner le type d'application nommé `Regular Web Applications`). Une fois l'application créée, assurez-vous d'ajouter au moins la configuration suivante pour l'application :

 * URL de rappel autorisées : `https://<grist-domain>/oauth2/callback`
 * URL de déconnexion autorisées : `http://<grist-domain>/*` (vous pouvez également remplacer le caractère générique par le chemin complet pour être plus strict)

Ensuite, vous devriez pouvoir démarrer Grist avec les paramètres suivants :

```shell
GRIST_OIDC_SP_HOST=https://<grist-domain> # ou http://localhost:8484
GRIST_OIDC_IDP_ISSUER=https://<your-auth0-app-domain>
GRIST_OIDC_IDP_SCOPES=openid profile email

# l'ID client généré par Auth0 pour l'application
GRIST_OIDC_IDP_CLIENT_ID=...

# le secret client généré par Auth0 pour l'application
GRIST_OIDC_IDP_CLIENT_SECRET=...
```

Ce format est adapté pour un fichier `.env` ou similaire. Lors d'une invocation shell, n'oubliez pas de citer les valeurs avec des espaces, comme `GRIST_OIDC_IDP_SCOPES="openid profile email"`.

## Exemple : Keycloak

Tout d'abord, configurez Keycloak comme expliqué dans l'un de ces guides "Getting started" : <https://www.keycloak.org/guides#getting-started>.

Une fois Keycloak configuré avec un domaine et un utilisateur, créez un nouveau client avec la configuration suivante :

 - Type de client : OpenID Connect
 - Flux d'authentification : Flux standard
 - URL racine : `https://<grist-domain>`
 - URI de redirection valides : `/oauth2/callback`
 - URI de redirection post-déconnexion valides : `/*` (vous pouvez également remplacer le caractère générique par le chemin complet pour être plus strict)

Soumettez vos paramètres et allez à l'onglet Credentials pour récupérer le secret client.

Ensuite, vous pouvez démarrer Grist avec la configuration suivante :

```shell
GRIST_OIDC_SP_HOST=https://<grist-domain> # ou http://localhost:8484
GRIST_OIDC_IDP_ISSUER=https://<keycloak-domain>/realms/<your-realm>
GRIST_OIDC_IDP_SCOPES=openid profile email

# l'ID que vous avez choisi pour le client Keycloak
GRIST_OIDC_IDP_CLIENT_ID=...

# le secret client généré par Keycloak récupéré précédemment
GRIST_OIDC_IDP_CLIENT_SECRET=...
```

Ce format est adapté pour un fichier `.env` ou similaire. Lors d'une invocation shell, n'oubliez pas de citer les valeurs avec des espaces, comme `GRIST_OIDC_IDP_SCOPES="openid profile email"`.
