import { useLocalSearchParams } from 'expo-router';
import { AlertTriangle, BookMarked, ExternalLink, RefreshCw, ShieldAlert } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { SubstanceToken } from '@/components/substance-token';
import { AppHeader, AppScreen, Card, Chip, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { getSubstances, substances } from '@/data/mock';
import { useI18n } from '@/i18n/provider';
import { getPubChemIdentity, PubChemIdentity } from '@/services/open-data';
import { colors, spacing } from '@/theme/tokens';

export function generateStaticParams(): { slug: string }[] {
  return substances.map((substance) => ({ slug: substance.slug }));
}

function BulletList({ items, tone = 'cyan' }: { items: string[]; tone?: 'cyan' | 'amber' | 'emergency' }) {
  const color = tone === 'amber' ? colors.amber400 : tone === 'emergency' ? colors.emergency : colors.cyan400;
  return (
    <View>{items.map((item) => <View key={item} style={substanceStyles.bulletRow}><View style={[substanceStyles.bullet, { backgroundColor: color }]} /><Text style={substanceStyles.bulletText}>{item}</Text></View>)}</View>
  );
}

function FactRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={substanceStyles.factRow}>
      <Text style={substanceStyles.factLabel}>{label}</Text>
      <Text style={substanceStyles.factValue}>{value}</Text>
    </View>
  );
}

export default function SubstanceScreen() {
  const { locale, tx } = useI18n();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const localizedSubstances = getSubstances(locale);
  const item = localizedSubstances.find((substance) => substance.slug === slug) ?? localizedSubstances[0];
  const [identity, setIdentity] = useState<PubChemIdentity | null>(null);

  useEffect(() => {
    let mounted = true;
    getPubChemIdentity(item.pubChemCid).then((next) => { if (mounted) setIdentity(next); });
    return () => { mounted = false; };
  }, [item.pubChemCid]);

  return (
    <AppScreen>
      <SeoHead title={`${item.name} – Risiken und Warnzeichen`} description={`Strukturierte SAFEFLOOR Prototypinformationen zu ${item.name}, Risiken und Warnzeichen.`} />
      <AppHeader title={tx('Substanzen', 'Substances')} back />
      <View style={substanceStyles.heroRow}>
        <View style={substanceStyles.heroCopy}>
          <Eyebrow>{tx('PROTOTYP · FACHREVIEW AUSSTEHEND', 'PROTOTYPE · REVIEW PENDING')}</Eyebrow>
          <Title>{item.name}</Title>
          <Text style={substanceStyles.aliases}>{item.aliases}</Text>
        </View>
        <View style={substanceStyles.heroVisual}><SubstanceToken slug={item.slug} size={96} /></View>
      </View>
      <View style={substanceStyles.tags}><Chip label={item.category} active /><Chip label={tx('Keine Dosierungswerte', 'No dosage values')} /></View>

      <Card tone="cyan" style={substanceStyles.overviewCard}>
        <FactRow label={tx('Klasse', 'Class')} value={item.category} />
        <FactRow label={tx('Wirkung', 'Overview')} value={item.summary} />
        <FactRow label={tx('Dauer', 'Duration')} value={item.duration} />
        <FactRow label={tx('Einsetzen', 'Onset')} value={item.onset} />
      </Card>

      <Card tone="amber" style={substanceStyles.warningCard}>
        <View style={substanceStyles.warningRow}><AlertTriangle color={colors.amber400} size={22} /><Text style={substanceStyles.warningText}>{tx('Dieser Artikel ist ein UX-Prototyp und darf nicht für medizinische Entscheidungen verwendet werden.', 'This article is a UX prototype and must not be used for medical decisions.')}</Text></View>
      </Card>

      <SectionTitle>{tx('Sicherheitstipps', 'Safer-use context')}</SectionTitle>
      <Card tone="cyan"><BulletList items={item.harmReduction} /></Card>
      <SectionTitle>{tx('Allgemeine Risiken', 'General risks')}</SectionTitle>
      <Card><BulletList items={item.risks} tone="amber" /></Card>
      <SectionTitle>{tx('Warnzeichen für Hilfe', 'Warning signs')}</SectionTitle>
      <Card tone="emergency"><View style={substanceStyles.sectionIcon}><ShieldAlert color={colors.emergency} size={22} /><Text style={substanceStyles.sectionLead}>{tx('Bei schweren Warnzeichen sofort professionelle Hilfe holen.', 'Seek professional help immediately for severe warning signs.')}</Text></View><BulletList items={item.warningSigns} tone="emergency" /></Card>
      <SectionTitle>{tx('Chemische Referenz', 'Chemical reference')}</SectionTitle>
      <Card tone="cyan" onPress={() => identity ? Linking.openURL(identity.sourceUrl) : undefined} accessibilityLabel={tx('PubChem-Quelle öffnen', 'Open PubChem source')}>
        <View style={substanceStyles.sourceRow}>
          {identity ? <BookMarked color={colors.cyan400} size={22} /> : <RefreshCw color={colors.cyan400} size={22} />}
          <View style={substanceStyles.sourceCopy}>
            <Text style={substanceStyles.sourceTitle}>{identity?.title ?? tx('PubChem wird geladen …', 'Loading PubChem …')}</Text>
            <Text style={substanceStyles.sourceMeta}>{identity ? `CID ${identity.cid} · ${identity.molecularFormula} · ${identity.molecularWeight} g/mol` : tx('Offene Schnittstelle mit lokalem Fallback', 'Open API with local fallback')}</Text>
            <Text style={substanceStyles.sourceScope}>{item.referenceScope}</Text>
            {identity ? <Text style={substanceStyles.sourceState}>{identity.status === 'live' ? tx('LIVE VON PUBCHEM', 'LIVE FROM PUBCHEM') : tx('OFFLINE-FALLBACK · PUBCHEM-DATENSATZ', 'OFFLINE FALLBACK · PUBCHEM RECORD')}</Text> : null}
          </View>
          <ExternalLink color={colors.cyan400} size={18} />
        </View>
      </Card>
      <SectionTitle>{tx('Redaktioneller Status', 'Editorial status')}</SectionTitle>
      <Card>
        <View style={substanceStyles.sourceRow}><BookMarked color={colors.amber400} size={22} /><View style={substanceStyles.sourceCopy}><Text style={substanceStyles.sourceTitle}>{tx('Risiko- und Warntexte benötigen Fachreview', 'Risk and warning copy requires professional review')}</Text><Text style={substanceStyles.sourceMeta}>{item.reviewedAt}</Text></View></View>
      </Card>
    </AppScreen>
  );
}

const substanceStyles = StyleSheet.create({
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[4], marginTop: spacing[2] },
  heroCopy: { flex: 1 },
  heroVisual: { width: 108, minHeight: 106, alignItems: 'center', justifyContent: 'center' },
  aliases: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 14, marginTop: spacing[2] },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[4] },
  overviewCard: { marginTop: spacing[5], paddingVertical: spacing[2] },
  warningCard: { marginTop: spacing[5] },
  warningRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  warningText: { flex: 1, color: colors.amber300, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 19 },
  factRow: { flexDirection: 'row', gap: spacing[4], paddingVertical: spacing[3], borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  factLabel: { width: 78, color: colors.gray, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 18 },
  factValue: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  bulletRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginVertical: 7 },
  bullet: { width: 6, height: 6, borderRadius: 6, marginTop: 7 },
  bulletText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  sectionIcon: { flexDirection: 'row', gap: spacing[3], alignItems: 'center', marginBottom: spacing[3] },
  sectionLead: { flex: 1, color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 13, lineHeight: 19 },
  sourceRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'center' },
  sourceCopy: { flex: 1 },
  sourceTitle: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 13, lineHeight: 18 },
  sourceMeta: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 5 },
  sourceScope: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 16, marginTop: spacing[2] },
  sourceState: { color: colors.cyan400, fontFamily: 'Inter_700Bold', fontSize: 8, letterSpacing: 1.15, marginTop: spacing[2] },
});
