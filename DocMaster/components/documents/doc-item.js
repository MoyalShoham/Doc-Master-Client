import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styles from '../../styles';

const DocItemDetails = ({ route }) => {
    const { item } = route.params;
    const isImage = item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png');

    return (
        <View style={styles.container}>
            {isImage ? (<Image source={{ uri: item }} style={styles.image} /> ):(
            <Text>Document URI: {item}</Text>)}
            
        </View>
    );
};


export default DocItemDetails;
