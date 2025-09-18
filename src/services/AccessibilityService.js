import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccessibilityInfo } from 'react-native';

class AccessibilityService {
  static STORAGE_KEYS = {
    ACCESSIBILITY_SETTINGS: 'accessibility_settings',
    VOICE_OVER_ENABLED: 'voice_over_enabled',
    LARGE_TEXT_ENABLED: 'large_text_enabled',
    HIGH_CONTRAST_ENABLED: 'high_contrast_enabled',
    REDUCED_MOTION_ENABLED: 'reduced_motion_enabled',
  };

  // Default accessibility settings
  static DEFAULT_SETTINGS = {
    voiceOverEnabled: false,
    largeTextEnabled: false,
    highContrastEnabled: false,
    reducedMotionEnabled: false,
    fontSize: 'normal', // small, normal, large, extra-large
    colorBlindSupport: false,
    screenReader: false,
    keyboardNavigation: false,
    focusIndicators: true,
    hapticFeedback: true,
    soundEffects: true,
  };

  // Initialize accessibility service
  static async initialize() {
    try {
      // Check system accessibility settings
      const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
      
      // Get stored settings
      const settings = await this.getAccessibilitySettings();
      
      // Update with system settings
      settings.screenReader = isScreenReaderEnabled;
      settings.reducedMotionEnabled = isReduceMotionEnabled;
      
      // Save updated settings
      await this.saveAccessibilitySettings(settings);
      
      return settings;
    } catch (error) {
      console.error('Error initializing accessibility service:', error);
      return this.DEFAULT_SETTINGS;
    }
  }

  // Get accessibility settings
  static async getAccessibilitySettings() {
    try {
      const settings = await AsyncStorage.getItem(this.STORAGE_KEYS.ACCESSIBILITY_SETTINGS);
      return settings ? JSON.parse(settings) : { ...this.DEFAULT_SETTINGS };
    } catch (error) {
      console.error('Error getting accessibility settings:', error);
      return { ...this.DEFAULT_SETTINGS };
    }
  }

  // Save accessibility settings
  static async saveAccessibilitySettings(settings) {
    try {
      await AsyncStorage.setItem(this.STORAGE_KEYS.ACCESSIBILITY_SETTINGS, JSON.stringify(settings));
      return true;
    } catch (error) {
      console.error('Error saving accessibility settings:', error);
      return false;
    }
  }

  // Update specific setting
  static async updateSetting(key, value) {
    try {
      const settings = await this.getAccessibilitySettings();
      settings[key] = value;
      await this.saveAccessibilitySettings(settings);
      return true;
    } catch (error) {
      console.error('Error updating accessibility setting:', error);
      return false;
    }
  }

  // Get font size multiplier
  static getFontSizeMultiplier(fontSize) {
    const multipliers = {
      small: 0.8,
      normal: 1.0,
      large: 1.2,
      'extra-large': 1.4,
    };
    return multipliers[fontSize] || 1.0;
  }

  // Get accessible colors
  static getAccessibleColors(theme, highContrast = false) {
    if (!highContrast) {
      return theme.colors;
    }

    // High contrast color scheme
    return {
      ...theme.colors,
      background: '#000000',
      surface: '#1A1A1A',
      onBackground: '#FFFFFF',
      onSurface: '#FFFFFF',
      primary: '#00FF00',
      secondary: '#FFFF00',
      error: '#FF0000',
      success: '#00FF00',
      warning: '#FFFF00',
      info: '#00FFFF',
    };
  }

  // Get accessible spacing
  static getAccessibleSpacing(baseSpacing, largeText = false) {
    if (!largeText) {
      return baseSpacing;
    }

    // Increase spacing for large text
    return {
      xs: baseSpacing.xs * 1.2,
      sm: baseSpacing.sm * 1.2,
      md: baseSpacing.md * 1.2,
      lg: baseSpacing.lg * 1.2,
      xl: baseSpacing.xl * 1.2,
      '2xl': baseSpacing['2xl'] * 1.2,
      '3xl': baseSpacing['3xl'] * 1.2,
      '4xl': baseSpacing['4xl'] * 1.2,
      '5xl': baseSpacing['5xl'] * 1.2,
    };
  }

  // Get accessible typography
  static getAccessibleTypography(baseTypography, fontSize = 'normal', largeText = false) {
    const multiplier = this.getFontSizeMultiplier(fontSize);
    const largeTextMultiplier = largeText ? 1.2 : 1.0;
    const finalMultiplier = multiplier * largeTextMultiplier;

    return {
      ...baseTypography,
      fontSize: {
        xs: Math.round(baseTypography.fontSize.xs * finalMultiplier),
        sm: Math.round(baseTypography.fontSize.sm * finalMultiplier),
        base: Math.round(baseTypography.fontSize.base * finalMultiplier),
        lg: Math.round(baseTypography.fontSize.lg * finalMultiplier),
        xl: Math.round(baseTypography.fontSize.xl * finalMultiplier),
        '2xl': Math.round(baseTypography.fontSize['2xl'] * finalMultiplier),
        '3xl': Math.round(baseTypography.fontSize['3xl'] * finalMultiplier),
        '4xl': Math.round(baseTypography.fontSize['4xl'] * finalMultiplier),
        '5xl': Math.round(baseTypography.fontSize['5xl'] * finalMultiplier),
        '6xl': Math.round(baseTypography.fontSize['6xl'] * finalMultiplier),
      },
    };
  }

  // Get accessible shadows
  static getAccessibleShadows(baseShadows, highContrast = false) {
    if (!highContrast) {
      return baseShadows;
    }

    // Enhanced shadows for high contrast
    return {
      ...baseShadows,
      sm: {
        ...baseShadows.sm,
        shadowOpacity: 0.3,
        elevation: 2,
      },
      md: {
        ...baseShadows.md,
        shadowOpacity: 0.4,
        elevation: 6,
      },
      lg: {
        ...baseShadows.lg,
        shadowOpacity: 0.5,
        elevation: 10,
      },
    };
  }

  // Get accessible border radius
  static getAccessibleBorderRadius(baseBorderRadius, reducedMotion = false) {
    if (!reducedMotion) {
      return baseBorderRadius;
    }

    // Reduce border radius for reduced motion
    return {
      sm: baseBorderRadius.sm * 0.5,
      md: baseBorderRadius.md * 0.5,
      lg: baseBorderRadius.lg * 0.5,
      xl: baseBorderRadius.xl * 0.5,
      '2xl': baseBorderRadius['2xl'] * 0.5,
      '3xl': baseBorderRadius['3xl'] * 0.5,
      full: baseBorderRadius.full,
    };
  }

  // Get accessible theme
  static async getAccessibleTheme(baseTheme) {
    try {
      const settings = await this.getAccessibilitySettings();
      
      return {
        ...baseTheme,
        colors: this.getAccessibleColors(baseTheme, settings.highContrastEnabled),
        spacing: this.getAccessibleSpacing(baseTheme.spacing, settings.largeTextEnabled),
        typography: this.getAccessibleTypography(
          baseTheme.typography,
          settings.fontSize,
          settings.largeTextEnabled
        ),
        shadows: this.getAccessibleShadows(baseTheme.shadows, settings.highContrastEnabled),
        borderRadius: this.getAccessibleBorderRadius(baseTheme.borderRadius, settings.reducedMotionEnabled),
        accessibility: {
          ...settings,
          focusIndicators: settings.focusIndicators,
          hapticFeedback: settings.hapticFeedback,
          soundEffects: settings.soundEffects,
        },
      };
    } catch (error) {
      console.error('Error getting accessible theme:', error);
      return baseTheme;
    }
  }

  // Announce to screen reader
  static announceForAccessibility(message, priority = 'polite') {
    try {
      AccessibilityInfo.announceForAccessibility(message);
    } catch (error) {
      console.error('Error announcing for accessibility:', error);
    }
  }

  // Set accessibility focus
  static setAccessibilityFocus(reactTag) {
    try {
      AccessibilityInfo.setAccessibilityFocus(reactTag);
    } catch (error) {
      console.error('Error setting accessibility focus:', error);
    }
  }

  // Get accessibility info
  static async getAccessibilityInfo() {
    try {
      const isScreenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      const isReduceMotionEnabled = await AccessibilityInfo.isReduceMotionEnabled();
      const isBoldTextEnabled = await AccessibilityInfo.isBoldTextEnabled();
      const isGrayscaleEnabled = await AccessibilityInfo.isGrayscaleEnabled();
      const isInvertColorsEnabled = await AccessibilityInfo.isInvertColorsEnabled();
      
      return {
        isScreenReaderEnabled,
        isReduceMotionEnabled,
        isBoldTextEnabled,
        isGrayscaleEnabled,
        isInvertColorsEnabled,
      };
    } catch (error) {
      console.error('Error getting accessibility info:', error);
      return {
        isScreenReaderEnabled: false,
        isReduceMotionEnabled: false,
        isBoldTextEnabled: false,
        isGrayscaleEnabled: false,
        isInvertColorsEnabled: false,
      };
    }
  }

  // Check if accessibility is enabled
  static async isAccessibilityEnabled() {
    try {
      const settings = await this.getAccessibilitySettings();
      const systemInfo = await this.getAccessibilityInfo();
      
      return (
        settings.voiceOverEnabled ||
        settings.largeTextEnabled ||
        settings.highContrastEnabled ||
        settings.reducedMotionEnabled ||
        systemInfo.isScreenReaderEnabled ||
        systemInfo.isReduceMotionEnabled ||
        systemInfo.isBoldTextEnabled ||
        systemInfo.isGrayscaleEnabled ||
        systemInfo.isInvertColorsEnabled
      );
    } catch (error) {
      console.error('Error checking accessibility enabled:', error);
      return false;
    }
  }

  // Get accessibility recommendations
  static async getAccessibilityRecommendations() {
    try {
      const settings = await this.getAccessibilitySettings();
      const systemInfo = await this.getAccessibilityInfo();
      const recommendations = [];

      // Screen reader recommendations
      if (systemInfo.isScreenReaderEnabled && !settings.voiceOverEnabled) {
        recommendations.push({
          type: 'screen_reader',
          title: 'Ekran Okuyucu Desteği',
          description: 'Ekran okuyucu kullanıyorsunuz. Sesli geri bildirim özelliklerini etkinleştirin.',
          action: 'enable_voice_over',
        });
      }

      // Large text recommendations
      if (systemInfo.isBoldTextEnabled && !settings.largeTextEnabled) {
        recommendations.push({
          type: 'large_text',
          title: 'Büyük Metin',
          description: 'Sistem büyük metin kullanıyor. Uygulama metin boyutunu artırın.',
          action: 'enable_large_text',
        });
      }

      // High contrast recommendations
      if (systemInfo.isInvertColorsEnabled && !settings.highContrastEnabled) {
        recommendations.push({
          type: 'high_contrast',
          title: 'Yüksek Kontrast',
          description: 'Sistem yüksek kontrast kullanıyor. Uygulama kontrastını artırın.',
          action: 'enable_high_contrast',
        });
      }

      // Reduced motion recommendations
      if (systemInfo.isReduceMotionEnabled && !settings.reducedMotionEnabled) {
        recommendations.push({
          type: 'reduced_motion',
          title: 'Azaltılmış Hareket',
          description: 'Sistem azaltılmış hareket kullanıyor. Animasyonları azaltın.',
          action: 'enable_reduced_motion',
        });
      }

      return recommendations;
    } catch (error) {
      console.error('Error getting accessibility recommendations:', error);
      return [];
    }
  }

  // Apply accessibility recommendations
  static async applyRecommendation(recommendation) {
    try {
      switch (recommendation.action) {
        case 'enable_voice_over':
          await this.updateSetting('voiceOverEnabled', true);
          break;
        case 'enable_large_text':
          await this.updateSetting('largeTextEnabled', true);
          await this.updateSetting('fontSize', 'large');
          break;
        case 'enable_high_contrast':
          await this.updateSetting('highContrastEnabled', true);
          break;
        case 'enable_reduced_motion':
          await this.updateSetting('reducedMotionEnabled', true);
          break;
        default:
          return false;
      }
      
      return true;
    } catch (error) {
      console.error('Error applying accessibility recommendation:', error);
      return false;
    }
  }

  // Reset accessibility settings
  static async resetAccessibilitySettings() {
    try {
      await this.saveAccessibilitySettings({ ...this.DEFAULT_SETTINGS });
      return true;
    } catch (error) {
      console.error('Error resetting accessibility settings:', error);
      return false;
    }
  }

  // Get accessibility statistics
  static async getAccessibilityStats() {
    try {
      const settings = await this.getAccessibilitySettings();
      const systemInfo = await this.getAccessibilityInfo();
      
      return {
        userSettings: {
          voiceOverEnabled: settings.voiceOverEnabled,
          largeTextEnabled: settings.largeTextEnabled,
          highContrastEnabled: settings.highContrastEnabled,
          reducedMotionEnabled: settings.reducedMotionEnabled,
          fontSize: settings.fontSize,
          colorBlindSupport: settings.colorBlindSupport,
          screenReader: settings.screenReader,
          keyboardNavigation: settings.keyboardNavigation,
          focusIndicators: settings.focusIndicators,
          hapticFeedback: settings.hapticFeedback,
          soundEffects: settings.soundEffects,
        },
        systemSettings: systemInfo,
        recommendations: await this.getAccessibilityRecommendations(),
        isEnabled: await this.isAccessibilityEnabled(),
      };
    } catch (error) {
      console.error('Error getting accessibility stats:', error);
      return null;
    }
  }
}

export default AccessibilityService;
