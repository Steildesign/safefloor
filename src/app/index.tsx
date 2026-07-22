import { router } from 'expo-router';
import { BellOff, ChevronRight, LocateFixed, ShieldCheck, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { BrandMark } from '@/components/brand-mark';
import { AppMenuButton, AppScreen, Body, BrandWordmark, Button, Title } from '@/components/ui';
import { SeoHead } from '@/components/seo-head';
import { colors, spacing } from '@/theme/tokens';

const pages = [
  {
    kicker: 'WILLKOMMEN',
    title: 'Du bist nicht allein.',
    body: 'SAFEFLOOR hilft dir, informiert zu bleiben, ruhig zu handeln und Unterstützung zu finden.',
    detail: 'Gemeinsam informiert. Ruhiger entscheiden. Sicherer handeln.',
    icon: Sparkles,
  },
  {
    kicker: 'DATENSCHUTZ ZUERST',
    title: 'So wenig Daten wie möglich.',
    body: 'Du kannst den Prototyp ohne Klarnamen verwenden. Sensible Funktionen werden später nur nach deiner Zustimmung verbunden.',
    detail: 'Gastmodus bleibt der Standard.',
    icon: ShieldCheck,
  },
  {
    kicker: 'DEINE UMGEBUNG',
    title: 'Du bestimmst, was du teilst.',
    body: 'Für die Demo nutzen wir eine manuell gewählte, grobe Region. Es wird kein echter Standort verarbeitet.',
    detail: 'Manuelle Auswahl · keine Hintergrundortung',
    icon: LocateFixed,
  },
  {
    kicker: 'WICHTIGER HINWEIS',
    title: 'Hilfe bleibt menschlich.',
    body: 'Dieser Prototyp ersetzt keine medizinische Beratung und keine Notfallversorgung. Bei Lebensgefahr gilt immer: 112.',
    detail: 'Mindestens 18 Jahre · Prototyp ohne Live-Dienste',
    icon: BellOff,
  },
];

export default function WelcomeScreen() {
  const [page, setPage] = useState(0);
  const current = pages[page];
  const Icon = current.icon;

  const advance = () => {
    if (page < pages.length - 1) setPage((value) => value + 1);
    else router.replace('/(tabs)/start');
  };

  return (
    <AppScreen scroll={false} style={welcomeStyles.screen}>
      <SeoHead title="Community-basierte Harm-Reduction-App" description="SAFEFLOOR ist ein interaktiver Produktprototyp für ruhige Orientierung, Community-Hinweise, Hilfe und Nachsorge." />
      <View style={welcomeStyles.topBar}>
        <BrandWordmark compact />
        <AppMenuButton />
      </View>
      <View style={welcomeStyles.layout}>
        <View style={welcomeStyles.brandPanel}>
          <View style={welcomeStyles.orbWrap}><BrandMark size={108} /></View>
          <BrandWordmark />
          <Text style={welcomeStyles.claim}>GEMEINSAM INFORMIERT.{`\n`}RUHIGER ENTSCHEIDEN.</Text>
        </View>

        <View style={welcomeStyles.contentPanel}>
          <View style={welcomeStyles.stepRow}>
            {pages.map((item, index) => (
              <Pressable key={item.kicker} accessibilityLabel={`Schritt ${index + 1}`} onPress={() => setPage(index)} style={[welcomeStyles.step, index === page && welcomeStyles.stepActive]} />
            ))}
          </View>
          <View style={welcomeStyles.iconWrap}><Icon color={page === 3 ? colors.amber400 : colors.cyan400} size={26} /></View>
          <Text style={welcomeStyles.kicker}>{current.kicker}</Text>
          <Title style={welcomeStyles.title}>{current.title}</Title>
          <Body style={welcomeStyles.body}>{current.body}</Body>
          <View style={welcomeStyles.detailRow}>
            <View style={welcomeStyles.detailLine} />
            <Text style={welcomeStyles.detail}>{current.detail}</Text>
          </View>
          <View style={welcomeStyles.actions}>
            <Button label={page === pages.length - 1 ? 'Als Gast starten' : 'Weiter'} onPress={advance} tone={page === pages.length - 1 ? 'amber' : 'cyan'} icon={ChevronRight} />
            {page > 0 ? (
              <Pressable onPress={() => setPage((value) => Math.max(0, value - 1))} style={welcomeStyles.backLink}>
                <Text style={welcomeStyles.backText}>Zurück</Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const welcomeStyles = StyleSheet.create({
  screen: { paddingTop: spacing[2] },
  topBar: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  layout: { flex: 1, justifyContent: 'space-between', gap: spacing[4] },
  brandPanel: { alignItems: 'center', paddingTop: spacing[2] },
  orbWrap: { marginTop: spacing[2], marginBottom: spacing[1] },
  claim: { color: colors.amber300, fontFamily: 'Inter_600SemiBold', fontSize: 11, lineHeight: 18, letterSpacing: 1.8, textAlign: 'center', marginTop: spacing[2] },
  contentPanel: { paddingBottom: spacing[3] },
  stepRow: { flexDirection: 'row', gap: 7, marginBottom: spacing[4] },
  step: { width: 28, height: 3, borderRadius: 4, backgroundColor: colors.line },
  stepActive: { backgroundColor: colors.cyan400, width: 44 },
  iconWrap: { width: 50, height: 50, borderRadius: 17, borderWidth: 1, borderColor: colors.line, backgroundColor: 'rgba(11,24,38,0.72)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing[4] },
  kicker: { color: colors.cyan400, fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.8, marginBottom: spacing[2] },
  title: { fontSize: 32, lineHeight: 38 },
  body: { marginTop: spacing[3] },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginTop: spacing[4] },
  detailLine: { width: 30, height: 1, backgroundColor: colors.amber400 },
  detail: { flex: 1, color: colors.gray, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 17, letterSpacing: 0.3 },
  actions: { gap: spacing[1], marginTop: spacing[5] },
  backLink: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  backText: { color: colors.gray, fontFamily: 'Inter_500Medium', fontSize: 13 },
});
