import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Pdf from 'react-native-pdf';
import styles from '../../styles';

const PdfViewer = ({ fileUri }) => {
    console.log('PDF file:', fileUri);
    return (
        <View style={styles.container}>
            <Pdf
                source={{ uri: fileUri, cache: true }}
                onLoadComplete={(numberOfPages, filePath) => {
                    console.log(`Number of pages: ${numberOfPages}`);
                }}
                onPageChanged={(page, numberOfPages) => {
                    console.log(`Current page: ${page}`);
                }}
                onError={(error) => {
                    console.error('PDF Error:', error);
                }}
                onPressLink={(uri) => {
                    console.log('Link Pressed:', uri);
                }}
                style={styles.pdf}
            />
        </View>
    );
};



export default PdfViewer;
