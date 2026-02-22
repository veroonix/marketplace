import React, { useMemo } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const { t } = useTranslation();
  const route = useRoute<DetailsRouteProp>();
  const { ad } = route.params;
  const { theme, isDark } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    content: {
      padding: 20,
    },
    label: {
      fontSize: 14,
      color: Colors[theme].primary,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors[theme].text,
      marginBottom: 10,
    },
    price: {
      fontSize: 20,
      color: Colors[theme].primary,
      marginBottom: 15,
    },
    description: {
      fontSize: 16,
      lineHeight: 24,
      color: Colors[theme].secondaryText,
      marginBottom: 20,
    },
    date: {
      fontSize: 14,
      color: Colors[theme].secondaryText,
    }
  }), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.content}>
        <Text style={styles.label}>{t('details')}</Text>
        <Text style={styles.title}>{ad.title}</Text>
        <Text style={styles.price}>{ad.price}</Text>
        <Text style={styles.description}>{ad.description}</Text>
        <Text style={styles.date}>{t('date')}: {ad.date}</Text>
      </View>
    </SafeAreaView>
  );
}