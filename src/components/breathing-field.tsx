import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { colors } from '@/theme/tokens';

export type BreathingPhase = 'inhale' | 'hold' | 'exhale';

type BreathingFieldProps = {
  phase: BreathingPhase;
  phaseSeconds: number;
  running: boolean;
  size?: number;
};

const ringPaths = [
  'M120 26 C146 23 170 37 190 57 C208 76 214 99 207 125 C201 151 184 177 158 194 C135 210 108 209 83 201 C57 193 37 175 28 150 C20 128 24 104 31 80 C38 56 58 42 81 33 C95 28 106 29 120 26 Z',
  'M120 40 C142 35 166 47 181 65 C198 85 201 108 194 130 C186 153 169 173 147 184 C124 196 99 191 78 180 C57 169 44 149 41 126 C37 104 44 82 58 66 C74 48 98 43 120 40 Z',
  'M120 57 C140 55 158 65 170 81 C182 97 183 117 177 135 C170 153 154 167 136 173 C117 180 97 174 82 162 C66 150 58 132 59 113 C60 94 69 78 85 67 C95 60 108 59 120 57 Z',
  'M120 76 C134 73 148 80 157 91 C166 103 168 117 163 130 C157 143 146 153 132 157 C118 161 103 157 92 148 C81 139 76 125 78 111 C80 97 88 86 100 80 C106 77 113 77 120 76 Z',
];

export function BreathingField({ phase, phaseSeconds, running, size = 270 }: BreathingFieldProps) {
  const [breath] = useState(() => new Animated.Value(phase === 'inhale' ? 0.24 : 0.9));
  const [ambient] = useState(() => new Animated.Value(0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const target = phase === 'inhale' ? 1 : phase === 'hold' ? 0.84 : 0.24;
    if (!running || reducedMotion) {
      breath.setValue(target);
      return;
    }
    const transition = Animated.timing(breath, {
      toValue: target,
      duration: phaseSeconds * 1000,
      easing: Easing.inOut(Easing.sin),
      useNativeDriver: Platform.OS !== 'web',
    });
    transition.start();
    return () => transition.stop();
  }, [breath, phase, phaseSeconds, reducedMotion, running]);

  useEffect(() => {
    if (!running || reducedMotion) {
      ambient.setValue(0.25);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(ambient, {
        toValue: 1,
        duration: 18000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      }),
    );
    loop.start();
    return () => loop.stop();
  }, [ambient, reducedMotion, running]);

  const fieldScale = breath.interpolate({ inputRange: [0.24, 1], outputRange: [0.82, 1.08] });
  const pearlScale = breath.interpolate({ inputRange: [0.24, 1], outputRange: [0.94, 1.07] });
  const haloOpacity = breath.interpolate({ inputRange: [0.24, 1], outputRange: [0.14, 0.5] });
  const clockwise = ambient.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const counterClockwise = ambient.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-360deg'] });

  return (
    <View accessible accessibilityLabel="Ruhiges Atemfeld mit leuchtender blauer Perle" style={{ width: size, height: size }}>
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, breathingFieldStyles.centered, { opacity: haloOpacity, transform: [{ scale: fieldScale }] }]}>
        <View style={[breathingFieldStyles.fieldHalo, { width: size * 0.54, height: size * 0.54, borderRadius: size }]} />
      </Animated.View>

      {ringPaths.map((path, index) => (
        <Animated.View
          key={path}
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: 0.82 - index * 0.13,
              transform: [
                { scale: fieldScale },
                { rotate: index % 2 === 0 ? clockwise : counterClockwise },
              ],
            },
          ]}
        >
          <Svg width={size} height={size} viewBox="0 0 240 240">
            <Path
              d={path}
              fill="none"
              stroke={index === 0 ? colors.cyan400 : colors.cyan300}
              strokeOpacity={0.56 - index * 0.08}
              strokeWidth={index === 0 ? 1.15 : 0.8}
              strokeDasharray={index === 2 ? '2 4' : undefined}
            />
          </Svg>
        </Animated.View>
      ))}

      <Animated.View style={[breathingFieldStyles.pearlWrap, { width: size * 0.2, height: size * 0.2, borderRadius: size, transform: [{ scale: pearlScale }] }]}>
        <LinearGradient
          colors={['#E3FAFF', '#72E4FF', '#249ED1', '#0C3958']}
          locations={[0, 0.25, 0.62, 1]}
          start={{ x: 0.18, y: 0.08 }}
          end={{ x: 0.88, y: 0.95 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={breathingFieldStyles.pearlHighlight} />
      </Animated.View>
    </View>
  );
}

const breathingFieldStyles = StyleSheet.create({
  centered: { alignItems: 'center', justifyContent: 'center' },
  fieldHalo: {
    backgroundColor: colors.cyan400,
    opacity: 0.08,
    shadowColor: colors.cyan400,
    shadowOpacity: 0.95,
    shadowRadius: 42,
  },
  pearlWrap: {
    position: 'absolute',
    left: '40%',
    top: '40%',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(235,253,255,0.92)',
    shadowColor: colors.cyan300,
    shadowOpacity: 0.9,
    shadowRadius: 22,
  },
  pearlHighlight: {
    position: 'absolute',
    left: '18%',
    top: '13%',
    width: '32%',
    height: '25%',
    borderRadius: 99,
    backgroundColor: 'rgba(255,255,255,0.62)',
    transform: [{ rotate: '-24deg' }],
  },
});
