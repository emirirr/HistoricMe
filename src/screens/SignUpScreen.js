import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useSignUp, useOAuth } from '@clerk/clerk-expo';
import { Button, Input } from '../components/ui';
import { theme } from '../styles/theme';

const SignUpScreen = ({ onSignUpSuccess, onSignUpWithVerification, onBackToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const { signUp, setActive, isLoaded } = useSignUp();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' });

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    try {
      const { createdSessionId, signIn, signUp, setActive } = await googleAuth();
      
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        onSignUpSuccess('google');
      } else if (signIn || signUp) {
        // OAuth flow devam ediyor, kullanıcıyı bilgilendir
        Alert.alert('Bilgi', 'OAuth işlemi devam ediyor...');
      }
    } catch (error) {
      console.error('Google signup error:', error);
      Alert.alert('Hata', 'Google ile kayıt olurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    if (!isLoaded) return;
    
    setIsLoading(true);
    try {
      const { createdSessionId, signIn, signUp, setActive } = await appleAuth();
      
      if (createdSessionId) {
        await setActive({ session: createdSessionId });
        onSignUpSuccess('apple');
      } else if (signIn || signUp) {
        // OAuth flow devam ediyor, kullanıcıyı bilgilendir
        Alert.alert('Bilgi', 'OAuth işlemi devam ediyor...');
      }
    } catch (error) {
      console.error('Apple signup error:', error);
      Alert.alert('Hata', 'Apple ile kayıt olurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    if (!isLoaded) return;
    
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Uyarı', 'Lütfen geçerli bir email adresi girin.');
      return;
    }

    // Username validation
    if (username.length < 3) {
      Alert.alert('Uyarı', 'Kullanıcı adı en az 3 karakter olmalıdır.');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      Alert.alert('Uyarı', 'Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Uyarı', 'Şifreler eşleşmiyor.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Uyarı', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Uyarı', 'Kullanım şartlarını kabul etmelisiniz.');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Clerk signUp object:', signUp);
      console.log('Attempting to create account with:', { email, username });
      
      const result = await signUp.create({
        emailAddress: email,
        username: username,
        password: password,
      });
      
      console.log('SignUp result:', result);

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        onSignUpSuccess('email');
      } else if (result.status === 'missing_requirements') {
        // Email verification gerekli - email gönder
        try {
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          // Doğrulama sayfasına yönlendir
          if (onSignUpWithVerification) {
            onSignUpWithVerification(email, signUp);
          }
        } catch (verificationError) {
          console.error('Email verification preparation error:', verificationError);
          Alert.alert('Hata', 'Email doğrulama kodu gönderilemedi. Lütfen tekrar deneyin.');
        }
      } else {
        Alert.alert('Hata', `Kayıt durumu: ${result.status}`);
      }
    } catch (error) {
      console.error('Email signup error:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      
      // Clerk error mesajlarını daha detaylı göster
      if (error.errors && error.errors.length > 0) {
        const errorCode = error.errors[0].code;
        const errorMessage = error.errors[0].message;
        
        // Özel hata mesajları
        if (errorCode === 'form_password_pwned') {
          Alert.alert(
            'Güvenlik Uyarısı', 
            'Bu şifre daha önce veri ihlali yaşamış. Güvenliğiniz için lütfen farklı bir şifre kullanın.\n\nGüçlü bir şifre için:\n• En az 8 karakter\n• Büyük ve küçük harf\n• Rakam ve özel karakter\n• Kişisel bilgi içermemeli'
          );
        } else if (errorCode === 'form_identifier_exists') {
          Alert.alert('Hata', 'Bu email adresi zaten kullanımda. Lütfen farklı bir email adresi deneyin.');
        } else {
          Alert.alert('Kayıt Hatası', `${errorMessage}\n\nHata Kodu: ${errorCode}`);
        }
      } else if (error.message) {
        Alert.alert('Kayıt Hatası', error.message);
      } else {
        Alert.alert('Hata', 'Kayıt olurken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } finally {
      setIsLoading(false);
    }
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
            <Image
              source={require('../../assets/ico.png')}
              style={{
                width: 60,
                height: 60,
                resizeMode: 'contain',
              }}
            />
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
            Kayıt Ol
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
            HistoricMe'ye katıl ve tarihi keşfet
          </Text>
        </View>
      </LinearGradient>

      {/* Form */}
      <View style={{ padding: theme.spacing.xl, flex: 1 }}>
        {/* Name Fields - Moved to UserProfileScreen */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              textAlign: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            İsim ve soyisim bilgilerinizi kayıt sonrası profil sayfasında girebilirsiniz.
          </Text>
        </View>

        {/* Email */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Input
            label="E-posta"
            value={email}
            onChangeText={setEmail}
            placeholder="ornek@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={<Ionicons name="mail-outline" size={20} color={theme.colors.gray500} />}
          />
        </View>

        {/* Username */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Input
            label="Kullanıcı Adı"
            value={username}
            onChangeText={setUsername}
            placeholder="kullaniciadi"
            autoCapitalize="none"
            leftIcon={<Ionicons name="person-outline" size={20} color={theme.colors.gray500} />}
          />
        </View>

        {/* Password */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Input
            label="Şifre"
            value={password}
            onChangeText={setPassword}
            placeholder="En az 6 karakter"
            secureTextEntry={!showPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.gray500} />}
            rightIcon={<Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color={theme.colors.gray500} />}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />
        </View>

        {/* Confirm Password */}
        <View style={{ marginBottom: theme.spacing.lg }}>
          <Input
            label="Şifre Tekrar"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Şifrenizi tekrar girin"
            secureTextEntry={!showConfirmPassword}
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={theme.colors.gray500} />}
            rightIcon={<Ionicons name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} size={20} color={theme.colors.gray500} />}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        {/* Terms Agreement */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
          }}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 4,
              borderWidth: 2,
              borderColor: agreeToTerms ? theme.colors.teal : theme.colors.gray,
              backgroundColor: agreeToTerms ? theme.colors.teal : 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.sm,
            }}
          >
            {agreeToTerms && (
              <Ionicons name="checkmark" size={14} color={theme.colors.white} />
            )}
          </View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.navy,
              flex: 1,
            }}
          >
            <Text style={{ color: theme.colors.teal }}>Kullanım Şartları</Text> ve{' '}
            <Text style={{ color: theme.colors.teal }}>Gizlilik Politikası</Text>'nı kabul ediyorum
          </Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <Button
          title="Kayıt Ol"
          onPress={handleEmailSignUp}
          loading={isLoading}
          style={{ marginBottom: theme.spacing.lg }}
        />

        {/* Divider */}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.gray }} />
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray,
              marginHorizontal: theme.spacing.md,
            }}
          >
            veya
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: theme.colors.gray }} />
        </View>

        {/* Social Sign Up Buttons */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.teal,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              marginBottom: theme.spacing.md,
              ...theme.shadows.sm,
            }}
            onPress={handleGoogleSignUp}
            disabled={isLoading}
          >
            <Ionicons name="logo-google" size={20} color={theme.colors.cream} style={{ marginRight: theme.spacing.sm }} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.cream,
              }}
            >
              Google ile Kayıt Ol
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.teal,
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.lg,
              borderRadius: theme.borderRadius.lg,
              ...theme.shadows.sm,
            }}
            onPress={handleAppleSignUp}
            disabled={isLoading}
          >
            <Ionicons name="logo-apple" size={20} color={theme.colors.cream} style={{ marginRight: theme.spacing.sm }} />
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.cream,
              }}
            >
              Apple ile Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray,
            }}
          >
            Zaten hesabınız var mı?{' '}
          </Text>
          <TouchableOpacity onPress={onBackToLogin}>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.teal,
              }}
            >
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
