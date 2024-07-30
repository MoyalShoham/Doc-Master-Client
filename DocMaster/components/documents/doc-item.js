import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DocItemDetails = ({ route }) => {
    const { item } = route.params;

    return (
        <View style={styles.container}>
            <Text>Item URL: {item}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
});

export default DocItemDetails;