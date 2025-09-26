/**
 * AI Buddy Screen - Main Chat Interface
 * Multimodal AI chat for NDA preparation with file upload support
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  Card,
  TextInput,
  Button,
  Chip,
  Surface,
  IconButton,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');
const API_BASE = 'https://arya-backend-8iya.onrender.com/api/ai';

const AIBuddyScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm your NDA Study Assistant. I can help you with questions about Math, Physics, English, GK, and analyze your study materials!",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, [messages]);

  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      const result = await response.json();
      
      if (result.success && result.status === 'healthy') {
        console.log('✅ AI services are healthy');
      } else {
        console.warn('⚠️ AI services may have issues');
      }
    } catch (error) {
      console.error('❌ Cannot connect to AI backend:', error.message);
    }
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    setTimeout(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, 100);
  }, [messages]);

  useEffect(() => {
    // Check backend connection on component mount
    checkBackendConnection();
  }, []);

  const sendMessage = async (text = message) => {
    if (!text.trim()) return;

    const userMessageId = Date.now();
    const userMessage = {
      id: userMessageId,
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          conversationId: conversationId,
          context: 'study_help',
          history: messageHistory.slice(-6)
        })
      });

      const result = await response.json();

      if (result.success) {
        setConversationId(result.data.conversationId);
        
        const aiMessage = {
          id: userMessageId + 1,
          text: result.data.response,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, aiMessage]);

        setMessageHistory(prev => [
          ...prev,
          { role: 'user', content: text.trim() },
          { role: 'assistant', content: result.data.response }
        ]);
      } else {
        const errorMessage = {
          id: userMessageId + 1,
          text: `❌ Error: ${result.message || 'Something went wrong'}`,
          isUser: false,
          timestamp: new Date(),
          isError: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: userMessageId + 1,
        text: `❌ Connection Error. Check if backend is running.`,
        isUser: false,
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const MessageBubble = ({ message }) => (
    <View style={[
      styles.messageBubble,
      message.isUser ? styles.userMessage : styles.aiMessage
    ]}>
      <View 
        style={[
          styles.messageSurface,
          message.isUser ? styles.userSurface : styles.aiSurface,
          message.isError && styles.errorSurface
        ]} 
      >
        <Text style={[
          styles.messageText,
          message.isUser ? styles.userText : styles.aiText,
          message.isError && styles.errorText
        ]}>
          {message.text}
        </Text>
        
        <Text style={styles.timestamp}>
          {message.timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.container}
      >
        <SafeAreaView style={styles.safeArea}>
          
          {/* Simple Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>🤖 AI Study Buddy</Text>
          </View>

          {/* Main Chat Container */}
          <KeyboardAvoidingView 
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
          >
            
            {/* Messages ScrollView */}
            <ScrollView 
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={styles.messagesContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              
              {/* Loading indicator */}
              {isLoading && (
                <View style={styles.loadingContainer}>
                  <View style={styles.loadingSurface}>
                    <ActivityIndicator size="small" color="#667eea" />
                    <Text style={styles.loadingText}>AI is thinking...</Text>
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input Area - Fixed at bottom with proper padding */}
            <View style={styles.inputContainer}>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Ask me anything about NDA preparation..."
                  multiline
                  maxLength={500}
                  onSubmitEditing={() => sendMessage()}
                  returnKeyType="send"
                  blurOnSubmit={false}
                />
                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    { opacity: message.trim() && !isLoading ? 1 : 0.5 }
                  ]}
                  disabled={!message.trim() || isLoading}
                  onPress={() => sendMessage()}
                >
                  <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>

          </KeyboardAvoidingView>

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
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageBubble: {
    marginVertical: 4,
    maxWidth: width * 0.85,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageSurface: {
    padding: 12,
    borderRadius: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  userSurface: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  aiSurface: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  errorSurface: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F48FB1',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  aiText: {
    color: '#333333',
  },
  errorText: {
    color: '#D32F2F',
  },
  timestamp: {
    fontSize: 11,
    color: 'rgba(0,0,0,0.4)',
    marginTop: 4,
    textAlign: 'right',
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginVertical: 8,
  },
  loadingSurface: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16, // Account for home indicator
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginBottom: 80, // Reduced margin for smaller tab bar
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#F8F9FA',
  },
  sendButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AIBuddyScreen;