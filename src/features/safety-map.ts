import { MapPlace, MapPlaceKind } from '@/domain/types';
import type { StyleSpecification } from 'maplibre-gl';

export const SAFEFLOOR_MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    'safefloor-osm': {
      type: 'raster',
      tiles: ['https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution: '© OpenStreetMap contributors · © CARTO',
      maxzoom: 20,
    },
  },
  layers: [
    { id: 'safefloor-background', type: 'background', paint: { 'background-color': '#07111D' } },
    { id: 'safefloor-streets', type: 'raster', source: 'safefloor-osm', paint: { 'raster-opacity': 0.94, 'raster-saturation': -0.22, 'raster-contrast': 0.08 } },
  ],
};
export const BERLIN_CENTER: [number, number] = [13.405, 52.51];

export type MapFilter = 'all' | MapPlaceKind;

export type SafetyMapProps = {
  places: MapPlace[];
  filter?: MapFilter;
  compact?: boolean;
  selectedId?: string | null;
  userCoordinate?: [number, number] | null;
  onSelect?: (id: string) => void;
};

export function visibleMapPlaces(places: MapPlace[], filter: MapFilter = 'all') {
  return filter === 'all' ? places : places.filter((place) => place.kind === filter);
}

export function mapPlaceColor(kind: MapPlaceKind) {
  if (kind === 'warning') return '#FFB84D';
  if (kind === 'support') return '#6FE7C8';
  return '#21D4FF';
}

export function mapFeatureCollection(places: MapPlace[], selectedId?: string | null): GeoJSON.FeatureCollection<GeoJSON.Point> {
  return {
    type: 'FeatureCollection',
    features: places.map((place) => ({
      type: 'Feature',
      id: place.id,
      geometry: { type: 'Point', coordinates: place.coordinate },
      properties: {
        id: place.id,
        kind: place.kind,
        color: mapPlaceColor(place.kind),
        radiusMeters: place.radiusMeters,
        selected: place.id === selectedId ? 1 : 0,
      },
    })),
  };
}
