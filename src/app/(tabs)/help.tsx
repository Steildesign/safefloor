import { router } from 'expo-router';
import { HeartHandshake, Leaf, MessageCircle, Palette, Phone, ShieldAlert, Sparkles } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppHeader, AppScreen, Body, Card, SectionTitle, Title } from '@/components/ui';
import { colors, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

export default function HelpScreen() {
  const { tx } = useI18n();
  return (
    <AppScreen>
      <SeoHead title="Hilfe" description="Ruhige Übungen, KI-Prototyp und klare Eskalationswege in SAFEFLOOR." noIndex />
      <AppHeader title={tx('Dein Begleiter', 'Your companion')} />

      <View style={helpStyles.hero}>
        <BrandMark size={154} />
        <Text style={helpStyles.aiLabel}>{tx('KI-DEMO · NICHT MEDIZINISCH', 'AI DEMO · NOT MEDICAL')}</Text>
        <Title style={helpStyles.center}>{tx('Was brauchst du gerade?', 'What do you need right now?')}</Title>
        <Body muted style={helpStyles.centerBody}>{tx('Du musst nichts erklären. Wähle einfach den nächsten kleinen Schritt.', 'You do not need to explain anything. Just choose the next small step.')}</Body>
      </View>

      <ActionRow icon={Sparkles} title={tx('Ich brauche Ruhe', 'I need calm')} detail={tx('Starte eine langsame Atem- oder Erdungsübung.', 'Start a slow breathing or grounding exercise.')} onPress={() => router.push('/breathing')} />
      <ActionRow icon={Palette} title={tx('Ich möchte malen', 'I want to draw')} detail={tx('Lichtspuren folgen deinem Finger – ohne Ziel und ohne Bewertung.', 'Trails of light follow your finger – with no goal and no judgement.')} onPress={() => router.push('/canvas')} />
      <ActionRow icon={Leaf} title={tx('Ich möchte mich erden', 'I want to feel grounded')} detail={tx('Gehe ruhig durch die 5–4–3–2–1-Übung.', 'Move gently through the 5–4–3–2–1 exercise.')} onPress={() => router.push('/grounding')} />
      <ActionRow icon={MessageCircle} title={tx('Ich möchte sprechen', 'I want to talk')} detail={tx('Öffne einen simulierten, ruhig begrenzten KI-Dialog.', 'Open a simulated, calmly bounded AI conversation.')} onPress={() => router.push('/chat')} />
      <ActionRow icon={HeartHandshake} title={tx('Ich sorge mich um jemanden', 'I am worried about someone')} detail={tx('Prüfe zuerst klar beobachtbare Warnzeichen.', 'Check clearly observable warning signs first.')} onPress={() => router.push('/safety-check')} tone="amber" />

      <SectionTitle>{tx('Reale Hilfe', 'Real-world help')}</SectionTitle>
      <Card tone="emergency" onPress={() => router.push('/safety-check')} accessibilityLabel="Dringende Hilfe und Notfallprüfung">
        <View style={helpStyles.emergencyRow}>
          <View style={helpStyles.emergencyIcon}><ShieldAlert color={colors.emergency} size={24} /></View>
          <View style={helpStyles.emergencyCopy}>
            <Text style={helpStyles.emergencyTitle}>{tx('Dringende Hilfe?', 'Urgent help?')}</Text>
            <Text style={helpStyles.emergencyText}>{tx('Bei schweren Warnzeichen zeigt SAFEFLOOR sofort 112 und klare nächste Schritte.', 'For severe warning signs, SAFEFLOOR immediately shows 112 and clear next steps.')}</Text>
          </View>
        </View>
      </Card>
      <ActionRow icon={Phone} title={tx('Vertrauensperson', 'Trusted person')} detail={tx('Kontakt bleibt lokal und wird nie automatisch benachrichtigt.', 'The contact stays local and is never notified automatically.')} onPress={() => router.push('/trusted-contacts')} />

      <Text style={helpStyles.disclaimer}>{tx('Dieser Prototyp kann eine Situation nicht beurteilen. Bei Lebensgefahr sofort 112 anrufen.', 'This prototype cannot assess a situation. Call 112 immediately if a life is at risk.')}</Text>
    </AppScreen>
  );
}

const helpStyles = StyleSheet.create({
  hero: { alignItems: 'center', paddingTop: spacing[4], paddingBottom: spacing[8] },
  aiLabel: { color: colors.cyan400, fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1.55, marginTop: spacing[3], marginBottom: spacing[3] },
  center: { textAlign: 'center', fontSize: 27 },
  centerBody: { textAlign: 'center', fontSize: 14, lineHeight: 21, marginTop: spacing[3], maxWidth: 370 },
  emergencyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  emergencyIcon: { width: 50, height: 50, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,102,90,0.45)', alignItems: 'center', justifyContent: 'center' },
  emergencyCopy: { flex: 1 },
  emergencyTitle: { color: colors.emergency, fontFamily: 'Inter_600SemiBold', fontSize: 16, marginBottom: 5 },
  emergencyText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  disclaimer: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 16, textAlign: 'center', marginTop: spacing[6], paddingHorizontal: spacing[4] },
});
