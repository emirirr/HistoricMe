import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '@clerk/clerk-expo';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import VerificationScreen from '../screens/VerificationScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import UploadScreen from '../screens/UploadScreen';
import SelectionScreen from '../screens/SelectionScreen';
import ResultScreen from '../screens/ResultScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';

// Components
import { Navbar } from '../components/ui';
import { InterstitialAd } from '../components/ads';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('Splash');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpData, setSignUpData] = useState(null);
  const [showInterstitialAd, setShowInterstitialAd] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [userSubscription, setUserSubscription] = useState(null);
  const { isSignedIn, isLoaded } = useAuth();

  const handleSplashFinish = () => {
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

  const handleShowInterstitialAd = () => {
    setShowInterstitialAd(true);
  };

  const handleInterstitialAdClose = () => {
    setShowInterstitialAd(false);
  };

  const handleInterstitialAdComplete = () => {
    setShowInterstitialAd(false);
    // Reklam tamamlandıktan sonra yapılacak işlemler
  };

  const handleShowPayment = (plan) => {
    setCurrentScreen('Payment');
  };

  const handlePaymentSuccess = (plan) => {
    // Kredi ekleme veya abonelik aktif etme
    if (plan.isSubscription) {
      setUserSubscription(plan);
    } else {
      setUserCredits(prev => prev + (plan.id === 'pack5' ? 5 : plan.id === 'pack10' ? 10 : 1));
    }
    setCurrentScreen('Upload');
  };

  const handleShowSubscription = () => {
    setCurrentScreen('Subscription');
  };

  const handleSubscriptionSuccess = (plan) => {
    setUserSubscription(plan);
    setCurrentScreen('Upload');
  };

  const handleBackToUpload = () => {
    setCurrentScreen('Upload');
  };

  const renderScreen = () => {
    // Clerk yüklenene kadar login screen göster
    if (!isLoaded) {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToSignUp={handleGoToSignUp} />;
    }

    // Eğer kullanıcı giriş yapmışsa ana uygulamaya yönlendir
    if (isSignedIn && currentScreen === 'Login') {
      setCurrentScreen('Upload');
    }

    switch (currentScreen) {
      case 'Splash':
        return <SplashScreen onFinish={handleSplashFinish} />;
      case 'Login':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToSignUp={handleGoToSignUp} />;
      case 'SignUp':
        return <SignUpScreen onSignUpSuccess={handleSignUpSuccess} onSignUpWithVerification={handleSignUpWithVerification} onBackToLogin={handleBackToLogin} />;
      case 'Verification':
        return <VerificationScreen email={signUpEmail} signUpData={signUpData} onVerificationSuccess={handleVerificationSuccess} onBackToSignUp={handleBackToSignUp} />;
      case 'UserProfile':
        return <UserProfileScreen onProfileComplete={handleProfileComplete} />;
      case 'Upload':
        return <UploadScreen 
          onPhotoSelected={handlePhotoSelected} 
          userCredits={userCredits}
          userSubscription={userSubscription}
          onShowPayment={handleShowPayment}
          onShowSubscription={handleShowSubscription}
        />;
      case 'Selection':
        return <SelectionScreen onFigureSelected={handleFigureSelected} />;
      case 'Result':
        return <ResultScreen onNewPhoto={handleNewPhoto} />;
      case 'Profile':
        return <ProfileScreen 
          onNavigate={handleNavigate} 
          onLogout={handleLogout}
          onShowPayment={handleShowPayment}
          onShowSubscription={handleShowSubscription}
        />;
      case 'Discover':
        return <DiscoverScreen onNavigate={handleNavigate} />;
      case 'Payment':
        return <PaymentScreen onPaymentSuccess={handlePaymentSuccess} onBack={handleBackToUpload} />;
      case 'Subscription':
        return <SubscriptionScreen onSubscriptionSuccess={handleSubscriptionSuccess} onBack={handleBackToUpload} currentSubscription={userSubscription} />;
      default:
        return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToSignUp={handleGoToSignUp} />;
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
        
        {/* Interstitial Ad */}
        <InterstitialAd
          visible={showInterstitialAd}
          onClose={handleInterstitialAdClose}
          onAdComplete={handleInterstitialAdComplete}
          duration={5000}
          showSkipButton={true}
          skipAfter={3000}
        />
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;
