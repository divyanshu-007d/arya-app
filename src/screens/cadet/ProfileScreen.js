/**
 * Profile Screen - User Settings and Progress Overview
 * Beautiful profile interface with modern design
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Surface,
  Divider,
  Switch,
  Button,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const achievements = [
    { icon: '🎯', title: 'First Login', description: 'Welcome to NDA StudyBuddy!', earned: true },
    { icon: '📚', title: 'Study Starter', description: 'Complete 10 study sessions', earned: false },
    { icon: '💪', title: 'Fitness Enthusiast', description: 'Complete 20 workouts', earned: false },
    { icon: '🎤', title: 'Interview Pro', description: 'Complete 15 mock interviews', earned: false },
    { icon: '🏆', title: 'NDA Ready', description: 'Reach 80% readiness score', earned: false },
  ];

  const settingsOptions = [
    { icon: '🔔', title: 'Notifications', hasSwitch: true, value: notificationsEnabled, onToggle: setNotificationsEnabled },
    { icon: '🌙', title: 'Dark Mode', hasSwitch: true, value: darkModeEnabled, onToggle: setDarkModeEnabled },
    { icon: '🔐', title: 'Privacy Settings', hasSwitch: false },
    { icon: '📞', title: 'Support & Help', hasSwitch: false },
    { icon: '⭐', title: 'Rate App', hasSwitch: false },
  ];

  const handleLogout = () => {
    Alert.alert(
      '👋 Sign Out',
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

  const AchievementCard = ({ achievement }) => (
    <Surface 
      style={[
        styles.achievementCard,
        achievement.earned ? styles.earnedAchievement : styles.lockedAchievement
      ]} 
      elevation={achievement.earned ? 4 : 2}
    >
      <Text style={[
        styles.achievementIcon,
        !achievement.earned && styles.lockedIcon
      ]}>
        {achievement.earned ? achievement.icon : '🔒'}
      </Text>
      <View style={styles.achievementInfo}>
        <Text style={[
          styles.achievementTitle,
          !achievement.earned && styles.lockedText
        ]}>
          {achievement.title}
        </Text>
        <Text style={[
          styles.achievementDescription,
          !achievement.earned && styles.lockedText
        ]}>
          {achievement.description}
        </Text>
      </View>
    </Surface>
  );

  const SettingsItem = ({ option }) => (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsLeft}>
        <Text style={styles.settingsIcon}>{option.icon}</Text>
        <Text style={styles.settingsTitle}>{option.title}</Text>
      </View>
      {option.hasSwitch ? (
        <Switch
          value={option.value}
          onValueChange={option.onToggle}
          color="#667eea"
        />
      ) : (
        <Text style={styles.settingsArrow}>›</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}
      >
        <SafeAreaView style={styles.safeArea}>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            {/* Profile Header */}
            <View style={styles.profileHeader}>
              <Avatar.Image 
                size={100} 
                source={{ uri: user?.photo || 'https://via.placeholder.com/100' }}
                style={styles.avatar}
              />
              <Text style={styles.userName}>{user?.name || 'NDA Aspirant'}</Text>
              <Text style={styles.userEmail}>{user?.email || 'cadet@nda.edu'}</Text>
              <Text style={styles.joinDate}>
                Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Today'}
              </Text>
            </View>

            {/* Stats Cards */}
            <View style={styles.statsSection}>
              <View style={styles.statsGrid}>
                <Surface style={styles.statCard} elevation={4}>
                  <Text style={styles.statNumber}>0</Text>
                  <Text style={styles.statLabel}>Study Hours</Text>
                </Surface>
                
                <Surface style={styles.statCard} elevation={4}>
                  <Text style={styles.statNumber}>0</Text>
                  <Text style={styles.statLabel}>Workouts</Text>
                </Surface>
                
                <Surface style={styles.statCard} elevation={4}>
                  <Text style={styles.statNumber}>0</Text>
                  <Text style={styles.statLabel}>Interviews</Text>
                </Surface>
              </View>
            </View>

            {/* Main Content */}
            <View style={styles.mainContent}>
              
              {/* Achievements Section */}
              <View style={styles.achievementsSection}>
                <Text style={styles.sectionTitle}>🏆 Achievements</Text>
                {achievements.map((achievement, index) => (
                  <AchievementCard key={index} achievement={achievement} />
                ))}
              </View>

              {/* Settings Section */}
              <View style={styles.settingsSection}>
                <Text style={styles.sectionTitle}>⚙️ Settings</Text>
                <Card style={styles.settingsCard} elevation={4}>
                  <Card.Content style={styles.settingsContent}>
                    {settingsOptions.map((option, index) => (
                      <View key={index}>
                        <SettingsItem option={option} />
                        {index < settingsOptions.length - 1 && (
                          <Divider style={styles.settingsDivider} />
                        )}
                      </View>
                    ))}
                  </Card.Content>
                </Card>
              </View>

              {/* Logout Button */}
              <View style={styles.logoutSection}>
                <Button
                  mode="outlined"
                  onPress={handleLogout}
                  style={styles.logoutButton}
                  labelStyle={styles.logoutButtonLabel}
                  icon="logout"
                >
                  Sign Out
                </Button>
              </View>

              <View style={styles.bottomSpacing} />

            </View>

          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  avatar: {
    marginBottom: 16,
    elevation: 8,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  joinDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#667eea',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
    textAlign: 'center',
  },
  mainContent: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    paddingTop: 24,
  },
  achievementsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  earnedAchievement: {
    backgroundColor: '#FFFFFF',
  },
  lockedAchievement: {
    backgroundColor: '#F8F9FA',
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#636e72',
  },
  lockedText: {
    opacity: 0.5,
  },
  settingsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  settingsCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingsContent: {
    padding: 0,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2d3436',
  },
  settingsArrow: {
    fontSize: 24,
    color: '#ddd',
    fontWeight: '300',
  },
  settingsDivider: {
    marginLeft: 60,
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  logoutButton: {
    borderColor: '#e17055',
    borderWidth: 2,
    borderRadius: 12,
  },
  logoutButtonLabel: {
    color: '#e17055',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomSpacing: {
    height: 100, // Account for tab bar
  },
});

export default ProfileScreen;