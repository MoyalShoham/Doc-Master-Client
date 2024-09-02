import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';
import HomeDrawer from './navigation/drawer';
import GoogleSignIn from './screens/google-signin-screen';



export default function App() {




 
  return (
      <NavigationContainer>
        {/* <HomeStack /> */}
        <HomeDrawer />
        {/* <GoogleSignIn promptAsync={promptAsync} /> */}
      </NavigationContainer>
  );
}
