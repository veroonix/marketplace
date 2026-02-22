import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Colors } from '../constants/Colors';

export const useStyles = () => {
  const { theme } = useTheme();

  return useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[theme].background,
    },
    header: {
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
    divider: {
      height: 1,
      backgroundColor: Colors[theme].border,
      marginLeft: 64,
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
    versionText: {
      color: '#CCC',
      fontSize: 14,
    },
  }), [theme]);
};