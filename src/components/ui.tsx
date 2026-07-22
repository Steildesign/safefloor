import type { LucideIcon } from 'lucide-react-native';
import { ReactNode, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  CircleUserRound,
  HeartHandshake,
  Home,
  Languages,
  LifeBuoy,
  Menu,
  MessageCircle,
  Palette,
  ShieldCheck,
  UsersRound,
  Wind,
  X,
} from 'lucide-react-native';
import { type Href, router, usePathname } from 'expo-router';

import { colors, radii, shadows, spacing } from '@/theme/tokens';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { GlassSurface } from '@/components/glass-surface';
import { useI18n } from '@/i18n/provider';

type AppScreenProps = {
  children: ReactNode;
  motion?: 'subtle' | 'none';
  scroll?: boolean;
  padded?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppScreen({ children, motion = 'subtle', scroll = true, padded = true, style }: AppScreenProps) {
  const [entrance] = useState(() => new Animated.Value(Platform.OS === 'web' || motion === 'none' ? 1 : 0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (Platform.OS === 'web' || reducedMotion || motion === 'none') {
      entrance.setValue(1);
      return;
    }
    Animated.timing(entrance, {
      toValue: 1,
      duration: 520,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [entrance, motion, reducedMotion]);

  const content = (
    <Animated.View
      key={scroll ? 'scroll-content' : 'static-content'}
      style={[
        screenStyles.inner,
        padded && screenStyles.padded,
        style,
        {
          opacity: entrance,
          transform: [{ translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );

  return (
    <SafeAreaView edges={['top']} style={screenStyles.safe}>
      <AmbientBackground />
      {scroll ? (
        <ScrollView key="scroll-container" style={screenStyles.scroll} contentContainerStyle={screenStyles.scrollContent} showsVerticalScrollIndicator={false}>
          {content}
        </ScrollView>
      ) : (
        <View key="static-container" style={screenStyles.staticContainer}>{content}</View>
      )}
    </SafeAreaView>
  );
}

function AmbientBackground() {
  const [drift] = useState(() => new Animated.Value(0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      drift.setValue(0.38);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(drift, { toValue: 1, duration: 16000, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(drift, { toValue: 0, duration: 16000, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [drift, reducedMotion]);

  const cyanX = drift.interpolate({ inputRange: [0, 1], outputRange: [-42, 36] });
  const cyanY = drift.interpolate({ inputRange: [0, 1], outputRange: [-18, 42] });
  const amberX = drift.interpolate({ inputRange: [0, 1], outputRange: [38, -34] });
  const amberY = drift.interpolate({ inputRange: [0, 1], outputRange: [32, -26] });
  const ribbonX = drift.interpolate({ inputRange: [0, 1], outputRange: [-28, 30] });
  const breathe = drift.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient
        colors={['#050C15', '#071624', '#06111D', '#050B13']}
        locations={[0, 0.34, 0.72, 1]}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.92, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View style={[screenStyles.ambientCyan, { transform: [{ translateX: cyanX }, { translateY: cyanY }, { rotate: '-10deg' }, { scale: breathe }] }]}>
        <LinearGradient
          colors={['rgba(33,212,255,0)', 'rgba(33,212,255,0.105)', 'rgba(26,126,170,0.055)', 'rgba(33,212,255,0)']}
          locations={[0, 0.28, 0.65, 1]}
          start={{ x: 0, y: 0.2 }}
          end={{ x: 1, y: 0.8 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View style={[screenStyles.ambientAmber, { transform: [{ translateX: amberX }, { translateY: amberY }, { rotate: '12deg' }, { scale: breathe }] }]}>
        <LinearGradient
          colors={['rgba(255,184,77,0)', 'rgba(255,184,77,0.058)', 'rgba(69,40,15,0.025)', 'rgba(255,184,77,0)']}
          locations={[0, 0.3, 0.68, 1]}
          start={{ x: 1, y: 0.1 }}
          end={{ x: 0, y: 0.9 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <Animated.View style={[screenStyles.ambientRibbon, { transform: [{ translateX: ribbonX }, { rotate: '-18deg' }] }]}>
        <LinearGradient
          colors={['rgba(33,212,255,0)', 'rgba(112,229,255,0.043)', 'rgba(255,184,77,0.025)', 'rgba(33,212,255,0)']}
          locations={[0, 0.38, 0.62, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
      <View style={screenStyles.ambientVeil} />
    </View>
  );
}

type MenuItem = {
  label: string;
  detail: string;
  href: Href;
  icon: LucideIcon;
};

export function AppMenuButton() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { locale, setLocale, tx } = useI18n();
  const primaryMenuItems: MenuItem[] = [
    { label: tx('Start', 'Home'), detail: tx('Dein ruhiger Überblick', 'Your calm overview'), href: '/(tabs)/start', icon: Home },
    { label: 'Community', detail: tx('Lokale Hinweise & Ressourcen', 'Local alerts & resources'), href: '/(tabs)/community', icon: UsersRound },
    { label: tx('Begleiter', 'Companion'), detail: tx('Ruhe, Erdung & Gespräch', 'Calm, grounding & conversation'), href: '/(tabs)/help', icon: LifeBuoy },
    { label: tx('Wissen', 'Knowledge'), detail: tx('Substanzen & Warnzeichen', 'Substances & warning signs'), href: '/(tabs)/knowledge', icon: BookOpen },
    { label: tx('Profil', 'Profile'), detail: tx('Sicherheitsnetz & Privatsphäre', 'Safety network & privacy'), href: '/(tabs)/profile', icon: CircleUserRound },
  ];
  const supportMenuItems: MenuItem[] = [
    { label: tx('Atemhilfe', 'Breathing'), detail: tx('Vier ruhige Sekunden', 'Four calm seconds'), href: '/breathing', icon: Wind },
    { label: tx('Flow Canvas', 'Flow Canvas'), detail: tx('Mit dem Finger zur Ruhe kommen', 'Settle through gentle touch'), href: '/canvas', icon: Palette },
    { label: tx('Ruhiges Gespräch', 'Calm conversation'), detail: tx('Begrenzte Begleiter-Demo', 'Bounded companion demo'), href: '/chat', icon: MessageCircle },
    { label: tx('Nachsorge', 'Aftercare'), detail: tx('Nächste sichere Schritte', 'Next safer steps'), href: '/aftercare', icon: HeartHandshake },
    { label: 'Safety-Check', detail: tx('Warnzeichen klar prüfen', 'Check clear warning signs'), href: '/safety-check', icon: ShieldCheck },
  ];

  const navigate = (href: Href) => {
    setOpen(false);
    router.push(href);
  };

  const renderItem = (item: MenuItem) => {
    const Icon = item.icon;
    const active = pathname === String(item.href).replace('/(tabs)', '');
    return (
      <Pressable
        key={item.label}
        accessibilityRole="button"
        accessibilityLabel={`${item.label}. ${item.detail}`}
        onPress={() => navigate(item.href)}
        style={({ pressed }) => [screenStyles.menuItem, active && screenStyles.menuItemActive, pressed && screenStyles.pressed]}
      >
        <View style={[screenStyles.menuItemIcon, active && screenStyles.menuItemIconActive]}>
          <Icon color={active ? colors.cyan300 : colors.grayLight} size={20} />
        </View>
        <View style={screenStyles.menuItemCopy}>
          <Text style={[screenStyles.menuItemTitle, active && screenStyles.menuItemTitleActive]}>{item.label}</Text>
          <Text style={screenStyles.menuItemDetail}>{item.detail}</Text>
        </View>
        <ChevronRight color={active ? colors.cyan400 : colors.gray} size={18} />
      </Pressable>
    );
  };

  return (
    <>
      <GlassSurface interactive radius={16} strength="quiet" style={screenStyles.menuButtonGlass}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={tx('App-Menü öffnen', 'Open app menu')}
          onPress={() => setOpen(true)}
          style={({ pressed }) => [screenStyles.menuButton, pressed && screenStyles.pressed]}
        >
          <Menu color={colors.white} size={21} />
        </Pressable>
      </GlassSurface>
      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={screenStyles.menuModal}>
          <Pressable accessibilityLabel={tx('App-Menü schließen', 'Close app menu')} onPress={() => setOpen(false)} style={StyleSheet.absoluteFill} />
          <SafeAreaView edges={['top', 'bottom']} style={screenStyles.menuSheet}>
            <View style={screenStyles.menuHandle} />
            <View style={screenStyles.menuHeader}>
              <View>
                <BrandWordmark compact />
                <Text style={screenStyles.menuClaim}>{tx('DEIN RUHIGER BEGLEITER', 'YOUR CALM COMPANION')}</Text>
              </View>
              <GlassSurface interactive radius={16} strength="quiet" style={screenStyles.menuButtonGlass}>
                <Pressable accessibilityRole="button" accessibilityLabel={tx('App-Menü schließen', 'Close app menu')} onPress={() => setOpen(false)} style={({ pressed }) => [screenStyles.menuButton, pressed && screenStyles.pressed]}>
                  <X color={colors.white} size={21} />
                </Pressable>
              </GlassSurface>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={screenStyles.menuScroll}>
              <View style={screenStyles.languageBlock}>
                <View style={screenStyles.languageLabelRow}>
                  <Languages color={colors.cyan400} size={18} />
                  <View style={screenStyles.languageCopy}>
                    <Text style={screenStyles.languageTitle}>{tx('Sprache', 'Language')}</Text>
                    <Text style={screenStyles.languageDetail}>{tx('Gilt sofort in der gesamten App', 'Applies across the app immediately')}</Text>
                  </View>
                </View>
                <View accessibilityRole="radiogroup" style={screenStyles.languageChoices}>
                  {(['de', 'en'] as const).map((value) => (
                    <Pressable
                      key={value}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: locale === value }}
                      onPress={() => setLocale(value)}
                      style={[screenStyles.languageChoice, locale === value && screenStyles.languageChoiceActive]}
                    >
                      <Text style={[screenStyles.languageCode, locale === value && screenStyles.languageCodeActive]}>{value.toUpperCase()}</Text>
                      <Text style={[screenStyles.languageName, locale === value && screenStyles.languageNameActive]}>{value === 'de' ? 'Deutsch' : 'English'}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
              <Text style={screenStyles.menuSectionLabel}>{tx('HAUPTBEREICHE', 'MAIN AREAS')}</Text>
              {primaryMenuItems.map(renderItem)}
              <Text style={screenStyles.menuSectionLabel}>{tx('SCHNELLHILFE', 'QUICK SUPPORT')}</Text>
              {supportMenuItems.map(renderItem)}
              <View style={screenStyles.menuEmergencyNote}>
                <Text style={screenStyles.menuEmergencyTitle}>{tx('Akute Gefahr?', 'Immediate danger?')}</Text>
                <Text style={screenStyles.menuEmergencyText}>{tx('SAFEFLOOR ersetzt keine Notfallversorgung. Bei Lebensgefahr sofort 112.', 'SAFEFLOOR is not emergency care. Call 112 immediately if a life is at risk.')}</Text>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </Modal>
    </>
  );
}

type AppHeaderProps = {
  title?: string;
  eyebrow?: string;
  back?: boolean;
  right?: ReactNode;
};

export function AppHeader({ title, eyebrow, back = false, right }: AppHeaderProps) {
  const { tx } = useI18n();
  return (
    <View style={screenStyles.header}>
      <View style={screenStyles.headerSide}>
        {back ? (
          <Pressable accessibilityRole="button" accessibilityLabel={tx('Zurück', 'Back')} onPress={() => router.back()} style={({ pressed }) => [screenStyles.iconButton, pressed && screenStyles.pressed]}>
            <ArrowLeft color={colors.white} size={21} />
          </Pressable>
        ) : null}
      </View>
      <View style={screenStyles.headerCenter}>
        {eyebrow ? <Text style={screenStyles.headerEyebrow}>{eyebrow}</Text> : null}
        {title ? <Text style={screenStyles.headerTitle}>{title}</Text> : null}
      </View>
      <View style={[screenStyles.headerSide, screenStyles.headerRight]}>{right ?? <AppMenuButton />}</View>
    </View>
  );
}

export function BrandWordmark({ compact = false }: { compact?: boolean }) {
  return (
    <View style={screenStyles.wordmarkRow}>
      <Text style={[screenStyles.wordmark, compact && screenStyles.wordmarkCompact]}>SAFE</Text>
      <Text style={[screenStyles.wordmark, screenStyles.wordmarkBlue, compact && screenStyles.wordmarkCompact]}>FLOOR</Text>
    </View>
  );
}

export function Eyebrow({ children, tone = 'cyan' }: { children: ReactNode; tone?: 'cyan' | 'amber' | 'gray' }) {
  const color = tone === 'amber' ? colors.amber400 : tone === 'gray' ? colors.gray : colors.cyan400;
  return <Text style={[screenStyles.eyebrow, { color }]}>{children}</Text>;
}

export function Title({ children, style }: { children: ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[screenStyles.title, style]}>{children}</Text>;
}

export function Body({ children, muted = false, style }: { children: ReactNode; muted?: boolean; style?: StyleProp<TextStyle> }) {
  return <Text style={[screenStyles.body, muted && screenStyles.bodyMuted, style]}>{children}</Text>;
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: string }) {
  return (
    <View style={screenStyles.sectionTitleRow}>
      <Text style={screenStyles.sectionTitle}>{children}</Text>
      {action ? <Text style={screenStyles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

type ButtonProps = {
  label: string;
  onPress: () => void;
  tone?: 'cyan' | 'amber' | 'emergency' | 'ghost';
  icon?: LucideIcon;
  disabled?: boolean;
  loading?: boolean;
};

export function Button({ label, onPress, tone = 'cyan', icon: Icon, disabled = false, loading = false }: ButtonProps) {
  const contentColor = tone === 'amber' ? colors.black : colors.white;
  const button = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        screenStyles.button,
        tone === 'ghost' && screenStyles.buttonGhost,
        tone === 'emergency' && screenStyles.buttonEmergency,
        (disabled || loading) && screenStyles.disabled,
        pressed && screenStyles.pressed,
      ]}
    >
      {loading ? <ActivityIndicator color={contentColor} /> : Icon ? <Icon color={contentColor} size={19} /> : null}
      <Text style={[screenStyles.buttonText, { color: contentColor }]}>{label}</Text>
    </Pressable>
  );

  if (tone === 'cyan' || tone === 'amber') {
    return (
      <LinearGradient
        colors={tone === 'amber' ? [colors.amber300, colors.amber400] : ['#148CB5', '#0E628B']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[screenStyles.buttonGradient, disabled && screenStyles.disabled]}
      >
        {button}
      </LinearGradient>
    );
  }
  return button;
}

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  tone?: 'default' | 'cyan' | 'amber' | 'emergency';
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export function Card({ children, onPress, tone = 'default', style, accessibilityLabel }: CardProps) {
  const cardStyle = [
    screenStyles.card,
    tone === 'cyan' && screenStyles.cardCyan,
    tone === 'amber' && screenStyles.cardAmber,
    tone === 'emergency' && screenStyles.cardEmergency,
    style,
  ];
  if (!onPress) return <View style={cardStyle}>{children}</View>;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={accessibilityLabel} onPress={onPress} style={({ pressed }) => [cardStyle, pressed && screenStyles.cardPressed]}>
      {children}
    </Pressable>
  );
}

export function ActionRow({ icon: Icon, title, detail, onPress, tone = 'cyan' }: { icon: LucideIcon; title: string; detail: string; onPress: () => void; tone?: 'cyan' | 'amber' | 'emergency' }) {
  const color = tone === 'amber' ? colors.amber400 : tone === 'emergency' ? colors.emergency : colors.cyan400;
  return (
    <Card onPress={onPress} tone={tone === 'emergency' ? 'emergency' : 'default'} accessibilityLabel={`${title}. ${detail}`}>
      <View style={screenStyles.actionRow}>
        <View style={[screenStyles.actionIcon, { borderColor: `${color}55`, backgroundColor: `${color}12` }]}>
          <Icon color={color} size={22} />
        </View>
        <View style={screenStyles.actionCopy}>
          <Text style={screenStyles.actionTitle}>{title}</Text>
          <Text style={screenStyles.actionDetail}>{detail}</Text>
        </View>
        <ChevronRight color={colors.gray} size={20} />
      </View>
    </Card>
  );
}

export function Chip({ label, active = false, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityState={{ selected: active }} onPress={onPress} style={({ pressed }) => [screenStyles.chip, active && screenStyles.chipActive, pressed && screenStyles.pressed]}>
      <Text style={[screenStyles.chipText, active && screenStyles.chipTextActive]}>{label}</Text>
    </Pressable>
  );
}

const screenStyles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.midnight950, overflow: 'hidden' },
  scroll: { flex: 1 },
  staticContainer: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  inner: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    minHeight: Platform.OS === 'web' ? '100%' : undefined,
  },
  padded: { paddingHorizontal: spacing[5], paddingBottom: spacing[8] },
  ambientCyan: { position: 'absolute', width: '160%', height: '68%', top: '-12%', left: '-30%', overflow: 'hidden', opacity: 0.96 },
  ambientAmber: { position: 'absolute', width: '165%', height: '70%', bottom: '-19%', left: '-32%', overflow: 'hidden', opacity: 0.9 },
  ambientRibbon: { position: 'absolute', width: '180%', height: '34%', top: '34%', left: '-40%', overflow: 'hidden', opacity: 0.72 },
  ambientVeil: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(3,9,15,0.035)' },
  header: { minHeight: 58, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[2] },
  headerSide: { width: 52, alignItems: 'flex-start' },
  headerRight: { alignItems: 'flex-end' },
  headerCenter: { flex: 1, alignItems: 'center' },
  headerEyebrow: { fontFamily: 'Inter_600SemiBold', color: colors.cyan400, fontSize: 9, letterSpacing: 1.2 },
  headerTitle: { fontFamily: 'Inter_500Medium', color: colors.white, fontSize: 15, marginTop: 2 },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 22, borderWidth: 1, borderColor: colors.line },
  menuButtonGlass: { width: 44, height: 44 },
  menuButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 16 },
  menuModal: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(1,6,11,0.72)' },
  menuSheet: { width: '100%', height: '88%', maxHeight: 760, backgroundColor: '#08131F', borderTopLeftRadius: 28, borderTopRightRadius: 28, borderWidth: 1, borderBottomWidth: 0, borderColor: 'rgba(112,229,255,0.16)', overflow: 'hidden' },
  menuHandle: { width: 42, height: 4, borderRadius: 4, backgroundColor: colors.line, alignSelf: 'center', marginTop: 10 },
  menuHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing[5], paddingTop: spacing[4], paddingBottom: spacing[3] },
  menuClaim: { color: colors.amber300, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 1.35, marginTop: 3 },
  menuScroll: { paddingHorizontal: spacing[5], paddingBottom: spacing[8] },
  menuSectionLabel: { color: colors.gray, fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1.45, marginTop: spacing[4], marginBottom: spacing[2] },
  menuItem: { minHeight: 64, flexDirection: 'row', alignItems: 'center', gap: spacing[3], borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.line },
  menuItemActive: { backgroundColor: 'rgba(33,212,255,0.035)' },
  menuItemIcon: { width: 38, height: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.025)' },
  menuItemIconActive: { backgroundColor: 'rgba(33,212,255,0.10)' },
  menuItemCopy: { flex: 1 },
  menuItemTitle: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 14 },
  menuItemTitleActive: { color: colors.cyan300 },
  menuItemDetail: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: 3 },
  menuEmergencyNote: { marginTop: spacing[6], borderRadius: radii.card, borderWidth: 1, borderColor: 'rgba(255,102,90,0.28)', backgroundColor: 'rgba(255,102,90,0.055)', padding: spacing[4] },
  menuEmergencyTitle: { color: colors.emergency, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  menuEmergencyText: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 17, marginTop: 5 },
  languageBlock: { marginTop: spacing[3], padding: spacing[3], borderRadius: 18, borderWidth: 1, borderColor: 'rgba(112,229,255,0.14)', backgroundColor: 'rgba(33,212,255,0.035)' },
  languageLabelRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  languageCopy: { flex: 1 },
  languageTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 13 },
  languageDetail: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  languageChoices: { flexDirection: 'row', gap: spacing[2], marginTop: spacing[3] },
  languageChoice: { flex: 1, minHeight: 44, borderRadius: 13, borderWidth: 1, borderColor: colors.line, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  languageChoiceActive: { backgroundColor: 'rgba(33,212,255,0.14)', borderColor: 'rgba(112,229,255,0.38)' },
  languageCode: { color: colors.gray, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1 },
  languageCodeActive: { color: colors.cyan300 },
  languageName: { color: colors.grayLight, fontFamily: 'Inter_500Medium', fontSize: 11 },
  languageNameActive: { color: colors.white },
  pressed: { opacity: 0.72, transform: [{ scale: 0.985 }] },
  wordmarkRow: { flexDirection: 'row', alignItems: 'baseline' },
  wordmark: { fontFamily: 'Inter_700Bold', fontSize: 23, letterSpacing: 2.1, color: colors.white },
  wordmarkCompact: { fontSize: 16, letterSpacing: 1.4 },
  wordmarkBlue: { color: colors.cyan300, fontFamily: 'Inter_400Regular' },
  eyebrow: { fontFamily: 'Inter_600SemiBold', fontSize: 10, letterSpacing: 1.55, marginBottom: 8 },
  title: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 30, lineHeight: 36, letterSpacing: -0.6 },
  body: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 16, lineHeight: 24 },
  bodyMuted: { color: colors.gray },
  sectionTitleRow: { marginTop: spacing[8], marginBottom: spacing[3], flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 18, letterSpacing: -0.2 },
  sectionAction: { color: colors.cyan400, fontFamily: 'Inter_500Medium', fontSize: 13 },
  buttonGradient: { borderRadius: radii.button, overflow: 'hidden' },
  button: { minHeight: 52, paddingHorizontal: spacing[5], borderRadius: radii.button, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center' },
  buttonGhost: { borderWidth: 1, borderColor: colors.line, backgroundColor: colors.midnight800 },
  buttonEmergency: { backgroundColor: colors.emergency },
  buttonText: { fontFamily: 'Inter_600SemiBold', fontSize: 15 },
  disabled: { opacity: 0.42 },
  card: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.midnight800,
    borderRadius: radii.card,
    padding: spacing[4],
    marginBottom: spacing[3],
    ...shadows.card,
  },
  cardCyan: { borderColor: 'rgba(33,212,255,0.34)', backgroundColor: '#0B2030' },
  cardAmber: { borderColor: 'rgba(255,184,77,0.36)', backgroundColor: '#201B15' },
  cardEmergency: { borderColor: 'rgba(255,102,90,0.55)', backgroundColor: '#261616' },
  cardPressed: { borderColor: colors.cyan400, transform: [{ scale: 0.994 }] },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  actionIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  actionCopy: { flex: 1 },
  actionTitle: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 15, marginBottom: 3 },
  actionDetail: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 17 },
  chip: { minHeight: 38, paddingHorizontal: 14, borderRadius: radii.round, borderWidth: 1, borderColor: colors.line, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.midnight800 },
  chipActive: { borderColor: colors.cyan400, backgroundColor: '#103448' },
  chipText: { color: colors.grayLight, fontFamily: 'Inter_500Medium', fontSize: 12 },
  chipTextActive: { color: colors.cyan300 },
});
