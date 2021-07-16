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
       fontWeight:"bold",
       marginTop:"0px",
       fontSize:'17px',
   },
   underheading:{
     color:'#936B3D',
     fontWeight:"normal",
     position:"absolute",
     marginTop:"-15px",
     marginLeft:"100px",
     fontSize:"20px"
   },
   main:{
     backgroundColor:'#F9F3EC',
   },
   line:{
     display:"block",
     border: "1px solid #936B3D",
     background:"#936B3D",
     height:"0px",
     width:"100%"
   },
   green:{
        color:'#34A853',
   },

});

const DoctorCard = ({id,name,years,speciality,status,timing,pay} ) => {

    const avatarClickHandler= () =>{
       console.log("Avatar is Clicked");
    };

    const classes = useStyle();

    const availability =  (status === 'Available') ? '#34A853' : '#F31313';
    console.log(availability);
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
                <span style={{ marginLeft:"75px" }} className={classes.underheading}>{timing}</span>
              </ListItem>
              <ListItem>
                  <h3 className = {classes.heading}>Status :</h3>
                  <span style = {{ marginLeft:"70px",borderRadius:'20px',border: `1px solid ${availability}` ,display:'block',padding:'5px', color: `${availability}` }} className={classes.underheading}>{status}</span>
              </ListItem>
              <span className={classes.line}/>
              <div className={classes.div}>
                <p style={{marginBottom:"-23px",color:'#6F502C',marginLeft:"20px",fontSize:"20px"}}>₹{pay}</p>
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
