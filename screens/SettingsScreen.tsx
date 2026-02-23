import React, { useMemo } from 'react';
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Languages, Moon, ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const { theme, isDark, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const currentLang = i18n.language;

  const handleThemeToggle = (value: boolean) => {
    toggleTheme(value ? 'dark' : 'light');
  };

  const handleLanguageChange = async (lang: 'ru' | 'en') => {
    await i18n.changeLanguage(lang);
    await AsyncStorage.setItem('userLanguage', lang);
  };

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: Colors[theme].card,
      borderBottomWidth: 1,
      borderBottomColor: Colors[theme].border,
    },
    backButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: Colors[theme].iconBackground,
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: Colors[theme].text,
    },
    content: {
      flex: 1,
    },
    title: {
      fontSize: 32,
      fontWeight: '800',
      padding: 20,
      color: Colors[theme].text,
    },
    section: {
      marginBottom: 24,
    },
    sectionLabel: {
      marginHorizontal: 20,
      marginBottom: 8,
      fontSize: 13,
      color: Colors[theme].secondaryText,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    card: {
      backgroundColor: Colors[theme].card,
      marginHorizontal: 16,
      borderRadius: 16,
      paddingVertical: 4,
      elevation: 1,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 2 },
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 12,
      paddingHorizontal: 16,
    },
    rowLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    iconBox: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
      backgroundColor: Colors[theme].iconBackground,
    },
    rowText: {
      fontSize: 16,
      fontWeight: '500',
      color: Colors[theme].text,
    },
    langButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    langBadge: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      backgroundColor: Colors[theme].iconBackground,
    },
    activeBadge: {
      backgroundColor: Colors[theme].primary,
    },
    langBadgeText: {
      fontWeight: '600',
      color: Colors[theme].secondaryText,
    },
    activeBadgeText: {
      color: '#FFF',
    },
  }), [theme]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Кастомный хедер */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={24} color={Colors[theme].text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('settings')}</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>{t('settings')}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('appearance')}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}>
                  <Moon size={20} color={Colors[theme].text} />
                </View>
                <Text style={styles.rowText}>{t('darkTheme')}</Text>
              </View>
              <Switch
                value={isDark}
                onValueChange={handleThemeToggle}
                trackColor={Colors[theme].switchTrack}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>{t('appSettings')}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.iconBox}>
                  <Languages size={20} color={Colors[theme].primary} />
                </View>
                <Text style={styles.rowText}>{t('lang')}</Text>
              </View>
              <View style={styles.langButtons}>
                <TouchableOpacity
                  onPress={() => handleLanguageChange('ru')}
                  style={[styles.langBadge, currentLang === 'ru' && styles.activeBadge]}
                >
                  <Text style={[styles.langBadgeText, currentLang === 'ru' && styles.activeBadgeText]}>RU</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleLanguageChange('en')}
                  style={[styles.langBadge, currentLang === 'en' && styles.activeBadge]}
                >
                  <Text style={[styles.langBadgeText, currentLang === 'en' && styles.activeBadgeText]}>EN</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}