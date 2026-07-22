import { Check, MapPinOff, MessageCircle, Phone, ShieldCheck, UserRoundPlus } from 'lucide-react-native';
import { useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Eyebrow, SectionTitle, Title } from '@/components/ui';
import { colors, spacing } from '@/theme/tokens';

const contacts = [
  { name: 'Mara', relation: 'Vertrauensperson', initials: 'MA' },
  { name: 'Jonas', relation: 'Begleitperson', initials: 'JO' },
];

export default function TrustedContactsScreen() {
  const [selected, setSelected] = useState('Mara');
  const [prepared, setPrepared] = useState(false);
  const message = 'Ich brauche gerade Unterstützung. Kannst du mich bitte anrufen oder zu mir kommen?';

  return (
    <AppScreen>
      <SeoHead title="Vertrauenspersonen" description="Lokaler SAFEFLOOR Kontakt-Prototyp mit bewusster Bestätigung vor jedem Anruf oder jeder Nachricht." noIndex />
      <AppHeader title="Vertrauenspersonen" back />
      <Eyebrow>LOKAL GEDACHT · NIE AUTOMATISCH</Eyebrow>
      <Title>Du entscheidest jeden Kontakt.</Title>
      <Body muted style={contactStyles.intro}>Die Kontakte sind Demo-Daten. Kein Anruf und keine Nachricht wird ohne deine ausdrückliche Aktion ausgelöst.</Body>

      <SectionTitle>Gespeicherte Demo-Kontakte</SectionTitle>
      {contacts.map((contact) => (
        <Card key={contact.name} tone={selected === contact.name ? 'cyan' : 'default'} onPress={() => { setSelected(contact.name); setPrepared(false); }} accessibilityLabel={`${contact.name}, ${contact.relation}`}>
          <View style={contactStyles.contactRow}>
            <View style={contactStyles.avatar}><Text style={contactStyles.initials}>{contact.initials}</Text></View>
            <View style={contactStyles.contactCopy}><Text style={contactStyles.contactName}>{contact.name}</Text><Text style={contactStyles.relation}>{contact.relation}</Text></View>
            {selected === contact.name ? <Check color={colors.cyan400} size={20} /> : null}
          </View>
        </Card>
      ))}

      <SectionTitle>Vorbereitete Nachricht</SectionTitle>
      <Card tone="amber">
        <MessageCircle color={colors.amber400} size={21} />
        <Text style={contactStyles.message}>„{message}“</Text>
        <View style={contactStyles.privacyRow}><MapPinOff color={colors.gray} size={16} /><Text style={contactStyles.privacyText}>Kein Standort und keine sensiblen Details enthalten.</Text></View>
      </Card>
      <View style={contactStyles.actions}>
        {!prepared ? <Button label={`Kontakt mit ${selected} vorbereiten`} icon={ShieldCheck} tone="amber" onPress={() => setPrepared(true)} /> : (
          <Card tone="cyan">
            <Text style={contactStyles.readyTitle}>Aktion bewusst bestätigt</Text>
            <Text style={contactStyles.readyText}>Im echten Produkt würde jetzt erst das Betriebssystem um eine weitere Bestätigung bitten.</Text>
            <View style={contactStyles.readyActions}><Button label="Anrufen" icon={Phone} onPress={() => Linking.openURL('tel:')} /><Button label="Nachricht öffnen" icon={MessageCircle} tone="ghost" onPress={() => Linking.openURL(`sms:?body=${encodeURIComponent(message)}`)} /></View>
          </Card>
        )}
        <Button label="Kontakt hinzufügen" icon={UserRoundPlus} tone="ghost" onPress={() => {}} />
      </View>
      <Text style={contactStyles.footer}>Für den späteren Produktbetrieb: verschlüsselte lokale Speicherung, separate Standortfreigabe und keine stille Synchronisation.</Text>
    </AppScreen>
  );
}

const contactStyles = StyleSheet.create({
  intro: { fontSize: 14, lineHeight: 21, marginTop: spacing[3] },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  avatar: { width: 46, height: 46, borderRadius: 16, backgroundColor: '#103448', borderWidth: 1, borderColor: 'rgba(33,212,255,0.3)', alignItems: 'center', justifyContent: 'center' },
  initials: { color: colors.cyan300, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  contactCopy: { flex: 1 },
  contactName: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  relation: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, marginTop: 4 },
  message: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 16, lineHeight: 24, marginTop: spacing[3] },
  privacyRow: { borderTopWidth: 1, borderTopColor: 'rgba(255,184,77,0.2)', paddingTop: spacing[3], marginTop: spacing[4], flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  privacyText: { flex: 1, color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10 },
  actions: { gap: spacing[2], marginTop: spacing[3] },
  readyTitle: { color: colors.success, fontFamily: 'Inter_600SemiBold', fontSize: 14 },
  readyText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17, marginTop: spacing[2] },
  readyActions: { gap: spacing[2], marginTop: spacing[4] },
  footer: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: spacing[6], paddingHorizontal: spacing[4] },
});
