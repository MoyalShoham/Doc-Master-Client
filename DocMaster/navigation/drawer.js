import React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { HomeStack, LikedStack, RemindersStack } from './stack';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { SERVER_URL } from '../core/config';

const Drawer = createDrawerNavigator();

const HomeDrawerContent = (props) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    console.log('Logging out');
    const token = await SecureStore.getItemAsync('accessToken');
    try {
      const res = await axios.get(`${SERVER_URL}/user/logout`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Logged out:', res);
      await SecureStore.deleteItemAsync('accessToken');
      console.log('Token deleted');
      navigation.navigate('Welcome');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Image source={require('../assets/Logo.png')} style={{ width: 200, height: 200 }} />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{ padding: 10 }}>
        <DrawerItem
          label="Logout"
          onPress={handleLogout}
          icon={() => <Ionicons name="log-out" size={30} color="#457ea8" />}
        />
      </View>
    </SafeAreaView>
  );
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <HomeDrawerContent {...props} />}>
      <Drawer.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: () => <Ionicons name="home" size={30} color="#457ea8" />,
        }}
      />
      <Drawer.Screen
        name="Liked"
        component={LikedStack}
        options={{
          title: 'Liked Files',
          headerShown: false,
          drawerIcon: () => <Ionicons name="heart" size={30} color="#457ea8" />,
        }}
      />
      <Drawer.Screen
        name="Reminders"
        component={RemindersStack}
        options={{
          title: 'Reminders',
          headerShown: false,
          drawerIcon: () => <Ionicons name="timer" size={30} color="#457ea8" />,
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
