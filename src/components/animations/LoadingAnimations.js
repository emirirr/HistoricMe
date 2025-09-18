import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import LottieAnimation from './LottieAnimation';

const { width, height } = Dimensions.get('window');

// AI Processing Animation
export const AIProcessingAnimation = ({ visible, progress = 0, message = 'AI işleniyor...' }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Pulse animation
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Rotate animation
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [visible, pulseAnim, rotateAnim]);

  if (!visible) return null;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <View style={{
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        minWidth: 200,
        ...theme.shadows.lg,
      }}>
        <Animated.View style={{
          transform: [{ scale: pulseAnim }, { rotate }],
          marginBottom: theme.spacing.lg,
        }}>
          <Ionicons name="sparkles" size={60} color={theme.colors.teal} />
        </Animated.View>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.serif,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.onSurface,
          textAlign: 'center',
          marginBottom: theme.spacing.md,
        }}>
          {message}
        </Text>
        
        {progress > 0 && (
          <View style={{
            width: '100%',
            height: 8,
            backgroundColor: theme.colors.gray200,
            borderRadius: theme.borderRadius.full,
            overflow: 'hidden',
            marginBottom: theme.spacing.sm,
          }}>
            <View style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: theme.colors.teal,
              borderRadius: theme.borderRadius.full,
            }} />
          </View>
        )}
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: theme.typography.fontSize.sm,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
        }}>
          {progress > 0 ? `%${Math.round(progress)}` : 'Lütfen bekleyin...'}
        </Text>
      </View>
    </View>
  );
};

// Success Animation
export const SuccessAnimation = ({ visible, message = 'Başarılı!', onFinish }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 2 seconds
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 2000);
    } else {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, scaleAnim, opacityAnim, onFinish]);

  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <Animated.View style={{
        transform: [{ scale: scaleAnim }],
        opacity: opacityAnim,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        minWidth: 200,
        ...theme.shadows.lg,
      }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.success,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}>
          <Ionicons name="checkmark" size={40} color={theme.colors.white} />
        </View>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.serif,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.onSurface,
          textAlign: 'center',
        }}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

// Error Animation
export const ErrorAnimation = ({ visible, message = 'Hata oluştu!', onFinish }) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
          Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
        ]),
      ]).start();

      // Auto hide after 3 seconds
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 3000);
    } else {
      shakeAnim.setValue(0);
      opacityAnim.setValue(0);
    }
  }, [visible, shakeAnim, opacityAnim, onFinish]);

  if (!visible) return null;

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <Animated.View style={{
        transform: [{ translateX: shakeAnim }],
        opacity: opacityAnim,
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        minWidth: 200,
        ...theme.shadows.lg,
      }}>
        <View style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          backgroundColor: theme.colors.error,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}>
          <Ionicons name="close" size={40} color={theme.colors.white} />
        </View>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.serif,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.onSurface,
          textAlign: 'center',
        }}>
          {message}
        </Text>
      </Animated.View>
    </View>
  );
};

// Level Up Animation
export const LevelUpAnimation = ({ visible, level, onFinish }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const confettiAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(confettiAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto hide after 4 seconds
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 4000);
    } else {
      scaleAnim.setValue(0);
      rotateAnim.setValue(0);
      confettiAnim.setValue(0);
    }
  }, [visible, scaleAnim, rotateAnim, confettiAnim, onFinish]);

  if (!visible) return null;

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <Animated.View style={{
        transform: [{ scale: scaleAnim }],
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        minWidth: 250,
        ...theme.shadows.lg,
      }}>
        <Animated.View style={{
          transform: [{ rotate }],
          marginBottom: theme.spacing.lg,
        }}>
          <Ionicons name="trophy" size={80} color={theme.colors.gold} />
        </Animated.View>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.serif,
          fontSize: theme.typography.fontSize['2xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.onSurface,
          textAlign: 'center',
          marginBottom: theme.spacing.sm,
        }}>
          Seviye Atladınız!
        </Text>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: theme.typography.fontSize['3xl'],
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.teal,
          textAlign: 'center',
        }}>
          {level}
        </Text>
      </Animated.View>
    </View>
  );
};

// Badge Earned Animation
export const BadgeEarnedAnimation = ({ visible, badge, onFinish }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
        Animated.loop(
          Animated.sequence([
            Animated.timing(glowAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(glowAnim, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();

      // Auto hide after 3 seconds
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 3000);
    } else {
      scaleAnim.setValue(0);
      glowAnim.setValue(0);
    }
  }, [visible, scaleAnim, glowAnim, onFinish]);

  if (!visible) return null;

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  return (
    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      backgroundColor: 'rgba(0,0,0,0.8)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
    }}>
      <Animated.View style={{
        transform: [{ scale: scaleAnim }],
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.xl,
        padding: theme.spacing.xl,
        alignItems: 'center',
        minWidth: 250,
        ...theme.shadows.lg,
      }}>
        <Animated.View style={{
          opacity: glowOpacity,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: theme.colors.gold,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: theme.spacing.lg,
        }}>
          <Ionicons name={badge?.icon || 'medal'} size={50} color={theme.colors.white} />
        </Animated.View>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.serif,
          fontSize: theme.typography.fontSize.lg,
          fontWeight: theme.typography.fontWeight.bold,
          color: theme.colors.onSurface,
          textAlign: 'center',
          marginBottom: theme.spacing.sm,
        }}>
          Yeni Rozet!
        </Text>
        
        <Text style={{
          fontFamily: theme.typography.fontFamily.sans,
          fontSize: theme.typography.fontSize.base,
          color: theme.colors.onSurfaceVariant,
          textAlign: 'center',
        }}>
          {badge?.name || 'Rozet'}
        </Text>
      </Animated.View>
    </View>
  );
};

// Skeleton Loading
export const SkeletonLoading = ({ width = 200, height = 20, style }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View style={[
      {
        width,
        height,
        backgroundColor: theme.colors.gray200,
        borderRadius: theme.borderRadius.sm,
        overflow: 'hidden',
      },
      style,
    ]}>
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: theme.colors.gray100,
        transform: [{ translateX: shimmerTranslateX }],
      }} />
    </View>
  );
};
