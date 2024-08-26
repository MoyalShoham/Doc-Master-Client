
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeStack from './stack';
import LikedDocScreen from '../screens/liked-files-screen';
import RemindersScreen from '../screens/reminders-screen'; // Import the new screen

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{ title: 'Home' }} 
      />
      <Drawer.Screen 
        name="Liked" 
        component={LikedDocScreen} 
        options={{ title: 'Liked Files', headerShown: true }} 
      />
      <Drawer.Screen 
        name="Reminders" 
        component={RemindersScreen} 
        options={{ title: 'Reminders', headerShown: true }} // Ensure header is shown
      />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;