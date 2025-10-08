# 🏗️ Arya App Structure Document
## NDA StudyBuddy Platform - Complete Architecture

---

## 📱 **App Flow & Screen Hierarchy**

### **1. Authentication Flow** (Simplified)
```
App Launch
├── Splash Screen (2s with NDA branding)
└── Single Login Screen
    └── Google Login Button (Primary CTA)
```

### **2. Main App Structure**
```
Home Screen (Mode Selection)
├── 🎖️ Cadet Mode (Solo) - DEFAULT
├── 🧠 Mentor Mode (Therapist) - PLACEHOLDER
└── 🤝 Squadron Mode (Social) - PLACEHOLDER

Cadet Mode (Bottom Tab Navigation)
├── 🏠 Dashboard Tab
├── 🎤 Interview Tab  
├── 🤖 AI Buddy Tab
├── 💪 Fitness Tab
└── 👤 Profile Tab
```

---

## 🎨 **UI Framework & Theme Configuration**

### **React Native Paper Components**
- **Primary**: Navy Blue (#1A237E) - Defense authority
- **Secondary**: Gold (#FFD700) - Military honors  
- **Success**: Dark Green (#2E7D32) - Achievement
- **Warning**: Orange (#F57C00) - Attention
- **Error**: Deep Red (#C62828) - Critical alerts
- **Surface**: Clean White (#FFFFFF) - Content areas
- **Background**: Light Gray (#F5F5F5) - App background

### **Typography System**
```javascript
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A237E',
    secondary: '#FFD700',
    surface: '#FFFFFF',
    background: '#F5F5F5',
  },
  fonts: {
    displayLarge: { fontSize: 32, fontWeight: '700' },
    headlineMedium: { fontSize: 24, fontWeight: '600' },
    titleMedium: { fontSize: 18, fontWeight: '500' },
    bodyLarge: { fontSize: 16, fontWeight: '400' },
    bodyMedium: { fontSize: 14, fontWeight: '400' },
  }
};
```

---

## 📁 **Complete Folder Structure**

```
arya-app/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── NDAButton.js              # Reusable button component
│   │   │   ├── NDACard.js                # Defense-themed card
│   │   │   ├── LoadingSpinner.js         # Custom loading indicator
│   │   │   ├── ErrorBoundary.js          # Error handling wrapper
│   │   │   ├── SafeAreaWrapper.js        # Safe area handling
│   │   │   └── index.js                  # Export barrel
│   │   ├── auth/
│   │   │   ├── LoginForm.js              # Login form component
│   │   │   ├── SignupForm.js             # Registration form
│   │   │   ├── SocialLoginButtons.js     # OAuth login options
│   │   │   └── index.js
│   │   ├── study/
│   │   │   ├── ChatInterface.js          # AI chat UI
│   │   │   ├── VoiceInputButton.js       # Multimodal voice input
│   │   │   ├── QuizCard.js               # Interactive quiz component
│   │   │   ├── SubjectSelector.js        # NDA subject picker
│   │   │   ├── ProgressRing.js           # Circular progress indicator
│   │   │   └── index.js
│   │   ├── fitness/
│   │   │   ├── CameraView.js             # MediaPipe camera interface
│   │   │   ├── ExerciseCounter.js        # Real-time counting display
│   │   │   ├── FormAnalysis.js           # Posture feedback component
│   │   │   ├── FitnessStandards.js       # NDA benchmarks display
│   │   │   ├── WorkoutTimer.js           # Exercise timing component
│   │   │   └── index.js
│   │   ├── interview/
│   │   │   ├── QuestionCard.js           # Interview question display
│   │   │   ├── AudioRecorder.js          # Voice recording interface
│   │   │   ├── ResponseAnalysis.js       # AI feedback display
│   │   │   ├── ScoreBoard.js             # Performance scoring
│   │   │   ├── SessionHistory.js         # Past interview records
│   │   │   └── index.js
│   │   └── dashboard/
│   │       ├── ReadinessGauge.js         # NDA readiness percentage
│   │       ├── ProgressCharts.js         # Performance analytics
│   │       ├── DailyMissions.js          # Gamified task board
│   │       ├── AchievementBadges.js      # Military-style achievements
│   │       └── index.js
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── SplashScreen.js           # App launch screen
│   │   │   ├── OnboardingScreen.js       # Feature introduction
│   │   │   ├── LoginScreen.js            # Authentication entry
│   │   │   ├── SignupScreen.js           # User registration
│   │   │   └── ForgotPasswordScreen.js   # Password recovery
│   │   ├── main/
│   │   │   ├── HomeScreen.js             # Mode selection hub
│   │   │   ├── CadetModeScreen.js        # Solo mode container
│   │   │   ├── MentorModeScreen.js       # Placeholder screen
│   │   │   └── SquadronModeScreen.js     # Placeholder screen
│   │   ├── cadet/ (Bottom Tab Screens)
│   │   │   ├── DashboardScreen.js        # NDA readiness dashboard
│   │   │   ├── InterviewScreen.js        # SSB interview simulator
│   │   │   ├── AIBuddyScreen.js          # Multimodal AI chat
│   │   │   ├── FitnessScreen.js          # Exercise tracking & analysis
│   │   │   └── ProfileScreen.js          # User profile & settings
│   │   └── index.js
│   ├── navigation/
│   │   ├── AuthNavigator.js              # Authentication flow
│   │   ├── MainNavigator.js              # Mode selection navigation
│   │   ├── CadetTabNavigator.js          # Bottom tab navigation
│   │   ├── RootNavigator.js              # Top-level navigation
│   │   └── index.js
│   ├── services/
│   │   ├── mockData/
│   │   │   ├── studyData.js              # Mock AI responses & quizzes
│   │   │   ├── fitnessData.js            # Mock exercise data
│   │   │   ├── interviewData.js          # Mock SSB questions
│   │   │   ├── userProgress.js           # Mock user analytics
│   │   │   └── index.js
│   │   ├── api/
│   │   │   ├── geminiService.js          # Google Gemini integration
│   │   │   ├── mediaPipeService.js       # Fitness tracking service
│   │   │   ├── authService.js            # Authentication service
│   │   │   └── index.js
│   │   └── storage/
│   │       ├── AsyncStorageService.js    # Local data persistence
│   │       └── CacheService.js           # Offline data caching
│   ├── utils/
│   │   ├── constants.js                  # NDA-specific constants
│   │   ├── helpers.js                    # Utility functions
│   │   ├── validators.js                 # Form validation
│   │   ├── permissions.js                # Device permissions
│   │   └── dateUtils.js                  # Date formatting utilities
│   ├── hooks/
│   │   ├── useAuth.js                    # Authentication state
│   │   ├── useVoiceInput.js              # Voice recognition hook
│   │   ├── useCamera.js                  # Camera permissions & access
│   │   ├── useProgress.js                # User progress tracking
│   │   └── index.js
│   ├── context/
│   │   ├── AuthContext.js                # Global auth state
│   │   ├── ThemeContext.js               # Theme management
│   │   └── index.js
│   └── assets/
│       ├── images/
│       │   ├── splash/                   # Splash screen assets
│       │   ├── onboarding/               # Onboarding illustrations
│       │   ├── icons/                    # Custom app icons
│       │   └── badges/                   # Achievement badges
│       ├── fonts/                        # Custom typography
│       └── sounds/                       # Audio feedback files
├── App.js                                # Root app component
├── app.json                              # Expo configuration
├── package.json                          # Dependencies
└── README.md                             # Project documentation
```

---

## 🎯 **Screen-by-Screen Feature Breakdown**

### **1. Splash Screen**
**Duration**: 2 seconds
**Elements**:
- NDA StudyBuddy logo with military insignia
- "Chase Your Defense Dreams with Calmness" tagline
- Loading animation with progress bar
- Auto-navigate to appropriate screen based on auth state

### **2. Onboarding (First Launch Only)**
**Slides**:
1. **"The NDA Trinity"** - Mind + Body + Interview concept
2. **"AI-Powered Excellence"** - Smart study buddy features
3. **"Your Defense Journey Starts Now"** - Call to action

### **3. Authentication Screens**
**Login Screen**:
- Email/phone input with validation
- Password field with show/hide toggle
- "Remember Me" checkbox
- Social login options (Google, Apple)
- Elegant defense-themed background

**Signup Screen**:
- Personal information form (name, email, phone)
- NDA preparation stage selector
- Terms & conditions agreement
- Email verification flow

### **4. Home Screen (Mode Selection Hub)**
**Layout**: Card-based selection interface
**Modes**:
- **🎖️ Cadet Mode** (Primary CTA, glowing effect)
- **🧠 Mentor Mode** (Coming Soon badge)
- **🤝 Squadron Mode** (Coming Soon badge)

**Additional Elements**:
- Welcome message with user name
- Daily motivation quote
- Quick stats preview (streaks, achievements)

### **5. Cadet Mode - Dashboard Tab** 
**Core Features**:
- **NDA Readiness Gauge**: Circular progress showing overall preparation
- **Trinity Balance**: Visual balance of Mind/Body/Interview scores
- **Daily Mission Board**: 3-4 gamified daily tasks
- **Quick Action Cards**: Fast access to popular features
- **Achievement Showcase**: Recent badges and milestones
- **Streak Counter**: Study, fitness, and interview streaks

### **6. Cadet Mode - Interview Tab**
**Core Features**:
- **Practice Session Types**: GTO, Lecturette, Individual Obstacles
- **AI Interview Engine**: Scenario-based questions
- **Voice Recording**: Clean audio capture interface
- **Real-time Analysis**: Confidence, clarity, leadership assessment
- **Performance History**: Session scores and improvement trends
- **Feedback Cards**: Specific improvement recommendations

### **7. Cadet Mode - AI Buddy Tab** ⭐ **MAIN FEATURE**
**Multimodal Interface**:
- **Chat Interface**: Clean, WhatsApp-style message bubbles
- **Voice Input Button**: Hold-to-record, visual waveform feedback
- **Subject Context Switcher**: Mathematics, English, GK, General Ability
- **Smart Suggestions**: Quick question starters and study prompts
- **File Upload**: PDF, image, and document processing
- **Response Types**: Text, voice, diagrams, practice questions

**Unique Features**:
- **Notebook LLM Mode**: Upload and chat with study materials
- **Adaptive Learning**: Difficulty adjustment based on performance
- **Study Pattern Analysis**: Break recommendations and stress detection
- **Quick Quiz Generation**: Instant quizzes from any topic

### **8. Cadet Mode - Fitness Tab**
**MediaPipe Integration**:
- **Exercise Selection**: Push-ups, running, sit-ups, flexibility
- **Camera View**: Real-time pose detection overlay
- **Form Analysis**: Live feedback on posture and technique
- **Rep Counter**: Accurate counting with visual confirmation
- **NDA Standards Comparison**: Male/female benchmark tracking
- **Progress Analytics**: Performance trends and goal setting
- **Workout Plans**: Structured training schedules

### **9. Cadet Mode - Profile Tab**
**User Management**:
- **Profile Information**: Photo, personal details, NDA preparation stage
- **Performance Analytics**: Comprehensive progress across all areas
- **Leaderboards**: Anonymous ranking system
- **Achievement Gallery**: Earned badges and certificates
- **Settings**: Notifications, theme, language preferences
- **Help & Support**: FAQ, tutorials, contact information

---

## 🔧 **Technical Implementation Priorities**

### **Phase 1: Core Foundation (Hours 1-3)**
1. **Project Setup**: Expo configuration with React Native Paper
2. **Navigation Structure**: Complete navigation flow
3. **Theme Configuration**: Defense-inspired design system
4. **Mock Data Services**: Realistic demo data for all features
5. **Authentication Flow**: Login/signup with mock validation

### **Phase 2: AI Study Buddy (Hours 4-6)** 
1. **Chat Interface**: Real-time messaging UI
2. **Voice Input Integration**: Speech-to-text functionality
3. **Gemini API Integration**: Mock responses for demo
4. **Multimodal Features**: File upload and processing simulation
5. **Subject Context Switching**: NDA-specific response modes

### **Phase 3: Fitness Tracking (Hours 7-9)**
1. **Camera Integration**: Basic camera view setup
2. **MediaPipe Setup**: Pose detection library integration
3. **Exercise Counting**: Push-up counting algorithm
4. **UI Feedback**: Real-time counting display
5. **NDA Benchmarks**: Fitness standards comparison

### **Phase 4: Interview & Dashboard (Hours 10-12)**
1. **Interview Interface**: Question display and audio recording
2. **Dashboard Analytics**: Progress visualization components  
3. **Profile Management**: User settings and achievements
4. **UI Polish**: Animations, transitions, and visual refinements
5. **Demo Preparation**: Error handling and edge case management

---

## 📊 **State Management Strategy**

### **Component-Level State (React.useState)**
```javascript
// Example for AI Buddy Screen
const [messages, setMessages] = useState([]);
const [inputText, setInputText] = useState('');
const [isRecording, setIsRecording] = useState(false);
const [currentSubject, setCurrentSubject] = useState('mathematics');
const [isLoading, setIsLoading] = useState(false);
```

### **Mock Data Services Structure**
```javascript
// src/services/mockData/studyData.js
export const mockAIResponses = {
  mathematics: [
    {
      question: "Explain quadratic equations",
      response: "A quadratic equation is...",
      followUpQuestions: ["Practice problems?", "Related topics?"]
    }
  ]
};

export const getMockAIResponse = async (question, subject) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    response: `Mock AI response for: ${question}`,
    confidence: Math.random() * 100,
    relatedTopics: ['Topic 1', 'Topic 2'],
    timestamp: new Date()
  };
};
```

---

## 🎨 **React Native Paper Integration**

### **Key Components to Use**
- **Card**: Feature containers and information display
- **Button**: Primary actions with military styling
- **TextInput**: Form inputs with outlined variant
- **BottomNavigation**: Cadet mode tab navigation
- **FAB**: Floating action button for quick AI access
- **Chip**: Subject tags and filter options
- **ProgressBar**: Loading states and progress tracking
- **Badge**: Notifications and achievement indicators

### **Custom Theme Extensions**
```javascript
const customTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1A237E',
    secondary: '#FFD700',
    tertiary: '#2E7D32',
    surfaceVariant: '#E8EAF6',
  },
  roundness: 12, // More rounded corners for modern feel
};
```

---

## 🚀 **Performance Optimization Plan**

### **Image Optimization**
- Use WebP format for images
- Implement lazy loading for lists
- Cache frequently used assets

### **List Performance**
- Use FlatList for large datasets
- Implement proper keyExtractor
- Use getItemLayout where possible

### **Memory Management**
- Clear unused state on screen unmount
- Optimize image sizes based on device density
- Use React.memo for expensive components

---

## 🔐 **Security Considerations**

### **Data Protection**
- Encrypt sensitive user data in AsyncStorage
- Implement biometric authentication
- Secure API key management

### **Privacy Features**
- Anonymous mode for leaderboards
- Local data processing preference
- Clear data deletion options

---

## 📱 **Cross-Platform Considerations**

### **Platform-Specific Adjustments**
```javascript
const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.select({
      ios: 20,
      android: StatusBar.currentHeight + 10,
      web: 0,
    }),
  },
  
  button: {
    marginVertical: Platform.OS === 'ios' ? 8 : 6,
  }
});
```

---

## 🎯 **Success Metrics for Demo**

### **Technical Excellence**
- **Zero crashes** during 10-minute demo
- **Smooth navigation** between all screens
- **Working AI chat** with realistic responses
- **Functional camera** interface for fitness
- **Professional UI** with consistent theming

### **Feature Completeness**
- **All 5 tabs** functional with mock data
- **Authentication flow** working end-to-end  
- **Voice input** demonstrable
- **Exercise counting** simulation
- **Progress tracking** across all features

---

## 💡 **Future Enhancement Hooks**

### **Mentor Mode (Post-Hackathon)**
- One-on-one mentorship sessions
- Personalized study plans
- Progress analysis and recommendations
- Mental health support features

### **Squadron Mode (Post-Hackathon)**
- Group study sessions
- Peer competition and challenges
- Discussion forums and Q&A
- Collaborative goal setting

---

This comprehensive structure provides a clear roadmap for building a professional, scalable, and demo-ready NDA StudyBuddy app. The architecture prioritizes core features while maintaining flexibility for future enhancements.

**Ready for your approval to proceed with implementation!** 🎖️