/**
 * NDA StudyBuddy Constants
 * All app-wide constants and configuration values
 */

export const NDA_CONFIG = {
  APP_NAME: 'NDA StudyBuddy',
  APP_TAGLINE: 'Chase Your Defense Dreams with Calmness',
  
  // NDA Subject Configuration
  SUBJECTS: {
    MATHEMATICS: 'mathematics',
    ENGLISH: 'english', 
    GENERAL_KNOWLEDGE: 'general_knowledge',
    GENERAL_ABILITY: 'general_ability'
  },
  
  // Fitness Benchmarks (NDA Standards)
  FITNESS_BENCHMARKS: {
    MALE: {
      PUSHUPS: { min: 40, good: 60, excellent: 80 },
      RUNNING_1600M: { max: 350, good: 320, excellent: 300 }, // seconds
      SITUPS: { min: 30, good: 45, excellent: 60 }
    },
    FEMALE: {
      PUSHUPS: { min: 20, good: 35, excellent: 50 },
      RUNNING_1600M: { max: 400, good: 370, excellent: 350 }, // seconds
      SITUPS: { min: 25, good: 40, excellent: 55 }
    }
  },
  
  // SSB Interview Configuration
  SSB_INTERVIEW: {
    DURATION_MINUTES: 15,
    QUESTION_CATEGORIES: 5,
    SCORING_SCALE: { min: 1, max: 10 }
  },
  
  // Mode Configuration
  MODES: {
    CADET: 'cadet',      // Solo mode
    MENTOR: 'mentor',    // Therapist mode
    SQUADRON: 'squadron' // Social mode
  },
  
  // Tab Configuration
  TABS: {
    DASHBOARD: 'dashboard',
    INTERVIEW: 'interview',
    AI_BUDDY: 'ai_buddy',
    FITNESS: 'fitness',
    PROFILE: 'profile'
  }
};

export const STORAGE_KEYS = {
  USER_TOKEN: '@nda_user_token',
  USER_PROFILE: '@nda_user_profile',
  ONBOARDING_COMPLETED: '@nda_onboarding_completed',
  THEME_PREFERENCE: '@nda_theme_preference'
};

export const SCREEN_NAMES = {
  // Auth Screens
  SPLASH: 'Splash',
  LOGIN: 'Login',
  
  // Main Screens
  HOME: 'Home',
  CADET_MODE: 'CadetMode',
  MENTOR_MODE: 'MentorMode',
  SQUADRON_MODE: 'SquadronMode',
  
  // Cadet Tab Screens
  DASHBOARD: 'Dashboard',
  INTERVIEW: 'Interview',
  AI_BUDDY: 'AIBuddy',
  FITNESS: 'Fitness',
  PROFILE: 'Profile'
};

export const API_ENDPOINTS = {
  // Mock endpoints for future implementation
  STUDY: {
    GET_SUBJECTS: '/api/study/subjects',
    GET_PROGRESS: '/api/study/progress',
    SAVE_SESSION: '/api/study/sessions'
  },
  FITNESS: {
    GET_STANDARDS: '/api/fitness/standards',
    GET_PROGRESS: '/api/fitness/progress',
    SAVE_EXERCISE: '/api/fitness/exercises'
  },
  INTERVIEW: {
    GET_QUESTIONS: '/api/interview/questions',
    SAVE_SESSION: '/api/interview/sessions',
    GET_FEEDBACK: '/api/interview/feedback'
  }
};

export default NDA_CONFIG;