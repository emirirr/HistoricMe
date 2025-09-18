// Light Theme
export const lightTheme = {
  colors: {
    // Primary Brand Colors
    cream: '#F0D9B6',      // Ana açık renk
    teal: '#386160',       // Ana koyu renk  
    burgundy: '#75281F',   // Ana vurgu rengi
    black: '#000000',
    white: '#FFFFFF',
    
    // Extended palette
    creamLight: '#F5F0E6',  
    creamDark: '#E8E0D3',
    tealLight: '#4A7A79',
    tealDark: '#2A4A49',
    burgundyLight: '#8A3028',
    burgundyDark: '#5C1F17',
    
    // Semantic colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Neutral colors
    gray50: '#F9FAFB',
    gray100: '#F3F4F6',
    gray200: '#E5E7EB',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#374151',
    gray800: '#1F2937',
    gray900: '#111827',
    
    // Background colors
    background: '#F0D9B6',
    surface: '#FFFFFF',
    surfaceVariant: '#F5F0E6',
    onBackground: '#1F2937',
    onSurface: '#374151',
    onSurfaceVariant: '#6B7280',
  },
};

// Dark Theme
export const darkTheme = {
  colors: {
    // Primary Brand Colors (adjusted for dark mode)
    cream: '#2A2A2A',      // Dark background
    teal: '#4A7A79',       // Lighter teal for dark mode
    burgundy: '#8A3028',   // Lighter burgundy for dark mode
    black: '#FFFFFF',      // Inverted
    white: '#000000',      // Inverted
    
    // Extended palette (dark mode)
    creamLight: '#1F1F1F',  
    creamDark: '#333333',
    tealLight: '#5A8A89',
    tealDark: '#3A5A59',
    burgundyLight: '#9A4038',
    burgundyDark: '#6A2028',
    
    // Semantic colors (adjusted for dark mode)
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    info: '#60A5FA',
    
    // Neutral colors (dark mode)
    gray50: '#1F2937',
    gray100: '#374151',
    gray200: '#4B5563',
    gray300: '#6B7280',
    gray400: '#9CA3AF',
    gray500: '#D1D5DB',
    gray600: '#E5E7EB',
    gray700: '#F3F4F6',
    gray800: '#F9FAFB',
    gray900: '#FFFFFF',
    
    // Background colors (dark mode)
    background: '#1A1A1A',
    surface: '#2A2A2A',
    surfaceVariant: '#333333',
    onBackground: '#F3F4F6',
    onSurface: '#E5E7EB',
    onSurfaceVariant: '#9CA3AF',
  },
};

// Default theme (light)
export const theme = lightTheme;

// Theme structure for both light and dark
const themeStructure = {
  typography: {
    fontFamily: {
      serif: 'System',
      sans: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60,
    },
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
    '4xl': 80,
    '5xl': 96,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 32,
    full: 9999,
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#1E2A78',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1E2A78',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    },
    historic: {
      shadowColor: '#1E2A78',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 20,
      elevation: 6,
    },
  },
  
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};

// Merge theme structure with colors
export const createTheme = (colorTheme) => ({
  ...themeStructure,
  colors: colorTheme.colors,
});

// Create complete themes
export const completeLightTheme = createTheme(lightTheme);
export const completeDarkTheme = createTheme(darkTheme);

// Default export
export default completeLightTheme;
