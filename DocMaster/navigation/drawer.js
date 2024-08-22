import { createDrawerNavigator } from '@react-navigation/drawer';
// import HomeScreen from '../screens/home-screen';
import HomeStack from './stack';

const Drawer = createDrawerNavigator();

const HomeDrawer = () => {
  return (
    <Drawer.Navigator  screenOptions={{headerShown: false}}>
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{title: 'Home'}} />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;