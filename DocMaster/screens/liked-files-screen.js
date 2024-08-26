// HomeScreen Component

import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import LikedDocList from '../components/documents/liked-file-list';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { SERVER_URL } from '../core/config';





const LikedDocScreen = ({ navigation }) => {

 
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Liked Files',
      headerTitleAlign: 'center',
      headerRight: 
        () => (
          <Ionicons
            name="arrow-back"
            size={32}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => navigation.navigate('Home-Screen')}  
          />
        )
      
    });
  }, [navigation]);
    return (
        <View style={styles.container}>
           
            <LikedDocList navigation={navigation} />

          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default LikedDocScreen;
