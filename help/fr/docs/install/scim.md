---
title: SCIM
---

SCIM {: .tag-core .tag-ee }
====

!!! warning "🚧 Statut de SCIM"
    En novembre 2024, le point de terminaison SCIM est expérimental et en développement actif.

## Cas d'utilisation et différence avec les systèmes SSO

Grist supporte l'authentification via [OIDC](oidc.md) ou [SAML](saml.md) pour permettre aux utilisateurs de se connecter de manière sécurisée. Cependant, lors de la gestion de grandes organisations avec des bases d'utilisateurs dynamiques, la gestion manuelle des utilisateurs (création, mise à jour et suppression de comptes) peut devenir complexe et chronophage. C'est là qu'intervient le System for Cross-domain Identity Management (SCIM).

### Le rôle d'OIDC ou SAML

Les protocoles comme OIDC et SAML se concentrent principalement sur l'authentification et l'autorisation, garantissant que les utilisateurs peuvent se connecter de manière sécurisée et accéder à Grist. Ces protocoles supportent le Single Sign-On (SSO), permettant aux utilisateurs de s'authentifier une fois et d'obtenir un accès transparent à plusieurs services, y compris Grist. Cependant, ces protocoles ne gèrent pas les tâches de cycle de vie des utilisateurs telles que :

- L'approvisionnement et le déprovisionnement des utilisateurs dès qu'ils entrent ou quittent votre organisation, respectivement.
- L'assignation d'utilisateurs à des groupes afin qu'ils aient accès aux ressources.
- La mise à jour des informations de vos utilisateurs.

### Avantages de l'utilisation de SCIM dans Grist

C'est pour toutes les tâches mentionnées ci-dessus que SCIM entre en jeu. Par exemple, lorsque vous apportez des modifications aux utilisateurs ou aux groupes d'utilisateurs dans un fournisseur d'identité, SCIM propagera automatiquement ces modifications à travers chaque fournisseur de services (c'est-à-dire Grist) qui supporte l'API SCIM.

De plus, SCIM vous permet de déprovisionner les utilisateurs dès qu'ils partent. Cela garantit qu'ils ne peuvent pas se connecter sans attendre l'expiration de leurs sessions, ce qui est une étape vers la conformité au RGPD si votre organisation est basée en Europe.

## La norme

Pour plus de détails sur la norme SCIM, référez-vous aux spécifications officielles IETF : [RFC7643](https://www.rfc-editor.org/rfc/rfc7643) et [RFC7644](https://www.rfc-editor.org/rfc/rfc7644).

## L'API

L'implémentation SCIM est documentée dans la [référence de l'API REST Grist](../api.md#tag/scim).

## Les entités

Les entités SCIM suivantes peuvent être interrogées et manipulées via l'API SCIM de Grist :

- Les utilisateurs via `/Users`.

    Ce sont simplement des utilisateurs réguliers tels que vous pouvez les voir dans Grist.

- Les groupes d'utilisateurs (ou *équipes*) via `/Groups`.

    ⚠️ Veuillez noter que cette fonctionnalité est très expérimentale. Ajouter une équipe à un document,
    un espace de travail ou une organisation est possible, mais en décembre 2025, les équipes/groupes ajoutés via SCIM
    ne sont pas affichés dans l'interface utilisateur (en particulier dans la fenêtre contextuelle de Gestion des utilisateurs). Cependant, ces équipes/groupes
    auront toujours accès tel que configuré. Pour vérifier l'adhésion au groupe ou l'accès, veuillez utiliser l'API SCIM
    ou l'API REST directement, car les modifications peuvent ne pas être visibles dans l'interface utilisateur jusqu'à ce que les mises à jour futures résolvent cette limitation.

- Les rôles (`owners`, `editors`, `viewers`, `members`, `guests`) via `/Roles`

    Les Rôles sont ceux que vous voyez dans la fenêtre contextuelle de Gestion des utilisateurs : `owners`,
    `editors`, `viewers`, `guests` et `members`.
    Chaque rôle donne un certain accès à une ressource : un document, un espace de travail ou
    une organisation (alias *site d'équipe*).
    Vous pouvez utiliser les Rôles pour accorder aux Utilisateurs (`/scim/v2/Users`) ou
    aux Groupes (`/scim/v2/Groups`) l'accès à l'une de ces ressources.

!!! note "Les rôles sont définis par le système"
    Les rôles (`owners`, `editors`, `viewers`, `members`, `guests`) sont prédéfinis par Grist et ne peuvent pas être créés ou supprimés via l'API SCIM. Vous pouvez uniquement interroger les rôles et modifier leurs adhésions (c'est-à-dire assigner ou retirer des utilisateurs/groupes des rôles).

## Activer et configurer SCIM

Voici une liste de variables d'environnement que vous pouvez utiliser pour configurer SCIM :

- `GRIST_ENABLE_SCIM` : définissez sa valeur sur `true` pour activer les points de terminaison SCIM.
- `GRIST_SCIM_USER` : (optionnel) définissez sa valeur sur l'adresse e-mail d'un compte pour lui donner accès aux points de terminaison SCIM. Vous pouvez utiliser leur jeton API pour appeler les points de terminaison SCIM.

!!! Note "À propos de GRIST_SCIM_USER"
    Bien que les administrateurs d'instance (identifiés par les adresses e-mail définies dans `GRIST_DEFAULT_EMAIL` ou `GRIST_SUPPORT_EMAIL`) puissent accéder aux points de terminaison SCIM, il est recommandé de créer un compte dédié en utilisant `GRIST_SCIM_USER` pour que votre fournisseur d'identité interagisse avec ces points de terminaison. Cela suit le [principe du moindre privilège](https://en.wikipedia.org/wiki/Principle_of_least_privilege).
