# Crederai — Sito vetrina agenzia web

Sito statico dell'agenzia **Crederai** (crederai.com): siti web professionali per PMI italiane, Roma e tutta Italia.

## Struttura

```
/                     Home
/servizi/             Servizi
/lavori/              Portfolio (5 case study)
/lavori/<slug>/       Pagine singolo case study
/chi-siamo/           Chi siamo
/contatti/            Form richiesta preventivo
/grazie/              Thank-you page (noindex)
/privacy-policy/      Privacy Policy
/cookie-policy/       Cookie Policy
/404.html             Pagina non trovata
```

## Stack

- HTML/CSS/JS statico, zero framework e zero build step
- Font: Plus Jakarta Sans + Inter (Google Fonts)
- Form: Formspree (free tier) — vedi TODO
- Analytics: GA4 in consent mode, caricato solo dopo consenso cookie
- Cookie banner GDPR nativo (js/main.js)
- Dati strutturati schema.org (LocalBusiness/ProfessionalService + CreativeWork)

## Sviluppo locale

Basta un server statico qualsiasi, es.:

```
python -m http.server 8000
```

I link interni usano percorsi assoluti (`/css/...`), quindi il sito va servito dalla root, non aperto come file.

## TODO prima del lancio

- [ ] Registrare crederai.com e collegarlo all'hosting (GitHub Pages / Cloudflare Pages)
- [ ] Creare form su formspree.io e sostituire `FORM_ID` in `contatti/index.html`
- [ ] Creare proprietà GA4 e sostituire `G-XXXXXXXXXX` in `js/main.js`
- [ ] Completare nome e bio di Persona B in `chi-siamo/index.html`
- [ ] Completare la Privacy Policy con ragione sociale e P.IVA
- [ ] Sostituire le copertine gradient dei case study con screenshot reali (WebP)
- [ ] Google Search Console: verifica proprietà + invio sitemap
- [ ] Google Business Profile

## Deploy su GitHub Pages

Il sito è pronto per GitHub Pages (branch `main`, root). La pagina `404.html` in root viene servita automaticamente da Pages per gli URL inesistenti.
