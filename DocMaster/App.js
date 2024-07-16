import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, Text, View } from 'react-native';
import styles from './styles';
import { Image } from 'react-native';
import Welcome from './screens/welcome-screen';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/stack';


export default function App() {
  return (
    <NavigationContainer>
        <HomeStack />
    </NavigationContainer>
  );
}


