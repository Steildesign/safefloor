import { router } from 'expo-router';
import { ArrowUpRight, BookOpen, HeartHandshake, MapPin, Plus, ShieldCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AlertCard } from '@/components/alert-card';
import { BrandMark } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppMenuButton, AppScreen, Body, BrandWordmark, Button, Card, Chip, SectionTitle, Title } from '@/components/ui';
import { alerts } from '@/data/mock';
import { colors, spacing } from '@/theme/tokens';

export default function StartScreen() {
  return (
    <AppScreen>
      <SeoHead title="Start" description="Lokale Hinweise, ruhige Orientierung und schneller Zugang zu SAFEFLOOR Hilfe." noIndex />
      <View style={startStyles.topRow}>
        <BrandWordmark compact />
        <AppMenuButton />
      </View>

      <View style={startStyles.hero}>
        <View style={startStyles.heroCopy}>
          <Text style={startStyles.overline}>GUTEN ABEND · BERLIN</Text>
          <Title>Bleib informiert.{`\n`}Bleib bei dir.</Title>
          <Body muted style={startStyles.heroBody}>Hinweise aus deiner Umgebung, ruhig eingeordnet.</Body>
        </View>
        <BrandMark size={88} />
      </View>

      <View style={startStyles.locationRow}>
        <Chip label="Berlin · manuell gewählt" active />
        <View style={startStyles.offline}><View style={startStyles.offlineDot} /><Text style={startStyles.offlineText}>Basiswissen offline</Text></View>
      </View>

      <SectionTitle action="Alle ansehen">Relevant für dich</SectionTitle>
      <AlertCard alert={alerts[0]} onPress={() => router.push({ pathname: '/alert/[id]', params: { id: alerts[0].id } })} />

      <View style={startStyles.buttonGap}>
        <Button label="Anonyme Meldung starten" icon={Plus} tone="amber" onPress={() => router.push('/report')} />
      </View>

      <SectionTitle>Schneller Zugang</SectionTitle>
      <ActionRow icon={HeartHandshake} title="Ich brauche gerade Ruhe" detail="Atemhilfe, Erdung oder ein ruhiges Gespräch." onPress={() => router.push('/(tabs)/help')} />
      <ActionRow icon={ShieldCheck} title="Nachsorge & Ressourcen" detail="Runterkommen, lokale Hilfe und nächste Schritte." onPress={() => router.push('/aftercare')} />
      <ActionRow icon={BookOpen} title="Geprüftes Wissen" detail="Strukturierte Risiko- und Warninformationen." onPress={() => router.push('/(tabs)/knowledge')} />

      <SectionTitle>Heute hilfreich</SectionTitle>
      <Card tone="cyan" onPress={() => router.push({ pathname: '/alert/[id]', params: { id: alerts[1].id } })} accessibilityLabel="Wasserstation geöffnet">
        <View style={startStyles.resourceRow}>
          <View style={startStyles.resourceIcon}><MapPin color={colors.cyan400} size={22} /></View>
          <View style={startStyles.resourceCopy}>
            <Text style={startStyles.resourceTitle}>Wasserstation geöffnet</Text>
            <Text style={startStyles.resourceMeta}>Bereich Nord · 0,4 km · Partner bestätigt</Text>
          </View>
          <ArrowUpRight color={colors.cyan400} size={20} />
        </View>
      </Card>
    </AppScreen>
  );
}

const startStyles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing[3], marginBottom: spacing[8] },
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  heroCopy: { flex: 1 },
  overline: { color: colors.amber400, fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.6, marginBottom: spacing[2] },
  heroBody: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  locationRow: { marginTop: spacing[6], flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: spacing[2] },
  offline: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  offlineDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.success },
  offlineText: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10 },
  buttonGap: { marginTop: spacing[1] },
  resourceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  resourceIcon: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(33,212,255,0.35)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(33,212,255,0.07)' },
  resourceCopy: { flex: 1 },
  resourceTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15, marginBottom: 5 },
  resourceMeta: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16 },
});
