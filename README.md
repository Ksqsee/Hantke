# Maler Hantke — Website

B2C-Website für die Tomas Hantke Malermeister GmbH (Malerei + Hantke Bautrocknung), gebaut als Conversion-Funnel entlang der Value Equation (Hormozi):

| Hebel | Umsetzung |
| --- | --- |
| Traumergebnis ↑ | „Ein fertiger Raum“ – Trocknung **und** Wiederherstellung aus einer Hand |
| Wahrscheinlichkeit ↑ | HRB, HWK-Nr., 5,0 Google, Messprotokoll, fester Ansprechpartner, vier Zusagen |
| Wartezeit ↓ | Rückmeldung am selben Werktag (live berechnet), Sofort-Checkliste, Notfall-Leiste |
| Aufwand ↓ | 4–5 Klicks im Funnel, nur Telefon Pflicht, Fotos optional, eine Firma statt drei |

## Stack

- [Astro 5](https://astro.build) (statisch), GSAP + ScrollTrigger, Lenis
- Schrift: Hanken Grotesk (selbst gehostet über `@fontsource`)
- Design-Referenzen (Mobbin): Ditto (gemalte Highlights + Tags), Preply (vollflächige Farbflächen), IFTTT/Duolingo (Farbkacheln)

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run deploy   # build + wrangler deploy (Cloudflare Worker "hantke-website", static assets)
```

## Seiten

`/` · `/malerarbeiten` · `/wasserschaden` · `/ueber-uns` · `/karriere` · `/impressum` · `/datenschutz` · `/bildnachweise`

## Formulare

Die Funnels (`src/components/Funnel.astro`, Inhalte in `src/data/funnels.ts`) senden an `PUBLIC_FORM_ENDPOINT` (siehe `.env.example`, z. B. Formspree/Getform/eigene API, multipart inkl. Fotos). Ohne Endpoint öffnet sich eine vorausgefüllte E-Mail an info@maler-hantke.de.

## Vor dem Livegang

- [ ] `PUBLIC_FORM_ENDPOINT` setzen
- [ ] Datenschutz: Formular-Dienstleister eintragen (gelb markiert in `src/pages/datenschutz.astro`)
- [ ] Platzhalter-Fotos (Wikimedia Commons, CC-Lizenzen, Nachweis unter `/bildnachweise`) durch echte Baustellenfotos ersetzen: `public/img/<name>-800.webp` und `-1600.webp`, Eintrag in `src/data/credits.json` entfernen
- [ ] Google-Bewertungslink in `src/data/site.ts` auf das echte Profil setzen

Alle Inhalte und Aussagen stammen von der bisherigen maler-hantke.de (zentral in `src/data/site.ts` und `src/data/content.ts`).
