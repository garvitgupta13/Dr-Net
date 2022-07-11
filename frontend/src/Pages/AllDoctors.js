import React, {useRef} from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '../components/UI/Card';
import {makeStyles} from '@material-ui/core';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import SearchIcon from '@material-ui/icons/Search';

const NODE_DOMAIN = process.env.REACT_APP_API_ENDPOINT;

const drawerWidth = 220;
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
   },
   'input':{
     position:'fixed',
     zIndex:'5',
     top:'10px',
     right:'10px',
     zIndex:"10"
   },
   'search':{
     position:'fixed',
     right:'20px',
     top:'15px'
   }
  }
)

const AllDoctors = ({error,isLoading,allDoctors,term,searchKeyword}) => {

   const classes = useStyle();
   const inputEl = useRef("");

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

    if(!allDoctors)
    {
      return <p className='centered focus'>No doctors currently on List</p>;
    }

    const getSearchTerm = () =>{
       searchKeyword(inputEl.current.value);
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
   <React.Fragment>
     <div className={classes.main}>
        <div className={classes.input}>
           <input size="25" type="text" style={{height:'35px',fontSize:'14px'}}
            placeholder="Search Doctors" value={term} onChange={getSearchTerm}
            ref={inputEl}/>
           <SearchIcon className={classes.search}/>
        </div>
     </div>
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
   </React.Fragment>
 )
};


export default AllDoctors;
