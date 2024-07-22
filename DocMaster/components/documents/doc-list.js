import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../../styles';
import axios from 'axios';
import { SERVER_URL } from '../../core/config';
import * as SecureStore from 'expo-secure-store';


// import {  } from 'express';
const DocList = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                // console.log('Getting users', user);\
                const token = await SecureStore.getItemAsync('accessToken');
                const response = await axios.get(`${SERVER_URL}/user`,
                    { headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
                );

                console.log('response', response);
                const data = response.data;

            
                console.log('users', data);

                setUser(data);
                // const user = users.map((user) => user.tokens[0] === );
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{item.full_name}</Text>
                <Text style={styles.text}>{item.email}</Text>
            </View>
        );
    };

    const keyExtractor = (item) => item._uid.toString();

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
                data={user}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    );
};

export default DocList;
