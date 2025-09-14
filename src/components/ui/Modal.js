import React from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal, Dimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { theme } from '../../styles/theme';

const { width, height } = Dimensions.get('window');

const Modal = ({
  visible,
  onClose,
  title,
  children,
  showCloseButton = true,
  variant = 'default',
  style = {},
  contentStyle = {},
  ...props
}) => {
  const getOverlayStyles = () => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  });

  const getModalStyles = () => {
    const baseStyles = {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius['2xl'],
      margin: theme.spacing.lg,
      maxWidth: width - theme.spacing.xl,
      maxHeight: height * 0.8,
      ...theme.shadows.lg,
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.white,
      },
      navy: {
        backgroundColor: theme.colors.navy,
      },
      cream: {
        backgroundColor: theme.colors.cream,
      },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
    };
  };

  const getHeaderStyles = () => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.creamDark,
  });

  const getTitleStyles = () => {
    const baseStyles = {
      fontFamily: theme.typography.fontFamily.serif,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.xl,
      flex: 1,
    };

    const variantStyles = {
      default: { color: theme.colors.navy },
      navy: { color: theme.colors.white },
      cream: { color: theme.colors.navy },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
    };
  };

  const getContentStyles = () => ({
    padding: theme.spacing.xl,
  });

  if (!visible) return null;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      {...props}
    >
      <View style={getOverlayStyles()}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} />
        <View style={[getModalStyles(), style]}>
          {title && (
            <View style={getHeaderStyles()}>
              <Text style={getTitleStyles()}>{title}</Text>
              {showCloseButton && (
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    padding: theme.spacing.sm,
                    borderRadius: theme.borderRadius.full,
                    backgroundColor: theme.colors.gray100,
                  }}
                >
                  <Ionicons
                    name="close"
                    size={20}
                    color={theme.colors.gray600}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={[getContentStyles(), contentStyle]}>
            {children}
          </View>
        </View>
      </View>
    </RNModal>
  );
};

export default Modal;
