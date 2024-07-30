import React, { useState, useEffect } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import styles from '../styles';

const AddFileScreen = ({ navigation }) => {
  const [fileUri, setFileUri] = useState(null);
  const [fileType, setFileType] = useState(null); // To differentiate between image and document

  useEffect(() => {
    (async () => {
      // Request permissions for media library and camera
      const { status: imageStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      // Permissions are automatically handled in expo-image-picker
    })();
  }, []);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.cancelled) {
      setFileUri(result.uri);
      setFileType('image');
    }
  };

  const handleDocumentPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // You can specify types here if you want
    });

    if (result.type === 'success') {
      setFileUri(result.uri);
      setFileType('document');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select from Gallery" onPress={handleImagePicker} />
      <Button title="Pick a Document" onPress={handleDocumentPicker} />
      {fileUri && (
        <View>
          {fileType === 'image' ? (
            <Image source={{ uri: fileUri }} style={styles.image} />
          ) : (
            <Text>Document URI: {fileUri}</Text>
          )}
          <Text>File URI: {fileUri}</Text>
        </View>
      )}
    </View>
  );
};

export default AddFileScreen;


