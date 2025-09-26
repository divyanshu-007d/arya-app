/**
 * Dashboard Screen - Modern NDA Readiness Overview
 * Beautiful dashboard with progress indicators and daily missions
 */
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  StatusBar,
} from 'react-native';
import {
  Text,
  Card,
  Surface,
  ProgressBar,
  Chip,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../context/AuthContext';

const { width, height } = Dimensions.get('window');

const DashboardScreen = () => {
  const { user } = useAuth();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const ReadinessGauge = ({ percentage }) => (
    <Surface style={styles.gaugeContainer} elevation={8}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gaugeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.gaugePercentage}>{percentage}%</Text>
        <Text style={styles.gaugeLabel}>NDA Ready</Text>
      </LinearGradient>
    </Surface>
  );

  const StatsCard = ({ icon, title, value, color, subtitle }) => (
    <Card style={styles.statsCard} elevation={4}>
      <LinearGradient
        colors={[color, `${color}CC`]}
        style={styles.statsGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card.Content style={styles.statsContent}>
          <Text style={styles.statsIcon}>{icon}</Text>
          <Text style={styles.statsValue}>{value}</Text>
          <Text style={styles.statsTitle}>{title}</Text>
          <Text style={styles.statsSubtitle}>{subtitle}</Text>
        </Card.Content>
      </LinearGradient>
    </Card>
  );

  const DailyMission = ({ icon, title, progress, isCompleted }) => (
    <Surface style={styles.missionCard} elevation={2}>
      <View style={styles.missionContent}>
        <View style={styles.missionHeader}>
          <Text style={styles.missionIcon}>{icon}</Text>
          <View style={styles.missionInfo}>
            <Text style={styles.missionTitle}>{title}</Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={progress}
                color="#667eea"
                style={styles.progressBar}
              />
              <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </View>
          </View>
          {isCompleted && (
            <Chip icon="check" style={styles.completedChip} textStyle={styles.chipText}>
              Done
            </Chip>
          )}
        </View>
      </View>
    </Surface>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      <LinearGradient
        colors={['#f8f9fa', '#e9ecef']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          
          <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            bounces={true}
          >
            
            {/* Header */}
            <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <Text style={styles.headerSubtitle}>Your NDA preparation overview</Text>
            </Animated.View>

            {/* NDA Readiness Gauge */}
            <Animated.View style={[styles.gaugeSection, { opacity: fadeAnim }]}>
              <ReadinessGauge percentage={15} />
              <Text style={styles.gaugeDescription}>
                Keep training consistently to boost your readiness score!
              </Text>
            </Animated.View>

            {/* Stats Grid */}
            <Animated.View style={[styles.statsSection, { opacity: fadeAnim }]}>
              <Text style={styles.sectionTitle}>Performance Stats</Text>
              
              <View style={styles.statsGrid}>
                <StatsCard
                  icon="🧠"
                  title="Study"
                  value="0"
                  color="#6c5ce7"
                  subtitle="Sessions today"
                />
                
                <StatsCard
                  icon="💪"
                  title="Fitness"
                  value="0"
                  color="#fd79a8"
                  subtitle="Workouts done"
                />
                
                <StatsCard
                  icon="🎤"
                  title="Interview"
                  value="0"
                  color="#fdcb6e"
                  subtitle="Practice rounds"
                />
                
                <StatsCard
                  icon="🏆"
                  title="Points"
                  value="0"
                  color="#00b894"
                  subtitle="Total earned"
                />
              </View>
            </Animated.View>

            {/* Daily Missions */}
            <Animated.View style={[styles.missionsSection, { opacity: fadeAnim }]}>
              <Text style={styles.sectionTitle}>Today's Missions</Text>
              
              <DailyMission
                icon="📚"
                title="Complete 1 Study Session"
                progress={0}
                isCompleted={false}
              />
              
              <DailyMission
                icon="🏃‍♂️"
                title="Do 20 Push-ups"
                progress={0}
                isCompleted={false}
              />
              
              <DailyMission
                icon="🎯"
                title="Practice 1 Interview"
                progress={0}
                isCompleted={false}
              />
            </Animated.View>

            {/* Motivation Section */}
            <Animated.View style={[styles.motivationSection, { opacity: fadeAnim }]}>
              <Card style={styles.motivationCard} elevation={6}>
                <LinearGradient
                  colors={['#ff7675', '#fd79a8']}
                  style={styles.motivationGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Card.Content style={styles.motivationContent}>
                    <Text style={styles.motivationIcon}>🚀</Text>
                    <Text style={styles.motivationTitle}>
                      Ready to Start Training?
                    </Text>
                    <Text style={styles.motivationText}>
                      Every champion was once a beginner who refused to give up.
                      Your NDA journey starts with today's first step!
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
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2d3436',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#636e72',
    fontWeight: '500',
  },
  gaugeSection: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  gaugeContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
    overflow: 'hidden',
  },
  gaugeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugePercentage: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  gaugeLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
  },
  gaugeDescription: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statsCard: {
    width: (width - 72) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statsGradient: {
    padding: 20,
  },
  statsContent: {
    alignItems: 'center',
  },
  statsIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 2,
  },
  statsSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  missionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  missionCard: {
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  missionContent: {
    padding: 20,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  completedChip: {
    backgroundColor: '#00b894',
  },
  chipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  motivationSection: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Account for tab bar
  },
  motivationCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  motivationGradient: {
    padding: 24,
  },
  motivationContent: {
    alignItems: 'center',
  },
  motivationIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  motivationTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  motivationText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
});

export default DashboardScreen;