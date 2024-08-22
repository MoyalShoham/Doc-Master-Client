import React, { useLayoutEffect, useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import styles from '../styles';
import { SERVER_URL } from '../core/config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account Login',
      headerTitleAlign: 'center',
      
    });
  }, [navigation]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${SERVER_URL}/user/login`, {
        email,
        password,
      });
      const { accessToken } = res.data;

      if (accessToken) {
        await SecureStore.setItemAsync('accessToken', accessToken);
        console.log('Token stored successfully');
        
        navigation.navigate('Home-Screen');
      } else {
        console.error('No token received');
        Alert.alert('Login Failed', 'Invalid email or password');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      Alert.alert('Login Error', 'An error occurred during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Don't have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Signup-Screen')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
