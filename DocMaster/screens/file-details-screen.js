import React from 'react';
import { Button, Text, View } from 'react-native';
import DocItemDetails from '../components/documents/doc-item';
import { useRoute } from '@react-navigation/native';


const DetailsScreen = ({ navigation }) => {
    const route = useRoute();
    const { item } = route.params;
    return (
        <View style={styles.container}>
            <DocItemDetails item={item}/>
        </View>
    );
}

export default DetailsScreen;