export type ConfidenceLevel = 'Mehrfach gemeldet' | 'Partner bestätigt' | 'Redaktionell' | 'Multiple reports' | 'Partner confirmed' | 'Editorial';

export type AlertKind = 'community' | 'tip' | 'resource';

export type CommunityAlert = {
  id: string;
  kind: AlertKind;
  eyebrow: string;
  title: string;
  body: string;
  confidence: ConfidenceLevel;
  time: string;
  distance: string;
  location: string;
  action: string;
};

export type Substance = {
  slug: string;
  name: string;
  aliases: string;
  category: string;
  summary: string;
  onset: string;
  duration: string;
  risks: string[];
  warningSigns: string[];
  harmReduction: string[];
  reviewedAt: string;
  pubChemCid: number;
  referenceScope: string;
};

export type CombinationRisk = 'hoch' | 'sehr hoch' | 'high' | 'very high';

export type SubstanceCombination = {
  slug: string;
  substances: [string, string];
  sceneNames: string;
  risk: CombinationRisk;
  summary: string;
  risks: string[];
  warningSigns: string[];
  firstSteps: string[];
  reviewedAt: string;
  sources: { label: string; url: string }[];
};

export type MapPlaceKind = 'warning' | 'resource' | 'support';

export type MapPlace = {
  id: string;
  kind: MapPlaceKind;
  title: string;
  detail: string;
  area: string;
  coordinate: [number, number];
  radiusMeters: number;
  status: string;
};

export type ReportCategory = {
  id: string;
  title: string;
  description: string;
  tone: 'cyan' | 'amber' | 'neutral';
};

export type Resource = {
  id: string;
  title: string;
  type: string;
  detail: string;
  availability: string;
  phone?: string;
};

export type SafetyAnswer = 'yes' | 'no' | null;

export type SafetyQuestion = {
  id: string;
  question: string;
  shortLabel: string;
};
