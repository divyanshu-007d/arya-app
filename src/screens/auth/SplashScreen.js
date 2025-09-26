/**
 * Modern Splash Screen with Beautiful Animations
 * NDA StudyBuddy - First impression with stunning visuals
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  Dimensions,
} from 'react-native';
import { Text, Surface } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { NDA_CONFIG } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const [logoScale] = useState(new Animated.Value(0));
  const [titleOpacity] = useState(new Animated.Value(0));
  const [taglineOpacity] = useState(new Animated.Value(0));
  const [progressWidth] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimations();
    
    // Navigate after animations complete
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated) {
          navigation.replace('CadetMode');
        } else {
          navigation.replace('Login');
        }
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated]);

  const startAnimations = () => {
    // Logo scale animation
    Animated.spring(logoScale, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Title fade in
    Animated.timing(titleOpacity, {
      toValue: 1,
      duration: 800,
      delay: 500,
      useNativeDriver: true,
    }).start();

    // Tagline fade in
    Animated.timing(taglineOpacity, {
      toValue: 1,
      duration: 800,
      delay: 1000,
      useNativeDriver: true,
    }).start();

    // Progress bar animation
    Animated.timing(progressWidth, {
      toValue: 1,
      duration: 2000,
      delay: 1500,
      useNativeDriver: false,
    }).start();
  };

  const progressWidthInterpolated = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Background Pattern */}
          <View style={styles.backgroundPattern}>
            <Surface style={[styles.patternElement, styles.pattern1]} elevation={0} />
            <Surface style={[styles.patternElement, styles.pattern2]} elevation={0} />
            <Surface style={[styles.patternElement, styles.pattern3]} elevation={0} />
            <Surface style={[styles.patternElement, styles.pattern4]} elevation={0} />
            <Surface style={[styles.patternElement, styles.pattern5]} elevation={0} />
          </View>

          <View style={styles.content}>
            
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <Animated.View 
                style={[
                  styles.logoContainer,
                  { transform: [{ scale: logoScale }] }
                ]}
              >
                <Surface style={styles.logoSurface} elevation={12}>
                  <LinearGradient
                    colors={['#FFD700', '#FFA000', '#FF8F00']}
                    style={styles.logoGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                  >
                    <Text style={styles.logoIcon}>🛡️</Text>
                  </LinearGradient>
                </Surface>
              </Animated.View>

              <Animated.View style={{ opacity: titleOpacity }}>
                <Text style={styles.appTitle}>{NDA_CONFIG.APP_NAME}</Text>
              </Animated.View>

              <Animated.View style={{ opacity: taglineOpacity }}>
                <Text style={styles.appTagline}>{NDA_CONFIG.APP_TAGLINE}</Text>
              </Animated.View>
            </View>

            {/* Features Preview */}
            <View style={styles.featuresPreview}>
              <View style={styles.featureItem}>
                <Surface style={[styles.featureBubble, { backgroundColor: 'rgba(76,175,80,0.2)' }]} elevation={4}>
                  <Text style={styles.featureIcon}>🧠</Text>
                </Surface>
                <Text style={styles.featureLabel}>AI Study</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Surface style={[styles.featureBubble, { backgroundColor: 'rgba(33,150,243,0.2)' }]} elevation={4}>
                  <Text style={styles.featureIcon}>💪</Text>
                </Surface>
                <Text style={styles.featureLabel}>Fitness</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Surface style={[styles.featureBubble, { backgroundColor: 'rgba(255,193,7,0.2)' }]} elevation={4}>
                  <Text style={styles.featureIcon}>🎤</Text>
                </Surface>
                <Text style={styles.featureLabel}>Interview</Text>
              </View>
            </View>

            {/* Loading Progress */}
            <View style={styles.loadingSection}>
              <Text style={styles.loadingText}>Preparing your defense journey...</Text>
              <View style={styles.progressBarContainer}>
                <Animated.View 
                  style={[
                    styles.progressBar,
                    { width: progressWidthInterpolated }
                  ]}
                />
              </View>
            </View>

          </View>

          {/* Bottom Badge */}
          <View style={styles.bottomBadge}>
            <Surface style={styles.badge} elevation={6}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                style={styles.badgeGradient}
              >
                <Text style={styles.badgeText}>🇮🇳 Made in India</Text>
              </LinearGradient>
            </Surface>
          </View>

        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  patternElement: {
    position: 'absolute',
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  pattern1: {
    width: 100,
    height: 100,
    top: height * 0.1,
    left: width * 0.8,
  },
  pattern2: {
    width: 60,
    height: 60,
    top: height * 0.2,
    left: width * 0.05,
  },
  pattern3: {
    width: 80,
    height: 80,
    top: height * 0.7,
    right: width * 0.1,
  },
  pattern4: {
    width: 40,
    height: 40,
    top: height * 0.8,
    left: width * 0.2,
  },
  pattern5: {
    width: 120,
    height: 120,
    top: height * 0.05,
    left: width * 0.1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logoSurface: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
  },
  logoGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 48,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
    fontStyle: 'italic',
  },
  featuresPreview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 60,
    paddingHorizontal: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureBubble: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 28,
  },
  featureLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '600',
    textAlign: 'center',
  },
  loadingSection: {
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
  progressBarContainer: {
    width: '70%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  bottomBadge: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  badge: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  badgeGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  badgeText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    opacity: 0.9,
  },
});

export default SplashScreen;