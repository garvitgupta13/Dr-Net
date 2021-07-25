import logo from './logo.svg';
import './App.css';
import React from 'react';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AllDoctors from './Pages/AllDoctors';
import DoctorsInfo from './Pages/DoctorsInfo';
import PatientInfo from './Pages/PatientInfo';
import { Login } from './Pages/Login';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LandingPage from './Pages/LandingPage';
import DoctorSignUp from './Pages/DoctorSignup';
import PatientSignUp from './Pages/PatientSignUp';
import { Payment } from './Pages/payment';
const NODE_DOMAIN = 'http://localhost:5000/api';

const breakpointValues = {
  xs: 0,
  sm: 660,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const theme = createTheme({
  typograhy: {
    fontFamily: [
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
      light: '#EA7D19',
      main: '#EA5719',
      dark: '#EA5719',
      contrastText: '#000',
    },
  },
  breakpoints: {
    values: breakpointValues,
  },
});

function App() {
  document.body.style = 'background: #F4E5D3;';
  const [allDoctors, setAllDoctors] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const request = await axios.get(`${NODE_DOMAIN}/doctor`);
      setAllDoctors(request.data.data);
      setIsLoading(false);
    }
    fetchData().catch(error => {
      setError(error);
    });
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);

    if (searchTerm !== "") {
      const newDoctorList = allDoctors.filter((doctor) => {
        const val = doctor.name.toLowerCase() + " " + doctor.doctorInfo.domain.toLowerCase();
        return val.includes(searchTerm.toLowerCase());
      })

      setSearchResult(newDoctorList);
    }
    else {
      setSearchResult(allDoctors);
    }
  }


  return (
    <div style={{ backgroundColor: '#F4E5D3', height: '100%' }}>
      <Router>
        <ThemeProvider theme={theme}>
          <ResponsiveDrawer isLoggedIn={isLoggedIn} />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/patient/login">
              <Login role="patient" />
            </Route>

            <Route exact path="/doctor/login">
              < Login role="doctor" />
            </Route>

            <Route exact path="/doctorSignUp">
              <DoctorSignUp />
            </Route>

            <Route exact path="/patientSignUp">
              <PatientSignUp />
            </Route>

            <Route exact path="/Alldoctors">
              <AllDoctors term={searchTerm} error={error}
                isLoading={isLoading} allDoctors={searchTerm.length < 1 ? allDoctors : searchResult}
                searchKeyword={searchHandler} />
            </Route>

            <Route exact path="/AllDoctors/:doctorId">
              <DoctorsInfo />
            </Route>

            <Route exact path="/:patientId">
              <PatientInfo />
            </Route>

            <Route exact path="/payment/:doctorId">
              <Payment />
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
