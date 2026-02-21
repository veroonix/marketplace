import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Загружаем сохраненную тему
    AsyncStorage.getItem('theme').then(val => setIsDarkMode(val === 'dark'));
  }, []);

  const toggleTheme = async (value: boolean) => {
    setIsDarkMode(value);
    await AsyncStorage.setItem('theme', value ? 'dark' : 'light');
    // В реальном приложении здесь нужно уведомлять корневой компонент об изменениях
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('settings')}</Text>
      
      <View style={styles.row}>
        <Text>{t('lang')}</Text>
        <Button title="RU" onPress={() => i18n.changeLanguage('ru')} />
        <Button title="EN" onPress={() => i18n.changeLanguage('en')} />
      </View>

      <View style={styles.row}>
        <Text>{t('darkTheme')}</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }
});