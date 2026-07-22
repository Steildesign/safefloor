import type { Map as MapLibreMap, Marker as MapLibreMarker } from 'maplibre-gl';
import { createElement, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import {
  BERLIN_CENTER,
  mapPlaceColor,
  SAFEFLOOR_MAP_STYLE,
  SafetyMapProps,
  visibleMapPlaces,
} from '@/features/safety-map';

import 'maplibre-gl/dist/maplibre-gl.css';

export function SafetyMap({ places, filter = 'all', compact = false, selectedId, userCoordinate, onSelect }: SafetyMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const markerConstructorRef = useRef<typeof MapLibreMarker | null>(null);
  const markersRef = useRef<MapLibreMarker[]>([]);
  const userMarkerRef = useRef<MapLibreMarker | null>(null);
  const renderMarkersRef = useRef<(() => void) | null>(null);
  const selectRef = useRef(onSelect);
  const visiblePlaces = useMemo(() => visibleMapPlaces(places, filter), [filter, places]);

  useEffect(() => { selectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    const renderMarkers = () => {
      const map = mapRef.current;
      const Marker = markerConstructorRef.current;
      if (!map || !Marker) return;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = visiblePlaces.map((place) => {
        const color = mapPlaceColor(place.kind);
        const selected = place.id === selectedId;
        const element = document.createElement('button');
        element.type = 'button';
        element.setAttribute('aria-label', place.title);
        element.style.cssText = `width:${selected ? 58 : place.kind === 'warning' ? 50 : 42}px;height:${selected ? 58 : place.kind === 'warning' ? 50 : 42}px;border-radius:50%;border:1px solid ${color}99;background:${color}26;box-shadow:0 0 24px ${color}70;display:grid;place-items:center;cursor:pointer;padding:0;`;
        const core = document.createElement('span');
        core.style.cssText = `width:${selected ? 14 : 10}px;height:${selected ? 14 : 10}px;border-radius:50%;background:${color};border:3px solid #07111D;box-shadow:0 0 12px ${color};`;
        element.append(core);
        element.addEventListener('click', () => selectRef.current?.(place.id));
        return new Marker({ element, anchor: 'center' }).setLngLat(place.coordinate).addTo(map);
      });
    };
    renderMarkersRef.current = renderMarkers;
    renderMarkers();
  }, [selectedId, visiblePlaces]);

  useEffect(() => {
    let cancelled = false;
    if (!containerRef.current || mapRef.current) return;

    void import('maplibre-gl').then(({ Map, Marker, NavigationControl }) => {
      if (cancelled || !containerRef.current) return;
      const map = new Map({
        container: containerRef.current,
        style: SAFEFLOOR_MAP_STYLE,
        center: BERLIN_CENTER,
        zoom: compact ? 10.7 : 11.25,
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false,
      });
      mapRef.current = map;
      markerConstructorRef.current = Marker;
      if (!compact) map.addControl(new NavigationControl({ showCompass: false, visualizePitch: false }), 'top-right');
      renderMarkersRef.current?.();
    });

    return () => {
      cancelled = true;
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];
      userMarkerRef.current?.remove();
      userMarkerRef.current = null;
      mapRef.current?.remove();
      mapRef.current = null;
      markerConstructorRef.current = null;
    };
  }, [compact]);

  useEffect(() => {
    const map = mapRef.current;
    const Marker = markerConstructorRef.current;
    if (!map || !Marker || !userCoordinate) return;
    userMarkerRef.current?.remove();
    const element = document.createElement('div');
    element.setAttribute('aria-label', 'Dein Standort');
    element.style.cssText = 'width:34px;height:34px;border-radius:50%;border:1px solid #FFFFFF99;background:#FFFFFF22;box-shadow:0 0 24px #21D4FF99;display:grid;place-items:center;';
    const core = document.createElement('span');
    core.style.cssText = 'width:10px;height:10px;border-radius:50%;background:#FFFFFF;border:3px solid #148CB5;';
    element.append(core);
    userMarkerRef.current = new Marker({ element, anchor: 'center' }).setLngLat(userCoordinate).addTo(map);
    if (!compact) map.flyTo({ center: userCoordinate, zoom: 13.6, duration: 850 });
  }, [compact, userCoordinate]);

  return (
    <View style={webMapStyles.container}>
      {createElement('div', { ref: containerRef, style: { position: 'absolute', inset: 0 } })}
    </View>
  );
}

const webMapStyles = StyleSheet.create({
  container: { flex: 1, minHeight: 180, backgroundColor: '#07111D' },
});
