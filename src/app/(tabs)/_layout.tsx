import { Tabs } from 'expo-router';
import { BookOpen, CircleUserRound, Home, LifeBuoy, UsersRound } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { GlassSurface } from '@/components/glass-surface';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { colors } from '@/theme/tokens';

function useFocusMotion(focused: boolean) {
  const [motion] = useState(() => new Animated.Value(focused ? 1 : 0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      motion.setValue(focused ? 1 : 0);
      return;
    }
    Animated.spring(motion, {
      toValue: focused ? 1 : 0,
      damping: 13,
      stiffness: 180,
      mass: 0.72,
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [focused, motion, reducedMotion]);

  return motion;
}

function tabIcon(Icon: typeof Home) {
  function TabBarIcon({ color, size, focused }: { color: unknown; size: number; focused: boolean }) {
    const motion = useFocusMotion(focused);
    const scale = motion.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.08] });
    const translateY = motion.interpolate({ inputRange: [0, 1], outputRange: [0, -2] });
    return (
      <Animated.View style={[tabStyles.iconWrap, focused && tabStyles.iconWrapFocused, { transform: [{ translateY }, { scale }] }]}>
        <Icon color={String(color)} size={size} strokeWidth={focused ? 2.15 : 1.8} />
        <Animated.View style={[tabStyles.activeDot, { opacity: motion, transform: [{ scale: motion }] }]} />
      </Animated.View>
    );
  }
  return TabBarIcon;
}

function CompanionIcon({ color, focused }: { color: unknown; size: number; focused: boolean }) {
  const motion = useFocusMotion(focused);
  const scale = motion.interpolate({ inputRange: [0, 1], outputRange: [0.97, 1.07] });
  const translateY = motion.interpolate({ inputRange: [0, 1], outputRange: [0, -2] });
  return (
    <Animated.View style={{ transform: [{ translateY }, { scale }] }}>
      <LinearGradient
        colors={focused ? ['#1DBBE4', '#0D668D'] : ['#132A3A', '#0B1723']}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={[tabStyles.companion, focused && tabStyles.companionFocused]}
      >
        <LifeBuoy color={focused ? colors.white : String(color)} size={19} strokeWidth={2} />
      </LinearGradient>
    </Animated.View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.cyan400,
        tabBarInactiveTintColor: colors.gray,
        tabBarHideOnKeyboard: true,
        tabBarBackground: () => <GlassSurface radius={24} style={StyleSheet.absoluteFill} />,
        tabBarStyle: {
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          height: 76,
          marginHorizontal: 10,
          marginBottom: 8,
          borderRadius: 24,
          paddingTop: 8,
          paddingBottom: 9,
          shadowOpacity: 0,
          elevation: 0,
        },
        tabBarLabelStyle: { fontFamily: 'Inter_500Medium', fontSize: 9.5, marginTop: 2 },
        tabBarItemStyle: { minHeight: 52 },
        sceneStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Tabs.Screen name="start" options={{ title: 'Start', tabBarIcon: tabIcon(Home) }} />
      <Tabs.Screen name="community" options={{ title: 'Community', tabBarIcon: tabIcon(UsersRound) }} />
      <Tabs.Screen name="help" options={{ title: 'Begleiter', tabBarIcon: CompanionIcon }} />
      <Tabs.Screen name="knowledge" options={{ title: 'Wissen', tabBarIcon: tabIcon(BookOpen) }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: tabIcon(CircleUserRound) }} />
    </Tabs>
  );
}

const tabStyles = StyleSheet.create({
  iconWrap: { width: 34, height: 29, borderRadius: 12, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'transparent' },
  iconWrapFocused: { backgroundColor: 'rgba(33,212,255,0.075)', borderColor: 'rgba(112,229,255,0.10)' },
  activeDot: { position: 'absolute', bottom: -1, width: 4, height: 4, borderRadius: 4, backgroundColor: colors.cyan400, shadowColor: colors.cyan400, shadowOpacity: 0.8, shadowRadius: 7 },
  companion: { width: 34, height: 34, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginTop: -3, borderWidth: 1, borderColor: 'rgba(112,229,255,0.20)', shadowColor: colors.cyan400, shadowOpacity: 0.14, shadowRadius: 10 },
  companionFocused: { shadowOpacity: 0.38, shadowRadius: 14 },
});
