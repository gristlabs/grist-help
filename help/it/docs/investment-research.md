---
title: Analizzare e visualizzare
---

# Analizzare e visualizzare i dati {: data-toc-label='' }

Grist offre diversi modi efficaci di analizzare e visualizzare i dati. In questo tutorial, imparerai a:

- Creare tabelle sommario
- Creare e configurare grafici
- Collegare i grafici dinamicamente

Per illustrare queste funzionalità, useremo l'esempio "Ricerca di investimento"[^doc_desc] che include aziende e investimenti effettuate in esse dal 2013. Diamo prima uno sguardo al documento di esempio, quindi parleremo di come costruirlo da zero, in modo da applicare questi strumenti ai tuoi dati.

[^doc_desc]: Scarica [crunchbase_companies_ny.csv](./unlocalized-assets/investment-research/crunchbase-companies-ny.csv) e [crunchbase_investments_ny.csv](./unlocalized-assets/investment-research/crunchbase-investments-ny.csv). Questi dati di esempio comprendono solo le "aziende" e gli "investimenti", e solo le aziende di New York per mantenere i dati più snelli e veloci da usare. Il dataset viene da [Kaggle](https://www.kaggle.com/mauriciocap/crunchbase2013).

## Studiare l'esempio

Apri il documento “[Investment Research](https://templates.getgrist.com/doc/investment-research){: target="_blank"}”, che si trova negli Esempi e Tutorial nella home page di Grist. La prima cosa che vedrai è una "Overview". Questa pagina contiene due grafici accanto a due tabelle.

![1-overview-page](images/investment-research/1-overview-page.png)

- Il grafico a torta in alto mostra la distribuzione degli investimenti per categoria. La tabella accanto ha gli stessi dati in forma tabulare.
- Sotto c'è un grafico a barre che mostra il totale degli investimenti effettuati per anno. La tabella accanto mostra gli stessi dati in forma tabulare.

Questi grafici e tabelle sono esempi di "tabelle sommario" (riassuntive), che illustriamo qui sotto.

La pagina successiva, "Breakdowns", contiene altre due tabelle e grafici, ma questi sono collegati dinamicamente e permettono di analizzare i dati più nel dettaglio.

![2-breakdowns-page](images/investment-research/2-breakdowns-page.png)

- In alto c'è una tabella che mostra il finanziamento totale per anno (la stessa tabella che abbiamo visto nella pagina precedente). Questa serve a pilotare il grafico accanto. Quando fai click su un anno della tabella, il grafico si aggiorna per mostrare la distribuzione degli investimenti in quell'anno.

- Allo stesso modo, la tabella sottostante mostra gli investimenti per categoria. Quando fai click su una categoria, il grafico si aggiorna con lo storico degli investimenti in quella categoria, nel corso degli anni.

Nota l'efficienza di questo sistema, e quante informazioni puoi ricavare. Per esempio, puoi vedere che la categoria Advertising ha ricevuto molti investimenti a NY dal 2007, ma è stata superata da E-commerce nel 2013; la categoria Fashion ha avuto un picco notevole nel 2011.

Nella pagina successiva, "Company details", possiamo vedere i dati granulari di questo dataset.

![3-company-details](images/investment-research/3-company-details.png)

Qui vediamo una lista di aziende e le categorie in cui rientrano. Ogni azienda ha un link che punta alla sua scheda sul sito di Crunchbase. Quando selezioni una azienda, viene mostrata una scheda con i dettagli, e una lista di tutti gli investimenti che ha ricevuto.

Qui incominciamo a vedere il potere di Grist. Il dataset originale è un foglio di calcolo "piatto" di aziende, e un foglio di calcolo ancora più grande per gli investimenti. Mostrando i dati in modo grafico, questi prendono vita e diventano più utili ed esplicativi.

## Come posso costruirlo? {: data-toc-label='' }

Con Grist, presentare i tuoi dati in forma grafica richiede solo alcuni facili passaggi. Cominciamo dal principio.

## Procurati i dati

Importiamo i dati: sono due file CSV, che diventeranno ciascuno una tabella. Per seguire il tutorial, salva per prima cosa [crunchbase_companies_ny.csv](./unlocalized-assets/investment-research/crunchbase-companies-ny.csv) e [crunchbase_investments_ny.csv](./unlocalized-assets/investment-research/crunchbase-investments-ny.csv) nel tuo computer. Quindi, crea un documento Grist importando il primo file dalla home page.

![4-first-import](images/investment-research/4-first-import.png)

Quindi, importa il secondo con il pulsante "Aggiungi nuovo" e l'opzione "Importa da file".

![5-second-import](images/investment-research/5-second-import.png)

Nella finestra di dialogo, fai click sul pulsante "Importa" in basso a sinistra.

Le tabelle importate si chiameranno "crunchbase_companies_ny" e "crunchbase_investments_ny". Fai click sul nome sopra la tabella per rinominarle "Companies" (Aziende) e "Investments".

![6-rename-page](images/investment-research/6-rename-page.png)

## Rendili relazionali

Il potere di Grist si basa sul fatto che i dati hanno una struttura.

Osserva la tabella Investments. Ordina la prima colonna e noterai quante ripetizioni ci sono: ogni riga ha tutte le informazioni sull'azienda, che duplicano quelle della tabella Companies, e sono ripetute più volte qui, ogni volta che diversi investimenti riguardano la stessa azienda.[^denormalized]

[^denormalized]: Questo tipo di duplicazione è frequente nei fogli di calcolo. I dati in questa forma si definiscono "denormalizzati".

In realtà ciascun investimento si applica a una unica azienda. Ogni riga della tabella degli investimenti dovrebbe solo contenere un riferimento all'azienda, e poi i dati specifici di quell'investimento.

Per ottenere questo, cerchiamo una colonna che identifichi una azienda in modo univoco. Nel nostro dataset, la prima colonna "company_permalink" è quella più adatta[^unique_id]. Fai click sulla freccia nell'intestazione della colonna e poi "Opzioni colonna". Fai clic sulla freccia accanto a "Testo" nel "Tipo colonna", nel pannello di destra, e seleziona "Riferimento" dalla lista.

[^unique_id]: Se non esiste una colonna che identifica univocamente, puoi costruirne una con una formula.

*![7-set-reference](images/investment-research/7-set-reference.png)*
{: .screenshot-half }

Grist suggerisce subito di renderla un "Riferimento" alla tabella Companies, e mostra la colonna "Permalink" della azienda collegata. Fai click su "Applica" per salvare questa conversione.

![8-preview-reference](images/investment-research/8-preview-reference.png)

Rinominiamo anche questa colonna a “Company”.

In Grist, i dati duplicati non sono necessarie e raccomandiamo di eliminarli. Usando la scorciatoia `Option-Meno` (Mac) o `Alt-Meno` (Windows) si possono rimuovere le colonne rapidamente. Dopo aver cancellato le colonne da “company_name” a “company_city”, ecco che cosa resta:

<span class="screenshot-large">*![9-remove-columns](images/investment-research/9-remove-columns.png)*</span>

I dati eliminati non sono perduti, dal momento che erano doppi: sono sempre disponibili nella tabella Companies e possono essere utilizzati nelle formule della tabella Investment, per esempio `$Company.company_xxx`.

In effetti, c'è un modo semplice per creare questo tipo di formula. Proviamo a crearne una che ci servirà più tardi. Fai click sull'intestazione della colonna "Company". Nel pannello di destra, vedrai una sezione "Aggiungi colonna collegata". Fai click su "Aggiungi colonna", per aggiungere la colonna "category_code".

![10-add-referenced1](images/investment-research/10-add-referenced1.png)

Una nuova colonna sarà aggiunta alla tabella, con la formula `$Company.category_code`. Per ciascun investimento, mostra il “category_code” dell'azienda collegata.

![11-add-referenced2](images/investment-research/11-add-referenced2.png)

## Riassumili

La funzionalità-chiave che stavi aspettando è la possibilità di riassumere i dati. [Le tabelle sommario](summary-tables.md) sommano tutte le colonne numeriche in una tabella di dati. Vogliamo trovare la somma per la colonna `funding_total_usd` nella tabella Companies. Controlla che il tipo della colonna sia impostato a "Numerico" e formattato con `$`.

![11.5-set-numeric](images/investment-research/11.5-set-numeric.png)

Per usare questa funzionalità, aggiungiamo una tabella che mostra le aziende raggruppate per "category_code".

Nel menu "Aggiungi nuovo" in alto a sinistra, scegli "Aggiungi pagina". Nella finestra di dialogo seleziona "Tabella" e "Companies", quindi usa l'icona di sommatoria (<span class="grist-icon" style="--icon: var(--icon-Pivot)"></span>) per scegliere le colonne da "Raggruppare per..." , ovvero le colonne rispetto a cui riassumere i dati.

![12-start-summary](images/investment-research/12-start-summary.png)

Se non scegli nessuna colonna, otterrai semplicemente una singola riga di totali. Se raggruppi per "category_code", ottieni una riga per ogni valore distinto di "category_code". Prova a fare questo, quindi fai click su "Aggiungi pagina".

![13-summary-added](images/investment-research/13-summary-added.png)

Assomiglia a una tabella pivot di Excel. Ogni riga rappresenta un gruppo di record della tabella originaria (Companies) che hanno un certo valore di "category_code". Il titolo della tabella (“COMPANIES [by category_code]”) serve a ricordarcelo.

Queste tabelle sommario possono (e dovrebbero!) usare delle formule. Infatti, le colonne che hai scelto al momento di creare la tabella sono degli identificatori dei vari raggruppamenti. Tutte le altre colonne sono delle formule: ovvero, sono calcolate. In queste formule, il gruppo di record originari che viene riassunto in una riga, è disponibile come valore “$group”.

Per esempio, vedrai una colonna creata automaticamente, che si chiama "count". Se inserisci "Invio", vedrai la formula sottostante -- `len($group)` -- che calcola il numero di record in quel raggruppamento, ovvero il numero di aziende in quella categoria.

![14-summary-count-formula](images/investment-research/14-summary-count-formula.png)

Per le colonne numeriche nella tabella sorgente, la tabella sommario riceve automaticamente una colonna (con lo stesso nome) che contiene la somma, con una formula come `SUM($group.funding_total_usd)`.

![15-summary-sum-formula](images/investment-research/15-summary-sum-formula.png)

!!! note "Nota per i fan di Python" `$group{/code0} è un oggetto speciale in Python: è una collezione iterabile di record. Usare un attributo come {code1}$group.A` è una scorciatoia per la lista dei valori della colonna <code>A</code> in tutti i record del gruppo, ovvero è più o meno lo stesso di `[r.A for r in $group]`.

Talvolta non ha senso sommare i valori. Per esempio, la somma di "founded_year" (anno di fondazione) non è significativa. Conviene cancellare questa colonna e tutte quelle che non ci servono, fino a restare con "funding_total_usd".

Dal momento che questa colonna contiene dei numeri grandi, è il momento di considerare la sezione "Formato numero" nella sua configurazione e fare click su `,` (o magari anche `$`) per formattare i numeri in modo più leggibile.

![16-summary-remove-columns](images/investment-research/16-summary-remove-columns.png)

Aggiungiamo una seconda tabella sommario. Ancora una volta, "Aggiungi nuovo" e poi "Aggiungi widget a pagina". Per ottenere una sommatoria per anno, sotto "Seleziona dati" scegli la tabella Investments e, di nuovo, usa il suo simbolo di sommatoria (∑) per scegliere la colonna in base a cui riassumere: ovvero, "funded_year". Infine, fai click su "Aggiungi a pagina".

![17-add-summary2](images/investment-research/17-add-summary2.png)

Questo genera una seconda tabella sommario che mostra un record per ciascun anno, ciascuno che rappresenta un gruppo di righe di Investments per quell'anno. La colonna che ci serve qui è "raised_amount_usd", ovvero la somma degli investimenti fatti in quell'anno. Cancelliamo tutte le altre colonne non necessarie.

Noterai alcuni valori colorati in "raised_amount_usd". Questo perché Grist suppone che i valori della colonna siano degli interi. I numeri colorati sono i casi in cui il numero è troppo grande per essere gestito in Javascript. Per correggere il problema, il tipo della colonna dovrebbe essere cambiato in "Numerico" (perdendo precisione, ma guadagnando nella capacità di rappresentare numeri molto piccoli o molto grandi). Cambia il tipo a "Numerico", nelle "Opzioni colonna".

Ancora una volta, questo è il momento buono per scegliere una formattazione più leggibile per i numeri della colonna, e per renderla più ampia, per farci stare i numeri più grandi.

![18-change-int-to-numeric](images/investment-research/18-change-int-to-numeric.png)

## Grafici di vario tipo

Puoi ricavare grafici da qualsiasi dato. In questa pagina, vogliamo aggiungere una versione grafica di ciascuna tabella sommario. Parti di nuovo dal pulsante "Aggiungi nuovo", scegli "Aggiungi widget alla pagina", poi "Grafico" come tipo di widget, e la stessa tabella (Companies) e colonna-chiave ("category_code") come prima. Quindi, fai click su "Aggiungi a pagina".

![19-add-chart1](images/investment-research/19-add-chart1.png)

Per un grafico, il passo successivo è personalizzarlo.

Apri il pannello di destra, e scegli la scheda "Grafico" e la sottoscheda "Widget".

Per questo primo grafico, scegli "Torta" come "Tipo grafico". Per costruirlo, prima seleziona un'etichetta, quindi scegli una serie da riassumere nel grafico a torta. Siccome vogliamo mostrare "category_code" come etichette, seleziona questa serie dal menu a tendina "Etichette". Poi vogliamo usare "funding_total_usd" come valori, quindi questo dovrebbe comparire in cima alla lista delle "serie" nel pannello di configurazione. Muovendo il mouse sopra gli elementi della lista, usa la doppia barra verticale che appare per trascinare e rilasciare una serie in cima alla lista. In alternativa, puoi nascondere le altre serie dalla lista facendo click sull'icona del cestino.

![20-chart-vis-fields](images/investment-research/20-chart-vis-fields.png)

Adesso aggiungi un grafico che mostra il trend per anno. Aggiungi un altro widget alla pagina, seleziona "Grafico" come tipo di widget, "Investments" sotto "Seleziona dati", fai click sulla sommatoria (<span class="grist-icon" style="--icon: var(--icon-Pivot)"></span>) per raggruppare per "funded_year”, e click su "Aggiungi a pagina".

Per personalizzare il grafico, manteniamo il tipo "Grafico a barre". Dal menu a tendina "X-Axis", scegli la colonna da usare per l'asse X (orizzontale). Come "Serie" scegli una seconda colonna (ed eventualmente altre) per l'asse Y (verticale).

![21-add-chart2](images/investment-research/21-add-chart2.png)

Puoi ri-configurare le sezioni sullo schermo fino a raggiungere uno schema che vorresti vedere in una dashboard. Muovi il mouse in alto a sinistra di ciascuna sezione fino a vedere l'icona della maniglia di trascinamento. Usa questa per trascinare ciascuna sezione nel posto voluto rispetto alle altre. Quando hai terminato, rinomina la pagina passando con il mouse sul nome della pagina, quindi facendo click sull'icona con i tre punti per aprire il menu. Scegli "Rinomina" e cambia il nome a "Overview".

![22-rearrange-widgets](images/investment-research/22-rearrange-widgets.png)

## Grafici dinamici

Se hai già letto il nostro tutorial su come collegare i dati, questa fase verrà da sé. I grafici sono semplicemente un altro modo per vedere i dati, e si possono collegare proprio come le tabelle.

Nel nostro esempio, aggiungeremo una nuova pagina con una tabella sommario: scegli il widget "Tabella", i dati "Investments", raggruppa per "funded_years" e fai click su "Aggiungi pagina".

![23-dynamic-start](images/investment-research/23-dynamic-start.png)

Rinominamo questa pagina “Breakdowns”.

Adesso aggiungi un widget a questa pagina, scegliendo il widget "Grafico", e come dati "Investments". In "Raggruppa per", scegliamo *due* colonne: “Company_category_code” e “funded_year”. Questo è il motivo per cui abbiamo aggiunto la colonna “Company_category_code” poco fa. Possiamo raggruppare investimenti per i codici delle categorie, solo se abbiamo questo codice per ciascun investimento.

Il menu a tendina "Seleziona da" al fondo a sinistra della finestra di dialogo elenca i widget già presenti nella pagina, che possono controllare la selezione dei dati nel grafico che stiamo aggiungendo. Scegli “INVESTMENTS [by funded_year]”, e fai click su "Aggiungi a pagina".

![24-dynamic-chart-start](images/investment-research/24-dynamic-chart-start.png)

!!! tip "" **Nota:** Se devi fare cambiamenti in un widget che hai già inserito, per esempio cambiare il tipo di widget, o il suo "Raggruppa per", o "Seleziona da", puoi sempre farlo dalla sotto-scheda "Dati" nelle impostazioni del widget, usando il pulsante "Cambia la selezione dati".

Vogliamo poter selezionare un anno, e mostrare un grafico a torta che mostra il totale per ciascuna categoria, in quell'anno. L'opzione "Seleziona da" che scegliamo garantisce che solo i dati dell'anno prescelto verranno usati. Tutto ciò che resta è cambiare il tipo di grafico in "Torta", e impostare l'etichetta a "Company_category_code" e le "Serie" a "raised_amount_usd".

![25-dynamic-vis-fields](images/investment-research/25-dynamic-vis-fields.png)

Nota: i grafici hanno bisogno di più spazio; quindi, se lo schermo è piccolo, si vedono meglio chiudendo i pannelli laterali agendo sulle icone di apertura (<span class="grist-icon" style="--icon: var(--icon-PanelLeft)"></span>, <span class="grist-icon" style="--icon: var(--icon-PanelRight)"></span>).

Ordinamo inoltre la tabella per “funded_year”.

![26-dynamic-table-sort](images/investment-research/26-dynamic-table-sort.png)

Per quanto riguarda l'ordinamento, il pulsante evidenziato sopra la tabella ti ricorda che le impostazioni non sono salvate automaticamente. Per questo, fai click sul pulsante verde e seleziona "Salva".

![27-dynamic-table-sort-save](images/investment-research/27-dynamic-table-sort-save.png)

Qual è il risultato? Possiamo cliccare sugli anni (o usare i tasti freccia) e vedere la distribuzione per categoria che cambia.

!!! tip "" **Nota:** Se fare click sugli anni non cambia il grafico, vuol dire che non è collegato. Puoi controllare e correggere agendo sul menu con i tre punti in alto a destra del grafico, facendo click su "Selezione dati" e assicurandoti che il menu a tendina "Seleziona da" sia impostato a "INVESTMENTS [by funded_year]".

Per completare l'esempio, aggiungeremo ancora due sezioni alla pagina "Breakdown". Una sarà una tabella che elenca le categorie delle aziende; collegato a questa, un grafico che mostra gli investimenti per la categoria nel corso degli anni.

Per aggiungere la tabella delle categorie, usa il pulsante "Aggiungi widget alla pagina"; seleziona il widget "Tabella"; i dati da Investments; il raggruppamento per "Company_category_code".

![28-dynamic-table2](images/investment-research/28-dynamic-table2.png)

La colonna “funded_year” della tabella risultante non ha significato, e dovrebbe essere eliminata.

Come ultimo passaggio, vogliamo un altro grafico. Dobbiamo ricordarci di raggruppare sia per “Company_category_code” sia per “funded_year”, e impostare un widget adeguato nel "Seleziona da". Siccome ci sono due tabelle in questa pagina, hai la scelta su quale dovrà alimentare il grafico. In questo caso, scegli il widget che abbiamo appena aggiunto: “INVESTMENTS [by Company_category_code]”.

![29-dynamic-chart2](images/investment-research/29-dynamic-chart2.png)

Come prima, dobbiamo configurare selezionando "Grafico a barre" come tipo di grafico; nel menu a tendina per l'asse X scegliamo “funded_year”; come "Serie", prendiamo "raised_amount_usd” e nascondiamo il resto.

![30-breakdowns-page-done](images/investment-research/30-breakdowns-page-done.png)

Adesso possiamo fare click sulle categorie, e vedere lo storico degli investimenti per ciascuna.

## I prossimi passi

Se non ti è chiaro come abbiamo creato la pagina "Company details" che si trova in questo esempio, leggi uno dei tutorial precedenti: "Come costruire un CRM leggero", o "Gestire la tua attività in Grist".

E questo è tutto! Adesso vai ad analizzare un po' di dati!


