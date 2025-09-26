/**
 * Cadet Tab Navigator - Bottom Tab Navigation
 * Modern bottom navigation for Cadet Mode (Solo Training)
 */
import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

// Import Cadet Mode Screens
import DashboardScreen from '../screens/cadet/DashboardScreen';
import InterviewScreen from '../screens/cadet/InterviewScreen';
import AIBuddyScreen from '../screens/cadet/AIBuddyScreen';
import FitnessScreen from '../screens/cadet/FitnessScreen';
import ProfileScreen from '../screens/cadet/ProfileScreen';

// Import FAB Component
import ModeSwitcherFAB from '../components/common/ModeSwitcherFAB';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomTabIcon = ({ iconText, focused }) => (
  <View style={styles.tabIconContainer}>
    {focused && (
      <View style={styles.activeTabBackground}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.activeTabGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </View>
    )}
    <Text style={[
      styles.tabIcon,
      { 
        fontSize: focused ? 28 : 24,
        opacity: focused ? 1 : 0.7
      }
    ]}>
      {iconText}
    </Text>
  </View>
);

const CadetTabNavigator = () => {
  const [activeTab, setActiveTab] = React.useState('Dashboard');

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <View style={styles.tabBarBackground}>
              <Surface style={styles.tabBarSurface} elevation={8}>
                <View style={styles.tabBarContent} />
              </Surface>
            </View>
          ),
        }}
        screenListeners={{
          tabPress: (e) => {
            // Update active tab when tab is pressed
            const routeName = e.target?.split('-')[0];
            setActiveTab(routeName);
          },
        }}
      >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        listeners={{
          focus: () => setActiveTab('Dashboard'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconText="🏠"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Interview"
        component={InterviewScreen}
        listeners={{
          focus: () => setActiveTab('Interview'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconText="🎤"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="AIBuddy"
        component={AIBuddyScreen}
        listeners={{
          focus: () => setActiveTab('AIBuddy'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconText="🤖"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Fitness"
        component={FitnessScreen}
        listeners={{
          focus: () => setActiveTab('Fitness'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconText="💪"
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={{
          focus: () => setActiveTab('Profile'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconText="👤"
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
    
    {/* FAB - Only show on Dashboard tab */}
    {activeTab === 'Dashboard' && <ModeSwitcherFAB />}
  </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    height: 80, // Reduced height since no text labels
    paddingBottom: 20,
    paddingTop: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarBackground: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  tabBarSurface: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    flex: 1,
    overflow: 'hidden',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  tabBarContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 60,
    height: 50,
  },
  activeTabBackground: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    borderRadius: 18,
    overflow: 'hidden',
  },
  activeTabGradient: {
    flex: 1,
    opacity: 0.15,
  },
  tabIcon: {
    textAlign: 'center',
  },
});

export default CadetTabNavigator;