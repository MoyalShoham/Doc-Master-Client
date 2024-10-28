import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Image } from 'react-native';
import { Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import {ANDROID_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID} from '../core/config';


const Welcome = ({ navigation }) => {
    const GoogleLogOut = () => {
        const [request, response, promptAsync] = Google.useAuthRequest({
            androidClientId: ANDROID_GOOGLE_CLIENT_ID,
            webClientId: WEB_GOOGLE_CLIENT_ID,
        });

        const googleLogOut = async () => {
            try {
                await signOut(auth);
                await SecureStore.deleteItemAsync('accessToken');
                console.log('Successfully logged out');
            } catch (error) {
                console.error('Error logging out:', error);
            }

        }
        

    }


    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Logo.png')} />
            <Text style={styles.text}>Welcome To Doc-Master</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login-Screen')}
            >
                <Text style={styles.buttonText}>Log-in</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Signup-Screen')}
            >
                <Text style={styles.buttonText}>Sign-up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Google-Signin-Screen')}
            >
                <Text style={styles.buttonText}>Google Sign-in</Text>
            </TouchableOpacity>
            <Button title='LogOut from Google' onPress={()=> googleLogOut()} />


            <StatusBar style="auto" />
        </View>
    );
};

export default Welcome;
