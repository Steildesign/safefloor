import { SafetyAnswer, SafetyQuestion } from './types';
import { Locale } from '@/i18n/provider';

export const safetyQuestions: SafetyQuestion[] = [
  { id: 'responsive', question: 'Ist die Person bewusstlos oder kaum ansprechbar?', shortLabel: 'Bewusstsein' },
  { id: 'breathing', question: 'Gibt es schwere Atemnot oder keine normale Atmung?', shortLabel: 'Atmung' },
  { id: 'critical', question: 'Gibt es Brustschmerz, Krampfanfall oder starke Überhitzung?', shortLabel: 'Warnzeichen' },
  { id: 'danger', question: 'Besteht akute Selbst- oder Fremdgefährdung?', shortLabel: 'Akute Gefahr' },
  { id: 'alone', question: 'Ist die Person allein und kann keine Hilfe erreichen?', shortLabel: 'Allein' },
];

export function getSafetyQuestions(locale: Locale): SafetyQuestion[] {
  if (locale === 'de') return safetyQuestions;
  return [
    { id: 'responsive', question: 'Is the person unconscious or barely responsive?', shortLabel: 'Consciousness' },
    { id: 'breathing', question: 'Is there severe difficulty breathing or no normal breathing?', shortLabel: 'Breathing' },
    { id: 'critical', question: 'Is there chest pain, a seizure or severe overheating?', shortLabel: 'Warning signs' },
    { id: 'danger', question: 'Is there an immediate risk of harm to self or others?', shortLabel: 'Immediate danger' },
    { id: 'alone', question: 'Is the person alone and unable to reach help?', shortLabel: 'Alone' },
  ];
}

export type SafetyAnswers = Record<string, SafetyAnswer>;

export function hasEmergencySignal(answers: SafetyAnswers) {
  return Object.values(answers).some((answer) => answer === 'yes');
}

export function isSafetyCheckComplete(answers: SafetyAnswers) {
  return safetyQuestions.every((question) => answers[question.id] !== null && answers[question.id] !== undefined);
}
