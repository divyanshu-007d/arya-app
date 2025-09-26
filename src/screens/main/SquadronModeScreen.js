/**
 * Squadron Mode Screen - Social Learning & Team Collaboration
 * Allows users to join squads and access collaborative learning platform
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
import { WebView } from 'react-native-webview';
import { useAuth } from '../../context/AuthContext';
import ModeSwitcherFAB from '../../components/common/ModeSwitcherFAB';

const { width, height } = Dimensions.get('window');

const SquadronModeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(50));
  const [squadInput, setSquadInput] = useState('Default Squadron');
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);

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

  const openSquadronPlatform = () => {
    console.log('Opening Squadron Platform...');
    console.log('Setting WebView visible to true...');
    setIsWebViewVisible(true);
  };

  const closeWebView = () => {
    setIsWebViewVisible(false);
  };

  const handleWebViewError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView Error:', nativeEvent);
    
    Alert.alert(
      'Loading Error',
      'Unable to load the squadron platform. Please check your internet connection.',
      [
        { text: 'Retry', onPress: () => {} },
        { text: 'Go Back', onPress: closeWebView }
      ]
    );
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

  if (isWebViewVisible) {
    console.log('Rendering WebView screen...');
    return (
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#4facfe" />
        
        {/* WebView Header */}
        <SafeAreaView style={styles.webViewContainer}>
          <View style={styles.webViewHeader}>
            <TouchableOpacity 
              onPress={closeWebView} 
              style={styles.closeButton}
            >
              <Surface style={styles.closeButtonSurface} elevation={4}>
                <Ionicons name="close" size={24} color="#4facfe" />
              </Surface>
            </TouchableOpacity>
            
            <View style={styles.webViewHeaderContent}>
              <Text style={styles.webViewTitle}>Squadron Platform</Text>
              <Text style={styles.webViewSquad}>Team Collaboration</Text>
            </View>
          </View>

          {/* Full-Screen WebView */}
          <WebView
            source={{ uri: 'https://ruto-nav.web.app/' }}
            style={styles.webView}
            onError={handleWebViewError}
            onLoad={() => console.log('WebView loaded successfully')}
            onLoadStart={() => console.log('WebView started loading')}
            onLoadEnd={() => console.log('WebView finished loading')}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            scalesPageToFit={true}
            mixedContentMode="compatibility"
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            renderLoading={() => (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Squadron Platform...</Text>
                <Text style={styles.loadingText}>Connecting to team collaboration...</Text>
              </View>
            )}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#4facfe', '#00f2fe']}
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
                <Ionicons name="arrow-back" size={24} color="#4facfe" />
              </Surface>
            </TouchableOpacity>

            <View style={styles.headerContent}>
              <Text style={styles.headerIcon}>🤝</Text>
              <Text style={styles.headerTitle}>Squadron Mode</Text>
              <Text style={styles.headerSubtitle}>
                Social Learning & Team Collaboration
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
                      Ready to join your squadron, {user?.name || 'Cadet'}?
                    </Text>
                    <Text style={styles.welcomeText}>
                      Connect with fellow cadets, participate in group challenges, 
                      and achieve your NDA goals together as a team.
                    </Text>
                    
                    <Chip 
                      icon="account-group" 
                      style={styles.statusChip}
                      textStyle={styles.chipText}
                    >
                      Team Collaboration Active
                    </Chip>
                  </Card.Content>
                </LinearGradient>
              </Card>
            </Animated.View>

            {/* Squadron Entry Section */}
            <Animated.View 
              style={[
                styles.squadInputSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Card style={styles.squadInputCard} elevation={8}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                  style={styles.squadInputGradient}
                >
                  <Card.Content style={styles.squadInputContent}>
                    <Text style={styles.squadInputTitle}>🎯 Ready to Join?</Text>
                    <Text style={styles.squadInputSubtitle}>
                      Enter your squadron and start collaborating
                    </Text>
                    
                    <TouchableOpacity 
                      onPress={openSquadronPlatform}
                      style={styles.joinSquadButton}
                      activeOpacity={0.8}
                    >
                      <LinearGradient
                        colors={['#43e97b', '#38f9d7']}
                        style={styles.joinSquadButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.joinSquadButtonIcon}>🚀</Text>
                        <Text style={styles.joinSquadButtonText}>Enter Squadron</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </Card.Content>
                </LinearGradient>
              </Card>
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
              <Text style={styles.sectionTitle}>Squadron Features</Text>
              
              <View style={styles.featuresGrid}>
                <FeatureCard
                  icon="👥"
                  title="Team Challenges"
                  description="Compete in group exercises and missions"
                  color="#ff6b6b"
                />
                
                <FeatureCard
                  icon="📊"
                  title="Group Analytics"
                  description="Track collective progress and performance"
                  color="#4ecdc4"
                />
                
                <FeatureCard
                  icon="💬"
                  title="Team Chat"
                  description="Real-time communication with squad mates"
                  color="#45b7d1"
                />
                
                <FeatureCard
                  icon="🏆"
                  title="Leaderboards"
                  description="Compare your squad with other teams"
                  color="#f9ca24"
                />
                
                <FeatureCard
                  icon="📚"
                  title="Shared Resources"
                  description="Access team study materials and notes"
                  color="#6c5ce7"
                />
                
                <FeatureCard
                  icon="🎯"
                  title="Mission Planning"
                  description="Coordinate training schedules and goals"
                  color="#fd79a8"
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
                    <Text style={styles.tipsTitle}>💡 Squadron Tips</Text>
                    
                    <View style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>
                        Coordinate with your squad leader for optimal team performance
                      </Text>
                    </View>
                    
                    <View style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>
                        Participate actively in group challenges and discussions
                      </Text>
                    </View>
                    
                    <View style={styles.tipItem}>
                      <Text style={styles.tipBullet}>•</Text>
                      <Text style={styles.tipText}>
                        Support your teammates and celebrate collective achievements
                      </Text>
                    </View>
                  </Card.Content>
                </LinearGradient>
              </Card>
            </Animated.View>

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
      
      {/* Mode Switcher FAB - Only show when WebView is not visible */}
      {!isWebViewVisible && <ModeSwitcherFAB />}
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
  squadInputSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  squadInputCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  squadInputGradient: {
    borderRadius: 20,
  },
  squadInputContent: {
    padding: 24,
    alignItems: 'center',
  },
  squadInputTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  squadInputSubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
  },
  squadInput: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#e9ecef',
  },
  joinSquadButton: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
  },
  joinSquadButtonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinSquadButtonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  joinSquadButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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
    color: '#4facfe',
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
  // WebView Styles
  webViewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  webViewHeader: {
    backgroundColor: '#4facfe',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  closeButton: {
    marginRight: 16,
  },
  closeButtonSurface: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webViewHeaderContent: {
    flex: 1,
  },
  webViewTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  webViewSquad: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
  },
});

export default SquadronModeScreen;