# Open-Data-Strategie · Berlin zuerst

## PubChem

SAFEFLOOR nutzt die offene PUG-REST-Schnittstelle von PubChem ausschließlich für stabile chemische Identitätsdaten:

- PubChem CID
- kanonischer Titel
- Summenformel
- Molekulargewicht
- InChIKey

Die App fragt diese Daten zur Laufzeit ab und fällt bei fehlendem Netz auf einen versionierten, zuvor gegen PubChem geprüften Datensatz zurück. PubChem-Inhalte werden nicht als Konsumempfehlung, Risikoanalyse oder Beleg für die Identität einer konkreten Probe verwendet.

API-Dokumentation: https://pubchem.ncbi.nlm.nih.gov/docs/pug-rest

## EUDA / TEDI

Die Wissensansicht verlinkt den offenen Datensatz der European Union Drugs Agency und des TEDI-Netzwerks. Er umfasst halbjährlich aggregierte Drug-Checking-Ergebnisse auf Stadtebene, unter anderem Berlin und weitere deutsche Städte.

SAFEFLOOR kennzeichnet diese Daten deshalb als:

- Trend- und Kontextdaten, nicht Live-Warnungen
- Stadt-Aggregate, nicht individuelle Laborbefunde
- Quelle mit sichtbarem Zeitraum und Veröffentlichungsdatum

Datensatz: https://www.euda.europa.eu/data/repository/drug-checking-data-trans-european-drug-information-tedi-network_en

## Mischkonsum

Die vier Kombinationsprofile des Prototyps verweisen direkt auf öffentliche Informationen von drugcom und Drugchecking Berlin. Sie enthalten ausschließlich Risiko-, Warnzeichen- und Notfallkontext. Szenenamen werden nur zur Auffindbarkeit gezeigt und niemals als Beleg für die Zusammensetzung einer Probe verwendet.

- Ketamin + Alkohol: drugcom und Drugchecking Berlin
- MDMA + Ketamin: Drugchecking Berlin, einschließlich des unscharfen Szenenamens Tusi/Tucibi
- MDMA + Alkohol: drugcom
- Cannabis + Alkohol: drugcom

Alle redaktionellen Zusammenfassungen bleiben bis zur fachlichen Freigabe als Prototyp markiert.

## Karte

Die Karte verwendet MapLibre als offenen Renderer und OpenStreetMap-Straßendaten über einen austauschbaren Raster-Tile-Dienst. Kartenpunkte sind derzeit ausschließlich Demo-Daten. Community-Hinweise werden als verschobene Bereiche mit Datenschutzradius modelliert; der optionale Gerätestandort bleibt von diesen öffentlichen Daten getrennt.

## Nächste Integrationsstufe

Vor einem Beta-Betrieb werden Berliner Drug-Checking-Stellen und gemeinnützige Partner um eine schriftliche Freigabe für Warnmeldungen, Logos und eventuelle nicht öffentliche Schnittstellen gebeten. Solche Partnerdaten bleiben von PubChem und TEDI technisch getrennt, damit Herkunft, Aktualität und Moderationsstatus jederzeit nachvollziehbar sind.
