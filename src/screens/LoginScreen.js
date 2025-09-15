import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../components/ui';
import { theme } from '../styles/theme';

const LoginScreen = ({ onLoginSuccess, onGoToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      // Google login logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onLoginSuccess('google');
    } catch (error) {
      Alert.alert('Hata', 'Google ile giriş yapılırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setIsLoading(true);
    try {
      // Apple login logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onLoginSuccess('apple');
    } catch (error) {
      Alert.alert('Hata', 'Apple ile giriş yapılırken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    onLoginSuccess('guest');
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    setIsLoading(true);
    try {
      // Email login logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onLoginSuccess('email');
    } catch (error) {
      Alert.alert('Hata', 'Giriş yapılırken bir hata oluştu.');
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
            Hoş Geldin
          </Text>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.cream,
              textAlign: 'center',
              opacity: 0.9,
            }}
          >
            HistoricMe'ye giriş yap ve tarihin büyük figürleriyle tanış
          </Text>
        </View>
      </LinearGradient>

      {/* Login Form */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.xl,
          paddingTop: theme.spacing['2xl'],
        }}
      >
        {/* Social Login Buttons */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Button
            title="Google ile Devam Et"
            variant="secondary"
            size="lg"
            onPress={handleGoogleLogin}
            loading={isLoading}
            icon={
              <Ionicons
                name="logo-google"
                size={20}
                color={theme.colors.cream}
              />
            }
            iconPosition="left"
            style={{ marginBottom: theme.spacing.md }}
          />
          
          <Button
            title="Apple ile Devam Et"
            variant="secondary"
            size="lg"
            onPress={handleAppleLogin}
            loading={isLoading}
            icon={
              <Ionicons
                name="logo-apple"
                size={20}
                color={theme.colors.cream}
              />
            }
            iconPosition="left"
          />
        </View>

        {/* Divider */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: theme.spacing.lg,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.colors.gray300,
            }}
          />
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray500,
              marginHorizontal: theme.spacing.md,
            }}
          >
            veya
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: theme.colors.gray300,
            }}
          />
        </View>

        {/* Email Form */}
        <View style={{ marginBottom: theme.spacing.xl }}>
          <Input
            label="E-posta"
            placeholder="ornek@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={
              <Ionicons
                name="mail"
                size={20}
                color={theme.colors.gray500}
              />
            }
          />
          
          <Input
            label="Şifre"
            placeholder="Şifrenizi girin"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          
          <Button
            title="Giriş Yap"
            variant="secondary"
            size="lg"
            onPress={handleEmailLogin}
            loading={isLoading}
            style={{ marginTop: theme.spacing.md }}
          />
        </View>

        {/* Sign Up Link */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              marginBottom: theme.spacing.sm,
              textAlign: 'center',
            }}
          >
            Hesabınız yok mu?{' '}
          </Text>
          <TouchableOpacity onPress={onGoToSignUp}>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.sm,
                fontWeight: theme.typography.fontWeight.medium,
                color: theme.colors.teal,
                textDecorationLine: 'underline',
              }}
            >
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>

        {/* Guest Login */}
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.xl }}>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray600,
              marginBottom: theme.spacing.md,
              textAlign: 'center',
            }}
          >
            Hesap oluşturmak istemiyor musun?
          </Text>
          
          <TouchableOpacity onPress={handleGuestLogin}>
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.burgundy,
                fontWeight: theme.typography.fontWeight.semibold,
                textDecorationLine: 'underline',
              }}
            >
              Misafir olarak devam et
            </Text>
          </TouchableOpacity>
        </View>

        {/* Terms */}
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.gray500,
            textAlign: 'center',
            lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.xs,
          }}
        >
          Devam ederek Kullanım Şartları ve Gizlilik Politikası'nı kabul etmiş olursun.
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
