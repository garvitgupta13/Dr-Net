import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import DropIn from 'braintree-web-drop-in-react';
import { getCurrentUser } from '../Services/authService';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getmeToken, processPayment } from './../Services/paymentServices';
import { SimpleToast } from '../components/UI/Toast';
import Button from '@material-ui/core/Button';
import { startConversation } from '../Services/chatService';

const drawerWidth = 220;

const useStyle = makeStyles({
    container: {
        marginTop: '80px',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        ['@media (max-width:660px)']: {
            width: '100%',
            height: '100%',
            marginLeft: '0px',
        },
    },
});

export function Payment({ setReload = (f) => f, reload = undefined }) {
    const classes = useStyle();
    const params = useParams();
    let userid;
    const { doctorId } = params;
    const [openSuccess, setOpenSuccessToast] = useState(false);
    const [openError, setOpenErrorToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const [info, setInfo] = useState({
        loading: false,
        error: '',
        success: false,
        clientToken: null,
        instance: {},
    });

    //Get logged in user details
    if (token) {
        userid = getCurrentUser()._id;
    } else {
        //TODO: Redirect to login page
        /*NOT WORKING
    <Redirect
      to={{
        pathname: "/patient/login"
      }}
    />;*/
    }

    //Close the toast
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastMessage('');
        setOpenErrorToast(false);
        setOpenSuccessToast(false);
    };

    //Function to get the clientToken from backend
    const getToken = (token) => {
        getmeToken(token).then(({ data }) => {
            if (data.error) {
                setInfo({ ...data, error: data.error });
                setIsLoading(false);
            } else {
                const clientToken = data.clientToken;
                setInfo({ clientToken });
                setIsLoading(false);
            }
        });
    };

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) => (info.instance = instance)} //set the instance of info object
                        />
                        {
                            <Button
                                style={{ marginLeft: '41%', color: '#FFF3E5' }}
                                variant="contained"
                                color="secondary"
                                disable
                                className="btn btn-block btn-success"
                                onClick={onPurchase}
                            >
                                Pay ₹{doctor.doctorInfo.fees}
                            </Button>
                        }
                    </div>
                ) : (
                    <h3>Please Login </h3>
                )}
            </div>
        );
    };

    const onPurchase = () => {
        setInfo({ loading: true });
        try {
            let nonce;
            //get the nonce from instance object of info
            let getNonce = info.instance.requestPaymentMethod().then((data) => {
                nonce = data.nonce;
                const paymentData = {
                    paymentMethodNonce: nonce,
                    fee: doctor.doctorInfo.fees,
                };
                //send the nonce to call the backend api
                processPayment(paymentData, token)
                    .then(({ status, data }) => {
                        setInfo({ ...info, success: data.success, loading: false });
                        if (status !== 200) {
                            //TODO: Force Reload the page 2sec after
                            setOpenErrorToast(true);
                            setToastMessage('PAYMENT FAILED');
                            setTimeout(function () {
                                //setReload(!reload);
                                window.location.reload(false);
                            }, 2000); //force reload after 2 sec
                            return;
                        }
                        if (data.errors) {
                            setOpenErrorToast(true);
                            setToastMessage(`PAYMENT FAILED: ${data.message}`);
                            //setReload(!reload); //force reload
                            window.location.reload(false);
                            return;
                        }
                        const orderData = {
                            doctor: doctor,
                            transaction_id: data.transaction.id,
                            amount: data.transaction.amount,
                        };
                        startConversation(doctorId)
                            .then(({ status }) => {
                                if (status === 200) {
                                    setOpenSuccessToast(true);
                                    window.location.reload(false);
                                    window.location = '/Chat';
                                } else {
                                    setOpenErrorToast(true);
                                    setToastMessage('Unable to start your conversation');
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                setOpenErrorToast(true);
                                setToastMessage('Unable to start your conversation');
                            });
                    })
                    .catch((error) => {
                        console.log('Error1: ', error);
                        setInfo({ success: false, loading: false });
                        setOpenErrorToast(true);
                        setToastMessage('PAYMENT FAILED');
                        window.location.reload(false);
                        //setReload(!reload); //force reload
                    });
            });
        } catch (err) {
            console.log('Error2: ', err);
            setOpenErrorToast(true);
            setToastMessage('PAYMENT FAILED');
            window.location.reload(false);
            //    setReload(!reload); //force reload
        }
    };

    useEffect(() => {
        //Fetch doctor (Refactor this code)
        async function fetchDoctor() {
            setIsLoading(true);
            const request = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/doctor/${doctorId}`);
            setDoctor(request.data.data);
            //setIsLoading(false);
        }
        fetchDoctor().catch((error) => {
            setError(error);
        });

        getToken(token);
    }, []);

    if (error) {
        console.log(error);
        return <p className="centered focus">No Such Patient Exist</p>;
    }
    if (isLoading) {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (!userid) {
        return <p className="centered focus">No Such Patient Exist</p>;
    }

    return (
        <Container className={classes.container}>
            {showbtdropIn()}
            <SimpleToast
                open={openSuccess}
                message="Transaction successfull"
                handleCloseToast={handleCloseToast}
                severity="success"
            />
            <SimpleToast open={openError} message={toastMessage} handleCloseToast={handleCloseToast} severity="error" />
        </Container>
    );
}

export default Payment;
