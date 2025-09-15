import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../components/ui';
import { theme } from '../styles/theme';

const SignUpScreen = ({ onSignUpSuccess, onBackToLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      // Google sign up logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onSignUpSuccess('google');
    } catch (error) {
      Alert.alert('Hata', 'Google ile kayıt olurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignUp = async () => {
    setIsLoading(true);
    try {
      // Apple sign up logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onSignUpSuccess('apple');
    } catch (error) {
      Alert.alert('Hata', 'Apple ile kayıt olurken bir hata oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
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
      // Email sign up logic here
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      onSignUpSuccess('email');
    } catch (error) {
      Alert.alert('Hata', 'Kayıt olurken bir hata oluştu.');
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
        {/* Name Fields */}
        <View style={{ flexDirection: 'row', marginBottom: theme.spacing.lg }}>
          <View style={{ flex: 1, marginRight: theme.spacing.sm }}>
            <Input
              label="Ad"
              value={firstName}
              onChangeText={setFirstName}
              placeholder="Adınız"
              autoCapitalize="words"
            />
          </View>
          <View style={{ flex: 1, marginLeft: theme.spacing.sm }}>
            <Input
              label="Soyad"
              value={lastName}
              onChangeText={setLastName}
              placeholder="Soyadınız"
              autoCapitalize="words"
            />
          </View>
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
            leftIcon="mail-outline"
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
            leftIcon="lock-closed-outline"
            rightIcon={showPassword ? "eye-off-outline" : "eye-outline"}
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
            leftIcon="lock-closed-outline"
            rightIcon={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
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
