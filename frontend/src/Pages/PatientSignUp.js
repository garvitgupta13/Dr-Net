import React from 'react';
import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import displayImage from '../Images/rafiki.png';
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
     'input':{
       color:'#936B3D',
        position:'absolute',
        borderRadius:'20px',
        borderColor:'#DDD9D5',
        outline:'none',
        height:'30px',
        fontSize:'20px',
        marginTop:'20px',
        width:'70%',
        left:'0px',
        top:'10px',
        marginLeft:'10%',
     },
     'singleBox':{
      display:'flex',
      justifyContent:'center',
      marginLeft:'10%',
     },
     'label2':{
       color:'#936B3D',
       fontSize:'20px',
       position:'relative',
       marginLeft:'-100px',
     },
     'label22':{
       color:'#936B3D',
       fontSize:'20px',
       marginLeft:'120px',
       position:'relative',

     },
     'input2':{
       position:'absolute',
       borderRadius:'20px',
       borderColor:'#DDD9D5',
       outline:'none',
       height:'20px',
       fontSize:'20px',
       width:'80px',
       top:'25px',
       left:'0px'
     },
     'select':{
       position:'absolute',
       borderRadius:'20px',
       borderColor:'#DDD9D5',
       color:'#936B3D',
       outline:'none',
       height:'25px',
       fontSize:'20px',
       width:'80px',
       left:'0px',
       top:'25px',
       left:'0px'
     },
     'innerForm':{
       marginLeft:'20px',
       marginRight:'20px',
     },
     'Button1':{
       marginLeft:'40%',
       marginBottom:'20px',
       marginTop:'10px'
     },
     'Button2':{
       marginLeft:'35%',
       marginBottom:'20px',
       marginTop:'40px'
     },
     'Button3':{
       marginLeft:'20px',
       marginBottom:'20px',
       marginTop:'40px'
     },
});

const PatientSignUp = () => {
  const classes = useStyle();
  const [count,setCount] = useState(1);



  const formSubmitHandler = () => {
    console.log("Submit form here");
  }
    return (
      <Container className={classes.container}>
        <Grid className={classes.topGrid} container spacing={3}>
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
                 <span className={classes.span1}>And get health consultation</span>
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
                      <div className={classes.singleBox}>
                        <div className={classes.label2}>
                          <label>
                             Height
                             <input className={classes.input2} type = "number" name="height"/>
                          </label>
                        </div>
                        <div className={classes.label22}>
                          <label>
                            Weight
                            <input className={classes.input2} type = "number" name="weight"/>
                          </label>
                        </div>
                      </div>
                      <br/>
                      <div className={classes.singleBox}>
                        <div style={{left:'10px'}}  className={classes.label2}>
                          <label>
                            Age
                            <input className={classes.input2} type = "number" name="age"/>
                          </label>
                        </div>
                        <div style={{left:'35px'}} className={classes.label22}>
                          <label for = "blood" >Blood Group</label>
                          <select className={classes.select} name = "blood" id="blood" from="bloodform">
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
                      </div>
                      <br/>
                      <div className={classes.label}>
                        <label>
                          Education
                          <input className={classes.input} type = "text" name="education"/>
                        </label>
                      </div>
                      <br/>
                      <div className={classes.label}>
                        <label>
                          Allergies
                          <input className={classes.input} type = "text" name="allergies"/>
                        </label>
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

export default PatientSignUp;
