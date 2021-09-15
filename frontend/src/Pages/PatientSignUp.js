import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';
import { getCurrentUser } from './../Services/authService';

import { makeStyles } from '@material-ui/core';
import { SimpleToast } from '../components/UI/Toast';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import displayImage from '../Images/rafiki.png';

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
    underGrid2: {
        ['@media (min-width:959px)']: {
            // eslint-disable-line no-useless-computed-key
            marginTop: '-30px',
        },
    },
    main: {
        backgroundColor: '#FFF3E5',
        borderRadius: '30px',
        position: 'relative',
        marginTop: '-5px',
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
    span2: {
        color: '#936B3D',
        position: 'absolute',
        top: '20px',
        right: '25px',
    },
    span3: {
        color: '#936B3D',
        position: 'absolute',
        top: '20px',
        right: '25px',
    },
    label: {
        color: '#936B3D',
        fontSize: '20px',
        position: 'relative',
        marginTop: '25px',

        '& label': {
            marginLeft: '70px',
        },
    },
    input: {
        color: '#936B3D',
        position: 'absolute',
        borderRadius: '20px',
        borderColor: '#DDD9D5',
        outline: 'none',
        height: '30px',
        fontSize: '20px',
        marginTop: '20px',
        width: '70%',
        left: '0px',
        top: '10px',
        marginLeft: '10%',
    },
    underSpan: {
        position: 'absolute',
        left: '130px',
        top: '3px',
        fontSize: '15px',
    },
    select: {
        color: '#936B3D',
        position: 'absolute',
        borderRadius: '20px',
        borderColor: '#DDD9D5',
        outline: 'none',
        height: '30px',
        fontSize: '20px',
        marginTop: '20px',
        width: '70%',
        left: '0px',
        top: '10px',
        marginLeft: '10%',
    },
    innerForm: {
        marginLeft: '20px',
        marginRight: '20px',
    },
    Button1: {
        marginLeft: '40%',
        marginBottom: '20px',
        marginTop: '10px',
    },
    Button2: {
        marginLeft: '32%',
        marginBottom: '20px',
        marginTop: '40px',
    },
    Button3: {
        marginLeft: '20px',
        marginBottom: '20px',
        marginTop: '40px',
    },
    error: {
        color: 'red',
        marginTop: '40px',
        textAlign: 'center',
    },
});

const PatientSignUp = () => {
    const classes = useStyle();
    const [count, setCount] = useState(1);
    const user = getCurrentUser();
    const schema = {
        name: '',
        email: '',
        height: '',
        weight: '',
        age: '',
        password: '',
        confirmPassword: '',
        bloodType: 'A+',
        education: '',
        diseaseDescription: '',
    };
    const [credential, setCredential] = useState(schema);
    const [errorObj, setErrorObj] = useState({});
    const [openSuccess, setOpenSuccessToast] = useState(false);
    const [openError, setOpenErrorToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    const validationSchema = {
        name: Joi.string().required().min(6).label('Name'),
        email: Joi.string().email().required().label('Email'),
        height: Joi.number().min(1).max(500).required().label('Height'),
        weight: Joi.number().min(1).max(1000).required().label('Weight'),
        age: Joi.number().min(1).max(200).required().label('Age'),
        bloodType: Joi.string().required(),
        education: Joi.any(),
        diseaseDescription: Joi.any(),
        password: Joi.string().min(6).required().label('Password'),
        confirmPassword: Joi.any()
            .valid(Joi.ref('password'))
            .required()
            .options({ language: { any: { allowOnly: 'must match password' } } })
            .label('Confirm Password'),
    };

    const isFormValid = () => {
        const check = Joi.validate(credential, validationSchema, {
            abortEarly: false,
        });
        if (!check.error) {
            console.log('left form validation');
            return true;
        }
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
        const { currentTarget: input } = e;
        const errors = { ...errorObj };
        const errorMessage = validateField(input);
        if (errorMessage) errors[input.name] = errorMessage;
        else delete errors[input.name];

        setCredential({ ...credential, [e.target.name]: e.target.value });
        setErrorObj(errors);
    };

    const handleCloseToast = (event, reason) => {
        if (reason === 'clickaway') return;
        setToastMessage('');
        setOpenErrorToast(false);
        setOpenSuccessToast(false);
    };

    async function signUpPatient(e) {
        console.log('signUpPatient');
        console.log(credential);
        e.preventDefault();
        if (isFormValid()) {
            try {
                const header = {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                };

                const { data: response } = await axios.post(
                    `${process.env.REACT_APP_API_ENDPOINT}/users/patient/signup`, // FILL THIS
                    credential,
                    header
                );

                if (response.status === 200) {
                    setToastMessage(response.message);
                    setOpenSuccessToast(true);
                    window.location = '/patient/login'; //to be changed
                } else {
                    console.log('Holla might find me');
                    setToastMessage(response.message);
                    setOpenErrorToast(true);
                }
            } catch (err) {
                //Handling rejected promise for backend error
                setToastMessage('SERVER ERROR: Please try again after some time');
                setOpenErrorToast(true);
            }
        }

        console.log('left sigup patient');
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
                            <img src={displayImage} />
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={6} key="02" className={classes.underGrid2}>
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
                                SignUp
                            </Typography>
                            <span className={classes.span1}>And get health consultation</span>
                            <form onSubmit={signUpPatient}>
                                {count === 1 && (
                                    <div className={classes.innerForm}>
                                        <span className={classes.span2}>1/2</span>
                                        <div className={classes.label}>
                                            <label>
                                                Name
                                                <input
                                                    className={classes.input}
                                                    type="text"
                                                    name="name"
                                                    value={credential['name']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['name'] ? (
                                                        <div className={classes.error}>* {errorObj['name']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Email
                                                <input
                                                    className={classes.input}
                                                    type="text"
                                                    name="email"
                                                    value={credential['email']}
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
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Password
                                                <input
                                                    className={classes.input}
                                                    type="password"
                                                    name="password"
                                                    value={credential['password']}
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
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Confirm Password
                                                <input
                                                    className={classes.input}
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={credential['confirmPassword']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['confirmPassword'] ? (
                                                        <div className={classes.error}>
                                                            * {errorObj['confirmPassword']}
                                                        </div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <Button
                                                className={classes.Button1}
                                                onClick={() => setCount((prevCount) => prevCount + 1)}
                                                color="secondary"
                                                variant="contained"
                                            >
                                                <ArrowForwardIcon style={{ color: '#FFF3E5' }} />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {count === 2 && (
                                    <div className={classes.innerForm}>
                                        <span className={classes.span3}>2/2</span>
                                        <div className={classes.label}>
                                            <label>
                                                Height
                                                <span className={classes.underSpan}>(cm)</span>
                                                <input
                                                    className={classes.input}
                                                    type="number"
                                                    name="height"
                                                    value={credential['height']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['height'] ? (
                                                        <div className={classes.error}>* {errorObj['height']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <div className={classes.label}>
                                            <label>
                                                Weight
                                                <span style={{ left: '135px' }} className={classes.underSpan}>
                                                    (kg)
                                                </span>
                                                <input
                                                    className={classes.input}
                                                    type="number"
                                                    name="weight"
                                                    value={credential['weight']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['weight'] ? (
                                                        <div className={classes.error}>* {errorObj['weight']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>

                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Age
                                                <input
                                                    className={classes.input}
                                                    type="number"
                                                    name="age"
                                                    value={credential['age']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['age'] ? (
                                                        <div className={classes.error}>* {errorObj['age']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <div className={classes.label}>
                                            <label htmlFor="bloodType">Blood </label>
                                            <select
                                                onChange={handleChange}
                                                value={credential['bloodType']}
                                                className={classes.select}
                                                name="bloodType"
                                                id="bloodType"
                                                from="bloodform"
                                            >
                                                <option value="A+">A+</option>
                                                <option value="A-">A-</option>
                                                <option value="B+">B+</option>
                                                <option value="B-">B-</option>
                                                <option value="AB+">AB+</option>
                                                <option value="AB-">AB-</option>
                                                <option value="0+">0+</option>
                                                <option value="0-">0-</option>
                                            </select>
                                        </div>

                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Education
                                                <input
                                                    value={credential['education']}
                                                    className={classes.input}
                                                    type="text"
                                                    name="education"
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Disease Description
                                                <input
                                                    value={credential['diseaseDescription']}
                                                    className={classes.input}
                                                    type="text"
                                                    name="diseaseDescription"
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        <br />
                                        <div>
                                            <Button
                                                className={classes.Button2}
                                                color="secondary"
                                                variant="contained"
                                                onClick={() => setCount((prevCount) => prevCount - 1)}
                                            >
                                                <ArrowBackIcon style={{ color: '#FFF3E5' }} />
                                            </Button>
                                            <Button
                                                type="submit"
                                                className={classes.Button3}
                                                color="secondary"
                                                variant="contained"
                                                style={{ color: '#FFF3E5' }}
                                            >
                                                Submit
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </form>
                            <SimpleToast
                                open={openSuccess}
                                message="Password Changed Successfully"
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
};

export default PatientSignUp;
