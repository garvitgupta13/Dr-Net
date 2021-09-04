import axios from 'axios';

export const getConversations = async () => {
    try {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/conversation`);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const startConversation = async (doctorId) => {
    try {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/conversation/${doctorId}`);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const endConversation = async (conversationId) => {
    try {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const response = await axios.put(`${process.env.REACT_APP_API_ENDPOINT}/conversation/${conversationId}`);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const getMessages = async (conversationId) => {
    try {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/messages/${conversationId}`);
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};

export const sendMessage = async (conversationId, text) => {
    try {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/messages/${conversationId}`, { text });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }
};
