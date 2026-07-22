# Prototyp-Architektur

## Ziel

Der Prototyp soll als iOS-/Android-Handy-App portfoliofähig sein, ohne spätere Produktlogik im UI festzuschreiben. Der Web-Renderer ist nur ein lokales Vorschauwerkzeug und keine eigene Produktplattform.

## Schichten

1. `src/app`: Expo-Router-Routen und sichtbare Flows
2. `src/components`: wiederverwendbare UI- und Markenkomponenten
3. `src/domain`: reine Typen und deterministische Safety-Logik
4. `src/services/contracts.ts`: spätere Backend- und KI-Verträge
5. `src/services/mock.ts`: aktuelle lokale Demo-Adapter
6. `src/data/mock.ts`: klar als Prototyp gekennzeichnete Beispieldaten

## Spätere Adapter

- `CommunityRepository` → Supabase-Views und moderierte Alerts
- `KnowledgeRepository` → redaktionelles CMS
- `ResourceRepository` → geprüftes regionales Verzeichnis
- `TripSitterService` → serverseitiges KI-Gateway mit Vor- und Nachprüfung

## Safety-Grenze

Der Safety-Check bleibt von KI und Netzwerk unabhängig. Ein produktiver KI-Adapter darf ausschließlich freigegebene UI-Aktionen zurückgeben und kann die Notfallroute nicht umgehen.

## Browser-Vorschau

Expo Router kann die mobilen Routen für Design-Reviews statisch rendern. Die Vorschau bleibt auf eine Smartphone-Breite begrenzt. Sensible Demo-Flows wie Chat, Meldung und Safety-Check sind mit `noindex,nofollow` markiert; eine öffentliche Website oder SEO-Landingpage ist nicht Teil dieses Projekts.
