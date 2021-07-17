import React from 'react';
import {makeStyles} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';

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

const Review = ({id,name,time,star,review}) => {

  const classes = useStyle();

  console.log("Yo Reviews bruh");
  console.log(id,name,time,star,review);

   return (
     <Card className = {classes.main} elevation ={0}>
         <CardHeader
            avatar ={
              <Avatar style={{height:'60px',width:'60px'}}>
                 {name[0].toUpperCase()}
              </Avatar>
            }

            title={
            <div>
              <Typography gutterBottom variant="h6" component="h2" style={{color:'#936B3D'}}>
                 {name}
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
            <Typography variant="body2" style={{marginTop:'-20px'}}>
               {review}
            </Typography>
         </CardContent>
         <span className={classes.line}/>
     </Card>
   )

}

export default Review;
