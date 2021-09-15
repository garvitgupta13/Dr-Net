import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Joi from 'joi-browser';
import axios from 'axios';
import { getCurrentUser } from './../Services/authService';

import { SimpleToast } from '../components/UI/Toast';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import displayImage from '../Images/Group7.png';

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
        marginTop: '5px',

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
        marginTop: '10px',
    },
    Button2: {
        marginLeft: '30%',
        marginBottom: '20px',
        marginTop: '120px',
    },
    Button3: {
        marginLeft: '20px',
        marginBottom: '20px',
        marginTop: '120px',
    },
    error: {
        color: 'red',
        marginTop: '40px',
        textAlign: 'center',
    },
});

const DoctorSignUp = () => {
    const classes = useStyle();
    const [count, setCount] = useState(1);
    const user = getCurrentUser();
    const schema = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        domain: '',
        education: '',
        fees: '',
        yearsOfExperience: '',
        bio: '',
    };

    const [credential, setCredential] = useState(schema);
    const [errorObj, setErrorObj] = useState({});
    const [openSuccess, setOpenSuccessToast] = useState(false);
    const [openError, setOpenErrorToast] = useState(false);
    const [toastMessage, setToastMessage] = useState(false);

    const validationSchema = {
        name: Joi.string().min(6).required().label('Name'),
        email: Joi.string().email().required().label('Email'),
        domain: Joi.string().required().label('Domain'),
        education: Joi.string().required().label('Degree'),
        password: Joi.string().min(6).required().label('Password'),
        fees: Joi.number().min(0),
        yearsOfExperience: Joi.number().min(0),
        bio: Joi.any(),
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
            console.log('Clear BRUH!!');
            return true;
        }
        const errors = {};
        check.error.details.map((item) => {
            if (!errors[item.path[0]]) errors[item.path[0]] = item.message;
            return 0;
        });

        console.log(errors);
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

    async function signUpDoctor(e) {
        console.log('Signing up bruh!!');
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
                    `${process.env.REACT_APP_API_ENDPOINT}/users/doctor/signup`, // FILL THIS
                    credential,
                    header
                );

                if (response.status === 200) {
                    setToastMessage(response.message);
                    setOpenSuccessToast(true);
                    window.location = '/patient/login'; //to be changed
                } else {
                    console.log(response.message);
                    setToastMessage(response.message);
                    setOpenErrorToast(true);
                }
            } catch (err) {
                //Handling rejected promise for backend error
                setToastMessage('SERVER ERROR: Please try again after some time');
                setOpenErrorToast(true);
            }
        } else console.log('Form not valid');
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
                            <span className={classes.span1}>And give health consultation</span>
                            <form onSubmit={signUpDoctor}>
                                {count === 1 && (
                                    <div className={classes.innerForm}>
                                        <span className={classes.span2}>1/2</span>
                                        <div className={classes.label}>
                                            <label>
                                                Name
                                                <input
                                                    className={classes.input}
                                                    onChange={handleChange}
                                                    value={credential['name']}
                                                    type="text"
                                                    name="name"
                                                />
                                            </label>
                                            <div>
                                                {errorObj['name'] ? (
                                                    <div className={classes.error}>* {errorObj['name']}</div>
                                                ) : (
                                                    <div>&nbsp; &nbsp;</div>
                                                )}
                                            </div>
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
                                                Domain
                                                <input
                                                    className={classes.input}
                                                    type="text"
                                                    name="domain"
                                                    value={credential['domain']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['domain'] ? (
                                                        <div className={classes.error}>* {errorObj['domain']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Degree
                                                <input
                                                    className={classes.input}
                                                    type="text"
                                                    name="education"
                                                    value={credential['education']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['education'] ? (
                                                        <div className={classes.error}>* {errorObj['education']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Years Of Experience
                                                <input
                                                    className={classes.input}
                                                    type="number"
                                                    name="yearsOfExperience"
                                                    value={credential['yearsOfExperience']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['yearsOfExperience'] ? (
                                                        <div className={classes.error}>
                                                            * {errorObj['yearsOfExperience']}
                                                        </div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Fee
                                                <input
                                                    className={classes.input}
                                                    type="number"
                                                    name="fees"
                                                    value={credential['fees']}
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['fees'] ? (
                                                        <div className={classes.error}>* {errorObj['fees']}</div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                        <br />
                                        <div className={classes.label}>
                                            <label>
                                                Bio
                                                <textarea
                                                    className={classes.input}
                                                    value={credential['bio']}
                                                    style={{ height: '140px' }}
                                                    name="bio"
                                                    onChange={handleChange}
                                                />
                                                <div>
                                                    {errorObj['bio'] ? (
                                                        <div style={{ marginTop: '150px' }} className={classes.error}>
                                                            * {errorObj['bio']}
                                                        </div>
                                                    ) : (
                                                        <div>&nbsp; &nbsp;</div>
                                                    )}
                                                </div>
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

export default DoctorSignUp;
