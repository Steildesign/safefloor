import { router } from 'expo-router';
import { Check, Eye, FileWarning, HeartHandshake, LockKeyhole, MapPin, Send, ShieldCheck } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { BrandMark } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Chip, Eyebrow, Title } from '@/components/ui';
import { getReportCategories } from '@/data/mock';
import { colors, radii, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

const identityPattern = /(?:\b[\w.-]+@[\w.-]+\.[a-z]{2,}\b|\+?\d[\d\s/-]{7,}|\b(?:herr|frau)\s+[A-ZÄÖÜ][a-zäöüß]+)/i;

export default function ReportScreen() {
  const { locale, tx } = useI18n();
  const reportCategories = getReportCategories(locale);
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<string | null>(null);
  const [time, setTime] = useState('Jetzt');
  const [zone, setZone] = useState('Bereich Nord');
  const [details, setDetails] = useState('');
  const [awareness, setAwareness] = useState(false);
  const containsIdentity = useMemo(() => identityPattern.test(details), [details]);
  const selected = reportCategories.find((item) => item.id === category);

  if (step === 3) {
    return (
      <AppScreen scroll={false} style={reportStyles.confirmScreen}>
        <SeoHead title="Meldung simuliert" description="Bestätigung einer lokal simulierten SAFEFLOOR Meldung." noIndex />
        <View style={reportStyles.confirmHero}>
          <BrandMark size={142} />
          <View style={reportStyles.checkBubble}><Check color={colors.black} size={24} /></View>
        </View>
        <Eyebrow>{tx('LOKALE PROTOTYP-SIMULATION', 'LOCAL PROTOTYPE SIMULATION')}</Eyebrow>
        <Title style={reportStyles.centerText}>{tx('Danke für deinen Hinweis.', 'Thank you for the notice.')}</Title>
        <Body muted style={reportStyles.confirmBody}>{tx('Es wurden keine Daten übertragen. Der spätere Versand wird nur nach erneuter Bestätigung und mit klarer Moderationslogik möglich sein.', 'No data was transmitted. A future submission will require another confirmation and clear moderation logic.')}</Body>
        <Card tone="cyan" style={reportStyles.confirmCard}>
          <View style={reportStyles.confirmLine}><LockKeyhole color={colors.cyan400} size={18} /><Text style={reportStyles.confirmLineText}>{tx('Kein Klarnamenfeld vorgesehen', 'No legal-name field planned')}</Text></View>
          <View style={reportStyles.confirmLine}><ShieldCheck color={colors.cyan400} size={18} /><Text style={reportStyles.confirmLineText}>{tx('Keine automatische Veröffentlichung', 'No automatic publication')}</Text></View>
          <View style={reportStyles.confirmLine}><Eye color={colors.cyan400} size={18} /><Text style={reportStyles.confirmLineText}>{tx('Menschliche Moderation ist eingeplant', 'Human moderation is planned')}</Text></View>
        </Card>
        <View style={reportStyles.confirmActions}>
          <Button label={tx('Zur Community', 'Back to community')} onPress={() => router.replace('/(tabs)/community')} />
          <Button label={tx('Weitere Meldung simulieren', 'Simulate another report')} tone="ghost" onPress={() => { setStep(1); setCategory(null); setDetails(''); }} />
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen>
      <SeoHead title="Beobachtung melden" description="Dreistufiger SAFEFLOOR Prototyp für datensparsame Community-Meldungen." noIndex />
      <AppHeader title={tx('Beobachtung melden', 'Report an observation')} back />
      <View style={reportStyles.progress}>
        {[1, 2, 3].map((item) => <View key={item} style={[reportStyles.progressSegment, item <= step && reportStyles.progressActive]} />)}
      </View>

      {step === 1 ? (
        <>
          <Eyebrow tone="amber">{tx('SCHRITT 1 VON 3', 'STEP 1 OF 3')}</Eyebrow>
          <Title>{tx('Was möchtest du melden?', 'What would you like to report?')}</Title>
          <Body muted style={reportStyles.intro}>{tx('Wähle die Kategorie, die am besten passt. Es wird noch nichts gesendet.', 'Choose the category that fits best. Nothing is sent yet.')}</Body>
          <View style={reportStyles.categoryList}>
            {reportCategories.map((item, index) => (
              <Card key={item.id} tone={category === item.id ? (item.tone === 'amber' ? 'amber' : 'cyan') : 'default'} onPress={() => setCategory(item.id)} accessibilityLabel={`${item.title}. ${item.description}`}>
                <View style={reportStyles.categoryRow}>
                  <View style={[reportStyles.categoryIndex, category === item.id && reportStyles.categoryIndexActive]}><Text style={[reportStyles.categoryNumber, category === item.id && reportStyles.categoryNumberActive]}>{String(index + 1).padStart(2, '0')}</Text></View>
                  <View style={reportStyles.categoryCopy}><Text style={reportStyles.categoryTitle}>{item.title}</Text><Text style={reportStyles.categoryDescription}>{item.description}</Text></View>
                  {category === item.id ? <Check color={colors.cyan400} size={21} /> : null}
                </View>
              </Card>
            ))}
          </View>
          <Button label={tx('Details ergänzen', 'Add details')} onPress={() => setStep(2)} disabled={!category} />
        </>
      ) : (
        <>
          <Eyebrow tone="amber">{tx('SCHRITT 2 VON 3', 'STEP 2 OF 3')}</Eyebrow>
          <Title>{tx('Nur das Wesentliche.', 'Only what matters.')}</Title>
          <Body muted style={reportStyles.intro}>{tx('Keine Namen, Kontaktdaten, genauen Adressen oder Anschuldigungen gegen Einzelpersonen.', 'No names, contact details, exact addresses or accusations against individuals.')}</Body>

          <Text style={reportStyles.label}>{tx('Ausgewählte Kategorie', 'Selected category')}</Text>
          <Card tone="cyan" style={reportStyles.selectedCard}>
            <Text style={reportStyles.selectedTitle}>{selected?.title}</Text>
            <Pressable onPress={() => setStep(1)}><Text style={reportStyles.change}>{tx('Ändern', 'Change')}</Text></Pressable>
          </Card>

          <Text style={reportStyles.label}>{tx('Wann?', 'When?')}</Text>
          <View style={reportStyles.chips}>{[tx('Jetzt', 'Now'), tx('Unter 30 Min.', 'Under 30 min'), tx('Heute', 'Today')].map((item) => <Chip key={item} label={item} active={time === item} onPress={() => setTime(item)} />)}</View>

          <Text style={reportStyles.label}>{tx('Grober Bereich', 'Approximate area')}</Text>
          <View style={reportStyles.chips}>{[tx('Bereich Nord', 'North area'), tx('Haupthalle', 'Main hall'), tx('Außenbereich', 'Outdoor area')].map((item) => <Chip key={item} label={item} active={zone === item} onPress={() => setZone(item)} />)}</View>

          <Text style={reportStyles.label}>Kurze Beschreibung · optional</Text>
          <View style={[reportStyles.inputWrap, containsIdentity && reportStyles.inputWarning]}>
            <TextInput
              accessibilityLabel="Kurze Beschreibung"
              multiline
              maxLength={500}
              value={details}
              onChangeText={setDetails}
              placeholder="Was hast du beobachtet? Bitte ohne identifizierende Angaben."
              placeholderTextColor={colors.gray}
              style={reportStyles.input}
            />
            <Text style={reportStyles.counter}>{details.length}/500</Text>
          </View>
          {containsIdentity ? <View style={reportStyles.warning}><FileWarning color={colors.amber400} size={18} /><Text style={reportStyles.warningText}>Möglicherweise identifizierende Angaben erkannt. Bitte vor dem Fortfahren entfernen.</Text></View> : null}

          <Pressable accessibilityRole="checkbox" accessibilityState={{ checked: awareness }} onPress={() => setAwareness((value) => !value)} style={reportStyles.checkboxRow}>
            <View style={[reportStyles.checkbox, awareness && reportStyles.checkboxActive]}>{awareness ? <Check color={colors.black} size={15} /> : null}</View>
            <View style={reportStyles.checkboxCopy}><Text style={reportStyles.checkboxTitle}>Awareness-Team informieren</Text><Text style={reportStyles.checkboxDetail}>Im Prototyp nur als Auswahl sichtbar; keine echte Zustellung.</Text></View>
          </Pressable>

          <Card style={reportStyles.summaryCard}>
            <View style={reportStyles.summaryLine}><MapPin color={colors.gray} size={16} /><Text style={reportStyles.summaryText}>{zone} · {time}</Text></View>
            <View style={reportStyles.summaryLine}><HeartHandshake color={colors.gray} size={16} /><Text style={reportStyles.summaryText}>{awareness ? 'Awareness gewünscht' : 'Keine Kontaktanfrage'}</Text></View>
          </Card>
          <Button label={tx('Meldung lokal simulieren', 'Simulate report locally')} icon={Send} tone="amber" onPress={() => setStep(3)} disabled={containsIdentity} />
          <Text style={reportStyles.prototypeNote}>{tx('Kein Netzwerkaufruf · keine Speicherung · keine Veröffentlichung', 'No network call · no storage · no publication')}</Text>
        </>
      )}
    </AppScreen>
  );
}

const reportStyles = StyleSheet.create({
  progress: { flexDirection: 'row', gap: 6, marginBottom: spacing[6] },
  progressSegment: { flex: 1, height: 3, borderRadius: 3, backgroundColor: colors.line },
  progressActive: { backgroundColor: colors.cyan400 },
  intro: { fontSize: 14, lineHeight: 21, marginTop: spacing[3], marginBottom: spacing[6] },
  categoryList: { marginBottom: spacing[2] },
  categoryRow: { flexDirection: 'row', gap: spacing[3], alignItems: 'center' },
  categoryIndex: { width: 42, height: 42, borderRadius: 14, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  categoryIndexActive: { borderColor: colors.cyan400, backgroundColor: 'rgba(33,212,255,0.08)' },
  categoryNumber: { color: colors.gray, fontFamily: 'Inter_600SemiBold', fontSize: 11, letterSpacing: 0.8 },
  categoryNumberActive: { color: colors.cyan400 },
  categoryCopy: { flex: 1 },
  categoryTitle: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 15, marginBottom: 4 },
  categoryDescription: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16 },
  label: { color: colors.grayLight, fontFamily: 'Inter_500Medium', fontSize: 12, marginTop: spacing[5], marginBottom: spacing[2] },
  selectedCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectedTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  change: { color: colors.cyan400, fontFamily: 'Inter_500Medium', fontSize: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  inputWrap: { minHeight: 142, borderRadius: radii.card, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.midnight800, padding: spacing[4] },
  inputWarning: { borderColor: colors.amber400 },
  input: { minHeight: 94, color: colors.white, fontFamily: 'Inter_400Regular', fontSize: 15, lineHeight: 22, textAlignVertical: 'top' },
  counter: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, textAlign: 'right' },
  warning: { flexDirection: 'row', gap: spacing[2], alignItems: 'flex-start', marginTop: spacing[2] },
  warningText: { flex: 1, color: colors.amber300, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17 },
  checkboxRow: { minHeight: 68, flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginTop: spacing[5] },
  checkbox: { width: 24, height: 24, borderRadius: 8, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center' },
  checkboxActive: { backgroundColor: colors.cyan400, borderColor: colors.cyan400 },
  checkboxCopy: { flex: 1 },
  checkboxTitle: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 14, marginBottom: 4 },
  checkboxDetail: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16 },
  summaryCard: { marginTop: spacing[4] },
  summaryLine: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], marginVertical: 4 },
  summaryText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12 },
  prototypeNote: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, textAlign: 'center', marginTop: spacing[3], letterSpacing: 0.4 },
  confirmScreen: { justifyContent: 'center' },
  confirmHero: { alignItems: 'center', marginBottom: spacing[4] },
  checkBubble: { position: 'absolute', bottom: 4, right: '28%', width: 38, height: 38, borderRadius: 38, backgroundColor: colors.success, borderWidth: 4, borderColor: colors.midnight950, alignItems: 'center', justifyContent: 'center' },
  centerText: { textAlign: 'center' },
  confirmBody: { textAlign: 'center', fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  confirmCard: { marginTop: spacing[6] },
  confirmLine: { flexDirection: 'row', gap: spacing[3], alignItems: 'center', marginVertical: spacing[2] },
  confirmLineText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 13 },
  confirmActions: { gap: spacing[2], marginTop: spacing[5] },
});
