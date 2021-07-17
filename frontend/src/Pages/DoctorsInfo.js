import React from 'react';
import {useParams} from 'react-router-dom';
import {makeStyles} from '@material-ui/core';
import Container from '@material-ui/core/Container';

const drawerWidth = 220;

const useStyle = makeStyles({
     'container':{
       marginTop:"80px",
       width: `calc(100% - ${drawerWidth}px)`,
       marginLeft: drawerWidth,
       ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
        width:"100%",
        marginLeft:"0px",
      },
    },
})

const DoctorsInfo = (props) => {

  const params = useParams();
  const {doctorId} = params;

  const classes = useStyle();

  console.log("YUp doctors info", doctorId);
   return (
     <Container className = {classes.container}>

     </Container>
   )
}

export default DoctorsInfo;
