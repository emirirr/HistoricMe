import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

const { width } = Dimensions.get('window');

const BannerAd = ({ 
  size = 'standard', // 'standard', 'large', 'medium', 'small'
  style = {},
  onPress = () => {},
  showCloseButton = false,
  onClose = () => {}
}) => {
  const getAdDimensions = () => {
    switch (size) {
      case 'large':
        return { width: width - 32, height: 100 };
      case 'medium':
        return { width: width - 32, height: 80 };
      case 'small':
        return { width: width - 32, height: 60 };
      default: // standard
        return { width: width - 32, height: 90 };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <View
      style={[
        {
          width: dimensions.width,
          height: dimensions.height,
          backgroundColor: theme.colors.gray100,
          borderRadius: theme.borderRadius.lg,
          borderWidth: 1,
          borderColor: theme.colors.gray200,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: theme.spacing.sm,
          position: 'relative',
          ...theme.shadows.sm,
        },
        style,
      ]}
    >
      {/* Close Button */}
      {showCloseButton && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: theme.colors.gray300,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
          onPress={onClose}
        >
          <Ionicons name="close" size={16} color={theme.colors.gray600} />
        </TouchableOpacity>
      )}

      {/* Ad Content */}
      <TouchableOpacity
        style={{
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: theme.spacing.md,
        }}
        onPress={onPress}
        activeOpacity={0.8}
      >
        {/* Ad Icon */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.teal,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.sm,
          }}
        >
          <Ionicons name="megaphone" size={20} color={theme.colors.white} />
        </View>

        {/* Ad Text */}
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.sm,
            color: theme.colors.gray600,
            textAlign: 'center',
            marginBottom: 4,
          }}
        >
          Reklam
        </Text>
        <Text
          style={{
            fontFamily: theme.typography.fontFamily.sans,
            fontSize: theme.typography.fontSize.xs,
            color: theme.colors.gray500,
            textAlign: 'center',
          }}
        >
          Bu alan reklam için ayrılmıştır
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BannerAd;
