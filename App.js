import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider } from '@clerk/clerk-expo';
import Constants from 'expo-constants';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

// Clerk publishable key - Environment variable'dan alınıyor
const CLERK_PUBLISHABLE_KEY = Constants.expoConfig?.extra?.clerkPublishableKey || 'pk_test_dmFsdWVkLXJlZGZpc2gtNzMuY2xlcmsuYWNjb3VudHMuZGV2JA';

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <StatusBar
            style="light"
            backgroundColor={theme.colors.navy}
            translucent={false}
          />
          <AppNavigator />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}
