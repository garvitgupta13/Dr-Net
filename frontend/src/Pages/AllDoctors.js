import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '../components/UI/Card';
import {makeStyles} from '@material-ui/core';
import {useEffect} from 'react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import axios from 'axios';
import {useState} from 'react';

const NODE_DOMAIN = 'http://localhost:5000/api';

const drawerWidth = 220;
// const DummyDoctors = [
//   {
//     id:"01",
//     name:"Dr. Json",
//     years:"10",
//     speciality:"Dentist",
//     status:"Available",
//     timing:"10am - 5pm",
//     pay:"500",
//   },
//   {
//     id:"02",
//     name:"Dr. Ben",
//     years:"10",
//     speciality:"Cardiologists",
//     status:"Available",
//     timing:"10am - 5pm",
//     pay:"500",
//   },
//   {
//     id:"03",
//     name:"Dr. Michael",
//     years:"10",
//     speciality:"Dermatologists",
//     status:"Not Available",
//     timing:"10am - 5pm",
//     pay:"500",
//   },
//   {
//     id:"04",
//     name:"Dr. Peterson",
//     years:"10",
//     speciality:"Endocrinologists",
//     status:"Available",
//     timing:"10am - 5pm",
//     pay:"500",
//   },
//   {
//     id:"05",
//     name:"Dr. Gulati",
//     years:"10",
//     speciality:"Physicians",
//     status:"Not Available",
//     timing:"10am - 5pm",
//     pay:"500",
//   },
//   {
//     id:"06",
//     name:"Dr. Ojha",
//     years:"10",
//     speciality:"Gastroenterologists",
//     status:"Available",
//     timing:"10am - 5pm",
//     pay:"500",
//   },
// ]

const useStyle = makeStyles(
  {
    'container':{
      marginTop:"80px",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      ['@media (max-width:660px)']: {
       width:"100%",
       height:"100%",
       marginLeft:"0px",
     },
    }
  }
)

const AllDoctors = (props) => {

   const classes = useStyle();
   const [allDoctors,setAllDoctors] = useState(null);
   const [error,setError] = useState(null);
   const [isLoading,setIsLoading] = useState(true);

   useEffect(()=>{
    async function fetchData(){
     setIsLoading(true);
     const  request = await axios.get(`${NODE_DOMAIN}/doctor`);
     setAllDoctors(request.data.data);
       setIsLoading(false);
   }
     fetchData().catch(error=>{
       setError(error);
     });
   },[]);

    if(!allDoctors)
     return null;

     if(error)
     {
       return <p className='centered focus'>No Such Doctor Exist</p>;
     }

    if(isLoading)
    {
      return(
        <div className='centered'>
          <LoadingSpinner/>
        </div>
      );
    }


    let doctorArray  = [];

   for( let i =0 ;i < allDoctors.length ;i++)
   {
       let id = allDoctors[i]._id;
       let domain = allDoctors[i].doctorInfo.domain;
       let education = allDoctors[i].doctorInfo.education;
       let fees = allDoctors[i].doctorInfo.fees;
       let status = allDoctors[i].doctorInfo.status;
       let yearsOfExperience = allDoctors[i].doctorInfo.yearsOfExperience;
       let name = allDoctors[i].name;

       let availability = status === true ? 'Available' : 'Not Available';

       doctorArray.push({
         id: id,
         name: name,
         years: yearsOfExperience,
         speciality: domain,
         status: availability,
         pay:fees,
         education: education
       });
   }

   return (
   <Container className={classes.container}>
     <Grid container spacing={3}>
       {doctorArray.map( doctor => (
         <Grid item xs={12} md={6} lg={4} key={doctor.id}>
           <Card id ={doctor.id} name = {doctor.name} years = {doctor.years}
            speciality = {doctor.speciality} status = {doctor.status} timing = {doctor.timing}
            pay = {doctor.pay} education = {doctor.education}/>
         </Grid>
       ))}
     </Grid>
   </Container>
 )
};


export default AllDoctors;
