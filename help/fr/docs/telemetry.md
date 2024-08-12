# Vue d'ensemble de la télémétrie

Le développement de Grist est guidé par la télémétrie : un ensemble de mesures
visant à quantifier les aspects de l'utilisation de Grist. Une installation
de Grist ne fait pas de télémétrie par défaut.
Lorsque la télémétrie est activée, les données relatives à l'utilisation sont envoyées à un service
maintenu par Grist Labs.

La télémétrie peut être configurée par des variables d'environnement optionnelles :

  * `GRIST_TELEMETRY_LEVEL`. Cela peut être `off`, `limited`,
    ou `full`. La valeur par défaut est `off`. Un réglage de `limited` ou
	`full` entraîne l'envoi de données à un service géré par
	Grist Labs. Nous encourageons les utilisateurs à régler la télémétrie sur `limited`
	afin que leur utilisation compte et guide le développement de Grist.
	Nous ne recommandons le réglage `full` que si vous avez utilisé
	`GRIST_TELEMETRY_URL` pour rediriger la télémétrie vers un service
	que vous contrôlez. Il inclut des identifiants internes à votre installation
	que nous préférerions ne pas connaître.
  * `GRIST_TELEMETRY_URL`. Ceci contrôle l'endroit où la télémétrie est
	télémétrie est envoyée. Par défaut, il s'agit d'un service géré par Grist Labs.
	Si vous gérez un grand service hébergé, vous pouvez souhaiter diriger la télémétrie vers un service que vous gérez.
	diriger la télémétrie vers un service que vous contrôlez.

La télémétrie peut également être configurée de manière interactive par le propriétaire d'une installation Grist.
d'une installation Grist, voir [How do I control telemetry ?](self-managed.md#how-do-i-control-telemetry) pour plus de détails.

Le paramètre `limité` permet d'obtenir une télémétrie à gros grain. Ce niveau est destiné à une installation de Grist qui a opté pour la télémétrie à gros grain.
Ce niveau est destiné à une installation de Grist qui a choisi de
fournir de la télémétrie. L'objectif est de comprendre comment Grist est utilisé "dans la nature" en termes d'utilisation des fonctionnalités et de comptage des ressources.
dans la nature" en termes d'utilisation des fonctionnalités et de comptage des ressources, sans partager de données commerciales ou d'informations personnelles identifiables.
sans partager de données commerciales ou d'informations personnelles identifiables. Voir [limité
telemetry](telemetry-limited.md) pour plus de détails sur ce qui est envoyé.

Le réglage `full` donne une télémétrie relativement fine. Ce niveau
est destiné aux grands services hébergés, tels que celui de Grist Labs.
Labs. Plus d'informations sont enregistrées, pour faciliter le fonctionnement du service
et le développement du produit. Aucune information personnelle identifiable n'est
n'est incluse. Des identifiants opaques sont inclus qui, en cas de besoin (par exemple
dans le cas d'une panne de service), pourraient être liés à des informations
par l'intermédiaire de registres non télémétriques.  Voir [télémétrie complète](telemetry-full.md) pour des
détails sur ce qui est envoyé.

