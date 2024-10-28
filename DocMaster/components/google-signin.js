import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential, signOut } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleLogo } from '../assets/icons';
import { theme } from '../core/theme';
import { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID, SERVER_URL } from '../core/config';
import { auth } from '../core/fire-base-config';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../core/firebaseConfig';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLogin() {
  const [userinfo, setUserinfo] = useState();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: ANDROID_GOOGLE_CLIENT_ID,
    iosClientId: IOS_GOOGLE_CLIENT_ID,
    webClientId: WEB_GOOGLE_CLIENT_ID,
  });

  const navigation = useNavigation();

  useEffect(() => {
    const handleSignIn = async () => {
      if (response?.type === 'success') {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);

        try {
          const result = await signInWithCredential(auth, credential);
          const user = result.user;
          console.log('Successfully signed in with Google', user.email);

          // Check if user already exists in Firestore
          const userDoc = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userDoc);

          if (!userSnap.exists()) {
            // If user does not exist, register in Firestore
            await setDoc(userDoc, {
              email: user.email,
              full_name: user.displayName,
              uid: user.uid,
            });
          }

          // Store token in SecureStore
          await SecureStore.setItemAsync('accessToken', user.accessToken);

          Alert.alert('Logged in!', `You are now logged in as ${user.email}`);
          navigation.navigate('Home-Screen', { screen: 'Home' });
        } catch (error) {
          console.error('Error signing in with Google', error);
        }
      }
    };

    handleSignIn();
  }, [response]);

  const handleGoogleSignIn = async () => {
    await signOut(auth); // Clear Firebase session before signing in
    promptAsync(); // Initiate Google sign-in
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleGoogleSignIn}>
      <GoogleLogo />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: theme.colors.google,
    backgroundColor: theme.colors.surface,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    width: 50,
    marginVertical: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
});
