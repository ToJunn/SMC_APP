// src/ui/theme.ts - Theme từ project MỚI
import { DefaultTheme } from 'react-native-paper';

export const COLORS = {
  // Primary colors từ UI mới
  primary: '#E67E22',        // Orange chủ đạo
  secondary: '#39BF42',      // Green
  accent: '#54724E',         // Dark green
  error: '#DD643C',          // Red-orange
  
  // Backgrounds
  background: '#F5F5F5',
  white: '#FFFFFF',
  
  // Grays
  darkGray: '#333333',
  mediumGray: '#888888',
  lightGray: '#E0E0E0',
  
  // Text
  text: '#333333',
  textSecondary: '#666666',
  placeholder: '#B0B0B0',
};

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
};

export const Radius = {
  small: 8,
  medium: 12,
  large: 20,
  xlarge: 30,
  round: 999,
};

export const FontSize = {
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  heading: 24,
  title: 32,
};

export const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    accent: COLORS.secondary,
    background: COLORS.background,
    surface: COLORS.white,
    text: COLORS.text,
    error: COLORS.error,
  },
};

// Shadow styles
export const Shadow = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};