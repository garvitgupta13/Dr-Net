import React from 'react';
import {makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import {getPatient} from "../Services/getUser";
import {useState,useEffect} from 'react';

const NODE_DOMAIN = process.env.REACT_APP_API_ENDPOINT;


const useStyle = makeStyles({
    'main':{
      backgroundColor: '#F9F3EC',
      position:'relative',
    },
    'line':{
      display:"block",
      position:'absolute',
      border: "1px solid #936B3D",
      background:"#936B3D",
      height:"0px",
      width:"80%",
      left:"40px",
      top:"160px"
    },
    'rating':{
      float:'right',
      marginTop:'-35px',
      marginRight:'25px',
    }
});

const Review = ({id,reviewerId,time,star,review}) => {

  const classes = useStyle();
  const [name,setName] = useState(null);
  const [error,setError] = useState(null);
  const token = localStorage.getItem('token');

    useEffect(()=>{
        getPatient(reviewerId,token).then((response)=>{
          setName(response.data.data);
        }).catch(error=>{
          setError(error);
        });
    },[reviewerId]);


   if(!name)
    return null;

    const patientName = name.name;

   return (
     <Card className = {classes.main} elevation ={0} key={id}>
         <CardHeader
            avatar ={
              <Avatar style={{height:'60px',width:'60px'}}>
                 {patientName[0].toUpperCase()}
              </Avatar>
            }

            title={
            <div>
              <Typography gutterBottom variant="h6" component="h2" style={{color:'#936B3D'}}>
                 {patientName}
              </Typography>
              <Rating className={classes.rating} name="read-only" value={star} readOnly />
            </div>
            }
                subheader = {
                  <p style={{color:'#E1701A',marginTop:"-10px"}}>
                     {time}
                  </p>
                }

         />

         <CardContent>
            <Typography variant="body2" style={{marginTop:'-20px',color:'#936B3D'}}>
               {review}
            </Typography>
         </CardContent>
         <span className={classes.line}/>
     </Card>
   )

}

export default Review;
