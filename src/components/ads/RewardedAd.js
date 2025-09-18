import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Dimensions, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { completeLightTheme as theme } from '../../styles/theme';

const { width } = Dimensions.get('window');

const RewardedAd = ({ 
  visible = false, 
  onClose = () => {},
  onRewardEarned = () => {},
  rewardType = 'premium', // 'premium', 'coins', 'unlock'
  rewardAmount = 1,
  onWatchAd = () => {}
}) => {
  const [isWatching, setIsWatching] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  const getRewardInfo = () => {
    switch (rewardType) {
      case 'coins':
        return {
          icon: 'diamond',
          title: 'Altın Kazan',
          description: `${rewardAmount} altın kazan`,
          color: theme.colors.gold,
        };
      case 'unlock':
        return {
          icon: 'unlock',
          title: 'Özellik Aç',
          description: 'Premium özellikleri aç',
          color: theme.colors.burgundy,
        };
      default: // premium
        return {
          icon: 'star',
          title: 'Premium Deneyim',
          description: 'Reklamsız deneyim kazan',
          color: theme.colors.teal,
        };
    }
  };

  const rewardInfo = getRewardInfo();

  const handleWatchAd = () => {
    setIsWatching(true);
    onWatchAd();
    
    // Simüle edilmiş reklam izleme
    setTimeout(() => {
      setIsWatching(false);
      setIsCompleted(true);
      onRewardEarned();
    }, 3000);
  };

  const handleClose = () => {
    setIsCompleted(false);
    onClose();
  };

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: theme.spacing.xl,
        }}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            width: width - 40,
            maxWidth: 400,
            borderRadius: theme.borderRadius.xl,
            overflow: 'hidden',
            ...theme.shadows.lg,
          }}
        >
          <LinearGradient
            colors={[theme.colors.cream, theme.colors.creamLight]}
            style={{
              padding: theme.spacing.xl,
            }}
          >
            {/* Close Button */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 15,
                right: 15,
                width: 30,
                height: 30,
                borderRadius: 15,
                backgroundColor: theme.colors.gray200,
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
              }}
              onPress={handleClose}
            >
              <Ionicons name="close" size={18} color={theme.colors.gray600} />
            </TouchableOpacity>

            {/* Reward Icon */}
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: rewardInfo.color,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                marginBottom: theme.spacing.lg,
                ...theme.shadows.md,
              }}
            >
              <Ionicons name={rewardInfo.icon} size={50} color={theme.colors.white} />
            </View>

            {/* Reward Title */}
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.serif,
                fontSize: theme.typography.fontSize['2xl'],
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.navy,
                textAlign: 'center',
                marginBottom: theme.spacing.md,
              }}
            >
              {rewardInfo.title}
            </Text>

            {/* Reward Description */}
            <Text
              style={{
                fontFamily: theme.typography.fontFamily.sans,
                fontSize: theme.typography.fontSize.base,
                color: theme.colors.navyDark,
                textAlign: 'center',
                marginBottom: theme.spacing.xl,
                lineHeight: 22,
              }}
            >
              {rewardInfo.description}
            </Text>

            {/* Ad Info */}
            <View
              style={{
                backgroundColor: theme.colors.gray100,
                borderRadius: theme.borderRadius.lg,
                padding: theme.spacing.md,
                marginBottom: theme.spacing.lg,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="play-circle" size={24} color={theme.colors.teal} />
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.sm,
                  color: theme.colors.gray600,
                  marginLeft: theme.spacing.sm,
                  flex: 1,
                }}
              >
                Kısa bir reklam izleyerek ödülü kazan
              </Text>
            </View>

            {/* Action Buttons */}
            {!isCompleted ? (
              <TouchableOpacity
                style={{
                  backgroundColor: isWatching ? theme.colors.gray300 : rewardInfo.color,
                  borderRadius: theme.borderRadius.lg,
                  paddingVertical: theme.spacing.md,
                  paddingHorizontal: theme.spacing.lg,
                  alignItems: 'center',
                  marginBottom: theme.spacing.sm,
                }}
                onPress={handleWatchAd}
                disabled={isWatching}
              >
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: isWatching ? theme.colors.gray600 : theme.colors.white,
                  }}
                >
                  {isWatching ? 'Reklam İzleniyor...' : 'Reklam İzle'}
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  backgroundColor: theme.colors.green,
                  borderRadius: theme.borderRadius.lg,
                  paddingVertical: theme.spacing.md,
                  paddingHorizontal: theme.spacing.lg,
                  alignItems: 'center',
                  marginBottom: theme.spacing.sm,
                }}
              >
                <Ionicons name="checkmark-circle" size={24} color={theme.colors.white} />
                <Text
                  style={{
                    fontFamily: theme.typography.fontFamily.sans,
                    fontSize: theme.typography.fontSize.lg,
                    fontWeight: theme.typography.fontWeight.bold,
                    color: theme.colors.white,
                    marginTop: theme.spacing.xs,
                  }}
                >
                  Ödül Kazanıldı!
                </Text>
              </View>
            )}

            {/* Close Button */}
            <TouchableOpacity
              style={{
                backgroundColor: 'transparent',
                borderRadius: theme.borderRadius.lg,
                paddingVertical: theme.spacing.sm,
                paddingHorizontal: theme.spacing.lg,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: theme.colors.gray300,
              }}
              onPress={handleClose}
            >
              <Text
                style={{
                  fontFamily: theme.typography.fontFamily.sans,
                  fontSize: theme.typography.fontSize.base,
                  color: theme.colors.gray600,
                }}
              >
                Kapat
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default RewardedAd;
