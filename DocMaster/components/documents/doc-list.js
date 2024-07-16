import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import styles from '../../styles';
import axios from 'axios';

const DocList = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get('http://172.20.10.4:3000/user',
                    { headers: { 'Authorization': 'Bearer ' + user.tokens[0] } }
                );
                const data = response.data;
                console.log('users', data);

                setUsers(data);
                // const user = users.map((user) => user.tokens[0] === );
                setLoading(false);
            } catch (error) {
                console.error(error.message);
                setLoading(false);
            }
        };

        getUsers();
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
                data={users}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </View>
    );
};

export default DocList;
