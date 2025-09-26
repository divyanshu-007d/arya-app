/**
 * Interview Screen - SSB Mock Interview Simulator
 * AI-powered interview practice for NDA preparation
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
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
import * as WebBrowser from 'expo-web-browser';

const InterviewScreen = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedInterviewType, setSelectedInterviewType] = useState('');
  
  const interviewTypes = [
    { title: 'Personal Interview', icon: '👤', color: '#6c5ce7' },
    { title: 'Group Discussion', icon: '👥', color: '#fd79a8' },
    { title: 'Lecturette', icon: '🗣️', color: '#fdcb6e' },
    { title: 'Command Task', icon: '⚡', color: '#00b894' },
  ];

  const mockQuestions = [
    "Tell me about yourself and why you want to join the NDA.",
    "Describe a challenging situation you've faced and how you handled it.",
    "What leadership qualities do you possess?",
    "How do you handle pressure and stress?",
    "What is your greatest strength and weakness?",
  ];

  const handleStartInterview = (type) => {
    Alert.alert(
      `Start ${type} Practice?`,
      'This will open the NDA interview in your browser.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Interview',
          style: 'default',
          onPress: async () => {
            try {
              await WebBrowser.openBrowserAsync('https://lab.anam.ai/share/T6ku1CFoOoCHOf3MrccQO');
            } catch (error) {
              Alert.alert('Error', 'Unable to open the interview. Please try again.');
            }
          }
        }
      ]
    );
  };

  const InterviewTypeCard = ({ type, onPress }) => (
    <Card style={styles.typeCard} elevation={4}>
      <LinearGradient
        colors={[type.color, `${type.color}CC`]}
        style={styles.typeGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card.Content style={styles.typeContent} onPress={() => onPress(type.title)}>
          <Text style={styles.typeIcon}>{type.icon}</Text>
          <Text style={styles.typeTitle}>{type.title}</Text>
          <Button
            mode="contained"
            onPress={() => onPress(type.title)}
            style={styles.startButton}
            labelStyle={styles.buttonLabel}
          >
            Start Practice
          </Button>
        </Card.Content>
      </LinearGradient>
    </Card>
  );

  if (isInterviewActive) {
    // This section is no longer needed since we use WebBrowser
    return null;
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>🎤 Interview Practice</Text>
              <Text style={styles.headerSubtitle}>
                Master your SSB interview with AI-powered practice
              </Text>
            </View>

            {/* Interview Types */}
            <View style={styles.typesSection}>
              <Text style={styles.sectionTitle}>Choose Interview Type</Text>
              
              {interviewTypes.map((type, index) => (
                <InterviewTypeCard
                  key={index}
                  type={type}
                  onPress={handleStartInterview}
                />
              ))}
            </View>

            {/* Stats Section */}
            <View style={styles.statsSection}>
              <Card style={styles.statsCard} elevation={6}>
                <Card.Content style={styles.statsContent}>
                  <Text style={styles.statsTitle}>Your Progress 📊</Text>
                  
                  <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Interviews</Text>
                    </View>
                    
                    <View style={styles.statDivider} />
                    
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Avg Score</Text>
                    </View>
                    
                    <View style={styles.statDivider} />
                    
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Confidence</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>

          </ScrollView>
        </SafeAreaView>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    alignItems: 'center',
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
    textAlign: 'center',
    fontWeight: '500',
  },
  typesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  typeCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
  },
  typeGradient: {
    padding: 24,
  },
  typeContent: {
    alignItems: 'center',
  },
  typeIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  typeTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
  },
  buttonLabel: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 14,
  },
  // Interview WebView Styles
  interviewContainer: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  interviewHeader: {
    backgroundColor: '#667eea',
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
  webview: {
    flex: 1,
  },
  bottomControls: {
    padding: 20,
    backgroundColor: '#667eea',
  },
  endButton: {
    borderRadius: 12,
    paddingVertical: 8,
  },
  endButtonLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  // Original Interview Active Styles (keeping for reference but unused now)
  interviewHeader: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  interviewTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  questionCounter: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  progressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
  },
  questionSection: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  questionCard: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  questionContent: {
    padding: 32,
    alignItems: 'center',
  },
  questionNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fdcb6e',
    marginBottom: 16,
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2d3436',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 32,
  },
  responseArea: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
  },
  responseIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  responseText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 8,
  },
  responseHint: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
  },
  controlsSection: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 120, // Account for tab bar
    justifyContent: 'space-between',
  },
  controlButton: {
    flex: 0.45,
    borderRadius: 12,
  },
  outlineButtonLabel: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  // Stats Section
  statsSection: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  statsCard: {
    borderRadius: 20,
    overflow: 'hidden',
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
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#fdcb6e',
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
});

export default InterviewScreen;