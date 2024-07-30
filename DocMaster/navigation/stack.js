// stack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import Welcome from '../screens/welcome-screen';
import DetailsScreen from '../screens/file-details-screen';
import LoginScreen from '../screens/login-screen';
import SignupScreen from '../screens/signup-screen';
import DocItemDetails from '../components/documents/doc-item';
import AddFileScreen from '../screens/add-file-screen';
import { Button } from 'react-native';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home-Screen" component={HomeScreen} options={({ navigation }) => ({
            title: 'Home',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Add-File-Screen')}
                title="Add"
                color="#000"
              />
            ),
          })} />
      <Stack.Screen name="Details-Screen" component={DetailsScreen} />
      <Stack.Screen name="Add-File-Screen" component={AddFileScreen} />
      {/* <Stack.Screen name="Doc-Item-Details" component={DocItemDetails} /> */}
      <Stack.Screen name="Login-Screen" component={LoginScreen} />
      <Stack.Screen name="Signup-Screen" component={SignupScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
