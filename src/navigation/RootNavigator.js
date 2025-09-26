/**
 * Root Navigator - Main App Navigation Controller
 * Handles authentication flow and direct access to Cadet mode
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';

// Main App Screens - Direct to Cadet Mode
import HomeScreen from '../screens/main/HomeScreen';
import CadetModeScreen from '../screens/main/CadetModeScreen';
import MentorModeScreen from '../screens/main/MentorModeScreen';
import SquadronModeScreen from '../screens/main/SquadronModeScreen';

// Other modes (accessible via FAB)
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const Stack = createStackNavigator();

const RootNavigator = () => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardStyleInterpolator: ({ current }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        // Main App Stack - Start with Home Screen for mode selection
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CadetMode" component={CadetModeScreen} />
          <Stack.Screen name="MentorMode" component={MentorModeScreen} />
          <Stack.Screen name="SquadronMode" component={SquadronModeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
  },
  placeholderContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  placeholderIcon: {
    fontSize: 80,
    marginBottom: 24,
  },
  placeholderTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  placeholderText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 24,
  },
});

export default RootNavigator;