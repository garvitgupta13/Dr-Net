import React from 'react';
import {makeStyles} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import {useState,useEffect} from 'react';
const NODE_DOMAIN = process.env.REACT_APP_API_ENDPOINT;

const useStyle =  makeStyles({
  'main':{
    backgroundColor: '#F9F3EC',
    position:'relative',
  },
  'heading':{
      color: '#936B3D',
      fontWeight:"bold",
      marginTop:"0px",
      fontSize:'17px',
      marginLeft:'5px',
  },
  'underheading':{
    color:'#936B3D',
    fontWeight:"normal",
    position:"absolute",
    marginTop:"-43px",
    fontSize:"20px"
  },
  'line':{
    display:"block",
    position:'absolute',
    border: "1px solid #936B3D",
    background:"#936B3D",
    height:"0px",
    width:"80%",
    left:"40px",
    top:"250px"
  },
});


const MedicalHistory = ({id,createdAt,disease,doctorId,additionalMeasures,prescription,recommendedTests}) =>{

  const classes = useStyle();
  const [name,setName] = useState(null);
  const [error,setError] = useState(null);

  var date = new Date(createdAt);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const fullDate = day+'-'+month+'-'+year;

  useEffect(()=>{
    axios.get(`${NODE_DOMAIN}/doctor/${doctorId}`).then((response)=>{
      setName(response.data.data);
    }).catch(error=>{
      setError(error);
    });
  },[doctorId]);

  if(!name)
   return null;

   const doctorName = name.name;

    return(
      <Card className = {classes.main} elevation ={0} key={id}>
        <span style={{color:'#CD9552',position:'absolute',right:'10px'}}>{fullDate}</span>
        <div style={{marginTop:'10px',marginBottom:'100px',paddingLeft:'10px',paddingTop:'10px'}}>
          <h3 className = {classes.heading}>Doctor Appointed:</h3>
          <span className={classes.underheading} style={{marginLeft:"160px"}}>{doctorName}</span>
          <h3 className = {classes.heading}>Disease Detected :</h3>
          <span className={classes.underheading} style={{marginLeft:"160px"}}>{disease}</span>
          <h3 className = {classes.heading}>Medicine Prescribed :</h3>
          <span className={classes.underheading} style={{marginLeft:"195px"}}>{prescription}</span>
          <h3 className = {classes.heading}>Recommended Tests :</h3>
          <span className={classes.underheading} style={{marginLeft:"197px"}}>{recommendedTests}</span>
          <h3 className = {classes.heading}>Addition Measures :</h3>
          <span className={classes.underheading} style={{marginLeft:"175px"}}>{additionalMeasures}</span>
         </div>
        <span className = {classes.line}></span>
      </Card>
    )
}

export default MedicalHistory;
