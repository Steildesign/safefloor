export type ConfidenceLevel = 'Mehrfach gemeldet' | 'Partner bestätigt' | 'Redaktionell';

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
