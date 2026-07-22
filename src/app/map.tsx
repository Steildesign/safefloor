import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import { Crosshair, LocateFixed, MapPin, ShieldCheck, TriangleAlert } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { SafetyMap } from '@/components/safety-map';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Chip } from '@/components/ui';
import { getMapPlaces } from '@/data/mock';
import { MapFilter, mapPlaceColor } from '@/features/safety-map';
import { useI18n } from '@/i18n/provider';
import { colors, radii, spacing } from '@/theme/tokens';

type LocationState = 'idle' | 'loading' | 'visible' | 'denied' | 'error';

export default function CommunityMapScreen() {
  const { tx, locale } = useI18n();
  const params = useLocalSearchParams<{ selected?: string }>();
  const places = getMapPlaces(locale);
  const [filter, setFilter] = useState<MapFilter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userCoordinate, setUserCoordinate] = useState<[number, number] | null>(null);
  const [locationState, setLocationState] = useState<LocationState>('idle');
  const selectedPlace = useMemo(() => places.find((place) => place.id === selectedId) ?? null, [places, selectedId]);

  useEffect(() => {
    if (!params.selected) return;
    const syncSelection = setTimeout(() => setSelectedId(params.selected ?? null), 0);
    return () => clearTimeout(syncSelection);
  }, [params.selected]);

  const requestLocation = async () => {
    if (locationState === 'loading') return;
    setLocationState('loading');
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        setLocationState('denied');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Low });
      setUserCoordinate([position.coords.longitude, position.coords.latitude]);
      setLocationState('visible');
    } catch {
      setLocationState('error');
    }
  };

  const filters: { id: MapFilter; label: string }[] = [
    { id: 'all', label: tx('Alle', 'All') },
    { id: 'warning', label: tx('Hinweise', 'Notices') },
    { id: 'resource', label: tx('Ressourcen', 'Resources') },
    { id: 'support', label: tx('Hilfe', 'Support') },
  ];

  return (
    <AppScreen scroll={false} padded={false} motion="none">
      <SeoHead title={tx('Community-Karte Berlin', 'Berlin community map')} description={tx('Interaktive SAFEFLOOR Karte mit bewusst ungenauen Hinweiszonen und Demo-Ressourcen.', 'Interactive SAFEFLOOR map with deliberately approximate notice zones and demo resources.')} noIndex />
      <View style={mapScreenStyles.topBar}>
        <AppHeader title={tx('Berlin-Karte', 'Berlin map')} eyebrow={tx('PRIVATSPHÄRE ZUERST', 'PRIVACY FIRST')} back right={
          <Pressable accessibilityRole="button" accessibilityLabel={tx('Meinen Standort anzeigen', 'Show my location')} onPress={requestLocation} style={({ pressed }) => [mapScreenStyles.locationButton, locationState === 'visible' && mapScreenStyles.locationButtonActive, pressed && mapScreenStyles.pressed]}>
            {locationState === 'loading' ? <ActivityIndicator color={colors.cyan300} size="small" /> : <LocateFixed color={locationState === 'visible' ? colors.cyan300 : colors.white} size={20} />}
          </Pressable>
        } />
        <View style={mapScreenStyles.filterRow}>{filters.map((item) => <Chip key={item.id} label={item.label} active={filter === item.id} onPress={() => { setFilter(item.id); setSelectedId(null); }} />)}</View>
        <Text style={mapScreenStyles.privacyText}>{tx('Meldepunkte werden verschoben und nur als grobe Zonen gezeigt. Dein Standort wird nicht veröffentlicht.', 'Report points are displaced and only shown as broad zones. Your location is never published.')}</Text>
      </View>

      <View style={mapScreenStyles.mapFrame}>
        <SafetyMap places={places} filter={filter} selectedId={selectedId} userCoordinate={userCoordinate} onSelect={setSelectedId} />

        <View pointerEvents="box-none" style={mapScreenStyles.mapChrome}>
          {locationState === 'denied' || locationState === 'error' ? (
            <View style={mapScreenStyles.locationNotice}>
              <Crosshair color={colors.amber400} size={16} />
              <Text style={mapScreenStyles.locationNoticeText}>{locationState === 'denied' ? tx('Standort nicht freigegeben. Die Karte funktioniert trotzdem.', 'Location not shared. The map still works.') : tx('Standort konnte nicht ermittelt werden.', 'Location could not be determined.')}</Text>
            </View>
          ) : null}

          <View style={mapScreenStyles.sheet}>
            <View style={mapScreenStyles.handle} />
            {selectedPlace ? (
              <>
                <View style={mapScreenStyles.sheetHeader}>
                  <View style={[mapScreenStyles.placeIcon, { borderColor: `${mapPlaceColor(selectedPlace.kind)}66`, backgroundColor: `${mapPlaceColor(selectedPlace.kind)}14` }]}>
                    {selectedPlace.kind === 'warning' ? <TriangleAlert color={mapPlaceColor(selectedPlace.kind)} size={21} /> : selectedPlace.kind === 'support' ? <ShieldCheck color={mapPlaceColor(selectedPlace.kind)} size={21} /> : <MapPin color={mapPlaceColor(selectedPlace.kind)} size={21} />}
                  </View>
                  <View style={mapScreenStyles.sheetCopy}>
                    <Text style={mapScreenStyles.sheetStatus}>{selectedPlace.status}</Text>
                    <Text style={mapScreenStyles.sheetTitle}>{selectedPlace.title}</Text>
                    <Text style={mapScreenStyles.sheetArea}>{selectedPlace.area} · ≈ {selectedPlace.radiusMeters} m</Text>
                  </View>
                </View>
                <Text style={mapScreenStyles.sheetBody}>{selectedPlace.detail}</Text>
              </>
            ) : (
              <View style={mapScreenStyles.emptySelection}>
                <View style={mapScreenStyles.placeIcon}><MapPin color={colors.cyan400} size={21} /></View>
                <View style={mapScreenStyles.sheetCopy}><Text style={mapScreenStyles.sheetStatus}>{tx('INTERAKTIVE DEMO', 'INTERACTIVE DEMO')}</Text><Text style={mapScreenStyles.sheetTitle}>{tx('Tippe eine Zone auf der Karte an', 'Tap a zone on the map')}</Text><Text style={mapScreenStyles.sheetBody}>{tx('Straßen und Orientierungspunkte stammen aus OpenStreetMap.', 'Roads and landmarks come from OpenStreetMap.')}</Text></View>
              </View>
            )}
            <View style={mapScreenStyles.attributionRow}>
              <Pressable onPress={() => Linking.openURL('https://www.openstreetmap.org/copyright')} accessibilityRole="link"><Text style={mapScreenStyles.attribution}>© OpenStreetMap contributors</Text></Pressable>
              <Text style={mapScreenStyles.attribution}>·</Text>
              <Pressable onPress={() => Linking.openURL('https://carto.com/attributions')} accessibilityRole="link"><Text style={mapScreenStyles.attribution}>© CARTO</Text></Pressable>
            </View>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const mapScreenStyles = StyleSheet.create({
  topBar: { paddingHorizontal: spacing[5], paddingBottom: spacing[3], backgroundColor: 'rgba(5,13,23,0.94)', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  locationButton: { width: 44, height: 44, borderRadius: 16, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.line, backgroundColor: 'rgba(11,29,44,0.88)' },
  locationButtonActive: { borderColor: 'rgba(33,212,255,0.52)', backgroundColor: 'rgba(33,212,255,0.11)' },
  filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: spacing[1] },
  privacyText: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, lineHeight: 14, marginTop: spacing[3] },
  mapFrame: { flex: 1, minHeight: 440, position: 'relative', overflow: 'hidden' },
  mapChrome: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'flex-end', paddingHorizontal: spacing[3], paddingTop: spacing[3], paddingBottom: spacing[3] },
  locationNotice: { alignSelf: 'center', maxWidth: 330, flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingHorizontal: spacing[3], paddingVertical: 10, marginBottom: spacing[2], borderRadius: radii.round, backgroundColor: 'rgba(5,13,23,0.93)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.34)' },
  locationNoticeText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_500Medium', fontSize: 10, lineHeight: 14 },
  sheet: { borderRadius: 23, padding: spacing[4], paddingTop: 10, backgroundColor: 'rgba(5,15,25,0.96)', borderWidth: 1, borderColor: 'rgba(112,229,255,0.22)', shadowColor: '#000', shadowOpacity: 0.45, shadowRadius: 24, shadowOffset: { width: 0, height: 12 } },
  handle: { width: 42, height: 4, borderRadius: 4, backgroundColor: 'rgba(137,149,166,0.35)', alignSelf: 'center', marginBottom: spacing[3] },
  sheetHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  emptySelection: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  placeIcon: { width: 44, height: 44, borderRadius: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(33,212,255,0.28)', backgroundColor: 'rgba(33,212,255,0.07)' },
  sheetCopy: { flex: 1 },
  sheetStatus: { color: colors.cyan400, fontFamily: 'Inter_700Bold', fontSize: 8, letterSpacing: 1.15 },
  sheetTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15, marginTop: 3 },
  sheetArea: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 4 },
  sheetBody: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17, marginTop: spacing[3] },
  attributionRow: { flexDirection: 'row', gap: 5, flexWrap: 'wrap', marginTop: spacing[3], paddingTop: spacing[2], borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.line },
  attribution: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 8 },
  pressed: { opacity: 0.72, transform: [{ scale: 0.96 }] },
});
