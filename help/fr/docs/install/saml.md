SAML {: .tag-core .tag-ee }
====

Configuration pour SAML, utile pour les connexions d'entreprise à authentification unique (SSO).
Un bon aperçu informatif de SAML est disponible sur <https://www.okta.com/integrate/documentation/saml/>

Note :

  * SP est "Service Provider" (Fournisseur de Service), dans notre cas, l'application Grist.
  * IdP est "Identity Provider" (Fournisseur d'Identité), un endroit où les utilisateurs se connectent, par exemple Okta ou Google Apps.

Nous aurons besoin d'un ou plusieurs certificats de l'IdP, au format PEM. Il s'agit d'une clé publique que Grist utilisera pour vérifier que les messages de l'IdP sont légitimes.

Nous aurons besoin d'une paire de clés privée et publique pour que Grist puisse communiquer avec l'IdP. L'IdP devra connaître la clé publique de Grist pour vérifier que les messages de Grist sont légitimes.

Variables d'environnement attendues :

  * `GRIST_SAML_SP_HOST` - c'est simplement l'URL de base du site Grist,
    comme `https://<grist-domain>` (lorsque SAML est actif, il y aura
	une endpoint `/saml/assert` disponible ici pour implémenter le protocole).
  * `GRIST_SAML_SP_KEY` - chemin vers un fichier contenant notre clé privée, au format PEM.
    C'est la clé privée de la paire de clés créée pour que Grist l'utilise avec l'IdP.
  * `GRIST_SAML_SP_CERT` - chemin vers un fichier contenant notre clé publique, au format PEM.
    C'est la clé publique de la paire de clés créée pour que Grist l'utilise avec l'IdP.
	Ce n'est pas la clé publique/certificat de l'IdP.
  * `GRIST_SAML_IDP_LOGIN` - URL de connexion pour rediriger l'utilisateur pour la connexion.
  * `GRIST_SAML_IDP_LOGOUT` - URL de déconnexion pour rediriger l'utilisateur pour la déconnexion.
  * `GRIST_SAML_IDP_SKIP_SLO` - si défini et non vide, ne pas tenter le flux "Single Logout"
    SAML, mais simplement rediriger vers `GRIST_SAML_IDP_LOGOUT` après avoir effacé la session.
	La possibilité de ce flux dépendra de l'IdP.
  * `GRIST_SAML_IDP_CERTS` - liste de chemins séparés par des virgules pour les certificats
    de l'IdP, au format PEM. Ce n'est pas la clé privée ou publique créée pour Grist.
  * `GRIST_SAML_IDP_UNENCRYPTED` - si défini et non vide, autoriser les assertions non chiffrées,
    en s'appuyant sur https pour la confidentialité.

## Exemple : Auth0

Par exemple, lors de l'exécution en local et en http, les paramètres qui fonctionnent avec l'[IdP SAML Auth0](https://auth0.com/docs/protocols/saml-protocol/configure-auth0-as-saml-identity-provider) sont :

  * `GRIST_SAML_IDP_SKIP_SLO` non défini
  * `GRIST_SAML_SP_HOST` = `http://localhost:8484`
  * `GRIST_SAML_IDP_UNENCRYPTED` = `1`
  * `GRIST_SAML_IDP_LOGIN` = `https://...auth0.com/samlp/xxxx`
  * `GRIST_SAML_IDP_LOGOUT` = `https://...auth0.com/samlp/xxxx`  (ce sont les mêmes pour Auth0)
  * `GRIST_SAML_IDP_CERTS` = `.../auth0.pem` (téléchargé selon les instructions d'Auth0)
  * `GRIST_SAML_SP_KEY` = `.../saml.pem` (créé)
  * `GRIST_SAML_SP_CERT` = `.../saml.crt` (créé)

Lorsqu'il est utilisé avec docker, assurez-vous que les fichiers de clé et de certificat sont accessibles
dans un volume partagé. La paire clé/certificat a été créée en suivant les instructions ici :

  * [Auth0 : utiliser un certificat personnalisé pour signer les requêtes](https://auth0.com/docs/authenticate/protocols/saml/saml-sso-integrations/sign-and-encrypt-saml-requests#use-a-custom-key-to-sign-requests)
  * [Auth0 en tant que fournisseur d'identité SAML](https://auth0.com/docs/protocols/saml-protocol/saml-sso-integrations/sign-and-encrypt-saml-requests#auth0-as-the-saml-identity-provider)

Dans vos paramètres Auth0, assurez-vous également que :

 * L'URL de rappel de l'application est définie sur `https://<grist-domain>/saml/assert`.

## Exemple : Authentik

Dans [Authentik](https://goauthentik.io/), ajoutez un fournisseur appelé `Grist` avec :

  * URL ACS : `https://<grist-domain>/saml/assert`
  * Définir la liaison du fournisseur de services sur `Post`
  * Sélectionnez ou ajoutez un certificat de signature. Vous devrez le télécharger pour l'utiliser comme `GRIST_SAML_IDP_CERTS` dans la configuration de Grist.
  * Ajoutez un certificat de vérification. Ce sera la partie publique d'une paire de clés que vous créez pour `GRIST_SAML_SP_KEY`/`GRIST_SAML_SP_CERT` dans la configuration de Grist.

Ensuite, toujours dans Authentik, ajoutez une application également appelée `Grist` (je ne suis pas très imaginatif) qui :

  * Utilise le fournisseur `Grist`.
  * A `Launch URL` défini sur `https://<grist-domain>`.

Les paramètres de Grist suivent le même schéma que pour Auth0. Les URL de connexion et
de déconnexion avec Authentik au moment de la rédaction ressemblent à :

  * `GRIST_SAML_IDP_LOGIN` = `https://...authentik.../application/saml/grist/sso/binding/redirect/`
  * `GRIST_SAML_IDP_LOGOUT` = `https://...authentik.../if/session-end/grist/`

## Exemple : Google

Dans [Google Admin](https://admin.google.com/), sous la section "Apps", dans "Web and Mobile Apps", ajoutez une nouvelle application SAML personnalisée.

Définissez le nom de l'application, la description et l'icône à votre convenance, puis cliquez sur Suivant.

Prenez note du contenu du champ `SSO URL`, et téléchargez le certificat fourni.

Configurez l'application dans Google Admin comme suit :

  * URL ACS : `https://<grist-domain>/saml/assert`
  * ID d'entité : `https://<grist-domain>/saml/metadata.xml`
  * Cochez la case Réponse signée.
  * Laissez `Start URL` vide, et les paramètres `Name ID` par défaut.

Cliquez sur Suivant, et éventuellement, sous Attributs, ajoutez deux mappages pour la population automatique des noms :

  * Attribut de l'annuaire Google `First Name` défini sur l'attribut de l'application `FirstName`
  * Attribut de l'annuaire Google `Last Name` défini sur l'attribut de l'application `LastName` 

Puis cliquez sur Terminer, et configurez les paramètres de Grist :

  * `GRIST_SAML_IDP_SKIP_SLO` = `true`
  * `GRIST_SAML_SP_HOST` = `https://<grist-domain>`
  * `GRIST_SAML_IDP_UNENCRYPTED` = `true`
  * `GRIST_SAML_IDP_LOGIN` = `https://accounts.google.com/o/saml2/idp?idpid=xxxx` (fourni par Google comme `SSO URL`)
  * `GRIST_SAML_IDP_LOGOUT` = `https://<grist-domain>` (puisque Google ne prend pas en charge Single Logout, renvoyez simplement l'utilisateur à la page d'accueil)
  * `GRIST_SAML_IDP_CERTS` = `.../google.pem` (fourni par Google plus tôt)
  * `GRIST_SAML_SP_KEY` = `.../saml.pem`
  * `GRIST_SAML_SP_CERT` = `.../saml.crt`

Pour créer la paire de clés utilisée dans `GRIST_SAML_SP_KEY` et `GRIST_SAML_SP_CERT`, suivez les mêmes instructions que pour Auth0 et Authentik.

Note : Google ne vérifie pas les messages SAML entrants, ils ne permettent donc pas de télécharger une clé publique à cette fin.

## Dépannage

Nous nous attendons à ce que l'IdP nous fournisse name_id, un identifiant unique pour l'utilisateur.
Nous utilisons également des attributs optionnels pour le nom de l'utilisateur, pour lesquels nous acceptons n'importe lequel de :

  * FirstName
  * LastName
  * http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname
  * http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname

Vous devrez peut-être ajuster les paramètres par défaut de votre IdP pour correspondre aux attentes de Grist.