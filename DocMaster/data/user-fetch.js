import axios from 'axios';
import { SERVER_URL } from '../core/config';
import * as SecureStore from 'expo-secure-store';

const getUser = async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    console.log('Getting users', token);
    try {

        
        const response = await axios.get(`${SERVER_URL}/user`, { 
            headers:{
                'Authorization': `Bearer ${token}`
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


export default getUser;