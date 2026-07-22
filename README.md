# SAFEFLOOR · mobiler App-Prototyp

Code-nativer Expo-Prototyp für iOS und Android. Der Browser-Build dient ausschließlich als schmale Handy-Vorschau für UX-Tests; es gibt keine eigenständige Desktop- oder Web-App.

## Live-Demo

Die klickbare Smartphone-Vorschau wird automatisch über GitHub Pages veröffentlicht:

**[SAFEFLOOR öffnen](https://steildesign.github.io/safefloor/)**

Die Web-Demo verwendet bei nativen iOS-Effekten einen visuell abgestimmten Fallback. Ein späterer Development Build beziehungsweise TestFlight-Build bildet die echte iPhone-App ab.

## Mobile Product Pass

- offizielles SAFEFLOOR-Schutzkern-Logo in allen Markenmomenten
- isolierte Markenperle als anonymes Profil und ruhige KI-Präsenz
- phasensynchrones Atemfeld mit reduzierter Bewegungsalternative
- stilisierte Substanz-Platzhalter mit eindeutiger Prototyp-Kennzeichnung
- konsequent einspaltige Handy-Oberfläche ohne Desktop-Breakpoints
- globale mobile Menüebene plus daumenfreundliche Hauptnavigation
- sanft driftender, reizarm animierter SAFEFLOOR-Hintergrund
- ablenkungsarmer Atemfokus mit automatisch ausblendender Steuerung

## Start

```bash
npm install
npm run ios
npm run android
```

Lokale Handy-Vorschau im Browser:

```bash
npm run export:web
npm run preview
```

## Klickbare Flows

- Onboarding und Gastmodus
- Start, Community-Feed, grobe Kartenvisualisierung und Hinweisdetail
- dreistufige anonyme Meldung mit lokaler Identitätswarnung
- Hilfe-Hub, regelbasierter Safety-Check, Atemhilfe und Erdung
- simulierter, begrenzter KI-Dialog ohne API oder Persistenz
- Substanzbibliothek und Artikeldetail ohne Dosierungswerte
- Nachsorge, Ressourcen und Vertrauenspersonen

## Wichtiger Prototypstatus

- Es werden keine Meldungen übertragen oder gespeichert.
- Der Chat verwendet ausschließlich einen lokalen Mock-Service.
- Wissensinhalte sind Strukturbeispiele und nicht fachlich freigegeben.
- Karten und Ressourcen sind Demo-Daten.
- Der Prototyp ersetzt keine medizinische Beratung oder Notfallversorgung.

## Qualität

```bash
npm run check
```

Der geprüfte Stand baut 22 statische Web-Routen und durchlief die Kernflüsse im mobilen Browser ohne Konsolenfehler. `npm audit --omit=dev` meldet aktuell keine hohen oder kritischen Schwachstellen; moderate Hinweise stammen aus der Expo-SDK-Werkzeugkette und werden bei SDK-Updates erneut bewertet.

## Architektur

Die sichtbaren Screens verwenden Repository- und Service-Verträge unter `src/services`. Später werden ausschließlich deren Mock-Implementierungen gegen Supabase, CMS und ein serverseitiges KI-Gateway ausgetauscht. Die deterministische Safety-Logik liegt separat unter `src/domain/safety.ts`.

Weitere Entscheidungen: [docs/architecture.md](docs/architecture.md), [docs/prototype-scope.md](docs/prototype-scope.md), [docs/brand-spec.md](docs/brand-spec.md).
