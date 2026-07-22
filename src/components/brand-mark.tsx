import { useEffect, useState } from 'react';
import { Animated, Easing, Image, Platform, StyleSheet, View } from 'react-native';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { colors } from '@/theme/tokens';

const logoSource = require('../../assets/brand/safefloor-logo-ui.png');
const pearlSource = require('../../assets/brand/safefloor-pearl.png');

type MotionProps = {
  animated?: boolean;
  size?: number;
};

export function BrandMark({ size = 96, animated = true }: MotionProps) {
  const [motion] = useState(() => new Animated.Value(0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!animated || reducedMotion) {
      motion.setValue(0.35);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(motion, { toValue: 1, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(motion, { toValue: 0, duration: 2800, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, motion, reducedMotion]);

  const scale = motion.interpolate({ inputRange: [0, 1], outputRange: [0.99, 1.018] });
  const glowOpacity = motion.interpolate({ inputRange: [0, 1], outputRange: [0.18, 0.42] });
  const height = size * 0.932;

  return (
    <View accessible accessibilityLabel="SAFEFLOOR Logo – geschützter Kern" style={{ width: size, height, position: 'relative' }}>
      <Animated.View pointerEvents="none" style={[brandStyles.logoGlowWrap, { opacity: glowOpacity, transform: [{ scale }] }]}>
        <View style={brandStyles.logoGlow} />
      </Animated.View>
      <Animated.View style={{ position: 'absolute', left: 0, top: 0, width: size, height, transform: [{ scale }] }}>
        <Image source={logoSource} resizeMode="contain" style={{ width: size, height }} />
      </Animated.View>
    </View>
  );
}

export function PearlAvatar({ size = 82, animated = true }: MotionProps) {
  const [rotation] = useState(() => new Animated.Value(0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!animated || reducedMotion) {
      rotation.setValue(0.08);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 22000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [animated, reducedMotion, rotation]);

  const rotate = rotation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const drift = rotation.interpolate({ inputRange: [0, 0.25, 0.5, 0.75, 1], outputRange: [0, -1.5, 0, 1.5, 0] });
  const pearlSize = size * 0.68;

  return (
    <View accessible accessibilityLabel="Anonymes SAFEFLOOR Profil – leuchtende Perle" style={[brandStyles.pearlFrame, { width: size, height: size, borderRadius: size }]}>
      <View pointerEvents="none" style={[brandStyles.pearlHalo, { width: size * 0.74, height: size * 0.74, borderRadius: size }]} />
      <View pointerEvents="none" style={[brandStyles.pearlOrbit, { width: size * 0.9, height: size * 0.9, borderRadius: size }]} />
      <Animated.Image
        source={pearlSource}
        resizeMode="contain"
        style={{
          width: pearlSize,
          height: pearlSize,
          transform: [{ translateY: drift }, { rotate }],
        }}
      />
    </View>
  );
}

const brandStyles = StyleSheet.create({
  logoGlowWrap: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoGlow: {
    width: '72%',
    height: '72%',
    borderRadius: 999,
    backgroundColor: colors.cyan400,
    opacity: 0.2,
    shadowColor: colors.cyan400,
    shadowOpacity: 0.9,
    shadowRadius: 30,
  },
  pearlFrame: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(112,229,255,0.22)',
    backgroundColor: 'rgba(7,22,35,0.84)',
    shadowColor: colors.cyan400,
    shadowOpacity: 0.28,
    shadowRadius: 24,
  },
  pearlHalo: {
    position: 'absolute',
    backgroundColor: colors.cyan400,
    opacity: 0.08,
    shadowColor: colors.cyan400,
    shadowOpacity: 0.9,
    shadowRadius: 25,
  },
  pearlOrbit: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'rgba(112,229,255,0.16)',
  },
});
