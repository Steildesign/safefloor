# SAFEFLOOR · Brand Spec

Stand: 22. Juli 2026

## Quellen

- Konzeptdokument `SAFEFLOOR_Konzept.md`
- sechs vom Nutzer bereitgestellte Moodboard- und Case-Study-Bilder
- offizielles einfarbiges Vektorlogo `assets/brand/source/safefloor-logo-official.svg`
- offizielle farbige PNG-Varianten mit und ohne Hintergrund
- drei Referenzscreens für Atemhilfe, Profil und Substanzwissen
- Markenstatus: offizielle Geometrie und Farbvorlage geliefert

## Kernidee

Die Sphäre steht für das Individuum. Der cyanfarbene Schutzbogen steht für Gemeinschaft und Orientierung. Bernstein signalisiert Aufmerksamkeit, Rot ausschließlich akute Notfälle.

## Kernassets

- Originalgeometrie: `assets/brand/source/safefloor-logo-official.svg`
- Farbvorlage transparent: `assets/brand/source/safefloor-logo-color-transparent.png`
- Farbvorlage auf Midnight: `assets/brand/source/safefloor-logo-color-background.png`
- hochauflösendes UI-Logo: `assets/brand/safefloor-logo-ui.png`
- Profilperle: `assets/brand/safefloor-pearl.png`
- App-Icon und Splash: `assets/brand/safefloor-icon.png`
- Reproduzierbarer Export: `scripts/build-brand-assets.mjs`

Die Geometrie darf nicht neu gezeichnet, gestaucht oder durch eine generische Orb-Konstruktion ersetzt werden. Glow entsteht ausschließlich als umgebender UI-Effekt.

## Palette

- Midnight 950 `#050D17`
- Midnight 900 `#0B1320`
- Midnight 800 `#111C2B`
- Cyan 400 `#21D4FF`
- Cyan 300 `#70E5FF`
- Amber 400 `#FFB84D`
- Amber 300 `#FFD18A`
- Emergency `#FF665A`
- Text `#F5F7FA`
- Secondary `#8A95A6`

## Typografie

Inter ist durch das vorhandene SAFEFLOOR-Konzept verbindlich. Die App lädt die offenen Expo-Google-Font-Pakete lokal im Bundle.

## Visuelle Signatur

- vollständiges Schutzkern-Logo in echten Markenmomenten
- isolierte Perle als anonymes Profil und ruhige KI-Präsenz
- cyanfarbenes Atemfeld als Übungsvisual, bewusst ohne Schutzbogen
- ruhige Tiefenstaffelung aus Midnight-Flächen
- dosiertes Liquid Glass für persistente Navigation und kleine Bedienflächen
- Cyan für Navigation und Orientierung
- Bernstein für achtsame Handlungen
- keine flackernden oder aggressiven Neonanimationen

## Substanzvisuals

- MDMA bleibt die stilisierte Tablettenkomposition aus dem Moodboard.
- Ketamin: `assets/substances/ketamin-powder.png`
- Cannabis: `assets/substances/cannabis-flower.png`
- Alkohol: `assets/substances/alcohol-bottle.png`

Die drei Rastervisuals sind neutral inszenierte, KI-generierte Orientierungsbilder. Sie dürfen nicht als Produktidentifikation, Konsumempfehlung oder Dosierungsdarstellung verwendet werden. Die tiefblaue Fläche ist Teil des Assets und geht in die Kartenfarbe über.

## Motion

- Standardkurve: Expo-out beziehungsweise weich gedämpftes Ease-in-out
- Logo: maximal 1,8 Prozent Skalierung und ruhiger Cyan-Schein
- Profilperle: 22 Sekunden pro Rotation
- Atemfeld: Bewegung ist mit Einatmen, Halten und Ausatmen gekoppelt
- Atemübung: Nach dem Start wechselt die Oberfläche in einen ablenkungsarmen Fokusmodus; Navigation und Zusatzinhalte verschwinden vollständig.
- Fokussteuerung: Pause und Beenden blenden sich nach 4,2 Sekunden aus und werden durch Antippen wieder sichtbar.
- Notfallpfade: keine dekorative Bewegung
- Betriebssystem-Einstellung „Bewegung reduzieren“ wird respektiert

## Liquid Glass

- Die untere Hauptnavigation bleibt als feste, transluzente Glasfläche sichtbar.
- Auf unterstützten iPhones wird der native Systemeffekt verwendet; Web-Vorschau und andere Plattformen erhalten einen visuell abgestimmten Fallback.
- Glas ist funktionalen Bedienelementen vorbehalten: Tabbar, Menüknöpfe und ausgewählte Eingabeflächen.
- Inhaltskarten bleiben überwiegend ruhig und deckend, damit Lesbarkeit und Orientierung Vorrang vor dem Effekt haben.
- Der Glaston bleibt dunkelblau; Cyan erzeugt Klarheit, ein sehr geringer Bernsteinanteil erhält die Markenwärme.
