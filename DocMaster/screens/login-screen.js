import axios from "axios";
import { View, Text, Button, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import styles from '../styles';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Email:', email);
        try {
            const res = await axios.post('http://172.20.10.4:3000/user/login', {
                email,
                password
            });
            const { accessToken } = res.data;
            console.log('Response:', res.data);

            if (accessToken) {
                await SecureStore.setItemAsync('accessToken', accessToken);
                console.log('Token stored successfully');
                // Navigate to Home Screen or any other screen after successful login
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
}

export default LoginScreen;
