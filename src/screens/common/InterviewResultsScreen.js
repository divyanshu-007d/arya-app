/**
 * Interview Results Screen
 * Shows demo interview feedback and analysis
 */
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import {
  Text,
  Card,
  Button,
  Surface,
  Chip,
  ProgressBar,
  Appbar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const InterviewResultsScreen = ({ route }) => {
  const navigation = useNavigation();
  const { interviewType, duration, startTime } = route.params || {};

  // Mock interview results data
  const interviewResults = {
    overallScore: 78,
    confidence: 85,
    clarity: 72,
    content: 80,
    areas: [
      {
        title: 'Leadership Qualities',
        score: 85,
        feedback: 'Excellent examples provided. Continue to develop team management skills.',
        color: '#00b894'
      },
      {
        title: 'Communication Skills',
        score: 72,
        feedback: 'Good clarity but could improve on conciseness. Practice structuring answers.',
        color: '#fdcb6e'
      },
      {
        title: 'Current Affairs Knowledge',
        score: 65,
        feedback: 'Basic knowledge shown. Focus more on defense and national security topics.',
        color: '#fd79a8'
      },
      {
        title: 'Problem Solving',
        score: 82,
        feedback: 'Strong analytical thinking demonstrated. Keep practicing with real scenarios.',
        color: '#6c5ce7'
      }
    ],
    recommendations: [
      '📚 Study current defense policies and recent military developments',
      '🗣️ Practice speaking clearly and concisely in interviews',
      '💪 Work on showcasing leadership examples from personal experience',
      '📖 Read about famous military leaders and their strategies',
      '🎯 Practice mock interviews regularly to build confidence'
    ]
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#00b894';
    if (score >= 60) return '#fdcb6e';
    return '#fd79a8';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Header */}
          <Appbar.Header style={styles.header}>
            <Appbar.BackAction onPress={() => navigation.goBack()} color="#FFFFFF" />
            <Appbar.Content 
              title="🎖️ Interview Results"
              subtitle="Performance Analysis"
              titleStyle={styles.headerTitle}
              subtitleStyle={styles.headerSubtitle}
            />
          </Appbar.Header>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            {/* Session Info */}
            <Card style={styles.sessionCard} elevation={6}>
              <Card.Content style={styles.sessionContent}>
                <Text style={styles.sessionTitle}>Interview Session Completed! 🎉</Text>
                <View style={styles.sessionDetails}>
                  <View style={styles.sessionItem}>
                    <Text style={styles.sessionLabel}>Type:</Text>
                    <Text style={styles.sessionValue}>{interviewType || 'Personal Interview'}</Text>
                  </View>
                  <View style={styles.sessionItem}>
                    <Text style={styles.sessionLabel}>Duration:</Text>
                    <Text style={styles.sessionValue}>{formatDuration(duration || 0)}</Text>
                  </View>
                  <View style={styles.sessionItem}>
                    <Text style={styles.sessionLabel}>Started at:</Text>
                    <Text style={styles.sessionValue}>{startTime || 'N/A'}</Text>
                  </View>
                </View>
              </Card.Content>
            </Card>

            {/* Overall Score */}
            <Card style={styles.scoreCard} elevation={6}>
              <LinearGradient
                colors={[getScoreColor(interviewResults.overallScore), `${getScoreColor(interviewResults.overallScore)}CC`]}
                style={styles.scoreGradient}
              >
                <Card.Content style={styles.scoreContent}>
                  <Text style={styles.scoreNumber}>{interviewResults.overallScore}%</Text>
                  <Text style={styles.scoreLabel}>Overall Performance</Text>
                  <Chip style={styles.scoreChip} textStyle={styles.scoreChipText}>
                    {getScoreLabel(interviewResults.overallScore)}
                  </Chip>
                </Card.Content>
              </LinearGradient>
            </Card>

            {/* Performance Metrics */}
            <Card style={styles.metricsCard} elevation={6}>
              <Card.Content style={styles.metricsContent}>
                <Text style={styles.metricsTitle}>Performance Breakdown</Text>
                
                <View style={styles.metricItem}>
                  <View style={styles.metricHeader}>
                    <Text style={styles.metricLabel}>Confidence</Text>
                    <Text style={styles.metricValue}>{interviewResults.confidence}%</Text>
                  </View>
                  <ProgressBar
                    progress={interviewResults.confidence / 100}
                    color={getScoreColor(interviewResults.confidence)}
                    style={styles.progressBar}
                  />
                </View>

                <View style={styles.metricItem}>
                  <View style={styles.metricHeader}>
                    <Text style={styles.metricLabel}>Clarity</Text>
                    <Text style={styles.metricValue}>{interviewResults.clarity}%</Text>
                  </View>
                  <ProgressBar
                    progress={interviewResults.clarity / 100}
                    color={getScoreColor(interviewResults.clarity)}
                    style={styles.progressBar}
                  />
                </View>

                <View style={styles.metricItem}>
                  <View style={styles.metricHeader}>
                    <Text style={styles.metricLabel}>Content Quality</Text>
                    <Text style={styles.metricValue}>{interviewResults.content}%</Text>
                  </View>
                  <ProgressBar
                    progress={interviewResults.content / 100}
                    color={getScoreColor(interviewResults.content)}
                    style={styles.progressBar}
                  />
                </View>
              </Card.Content>
            </Card>

            {/* Areas to Focus */}
            <View style={styles.areasSection}>
              <Text style={styles.sectionTitle}>Areas to Focus On</Text>
              
              {interviewResults.areas.map((area, index) => (
                <Card key={index} style={styles.areaCard} elevation={4}>
                  <LinearGradient
                    colors={[area.color, `${area.color}CC`]}
                    style={styles.areaGradient}
                  >
                    <Card.Content style={styles.areaContent}>
                      <View style={styles.areaHeader}>
                        <Text style={styles.areaTitle}>{area.title}</Text>
                        <Chip style={styles.areaScore} textStyle={styles.areaScoreText}>
                          {area.score}%
                        </Chip>
                      </View>
                      <Text style={styles.areaFeedback}>{area.feedback}</Text>
                    </Card.Content>
                  </LinearGradient>
                </Card>
              ))}
            </View>

            {/* Recommendations */}
            <Card style={styles.recommendationsCard} elevation={6}>
              <Card.Content style={styles.recommendationsContent}>
                <Text style={styles.recommendationsTitle}>📝 Recommendations for Improvement</Text>
                
                {interviewResults.recommendations.map((recommendation, index) => (
                  <Surface key={index} style={styles.recommendationItem} elevation={2}>
                    <Text style={styles.recommendationText}>{recommendation}</Text>
                  </Surface>
                ))}
              </Card.Content>
            </Card>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Button
                mode="outlined"
                onPress={() => navigation.goBack()}
                style={styles.actionButton}
                labelStyle={styles.outlineButtonLabel}
                buttonColor="transparent"
                textColor="#FFFFFF"
              >
                Try Again
              </Button>
              
              <Button
                mode="contained"
                onPress={() => navigation.navigate('CadetTabs')}
                style={styles.actionButton}
                labelStyle={styles.containedButtonLabel}
                buttonColor="#FFFFFF"
                textColor="#667eea"
              >
                Back to Home
              </Button>
            </View>

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
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sessionCard: {
    borderRadius: 16,
    marginBottom: 16,
  },
  sessionContent: {
    padding: 20,
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3436',
    textAlign: 'center',
    marginBottom: 16,
  },
  sessionDetails: {
    gap: 8,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionLabel: {
    fontSize: 14,
    color: '#636e72',
    fontWeight: '500',
  },
  sessionValue: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '600',
  },
  scoreCard: {
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
  },
  scoreGradient: {
    padding: 32,
  },
  scoreContent: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '600',
    marginBottom: 12,
  },
  scoreChip: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  scoreChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  metricsCard: {
    borderRadius: 16,
    marginBottom: 16,
  },
  metricsContent: {
    padding: 20,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  metricItem: {
    marginBottom: 16,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 14,
    color: '#2d3436',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '700',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  areasSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  areaCard: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  areaGradient: {
    padding: 16,
  },
  areaContent: {
    gap: 8,
  },
  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  areaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  areaScore: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  areaScoreText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  areaFeedback: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  recommendationsCard: {
    borderRadius: 16,
    marginBottom: 20,
  },
  recommendationsContent: {
    padding: 20,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  recommendationItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  recommendationText: {
    fontSize: 14,
    color: '#2d3436',
    lineHeight: 20,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 40,
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 6,
  },
  outlineButtonLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
  containedButtonLabel: {
    fontWeight: '600',
    fontSize: 14,
  },
});

export default InterviewResultsScreen;