import { useLocalSearchParams } from 'expo-router';
import { AlertTriangle, BookMarked, ShieldAlert } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { SubstanceToken } from '@/components/substance-token';
import { AppHeader, AppScreen, Card, Chip, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { substances } from '@/data/mock';
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
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const item = substances.find((substance) => substance.slug === slug) ?? substances[0];

  return (
    <AppScreen>
      <SeoHead title={`${item.name} – Risiken und Warnzeichen`} description={`Strukturierte SAFEFLOOR Prototypinformationen zu ${item.name}, Risiken und Warnzeichen.`} />
      <AppHeader title="Substanzen" back />
      <View style={substanceStyles.heroRow}>
        <View style={substanceStyles.heroCopy}>
          <Eyebrow>PROTOTYP · FACHREVIEW AUSSTEHEND</Eyebrow>
          <Title>{item.name}</Title>
          <Text style={substanceStyles.aliases}>{item.aliases}</Text>
        </View>
        <View style={substanceStyles.heroVisual}><SubstanceToken slug={item.slug} size={96} /></View>
      </View>
      <View style={substanceStyles.tags}><Chip label={item.category} active /><Chip label="Keine Dosierungswerte" /></View>

      <Card tone="cyan" style={substanceStyles.overviewCard}>
        <FactRow label="Klasse" value={item.category} />
        <FactRow label="Wirkung" value={item.summary} />
        <FactRow label="Dauer" value={item.duration} />
        <FactRow label="Einsetzen" value={item.onset} />
      </Card>

      <Card tone="amber" style={substanceStyles.warningCard}>
        <View style={substanceStyles.warningRow}><AlertTriangle color={colors.amber400} size={22} /><Text style={substanceStyles.warningText}>Dieser Artikel ist ein UX-Prototyp und darf nicht für medizinische Entscheidungen verwendet werden.</Text></View>
      </Card>

      <SectionTitle>Sicherheitstipps</SectionTitle>
      <Card tone="cyan"><BulletList items={item.harmReduction} /></Card>
      <SectionTitle>Allgemeine Risiken</SectionTitle>
      <Card><BulletList items={item.risks} tone="amber" /></Card>
      <SectionTitle>Warnzeichen für Hilfe</SectionTitle>
      <Card tone="emergency"><View style={substanceStyles.sectionIcon}><ShieldAlert color={colors.emergency} size={22} /><Text style={substanceStyles.sectionLead}>Bei schweren Warnzeichen sofort professionelle Hilfe holen.</Text></View><BulletList items={item.warningSigns} tone="emergency" /></Card>
      <SectionTitle>Quellenstatus</SectionTitle>
      <Card>
        <View style={substanceStyles.sourceRow}><BookMarked color={colors.cyan400} size={22} /><View style={substanceStyles.sourceCopy}><Text style={substanceStyles.sourceTitle}>Fachliche Quellen werden vor Beta ergänzt</Text><Text style={substanceStyles.sourceMeta}>{item.reviewedAt}</Text></View></View>
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
});
