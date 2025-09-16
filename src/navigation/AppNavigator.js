import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@clerk/clerk-expo';

// Screens
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import UploadScreen from '../screens/UploadScreen';
import SelectionScreen from '../screens/SelectionScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';

// Components
import { Navbar } from '../components/ui';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpData, setSignUpData] = useState(null);
  const { isSignedIn, isLoaded } = useAuth();

  const handleSplashFinish = () => {
    setCurrentScreen('Onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('Login');
  };

  const handleLoginSuccess = (method) => {
    // Clerk otomatik olarak authentication state'i yönetir
    // Burada sadece navigation'ı güncelle
    setCurrentScreen('Upload');
  };

  const handleSignUpSuccess = (method) => {
    setCurrentScreen('UserProfile');
  };

  const handleSignUpWithVerification = (email, signUpObj) => {
    setSignUpEmail(email);
    setSignUpData(signUpObj);
    setCurrentScreen('Verification');
  };

  const handleVerificationSuccess = (method) => {
    console.log('handleVerificationSuccess called with method:', method);
    console.log('Navigating to UserProfile screen...');
    setCurrentScreen('UserProfile');
  };

  const handleBackToSignUp = () => {
    setSignUpEmail('');
    setSignUpData(null);
    setCurrentScreen('SignUp');
  };

  const handleProfileComplete = (profileData) => {
    setCurrentScreen('Upload');
  };

  const handleGoToSignUp = () => {
    setCurrentScreen('SignUp');
  };

  const handleBackToLogin = () => {
    setCurrentScreen('Login');
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

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setCurrentScreen('Login');
  };

  const renderScreen = () => {
    // Clerk yüklenene kadar splash screen göster
    if (!isLoaded) {
      return <SplashScreen onFinish={handleSplashFinish} />;
    }

    // Eğer kullanıcı giriş yapmışsa ana uygulamaya yönlendir
    if (isSignedIn && currentScreen === 'Login') {
      setCurrentScreen('Upload');
    }

    switch (currentScreen) {
      case 'Onboarding':
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case 'Login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToSignUp={handleGoToSignUp} />;
      case 'SignUp':
        return <SignUpScreen onSignUpSuccess={handleSignUpSuccess} onSignUpWithVerification={handleSignUpWithVerification} onBackToLogin={handleBackToLogin} />;
      case 'Verification':
        return <VerificationScreen email={signUpEmail} signUpData={signUpData} onVerificationSuccess={handleVerificationSuccess} onBackToSignUp={handleBackToSignUp} />;
      case 'UserProfile':
        return <UserProfileScreen onProfileComplete={handleProfileComplete} />;
      case 'Upload':
        return <UploadScreen onPhotoSelected={handlePhotoSelected} />;
      case 'Selection':
        return <SelectionScreen onFigureSelected={handleFigureSelected} />;
      case 'Result':
        return <ResultScreen onNewPhoto={handleNewPhoto} />;
      case 'Profile':
        return <ProfileScreen onNavigate={handleNavigate} onLogout={handleLogout} />;
      case 'Discover':
        return <DiscoverScreen onNavigate={handleNavigate} />;
      default:
        return <SplashScreen onFinish={handleSplashFinish} />;
    }
  };

  // Navbar'ın gösterileceği sayfalar
  const showNavbar = ['Upload', 'Discover', 'Profile'].includes(currentScreen);

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        {renderScreen()}
        {showNavbar && (
          <Navbar
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            user={null} // Clerk user bilgisi buraya geçilebilir
          />
        )}
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;
