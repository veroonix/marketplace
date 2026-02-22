// components/ThemedNavigation.tsx
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import { AppNavigator } from '../navigation/AppNavigator';

export const ThemedNavigation = () => {
  const { theme } = useTheme();
  const navTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer theme={navTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
};