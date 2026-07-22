import { router } from 'expo-router';
import { Accessibility, BellOff, ChevronRight, Clock3, FileLock2, HeartHandshake, PhoneCall, ShieldCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { PearlAvatar } from '@/components/brand-mark';
import { SeoHead } from '@/components/seo-head';
import { ActionRow, AppHeader, AppScreen, Card, SectionTitle } from '@/components/ui';
import { colors, spacing } from '@/theme/tokens';

export default function ProfileScreen() {
  return (
    <AppScreen>
      <SeoHead title="Profil" description="Lokale SAFEFLOOR Einstellungen, Vertrauenspersonen und Datenschutzoptionen." noIndex />
      <AppHeader title="Profil" />
      <View style={profileStyles.profileHero}>
        <PearlAvatar size={94} />
        <Text style={profileStyles.alias}>Alex</Text>
        <View style={profileStyles.aliasMeta}><View style={profileStyles.aliasDot} /><Text style={profileStyles.subtitle}>Demo-Alias · keine Anmeldung</Text></View>
      </View>

      <SectionTitle>Dein Sicherheitsnetz</SectionTitle>
      <ActionRow icon={PhoneCall} title="Notfallkontakte" detail="3 lokale Demo-Kontakte gespeichert." onPress={() => router.push('/trusted-contacts')} />
      <ActionRow icon={HeartHandshake} title="Vertrauenspersonen" detail="2 lokale Demo-Kontakte gespeichert." onPress={() => router.push('/trusted-contacts')} />
      <ActionRow icon={ShieldCheck} title="Persönlicher Sicherheitsplan" detail="Was hilft dir, ruhiger zu werden?" onPress={() => router.push('/aftercare')} />
      <ActionRow icon={Clock3} title="Erinnerungseinstellungen" detail="Atemübungen und lokale Check-ins." onPress={() => {}} />

      <SectionTitle>Privatsphäre & Nutzung</SectionTitle>
      <ActionRow icon={FileLock2} title="Datenschutz" detail="Lokale Daten, Einwilligungen und spätere Löschoptionen." onPress={() => {}} />
      <ActionRow icon={BellOff} title="Neutrale Mitteilungen" detail="Push ist im Prototyp vollständig deaktiviert." onPress={() => {}} />
      <ActionRow icon={Accessibility} title="Barrierefreiheit" detail="Reduzierte Bewegung, große Ziele und klare Kontraste." onPress={() => {}} />

      <Card tone="amber" style={profileStyles.emergencyCard}>
        <View style={profileStyles.emergencyRow}>
          <View style={profileStyles.emergencyCopy}>
            <Text style={profileStyles.emergencyTitle}>Notfallzugriff</Text>
            <Text style={profileStyles.emergencyText}>112 und Safety-Check bleiben unabhängig von Konto oder KI erreichbar.</Text>
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
