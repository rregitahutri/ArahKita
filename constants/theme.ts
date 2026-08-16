/**
 * ArahKita Theme & Color Palette Configuration
 */

import { Platform } from 'react-native';

export const Palette = {
  blue: {
    900: '#0F3F99',
    800: '#164BAE',
    700: '#245BC3',
    600: '#3E76DE',
    500: '#5590FF',
    400: '#76A4F9',
    300: '#BACEF4',
    200: '#CBDAF6',
    100: '#EDF3FD',
  },
  button: {
    primary: '#5590FF',
    second: '#CBDAF6',
    third: '#DDDDDD',
  },
  text: {
    active: '#333333',
    inactive: '#8E8E8E',
  },
  brand: {
    google: '#EA4335',
    facebook: '#4F75E2',
    danger: '#E5484D',
  },
};

export const Colors = {
  light: {
    text: Palette.text.active,
    background: '#FFFFFF',
    tint: Palette.button.primary,
    icon: Palette.text.inactive,
    tabIconDefault: Palette.text.inactive,
    tabIconSelected: Palette.button.primary,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: Palette.blue[400],
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: Palette.blue[400],
  },
};

export const Fonts = {
  regular: Platform.select({
    ios: 'Geist-Regular',
    android: 'Geist-Regular',
    web: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    default: 'Geist-Regular',
  }),
  medium: Platform.select({
    ios: 'Geist-Medium',
    android: 'Geist-Medium',
    web: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    default: 'Geist-Medium',
  }),
  semiBold: Platform.select({
    ios: 'Geist-SemiBold',
    android: 'Geist-SemiBold',
    web: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    default: 'Geist-SemiBold',
  }),
  bold: Platform.select({
    ios: 'Geist-Bold',
    android: 'Geist-Bold',
    web: 'Geist, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    default: 'Geist-Bold',
  }),
};
