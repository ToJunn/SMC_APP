// src/ui/theme.ts
import { MD3LightTheme as PaperDefaultTheme } from "react-native-paper";

export const COLORS = {
  primary: "#2E8B57",
  background: "#FFFFFF",
  text: "#222222",
  subtle: "#666666",
  border: "#E0E0E0",
  error: "#D32F2F",
  white: "#FFFFFF",
  darkGray: "#333333",
  mediumGray: "#CCCCCC",
  lightGray: "#F0F0F0",
} as const;

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};

export const Radius = {
  small: 4,
  medium: 8,
  large: 12,
};

export const FontSize = {
  body: 16,
  heading: 24,
  large: 20,
  medium: 18,
  regular: 16,
};

export const appTheme = {
  ...PaperDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: COLORS.primary,
    background: COLORS.background,
    surface: "#FFFFFF",
    onSurfaceVariant: COLORS.subtle,
    error: COLORS.error,
  },
} as const;
