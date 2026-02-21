import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { Plus, Settings, PackageOpen } from 'lucide-react-native'; // Иконки
import { RootStackParamList, Ad } from '../types';
import { getAllAds, addAd } from '../database';

type MainScreenProps = StackNavigationProp<RootStackParamList, 'Main'>;

export default function MainScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<MainScreenProps>();
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('mainTitle')}</Text>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Settings')}
          style={styles.iconButton}
        >
          <Settings size={24} color="#1A1A1A" />
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
            <PackageOpen size={64} color="#CCC" />
            <Text style={styles.emptyText}>{t('noAds')}</Text>
          </View>
        }
      />

      {/* Floating Action Button */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F4F7', // Светло-серый фон как в современных iOS приложениях
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: -0.5,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
  },
  listContent: {
    paddingBottom: 100, // Отступ снизу, чтобы FAB не перекрывал контент
    paddingTop: 10,
  },
  card: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    // Тени для iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    // Тени для Android
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
    color: '#1A1A1A',
    marginBottom: 4,
  },
  adPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#007AFF', // Акцентный синий
  },
  adDate: {
    fontSize: 12,
    color: '#8E8E93',
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
    color: '#8E8E93',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#1A1A1A', // Стильный черный
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
});