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
        console.log("response: ", response);
        return response;
    } catch (error) {
        console.log("error: ", error);
<<<<<<< HEAD
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
=======
    }
>>>>>>> 62343ff17429a6b6a3a3a9df91a88b139cd1b943
}
