import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '../components/UI/Card';
import {makeStyles} from '@material-ui/core';

const DummyDoctors = [
  {
    id:"01",
    name:"Dr. Json",
    years:"10",
    Speciality:"Dentist",
    Staus:"Available",
    Timing:"10am - 5pm",
    Pay:"500",
  },
  {
    id:"02",
    name:"Dr. Json",
    years:"10",
    Speciality:"Dentist",
    Staus:"Available",
    Timing:"10am - 5pm",
    Pay:"500",
  },
  {
    id:"03",
    name:"Dr. Json",
    years:"10",
    Speciality:"Dentist",
    Staus:"Available",
    Timing:"10am - 5pm",
    Pay:"500",
  },
  {
    id:"04",
    name:"Dr. Json",
    years:"10",
    speciality:"Dentist",
    staus:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"05",
    name:"Dr. Json",
    years:"10",
    speciality:"Dentist",
    staus:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
  {
    id:"06",
    name:"Dr. Json",
    years:"10",
    speciality:"Dentist",
    staus:"Available",
    timing:"10am - 5pm",
    pay:"500",
  },
]

const useStyle = makeStyles(
  {
    'container':{
      marginTop:"80px",
      marginLeft:"250px",
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
            speciality = {doctor.speciality} status = {doctor.Status} timing = {doctor.timing}
            pay = {doctor.pay}/>
         </Grid>
       ))}
     </Grid>
   </Container>
 )
};

export default AllDoctors;
