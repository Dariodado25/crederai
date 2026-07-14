# Crederai — Sito vetrina agenzia web

Sito dell'agenzia **Crederai**: siti web professionali per PMI italiane, Roma e tutta Italia.

## Stack (v2)

Redesign completo su un unico file HTML compilato da un runtime custom, in sostituzione della v1 statica multi-pagina:

- `index.html` — markup + componenti, con binding `{{ }}`, `sc-if`/`sc-for` e stato via `support.js`
- `support.js` — runtime che compila `index.html` (routing via hash `#servizi`, `#lavori`, ecc.) — non modificare a mano
- `assets/` — immagini di sfondo ottimizzate (webp) e screenshot case study
- Font: Plus Jakarta Sans + Inter (Google Fonts)

## Sviluppo locale

Il file va servito da un server HTTP (non apribile da `file://`):

```
node -e "require('http').createServer((q,r)=>{const fs=require('fs'),p=require('path');let f=q.url.split('?')[0];if(f==='/')f='/index.html';fs.readFile(p.join(__dirname,f),(e,d)=>{if(e){r.writeHead(404);r.end();return}r.end(d)})}).listen(8934)"
```

Poi apri `http://localhost:8934/`.

## Da fare prima del lancio definitivo

La v2 è un redesign grafico ancora in corso: le seguenti funzionalità della v1 **non sono ancora state riportate** e vanno ricollegate prima di sostituire il sito in produzione:

- Google Analytics 4 in consent mode
- Cookie banner GDPR + pagine Privacy Policy / Cookie Policy
- Form di contatto collegato a un backend reale (Formspree o altro)
- `robots.txt`, `sitemap.xml`, pagina 404 dedicata
- Testimonianze, loghi clienti e foto reali dei progetti (i case study sono ancora placeholder grafici)
