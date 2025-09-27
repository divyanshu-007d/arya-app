/**
 * Drona Fitness WebBrowser Screen
 * Opens the Drona fitness tracker web app in the system browser
 */
import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Card,
  Title,
  Paragraph,
} from 'react-native-paper';
import * as WebBrowser from 'expo-web-browser';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const DroneWebViewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { exerciseName } = route.params || {};

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const openDronaWebsite = async () => {
    try {
      const result = await WebBrowser.openBrowserAsync('https://drona-official.web.app/');
      console.log('WebBrowser result:', result);
      
      // Navigate back when the browser is closed
      if (result.type === 'cancel' || result.type === 'dismiss') {
        // User closed the browser, stay on current screen
        console.log('User closed the browser');
      }
    } catch (error) {
      console.error('Error opening browser:', error);
      Alert.alert(
        'Error',
        'Unable to open the fitness tracker. Please try again.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  // Automatically open the browser when the screen loads
  useEffect(() => {
    openDronaWebsite();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#667eea" />
      
      <SafeAreaView style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Drona Fitness Tracker</Title>
            <Paragraph style={styles.subtitle}>
              {exerciseName ? `Starting ${exerciseName}` : 'Opening fitness tracker...'}
            </Paragraph>
            <Text style={styles.description}>
              The Drona fitness tracker will open in your default browser for the best experience.
            </Text>
            <Button 
              mode="contained" 
              onPress={openDronaWebsite}
              style={styles.button}
              contentStyle={styles.buttonContent}
            >
              Open Drona Fitness Tracker
            </Button>
            <Button 
              mode="outlined" 
              onPress={() => navigation.goBack()}
              style={styles.backButton}
              contentStyle={styles.buttonContent}
            >
              Go Back
            </Button>
          </Card.Content>
        </Card>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 8,
    borderRadius: 12,
  },
  title: {
    textAlign: 'center',
    color: '#667eea',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 16,
    marginBottom: 16,
  },
  description: {
    textAlign: 'center',
    color: '#888888',
    fontSize: 14,
    marginBottom: 24,
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#667eea',
    marginBottom: 12,
    borderRadius: 8,
  },
  backButton: {
    borderColor: '#667eea',
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default DroneWebViewScreen;