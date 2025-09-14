import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';

const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error = null,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  onRightIconPress = null,
  style = {},
  inputStyle = {},
  multiline = false,
  numberOfLines = 1,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secureTextEntry);

  const getContainerStyles = () => ({
    marginBottom: theme.spacing.md,
  });

  const getInputContainerStyles = () => ({
    flexDirection: 'row',
    alignItems: multiline ? 'flex-start' : 'center',
    backgroundColor: theme.colors.cream,
    borderWidth: 2,
    borderColor: error 
      ? theme.colors.error 
      : isFocused 
        ? theme.colors.burgundy 
        : theme.colors.creamDark,
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: multiline ? theme.spacing.md : theme.spacing.sm,
    minHeight: multiline ? 80 : 48,
    ...theme.shadows.sm,
    opacity: disabled ? 0.6 : 1,
  });

  const getInputStyles = () => ({
    flex: 1,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.sans,
    color: theme.colors.black,
    textAlignVertical: multiline ? 'top' : 'center',
  });

  const getLabelStyles = () => ({
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.sans,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.navy,
    marginBottom: theme.spacing.xs,
  });

  const getErrorStyles = () => ({
    fontSize: theme.typography.fontSize.xs,
    fontFamily: theme.typography.fontFamily.sans,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[getContainerStyles(), style]}>
      {label && <Text style={getLabelStyles()}>{label}</Text>}
      
      <View style={getInputContainerStyles()}>
        {leftIcon && (
          <View style={{ marginRight: theme.spacing.sm, marginTop: multiline ? 2 : 0 }}>
            {leftIcon}
          </View>
        )}
        
        <TextInput
          style={[getInputStyles(), inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.gray500}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{ marginLeft: theme.spacing.sm, marginTop: multiline ? 2 : 0 }}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={theme.colors.gray500}
            />
          </TouchableOpacity>
        )}
        
        {rightIcon && (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={{ marginLeft: theme.spacing.sm, marginTop: multiline ? 2 : 0 }}
            disabled={!onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {error && <Text style={getErrorStyles()}>{error}</Text>}
    </View>
  );
};

export default Input;
