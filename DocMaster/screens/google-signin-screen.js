import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, onAuthStateChanged } from 'firebase/auth';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_URL } from '../core/config';
import { auth } from '../core/fire-base-config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
// import { db } from '../core/firebaseConfig';
import {ANDROID_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID} from '../core/config';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
    webClientId: WEB_GOOGLE_CLIENT_ID,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const handleResponse = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        console.log('id_token:', id_token);
        const credential = GoogleAuthProvider.credential(id_token);
        await signInWithCredential(auth, credential);
        console.log('Successfully signed in with Google', response);
        navigation.navigate('Home-Screen');
        
      }
    };
    handleResponse();
  }, [response]);

  // useEffect(() => {
  //   // const checkLocalUser = async () => {
  //   //   try {
  //   //     const userJSON = await SecureStore.getItemAsync('accessToken');
  //   //     const userData = userJSON ? JSON.parse(userJSON) : null;
  //   //     setUserInfo(userData);
  //   //   } catch (error) {
  //   //     console.error('Error getting user:', error);
  //   //   }
  //   // };

  //   // checkLocalUser();

  //   const unsubscribe = onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       setUserInfo(user);
  //       await SecureStore.setItemAsync('accessToken', user.accessToken);

  //       navigation.navigate('Home-Screen');
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Ionicons name="logo-firebase" size={100} color="#FFA611" />
      <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#FFA611' }}>
        Sign In With{' '}
        <Text style={{ color: '#4285F4' }}>
          G<Text style={{ color: '#Ea4336' }}>
            o<Text style={{ color: '#FBBC04' }}>
              o<Text style={{ color: '#4285F4' }}>
                g<Text style={{ color: '#34A853' }}>
                  l<Text style={{ color: '#Ea4336' }}>e</Text>
                </Text>
              </Text>
            </Text>
          </Text>
        </Text>
      </Text>
      <Text style={{ fontSize: 32, fontWeight: 'bold' }}>And Firebase</Text>
      <TouchableOpacity
        style={{
          backgroundColor: '#4285F4',
          padding: 10,
          borderRadius: 10,
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => promptAsync()}
      >
        <AntDesign name="google" size={30} color="white" />
        <Text style={{ color: 'white', marginLeft: 10, fontSize: 20 }}>Sign In With Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
