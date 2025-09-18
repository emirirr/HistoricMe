import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { completeLightTheme as theme } from '../../styles/theme';

const LoadingSpinner = ({
  size = 'large',
  color = theme.colors.burgundy,
  text = null,
  overlay = false,
  style = {},
  textStyle = {},
}) => {
  const getContainerStyles = () => {
    const baseStyles = {
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (overlay) {
      return {
        ...baseStyles,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 1000,
      };
    }

    return {
      ...baseStyles,
      padding: theme.spacing.xl,
    };
  };

  const getTextStyles = () => ({
    fontFamily: theme.typography.fontFamily.sans,
    fontSize: theme.typography.fontSize.base,
    color: theme.colors.gray600,
    marginTop: theme.spacing.md,
    textAlign: 'center',
  });

  return (
    <View style={[getContainerStyles(), style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={[getTextStyles(), textStyle]}>{text}</Text>}
    </View>
  );
};

export default LoadingSpinner;
