import React from 'react';
import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import displayImage from '../Images/Group7.png';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useState} from "react";

const drawerWidth = 220;
const useStyle = makeStyles({
      'container':{
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        ['@media (max-width:659px)']: { // eslint-disable-line no-useless-computed-key
         width:"100%",
         marginLeft:"0px",
         backgroundColor:"#F4E5D3",
       },
     },
     'topGrid':{
       marginTop:'60px',
       ['@media (min-width:959px)']: { // eslint-disable-line no-useless-computed-key
         marginTop:'150px',
      },
     },
     'main':{
        backgroundColor:'#FFF3E5',
        borderRadius:'30px',
        position:'relative',
        marginTop:'-5px'
     },
     'content':{
       marginLeft:'20px',
       marginLeft:'20px'
     },
     'span1':{
       color:'#936B3D',
       position:'absolute',
       top:'85px',
       left:'110px',
     },
     'span2':{
       color:'#936B3D',
       position:'absolute',
       top:'20px',
       right:'25px',
     },
     'span3':{
       color:'#936B3D',
       position:'absolute',
       top:'20px',
       right:'25px',
     },
     'label':{
       color:'#936B3D',
       fontSize:'20px',
       position:'relative',
       marginTop:'30px',

       '& label':{
         marginLeft:'70px'
       }
     },
     'file':{
       marginLeft:'220px',
       marginTop:'20px'
     },
     'input':{
        position:'absolute',
        borderRadius:'20px',
        borderColor:'#DDD9D5',
        outline:'none',
        height:'30px',
        fontSize:'20px',
        marginTop:'20px',
        width:'70%',
        left:'0px',
        top:'15px',
        marginLeft:'10%',
     },
     'innerForm':{
       marginLeft:'20px'
     },
     'Button1':{
       marginLeft:'40%',
       marginBottom:'20px',
       marginTop:'10px'
     },
     'Button2':{
       marginLeft:'35%',
       marginBottom:'20px',
       marginTop:'10px'
     },
     'Button3':{
       marginLeft:'20px',
       marginBottom:'20px',
       marginTop:'10px'
     },
});

const DoctorSignUp = () => {
  const classes = useStyle();
  const [count,setCount] = useState(1);

  const formSubmitHandler = () => {
    console.log("Submit form here");
  }
    return (
      <Container className={classes.container}>
        <Grid className={classes.topGrid} container spacing={3} >
           <Grid item xs = {12} md = {6} lg = {6} key = "01" className={classes.underGrid}>
             <Card elevation={0}>
                 <div className={classes.image}>
                    <img src={displayImage}/>
                 </div>
             </Card>
           </Grid>
           <Grid item xs = {12} md = {6} lg = {6} key = "02" className={classes.underGrid}>
             <Card className = {classes.main} elevation={5}>
               <div className={classes.content}>
                 <Typography variant = "h5" component="h2" style={{color:'#936B3D',marginTop:"50px",marginLeft:"88px",marginBottom:"40px"}}>
                      SignUp
                 </Typography>
                 <span className={classes.span1}>And give health consultation</span>
                 <form onSubmit={formSubmitHandler}>

                    { (count === 1) &&
                      <div className={classes.innerForm}>
                        <span className={classes.span2}>1/2</span>
                        <div className={classes.label}>
                          <label>
                             Name
                          <input className={classes.input} type = "text" name = "name"/>
                          </label>
                        </div>
                        <br/>
                        <div className={classes.label}>
                          <label>
                             Email
                          <input className={classes.input} type = "text" name = "email"/>
                          </label>
                        </div>
                        <br/>
                        <div className={classes.label}>
                          <label>
                             Password
                             <input className={classes.input} type = "password" name = "password"/>
                          </label>
                        </div>
                        <br/>
                        <div className={classes.label}>
                          <label>
                             Confirm Password
                             <input className={classes.input} type = "password" name = "confirmPassword"/>
                          </label>
                        </div>
                        <br/>
                        <div className={classes.label}>
                          <Button className={classes.Button1} onClick={() => setCount(prevCount => prevCount + 1)} color="secondary" variant="contained">
                              <ArrowForwardIcon style={{color:'#FFF3E5'}}/>
                          </Button>
                        </div>
                      </div>
                    }
                    {count === 2 &&
                    <div className={classes.innerForm}>
                      <span className={classes.span3}>2/2</span>
                      <div className={classes.label}>
                        <label >
                           Specialization
                           <input className={classes.input} type = "text" name="Specialization"/>
                        </label>
                      </div>
                      <br/>
                      <div className={classes.label}>
                        <label>
                          Sub Specialization
                          <input className={classes.input} type = "text" name="Specialization"/>
                        </label>
                      </div>
                      <br/>
                      <div className={classes.label}>
                        <label>
                          Degree
                          <input className={classes.input} type = "text" name="Specialization"/>
                        </label>
                      </div>
                      <br/>
                      <div className={classes.label}>
                          <Button  color="secondary" style={{marginLeft:'27%',marginTop:'20px',color:'#FFF3E5',width:'40%'}} variant="contained" component="label">
                            Upload Certificate
                            <input hidden className={classes.input} type = "file" name="Certificate"/>
                          </Button>
                      </div>
                      <br/>
                      <div>
                        <Button className={classes.Button2} color="secondary" variant="contained" onClick={() => setCount(prevCount => prevCount-1)}>
                            <ArrowBackIcon style={{color:'#FFF3E5'}}/>
                        </Button>
                        <Button className={classes.Button3} color="secondary" variant="contained" style={{color:'#FFF3E5'}}>
                            Submit
                        </Button>
                      </div>
                    </div>
                    }
                  </form>
                </div>
             </Card>
           </Grid>
        </Grid>
      </Container>
    )
}

export default DoctorSignUp;
