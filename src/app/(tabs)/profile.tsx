import { router } from 'expo-router';
import { Accessibility, BellOff, ChevronRight, Clock3, FileLock2, HeartHandshake, PhoneCall, ShieldCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { PearlAvatar } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppHeader, AppScreen, Card, SectionTitle } from '@/components/ui';
import { colors, spacing } from '@/theme/tokens';
import { useI18n } from '@/i18n/provider';

export default function ProfileScreen() {
  const { tx } = useI18n();
  return (
    <AppScreen>
      <SeoHead title="Profil" description="Lokale SAFEFLOOR Einstellungen, Vertrauenspersonen und Datenschutzoptionen." noIndex />
      <AppHeader title={tx('Profil', 'Profile')} />
      <View style={profileStyles.profileHero}>
        <PearlAvatar size={94} />
        <Text style={profileStyles.alias}>Alex</Text>
        <View style={profileStyles.aliasMeta}><View style={profileStyles.aliasDot} /><Text style={profileStyles.subtitle}>{tx('Demo-Alias · keine Anmeldung', 'Demo alias · no sign-in')}</Text></View>
      </View>

      <SectionTitle>{tx('Dein Sicherheitsnetz', 'Your safety network')}</SectionTitle>
      <ActionRow icon={PhoneCall} title={tx('Notfallkontakte', 'Emergency contacts')} detail={tx('3 lokale Demo-Kontakte gespeichert.', '3 local demo contacts saved.')} onPress={() => router.push('/trusted-contacts')} />
      <ActionRow icon={HeartHandshake} title={tx('Vertrauenspersonen', 'Trusted people')} detail={tx('2 lokale Demo-Kontakte gespeichert.', '2 local demo contacts saved.')} onPress={() => router.push('/trusted-contacts')} />
      <ActionRow icon={ShieldCheck} title={tx('Persönlicher Sicherheitsplan', 'Personal safety plan')} detail={tx('Was hilft dir, ruhiger zu werden?', 'What helps you feel calmer?')} onPress={() => router.push('/aftercare')} />
      <ActionRow icon={Clock3} title={tx('Erinnerungseinstellungen', 'Reminder settings')} detail={tx('Atemübungen und lokale Check-ins.', 'Breathing exercises and local check-ins.')} onPress={() => {}} />

      <SectionTitle>{tx('Privatsphäre & Nutzung', 'Privacy & use')}</SectionTitle>
      <ActionRow icon={FileLock2} title={tx('Datenschutz', 'Privacy')} detail={tx('Lokale Daten, Einwilligungen und spätere Löschoptionen.', 'Local data, consent and future deletion options.')} onPress={() => {}} />
      <ActionRow icon={BellOff} title={tx('Neutrale Mitteilungen', 'Neutral notifications')} detail={tx('Push ist im Prototyp vollständig deaktiviert.', 'Push is fully disabled in the prototype.')} onPress={() => {}} />
      <ActionRow icon={Accessibility} title={tx('Barrierefreiheit', 'Accessibility')} detail={tx('Reduzierte Bewegung, große Ziele und klare Kontraste.', 'Reduced motion, large targets and clear contrast.')} onPress={() => {}} />

      <Card tone="amber" style={profileStyles.emergencyCard}>
        <View style={profileStyles.emergencyRow}>
          <View style={profileStyles.emergencyCopy}>
            <Text style={profileStyles.emergencyTitle}>{tx('Notfallzugriff', 'Emergency access')}</Text>
            <Text style={profileStyles.emergencyText}>{tx('112 und Safety-Check bleiben unabhängig von Konto oder KI erreichbar.', '112 and the safety check remain available without an account or AI.')}</Text>
          </View>
          <ChevronRight color={colors.amber400} size={21} />
        </View>
      </Card>
    </AppScreen>
  );
}

const profileStyles = StyleSheet.create({
  profileHero: { alignItems: 'center', paddingTop: spacing[5], paddingBottom: spacing[4] },
  alias: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 24, marginTop: spacing[4] },
  aliasMeta: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 6 },
  aliasDot: { width: 6, height: 6, borderRadius: 6, backgroundColor: colors.amber400, shadowColor: colors.amber400, shadowOpacity: 0.7, shadowRadius: 8 },
  subtitle: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 12 },
  emergencyCard: { marginTop: spacing[8] },
  emergencyRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  emergencyCopy: { flex: 1 },
  emergencyTitle: { color: colors.amber400, fontFamily: 'Inter_600SemiBold', fontSize: 15, marginBottom: 5 },
  emergencyText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
});
