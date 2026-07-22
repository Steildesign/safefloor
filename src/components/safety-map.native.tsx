import {
  Camera,
  type CameraRef,
  GeoJSONSource,
  Layer,
  Map,
} from '@maplibre/maplibre-react-native';
import { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  BERLIN_CENTER,
  mapFeatureCollection,
  SAFEFLOOR_MAP_STYLE,
  SafetyMapProps,
  visibleMapPlaces,
} from '@/features/safety-map';

export function SafetyMap({ places, filter = 'all', compact = false, selectedId, userCoordinate, onSelect }: SafetyMapProps) {
  const cameraRef = useRef<CameraRef>(null);
  const visiblePlaces = useMemo(() => visibleMapPlaces(places, filter), [filter, places]);
  const features = useMemo(() => mapFeatureCollection(visiblePlaces, selectedId), [selectedId, visiblePlaces]);
  const userFeature = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => ({
    type: 'FeatureCollection',
    features: userCoordinate ? [{ type: 'Feature', geometry: { type: 'Point', coordinates: userCoordinate }, properties: {} }] : [],
  }), [userCoordinate]);

  useEffect(() => {
    if (userCoordinate && !compact) cameraRef.current?.flyTo({ center: userCoordinate, zoom: 13.6, duration: 850 });
  }, [compact, userCoordinate]);

  return (
    <View style={nativeMapStyles.container}>
      <Map
        mapStyle={SAFEFLOOR_MAP_STYLE}
        style={StyleSheet.absoluteFill}
        dragPan
        touchZoom
        doubleTapZoom
        touchRotate={false}
        touchPitch={false}
        compass={false}
        scaleBar={false}
        logo={false}
        attribution={false}
        tintColor="#21D4FF"
      >
        <Camera
          ref={cameraRef}
          minZoom={9}
          maxZoom={18}
          initialViewState={{ center: BERLIN_CENTER, zoom: compact ? 10.7 : 11.25 }}
        />
        <GeoJSONSource
          id="safefloor-places"
          data={features}
          onPress={(event) => {
            const id = event.nativeEvent.features?.[0]?.properties?.id;
            if (typeof id === 'string') onSelect?.(id);
          }}
        >
          <Layer
            id="safefloor-zones"
            type="circle"
            paint={{
              'circle-color': ['get', 'color'],
              'circle-radius': ['case', ['==', ['get', 'kind'], 'warning'], compact ? 30 : 42, compact ? 22 : 30],
              'circle-opacity': 0.18,
              'circle-blur': 0.55,
              'circle-stroke-width': 1,
              'circle-stroke-color': ['get', 'color'],
              'circle-stroke-opacity': 0.4,
            }}
          />
          <Layer
            id="safefloor-place-cores"
            type="circle"
            paint={{
              'circle-color': ['get', 'color'],
              'circle-radius': ['case', ['==', ['get', 'selected'], 1], 10, 7],
              'circle-opacity': 0.96,
              'circle-stroke-width': 3,
              'circle-stroke-color': '#07111D',
            }}
          />
        </GeoJSONSource>
        {userCoordinate ? (
          <GeoJSONSource id="safefloor-user" data={userFeature}>
            <Layer id="safefloor-user-halo" type="circle" paint={{ 'circle-color': '#FFFFFF', 'circle-radius': 18, 'circle-opacity': 0.16, 'circle-blur': 0.35 }} />
            <Layer id="safefloor-user-core" type="circle" paint={{ 'circle-color': '#FFFFFF', 'circle-radius': 6, 'circle-stroke-width': 3, 'circle-stroke-color': '#148CB5' }} />
          </GeoJSONSource>
        ) : null}
      </Map>
    </View>
  );
}

const nativeMapStyles = StyleSheet.create({
  container: { flex: 1, minHeight: 180, backgroundColor: '#07111D' },
});
