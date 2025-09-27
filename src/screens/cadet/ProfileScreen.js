/**
 * Profile Screen - Modern iOS-style Profile & Leaderboard
 * Clean interface with royal blue theme and leaderboard
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import {
  Avatar,
  Switch,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import {
  AryaScreen,
  AryaCard,
  AryaText,
  AryaContainer,
} from '../../components/design-system';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const leaderboardData = [
    { rank: 1, name: 'Arjun Singh', score: 2450, avatar: '🥇', isCurrentUser: false },
    { rank: 2, name: 'Priya Sharma', score: 2380, avatar: '🥈', isCurrentUser: false },
    { rank: 3, name: 'Rahul Kumar', score: 2250, avatar: '🥉', isCurrentUser: false },
    { rank: 4, name: 'You', score: 1250, avatar: '👤', isCurrentUser: true },
    { rank: 5, name: 'Sneha Patel', score: 1180, avatar: '⭐', isCurrentUser: false },
    { rank: 6, name: 'Vikram Yadav', score: 1050, avatar: '⭐', isCurrentUser: false },
    { rank: 7, name: 'Anita Das', score: 950, avatar: '⭐', isCurrentUser: false },
  ];

  const achievements = [
    { icon: '🎯', title: 'First Login', description: 'Welcome to ARYA!', earned: true },
    { icon: '📚', title: 'Study Warrior', description: 'Complete 5 study sessions', earned: true },
    { icon: '💪', title: 'Fitness Beast', description: 'Complete 10 workouts', earned: true },
    { icon: '🎤', title: 'Interview Pro', description: 'Complete 5 mock interviews', earned: true },
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

  const LeaderboardItem = ({ item }) => (
    <AryaCard 
      variant="elevated" 
      elevation={item.isCurrentUser ? 3 : 1}
      style={[styles.leaderboardItem, item.isCurrentUser && styles.currentUserItem]}
      padding="medium"
    >
      <View style={styles.leaderboardContent}>
        <View style={styles.leaderboardLeft}>
          <View style={[styles.rankBadge, item.rank <= 3 && styles.topRankBadge]}>
            <AryaText.Label color={item.rank <= 3 ? '#FFFFFF' : '#666'} weight="bold">
              #{item.rank}
            </AryaText.Label>
          </View>
          <AryaText style={styles.leaderboardAvatar}>{item.avatar}</AryaText>
          <View style={styles.leaderboardInfo}>
            <AryaText.Body 
              color={item.isCurrentUser ? '#4169E1' : '#1a1a1a'} 
              weight={item.isCurrentUser ? 'bold' : 'medium'}
            >
              {item.name}
            </AryaText.Body>
            <AryaText.Caption color="#666">
              {item.score} points
            </AryaText.Caption>
          </View>
        </View>
        {item.isCurrentUser && (
          <View style={styles.currentUserBadge}>
            <AryaText.Caption color="#4169E1" weight="semibold">You</AryaText.Caption>
          </View>
        )}
      </View>
    </AryaCard>
  );

  const AchievementCard = ({ achievement }) => (
    <AryaCard 
      variant="elevated" 
      elevation={achievement.earned ? 2 : 1}
      style={[
        styles.achievementCard,
        achievement.earned ? styles.earnedAchievement : styles.lockedAchievement
      ]}
      padding="medium"
    >
      <View style={[styles.achievementIconWrapper, achievement.earned ? styles.earnedIconWrapper : styles.lockedIconWrapper]}>
        <AryaText style={styles.achievementIcon}>
          {achievement.earned ? achievement.icon : '🔒'}
        </AryaText>
      </View>
      <View style={styles.achievementInfo}>
        <AryaText.Body 
          color={achievement.earned ? '#1a1a1a' : '#999'} 
          weight="semibold"
          style={styles.achievementTitle}
        >
          {achievement.title}
        </AryaText.Body>
        <AryaText.Caption 
          color={achievement.earned ? '#666' : '#999'}
          style={styles.achievementDescription}
        >
          {achievement.description}
        </AryaText.Caption>
      </View>
      {achievement.earned && (
        <View style={styles.achievementBadge}>
          <AryaText.Caption color="#4169E1" weight="bold">✓</AryaText.Caption>
        </View>
      )}
    </AryaCard>
  );

  const SettingsItem = ({ option }) => (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsLeft}>
        <AryaText style={styles.settingsIcon}>{option.icon}</AryaText>
        <AryaText.Body color="#1a1a1a" weight="medium">{option.title}</AryaText.Body>
      </View>
      {option.hasSwitch ? (
        <Switch
          value={option.value}
          onValueChange={option.onToggle}
          color="#4169E1"
        />
      ) : (
        <AryaText style={styles.settingsArrow}>›</AryaText>
      )}
    </TouchableOpacity>
  );

  return (
    <AryaScreen statusBarStyle="dark-content" backgroundColor="#FAFAFA">
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <AryaText.Display color="#4169E1" weight="bold">
            Profile
          </AryaText.Display>
        </View>

        {/* Profile Card */}
        <View style={styles.profileSection}>
          <AryaCard variant="elevated" elevation={3} style={styles.profileCard} padding="large">
            <AryaContainer center>
              <Avatar.Image 
                size={80} 
                source={{ uri: user?.photo || 'https://via.placeholder.com/100' }}
                style={styles.avatar}
              />
              <AryaText.Title color="#1a1a1a" weight="bold" style={styles.userName}>
                {user?.name || 'NDA Aspirant'}
              </AryaText.Title>
              <AryaText.Body color="#666" style={styles.userEmail}>
                {user?.email || 'cadet@nda.edu'}
              </AryaText.Body>
              <AryaText.Caption color="#999" style={styles.joinDate}>
                Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'Today'}
              </AryaText.Caption>
            </AryaContainer>
          </AryaCard>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsSection}>
          <View style={styles.statsGrid}>
            <AryaCard variant="elevated" elevation={1} style={styles.statCard} padding="medium">
              <AryaContainer center>
                <AryaText.Title color="#4169E1" weight="bold">25</AryaText.Title>
                <AryaText.Caption color="#666">Hour</AryaText.Caption>
              </AryaContainer>
            </AryaCard>
            
            <AryaCard variant="elevated" elevation={1} style={styles.statCard} padding="medium">
              <AryaContainer center>
                <AryaText.Title color="#4169E1" weight="bold">18</AryaText.Title>
                <AryaText.Caption color="#666">Work</AryaText.Caption>
              </AryaContainer>
            </AryaCard>
            
            <AryaCard variant="elevated" elevation={1} style={styles.statCard} padding="medium">
              <AryaContainer center>
                <AryaText.Title color="#4169E1" weight="bold">12</AryaText.Title>
                <AryaText.Caption color="#666">INTV</AryaText.Caption>
              </AryaContainer>
            </AryaCard>
          </View>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <AryaText.Headline color="#1a1a1a" weight="semibold" style={styles.sectionTitle}>
            🏆 Leaderboard
          </AryaText.Headline>
          
          {leaderboardData.map((item, index) => (
            <LeaderboardItem key={index} item={item} />
          ))}
          
          <TouchableOpacity style={styles.viewAllButton}>
            <AryaText.Body color="#4169E1" weight="semibold">View Full Leaderboard</AryaText.Body>
          </TouchableOpacity>
        </View>

        {/* Achievements Section */}
        <View style={styles.achievementsSection}>
          <AryaText.Headline color="#1a1a1a" weight="semibold" style={styles.sectionTitle}>
            🏆 Achievements
          </AryaText.Headline>
          {achievements.map((achievement, index) => (
            <AchievementCard key={index} achievement={achievement} />
          ))}
        </View>

        {/* Settings Section */}
        <View style={styles.settingsSection}>
          <AryaText.Headline color="#1a1a1a" weight="semibold" style={styles.sectionTitle}>
            ⚙️ Settings
          </AryaText.Headline>
          <AryaCard variant="elevated" elevation={1} style={styles.settingsCard}>
            {settingsOptions.map((option, index) => (
              <View key={index}>
                <SettingsItem option={option} />
                {index < settingsOptions.length - 1 && <View style={styles.settingsDivider} />}
              </View>
            ))}
          </AryaCard>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <AryaText.Body color="#E74C3C" weight="semibold">
              🚪 Sign Out
            </AryaText.Body>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </AryaScreen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollContent: {
    paddingBottom: 120, // Extra space for tab bar
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
  },
  
  // Profile Section
  profileSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    marginBottom: 12,
  },
  userName: {
    marginBottom: 4,
  },
  userEmail: {
    marginBottom: 4,
  },
  joinDate: {
    fontStyle: 'italic',
  },
  
  // Stats Section
  statsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  
  // Leaderboard Section
  leaderboardSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  leaderboardItem: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  currentUserItem: {
    backgroundColor: '#F0F4FF',
    borderWidth: 1,
    borderColor: '#4169E1',
  },
  leaderboardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topRankBadge: {
    backgroundColor: '#4169E1',
  },
  leaderboardAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  leaderboardInfo: {
    flex: 1,
  },
  currentUserBadge: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewAllButton: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
  },
  
  // Achievements Section
  achievementsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
  },
  earnedAchievement: {
    backgroundColor: '#FFFFFF',
  },
  lockedAchievement: {
    backgroundColor: '#F8F9FA',
  },
  achievementIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnedIconWrapper: {
    backgroundColor: '#F0F4FF',
  },
  lockedIconWrapper: {
    backgroundColor: '#F5F5F5',
  },
  achievementIcon: {
    fontSize: 24,
  },
  lockedIcon: {
    opacity: 0.5,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    marginBottom: 2,
  },
  achievementDescription: {
    // No additional styles needed
  },
  achievementBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Settings Section
  settingsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  settingsCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingsIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  settingsArrow: {
    fontSize: 20,
    color: '#ddd',
    fontWeight: '300',
  },
  settingsDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 52,
  },
  
  // Logout Section
  logoutSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE8E8',
    paddingVertical: 16,
    alignItems: 'center',
  },
});

export default ProfileScreen;