/**
 * Cadet Stack Navigator - Handles Cadet Mode with Stack Navigation
 * Includes tab navigation and WebView screens
 */
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Components
import CadetTabNavigator from './CadetTabNavigator';
import DroneWebViewScreen from '../screens/common/DroneWebViewScreen';
import NDAInterviewScreen from '../screens/common/NDAInterviewScreen';
import InterviewResultsScreen from '../screens/common/InterviewResultsScreen';

const CadetStack = createNativeStackNavigator();

const CadetStackNavigator = () => {
  return (
    <CadetStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <CadetStack.Screen 
        name="CadetTabs" 
        component={CadetTabNavigator}
      />
      <CadetStack.Screen 
        name="DroneWebView" 
        component={DroneWebViewScreen}
      />
      <CadetStack.Screen 
        name="NDAInterview" 
        component={NDAInterviewScreen}
      />
      <CadetStack.Screen 
        name="InterviewResults" 
        component={InterviewResultsScreen}
      />
    </CadetStack.Navigator>
  );
};

export default CadetStackNavigator;