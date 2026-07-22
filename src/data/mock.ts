import { CommunityAlert, MapPlace, ReportCategory, Resource, Substance, SubstanceCombination } from '@/domain/types';
import { Locale } from '@/i18n/provider';

export const alerts: CommunityAlert[] = [
  {
    id: 'achtsam-innenstadt',
    kind: 'community',
    eyebrow: 'COMMUNITY-HINWEIS',
    title: 'Achte aufeinander.',
    body: 'Mehrere Meldungen berichten von ungewöhnlich starker Wirkung in diesem Bereich.',
    confidence: 'Mehrfach gemeldet',
    time: 'Vor 12 Min.',
    distance: 'ca. 1 km',
    location: 'Innenstadt · grober Bereich',
    action: 'Hinweis ansehen',
  },
  {
    id: 'wasser-nord',
    kind: 'resource',
    eyebrow: 'RESSOURCEN-UPDATE',
    title: 'Wasserstation geöffnet',
    body: 'Kostenloses Wasser ist aktuell im Bereich Nord verfügbar.',
    confidence: 'Partner bestätigt',
    time: 'Vor 26 Min.',
    distance: '0,4 km',
    location: 'Bereich Nord · Eingang B',
    action: 'Auf Karte zeigen',
  },
  {
    id: 'pause',
    kind: 'tip',
    eyebrow: 'RUHIGER TIPP',
    title: 'Pausen machen einen Unterschied.',
    body: 'Ein ruhigerer Ort und weniger Reize können helfen, wieder Orientierung zu finden.',
    confidence: 'Redaktionell',
    time: '3 Min. Lesezeit',
    distance: 'Offline verfügbar',
    location: 'SAFEFLOOR Wissen',
    action: 'Mehr erfahren',
  },
];

export const reportCategories: ReportCategory[] = [
  { id: 'unusual_effect', title: 'Ungewöhnliche Wirkung', description: 'Beobachtete Wirkung wirkt anders oder stärker als erwartet.', tone: 'amber' },
  { id: 'contamination', title: 'Mögliche Verunreinigung', description: 'Hinweis auf eine unbekannte oder unerwartete Zusammensetzung.', tone: 'amber' },
  { id: 'unsafe', title: 'Unsichere Situation', description: 'Eine Person oder Umgebung wirkt gerade nicht sicher.', tone: 'cyan' },
  { id: 'harassment', title: 'Belästigung oder Übergriff', description: 'Grenzverletzendes Verhalten oder eine akute Sorge.', tone: 'neutral' },
  { id: 'mental', title: 'Person braucht Hilfe', description: 'Psychische Belastung oder sichtbare Überforderung.', tone: 'cyan' },
  { id: 'resource', title: 'Hilfreiche Ressource', description: 'Wasser, Ruhezone, Awareness-Team oder andere Unterstützung.', tone: 'cyan' },
];

export const substances: Substance[] = [
  {
    slug: 'mdma',
    name: 'MDMA',
    aliases: 'Ecstasy · Molly',
    category: 'Empathogen',
    summary: 'Allgemeine, redaktionell zu prüfende Überblicksinformation für den Prototyp.',
    onset: 'Bandbreite wird fachlich geprüft',
    duration: 'Bandbreite wird fachlich geprüft',
    risks: ['Überhitzung und Kreislaufbelastung', 'Unbekannte Zusammensetzung', 'Psychische Überforderung'],
    warningSigns: ['Schwere Atemnot', 'Bewusstlosigkeit', 'Krampfanfall', 'Starke Überhitzung'],
    harmReduction: ['Nicht allein bleiben', 'Reize reduzieren', 'Bei Warnzeichen sofort 112'],
    reviewedAt: 'Prototyp · fachliche Prüfung ausstehend',
    pubChemCid: 1615,
    referenceScope: 'MDMA als chemische Verbindung',
  },
  {
    slug: 'ketamin',
    name: 'Ketamin',
    aliases: 'K · Special K',
    category: 'Dissoziativum',
    summary: 'Strukturbeispiel ohne Dosierungs- oder Konsumempfehlung.',
    onset: 'Bandbreite wird fachlich geprüft',
    duration: 'Bandbreite wird fachlich geprüft',
    risks: ['Stürze und Verletzungen', 'Orientierungsverlust', 'Bewusstseinsstörungen'],
    warningSigns: ['Keine normale Atmung', 'Kaum ansprechbar', 'Akute Verletzung'],
    harmReduction: ['Sichere Umgebung schaffen', 'Nicht allein lassen', 'Professionelle Hilfe holen'],
    reviewedAt: 'Prototyp · fachliche Prüfung ausstehend',
    pubChemCid: 3821,
    referenceScope: 'Ketamin als chemische Verbindung',
  },
  {
    slug: 'cannabis',
    name: 'Cannabis',
    aliases: 'Weed · Gras',
    category: 'Cannabinoid',
    summary: 'Sachliche Prototypstruktur für Wirkung, Risiken und Warnzeichen.',
    onset: 'Bandbreite wird fachlich geprüft',
    duration: 'Bandbreite wird fachlich geprüft',
    risks: ['Angst oder Panik', 'Kreislaufprobleme', 'Beeinträchtigte Orientierung'],
    warningSigns: ['Brustschmerz', 'Bewusstlosigkeit', 'Akute Selbstgefährdung'],
    harmReduction: ['Ruhigen Ort aufsuchen', 'Vertrauensperson kontaktieren', 'Bei starken Warnzeichen Hilfe holen'],
    reviewedAt: 'Prototyp · fachliche Prüfung ausstehend',
    pubChemCid: 16078,
    referenceScope: 'Δ9-THC als Referenzverbindung; nicht die Cannabisblüte',
  },
  {
    slug: 'alkohol',
    name: 'Alkohol',
    aliases: 'Ethanol',
    category: 'Dämpfend',
    summary: 'Allgemeine Risikoinformation in noch nicht fachlich freigegebener Demoform.',
    onset: 'Bandbreite wird fachlich geprüft',
    duration: 'Bandbreite wird fachlich geprüft',
    risks: ['Bewusstseinsstörung', 'Erbrechen und Aspiration', 'Unfälle'],
    warningSigns: ['Nicht weckbar', 'Unregelmäßige Atmung', 'Krampfanfall'],
    harmReduction: ['Nicht allein lassen', 'Atmung beobachten', 'Bei Bewusstlosigkeit 112'],
    reviewedAt: 'Prototyp · fachliche Prüfung ausstehend',
    pubChemCid: 702,
    referenceScope: 'Ethanol als Referenzverbindung',
  },
];

export const resources: Resource[] = [
  { id: 'emergency', title: '112', type: 'Lebensbedrohlicher Notfall', detail: 'Bei Bewusstlosigkeit, schwerer Atemnot oder akuter Gefahr.', availability: 'Immer erreichbar', phone: '112' },
  { id: 'medical', title: '116117', type: 'Ärztlicher Bereitschaftsdienst', detail: 'Dringend, aber nicht lebensbedrohlich.', availability: 'Deutschlandweit', phone: '116117' },
  { id: 'awareness', title: 'Awareness-Team', type: 'Hilfe vor Ort', detail: 'Im Prototyp als lokaler Anlaufpunkt simuliert.', availability: 'Heute bis 05:00' },
  { id: 'quiet', title: 'Ruheraum Nord', type: 'Reize reduzieren', detail: 'Geschützter Bereich neben Eingang B.', availability: 'Jetzt geöffnet' },
];

export const combinations: SubstanceCombination[] = [
  {
    slug: 'ketamin-alkohol',
    substances: ['Ketamin', 'Alkohol'],
    sceneNames: 'K + Alkohol',
    risk: 'sehr hoch',
    summary: 'Zwei dämpfende Wirkungen können sich unvorhersehbar verstärken. Bewusstlosigkeit und gefährlich verlangsamte Atmung sind möglich.',
    risks: ['Starke Bewusstseinsstörung bis zum Koma', 'Atemdepression bis zum Atemstillstand', 'Erbrechen, Aspiration und hohes Verletzungsrisiko'],
    warningSigns: ['Nicht oder kaum weckbar', 'Langsame, unregelmäßige oder aussetzende Atmung', 'Bläuliche Lippen, Krampfanfall oder Kollaps'],
    firstSteps: ['Sofort 112 rufen', 'Atmung prüfen und Atemwege freihalten', 'Nicht allein lassen; bei Bewusstlosigkeit stabile Seitenlage'],
    reviewedAt: 'Prototyp · Fachreview vor Veröffentlichung erforderlich',
    sources: [
      { label: 'drugcom · Ketamin', url: 'https://www.drugcom.de/wissenstests/andere-themen/weitere-informationen-zu-anderen-drogen/ketamin/' },
      { label: 'Drugchecking Berlin · Ketamin', url: 'https://drugchecking.berlin/substanzen/ketamin' },
    ],
  },
  {
    slug: 'mdma-ketamin',
    substances: ['MDMA', 'Ketamin'],
    sceneNames: 'teils als Tusi / Tucibi verkauft',
    risk: 'hoch',
    summary: 'Die Kombination kann Psyche, Kreislauf und Orientierung stark belasten. Unter Szenenamen verkaufte Pulver können zusätzlich weitere unbekannte Stoffe enthalten.',
    risks: ['Zusätzliche Herz-Kreislauf-Belastung', 'Kontrollverlust, Desorientierung und Unfälle', 'Unbekannte Zusammensetzung bei vorgemischten Pulvern'],
    warningSigns: ['Starke Überhitzung oder Krampfanfall', 'Schwere Atemnot oder Bewusstlosigkeit', 'Extreme Verwirrung, Panik oder Kreislaufkollaps'],
    firstSteps: ['Bei schweren Warnzeichen sofort 112', 'Reize reduzieren und eine nüchterne Vertrauensperson hinzuholen', 'Probe nicht anhand von Farbe oder Szenename beurteilen'],
    reviewedAt: 'Prototyp · Fachreview vor Veröffentlichung erforderlich',
    sources: [
      { label: 'Drugchecking Berlin · aktuelle Warnungen', url: 'https://drugchecking.berlin/aktuelle-warnungen' },
      { label: 'Drugchecking Berlin · Ketamin', url: 'https://drugchecking.berlin/substanzen/ketamin' },
    ],
  },
  {
    slug: 'mdma-alkohol',
    substances: ['MDMA', 'Alkohol'],
    sceneNames: 'Ecstasy + Alkohol',
    risk: 'hoch',
    summary: 'Alkohol kann körperliche Warnsignale verdecken und zusammen mit Hitze, Tanzen und MDMA die Belastung für Kreislauf und Temperaturregulation erhöhen.',
    risks: ['Überhitzung und Kreislaufkollaps', 'Fehleinschätzung von Trunkenheit und Leistungsfähigkeit', 'Zusätzliche Belastung durch Flüssigkeits- und Elektrolytverschiebungen'],
    warningSigns: ['Sehr heiße Haut, Verwirrung oder Krampfanfall', 'Kollaps, Brustschmerz oder schwere Atemnot', 'Bewusstlosigkeit'],
    firstSteps: ['Bei schweren Warnzeichen sofort 112', 'Aus Hitze und Gedränge an einen kühleren Ort bringen', 'Nicht allein lassen und keine weiteren Substanzen geben'],
    reviewedAt: 'Prototyp · Fachreview vor Veröffentlichung erforderlich',
    sources: [
      { label: 'drugcom · Alkohol und Ecstasy', url: 'https://www.drugcom.de/news/wie-alkohol-das-risiko-fuer-toedliche-folgen-durch-ecstasy-erhoeht/' },
      { label: 'drugcom · Ecstasy-Lexikon', url: 'https://www.drugcom.de/drogenlexikon/buchstabe-e/ecstasy/' },
    ],
  },
  {
    slug: 'cannabis-alkohol',
    substances: ['Cannabis', 'Alkohol'],
    sceneNames: 'Weed + Alkohol',
    risk: 'hoch',
    summary: 'Die Kombination kann Benommenheit, Übelkeit, Verwirrung und Kontrollverlust deutlich verstärken. Orientierung und Reaktionsfähigkeit nehmen weiter ab.',
    risks: ['Stärkere Benommenheit und Koordinationsprobleme', 'Übelkeit, Erbrechen und Kreislaufbeschwerden', 'Erhöhte Unfallgefahr und riskante Entscheidungen'],
    warningSigns: ['Bewusstlosigkeit oder nicht weckbar', 'Brustschmerz, Krampfanfall oder schwere Atemnot', 'Akute Selbst- oder Fremdgefährdung'],
    firstSteps: ['An einen sicheren, reizarmen Ort begleiten', 'Nicht fahren oder allein lassen', 'Bei schweren Warnzeichen sofort 112'],
    reviewedAt: 'Prototyp · Fachreview vor Veröffentlichung erforderlich',
    sources: [
      { label: 'drugcom · Alkohol und Cannabis', url: 'https://www.drugcom.de/news/mehr-unerwuenschte-effekte-bei-mischkonsum-von-alkohol-und-cannabis/' },
      { label: 'drugcom · Mischkonsum', url: 'https://www.drugcom.de/wissen/mischkonsum/konsumberichte-und-expertenkommentare/' },
    ],
  },
];

export const mapPlaces: MapPlace[] = [
  {
    id: 'demo-awareness-kreuzberg',
    kind: 'support',
    title: 'Demo · Awareness-Punkt',
    detail: 'Beispiel für eine bestätigte Hilfe vor Ort. Verfügbarkeit muss ein Partner liefern.',
    area: 'Kreuzberg · ungefährer Bereich',
    coordinate: [13.4177, 52.4991],
    radiusMeters: 180,
    status: 'PROTOTYP · NICHT LIVE',
  },
  {
    id: 'demo-water-mitte',
    kind: 'resource',
    title: 'Demo · Wasserstation',
    detail: 'Beispielressource für den Kartenflow; keine reale Verfügbarkeitsmeldung.',
    area: 'Mitte · ungefährer Bereich',
    coordinate: [13.3972, 52.5191],
    radiusMeters: 140,
    status: 'PROTOTYP · NICHT LIVE',
  },
  {
    id: 'demo-warning-friedrichshain',
    kind: 'warning',
    title: 'Gebündelter Community-Hinweis',
    detail: 'Mehrere moderierte Hinweise würden als Zone erscheinen – nie als exakter Meldepunkt.',
    area: 'Friedrichshain · Datenschutzradius',
    coordinate: [13.4513, 52.5117],
    radiusMeters: 260,
    status: 'DEMO · MEHRFACH GEMELDET',
  },
  {
    id: 'demo-quiet-neukoelln',
    kind: 'support',
    title: 'Demo · Ruhebereich',
    detail: 'Beispiel für einen reizarmen, betreuten Rückzugsort eines Veranstaltungspartners.',
    area: 'Neukölln · ungefährer Bereich',
    coordinate: [13.4356, 52.4814],
    radiusMeters: 160,
    status: 'PROTOTYP · NICHT LIVE',
  },
];

const englishSubstances: Record<string, Partial<Substance>> = {
  mdma: {
    category: 'Empathogen',
    summary: 'General prototype overview pending professional review.',
    onset: 'Range pending professional review', duration: 'Range pending professional review',
    risks: ['Overheating and circulatory strain', 'Unknown composition', 'Psychological distress'],
    warningSigns: ['Severe breathing difficulty', 'Unconsciousness', 'Seizure', 'Severe overheating'],
    harmReduction: ['Do not stay alone', 'Reduce stimulation', 'Call 112 for warning signs'],
    reviewedAt: 'Prototype · professional review pending', referenceScope: 'MDMA as a chemical compound',
  },
  ketamin: {
    category: 'Dissociative', summary: 'Structural example without dosage or consumption advice.',
    onset: 'Range pending professional review', duration: 'Range pending professional review',
    risks: ['Falls and injuries', 'Loss of orientation', 'Altered consciousness'],
    warningSigns: ['No normal breathing', 'Barely responsive', 'Acute injury'],
    harmReduction: ['Create a safer environment', 'Do not leave the person alone', 'Seek professional help'],
    reviewedAt: 'Prototype · professional review pending', referenceScope: 'Ketamine as a chemical compound',
  },
  cannabis: {
    aliases: 'Weed · Marijuana', category: 'Cannabinoid', summary: 'Neutral prototype structure for effects, risks and warning signs.',
    onset: 'Range pending professional review', duration: 'Range pending professional review',
    risks: ['Anxiety or panic', 'Circulatory problems', 'Impaired orientation'],
    warningSigns: ['Chest pain', 'Unconsciousness', 'Immediate risk of self-harm'],
    harmReduction: ['Move to a calm place', 'Contact a trusted person', 'Seek help for severe warning signs'],
    reviewedAt: 'Prototype · professional review pending', referenceScope: 'Δ9-THC as a reference compound; not the cannabis flower',
  },
  alkohol: {
    name: 'Alcohol', category: 'Depressant', summary: 'General risk information in a demo version pending professional approval.',
    onset: 'Range pending professional review', duration: 'Range pending professional review',
    risks: ['Altered consciousness', 'Vomiting and aspiration', 'Accidents'],
    warningSigns: ['Cannot be woken', 'Irregular breathing', 'Seizure'],
    harmReduction: ['Do not leave the person alone', 'Observe breathing', 'Call 112 if unconscious'],
    reviewedAt: 'Prototype · professional review pending', referenceScope: 'Ethanol as a reference compound',
  },
};

const englishAlerts: Record<string, Partial<CommunityAlert>> = {
  'achtsam-innenstadt': { eyebrow: 'COMMUNITY NOTICE', title: 'Look out for each other.', body: 'Several reports describe an unusually strong effect in this general area.', confidence: 'Multiple reports', time: '12 min ago', location: 'City centre · approximate area', action: 'View notice' },
  'wasser-nord': { eyebrow: 'RESOURCE UPDATE', title: 'Water station open', body: 'Free water is currently available in the north area.', confidence: 'Partner confirmed', time: '26 min ago', location: 'North area · Entrance B', action: 'Show on map' },
  pause: { eyebrow: 'CALM TIP', title: 'Taking breaks makes a difference.', body: 'A quieter place and less stimulation can help you regain orientation.', confidence: 'Editorial', time: '3 min read', distance: 'Available offline', location: 'SAFEFLOOR knowledge', action: 'Learn more' },
};

const englishCombinations: Record<string, Partial<SubstanceCombination>> = {
  'ketamin-alkohol': {
    substances: ['Ketamine', 'Alcohol'], sceneNames: 'K + alcohol', risk: 'very high',
    summary: 'Two depressant effects can amplify each other unpredictably. Unconsciousness and dangerously slowed breathing are possible.',
    risks: ['Severe altered consciousness or coma', 'Respiratory depression or respiratory arrest', 'Vomiting, aspiration and high injury risk'],
    warningSigns: ['Cannot be woken or barely responds', 'Slow, irregular or interrupted breathing', 'Blue lips, seizure or collapse'],
    firstSteps: ['Call 112 immediately', 'Check breathing and keep airways clear', 'Do not leave them alone; recovery position if unconscious'],
    reviewedAt: 'Prototype · professional review required before publication',
  },
  'mdma-ketamin': {
    substances: ['MDMA', 'Ketamine'], sceneNames: 'sometimes sold as Tusi / Tucibi', risk: 'high',
    summary: 'The combination can place heavy strain on mental state, circulation and orientation. Powders sold under scene names may contain additional unknown substances.',
    risks: ['Additional cardiovascular strain', 'Loss of control, disorientation and accidents', 'Unknown composition of premixed powders'],
    warningSigns: ['Severe overheating or seizure', 'Severe breathing difficulty or unconsciousness', 'Extreme confusion, panic or circulatory collapse'],
    firstSteps: ['Call 112 for severe warning signs', 'Reduce stimulation and involve a sober trusted person', 'Never judge a sample by colour or scene name'],
    reviewedAt: 'Prototype · professional review required before publication',
  },
  'mdma-alkohol': {
    substances: ['MDMA', 'Alcohol'], sceneNames: 'Ecstasy + alcohol', risk: 'high',
    summary: 'Alcohol can mask physical warning signs and, together with heat, dancing and MDMA, increase strain on circulation and temperature regulation.',
    risks: ['Overheating and circulatory collapse', 'Misjudging intoxication and physical capacity', 'Additional strain from fluid and electrolyte shifts'],
    warningSigns: ['Very hot skin, confusion or seizure', 'Collapse, chest pain or severe breathing difficulty', 'Unconsciousness'],
    firstSteps: ['Call 112 for severe warning signs', 'Move away from heat and crowds to a cooler place', 'Do not leave them alone or give further substances'],
    reviewedAt: 'Prototype · professional review required before publication',
  },
  'cannabis-alkohol': {
    substances: ['Cannabis', 'Alcohol'], sceneNames: 'Weed + alcohol', risk: 'high',
    summary: 'The combination can markedly increase drowsiness, nausea, confusion and loss of control. Orientation and reaction ability decline further.',
    risks: ['Greater drowsiness and coordination problems', 'Nausea, vomiting and circulatory problems', 'Higher accident risk and risky decisions'],
    warningSigns: ['Unconscious or cannot be woken', 'Chest pain, seizure or severe breathing difficulty', 'Immediate risk to self or others'],
    firstSteps: ['Move to a safe, low-stimulation place', 'Do not drive or leave them alone', 'Call 112 for severe warning signs'],
    reviewedAt: 'Prototype · professional review required before publication',
  },
};

const englishMapPlaces: Record<string, Partial<MapPlace>> = {
  'demo-awareness-kreuzberg': { title: 'Demo · Awareness point', detail: 'Example of confirmed on-site support. Availability must be supplied by a partner.', area: 'Kreuzberg · approximate area', status: 'PROTOTYPE · NOT LIVE' },
  'demo-water-mitte': { title: 'Demo · Water station', detail: 'Example resource for the map flow; not a real availability notice.', area: 'Mitte · approximate area', status: 'PROTOTYPE · NOT LIVE' },
  'demo-warning-friedrichshain': { title: 'Grouped community notice', detail: 'Multiple moderated notices would appear as a zone—never as an exact report point.', area: 'Friedrichshain · privacy radius', status: 'DEMO · MULTIPLE REPORTS' },
  'demo-quiet-neukoelln': { title: 'Demo · Quiet area', detail: 'Example of a low-stimulation, supervised space provided by an event partner.', area: 'Neukölln · approximate area', status: 'PROTOTYPE · NOT LIVE' },
};

export function getSubstances(locale: Locale) {
  if (locale === 'de') return substances;
  return substances.map((item) => ({ ...item, ...englishSubstances[item.slug] }));
}

export function getAlerts(locale: Locale) {
  if (locale === 'de') return alerts;
  return alerts.map((item) => ({ ...item, ...englishAlerts[item.id] }));
}

export function getCombinations(locale: Locale) {
  if (locale === 'de') return combinations;
  return combinations.map((item) => ({ ...item, ...englishCombinations[item.slug] }));
}

export function getMapPlaces(locale: Locale) {
  if (locale === 'de') return mapPlaces;
  return mapPlaces.map((item) => ({ ...item, ...englishMapPlaces[item.id] }));
}

export function getResources(locale: Locale) {
  if (locale === 'de') return resources;
  const translations: Record<string, Partial<Resource>> = {
    emergency: { type: 'Life-threatening emergency', detail: 'For unconsciousness, severe breathing difficulty or immediate danger.', availability: 'Always available' },
    medical: { type: 'Medical on-call service', detail: 'Urgent, but not life-threatening.', availability: 'Across Germany' },
    awareness: { title: 'Awareness team', type: 'Help on site', detail: 'Simulated as a local contact point in the prototype.', availability: 'Today until 05:00' },
    quiet: { title: 'Quiet room north', type: 'Reduce stimulation', detail: 'Protected area next to Entrance B.', availability: 'Open now' },
  };
  return resources.map((item) => ({ ...item, ...translations[item.id] }));
}

export function getReportCategories(locale: Locale) {
  if (locale === 'de') return reportCategories;
  const translations: Record<string, Pick<ReportCategory, 'title' | 'description'>> = {
    unusual_effect: { title: 'Unusual effect', description: 'The observed effect seems different or stronger than expected.' },
    contamination: { title: 'Possible contamination', description: 'A sign of an unknown or unexpected composition.' },
    unsafe: { title: 'Unsafe situation', description: 'A person or the surroundings do not feel safe right now.' },
    harassment: { title: 'Harassment or assault', description: 'Boundary-crossing behaviour or an immediate concern.' },
    mental: { title: 'Person needs help', description: 'Psychological distress or visible overwhelm.' },
    resource: { title: 'Helpful resource', description: 'Water, a quiet zone, awareness team or other support.' },
  };
  return reportCategories.map((item) => ({ ...item, ...translations[item.id] }));
}
