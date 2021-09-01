import axios from "axios";

export const getmeToken = async (token) => {

   try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/payment/getToken`);
        return response;
    }

    catch (error) {
        console.log(error);
    }
}

export const processPayment = async (paymentData, token) => {
    try {
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/payment/`, paymentData);
        return response;
    } catch (error) {
        console.log("error: ", error);
    }
}
