import { useLocalSearchParams } from 'expo-router';
import { BookMarked, ExternalLink, GitMerge, PhoneCall, ShieldAlert, TriangleAlert } from 'lucide-react-native';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { SubstanceToken } from '@/components/substance-token';
import { AppHeader, AppScreen, Button, Card, Chip, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { combinations, getCombinations } from '@/data/mock';
import { useI18n } from '@/i18n/provider';
import { colors, spacing } from '@/theme/tokens';

export function generateStaticParams(): { slug: string }[] {
  return combinations.map((combination) => ({ slug: combination.slug }));
}

function BulletList({ items, emergency = false }: { items: string[]; emergency?: boolean }) {
  return <View>{items.map((item) => <View key={item} style={combinationStyles.bulletRow}><View style={[combinationStyles.bullet, emergency && combinationStyles.bulletEmergency]} /><Text style={combinationStyles.bulletText}>{item}</Text></View>)}</View>;
}

export default function CombinationScreen() {
  const { locale, tx } = useI18n();
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const items = getCombinations(locale);
  const item = items.find((combination) => combination.slug === slug) ?? items[0];
  const pair = item.slug.split('-');

  return (
    <AppScreen>
      <SeoHead title={`${item.substances.join(' + ')} – ${tx('Mischkonsum-Risiken', 'combination risks')}`} description={tx('SAFEFLOOR Prototypinformationen zu Risiken, Warnzeichen und Notfallhilfe bei Mischkonsum.', 'SAFEFLOOR prototype information on combination risks, warning signs and emergency support.')} noIndex />
      <AppHeader title={tx('Kombinationen', 'Combinations')} back />
      <View style={combinationStyles.hero}>
        <View style={combinationStyles.heroCopy}>
          <Eyebrow tone="amber">{tx('MISCHKONSUM · NICHT SICHER EINSTUFBAR', 'POLYDRUG USE · CANNOT BE RATED SAFE')}</Eyebrow>
          <Title>{item.substances.join(' + ')}</Title>
          <Text style={combinationStyles.sceneNames}>{item.sceneNames}</Text>
        </View>
        <View style={combinationStyles.heroVisual}>
          <View style={combinationStyles.tokenBack}><SubstanceToken slug={pair[1]} size={72} /></View>
          <View style={combinationStyles.tokenFront}><SubstanceToken slug={pair[0]} size={72} /></View>
          <View style={combinationStyles.mergeBadge}><GitMerge color={colors.amber300} size={17} /></View>
        </View>
      </View>
      <View style={combinationStyles.tags}><Chip label={`${tx('Risiko', 'Risk')}: ${item.risk}`} active /><Chip label={tx('Keine Dosierungswerte', 'No dosage values')} /></View>

      <Card tone="amber" style={combinationStyles.summaryCard}>
        <View style={combinationStyles.leadRow}><TriangleAlert color={colors.amber400} size={23} /><Text style={combinationStyles.summary}>{item.summary}</Text></View>
      </Card>

      <SectionTitle>{tx('Was sich verstärken kann', 'What may intensify')}</SectionTitle>
      <Card><BulletList items={item.risks} /></Card>

      <SectionTitle>{tx('Warnzeichen: Hilfe holen', 'Warning signs: get help')}</SectionTitle>
      <Card tone="emergency">
        <View style={combinationStyles.leadRow}><ShieldAlert color={colors.emergency} size={23} /><Text style={combinationStyles.emergencyLead}>{tx('Nicht abwarten, wenn Atmung, Bewusstsein oder Kreislauf betroffen sind.', 'Do not wait if breathing, consciousness or circulation are affected.')}</Text></View>
        <BulletList items={item.warningSigns} emergency />
        <View style={combinationStyles.emergencyButton}><Button label={tx('Bei Lebensgefahr 112', 'Call 112 if life is at risk')} icon={PhoneCall} tone="emergency" onPress={() => Linking.openURL('tel:112')} /></View>
      </Card>

      <SectionTitle>{tx('Wenn es bereits passiert ist', 'If it has already happened')}</SectionTitle>
      <Card tone="cyan"><BulletList items={item.firstSteps} /></Card>

      <SectionTitle>{tx('Quellen und Status', 'Sources and status')}</SectionTitle>
      {item.sources.map((source) => (
        <Card key={source.url} onPress={() => Linking.openURL(source.url)} accessibilityLabel={`${source.label}, ${tx('Quelle öffnen', 'open source')}`}>
          <View style={combinationStyles.sourceRow}><BookMarked color={colors.cyan400} size={21} /><View style={combinationStyles.sourceCopy}><Text style={combinationStyles.sourceTitle}>{source.label}</Text><Text style={combinationStyles.sourceMeta}>{tx('Öffentliche Fachinformation', 'Public professional information')}</Text></View><ExternalLink color={colors.cyan400} size={17} /></View>
        </Card>
      ))}
      <Card tone="amber"><Text style={combinationStyles.reviewText}>{item.reviewedAt}</Text><Text style={combinationStyles.reviewDetail}>{tx('Die Darstellung fasst Quellen für den klickbaren Prototyp zusammen. Vor einer Veröffentlichung müssen medizinische Redaktion, Versionsdatum und Freigabeprozess ergänzt werden.', 'This view summarises sources for the clickable prototype. Medical editorial review, version date and an approval process are required before publication.')}</Text></Card>
    </AppScreen>
  );
}

const combinationStyles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginTop: spacing[2] },
  heroCopy: { flex: 1 },
  sceneNames: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 12, marginTop: spacing[2] },
  heroVisual: { width: 120, height: 112, position: 'relative' },
  tokenBack: { position: 'absolute', right: 0, top: 0, opacity: 0.82 },
  tokenFront: { position: 'absolute', left: 0, bottom: 0 },
  mergeBadge: { position: 'absolute', left: 43, top: 39, width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#241B11', borderWidth: 1, borderColor: 'rgba(255,184,77,0.48)' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[4] },
  summaryCard: { marginTop: spacing[5] },
  leadRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[3] },
  summary: { flex: 1, color: colors.amber300, fontFamily: 'Inter_500Medium', fontSize: 13, lineHeight: 20 },
  emergencyLead: { flex: 1, color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 13, lineHeight: 19, marginBottom: spacing[2] },
  bulletRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start', marginVertical: 7 },
  bullet: { width: 6, height: 6, borderRadius: 6, marginTop: 7, backgroundColor: colors.amber400 },
  bulletEmergency: { backgroundColor: colors.emergency },
  bulletText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  emergencyButton: { marginTop: spacing[4] },
  sourceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  sourceCopy: { flex: 1 },
  sourceTitle: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 13, lineHeight: 18 },
  sourceMeta: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 4 },
  reviewText: { color: colors.amber300, fontFamily: 'Inter_600SemiBold', fontSize: 12 },
  reviewDetail: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 10, lineHeight: 16, marginTop: spacing[2] },
});
