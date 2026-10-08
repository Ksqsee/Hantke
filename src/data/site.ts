// Single source of truth for contact data and claims.
// Everything here is taken from the current maler-hantke.de and the Impressum.

export const company = {
  name: 'Tomas Hantke Malermeister GmbH',
  claim: 'von Einfach bis Edel',
  short: 'Maler Hantke',
  street: 'Bötelkamp 31',
  zip: '22529',
  city: 'Hamburg',
  district: 'Lokstedt',
  email: 'info@maler-hantke.de',
  founded: 2002,
  hrb: 'HRB 71990',
  court: 'Amtsgericht Hamburg',
  hwkNumber: '2930730181',
  vatId: 'DE 202 46 24 43',
  ceo: 'Christian Jonas',
  manager: 'Fabian Quellmalz',
};

export const phones = {
  maler: { display: '040 879 31 31', href: 'tel:+49408793131' },
  wasser: { display: '0178 357 00 38', intl: '+49 178 357 00 38', href: 'tel:+491783570038' },
};

export const reviews = {
  score: '5,0',
  source: 'Google',
  url: 'https://www.google.com/search?q=Tomas+Hantke+Malermeister+GmbH+Hamburg+Bewertungen',
  items: [
    { quote: 'Büro streichen: sauber ausgemessen, faires Angebot, ordentlich ausgeführt.', name: 'Christopher S.', context: 'Büroräume, Hamburg' },
    { quote: 'Kurzfristiger Termin für Tapezierarbeiten, alles wie besprochen. Absolute Empfehlung.', name: 'Kurt', context: 'Tapezierarbeiten' },
    { quote: 'Man hat jeden Tag Freude an ihrem Werk. Qualität, Preis, Termin — alles hat gestimmt.', name: 'D. W.', context: 'Malerarbeiten in der Wohnung' },
  ],
};

export const districts = [
  'Lokstedt', 'Niendorf', 'Stellingen', 'Eimsbüttel', 'Groß Borstel', 'Eppendorf', 'Winterhude',
  'Harvestehude', 'Rotherbaum', 'Altona', 'Ottensen', 'Bahrenfeld', 'Blankenese', 'Barmbek',
  'Norderstedt', 'Schenefeld', 'Halstenbek', 'Pinneberg',
];

// Optional form endpoint (e.g. Formspree, Getform, own API). Set PUBLIC_FORM_ENDPOINT at build time.
// Without it, the funnel falls back to a pre-filled e-mail.
export const formEndpoint: string = import.meta.env.PUBLIC_FORM_ENDPOINT ?? '';
