import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';
import firebase from './firebase-config';

export default function App() {
  return (
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
  );
}
