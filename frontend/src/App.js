import logo from './logo.svg';
import './App.css';
import React from 'react';
import Layout from './components/Layout';
import { createTheme,ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import AllDoctors from './Pages/AllDoctors';
import DoctorsInfo from './Pages/DoctorsInfo';
import PatientInfo from './Pages/PatientInfo';
import axios from 'axios';
import {useState,useEffect} from 'react';

const NODE_DOMAIN = 'http://localhost:5000/api';

const breakpointValues = {
  xs: 0,
  sm: 660,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = createTheme({
  typograhy:{
    fontFamily:[
      'Montserrat',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      light: '#F9F3EC',
      main: '#F4E5D3',
      dark: '#E1701A',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#EA5719',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  breakpoints: {
     values: breakpointValues,
  },
});

function App() {

  const [allDoctors,setAllDoctors] = useState(null);
  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(null);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResult,setSearchResult] = useState("");

  const searchHandler = (searchTerm) =>{
    setSearchTerm(searchTerm);

    if(searchTerm !== "")
    {
      const newDoctorList = allDoctors.filter((doctor) => {
        const val = doctor.name.toLowerCase()+" "+doctor.doctorInfo.domain.toLowerCase();
        return val.includes(searchTerm.toLowerCase());
      })

      setSearchResult(newDoctorList);
    }
    else
    {
      setSearchResult(allDoctors);
    }
  }


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

  return (
<div style={{backgroundColor: '#F4E5D3',height:'100%'}}>
 <Router>
   <ThemeProvider theme = {theme}>
     <Layout/>
     <Switch>
       <Route exact path="/Alldoctors">
            <AllDoctors term={searchTerm}  error={error}
            isLoading={isLoading} allDoctors = {searchResult}
            searchKeyword={searchHandler}/>
       </Route>
       <Route exact path="/AllDoctors/:doctorId">
            <DoctorsInfo/>
       </Route>
       <Route exact path="/:patientId">
            <PatientInfo/>
       </Route>
     </Switch>
   </ThemeProvider>
 </Router>
</div>
  );
}

export default App;
