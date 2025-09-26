/**
 * Main App Component for NDA StudyBuddy
 * Entry point with navigation and providers
 */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { ndaTheme } from './src/utils/theme';

export default function App() {
  return (
    <PaperProvider theme={ndaTheme}>
      <AuthProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}
