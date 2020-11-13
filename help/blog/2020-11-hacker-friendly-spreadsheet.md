# Grist, a hacker friendly spreadsheet

[![VisiCalc](images/visicalc.jpg)](https://www.pcjs.org/software/pcx86/app/other/visicalc/1981/){: class="side-bar-small-left"}
Spreadsheets attract people with a hacker mindset, since they reward a
little technical curiosity with a big jump in capability. Despite
that, while there are some open source spreadsheet projects, most of
the action is closed source (Excel, Airtable, etc). Grist is a solid,
modern, powerful spreadsheet that fits well into the open-source
ecology, and is as friendly to hacker-developers as it is to
hacker-users. Here are some reasons why.


![Linked sections](images/links.webp){: class="side-bar-small-right"}
Grist borrows visually from classic spreadsheets and modern
dashboards, with every view backed by relational data, filtered and
linked with other views as needed. Grist takes care of the data, and keeping
it live, so custom views are easy to add if you need something new,
using standard HTML/JS/CSS. For example, live-updating
[invoices](../examples/2020-08-invoices.md),
[mailing labels](../examples/2020-10-print-labels.md),
[goat pedigree trees](https://docs.getgrist.com/iqhzhQM66qg7/Pedigree-Example/m/fork/p/2#a1.s3.r11.c2),
 [exoplanet birthday card](https://public.getgrist.com/doc/exoplanets/m/fork),
 or [morse code quizzer](https://docs.getgrist.com/qctFijX9HUZu/Morse-Code/m/fork/p/2) that look just how you want them.

![datasette](images/datasette.png){: class="side-bar-small-left"}
Grist is a self-contained format, based on Sqlite. Grist tables
are literally Sqlite tables, which opens up all sorts of possibilities.
For example, I can take a Grist 
[example investment spreadsheet](https://docs.getgrist.com/doc/investment-research)
and publish it using Simon Willison’s [datasette](https://github.com/simonw/datasette) 
as a [Glitch remix](https://candy-tourmaline-efraasia.glitch.me/data/Investments)
without any conversion steps needed. This is a step up from exporting CSV.

Grist uses python as its formula language. Python has a good standard
library, nice syntax for working with lists, and is a favorite of data
scientists. Grist itself is written in typescript, with formula
evaluation isolated in a sandbox. (Example could maybe be Python Challenge?)

![data diff](images/diff.png){: class="side-bar-small-right"}
The Grist format makes it easy to find the most recent common ancestor
of two versions of a document, facilitating three-way comparisons and
git-style revision control. When working on a Grist spreadsheet with someone,
you can use shared real-time collaborative editing -
or you may sometimes prefer to
["fork" your spreadsheet](https://support.getgrist.com/copying-docs/#trying-out-changes),
make a set of changes, 
[compare them with the original](https://docs-s.getgrist.com/wbGWK7M9TgwJ/bridges?compare=wbGWK7M9TgwJr56ez1YWer~rUBfcL68a2W6v8V9NGApou~3)
and then land them back.  We're excited to flesh this workflow
out, and I think any programmer can see where we're going with it.

Grist code is available at [github.com/gristlabs/grist-core](https://github.com/gristlabs/grist-core) under a standard free and open source licence (Apache 2.0).
Grist software is developed by Grist Labs, which offers [free and paid
hosting plans](https://getgrist.com). Whether you choose us to host your spreadsheets,
or to run Grist yourself, you have the comfort of knowing the developers have revenue,
and you have the code and your data.

(there’s a low cost to just trailing off and listing all the good
things about Grist at this point, so could copy bullet points from
elsewhere not already covered) (e.g. attachments, live-edit collaboration).

VisiCalc screenshot from [history-computer.com](https://history-computer.com/ModernComputer/Software/Visicalc.html).

VisiCalc emulator from [pcjs.org](https://www.pcjs.org/software/pcx86/app/other/visicalc/1981/).

![Exoplanet birthday](images/exo.gif){: class="side-bar-small-right"}
