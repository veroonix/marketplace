import React, { useEffect, useState, useMemo } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Plus, Settings, PackageOpen } from 'lucide-react-native';
import { RootStackParamList, Ad } from '../types';
import { getAllAds, addAd } from '../database';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';

type MainScreenProps = StackNavigationProp<RootStackParamList, 'Main'>;

export default function MainScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<MainScreenProps>();
  const { theme, isDark } = useTheme();
  const [ads, setAds] = useState<Ad[]>([]);

  const loadData = async () => {
    const data = await getAllAds();
    setAds(data as Ad[]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddTestAd = async () => {
    await addAd({
      title: "Велосипед",
      description: "Меняю на самокат или продам",
      price: "5000 ₽",
      date: new Date().toLocaleDateString()
    });
    loadData();
  };

  const renderItem = ({ item }: { item: Ad }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() => navigation.navigate('Details', { ad: item })}
    >
      <View style={styles.cardContent}>
        <View style={styles.textContainer}>
          <Text style={styles.adTitle} numberOfLines={1}>{item.title}</Text>
          <Text style={styles.adPrice}>{item.price}</Text>
        </View>
        <Text style={styles.adDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: Colors[theme].card,
      borderBottomWidth: 1,
      borderBottomColor: Colors[theme].border,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '800',
      color: Colors[theme].text,
      letterSpacing: -0.5,
    },
    iconButton: {
      padding: 8,
      backgroundColor: Colors[theme].iconBackground,
      borderRadius: 12,
    },
    listContent: {
      paddingBottom: 100,
      paddingTop: 10,
    },
    card: {
      backgroundColor: Colors[theme].card,
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 16,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 3,
    },
    cardContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    textContainer: {
      flex: 1,
      marginRight: 10,
    },
    adTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: Colors[theme].text,
      marginBottom: 4,
    },
    adPrice: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors[theme].primary, // используем акцентный цвет (зелёный)
    },
    adDate: {
      fontSize: 12,
      color: Colors[theme].secondaryText,
      fontWeight: '500',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100,
    },
    emptyText: {
      marginTop: 12,
      fontSize: 16,
      color: Colors[theme].secondaryText,
    },
    fab: {
      position: 'absolute',
      bottom: 30,
      right: 20,
      backgroundColor: Colors[theme].primary,
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
    },
  }), [theme]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('mainTitle')}</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.iconButton}
        >
          <Settings size={24} color={Colors[theme].text} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={ads}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <PackageOpen size={64} color={Colors[theme].secondaryText} />
            <Text style={styles.emptyText}>{t('noAds')}</Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleAddTestAd}
        activeOpacity={0.8}
      >
        <Plus color="#FFF" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}