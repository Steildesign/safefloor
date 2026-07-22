import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { MessageCircle, Pause, Play, X } from 'lucide-react-native';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { BreathingField, BreathingPhase } from '@/components/breathing-field';
import { GlassSurface } from '@/components/glass-surface';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Chip, Title } from '@/components/ui';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { colors, spacing } from '@/theme/tokens';

type Mode = '4–4' | '4–7–8';
type SequenceStep = { label: string; seconds: number; phase: BreathingPhase };

const sequences: Record<Mode, SequenceStep[]> = {
  '4–4': [{ label: 'Atme ein', seconds: 4, phase: 'inhale' }, { label: 'Atme aus', seconds: 4, phase: 'exhale' }],
  '4–7–8': [{ label: 'Atme ein', seconds: 4, phase: 'inhale' }, { label: 'Sanft halten', seconds: 7, phase: 'hold' }, { label: 'Atme aus', seconds: 8, phase: 'exhale' }],
};

export default function BreathingScreen() {
  const [mode, setMode] = useState<Mode>('4–4');
  const [phase, setPhase] = useState(0);
  const [remaining, setRemaining] = useState(sequences[mode][0].seconds);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [cycles, setCycles] = useState(0);
  const sequence = useMemo(() => sequences[mode], [mode]);

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => {
      if (remaining > 1) {
        setRemaining(remaining - 1);
        return;
      }
      const next = (phase + 1) % sequence.length;
      if (next === 0) setCycles((count) => count + 1);
      setPhase(next);
      setRemaining(sequence[next].seconds);
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, remaining, running, sequence]);

  const start = () => {
    setPhase(0);
    setRemaining(sequence[0].seconds);
    setCycles(0);
    setStarted(true);
    setRunning(true);
  };

  const finish = () => {
    setRunning(false);
    setStarted(false);
  };

  const selectMode = (nextMode: Mode) => {
    setMode(nextMode);
    setPhase(0);
    setRemaining(sequences[nextMode][0].seconds);
    setCycles(0);
  };

  return (
    <AppScreen scroll={!started} padded={!started} motion={started ? 'none' : 'subtle'} style={started ? breathingStyles.focusScreen : breathingStyles.screen}>
      <SeoHead title="Atemhilfe" description="Offlinefähige SAFEFLOOR Atemhilfe mit ruhiger visueller Führung." noIndex />
      {started ? (
        <FocusBreathingSession
          cycles={cycles}
          mode={mode}
          phaseKey={`${phase}-${cycles}`}
          remaining={remaining}
          running={running}
          step={sequence[phase]}
          onFinish={finish}
          onToggle={() => setRunning((value) => !value)}
        />
      ) : (
        <>
          <AppHeader title="Atemhilfe" back />
          <View style={breathingStyles.activeRow}><View style={breathingStyles.activeDot} /><Text style={breathingStyles.activeText}>LÄUFT LOKAL · BLEIBT PRIVAT</Text></View>
          <View style={breathingStyles.previewHero}>
            <BreathingField phase="exhale" phaseSeconds={4} running={false} size={246} />
            <Title style={breathingStyles.previewTitle}>Nur du und dein Atem.</Title>
            <Body muted style={breathingStyles.guidance}>Nach dem Start zieht sich die Oberfläche zurück. Folge nur der Bewegung der Perle und den ruhigen Wellen.</Body>
          </View>
          <View style={breathingStyles.modeRow}>
            <Chip label="4–4 · sanft" active={mode === '4–4'} onPress={() => selectMode('4–4')} />
            <Chip label="4–7–8" active={mode === '4–7–8'} onPress={() => selectMode('4–7–8')} />
          </View>
          <Button label="Atemübung starten" icon={Play} onPress={start} />
          {cycles > 0 ? (
            <Card style={breathingStyles.completedCard}>
              <Text style={breathingStyles.completedLabel}>LETZTE ÜBUNG</Text>
              <Text style={breathingStyles.completedValue}>{cycles} ruhige {cycles === 1 ? 'Runde' : 'Runden'}</Text>
            </Card>
          ) : null}
          <View style={breathingStyles.speakButton}>
            <Button label="Lieber sprechen" icon={MessageCircle} tone="ghost" onPress={() => router.replace('/chat')} />
          </View>
        </>
      )}
    </AppScreen>
  );
}

type FocusBreathingSessionProps = {
  cycles: number;
  mode: Mode;
  phaseKey: string;
  remaining: number;
  running: boolean;
  step: SequenceStep;
  onFinish: () => void;
  onToggle: () => void;
};

function FocusBreathingSession({ cycles, mode, phaseKey, remaining, running, step, onFinish, onToggle }: FocusBreathingSessionProps) {
  const [entrance] = useState(() => new Animated.Value(0));
  const [controlsOpacity] = useState(() => new Animated.Value(1));
  const [controlsVisible, setControlsVisible] = useState(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      entrance.setValue(1);
      return;
    }
    Animated.timing(entrance, {
      toValue: 1,
      duration: 900,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [entrance, reducedMotion]);

  useEffect(() => {
    if (!running) {
      controlsOpacity.setValue(1);
      return;
    }

    Animated.timing(controlsOpacity, {
      toValue: controlsVisible ? 1 : 0,
      duration: controlsVisible ? 260 : 700,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    if (!controlsVisible || reducedMotion) return;
    const timeout = setTimeout(() => setControlsVisible(false), 4200);
    return () => clearTimeout(timeout);
  }, [controlsOpacity, controlsVisible, reducedMotion, running]);

  const revealControls = () => {
    if (!controlsVisible) setControlsVisible(true);
  };

  return (
    <Pressable accessibilityLabel="Steuerung der Atemübung einblenden" onPress={revealControls} style={breathingStyles.focusRoot}>
      <LinearGradient
        colors={['rgba(2,9,16,0.70)', 'rgba(5,17,28,0.30)', 'rgba(2,8,14,0.76)']}
        locations={[0, 0.5, 1]}
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />

      <Animated.View
        style={[
          breathingStyles.focusCenter,
          {
            opacity: entrance,
            transform: [{ scale: entrance.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1] }) }],
          },
        ]}
      >
        <BreathingField phase={step.phase} phaseSeconds={step.seconds} running={running} size={330} />
        <PhaseReadout key={phaseKey} label={running ? step.label : 'Pausiert'} remaining={remaining} />
      </Animated.View>

      <Animated.View pointerEvents={controlsVisible ? 'box-none' : 'none'} style={[breathingStyles.focusControls, { opacity: controlsOpacity }]}>
        <View style={breathingStyles.focusTopRow}>
          <Text style={breathingStyles.focusMeta}>{mode} · RUNDE {cycles + 1}</Text>
          <GlassControl accessibilityLabel="Atemübung beenden" onPress={onFinish}>
            <X color={colors.grayLight} size={20} />
          </GlassControl>
        </View>
        <View style={breathingStyles.focusBottomRow}>
          <GlassControl accessibilityLabel={running ? 'Atemübung pausieren' : 'Atemübung fortsetzen'} large onPress={onToggle}>
            {running ? <Pause color={colors.white} size={22} /> : <Play color={colors.white} size={22} />}
          </GlassControl>
          <Text style={breathingStyles.focusHint}>{running ? 'Antippen für Steuerung' : 'Du kannst fortsetzen, wenn du bereit bist.'}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

function PhaseReadout({ label, remaining }: { label: string; remaining: number }) {
  const [appearance] = useState(() => new Animated.Value(0));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      appearance.setValue(1);
      return;
    }
    Animated.timing(appearance, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: Platform.OS !== 'web',
    }).start();
  }, [appearance, reducedMotion]);

  return (
    <Animated.View style={{ opacity: appearance, transform: [{ translateY: appearance.interpolate({ inputRange: [0, 1], outputRange: [7, 0] }) }] }}>
      <Text accessibilityLiveRegion="polite" style={breathingStyles.phase}>{label}</Text>
      <Text style={breathingStyles.timer}>{remaining}</Text>
      <Text style={breathingStyles.seconds}>SEKUNDEN</Text>
    </Animated.View>
  );
}

function GlassControl({ accessibilityLabel, children, large = false, onPress }: { accessibilityLabel: string; children: ReactNode; large?: boolean; onPress: () => void }) {
  const size = large ? 58 : 44;
  return (
    <GlassSurface interactive radius={size / 2} strength="quiet" style={{ width: size, height: size }}>
      <Pressable accessibilityLabel={accessibilityLabel} accessibilityRole="button" onPress={onPress} style={({ pressed }) => [breathingStyles.glassControlButton, pressed && breathingStyles.pressed]}>
        {children}
      </Pressable>
    </GlassSurface>
  );
}

const breathingStyles = StyleSheet.create({
  screen: { paddingBottom: spacing[10] },
  focusScreen: { flex: 1, minHeight: '100%' },
  activeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: -4 },
  activeDot: { width: 6, height: 6, borderRadius: 6, borderWidth: 1, borderColor: colors.cyan400, backgroundColor: 'rgba(33,212,255,0.2)' },
  activeText: { color: colors.cyan400, fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1.15 },
  previewHero: { alignItems: 'center', justifyContent: 'center', marginTop: spacing[2] },
  previewTitle: { textAlign: 'center', fontSize: 25, lineHeight: 31, marginTop: -spacing[3] },
  guidance: { textAlign: 'center', fontSize: 13, lineHeight: 20, paddingHorizontal: spacing[3], marginTop: spacing[3] },
  modeRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing[2], marginTop: spacing[6], marginBottom: spacing[4] },
  completedCard: { marginTop: spacing[4], alignItems: 'center' },
  completedLabel: { color: colors.gray, fontFamily: 'Inter_600SemiBold', fontSize: 9, letterSpacing: 1.3 },
  completedValue: { color: colors.cyan300, fontFamily: 'Inter_500Medium', fontSize: 14, marginTop: 5 },
  speakButton: { marginTop: spacing[3] },
  focusRoot: { flex: 1, width: '100%', minHeight: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  focusCenter: { alignItems: 'center', justifyContent: 'center', marginTop: -12 },
  phase: { color: colors.white, fontFamily: 'Inter_500Medium', fontSize: 29, lineHeight: 35, textAlign: 'center', marginTop: -spacing[5] },
  timer: { color: colors.white, fontFamily: 'Inter_400Regular', fontSize: 48, lineHeight: 55, textAlign: 'center', marginTop: 7, fontVariant: ['tabular-nums'] },
  seconds: { color: colors.cyan300, fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 1.7, textAlign: 'center', marginTop: -2 },
  focusControls: { ...StyleSheet.absoluteFill, justifyContent: 'space-between', paddingTop: spacing[3], paddingHorizontal: spacing[5], paddingBottom: spacing[5] },
  focusTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  focusMeta: { color: 'rgba(184,193,205,0.58)', fontFamily: 'Inter_600SemiBold', fontSize: 8, letterSpacing: 1.4 },
  focusBottomRow: { alignItems: 'center' },
  focusHint: { color: 'rgba(184,193,205,0.52)', fontFamily: 'Inter_400Regular', fontSize: 10, marginTop: spacing[2] },
  glassControlButton: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.68, transform: [{ scale: 0.95 }] },
});
