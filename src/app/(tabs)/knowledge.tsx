import { router } from 'expo-router';
import { ChevronRight, Database, ExternalLink, GitMerge, Search, ShieldAlert } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Linking, StyleSheet, Text, TextInput, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { GlassSurface } from '@/components/glass-surface';
import { SubstanceToken } from '@/components/substance-token';
import { AppHeader, AppScreen, Body, Card, Chip, SectionTitle, Title } from '@/components/ui';
import { getCombinations, getSubstances } from '@/data/mock';
import { colors, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';
import { berlinDrugCheckingSource } from '@/services/open-data';

export default function KnowledgeScreen() {
  const { locale, tx } = useI18n();
  const substances = getSubstances(locale);
  const combinations = getCombinations(locale);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [libraryMode, setLibraryMode] = useState<'substances' | 'combinations'>('substances');
  const categories = useMemo(() => ['all', ...Array.from(new Set(substances.map((item) => item.category)))], [substances]);
  const visible = useMemo(() => substances.filter((item) => {
    const matchesQuery = `${item.name} ${item.aliases}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === 'all' || item.category === category);
  }), [query, category, substances]);
  const visibleCombinations = useMemo(() => combinations.filter((item) => `${item.substances.join(' ')} ${item.sceneNames}`.toLowerCase().includes(query.toLowerCase())), [combinations, query]);

  return (
    <AppScreen>
      <SeoHead title="Substanzwissen" description="Quellenbasierte SAFEFLOOR Wissensstruktur zu Risiken, Warnzeichen und Harm Reduction – ohne Dosierungsangaben." />
      <AppHeader title={tx('Wissen', 'Knowledge')} />
      <Title>{tx('Wissen, ohne falsche Sicherheit.', 'Knowledge, without false certainty.')}</Title>
      <Body muted style={knowledgeStyles.intro}>{tx('Chemische Identitäten kommen aus PubChem. Risiko- und Warntexte bleiben bis zur Fachprüfung als redaktioneller Prototyp markiert.', 'Chemical identities come from PubChem. Risk and warning copy remains marked as editorial prototype content until professional review.')}</Body>

      <View style={knowledgeStyles.modeSwitch} accessibilityRole="tablist">
        <Chip label={tx('Substanzen', 'Substances')} active={libraryMode === 'substances'} onPress={() => { setLibraryMode('substances'); setQuery(''); }} />
        <Chip label={tx('Kombinationen', 'Combinations')} active={libraryMode === 'combinations'} onPress={() => { setLibraryMode('combinations'); setQuery(''); setCategory('all'); }} />
      </View>

      <GlassSurface radius={14} strength="quiet" style={knowledgeStyles.searchWrap}>
        <Search color={colors.gray} size={20} />
        <TextInput
          accessibilityLabel={libraryMode === 'substances' ? tx('Substanzen suchen', 'Search substances') : tx('Kombinationen suchen', 'Search combinations')}
          placeholder={libraryMode === 'substances' ? tx('Name oder Alias suchen', 'Search name or alias') : tx('Zwei Substanzen oder Szenename', 'Two substances or scene name')}
          placeholderTextColor={colors.gray}
          value={query}
          onChangeText={setQuery}
          style={knowledgeStyles.search}
        />
      </GlassSurface>
      {libraryMode === 'substances' ? <View style={knowledgeStyles.chips}>
        {categories.map((item) => <Chip key={item} label={item === 'all' ? tx('Alle', 'All') : item} active={category === item} onPress={() => setCategory(item)} />)}
      </View> : null}

      <Card tone="cyan" style={knowledgeStyles.sourceCard} onPress={() => Linking.openURL(berlinDrugCheckingSource.sourceUrl)} accessibilityLabel={tx('Offene Berliner Drug-Checking-Daten bei EUDA öffnen', 'Open public Berlin drug-checking data at EUDA')}>
        <View style={knowledgeStyles.sourceHeader}><View style={knowledgeStyles.sourceIcon}><Database color={colors.cyan400} size={20} /></View><View style={knowledgeStyles.sourceCopy}><Text style={knowledgeStyles.sourceEyebrow}>{tx('BERLIN · OFFENE DATEN', 'BERLIN · OPEN DATA')}</Text><Text style={knowledgeStyles.sourceTitle}>EUDA · TEDI</Text></View><ExternalLink color={colors.cyan400} size={18} /></View>
        <Text style={knowledgeStyles.sourceText}>{tx('Aggregierte Drug-Checking-Ergebnisse auf Stadtebene, halbjährlich. Keine Live-Warnung und keine Aussage zu deiner Probe.', 'Aggregated city-level drug-checking results, updated twice a year. Not a live alert and not a statement about your sample.')}</Text>
        <Text style={knowledgeStyles.sourceMeta}>{berlinDrugCheckingSource.period} · {tx(berlinDrugCheckingSource.cadence, 'Aggregated twice a year')} · {tx('Quelle geöffnet am', 'Source published')} {berlinDrugCheckingSource.publishedAt}</Text>
      </Card>

      {libraryMode === 'combinations' ? <Card tone="amber" style={knowledgeStyles.notice}>
        <View style={knowledgeStyles.noticeRow}><ShieldAlert color={colors.amber400} size={19} /><Text style={knowledgeStyles.noticeText}>{tx('Mischkonsum ist unvorhersehbar. Keine Kombination wird als „sicher“ bewertet und es werden keine Dosierungswerte gezeigt.', 'Mixing substances is unpredictable. No combination is labelled “safe” and no dosage values are shown.')}</Text></View>
      </Card> : null}

      <SectionTitle action={`${libraryMode === 'substances' ? visible.length : visibleCombinations.length} ${tx('Einträge', 'entries')}`}>{libraryMode === 'substances' ? tx('Bibliothek', 'Library') : tx('Mischkonsum-Risiken', 'Combination risks')}</SectionTitle>
      {libraryMode === 'substances' ? visible.map((item) => (
        <Card key={item.slug} onPress={() => router.push({ pathname: '/substance/[slug]', params: { slug: item.slug } })} accessibilityLabel={`${item.name}, ${item.category}`}>
          <View style={knowledgeStyles.itemRow}>
            <View style={knowledgeStyles.itemVisual}><SubstanceToken slug={item.slug} size={66} /></View>
            <View style={knowledgeStyles.itemCopy}>
              <Text style={knowledgeStyles.itemName}>{item.name}</Text>
              <Text style={knowledgeStyles.itemAliases}>{item.aliases}</Text>
              <View style={knowledgeStyles.itemMeta}><Text style={knowledgeStyles.itemCategory}>{item.category}</Text><Text style={knowledgeStyles.prototype}>{tx('PROTOTYP-INHALT', 'PROTOTYPE COPY')}</Text></View>
            </View>
            <ChevronRight color={colors.gray} size={20} />
          </View>
        </Card>
      )) : visibleCombinations.map((item) => {
        const pair = item.slug.split('-');
        return (
          <Card key={item.slug} tone="amber" onPress={() => router.push({ pathname: '/combination/[slug]', params: { slug: item.slug } })} accessibilityLabel={`${item.substances.join(' und ')}, ${tx('hohes Risiko', 'high risk')}`}>
            <View style={knowledgeStyles.itemRow}>
              <View style={knowledgeStyles.combinationVisual}>
                <View style={knowledgeStyles.combinationTokenBack}><SubstanceToken slug={pair[1]} size={48} /></View>
                <View style={knowledgeStyles.combinationTokenFront}><SubstanceToken slug={pair[0]} size={48} /></View>
                <View style={knowledgeStyles.mergeBadge}><GitMerge color={colors.amber300} size={13} /></View>
              </View>
              <View style={knowledgeStyles.itemCopy}>
                <Text style={knowledgeStyles.itemName}>{item.substances.join(' + ')}</Text>
                <Text style={knowledgeStyles.itemAliases}>{item.sceneNames}</Text>
                <View style={knowledgeStyles.itemMeta}><Text style={knowledgeStyles.riskBadge}>{tx('RISIKO', 'RISK')} · {item.risk.toUpperCase()}</Text><Text style={knowledgeStyles.prototype}>{tx('FACHREVIEW AUSSTEHEND', 'REVIEW PENDING')}</Text></View>
              </View>
              <ChevronRight color={colors.amber300} size={20} />
            </View>
          </Card>
        );
      })}
      {(libraryMode === 'substances' ? visible.length : visibleCombinations.length) === 0 ? <Text style={knowledgeStyles.empty}>{tx('Keine passenden Einträge gefunden.', 'No matching entries found.')}</Text> : null}
    </AppScreen>
  );
}

const knowledgeStyles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  modeSwitch: { flexDirection: 'row', gap: spacing[2], marginTop: spacing[5] },
  searchWrap: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: spacing[3], paddingHorizontal: spacing[4], marginTop: spacing[6] },
  search: { flex: 1, color: colors.white, fontFamily: 'Inter_400Regular', fontSize: 15, outlineStyle: 'none' } as never,
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[3] },
  notice: { marginTop: spacing[5] },
  sourceCard: { marginTop: spacing[5] },
  sourceHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  sourceIcon: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, borderColor: 'rgba(33,212,255,0.32)', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(33,212,255,0.07)' },
  sourceCopy: { flex: 1 },
  sourceEyebrow: { color: colors.cyan400, fontFamily: 'Inter_700Bold', fontSize: 8, letterSpacing: 1.3 },
  sourceTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15, marginTop: 3 },
  sourceText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17, marginTop: spacing[3] },
  sourceMeta: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, lineHeight: 14, marginTop: spacing[3] },
  noticeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  noticeText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  itemVisual: { width: 72, height: 66, alignItems: 'center', justifyContent: 'center' },
  combinationVisual: { width: 78, height: 70, position: 'relative' },
  combinationTokenBack: { position: 'absolute', right: 0, top: 3, opacity: 0.84 },
  combinationTokenFront: { position: 'absolute', left: 0, bottom: 0 },
  mergeBadge: { position: 'absolute', left: 29, top: 25, width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#241B11', borderWidth: 1, borderColor: 'rgba(255,184,77,0.42)' },
  itemCopy: { flex: 1 },
  itemName: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 18 },
  itemAliases: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 3 },
  itemMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: spacing[2] },
  itemCategory: { color: colors.cyan300, fontFamily: 'Inter_500Medium', fontSize: 10 },
  riskBadge: { color: colors.amber300, fontFamily: 'Inter_700Bold', fontSize: 8, letterSpacing: 0.8 },
  prototype: { color: colors.amber400, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 0.8 },
  empty: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 14, textAlign: 'center', marginTop: spacing[8] },
});
