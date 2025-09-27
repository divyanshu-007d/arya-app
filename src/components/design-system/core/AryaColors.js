/**
 * ARYA Design System - Color Palette
 * Carefully curated colors for military/defense aesthetic with iOS smoothness
 */

const AryaColors = {
  light: {
    // Primary Colors - Military Navy & Gold
    primary: '#1B2951',        // Deep Navy - Authority & Trust
    primaryContainer: '#E3F2FD', // Light Blue Container
    onPrimary: '#FFFFFF',      // White text on primary
    onPrimaryContainer: '#1B2951',
    
    // Secondary Colors - Gold Accents
    secondary: '#D4AF37',      // Military Gold
    secondaryContainer: '#FFF8E1',
    onSecondary: '#FFFFFF',
    onSecondaryContainer: '#8D6E00',
    
    // Tertiary Colors - Success Green
    tertiary: '#2E7D32',       // Forest Green
    tertiaryContainer: '#E8F5E8',
    onTertiary: '#FFFFFF',
    onTertiaryContainer: '#1B5E20',
    
    // Error & Warning
    error: '#D32F2F',
    errorContainer: '#FFEBEE',
    onError: '#FFFFFF',
    onErrorContainer: '#B71C1C',
    
    warning: '#F57C00',
    warningContainer: '#FFF3E0',
    onWarning: '#FFFFFF',
    onWarningContainer: '#E65100',
    
    // Success
    success: '#388E3C',
    successContainer: '#E8F5E8',
    onSuccess: '#FFFFFF',
    onSuccessContainer: '#1B5E20',
    
    // Surface Colors - Clean & Modern
    surface: '#FFFFFF',
    surfaceVariant: '#F8F9FA',
    surfaceTint: '#1B2951',
    onSurface: '#1A1A1A',
    onSurfaceVariant: '#666666',
    
    // Background
    background: '#FAFAFA',
    onBackground: '#1A1A1A',
    
    // Outline & Border
    outline: '#E0E0E0',
    outlineVariant: '#F5F5F5',
    
    // Inverse Colors
    inverseSurface: '#1A1A1A',
    onInverseSurface: '#FFFFFF',
    inversePrimary: '#90CAF9',
    
    // Custom Semantic Colors
    brand: '#1B2951',
    brandSecondary: '#D4AF37',
    
    // Text Colors
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',
    
    // Interactive States
    hover: 'rgba(27, 41, 81, 0.04)',
    pressed: 'rgba(27, 41, 81, 0.08)',
    focus: 'rgba(27, 41, 81, 0.12)',
    disabled: 'rgba(27, 41, 81, 0.38)',
    disabledBackground: 'rgba(27, 41, 81, 0.12)',
    
    // Gradients
    gradients: {
      primary: ['#1B2951', '#2C3E50'],
      secondary: ['#D4AF37', '#F1C40F'],
      accent: ['#667EEA', '#764BA2'],
      success: ['#2E7D32', '#4CAF50'],
      warm: ['#FF9A56', '#FF6B6B'],
      cool: ['#4FACFE', '#00F2FE'],
      sunset: ['#FF7E5F', '#FEB47B'],
      ocean: ['#2980B9', '#6BB6FF'],
    },
  },
  
  dark: {
    // Primary Colors
    primary: '#90CAF9',
    primaryContainer: '#1B2951',
    onPrimary: '#002C5F',
    onPrimaryContainer: '#D6E3FF',
    
    // Secondary Colors
    secondary: '#FFD54F',
    secondaryContainer: '#8D6E00',
    onSecondary: '#3C2F00',
    onSecondaryContainer: '#FFF8E1',
    
    // Tertiary Colors
    tertiary: '#81C784',
    tertiaryContainer: '#1B5E20',
    onTertiary: '#003D00',
    onTertiaryContainer: '#A5D6A7',
    
    // Error & States
    error: '#FF5252',
    errorContainer: '#930006',
    onError: '#600003',
    onErrorContainer: '#FFEBEE',
    
    warning: '#FFB74D',
    warningContainer: '#E65100',
    onWarning: '#3E2723',
    onWarningContainer: '#FFF3E0',
    
    success: '#66BB6A',
    successContainer: '#1B5E20',
    onSuccess: '#003D00',
    onSuccessContainer: '#E8F5E8',
    
    // Surfaces
    surface: '#121212',
    surfaceVariant: '#1E1E1E',
    surfaceTint: '#90CAF9',
    onSurface: '#FFFFFF',
    onSurfaceVariant: '#CCCCCC',
    
    background: '#000000',
    onBackground: '#FFFFFF',
    
    outline: '#333333',
    outlineVariant: '#1E1E1E',
    
    // Inverse
    inverseSurface: '#FFFFFF',
    onInverseSurface: '#1A1A1A',
    inversePrimary: '#1B2951',
    
    // Custom Semantic Colors
    brand: '#90CAF9',
    brandSecondary: '#FFD54F',
    
    // Text Colors
    textPrimary: '#FFFFFF',
    textSecondary: '#CCCCCC',
    textTertiary: '#999999',
    textInverse: '#1A1A1A',
    
    // Interactive States
    hover: 'rgba(144, 202, 249, 0.04)',
    pressed: 'rgba(144, 202, 249, 0.08)',
    focus: 'rgba(144, 202, 249, 0.12)',
    disabled: 'rgba(255, 255, 255, 0.38)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    
    // Gradients (adjusted for dark theme)
    gradients: {
      primary: ['#2C3E50', '#1B2951'],
      secondary: ['#F1C40F', '#D4AF37'],
      accent: ['#764BA2', '#667EEA'],
      success: ['#4CAF50', '#2E7D32'],
      warm: ['#FF6B6B', '#FF9A56'],
      cool: ['#00F2FE', '#4FACFE'],
      sunset: ['#FEB47B', '#FF7E5F'],
      ocean: ['#6BB6FF', '#2980B9'],
    },
  },
};

export default AryaColors;