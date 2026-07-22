import { router } from 'expo-router';
import { BookHeart, ChevronRight, HeartPulse, MoonStar, Phone, Salad, Sparkles, UsersRound } from 'lucide-react-native';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppHeader, AppScreen, Body, Card, Chip, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { getResources } from '@/data/mock';
import { colors, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

export default function AftercareScreen() {
  const { locale, tx } = useI18n();
  const resources = getResources(locale);
  const [physical, setPhysical] = useState<string | null>(null);
  const [emotional, setEmotional] = useState<string | null>(null);

  return (
    <AppScreen>
      <SeoHead title="Nachsorge und Ressourcen" description="Ruhige Nachsorge, lokaler Check-in und reale Hilfsressourcen in SAFEFLOOR." noIndex />
      <AppHeader title={tx('Nachsorge', 'Aftercare')} back />
      <Eyebrow tone="amber">{tx('DU BIST WICHTIG', 'YOU MATTER')}</Eyebrow>
      <Title>{tx('Kümmere dich um dich.', 'Take care of yourself.')}</Title>
      <Body muted style={aftercareStyles.intro}>{tx('Kleine nächste Schritte, ohne Bewertung und ohne Gesundheits-Score.', 'Small next steps, without judgement or a health score.')}</Body>

      <SectionTitle>{tx('Was hilft jetzt?', 'What might help now?')}</SectionTitle>
      <ActionRow icon={Sparkles} title={tx('Reize reduzieren', 'Reduce stimulation')} detail={tx('Licht, Lautstärke und Anforderungen für einen Moment senken.', 'Lower light, volume and demands for a moment.')} onPress={() => router.push('/grounding')} />
      <ActionRow icon={MoonStar} title={tx('Schlaf & Erholung', 'Sleep & recovery')} detail={tx('Ruhige Umgebung vorbereiten und Unterstützung einplanen.', 'Prepare a calm environment and arrange support.')} onPress={() => {}} />
      <ActionRow icon={Salad} title={tx('Essen & Flüssigkeit', 'Food & fluids')} detail={tx('Allgemeine, später fachlich zu prüfende Nachsorgehinweise.', 'General aftercare guidance pending professional review.')} onPress={() => {}} />
      <ActionRow icon={BookHeart} title={tx('Privates Journal', 'Private journal')} detail={tx('Im Prototyp nur als lokales Modul vorgesehen.', 'Planned as a local-only module in the prototype.')} onPress={() => {}} />

      <SectionTitle>{tx('Freiwilliger Check-in', 'Optional check-in')}</SectionTitle>
      <Card>
        <Text style={aftercareStyles.question}>{tx('Wie fühlst du dich körperlich?', 'How do you feel physically?')}</Text>
        <View style={aftercareStyles.chips}>{[tx('Ruhig', 'Calm'), tx('Erschöpft', 'Exhausted'), tx('Unwohl', 'Unwell')].map((item) => <Chip key={item} label={item} active={physical === item} onPress={() => setPhysical(item)} />)}</View>
        <Text style={aftercareStyles.question}>{tx('Wie fühlst du dich emotional?', 'How do you feel emotionally?')}</Text>
        <View style={aftercareStyles.chips}>{[tx('Stabil', 'Stable'), tx('Empfindlich', 'Sensitive'), tx('Überfordert', 'Overwhelmed')].map((item) => <Chip key={item} label={item} active={emotional === item} onPress={() => setEmotional(item)} />)}</View>
        {physical || emotional ? <View style={aftercareStyles.checkinResult}><HeartPulse color={colors.success} size={19} /><Text style={aftercareStyles.checkinText}>{tx('Nur auf diesem Bildschirm ausgewählt. Keine Diagnose, kein Score, keine Speicherung.', 'Selected only on this screen. No diagnosis, score or storage.')}</Text></View> : null}
      </Card>

      <SectionTitle>{tx('Reale Hilfe', 'Real-world help')}</SectionTitle>
      {resources.map((resource) => (
        <Pressable
          key={resource.id}
          accessibilityRole="button"
          accessibilityLabel={`${resource.title}, ${resource.type}`}
          onPress={() => resource.phone ? Linking.openURL(`tel:${resource.phone}`) : undefined}
          style={({ pressed }) => [aftercareStyles.resource, pressed && { opacity: 0.75 }]}
        >
          <View style={[aftercareStyles.resourceIcon, resource.id === 'emergency' && aftercareStyles.resourceIconEmergency]}>
            {resource.phone ? <Phone color={resource.id === 'emergency' ? colors.emergency : colors.cyan400} size={20} /> : <UsersRound color={colors.cyan400} size={20} />}
          </View>
          <View style={aftercareStyles.resourceCopy}><Text style={aftercareStyles.resourceTitle}>{resource.title}</Text><Text style={aftercareStyles.resourceType}>{resource.type}</Text><Text style={aftercareStyles.resourceDetail}>{resource.detail}</Text></View>
          <View style={aftercareStyles.resourceSide}><Text style={aftercareStyles.availability}>{resource.availability}</Text><ChevronRight color={colors.gray} size={18} /></View>
        </Pressable>
      ))}
      <Text style={aftercareStyles.footer}>{tx('Ressourcen sind Demo-Daten. Öffnungszeiten und regionale Stellen müssen vor Beta redaktionell verifiziert werden.', 'Resources are demo data. Opening times and regional services must be editorially verified before beta.')}</Text>
    </AppScreen>
  );
}

const aftercareStyles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  question: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 13, marginBottom: spacing[2], marginTop: spacing[2] },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginBottom: spacing[4] },
  checkinResult: { borderTopWidth: 1, borderTopColor: colors.line, paddingTop: spacing[3], flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  checkinText: { flex: 1, color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17 },
  resource: { borderBottomWidth: 1, borderBottomColor: colors.line, paddingVertical: spacing[4], flexDirection: 'row', gap: spacing[3], alignItems: 'center' },
  resourceIcon: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(33,212,255,0.3)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(33,212,255,0.06)' },
  resourceIconEmergency: { borderColor: 'rgba(255,102,90,0.4)', backgroundColor: 'rgba(255,102,90,0.07)' },
  resourceCopy: { flex: 1 },
  resourceTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 16 },
  resourceType: { color: colors.cyan300, fontFamily: 'Inter_500Medium', fontSize: 10, marginTop: 3 },
  resourceDetail: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 15, marginTop: 5 },
  resourceSide: { alignItems: 'flex-end', gap: spacing[2], maxWidth: 90 },
  availability: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, textAlign: 'right' },
  footer: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: spacing[6], paddingHorizontal: spacing[4] },
});
