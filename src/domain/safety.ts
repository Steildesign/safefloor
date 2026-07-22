import { SafetyAnswer, SafetyQuestion } from './types';

export const safetyQuestions: SafetyQuestion[] = [
  { id: 'responsive', question: 'Ist die Person bewusstlos oder kaum ansprechbar?', shortLabel: 'Bewusstsein' },
  { id: 'breathing', question: 'Gibt es schwere Atemnot oder keine normale Atmung?', shortLabel: 'Atmung' },
  { id: 'critical', question: 'Gibt es Brustschmerz, Krampfanfall oder starke Überhitzung?', shortLabel: 'Warnzeichen' },
  { id: 'danger', question: 'Besteht akute Selbst- oder Fremdgefährdung?', shortLabel: 'Akute Gefahr' },
  { id: 'alone', question: 'Ist die Person allein und kann keine Hilfe erreichen?', shortLabel: 'Allein' },
];

export type SafetyAnswers = Record<string, SafetyAnswer>;

export function hasEmergencySignal(answers: SafetyAnswers) {
  return Object.values(answers).some((answer) => answer === 'yes');
}

export function isSafetyCheckComplete(answers: SafetyAnswers) {
  return safetyQuestions.every((question) => answers[question.id] !== null && answers[question.id] !== undefined);
}
