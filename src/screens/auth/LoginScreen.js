/**
 * Modern Login Screen with Beautiful UI Design
 * NDA StudyBuddy - Inspired by modern app design trends
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
  Platform,
  Dimensions,
  Animated
} from 'react-native';
import {
  Button,
  Card,
  Text,
  ActivityIndicator,
  Surface
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../../context/AuthContext';
import { ndaTheme } from '../../utils/theme';
import { NDA_CONFIG } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  React.useEffect(() => {
    // Entrance animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google authentication with modern loading
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful Google login response
      const mockGoogleUser = {
        id: 'mock_google_user_123',
        name: 'Arjun Singh',
        email: 'arjun.singh@gmail.com',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        provider: 'google',
        ndaPreparationStage: 'beginner',
        joinDate: new Date().toISOString(),
        stats: {
          studySessions: 0,
          fitnessWorkouts: 0,
          interviewPractices: 0,
          totalPoints: 0,
          currentStreak: 0
        }
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      const result = await login(mockGoogleUser, mockToken);
      
      if (result.success) {
        Alert.alert(
          '🎉 Welcome to NDA StudyBuddy!',
          `Hello ${mockGoogleUser.name}! Ready to chase your defense dreams?`,
          [{ text: 'Let\'s Go!', style: 'default' }]
        );
        // Navigation will automatically go to CadetMode via RootNavigator
      } else {
        throw new Error(result.error || 'Login failed');
      }
      
    } catch (error) {
      console.error('Google login error:', error);
      Alert.alert(
        '😕 Login Failed',
        'Unable to sign in with Google. Please try again.',
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#6C63FF', '#9C88FF', '#C77DFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Floating Background Elements */}
          <View style={styles.backgroundElements}>
            <Surface style={[styles.floatingElement, styles.element1]} elevation={0}>
              <Text style={styles.elementIcon}>🎖️</Text>
            </Surface>
            <Surface style={[styles.floatingElement, styles.element2]} elevation={0}>
              <Text style={styles.elementIcon}>🧠</Text>
            </Surface>
            <Surface style={[styles.floatingElement, styles.element3]} elevation={0}>
              <Text style={styles.elementIcon}>💪</Text>
            </Surface>
            <Surface style={[styles.floatingElement, styles.element4]} elevation={0}>
              <Text style={styles.elementIcon}>🎤</Text>
            </Surface>
          </View>

          {/* Main Content */}
          <Animated.View 
            style={[
              styles.content,
              { opacity, transform: [{ translateY }] }
            ]}
          >
            
            {/* Logo Section */}
            <View style={styles.logoSection}>
              <Surface style={styles.logoContainer} elevation={8}>
                <LinearGradient
                  colors={['#FFD700', '#FFA000']}
                  style={styles.logoGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.logoIcon}>🛡️</Text>
                </LinearGradient>
              </Surface>
              <Text style={styles.appTitle}>{NDA_CONFIG.APP_NAME}</Text>
              <Text style={styles.appTagline}>{NDA_CONFIG.APP_TAGLINE}</Text>
            </View>

            {/* Login Card */}
            <Card style={styles.loginCard} elevation={12}>
              <LinearGradient
                colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                style={styles.cardGradient}
              >
                <Card.Content style={styles.cardContent}>
                  
                  <Text style={styles.welcomeTitle}>Welcome, Future Officer! 👋</Text>
                  <Text style={styles.welcomeSubtitle}>
                    Begin your NDA journey with AI-powered preparation
                  </Text>

                  {/* Features Preview */}
                  <View style={styles.featuresGrid}>
                    <Surface style={[styles.featureCard, { backgroundColor: '#E8F5E8' }]} elevation={2}>
                      <Text style={styles.featureIcon}>🧠</Text>
                      <Text style={styles.featureTitle}>AI Study</Text>
                    </Surface>
                    
                    <Surface style={[styles.featureCard, { backgroundColor: '#E3F2FD' }]} elevation={2}>
                      <Text style={styles.featureIcon}>💪</Text>
                      <Text style={styles.featureTitle}>Fitness</Text>
                    </Surface>
                    
                    <Surface style={[styles.featureCard, { backgroundColor: '#FFF3E0' }]} elevation={2}>
                      <Text style={styles.featureIcon}>🎤</Text>
                      <Text style={styles.featureTitle}>Interview</Text>
                    </Surface>
                  </View>

                  {/* Google Login Button */}
                  <Button
                    mode="contained"
                    onPress={handleGoogleLogin}
                    disabled={isLoading}
                    style={styles.googleButton}
                    contentStyle={styles.buttonContent}
                    labelStyle={styles.buttonLabel}
                    icon={isLoading ? undefined : "google"}
                  >
                    {isLoading ? (
                      <View style={styles.loadingContainer}>
                        <ActivityIndicator 
                          size="small" 
                          color="#FFFFFF" 
                          style={styles.loadingSpinner}
                        />
                        <Text style={styles.loadingText}>Signing in...</Text>
                      </View>
                    ) : (
                      'Continue with Google'
                    )}
                  </Button>

                  <Text style={styles.disclaimerText}>
                    By continuing, you agree to our Terms & Privacy Policy
                  </Text>

                </Card.Content>
              </LinearGradient>
            </Card>

            {/* Bottom Section */}
            <View style={styles.bottomSection}>
              <Text style={styles.footerText}>
                🇮🇳 Proudly made for India's future defenders
              </Text>
            </View>

          </Animated.View>
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
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingElement: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  element1: {
    top: height * 0.15,
    left: width * 0.1,
    backgroundColor: 'rgba(255,215,0,0.2)',
  },
  element2: {
    top: height * 0.25,
    right: width * 0.15,
    backgroundColor: 'rgba(76,175,80,0.2)',
  },
  element3: {
    top: height * 0.45,
    left: width * 0.05,
    backgroundColor: 'rgba(33,150,243,0.2)',
  },
  element4: {
    top: height * 0.35,
    right: width * 0.08,
    backgroundColor: 'rgba(255,193,7,0.2)',
  },
  elementIcon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    overflow: 'hidden',
  },
  logoGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIcon: {
    fontSize: 40,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  appTagline: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  loginCard: {
    borderRadius: 24,
    marginHorizontal: 4,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 24,
  },
  cardContent: {
    padding: 32,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    fontWeight: '400',
  },
  featuresGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  featureCard: {
    width: (width - 120) / 3,
    height: 80,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333333',
  },
  googleButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 16,
    marginBottom: 20,
  },
  buttonContent: {
    paddingVertical: 12,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingSpinner: {
    marginRight: 12,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
    fontWeight: '400',
  },
  bottomSection: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default LoginScreen;