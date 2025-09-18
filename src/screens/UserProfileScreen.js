import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Animated, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Input } from '../components/ui';
import { completeLightTheme as theme } from '../styles/theme';

const { width } = Dimensions.get('window');

const UserProfileScreen = ({ onProfileComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    height: '',
    weight: '',
    faceType: '',
    age: '',
    gender: '',
    interests: [],
    purpose: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  const steps = [
    {
      id: 'physical',
      title: 'Fiziksel Özellikler',
      description: 'Boy, kilo ve yaş bilgilerinizi girin',
      icon: 'body',
    },
    {
      id: 'face',
      title: 'Yüz Tipi',
      description: 'Yüz tipinizi seçin',
      icon: 'person',
    },
    {
      id: 'interests',
      title: 'İlgi Alanları',
      description: 'Hangi konularla ilgileniyorsunuz?',
      icon: 'heart',
    },
    {
      id: 'purpose',
      title: 'Kullanım Amacı',
      description: 'HistoricMe\'yi neden kullanıyorsunuz?',
      icon: 'star',
    },
  ];

  const faceTypes = [
    { id: 'oval', name: 'Oval', description: 'Uzun ve ince yüz' },
    { id: 'round', name: 'Yuvarlak', description: 'Geniş ve yuvarlak yüz' },
    { id: 'square', name: 'Kare', description: 'Güçlü çene hattı' },
    { id: 'heart', name: 'Kalp', description: 'Geniş alın, dar çene' },
    { id: 'diamond', name: 'Elmas', description: 'Geniş elmacık kemikleri' },
  ];

  const interests = [
    { id: 'history', name: 'Tarih', icon: 'library' },
    { id: 'art', name: 'Sanat', icon: 'brush' },
    { id: 'science', name: 'Bilim', icon: 'flask' },
    { id: 'politics', name: 'Politika', icon: 'business' },
    { id: 'culture', name: 'Kültür', icon: 'globe' },
    { id: 'philosophy', name: 'Felsefe', icon: 'bulb' },
  ];

  const purposes = [
    { id: 'fun', name: 'Eğlence', description: 'Eğlenmek ve sosyal medyada paylaşmak için' },
    { id: 'education', name: 'Eğitim', description: 'Tarihi figürler hakkında öğrenmek için' },
    { id: 'creative', name: 'Yaratıcılık', description: 'Yaratıcı içerik üretmek için' },
    { id: 'personal', name: 'Kişisel', description: 'Kişisel merak ve keşif için' },
  ];

  const updateProfileData = (field, value) => {
    // Numeric alanlar için sadece rakamları kabul et
    if (['height', 'weight', 'age'].includes(field)) {
      const numericValue = value.replace(/[^0-9]/g, '');
      setProfileData(prev => ({ ...prev, [field]: numericValue }));
    } else {
      setProfileData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
      
      setCurrentStep(currentStep + 1);
      Animated.timing(progressAnim, {
        toValue: (currentStep + 1) / steps.length,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      onProfileComplete(profileData);
    }, 3000);
  };

  const renderProgressBar = () => (
    <View style={{ marginBottom: theme.spacing.lg }}>
      <View
        style={{
          height: 4,
          backgroundColor: theme.colors.gray200,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: theme.colors.teal,
            borderRadius: 2,
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>
      <Text
        style={{
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.gray600,
          textAlign: 'center',
          marginTop: theme.spacing.sm,
        }}
      >
        {currentStep + 1} / {steps.length} Adım
      </Text>
    </View>
  );

  const renderPhysicalStep = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.tealLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Ionicons name="body" size={40} color={theme.colors.teal} />
          </View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Fiziksel Özellikler
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray600,
              textAlign: 'center',
            }}
          >
            Bu bilgiler fotoğraf analizi için kullanılacak
          </Text>
        </View>

        <View style={{ gap: theme.spacing.md }}>
          <Input
            label="Boy (cm)"
            placeholder="175"
            value={profileData.height}
            onChangeText={(text) => updateProfileData('height', text)}
            keyboardType="numeric"
            maxLength={3}
            leftIcon={<Ionicons name="resize" size={20} color={theme.colors.gray500} />}
          />
          
          <Input
            label="Kilo (kg)"
            placeholder="70"
            value={profileData.weight}
            onChangeText={(text) => updateProfileData('weight', text)}
            keyboardType="numeric"
            maxLength={3}
            leftIcon={<Ionicons name="scale" size={20} color={theme.colors.gray500} />}
          />
          
          <View style={{ marginBottom: theme.spacing.md }}>
            <Text style={{
              fontSize: theme.typography.fontSize.sm,
              fontFamily: theme.typography.fontFamily.sans,
              fontWeight: theme.typography.fontWeight.medium,
              color: theme.colors.navy,
              marginBottom: theme.spacing.xs,
            }}>
              Yaş
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors.cream,
              borderWidth: 2,
              borderColor: theme.colors.creamDark,
              borderRadius: theme.borderRadius.lg,
              paddingHorizontal: theme.spacing.md,
              paddingVertical: theme.spacing.sm,
              minHeight: 48,
              ...theme.shadows.sm,
            }}>
              <Ionicons name="calendar" size={20} color={theme.colors.gray500} style={{ marginRight: theme.spacing.sm }} />
              <TextInput
                style={{
                  flex: 1,
                  fontSize: theme.typography.fontSize.base,
                  fontFamily: theme.typography.fontFamily.sans,
                  color: theme.colors.black,
                }}
                placeholder="25"
                placeholderTextColor={theme.colors.gray500}
                value={profileData.age}
                onChangeText={(text) => {
                  console.log('Age input changed:', text);
                  setProfileData(prev => ({ ...prev, age: text }));
                }}
                keyboardType="numeric"
                maxLength={3}
                autoCapitalize="none"
                autoCorrect={false}
                editable={true}
              />
            </View>
          </View>
        </View>
      </Card>
    </Animated.View>
  );

  const renderFaceTypeStep = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.burgundyLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Ionicons name="person" size={40} color={theme.colors.burgundy} />
          </View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Yüz Tipi
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray600,
              textAlign: 'center',
            }}
          >
            Yüz tipinizi seçin
          </Text>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          {faceTypes.map((faceType) => (
            <TouchableOpacity
              key={faceType.id}
              onPress={() => updateProfileData('faceType', faceType.id)}
              style={{
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: profileData.faceType === faceType.id ? theme.colors.burgundy : theme.colors.gray200,
                backgroundColor: profileData.faceType === faceType.id ? theme.colors.burgundyLight : theme.colors.white,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: profileData.faceType === faceType.id ? theme.colors.burgundy : theme.colors.gray200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                }}
              >
                <Ionicons
                  name="person"
                  size={24}
                  color={profileData.faceType === faceType.id ? theme.colors.white : theme.colors.gray500}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: profileData.faceType === faceType.id ? theme.colors.burgundy : theme.colors.navy,
                    marginBottom: theme.spacing.xs / 2,
                  }}
                >
                  {faceType.name}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.sm,
                    color: profileData.faceType === faceType.id ? theme.colors.burgundy : theme.colors.gray600,
                  }}
                >
                  {faceType.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    </Animated.View>
  );

  const renderInterestsStep = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.goldLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Ionicons name="heart" size={40} color={theme.colors.gold} />
          </View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            İlgi Alanları
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray600,
              textAlign: 'center',
            }}
          >
            Hangi konularla ilgileniyorsunuz? (Birden fazla seçebilirsiniz)
          </Text>
        </View>

        <ScrollView
          style={{ maxHeight: 400 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            paddingHorizontal: theme.spacing.sm,
          }}
        >
          {interests.map((interest, index) => (
            <TouchableOpacity
              key={interest.id}
              onPress={() => {
                const newInterests = profileData.interests.includes(interest.id)
                  ? profileData.interests.filter(id => id !== interest.id)
                  : [...profileData.interests, interest.id];
                updateProfileData('interests', newInterests);
              }}
              style={{
                width: (width - 100) / 2,
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: profileData.interests.includes(interest.id) ? theme.colors.gold : theme.colors.gray200,
                backgroundColor: profileData.interests.includes(interest.id) ? theme.colors.goldLight : theme.colors.white,
                alignItems: 'center',
                marginBottom: theme.spacing.md,
                ...theme.shadows.sm,
              }}
            >
              <Ionicons
                name={interest.icon}
                size={28}
                color={profileData.interests.includes(interest.id) ? theme.colors.gold : theme.colors.gray500}
                style={{ marginBottom: theme.spacing.sm }}
              />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.base,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: profileData.interests.includes(interest.id) ? theme.colors.gold : theme.colors.navy,
                  textAlign: 'center',
                }}
              >
                {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Card>
    </Animated.View>
  );

  const renderPurposeStep = () => (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Card variant="default" style={{ marginBottom: theme.spacing.lg }}>
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.colors.tealLight,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
            }}
          >
            <Ionicons name="star" size={40} color={theme.colors.teal} />
          </View>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize.xl,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.navy,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Kullanım Amacı
          </Text>
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.gray600,
              textAlign: 'center',
            }}
          >
            HistoricMe'yi neden kullanıyorsunuz?
          </Text>
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          {purposes.map((purpose) => (
            <TouchableOpacity
              key={purpose.id}
              onPress={() => updateProfileData('purpose', purpose.id)}
              style={{
                padding: theme.spacing.md,
                borderRadius: theme.borderRadius.lg,
                borderWidth: 2,
                borderColor: profileData.purpose === purpose.id ? theme.colors.teal : theme.colors.gray200,
                backgroundColor: profileData.purpose === purpose.id ? theme.colors.tealLight : theme.colors.white,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: profileData.purpose === purpose.id ? theme.colors.teal : theme.colors.gray200,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                }}
              >
                <Ionicons
                  name="star"
                  size={24}
                  color={profileData.purpose === purpose.id ? theme.colors.white : theme.colors.gray500}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.base,
                    fontWeight: theme.typography.fontWeight.semibold,
                    color: profileData.purpose === purpose.id ? theme.colors.teal : theme.colors.navy,
                    marginBottom: theme.spacing.xs / 2,
                  }}
                >
                  {purpose.name}
                </Text>
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.sm,
                    color: profileData.purpose === purpose.id ? theme.colors.teal : theme.colors.gray600,
                  }}
                >
                  {purpose.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Card>
    </Animated.View>
  );

  const renderAnalyzingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: theme.spacing.xl }}>
      <View
        style={{
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: theme.colors.tealLight,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.xl,
        }}
      >
        <Ionicons name="analytics" size={60} color={theme.colors.teal} />
      </View>
      
      <Text
        style={{
          fontFamily: theme.typography.fontFamily.serif,
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.navy,
          textAlign: 'center',
          marginBottom: theme.spacing.lg,
        }}
      >
        Analiz Ediliyor...
      </Text>
      
      <Text
        style={{
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.gray600,
          textAlign: 'center',
          marginBottom: theme.spacing.xl,
        }}
      >
        Profil bilgileriniz işleniyor ve kişiselleştirilmiş deneyim hazırlanıyor
      </Text>
      
      <View
        style={{
          width: '100%',
          height: 4,
          backgroundColor: theme.colors.gray200,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Animated.View
          style={{
            height: '100%',
            backgroundColor: theme.colors.teal,
            borderRadius: 2,
            width: '100%',
          }}
        />
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderPhysicalStep();
      case 1:
        return renderFaceTypeStep();
      case 2:
        return renderInterestsStep();
      case 3:
        return renderPurposeStep();
      default:
        return renderPhysicalStep();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return profileData.height && profileData.weight && profileData.age;
      case 1:
        return profileData.faceType;
      case 2:
        return profileData.interests.length > 0;
      case 3:
        return profileData.purpose;
      default:
        return false;
    }
  };

  if (isAnalyzing) {
    return renderAnalyzingScreen();
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.cream }}>
      {/* Header */}
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
        <View style={{ alignItems: 'center', marginBottom: theme.spacing.lg }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.md,
              ...theme.shadows.md,
            }}
          >
            <Image
              source={require('../../assets/ico.png')}
              style={{
                width: 45,
                height: 45,
                resizeMode: 'contain',
              }}
            />
          </View>
          
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['2xl'],
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.white,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            Profil Oluştur
          </Text>
        </View>
        
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.base,
            color: theme.colors.cream,
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          {steps[currentStep].description}
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ 
          flexGrow: 1,
          padding: theme.spacing.md,
          paddingBottom: theme.spacing.xl
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderProgressBar()}
        {renderCurrentStep()}
      </ScrollView>

      {/* Continue Button */}
      <View
        style={{
          padding: theme.spacing.lg,
          backgroundColor: theme.colors.white,
          borderTopWidth: 1,
          borderTopColor: theme.colors.gray200,
          ...theme.shadows.md,
        }}
      >
        <Button
          title={currentStep === steps.length - 1 ? 'Profili Tamamla ve Başla' : 'Devam Et'}
          variant="secondary"
          size="lg"
          onPress={handleNext}
          disabled={!canProceed()}
          style={{
            backgroundColor: !canProceed() ? theme.colors.gray300 : theme.colors.teal,
            borderRadius: theme.borderRadius.xl,
            paddingVertical: theme.spacing.lg,
            ...theme.shadows.lg,
          }}
          icon={
            <Ionicons
              name={currentStep === steps.length - 1 ? 'checkmark-circle' : 'arrow-forward-circle'}
              size={24}
              color={theme.colors.white}
            />
          }
          iconPosition="right"
        />
      </View>
    </View>
  );
};

export default UserProfileScreen;
