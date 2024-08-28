import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';
import HomeDrawer from './navigation/drawer';
// import GoogleSignIn from './components/google-signin';
// import * as Google from 'expo-auth-session/providers/google';
// import * as WebBrowser from 'expo-web-browser';
// import {
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   signInWithCredential,
// } from 'firebase/auth';
// import {WEB_CLIENT_ID, ANDROID_CLIENT_ID, auth } from './core/fire-base-config';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as SecureStore from 'expo-secure-store';


// WebBrowser.maybeCompleteAuthSession();

//   const [userInfo, setUserInfo] = useState();
  
//   const [request, response, promptAsync] = Google.useAuthRequest({
//     androidClientId: ANDROID_CLIENT_ID,
//     webClientId: WEB_CLIENT_ID,
//     // redirectUri: 'https://auth.expo.io/@shohamoyal/docmaster',
//   });

//   useEffect(() => {
//     if(response?.type === 'success' && response?.authentication) {
//       const {id_token} = response.params;
//       const credential = GoogleAuthProvider.credential(id_token);
//       signInWithCredential(auth, credential);
//     }
//   }, [response]);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       if (user) {
//         console.log(JSON.stringify(user, null, 2));
//       } else {
//         console.log('Not signed in');
//       }
//     });

//     return () => unsubscribe();
//   }, []);
export default function App() {

  return (
      <NavigationContainer>
        {/* <HomeStack /> */}
        <HomeDrawer />
      </NavigationContainer>
  );
}
