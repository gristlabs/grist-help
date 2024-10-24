---
title: Gestire dati aziendali
---

# Come gestire dati aziendali {: data-toc-label='Intro' }

Grist dà il suo meglio quando i tuoi dati diventano più complessi. In questo esempio esaminiamo il caso di un'organizzazione che gestisce attività dopo-scuola per i bambini.

Il riferimento è al documento [Class Enrollment](https://templates.getgrist.com/doc/afterschool-program) che si trova nella nostra pagina di [Esempi &amp; Template](https://public.getgrist.com/p/templates).

In questo esercizio vi mostreremo come impostare e creare un documento di questo tipo.

## Pianificazione

Un po' di pianificazione prima di iniziare ti aiuterà ad arrivare prima al traguardo. Pensa con che tipo di dati dovrai lavorare, di quale flusso di lavoro avrai bisogno. Non hai bisogno di prevedere ogni dettaglio prima di partire: c'è tempo per aggiungere complicazioni dopo, come vedrai.

La nostra organizzazione gestisce un certo numero di corsi per bambini. Ogni corso ha il suo istruttore e diversi studenti. Gli studenti possono registrarsi a più corsi, e potrebbero tornare anno dopo anno. Per ciascun corso, vogliamo vedere la lista degli studenti iscritti, e se ci sono ancora posti disponibili. Quando chiama un genitore, vogliamo poter iscrivere rapidamente un nuovo studente, o modificare o cancellare la sua iscrizione.

Se questo ha tutta l'aria di costruire un programma, in effetti è proprio quello che stiamo per fare. Come vedrai, in ogni caso, non è più difficile che progettare un foglio di calcolo.

## Modellizzare i dati

Più riesci a modellizzare i tuoi dati, più il lavoro diventerà facile. In un certo senso, quello che stai facendo è progettare un database, oltre a creare un programma personalizzato. Grist rende tutto più semplice.

Iniziamo con i corsi e gli istruttori.

Ci serve una lista di corsi e di istruttori. Gli stessi istruttori possono insegnare in più di un corso, quindi corsi e istruttori devono stare in tabelle separate. Chiamiamole "Corsi" e "Staff". Ogni corso ha un solo istruttore, quindi una delle proprietà di un Corso sarà il suo istruttore.

## Corsi e istruttori

Siccome stai inziando da zero, devi creare un nuovo documento vuoto (vedi [Creare un documento](creating-doc.md)), rinominare la tabella vuota iniziale "Table1" a "Corsi", aggiungere le colonne che ti servono e inserire qualche corso di esempio. Se vuoi seguire il tutorial passo-passo, puoi invece importare [Classes.csv](./unlocalized-assets/afterschool-program/Classes.csv){: data-wm-adjusted=1 } (o semplicemente riferirti al documento di esempio "Afterschool Program").

![add-classes](images/afterschool-program/add-classes.png)

Per gli istruttori, fai click su "Aggiungi nuovo" e seleziona "Aggiungi tabella vuota". Rinominala "Staff", crea le colonne e inserisci i dati di qualche istruttore. Oppure importa [Staff.csv](./unlocalized-assets/afterschool-program/Staff.csv) per usare gli stessi nostri dati e tagliare qualche passaggio.

![add-staff](images/afterschool-program/add-staff.png)

Vogliamo che la colonna *Istruttore* nella tabella `Corsi` sia un riferimento alla tabella `Staff`. Adesso, la tabella `Staff` non ha alcuna colonna che può identificare ciascun record in modo univoco. Per poter usare i riferimenti, dobbiamo crearne uno. In questo caso, aggiungiamo una colonna "Nome esteso" alla tabella `Staff`.

## Formule

Fai click sulla pagina "Staff" e aggiungi una colonna "Nome esteso" usando il menu delle colonne o la scorciatoia <code class="keys">*Alt* + **=**</code>, quindi scrivi "Nome esteso" nell'intestazione della nuova colonna.

<span class="screenshot-large"></span>![fullname-rename](images/afterschool-program/fullname-rename.png) {: .screenshot-half }

Crea una formula inserendo un valore in qualsiasi cella, ma iniziando con il segno uguale (“=”). In questo caso, la formula è `$Last_Name + ", " + $First_Name`{: .formula }. Puoi usare la sintassi di Excel per ottenere lo stesso effetto: `CONCAT($Last_Name, ", ", $First_Name)`{: .formula }.

<span class="screenshot-large"></span>![fullname-formula](images/afterschool-program/fullname-formula.png) {: .screenshot-half }

- In Grist, una formula si applica sempre a tutti i record di una tabella.
- Grist accetta formule scritte in Python, e la maggior parte delle formule di Excel (che hanno nomi maiuscoli).

Siccome le formule si applicano a ciascuna riga, dovresti vedere la colonna "Nome esteso" che si riempie automaticamente.

![fullname-result](images/afterschool-program/fullname-result.png)

## Riferimenti

Fai click sulla pagina "Staff" e apri le "Opzioni colonna" per la colonna "Istruttore". La trasformeremo in un riferimento a `Staff`.

![instructor-col](images/afterschool-program/instructor-col.png)

Nel pannello di destra, imposta il tipo di colonna a "Riferimento" (ovvero una "chiave esterna", nel lessico dei database) e la tabella collegata a "Staff". Nel menu a tendina "Mostra colonna", scegli "Nome esteso", ossia la nuova colonna che abbiamo aggiunto.

<span class="screenshot-large"></span>![instructor-ref](images/afterschool-program/instructor-ref.png) {: .screenshot-half }

Fai click sul pulsante "Applica" per completare il cambio del tipo di colonna (se la colonna è vuota non sarà chiesta conferma).

Adesso puoi assegnare un istruttore a ciascun corso. Fai click su una cella nella colonna *Istruttore*. Adesso puoi inserire <code class="keys">*Invio*</code> e scegliere tra gli istruttori disponibili nella tabella `Staff`, o iniziare a scrivere e usare l'auto-completamento.

<span class="screenshot-large"></span>![instructor-autocomplete](images/afterschool-program/instructor-autocomplete.png) {: .screenshot-half }

Adesso possiamo continuare con gli studenti e le loro iscrizioni.

## Studenti

Ogni corso ha un certo numero di studenti. Quindi abbiamo bisogno di una tabella anche per loro. Aggiungi una tabella vuota e chiamala "Studenti"; riempila con i dati degli studenti, o importa [Students.csv](./unlocalized-assets/afterschool-program/Students.csv) per usare i nostri dati e tagliare corto.

![students-table](images/afterschool-program/students-table.png)

Aggiungiamo anche qui una colonna "Nome esteso" con una formula, come nella tabella "Staff". Ci tornerà utile in seguito.

<span class="screenshot-large"></span>![students-fullname](images/afterschool-program/students-fullname.png) {: .screenshot-half }

## Relazione molti-a-molti

Uno studente può iscriversi a più corsi. Ricordiamo che esisteranno anche corsi nel futuro e nel passato, dal momento che mantenere i dati storici è importante. Dunque, per ciascuno studente potrebbero esserci più corsi, e per ciascun corso avremo più studenti.

Un buon modo di modellizzare una relazione di questo tipo è aggiungere il concetto di "iscrizione", e una nuova tabella `Iscrizioni`. Una "iscrizione" rappresenta il concetto di uno studente che si iscrive per partecipare a un corso. Ha anche delle proprietà utili di per sé: lo stato dell'iscrizione (confermato, in lista d'attesa, cancellato); se hanno già pagato; e forse altre ancora.

Nel design dei database, questa si chiama una "relazione molti-a-molti". La tabella intermedia si dice "tabella join". In sostanza, mantiene un record per ciascuna connessione studente-corso, e trasforma una relazione molti-a-molti in due relazioni uno-a-molti.

Questa relazione

<span class="screenshot-full"></span>![many-to-many-cross](images/many-to-many-cross.png) {: .screenshot-half }

diventa questa:

<span class="screenshot-full"></span>![many-to-many-join](images/many-to-many-join.png) {: .screenshot-half }

Dunque, aggiungiamo una nuova tabella, chiamiamola "Iscrizioni", e aggiungiamo le colonne che ci servono. Anche qui, puoi importare i dati di esempio da [Enrollments.csv](./unlocalized-assets/afterschool-program/Enrollments.csv).

![enrollments-table](images/afterschool-program/enrollments-table.png)

Nelle opzioni per la colonna "Student", imposta il tipo a "Riferimento", scegli `Studenti` come tabella collegata e "Nome esteso" come colonna da mostrare.

<span class="screenshot-large"></span>![enrollments-student-col](images/afterschool-program/enrollments-student-col.png) {: .screenshot-half }

Adesso imposta il tipo a "Riferimento" anche per la colonna "Class", scegli la tabella `Corsi` da collegare e "Class Code" come colonna da mostrare.

<span class="screenshot-large"></span>![enrollments-class-col](images/afterschool-program/enrollments-class-col.png) {: .screenshot-half }

Per aggiungere delle registrazioni è possibile inserire dei record in questa tabella, usando l'auto-completamento nelle colonne "Student" e "Class". Ma vedremo un modo più conveniente per iscrivere gli studenti.

## Visualizzare i corsi

Uno degli obiettivi, nella fase di pianificazione, era di poter vedere una lista degli studenti iscritti per ciascun corso. Ora che abbiamo le tabelle, possiamo creare una pagina che faccia questo.

Fai click su "Aggiungi nuovo", quindi "Aggiungi pagina" per selezionare i widget. Scegli la tabella "Corsi" e fai click su "Aggiungi pagina".

<span class="screenshot-large"></span>![classlist-picker1](images/afterschool-program/classlist-picker1.png) {: .screenshot-half }

La nuova pagina mostra una lista di corsi. Rinominiamola "Vista corsi".

<span class="screenshot-large"></span>![classlist-renaming](images/afterschool-program/classlist-renaming.png) {: .screenshot-half }

Ora, aggiungi la tabella `Iscrizioni` collegata a quella dei corsi. Fai click su "Aggiungi pagina", poi "Aggiungi widget a pagina". Seleziona un widget per mostrare la tabella `Iscrizioni`. Come "Seleziona da" scegli "Corsi", poi "Aggiungi a pagina".

<span class="screenshot-large"></span>![classlist-picker2](images/afterschool-program/classlist-picker2.png) {: .screenshot-half }

Adesso abbiamo due tabelle affiancate. Selezionare un corso mosta tutte le iscrizioni a quel corso, con lo studente collegato e altre informazioni sull'iscrizione.

![classlist-page1](images/afterschool-program/classlist-page1.png)

Facciamo un passo in più e rendiamo questa vista più conveniente. Aggiungiamo una scheda per i Corsi: fai click su "Aggiungi nuovo", poi "Aggiungi vista a pagina", poi scegli "Scheda" per i dati di `Corsi`. Come "Seleziona da" scegli "Corsi", di nuovo, quindi "Aggiungi a pagina".

<span class="screenshot-large"></span>![classlist-picker3](images/afterschool-program/classlist-picker3.png) {: .screenshot-half }

Allo stesso modo, aggiungiamo una scheda per gli istruttori del corso. Di nuovo, "Aggiungi nuovo", "Aggiungi widget a pagina", seleziona "Scheda" per i dati di `Staff`. Come "Seleziona da" puoi scegliere ora "Corsi - Istruttore".

<span class="screenshot-large"></span>![classlist-picker4](images/afterschool-program/classlist-picker4.png) {: .screenshot-half }

Puoi cambiare l'aspetto di queste nuove schede. Fai click sul menu con i tre puntini in alto a destra nella scheda che vuoi cambiare, quindi "Opzioni widget". Trova il menu a tendina "Tema" nel pannello di destra, quindi scegli "Compatto".

![classlist-theme](images/afterschool-program/classlist-theme.png)

Ecco che cosa abbiamo nella pagina della "Vista corsi":

![classlist-page2](images/afterschool-program/classlist-page2.png)

Questo è il momento giusto per nascondere le colonne e i campi che sono duplicati, e possono distrarre. Leggi [Configurare la lista dei campi](page-widgets.md#configuring-field-lists) per un modo efficiente di scegliere i campi da mostrare, e [Layout personalizzati](custom-layouts.md) per disporre i widget nella pagina.

![classlist-page3](images/afterschool-program/classlist-page3.png)

## Visualizzare le iscrizioni

Il nostro altro obiettivo era di avere un modo facile per iscrivere uno studente, e per vedere e modificare una determinata iscrizione.

Aggiungiamo una pagina per questo scopo Fai click su "Aggiungi nuovo", po "Aggiungi pagina", e seleziona la tabella `Studenti`. Rinominiamo la pagina aggiunta "Vista iscrizioni".

![enrollments-view1](images/afterschool-program/enrollments-view1.png)

Quando selezioniamo un studente, qui vorremmo vedere tutte le iscrizioni a suo nome. Quindi fai click su "Aggiungi nuovo", poi "Aggiungi widget a pagina", e aggiungi la tabella delle "Iscrizioni". Per collegare il nuovo widget a quello degli Studenti nella stessa pagina, imposta il "Seleziona da" a "Studenti", poi fai click su "Aggiungi a pagina".

<span class="screenshot-large"></span>![enrollments-picker1](images/afterschool-program/enrollments-picker1.png) {: .screenshot-half }

Adesso puoi fare click sul nome di uno studente a sinistra, e vedere i corsi a cui è iscritto, sulla destra. Per iscrivere uno studente, puoi semplicemente inserire il codice del corso nella riga vuota al fondo della lista delle iscrizioni. Come al solito, la colonna di riferimenti "Corso" ha la funzione di auto-completamento.

![enrollments-view2](images/afterschool-program/enrollments-view2.png)

Puoi anche nascondere la colonna "Studente" nella tabella delle iscrizioni, dal momento che mostrerà comunque sempre lo studente selezionato.

Se vuoi includere più informazioni sui corsi nella tabella delle iscrizioni, seleziona le Opzioni Colonna per la colonna "Corso" e fai click su "+ Aggiungi colonna" nel pannello laterale.

<span class="screenshot-large"></span>*![enrollments-times](images/afterschool-program/enrollments-times.png) {: .screenshot-half }*

Tutti i campi associati al corso sono disponibili. Se ispezioni le colonne che si possono aggiungere in questa maniera, vedrai che si tratta semplicemente di formule come `$Class.Times`{: .formula }.

![enrollments-view3](images/afterschool-program/enrollments-view3.png)

## Aggiungere livelli di struttura

Se lavori con i bambini, dovrai parlare con i genitori. Avrai bisogno di nomi e contatti dei genitori, cosa che puoi aggiungere come colonne alla tabella degli studenti.

Ma vedrai presto che alcuni genitori hanno più di un bambino da iscrivere ai corsi. Tener conto del rapporto genitore/bambini nel database può sembrare complicato, ma finirà per semplificare il lavoro quotidiano.

Quindi, aggiungiamo ancora una tabella: `Famiglie`. Qui registriamo nome e contatti dei genitori, e colleghiamo ogni bambino a un record qui. Puoi importare i dati di esempio da [Families.csv](./unlocalized-assets/afterschool-program/Families.csv).

![families1](images/afterschool-program/families1.png)

Nota che abbiamo aggiunto la colonna "Nome esteso" qui, come per le altre tabelle che elencano persone.

Nella tabella degli studenti, aggiungiamo una colonna "Famiglia" e rendiamola un riferimento a `Famiglie`.

![student-families](images/afterschool-program/student-families.png)

I dati di esempio hanno già le famiglie impostate, e convertire la colonna in riferimenti imposta i collegamenti giusti. Se inserisci nuovi dati, puoi collegare gli studenti alle famiglie con l'auto-completamento, come per tutte le colonne di riferimenti.

Cambiamo la nostra "Vista iscrizioni" per mostrare le famiglie. In questo modo, se un genitore chiama, puoi selezionare il record giusto e vedere subito tutti i loro figli e le loro iscrizioni.

Nella pagina della "Vista iscrizioni", fai click su "Aggiungi nuovo", poi "Aggiungi widget a pagina", quindi seleziona la tabella `Famiglie` da mostrare.

<span class="screenshot-large"></span>![enrollments-picker2](images/afterschool-program/enrollments-picker2.png) {: .screenshot-half }

Risistema i widget in modo da avere le famiglie sulla sinistra, e studenti e iscrizioni a destra.

![enrollments-view4](images/afterschool-program/enrollments-view4.png)

Adesso collega gli studenti alle famiglie: fai click sul menu con i tre puntini in alto a destra della tabella Studenti, quindi scegli "Selezione dati".

<span class="screenshot-large"></span>![enrollments-menu](images/afterschool-program/enrollments-menu.png) {: .screenshot-half }

Nel pannello laterale, imposta il "Seleziona da" a "Famiglie".

<span class="screenshot-large"></span>![enrollments-select-by](images/afterschool-program/enrollments-select-by.png) {: .screenshot-half }

Infine, puoi aggiungere un widget scheda per mostrare dettagli sulla famiglia selezionata, e sullo studente, e organizzare i widget nella pagina per creare un layout ottimale quando si parla con un genitore.

![enrollments-view5](images/afterschool-program/enrollments-view5.png)

Selezioni un genitore, vedi i loro figli, quindi selezioni un bambino per vedere le sue iscrizioni. Puoi facilmente aggiungere un'iscrizione a un corso, o cambiare un record, per esempio segnarlo come cancellato, o aggiungere un altro figlio, o un'altra famiglia.

## Documento di esempio

L'esempio “Afterschool Program” include tutto ciò che è stato descritto finora e qualcosa in più.

In particolare, aggiunge un campo "Count" ai Corsi per calcolare il numero di iscritti, e un campo "Spots Left" per mostrare il numero dei posti restanti, confrontando il conteggio con "Max_Students":

- La formula per il conteggio è `len(Enrollments.lookupRecords(Class=$id, Status="Confirmed"))`{: .formula }.
- Per i posti rimanenti, `max($Max_Students - $Count, 0) or "Full"`{: .formula}.

<span class="screenshot-full"></span>![spots-left](images/afterschool-program/spots-left.png) {: .screenshot-half }

Questo rende più utile la pagina della Visualizzazione Corsi, dove è facile vedere subito quali corsi hanno ancora posti disponibili.
