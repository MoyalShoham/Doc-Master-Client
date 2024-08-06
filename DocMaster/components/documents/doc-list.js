import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getUser from '../../data/user-fetch';
import styles from '../../styles';

const DocList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                console.log('Fetched user data:', user.posts);

                const correctedPosts = (user.posts || []).map(post => {
                    if (post && typeof post.url === 'string') {
                        const tmp = post.url.split('storage.googleapis.com/');
                        return `https://storage.googleapis.com/${tmp[1]}`;
                    }
                    return post; // If post is undefined or not a string, return the post as is
                });

                setPosts(correctedPosts);
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const renderItem = ({ item }) => {
        if (!item) {
            console.log('Render item: item is null or undefined');
            return null;
        }

        console.log('Rendering item:', item);

        const isImage = item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png');

        if (isImage) {
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details-Screen', { item })}>
                    <Image source={{ uri: item }} style={styles.image} />
                </TouchableOpacity>
            );
        } else {
            const fileName = item.split('/').pop();
            let iconName;

            if (item.endsWith('.pdf')) {
                iconName = 'picture-as-pdf';
            } else if (item.endsWith('.docx')) {
                iconName = 'insert-drive-file';
            } else {
                iconName = 'insert-drive-file';
            }

            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details-Screen', { item })}>
                    <Icon name={iconName} size={50} color="#000" />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                </TouchableOpacity>
            );
        }
    };

    const keyExtractor = (item, index) => index.toString();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.listContainer}>
            <FlatList
                data={posts}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    );
};

export default DocList;
