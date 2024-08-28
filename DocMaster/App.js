import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';
import HomeDrawer from './navigation/drawer';
import GoogleSignIn from './screens/google-signin-screen';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signInWithPopup } from 'firebase/auth';
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID, auth } from './core/fire-base-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { makeRedirectUri } from 'expo-auth-session';
WebBrowser.maybeCompleteAuthSession();


export default function App() {

  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: `com.shoham.docmaster:/oauth2redirect/${ANDROID_CLIENT_ID}`,
    // redirectUri: makeRedirectUri({ 
    //   native: ,
    //   useProxy: true,
    // }),


  });


  useEffect(() => {
    console.log('response:', response);
    if(response?.type === 'success') {
      const {id_token} = response.params;
      console.log('id_token:', id_token);
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);


    }

  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUserInfo(user);
      } else {
        setUserInfo(null);
      }
      console.log('user info:', userInfo);
    });
    return () => unsubscribe();
  }, []);

  return (
      <NavigationContainer>
        {/* <HomeStack /> */}
        <HomeDrawer />
        {/* <GoogleSignIn promptAsync={promptAsync} /> */}
      </NavigationContainer>
  );
}
