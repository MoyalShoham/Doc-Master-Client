import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';
import HomeDrawer from './navigation/drawer';

export default function App() {
  return (
      <NavigationContainer>
        {/* <HomeStack /> */}
        <HomeDrawer />
      </NavigationContainer>
  );
}
