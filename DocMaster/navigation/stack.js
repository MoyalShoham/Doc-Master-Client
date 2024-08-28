import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home-screen';
import Welcome from '../screens/welcome-screen';
import LoginScreen from '../screens/login-screen';
import SignupScreen from '../screens/signup-screen';
import DocItemDetails from '../components/documents/doc-item';
import AddFileScreen from '../screens/add-file-screen';
import EditFileScreen from '../screens/edit-file-screen';
import { Alert, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { SERVER_URL } from '../core/config';
import * as SecureStore from 'expo-secure-store';
import LikedDocScreen from '../screens/liked-files-screen';
import RemindersScreen from '../screens/reminders-screen';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  const handleDelete = async (item, navigation) => {
    Alert.alert('Delete', 'Are you sure you want to delete this document?', [
      {
        text: 'Yes',
        onPress: async () => {
          const token = await SecureStore.getItemAsync('accessToken');
          try {
            await axios({
              method: 'delete',
              url: `${SERVER_URL}/user/deleteFile`,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              data: {
                fileName: item,
              },
            });
            console.log('File deleted successfully');
            navigation.goBack();
          } catch (error) {
            console.error('Error deleting file:', error);
          }
        },
      },
      {
        text: 'No',
        onPress: () => console.log('No pressed'),
      },
    ]);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ title: 'Welcome' }}
      />
      <Stack.Screen
        name="Home-Screen"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Add-File-Screen"
        component={AddFileScreen}
      />
      <Stack.Screen
        name="Details-Screen"
        component={DocItemDetails}
        options={({ route, navigation }) => ({
          title: 'Document Details',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit-File-Screen', { item: route.params.item })
                }
                style={{ marginRight: 10 }}
              >
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(route.params.item, navigation)}
                style={{ marginRight: 10 }}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Edit-File-Screen"
        component={EditFileScreen}
      />
      <Stack.Screen
        name="Login-Screen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup-Screen"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
};


export const LikedStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Liked"
        component={LikedDocScreen}
        options={{ title: 'Liked Files' }}
      />
      <Stack.Screen
        name="Details-Screen"
        component={DocItemDetails}
        options={({ route, navigation }) => ({
          title: 'Document Details',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit-File-Screen', { item: route.params.item })
                }
                style={{ marginRight: 10 }}
              >
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(route.params.item, navigation)}
                style={{ marginRight: 10 }}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
       <Stack.Screen
        name="Edit-File-Screen"
        component={EditFileScreen}
      />
    </Stack.Navigator>
  );
}

export const RemindersStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Reminders"
        component={RemindersScreen}
        options={{ title: 'Reminders' }}
      />
      <Stack.Screen
        name="Details-Screen"
        component={DocItemDetails}
        options={({ route, navigation }) => ({
          title: 'Document Details',
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Edit-File-Screen', { item: route.params.item })
                }
                style={{ marginRight: 10 }}
              >
                <Feather name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(route.params.item, navigation)}
                style={{ marginRight: 10 }}
              >
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Stack.Screen
        name="Edit-File-Screen"
        component={EditFileScreen}
      />

    </Stack.Navigator>
  );
}

export const LogoutStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Logout"
        component={RemindersScreen}
        options={{ title: 'Logout' }}
      />
        <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ title: 'Welcome' }}
      />
       <Stack.Screen
        name="Login-Screen"
        component={LoginScreen}
      />
      <Stack.Screen
        name="Signup-Screen"
        component={SignupScreen}
      />
    </Stack.Navigator>
  );
}
