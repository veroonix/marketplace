import * as SQLite from 'expo-sqlite';
import { Ad } from './types';

const db = SQLite.openDatabaseSync('marketplace.db');

export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      price TEXT,
      date TEXT
    );
  `);
};

export const addAd = async (ad: Ad) => {
  return await db.runAsync(
    'INSERT INTO ads (title, description, price, date) VALUES (?, ?, ?, ?)',
    [ad.title, ad.description, ad.price, ad.date]
  );
};

export const getAllAds = async (): Promise<Ad[]> => {
  return await db.getAllAsync('SELECT * FROM ads');
};