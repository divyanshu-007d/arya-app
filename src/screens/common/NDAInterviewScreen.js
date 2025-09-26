/**
 * NDA Interview WebView Screen
 * Simple WebView for conducting mock NDA interviews
 */
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Alert,
} from 'react-native';
import {
  Appbar,
  Button,
} from 'react-native-paper';
import { WebView } from 'react-native-webview';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const NDAInterviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { interviewType } = route.params || {};
  const [interviewStartTime] = useState(new Date());

  const handleEndInterview = () => {
    Alert.alert(
      'End Interview?',
      'Are you sure you want to end the interview session?',
      [
        { text: 'Continue', style: 'cancel' },
        {
          text: 'End Interview',
          style: 'destructive',
          onPress: () => {
            const interviewDuration = Math.floor((new Date() - interviewStartTime) / 1000);
            // Navigate to results screen with interview data
            navigation.replace('InterviewResults', {
              interviewType,
              duration: interviewDuration,
              startTime: interviewStartTime.toLocaleTimeString(),
            });
          }
        }
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#667eea" />
      
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Appbar.Header style={styles.header}>
          <Appbar.Content 
            title="🎖️ NDA Interview"
            subtitle={`${interviewType || 'Personal Interview'} Session`}
            titleStyle={styles.headerTitle}
            subtitleStyle={styles.headerSubtitle}
          />
        </Appbar.Header>

        {/* WebView - Real Interview */}
        <WebView
          source={{ uri: 'https://lab.anam.ai/share/T6ku1CFoOoCHOf3MrccQO' }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          scalesPageToFit={true}
          mixedContentMode="compatibility"
          allowsInlineMediaPlayback={true}
          mediaPlaybackRequiresUserAction={false}
          onNavigationStateChange={(navState) => {
            console.log('Interview WebView Navigation:', navState.url);
          }}
          onMessage={(event) => {
            const data = event.nativeEvent.data;
            console.log('Interview WebView Message:', data);
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.error('Interview WebView Error:', nativeEvent);
          }}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading NDA Interview...</Text>
            </View>
          )}
        />

        {/* End Interview Button */}
        <View style={styles.bottomControls}>
          <Button
            mode="contained"
            onPress={handleEndInterview}
            style={styles.endButton}
            labelStyle={styles.endButtonLabel}
            buttonColor="#e74c3c"
          >
            End Interview
          </Button>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
  },
  header: {
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#667eea',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
});

export default NDAInterviewScreen;