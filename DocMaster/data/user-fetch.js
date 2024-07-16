import axios from 'axios';

const getUsers = async () => {
    
    try {
        const response = await axios.get('http://172.20.10.4:3000/user');
        const data = response.data;
        
        return data;
    } catch (error) {
        console.error(error.message);
    }
};


export default getUsers;