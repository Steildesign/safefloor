import { Clock3, MapPin, ShieldCheck } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

import { CommunityAlert } from '@/domain/types';
import { colors, spacing } from '@/theme/tokens';
import { Card, Eyebrow } from './ui';

export function AlertCard({ alert, onPress }: { alert: CommunityAlert; onPress: () => void }) {
  const tone = alert.kind === 'community' ? 'amber' : alert.kind === 'resource' ? 'cyan' : 'default';
  return (
    <Card tone={tone} onPress={onPress} accessibilityLabel={`${alert.eyebrow}. ${alert.title}. ${alert.action}`}>
      <Eyebrow tone={alert.kind === 'community' ? 'amber' : 'cyan'}>{alert.eyebrow}</Eyebrow>
      <Text style={alertStyles.title}>{alert.title}</Text>
      <Text style={alertStyles.body}>{alert.body}</Text>
      <View style={alertStyles.metaWrap}>
        <View style={alertStyles.meta}><ShieldCheck color={colors.gray} size={14} /><Text style={alertStyles.metaText}>{alert.confidence}</Text></View>
        <View style={alertStyles.meta}><Clock3 color={colors.gray} size={14} /><Text style={alertStyles.metaText}>{alert.time}</Text></View>
      </View>
      <View style={alertStyles.footer}>
        <View style={alertStyles.location}><MapPin color={colors.gray} size={14} /><Text style={alertStyles.locationText} numberOfLines={1}>{alert.location}</Text></View>
        <Text style={alertStyles.action}>{alert.action}</Text>
      </View>
    </Card>
  );
}

const alertStyles = StyleSheet.create({
  title: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 20, lineHeight: 25, marginBottom: spacing[2] },
  body: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 14, lineHeight: 21 },
  metaWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[3], marginTop: spacing[4] },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  metaText: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11 },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: colors.line, paddingTop: spacing[3], marginTop: spacing[4], gap: spacing[3] },
  location: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  locationText: { flex: 1, color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11 },
  action: { color: colors.cyan400, fontFamily: 'Inter_600SemiBold', fontSize: 11 },
});
