import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import styles from '../styles';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';



const Welcome = ({navigation}) => {

    return(
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../assets/Logo.png')} />
            <Text style={styles.text} >Welcome To Doc-Master</Text>
            <Button title="Get Started" onPress={() => navigation.navigate('Login-Screen')} />
            
            <StatusBar style="auto" />
        </View>
    );
}

export default Welcome;
