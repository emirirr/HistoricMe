import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../styles/theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  style = {},
  textStyle = {},
  ...props
}) => {
  const getButtonStyles = () => {
    const baseStyles = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.borderRadius.lg,
      ...theme.shadows.md,
    };

    const sizeStyles = {
      sm: {
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.sm,
        minHeight: 36,
      },
      md: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
        minHeight: 48,
      },
      lg: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        minHeight: 56,
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.burgundy,
      },
      secondary: {
        backgroundColor: theme.colors.teal,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.burgundy,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.6 : 1,
    };
  };

  const getTextStyles = () => {
    const baseStyles = {
      fontFamily: theme.typography.fontFamily.sans,
      fontWeight: theme.typography.fontWeight.semibold,
      textAlign: 'center',
    };

    const sizeStyles = {
      sm: { fontSize: theme.typography.fontSize.sm },
      md: { fontSize: theme.typography.fontSize.base },
      lg: { fontSize: theme.typography.fontSize.lg },
    };

    const variantStyles = {
      primary: { color: theme.colors.white },
      secondary: { color: theme.colors.cream },
      outline: { color: theme.colors.burgundy },
      ghost: { color: theme.colors.teal },
    };

    return {
      ...baseStyles,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  const renderContent = () => {
    if (loading) {
      return (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' || variant === 'ghost' ? theme.colors.burgundy : theme.colors.white}
        />
      );
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon && iconPosition === 'left' && (
          <View style={{ marginRight: theme.spacing.sm }}>
            {icon}
          </View>
        )}
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
        {icon && iconPosition === 'right' && (
          <View style={{ marginLeft: theme.spacing.sm }}>
            {icon}
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {variant === 'primary' && (
        <LinearGradient
          colors={[theme.colors.burgundy, theme.colors.burgundyDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            getButtonStyles(),
            { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
            style,
          ]}
        >
          {renderContent()}
        </LinearGradient>
      )}
      {variant !== 'primary' && renderContent()}
    </TouchableOpacity>
  );
};

export default Button;
