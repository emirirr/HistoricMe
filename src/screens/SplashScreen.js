import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

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
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();
    };

    const timer = setTimeout(() => {
      startAnimation();
    }, 500);

    const finishTimer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(finishTimer);
    };
  }, [fadeAnim, scaleAnim, rotateAnim, onFinish]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={[theme.colors.teal, theme.colors.tealDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Background Pattern */}
      <View
        style={{
          position: 'absolute',
          top: -100,
          left: -100,
          width: width + 200,
          height: height + 200,
          opacity: 0.1,
        }}
      >
        <Animated.View
          style={{
            transform: [{ rotate }],
            width: '100%',
            height: '100%',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <View
              key={i}
              style={{
                position: 'absolute',
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: theme.colors.gold,
                top: `${(i * 12.5) % 100}%`,
                left: `${(i * 15.625) % 100}%`,
                opacity: 0.3,
              }}
            />
          ))}
        </Animated.View>
      </View>

      {/* Main Content */}
      <Animated.View
        style={{
          alignItems: 'center',
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        {/* Diamond Icon */}
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: theme.colors.burgundy,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.xl,
            ...theme.shadows.lg,
          }}
        >
          <Ionicons
            name="diamond"
            size={60}
            color={theme.colors.white}
          />
        </View>

        {/* App Title */}
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.serif,
            fontSize: theme.typography.fontSize['5xl'],
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
            color: theme.colors.cream,
            textAlign: 'center',
            opacity: 0.9,
            letterSpacing: 1,
          }}
        >
          Tarihin Büyük Figürleriyle
        </Text>

        {/* Decorative Line */}
        <View
          style={{
            width: 100,
            height: 3,
            backgroundColor: theme.colors.burgundy,
            marginTop: theme.spacing.lg,
            borderRadius: 2,
          }}
        />
      </Animated.View>

      {/* Loading Indicator */}
      <Animated.View
        style={{
          position: 'absolute',
          bottom: 100,
          opacity: fadeAnim,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
          <Text
            style={{
              fontFamily: theme.typography.fontFamily.sans,
              fontSize: theme.typography.fontSize.base,
              color: theme.colors.cream,
              marginRight: theme.spacing.sm,
            }}
          >
            Yükleniyor
          </Text>
          {[...Array(3)].map((_, i) => (
            <Animated.View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: theme.colors.burgundy,
                marginHorizontal: 2,
                opacity: fadeAnim,
              }}
            />
          ))}
      </Animated.View>
    </LinearGradient>
  );
};

export default SplashScreen;
