import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: {
    en: {
      translation: {
        mainTitle: "Marketplace",
        addAd: "Post Ad",
        price: "Price/Exchange",
        settings: "Settings",
        darkTheme: "Dark Mode",
        lang: "Language",
        noAds: "No ads yet",
        appearance: "Appearance",
        appSettings: "Application",
        details: "Details",
      }
    },
    ru: {
      translation: {
        mainTitle: "Объявления",
        addAd: "Подать объявление",
        price: "Цена/Обмен",
        settings: "Настройки",
        darkTheme: "Темная тема",
        lang: "Язык",
        noAds: "Объявлений пока нет",
        appearance: "Внешний вид",
        appSettings: "Приложение",
        details: "Детали",
      }
    }
  },
  lng: 'ru',
  fallbackLng: 'en',
});

export default i18n;