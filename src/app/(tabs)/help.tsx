import { router } from 'expo-router';
import { HeartHandshake, Leaf, MessageCircle, Phone, ShieldAlert, Sparkles } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppHeader, AppScreen, Body, Card, SectionTitle, Title } from '@/components/ui';
import { colors, spacing } from '@/theme/tokens';

export default function HelpScreen() {
  return (
    <AppScreen>
      <SeoHead title="Hilfe" description="Ruhige Übungen, KI-Prototyp und klare Eskalationswege in SAFEFLOOR." noIndex />
      <AppHeader title="Dein Begleiter" />

      <View style={helpStyles.hero}>
        <BrandMark size={154} />
        <Text style={helpStyles.aiLabel}>KI-DEMO · NICHT MEDIZINISCH</Text>
        <Title style={helpStyles.center}>Was brauchst du gerade?</Title>
        <Body muted style={helpStyles.centerBody}>Du musst nichts erklären. Wähle einfach den nächsten kleinen Schritt.</Body>
      </View>

      <ActionRow icon={Sparkles} title="Ich brauche Ruhe" detail="Starte eine langsame Atem- oder Erdungsübung." onPress={() => router.push('/breathing')} />
      <ActionRow icon={Leaf} title="Ich möchte mich erden" detail="Gehe ruhig durch die 5–4–3–2–1-Übung." onPress={() => router.push('/grounding')} />
      <ActionRow icon={MessageCircle} title="Ich möchte sprechen" detail="Öffne einen simulierten, ruhig begrenzten KI-Dialog." onPress={() => router.push('/chat')} />
      <ActionRow icon={HeartHandshake} title="Ich sorge mich um jemanden" detail="Prüfe zuerst klar beobachtbare Warnzeichen." onPress={() => router.push('/safety-check')} tone="amber" />

      <SectionTitle>Reale Hilfe</SectionTitle>
      <Card tone="emergency" onPress={() => router.push('/safety-check')} accessibilityLabel="Dringende Hilfe und Notfallprüfung">
        <View style={helpStyles.emergencyRow}>
          <View style={helpStyles.emergencyIcon}><ShieldAlert color={colors.emergency} size={24} /></View>
          <View style={helpStyles.emergencyCopy}>
            <Text style={helpStyles.emergencyTitle}>Dringende Hilfe?</Text>
            <Text style={helpStyles.emergencyText}>Bei schweren Warnzeichen zeigt SAFEFLOOR sofort 112 und klare nächste Schritte.</Text>
          </View>
        </View>
      </Card>
      <ActionRow icon={Phone} title="Vertrauensperson" detail="Kontakt bleibt lokal und wird nie automatisch benachrichtigt." onPress={() => router.push('/trusted-contacts')} />

      <Text style={helpStyles.disclaimer}>Dieser Prototyp kann eine Situation nicht beurteilen. Bei Lebensgefahr sofort 112 anrufen.</Text>
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
