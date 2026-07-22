import { router } from 'expo-router';
import { AlertTriangle, Send, Sparkles, Wind } from 'lucide-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { PearlAvatar } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Card, Chip } from '@/components/ui';
import { mockTripSitterService } from '@/services/mock';
import { colors, radii, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

type Message = { id: number; role: 'assistant' | 'user'; text: string };

export default function ChatScreen() {
  const { locale, tx } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: tx('Ich bin der SAFEFLOOR KI-Prototyp. Ich kann die Situation nicht beurteilen, aber ich kann dir helfen, den nächsten kleinen Schritt zu finden.', 'I am the SAFEFLOOR AI prototype. I cannot assess the situation, but I can help you find the next small step.') },
    { id: 2, role: 'assistant', text: tx('Bist du gerade an einem Ort, an dem du sitzen oder dich anlehnen kannst?', 'Are you somewhere you can sit down or lean against something?') },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || loading) return;
    setMessages((items) => [...items, { id: Date.now(), role: 'user', text }]);
    setInput('');
    setLoading(true);
    const reply = await mockTripSitterService.reply(text, locale);
    setMessages((items) => [...items, { id: Date.now() + 1, role: 'assistant', text: reply.message }]);
    setLoading(false);
    if (reply.action === 'SHOW_EMERGENCY') router.push('/safety-check');
  };

  return (
    <KeyboardAvoidingView style={chatStyles.keyboard} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <AppScreen style={chatStyles.screen}>
        <SeoHead title="KI-Trip-Sitter Demo" description="Begrenzter, simulierter SAFEFLOOR KI-Dialog mit vorgeschaltetem Safety-Check." noIndex />
        <AppHeader title="KI-Trip-Sitter" back right={<View style={chatStyles.active}><View style={chatStyles.activeDot} /><Text style={chatStyles.activeText}>DEMO</Text></View>} />
        <Card tone="amber" style={chatStyles.safetyNotice}>
          <Pressable onPress={() => router.push('/safety-check')} style={chatStyles.noticeRow}><AlertTriangle color={colors.amber400} size={18} /><Text style={chatStyles.noticeText}>{tx('Schwere Warnzeichen? Safety-Check öffnen – nicht weiterchatten.', 'Severe warning signs? Open the safety check – do not keep chatting.')}</Text></Pressable>
        </Card>
        <View style={chatStyles.orb}><PearlAvatar size={76} /></View>
        <View style={chatStyles.messages}>
          {messages.map((message) => (
            <View key={message.id} style={[chatStyles.bubble, message.role === 'user' ? chatStyles.userBubble : chatStyles.assistantBubble]}>
              {message.role === 'assistant' ? <View style={chatStyles.aiRow}><Sparkles color={colors.cyan400} size={13} /><Text style={chatStyles.aiLabel}>{tx('KI-PROTOTYP', 'AI PROTOTYPE')}</Text></View> : null}
              <Text style={chatStyles.messageText}>{message.text}</Text>
            </View>
          ))}
          {loading ? <View style={[chatStyles.bubble, chatStyles.assistantBubble]}><Text style={chatStyles.typing}>{tx('Antwort wird lokal simuliert …', 'Reply is simulated locally …')}</Text></View> : null}
        </View>
        <View style={chatStyles.suggestions}><Chip label={tx('Ich bin sehr unruhig', 'I feel very unsettled')} onPress={() => send(tx('Ich bin sehr unruhig', 'I feel very unsettled'))} /><Chip label={tx('Atmen', 'Breathe')} onPress={() => send(tx('Hilf mir beim Atmen', 'Help me breathe'))} /></View>
        <View style={chatStyles.inputRow}>
          <TextInput accessibilityLabel={tx('Nachricht an den KI-Prototyp', 'Message to the AI prototype')} value={input} onChangeText={setInput} placeholder={tx('Schreibe einen kurzen Satz …', 'Write a short sentence …')} placeholderTextColor={colors.gray} style={chatStyles.input} onSubmitEditing={() => send()} />
          <Pressable accessibilityRole="button" accessibilityLabel={tx('Nachricht senden', 'Send message')} onPress={() => send()} style={chatStyles.send}><Send color={colors.black} size={19} /></Pressable>
        </View>
        <Pressable onPress={() => router.push('/breathing')} style={chatStyles.breathingLink}><Wind color={colors.cyan400} size={17} /><Text style={chatStyles.breathingText}>{tx('Stattdessen Atemhilfe starten', 'Start breathing instead')}</Text></Pressable>
        <Text style={chatStyles.privacy}>{tx('Verlauf wird in dieser Demo nicht gespeichert.', 'This demo does not save the conversation.')}</Text>
      </AppScreen>
    </KeyboardAvoidingView>
  );
}

const chatStyles = StyleSheet.create({
  keyboard: { flex: 1, backgroundColor: colors.midnight950 },
  screen: { minHeight: 720 },
  active: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  activeDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.success },
  activeText: { color: colors.success, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 1 },
  safetyNotice: { paddingVertical: spacing[3] },
  noticeRow: { flexDirection: 'row', gap: spacing[2], alignItems: 'center' },
  noticeText: { flex: 1, color: colors.amber300, fontFamily: 'Inter_500Medium', fontSize: 11, lineHeight: 16 },
  orb: { alignItems: 'center', marginVertical: spacing[3] },
  messages: { gap: spacing[2] },
  bubble: { maxWidth: '88%', borderRadius: radii.card, padding: spacing[3] },
  assistantBubble: { alignSelf: 'flex-start', backgroundColor: colors.midnight800, borderWidth: 1, borderColor: colors.line, borderBottomLeftRadius: 5 },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#0D435D', borderBottomRightRadius: 5 },
  aiRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 6 },
  aiLabel: { color: colors.cyan400, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 1 },
  messageText: { color: colors.white, fontFamily: 'Inter_400Regular', fontSize: 13, lineHeight: 20 },
  typing: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11 },
  suggestions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2], marginTop: spacing[4] },
  inputRow: { minHeight: 54, borderRadius: radii.button, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.midnight800, flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingLeft: spacing[4], paddingRight: 6, marginTop: spacing[4] },
  input: { flex: 1, color: colors.white, fontFamily: 'Inter_400Regular', fontSize: 14 },
  send: { width: 42, height: 42, borderRadius: 13, backgroundColor: colors.cyan400, alignItems: 'center', justifyContent: 'center' },
  breathingLink: { minHeight: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing[2] },
  breathingText: { color: colors.cyan400, fontFamily: 'Inter_500Medium', fontSize: 12 },
  privacy: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, textAlign: 'center' },
});
