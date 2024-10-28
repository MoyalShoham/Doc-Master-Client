import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Linking, TouchableOpacity } from 'react-native';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';
import styles from '../../styles';
import axios from 'axios';
import { SERVER_URL } from '../../core/config';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome } from '@expo/vector-icons';
import { response } from 'axios';

const DocItemDetails = ({ route, navigation }) => {
    const { item } = route.params;
    const [isLiked, setIsLiked] = useState(false);
    const fileType = item.split('.').pop().toLowerCase(); // Ensuring fileType is in lowercase

    useEffect(() => {
        const fetchIsLiked = async () => {
            try {
                const token = await SecureStore.getItemAsync('accessToken');
                const response = await axios.post(`${SERVER_URL}/user/getMetadata`, { item }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setIsLiked(response.data.metadata.customMetadata.isLiked === 'true');
            } catch (error) {
                console.log(response.data);
                console.error('Error getting metadata:', error);
            }
        };

        fetchIsLiked();
    }, [item]);

    const handleLikeUnlike = async () => {
        const token = await SecureStore.getItemAsync('accessToken');
        const endpoint = isLiked ? 'unlike' : 'like';

        try {
            await axios.post(`${SERVER_URL}/user/${endpoint}`, {
                fileUrl: item,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error liking/unliking document:', error);
        }
    };

    const renderDocument = () => {
        switch (fileType) {
            case 'txt':
                return (
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <Text style={styles.text}>{item}</Text>
                    </ScrollView>
                );
            case 'pdf':
                return (
                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: item, cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onError={(error) => {
                            console.error('PDF Error:', error);
                        }}
                        onPressLink={(uri) => {
                            console.log('Link Pressed:', uri);
                            Linking.openURL(uri);
                        }}
                        style={styles.pdf}
                    />
                );
            case 'doc':
            case 'docx':
                return (
                    <WebView
                        source={{
                            uri: `https://view.officeapps.live.com/op/embed.aspx?src=${item}`,
                        }}
                        style={styles.webview}
                    />
                );
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return (
                    <Image
                        source={{ uri: item }}
                        style={styles.picture}
                        resizeMode="contain"
                    />
                );
            default:
                return <Text>Unsupported file type.</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {renderDocument()}
            <TouchableOpacity
                onPress={handleLikeUnlike}
                style={{ position: 'absolute', top: 10, right: 10, borderRadius: 10, padding: 10, borderStyle: 'solid', borderWidth: 2, borderColor: 'gray' }}
            >
                <FontAwesome
                    name={isLiked ? 'star' : 'star-o'}
                    size={30}
                    color={isLiked ? 'gold' : 'black'}
                />
            </TouchableOpacity>
        </View>
    );
};

export default DocItemDetails;
