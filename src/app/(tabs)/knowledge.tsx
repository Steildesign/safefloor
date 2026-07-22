import { router } from 'expo-router';
import { ChevronRight, Search, ShieldAlert } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { GlassSurface } from '@/components/glass-surface';
import { SubstanceToken } from '@/components/substance-token';
import { AppHeader, AppScreen, Body, Card, Chip, SectionTitle, Title } from '@/components/ui';
import { substances } from '@/data/mock';
import { colors, spacing } from '@/theme/tokens';

export default function KnowledgeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('Alle');
  const visible = useMemo(() => substances.filter((item) => {
    const matchesQuery = `${item.name} ${item.aliases}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (category === 'Alle' || item.category === category);
  }), [query, category]);

  return (
    <AppScreen>
      <SeoHead title="Substanzwissen" description="Quellenbasierte SAFEFLOOR Wissensstruktur zu Risiken, Warnzeichen und Harm Reduction – ohne Dosierungsangaben." />
      <AppHeader title="Wissen" />
      <Title>Wissen, ohne falsche Sicherheit.</Title>
      <Body muted style={knowledgeStyles.intro}>Der Prototyp zeigt die spätere Inhaltsstruktur. Medizinische Aussagen benötigen vor Veröffentlichung Fachreview.</Body>

      <GlassSurface radius={14} strength="quiet" style={knowledgeStyles.searchWrap}>
        <Search color={colors.gray} size={20} />
        <TextInput
          accessibilityLabel="Substanzen suchen"
          placeholder="Name oder Alias suchen"
          placeholderTextColor={colors.gray}
          value={query}
          onChangeText={setQuery}
          style={knowledgeStyles.search}
        />
      </GlassSurface>
      <View style={knowledgeStyles.chips}>
        {['Alle', 'Empathogen', 'Dissoziativum', 'Cannabinoid', 'Dämpfend'].map((item) => <Chip key={item} label={item} active={category === item} onPress={() => setCategory(item)} />)}
      </View>

      <Card tone="amber" style={knowledgeStyles.notice}>
        <View style={knowledgeStyles.noticeRow}><ShieldAlert color={colors.amber400} size={19} /><Text style={knowledgeStyles.noticeText}>Keine Kombination wird als „sicher“ bewertet. Keine Dosierungswerte.</Text></View>
      </Card>

      <SectionTitle action={`${visible.length} Einträge`}>Bibliothek</SectionTitle>
      {visible.map((item) => (
        <Card key={item.slug} onPress={() => router.push({ pathname: '/substance/[slug]', params: { slug: item.slug } })} accessibilityLabel={`${item.name}, ${item.category}`}>
          <View style={knowledgeStyles.itemRow}>
            <View style={knowledgeStyles.itemVisual}><SubstanceToken slug={item.slug} size={66} /></View>
            <View style={knowledgeStyles.itemCopy}>
              <Text style={knowledgeStyles.itemName}>{item.name}</Text>
              <Text style={knowledgeStyles.itemAliases}>{item.aliases}</Text>
              <View style={knowledgeStyles.itemMeta}><Text style={knowledgeStyles.itemCategory}>{item.category}</Text><Text style={knowledgeStyles.prototype}>PROTOTYP-INHALT</Text></View>
            </View>
            <ChevronRight color={colors.gray} size={20} />
          </View>
        </Card>
      ))}
      {visible.length === 0 ? <Text style={knowledgeStyles.empty}>Keine passenden Einträge gefunden.</Text> : null}
    </AppScreen>
  );
}

const knowledgeStyles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  searchWrap: { minHeight: 50, flexDirection: 'row', alignItems: 'center', gap: spacing[3], paddingHorizontal: spacing[4], marginTop: spacing[6] },
  search: { flex: 1, color: colors.white, fontFamily: 'Inter_400Regular', fontSize: 15, outlineStyle: 'none' } as never,
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[3] },
  notice: { marginTop: spacing[5] },
  noticeRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  noticeText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  itemVisual: { width: 72, height: 66, alignItems: 'center', justifyContent: 'center' },
  itemCopy: { flex: 1 },
  itemName: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 18 },
  itemAliases: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 3 },
  itemMeta: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: spacing[2] },
  itemCategory: { color: colors.cyan300, fontFamily: 'Inter_500Medium', fontSize: 10 },
  prototype: { color: colors.amber400, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 0.8 },
  empty: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 14, textAlign: 'center', marginTop: spacing[8] },
});
