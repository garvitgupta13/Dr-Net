import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';
import { getCurrentUser } from './../Services/authService';

import { SimpleToast } from '../components/UI/Toast';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import doctorImage from '../Images/Group7.png';
import patientImage from '../Images/rafiki.png';

const drawerWidth = 220;

const useStyle = makeStyles({
    container: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        ['@media (max-width:659px)']: {
            // eslint-disable-line no-useless-computed-key
            width: '100%',
            marginLeft: '0px',
            backgroundColor: '#F4E5D3',
        },
    },
    topGrid: {
        marginTop: '60px',
        ['@media (min-width:959px)']: {
            // eslint-disable-line no-useless-computed-key
            marginTop: '150px',
        },
    },
    main: {
        backgroundColor: '#FFF3E5',
        borderRadius: '30px',
        position: 'relative',
        marginTop: '55px',
    },
    content: {
        marginLeft: '20px',
        marginLeft: '20px',
    },
    span1: {
        color: '#936B3D',
        position: 'absolute',
        top: '85px',
        left: '110px',
    },
    label: {
        color: '#936B3D',
        fontSize: '20px',
        position: 'relative',
        marginTop: '30px',

        '& label': {
            marginLeft: '70px',
        },
    },
    file: {
        marginLeft: '220px',
        marginTop: '20px',
    },
    input: {
        position: 'absolute',
        borderRadius: '20px',
        borderColor: '#DDD9D5',
        outline: 'none',
        height: '30px',
        fontSize: '20px',
        marginTop: '20px',
        width: '70%',
        left: '0px',
        top: '15px',
        marginLeft: '10%',
    },
    innerForm: {
        marginLeft: '20px',
    },
    Button1: {
        marginLeft: '40%',
        marginBottom: '20px',
        marginTop: '50px',
    },
    error: {
        color: 'red',
        position: 'relative',
        top: '40px',
        left: '5%',
    },
});

export function Login({ role, logInHandler }) {
    const classes = useStyle();
    const schema = { email: '', password: '' };
    const [credential, setCredential] = useState(schema);
    const [errorObj, setErrorObj] = useState({});
    const [openSuccess, setOpenSuccessToast] = useState(false);
    const [openError, setOpenErrorToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const user = getCurrentUser();

    const validationSchema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    };

    const isFormValid = () => {
        //Validate form data using joi submission
        const check = Joi.validate(credential, validationSchema, {
            abortEarly: false,
        });
        if (!check.error) return true;
        const errors = {};
        check.error.details.map((item) => {
            if (!errors[item.path[0]]) errors[item.path[0]] = item.message;
            return 0;
        });
        setErrorObj(errors);
        return false;
    };

    const validateField = (input) => {
        const { name, value } = input;
        const obj = { [name]: value };
        const obj_schema = { [name]: validationSchema[name] };
        const result = Joi.validate(obj, obj_schema);

        return result.error ? result.error.details[0].message : null;
    };

    const handleChange = (e) => {
        //Validate input data
        const { currentTarget: input } = e;
        const errors = { ...errorObj };
        const errorMessage = validateField(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];
        //If data is correct then set it
        setCredential({ ...credential, [e.target.name]: e.target.value });
        setErrorObj(errors);
    };

    //Close the toast
    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastMessage('');
        setOpenErrorToast(false);
        setOpenSuccessToast(false);
    };

    async function loginUser(e) {
        e.preventDefault();
        if (isFormValid()) {
            try {
                const header = {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                };

                const { data: response } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/users/${role}/signin`,
                    credential,
                    header
                );
                //Set the token in localstorage and redirect to homepage
                if (response.status === 200) {
                    localStorage.setItem('token', response.token);
                    //onIdSubmit(response.token);
                    setToastMessage(response.message);
                    setOpenSuccessToast(true);
                    logInHandler();
                }
                //In case of any error throw error toast
                else {
                    setToastMessage(response.message);
                    setOpenErrorToast(true);
                }
            } catch (err) {
                //Handling rejected promise for backend error
                setToastMessage('SERVER ERROR: Please try again after some time');
                setOpenErrorToast(true);
            }
        }
    }

    if (user) {
        return <Redirect to={{ pathname: '/Chat' }} />;
    }

    return (
        <Container className={classes.container}>
            <Grid className={classes.topGrid} container spacing={3}>
                <Grid item xs={12} md={6} lg={6} key="01" className={classes.underGrid}>
                    <Card elevation={0}>
                        <div className={classes.image}>
                            {role === 'doctor' && <img src={doctorImage} />}
                            {role === 'patient' && <img src={patientImage} />}
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={6} key="02" className={classes.underGrid}>
                    <Card className={classes.main} elevation={5}>
                        <div className={classes.content}>
                            <Typography
                                variant="h5"
                                component="h2"
                                style={{
                                    color: '#936B3D',
                                    marginTop: '50px',
                                    marginLeft: '88px',
                                    marginBottom: '40px',
                                }}
                            >
                                LogIn
                            </Typography>
                            {role === 'doctor' && <span className={classes.span1}>And give health consultation</span>}
                            {role === 'patient' && <span className={classes.span1}>And get health consultation</span>}
                            <form onSubmit={loginUser}>
                                <div className={classes.label}>
                                    <label>
                                        Email
                                        <input
                                            className={classes.input}
                                            type="text"
                                            name="email"
                                            onChange={handleChange}
                                        />
                                        <div>
                                            {errorObj['email'] ? (
                                                <div className={classes.error}>* {errorObj['email']}</div>
                                            ) : (
                                                <div>&nbsp; &nbsp;</div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                                <div style={{ marginTop: '40px' }} className={classes.label}>
                                    <label>
                                        Password
                                        <input
                                            className={classes.input}
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                        />
                                        <div>
                                            {errorObj['password'] ? (
                                                <div className={classes.error}>* {errorObj['password']}</div>
                                            ) : (
                                                <div>&nbsp; &nbsp;</div>
                                            )}
                                        </div>
                                    </label>
                                </div>
                                <Button
                                    type="submit"
                                    className={classes.Button1}
                                    color="secondary"
                                    variant="contained"
                                    style={{ color: '#FFF3E5' }}
                                >
                                    Submit
                                </Button>
                            </form>
                            <SimpleToast
                                open={openSuccess}
                                message="Logged in successfully"
                                handleCloseToast={handleCloseToast}
                                severity="success"
                            />
                            <SimpleToast
                                open={openError}
                                message={toastMessage}
                                handleCloseToast={handleCloseToast}
                                severity="error"
                            />
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Login;
