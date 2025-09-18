import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { completeLightTheme as theme } from '../../styles/theme';

const Card = ({
  children,
  title,
  subtitle,
  icon,
  onPress = null,
  variant = 'default',
  style = {},
  contentStyle = {},
  ...props
}) => {
  const getCardStyles = () => {
    const baseStyles = {
      borderRadius: theme.borderRadius.xl,
      ...theme.shadows.historic,
      overflow: 'hidden',
    };

    const variantStyles = {
      default: {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.creamDark,
      },
      navy: {
        backgroundColor: theme.colors.navy,
      },
      cream: {
        backgroundColor: theme.colors.cream,
        borderWidth: 1,
        borderColor: theme.colors.goldLight,
      },
      gold: {
        backgroundColor: theme.colors.gold,
      },
      burgundy: {
        backgroundColor: theme.colors.burgundy,
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
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: variant === 'default' ? theme.colors.cream : 'transparent',
    borderBottomWidth: variant === 'default' ? 1 : 0,
    borderBottomColor: theme.colors.creamDark,
  });

  const getTitleStyles = () => {
    const baseStyles = {
      fontFamily: theme.typography.fontFamily.serif,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.lg,
      flex: 1,
    };

    const variantStyles = {
      default: { color: theme.colors.navy },
      navy: { color: theme.colors.white },
      cream: { color: theme.colors.navy },
      gold: { color: theme.colors.black },
      burgundy: { color: theme.colors.white },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
    };
  };

  const getSubtitleStyles = () => {
    const baseStyles = {
      fontFamily: theme.typography.fontFamily.sans,
      fontSize: theme.typography.fontSize.sm,
      marginTop: theme.spacing.xs,
    };

    const variantStyles = {
      default: { color: theme.colors.gray600 },
      navy: { color: theme.colors.creamLight },
      cream: { color: theme.colors.navyDark },
      gold: { color: theme.colors.black },
      burgundy: { color: theme.colors.creamLight },
    };

    return {
      ...baseStyles,
      ...variantStyles[variant],
    };
  };

  const getContentStyles = () => ({
    padding: theme.spacing.lg,
  });

  const renderHeader = () => {
    if (!title && !icon) return null;

    return (
      <View style={getHeaderStyles()}>
        {icon && (
          <View style={{ marginRight: theme.spacing.md }}>
            {icon}
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={getTitleStyles()}>{title}</Text>
          {subtitle && <Text style={getSubtitleStyles()}>{subtitle}</Text>}
        </View>
      </View>
    );
  };

  const renderContent = () => (
    <View style={[getContentStyles(), contentStyle]}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        style={[getCardStyles(), style]}
        onPress={onPress}
        activeOpacity={0.8}
        {...props}
      >
        {renderHeader()}
        {renderContent()}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[getCardStyles(), style]} {...props}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

export default Card;
