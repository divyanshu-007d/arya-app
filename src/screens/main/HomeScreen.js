/**
 * ARYA HomeScreen - Beautifully Redesigned
 * Mode Selection Hub with Flawless UI using ARYA Design System
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  Alert
} from 'react-native';
import {
  Avatar,
  Badge,
  IconButton,
  Divider,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { 
  AryaScreen,
  AryaCard,
  AryaText,
  AryaButton,
  AryaGradient
} from '../../components/design-system';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(30));

  useEffect(() => {
    // Smooth entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
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
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => await logout()
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
    <Animated.View
      style={[
        styles.modeCardWrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <AryaCard
        variant="gradient"
        gradient={gradient}
        elevation={6}
        padding="large"
        style={styles.modeCard}
        disabled={!isAvailable}
      >
        <View style={styles.modeCardHeader}>
          <View style={styles.modeIconContainer}>
            <AryaText style={styles.modeIcon}>{icon}</AryaText>
          </View>
          {badge && (
            <Badge style={styles.modeBadge} size={18}>
              {badge}
            </Badge>
          )}
        </View>
        
        <AryaText.Title 
          color="#FFFFFF" 
          align="center"
          weight="bold"
          style={styles.modeTitle}
        >
          {title}
        </AryaText.Title>
        
        <AryaText.Body 
          color="rgba(255,255,255,0.9)" 
          align="center"
          style={styles.modeSubtitle}
        >
          {subtitle}
        </AryaText.Body>
        
        <AryaButton
          variant="contained"
          size="medium"
          buttonColor="rgba(255,255,255,0.95)"
          textColor={isAvailable ? '#1B2951' : 'rgba(27, 41, 81, 0.5)'}
          style={styles.modeButton}
          labelStyle={styles.modeButtonLabel}
          disabled={!isAvailable}
          onPress={() => isAvailable && handleModeSelect(mode)}
        >
          {isAvailable ? 'Enter' : 'Coming Soon'}
        </AryaButton>
      </AryaCard>
    </Animated.View>
  );

  const StatCard = ({ number, label, color }) => (
    <View style={styles.statItem}>
      <AryaText.Headline color={color} weight="bold" align="center">
        {number}
      </AryaText.Headline>
      <AryaText.Label color="#666666" align="center" style={styles.statLabel}>
        {label}
      </AryaText.Label>
    </View>
  );

  return (
    <AryaScreen statusBarStyle="light-content" padding={false}>
      <AryaGradient variant="cool" style={styles.backgroundGradient}>
        
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
                size={56} 
                source={{ uri: user?.photo || 'https://via.placeholder.com/56' }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <AryaText.Body color="rgba(255,255,255,0.8)" style={styles.greeting}>
                  Good morning,
                </AryaText.Body>
                <AryaText.Headline color="#FFFFFF" weight="bold">
                  {user?.name || 'Cadet'}
                </AryaText.Headline>
              </View>
            </View>
            
            <IconButton
              icon="logout"
              iconColor="#FFFFFF"
              size={24}
              style={styles.logoutButton}
              onPress={handleLogout}
            />
          </View>
          
          <AryaText.Title 
            color="rgba(255,255,255,0.95)" 
            align="center"
            style={styles.welcomeMessage}
          >
            Choose your training mode
          </AryaText.Title>
        </Animated.View>

        <ScrollView 
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={true}
          contentContainerStyle={styles.scrollContent}
        >
          
          {/* Mode Cards */}
          <View style={styles.modesSection}>
            
            <ModeCard
              title="Cadet Mode"
              subtitle="Solo training with AI guidance"
              icon="🎖️"
              gradient={['#667eea', '#764ba2']}
              mode="cadet"
              isAvailable={true}
              badge="ACTIVE"
            />

            <ModeCard
              title="Mentor Mode"
              subtitle="Personal coaching & therapy"
              icon="🧠"
              gradient={['#f093fb', '#f5576c']}
              mode="mentor"
              isAvailable={true}
              badge="NEW"
            />

            <ModeCard
              title="Squadron Mode"
              subtitle="Social learning & competition"
              icon="🤝"
              gradient={['#4facfe', '#00f2fe']}
              mode="squadron"
              isAvailable={true}
              badge="BETA"
            />

          </View>

          {/* Progress Stats */}
          <Animated.View 
            style={[
              styles.statsSection,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <AryaCard
              variant="elevated"
              elevation={4}
              padding="large"
              style={styles.statsCard}
            >
              <AryaText.Title align="center" style={styles.statsTitle}>
                Your Progress 📊
              </AryaText.Title>
              
              <View style={styles.statsGrid}>
                <StatCard number="0" label="Study Sessions" color="#667eea" />
                <Divider style={styles.statDivider} />
                <StatCard number="0" label="Workouts" color="#f5576c" />
                <Divider style={styles.statDivider} />
                <StatCard number="0" label="Interviews" color="#4facfe" />
              </View>
              
              <AryaText.Body 
                color="#666666" 
                align="center" 
                style={styles.motivationText}
              >
                Your journey to excellence starts now! 🚀
              </AryaText.Body>
            </AryaCard>
          </Animated.View>

        </ScrollView>
      </AryaGradient>
    </AryaScreen>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60, // Safe area + extra space
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    marginRight: 16,
    elevation: 4,
  },
  userInfo: {
    flex: 1,
  },
  greeting: {
    marginBottom: 2,
  },
  logoutButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  welcomeMessage: {
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for FAB
  },
  modesSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  modeCardWrapper: {
    marginBottom: 16,
  },
  modeCard: {
    marginHorizontal: 0,
  },
  modeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  modeIconContainer: {
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  modeBadge: {
    position: 'absolute',
    top: -8,
    right: width * 0.3, // Responsive positioning
    backgroundColor: '#FFD700',
  },
  modeTitle: {
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  modeSubtitle: {
    marginBottom: 20,
    opacity: 0.9,
  },
  modeButton: {
    alignSelf: 'center',
    minWidth: 120,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modeButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  statsTitle: {
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
  statLabel: {
    marginTop: 4,
    fontSize: 12,
  },
  statDivider: {
    height: 40,
    width: 1,
    marginHorizontal: 16,
  },
  motivationText: {
    fontStyle: 'italic',
    lineHeight: 20,
  },
});

export default HomeScreen;