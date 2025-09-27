/**
 * ARYA Design System - Typography Scale
 * iOS-inspired typography with perfect hierarchy and readability
 */

const AryaTypography = {
  // Display Typography - For hero sections and major headlines
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: '400',
    letterSpacing: -0.25,
    fontFamily: 'System', // iOS system font
  },
  displayMedium: {
    fontSize: 45,
    lineHeight: 52,
    fontWeight: '400',
    letterSpacing: 0,
    fontFamily: 'System',
  },
  displaySmall: {
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '400',
    letterSpacing: 0,
    fontFamily: 'System',
  },

  // Headline Typography - For section headers and important text
  headlineLarge: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '600',
    letterSpacing: 0,
    fontFamily: 'System',
  },
  headlineMedium: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '600',
    letterSpacing: 0,
    fontFamily: 'System',
  },
  headlineSmall: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '600',
    letterSpacing: 0,
    fontFamily: 'System',
  },

  // Title Typography - For card titles and subsection headers
  titleLarge: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '500',
    letterSpacing: 0,
    fontFamily: 'System',
  },
  titleMedium: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.15,
    fontFamily: 'System',
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
    fontFamily: 'System',
  },

  // Label Typography - For buttons and form labels
  labelLarge: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    letterSpacing: 0.1,
    fontFamily: 'System',
  },
  labelMedium: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },
  labelSmall: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
    fontFamily: 'System',
  },

  // Body Typography - For main content and descriptions
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    letterSpacing: 0.15,
    fontFamily: 'System',
  },
  bodyMedium: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400',
    letterSpacing: 0.25,
    fontFamily: 'System',
  },
  bodySmall: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
    fontFamily: 'System',
  },

  // Custom Typography Variants
  hero: {
    fontSize: 40,
    lineHeight: 48,
    fontWeight: '700',
    letterSpacing: -0.5,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '400',
    letterSpacing: 0.15,
    fontFamily: 'System',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.4,
    fontFamily: 'System',
  },
  overline: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
    fontFamily: 'System',
    textTransform: 'uppercase',
  },

  // Weight variants
  weights: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    heavy: '800',
  },

  // Font families (iOS system fonts)
  families: {
    system: 'System', // SF Pro on iOS
    systemBold: 'System', // Bold variant
    systemLight: 'System', // Light variant
    mono: 'Menlo', // Monospace for code
  },
};

export default AryaTypography;