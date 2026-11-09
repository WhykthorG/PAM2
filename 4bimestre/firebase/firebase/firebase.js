import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Platform } from 'react-native';

const firebaseConfig = {
  apiKey: 'AIzaSyBclInxbT_Lb9bN8UmVqWAK1nbgcYfLnIg',
  authDomain: 'teste-4c408.firebaseapp.com',
  projectId: 'teste-4c408',
  storageBucket: 'teste-4c408.firebasestorage.app',
  messagingSenderId: '884410317559',
  appId: '1:884410317559:web:6360706cf0e273bf1d71f2',
  measurementId: 'G-Y9M8R87KH0',
};

export const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const analytics = Platform.OS === 'web' ? getAnalytics(app) : null;