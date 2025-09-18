import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Animated, Dimensions, Image, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { completeLightTheme as theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const slides = [
    {
      title: "HistoricMe'ye Hoş Geldiniz",
      subtitle: "Tarihin büyük figürleriyle tanışın",
      description: "AI teknolojisi ile kendinizi tarihi karakterlerle birleştirin",
      icon: "sparkles",
      color: theme.colors.teal
    },
    {
      title: "Fotoğrafınızı Yükleyin",
      subtitle: "En iyi sonuç için net bir fotoğraf",
      description: "Yüzünüzün net göründüğü bir fotoğraf seçin",
      icon: "camera",
      color: theme.colors.burgundy
    },
    {
      title: "Tarihi Figür Seçin",
      subtitle: "Hangi dönemden olmak istersiniz?",
      description: "Osmanlı, Selçuklu, Bizans ve daha fazlası",
      icon: "library",
      color: theme.colors.gold
    },
    {
      title: "Sonucunuzu Görün",
      subtitle: "AI ile oluşturulan tarihi portreniz",
      description: "Kendinizi tarihi bir figür olarak görün",
      icon: "image",
      color: theme.colors.navy
    }
  ];

  useEffect(() => {
    const startAnimation = () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const timer = setTimeout(() => {
      startAnimation();
    }, 500);

    // Slide otomatik geçiş
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 12000); // 12 saniye toplam

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
      clearInterval(slideInterval);
    };
  }, [fadeAnim, scaleAnim, onFinish]);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: currentSlide,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentSlide, slideAnim]);

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
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          {/* HistoricMe Logo */}
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.lg,
              ...theme.shadows.lg,
            }}
          >
            <Image
              source={require('../../assets/ico.png')}
              style={{
                width: 70,
                height: 70,
                resizeMode: 'contain',
              }}
            />
          </View>

          {/* App Title */}
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.serif,
              fontSize: theme.typography.fontSize['4xl'],
              fontWeight: theme.typography.fontWeight.black,
              color: theme.colors.white,
              textAlign: 'center',
              marginBottom: theme.spacing.sm,
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            HistoricMe
          </Text>

          {/* Subtitle */}
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.lg,
              color: theme.colors.white,
              textAlign: 'center',
              opacity: 0.9,
              letterSpacing: 1,
            }}
          >
            Tarihin Büyük Figürleriyle Tanışın
          </Text>
        </Animated.View>
      </LinearGradient>

      {/* Slides Container */}
      <View style={{ flex: 1, padding: theme.spacing.lg }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          {slides.map((slide, index) => (
            <Animated.View
              key={index}
              style={{
                opacity: currentSlide === index ? 1 : 0.3,
                transform: [{
                  scale: currentSlide === index ? 1 : 0.9
                }],
                marginBottom: theme.spacing.xl,
                alignItems: 'center',
              }}
            >
              {/* Icon */}
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: slide.color,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing.lg,
                  ...theme.shadows.md,
                }}
              >
                <Ionicons name={slide.icon} size={40} color={theme.colors.white} />
              </View>

              {/* Title */}
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.serif,
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.navy,
                  textAlign: 'center',
                  marginBottom: theme.spacing.sm,
                }}
              >
                {slide.title}
              </Text>

              {/* Subtitle */}
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.lg,
                  fontWeight: theme.typography.fontWeight.semibold,
                  color: slide.color,
                  textAlign: 'center',
                  marginBottom: theme.spacing.md,
                }}
              >
                {slide.subtitle}
              </Text>

              {/* Description */}
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.gray600,
                  textAlign: 'center',
                  lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.base,
                  paddingHorizontal: theme.spacing.md,
                }}
              >
                {slide.description}
              </Text>
            </Animated.View>
          ))}
        </ScrollView>

        {/* Slide Indicators */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: theme.spacing.lg,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={{
                width: currentSlide === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: currentSlide === index ? theme.colors.teal : theme.colors.gray300,
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        {/* Loading Text */}
        <Animated.View
          style={{
            alignItems: 'center',
            marginTop: theme.spacing.lg,
            opacity: fadeAnim,
          }}
        >
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.sm,
              color: theme.colors.gray500,
              textAlign: 'center',
            }}
          >
            Uygulama hazırlanıyor...
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;
