# Préparer des Emails en Utilisant des Formules

Vous savez peut-être déjà que vous pouvez ajouter des [champs de lien hypertexte](../col-types.md#hyperlinks) dans Grist. Vous savez peut-être aussi que les liens "mailto" ouvrent un programme de messagerie pour créer un nouveau message électronique.

Il est moins connu que les liens "mailto" permettent de pré-remplir de nombreuses parties du message électronique. Si vous utilisez Grist pour stocker des contacts, vous pouvez essentiellement créer des modèles d'email en utilisant des formules Grist.

## Liens Mailto Simples

Le lien "mailto" le plus simple dans Grist ressemble à `mailto:someone@example.com`. Lorsque la colonne est définie sur Texte et que son format est défini sur Hyperlien, elle s'affiche comme <mailto:someone@example.com>.

Si vous avez une table avec les colonnes `Full_Name` et `Email`, ajoutez une autre colonne avec cette formule :
`"Compose Email mailto:%s" % ($Email)`{: .formula}.
Définissez son type sur Texte et son format de cellule sur Hyperlien :

<span class="screenshot-large">*![Format Hyperlien](../examples/images/2020-07-hyperlink-format.png)*</span>
{: .screenshot-half }

Vous obtiendrez un lien dans chaque ligne de la personne, sur lequel vous pouvez cliquer pour commencer à composer un email à cette personne :

<span class="screenshot-large">*![Cellules Mailto](../examples/images/2020-07-hyperlink-cells.png)*</span>
{: .screenshot-half }

Voyez un exemple de cela en action ici :
[Composition Simple](https://templates.getgrist.com/3HfynRQwpHPy/Email-Contacts){:target="\_blank"}.

## Cc, Bcc, Objet, Corps

En plus d'ouvrir votre programme de messagerie et de remplir le champ "À", un lien "mailto" peut remplir d'autres parties de l'email, en utilisant ce format :

```html
mailto:<to>?cc=<cc>&bcc=<bcc>&reply-to=<email>&subject=<subject>&body=<body>
```

Tous les champs sont facultatifs. Vous pouvez spécifier plusieurs adresses email pour les listes To/Cc/Bcc en les séparant par des virgules.

Les valeurs de chaque champ doivent être [encodées en pourcentage](https://en.wikipedia.org/wiki/Percent-encoding), ce qui peut être fait en Python en utilisant
[urllib.parse.quote](https://docs.python.org/3/library/urllib.parse.html#urllib.parse.quote).

Pour assembler cela, cette formule produira un hyperlien pour créer un email pré-rempli :

```python
from urllib.parse import quote
return "Compose mailto:%s?cc=sales@example.com&subject=%s&body=%s" % (
  quote($Email), quote($Subject), quote($Body))
```

Un exemple en direct de cela est ici :
[Composition Avancée](https://templates.getgrist.com/3HfynRQwpHPy/Email-Contacts/p/2){:target="\_blank"}.

## Envoyer des Emails à Plusieurs Personnes

Les liens email sont très pratiques pour envoyer des emails à un groupe de personnes, comme des étudiants dans une classe, ou des personnes sur un certain projet.

Par exemple, si vous avez une [colonne de référence](../col-refs.md) "Projet" qui lie une personne à un projet, alors dans la table des projets, vous pouvez rechercher toutes les personnes associées en utilisant [lookupRecords](../functions.md#lookuprecords). Vous pouvez ensuite créer un lien pour les envoyer un email en groupe :

```python
from urllib.parse import quote
people = People.lookupRecords(Project=$id)
return "Email Group mailto:%s" % quote(", ".join(people.Email))
```

Vous pouvez voir cette formule en action dans
[Composition de Groupe](https://templates.getgrist.com/3HfynRQwpHPy/Email-Contacts/p/3){:target="\_blank"}.

N'utilisez pas cela pour remplacer une plateforme de marketing par email : comme les emails utilisent votre programme de messagerie habituel, vous ne devriez pas l'utiliser pour envoyer des emails à des milliers de personnes. Mais pour de petits groupes, cela peut être très pratique.

## Configurer le Programme de Messagerie

Si vos liens "mailto" ne fonctionnent pas, ou n'ouvrent pas votre programme de messagerie préféré, voici un article pour vous aider à le configurer :

- [Changer le programme de messagerie par défaut](https://www.makeuseof.com/tag/how-to-change-the-default-email-program-for-mailto-links/).

Si vous avez besoin de plus de détails, voici quelques liens supplémentaires :

- Pour ouvrir un programme de bureau (comme Mail, Thunderbird, etc.) sur un Mac : [Instructions](https://support.apple.com/en-us/HT201607).
- Pour ouvrir un programme de bureau (comme Outlook, etc.) sur Windows : [Instructions](https://kb.wisc.edu/helpdesk/page.php?id=170).
- Pour ouvrir Gmail dans Chrome et d'autres navigateurs : [Instructions](https://blog.hubspot.com/marketing/set-gmail-as-browser-default-email-client-ht).
- Pour ouvrir un webmail (comme Gmail ou Yahoo! Mail) ou un programme de bureau dans Firefox : [Instructions](https://support.mozilla.org/en-US/kb/change-program-used-open-email-links).