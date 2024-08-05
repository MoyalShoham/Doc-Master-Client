// firebase-config.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBrV7hY0xa4ajhskUGMRfjcg_OwI0RDuno",
  authDomain: "doc-master-server.firebaseapp.com",
  projectId: "doc-master-server",
  storageBucket: "doc-master-server.appspot.com",
  messagingSenderId: "114125547111",
  appId: "1:114125547111:web:e7a665ca18ecf05c5916c2",
  measurementId: "G-80B6X3F0SL"
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { app, auth };
