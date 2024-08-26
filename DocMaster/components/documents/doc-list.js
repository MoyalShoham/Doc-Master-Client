import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getUser from '../../data/user-fetch';
import styles from '../../styles';
import { SERVER_URL } from '../../core/config';

const fileIcons = {
    pdf: require('../../assets/pdf-icon.png'),
    doc: require('../../assets/doc-icon.png'),
    txt: require('../../assets/txt-icon.png'),
    default: require('../../assets/Logo.png')
};

const DocList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [likedFiles, setLikedFiles] = useState(new Set());
    const [token, setToken] = useState('');  // Assuming you will retrieve and set this token

    const onRefresh = () => {
        setRefreshing(true);
        getUser().then(user => {
            const correctedPosts = (user.posts || []).map(post => {
                if (post && typeof post.url === 'string') {
                    const tmp = post.url.split('storage.googleapis.com/');
                    return `https://storage.googleapis.com/${tmp[1]}`;
                }
                return post;
            });
            setPosts(correctedPosts);
            setRefreshing(false);
        }).catch(error => {
            console.error("Failed to fetch user data", error);
            setRefreshing(false);
        });
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUser();
                const correctedPosts = (user.posts || []).map(post => {
                    if (post && typeof post.url === 'string') {
                        const tmp = post.url.split('storage.googleapis.com/');
                        return `https://storage.googleapis.com/${tmp[1]}`;
                    }
                    return post;
                });
                setPosts(correctedPosts);
                setLikedFiles(new Set(user.likedDocs || []));
                setToken(user.token);  // Assuming the token is stored in the user object
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const toggleLike = async (fileUrl) => {
        try {
            if (likedFiles.has(fileUrl)) {
                await fetch(`${SERVER_URL}/user/unlike`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                     },
                    body: JSON.stringify({ fileUrl })
                });
                setLikedFiles(prev => new Set([...prev].filter(url => url !== fileUrl)));
            } else {
                await fetch(`${SERVER_URL}/user/like`, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                     },
                    body: JSON.stringify({ fileUrl })                
                });
                setLikedFiles(prev => new Set([...prev, fileUrl]));
            }
        } catch (error) {
            console.error("Error liking/unliking document:", error);
        }
    };

    const renderItem = ({ item }) => {
        if (!item) return null;

        const isImage = item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png');
        const isText = item.endsWith('.txt');
        const isPDF = item.endsWith('.pdf');
        const isDoc = item.endsWith('.docx') || item.endsWith('.doc');
        const fileName = item.split('/').pop();

        const isLiked = likedFiles.has(item);

        let iconSource;
        if (isPDF) iconSource = fileIcons.pdf;
        else if (isDoc) iconSource = fileIcons.doc;
        else if (isText) iconSource = fileIcons.txt;
        else iconSource = fileIcons.default;

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity style={styles.itemContent} onPress={() => navigation.navigate('Details-Screen', { item })}>
                    {isImage ? (
                        <Image source={{ uri: item }} style={styles.image} />
                    ) : (
                        <Image source={iconSource} style={styles.fileIcon} />
                    )}
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeButton} onPress={() => toggleLike(item)}>
                    <Ionicons
                        name={isLiked ? 'heart' : 'heart-outline'}
                        size={40} // Ensures the icon is large enough to be visible
                        color={isLiked ? 'red' : 'black'} // Changed default color to black for better contrast
                    />
                </TouchableOpacity>
            </View>
        );
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
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

export default DocList;
