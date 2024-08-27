---
description: Comment configurer des webhooks pour certaines intégrations externes
---

# Webhooks
Les webhooks vous permettent de notifier des services externes chaque fois que des lignes sont ajoutées à une table ou si des lignes existantes sont modifiées.

Vous pouvez configurer des webhooks depuis la page 'Paramètres du document'. Cliquez sur 'Paramètres' sous le menu 'Outils' situé en bas du panneau de navigation de gauche lors de la visualisation d'un document.

<span class="screenshot-large">*![webhooks-settings](images/webhooks/settings.png)*</span>
{: .screenshot-half }

Dans la section 'API' des 'Paramètres du document', cliquez sur le
bouton 'Gérer les webhooks'.

<span class="screenshot-large">*![webhooks-api-settings](images/webhooks/settings-webhooks.png)*</span>
{: .screenshot-half }

Cela vous permettra de définir des webhooks pour votre document, où chaque
carte de cette page de paramètres représente un webhook pour votre
document.

![webhooks-ui](images/webhooks/ui.png)
{: .screenshot-half }

## Configuration

Chaque webhook a plusieurs champs. Certains champs sont définis par l'utilisateur,
et d'autres champs sont en lecture seule et utilisés pour enregistrer des informations sur
le traitement du webhook. Tous les champs ne sont pas obligatoires.

* **Nom**: Un nom court et descriptif donné au webhook.
* **Mémo** (optionnel): Une description plus longue de l'objectif du webhook.
* **Types d'événements**: Si l'ajout ou la modification
  des lignes déclenche un webhook.
* **Table**: La table qui déclenchera ce webhook.
* **Filtrer les modifications dans ces colonnes** (optionnel): Une liste d'ID de colonnes séparés par des points-virgules. Si une ligne existante est modifiée, le webhook se déclenchera
  uniquement si l'une des colonnes filtrées a été modifiée, _et_ si le
  webhook est configuré pour se déclencher lors de modifications. Si un webhook
  se déclenche lors de l'ajout d'une ligne, peu importe quelles colonnes sont définies
  lorsque la nouvelle ligne est ajoutée.
* **Colonne prête** (optionnel): Une colonne booléenne, ou [Toggle](col-types.md#toggle-columns), sur la table qui
  détermine si la ligne doit déclencher le webhook ou non. Lorsque la
  colonne devient vraie, la ligne correspondante déclenchera le webhook.
* **URL**: L'URL distante du service que le webhook notifiera
  des lignes ajoutées ou modifiées. Lors de l'auto-hébergement, seuls les services externes
  listés par la [variable d'environnement `ALLOWED_WEBHOOK_DOMAINS`](
  https://github.com/gristlabs/grist-core?tab=readme-ov-file#environment-variables)
  sont autorisés. Notez qu'il existe des préoccupations de sécurité en permettant n'importe quel domaine, car
  les services internes de Grist peuvent devenir vulnérables à la manipulation.
* **Autorisation d'en-tête** (optionnel): Les informations d'identification à fournir à
  l'endpoint du webhook dans l'en-tête HTTP `Authorization`. Tous les
  endpoints ne nécessitent pas d'informations d'identification. Il s'agit d'une chaîne statique. Une utilisation courante
  de ce champ est de fournir un jeton API comme requis par l'URL du webhook.
* **Activé**: Si le webhook doit surveiller sa table configurée
  pour les modifications ou non. Si le webhook est désactivé, aucune modification de sa
  table ne le déclenchera.

Les champs suivants sont informatifs et en lecture seule :

* **ID du webhook**: Un ID unique automatique généré en interne pour
  le webhook.
* **Statut**: Un objet JSON qui résume le statut actuel du
  webhook, ainsi que les résultats concernant le nombre de fois où il a
  été invoqué. Cela inclut tous les messages d'erreur potentiels ou statuts
  que le webhook peut avoir reçus lors de la tentative d'envoi d'une charge utile à
  l'adresse distante.

## Sécurité

Dans des [environnements auto-hébergés](self-managed.md) non fiables, les endpoints
internes de Grist peuvent être exposés si tout utilisateur est autorisé à créer
des documents et configurer des webhooks. Il existe deux façons de réduire ce
risque :

1. Utilisez la [variable d'environnement `ALLOWED_WEBHOOK_DOMAINS`](
   https://github.com/gristlabs/grist-core?tab=readme-ov-file#environment-variables)
   pour lister les domaines autorisés que les webhooks peuvent utiliser.

2. Utilisez la [variable d'environnement `GRIST_HTTPS_PROXY`](
   https://github.com/gristlabs/grist-core?tab=readme-ov-file#environment-variables)
   pour restreindre les invocations de webhooks à passer par ce proxy, tout en
   définissant `ALLOWED_WEBHOOK_DOMAINS=*`. De cette manière, tous les domaines
   sont autorisés, mais les webhooks enverront des requêtes via le
   proxy configuré, protégeant ainsi vos endpoints internes de Grist.
   C'est la configuration utilisée par Grist Labs dans notre environnement hébergé sur le cloud.

Dans un environnement de confiance où des utilisateurs malveillants ne sont pas attendus,
la définition de `ALLOWED_WEBHOOK_DOMAINS=*` seule peut être suffisante
sans avoir besoin de configurer un proxy.

## Charges utiles

Lorsqu'un webhook est déclenché, les lignes qui correspondent aux conditions du webhook
généreront un tableau JSON comme charge utile du webhook. Voici un exemple de charge utile.

```json
[
  {
    "id": 29,
    "manualSort": 29,
    "Title": "Trophy",
    "URL": "https://example.com/buy/Trophy",
    "Price": 60,
    "Purchase_status": "wishlisted",
    "Currency": "USD",
    "Play_status": "Not started",
    "Box_art": null,
    "Price_CAD_": 82.362
  },
  {
    "id": 24,
    "manualSort": 24,
    "Title": "Dataman",
    "URL": "https://example.com/buy/Dataman",
    "Price": 50,
    "Purchase_status": "own digitally",
    "Currency": "EUR",
    "Play_status": "Finished",
    "Box_art": null,
    "Price_CAD_": 74.71
  }
]
```

Plusieurs lignes peuvent déclencher simultanément le même webhook. Dans ce
cas, ces lignes seront envoyées ensemble dans la même charge utile. La 'Colonne prête'
dans la configuration du webhook peut être utile pour déterminer quelles
lignes doivent être envoyées ensemble.

## Conditions d'erreur

Si un webhook ne parvient pas à livrer sa charge utile à l'URL spécifiée, il
continuera à réessayer périodiquement. La colonne 'Statut' dans la configuration du webhook
peut être utile pour diagnostiquer de tels problèmes, ou pour
vérifier que les charges utiles ont été livrées avec succès.

### File d'attente des webhooks

Les charges utiles des webhooks sont livrées selon une file d'attente par lots. Les tentatives
d'atteindre un endpoint sont supprimées de la file d'attente lorsqu'une livraison réussie
se produit. En cas de problème avec la configuration du webhook,
il peut être utile de purger la file d'attente du webhook. Le
bouton 'Effacer la file d'attente' dans la page de configuration du webhook supprimera toutes
les invocations en attente du webhook et ignorera les charges utiles associées.