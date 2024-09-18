---
title: AI Formula Assistant
---

Assistant de Formule AI
==============

L'Assistant de Formule AI de Grist simplifie la partie la plus difficile des feuilles de calcul — les formules. L'assistant ne fait qu'une seule chose, écrire des formules en réponse à des requêtes en langage clair.

Lorsque vous posez une question à l'assistant, il n'est pas nécessaire de spécifier les IDs des colonnes ou d'expliquer la structure de vos données. Lorsque vous soumettez une question à l'assistant, Grist envoie votre question et le schéma de vos données (en partie ou en totalité) à [OpenAI](https://openai.com/){:target="\_blank"} afin que l'assistant puisse mieux comprendre votre document. Vous pouvez consulter le schéma de vos données dans la [vue code.](formulas.md#code-viewer)

Aucune donnée n'est partagée avec OpenAI à moins qu'un utilisateur ne soumette une question à l'assistant. En savoir plus sur [l'utilisation des données](ai-assistant.md#data-use-policy).

## Comment Utiliser l'Assistant AI

Créez une [colonne de formule](formulas.md) et cliquez soit sur l'icône d'agrandissement, soit sur le lien texte “utiliser l'Assistant AI” dans la cellule.

<span class="screenshot-large">*![Ouverture de l'Assistant AI](images/ai-assistant/formula-cell-editor.png)*</span>
{: .screenshot-half }

Cela ouvrira un éditeur de formule étendu avec le chat de l'Assistant AI en dessous. Décrivez simplement ce que vous voulez que la formule fasse. [Voici quelques conseils.](ai-assistant.md#best-practices)

Lorsque vous appliquez une formule suggérée, vous verrez la formule prévisualisée dans la colonne. Si vous êtes satisfait de la formule, cliquez sur “Enregistrer”. Sinon, cliquez sur “Annuler” pour annuler les modifications apportées à la formule.

<span class="screenshot-large">*![Assistant de Formule AI](images/ai-assistant/ai-assistant-dialog.png)*</span>
{: .screenshot-half }

## Assistant AI pour les Auto-hébergeurs

Pour les auto-hébergeurs souhaitant connecter leur instance Grist, définissez les [variables d'environnement liées à l'Assistant AI](https://github.com/gristlabs/grist-core#ai-formula-assistant-related-variables-all-optional){:target="\_blank"}.

Les variables ci-dessus permettent également l'utilisation de la famille de modèles auto-hébergeables LLaMA via [llama2-cpp-python](https://github.com/abetlen/llama-cpp-python){:target="\_blank"}.

En savoir plus sur [la gestion autonome de Grist](self-managed.md).

## Tarification de l'Assistant AI

Les plans personnels gratuits et les plans d'équipe gratuits disposent de 100 crédits d'Assistant AI (ou requêtes). Pour les espaces d'équipe gratuits, cela s'applique à toute l'équipe.

Les [plans Pro](https://www.getgrist.com/pricing/){:target="\_blank"} incluent 100 crédits d'Assistant AI par mois. Les crédits se rechargent automatiquement à 100 à chaque cycle de facturation. Les crédits s'appliquent à toute l'équipe. Chaque message de chat envoyé coûte un crédit. Si vous avez besoin de plus de crédits, il existe deux options de mise à niveau :

* 500 crédits mensuels pour 10 $ par mois (par équipe, non par personne)
* 2 000 crédits mensuels pour 29 $ par mois (par équipe, non par personne)

## Bonnes Pratiques

* Il est utile de comprendre comment les [formules](formulas.md) fonctionnent dans Grist, surtout par rapport aux feuilles de calcul traditionnelles. Dans Grist, une seule formule s'applique à toute une colonne. Si vous avez déjà travaillé avec des feuilles de calcul, vous pourriez être surpris de ne pas avoir à spécifier les numéros de ligne, comme `B1 * C1`. Si vous êtes nouveau sur Grist, vous pourriez essayer quelque chose de simple sans l'assistant pour voir comment les formules se comportent, par exemple `$Prix * $Taxe`.

* Définir un en-tête de colonne avant de soumettre une question améliore les résultats. Par exemple, “Bénéfice Net” fournit plus de contexte qu'une colonne étiquetée “D”.

* Définissez le [type de colonne](col-types.md) de la colonne de formule avant de demander de l'aide à l'assistant. Cela aide l'assistant à deviner quel type de valeurs vous souhaitez obtenir.

* Pensez au type de valeur que vous vous attendez à voir dans la formule, et formulez la question en conséquence. Par exemple, si vous voulez une formule qui renvoie Vrai ou Faux dans une [colonne de bascule](col-types.md#toggle-columns), posez une question oui-ou-non. Sinon, l'assistant pourrait suggérer une formule qui liste toutes les lignes où quelque chose est vrai (et est techniquement correct), mais vous espériez une simple valeur vraie ou fausse par ligne.

* L'assistant est conversationnel. Si vous n'êtes pas satisfait d'une formule suggérée, expliquez à l'assistant où la formule a échoué et demandez-lui de faire un changement.

* Parfois, l'assistant s'entête sur une mauvaise idée. S'il insiste sur une méthode de formule particulière, envisagez de supprimer la conversation et de recommencer. Cliquez sur le menu à trois points dans l'en-tête de l'Assistant AI pour effacer une conversation.

<span class="screenshot-large">*![Effacer la Conversation de l'Assistant AI](images/ai-assistant/clear-conversation.png)*</span>
{: .screenshot-half }

* Rappelez-vous que les formules Grist s'appliquent à toute la colonne. Si vous voulez des sommes de lignes, vous avez besoin d'une [table de résumé](summary-tables.md). Vous pouvez ajouter plus de formules aux tables de résumé et demander à l'assistant de vous aider.

## Politique d'Utilisation des Données

Votre requête et le schéma de votre document sont envoyés à [OpenAI](https://openai.com/){:target="\_blank"}. L'Assistant de Formule AI de Grist utilise le modèle gpt-3.5-turbo, alias ChatGPT. La [Politique de Confidentialité](https://openai.com/api-data-privacy){:target="\_blank"} d'OpenAI décrit comment OpenAI gère vos données. La [Politique de Contenu](https://labs.openai.com/policies/content-policy){:target="\_blank"}, les [Politiques d'Utilisation](https://openai.com/policies/usage-policies){:target="\_blank"} et la [Politique de Partage et de Publication](https://openai.com/api/policies/sharing-publication/){:target="\_blank"} d'OpenAI décrivent comment l'Assistant AI de Grist et ses résultats peuvent être utilisés et partagés. Ceux qui violent les politiques d'OpenAI peuvent perdre l'accès à l'assistant AI de Grist.

Certains employés de Grist Labs peuvent également examiner les journaux des requêtes de l'assistant (questions et schéma de document) pour comprendre ce qui fonctionne et ce qui ne fonctionne pas, afin de fournir un meilleur service.
