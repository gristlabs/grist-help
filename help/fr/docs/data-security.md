---
title: Data security
---

# Sécurité des Données

Grist est disponible en tant que service hébergé ("Grist SaaS") fonctionnant
sur une infrastructure gérée par Grist Labs. Il peut également être installé
sur votre propre infrastructure ("Grist Auto-Géré"). Dans les deux cas,
nous prenons des mesures pour sécuriser vos données que vous devez connaître.

## Grist SaaS

Notre politique générale de confidentialité et nos conditions sont disponibles sur
<https://www.getgrist.com/privacy> et
<https://www.getgrist.com/terms>. De plus, voici un résumé des
mesures spécifiques qui concernent les documents Grist que nous hébergeons
pour vous :

  * Les serveurs Grist fonctionnent sur l'infrastructure cloud d'Amazon Web Services (AWS),
    aux États-Unis.
  * [AWS S3](https://aws.amazon.com/s3/) est utilisé pour le stockage à long terme,
    et stocke les documents sous forme cryptée. Les données sont stockées aux
    États-Unis.
  * Les employés de Grist ne regardent jamais vos données et ne peuvent pas ouvrir vos
    documents. La seule exception est si vous choisissez de partager un document
    avec le support client afin d'obtenir de l'aide pour un problème.
  * Lorsqu'elles sont traitées, vos données existeront par nécessité sous forme
    non cryptée dans certains des systèmes internes de Grist. Seuls certains
    employés clés ont un accès complet à ces systèmes, et la politique
    leur interdit de regarder à l'intérieur des documents.
  * Le HTTPS sécurisé est utilisé pour tout accès à Grist via Internet public
    (à la fois pour le site web et les appels API).
  * Des sauvegardes régulières des documents Grist sont effectuées et sont stockées sous
    forme cryptée. Grist conserve des instantanés plus fréquents des changements récents,
    et des instantanés moins fréquents au fur et à mesure que vous remontez dans le temps.
  * Si vous supprimez un document, il restera pendant 30 jours dans un dossier Corbeille
    sous votre contrôle. À tout moment, une option "Supprimer définitivement" peut
    être utilisée pour purger immédiatement un document dans ce dossier. Toutes
    les sauvegardes automatiques sont purgées avec le document.

Le produit Grist hébergé n'a pas encore été certifié ou audité pour la conformité
SOC 2, ISO 27001, HIPAA ou RGPD. Si vous avez besoin de documentation spécifique,
veuillez contacter le support client.

Vous pouvez également nous encourager à prioriser la certification
par rapport au développement de fonctionnalités sur [ce problème](https://github.com/gristlabs/grist-core/issues/47).

## Grist Auto-Géré

Pour Grist Auto-Géré, vous avez un contrôle total sur l'emplacement des serveurs
et le lieu de stockage des données. Voici quelques considérations de sécurité
à garder à l'esprit :

 * Le logiciel Grist est distribué via l'organisation `gristlabs`
   sur [github](https://github.com/gristlabs) et
   [docker hub](https://hub.docker.com/u/gristlabs). Veuillez
   faire preuve de diligence si vous accédez au logiciel ailleurs,
   car le logiciel que vous installez aura un accès complet à vos
   données.
 * Les documents Grist prennent en charge des formules Python puissantes. Veuillez
   prêter attention aux instructions pour [configurer le sandboxing](self-managed.md#how-do-i-sandbox-documents)
   si votre équipe peut travailler avec des documents non fiables.
 * Par défaut, Grist est accueillant pour les utilisateurs anonymes, leur permettant
   de créer et de modifier leurs propres documents. Vous pouvez souhaiter
   [configurer une disposition plus stricte](https://support.getgrist.com/self-managed/#how-do-i-set-up-authentication).
 * Grist ne rend pas les services externes obligatoires, car cela introduirait
   des obstacles inutiles dans certains scénarios. Par exemple,
   une personne éditant un document Grist hors ligne sur son propre
   bureau ne devrait pas avoir besoin d'installer une base de données PostgreSQL d'abord.
   Mais il est important d'évaluer ce dont vous avez besoin dans votre situation plutôt que
   de simplement vous en tenir aux paramètres par défaut. Veuillez
   lire à propos [des données que Grist stocke](https://support.getgrist.com/self-managed/#what-files-does-grist-store)
   et de vos options pour savoir où les stocker.
 * Il est important de [garder votre installation Grist à jour](https://support.getgrist.com/self-managed/#how-do-i-upgrade-my-installation).
