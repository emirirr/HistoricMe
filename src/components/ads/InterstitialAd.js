import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../styles/theme';

const { width, height } = Dimensions.get('window');

const InterstitialAd = ({ 
  visible = false, 
  onClose = () => {},
  onAdComplete = () => {},
  duration = 5000, // 5 saniye
  showSkipButton = true,
  skipAfter = 3000 // 3 saniye sonra skip butonu aktif
}) => {
  const [timeLeft, setTimeLeft] = useState(duration / 1000);
  const [canSkip, setCanSkip] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    if (visible) {
      // Animasyon başlat
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Timer başlat
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onAdComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Skip butonu aktif et
      const skipTimer = setTimeout(() => {
        setCanSkip(true);
      }, skipAfter);

      return () => {
        clearInterval(timer);
        clearTimeout(skipTimer);
      };
    }
  }, [visible, duration, skipAfter]);

  const handleSkip = () => {
    if (canSkip) {
      onClose();
    }
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      statusBarTranslucent={true}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            width: width - 40,
            height: height * 0.7,
            borderRadius: theme.borderRadius.xl,
            overflow: 'hidden',
          }}
        >
          <LinearGradient
            colors={[theme.colors.teal, theme.colors.tealDark]}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: theme.spacing.xl,
            }}
          >
            {/* Ad Content */}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Ad Icon */}
              <View
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  backgroundColor: theme.colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: theme.spacing.xl,
                  ...theme.shadows.lg,
                }}
              >
                <Ionicons name="tv" size={60} color={theme.colors.teal} />
              </View>

              {/* Ad Title */}
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.serif,
                  fontSize: theme.typography.fontSize['2xl'],
                  fontWeight: theme.typography.fontWeight.bold,
                  color: theme.colors.white,
                  textAlign: 'center',
                  marginBottom: theme.spacing.md,
                }}
              >
                Reklam
              </Text>

              {/* Ad Description */}
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.lg,
                  color: theme.colors.cream,
                  textAlign: 'center',
                  opacity: 0.9,
                  lineHeight: 24,
                }}
              >
                Bu alan tam ekran reklam için ayrılmıştır
              </Text>
            </View>

            {/* Timer */}
            <View
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
              }}
            >
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.white,
                  fontWeight: theme.typography.fontWeight.bold,
                }}
              >
                {timeLeft}s
              </Text>
            </View>

            {/* Skip Button */}
            {showSkipButton && (
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 30,
                  right: 30,
                  backgroundColor: canSkip ? theme.colors.white : theme.colors.gray300,
                  borderRadius: 25,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  opacity: canSkip ? 1 : 0.5,
                }}
                onPress={handleSkip}
                disabled={!canSkip}
              >
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.sm,
                    color: canSkip ? theme.colors.teal : theme.colors.gray600,
                    fontWeight: theme.typography.fontWeight.bold,
                  }}
                >
                  Geç ({timeLeft}s)
                </Text>
              </TouchableOpacity>
            )}
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default InterstitialAd;
