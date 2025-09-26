/**
 * Mode Switcher FAB - Beautiful floating action button for switching between modes
 * Available on all screens for quick mode switching with proper safe area handling
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  FAB,
  Portal,
  Text,
  Surface,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const ModeSwitcherFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  // Calculate safe positioning
  const bottomOffset = Math.max(insets.bottom, 20) + 120; // Above tab bar with more clearance
  const rightOffset = Math.max(insets.right, 20); // Safe from screen edge

  const modes = [
    {
      id: 'CadetMode',
      name: 'Cadet Mode',
      icon: '🎖️',
      color: ['#667eea', '#764ba2'],
      description: 'Solo Training'
    },
    {
      id: 'MentorMode', 
      name: 'Mentor Mode',
      icon: '🧠',
      color: ['#f093fb', '#f5576c'],
      description: 'Personal Coaching'
    },
    {
      id: 'SquadronMode',
      name: 'Squadron Mode', 
      icon: '🤝',
      color: ['#4facfe', '#00f2fe'],
      description: 'Social Learning'
    }
  ];

  const currentMode = modes.find(mode => route.name === mode.id) || modes[0];
  
  console.log('ModeSwitcherFAB: Rendering component...');
  console.log('ModeSwitcherFAB: Current route name:', route.name);
  console.log('ModeSwitcherFAB: Current mode detected:', currentMode.name);
  console.log('ModeSwitcherFAB: isOpen state:', isOpen);

  const toggleFAB = () => {
    console.log('ModeSwitcherFAB: toggleFAB called, current isOpen:', isOpen);
    
    if (!isOpen) {
      console.log('ModeSwitcherFAB: Opening FAB menu...');
      setIsOpen(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      console.log('ModeSwitcherFAB: Closing FAB menu...');
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsOpen(false);
      });
    }
  };

  const handleModeSwitch = (mode) => {
    console.log('ModeSwitcherFAB: Attempting to switch to mode:', mode.id);
    console.log('ModeSwitcherFAB: Current route name:', route.name);
    
    if (mode.id !== route.name) {
      console.log('ModeSwitcherFAB: Navigating to:', mode.id);
      navigation.navigate(mode.id);
    } else {
      console.log('ModeSwitcherFAB: Already on current mode, skipping navigation');
    }
    
    // Close FAB after navigation
    toggleFAB();
  };

  const ModeOption = ({ mode, index }) => {
    const translateY = scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(60 * (index + 1) + 20)],
    });

    const isCurrentMode = mode.id === route.name;

    return (
      <Animated.View
        style={[
          styles.modeOption,
          {
            opacity: fadeAnim,
            transform: [
              { translateY },
              { scale: scaleAnim }
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleModeSwitch(mode)}
          style={styles.modeButton}
          disabled={isCurrentMode}
        >
          <Surface 
            style={[
              styles.modeButtonSurface,
              isCurrentMode && styles.currentModeSurface
            ]} 
            elevation={isCurrentMode ? 8 : 4}
          >
            <LinearGradient
              colors={mode.color}
              style={styles.modeButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.modeIcon}>{mode.icon}</Text>
            </LinearGradient>
          </Surface>
          
          <View style={styles.modeLabel}>
            <Surface style={styles.modeLabelSurface} elevation={4}>
              <Text style={styles.modeLabelText}>{mode.name}</Text>
              <Text style={styles.modeLabelDescription}>{mode.description}</Text>
            </Surface>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <Portal>
      {/* Background Overlay */}
      {isOpen && (
        <Animated.View
          style={[
            styles.overlay,
            { opacity: fadeAnim }
          ]}
          pointerEvents={isOpen ? 'auto' : 'none'}
        >
          <TouchableOpacity
            style={styles.overlayTouchable}
            onPress={toggleFAB}
            activeOpacity={1}
          />
        </Animated.View>
      )}

      {/* Mode Options */}
      <View style={[
        styles.fabContainer,
        {
          bottom: bottomOffset,
          right: rightOffset,
        }
      ]}>
        {isOpen && modes.map((mode, index) => (
          <ModeOption key={mode.id} mode={mode} index={index} />
        ))}

        {/* Main FAB - Custom Implementation */}
        <TouchableOpacity
          onPress={toggleFAB}
          style={[
            styles.customMainFab,
            isOpen && styles.customMainFabOpen
          ]}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isOpen ? ['#e74c3c', '#c0392b'] : ['#667eea', '#764ba2']}
            style={styles.customMainFabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.customMainFabText}>
              {isOpen ? '✕' : currentMode.icon}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Current Mode Indicator */}
        <Surface style={styles.currentModeIndicator} elevation={4}>
          <Text style={styles.currentModeText}>{currentMode.name}</Text>
        </Surface>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1000,
  },
  overlayTouchable: {
    flex: 1,
  },
  fabContainer: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 1001,
  },
  modeOption: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeButtonSurface: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  currentModeSurface: {
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  modeButtonGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 24,
  },
  modeLabel: {
    marginRight: 16,
  },
  modeLabelSurface: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  modeLabelText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  modeLabelDescription: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    marginTop: 2,
  },
  mainFab: {
    backgroundColor: '#667eea',
  },
  mainFabOpen: {
    backgroundColor: '#e74c3c',
  },
  mainFabIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainFabIconText: {
    fontSize: 28,
  },
  currentModeIndicator: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  currentModeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  // Custom FAB styles
  customMainFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  customMainFabOpen: {
    elevation: 8,
  },
  customMainFabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMainFabText: {
    fontSize: 28,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default ModeSwitcherFAB;