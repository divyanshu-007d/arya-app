/**
 * Mentor Mode Screen - AI Therapy & Coaching
 * Provides access to personalized AI mentoring and therapy sessions
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Text,
  Card,
  Surface,
  Button,
  Avatar,
  Chip
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from '../../context/AuthContext';
import ModeSwitcherFAB from '../../components/common/ModeSwitcherFAB';

const { width, height } = Dimensions.get('window');

const MentorModeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const openMentorChat = async () => {
    try {
      const mentorURL = 'https://lab.anam.ai/share/p2m3tJhEDQsnDPw4tERY-';
      
      console.log('Opening mentor chat URL:', mentorURL);
      
      // Simple WebBrowser call without complex options
      await WebBrowser.openBrowserAsync(mentorURL);
      
      console.log('WebBrowser opened successfully');
    } catch (error) {
      console.error('Error opening mentor chat:', error);
      Alert.alert(
        'Connection Error',
        'Unable to connect to your AI mentor. Please check your internet connection and try again.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const FeatureCard = ({ icon, title, description, color }) => (
    <Card style={styles.featureCard} elevation={4}>
      <LinearGradient
        colors={[color, `${color}CC`]}
        style={styles.featureGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card.Content style={styles.featureContent}>
          <Text style={styles.featureIcon}>{icon}</Text>
          <Text style={styles.featureTitle}>{title}</Text>
          <Text style={styles.featureDescription}>{description}</Text>
        </Card.Content>
      </LinearGradient>
    </Card>
  );

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
          
          {/* Header */}
          <Animated.View 
            style={[
              styles.header,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
              <Surface style={styles.backButtonSurface} elevation={4}>
                <Ionicons name="arrow-back" size={24} color="#667eea" />
              </Surface>
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.headerIcon}>🧠</Text>
              <Text style={styles.headerTitle}>Mentor Mode</Text>
              <Text style={styles.headerSubtitle}>
                Your Personal AI Coach & Therapist
              </Text>
            </View>
          </Animated.View>

          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            
            {/* Welcome Section */}
            <Animated.View 
              style={[
                styles.welcomeSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Card style={styles.welcomeCard} elevation={8}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                  style={styles.welcomeGradient}
                >
                  <Card.Content style={styles.welcomeContent}>
                    <Avatar.Image 
                      size={80} 
                      source={{ uri: user?.photo || 'https://via.placeholder.com/80' }}
                      style={styles.welcomeAvatar}
                    />
                    <Text style={styles.welcomeTitle}>
                      Welcome back, {user?.name || 'Cadet'}!
                    </Text>
                    <Text style={styles.welcomeText}>
                      Your AI mentor is ready to provide personalized guidance, 
                      emotional support, and strategic coaching for your NDA journey.
                    </Text>
                    
                    <Chip 
                      icon="brain" 
                      style={styles.statusChip}
                      textStyle={styles.chipText}
                    >
                      AI Mentor Available 24/7
                    </Chip>
                  </Card.Content>
                </LinearGradient>
              </Card>
            </Animated.View>

            {/* Main Action Button */}
            <Animated.View 
              style={[
                styles.actionSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <TouchableOpacity 
                onPress={openMentorChat}
                style={styles.mentorButton}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#f093fb', '#f5576c']}
                  style={styles.mentorButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.mentorButtonContent}>
                    <Text style={styles.mentorButtonIcon}>💬</Text>
                    <Text style={styles.mentorButtonTitle}>Talk to Your Mentor</Text>
                    <Text style={styles.mentorButtonSubtitle}>
                      Start a personalized coaching session
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Features Grid */}
            <Animated.View 
              style={[
                styles.featuresSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={styles.sectionTitle}>What Your Mentor Can Help With</Text>
              
              <View style={styles.featuresGrid}>
                <FeatureCard
                  icon="🎯"
                  title="Goal Setting"
                  description="Create strategic study plans and career roadmaps"
                  color="#4facfe"
                />
                
                <FeatureCard
                  icon="💪"
                  title="Motivation"
                  description="Overcome challenges and maintain discipline"
                  color="#43e97b"
                />
                
                <FeatureCard
                  icon="🧘"
                  title="Stress Management"
                  description="Learn relaxation techniques and coping strategies"
                  color="#fa709a"
                />
                
                <FeatureCard
                  icon="📚"
                  title="Study Guidance"
                  description="Optimize your learning methods and schedule"
                  color="#fecb6a"
                />
                
                <FeatureCard
                  icon="💭"
                  title="Mental Health"
                  description="Emotional support and therapeutic conversations"
                  color="#a8edea"
                />
                
                <FeatureCard
                  icon="🏆"
                  title="Performance"
                  description="Analyze progress and improve weak areas"
                  color="#d299c2"
                />
              </View>
            </Animated.View>

            {/* Tips Section */}
            <Animated.View 
              style={[
                styles.tipsSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Card style={styles.tipsCard} elevation={6}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
                  style={styles.tipsGradient}
                >
                  <Card.Content style={styles.tipsContent}>
                    <Text style={styles.tipsTitle}>💡 Pro Tips</Text>
                    
                    <View style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>
                        Be honest and open with your mentor for the best guidance
                      </Text>
                    </View>
                    
                    <View style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>
                        Regular sessions help build a stronger mentoring relationship
                      </Text>
                    </View>
                    
                    <View style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>
                        Ask specific questions to get more targeted advice
                      </Text>
                    </View>
                  </Card.Content>
                </LinearGradient>
              </Card>
            </Animated.View>

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
      
      {/* Mode Switcher FAB */}
      <ModeSwitcherFAB />
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonSurface: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: '500',
  },
  welcomeSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  welcomeCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  welcomeGradient: {
    borderRadius: 20,
  },
  welcomeContent: {
    padding: 24,
    alignItems: 'center',
  },
  welcomeAvatar: {
    marginBottom: 16,
    elevation: 4,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  statusChip: {
    backgroundColor: '#e8f5e8',
  },
  chipText: {
    color: '#2e7d32',
    fontWeight: '600',
  },
  actionSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  mentorButton: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
  },
  mentorButtonGradient: {
    padding: 32,
  },
  mentorButtonContent: {
    alignItems: 'center',
  },
  mentorButtonIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  mentorButtonTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  mentorButtonSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    fontWeight: '500',
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.95)',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 64) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  featureGradient: {
    padding: 16,
  },
  featureContent: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 16,
  },
  tipsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  tipsCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  tipsGradient: {
    borderRadius: 20,
  },
  tipsContent: {
    padding: 24,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  tipBullet: {
    fontSize: 16,
    color: '#667eea',
    fontWeight: '700',
    marginRight: 12,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
});

export default MentorModeScreen;