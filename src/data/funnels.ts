// Funnel definitions. One question per screen keeps effort low (Hormozi: effort & sacrifice ↓),
// the urgent interstitial shortens time-to-help for active water damage (time delay ↓).

export type Option = { value: string; label: string; hint?: string; set?: Record<string, string> };
export type Step = {
  id: string;
  kind: 'single' | 'multi' | 'info' | 'contact';
  title: string;
  help?: string;
  options?: Option[];
  when?: Record<string, string[]>; // show only if field value is in list
  unless?: Record<string, string[]>; // hide if field value is in list
  skipIfSet?: boolean;
  tone?: 'urgent';
  tipOn?: Record<string, string>; // option value -> tip text shown after choosing
};
export type Funnel = { id: string; label: string; subjectPrefix: string; steps: Step[] };

const wasserSteps: Step[] = [
  {
    id: 'art',
    kind: 'single',
    title: 'Was ist passiert?',
    help: 'Eine Antwort reicht.',
    skipIfSet: true,
    options: [
      { value: 'Rohrbruch', label: 'Rohrbruch' },
      { value: 'Wasch-/Spülmaschine', label: 'Waschmaschine oder Spülmaschine' },
      { value: 'Undichte Leitung', label: 'Undichte Leitung' },
      { value: 'Hochwasser/Starkregen', label: 'Hochwasser oder Starkregen' },
      { value: 'Feuchte Wand/Geruch', label: 'Feuchte Wand oder Geruch' },
      { value: 'Neubau/Estrich', label: 'Neubau, Estrich soll trocknen' },
      { value: 'Unklar', label: 'Weiß ich nicht genau' },
    ],
  },
  {
    id: 'laeuft',
    kind: 'single',
    title: 'Läuft noch Wasser nach?',
    unless: { art: ['Feuchte Wand/Geruch', 'Neubau/Estrich'] },
    options: [
      { value: 'Ja', label: 'Ja, es läuft noch' },
      { value: 'Nein', label: 'Nein, ist abgestellt' },
      { value: 'Unsicher', label: 'Bin nicht sicher' },
    ],
  },
  {
    id: 'sofort',
    kind: 'info',
    tone: 'urgent',
    title: 'Bitte zuerst das Wasser stoppen.',
    when: { laeuft: ['Ja', 'Unsicher'] },
  },
  {
    id: 'versicherung',
    kind: 'single',
    title: 'Schon bei der Versicherung gemeldet?',
    help: 'Bei Leitungswasser zahlt sie meistens.',
    unless: { art: ['Neubau/Estrich'] },
    options: [
      { value: 'Gemeldet', label: 'Ja, ist gemeldet' },
      { value: 'Noch nicht', label: 'Noch nicht' },
      { value: 'Unklar', label: 'Weiß nicht, ob versichert' },
    ],
    tipOn: {
      'Noch nicht': 'Am besten heute noch melden und die Schadennummer notieren.',
      Unklar: 'Kein Problem. Klären wir beim Termin.',
    },
  },
  {
    id: 'kontakt',
    kind: 'contact',
    title: 'Wohin dürfen wir zurückrufen?',
    help: 'Nummer reicht. Wir rufen zurück.',
  },
];

const malerSteps: Step[] = [
  {
    id: 'leistung',
    kind: 'multi',
    title: 'Worum geht es?',
    help: 'Mehrfachauswahl möglich.',
    skipIfSet: true,
    options: [
      { value: 'Wände und Decken', label: 'Wände und Decken streichen' },
      { value: 'Tapezieren', label: 'Tapezieren' },
      { value: 'Spachteln/Putz', label: 'Spachteln, Glätten, Putz' },
      { value: 'Fassade', label: 'Fassade' },
      { value: 'Lackieren', label: 'Fenster und Türen lackieren' },
      { value: 'Boden', label: 'Boden verlegen' },
      { value: 'Plissees', label: 'Plissees und Sonnenschutz' },
      { value: 'Küchenmontage', label: 'Küchenmontage' },
      { value: 'Etwas anderes', label: 'Etwas anderes' },
    ],
  },
  {
    id: 'objekt',
    kind: 'single',
    title: 'Um welches Objekt geht es?',
    options: [
      { value: 'Wohnung', label: 'Wohnung' },
      { value: 'Einfamilienhaus', label: 'Einfamilienhaus' },
      { value: 'Mehrfamilienhaus', label: 'Mehrfamilienhaus' },
      { value: 'Gewerbe', label: 'Büro oder Gewerbe' },
    ],
  },
  {
    id: 'umfang',
    kind: 'single',
    title: 'Wie groß ist der Umfang?',
    options: [
      { value: 'Einzelner Raum', label: 'Ein einzelner Raum' },
      { value: 'Mehrere Räume', label: 'Mehrere Räume' },
      { value: 'Ganze Wohnung', label: 'Die ganze Wohnung' },
      { value: 'Ganzes Objekt', label: 'Das ganze Objekt' },
      { value: 'Unklar', label: 'Weiß ich noch nicht' },
    ],
  },
  {
    id: 'zeit',
    kind: 'single',
    title: 'Wann soll es losgehen?',
    options: [
      { value: 'So bald wie möglich', label: 'So bald wie möglich' },
      { value: 'Nächste Wochen', label: 'In den nächsten Wochen' },
      { value: 'Einige Monate', label: 'In einigen Monaten' },
      { value: 'Offen', label: 'Noch offen' },
    ],
  },
  {
    id: 'kontakt',
    kind: 'contact',
    title: 'Wie erreichen wir Sie?',
    help: 'Nur die Nummer ist Pflicht.',
  },
];

const withBranch = (steps: Step[], branch: string): Step[] =>
  steps.map((s) => ({ ...s, id: `${branch}_${s.id}`, when: { branch: [branch], ...prefix(s.when, branch) }, unless: prefix(s.unless, branch), tipOn: s.tipOn }));

function prefix(cond: Record<string, string[]> | undefined, branch: string) {
  if (!cond) return undefined;
  return Object.fromEntries(Object.entries(cond).map(([k, v]) => [`${branch}_${k}`, v]));
}

export const funnels: Record<string, Funnel> = {
  wasser: { id: 'wasser', label: 'Schaden melden', subjectPrefix: 'Wasserschaden', steps: withBranch(wasserSteps, 'wasser') },
  maler: { id: 'maler', label: 'Angebot anfordern', subjectPrefix: 'Malerarbeiten', steps: withBranch(malerSteps, 'maler') },
  start: {
    id: 'start',
    label: 'Anfrage',
    subjectPrefix: 'Anfrage',
    steps: [
      {
        id: 'branch',
        kind: 'single',
        title: 'Was steht an?',
        help: 'Vier Klicks. Dann rufen wir an.',
        options: [
          { value: 'wasser', label: 'Wasser ist ausgetreten', set: {} },
          { value: 'wasser_feuchte', label: 'Feuchte Wand oder Geruch', set: { branch: 'wasser', wasser_art: 'Feuchte Wand/Geruch' } },
          { value: 'maler', label: 'Streichen und renovieren', set: {} },
          { value: 'maler_fassade', label: 'Fassade', set: { branch: 'maler', maler_leistung: 'Fassade' } },
        ],
      },
      ...withBranch(wasserSteps, 'wasser'),
      ...withBranch(malerSteps, 'maler'),
    ],
  },
};
