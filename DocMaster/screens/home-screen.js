import React, { useLayoutEffect, useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import DocList from '../components/documents/doc-list';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
    const [isTableView, setIsTableView] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Home',
            headerTitleAlign: 'center',
            headerRight: () => (
                <Ionicons
                    name="menu"
                    size={32}
                    color="black"
                    style={{ marginLeft: 10 }}
                    onPress={() => navigation.openDrawer()}
                />
            )
        });
    }, [navigation]);

    const toggleView = () => {
        setIsTableView(!isTableView);
    };

    return (
        <View style={styles.container}>
            <Button
                title={isTableView ? "Switch to List View" : "Switch to Table View"}
                onPress={toggleView}
                color="#0f4f80"
            />
            <Button
                title="Add File"
                onPress={() => navigation.navigate('Add-File-Screen')}
                color="#0f4f80"
            />
            <DocList navigation={navigation} isTableView={isTableView} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default HomeScreen;
