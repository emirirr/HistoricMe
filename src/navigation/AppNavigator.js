import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import UploadScreen from '../screens/UploadScreen';
import SelectionScreen from '../screens/SelectionScreen';
import ResultScreen from '../screens/ResultScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');

  const handleSplashFinish = () => {
    setCurrentScreen('Onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('Login');
  };

  const handleLoginSuccess = (method) => {
    setCurrentScreen('Upload');
  };

  const handlePhotoSelected = (photo) => {
    setCurrentScreen('Selection');
  };

  const handleFigureSelected = (figure) => {
    setCurrentScreen('Result');
  };

  const handleNewPhoto = () => {
    setCurrentScreen('Upload');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'Login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
      case 'Upload':
        return <UploadScreen onPhotoSelected={handlePhotoSelected} />;
      case 'Selection':
        return <SelectionScreen onFigureSelected={handleFigureSelected} />;
      case 'Result':
        return <ResultScreen onNewPhoto={handleNewPhoto} />;
      default:
        return <SplashScreen onFinish={handleSplashFinish} />;
    }
  };

  return (
    <NavigationContainer>
      {renderScreen()}
    </NavigationContainer>
  );
};

export default AppNavigator;
