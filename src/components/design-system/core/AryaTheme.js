/**
 * ARYA Design System - Core Theme Configuration
 * iOS-inspired design tokens with perfect consistency
 */
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import AryaColors from './AryaColors';
import AryaTypography from './AryaTypography';
import AryaSpacing from './AryaSpacing';

const baseTheme = {
  roundness: 16, // iOS-like rounded corners
  animation: {
    scale: 1.0,
    defaultAnimationDuration: 200,
  },
  spacing: AryaSpacing,
  typography: AryaTypography,
};

export const AryaLightTheme = {
  ...MD3LightTheme,
  ...baseTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...AryaColors.light,
  },
  // Custom properties for consistent design
  elevation: {
    level0: 0,
    level1: 1,
    level2: 3,
    level3: 6,
    level4: 8,
    level5: 12,
  },
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  blur: {
    light: 'rgba(255, 255, 255, 0.8)',
    medium: 'rgba(255, 255, 255, 0.6)',
    strong: 'rgba(255, 255, 255, 0.4)',
  },
};

export const AryaDarkTheme = {
  ...MD3DarkTheme,
  ...baseTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...AryaColors.dark,
  },
  elevation: AryaLightTheme.elevation,
  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.15,
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 8,
      elevation: 6,
    },
  },
  blur: {
    light: 'rgba(0, 0, 0, 0.8)',
    medium: 'rgba(0, 0, 0, 0.6)',
    strong: 'rgba(0, 0, 0, 0.4)',
  },
};

export default AryaLightTheme;