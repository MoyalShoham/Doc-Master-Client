import React from 'react';
import { View } from 'react-native';
import DocItemDetails from '../components/documents/doc-item';
import { useRoute } from '@react-navigation/native';
import styles from '../styles';

const DetailsScreen = ({ navigation }) => {
    const route = useRoute();
    return (
        <View style={styles.container}>
            <DocItemDetails route={route} />
        </View>
    );
}

export default DetailsScreen;
