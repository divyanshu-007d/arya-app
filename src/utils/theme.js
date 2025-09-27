/**
 * ARYA App Theme Configuration
 * Enhanced theme using the ARYA Design System
 */
import { AryaLightTheme, AryaDarkTheme } from '../components/design-system/core/AryaTheme';
import AryaColors from '../components/design-system/core/AryaColors';
import AryaTypography from '../components/design-system/core/AryaTypography';
import AryaSpacing from '../components/design-system/core/AryaSpacing';
import AryaAnimations from '../components/design-system/core/AryaAnimations';

// Main theme with ARYA Design System integration
export const aryaTheme = {
  ...AryaLightTheme,
  colors: {
    ...AryaLightTheme.colors,
    // Add gradient colors for easy access
    gradients: AryaColors.light.gradients,
  },
  fonts: AryaTypography,
  spacing: AryaSpacing,
  animations: AryaAnimations,
  roundness: 16, // iOS-like rounded corners
};

export const aryaDarkTheme = {
  ...AryaDarkTheme,
  colors: {
    ...AryaDarkTheme.colors,
    gradients: AryaColors.dark.gradients,
  },
  fonts: AryaTypography,
  spacing: AryaSpacing,
  animations: AryaAnimations,
  roundness: 16,
};

// Legacy support for existing code
export const ndaTheme = aryaTheme;
export const ndaColors = {
  primary: AryaColors.light.primary,
  secondary: AryaColors.light.secondary,
  success: AryaColors.light.success,
  warning: AryaColors.light.warning,
  error: AryaColors.light.error,
  surface: AryaColors.light.surface,
  background: AryaColors.light.background,
  text: AryaColors.light.textPrimary,
  textSecondary: AryaColors.light.textSecondary,
  border: AryaColors.light.outline,
};

export default aryaTheme;