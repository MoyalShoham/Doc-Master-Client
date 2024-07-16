import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import Welcome from '../screens/welcome-screen';
import DetailsScreen from '../screens/file-details-screen';
import LoginScreen from '../screens/login-screen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home-Screen" component={HomeScreen} />
      <Stack.Screen name="Details-Screen" component={DetailsScreen} />
      <Stack.Screen name="Login-Screen" component={LoginScreen} />
     
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
  );
}

export default HomeStack;