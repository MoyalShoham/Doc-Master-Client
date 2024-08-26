import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../core/config';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import styles from '../styles';

// Example icons - replace these with your actual icon sources
const fileIcons = {
  pdf: require('../assets/pdf-icon.png'),
  doc: require('../assets/doc-icon.png'),
  txt: require('../assets/txt-icon.png'),
  default: require('../assets/Logo.png'),
};

const RemindersScreen = ({ navigation }) => {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const getUser = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    try {
      const response = await axios.get(`${SERVER_URL}/user/`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('User data:', response.data.reminders); // Log user data
      return response.data.reminders;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchReminders = async () => {
    try {
      const reminders = await getUser();
      console.log('Fetched reminders:', reminders); // Log reminders data
      setReminders(reminders || []);
    } catch (error) {
      console.error("Failed to fetch user data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchReminders();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReminders().then(() => setRefreshing(false));
  };

  const renderItem = ({ item }) => {
    if (!item) return null;

    // Assuming item is an object with a url property
    const itemUrl = typeof item === 'string' ? item : item.url;
    const fileName = typeof item === 'string' ? item.split('/').pop() : (item.name || itemUrl.split('/').pop());

    if (typeof itemUrl !== 'string') return null; // Ensure itemUrl is a string

    const isImage = itemUrl.endsWith('.jpg') || itemUrl.endsWith('.jpeg') || itemUrl.endsWith('.png');
    const isText = itemUrl.endsWith('.txt');
    const isPDF = itemUrl.endsWith('.pdf');
    const isDoc = itemUrl.endsWith('.docx') || itemUrl.endsWith('.doc');

    let iconSource;
    if (isPDF) iconSource = fileIcons.pdf;
    else if (isDoc) iconSource = fileIcons.doc;
    else if (isText) iconSource = fileIcons.txt;
    else iconSource = fileIcons.default;

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity 
          style={styles.itemContent} 
          onPress={() => navigation.navigate('Details-Screen', { item: itemUrl })}
        >
          {isImage ? (
            <Image source={{ uri: itemUrl }} style={styles.image} />
          ) : (
            <Image source={iconSource} style={styles.fileIcon} />
          )}
          <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const keyExtractor = (item, index) => {
    // Use index as fallback if item.id is not available
    return typeof item === 'string' ? item : (item.id ? item.id.toString() : index.toString());
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};



export default RemindersScreen;
