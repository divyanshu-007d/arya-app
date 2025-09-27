/**
 * ARYA Cadet Tab Navigator - Modern Material Design Bottom Navigation
 * Beautiful bottom navigation for Cadet Mode with Expo Icons and smooth animations
 */
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Surface, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Import Cadet Mode Screens
import DashboardScreen from '../screens/cadet/DashboardScreen';
import InterviewScreen from '../screens/cadet/InterviewScreen';
import AIBuddyScreen from '../screens/cadet/AIBuddyScreen';
import FitnessScreen from '../screens/cadet/FitnessScreen';
import ProfileScreen from '../screens/cadet/ProfileScreen';

// Import ARYA Design System Components
import { AryaText } from '../components/design-system';
import ModeSwitcherFAB from '../components/common/ModeSwitcherFAB';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

const CustomTabIcon = ({ iconName, focused, label }) => {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.85)).current;
  const fadeAnim = useRef(new Animated.Value(focused ? 1 : 0.6)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    // Scale and fade animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.85,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: focused ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Bounce animation when tab becomes active
    if (focused) {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(bounceAnim, {
          toValue: 0,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [focused, scaleAnim, fadeAnim, bounceAnim]);
  
  return (
    <Animated.View 
      style={[
        styles.tabIconContainer,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { 
              translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -3],
              })
            }
          ]
        }
      ]}
    >
      <Animated.View style={[
        styles.tabIconWrapper,
        focused && styles.activeTabWrapper,
        {
          transform: [{
            scale: bounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 1.1],
            })
          }]
        }
      ]}>
        <Ionicons 
          name={iconName}
          size={22}
          color={focused ? '#FFFFFF' : 'rgba(27, 41, 81, 0.6)'}
        />
      </Animated.View>
      <AryaText style={[
        styles.tabLabel,
        { 
          color: focused ? theme.colors.primary : 'rgba(27, 41, 81, 0.6)',
          fontWeight: focused ? '600' : '500'
        }
      ]}>
        {label}
      </AryaText>
    </Animated.View>
  );
};

const CadetTabNavigator = () => {
  const [activeTab, setActiveTab] = React.useState('Dashboard');
  const tabBarSlideAnim = useRef(new Animated.Value(0)).current;
  
  const handleTabPress = (tabName) => {
    setActiveTab(tabName);
    
    // Subtle slide animation for the entire tab bar
    Animated.sequence([
      Animated.timing(tabBarSlideAnim, {
        toValue: 0.98,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(tabBarSlideAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarShowLabel: false,
          tabBarBackground: () => (
            <Animated.View 
              style={[
                styles.tabBarBackground,
                {
                  transform: [{ scale: tabBarSlideAnim }]
                }
              ]}
            >
              <Surface style={styles.tabBarSurface} elevation={0}>
                <View style={styles.tabBarContent} />
              </Surface>
            </Animated.View>
          ),
        }}
        screenListeners={{
          tabPress: (e) => {
            const routeName = e.target?.split('-')[0];
            handleTabPress(routeName);
          },
        }}
      >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        listeners={{
          focus: () => handleTabPress('Dashboard'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconName={focused ? "home" : "home-outline"}
              focused={focused}
              label="Home"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Interview"
        component={InterviewScreen}
        listeners={{
          focus: () => handleTabPress('Interview'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconName={focused ? "mic" : "mic-outline"}
              focused={focused}
              label="INTV"
            />
          ),
        }}
      />

      <Tab.Screen
        name="AIBuddy"
        component={AIBuddyScreen}
        listeners={{
          focus: () => handleTabPress('AIBuddy'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconName={focused ? "chatbubble-ellipses" : "chatbubble-ellipses-outline"}
              focused={focused}
              label="Buddy"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Fitness"
        component={FitnessScreen}
        listeners={{
          focus: () => handleTabPress('Fitness'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconName={focused ? "fitness" : "fitness-outline"}
              focused={focused}
              label="Fitness"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        listeners={{
          focus: () => handleTabPress('Profile'),
        }}
        options={{
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon
              iconName={focused ? "person" : "person-outline"}
              focused={focused}
              label="Profile"
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
    height: 120, // Increased height from 100 to 120
    paddingBottom: 0,
    paddingTop: 8,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBarBackground: {
    flex: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 2,
  },
  tabBarSurface: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  tabBarContent: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingBottom: 40, // Increased padding from 34 to 40 for better spacing
    paddingTop: 18, // Increased top padding from 8 to 12
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12, // Increased from 8 to 12 for more breathing room
    paddingHorizontal: 12,
    minWidth: 64,
    height: 68, // Increased from 58 to 68 for better proportions
  },
  tabIconWrapper: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  activeTabWrapper: {
    backgroundColor: '#4169E1', // Royal Blue color
    shadowColor: '#4169E1', // Match shadow to royal blue
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabLabel: {
    fontSize: 11,
    textAlign: 'center',
    includeFontPadding: false,
  },
});

export default CadetTabNavigator;