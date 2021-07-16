import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import {orange} from '@material-ui/core/colors';

const useStyle = makeStyles({
   avatar:{
     background: orange[200],
   },
   heading:{
       color: '#936B3D',
       fontWeight:"900",
       marginTop:"0px"
   },
   underheading:{
     color:'#936B3D',
     fontWeight:"bold",
     position:"absolute",
     marginTop:"-15px",
     marginLeft:"120px",
     fontSize:"15px"
   },
   main:{
     backgroundColor:'#F9F3EC',
   }

});

const DoctorCard = ({id,name,years,speciality,status,timing,pay} ) => {

    const avatarClickHandler= () =>{
       console.log("Avatar is Clicked");
    };

    const classes = useStyle();

    return(
      <div>
        <Card className={classes.main} elevation={5}>
          <CardHeader
            avatar={
              <Avatar onClick={avatarClickHandler} style={{ height: '70px', width: '70px' }} className={classes.avatar}>{name[4].toUpperCase()}</Avatar>
            }

            title={
              <Typography gutterBottom variant="h4" component="h2" style={{color:'#936B3D'}}>
                 {name}
               </Typography>
            }

            subheader = {
              <Typography gutterBottom variant="body2" style={{color:'#E1701A'}}>
                 {`${years} years`}
               </Typography>
            }

          />
          <CardContent>
              <ListItem>
                 <h3 className = {classes.heading}>Speciality :</h3>
                 <span className={classes.underheading}>{speciality}</span>
              </ListItem>
              <ListItem>
                <h3 className = {classes.heading}>Timing :</h3>
                <span className={classes.underheading}>{timing}</span>
              </ListItem>
              <ListItem>
                  <h3 className = {classes.heading}>status :</h3>
                  <span className={classes.underheading}>{status}</span>
              </ListItem>
              <span className={classes.line}/>
              <div className={classes.div}>
                <p style={{marginBottom:"-23px",color:'#6F502C',marginLeft:"20px"}}>₹{pay}</p>
                <span style = {{float:"right",marginBottom:"20px"}}>
                  <a href="/patient" style={{color:'#E1701A',textDecoration:'none'}}>  Book Appointment </a>
                </span>
              </div>
          </CardContent>
        </Card>
      </div>
    )
};

export default DoctorCard;
