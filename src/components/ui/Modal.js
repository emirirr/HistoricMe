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
    // Responsive sizing based on screen dimensions
    const isSmallScreen = width < 375;
    const isMediumScreen = width >= 375 && width < 414;
    const isLargeScreen = width >= 414;
    
    const responsiveMargin = isSmallScreen ? theme.spacing.md : theme.spacing.lg;
    const responsiveMaxWidth = isSmallScreen ? width - theme.spacing.md : 
                              isMediumScreen ? width - theme.spacing.lg : 
                              width - theme.spacing.xl;
    const responsiveMaxHeight = isSmallScreen ? height * 0.85 : 
                               isMediumScreen ? height * 0.8 : 
                               height * 0.75;

    const baseStyles = {
      backgroundColor: theme.colors.white,
      borderRadius: theme.borderRadius['2xl'],
      margin: responsiveMargin,
      maxWidth: responsiveMaxWidth,
      maxHeight: responsiveMaxHeight,
      width: '100%',
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

  const getHeaderStyles = () => {
    const isSmallScreen = width < 375;
    const responsivePaddingHorizontal = isSmallScreen ? theme.spacing.lg : theme.spacing.xl;
    const responsivePaddingVertical = isSmallScreen ? theme.spacing.md : theme.spacing.lg;
    
    return {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: responsivePaddingHorizontal,
      paddingVertical: responsivePaddingVertical,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.creamDark,
    };
  };

  const getTitleStyles = () => {
    const isSmallScreen = width < 375;
    const responsiveFontSize = isSmallScreen ? theme.typography.fontSize.lg : theme.typography.fontSize.xl;
    
    const baseStyles = {
      fontFamily: theme.typography.fontFamily.serif,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: responsiveFontSize,
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

  const getContentStyles = () => {
    const isSmallScreen = width < 375;
    const responsivePadding = isSmallScreen ? theme.spacing.lg : theme.spacing.xl;
    
    return {
      padding: responsivePadding,
    };
  };

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
