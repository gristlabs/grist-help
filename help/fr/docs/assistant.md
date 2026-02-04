---
title: Assistant IA
---

Assistant
==============

L'Assistant IA de Grist peut répondre à des questions sur vos données, créer ou modifier des enregistrements, et aider avec les formules !

Lorsque vous posez une question à l'Assistant, il n'est pas nécessaire de spécifier les IDs des colonnes ou d'expliquer la structure de vos données. Lorsque vous soumettez une question à l'assistant, Grist envoie votre question, le schéma de vos données et les données elles-mêmes à [OpenAI](https://openai.com/){:target="\_blank"} afin que l'assistant puisse mieux comprendre votre document.

L'Assistant :

* **Peut** répondre à des questions sur vos données, créer ou modifier des tables, des pages et la plupart des widgets. Il peut lier des widgets et aider avec les formules. Il sait également quelle page vous consultez.
* **Ne peut pas** créer ou modifier des graphiques, des formulaires, des règles d'accès, ou modifier la mise en page des pages. Il ne sait pas non plus si vous avez sélectionné quelque chose.

Aucune donnée n'est partagée avec OpenAI à moins qu'un utilisateur ne soumette une question à l'assistant. En savoir plus sur [l'utilisation des données](assistant.md#politique-dutilisation-des-donnees).

## Comment utiliser l'Assistant

L'Assistant est disponible sous le menu 'Outils' dans le panneau de navigation de gauche.

<span class="screenshot-large">*![Ouverture de l'Assistant](images/assistant/assistant-tools-menu.png)*</span>
{: .screenshot-half }

Cela ouvre le panneau Assistant — une interface de type chat où vous pouvez demander de l'aide avec les formules, la transformation de données, l'analyse de données, et plus encore. Décrivez simplement ce que vous essayez de faire, et l'assistant vous guidera.

<span class="screenshot-large">*![Panneau Assistant](images/assistant/assistant-popup.png)*</span>
{: .screenshot-half }

## Tarification de l'Assistant

Les plans personnels gratuits et les plans d'équipe gratuits disposent de 200 crédits d'Assistant (ou requêtes). Pour les sites d'équipe gratuits, cela s'applique à toute l'équipe.

Les [plans Pro](https://www.getgrist.com/pricing/){:target="\_blank"} incluent 100 crédits d'Assistant par mois, les [plans Business](https://www.getgrist.com/pricing/){:target="\_blank"} incluent 2 000 crédits par mois et les plans Enterprise offrent des limites de crédits personnalisables. Les crédits se réinitialisent au montant mensuel du plan au début de chaque cycle de facturation et sont partagés dans toute l'équipe. Chaque message de chat coûte un crédit. Si vous avez besoin de plus de crédits, il existe deux options de mise à niveau :

* 500 crédits mensuels pour 10 $ par mois (par équipe, non par personne)
* 2 000 crédits mensuels pour 29 $ par mois (par équipe, non par personne)

## Politique d'utilisation des données

Lorsque vous utilisez l'Assistant, votre requête, le schéma du document et les données sont envoyés à [OpenAI](https://openai.com/){:target="\_blank"}. L'Assistant utilise le modèle gpt-4o, alias ChatGPT. La [Politique de Confidentialité](https://openai.com/api-data-privacy){:target="\_blank"} d'OpenAI décrit comment OpenAI gère vos données. La [Politique de Contenu](https://labs.openai.com/policies/content-policy){:target="\_blank"}, les [Politiques d'Utilisation](https://openai.com/policies/usage-policies){:target="\_blank"} et la [Politique de Partage et de Publication](https://openai.com/api/policies/sharing-publication/){:target="\_blank"} d'OpenAI décrivent comment l'Assistant et ses résultats peuvent être utilisés et partagés. Ceux qui violent les politiques d'OpenAI peuvent perdre l'accès à l'Assistant.

Certains employés de Grist Labs peuvent également examiner les journaux des requêtes de l'assistant (questions, schéma de document et données) pour comprendre ce qui fonctionne et ce qui ne fonctionne pas, afin de fournir un meilleur service.

## Assistant pour les auto-hébergeurs

Pour les auto-hébergeurs, l'Assistant est disponible sur les plans [Enterprise](https://www.getgrist.com/pricing/). Apprenez comment [activer Grist Enterprise](https://support.getgrist.com/self-managed/#how-do-i-enable-grist-enterprise). Notre [Assistant de Formule IA Legacy](ai-assistant-legacy.md) reste disponible aux auto-hébergeurs sur l'[édition Communautaire](https://github.com/gristlabs/grist-core){:target="\_blank"}.

Pour les auto-hébergeurs souhaitant connecter leur instance Grist, définissez les [variables d'environnement liées à l'Assistant IA](install/assistant.md#variables-denvironnement).

Les variables ci-dessus permettent également l'utilisation d'autres modèles (y compris ceux qui peuvent être auto-hébergés). Voir [ces instructions](install/assistant.md#utilisation-dopenrouter) pour plus d'informations.

En savoir plus sur [l'auto-hébergement de Grist](self-managed.md).
