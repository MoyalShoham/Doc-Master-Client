import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { SERVER_URL } from '../core/config';
import * as SecureStore from 'expo-secure-store';

const EditFileScreen = ({ route, navigation }) => {
    const { item } = route.params;
    const [fileName, setFileName] = useState(item.split('/').pop()); // Extract file name from URI
    const [isSaving, setIsSaving] = useState(false);

    const saveChanges = async () => {
        if (!fileName) {
            Alert.alert('Error', 'File name cannot be empty');
            return;
        }

        setIsSaving(true);

        try {
            const token = await SecureStore.getItemAsync('accessToken');
            console.log('User token:', token);

            const oldFileName = item.split('/').pop(); // Assuming old file name is part of the item path

            const response = await axios.patch(
                `${SERVER_URL}/user/rename/${oldFileName}`,
                {
                    newFileName: fileName,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            console.log('Response status:', response.status);
            console.log('Response data:', response.data);

            if (response.status === 200) {
                Alert.alert('Success', 'File name updated successfully', [
                    { text: 'OK', onPress: () => navigation.goBack() },
                ]);
                console.log('Updated file name:', response.data.newFileName);
            } else {
                console.error('Server response error:', response.data);
                Alert.alert('Error', `Failed to update file name: ${response.data.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('File update error:', error);
            Alert.alert('Error', 'Failed to update file name');
        } finally {
            setIsSaving(false);
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