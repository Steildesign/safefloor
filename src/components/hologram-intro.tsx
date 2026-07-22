import { router } from 'expo-router';
import { Hand, SkipForward } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Stop,
} from 'react-native-svg';

import { BrandMark } from '@/components/brand-mark';
import { AppScreen, BrandWordmark } from '@/components/ui';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useI18n } from '@/i18n/provider';
import { colors, spacing } from '@/theme/tokens';

const BODY_PATH = 'M150 22 C137 22 129 32 129 46 C129 59 136 68 145 72 L144 82 C130 83 119 87 109 94 C100 101 94 109 90 121 L68 205 C65 216 69 224 77 226 C84 228 89 224 92 215 L113 149 C116 177 119 197 121 222 C120 241 112 252 112 270 C115 280 114 295 111 316 L116 395 C117 405 128 409 134 401 L150 302 L166 401 C172 409 183 405 184 395 L189 316 C186 295 185 280 188 270 C188 252 180 241 179 222 C181 197 184 177 187 149 L208 215 C211 224 216 228 223 226 C231 224 235 216 232 205 L210 121 C206 109 200 101 191 94 C181 87 170 83 156 82 L155 72 C164 68 171 59 171 46 C171 32 163 22 150 22 Z';

const FORMATION_BUBBLES = [
  { x: 0.42, y: 0.91, size: 13, side: -1 },
  { x: 0.58, y: 0.91, size: 12, side: 1 },
  { x: 0.43, y: 0.82, size: 9, side: -1 },
  { x: 0.57, y: 0.82, size: 10, side: 1 },
  { x: 0.44, y: 0.73, size: 14, side: -1 },
  { x: 0.56, y: 0.73, size: 13, side: 1 },
  { x: 0.45, y: 0.64, size: 10, side: -1 },
  { x: 0.55, y: 0.64, size: 11, side: 1 },
  { x: 0.42, y: 0.56, size: 16, side: -1 },
  { x: 0.5, y: 0.55, size: 11, side: 1 },
  { x: 0.58, y: 0.56, size: 15, side: 1 },
  { x: 0.38, y: 0.47, size: 11, side: -1 },
  { x: 0.47, y: 0.46, size: 15, side: -1 },
  { x: 0.55, y: 0.45, size: 12, side: 1 },
  { x: 0.62, y: 0.47, size: 9, side: 1 },
  { x: 0.32, y: 0.39, size: 9, side: -1 },
  { x: 0.42, y: 0.37, size: 13, side: -1 },
  { x: 0.5, y: 0.36, size: 18, side: 1 },
  { x: 0.59, y: 0.37, size: 12, side: 1 },
  { x: 0.68, y: 0.39, size: 8, side: 1 },
  { x: 0.29, y: 0.3, size: 8, side: -1 },
  { x: 0.39, y: 0.28, size: 11, side: -1 },
  { x: 0.5, y: 0.27, size: 14, side: 1 },
  { x: 0.61, y: 0.28, size: 10, side: 1 },
  { x: 0.71, y: 0.3, size: 7, side: 1 },
  { x: 0.46, y: 0.2, size: 8, side: -1 },
  { x: 0.54, y: 0.2, size: 9, side: 1 },
  { x: 0.47, y: 0.12, size: 12, side: -1 },
  { x: 0.54, y: 0.1, size: 15, side: 1 },
] as const;

const PARTICLES = [
  { x: 0.22, y: 0.69, size: 7, delay: 0, side: -1 },
  { x: 0.31, y: 0.79, size: 5, delay: 640, side: -1 },
  { x: 0.42, y: 0.67, size: 8, delay: 1180, side: -1 },
  { x: 0.53, y: 0.82, size: 6, delay: 340, side: 1 },
  { x: 0.64, y: 0.72, size: 5, delay: 910, side: 1 },
  { x: 0.74, y: 0.78, size: 8, delay: 1460, side: 1 },
  { x: 0.38, y: 0.55, size: 4, delay: 1760, side: -1 },
  { x: 0.61, y: 0.58, size: 6, delay: 2030, side: 1 },
] as const;

type BodyVariant = 'warm' | 'clear';

function HologramBody({ variant }: { variant: BodyVariant }) {
  const clear = variant === 'clear';
  const prefix = clear ? 'clear' : 'warm';
  return (
    <Svg width="100%" height="100%" viewBox="0 0 300 420" accessibilityElementsHidden>
      <Defs>
        <SvgLinearGradient id={`${prefix}-body`} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={clear ? '#B9F5FF' : '#80E8FF'} stopOpacity={clear ? 0.24 : 0.12} />
          <Stop offset="0.46" stopColor={clear ? '#21D4FF' : '#FFB84D'} stopOpacity={clear ? 0.3 : 0.34} />
          <Stop offset="1" stopColor={clear ? '#087BA8' : '#EF7D4A'} stopOpacity={clear ? 0.08 : 0.2} />
        </SvgLinearGradient>
      </Defs>

      <Path d={BODY_PATH} fill={`url(#${prefix}-body)`} stroke={clear ? '#70E5FF' : '#FFBE64'} strokeWidth={clear ? 1.35 : 1} opacity={clear ? 0.92 : 0.72} />
      <Path d={BODY_PATH} fill="none" stroke="#21D4FF" strokeWidth="0.65" opacity={clear ? 0.34 : 0.16} transform="translate(-3 0)" />
      <Path d={BODY_PATH} fill="none" stroke={clear ? '#FFFFFF' : '#FF8A59'} strokeWidth="0.55" opacity={clear ? 0.18 : 0.2} transform="translate(3 0)" />

      <G opacity={clear ? 0.38 : 0.18} stroke={clear ? '#70E5FF' : '#FFD28A'} fill="none">
        <Path d="M150 103 L150 294" strokeWidth="0.85" strokeDasharray="4 8" />
        <Circle cx="150" cy="205" r="11" strokeWidth="0.65" />
      </G>

      <G opacity={clear ? 0.7 : 0.38} stroke={clear ? '#D5FAFF' : '#FFCE84'} fill="none" strokeLinecap="round">
        <Path d="M137 52 C139 39 149 35 153 45 C158 36 167 42 165 52 C173 57 166 69 158 66 C154 77 144 74 143 65 C133 69 129 58 137 52 Z" strokeWidth="1.15" />
        <Path d="M141 51 Q150 58 160 49 M143 61 Q151 55 164 61 M151 42 L151 69" strokeWidth="0.7" />
      </G>

    </Svg>
  );
}

type FlowParticleProps = {
  clarity: Animated.Value;
  delay: number;
  reducedMotion: boolean;
  side: number;
  size: number;
  x: number;
  y: number;
};

function FlowParticle({ clarity, delay, reducedMotion, side, size, x, y }: FlowParticleProps) {
  const [flow] = useState(() => new Animated.Value(reducedMotion ? 0.46 : 0));

  useEffect(() => {
    if (reducedMotion) {
      flow.setValue(0.46);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(flow, {
          toValue: 1,
          duration: 3300,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: Platform.OS !== 'web',
        }),
        Animated.timing(flow, { toValue: 0, duration: 0, useNativeDriver: Platform.OS !== 'web' }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [delay, flow, reducedMotion]);

  const translateY = flow.interpolate({ inputRange: [0, 1], outputRange: [28, -92] });
  const driftX = flow.interpolate({ inputRange: [0, 0.45, 1], outputRange: [0, side * 9, side * -5] });
  const ejectX = clarity.interpolate({ inputRange: [0, 1], outputRange: [0, side * 105] });
  const ejectY = clarity.interpolate({ inputRange: [0, 1], outputRange: [0, 24] });
  const flowOpacity = flow.interpolate({ inputRange: [0, 0.15, 0.78, 1], outputRange: [0, 0.82, 0.58, 0] });
  const clarityOpacity = clarity.interpolate({ inputRange: [0, 0.52, 1], outputRange: [1, 0.55, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        introStyles.particle,
        {
          width: size,
          height: size,
          borderRadius: size,
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          opacity: Animated.multiply(flowOpacity, clarityOpacity),
          transform: [{ translateY }, { translateX: driftX }, { translateX: ejectX }, { translateY: ejectY }],
        },
      ]}
    />
  );
}

type FormationBubbleProps = {
  assemble: Animated.Value;
  clarity: Animated.Value;
  index: number;
  side: number;
  size: number;
  stageHeight: number;
  x: number;
  y: number;
};

function FormationBubble({ assemble, clarity, index, side, size, stageHeight, x, y }: FormationBubbleProps) {
  const start = Math.min(0.64, index * 0.021);
  const end = Math.min(0.92, start + 0.28);
  const settle = Math.min(0.99, end + 0.07);
  const rise = assemble.interpolate({
    inputRange: [0, start, end, 1],
    outputRange: [stageHeight * (0.78 - y * 0.2), stageHeight * (0.78 - y * 0.2), 0, 0],
  });
  const drift = assemble.interpolate({
    inputRange: [0, start, end, settle, 1],
    outputRange: [side * 36, side * 36, side * -4, 0, 0],
  });
  const scale = assemble.interpolate({
    inputRange: [0, start, end, settle, 1],
    outputRange: [0.28, 0.28, 1.18, 0.94, 0.78],
  });
  const formationOpacity = assemble.interpolate({
    inputRange: [0, start, Math.min(end, 0.97), 1],
    outputRange: [0, 0, 0.92, 0.2],
  });
  const clarityOpacity = clarity.interpolate({ inputRange: [0, 0.34, 1], outputRange: [1, 0.38, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        introStyles.formationBubble,
        {
          width: size,
          height: size,
          borderRadius: size,
          left: `${x * 100}%`,
          top: `${y * 100}%`,
          opacity: Animated.multiply(formationOpacity, clarityOpacity),
          transform: [{ translateY: rise }, { translateX: drift }, { scale }],
        },
      ]}
    />
  );
}

export function HologramIntro() {
  const { height, width } = useWindowDimensions();
  const { tx } = useI18n();
  const reducedMotion = useReducedMotion();
  const [activated, setActivated] = useState(false);
  const [ready, setReady] = useState(reducedMotion);
  const [intro] = useState(() => new Animated.Value(0));
  const [assemble] = useState(() => new Animated.Value(reducedMotion ? 1 : 0));
  const [float] = useState(() => new Animated.Value(0));
  const [pulse] = useState(() => new Animated.Value(0));
  const [scan] = useState(() => new Animated.Value(0));
  const [clarity] = useState(() => new Animated.Value(0));

  const viewportWidth = width > 200 ? width : 390;
  const viewportHeight = height > 400 ? height : 844;
  const stageHeight = Math.min(418, Math.max(320, viewportHeight * 0.5));
  const stageWidth = Math.min(viewportWidth - 28, stageHeight * 0.72);
  const headSize = stageWidth * 0.19;
  const headPosition = useMemo(() => ({
    left: stageWidth * 0.405,
    top: stageHeight * 0.043,
    width: headSize,
    height: headSize,
    borderRadius: headSize,
  }), [headSize, stageHeight, stageWidth]);

  useEffect(() => {
    if (reducedMotion) {
      intro.setValue(1);
      float.setValue(0.42);
      pulse.setValue(0.5);
      scan.setValue(0.46);
      assemble.setValue(1);
      return;
    }

    Animated.parallel([
      Animated.timing(intro, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.exp),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.timing(assemble, {
        toValue: 1,
        duration: 3200,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: Platform.OS !== 'web',
      }),
    ]).start(({ finished }) => {
      if (finished) setReady(true);
    });
    const floatLoop = Animated.loop(Animated.sequence([
      Animated.timing(float, { toValue: 1, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(float, { toValue: 0, duration: 3600, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
    ]));
    const pulseLoop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 1250, easing: Easing.out(Easing.exp), useNativeDriver: Platform.OS !== 'web' }),
      Animated.timing(pulse, { toValue: 0, duration: 1050, easing: Easing.inOut(Easing.sin), useNativeDriver: Platform.OS !== 'web' }),
    ]));
    const scanLoop = Animated.loop(Animated.timing(scan, { toValue: 1, duration: 4400, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' }));
    floatLoop.start();
    pulseLoop.start();
    scanLoop.start();
    return () => {
      floatLoop.stop();
      pulseLoop.stop();
      scanLoop.stop();
    };
  }, [assemble, float, intro, pulse, reducedMotion, scan]);

  const enterApp = () => router.replace('/(tabs)/start');

  const activateClarity = () => {
    if (activated || !ready) return;
    setActivated(true);
    if (reducedMotion) {
      clarity.setValue(1);
      enterApp();
      return;
    }
    Animated.sequence([
      Animated.timing(clarity, {
        toValue: 1,
        duration: 1850,
        easing: Easing.out(Easing.exp),
        useNativeDriver: Platform.OS !== 'web',
      }),
      Animated.delay(850),
    ]).start(({ finished }) => {
      if (finished) enterApp();
    });
  };

  const warmOpacity = clarity.interpolate({ inputRange: [0, 0.66, 1], outputRange: [1, 0.18, 0] });
  const clearOpacity = clarity.interpolate({ inputRange: [0, 0.32, 1], outputRange: [0, 0.24, 1] });
  const bodyFormationOpacity = assemble.interpolate({ inputRange: [0, 0.62, 0.86, 1], outputRange: [0, 0.04, 0.66, 1] });
  const stageScale = intro.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1] });
  const stageOpacity = intro.interpolate({ inputRange: [0, 0.32, 1], outputRange: [0, 0.76, 1] });
  const floatY = float.interpolate({ inputRange: [0, 1], outputRange: [4, -5] });
  const floatRotate = float.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] });
  const scanY = scan.interpolate({ inputRange: [0, 1], outputRange: [-6, stageHeight + 6] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.93, 1.14] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.52, 0.18, 0] });
  const readyOpacity = assemble.interpolate({ inputRange: [0, 0.82, 1], outputRange: [0, 0.06, 1] });
  const promptOpacity = Animated.multiply(
    readyOpacity,
    clarity.interpolate({ inputRange: [0, 0.18, 1], outputRange: [1, 0, 0] }),
  );
  const markOpacity = clarity.interpolate({ inputRange: [0, 0.56, 1], outputRange: [0, 0.2, 1] });
  const markScale = clarity.interpolate({ inputRange: [0, 0.48, 1], outputRange: [0.35, 0.48, 1] });
  const copyOut = clarity.interpolate({ inputRange: [0, 0.2, 1], outputRange: [1, 0, 0] });
  const copyIn = clarity.interpolate({ inputRange: [0, 0.58, 1], outputRange: [0, 0.08, 1] });

  return (
    <AppScreen scroll={false} padded={false} floatingMenu={false} motion="none">
      <View style={introStyles.screen}>
        <View style={introStyles.topBar}>
          <BrandWordmark compact />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tx('Intro überspringen', 'Skip intro')}
            onPress={enterApp}
            style={({ pressed }) => [introStyles.skipButton, pressed && introStyles.pressed]}
          >
            <Text style={introStyles.skipText}>{tx('Überspringen', 'Skip')}</Text>
            <SkipForward color={colors.grayLight} size={15} />
          </Pressable>
        </View>

        <View style={introStyles.heroCopy}>
          <Text style={introStyles.eyebrow}>{tx('WISSEN VERÄNDERT DEN MOMENT', 'KNOWLEDGE CHANGES THE MOMENT')}</Text>
          <Text style={introStyles.heroTitle}>{tx('Was wirkt, darf klarer werden.', 'What affects you can become clearer.')}</Text>
        </View>

        <View style={[introStyles.stage, { width: stageWidth, height: stageHeight }]}>
          <Animated.View
            style={[
              introStyles.stageMotionLayer,
              {
              width: stageWidth,
              height: stageHeight,
              opacity: stageOpacity,
              transform: [
                { perspective: 1200 },
                { translateY: floatY },
                { rotateY: floatRotate },
                { scale: stageScale },
              ],
              },
            ]}
          >
          <Animated.View pointerEvents="none" style={[introStyles.bodyLayer, { width: stageWidth, height: stageHeight, opacity: Animated.multiply(warmOpacity, bodyFormationOpacity) }]}>
            <HologramBody variant="warm" />
          </Animated.View>
          <Animated.View pointerEvents="none" style={[introStyles.bodyLayer, { width: stageWidth, height: stageHeight, opacity: clearOpacity }]}>
            <HologramBody variant="clear" />
          </Animated.View>

          {FORMATION_BUBBLES.map((bubble, index) => (
            <FormationBubble
              key={`${bubble.x}-${bubble.y}`}
              assemble={assemble}
              clarity={clarity}
              index={index}
              side={bubble.side}
              size={bubble.size}
              stageHeight={stageHeight}
              x={bubble.x}
              y={bubble.y}
            />
          ))}

          {PARTICLES.map((particle) => (
            <FlowParticle
              key={`${particle.x}-${particle.delay}`}
              clarity={clarity}
              delay={particle.delay}
              reducedMotion={reducedMotion}
              side={particle.side}
              size={particle.size}
              x={particle.x}
              y={particle.y}
            />
          ))}

          <Animated.View
            pointerEvents="none"
            style={[
              introStyles.scanBeam,
              { opacity: warmOpacity, transform: [{ translateY: scanY }] },
            ]}
          />

          <Animated.View pointerEvents="none" style={[introStyles.headPulseOuter, headPosition, { opacity: Animated.multiply(pulseOpacity, promptOpacity), transform: [{ scale: pulseScale }] }]} />
          <Animated.View
            pointerEvents="none"
            style={[
              introStyles.brainBubble,
              headPosition,
              {
                opacity: promptOpacity,
                transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.045] }) }],
              },
            ]}
          >
            <Svg width="55%" height="55%" viewBox="0 0 48 48" accessibilityElementsHidden>
              <Path
                d="M20 10 C14 6 8 11 10 17 C5 19 6 28 12 29 C9 35 15 40 20 37 M28 10 C34 6 40 11 38 17 C43 19 42 28 36 29 C39 35 33 40 28 37 M20 10 C24 11 24 15 24 20 L24 38 M28 10 C24 11 24 15 24 20 M13 19 C18 18 20 22 20 26 M35 19 C30 18 28 22 28 26 M14 30 C18 28 21 30 22 34 M34 30 C30 28 27 30 26 34"
                fill="none"
                stroke={colors.amber300}
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Animated.View>
          <Animated.View pointerEvents="none" style={[introStyles.headMark, headPosition, { opacity: markOpacity, transform: [{ scale: markScale }] }]}>
            <BrandMark animated={false} size={headSize * 0.7} />
          </Animated.View>
          <Animated.View
            pointerEvents="none"
            style={[
              introStyles.touchCue,
              {
                left: headPosition.left + headSize * 0.73,
                top: headPosition.top + headSize * 0.7,
                opacity: promptOpacity,
                transform: [{ translateY: pulse.interpolate({ inputRange: [0, 1], outputRange: [2, -3] }) }],
              },
            ]}
          >
            <Hand color={colors.midnight950} fill={colors.amber300} size={14} strokeWidth={2.1} />
          </Animated.View>
          </Animated.View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tx('Kopf berühren und Klarheit aktivieren', 'Touch the head and activate clarity')}
            accessibilityHint={tx('Entfernt die warmen Einflüsse und öffnet danach SAFEFLOOR.', 'Clears the warm influences and then opens SAFEFLOOR.')}
            disabled={activated || !ready}
            onPress={activateClarity}
            style={({ pressed }) => [introStyles.headButton, headPosition, pressed && introStyles.headButtonPressed]}
          />
        </View>

        <View style={introStyles.messageArea} pointerEvents="none">
          <Animated.View style={[introStyles.message, { opacity: copyOut, transform: [{ translateY: clarity.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }] }]}>
            <Text style={introStyles.messageTitle}>{tx('Einfluss wahrnehmen.', 'Notice the influence.')}</Text>
            <Text style={introStyles.messageBody}>{tx('Information schafft Orientierung – ohne Druck und ohne Bewertung.', 'Information creates orientation – without pressure or judgment.')}</Text>
          </Animated.View>
          <Animated.View style={[introStyles.message, introStyles.messageOverlay, { opacity: copyIn, transform: [{ translateY: clarity.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }]}>
            <Text style={[introStyles.messageTitle, introStyles.messageTitleClear]}>{tx('Klarheit beginnt mit Wissen.', 'Clarity begins with knowledge.')}</Text>
            <Text style={introStyles.messageBody}>{tx('SAFEFLOOR öffnet deinen ruhigen Überblick.', 'SAFEFLOOR is opening your calm overview.')}</Text>
          </Animated.View>
        </View>

        <Text style={introStyles.safetyNote}>{tx('Kein medizinisches Diagnosewerkzeug · Im Notfall 112', 'Not a medical diagnostic tool · In an emergency call 112')}</Text>
      </View>
    </AppScreen>
  );
}

const introStyles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: spacing[5],
    paddingBottom: spacing[3],
  },
  topBar: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing[2],
  },
  skipButton: {
    minHeight: 44,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(202,243,255,0.13)',
    backgroundColor: 'rgba(8,24,38,0.5)',
  },
  skipText: { color: colors.grayLight, fontFamily: 'Inter_500Medium', fontSize: 11 },
  heroCopy: { alignItems: 'center', paddingTop: spacing[2], paddingHorizontal: spacing[2] },
  eyebrow: { color: colors.amber300, fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1.7, textAlign: 'center' },
  heroTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 23, lineHeight: 29, letterSpacing: -0.35, textAlign: 'center', marginTop: 7 },
  stage: { alignSelf: 'center', position: 'relative', marginTop: 2 },
  stageMotionLayer: { position: 'absolute', left: 0, top: 0 },
  bodyLayer: { position: 'absolute', left: 0, top: 0 },
  particle: { position: 'absolute', backgroundColor: colors.amber300, shadowColor: colors.amber400, shadowOpacity: 0.9, shadowRadius: 10 },
  formationBubble: {
    position: 'absolute',
    marginLeft: -5,
    marginTop: -5,
    borderWidth: 1,
    borderColor: 'rgba(255,220,166,0.74)',
    backgroundColor: 'rgba(255,184,77,0.2)',
    shadowColor: colors.amber400,
    shadowOpacity: 0.86,
    shadowRadius: 12,
  },
  scanBeam: {
    position: 'absolute',
    left: '17%',
    right: '17%',
    top: 0,
    height: 2,
    backgroundColor: 'rgba(255,209,138,0.82)',
    shadowColor: colors.amber400,
    shadowOpacity: 0.94,
    shadowRadius: 12,
  },
  headPulseOuter: { position: 'absolute', borderWidth: 1.5, borderColor: colors.amber300, backgroundColor: 'rgba(255,184,77,0.025)', shadowColor: colors.amber400, shadowOpacity: 0.84, shadowRadius: 20 },
  brainBubble: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,218,157,0.72)',
    backgroundColor: 'rgba(255,184,77,0.12)',
    shadowColor: colors.amber400,
    shadowOpacity: 0.75,
    shadowRadius: 18,
  },
  headMark: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  headButton: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(255,213,151,0.34)', backgroundColor: 'rgba(255,184,77,0.02)' },
  headButtonPressed: { backgroundColor: 'rgba(255,184,77,0.13)', transform: [{ scale: 0.94 }] },
  touchCue: {
    position: 'absolute',
    width: 27,
    height: 27,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.amber300,
    borderWidth: 2,
    borderColor: 'rgba(255,244,226,0.72)',
    shadowColor: colors.amber400,
    shadowOpacity: 0.78,
    shadowRadius: 11,
  },
  messageArea: { height: 70, position: 'relative', justifyContent: 'center' },
  message: { alignItems: 'center', paddingHorizontal: spacing[4] },
  messageOverlay: { position: 'absolute', left: 0, right: 0 },
  messageTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 16, letterSpacing: -0.15, textAlign: 'center' },
  messageTitleClear: { color: colors.cyan300 },
  messageBody: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 5 },
  safetyNote: { color: 'rgba(137,149,166,0.72)', fontFamily: 'Inter_400Regular', fontSize: 8.5, letterSpacing: 0.25, textAlign: 'center', marginTop: 'auto', paddingTop: 4 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
});
