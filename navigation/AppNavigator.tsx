import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { RootStackParamList } from '../types';
import MainScreen from '../screens/MainScreen';
import DetailsScreen from '../screens/DetailsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AdFormScreen from '../screens/AdFormScreen';
import { useTranslation } from 'react-i18next';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator 
      initialRouteName="Main"
      screenOptions={{
        headerStyle: { 
          backgroundColor: '#FFFFFF',
          elevation: 0,           
          shadowOpacity: 0,        
          borderBottomWidth: 1,    
          borderBottomColor: '#F2F2F2',
        },
        headerTintColor: '#1A1A1A', 
        headerTitleStyle: { 
          fontWeight: '700', 
          fontSize: 18,
          color: '#1A1A1A',
        },
        cardStyle: { backgroundColor: '#F8F9FA' }, 
        headerTitleAlign: 'center', 
      }}
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen} 
        options={{ 
          title: t('mainTitle'),
          headerShown: false, 
        }} 
      />
      
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen} 
        options={{ 
          title: t('details'), 
          headerShown: false,
        }} 
      />
      
      <Stack.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: t('settings'),
          headerShown: false, 
          headerTitleAlign: Platform.OS === 'android' ? 'left' : 'center',
        }} 
      />

      <Stack.Screen 
        name="AdForm" 
        component={AdFormScreen} 
          options={{ 
          title: t('addAd'),          
          headerShown: false,           
          headerTitleAlign: Platform.OS === 'android' ? 'left' : 'center',
        }} 
      />
    </Stack.Navigator>
  );
};