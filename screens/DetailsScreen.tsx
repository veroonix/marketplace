import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTranslation } from 'react-i18next';

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

export default function DetailsScreen() {
  const { t } = useTranslation();
  const route = useRoute<DetailsRouteProp>();
  const { ad } = route.params;

  return (
    <SafeAreaView style={styles.container}>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 },
  label: { fontSize: 14, color: '#007bff', fontWeight: 'bold', marginBottom: 10 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 20, color: 'green', marginBottom: 15 },
  description: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 20 },
  date: { fontSize: 14, color: '#999' }
});