import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: 'sardar-appointment',
  appId: '1:571893381659:web:39575f69bab409a00bd6be',
  storageBucket: 'sardar-appointment.firebasestorage.app',
  apiKey: 'AIzaSyCNjHSgLbg2wJOdWzz7JrzpUGDWuUZhtGI',
  authDomain: 'sardar-appointment.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '571893381659',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
