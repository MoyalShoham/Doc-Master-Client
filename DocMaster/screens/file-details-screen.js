import React from 'react';
import { Button, Text, View } from 'react-native';


const DetailsScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Details Screen</Text>
            <Button
                title="Go to Details... again"
                onPress={() => navigation.push('Details')}
            />
            <Button title="Go to Home" onPress={() => navigation.navigate('Home-Screen')} />
            <Button title="Go back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default DetailsScreen;