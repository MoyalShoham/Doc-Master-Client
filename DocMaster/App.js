import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import styles from './styles';
import { Image } from 'react-native';


export default function App() {
  return (
    <View style={styles.container}>
      <Image source={require('./assets/Logo.png')} />
      <Text style={styles.text}>Welcome</Text>
      
      <StatusBar style="auto" />
    </View>
  );
}


