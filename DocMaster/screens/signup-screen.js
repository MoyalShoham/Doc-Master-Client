import React, { useLayoutEffect, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { SERVER_URL } from "../core/config";
import styles from '../styles';
// import GoogleSignInComp from '../components/google-signin';



const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [full_name, setFullName] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Account Login',
      headerTitleAlign: 'center',
      
    });
  }, [navigation]);

  const onRegister = async () => {
    try {
      console.log('Email:', email);

      const res = await axios.post(`${SERVER_URL}/user/register`, {
        email,
        password,
        full_name,
      });

      if (res.data) {
        console.log('Registration successful');
        Alert.alert('Registration Successful', 'You have successfully registered. Please login to continue.');

        try {
          const login = await axios.post(`${SERVER_URL}/user/login`, {
            email,
            password,
          });

          const { accessToken } = login.data;

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
      }
    } catch (error) {
      console.error('Error during registration:', error.message);
      Alert.alert('Registration Error', 'An error occurred during registration. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Register Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={full_name}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Valid Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Password Again"
        value={password2}
        onChangeText={setPassword2}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={onRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.text}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login-Screen')}>
          Login
        </Text>
    </Text>
 

      {/* <GoogleSignInComp /> */}
    </View>
  );
};

export default SignupScreen;
