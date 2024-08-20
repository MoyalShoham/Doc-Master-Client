import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, Alert, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker'; // Changed Date Picker import
import CheckBox from '@react-native-community/checkbox';
import styles from '../styles';
import { SERVER_URL } from '../core/config';
import * as SecureStore from 'expo-secure-store';

const AddFileScreen = ({ navigation }) => {
  const [fileUri, setFileUri] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [expirationDate, setExpirationDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // Changed open to showDatePicker
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    (async () => {
      const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      console.log('Media Library Permission:', mediaLibraryPermission);
      console.log('Camera Permission:', cameraPermission);
    })();
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    console.log('Image picker result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFileUri(result.assets[0].uri);
      setFileType('image');
      console.log('Image fileUri set:', result.assets[0].uri);
    }
  };

  const handleDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    });

    console.log('Document picker result:', result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFileUri(result.assets[0].uri);
      setFileType('document');
      console.log('Document fileUri set:', result.assets[0].uri);
    }
  };

  const uploadFile = async (uri, fileType) => {
    setUploading(true);
    console.log('Starting file upload:', { uri, fileType });

    try {
      const token = await SecureStore.getItemAsync('accessToken');
      console.log('User token:', token);

      const response = await fetch(uri);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append('file', {
        uri,
        type: blob.type,
        name: uri.split('/').pop(),
      });
      formData.append('user', token);
      formData.append('name', fileName);
      if (expirationDate) {
        formData.append('expiration_date', expirationDate.toISOString());
      }
      formData.append('reminder', reminder);

      console.log('FormData prepared:', formData);

      const serverResponse = await fetch(`${SERVER_URL}/user/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Server response:', serverResponse);

      const result = await serverResponse.json();

      if (serverResponse.ok) {
        Alert.alert('Success', 'File uploaded successfully', [
          { text: 'OK', onPress: () => setFileUri(null) },
        ]);
        console.log('File available at', result.url);
      } else {
        console.error('Server response error:', result);
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('File upload error:', error);
      Alert.alert('Error', 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  // Function to handle the date change from the DatePicker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpirationDate(selectedDate);
      // Reset the reminder checkbox if the date is in the past or not set
      if (selectedDate < new Date()) {
        setReminder(false);
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Select from Gallery" onPress={handleImagePicker} />
      <Button title="Pick a Document" onPress={handleDocumentPicker} />
      {fileUri ? (
        <View>
          {fileType === 'image' ? (
            <Image source={{ uri: fileUri }} style={styles.image} />
          ) : (
            <Text>Document URI: {fileUri}</Text>
          )}
          <Text>File URI: {fileUri}</Text>
          <TextInput
            placeholder="File Name"
            value={fileName}
            onChangeText={setFileName}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.input}>
              {expirationDate ? expirationDate.toDateString() : 'Pick Expiration Date'}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={expirationDate || new Date()}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <View style={styles.checkboxContainer}>
            <CheckBox
              value={reminder}
              onValueChange={setReminder}
              style={styles.checkbox}
              disabled={!expirationDate || expirationDate < new Date()} // Disable if no date or past date
            />
            <Text style={styles.label}>Set Reminder</Text>
          </View>
          <Button
            title="Upload File"
            onPress={() => uploadFile(fileUri, fileType)}
            disabled={uploading}
          />
        </View>
      ) : (
        <Text>No file selected</Text>
      )}
    </ScrollView>
  );
};

export default AddFileScreen;
