import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp } from '@clerk/clerk-expo';
import { Button, Input } from '../components/ui';
import { theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const VerificationScreen = ({ email, signUpData, onVerificationSuccess, onBackToSignUp }) => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [attempts, setAttempts] = useState(0);
  
  const { setActive, isLoaded } = useSignUp();
  const signUp = signUpData;

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  // Component mount olduğunda email durumunu kontrol et
  useEffect(() => {
    if (signUp && signUp.verifications?.emailAddress?.status === 'verified') {
      console.log('Email already verified on component mount');
      // Kısa bir gecikme ile oturumu başlat
      setTimeout(async () => {
        try {
          await setActive({ session: signUp.createdSessionId });
          onVerificationSuccess('email');
        } catch (error) {
          console.error('Error setting active session on mount:', error);
        }
      }, 1000);
    }
  }, [signUp]);

  const handleVerification = async () => {
    if (!isLoaded || !signUp || !verificationCode) {
      Alert.alert('Uyarı', 'Lütfen doğrulama kodunu girin.');
      return;
    }

    if (verificationCode.length !== 6) {
      Alert.alert('Uyarı', 'Doğrulama kodu 6 haneli olmalıdır.');
      return;
    }

    // Email zaten doğrulanmış mı kontrol et
    if (signUp.verifications?.emailAddress?.status === 'verified') {
      console.log('Email already verified, proceeding to success');
      try {
        await setActive({ session: signUp.createdSessionId });
        onVerificationSuccess('email');
        return;
      } catch (error) {
        console.error('Error setting active session:', error);
        Alert.alert('Hata', 'Oturum başlatılırken bir hata oluştu.');
        return;
      }
    }

    setIsLoading(true);
    try {
      console.log('Attempting verification with code:', verificationCode);
      console.log('SignUp object:', signUp);
      
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });
      
      console.log('Verification result:', result);
      
              if (result.status === 'complete') {
                console.log('Verification successful, setting active session...');
                try {
                  await setActive({ session: result.createdSessionId });
                  console.log('Session set successfully, calling onVerificationSuccess...');
                  onVerificationSuccess('email');
                } catch (setActiveError) {
                  console.error('Error setting active session:', setActiveError);
                  Alert.alert('Hata', 'Oturum başlatılırken bir hata oluştu. Lütfen tekrar giriş yapın.');
                }
              } else {
        setAttempts(prev => prev + 1);
        if (attempts >= 2) {
          Alert.alert(
            'Çok Fazla Deneme',
            'Çok fazla yanlış deneme yaptınız. Lütfen yeni bir kod isteyin.',
            [
              { text: 'Tamam', onPress: () => handleResendCode() }
            ]
          );
        } else {
          Alert.alert('Hata', `Doğrulama kodu geçersiz. Durum: ${result.status}`);
        }
      }
    } catch (error) {
      console.error('Email verification error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      setAttempts(prev => prev + 1);
      
      if (error.errors && error.errors.length > 0) {
        const errorMessage = error.errors[0].message;
        const errorCode = error.errors[0].code;
        console.log('Clerk error:', errorCode, errorMessage);
        
        // Özel hata mesajları
        if (errorCode === 'verification_already_verified') {
          // Email zaten doğrulanmış, oturumu başlat
          console.log('Email already verified, setting active session');
          try {
            await setActive({ session: signUp.createdSessionId });
            onVerificationSuccess('email');
            return;
          } catch (setActiveError) {
            console.error('Error setting active session:', setActiveError);
            Alert.alert('Hata', 'Oturum başlatılırken bir hata oluştu.');
          }
        } else if (errorCode === 'form_code_incorrect') {
          Alert.alert('Hata', 'Doğrulama kodu yanlış. Lütfen email kutunuzdan aldığınız kodu kontrol edin.');
        } else if (errorCode === 'form_code_expired') {
          Alert.alert('Hata', 'Doğrulama kodu süresi dolmuş. Lütfen yeni bir kod isteyin.');
        } else {
          Alert.alert('Doğrulama Hatası', `${errorMessage}\n\nHata Kodu: ${errorCode}`);
        }
      } else {
        Alert.alert('Hata', 'Doğrulama kodu geçersiz. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!isLoaded || !signUp) return;
    
    // Email zaten doğrulanmış mı kontrol et
    if (signUp.verifications?.emailAddress?.status === 'verified') {
      console.log('Email already verified, proceeding to success');
      try {
        await setActive({ session: signUp.createdSessionId });
        onVerificationSuccess('email');
        return;
      } catch (error) {
        console.error('Error setting active session:', error);
        Alert.alert('Hata', 'Oturum başlatılırken bir hata oluştu.');
        return;
      }
    }
    
    setIsLoading(true);
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setResendCooldown(60); // 60 saniye cooldown
      setAttempts(0); // Reset attempts
      setVerificationCode(''); // Clear current code
      Alert.alert('Başarılı', 'Yeni doğrulama kodu gönderildi.');
    } catch (error) {
      console.error('Resend verification error:', error);
      
      if (error.errors && error.errors.length > 0) {
        const errorCode = error.errors[0].code;
        if (errorCode === 'verification_already_verified') {
          // Email zaten doğrulanmış, oturumu başlat
          console.log('Email already verified during resend, setting active session');
          try {
            await setActive({ session: signUp.createdSessionId });
            onVerificationSuccess('email');
            return;
          } catch (setActiveError) {
            console.error('Error setting active session:', setActiveError);
            Alert.alert('Hata', 'Oturum başlatılırken bir hata oluştu.');
          }
        } else {
          Alert.alert('Hata', 'Doğrulama kodu tekrar gönderilemedi. Lütfen tekrar deneyin.');
        }
      } else {
        Alert.alert('Hata', 'Doğrulama kodu tekrar gönderilemedi. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToSignUp = () => {
    Alert.alert(
      'Kayıt İptal',
      'Kayıt işlemini iptal etmek istediğinizden emin misiniz?',
      [
        { text: 'Hayır', style: 'cancel' },
        { 
          text: 'Evet', 
          style: 'destructive',
          onPress: onBackToSignUp 
        }
      ]
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: theme.colors.cream }}
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <LinearGradient
        colors={[theme.colors.teal, theme.colors.tealLight]}
        style={{
          paddingTop: 60,
          paddingBottom: 40,
          paddingHorizontal: theme.spacing.xl,
          borderBottomLeftRadius: theme.borderRadius['2xl'],
          borderBottomRightRadius: theme.borderRadius['2xl'],
        }}
      >
        {/* Header */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.lg,
              ...theme.shadows.md,
            }}
          >
            <Ionicons name="mail" size={40} color={theme.colors.teal} />
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['3xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.white,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Email Doğrulama
          </Text>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.white,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            Email adresinizi doğrulayın
          </Text>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={{ padding: theme.spacing.xl, flex: 1 }}>
        {/* Email Info */}
        <View
          style={{
            backgroundColor: theme.colors.tealLight,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            marginBottom: theme.spacing.xl,
            borderWidth: 1,
            borderColor: theme.colors.teal,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.md }}>
            <Ionicons name="mail" size={24} color={theme.colors.teal} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.teal,
                marginLeft: theme.spacing.sm,
              }}
            >
              Doğrulama Kodu Gönderildi
            </Text>
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.navy,
              lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
              marginBottom: theme.spacing.sm,
            }}
          >
            <Text style={{ fontWeight: theme.typography.fontWeight.semibold }}>{email}</Text> adresine 6 haneli doğrulama kodu gönderildi.
          </Text>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
            }}
          >
            Email kutunuzu kontrol edin ve aşağıdaki alana kodu girin.
          </Text>
        </View>

        {/* Verification Code Input */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Input
            label="Doğrulama Kodu"
            value={verificationCode}
            onChangeText={(text) => {
              // Sadece rakamları kabul et
              const numericText = text.replace(/\D/g, '');
              setVerificationCode(numericText);
            }}
            placeholder="123456"
            keyboardType="numeric"
            maxLength={6}
            leftIcon={<Ionicons name="key-outline" size={20} color={theme.colors.gray500} />}
            style={{
              textAlign: 'center',
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              letterSpacing: 8,
            }}
          />
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.xs,
              color: theme.colors.gray500,
              textAlign: 'center',
              marginTop: theme.spacing.sm,
            }}
          >
            6 haneli kodu girin
          </Text>
        </View>

        {/* Verify Button */}
        <Button
          title="Doğrula"
          onPress={handleVerification}
          loading={isLoading}
          disabled={verificationCode.length !== 6}
          style={{ marginBottom: theme.spacing.lg }}
          icon={<Ionicons name="checkmark" size={20} color={theme.colors.white} />}
          iconPosition="right"
        />

        {/* Resend Code */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          {resendCooldown > 0 ? (
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                color: theme.colors.gray500,
                textAlign: 'center',
              }}
            >
              Yeni kod gönderebilmek için {resendCooldown} saniye bekleyin
            </Text>
          ) : (
            <TouchableOpacity
              onPress={handleResendCode}
              disabled={isLoading}
              style={{
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.lg,
                borderRadius: theme.borderRadius.md,
                borderWidth: 1,
                borderColor: theme.colors.teal,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  fontWeight: theme.typography.fontWeight.medium,
                  color: theme.colors.teal,
                }}
              >
                Kodu Tekrar Gönder
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Help Text */}
        <View
          style={{
            backgroundColor: theme.colors.gray50,
            padding: theme.spacing.lg,
            borderRadius: theme.borderRadius.lg,
            marginBottom: theme.spacing.xl,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
            <Ionicons name="information-circle-outline" size={20} color={theme.colors.gray600} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.semibold,
                color: theme.colors.gray600,
                marginLeft: theme.spacing.sm,
              }}
            >
              Yardım
            </Text>
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.sm,
            }}
          >
            • Email kutunuzu kontrol edin{'\n'}
            • Spam klasörünü de kontrol edin{'\n'}
            • Kod 10 dakika içinde geçerlidir{'\n'}
            • Kod gelmezse "Kodu Tekrar Gönder" butonunu kullanın
          </Text>
        </View>

        {/* Back to Sign Up */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray500,
              marginBottom: theme.spacing.sm,
            }}
          >
            Email adresiniz yanlış mı?
          </Text>
          <TouchableOpacity onPress={handleBackToSignUp}>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.teal,
              }}
            >
              Kayıt Sayfasına Dön
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default VerificationScreen;
