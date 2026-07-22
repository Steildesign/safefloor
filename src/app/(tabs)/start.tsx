import { router } from 'expo-router';
import { ArrowUpRight, BookOpen, HeartHandshake, MapPin, Plus, ShieldCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { AlertCard } from '@/components/alert-card';
import { BrandMark } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppScreen, Body, BrandWordmark, Button, Card, Chip, SectionTitle, Title } from '@/components/ui';
import { getAlerts } from '@/data/mock';
import { useI18n } from '@/i18n/provider';
import { colors, spacing } from '@/theme/tokens';

export default function StartScreen() {
  const { locale, tx } = useI18n();
  const alerts = getAlerts(locale);
  return (
    <AppScreen>
      <SeoHead title="Start" description="Lokale Hinweise, ruhige Orientierung und schneller Zugang zu SAFEFLOOR Hilfe." noIndex />
      <View style={startStyles.topRow}>
        <BrandWordmark compact />
        <View style={startStyles.menuPlaceholder} />
      </View>

      <View style={startStyles.hero}>
        <View style={startStyles.heroCopy}>
          <Text style={startStyles.overline}>{tx('GUTEN ABEND · BERLIN', 'GOOD EVENING · BERLIN')}</Text>
          <Title>{tx('Bleib informiert.', 'Stay informed.')}{`\n`}{tx('Bleib bei dir.', 'Stay grounded.')}</Title>
          <Body muted style={startStyles.heroBody}>{tx('Hinweise aus deiner Umgebung, ruhig eingeordnet.', 'Updates from around you, calmly put into context.')}</Body>
        </View>
        <BrandMark size={88} />
      </View>

      <View style={startStyles.locationRow}>
        <Chip label={tx('Berlin · manuell gewählt', 'Berlin · selected manually')} active />
        <View style={startStyles.offline}><View style={startStyles.offlineDot} /><Text style={startStyles.offlineText}>{tx('Basiswissen offline', 'Core knowledge offline')}</Text></View>
      </View>

      <SectionTitle action={tx('Alle ansehen', 'View all')}>{tx('Relevant für dich', 'Relevant to you')}</SectionTitle>
      <AlertCard alert={alerts[0]} onPress={() => router.push({ pathname: '/alert/[id]', params: { id: alerts[0].id } })} />

      <View style={startStyles.buttonGap}>
        <Button label={tx('Anonyme Meldung starten', 'Start anonymous report')} icon={Plus} tone="amber" onPress={() => router.push('/report')} />
      </View>

      <SectionTitle>{tx('Schneller Zugang', 'Quick access')}</SectionTitle>
      <ActionRow icon={HeartHandshake} title={tx('Ich brauche gerade Ruhe', 'I need calm right now')} detail={tx('Atemhilfe, Malen, Erdung oder ein ruhiges Gespräch.', 'Breathing, drawing, grounding or a calm conversation.')} onPress={() => router.push('/(tabs)/help')} />
      <ActionRow icon={ShieldCheck} title={tx('Nachsorge & Ressourcen', 'Aftercare & resources')} detail={tx('Runterkommen, lokale Hilfe und nächste Schritte.', 'Come down, find local help and plan next steps.')} onPress={() => router.push('/aftercare')} />
      <ActionRow icon={BookOpen} title={tx('Geprüftes Wissen', 'Verified knowledge')} detail={tx('Strukturierte Risiko- und Warninformationen.', 'Structured risk and warning information.')} onPress={() => router.push('/(tabs)/knowledge')} />

      <SectionTitle>{tx('Heute hilfreich', 'Helpful today')}</SectionTitle>
      <Card tone="cyan" onPress={() => router.push({ pathname: '/alert/[id]', params: { id: alerts[1].id } })} accessibilityLabel={tx('Wasserstation geöffnet', 'Water station open')}>
        <View style={startStyles.resourceRow}>
          <View style={startStyles.resourceIcon}><MapPin color={colors.cyan400} size={22} /></View>
          <View style={startStyles.resourceCopy}>
            <Text style={startStyles.resourceTitle}>{tx('Wasserstation geöffnet', 'Water station open')}</Text>
            <Text style={startStyles.resourceMeta}>{tx('Bereich Nord · 0,4 km · Partner bestätigt', 'North area · 0.4 km · Partner confirmed')}</Text>
          </View>
          <ArrowUpRight color={colors.cyan400} size={20} />
        </View>
      </Card>
    </AppScreen>
  );
}

const startStyles = StyleSheet.create({
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: spacing[3], marginBottom: spacing[8] },
  menuPlaceholder: { width: 44, height: 44 },
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
