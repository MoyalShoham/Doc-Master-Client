import { Button, SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { WEB_CLIENT_ID, ANDROID_CLIENT_ID, auth } from '../core/fire-base-config';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { SERVER_URL } from '../core/config';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignIn() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: ANDROID_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
    redirectUri: `com.shoham.docmaster:/oauth2redirect/${ANDROID_CLIENT_ID}`,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      console.log('id_token:', id_token);
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  useEffect(() => {
    const checkLocalUser = async () => {
      try {
        const userJSON = await SecureStore.getItemAsync('accessToken');
        const userData = userJSON ? JSON.parse(userJSON) : null;
        setUserInfo(userData);
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    checkLocalUser();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        await SecureStore.setItemAsync('accessToken', user.accessToken);

        // Call the registerGoogleUser function here
        await registerGoogleUser(user);

        navigation.navigate('Home-Screen');
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const registerGoogleUser = async (userInfo) => {
    try {
      const res = await axios.post(`${SERVER_URL}/user/register/google`, {
        email: userInfo.email,
        full_name: userInfo.displayName,
        _uid: userInfo.uid,
      });

      console.log('res:', res.data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

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
