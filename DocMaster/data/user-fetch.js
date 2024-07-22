import axios from 'axios';
import { SERVER_URL } from '../core/config';
import * as SecureStore from 'expo-secure-store';

const getUsers = async () => {
    console.log('Getting users', SecureStore.getItemAsync('accessToken'));
    try {
        
        const response = await axios.get(`${SERVER_URL}/user`,
           { headers:{
                'Authorization': `Bearer ${SecureStore.getItemAsync('accessToken')}`
            }
        }
            // { Autohorization: `Bearer ${SecureStore}` }

        );
        const data = response.data;

        return data;
    } catch (error) {
        console.error(error.message);
    }
};


export default getUsers;