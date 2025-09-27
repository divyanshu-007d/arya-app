/**
 * ARYA App - Main Application Component
 * Enhanced with ARYA Design System
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { aryaTheme } from './src/utils/theme';

export default function App() {
  return (
    <PaperProvider theme={aryaTheme}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
