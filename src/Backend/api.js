import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const normalUserAdd = async (username, password, email, phone, gender) => {
    try {
        const response = await api.post('/normalUserAdd', { username, password, email, phone, gender });
        return response.data;
    } catch (error) {
        console.error("Error registering user", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const doctorUserAdd = async (username, password, doctorName, description, email, phone, gender) => {
    try {
        const response = await api.post('/doctorUserAdd', { username, password, doctorName, description, email, phone, gender });
        return response.data;
    } catch (error) {
        console.error("Error registering user", error.response ? error.response.data : error.message);
        throw error;
    }
};
