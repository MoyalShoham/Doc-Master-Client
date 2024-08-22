// HomeScreen Component

import React, { useLayoutEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import DocList from '../components/documents/doc-list';
import { Ionicons } from '@expo/vector-icons';



const HomeScreen = ({ navigation }) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Home',
      headerTitleAlign: 'center',
      headerRight: 
        () => (
          <Ionicons
            name="menu"
            size={32}
            color="black"
            style={{ marginLeft: 10 }}
            onPress={() => navigation.openDrawer()}
          />
        )
      
    });
  }, [navigation]);
    return (
        <View style={styles.container}>
            <Button
                title="Add File"
                onPress={() => navigation.navigate('Add-File-Screen')}
                color="#0f4f80"
            />
            <DocList navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default HomeScreen;
