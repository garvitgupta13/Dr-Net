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
    //FIX: Not working (Unable to fetch data from api)
    /*try {
        const header = {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest"
        };

        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/payment/`, paymentData, header);
        console.log("response: ", response);
        return response;
    } catch (error) {
        console.log("error: ", error);
    }*/
    
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/payment/`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization": token,
            "X-Requested-With": "XMLHttpRequest"
        },
        body: paymentData
    })
        .then((response) => {
            return response;
        })
        .catch((err) => console.log(err));
}
