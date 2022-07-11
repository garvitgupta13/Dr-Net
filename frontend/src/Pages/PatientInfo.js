import React from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MedicalHistory from '../components/MedicalHistory';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { getCurrentUser } from './../Services/authService';


const NODE_DOMAIN = process.env.REACT_APP_API_ENDPOINT;
const drawerWidth = 220;

const useStyle = makeStyles({
    container: {
        marginTop: '80px',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        ['@media (max-width:660px)']: {
            // eslint-disable-line no-useless-computed-key
            width: '100%',
            marginLeft: '0px',
            backgroundColor: '#F4E5D3',
        },
    },
    main: {
        backgroundColor: '#F9F3EC',
        borderRadius: '30px',
        marginBottom: '20px',
    },
    heading: {
        color: '#936B3D',
        fontWeight: 'bold',
        marginTop: '0px',
        fontSize: '17px',
        marginLeft: '5px',
    },
    underheading: {
        color: '#936B3D',
        fontWeight: 'normal',
        position: 'absolute',
        marginTop: '-42px',
        fontSize: '20px',
    },
    main2: {
        backgroundColor: '#F9F3EC',
        borderRadius: '30px',
        paddingTop: '20px',
    },
});
const PatientInfo = () => {
    const [canChange, setCanChange] = useState(false);
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const classes = useStyle();
    const patientId = getCurrentUser()._id;

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            //TODO: redirect to login page
        }
        async function fetchData() {
            setIsLoading(true);
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            const request = await axios.get(`${NODE_DOMAIN}/patient/${patientId}`);
            setPatient(request.data.data);
            setIsLoading(false);
        }

        fetchData().catch((error) => {
            setError(error);
        });
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

    if (!patient) {
        return (
          <p className="centered focus">No Such Patient Exist</p>);
    }

    const handleChange = () => {
        setCanChange((prevState) => !prevState);
    };

    const medHistory = patient.patientInfo.medicalHistory;

    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={6} key="01" className={classes.underGrid}>
                    <Card className={classes.main} elevation={5}>
                        <CardHeader
                            avatar={
                                <Avatar style={{ height: '90px', width: '90px' }} className={classes.Avatar}>
                                    {patient.name[0].toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <div>
                                    <Typography
                                        gutterBottom
                                        variant="h3"
                                        component="h2"
                                        style={{ color: '#936B3D', marginLeft: '10px', fontSize: '35px' }}
                                    >
                                        {patient.name}
                                    </Typography>
                                </div>
                            }
                        />
                    </Card>
                    <Card className={classes.main} style={{ position: 'relative' }} elevation={5}>
                        {!canChange && (
                            <CreateIcon
                                onClick={handleChange}
                                style={{ position: 'absolute', right: '40px', top: '20px' }}
                            />
                        )}
                        {canChange && (
                            <SaveIcon
                                onClick={handleChange}
                                style={{ position: 'absolute', right: '40px', top: '20px' }}
                            />
                        )}
                        <Typography
                            variant="h5"
                            component="h2"
                            style={{ color: '#936B3D', textAlign: 'center', marginTop: '20px' }}
                        >
                            More Information
                        </Typography>
                        <div
                            style={{
                                marginTop: '10px',
                                marginBottom: '100px',
                                paddingLeft: '10px',
                                paddingTop: '10px',
                            }}
                        >
                            <h3 className={classes.heading} style={{ marginTop: '40px' }}>
                                Age :
                            </h3>
                            <span className={classes.underheading} style={{ marginLeft: '53px' }}>
                                {patient.patientInfo.age}
                            </span>
                            <h3 className={classes.heading}>Height :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '75px' }}>
                                {patient.patientInfo.height}
                            </span>
                            <h3 className={classes.heading}>Weight :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '77px' }}>
                                {patient.patientInfo.weight}
                            </span>
                            <h3 className={classes.heading}>Blood Group :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '125px' }}>
                                {patient.patientInfo.bloodType}
                            </span>
                            <h3 className={classes.heading}>Allergies :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '95px' }}>
                                {patient.patientInfo.diseaseDescription}
                            </span>
                            <h3 className={classes.heading}>Marital Status :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '135px' }}>
                                Unmarried
                            </span>
                            <h3 className={classes.heading}>Education :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '105px' }}>
                                {patient.patientInfo.education}
                            </span>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={6} key="02" className={classes.underGrid}>
                    <Card className={classes.main2} elevation={5}>
                        <Typography variant="h5" component="h2" style={{ color: '#936B3D', textAlign: 'center' }}>
                            Medical History
                        </Typography>
                        {medHistory.map((history) => (
                            <MedicalHistory
                                key={history._id}
                                id={history._id}
                                createdAt={history.createdAt}
                                disease={history.disease}
                                recommendedTests={history.recommendedTests}
                                doctorId={history.doctorId}
                                prescription={history.prescription}
                                additionalMeasures={history.additionalMeasures}
                            />
                        ))}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
  }

export default PatientInfo;
