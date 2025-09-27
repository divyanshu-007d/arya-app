/**
 * ARYA Design System - Enhanced Text Component
 * Consistent typography with theme integration
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text as PaperText, useTheme } from 'react-native-paper';
import AryaTypography from '../core/AryaTypography';

const AryaText = ({
  children,
  variant = 'bodyMedium', // Typography variant from AryaTypography
  color,
  align = 'left',
  weight,
  size,
  style,
  numberOfLines,
  ellipsizeMode = 'tail',
  selectable = false,
  ...props
}) => {
  const theme = useTheme();

  const getTextStyle = () => {
    // Get base typography style
    const baseStyle = AryaTypography[variant] || AryaTypography.bodyMedium;
    
    // Override with custom props
    const customStyle = {
      ...baseStyle,
      textAlign: align,
      color: color || theme.colors.onSurface,
    };

    // Apply custom weight if provided
    if (weight) {
      customStyle.fontWeight = AryaTypography.weights[weight] || weight;
    }

    // Apply custom size if provided
    if (size) {
      customStyle.fontSize = size;
    }

    return customStyle;
  };

  const textStyles = [
    styles.text,
    getTextStyle(),
    style,
  ];

  return (
    <PaperText
      style={textStyles}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      selectable={selectable}
      {...props}
    >
      {children}
    </PaperText>
  );
};

// Predefined text variants for convenience
AryaText.Display = ({ children, ...props }) => (
  <AryaText variant="displayMedium" {...props}>{children}</AryaText>
);

AryaText.Headline = ({ children, ...props }) => (
  <AryaText variant="headlineMedium" {...props}>{children}</AryaText>
);

AryaText.Title = ({ children, ...props }) => (
  <AryaText variant="titleMedium" {...props}>{children}</AryaText>
);

AryaText.Body = ({ children, ...props }) => (
  <AryaText variant="bodyMedium" {...props}>{children}</AryaText>
);

AryaText.Label = ({ children, ...props }) => (
  <AryaText variant="labelMedium" {...props}>{children}</AryaText>
);

AryaText.Caption = ({ children, ...props }) => (
  <AryaText variant="caption" {...props}>{children}</AryaText>
);

AryaText.Hero = ({ children, ...props }) => (
  <AryaText variant="hero" {...props}>{children}</AryaText>
);

const styles = StyleSheet.create({
  text: {
    // Base text styles
    includeFontPadding: false, // Android-specific, removes extra padding
    textAlignVertical: 'center', // Better alignment
  },
});

export default AryaText;