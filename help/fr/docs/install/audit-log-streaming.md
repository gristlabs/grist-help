# Diffusion des journaux d'audit {: .tag-ee }

Grist peut diffuser des événements de journaux d'audit depuis votre installation vers une destination
externe, telle qu'un système de gestion des informations et événements de sécurité (SIEM).

Vous pouvez ajouter, mettre à jour ou supprimer une destination de diffusion à tout moment, et diffuser
vers plusieurs destinations. Les événements de tous les sites d'équipe dans votre installation
seront inclus dans le flux.

Les événements sont diffusés en temps réel. Seuls les événements qui se sont produits après qu'une destination de diffusion
ait été ajoutée seront envoyés à cette destination.

**Note :** Vous devez être un administrateur d'installation pour voir ou modifier les destinations de diffusion.

## Ajouter des destinations de diffusion

Grist supporte actuellement la diffusion vers des destinations avec des points de terminaison HTTP Event Collector
(HEC), comme Splunk, ou des destinations qui peuvent accepter du JSON structuré
sur HTTP. Suivez les instructions pour votre destination :

* [Splunk (HEC)](#diffusion-vers-splunk-hec)
* [Autre (HTTP)](#diffusion-vers-dautres-destinations-http)

### Diffusion vers Splunk (HEC)

Pour diffuser vers des destinations avec des points de terminaison HEC, un format utilisé par Splunk et
les services compatibles avec Splunk, vous devez configurer un point de terminaison HEC qui est
accessible depuis votre installation Grist. Vous pouvez également utiliser un outil comme
[Vector](https://vector.dev/) qui supporte la réception d'événements HEC. Voir
[la documentation de Splunk](https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector)
pour plus d'informations.

1. Cliquez sur l'icône de profil dans le coin supérieur droit de Grist.
2. Cliquez sur **Panneau d'administration**.
3. Sous "Journaux d'audit", cliquez sur **Diffusion des journaux**.
4. Sous "Destinations", cliquez sur **Commencer la diffusion** ou **Ajouter une destination**.
5. Sous "Destination", cliquez sur **Splunk**.
6. Sous "URL", entrez le point de terminaison HEC vers lequel envoyer les événements.
7. Sous "Jeton", entrez "Splunk " suivi du jeton HEC (par exemple `Splunk B5A79AAD-D822-46CC-80D1-819F80D7BFB0`).
8. Cliquez sur **Ajouter une destination**.

### Diffusion vers d'autres destinations (HTTP)

Pour diffuser vers d'autres destinations HTTP, vous devez configurer un point de terminaison qui est
accessible depuis votre installation Grist et accepte du JSON structuré avec le
format suivant :

```json
{
  "id": "806ed0d9-7d25-4df2-9a6c-f7d2f6b8dba6",
  "action": "document.create",
  "actor": {
    "type": "user",
    "user": {
      "id": 146,
      "email": "flapjack@example.com",
      "name": "Flapjack Toasty"
    }
  },
  "context": {
    "ip_address": "39.139.42.243",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
    "session_id": "ixVo6maPbcgd1vvoj93teT",
    "site": {
      "id": 42,
      "name": "Grist Labs",
      "domain": "gristlabs"
    }
  },
  "timestamp": "2024-11-13T06:00:51.518Z",
  "details": {
    "document": {
      "id": "4cq1mNTkQmEF5KsUVGiy6H",
      "name": "Untitled document"
    }
  }
}
```

1. Cliquez sur l'icône de profil dans le coin supérieur droit de Grist.
2. Cliquez sur **Panneau d'administration**.
3. Sous "Journaux d'audit", cliquez sur **Diffusion des journaux**.
4. Sous "Destinations", cliquez sur **Commencer la diffusion** ou **Ajouter une destination**.
5. Sous "Destination", cliquez sur **Autre**.
6. Sous "URL", entrez le point de terminaison HTTP vers lequel envoyer les événements.
7. Sous "Jeton", entrez la valeur à inclure dans l'en-tête Authorization, le cas échéant.
8. Cliquez sur **Ajouter une destination**.

## Mettre à jour les destinations de diffusion

1. Cliquez sur l'icône de profil dans le coin supérieur droit de Grist.
2. Cliquez sur **Panneau d'administration**.
3. Sous "Journaux d'audit", cliquez sur **Diffusion des journaux**.
4. Sous "Destinations", cliquez sur **...** pour la destination que vous souhaitez mettre à jour.
5. Modifiez la destination, l'URL et/ou le jeton.
6. Cliquez sur **Enregistrer**.

## Supprimer les destinations de diffusion

1. Cliquez sur l'icône de profil dans le coin supérieur droit de Grist.
2. Cliquez sur **Panneau d'administration**.
3. Sous "Journaux d'audit", cliquez sur **Diffusion des journaux**.
4. Sous "Destinations", cliquez sur **...** pour la destination que vous souhaitez supprimer.
5. Cliquez sur **Supprimer**.
6. Cliquez sur **Supprimer** à nouveau dans la fenêtre contextuelle de confirmation qui apparaît.
