import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

type SubstanceTokenProps = {
  size?: number;
  slug: string;
};

const palettes: Record<string, [string, string][]> = {
  mdma: [['#F5D29D', '#C8786E'], ['#DDF3CB', '#5BAE92'], ['#E3B7CC', '#8C5A8D'], ['#F1C692', '#B76F65']],
};

const imageSources: Record<string, { source: ImageSourcePropType; label: string }> = {
  ketamin: {
    source: require('../../assets/substances/ketamin-powder.png'),
    label: 'Neutrale Darstellung eines kleinen Häufchens weißen Pulvers',
  },
  cannabis: {
    source: require('../../assets/substances/cannabis-flower.png'),
    label: 'Neutrale Darstellung einer Cannabisblüte',
  },
  alkohol: {
    source: require('../../assets/substances/alcohol-bottle.png'),
    label: 'Neutrale Darstellung einer unbeschrifteten Bierflasche',
  },
};

export function SubstanceToken({ slug, size = 64 }: SubstanceTokenProps) {
  const visual = imageSources[slug];

  if (visual) {
    return (
      <View accessible accessibilityLabel={visual.label} style={[tokenStyles.imageFrame, { width: size, height: size, borderRadius: size * 0.28 }]}>
        <View style={[tokenStyles.imageHalo, { width: size * 0.76, height: size * 0.76, borderRadius: size }]} />
        <Image source={visual.source} resizeMode="cover" style={{ width: size, height: size, borderRadius: size * 0.28 }} />
      </View>
    );
  }

  const colors = palettes[slug] ?? palettes.mdma;
  const disc = size * 0.36;
  const positions = [
    { left: size * 0.1, top: size * 0.12, rotate: '-12deg' },
    { left: size * 0.46, top: size * 0.08, rotate: '10deg' },
    { left: size * 0.25, top: size * 0.42, rotate: '7deg' },
    { left: size * 0.58, top: size * 0.43, rotate: '-8deg' },
  ];

  return (
    <View accessible accessibilityLabel="Stilisierte Platzhalterdarstellung, keine Produktidentifikation" style={{ width: size, height: size }}>
      <View style={[tokenStyles.halo, { width: size * 0.8, height: size * 0.48, borderRadius: size, left: size * 0.1, top: size * 0.34 }]} />
      {positions.map((position, index) => (
        <View
          key={`${slug}-${index}`}
          style={[
            tokenStyles.disc,
            {
              width: disc,
              height: disc,
              borderRadius: disc,
              left: position.left,
              top: position.top,
              transform: [{ rotate: position.rotate }],
            },
          ]}
        >
          <LinearGradient colors={colors[index]} start={{ x: 0.2, y: 0.05 }} end={{ x: 0.9, y: 0.95 }} style={StyleSheet.absoluteFill} />
          <View style={tokenStyles.imprint} />
        </View>
      ))}
    </View>
  );
}

const tokenStyles = StyleSheet.create({
  imageFrame: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#081824',
    borderWidth: 1,
    borderColor: 'rgba(112,229,255,0.10)',
    shadowColor: '#21D4FF',
    shadowOpacity: 0.18,
    shadowRadius: 12,
  },
  imageHalo: {
    position: 'absolute',
    alignSelf: 'center',
    top: '12%',
    backgroundColor: 'rgba(33,212,255,0.08)',
  },
  halo: {
    position: 'absolute',
    backgroundColor: 'rgba(33,212,255,0.08)',
    shadowColor: '#21D4FF',
    shadowOpacity: 0.24,
    shadowRadius: 16,
  },
  disc: {
    position: 'absolute',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.42)',
    shadowColor: '#02070D',
    shadowOpacity: 0.42,
    shadowRadius: 7,
  },
  imprint: {
    position: 'absolute',
    width: '66%',
    height: 1,
    left: '17%',
    top: '49%',
    backgroundColor: 'rgba(30,48,55,0.28)',
  },
});
