// navigation/stack.js

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import Welcome from '../screens/welcome-screen';
// import DetailsScreen from '../screens/file-details-screen';
import LoginScreen from '../screens/login-screen';
import SignupScreen from '../screens/signup-screen';
import DocItemDetails from '../components/documents/doc-item';
import AddFileScreen from '../screens/add-file-screen';
import EditFileScreen from '../screens/edit-file-screen';
import { Button } from 'react-native';
import { navOptions } from './options';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const HomeStack = () => {
  const nav = useNavigation();
  return (
    <Stack.Navigator screenOptions={() => navOptions(nav)}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="Home-Screen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen name="Add-File-Screen" component={AddFileScreen} />
      <Stack.Screen
        name="Details-Screen"
        component={DocItemDetails}
        options={({ route, navigation }) => ({
          title: 'Document Details',
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Edit-File-Screen', { item: route.params.item })}
              title="Edit"
              color="#000"
            />
          ),
        })}
      />
      <Stack.Screen name="Edit-File-Screen" component={EditFileScreen} />
      <Stack.Screen name="Login-Screen" component={LoginScreen} />
      <Stack.Screen name="Signup-Screen" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
