// login-screen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import styles from '../styles';
import { SERVER_URL } from '../core/config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // console.log('Email:', email);
    // console.log("password", password)
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
      <Button title="Login" onPress={handleLogin} />
      <Button title="Go to Home" onPress={() => navigation.navigate('Home-Screen')} />
    </View>
  );
};

export default LoginScreen;
