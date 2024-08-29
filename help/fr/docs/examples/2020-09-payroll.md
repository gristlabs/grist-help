---
title: Track payroll
---

# Suivi de la Paie

Si vous avez des employés, alors vous suivez la paie. Vous utilisez peut-être un service de paie,
et il vous demande probablement de saisir les heures de chaque employé une fois par mois.

C'est là que Grist peut vous aider à suivre les choses de manière pratique et à réduire les erreurs,
surtout si vous avez des employés à temps partiel.

![Résumé de la Paie](../examples/images/2020-09-payroll/pay-periods.png)

## Le Modèle de Paie

Le modèle finalisé est ici : <https://templates.getgrist.com/5pHLanQNThxk/Payroll>{:target="\_blank"}.
N'hésitez pas à l'ouvrir dans une fenêtre séparée et à essayer les choses vous-même au fur et à mesure.

Le modèle répond à quelques besoins :

1. Nous devons pouvoir ajouter des employés et conserver leurs informations de contact de base.
2. Nous devons définir les taux auxquels les gens sont payés, et ces taux peuvent changer au fil du temps.
3. Dans notre exemple, les taux varient également selon le rôle : la même personne peut travailler comme Instructeur dans un programme et comme Coordinateur dans un autre, à des taux différents.
4. Nous devons saisir les heures de chaque personne.
5. Nous devons obtenir les totaux mensuels, à la fois pour saisir les données dans notre service de paie et pour vérifier que tout correspond.

## La Page "Personnes"

Commençons par l'onglet "Personnes" dans l'exemple. Il répond à nos besoins (1), (2) et (3).

![Page Personnes](../examples/images/2020-09-payroll/people-page.png)

En haut, nous avons une liste de personnes, avec des informations de contact telles que l'adresse et le numéro de téléphone. Pour ajouter une nouvelle personne, cliquez dans la dernière ligne de la `table PERSONNES` et saisissez les données.

En dessous, nous avons une fiche pour la personne sélectionnée -- un moyen pratique de visualiser ou de mettre à jour l'enregistrement de la personne sélectionnée.

À côté, il y a les taux pour cette personne. Nous suivons tous les taux, pas seulement le plus récent, ainsi que la date d'effet de chaque taux.

Pour ajouter un nouveau taux, sélectionnez une personne, cliquez dans la dernière ligne de la `table TAUX` et saisissez la date d'effet dans la colonne `Début du Taux` (peut-être en utilisant le raccourci pour la date d'aujourd'hui : <code class="keys">*⌘* + **;** (point-virgule)</code> sur Mac ou <code class="keys">*Ctrl* + **;**</code> sur Windows). Définissez le `Rôle` auquel il s'applique et le `Taux Horaire`. Le champ `Commentaire` est pour vos propres notes.

<span class="screenshot-large">*![Ajout de Taux](../examples/images/2020-09-payroll/add-rate.png)*</span>
{: .screenshot-half }

Ne modifiez pas les valeurs des taux existants, sinon les calculs de paie passés seront affectés. Lorsque vous accordez une augmentation à quelqu'un, ajoutez-la comme une nouvelle ligne. De cette façon, l'historique complet est conservé et disponible pour référence.

## La Page "Paie"

Pour saisir les heures de paie, passez à la page "Paie". C'est la tâche la plus courante, nous avons donc placé cette page en premier dans la liste des pages pour qu'elle s'ouvre par défaut lorsque vous ouvrez le document. Faites défiler jusqu'en bas (vous pouvez utiliser ces raccourcis pratiques : <code class="keys">*⌘* *↓*</code> sur Mac, <code class="keys">*Ctrl* + *↓*</code> sur Windows).

![Page Paie](../examples/images/2020-09-payroll/payroll-page.png)

Pour ajouter une entrée de paie, saisissez la date (ou utilisez le sélecteur de date), sélectionnez la personne en utilisant l'auto-complétion, sélectionnez son rôle et saisissez ses heures. Les quelques colonnes suivantes recherchent automatiquement le taux pertinent et calculent le paiement.

Si vous souhaitez saisir des heures pour un intervalle de dates, par exemple pour une semaine particulière ou pour quelqu'un travaillant à temps plein ce mois-ci, vous pouvez utiliser `Date` comme date de début et saisir également une `Date de Fin`.

L'élément intéressant de cette page est la façon dont le taux `Par Heure` est recherché. Vous n'avez pas besoin de vous en soucier si vous utilisez simplement le modèle, mais si vous aimez regarder sous le capot ou si vous avez besoin de personnaliser cela davantage selon vos besoins, je vais l'expliquer en détail ci-dessous.

## La Page "Périodes de Paie"

Ici, les totaux pour chaque période sont automatiquement totalisés pour répondre à notre besoin (5) — voir un aperçu, saisir des données dans un système de paie et vérifier que tout correspond.

![Résumé de la Paie](../examples/images/2020-09-payroll/pay-periods.png)

La dernière période de paie (dans notre cas, un mois) se trouve en haut de la table en haut à gauche. Vous pouvez sélectionner n'importe quelle période de paie pour voir un graphique circulaire avec un aperçu des paiements répartis par rôle et une table de combien chaque personne a gagné ce mois-là.

Les noms et les heures dans la dernière table sont généralement tout ce dont un service de paie a besoin. De plus, nous avons inclus une colonne `Dates` résumant les dates travaillées ce mois-ci : pour les personnes travaillant à temps partiel, cela aide à se souvenir de quand le revenu a été gagné. Cela pourrait être une note pratique à inclure dans un bulletin de paie si votre service de paie le permet.

C'est tout !

Nous avons maintenant un suivi de la paie pratique et simple.

## Sous le capot

J'ai promis de montrer comment les taux sont recherchés. Ouvrez la page "Paie", cliquez sur
n'importe quelle cellule dans la colonne `Par Heure` et appuyez sur <code class="keys">*Entrée*</code>.

<span class="screenshot-large">*![Formule de Recherche de Taux](../examples/images/2020-09-payroll/rate-lookup-formula.png)*</span>
{: .screenshot-half }

La formule que vous voyez est une fonction Python complexe, mais elle est intentionnellement décomposée en morceaux, avec des commentaires expliquant ce que fait chaque ligne :

```python
# Obtenez tous les taux pour la Personne et le Rôle dans cette ligne.
rates = Rates.lookupRecords(Person=$Person, Role=$Role)

# Sélectionnez uniquement les taux dont le Début_Taux est avant ou à la date de cette ligne.
past_rates = [r for r in rates if r.Rate_Start <= $Date]

# Sélectionnez le plus récent des past_rates, c'est-à-dire le maximum par Début_Taux.
current_rate = max(past_rates, key=lambda r: r.Rate_Start)

# Retournez le Taux_Horaire de l'enregistrement de taux pertinent.
return current_rate.Hourly_Rate
```

(Si cela semble trop compliqué, bonne chance pour essayer de faire la même chose dans une feuille de calcul traditionnelle !)

Lisez les commentaires dans ce code pour comprendre les étapes. Pour ceux qui connaissent Python, cela peut déjà avoir un sens parfait. Pour ceux qui ne le connaissent pas, voici les liens pertinents vers la documentation de Grist et de Python :

- [lookupRecords](https://support.getgrist.com/functions/#lookuprecords) :
  comment nous recherchons tous les taux pour la personne et le rôle donnés.
- [list comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) :
  comment nous filtrons uniquement les taux avec un `Début_Taux` antérieur.
- [max function](https://docs.python.org/3/library/functions.html#max) :
  comment nous choisissons l'enregistrement de taux avec le `Début_Taux` le plus récent.
- [.Field](https://support.getgrist.com/functions/#_field) : comment nous obtenons le champ `Taux_Horaire` de l'enregistrement de taux.

Cette formule est également une bonne illustration de l'utilité de disposer de Python, ainsi que de formules multi-lignes, de variables et de commentaires.

## Utilisation du modèle de paie

Pour commencer à utiliser cet exemple pour votre propre paie, commencez par le modèle :

[ALLER AU MODÈLE](https://templates.getgrist.com/5pHLanQNThxk/Payroll){:target="\_blank"}
{: .grist-button }

puis cliquez sur "Enregistrer une copie" :

<span class="screenshot-large">*![Enregistrer une copie](../examples/images/2020-09-payroll/save-copy.png)*</span>
{: .screenshot-half }

Ensuite, cochez la case "Comme Modèle".

<span class="screenshot-large">*![Dupliquer Comme Modèle](../examples/images/2020-09-payroll/duplicate-as-template.png)*</span>
{: .screenshot-half }

Votre copie inclura alors toute la structure, la logique et les mises en page du document de paie sans aucune des données d'exemple.
