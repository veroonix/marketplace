// navigation/AppNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; // Убедись, что путь к типам верный
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator 
      initialRouteName="Main"
      screenOptions={{
        headerStyle: { backgroundColor: '#f4511e' }, // Оранжевый стиль для сервиса объявлений
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ title: t('mainTitle') }} 
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ title: t('details') }} 
      />
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: t('settings') }} 
      />
    </Stack.Navigator>
  );
};