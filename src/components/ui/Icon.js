import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { completeLightTheme as theme } from '../../styles/theme';

const Icon = ({
  name,
  size = 24,
  color = theme.colors.navy,
  style = {},
  ...props
}) => {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      style={style}
      {...props}
    />
  );
};

export default Icon;
