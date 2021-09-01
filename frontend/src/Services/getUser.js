import axios from "axios";
import {useCallback} from 'react';

export const getPatient = (patientId,token) => {

  const response =  axios.get(`${process.env.REACT_APP_API_ENDPOINT}/doctor/${patientId}`,
     {
      'headers':{
         'Authorization': token
     }
   });
   return response;

};


export const getDoctor = async(doctorId) => {

    try{
      const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/doctor/${doctorId}`);
      return response;
    }
    catch(error){
      console.log(error);
    }
};

export const allDoctorsInfo = async() => {
  try{
        const response = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/doctor`);
        return response;
  }
  catch(error)
  {
      console.log(error);
  }
}
