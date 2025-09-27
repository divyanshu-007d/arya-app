/**
 * ARYA Design System - Gradient Utility Component
 * Consistent gradients with predefined color schemes
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from 'react-native-paper';

const AryaGradient = ({
  children,
  variant = 'primary', // Predefined gradient variants
  colors, // Custom colors array
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
  style,
  ...props
}) => {
  const theme = useTheme();

  const getGradientColors = () => {
    if (colors) return colors;

    // Get gradient colors from theme
    const gradients = theme.colors.gradients || {};
    return gradients[variant] || gradients.primary || ['#1B2951', '#2C3E50'];
  };

  return (
    <LinearGradient
      colors={getGradientColors()}
      start={start}
      end={end}
      style={[styles.gradient, style]}
      {...props}
    >
      {children}
    </LinearGradient>
  );
};

// Predefined gradient variants
AryaGradient.Primary = (props) => <AryaGradient variant="primary" {...props} />;
AryaGradient.Secondary = (props) => <AryaGradient variant="secondary" {...props} />;
AryaGradient.Accent = (props) => <AryaGradient variant="accent" {...props} />;
AryaGradient.Success = (props) => <AryaGradient variant="success" {...props} />;
AryaGradient.Warm = (props) => <AryaGradient variant="warm" {...props} />;
AryaGradient.Cool = (props) => <AryaGradient variant="cool" {...props} />;
AryaGradient.Ocean = (props) => <AryaGradient variant="ocean" {...props} />;
AryaGradient.Sunset = (props) => <AryaGradient variant="sunset" {...props} />;

const styles = StyleSheet.create({
  gradient: {
    // Default gradient styles
  },
});

export default AryaGradient;