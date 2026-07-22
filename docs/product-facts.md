# SAFEFLOOR · verifizierte Produkt- und Technikfakten

Stand: 22. Juli 2026

## Kartenarchitektur

- Die App verwendet Expo SDK 57 mit React Native 0.86 und der New Architecture.
- `@maplibre/maplibre-react-native` 11.3.6 unterstützt React Native ab 0.80 und benötigt unter Expo einen eigenen Development Build. Expo Go reicht dafür nicht aus.
- Die native Karte nutzt MapLibre Native; die statische Webvorschau nutzt `maplibre-gl`.
- Der Prototyp verwendet für die sofort sichtbare Vorschau den dunklen CARTO-Rasterstil mit OpenStreetMap-Daten. Der Renderer bleibt MapLibre, sodass der Tile-Dienst später ohne UI-Neubau gewechselt werden kann.
- OpenStreetMap-Attribution bleibt in der Kartenansicht sichtbar.
- Der öffentliche OSM-Standard-Tile-Server ist kein Produktionsbackend. Vor einem öffentlichen Produktrelease wird ein Tile-Anbieter mit SLA oder ein eigener PMTiles-/Protomaps-Stack gewählt.
- Standortzugriff erfolgt nur nach aktivem Tippen, nur im Vordergrund und ohne Hintergrundtracking.
- Community-Koordinaten sind im Produktmodell als ungefähre Zonen vorgesehen. Exakte Meldepositionen werden nicht öffentlich dargestellt.

## Quellen

- MapLibre Expo Setup: https://maplibre.org/maplibre-react-native/docs/setup/expo/
- MapLibre Anforderungen: https://maplibre.org/maplibre-react-native/docs/setup/getting-started/
- Expo Location: https://docs.expo.dev/versions/latest/sdk/location/
- CARTO Basemap Attribution: https://carto.com/attributions
- OSM Tile Usage Policy: https://operations.osmfoundation.org/policies/tiles/

## Inhaltliche Grenzen

- Mischkonsum-Seiten enthalten keine Dosierungswerte und bewerten keine Kombination als sicher.
- Inhalte sind bis zur medizinischen beziehungsweise suchtfachlichen Freigabe sichtbar als Prototyp gekennzeichnet.
- Der visuelle Abgleich fotografierter Pillen ist ausdrücklich nicht Teil dieses Umsetzungsstands.
