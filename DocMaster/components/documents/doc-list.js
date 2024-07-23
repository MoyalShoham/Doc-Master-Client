import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import styles from '../../styles';
import getUser from '../../data/user-fetch';

const DocList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const get = async () => {
            const user = await getUser();
            setPosts(user.posts);
        };

        get().finally(() => setLoading(false));
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text>{item}</Text>
                <Image source={{ uri: item }} style={styles.image} />
                <Image source={{ src: item }} style={styles.image} />
            </View>
        );
    };

    const keyExtractor = (item, index) => index.toString();

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    );
};

export default DocList;
