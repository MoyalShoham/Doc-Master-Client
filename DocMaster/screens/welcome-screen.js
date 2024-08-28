import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Image } from 'react-native';

const Welcome = ({ navigation }) => {
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

            <StatusBar style="auto" />
        </View>
    );
};

export default Welcome;
