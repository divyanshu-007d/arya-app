/**
 * NDA StudyBuddy Theme Configuration
 * Defense-inspired design system using React Native Paper
 */
import { MD3LightTheme } from 'react-native-paper';

export const ndaTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A237E',        // Navy Blue - Defense authority
    secondary: '#FFD700',      // Gold - Military honors
    tertiary: '#2E7D32',       // Dark Green - Achievement
    error: '#C62828',          // Deep Red - Critical alerts
    surface: '#FFFFFF',        // Clean White - Content areas
    background: '#F5F5F5',     // Light Gray - App background
    surfaceVariant: '#E8EAF6', // Light blue variant
    onSurface: '#1A1A1A',      // Dark text on light surfaces
    onPrimary: '#FFFFFF',      // White text on primary
    outline: '#757575',        // Gray borders
  },
  fonts: {
    displayLarge: { 
      fontSize: 32, 
      fontWeight: '700',
      letterSpacing: 0.25
    },
    headlineMedium: { 
      fontSize: 24, 
      fontWeight: '600',
      letterSpacing: 0
    },
    titleLarge: { 
      fontSize: 20, 
      fontWeight: '500',
      letterSpacing: 0.15
    },
    titleMedium: { 
      fontSize: 18, 
      fontWeight: '500',
      letterSpacing: 0.15
    },
    bodyLarge: { 
      fontSize: 16, 
      fontWeight: '400',
      letterSpacing: 0.5
    },
    bodyMedium: { 
      fontSize: 14, 
      fontWeight: '400',
      letterSpacing: 0.25
    },
    labelLarge: { 
      fontSize: 14, 
      fontWeight: '500',
      letterSpacing: 0.1
    },
  },
  roundness: 12, // More rounded corners for modern feel
};

export const ndaColors = {
  primary: '#1A237E',
  secondary: '#FFD700',
  success: '#2E7D32',
  warning: '#F57C00',
  error: '#C62828',
  surface: '#FFFFFF',
  background: '#F5F5F5',
  text: '#1A1A1A',
  textSecondary: '#666666',
  border: '#E0E0E0',
};

export default ndaTheme;