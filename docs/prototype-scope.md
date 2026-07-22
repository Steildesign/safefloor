# Prototype Scope und Management-Gates

## Enthalten

- vollständige mobile Hauptnavigation
- lokale, klickbare Golden Paths
- schmale Browser-Vorschau ausschließlich als mobiles Testgerät
- Design Tokens und wiederverwendbare Komponenten
- Safety-Check als reine Domainlogik
- Mock-Repositories für spätere technische Adapter
- sichtbare Prototyp- und Fachreview-Hinweise

## Plattformentscheidung

SAFEFLOOR wird als reine Smartphone-App konzipiert. iOS und Android teilen sich die Expo-/React-Native-Codebasis. Tablet-, Desktop- und eigenständige Browser-Oberflächen gehören nicht zum Produktumfang. Der Web-Export bleibt nur für schnelle, klickbare Design- und Portfolio-Reviews erhalten.

## Bewusst nicht produktiv

- Authentifizierung und Konten
- Netzwerkübertragung und Datenbanken
- echter Standort oder Kartenanbieter
- produktive KI
- Push-Benachrichtigungen
- reale Awareness-Zustellung
- medizinisch freigegebene Inhalte
- Moderationskonsole

## Nächste Gates

1. Design- und UX-Review mit 5 bis 8 Testpersonen
2. Zweckbestimmung und Medical-Device-Abgrenzung schriftlich prüfen
3. medizinische und Harm-Reduction-Fachredaktion gewinnen
4. Pilotpartner und Moderations-SLA definieren
5. Supabase-Adapter und Admin-Queue implementieren
6. KI-Gateway erst nach Safety-Testkatalog anbinden

## Definition „Pilotbereit“

Ein Pilot ist erst möglich, wenn Datenschutz-Folgenabschätzung, Fachreview, Moderationsbetrieb, Incident-Prozess, Löschkonzept und technische Security-Prüfung abgeschlossen sind.
