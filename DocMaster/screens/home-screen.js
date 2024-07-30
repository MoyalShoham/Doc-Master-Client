import React from 'react';
import { View, Button } from 'react-native';
import styles from '../styles';
import DocList from '../components/documents/doc-list';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DocList navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
