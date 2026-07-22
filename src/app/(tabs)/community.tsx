import { router } from 'expo-router';
import { ListFilter, Maximize2, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AlertCard } from '@/components/alert-card';
import { SafetyMap } from '@/components/safety-map';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Button, Chip, SectionTitle, Title, Body } from '@/components/ui';
import { getAlerts, getMapPlaces } from '@/data/mock';
import { colors, radii, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

export default function CommunityScreen() {
  const { locale, tx } = useI18n();
  const alerts = getAlerts(locale);
  const mapPlaces = getMapPlaces(locale);
  const filters = [
    { id: 'nearby', label: tx('In der Nähe', 'Nearby') },
    { id: 'current', label: tx('Aktuell', 'Current') },
    { id: 'resources', label: tx('Ressourcen', 'Resources') },
  ] as const;
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('nearby');
  const [selectedMapId, setSelectedMapId] = useState<string | null>(null);
  const visibleAlerts = filter === 'resources' ? alerts.filter((alert) => alert.kind === 'resource') : alerts;
  const selectedMapPlace = mapPlaces.find((place) => place.id === selectedMapId);

  return (
    <AppScreen>
      <SeoHead title="Community-Hinweise" description="Moderierte, lokale SAFEFLOOR Hinweise und Ressourcen ohne identifizierende Details." noIndex />
      <AppHeader title="Community" />
      <View style={communityStyles.intro}>
        <Title>{tx('Orientierung ohne Gerüchte.', 'Orientation without rumours.')}</Title>
        <Body muted style={communityStyles.introBody}>{tx('Nur gebündelte oder bestätigte Hinweise werden in diesem Prototyp öffentlich dargestellt.', 'Only grouped or confirmed notices are shown publicly in this prototype.')}</Body>
      </View>
      <View style={communityStyles.filters}>{filters.map((item) => <Chip key={item.id} label={item.label} active={filter === item.id} onPress={() => setFilter(item.id)} />)}</View>

      <View style={communityStyles.map}>
        <SafetyMap places={mapPlaces} compact selectedId={selectedMapId} onSelect={setSelectedMapId} />
        <View pointerEvents="box-none" style={communityStyles.mapOverlay}>
          <View style={communityStyles.mapHeader}>
            <View style={communityStyles.mapHeaderGlass}>
              <Text style={communityStyles.mapTitle}>{tx('Berlin · echte Straßenkarte', 'Berlin · real street map')}</Text>
              <Text style={communityStyles.mapSubtitle}>{tx('Zonen statt exakter Meldepunkte', 'Zones instead of exact report locations')}</Text>
            </View>
            <Pressable accessibilityRole="button" accessibilityLabel={tx('Karte vergrößern', 'Expand map')} onPress={() => router.push('/map')} style={({ pressed }) => [communityStyles.expandButton, pressed && communityStyles.pressed]}>
              <Maximize2 color={colors.white} size={18} />
            </Pressable>
          </View>
          {selectedMapPlace ? (
            <Pressable accessibilityRole="button" accessibilityLabel={tx('Ausgewählten Kartenpunkt in Vollbild öffnen', 'Open selected map point full screen')} onPress={() => router.push({ pathname: '/map', params: { selected: selectedMapPlace.id } })} style={({ pressed }) => [communityStyles.mapSelection, pressed && communityStyles.pressed]}>
              <View style={[communityStyles.selectionDot, selectedMapPlace.kind === 'warning' ? communityStyles.selectionAmber : selectedMapPlace.kind === 'support' ? communityStyles.selectionMint : communityStyles.selectionCyan]} />
              <View style={communityStyles.selectionCopy}><Text numberOfLines={1} style={communityStyles.selectionTitle}>{selectedMapPlace.title}</Text><Text numberOfLines={1} style={communityStyles.selectionArea}>{selectedMapPlace.area}</Text></View>
              <Maximize2 color={colors.cyan300} size={16} />
            </Pressable>
          ) : (
            <View style={communityStyles.mapLegend}><View style={communityStyles.legendDotAmber} /><Text style={communityStyles.legendText}>{tx('Hinweiszone', 'Notice zone')}</Text><View style={communityStyles.legendDotCyan} /><Text style={communityStyles.legendText}>{tx('Hilfe', 'Support')}</Text></View>
          )}
        </View>
      </View>

      <SectionTitle action={`${visibleAlerts.length} ${tx('Hinweise', 'notices')}`}>{tx('Aktuell eingeordnet', 'Currently contextualised')}</SectionTitle>
      {visibleAlerts.map((alert) => <AlertCard key={alert.id} alert={alert} onPress={() => router.push({ pathname: '/alert/[id]', params: { id: alert.id } })} />)}

      <View style={communityStyles.reportButton}>
        <Button label={tx('Beobachtung melden', 'Report an observation')} icon={Plus} tone="amber" onPress={() => router.push('/report')} />
      </View>
      <View style={communityStyles.moderationNote}>
        <ListFilter color={colors.gray} size={18} />
        <Text style={communityStyles.moderationText}>{tx('Neue Meldungen erscheinen nie automatisch. Veröffentlichung erfordert Moderation oder Partnerbestätigung.', 'New reports never appear automatically. Publication requires moderation or partner confirmation.')}</Text>
      </View>
    </AppScreen>
  );
}

const communityStyles = StyleSheet.create({
  intro: { marginTop: spacing[3] },
  introBody: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[5] },
  map: { height: 252, borderRadius: radii.panel, borderWidth: 1, borderColor: 'rgba(112,229,255,0.23)', backgroundColor: '#081824', marginTop: spacing[5], overflow: 'hidden' },
  mapOverlay: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'space-between', padding: spacing[3] },
  mapHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: spacing[2] },
  mapHeaderGlass: { paddingHorizontal: 11, paddingVertical: 9, borderRadius: 14, backgroundColor: 'rgba(4,12,20,0.86)', borderWidth: 1, borderColor: 'rgba(112,229,255,0.16)' },
  mapTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  mapSubtitle: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 3 },
  expandButton: { width: 42, height: 42, borderRadius: 15, borderWidth: 1, borderColor: 'rgba(112,229,255,0.24)', backgroundColor: 'rgba(4,12,20,0.88)', alignItems: 'center', justifyContent: 'center' },
  mapLegend: { alignSelf: 'flex-end', borderRadius: 99, backgroundColor: 'rgba(5,13,23,0.88)', flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 10, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(112,229,255,0.12)' },
  legendDotAmber: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.amber400 },
  legendDotCyan: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.cyan400, marginLeft: 4 },
  legendText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 9 },
  mapSelection: { minHeight: 58, borderRadius: 17, paddingHorizontal: spacing[3], flexDirection: 'row', alignItems: 'center', gap: spacing[3], backgroundColor: 'rgba(4,12,20,0.92)', borderWidth: 1, borderColor: 'rgba(112,229,255,0.18)' },
  selectionDot: { width: 10, height: 10, borderRadius: 10 },
  selectionAmber: { backgroundColor: colors.amber400 },
  selectionCyan: { backgroundColor: colors.cyan400 },
  selectionMint: { backgroundColor: '#6FE7C8' },
  selectionCopy: { flex: 1 },
  selectionTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  selectionArea: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  pressed: { opacity: 0.74, transform: [{ scale: 0.98 }] },
  reportButton: { marginTop: spacing[2] },
  moderationNote: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginTop: spacing[5], paddingHorizontal: spacing[2] },
  moderationText: { flex: 1, color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17 },
});
