En-têtes Transférés
=================

Vous pouvez avoir un middleware qui effectue l'authentification et transmet ensuite l'identité aux applications web dans un en-tête. Si c'est le cas, Grist peut être configuré pour respecter cet en-tête.

!!! warning "Avertissement"
    **La logique de redirection pour l'authentification utilisant des en-têtes transférés suppose actuellement une configuration [d'un seul espace d'équipe](../self-managed.md#how-do-i-set-up-a-team) et peut mal se comporter pour des configurations multi-sites.**

Pour que cela fonctionne, voici ce que vous devez faire :

  - Définissez `GRIST_FORWARD_AUTH_HEADER` sur un en-tête qui contiendra les emails des utilisateurs autorisés, par exemple `x-forwarded-user`. Cela doit correspondre à ce que votre middleware définira.
  - Assurez-vous que le chemin `/auth/login` est géré par votre middleware avant d'atteindre Grist.
  - Définissez `GRIST_FORWARD_AUTH_LOGOUT_PATH` sur un chemin qui déclenchera une déconnexion pour votre middleware (par exemple, `/_oauth/logout`). Assurez-vous que le chemin de déconnexion est géré par votre middleware !
  - Si vous souhaitez autoriser l'accès anonyme dans certains cas, assurez-vous que tous les autres chemins de Grist sont libres de votre middleware. Grist déclenchera le middleware (en redirigeant vers `/auth/login`) si nécessaire. Il est conseillé de supprimer `GRIST_FORWARD_AUTH_HEADER` des requêtes externes sur tous les chemins qui ne sont pas gérés par votre middleware.
  - Votre middleware peut vous permettre de spécifier où rediriger l'utilisateur après la déconnexion. Cela devrait être `/signed-out` sur le site Grist.

## Exemple : traefik-forward-auth

[traefik-forward-auth](https://github.com/thomseddon/traefik-forward-auth)
est "Un service d'authentification minimale qui fournit une connexion OAuth/SSO et une authentification pour le proxy inverse/équilibreur de charge traefik."

  - Le `GRIST_FORWARD_AUTH_HEADER` doit être `X-Forwarded-User`, et cela doit être défini dans les paramètres `authResponseHeaders` pour traefik.

  - Le `GRIST_FORWARD_AUTH_LOGOUT_PATH` doit être `/_oauth/logout`, sauf si vous avez modifié le paramètre `url-path` par défaut pour traefik-forward-auth.

  - `LOGOUT_REDIRECT` pour traefik-forward-auth doit être `https://<grist-site>/signed-out`.

Il existe des exemples pratiques sur [Un modèle pour l'auto-hébergement de Grist avec traefik et docker compose](https://community.getgrist.com/t/a-template-for-self-hosting-grist-with-traefik-and-docker-compose/856) et [Grist Omnibus](https://github.com/gristlabs/grist-omnibus).

## Dépannage

Pour beaucoup, cette méthode d'authentification fonctionne très bien. Un utilisateur avec plusieurs applications web servies par le même middleware a eu des difficultés à coordonner les déconnexions. Cela pourrait être résolu en appliquant le middleware à tous les chemins de Grist et en définissant `GRIST_IGNORE_SESSION=true` afin que Grist n'ait aucune notion distincte de qui est connecté. Mais alors, partager certains documents avec tout le monde publiquement (sans se connecter) est devenu un problème. Notez qu'avec `GRIST_IGNORE_SESSION=true`, Grist fera confiance à `GRIST_FORWARD_AUTH_HEADER` sur toutes les requêtes, il est donc impératif que vous ayez un middleware qui remplace ou supprime cet en-tête pour _toutes_ les requêtes externes avant de les transférer à Grist.

Si au contraire vous voulez être sûr que l'utilisateur doit être connecté avant d'utiliser Grist de quelque manière que ce soit, vous pouvez définir `GRIST_FORCE_LOGIN=true`.