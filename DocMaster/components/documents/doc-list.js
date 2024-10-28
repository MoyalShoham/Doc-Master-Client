import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';
import styles from '../../styles';
import { SERVER_URL } from '../../core/config';
import getUser from '../../data/user-fetch';

const fileIcons = {
    pdf: require('../../assets/pdf-icon.png'),
    doc: require('../../assets/doc-icon.png'),
    txt: require('../../assets/txt-icon.png'),
    default: require('../../assets/Logo.png')
};

const DocList = ({ navigation, isTableView }) => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [likedFiles, setLikedFiles] = useState(new Set());
    const [token, setToken] = useState('');

    useEffect(() => {
     
        const fetchUser = async () => {
            try {
                const user = await getUser();
                if (user){
                    const correctedPosts = (user?.posts || []).map(post => {
                        if (post && typeof post.url === 'string') {
                            const tmp = post.url.split('storage.googleapis.com/');
                            return `https://storage.googleapis.com/${tmp[1]}`;
                        }
                        return post;
                    });
                    setPosts(correctedPosts);
                    setLikedFiles(new Set(user?.likedDocs || []));
                    setToken(user.token);
                }
            } catch (error) {
                console.error("Failed to fetch user data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const onRefresh = () => {
        
        setRefreshing(true);
        getUser().then(user => {
            const correctedPosts = (user?.posts || []).map(post => {
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

    const toggleLike = async (fileUrl) => {
        try {
            if (likedFiles.has(fileUrl)) {
                await axios.post(`${SERVER_URL}/user/unlike`, { fileUrl }, {
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                setLikedFiles(prev => new Set([...prev].filter(url => url !== fileUrl)));
            } else {
                await axios.post(`${SERVER_URL}/user/like`, { fileUrl }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
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
        const isPDF = item.endsWith('.pdf');
        const isDoc = item.endsWith('.docx') || item.endsWith('.doc');
        const fileName = item.split('/').pop();
        const isLiked = likedFiles.has(item);
        

        return (
            <View style={isTableView ? styles.gridItemContainer : styles.itemContainer}>
                <TouchableOpacity 
                    style={isTableView ? styles.gridItemContent : styles.itemContent} 
                    onPress={() => navigation.navigate('Details-Screen', { item, liked: isLiked })}
                >
                    {isImage ? (
                        <Image source={{ uri: item }} style={isTableView ? styles.gridImage : styles.image} />
                    ) : (
                        <Image source={fileIcons[isPDF ? 'pdf' : isDoc ? 'doc' : 'default']} style={isTableView ? styles.gridImage : styles.fileIcon} />
                    )}
                    {isPDF || isDoc ? (
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                    ) :(
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text>
                    )}
                    {/* <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{fileName}</Text> */}
                </TouchableOpacity>
            </View>
        );
    };

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
                keyExtractor={(item, index) => index.toString()}
                numColumns={isTableView ? 3 : 2}
                key={isTableView ? 'table-view' : 'list-view'}  // Add this line
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
