/**
 * ARYA Design System - Safe Area Component
 * Handles safe area insets with consistent padding
 */
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const AryaSafeArea = ({ 
  children, 
  edges = ['top', 'bottom', 'left', 'right'],
  style,
  ...props 
}) => {
  return (
    <SafeAreaProvider>
      <SafeAreaView 
        style={[styles.safeArea, style]} 
        edges={edges}
        {...props}
      >
        {children}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default AryaSafeArea;