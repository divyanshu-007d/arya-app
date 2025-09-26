/**
 * Modern Home Screen - Mode Selection Hub
 * NDA StudyBuddy - Beautiful mode selection interface
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
  Avatar,
  Chip,
  Badge
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';
import { NDA_CONFIG } from '../../utils/constants';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
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

  const handleModeSelect = (mode) => {
    switch (mode) {
      case 'cadet':
        navigation.navigate('CadetMode');
        break;
      case 'mentor':
        navigation.navigate('MentorMode');
        break;
      case 'squadron':
        navigation.navigate('SquadronMode');
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      '👋 See You Soon!',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  const ModeCard = ({ 
    title, 
    subtitle, 
    icon, 
    gradient, 
    mode, 
    isAvailable = true,
    badge = null 
  }) => (
    <TouchableOpacity
      onPress={() => handleModeSelect(mode)}
      disabled={!isAvailable}
      style={styles.modeCardContainer}
    >
      <Card style={styles.modeCard} elevation={8}>
        <LinearGradient
          colors={gradient}
          style={styles.modeCardGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.modeCardContent}>
            <View style={styles.modeHeader}>
              <Text style={styles.modeIcon}>{icon}</Text>
              {badge && (
                <Badge style={styles.modeBadge}>{badge}</Badge>
              )}
            </View>
            <Text style={styles.modeTitle}>{title}</Text>
            <Text style={styles.modeSubtitle}>{subtitle}</Text>
            
            {isAvailable ? (
              <Surface style={styles.startButton} elevation={4}>
                <Text style={styles.startButtonText}>
                  {mode === 'cadet' || mode === 'mentor' || mode === 'squadron' ? 'Enter' : 'Coming Soon'}
                </Text>
              </Surface>
            ) : (
              <Surface style={[styles.startButton, styles.disabledButton]} elevation={2}>
                <Text style={[styles.startButtonText, styles.disabledButtonText]}>
                  Coming Soon
                </Text>
              </Surface>
            )}
          </View>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

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
          
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            
            {/* Header Section */}
            <Animated.View 
              style={[
                styles.header,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={styles.headerContent}>
                <View style={styles.userSection}>
                  <Avatar.Image 
                    size={60} 
                    source={{ uri: user?.photo || 'https://via.placeholder.com/60' }}
                    style={styles.avatar}
                  />
                  <View style={styles.userInfo}>
                    <Text style={styles.greeting}>Good morning,</Text>
                    <Text style={styles.userName}>{user?.name || 'Cadet'}</Text>
                  </View>
                </View>
                
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                  <Surface style={styles.logoutSurface} elevation={4}>
                    <Text style={styles.logoutIcon}>👋</Text>
                  </Surface>
                </TouchableOpacity>
              </View>
              
              <Text style={styles.welcomeMessage}>
                Choose your training mode
              </Text>
            </Animated.View>

            {/* Modes Grid */}
            <Animated.View 
              style={[
                styles.modesSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              
              {/* Cadet Mode - Primary */}
              <ModeCard
                title="Cadet Mode"
                subtitle="Solo training with AI guidance"
                icon="🎖️"
                gradient={['#667eea', '#764ba2']}
                mode="cadet"
                isAvailable={true}
                badge="ACTIVE"
              />

              {/* Mentor Mode */}
              <ModeCard
                title="Mentor Mode"
                subtitle="Personal coaching & therapy"
                icon="🧠"
                gradient={['#f093fb', '#f5576c']}
                mode="mentor"
                isAvailable={true}
                badge="NEW"
              />

              {/* Squadron Mode */}
              <ModeCard
                title="Squadron Mode"
                subtitle="Social learning & competition"
                icon="🤝"
                gradient={['#4facfe', '#00f2fe']}
                mode="squadron"
                isAvailable={true}
                badge="NEW"
              />

              <View style={styles.comingSoonModes}>
                
                {/* Coming Soon Modes - All modes are now available */}

              </View>
            </Animated.View>

            {/* Quick Stats */}
            <Animated.View 
              style={[
                styles.statsSection,
                { 
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Card style={styles.statsCard} elevation={6}>
                <LinearGradient
                  colors={['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)']}
                  style={styles.statsGradient}
                >
                  <Card.Content style={styles.statsContent}>
                    <Text style={styles.statsTitle}>Your Progress 📊</Text>
                    
                    <View style={styles.statsGrid}>
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Study Sessions</Text>
                      </View>
                      
                      <View style={styles.statDivider} />
                      
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Workouts</Text>
                      </View>
                      
                      <View style={styles.statDivider} />
                      
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>0</Text>
                        <Text style={styles.statLabel}>Interviews</Text>
                      </View>
                    </View>
                    
                    <Text style={styles.motivationText}>
                      Your journey to NDA starts with the first step! 🚀
                    </Text>
                  </Card.Content>
                </LinearGradient>
              </Card>
            </Animated.View>

          </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
    elevation: 4,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    marginTop: 2,
  },
  logoutButton: {
    padding: 4,
  },
  logoutSurface: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutIcon: {
    fontSize: 20,
  },
  welcomeMessage: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  modesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  modeCardContainer: {
    marginBottom: 20,
  },
  modeCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  modeCardGradient: {
    padding: 24,
  },
  modeCardContent: {
    alignItems: 'center',
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  modeIcon: {
    fontSize: 40,
    marginRight: 8,
  },
  modeBadge: {
    backgroundColor: '#FFD700',
    fontSize: 10,
  },
  modeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modeSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    paddingHorizontal: 32,
    paddingVertical: 12,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  disabledButtonText: {
    color: 'rgba(0,0,0,0.5)',
  },
  comingSoonModes: {
    opacity: 0.8,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  statsCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  statsGradient: {
    borderRadius: 20,
  },
  statsContent: {
    padding: 24,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 16,
  },
  motivationText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
});

export default HomeScreen;