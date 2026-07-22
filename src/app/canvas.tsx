import { Eraser, Hand, Infinity as InfinityIcon, Play, Sparkles, X } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';
import { PanResponder, Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { GlassSurface } from '@/components/glass-surface';
import { SeoHead } from '@/components/seo-head';
import { AppHeader, AppScreen, Body, Button, Card, Chip, Eyebrow, Title } from '@/components/ui';
import { useI18n } from '@/i18n/provider';
import { colors, spacing } from '@/theme/tokens';

type Point = { x: number; y: number };
type Stroke = { id: number; points: Point[]; color: string; completedAt?: number };
type DrawMode = 'trail' | 'stay';

const palettes = [
  { name: 'Ocean', colors: ['#21D4FF', '#70E5FF', '#3E7CFF'] },
  { name: 'Sunset', colors: ['#FFB84D', '#FF7A8A', '#A76DFF'] },
  { name: 'Aurora', colors: ['#59F0C2', '#21D4FF', '#B8FF8A'] },
];

function buildPath(points: Point[]) {
  if (!points.length) return '';
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length - 1; index += 1) {
    const midpointX = (points[index].x + points[index + 1].x) / 2;
    const midpointY = (points[index].y + points[index + 1].y) / 2;
    path += ` Q ${points[index].x} ${points[index].y} ${midpointX} ${midpointY}`;
  }
  const last = points[points.length - 1];
  path += ` T ${last.x} ${last.y}`;
  return path;
}

export default function FlowCanvasScreen() {
  const { tx } = useI18n();
  const [active, setActive] = useState(false);
  const [mode, setMode] = useState<DrawMode>('trail');
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [strokes, setStrokes] = useState<Stroke[]>([]);

  useEffect(() => {
    if (mode !== 'trail') return;
    const timer = setInterval(() => {
      const now = Date.now();
      setStrokes((current) => current.filter((stroke) => !stroke.completedAt || now - stroke.completedAt < 3200));
    }, 180);
    return () => clearInterval(timer);
  }, [mode]);

  const responder = useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => active,
    onMoveShouldSetPanResponder: () => active,
    onPanResponderGrant: (event) => {
      const id = event.nativeEvent.timestamp;
      const point = { x: event.nativeEvent.locationX, y: event.nativeEvent.locationY };
      const palette = palettes[paletteIndex];
      setStrokes((current) => [...current, { id, points: [point], color: palette.colors[id % palette.colors.length] }].slice(-28));
    },
    onPanResponderMove: (event) => {
      const point = { x: event.nativeEvent.locationX, y: event.nativeEvent.locationY };
      setStrokes((current) => {
        const activeIndex = current.findLastIndex((stroke) => !stroke.completedAt);
        return current.map((stroke, index) => index === activeIndex ? { ...stroke, points: [...stroke.points, point].slice(-180) } : stroke);
      });
    },
    onPanResponderRelease: () => {
      setStrokes((current) => {
        const activeIndex = current.findLastIndex((stroke) => !stroke.completedAt);
        return current.map((stroke, index) => index === activeIndex ? { ...stroke, completedAt: Date.now() } : stroke);
      });
    },
    onPanResponderTerminate: () => {
      setStrokes((current) => {
        const activeIndex = current.findLastIndex((stroke) => !stroke.completedAt);
        return current.map((stroke, index) => index === activeIndex ? { ...stroke, completedAt: Date.now() } : stroke);
      });
    },
  }), [active, paletteIndex]);

  if (!active) {
    return (
      <AppScreen key="canvas-intro">
        <SeoHead title={tx('Flow Canvas', 'Flow Canvas')} description={tx('Eine ruhige, taktile Zeichenfläche im SAFEFLOOR Begleiter.', 'A calm, tactile drawing surface inside the SAFEFLOOR companion.')} noIndex />
        <AppHeader title="Flow Canvas" back />
        <View style={canvasStyles.introHero}>
          <View style={canvasStyles.introOrb}><Sparkles color={colors.cyan300} size={36} /></View>
          <Eyebrow>{tx('TAKTIL · LOKAL · OHNE BEWERTUNG', 'TACTILE · LOCAL · NO JUDGEMENT')}</Eyebrow>
          <Title style={canvasStyles.center}>{tx('Willst du jetzt malen?', 'Would you like to draw?')}</Title>
          <Body muted style={canvasStyles.introBody}>{tx('Bewege deinen Finger über den Screen. Lichtspuren folgen dir – und können wieder verschwinden, wenn du loslässt.', 'Move your finger across the screen. Trails of light follow you and can gently fade when you let go.')}</Body>
        </View>
        <Card tone="cyan">
          <View style={canvasStyles.featureRow}><Hand color={colors.cyan400} size={22} /><Text style={canvasStyles.featureText}>{tx('Kein Ziel, kein Score, kein richtig oder falsch.', 'No goal, no score, no right or wrong.')}</Text></View>
          <View style={canvasStyles.featureRow}><InfinityIcon color={colors.cyan400} size={22} /><Text style={canvasStyles.featureText}>{tx('Spuren können flüchtig sein oder bleiben.', 'Trails can fade away or stay.')}</Text></View>
        </Card>
        <Button label={tx('Canvas öffnen', 'Open canvas')} icon={Play} onPress={() => setActive(true)} />
        <Text style={canvasStyles.disclaimer}>{tx('Dieses Modul dient der ruhigen Beschäftigung und ersetzt keine reale Hilfe.', 'This module offers a calm activity and does not replace real-world help.')}</Text>
      </AppScreen>
    );
  }

  return (
    <AppScreen key="canvas-active" scroll={false} padded={false} floatingMenu={false} motion="none">
      <SeoHead title="Flow Canvas" description="SAFEFLOOR Flow Canvas" noIndex />
      <View style={canvasStyles.canvasRoot} {...responder.panHandlers}>
        <Svg style={StyleSheet.absoluteFill} width="100%" height="100%">
          {strokes.map((stroke) => {
            const path = buildPath(stroke.points);
            const fading = 1;
            const end = stroke.points[stroke.points.length - 1];
            return (
              <G key={stroke.id}>
                <Path d={path} stroke={stroke.color} strokeWidth={34} strokeLinecap="round" strokeLinejoin="round" opacity={0.055 * fading} fill="none" />
                <Path d={path} stroke={stroke.color} strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" opacity={0.16 * fading} fill="none" />
                <Path d={path} stroke={stroke.color} strokeWidth={5.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.86 * fading} fill="none" />
                {end ? <Circle cx={end.x} cy={end.y} r={9} fill={stroke.color} opacity={0.9 * fading} /> : null}
              </G>
            );
          })}
        </Svg>

        <View pointerEvents="box-none" style={canvasStyles.canvasChrome}>
          <View style={canvasStyles.canvasTop}>
            <GlassSurface radius={18} strength="quiet" style={canvasStyles.controlBar}>
              <Pressable accessibilityRole="button" accessibilityLabel={tx('Canvas schließen', 'Close canvas')} onPress={() => { setActive(false); setStrokes([]); }} style={canvasStyles.roundControl}><X color={colors.white} size={20} /></Pressable>
              <View pointerEvents="none" style={canvasStyles.canvasTitleWrap}><Text style={canvasStyles.canvasTitle}>FLOW CANVAS</Text><Text style={canvasStyles.canvasSubtitle}>{tx('Zieh eine ruhige Spur', 'Draw a calm trail')}</Text></View>
              <Pressable accessibilityRole="button" accessibilityLabel={tx('Alles löschen', 'Clear all')} onPress={() => setStrokes([])} style={canvasStyles.roundControl}><Eraser color={colors.white} size={19} /></Pressable>
            </GlassSurface>
          </View>

          <View style={canvasStyles.canvasBottom}>
            <GlassSurface radius={24} strength="regular" style={canvasStyles.bottomGlass}>
              <View style={canvasStyles.modeRow}>
                <Chip label={tx('Verblassen', 'Fade')} active={mode === 'trail'} onPress={() => setMode('trail')} />
                <Chip label={tx('Bleiben', 'Stay')} active={mode === 'stay'} onPress={() => setMode('stay')} />
              </View>
              <View style={canvasStyles.paletteRow}>
                {palettes.map((item, index) => (
                  <Pressable key={item.name} accessibilityRole="radio" accessibilityState={{ checked: paletteIndex === index }} accessibilityLabel={item.name} onPress={() => setPaletteIndex(index)} style={[canvasStyles.paletteButton, paletteIndex === index && canvasStyles.paletteButtonActive]}>
                    {item.colors.map((color) => <View key={color} style={[canvasStyles.colorDot, { backgroundColor: color }]} />)}
                  </Pressable>
                ))}
              </View>
            </GlassSurface>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}

const canvasStyles = StyleSheet.create({
  introHero: { alignItems: 'center', paddingTop: spacing[8], paddingBottom: spacing[5] },
  introOrb: { width: 110, height: 110, borderRadius: 55, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[6], borderWidth: 1, borderColor: 'rgba(112,229,255,0.28)', backgroundColor: 'rgba(33,212,255,0.08)', shadowColor: colors.cyan400, shadowOpacity: 0.35, shadowRadius: 28 },
  center: { textAlign: 'center', marginTop: spacing[2] },
  introBody: { textAlign: 'center', marginTop: spacing[3], lineHeight: 22 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginVertical: spacing[2] },
  featureText: { flex: 1, color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 12, lineHeight: 18 },
  disclaimer: { color: colors.gray, fontFamily: 'Inter_400Regular', fontSize: 9, lineHeight: 15, textAlign: 'center', marginTop: spacing[4] },
  canvasRoot: { flex: 1, minHeight: Platform.OS === 'web' ? '100%' : undefined, backgroundColor: 'rgba(1,8,15,0.40)', touchAction: 'none' } as never,
  canvasChrome: { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, justifyContent: 'space-between', paddingHorizontal: spacing[3], paddingTop: spacing[3], paddingBottom: spacing[4] },
  canvasTop: { pointerEvents: 'box-none' } as never,
  controlBar: { minHeight: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing[2] },
  roundControl: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center', borderRadius: 15 },
  canvasTitleWrap: { alignItems: 'center' },
  canvasTitle: { color: colors.cyan300, fontFamily: 'Inter_700Bold', fontSize: 10, letterSpacing: 1.7 },
  canvasSubtitle: { color: colors.grayLight, fontFamily: 'Inter_400Regular', fontSize: 9, marginTop: 3 },
  canvasBottom: { pointerEvents: 'box-none' } as never,
  bottomGlass: { padding: spacing[3] },
  modeRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing[2] },
  paletteRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing[3], marginTop: spacing[3] },
  paletteButton: { height: 38, paddingHorizontal: 10, borderRadius: 14, flexDirection: 'row', alignItems: 'center', gap: 3, borderWidth: 1, borderColor: colors.line },
  paletteButtonActive: { borderColor: 'rgba(112,229,255,0.45)', backgroundColor: 'rgba(33,212,255,0.08)' },
  colorDot: { width: 10, height: 10, borderRadius: 10 },
});
