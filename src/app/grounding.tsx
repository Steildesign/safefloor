import { router } from 'expo-router';
import { Check, ChevronRight, Eye, Hand, Headphones, Leaf, Sparkles } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Eyebrow, Title } from '@/components/ui';
import { colors, spacing } from '@/theme/tokens';

const steps = [
  { count: '5', label: 'Dinge, die du sehen kannst', icon: Eye },
  { count: '4', label: 'Dinge, die du berühren kannst', icon: Hand },
  { count: '3', label: 'Dinge, die du hören kannst', icon: Headphones },
  { count: '2', label: 'Dinge, die du riechen kannst', icon: Leaf },
  { count: '1', label: 'Sache, die du bewusst wahrnimmst', icon: Sparkles },
];

export default function GroundingScreen() {
  const [step, setStep] = useState(0);
  const current = steps[step];
  const Icon = current.icon;
  const complete = step === steps.length - 1;

  return (
    <AppScreen scroll={false} style={groundingStyles.screen}>
      <SeoHead title="Erdungsübung" description="SAFEFLOOR 5-4-3-2-1-Erdungsübung für ruhige Orientierung." noIndex />
      <AppHeader title="Erdung" back />
      <View style={groundingStyles.progress}>{steps.map((item, index) => <View key={item.count} style={[groundingStyles.segment, index <= step && groundingStyles.segmentActive]} />)}</View>
      <View style={groundingStyles.hero}>
        <View style={groundingStyles.iconWrap}><Icon color={colors.cyan400} size={34} /></View>
        <Eyebrow>IM HIER UND JETZT</Eyebrow>
        <Text style={groundingStyles.count}>{current.count}</Text>
        <Title style={groundingStyles.center}>{current.label}</Title>
        <Body muted style={groundingStyles.body}>Nimm dir Zeit. Du musst nichts beweisen und kannst jederzeit zu einem anderen Schritt wechseln.</Body>
      </View>
      <Card tone="cyan">
        <View style={groundingStyles.tipRow}><Check color={colors.success} size={20} /><Text style={groundingStyles.tip}>Wenn du möchtest, benenne die Dinge leise für dich. Die App speichert keine Antworten.</Text></View>
      </Card>
      <View style={groundingStyles.actions}>
        <Button label={complete ? 'Übung abschließen' : 'Nächster Schritt'} icon={ChevronRight} onPress={() => complete ? router.replace('/(tabs)/help') : setStep((value) => value + 1)} />
        {step > 0 ? <Pressable onPress={() => setStep((value) => value - 1)} style={groundingStyles.back}><Text style={groundingStyles.backText}>Einen Schritt zurück</Text></Pressable> : null}
      </View>
    </AppScreen>
  );
}

const groundingStyles = StyleSheet.create({
  screen: { justifyContent: 'space-between' },
  progress: { flexDirection: 'row', gap: 6 },
  segment: { flex: 1, height: 3, borderRadius: 3, backgroundColor: colors.line },
  segmentActive: { backgroundColor: colors.cyan400 },
  hero: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: spacing[6] },
  iconWrap: { width: 74, height: 74, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(33,212,255,0.35)', backgroundColor: 'rgba(33,212,255,0.06)', alignItems: 'center', justifyContent: 'center', marginBottom: spacing[5] },
  count: { color: colors.amber400, fontFamily: 'Inter_700Bold', fontSize: 76, lineHeight: 84 },
  center: { textAlign: 'center', fontSize: 27, lineHeight: 33, maxWidth: 380 },
  body: { textAlign: 'center', fontSize: 13, lineHeight: 20, marginTop: spacing[4], paddingHorizontal: spacing[4] },
  tipRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'flex-start' },
  tip: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  actions: { gap: spacing[2], marginTop: spacing[3] },
  back: { minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  backText: { color: colors.gray, fontFamily: 'Inter_500Medium', fontSize: 12 },
});
