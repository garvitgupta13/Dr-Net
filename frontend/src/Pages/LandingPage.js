import React from 'react';
import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import doctorImage from '../Images/doctor.png';
import patientImage from '../Images/patient.png';
import {useHistory} from 'react-router-dom';

const useStyle = makeStyles({
   'underGrid':{
     marginTop:'10px',
   },
   'main':{
     backgroundColor:'#F9F3EC',
      borderRadius:'30px',
      height:'300px',
      width:'350px',
      marginLeft:'auto',
      marginRight:'auto',
      textAlign:'center',
      marginTop:'20px'
   },
   'image':{
     marginTop:'30px',
     position:'relative'
   },
   'span':{
        position:'absolute',
        top:'130px',
        left:'140px',
        color:'#936B3D',
        fontSize:'25px'
   },
   'left':{
     position:'absolute',
     color:'#FFFFFF',
     borderRadius:'40px',
     height:'50px',
     width:'100px',
     top:'185px',
     left:'50px',
     marginTop:'12px,'
   },
   'right':{
     position:'absolute',
     color:'#FFFFFF',
     borderRadius:'40px',
     height:'50px',
     width:'100px',
     top:'185px',
     right:'50px',
     marginTop:'12px,'
   },
})

const LandingPage = () => {

     const classes = useStyle();
     const history = useHistory();

  return (
       <Container className = {classes.container}>
           <Typography variant = "h2" component="h2" style={{color:'#936B3D',textAlign:'center',marginTop:"50px"}}>
                Dr. Net
           </Typography>
          <Grid container spacing={3} style={{marginTop:'20px'}}>
             <Grid item xs = {12} md = {6} lg = {6} key = "01" className={classes.underGrid}>
                <Card className = {classes.main} elevation={5}>
                    <div className={classes.image}>
                       <img src={doctorImage}/>
                       <span className={classes.span}>Doctor</span>
                       <Button onClick={() => history.push('/doctorLogIn')} color="secondary" variant="contained" className={classes.left}>
                          Log In
                       </Button>
                       <Button onClick={() => history.push('/doctorSignUp')} color="secondary" variant="contained" className={classes.right}>
                         Sign Up
                       </Button>
                    </div>
                </Card>
             </Grid>
             <Grid item xs = {12} md = {6} lg = {6} key = "02" className={classes.underGrid}>
                <Card className = {classes.main} elevation={5}>
                    <div className={classes.image}>
                        <img src = {patientImage}/>
                        <span className={classes.span}>Patient</span>
                        <Button onClick={() => history.push('/patientLogIn')} color="secondary" variant="contained" className={classes.left}>
                         Log In
                        </Button>
                        <Button onClick={() => history.push('/patientSignUp')} color="secondary" variant="contained" className={classes.right}>
                         Sign Up
                        </Button>
                    </div>
                </Card>
             </Grid>
          </Grid>
       </Container>
  )
}

export default LandingPage;
