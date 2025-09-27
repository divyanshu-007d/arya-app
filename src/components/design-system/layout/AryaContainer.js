/**
 * ARYA Design System - Container Component
 * Provides consistent layout with proper spacing and responsiveness
 */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import AryaSpacing from '../core/AryaSpacing';

const AryaContainer = ({
  children,
  padding = 'medium',
  margin,
  horizontal = false,
  vertical = false,
  flex = false,
  center = false,
  justify = 'flex-start',
  align = 'stretch',
  style,
  ...props
}) => {
  const theme = useTheme();

  const getPaddingValue = (paddingProp) => {
    if (typeof paddingProp === 'number') return paddingProp;
    
    const paddingMap = {
      none: 0,
      small: AryaSpacing.sm,
      medium: AryaSpacing.md,
      large: AryaSpacing.lg,
      xlarge: AryaSpacing.xl,
    };
    
    return paddingMap[paddingProp] || AryaSpacing.md;
  };

  const containerStyles = [
    styles.container,
    flex && styles.flex,
    center && styles.center,
    {
      justifyContent: center ? 'center' : justify,
      alignItems: center ? 'center' : align,
      flexDirection: horizontal ? 'row' : vertical ? 'column' : 'column',
      padding: getPaddingValue(padding),
      margin: margin || 0,
    },
    style,
  ];

  return (
    <View style={containerStyles} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Base container styles
  },
  flex: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AryaContainer;