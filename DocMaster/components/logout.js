import axios from "axios";
import { SERVER_URL } from "../core/config";
import styles from "../styles";
import * as SecureStore from 'expo-secure-store';

export const logout = async () => {
    console.log('Logging out');
    const token = await SecureStore.getItemAsync('accessToken');
    try {
        const res = await axios.get(`${SERVER_URL}/user/logout`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        console.log('Logged out:', res);
        await SecureStore.deleteItemAsync('accessToken');
        console.log('Token deleted');

        
    } catch (error) {
        console.error("Error logging out:", error);
    }
}