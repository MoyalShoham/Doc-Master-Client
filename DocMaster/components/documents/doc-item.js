import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView, Image, Linking } from 'react-native';
import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';
import styles from '../../styles';



const DocItemDetails = ({ route }) => {
    const { item } = route.params;
    const fileType = item.split('.').pop().toLowerCase(); // Ensuring fileType is in lowercase

    const renderDocument = () => {
        switch (fileType) {
            case 'txt':
                return (
                    <ScrollView
                        contentContainerStyle={styles.scrollContainer}
                    >
                        <Text style={styles.text}>{item}</Text>
                    </ScrollView>
                );
            case 'pdf':
                // Use WebView for PDFs as well
                console.log('PDF file:', item);
                return (
                    // <WebView
                    //     source={{ uri: item }}
                    //     style={styles.webview}
                    // />
                    <Pdf
                        trustAllCerts={false}
                        source={{ uri: item, cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
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
                        source={{ uri: `https://view.officeapps.live.com/op/embed.aspx?src=${item}` }}
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
                        resizeMode="contain" // Adjusts the image to fit within the container while maintaining aspect ratio
                    />
                );
            default:
                return <Text>Unsupported file type.</Text>;
        }
    };

    return (
        <View style={styles.container}>
            {renderDocument()}
        </View>
    );
};

export default DocItemDetails;
