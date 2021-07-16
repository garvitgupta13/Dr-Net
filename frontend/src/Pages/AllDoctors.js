import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '../components/UI/Card';
import {makeStyles} from '@material-ui/core';

const drawerWidth = 220;
const DummyDoctors = [
  {
    id:"01",
    name:"Dr. Json",
    years:"10",
    speciality:"Dentist",
    status:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"02",
    name:"Dr. Ben",
    years:"10",
    speciality:"Cardiologists",
    status:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"03",
    name:"Dr. Michael",
    years:"10",
    speciality:"Dermatologists",
    status:"Not Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"04",
    name:"Dr. Peterson",
    years:"10",
    speciality:"Endocrinologists",
    status:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"05",
    name:"Dr. Gulati",
    years:"10",
    speciality:"Physicians",
    status:"Not Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"06",
    name:"Dr. Ojha",
    years:"10",
    speciality:"Gastroenterologists",
    status:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
]

const useStyle = makeStyles(
  {
    'container':{
      marginTop:"80px",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      ['@media (max-width:600px)']: { // eslint-disable-line no-useless-computed-key
       width:"100%",
       marginLeft:"0px",
     },
    }
  }
)

const AllDoctors = (props) => {

   const classes = useStyle();

   return (
   <Container className={classes.container}>
     <Grid container spacing={3}>
       {DummyDoctors.map( doctor => (
         <Grid item xs={12} md={6} lg={4} key={doctor.id}>
           <Card id ={doctor.id} name = {doctor.name} years = {doctor.years}
            speciality = {doctor.speciality} status = {doctor.status} timing = {doctor.timing}
            pay = {doctor.pay}/>
         </Grid>
       ))}
     </Grid>
   </Container>
 )
};

export default AllDoctors;
