import React from 'react';
import { View, StyleSheet } from 'react-native';
import DocList from '../components/documents/doc-list';
import styles from '../styles';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <DocList navigation={navigation} />
    </View>
  );
};

export default HomeScreen;
