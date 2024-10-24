---
title: Crea il tuo CRM
---

# Come creare un CRM personalizzato {: data-toc-label='Intro' }

Grist è facile da usare come un foglio di calcolo, ma offre delle possibilità ulteriori quando i dati non si adattano a un semplice tabella.

Un buon esempio è quando devi tenere traccia di contatti e conversazioni. Per una ditta, potrebbero essere clienti, venditori o colloqui di lavoro. Per un individuo, potrebbero essere le aziende che ha contattato per cercare lavoro.

In questo tutorial illustriamo l'esempio del "CRM leggero", che puoi usare come modello per i tuoi contatti; quindi mostriamo come costruirlo da zero. Imparerai a:

- Aggiungere tabelle
- Collegare i dati
- Impostare i tipi delle colonne
- Creare layout personalizzati

## Studiare l'esempio

Apri il documento [Lightweight CRM](https://templates.getgrist.com/doc/lightweight-crm){: target="_blank"} che si trova tra gli Esempi e Template enlla tua [home page di Grist](https://docs.getgrist.com/).

- Vedrai la pagina dei "Contatti", che elenca i contatti sulla sinistra dello schermo.

- Fai click su un contatto per selezionarlo. Le due sezioni a destra mostrano i dettagli e la storia delle interazioni con il contatto selezionato.

Che differenza c'è con un foglio di calcolo? Queste immagini mostrano il nostro CRM di esempio a sinistra, e un normale foglio di calcolo con gli stessi dati a destra.

<div class="container-fluid">
  <div class="row">
    <div class="col-md-6">
      <div id="carousel-grist" class="carousel slide" data-interval="false">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-grist" data-slide-to="0" class="active">
          </li>
<li data-target="#carousel-grist" data-slide-to="1">
          </li>
<li data-target="#carousel-grist" data-slide-to="2">
        </li>
</ol>
</div>
<pre data-md-type="block_code" data-md-language=""><code>    &lt;!-- Wrapper for slides --&gt;
    &lt;div class="carousel-inner" role="listbox"&gt;
      &lt;div class="item active"&gt;
        &lt;img src="../images/lightweight-crm/grist-crm1.png" alt="Grist Screenshot1"&gt;
      &lt;/div&gt;
      &lt;div class="item"&gt;
        &lt;img src="../images/lightweight-crm/grist-crm2.png" alt="Grist Screenshot2"&gt;
      &lt;/div&gt;
      &lt;div class="item"&gt;
        &lt;img src="../images/lightweight-crm/grist-crm3.png" alt="Grist Screenshot3"&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Controls --&gt;
    &lt;a class="left carousel-control" href="#carousel-grist" role="button" data-slide="prev"&gt;
      &lt;span class="glyphicon glyphicon-chevron-left" aria-hidden="true"&gt;&lt;/span&gt;
      &lt;span class="sr-only"&gt;Previous&lt;/span&gt;
    &lt;/a&gt;
    &lt;a class="right carousel-control" href="#carousel-grist" role="button" data-slide="next"&gt;
      &lt;span class="glyphicon glyphicon-chevron-right" aria-hidden="true"&gt;&lt;/span&gt;
      &lt;span class="sr-only"&gt;Next&lt;/span&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
&lt;div class="col-md-6"&gt;
  &lt;div id="carousel-spreadsheet" class="carousel slide" data-interval="false"&gt;
    &lt;!-- Indicators --&gt;
    &lt;ol class="carousel-indicators"&gt;
      &lt;li data-target="#carousel-spreadsheet" data-slide-to="0" class="active"&gt;&lt;/li&gt;
      &lt;li data-target="#carousel-spreadsheet" data-slide-to="1"&gt;&lt;/li&gt;
      &lt;li data-target="#carousel-spreadsheet" data-slide-to="2"&gt;&lt;/li&gt;
    &lt;/ol&gt;

    &lt;!-- Wrapper for slides --&gt;
    &lt;div class="carousel-inner" role="listbox"&gt;
      &lt;div class="item active"&gt;
        &lt;img src="../images/lightweight-crm/spreadsheet1.png" alt="Spreadsheet Screenshot1"&gt;
      &lt;/div&gt;
      &lt;div class="item"&gt;
        &lt;img src="../images/lightweight-crm/spreadsheet2.png" alt="Spreadsheet Screenshot2"&gt;
      &lt;/div&gt;
      &lt;div class="item"&gt;
        &lt;img src="../images/lightweight-crm/spreadsheet3.png" alt="Spreadsheet Screenshot3"&gt;
      &lt;/div&gt;
    &lt;/div&gt;

    &lt;!-- Controls --&gt;
    &lt;a class="left carousel-control" href="#carousel-spreadsheet" role="button" data-slide="prev"&gt;
      &lt;span class="glyphicon glyphicon-chevron-left" aria-hidden="true"&gt;&lt;/span&gt;
      &lt;span class="sr-only"&gt;Previous&lt;/span&gt;
    &lt;/a&gt;
    &lt;a class="right carousel-control" href="#carousel-spreadsheet" role="button" data-slide="next"&gt;
      &lt;span class="glyphicon glyphicon-chevron-right" aria-hidden="true"&gt;&lt;/span&gt;
      &lt;span class="sr-only"&gt;Next&lt;/span&gt;
    &lt;/a&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code></pre>
<div data-md-type="block_html">  </div>
</div>
</div>
<p data-md-type="paragraph"> </p>
<p data-md-type="paragraph">Il problema è nella storia delle annotazioni per un contatto. In una tabella bidimensionale, hai poche opzioni su come includere un numero variabile di annotazioni. Se usi colonne multiple, il foglio di calcolo diventa rapidamente ingombrante e difficile da maneggiare.</p>
<p data-md-type="paragraph">Grist sembra più un "programma", ma è comunque versatile come un foglio di calcolo.</p>
<p data-md-type="paragraph">L'esempio del "CRM leggero" può essere usato subito così com'è (con i dati di esempio), o come un modello (con la struttura senza i dati). Ecco alcune indicazioni su come usarlo come CRM:</p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="false">
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">Per aggiungere un nuovo contatto, fai click sulla riga vuota al fondo della lista dei contatti, quindi riempi la scheda "CONTACTS Card" vuota che si apre sulla destra.</p></li>
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">Per aggiungere una nuova interazione, seleziona un contatto, quindi fai click sulla riga vuota al fondo della tabella delle interazioni. Puoi inserire la data corrente con la scorciatoia <code data-md-type="raw_html" class="keys">*⌘* + **;** (punto-e-virgola)</code> (Mac) o <code data-md-type="raw_html" class="keys">*Ctrl* + **;**   (punto-e-virgola)</code> (Windows). Quindi seleziona il tipo di interazione sfruttando l'auto-completamento e scrivi la tua nota.</p></li>
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">Puoi aggiungere degli elementi "da fare" per un contatto: nella lista delle interazioni, scegli "To-Do" nella colonna "Type", come un tipo speciale di interazione. Considera la data associata come la scadenza per questo compito.</p></li>
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">La tabella dei contatti mostra la lista degli elementi "da fare", ordinati per data di scadenza.</p></li>
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">Se usi Gmail, il comodo link "Gmail search" nella sezione "CONTACTS card" apre una finestra del browser con i risultati della ricerca su Gmail per l'indirizzo email del contatto.</p></li>
</ul>
<p data-md-type="paragraph">Puoi usare questo esempio come modello per i tuoi contatti. Con l'esempio "CRM leggero" aperto, fai click sul pulsante "Salva copia" nella barra superiore, quindi scegli l'opzione "come template". Otterrai un documento vuoto con lo stesso layout, che potrai iniziare a riempire con i tuoi dati. Se non hai effettuato l'accesso a Grist, non potrai fare una copia dell'esempio.</p>
<h2 data-md-type="header" data-md-header-level="2">Creare il tuo CRM</h2>
<p data-md-type="paragraph">Il seguito del tutorial mostra come creare un documento di questo tipo. Si tratta di un buon esercizio che insegna alcuni aspetti chiave di Grist.</p>
<p data-md-type="paragraph">Per cominciare, importeremo un file con dei contatti di esempio dalla home page di Grist. Prima di tutto, salva questo file sul tuo desktop: <a href="./unlocalized-assets/lightweight-crm-contacts.csv" data-md-type="link">lightweight-crm-contacts.csv</a>. Quindi fai click sul pulsante "Aggiungi nuovo" in alto a sinistra della home page, poi "Importa documento" e seleziona il file sul tuo desktop.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/import1.png" data-md-type="image" alt="import1"></p>
<p data-md-type="paragraph">Vedrai una tabella di contatti con dei dati di esempio. Nota che in Grist le colonne hanno un nome.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/first-table.png" data-md-type="image" alt="prima-tabella"></p>
<p data-md-type="paragraph">Rinominate questa tabella "Contatti", scrivendo il nome nella barra in alto.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/table-rename.png" data-md-type="image" alt="rinomina-tabella"></p>
<p data-md-type="paragraph">Questo è tutto ciò che serve per una semplice tabella di contatti. Puoi aggiungere delle righe, o aggiungere nuove colonne per associare più dati a ogni contatto.</p>
<h2 data-md-type="header" data-md-header-level="2">Aggiungere una tabella</h2>
<p data-md-type="paragraph">Come prossimo passo, vogliamo poter selezionare un contatto e vedere la lista delle interazioni con questo. Le interazioni dovrebbero stare in una nuova tabella di dati. L'idea è che potrà avere un numero diverso di righe rispetto alla tabella dei contatti.</p>
<p data-md-type="paragraph">Crea una nuova tabella con il pulsante verde "Aggiungi nuovo" in alto a sinistra, e poi "Aggiungi tabella vuota" nel menu.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/add-empty-table.png" data-md-type="image" alt="aggiungi-tabella-vuota"></p>
<p data-md-type="paragraph">Questa tabella rappresenterà le interazioni con i nostri contatti, quindi rinominiamola "Interazioni" facendo click sul suo nome di default ("Table1") in alto, come visto prima.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/interactions-table.png" data-md-type="image" alt="tabella-interazioni"></p>
<p data-md-type="paragraph">Una buona idea è dare nomi significativi alle colonne. In questo caso, per ciascuna interazione, dobbiamo sapere a quale Contatto si riferisce, la data, il tipo di interazione, e le note sulla conversazione. Per rinominare una colonna, fai click sull'intestazione per selezionare le colonna, e poi una seconda volta per modificare il nome. Puoi usare il tabulatore per rinominare la colonna successiva.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/col-rename.png" data-md-type="image" alt="rinomina-colonna"></p>
<p data-md-type="paragraph">Infine, fai click sul pulsante "+" a destra dell'ultima colonna per crearne una nuova, e chiamala "Note".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/col-add.png" data-md-type="image" alt="aggiungi-colonna"></p>
<h2 data-md-type="header" data-md-header-level="2">Collegare righe di dati</h2>
<p data-md-type="paragraph">Ogni riga (record) in questa tabella si riferisce a un determinato contatto. Puoi impostarlo convertendo la colonna "Contatto" in una colonna di riferimenti alla tabella "Contatti". Usando il triangolo nell'intestazione della colonna "Contatto", apri il menu e seleziona "Opzioni colonna".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/col-options.png" data-md-type="image" alt="opzioni-colonna"></p>
<p data-md-type="paragraph">Nel pannello di destra, usa il menu a tendina "Tipo colonna" per selezionare "Riferimento", quindi sotto "Dati dalla tabella" seleziona "Contatti".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/set-reference1.png" data-md-type="image" alt="set-reference1"></p>
<p data-md-type="paragraph">Ciascuna cella di questa colonna punterà a una <em data-md-type="emphasis">riga</em> della tabella "Contatti"[^foreign-key]. Anche se il riferimeno è a una intera riga, è utile vedere un dato identificativo particolare di quella riga, quindi seleziona "Compagnia" nell'opzione "Mostra colonna". Vedrai come funziona tutto questo tra poco.</p>
<p data-md-type="paragraph">[^foreign-key]: Nel mondo dei database, questo tipo di riferimento, o puntatore, si chiama "chiave esterna" (foreign key).</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/set-reference2.png" data-md-type="image" alt="set-reference2"></p>
<h2 data-md-type="header" data-md-header-level="2">Impostare altri tipi di colonna</h2>
<p data-md-type="paragraph">In Grist, ogni colonna ha un tipo. Spesso il tipo di default Text o Numeric è giusto. Per la nostra colonna "Data", un tipo migliore è Date. Fai click su qualsiasi cella nella colonna "Data", e nel pannello a destra fai click sul menu a tendina "Tipo colonna" e scegli "Date". Se vuoi, puoi scegliere anche un formato di data differente sotto il tipo.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/set-date.png" data-md-type="image" alt="imposta-data"></p>
<p data-md-type="paragraph">Ora, se fai click in una cella della colonna "Data" e inserisci "invio", troverai un comodo selettore di date.</p>
<p data-md-type="paragraph">Un altro tipo di colonna utile per noi è Choice. Le nostre interazioni saranno "Telefono", "Email" o "Di persona", ed è utile elencare queste opzioni. Fai click nel "Tipo" della colonna e, nel pannello di destra, imposta il tipo di colonna a Choice.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/set-choice.png" data-md-type="image" alt="imposta-choice"></p>
<p data-md-type="paragraph">Vedrai un campo "Valori scelta" sotto. Facci click sopra e inserisci le tue scelte, una per ciascuna riga: "Telefono", "Email", "Di persona".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/set-choice-values.png" data-md-type="image" alt="imposta-valori-scelta"></p>
<p data-md-type="paragraph">Adesso, se fai click in una cella della colonna "Tipo" e inserisci "invio", puoi scegliere tra le opzioni che hai impostato; in alternativa, inizia a scrivere e usa l'autocompletamento.</p>
<h2 data-md-type="header" data-md-header-level="2">Visualizzare i collegamenti tra tabelle</h2>
<p data-md-type="paragraph">Il prossimo passo è rendere visibile il collegamento tra le due tabelle. Apri la pagina dei "Contatti", fai click sul pulsante "Aggiungi nuovo" in alto a sinistra, quindi "Aggiungi widget a pagina". Seleziona il widget "Tabella" e i dati "Interazioni". Nel menu a tendina "Seleziona da" al fondo della finestra di dialogo, scegli "CONTATTI".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/add-widget1.png" data-md-type="image" alt="add-widget1"></p>
<p data-md-type="paragraph">Questo vuol dire che selezionare un contatto visualizzerà solo le interazioni di quel contatto. Fai click su "Aggiungi a pagina" per finire.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/two-tables.png" data-md-type="image" alt="due-tabelle"></p>
<p data-md-type="paragraph">Adesso, selezioniamo un contatto nella tabella di sinistra (per esempio, "Douglas LLC" nella quarta riga) e aggiungiamoci qualche nota relativa. Inserisci una data (prova la scorciatoia <code data-md-type="raw_html" class="keys">*⌘* + **;** (punto-e-virgola)</code> sul Mac o <code data-md-type="raw_html" class="keys">*Ctrl* + **;** (punto-e-virgola)</code> su Windows per inserire la data odierna); poi scegli un tipo di interazione, e inserisci una nota. Appena la riga è creata, la colonna "Contatto" si riempie automaticamente con "Douglas LLC", perché le due sezioni sono collegate.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/add-record1.png" data-md-type="image" alt="add-record1"></p>
<p data-md-type="paragraph">L'interazione aggiunta si vede solo quando selezioniamo "Douglas LLC". Possiamo aggiungere altre note per "Douglas LLC", o aggiungere note per altri contatti.</p>
<p data-md-type="paragraph">Possiamo adesso nascondere la colonna "Contatto" nella tabella "Interazioni": usando il menu nell'intestazione di colonna, seleziona "Nascondi colonna". Siccome le tabelle sono collegate, già sappiamo a chi si riferisce la nota.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/hide-column.png" data-md-type="image" alt="nascondi-colonna"></p>
<p data-md-type="paragraph">Per agevolare le note più lunghe, ridimensiona la colonna "Note" trascinando il margine destro della sua intestazione. Per mandare a capo le note lunghe, apri le Opzioni Colonna, e fai click sull'icona del "testo a capo".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/line-wrap.png" data-md-type="image" alt="testo-a-capo"></p>
<h2 data-md-type="header" data-md-header-level="2">Personalizzare il layout</h2>
<p data-md-type="paragraph">Quando hai diverse tabelle nella schermata, il layout può diventare un problema. Non è più conveniente tenere molte colonne nella tabella dei Contatti. È meglio disporre le cose come in una applicazione personalizzata: selezionare un contatto da una lista a sinistra, e vedere i dettagli e le interazioni di quel contatto.</p>
<p data-md-type="paragraph">Questo si può fare usando di nuovo "Aggiungi widget alla pagina". Questa volta, usiamo il widged "Scheda" per la tabella "Contatti", e impostiamo di nuovo "CONTATTI" nella scelta "Seleziona da".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/add-widget-card.png" data-md-type="image" alt="aggiungi-widget-scheda"></p>
<p data-md-type="paragraph">Puoi muovere in giro le sezioni risultanti per creare un layout conveniente. Muovi il mouse nell'angolo superiore sinistro di ciascuna sezione, fino a vedere la maniglia di trascinamento. Usa la maniglia per trascinare ogni sezione nel punto desiderato, relativamente alle altre.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/layout-drag.png" data-md-type="image" alt="trascina-layout"></p>
<p data-md-type="paragraph">Puoi anche ridimensionare le sezioni muovendo il mouse tra di esse, fino a trovare la linea tratteggiata. Trascina questa linea per ridimensionare.</p>
<p data-md-type="paragraph">Nota che gli stessi dati sono adesso mostrati in due zone dello schermo. Queste non sono copie, ma diverse presentazioni degli stessi valori: se cambi i dati in un posto, si modificano anche nell'altro.</p>
<h2 data-md-type="header" data-md-header-level="2">Personalizzare i campi</h2>
<p data-md-type="paragraph">A questo punto conviene fare pulizia: nascondere le colonne non necessarie nella tabella principale "Contatti" e ri-arrangiare i campi del widget Schede.</p>
<p data-md-type="paragraph">Un modo rapido per nascondere le colonne è usare il pannello di destra. Usando il menu "..." in alto a destra nella tabella "Contatti", seleziona "Opzioni widget". Nel pannello che si apre, trova la lista delle "Colonne visibili". Muovi il mouse sopra ciascuna per rivelare l'icona dell'occhio. Fai click su questa per nascondere tutte le colonne tranne "Company".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/hide-column-eye.png" data-md-type="image" alt="nascondi-colonna-occhio"></p>
<p data-md-type="paragraph">Per personalizzare il widget Scheda, fai click su questo. Il pannello di destra mostrerà le opzioni del caso. Puoi scegliere un tema diverso, per esempio "Compatto".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/theme-compact.png" data-md-type="image" alt="tema-compatto"></p>
<p data-md-type="paragraph">Per ridisporre i campi, fai click su "Modifica layout" nel pannello di destra. Adesso puoi trascinare i campi nella scheda, ridimensionarli o rimuoverli. Fai click su "Salva" quando hai finito.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/edit-layout.png" data-md-type="image" alt="modifica-layout"></p>
<p data-md-type="paragraph">In pochi passi siamo passati da un farraginoso, ingombrante foglio di calcolo a un sintetico, elegante registro delle tue interazioni, in una applicazione personalizzata semplice ed efficace.</p>
<h2 data-md-type="header" data-md-header-level="2">"Da fare" per i contatti</h2>
<p data-md-type="paragraph">Il nostro esempio del "CRM leggero" ha un altro asso nella manica. La colonna "Tipo" nella tabella delle interazioni ha un'opzione extra, "To-Do". Dopo aver parlato con un contatto, puoi aggiungere una nota ulteriore su cosa devi fare per la prossima interazione, e la data di scadenza.</p>
<p data-md-type="paragraph">La tabella "Contatti" visualizza questi "To-Do" e li ordina per data di scadenza. Così puoi vedere subito la prossima cosa da fare.</p>
<p data-md-type="paragraph">Se ti interessa come realizzare questo componente, espandi la sezione qui sotto. Se questa è la tua prima volta con Grist, sentiti libero di saltarla.</p>
<h2 data-md-type="header" data-md-header-level="2">
<a data-md-type="raw_html" style="color: inherit; text-decoration: none" data-toggle="collapse" href="#todo-tasks" role="button" aria-expanded="false" aria-controls="todo-tasks">&gt; Impostare i compiti "da fare"</a> {: data-toc-label='' }</h2>
<div data-md-type="block_html">
<div class="collapse" id="todo-tasks" markdown="1"></div>
<p data-md-type="paragraph">Per impostare gli elementi "To-Do" come nell'esempio, seleziona le opzioni di colonna per la colonna "Tipo" della tabella "Interazioni", e aggiungi una nuova opzione "To-Do" alla lista delle scelte:</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/add-todo-choice.png" data-md-type="image" alt="aggiungi-opzione-todo"></p>
<p data-md-type="paragraph">Prendiamo il nostro contatto "Douglas LLC" e aggiungiamogli un "To-Do":</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/add-todo-item.png" data-md-type="image" alt="aggiungi-elemento-todo"></p>
<p data-md-type="paragraph">Nella tabella "Contatti", aggiungi due nuove colonne:</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/col-add2.png" data-md-type="image" alt="col-add2"></p>
<p data-md-type="paragraph">Rinominale "Scadenza" e "To-Do".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/col-rename2.png" data-md-type="image" alt="col-rename2"></p>
<p data-md-type="paragraph">Entrambe le colonne sono calcolate usando delle formule. Grist è molto bravo in questo, perché accetta la sintassi completa di Python e anche molte formule di Excel. In Grist, una formula si applica sempre a una intera colonna di dati. Per inserire una formula, fai click su una cella della colonna "Scadenza" e inserisci il segno "=":</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/formula-start.png" data-md-type="image" alt="formula-start"></p>
<p data-md-type="paragraph">In questa formula, vogliamo intercettare tutte le Interazioni del Contatto corrente, il cui Tipo è "To-Do": quindi selezioniamo quella con la Data più recente. Usando la sintassi di Python, la formula è:</p>
<pre data-md-type="block_code" data-md-language="python"><code class="language-python">items = Interactions.lookupRecords(Contact=$id, Type="To-Do")
return min(items.Date) if items else None
</code></pre>
<p data-md-type="paragraph">Incolla o scrivi la formula. Quando devi scrivere una formula su più righe, usa <code data-md-type="codespan">Maiusc+Invio</code> per aggiungere nuove righe, e <code data-md-type="codespan">Invio</code> per salvare.</p>
<p data-md-type="paragraph">È anche il momento giusto per cambiare il tipo di colonna in "Date". Apri le opzioni di colonna, e seleziona "Date" come tipo. Puoi scegliere il formato della data direttamente sotto il tipo.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/date-format.png" data-md-type="image" alt="formato-data"></p>
<p data-md-type="paragraph">Per la colonna "To-Do", inserisci una formula analoga. In caso di diversi elementi To-Do, questa formula li concatena, separandoli con degli a-capo. Fai click sulla colonna "To-Do", inserisci "=" per iniziare la formula e poi</p>
<pre data-md-type="block_code" data-md-language="python"><code class="language-python">items = Interactions.lookupRecords(Contact=$id, Type="To-Do")
return "\n".join(items.Notes)
</code></pre>
<p data-md-type="paragraph">Adesso gli elementi To-Do che abbiamo inserito prima saranno visibili nella tabella principale dei Contatti.</p>
<p data-md-type="paragraph">Nota che i valori in queste colonne sono in sola lettura, dal momento che sono calcolati. Per cambiare la data di scadenza, trova l'elemento To-Do corrispondente che hai creato nella tabella delle Interazioni.</p>
<h3 data-md-type="header" data-md-header-level="3">Ordinare le tabelle {: data-toc-label='' }</h3>
<p data-md-type="paragraph">Preferiamo che i contatti che hanno degli elementi To-Do siano visualizzati in cima, in ordine di data di scadenza. Fai click sul triangolo nell'intestazione della colonna "Scadenza", e seleziona "Ordina A-Z".</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/sorting.png" data-md-type="image" alt="ordinare"></p>
<p data-md-type="paragraph">Di default, le impostazioni di ordinamento non sono salvate. Il pulsante verde evidenziato, in alto a destra della tabella dei Contatti, ce lo ricorda. Per mantenere questo ordinamento quando apri di nuovo il documento, salvalo facendo click sul pulsante verde e selezionando "Salva". Puoi anche salvare facendo click sul segno "check" verde a destra dell'icona del filtro.</p>
<p data-md-type="paragraph"><img src="images/lightweight-crm/section-menu.png" data-md-type="image" alt="section-menu"></p>
<div data-md-type="block_html"></div>
</div>
<h2 data-md-type="header" data-md-header-level="2">Altre funzionalità</h2>
<p data-md-type="paragraph">Grist ha molte funzionalità utili, alcune delle quali sono usate nell'esempio del "CRM leggero". Per saperne di più su ciascuna di esse, segui i link alla documentazione.</p>
<ul data-md-type="list" data-md-list-type="unordered" data-md-list-tight="false">
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">Le colonne di testo possono essere visualizzate come <a href="https://support.getgrist.com/col-types/#hyperlinks" data-md-type="link">hyperlink</a>. L'esempio ne fa uso in due punti: per il campo "website", e per il link (costruito in base a una formula) alla <a href="https://community.getgrist.com/t/pull-up-gmail-history-for-a-particular-contact/517" data-md-type="link">ricerca su Gmail</a> per la mail del contatto. Quest'ultimo torna comodo se usi Gmail.</p></li>
<li data-md-type="list_item" data-md-list-type="unordered"><p data-md-type="paragraph">Grist supporta gli <a href="https://support.getgrist.com/col-types/#attachment-columns_" data-md-type="link">allegati</a>. Nell'esempio, c'è un campo "allegato" per ciascun contatto, che può essere usato per conservare l'immagine di un biglietto da visita, per esempio.</p></li>
</ul>
<p data-md-type="paragraph">Per le esigenze di lavoro, avrai bisogno di più cose. I software CRM specializzati offrono moltissime funzionalità. Il loro problema è la complessità: cercare di soddisfare le esigenze di molti utenti diversi rende il prodotto difficile da usare. Il bello di Grist è che puoi iniziare da una cosa semplice, e aggiungere complessità solo quando ti serve, e non oltre.</p>
<p data-md-type="paragraph">Gli altri tutorial mostrano come modellizzare dati più complessi, analizzare i dati e aggiungere grafici, e molto altro ancora.</p>
</div>


