import { router } from 'expo-router';
import { ListFilter, Map, Plus } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AlertCard } from '@/components/alert-card';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Button, Chip, SectionTitle, Title, Body } from '@/components/ui';
import { alerts } from '@/data/mock';
import { colors, radii, spacing } from '@/theme/tokens';

const filters = ['In der Nähe', 'Aktuell', 'Ressourcen'];

export default function CommunityScreen() {
  const [filter, setFilter] = useState(filters[0]);
  const visibleAlerts = useMemo(() => filter === 'Ressourcen' ? alerts.filter((alert) => alert.kind === 'resource') : alerts, [filter]);

  return (
    <AppScreen>
      <SeoHead title="Community-Hinweise" description="Moderierte, lokale SAFEFLOOR Hinweise und Ressourcen ohne identifizierende Details." noIndex />
      <AppHeader title="Community" />
      <View style={communityStyles.intro}>
        <Title>Orientierung ohne Gerüchte.</Title>
        <Body muted style={communityStyles.introBody}>Nur gebündelte oder bestätigte Hinweise werden in diesem Prototyp öffentlich dargestellt.</Body>
      </View>
      <View style={communityStyles.filters}>{filters.map((item) => <Chip key={item} label={item} active={filter === item} onPress={() => setFilter(item)} />)}</View>

      <Pressable accessibilityRole="button" accessibilityLabel="Kartenansicht öffnen" onPress={() => setFilter(filter === 'Ressourcen' ? 'In der Nähe' : 'Ressourcen')} style={({ pressed }) => [communityStyles.map, pressed && { opacity: 0.82 }]}>
        <View style={communityStyles.mapGrid} />
        <View style={[communityStyles.mapRoad, communityStyles.mapRoadOne]} />
        <View style={[communityStyles.mapRoad, communityStyles.mapRoadTwo]} />
        <View style={[communityStyles.mapPulse, communityStyles.mapPulseAmber]}><View style={communityStyles.mapCoreAmber} /></View>
        <View style={[communityStyles.mapPulse, communityStyles.mapPulseCyan]}><View style={communityStyles.mapCoreCyan} /></View>
        <View style={communityStyles.mapHeader}><View><Text style={communityStyles.mapTitle}>Grobe Gebiete</Text><Text style={communityStyles.mapSubtitle}>Keine exakten Meldepunkte</Text></View><Map color={colors.cyan400} size={22} /></View>
        <View style={communityStyles.mapLegend}><View style={communityStyles.legendDotAmber} /><Text style={communityStyles.legendText}>Hinweis</Text><View style={communityStyles.legendDotCyan} /><Text style={communityStyles.legendText}>Ressource</Text></View>
      </Pressable>

      <SectionTitle action={`${visibleAlerts.length} Hinweise`}>Aktuell eingeordnet</SectionTitle>
      {visibleAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} onPress={() => router.push({ pathname: '/alert/[id]', params: { id: alert.id } })} />)}

      <View style={communityStyles.reportButton}>
        <Button label="Beobachtung melden" icon={Plus} tone="amber" onPress={() => router.push('/report')} />
      </View>
      <View style={communityStyles.moderationNote}>
        <ListFilter color={colors.gray} size={18} />
        <Text style={communityStyles.moderationText}>Neue Meldungen erscheinen nie automatisch. Veröffentlichung erfordert Moderation oder Partnerbestätigung.</Text>
      </View>
    </AppScreen>
  );
}

const communityStyles = StyleSheet.create({
  intro: { marginTop: spacing[3] },
  introBody: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[5] },
  map: { height: 208, borderRadius: radii.panel, borderWidth: 1, borderColor: colors.line, backgroundColor: '#081824', marginTop: spacing[5], overflow: 'hidden' },
  mapGrid: { position: 'absolute', inset: 0, opacity: 0.3, borderWidth: 28, borderColor: 'rgba(33,212,255,0.05)' } as never,
  mapRoad: { position: 'absolute', height: 2, width: '120%', backgroundColor: 'rgba(112,229,255,0.14)', left: '-10%' },
  mapRoadOne: { top: 104, transform: [{ rotate: '-12deg' }] },
  mapRoadTwo: { top: 142, transform: [{ rotate: '21deg' }] },
  mapPulse: { position: 'absolute', width: 58, height: 58, borderRadius: 58, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  mapPulseAmber: { right: 72, top: 70, borderColor: 'rgba(255,184,77,0.45)', backgroundColor: 'rgba(255,184,77,0.08)' },
  mapPulseCyan: { left: 52, bottom: 24, borderColor: 'rgba(33,212,255,0.45)', backgroundColor: 'rgba(33,212,255,0.07)' },
  mapCoreAmber: { width: 11, height: 11, borderRadius: 11, backgroundColor: colors.amber400 },
  mapCoreCyan: { width: 11, height: 11, borderRadius: 11, backgroundColor: colors.cyan400 },
  mapHeader: { position: 'absolute', left: spacing[4], right: spacing[4], top: spacing[4], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mapTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  mapSubtitle: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 3 },
  mapLegend: { position: 'absolute', right: spacing[4], bottom: spacing[3], borderRadius: 99, backgroundColor: 'rgba(5,13,23,0.82)', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 7 },
  legendDotAmber: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.amber400 },
  legendDotCyan: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.cyan400, marginLeft: 4 },
  legendText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 9 },
  reportButton: { marginTop: spacing[2] },
  moderationNote: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginTop: spacing[5], paddingHorizontal: spacing[2] },
  moderationText: { flex: 1, color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17 },
});
