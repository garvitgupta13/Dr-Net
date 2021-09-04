import axios from 'axios';

export const getConversations = async (token) => {
    try {
        axios.defaults.headers.common['Authorization'] = token;
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/conversation`);
        return response;
    } catch (error) {
        console.log(error);
    }
};
