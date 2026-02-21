import React, { useEffect, useState } from 'react';
import './i18n'; // Импорт инициализации переводов
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppNavigator } from './navigation/AppNavigator'; // Путь к навигатору
import { initDB } from './database';


// Удерживаем сплеш-экран
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    async function prepare() {
      try {
        // 1. Инициализируем базу данных
        await initDB();
        
        // 2. Загружаем сохраненную тему (Требование №4)
        const savedTheme = await AsyncStorage.getItem('theme');
        if (savedTheme) setTheme(savedTheme as 'light' | 'dark');
        
        // Небольшая задержка для красоты (чтобы увидеть сплеш)
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) return null;

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <AppNavigator />
    </NavigationContainer>
  );
}