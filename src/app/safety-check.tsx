import { router } from 'expo-router';
import { AlertOctagon, Check, Phone, ShieldCheck, UsersRound, X } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Eyebrow, Title } from '@/components/ui';
import { getSafetyQuestions, hasEmergencySignal, isSafetyCheckComplete, safetyQuestions, SafetyAnswers } from '@/domain/safety';
import { colors, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

const initialAnswers: SafetyAnswers = Object.fromEntries(safetyQuestions.map((question) => [question.id, null]));

export default function SafetyCheckScreen() {
  const { locale, tx } = useI18n();
  const localizedQuestions = getSafetyQuestions(locale);
  const [answers, setAnswers] = useState<SafetyAnswers>(initialAnswers);
  const emergency = useMemo(() => hasEmergencySignal(answers), [answers]);
  const complete = useMemo(() => isSafetyCheckComplete(answers), [answers]);

  const answer = (id: string, value: 'yes' | 'no') => setAnswers((current) => ({ ...current, [id]: value }));

  if (emergency) {
    return (
      <AppScreen motion="none" scroll={false} style={safetyStyles.emergencyScreen}>
        <SeoHead title="Notfallhinweis" description="SAFEFLOOR Notfallkarte mit 112 und klaren nächsten Schritten." noIndex />
        <AppHeader title={tx('Dringende Hilfe', 'Urgent help')} back />
        <View style={safetyStyles.emergencyIcon}><AlertOctagon color={colors.white} size={38} /></View>
        <Eyebrow tone="amber">{tx('WARNZEICHEN ANGEGEBEN', 'WARNING SIGN SELECTED')}</Eyebrow>
        <Title>{tx('Bitte hole jetzt reale Hilfe.', 'Please get real-world help now.')}</Title>
        <Body style={safetyStyles.emergencyBody}>{tx('Wenn Lebensgefahr besteht oder die Person nicht normal atmet, rufe sofort 112. Beende an dieser Stelle den KI-Dialog.', 'If a life is at risk or the person is not breathing normally, call 112 now. Stop the AI conversation here.')}</Body>
        <Card tone="emergency" style={safetyStyles.emergencyCard}>
          <View style={safetyStyles.emergencyStep}><Text style={safetyStyles.emergencyIndex}>01</Text><Text style={safetyStyles.emergencyText}>{tx('112 anrufen und Situation knapp beschreiben.', 'Call 112 and describe the situation briefly.')}</Text></View>
          <View style={safetyStyles.emergencyStep}><Text style={safetyStyles.emergencyIndex}>02</Text><Text style={safetyStyles.emergencyText}>{tx('Eine anwesende Person oder das Personal dazuholen.', 'Get someone nearby or a member of staff to help.')}</Text></View>
          <View style={safetyStyles.emergencyStep}><Text style={safetyStyles.emergencyIndex}>03</Text><Text style={safetyStyles.emergencyText}>{tx('Person nicht allein lassen und Anweisungen der Leitstelle folgen.', 'Do not leave the person alone and follow the dispatcher’s instructions.')}</Text></View>
        </Card>
        <View style={safetyStyles.actions}>
          <Button label={tx('112 anrufen', 'Call 112')} icon={Phone} tone="emergency" onPress={() => Linking.openURL('tel:112')} />
          <Button label={tx('Vertrauensperson öffnen', 'Open trusted person')} icon={UsersRound} tone="ghost" onPress={() => router.push('/trusted-contacts')} />
        </View>
        <Text style={safetyStyles.prototypeNote}>{tx('Im Browser kann der Telefonlink je nach Gerät nicht ausgeführt werden.', 'The phone link may not work in every browser or device.')}</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen motion="none">
      <SeoHead title="Safety-Check" description="Regelbasierter SAFEFLOOR Check für unmittelbar beobachtbare Warnzeichen." noIndex />
      <AppHeader title={tx('Kurzer Safety-Check', 'Quick safety check')} back />
      <Eyebrow>{tx('REGELBASIERT · FUNKTIONIERT OHNE KI', 'RULE-BASED · WORKS WITHOUT AI')}</Eyebrow>
      <Title>{tx('Was kannst du gerade beobachten?', 'What can you observe right now?')}</Title>
      <Body muted style={safetyStyles.intro}>{tx('Keine Diagnose. Bitte beantworte nur klar sichtbare Warnzeichen.', 'Not a diagnosis. Please answer only clearly visible warning signs.')}</Body>

      <View style={safetyStyles.questions}>
        {localizedQuestions.map((question, index) => (
          <Card key={question.id} tone={answers[question.id] === 'yes' ? 'emergency' : 'default'}>
            <View style={safetyStyles.questionHeader}><Text style={safetyStyles.questionIndex}>{String(index + 1).padStart(2, '0')}</Text><Text style={safetyStyles.question}>{question.question}</Text></View>
            <View style={safetyStyles.answerRow}>
              <Pressable accessibilityRole="radio" accessibilityState={{ checked: answers[question.id] === 'no' }} onPress={() => answer(question.id, 'no')} style={[safetyStyles.answer, answers[question.id] === 'no' && safetyStyles.answerNo]}><Check color={answers[question.id] === 'no' ? colors.black : colors.gray} size={17} /><Text style={[safetyStyles.answerText, answers[question.id] === 'no' && safetyStyles.answerTextActive]}>{tx('Nein', 'No')}</Text></Pressable>
              <Pressable accessibilityRole="radio" accessibilityState={{ checked: answers[question.id] === 'yes' }} onPress={() => answer(question.id, 'yes')} style={[safetyStyles.answer, answers[question.id] === 'yes' && safetyStyles.answerYes]}><X color={answers[question.id] === 'yes' ? colors.white : colors.gray} size={17} /><Text style={[safetyStyles.answerText, answers[question.id] === 'yes' && { color: colors.white }]}>{tx('Ja', 'Yes')}</Text></Pressable>
            </View>
          </Card>
        ))}
      </View>
      {complete ? (
        <Card tone="cyan"><View style={safetyStyles.calmResult}><ShieldCheck color={colors.success} size={24} /><View style={safetyStyles.resultCopy}><Text style={safetyStyles.resultTitle}>{tx('Keine dieser Warnangaben ausgewählt.', 'None of these warning signs selected.')}</Text><Text style={safetyStyles.resultText}>{tx('Du kannst mit einer ruhigen Übung fortfahren. Wenn sich etwas verschlechtert, hole reale Hilfe.', 'You can continue with a calm exercise. If anything gets worse, seek real-world help.')}</Text></View></View></Card>
      ) : null}
      <Button label={tx('Zur ruhigen Unterstützung', 'Continue to calm support')} onPress={() => router.replace('/(tabs)/help')} disabled={!complete} />
      <Text style={safetyStyles.prototypeNote}>{tx('Bei Unsicherheit oder Verschlechterung nicht auf den Prototyp verlassen.', 'Do not rely on the prototype if you are unsure or the situation gets worse.')}</Text>
    </AppScreen>
  );
}

const safetyStyles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  questions: { marginTop: spacing[6] },
  questionHeader: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  questionIndex: { color: colors.cyan400, fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1, marginTop: 3 },
  question: { flex: 1, color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 14, lineHeight: 21 },
  answerRow: { flexDirection: 'row', gap: spacing[2], marginTop: spacing[4] },
  answer: { flex: 1, minHeight: 44, borderRadius: 13, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  answerNo: { backgroundColor: colors.success, borderColor: colors.success },
  answerYes: { backgroundColor: colors.emergency, borderColor: colors.emergency },
  answerText: { color: colors.gray, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  answerTextActive: { color: colors.black },
  calmResult: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  resultCopy: { flex: 1 },
  resultTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 13, marginBottom: 5 },
  resultText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  prototypeNote: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 16, textAlign: 'center', marginTop: spacing[4] },
  emergencyScreen: { justifyContent: 'center' },
  emergencyIcon: { width: 74, height: 74, borderRadius: 24, backgroundColor: colors.emergency, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[6] },
  emergencyBody: { marginTop: spacing[4] },
  emergencyCard: { marginTop: spacing[6] },
  emergencyStep: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginVertical: spacing[2] },
  emergencyIndex: { color: colors.emergency, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
  emergencyText: { flex: 1, color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 13, lineHeight: 20 },
  actions: { gap: spacing[2], marginTop: spacing[4] },
});
