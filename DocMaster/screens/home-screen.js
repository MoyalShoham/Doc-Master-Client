import { Button, Text, View } from 'react-native';
import React from 'react';
import styles from '../styles';
import DocList from '../components/documents/doc-list';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DocList />
    </View>
  );
};

export default HomeScreen;