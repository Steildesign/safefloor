import { router } from 'expo-router';
import { ArrowRight, SkipForward } from 'lucide-react-native';
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
  Ellipse,
  G,
  LinearGradient as SvgLinearGradient,
  Path,
  Rect,
  Stop,
} from 'react-native-svg';

import { BrandMark } from '@/components/brand-mark';
import { AppScreen, BrandWordmark } from '@/components/ui';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useI18n } from '@/i18n/provider';
import { colors, spacing } from '@/theme/tokens';

const BODY_PATH = 'M150 18 C126 18 112 36 112 59 C112 80 124 94 133 99 C116 105 99 116 91 136 L69 211 C64 229 71 241 84 240 L106 177 L114 238 L105 330 L113 397 C115 411 135 412 138 397 L150 302 L162 397 C165 412 185 411 187 397 L195 330 L186 238 L194 177 L216 240 C229 241 236 229 231 211 L209 136 C201 116 184 105 167 99 C176 94 188 80 188 59 C188 36 174 18 150 18 Z';

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
        <SvgLinearGradient id={`${prefix}-scan`} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={clear ? '#70E5FF' : '#FFD28A'} stopOpacity="0" />
          <Stop offset="0.5" stopColor={clear ? '#70E5FF' : '#FFB84D'} stopOpacity={clear ? 0.42 : 0.3} />
          <Stop offset="1" stopColor={clear ? '#70E5FF' : '#FFD28A'} stopOpacity="0" />
        </SvgLinearGradient>
      </Defs>

      <Ellipse cx="150" cy="404" rx="82" ry="9" fill={clear ? '#21D4FF' : '#FFB84D'} opacity={clear ? 0.15 : 0.09} />
      <Path d={BODY_PATH} fill={`url(#${prefix}-body)`} stroke={clear ? '#70E5FF' : '#FFBE64'} strokeWidth={clear ? 1.35 : 1} opacity={clear ? 0.92 : 0.72} />
      <Path d={BODY_PATH} fill="none" stroke="#21D4FF" strokeWidth="0.65" opacity={clear ? 0.34 : 0.16} transform="translate(-3 0)" />
      <Path d={BODY_PATH} fill="none" stroke={clear ? '#FFFFFF' : '#FF8A59'} strokeWidth="0.55" opacity={clear ? 0.18 : 0.2} transform="translate(3 0)" />

      <G opacity={clear ? 0.5 : 0.28} stroke={clear ? '#70E5FF' : '#FFD28A'} fill="none">
        <Path d="M150 103 L150 294" strokeWidth="0.85" strokeDasharray="4 8" />
        <Path d="M116 139 Q150 157 184 139" strokeWidth="0.8" />
        <Path d="M111 158 Q150 179 189 158" strokeWidth="0.7" />
        <Path d="M109 180 Q150 201 191 180" strokeWidth="0.62" />
        <Path d="M114 207 Q150 221 186 207" strokeWidth="0.55" />
        <Circle cx="150" cy="210" r="28" strokeWidth="0.7" strokeDasharray="3 5" />
        <Circle cx="150" cy="210" r="12" strokeWidth="0.65" />
      </G>

      <G opacity={clear ? 0.7 : 0.38} stroke={clear ? '#D5FAFF' : '#FFCE84'} fill="none" strokeLinecap="round">
        <Path d="M137 52 C139 39 149 35 153 45 C158 36 167 42 165 52 C173 57 166 69 158 66 C154 77 144 74 143 65 C133 69 129 58 137 52 Z" strokeWidth="1.15" />
        <Path d="M141 51 Q150 58 160 49 M143 61 Q151 55 164 61 M151 42 L151 69" strokeWidth="0.7" />
      </G>

      {Array.from({ length: 11 }).map((_, index) => (
        <Rect
          key={index}
          x="84"
          y={111 + index * 23}
          width="132"
          height="1"
          fill={`url(#${prefix}-scan)`}
          opacity={clear ? 0.28 : 0.14}
        />
      ))}
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

export function HologramIntro() {
  const { height, width } = useWindowDimensions();
  const { tx } = useI18n();
  const reducedMotion = useReducedMotion();
  const [activated, setActivated] = useState(false);
  const [intro] = useState(() => new Animated.Value(0));
  const [float] = useState(() => new Animated.Value(0));
  const [pulse] = useState(() => new Animated.Value(0));
  const [scan] = useState(() => new Animated.Value(0));
  const [clarity] = useState(() => new Animated.Value(0));

  const stageHeight = Math.min(418, Math.max(320, height * 0.5));
  const stageWidth = Math.min(width - 28, stageHeight * 0.72);
  const headSize = stageWidth * 0.3;
  const headPosition = useMemo(() => ({
    left: stageWidth * 0.35,
    top: stageHeight * 0.035,
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
      return;
    }

    Animated.timing(intro, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.exp),
      useNativeDriver: Platform.OS !== 'web',
    }).start();
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
  }, [float, intro, pulse, reducedMotion, scan]);

  const enterApp = () => router.replace('/(tabs)/start');

  const activateClarity = () => {
    if (activated) return;
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
  const stageScale = intro.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1] });
  const stageOpacity = intro.interpolate({ inputRange: [0, 0.32, 1], outputRange: [0, 0.76, 1] });
  const floatY = float.interpolate({ inputRange: [0, 1], outputRange: [4, -5] });
  const floatRotate = float.interpolate({ inputRange: [0, 1], outputRange: ['-3deg', '3deg'] });
  const scanY = scan.interpolate({ inputRange: [0, 1], outputRange: [-stageHeight * 0.3, stageHeight * 0.74] });
  const pulseScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.88, 1.18] });
  const pulseOpacity = pulse.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.48, 0.12, 0] });
  const promptOpacity = clarity.interpolate({ inputRange: [0, 0.18, 1], outputRange: [1, 0, 0] });
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
              StyleSheet.absoluteFill,
              {
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
          <View pointerEvents="none" style={introStyles.stageHalo} />
          <View pointerEvents="none" style={introStyles.orbitOuter} />
          <View pointerEvents="none" style={introStyles.orbitInner} />

          <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: warmOpacity }]}>
            <HologramBody variant="warm" />
          </Animated.View>
          <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: clearOpacity }]}>
            <HologramBody variant="clear" />
          </Animated.View>

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

          <Animated.View pointerEvents="none" style={[introStyles.headPulse, headPosition, { opacity: Animated.multiply(pulseOpacity, promptOpacity), transform: [{ scale: pulseScale }] }]} />
          <Animated.View pointerEvents="none" style={[introStyles.headMark, headPosition, { opacity: markOpacity, transform: [{ scale: markScale }] }]}>
            <BrandMark animated={false} size={headSize * 0.7} />
          </Animated.View>
          <Animated.View pointerEvents="none" style={[introStyles.headPrompt, { opacity: promptOpacity, top: headPosition.top + headSize + 5 }]}>
            <Text style={introStyles.headPromptText}>{tx('KOPF BERÜHREN', 'TOUCH THE HEAD')}</Text>
            <ArrowRight color={colors.amber300} size={13} />
          </Animated.View>
          </Animated.View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tx('Kopf berühren und Klarheit aktivieren', 'Touch the head and activate clarity')}
            accessibilityHint={tx('Entfernt die warmen Einflüsse und öffnet danach SAFEFLOOR.', 'Clears the warm influences and then opens SAFEFLOOR.')}
            disabled={activated}
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
  stageHalo: { position: 'absolute', left: '17%', right: '17%', top: '10%', bottom: '5%', borderRadius: 999, backgroundColor: 'rgba(33,212,255,0.028)', shadowColor: colors.cyan400, shadowOpacity: 0.32, shadowRadius: 46 },
  orbitOuter: { position: 'absolute', width: '104%', aspectRatio: 1, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(112,229,255,0.08)', top: '20%', left: '-2%', transform: [{ rotateX: '68deg' }] },
  orbitInner: { position: 'absolute', width: '72%', aspectRatio: 1, borderRadius: 999, borderWidth: 1, borderColor: 'rgba(255,184,77,0.09)', top: '31%', left: '14%', transform: [{ rotateX: '69deg' }] },
  particle: { position: 'absolute', backgroundColor: colors.amber300, shadowColor: colors.amber400, shadowOpacity: 0.9, shadowRadius: 10 },
  scanBeam: { position: 'absolute', left: '23%', right: '23%', top: '29%', height: 24, borderRadius: 20, backgroundColor: 'rgba(255,191,98,0.11)', shadowColor: colors.amber400, shadowOpacity: 0.62, shadowRadius: 18 },
  headPulse: { position: 'absolute', borderWidth: 1.5, borderColor: colors.amber300, backgroundColor: 'rgba(255,184,77,0.035)', shadowColor: colors.amber400, shadowOpacity: 0.8, shadowRadius: 18 },
  headMark: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
  headButton: { position: 'absolute', borderWidth: 1, borderColor: 'rgba(255,213,151,0.34)', backgroundColor: 'rgba(255,184,77,0.02)' },
  headButtonPressed: { backgroundColor: 'rgba(255,184,77,0.13)', transform: [{ scale: 0.94 }] },
  headPrompt: { position: 'absolute', alignSelf: 'center', left: '28%', right: '28%', minHeight: 28, borderRadius: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, backgroundColor: 'rgba(13,27,39,0.84)', borderWidth: 1, borderColor: 'rgba(255,184,77,0.2)' },
  headPromptText: { color: colors.amber300, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 1.2 },
  messageArea: { height: 70, position: 'relative', justifyContent: 'center' },
  message: { alignItems: 'center', paddingHorizontal: spacing[4] },
  messageOverlay: { position: 'absolute', left: 0, right: 0 },
  messageTitle: { color: colors.white, fontFamily: 'Inter_600SemiBold', fontSize: 16, letterSpacing: -0.15, textAlign: 'center' },
  messageTitleClear: { color: colors.cyan300 },
  messageBody: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 11, lineHeight: 16, textAlign: 'center', marginTop: 5 },
  safetyNote: { color: 'rgba(137,149,166,0.72)', fontFamily: 'Inter_400Regular', fontSize: 8.5, letterSpacing: 0.25, textAlign: 'center', marginTop: 'auto', paddingTop: 4 },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
});
