---
title: Embedding
---

## Intégrer Grist

Peut-être souhaitez-vous lister vos produits, prix et quantités sur votre site web,
ou vous voulez afficher un graphique en camembert des résultats de vote qui se met à jour en direct. Avec
[l'accès public](sharing.md#public-access-and-link-sharing) activé, vous pouvez intégrer votre
document Grist sur votre propre site.

Pour ce faire, vous devez d'abord le rendre [public](sharing.md#public-access-and-link-sharing) et avoir
accès au code de votre site web afin de placer du code HTML à l'emplacement souhaité.

Si votre site est hébergé sur une plateforme CMS cloud populaire (comme Blogger ou WordPress),
vous pouvez trouver des blocs de code HTML dans l'éditeur de thème, ou vous devrez peut-être utiliser un
[plugin](https://wordpress.org/plugins/wp-coder/) pour accéder au code de votre site.
Si vous avez des problèmes pour modifier votre site, n'hésitez pas à nous demander ou à poser une question
sur notre [Forum Communautaire](https://community.getgrist.com/).

Une fois que vous avez décidé où intégrer votre document, collez cet extrait de code dans votre fichier HTML :

```html
<iframe src="https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true" 
        height="250px" width="100%" frameborder="0">
</iframe>
```

L'attribut `src` pointe vers l'URL de la page que vous souhaitez intégrer. Pour obtenir l'`URL`
de votre document, naviguez simplement vers la page que vous souhaitez partager et
copiez l'URL depuis la barre d'adresse du navigateur. Ajouter le paramètre `?embed=true` à la fin
indique à Grist qu'il doit afficher uniquement le contenu de votre page, en supprimant tous les éléments qui
ne sont pas nécessaires pour la version intégrée. Vous pouvez ajuster les attributs `height` et `width`
pour améliorer l'apparence sur votre site.

Puisque ce document du Centre d'Aide est un fichier HTML ordinaire, nous pouvons l'essayer tout de suite !
Vous devriez voir ci-dessous une table en direct intégrée (et non une capture d'écran) provenant de l'un de nos
[exemples](https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6) :

<iframe src="https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true&themeAppearance=light&themeSyncWithOs=false" height="250px" width="100%" frameborder="0">
</iframe>

Ceci est une vue en direct et en lecture seule de la page Grist et elle se met à jour dès que
quelqu'un la modifie. Vous pouvez, bien sûr, intégrer n'importe quelle page que vous souhaitez, y compris la vue fiche, les graphiques
et toute page avec plusieurs sections.

Voici deux autres exemples avec un graphique et une vue liste de fiches :

<iframe src="https://public.getgrist.com/42dAvZXMFewH/Funding-Pipeline/p/13?embed=true&themeAppearance=light&themeSyncWithOs=false" 
        height="300px" width="100%" frameborder="0">
</iframe>

<iframe src="https://templates.getgrist.com/ihsZTnKTF7Lr/Treasure-Hunt/p/3?embed=true&themeAppearance=light&themeSyncWithOs=false" 
        height="300px" width="100%" frameborder="0">
</iframe>

## Paramètres

#### Lecture seule vs. Éditable

Ajouter `?embed=true` à une URL partage la page en lecture seule tandis que `?style=singlePage` peut être éditée et suit les [permissions avancées](access-rules.md).

!!! note "Partager une Vue Intégrée"
    Ajouter `?embed=true` ou `?style=singlePage` à la fin de l'URL d'une page de document rend le document sans la barre d'outils en haut, le menu de page à gauche ou le panneau de créateur à droite. Pour en savoir plus sur le partage de lien, consultez [Accès public et partage de lien](sharing.md#public-access-and-link-sharing).

#### Apparence

Contrôlez l'apparence d'un iframe intégré en assignant une apparence de thème en ajoutant `?themeAppearance=light` pour le mode clair ou `?themeAppearance=dark` pour le mode sombre à votre URL.

Vous pouvez également remplacer le paramètre par défaut du système d'exploitation en utilisant `?themeSyncWithOs=false`.

!!! note "Chaînage des Paramètres"
    Lors de l'ajout de paramètres à la fin de votre URL, le premier commence toujours par `?`. Tous les paramètres supplémentaires commencent par `&`. Par exemple, [https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true&themeAppearance=dark&themeSyncWithOs=false](https://templates.getgrist.com/6D8E2h2DQNwS/Task-Management/p/6?embed=true&themeAppearance=dark&themeSyncWithOs=false) crée une vue intégrée, en lecture seule et force le mode sombre, indépendamment des paramètres de votre système d'exploitation.
