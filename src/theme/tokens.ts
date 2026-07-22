export const colors = {
  midnight950: '#050D17',
  midnight900: '#0B1320',
  midnight850: '#0D1826',
  midnight800: '#111C2B',
  midnight700: '#1A2A3D',
  line: '#23364A',
  cyan400: '#21D4FF',
  cyan300: '#70E5FF',
  amber400: '#FFB84D',
  amber300: '#FFD18A',
  emergency: '#FF665A',
  gray: '#8A95A6',
  grayLight: '#B8C1CD',
  white: '#F5F7FA',
  success: '#5DD6A2',
  black: '#02070D',
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
} as const;

export const radii = {
  small: 10,
  button: 14,
  card: 16,
  panel: 22,
  round: 999,
} as const;

export const shadows = {
  card: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.24,
    shadowRadius: 28,
    elevation: 8,
  },
};
