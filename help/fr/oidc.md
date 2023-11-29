OpenID Connect {: .tag-core .tag-ee }
====

Configuration pour OIDC, utile comme système de login SSO pour les
organisations. Un bon résumé de l'OIDC est disponible à
<https://developer.okta.com/blog/2019/10/21/illustrated-guide-to-oauth-and-oidc>

Note :

* SP est "Service Provider" (fournisseur de service), dans notre cas
  l'application Grist.
* IdP est "Identity Provider" (Fournisseur d'Identité), l'endroit où
  l'utilisateur s'authentifie, comme Keycloak, Authelia, …
* OIDC est l’acronyme pour OpenID Connect

Les variables d'environnement attendues :

* `GRIST_OIDC_IDP_ISSUER` - l'URL de l'issuer pour le fournisseur d'identité,
  passé à node-openid-client, voir :
  <https://github.com/panva/node-openid-client/blob/a84d022f195f82ca1c97f8f6b2567ebcef8738c3/docs/README.md#issuerdiscoverissuer>.
  **Cette variable active le système d'authentification OIDC**
* `GRIST_OIDC_IDP_CLIENT_ID` - l'ID du client pour l'application, tel
  qu'enregistré auprès du fournisseur d'identité.
* `GRIST_OIDC_IDP_CLIENT_SECRET` - le secret du client pour l'application, tel
  qu'enregistré auprès du fournisseur d'identité.
* `GRIST_OIDC_IDP_SCOPES` (optionnel) - les scopes (périmètres) à demander
  auprès du fournisseur d'identité, en tant que liste séparées par des espaces.
  Vaut par défaut `"openid email profile"`.
* `GRIST_OIDC_SP_HOST` (optionnel) - il s'agit juste de l'URL de base pour le
  site Grist, par exemple `https://<grist-domain>` (quand OIDC est activé, un
  endpoint `/oauth2/callback` sera mise à disposition pour l'implémentation du
  protocole). Si omise, `APP_HOME_URL` sera utilisé.</grist-domain>
* `GRIST_OIDC_IDP_SKIP_END_SESSION_ENDPOINT` (optionnel) - Si mis à "true", au
  moment de la déconnection, il n'y aura pas d'appel au `end_session_endpoint`
  du fournisseur d'identité (l'utilisateur restera connecté auprès du
  fournisseur d'identité). Vous devriez le définir à "true" seulement si le
  fournisseur d'identité ne fournit pas l'endpoint (par exemple si vous utilisez
  Gitlab).
* `GRIST_OIDC_SP_PROFILE_NAME_ATTR` (optionnel) - La clé pour l'attribut à
  utiliser pour le nom de l'utilisateur. Si omis, le nome sera la concaténation
  de `given_name` et de `family_name` (prénom et nom) s'il sont fournis ou
  autrement l'attribut `name`.
* `GRIST_OIDC_SP_PROFILE_EMAIL_ATTR` (optionnel) - La clé de l'attribut à
  utiliser pour l'adresse email de l'utulisateur. Vaut par défaut "email".

## Exemple : Gitlab

Voir [comment créer une application OAuth2 dans Gitlab dans cette
documentation](https://docs.gitlab.com/ee/integration/oauth_provider.html). Lors
de la création de l'application, définissez l'URI de redirection à
`https://<grist-domain>/oauth2/callback` (ou
`http://localhost:8484/oauth2/callback` si testé localement, changez `8484` pour
le port sur lequel vous écoutez) et sélectionnez les scopes que vous allez
spécifier dans `GRIST_OIDC_IDP_SCOPES`.</grist-domain>

Une fois l'application configurée, démarrez Grist avec ces paramètres :

- `GRIST_OIDC_SP_HOST` = `https://<grist-domain>` /
  `http://localhost:8484`</grist-domain>
- `GRIST_OIDC_IDP_ISSUER` =
  `https://gitlab.com/.well-known/openid-configuration`
- `GRIST_OIDC_IDP_SCOPES` = `"openid profile email"`
- `GRIST_OIDC_IDP_CLIENT_ID` = "..." (l'ID du client généré par Gitlab pour
  l'application)
- `GRIST_OIDC_IDP_CLIENT_SECRET` = "..." (le secret du client généré par Gitlab
  pour l'application)
- `GRIST_OIDC_IDP_SKIP_END_SESSION_ENDPOINT` = `true` (Gitlab ne propose pas de
  `end_session_endpoint`)

## Exemple : Auth0

Créez une application dans Auth0 [comme expliqué dans cette
documentation](https://auth0.com/docs/get-started/auth0-overview/create-applications)
(vous pouvez sélectionner le type d'application nommé `Regular Web
Applications`). Une fois l'application créée, assurez-vous d'ajouter au moins la
configuration suivante pour l'application :

* Allowed callback URLs :
  `https://<grist-domain>/oauth2/callback`</grist-domain>
* Allowed logout URLs : `http://<grist-domain>/*` (vous pouvez également
  remplacer le caractère générique par le chemin d'accès complet afin d'être
  plus strict)</grist-domain>

Ensuite, vous devriez pouvoir démarrer Grist avec les paramètres suivants :

- `GRIST_OIDC_SP_HOST` = `https://<grist-domain>` /
  `http://localhost:8484`</grist-domain>
- `GRIST_OIDC_IDP_ISSUER` =
  `https://<your-auth0-app-domain>`</your-auth0-app-domain>
- `GRIST_OIDC_IDP_SCOPES` = `"openid profile email"`
- `GRIST_OIDC_IDP_CLIENT_ID` = "..." (l'ID client généré par Auth0 pour
  l'application)
- `GRIST_OIDC_IDP_CLIENT_SECRET` = "..." (le secret du client généré par Auth0
  pour l'application)

## Exemple : Keycloak

En premier lieu, configurez Keycloak comme expliqué dans l'un de ces guides
"Getting Started" : <https://www.keycloak.org/guides#getting-started>.

Une fois Keycloak configuré avec un realm (domaine) et un utilisateur, vous
pouvez créer un nouveau client avec la configuration suivante :

- Client type : OpenID Connect
- Authentication flow : Standard Flow
- Root URL : `https://<grist-domain>`</grist-domain>
- Valid redirect URIs : `/oauth2/callback`
- Valid post logout redirect URIs : `/*` (vous pouvez également remplacer le
  caractère générique par le chemin d'accès complet pour être plus strict)

Soumettez vos paramètres et accédez à l'onglet "Credentials" pour récupérer le
secret du client.

Ensuite, vous pouvez démarrer Grist avec la configuration suivante :

- `GRIST_OIDC_SP_HOST` = `https://<grist-domain>` /
  `http://localhost:8484`</grist-domain>
- `GRIST_OIDC_IDP_ISSUER` =
  `https://<keycloak-domain>/realms/<your-realm>`</your-realm></keycloak-domain>
- `GRIST_OIDC_IDP_SCOPES` = `"openid profile email"`
- `GRIST_OIDC_IDP_CLIENT_ID` = "..." (l'identifiant que vous avez choisi pour le
  client Keycloak)
- `GRIST_OIDC_IDP_CLIENT_SECRET` = "..." (le secret du client généré par
  Keycloak récupéré précédemment)
