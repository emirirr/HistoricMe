const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable New Architecture support
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configure for New Architecture
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

module.exports = config;
