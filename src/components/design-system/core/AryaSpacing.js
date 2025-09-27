/**
 * ARYA Design System - Spacing Scale
 * Consistent spacing system based on 8pt grid (iOS standard)
 */

const AryaSpacing = {
  // Base unit: 4pt (following iOS 4pt grid system)
  xs: 4,      // Extra small
  sm: 8,      // Small
  md: 16,     // Medium (base)
  lg: 24,     // Large
  xl: 32,     // Extra large
  xxl: 40,    // 2X large
  xxxl: 48,   // 3X large

  // Semantic spacing
  none: 0,
  minimal: 2,
  tiny: 4,
  small: 8,
  base: 16,
  medium: 24,
  large: 32,
  huge: 48,
  massive: 64,

  // Component-specific spacing
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingSmall: 8,
    paddingLarge: 20,
  },
  
  card: {
    padding: 16,
    paddingLarge: 24,
    margin: 16,
    gap: 12,
  },
  
  screen: {
    padding: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    safeAreaPadding: 16,
  },
  
  list: {
    itemGap: 8,
    sectionGap: 24,
    padding: 16,
  },
  
  form: {
    fieldGap: 16,
    sectionGap: 32,
    labelGap: 8,
  },
  
  navigation: {
    tabHeight: 60,
    headerHeight: 56,
    padding: 16,
  },

  // Layout spacing
  layout: {
    containerPadding: 20,
    sectionGap: 32,
    itemGap: 16,
    gridGap: 12,
  },

  // Interactive spacing
  touch: {
    minHeight: 44, // iOS minimum touch target
    minWidth: 44,
    padding: 12,
  },
};

export default AryaSpacing;