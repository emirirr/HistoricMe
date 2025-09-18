import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/contexts/ThemeContext';
import { theme } from './src/styles/theme';
import HapticService from './src/services/HapticService';
import SoundService from './src/services/SoundService';
import GamificationService from './src/services/GamificationService';
import AnalyticsService from './src/services/AnalyticsService';
import AccessibilityService from './src/services/AccessibilityService';

// Clerk publishable key - Environment variable'dan alınıyor
const CLERK_PUBLISHABLE_KEY = Constants.expoConfig?.extra?.clerkPublishableKey || 'pk_test_dmFsdWVkLXJlZGZpc2gtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA';

export default function App() {
  useEffect(() => {
    // Initialize all services
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      // Initialize Sound Service
      await SoundService.initialize();
      
      // Initialize Accessibility Service
      await AccessibilityService.initialize();
      
      // Track app launch
      await AnalyticsService.trackEvent('app_launch', {
        timestamp: new Date().toISOString(),
        version: Constants.expoConfig?.version || '1.0.0',
      });
      
      // Update daily streak
      await GamificationService.updateStreak();
      
      console.log('All services initialized successfully');
    } catch (error) {
      console.error('Error initializing services:', error);
      await AnalyticsService.trackError(error, { context: 'app_initialization' });
    }
  };

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <StatusBar
              style="light"
              backgroundColor={theme.colors.teal}
              translucent={false}
            />
            <AppNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ClerkProvider>
  );
}
