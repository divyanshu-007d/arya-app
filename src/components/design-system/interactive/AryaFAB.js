/**
 * ARYA Design System - Enhanced FAB Component
 * Beautiful floating action button with consistent styling
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB as PaperFAB, useTheme } from 'react-native-paper';

const AryaFAB = ({
  icon,
  label,
  variant = 'primary', // 'primary', 'secondary', 'surface'
  size = 'medium', // 'small', 'medium', 'large'
  style,
  onPress,
  ...props
}) => {
  const theme = useTheme();

  const getVariantStyle = (variantType) => {
    switch (variantType) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
        };
      case 'surface':
        return {
          backgroundColor: theme.colors.surface,
        };
      case 'primary':
      default:
        return {
          backgroundColor: theme.colors.primary,
        };
    }
  };

  const getSizeProps = (sizeVariant) => {
    switch (sizeVariant) {
      case 'small':
        return { size: 'small' };
      case 'large':
        return { size: 'large' };
      case 'medium':
      default:
        return { size: 'medium' };
    }
  };

  const fabStyles = [
    styles.fab,
    getVariantStyle(variant),
    style,
  ];

  return (
    <PaperFAB
      icon={icon}
      label={label}
      onPress={onPress}
      style={fabStyles}
      {...getSizeProps(size)}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    // Default FAB styles
  },
});

export default AryaFAB;