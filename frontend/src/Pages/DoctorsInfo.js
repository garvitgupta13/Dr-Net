import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import CreateIcon from '@material-ui/icons/Create';
import SaveIcon from '@material-ui/icons/Save';
import { getDoctor } from '../Services/getUser';
import { useState, useEffect } from 'react';
import Review from '../components/Review';
import Button from '@material-ui/core/Button';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import axios from 'axios';

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

const DoctorsInfo = (props) => {
    const [canChange, setCanChange] = useState(false);
    const [doctor, setDoctor] = useState(null);
    const [error, setError] = useState(null);
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);

    //console.log(params);
    const classes = useStyle();
    const { doctorId } = params;

    const getDoctorInfo = (doctorId) => {
        getDoctor(doctorId).then((data) => {
            //  console.log(data);

            if (data === undefined) {
                setError('BAD REQUEST');
            } else if (data.data.error) {
                setError(data.data.error);
            } else {
                setDoctor(data.data.data);
            }

            setIsLoading(false);
        });
    };

    useEffect(() => {
        getDoctorInfo(doctorId);
    }, [doctorId]);

    if (error) {
        return <p className="centered focus">No Such Doctor Exist</p>;
    }
    if (isLoading) {
        return (
            <div className="centered">
                <LoadingSpinner />
            </div>
        );
    }

    if (!doctor) {
        return <p className="centered focus">No Such Doctor Exist</p>;
    }

    const reviews = doctor.doctorInfo.reviews;

    const handleChange = () => {
        setCanChange((prevState) => !prevState);
    };

    const formSubmitHandler = () => {
        console.log('submit form here');
    };

    const addReviewHandler = () => {
        console.log('Add a review');
    };

    const availability = doctor.doctorInfo.status === true ? '#34A853' : '#F31313';
    const status = doctor.doctorInfo.status === true ? 'Available' : 'Not Available';

    let allReviews = [];
    let overallRating = 0;
    for (let i = 0; i < reviews.length; i++) {
        let id = reviews[i]._id;
        let ratingGiven = reviews[i].rating;
        let feedback = reviews[i].feedback;
        let reviewerId = reviews[i].reviewerId;
        overallRating += ratingGiven;

        allReviews.push({
            id: id,
            rating: ratingGiven,
            feedback: feedback,
            reviewerId: reviewerId,
        });
    }

    const rating = Math.ceil(overallRating / reviews.length);
    return (
        <Container className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={6} key="01" className={classes.underGrid}>
                    <Card className={classes.main} elevation={5}>
                        <CardHeader
                            style={{ position: 'relative' }}
                            avatar={
                                <Avatar style={{ height: '70px', width: '70px' }} className={classes.avatar}>
                                    {doctor.name[4].toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <div>
                                    <Typography gutterBottom variant="h5" component="h2" style={{ color: '#936B3D' }}>
                                        {doctor.name}
                                    </Typography>
                                    <Rating name="read-only" value={rating} readOnly />
                                </div>
                            }
                            subheader={
                                <div>
                                    <p style={{ color: '#E1701A', margin: '0px' }}>
                                        {`${doctor.doctorInfo.yearsOfExperience} years`}
                                    </p>
                                    <p style={{ color: '#E1701A', margin: '0px' }}>
                                        {`${doctor.doctorInfo.education} `}
                                    </p>
                                    <span
                                        style={{
                                            position: 'absolute',
                                            width: '100px',
                                            right: '30px',
                                            top: '10px',
                                            borderRadius: '20px',
                                            border: `1px solid ${availability}`,
                                            display: 'block',
                                            padding: '5px',
                                            color: `${availability}`,
                                            textAlign: 'center',
                                        }}
                                    >
                                        {status}
                                    </span>
                                </div>
                            }
                        />
                    </Card>
                    <Card className={classes.main} elevation={5}>
                        <Typography variant="h5" component="h2" style={{ color: '#936B3D', textAlign: 'center' }}>
                            More Information
                        </Typography>
                        <div
                            style={{ marginTop: '10px', marginBottom: '10px', paddingLeft: '10px', paddingTop: '10px' }}
                        >
                            <h3 className={classes.heading}>Speciality :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '100px' }}>
                                {doctor.doctorInfo.domain}
                            </span>
                            <h3 className={classes.heading}>Sub Speciality :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '140px' }}>
                                None
                            </span>
                            <h3 className={classes.heading}>Years Of Experience:</h3>
                            <span className={classes.underheading} style={{ marginLeft: '180px' }}>
                                {doctor.doctorInfo.yearsOfExperience}
                            </span>
                            <h3 className={classes.heading}>Education :</h3>
                            <span className={classes.underheading} style={{ marginLeft: '100px' }}>
                                {doctor.doctorInfo.education}
                            </span>
                        </div>
                    </Card>
                    {/* <Card className={classes.main} elevation={5}>
                        <form style={{ position: 'relative' }} onSubmit={formSubmitHandler}>
                            <Typography variant="h5" component="h2" style={{ color: '#936B3D', textAlign: 'center' }}>
                                Available During
                            </Typography>
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
                            <div className={classes.controlGroup}></div>
                        </form>
                    </Card> */}
                    <Link to={`/payment/${doctorId}`}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: '#F9F3EC',
                                color: '#936B3D',
                                borderRadius: '40px',
                                height: '50px',
                                width: '150px',
                                marginLeft: '35%',
                                marginTop: '12px',
                            }}
                        >
                            Book Appointment
                        </Button>
                    </Link>
                </Grid>
                <Grid item xs={12} md={12} lg={6} key="02" className={classes.underGrid}>
                    <Card className={classes.main2} elevation={5}>
                        <Typography variant="h5" component="h2" style={{ color: '#936B3D', textAlign: 'center' }}>
                            REVIEWS
                        </Typography>
                        {allReviews.map((review) => (
                            <Review
                                key={review.id}
                                id={review.id}
                                reviewerId={review.reviewerId}
                                time="5 July 10:30 pm"
                                star={review.rating}
                                review={review.feedback}
                            />
                        ))}
                    </Card>
                    <Button
                        variant="contained"
                        onClick={addReviewHandler}
                        style={{
                            backgroundColor: '#F9F3EC',
                            color: '#936B3D',
                            borderRadius: '40px',
                            height: '50px',
                            width: '150px',
                            marginLeft: '35%',
                            marginTop: '12px',
                        }}
                    >
                        Add Review
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default DoctorsInfo;
