import { TextInput, View, Text, Button } from "react-native";
import axios from "axios";
import React, { useState } from "react";
import { Alert } from "react-native";
import * as SecureStore from 'expo-secure-store';
import { SERVER_URL } from "../core/config";
// import GoogleSignIn from "../components/GoogleSignIn";





const SignupScreen = ({ navigation }) => {

    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [full_name, setFullName] = useState('');


    const onRegister = async () => {
        try{
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
                placeholder="password" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TextInput 
                style={styles.input} 
                placeholder="password again" 
                value={password2}
                onChangeText={setPassword2}  
                secureTextEntry
            />

            <Button title="Register" onPress={onRegister} />

            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login-Screen')}
            />
            {/* <GoogleSignIn /> */}
            <Button title="Go back" onPress={() => navigation.goBack()} />

            
        </View>
    );
}

export default SignupScreen;