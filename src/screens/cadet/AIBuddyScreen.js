/**
 * AI Buddy Screen - Modern Chat Interface
 * Clean, iOS-style chat interface for NDA preparation
 */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Text,
  Alert,
  Image,
} from 'react-native';
import {
  TextInput,
  IconButton,
} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import {
  AryaScreen,
  AryaCard,
  AryaText,
  AryaContainer,
} from '../../components/design-system';

const { width } = Dimensions.get('window');
const API_BASE = 'https://arya-backend-8iya.onrender.com/api/ai';

const AIBuddyScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! 👋 I'm your AI Study Assistant for NDA preparation. I can help you with:\n\n• Mathematics & Physics concepts\n• English & General Knowledge\n• Study strategies & tips\n• Mock tests & practice\n\nWhat would you like to learn today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [attachments, setAttachments] = useState([]);
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

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to upload images.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
        base64: true,
      });

      if (!result.canceled && result.assets[0]) {
        const newAttachment = {
          id: Date.now(),
          type: 'image',
          uri: result.assets[0].uri,
          name: `image_${Date.now()}.jpg`,
          base64: result.assets[0].base64,
          mimeType: 'image/jpeg',
        };
        setAttachments(prev => [...prev, newAttachment]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'text/*', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0];
        const newAttachment = {
          id: Date.now(),
          type: 'document',
          uri: asset.uri,
          name: asset.name,
          size: asset.size,
          mimeType: asset.mimeType,
        };
        setAttachments(prev => [...prev, newAttachment]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const removeAttachment = (id) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const sendMessage = async (text = message) => {
    if (!text.trim() && attachments.length === 0) return;

    const userMessageId = Date.now();
    const userMessage = {
      id: userMessageId,
      text: text.trim() || (attachments.length > 0 ? `📎 Sent ${attachments.length} attachment(s)` : ''),
      isUser: true,
      timestamp: new Date(),
      attachments: [...attachments],
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setAttachments([]);
    setIsLoading(true);

    try {
      const formData = new FormData();
      
      // Add text message
      formData.append('message', text.trim() || 'Please analyze these files');
      formData.append('conversationId', conversationId || '');
      formData.append('context', 'study_help');
      formData.append('history', JSON.stringify(messageHistory.slice(-6)));

      // Add attachments
      attachments.forEach((attachment, index) => {
        if (attachment.type === 'image' && attachment.base64) {
          // For images, send as base64
          formData.append('images', `data:${attachment.mimeType};base64,${attachment.base64}`);
        } else if (attachment.type === 'document') {
          // For documents, send as file
          formData.append('files', {
            uri: attachment.uri,
            type: attachment.mimeType,
            name: attachment.name,
          });
        }
      });

      const response = await fetch(`${API_BASE}/chat${attachments.length > 0 ? '/multimodal' : ''}`, {
        method: 'POST',
        headers: attachments.length > 0 
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' },
        body: attachments.length > 0 
          ? formData 
          : JSON.stringify({
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
      <AryaCard 
        variant="elevated" 
        elevation={message.isUser ? 2 : 1}
        style={[
          styles.messageSurface,
          message.isUser ? styles.userSurface : styles.aiSurface,
          message.isError && styles.errorSurface
        ]}
        padding="medium"
      >
        {message.isUser ? (
          <View>
            <AryaText.Body 
              color="#FFFFFF"
              style={styles.messageText}
            >
              {message.text}
            </AryaText.Body>
            
            {/* Display attachments for user messages */}
            {message.attachments && message.attachments.map((attachment) => (
              <View key={attachment.id} style={styles.attachmentPreview}>
                {attachment.type === 'image' ? (
                  <Image source={{ uri: attachment.uri }} style={styles.attachmentImage} />
                ) : (
                  <View style={styles.documentAttachment}>
                    <Ionicons name="document-text" size={20} color="#FFFFFF" />
                    <AryaText.Caption color="rgba(255,255,255,0.9)" style={styles.attachmentName}>
                      {attachment.name}
                    </AryaText.Caption>
                  </View>
                )}
              </View>
            ))}
          </View>
        ) : (
          <Markdown
            style={{
              body: {
                color: message.isError ? '#D32F2F' : '#1a1a1a',
                fontSize: 16,
                lineHeight: 22,
                marginBottom: 4,
                fontFamily: 'System',
              },
              paragraph: {
                marginTop: 0,
                marginBottom: 8,
              },
              strong: {
                fontWeight: '600',
                color: '#4169E1',
              },
              bullet_list: {
                marginBottom: 8,
              },
              list_item: {
                marginBottom: 4,
              },
              code_inline: {
                backgroundColor: '#F0F4FF',
                color: '#4169E1',
                paddingHorizontal: 4,
                paddingVertical: 2,
                borderRadius: 4,
                fontFamily: 'monospace',
              },
              code_block: {
                backgroundColor: '#F8F9FA',
                padding: 12,
                borderRadius: 8,
                marginVertical: 8,
                borderLeftWidth: 4,
                borderLeftColor: '#4169E1',
              },
              heading1: {
                fontSize: 20,
                fontWeight: '700',
                color: '#4169E1',
                marginBottom: 8,
              },
              heading2: {
                fontSize: 18,
                fontWeight: '600',
                color: '#333',
                marginBottom: 6,
              },
              link: {
                color: '#4169E1',
                textDecorationLine: 'underline',
              },
            }}
          >
            {message.text}
          </Markdown>
        )}
        
        <AryaText.Caption 
          color={message.isUser ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)'} 
          style={styles.timestamp}
        >
          {message.timestamp.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </AryaText.Caption>
      </AryaCard>
    </View>
  );

  return (
    <AryaScreen statusBarStyle="dark-content" backgroundColor="#FAFAFA">
      
      {/* Header */}
      <View style={styles.header}>
        <AryaText.Display color="#4169E1" weight="bold">
          AI Study Buddy
        </AryaText.Display>
        <AryaText.Body color="#666" style={styles.headerSubtitle}>
          Your intelligent learning companion
        </AryaText.Body>
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
              <AryaCard variant="elevated" elevation={1} style={styles.loadingSurface} padding="medium">
                <View style={styles.loadingContent}>
                  <ActivityIndicator size="small" color="#4169E1" />
                  <AryaText.Body color="#666" style={styles.loadingText}>
                    AI is thinking...
                  </AryaText.Body>
                </View>
              </AryaCard>
            </View>
          )}
        </ScrollView>

        {/* Input Area */}
        <View style={styles.inputContainer}>
          
          {/* Attachment Preview */}
          {attachments.length > 0 && (
            <View style={styles.attachmentContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {attachments.map((attachment) => (
                  <View key={attachment.id} style={styles.attachmentItem}>
                    <TouchableOpacity
                      style={styles.removeAttachment}
                      onPress={() => removeAttachment(attachment.id)}
                    >
                      <Ionicons name="close-circle" size={20} color="#FF4757" />
                    </TouchableOpacity>
                    
                    {attachment.type === 'image' ? (
                      <Image source={{ uri: attachment.uri }} style={styles.attachmentThumbnail} />
                    ) : (
                      <View style={styles.documentThumbnail}>
                        <Ionicons name="document-text" size={24} color="#4169E1" />
                        <AryaText.Caption color="#666" style={styles.attachmentLabel}>
                          {attachment.name.length > 10 ? `${attachment.name.substring(0, 10)}...` : attachment.name}
                        </AryaText.Caption>
                      </View>
                    )}
                  </View>
                ))}
              </ScrollView>
            </View>
          )}
          
          <View style={styles.inputRow}>
            
            {/* Attachment Buttons */}
            <View style={styles.attachmentButtons}>
              <TouchableOpacity style={styles.attachmentButton} onPress={pickImage}>
                <Ionicons name="camera" size={24} color="#4169E1" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentButton} onPress={pickDocument}>
                <Ionicons name="document-attach" size={24} color="#4169E1" />
              </TouchableOpacity>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                value={message}
                onChangeText={setMessage}
                placeholder="Ask me anything about NDA preparation..."
                placeholderTextColor="#999"
                maxLength={500}
                onSubmitEditing={() => sendMessage()}
                returnKeyType="send"
                blurOnSubmit={false}
                mode="outlined"
                outlineColor="transparent"
                activeOutlineColor="transparent"
                contentStyle={styles.textInputContent}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.sendButton,
                { opacity: (message.trim() || attachments.length > 0) && !isLoading ? 1 : 0.5 }
              ]}
              disabled={!(message.trim() || attachments.length > 0) || isLoading}
              onPress={() => sendMessage()}
            >
              <AryaText.Label color="#FFFFFF" weight="semibold">
                Send
              </AryaText.Label>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAvoidingView>

    </AryaScreen>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 0,
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  headerSubtitle: {
    marginTop: 4,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 12,
    paddingBottom: 20,
  },
  messageBubble: {
    marginVertical: 6,
    maxWidth: width * 0.85,
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  aiMessage: {
    alignSelf: 'flex-start',
  },
  messageSurface: {
    borderRadius: 16,
  },
  userSurface: {
    backgroundColor: '#4169E1',
    borderBottomRightRadius: 4,
  },
  aiSurface: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
  },
  errorSurface: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F48FB1',
    borderWidth: 1,
  },
  messageText: {
    lineHeight: 22,
    marginBottom: 4,
  },
  timestamp: {
    textAlign: 'right',
    marginTop: 4,
  },
  loadingContainer: {
    alignItems: 'flex-start',
    marginVertical: 6,
  },
  loadingSurface: {
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 4,
    borderRadius: 16,
  },
  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 12,
    fontStyle: 'italic',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    marginBottom: 80, // Space for tab bar
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  attachmentButtons: {
    flexDirection: 'row',
    gap: 4,
  },
  attachmentButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EFFF',
  },
  attachmentContainer: {
    marginBottom: 12,
    paddingVertical: 8,
  },
  attachmentItem: {
    position: 'relative',
    marginRight: 12,
    alignItems: 'center',
  },
  removeAttachment: {
    position: 'absolute',
    top: -8,
    right: -8,
    zIndex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  attachmentThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  documentThumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EFFF',
  },
  attachmentLabel: {
    marginTop: 4,
    fontSize: 10,
    textAlign: 'center',
  },
  attachmentPreview: {
    marginTop: 8,
  },
  attachmentImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginTop: 4,
  },
  documentAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  attachmentName: {
    marginLeft: 8,
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  textInput: {
    backgroundColor: 'transparent',
    fontSize: 16,
    height: 50,
  },
  textInputContent: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sendButton: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },
});

export default AIBuddyScreen;