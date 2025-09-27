/**
 * Drona Fitness WebView Screen
 * Displays the Drona fitness tracker web app and handles alerts to navigate back
 */
import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  BackHandler,
  Alert,
  Text,
} from 'react-native';
import {
  Appbar,
} from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const DroneWebViewScreen = ({ route }) => {
  const navigation = useNavigation();
  const webViewRef = useRef(null);
  const { exerciseName } = route.params || {};

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [navigation]);

  const handleNavigationStateChange = (navState) => {
    // Log the navigation for debugging
    console.log('WebView Navigation:', navState.url);
  };

  const handleMessage = (event) => {
    const data = event.nativeEvent.data;
    console.log('WebView Message:', data);
    
    try {
      const message = JSON.parse(data);
      if (message.type === 'alert' || message.type === 'workout_complete') {
        // Navigate back to fitness screen when there's an alert
        navigation.goBack();
      }
    } catch (error) {
      // If it's a regular alert message, also navigate back
      if (data.includes('alert') || data.includes('complete')) {
        navigation.goBack();
      }
    }
  };

  const injectedJavaScript = `
    // Override alert function to send message back to React Native
    const originalAlert = window.alert;
    window.alert = function(message) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'alert',
        message: message
      }));
      // Don't show the original alert - just send message to React Native
      return;
    };

    // Listen for workout completion or other events
    window.addEventListener('beforeunload', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'workout_complete'
      }));
    });

    // Custom event listeners for fitness tracker
    document.addEventListener('DOMContentLoaded', function() {
      // You can add custom listeners here for specific events from Drona app
      console.log('Drona Fitness Tracker Loaded for: ${exerciseName || 'Exercise'}');
    });

    true; // Required for injected JavaScript
  `;

  const handleError = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    console.error('WebView Error:', nativeEvent);
    
    Alert.alert(
      'Loading Error',
      'Unable to load the fitness tracker. Please check your internet connection.',
      [
        { text: 'Retry', onPress: () => webViewRef.current?.reload() },
        { text: 'Go Back', onPress: () => navigation.goBack() }
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor="#667eea" />
      
      <SafeAreaView style={styles.container}>
    

        {/* WebView */}
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://drona-official.web.app' }}
          style={styles.webview}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={handleMessage}
          onError={handleError}
          injectedJavaScript={injectedJavaScript}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading Drona Fitness Tracker...</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#667eea',
    elevation: 4,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 18,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
    marginTop: 16,
  },
});

export default DroneWebViewScreen;