/**
 * ARYA Root Navigator - Enhanced with Design System
 * Main App Navigation Controller with beautiful transitions
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';

// Main App Screens
import HomeScreen from '../screens/main/HomeScreen';
import CadetModeScreen from '../screens/main/CadetModeScreen';
import MentorModeScreen from '../screens/main/MentorModeScreen';
import SquadronModeScreen from '../screens/main/SquadronModeScreen';

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
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            opacity: current.progress,
            transform: [
              {
                scale: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.95, 1],
                }),
              },
            ],
          },
        }),
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
    >
      {!isAuthenticated ? (
        // Auth Stack
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        // Main App Stack
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

export default RootNavigator;