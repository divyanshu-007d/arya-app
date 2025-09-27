/**
 * ARYA Dashboard Screen - Clean iOS-style Redesign
 * Modern dashboard with white background and colorful cards
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import {
  ProgressBar,
  Chip,
  useTheme,
} from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import {
  AryaScreen,
  AryaCard,
  AryaText,
  AryaContainer,
} from '../../components/design-system';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const ReadinessGauge = ({ percentage }) => (
    <AryaCard 
      variant="elevated" 
      elevation={2}
      style={styles.gaugeContainer}
      padding="large"
    >
      <AryaContainer center>
        <View style={styles.gaugeCircle}>
          <AryaText.Display color="#4169E1" weight="bold" align="center">
            {percentage}%
          </AryaText.Display>
          <AryaText.Label color="#666" align="center" weight="semibold">
            Ready
          </AryaText.Label>
        </View>
      </AryaContainer>
    </AryaCard>
  );

  const StatsCard = ({ icon, title, value, color, subtitle }) => (
    <AryaCard 
      variant="elevated" 
      elevation={1}
      style={[styles.statsCard, { backgroundColor: color + '15' }]}
      padding="small"
    >
      <View style={styles.statsContent}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          <AryaText style={styles.statsIcon}>{icon}</AryaText>
        </View>
        <AryaText.Title weight="bold" color="#1a1a1a" style={styles.statsValue}>
          {value}
        </AryaText.Title>
        <AryaText.Body color="#666" style={styles.statsTitle}>
          {title}
        </AryaText.Body>
        <AryaText.Caption color="#999" style={styles.statsSubtitle}>
          {subtitle}
        </AryaText.Caption>
      </View>
    </AryaCard>
  );

  const MissionCard = ({ icon, title, progress, isCompleted }) => (
    <AryaCard variant="elevated" elevation={1} style={styles.missionCard}>
      <View style={styles.missionContent}>
        <View style={styles.missionLeft}>
          <View style={styles.missionIconContainer}>
            <AryaText style={styles.missionIcon}>{icon}</AryaText>
          </View>
          <View style={styles.missionInfo}>
            <AryaText.Body weight="semibold" color="#1a1a1a">
              {title}
            </AryaText.Body>
            <View style={styles.progressContainer}>
              <View style={styles.progressBarContainer}>
                <ProgressBar
                  progress={progress}
                  color="#4169E1"
                  style={styles.progressBar}
                />
              </View>
              <AryaText.Caption color="#4169E1" weight="semibold">
                {Math.round(progress * 100)}%
              </AryaText.Caption>
            </View>
          </View>
        </View>
        {isCompleted && (
          <Chip 
            icon="check" 
            style={styles.completedChip} 
            textStyle={styles.chipText}
          >
            Done
          </Chip>
        )}
      </View>
    </AryaCard>
  );

  return (
    <AryaScreen statusBarStyle="dark-content" backgroundColor="#FAFAFA">
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
        contentContainerStyle={styles.scrollContent}
      >
        
        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
          <AryaText.Display color="#1a1a1a" weight="bold">
            Dashboard
          </AryaText.Display>
          <AryaText.Body color="#666" style={styles.headerSubtitle}>
            Your preparation overview
          </AryaText.Body>
        </Animated.View>

        {/* Readiness Section */}
        <Animated.View style={[styles.readinessSection, { opacity: fadeAnim }]}>
          <AryaText.Headline color="#1a1a1a" weight="semibold" style={styles.sectionTitle}>
            Readiness Score
          </AryaText.Headline>
          <ReadinessGauge percentage={78} />
          <AryaText.Body color="#666" align="center" style={styles.gaugeDescription}>
            Keep training to boost your score! 🎯
          </AryaText.Body>
        </Animated.View>

        {/* Stats Grid */}
        <Animated.View style={[styles.statsSection, { opacity: fadeAnim }]}>
          <AryaText.Headline color="#1a1a1a" weight="semibold" style={styles.sectionTitle}>
            Today's Activity
          </AryaText.Headline>
          
          <View style={styles.statsGrid}>
            <View style={styles.statsRow}>
              <StatsCard
                icon="🧠"
                title="Study"
                value="3"
                color="#667eea"
                subtitle="Sessions"
              />
              
              <StatsCard
                icon="💪"
                title="Fitness"
                value="2"
                color="#f093fb"
                subtitle="Workouts"
              />
            </View>
            
            <View style={styles.statsRow}>
              <StatsCard
                icon="🎤"
                title="Interview"
                value="5"
                color="#fdcb6e"
                subtitle="Practice"
              />
              
              <StatsCard
                icon="🏆"
                title="Points"
                value="1,250"
                color="#00b894"
                subtitle="Earned"
              />
            </View>
          </View>
        </Animated.View>

        {/* Daily Missions */}
        <Animated.View style={[styles.missionsSection, { opacity: fadeAnim }]}>
          <AryaText.Headline color="#1a1a1a" weight="semibold" style={styles.sectionTitle}>
            Today's Goals
          </AryaText.Headline>
          
          <MissionCard
            icon="📚"
            title="Complete 1 Study Session"
            progress={0.6}
            isCompleted={false}
          />
          
          <MissionCard
            icon="🏃‍♂️"
            title="Do 20 Push-ups"
            progress={1.0}
            isCompleted={true}
          />
          
          <MissionCard
            icon="🎯"
            title="Practice Interview"
            progress={0.4}
            isCompleted={false}
          />
        </Animated.View>

        {/* Motivation Section */}
        <Animated.View style={[styles.motivationSection, { opacity: fadeAnim }]}>
          <AryaCard 
            variant="elevated" 
            elevation={2}
            style={styles.motivationCard}
            padding="large"
          >
            <AryaContainer center>
              <AryaText style={styles.motivationIcon}>🚀</AryaText>
              <AryaText.Title color="#1a1a1a" weight="bold" align="center" style={styles.motivationTitle}>
                Ready to Excel?
              </AryaText.Title>
              <AryaText.Body color="#666" align="center" style={styles.motivationText}>
                Every expert was once a beginner. Start your training journey today!
              </AryaText.Body>
            </AryaContainer>
          </AryaCard>
        </Animated.View>

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
    paddingBottom: 140, // Extra space for tab bar
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerSubtitle: {
    marginTop: 4,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  
  // Readiness Section
  readinessSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  gaugeContainer: {
    alignSelf: 'center',
    width: 160,
    height: 160,
    borderRadius: 80,
    marginVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  gaugeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#E8EFFF',
  },
  gaugeDescription: {
    marginTop: 8,
    fontStyle: 'italic',
  },
  
  // Stats Section
  statsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  statsGrid: {
    // Container for all stats cards
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 4, // Add small padding to create gap
  },
  statsCard: {
    width: (width - 48) / 2, // Adjusted for proper spacing: (screen width - padding - gap) / 2
    backgroundColor: '#FFFFFF',
    minHeight: 100, // Shorter card height
  },
  statsContent: {
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statsIcon: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  statsValue: {
    fontSize: 20,
    marginBottom: 1,
  },
  statsTitle: {
    fontSize: 13,
    marginBottom: 1,
  },
  statsSubtitle: {
    fontSize: 11,
  },
  
  // Missions Section
  missionsSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  missionCard: {
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  missionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  missionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  missionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  missionIcon: {
    fontSize: 20,
  },
  missionInfo: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  progressBarContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  completedChip: {
    backgroundColor: '#00b894',
    marginLeft: 12,
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Motivation Section
  motivationSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
  },
  motivationIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  motivationTitle: {
    marginBottom: 12,
  },
  motivationText: {
    lineHeight: 22,
  },
});

export default DashboardScreen;