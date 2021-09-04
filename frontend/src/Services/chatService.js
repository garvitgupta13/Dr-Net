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
