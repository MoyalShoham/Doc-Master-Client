import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import getUser from '../../data/user-fetch';
import styles from '../../styles';

// Import local images
const fileIcons = {
    pdf: require('../../assets/pdf-icon.png'), // Path to your PDF icon
    doc: require('../../assets/doc-icon.png'), // Path to your DOC/DOCX icon
    txt: require('../../assets/txt-icon.png'), // Path to your TXT icon
    default: require('../../assets/Logo.png') // Path to your default icon
};

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
        const isText = item.endsWith('.txt');
        const isPDF = item.endsWith('.pdf');
        const isDoc = item.endsWith('.docx') || item.endsWith('.doc');
        const fileName = item.split('/').pop();
        
        if (isImage) {
            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details-Screen', { item })}>
                    <Image source={{ uri: item }} style={styles.image} />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                </TouchableOpacity>
            );
        } else {
           
            let iconSource;

            if (isPDF) {
                iconSource = fileIcons.pdf;
            } else if (isDoc) {
                iconSource = fileIcons.doc;
            } else if (isText) {
                iconSource = fileIcons.txt;
            } else {
                iconSource = fileIcons.default;
            }

            return (
                <TouchableOpacity style={styles.itemContainer} onPress={() => navigation.navigate('Details-Screen', { item })}>
                    <Image source={iconSource} style={styles.fileIcon} />
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
