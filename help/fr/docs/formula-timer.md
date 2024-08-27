Minuteur de formules
=========

Grist dispose d'un minuteur de formules intégré qui mesure le temps nécessaire pour évaluer chaque formule dans un document. Cela aide à diagnostiquer quelles formules sont responsables des ralentissements lorsque le document est ouvert pour la première fois ou lorsqu'il répond à des modifications.

Le minuteur de formules de Grist se trouve sur la page 'Paramètres du document', sous 'Moteur de données'.

Sélectionnez 'Démarrer le chronométrage' pour commencer.

<span class="screenshot-large">*![paramètres-du-minuteur-de-formules](images/formula-timer/formula-timer-settings.png)*</span>

Sur l'écran suivant, vous aurez deux choix, 'Démarrer le chronométrage' et 'Recharger et chronométrer'.

<span class="screenshot-large">*![sélection-du-minuteur-de-formules](images/formula-timer/formula-timer-selection.png)*</span>
{: .screenshot-half }

**Démarrer le chronométrage**

'Démarrer le chronométrage' vous permet de faire des modifications dans le document, puis d'arrêter le chronométrage pour voir les résultats. Cela est utile si vous souhaitez tester des formules spécifiques. Vous pouvez effectuer une modification qui affecte cette formule, puis revenir et cliquer sur 'Arrêter le chronométrage' pour voir le résultat.

<span class="screenshot-large">*![arrêter-le-chronométrage](images/formula-timer/formula-timer-stop-timing.png)*</span>
{: .screenshot-half }

**Recharger et chronométrer**

'Recharger et chronométrer' force un rechargement du document tout en chronométrant les formules et affiche le résultat. Cela montrera les résultats de chronométrage pour toutes les formules à travers l'ensemble du document.

## Résultats

Les résultats sont affichés sous forme de tableau.

!!! warning "⚠️ Tableau des résultats"
    Le tableau des résultats du minuteur de formules n'est enregistré nulle part dans le document. Si vous quittez cette page, vous devrez relancer le minuteur de formules pour récupérer le tableau.

Triez la colonne **Temps total** de Z > A afin que les formules prenant le plus de temps à s'exécuter soient listées en premier.

<span class="screenshot-large">*![tri-des-résultats-du-minuteur-de-formules](images/formula-timer/formula-timer-result-sort.png)*</span>

Le tableau spécifie l'**ID de la table** et l'**ID de la colonne** contenant chaque formule. Examinez les formules avec le temps total le plus élevé pour voir comment elles peuvent être améliorées.

Si votre document subit des ralentissements dus aux calculs de formules, vous verrez des **Temps totaux** supérieurs à 1 seconde.

<span class="screenshot-large">*![résultats-du-minuteur-de-formules](images/formula-timer/formula-timer-results.png)*</span>

Besoin de conseils pour améliorer une formule ? Publiez sur notre [Forum Communautaire](https://community.getgrist.com/) !