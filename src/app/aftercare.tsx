import { router } from 'expo-router';
import { BookHeart, ChevronRight, HeartPulse, MoonStar, Phone, Salad, Sparkles, UsersRound } from 'lucide-react-native';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppHeader, AppScreen, Body, Card, Chip, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { resources } from '@/data/mock';
import { colors, spacing } from '@/theme/tokens';

export default function AftercareScreen() {
  const [physical, setPhysical] = useState<string | null>(null);
  const [emotional, setEmotional] = useState<string | null>(null);

  return (
    <AppScreen>
      <SeoHead title="Nachsorge und Ressourcen" description="Ruhige Nachsorge, lokaler Check-in und reale Hilfsressourcen in SAFEFLOOR." noIndex />
      <AppHeader title="Nachsorge" back />
      <Eyebrow tone="amber">DU BIST WICHTIG</Eyebrow>
      <Title>Kümmere dich um dich.</Title>
      <Body muted style={aftercareStyles.intro}>Kleine nächste Schritte, ohne Bewertung und ohne Gesundheits-Score.</Body>

      <SectionTitle>Was hilft jetzt?</SectionTitle>
      <ActionRow icon={Sparkles} title="Reize reduzieren" detail="Licht, Lautstärke und Anforderungen für einen Moment senken." onPress={() => router.push('/grounding')} />
      <ActionRow icon={MoonStar} title="Schlaf & Erholung" detail="Ruhige Umgebung vorbereiten und Unterstützung einplanen." onPress={() => {}} />
      <ActionRow icon={Salad} title="Essen & Flüssigkeit" detail="Allgemeine, später fachlich zu prüfende Nachsorgehinweise." onPress={() => {}} />
      <ActionRow icon={BookHeart} title="Privates Journal" detail="Im Prototyp nur als lokales Modul vorgesehen." onPress={() => {}} />

      <SectionTitle>Freiwilliger Check-in</SectionTitle>
      <Card>
        <Text style={aftercareStyles.question}>Wie fühlst du dich körperlich?</Text>
        <View style={aftercareStyles.chips}>{['Ruhig', 'Erschöpft', 'Unwohl'].map((item) => <Chip key={item} label={item} active={physical === item} onPress={() => setPhysical(item)} />)}</View>
        <Text style={aftercareStyles.question}>Wie fühlst du dich emotional?</Text>
        <View style={aftercareStyles.chips}>{['Stabil', 'Empfindlich', 'Überfordert'].map((item) => <Chip key={item} label={item} active={emotional === item} onPress={() => setEmotional(item)} />)}</View>
        {physical || emotional ? <View style={aftercareStyles.checkinResult}><HeartPulse color={colors.success} size={19} /><Text style={aftercareStyles.checkinText}>Nur auf diesem Bildschirm ausgewählt. Keine Diagnose, kein Score, keine Speicherung.</Text></View> : null}
      </Card>

      <SectionTitle>Reale Hilfe</SectionTitle>
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
      <Text style={aftercareStyles.footer}>Ressourcen sind Demo-Daten. Öffnungszeiten und regionale Stellen müssen vor Beta redaktionell verifiziert werden.</Text>
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
