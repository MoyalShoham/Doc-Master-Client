    import React, { useState } from 'react';
    import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
    import DateTimePicker from '@react-native-community/datetimepicker';
    import axios from 'axios';
    import { SERVER_URL } from '../core/config';
    import * as SecureStore from 'expo-secure-store';

    const EditFileScreen = ({ route, navigation }) => {
        const { item, expirationDate } = route.params;
        const [fileName, setFileName] = useState(item.split('/').pop()); // Extract file name from URI
        const [date, setDate] = useState(expirationDate ? new Date(expirationDate) : null); // Set date or null
        const [showDatePicker, setShowDatePicker] = useState(false);
        const [isSaving, setIsSaving] = useState(false);

        const saveChanges = async () => {
            if (!fileName) {
              Alert.alert('Error', 'File name cannot be empty');
              return;
            }
          
            setIsSaving(true);
          
            try {
              const token = await SecureStore.getItemAsync('accessToken');
              if (!token) {
                Alert.alert('Error', 'User not authenticated');
                return;
              }
          
              const oldFileName = item.split('/').pop();
          
              console.log(`Making request to rename file with payload:`, {
                newFileName: fileName,
                expirationDate: date ? date.toISOString() : null,
              });
          
              const response = await axios.patch(
                `${SERVER_URL}/user/renameFile/${oldFileName}`,
                {
                  newFileName: fileName,
                  expirationDate: date ? date.toISOString() : null,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                  },
                }
              );
          
              console.log('Response:', response.data);
          
              if (response.status === 200) {
                Alert.alert('Success', 'File name and expiration date updated successfully', [
                  { text: 'OK', onPress: () => {
                      navigation.goBack();
                      route.params.item = route.params.item.replace(oldFileName, response.data.newFileName);
                  }},
                ]);
              } else {
                Alert.alert('Error', `Failed to update file name: ${response.data.message || 'Unknown error'}`);
              }
            } catch (error) {
              console.error('File update error:', error);
              Alert.alert('Error', 'Failed to update file name');
            } finally {
              setIsSaving(false);
            }
          };
          
          

        const showDatePickerHandler = () => {
            setShowDatePicker(true);
        };

        const handleDateChange = (event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
                setDate(selectedDate);
            }
        };

        return (
            <View style={styles.container}>
                <Text style={styles.label}>Edit File Name:</Text>
                <TextInput
                    value={fileName}
                    onChangeText={setFileName}
                    style={styles.input}
                />
                <Text style={styles.label}>Expiration Date:</Text>
                <Button 
                    title={date ? date.toDateString() : "Set Expiration Date"} 
                    onPress={showDatePickerHandler} 
                />

                {showDatePicker && (
                    <DateTimePicker
                        value={date || new Date()} // Use current date if date is not set
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}

                <Button
                    title={isSaving ? 'Saving...' : 'Save Changes'}
                    onPress={saveChanges}
                    disabled={isSaving}
                />
            </View>
        );
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
        },
        input: {
            width: '100%',
            padding: 10,
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 20,
            borderRadius: 5,
        },
    });

    export default EditFileScreen;
