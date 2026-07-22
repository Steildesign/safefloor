import { router, useLocalSearchParams } from 'expo-router';
import { Clock3, Map, MapPin, ShieldCheck, UserRoundCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { alerts, getAlerts } from '@/data/mock';
import { colors, radii, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

export function generateStaticParams(): { id: string }[] {
  return alerts.map((alert) => ({ id: alert.id }));
}

export default function AlertDetailScreen() {
  const { locale, tx } = useI18n();
  const { id } = useLocalSearchParams<{ id: string }>();
  const localizedAlerts = getAlerts(locale);
  const alert = localizedAlerts.find((item) => item.id === id) ?? localizedAlerts[0];

  return (
    <AppScreen>
      <SeoHead title={alert.title} description={alert.body} noIndex />
      <AppHeader title={tx('Hinweis', 'Notice')} back />
      <Eyebrow tone={alert.kind === 'community' ? 'amber' : 'cyan'}>{alert.eyebrow}</Eyebrow>
      <Title>{alert.title}</Title>
      <Body style={detailStyles.lead}>{alert.body}</Body>
      <View style={detailStyles.metaGrid}>
        <Card style={detailStyles.metaCard}><ShieldCheck color={colors.cyan400} size={20} /><Text style={detailStyles.metaLabel}>Status</Text><Text style={detailStyles.metaValue}>{alert.confidence}</Text></Card>
        <Card style={detailStyles.metaCard}><Clock3 color={colors.cyan400} size={20} /><Text style={detailStyles.metaLabel}>{tx('Aktualität', 'Freshness')}</Text><Text style={detailStyles.metaValue}>{alert.time}</Text></Card>
      </View>

      <View style={detailStyles.map}>
        <View style={[detailStyles.road, { top: 78, transform: [{ rotate: '-9deg' }] }]} />
        <View style={[detailStyles.road, { top: 125, transform: [{ rotate: '16deg' }] }]} />
        <View style={detailStyles.area}><View style={detailStyles.areaCore} /></View>
        <View style={detailStyles.mapLabel}><MapPin color={colors.amber400} size={16} /><Text style={detailStyles.mapText}>{alert.location}</Text></View>
        <Text style={detailStyles.mapPrivacy}>{tx('Absichtlich unscharfer Bereich', 'Intentionally approximate area')}</Text>
      </View>

      <SectionTitle>{tx('Was du jetzt tun kannst', 'What you can do now')}</SectionTitle>
      <Card><View style={detailStyles.step}><Text style={detailStyles.stepIndex}>01</Text><Text style={detailStyles.stepText}>{tx('Achte auf ungewöhnliche Warnzeichen und bleibe nicht allein.', 'Look for unusual warning signs and do not stay alone.')}</Text></View></Card>
      <Card><View style={detailStyles.step}><Text style={detailStyles.stepIndex}>02</Text><Text style={detailStyles.stepText}>{tx('Nutze eine Wasserstation, Ruhezone oder ein Awareness-Team vor Ort.', 'Use a water station, quiet area or the on-site awareness team.')}</Text></View></Card>
      <Card><View style={detailStyles.step}><Text style={detailStyles.stepIndex}>03</Text><Text style={detailStyles.stepText}>{tx('Bei Bewusstlosigkeit, schwerer Atemnot oder akuter Gefahr sofort 112.', 'Call 112 immediately for unconsciousness, severe breathing difficulty or immediate danger.')}</Text></View></Card>

      <SectionTitle>{tx('Transparenz', 'Transparency')}</SectionTitle>
      <Card tone="cyan">
        <View style={detailStyles.transparency}><UserRoundCheck color={colors.cyan400} size={24} /><Text style={detailStyles.transparencyText}>{tx('Diese Demo zeigt keine Rohmeldungen oder identifizierenden Texte. Der veröffentlichte Hinweis wäre neutral redigiert und zeitlich begrenzt.', 'This demo shows no raw reports or identifying text. A published notice would be neutrally edited and time-limited.')}</Text></View>
      </Card>
      <View style={detailStyles.actions}>
        <Button label={tx('Hilfe öffnen', 'Open support')} onPress={() => router.push('/(tabs)/help')} />
        <Button label={tx('Kartenansicht', 'Map view')} icon={Map} tone="ghost" onPress={() => router.push('/(tabs)/community')} />
      </View>
    </AppScreen>
  );
}

const detailStyles = StyleSheet.create({
  lead: { marginTop: spacing[4] },
  metaGrid: { flexDirection: 'row', gap: spacing[3], marginTop: spacing[6] },
  metaCard: { flex: 1, minHeight: 118 },
  metaLabel: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: spacing[3] },
  metaValue: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 12, lineHeight: 17, marginTop: 4 },
  map: { height: 205, borderRadius: radii.panel, borderWidth: 1, borderColor: colors.line, backgroundColor: '#081824', overflow: 'hidden', marginTop: spacing[3] },
  road: { position: 'absolute', left: '-10%', width: '120%', height: 2, backgroundColor: 'rgba(112,229,255,0.14)' },
  area: { position: 'absolute', width: 110, height: 110, borderRadius: 110, left: '38%', top: 40, backgroundColor: 'rgba(255,184,77,0.07)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.4)', alignItems: 'center', justifyContent: 'center' },
  areaCore: { width: 14, height: 14, borderRadius: 14, backgroundColor: colors.amber400 },
  mapLabel: { position: 'absolute', left: spacing[4], top: spacing[4], flexDirection: 'row', gap: 7, alignItems: 'center' },
  mapText: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 12 },
  mapPrivacy: { position: 'absolute', right: spacing[4], bottom: spacing[3], color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9 },
  step: { flexDirection: 'row', gap: spacing[4], alignItems: 'flex-start' },
  stepIndex: { color: colors.amber400, fontFamily: 'Inter_600SemiBold', fontSize: 12, letterSpacing: 1 },
  stepText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  transparency: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  transparencyText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 19 },
  actions: { gap: spacing[2], marginTop: spacing[5] },
});
