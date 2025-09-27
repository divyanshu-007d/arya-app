/**
 * ARYA ModeSwitcher FAB - Modern iOS-style FAB with Expo Icons
 * Clean floating action button with proper sizing and visibility
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
  Portal,
  Surface,
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  AryaText,
  AryaCard,
} from '../design-system';

const { width, height } = Dimensions.get('window');

const ModeSwitcherFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0));
  const navigation = useNavigation();
  const route = useRoute();
  const insets = useSafeAreaInsets();

  // Calculate safe positioning
  const bottomOffset = Math.max(insets.bottom, 20) + 80; // Above tab bar
  const rightOffset = Math.max(insets.right, 20);

  const modes = [
    {
      id: 'CadetMode',
      name: 'Cadet Mode',
      icon: 'shield-outline',
      color: '#4169E1',
      description: 'Solo Training'
    },
    {
      id: 'MentorMode', 
      name: 'Mentor Mode',
      icon: 'school-outline',
      color: '#FF6B6B',
      description: 'Personal Coaching'
    },
    {
      id: 'SquadronMode',
      name: 'Squadron Mode', 
      icon: 'people-outline',
      color: '#4ECDC4',
      description: 'Social Learning'
    }
  ];

  const currentMode = modes.find(mode => route.name === mode.id) || modes[0];

  const toggleFAB = () => {    
    if (!isOpen) {
      setIsOpen(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 120,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
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
    if (mode.id !== route.name) {
      navigation.navigate(mode.id);
    }
    toggleFAB();
  };

  const ModeOption = ({ mode, index }) => {
    const translateY = scaleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(72 * (index + 1) + 16)], // Better spacing
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
          activeOpacity={0.7}
        >
          <View style={styles.modeButtonContainer}>
            <View style={styles.modeLabel}>
              <AryaCard variant="elevated" elevation={4} style={styles.modeLabelCard} padding="small">
                <AryaText.Label color="#1a1a1a" weight="semibold">
                  {mode.name}
                </AryaText.Label>
                <AryaText.Caption color="#666">
                  {mode.description}
                </AryaText.Caption>
              </AryaCard>
            </View>
            
            <View style={[
              styles.modeButtonCircle,
              { backgroundColor: mode.color },
              isCurrentMode && styles.currentModeCircle
            ]}>
              <Ionicons 
                name={mode.icon} 
                size={24} 
                color="#FFFFFF" 
              />
            </View>
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

      {/* FAB Container */}
      <View style={[
        styles.fabContainer,
        {
          bottom: bottomOffset,
          right: rightOffset,
        }
      ]}>
        {/* Mode Options */}
        {isOpen && modes.map((mode, index) => (
          <ModeOption key={mode.id} mode={mode} index={index} />
        ))}

        {/* Main FAB */}
        <TouchableOpacity
          style={[
            styles.mainFab,
            { backgroundColor: currentMode.color },
            isOpen && styles.mainFabOpen
          ]}
          onPress={toggleFAB}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isOpen ? 'close' : 'apps'} 
            size={28} 
            color="#FFFFFF" 
          />
        </TouchableOpacity>

        {/* Current Mode Indicator */}
        {!isOpen && (
          <View style={styles.currentModeIndicator}>
            <AryaText.Caption color="#666" weight="medium">
              {currentMode.name}
            </AryaText.Caption>
          </View>
        )}
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
  },
  modeButton: {
    alignItems: 'flex-end',
  },
  modeButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modeButtonCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  currentModeCircle: {
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  modeLabel: {
    maxWidth: 140,
  },
  modeLabelCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  mainFab: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 12,
  },
  mainFabOpen: {
    backgroundColor: '#FF6B6B',
    transform: [{ rotate: '45deg' }],
  },
  currentModeIndicator: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default ModeSwitcherFAB;