import { GlassView, isGlassEffectAPIAvailable } from 'expo-glass-effect';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { Platform, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type GlassSurfaceProps = {
  children?: ReactNode;
  interactive?: boolean;
  radius?: number;
  strength?: 'quiet' | 'regular';
  style?: StyleProp<ViewStyle>;
};

const webBlur = Platform.select({
  web: {
    backdropFilter: 'blur(22px) saturate(128%)',
    WebkitBackdropFilter: 'blur(22px) saturate(128%)',
  } as never,
  default: undefined,
});

export function GlassSurface({
  children,
  interactive = false,
  radius = 22,
  strength = 'regular',
  style,
}: GlassSurfaceProps) {
  const nativeGlass = Platform.OS === 'ios' && isGlassEffectAPIAvailable();
  const shape = { borderRadius: radius };

  if (nativeGlass) {
    return (
      <GlassView
        colorScheme="dark"
        glassEffectStyle={strength === 'quiet' ? 'clear' : 'regular'}
        isInteractive={interactive}
        tintColor={strength === 'quiet' ? 'rgba(8,24,38,0.34)' : 'rgba(8,24,38,0.52)'}
        style={[glassStyles.surface, shape, style]}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View style={[glassStyles.surface, glassStyles.fallback, webBlur, shape, style]}>
      <LinearGradient
        colors={
          strength === 'quiet'
            ? ['rgba(216,247,255,0.105)', 'rgba(18,43,60,0.18)', 'rgba(255,184,77,0.028)']
            : ['rgba(216,247,255,0.145)', 'rgba(11,31,47,0.60)', 'rgba(255,184,77,0.045)']
        }
        locations={[0, 0.5, 1]}
        pointerEvents="none"
        start={{ x: 0.04, y: 0 }}
        end={{ x: 0.96, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View pointerEvents="none" style={[glassStyles.innerHighlight, shape]} />
      {children}
    </View>
  );
}

const glassStyles = StyleSheet.create({
  surface: {
    overflow: 'hidden',
  },
  fallback: {
    backgroundColor: 'rgba(6,18,29,0.70)',
    borderWidth: 1,
    borderColor: 'rgba(202,243,255,0.18)',
    shadowColor: '#02070D',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.38,
    shadowRadius: 26,
    elevation: 12,
  },
  innerHighlight: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.22)',
    borderLeftColor: 'rgba(112,229,255,0.075)',
    borderRightColor: 'rgba(255,255,255,0.035)',
    borderBottomColor: 'rgba(255,184,77,0.07)',
  },
});
