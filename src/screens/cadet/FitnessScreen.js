/**
 * Fitness Screen - Exercise Tracking & NDA Standards
 * Beautiful fitness interface with modern design
 */
import React, { useState } from 'react';
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
  Button,
  Surface,
  ProgressBar,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const FitnessScreen = () => {
  const [selectedGender, setSelectedGender] = useState('male');
  const navigation = useNavigation();
  
  const exercises = [
    { 
      name: 'Push-ups', 
      icon: '💪', 
      current: 0, 
      target: selectedGender === 'male' ? 40 : 20,
      color: '#fd79a8'
    },
    { 
      name: 'Running', 
      icon: '🏃‍♂️', 
      current: 0, 
      target: selectedGender === 'male' ? 350 : 400, 
      unit: 'sec',
      color: '#00b894'
    },
    { 
      name: 'Sit-ups', 
      icon: '🤸‍♀️', 
      current: 0, 
      target: selectedGender === 'male' ? 30 : 25,
      color: '#6c5ce7'
    },
  ];

  const handleStartExercise = (exercise) => {
    Alert.alert(
      `Start ${exercise.name} Training?`,
      'This will open the Fitness Tracker to guide you through the exercise.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Start Training',
          style: 'default',
          onPress: () => {
            // Navigate to WebView screen
            navigation.navigate('DroneWebView', {
              exerciseName: exercise.name,
              exerciseIcon: exercise.icon,
              target: exercise.target,
              unit: exercise.unit || 'reps'
            });
          }
        }
      ]
    );
  };

  const ExerciseCard = ({ exercise }) => (
    <Card style={styles.exerciseCard} elevation={6}>
      <LinearGradient
        colors={[exercise.color, `${exercise.color}CC`]}
        style={styles.exerciseGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Card.Content style={styles.exerciseContent}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseTarget}>
                Target: {exercise.target} {exercise.unit || 'reps'}
              </Text>
            </View>
          </View>
          
          <View style={styles.progressSection}>
            <Text style={styles.currentValue}>
              {exercise.current} / {exercise.target}
            </Text>
            <ProgressBar
              progress={exercise.current / exercise.target}
              color="rgba(255,255,255,0.9)"
              style={styles.exerciseProgress}
            />
          </View>

          <Button
            mode="contained"
            onPress={() => handleStartExercise(exercise)}
            style={styles.exerciseButton}
            labelStyle={styles.exerciseButtonLabel}
          >
            Start Training
          </Button>
        </Card.Content>
      </LinearGradient>
    </Card>
  );

  const GenderSelector = () => (
    <View style={styles.genderContainer}>
      <Text style={styles.genderLabel}>NDA Standards for:</Text>
      <View style={styles.genderButtons}>
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'male' && styles.selectedGender
          ]}
          onPress={() => setSelectedGender('male')}
        >
          <Text style={[
            styles.genderText,
            selectedGender === 'male' && styles.selectedGenderText
          ]}>
            👨 Male
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.genderButton,
            selectedGender === 'female' && styles.selectedGender
          ]}
          onPress={() => setSelectedGender('female')}
        >
          <Text style={[
            styles.genderText,
            selectedGender === 'female' && styles.selectedGenderText
          ]}>
            👩 Female
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
      
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>💪 Fitness Tracker</Text>
              <Text style={styles.headerSubtitle}>
                Train to NDA physical standards with AI guidance
              </Text>
            </View>

            {/* Gender Selector */}
            <GenderSelector />

            {/* Exercises */}
            <View style={styles.exercisesSection}>
              <Text style={styles.sectionTitle}>Training Exercises</Text>
              
              {exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} />
              ))}
            </View>

            {/* Today's Stats */}
            <View style={styles.statsSection}>
              <Card style={styles.statsCard} elevation={6}>
                <Card.Content style={styles.statsContent}>
                  <Text style={styles.statsTitle}>Today's Progress 📊</Text>
                  
                  <View style={styles.statsGrid}>
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Workouts</Text>
                    </View>
                    
                    <View style={styles.statDivider} />
                    
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Calories</Text>
                    </View>
                    
                    <View style={styles.statDivider} />
                    
                    <View style={styles.statItem}>
                      <Text style={styles.statNumber}>0</Text>
                      <Text style={styles.statLabel}>Minutes</Text>
                    </View>
                  </View>
                </Card.Content>
              </Card>
            </View>

            {/* Motivation Card */}
            <View style={styles.motivationSection}>
              <Card style={styles.motivationCard} elevation={6}>
                <LinearGradient
                  colors={['#74b9ff', '#0984e3']}
                  style={styles.motivationGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Card.Content style={styles.motivationContent}>
                    <Text style={styles.motivationIcon}>🎯</Text>
                    <Text style={styles.motivationTitle}>
                      Physical Fitness is Key!
                    </Text>
                    <Text style={styles.motivationText}>
                      NDA requires both mental and physical excellence. Start your fitness journey today and build the strength of a future officer!
                    </Text>
                  </Card.Content>
                </LinearGradient>
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
  genderContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
    alignItems: 'center',
  },
  genderLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2d3436',
    marginBottom: 12,
  },
  genderButtons: {
    flexDirection: 'row',
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    padding: 4,
  },
  genderButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  selectedGender: {
    backgroundColor: '#667eea',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  selectedGenderText: {
    color: '#FFFFFF',
  },
  exercisesSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 16,
  },
  exerciseCard: {
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
  },
  exerciseGradient: {
    padding: 24,
  },
  exerciseContent: {
    alignItems: 'center',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  exerciseIcon: {
    fontSize: 40,
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  exerciseTarget: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  progressSection: {
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  currentValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  exerciseProgress: {
    width: '100%',
    height: 6,
    borderRadius: 3,
  },
  exerciseButton: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    paddingHorizontal: 32,
  },
  exerciseButtonLabel: {
    color: '#333333',
    fontWeight: '600',
    fontSize: 16,
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
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
    color: '#fd79a8',
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

export default FitnessScreen;