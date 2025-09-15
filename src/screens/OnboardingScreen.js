import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Animated, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'Tarihin Büyük Figürleriyle Tanış',
    subtitle: 'Fotoğrafını yükle ve tarihin efsanevi liderleriyle, bilim insanlarıyla ve sanatçılarıyla yan yana görün',
    icon: 'camera',
    color: theme.colors.burgundy,
    image: null,
  },
  {
    id: 2,
    title: 'Yapay Zeka ile Dönüştür',
    subtitle: 'Gelişmiş AI teknolojisi sayesinde fotoğrafını farklı tarihsel dönemlerde ve stillerde yeniden yarat',
    icon: 'sparkles',
    color: theme.colors.gold,
    image: null,
  },
  {
    id: 3,
    title: 'Paylaş ve Keşfet',
    subtitle: 'Yaratımlarını arkadaşlarınla paylaş, sosyal medyada paylaş ve tarihi figürlerle olan benzersiz anlarını yaşa',
    icon: 'share-social',
    color: theme.colors.navy,
    image: null,
  },
];

const OnboardingScreen = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      
      // Animate to next slide
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();

      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const renderSlide = (item, index) => (
    <View
      key={item.id}
      style={{
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
      }}
    >
      <LinearGradient
        colors={[theme.colors.cream, theme.colors.creamLight]}
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Decorative Background */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.05,
          }}
        >
          {[...Array(20)].map((_, i) => (
            <View
              key={i}
              style={{
                position: 'absolute',
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: item.color,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </View>

        {/* Icon Container */}
        <View
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: item.color,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing['2xl'],
            ...theme.shadows.lg,
          }}
        >
          <Ionicons
            name={item.icon}
            size={80}
            color={theme.colors.white}
          />
        </View>

        {/* Emoji */}
        <Text
          style={{
            fontSize: 100,
            marginBottom: theme.spacing.lg,
          }}
        >
          {item.image}
        </Text>

        {/* Title */}
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize['3xl'],
            fontWeight: theme.typography.fontWeight.bold,
            color: theme.colors.navy,
            textAlign: 'center',
            marginBottom: theme.spacing.lg,
            lineHeight: theme.typography.lineHeight.tight * theme.typography.fontSize['3xl'],
          }}
        >
          {item.title}
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.navyDark,
            textAlign: 'center',
            lineHeight: theme.typography.lineHeight.relaxed * theme.typography.fontSize.lg,
            opacity: 0.8,
          }}
        >
          {item.subtitle}
        </Text>
      </LinearGradient>
    </View>
  );

  const renderPagination = () => (
    <View
      style={{
        position: 'absolute',
        bottom: 120,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {onboardingData.map((_, index) => (
        <View
          key={index}
          style={{
            width: index === currentIndex ? 24 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: index === currentIndex ? theme.colors.burgundy : theme.colors.gray300,
            marginHorizontal: 4,
            transition: 'all 0.3s ease',
          }}
        />
      ))}
    </View>
  );

  const renderButtons = () => (
    <View
      style={{
        position: 'absolute',
        bottom: 40,
        left: 0,
        right: 0,
        paddingHorizontal: theme.spacing.xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Button
        title="Geç"
        variant="ghost"
        size="md"
        onPress={handleSkip}
        style={{ minWidth: 80 }}
      />
      
      <Button
        title={currentIndex === onboardingData.length - 1 ? 'Başla' : 'İleri'}
        variant="primary"
        size="md"
        onPress={handleNext}
        icon={
          currentIndex === onboardingData.length - 1 ? (
            <Ionicons name="checkmark" size={20} color={theme.colors.white} />
          ) : (
            <Ionicons name="arrow-forward" size={20} color={theme.colors.white} />
          )
        }
        iconPosition="right"
        style={{ minWidth: 120 }}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.cream }}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentIndex(newIndex);
          }}
          scrollEventThrottle={16}
        >
          {onboardingData.map((item, index) => renderSlide(item, index))}
        </ScrollView>

        {renderPagination()}
        {renderButtons()}
      </Animated.View>
    </View>
  );
};

export default OnboardingScreen;
