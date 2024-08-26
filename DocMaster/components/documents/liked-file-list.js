import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import getUser from '../../data/user-fetch';
import styles from '../../styles';
import { SERVER_URL } from '../../core/config';
import axios from 'axios';

const fileIcons = {
    pdf: require('../../assets/pdf-icon.png'),
    doc: require('../../assets/doc-icon.png'),
    txt: require('../../assets/txt-icon.png'),
    default: require('../../assets/Logo.png')
};

const LikedDocsList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [likedFiles, setLikedFiles] = useState(new Set());

    const [token, setToken] = useState('');  // Assuming you will retrieve and set this token


   
    const onRefresh = () => {
        setRefreshing(true);
        getUser().then(user => {
            const correctedPosts = (user.likedDocs || []).map(post => {
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
                console.log('User:', user);
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
            console.log('Toggling like for:', fileUrl);
            if (likedFiles.has(fileUrl)) {
                await axios.post(`${SERVER_URL}/user/unlike`, { fileUrl }, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                        },
                        data: { fileUrl }
                });
            
                setLikedFiles(prev => new Set([...prev].filter(url => url !== fileUrl)));
            } else {
                await axios.post(`${SERVER_URL}/user/like`, { fileUrl }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    data: { fileUrl }
                });
                // await fetch(`${SERVER_URL}/user/like`, {
                //     method: 'POST',
                //     headers: { 
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${token}`
                //      },
                //     body: JSON.stringify({ fileUrl })                
                // });
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
                <TouchableOpacity 
                    style={styles.itemContent} 
                    onPress={() => navigation.navigate('Details-Screen', { item, liked: isLiked })}
                >
                    {isImage ? (
                        <Image source={{ uri: item }} style={styles.image} />
                    ) : (
                        <Image source={iconSource} style={styles.fileIcon} />
                    )}
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
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

export default LikedDocsList;
