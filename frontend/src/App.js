import logo from './logo.svg';
import './App.css';
import React from 'react';
import Layout from './components/Layout';
import { createTheme,ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import AllDoctors from './Pages/AllDoctors';
import DoctorsInfo from './Pages/DoctorsInfo';

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
  return (
    
<div style={{backgroundColor: '#F4E5D3',height:'100%'}}>
 <Router>
   <ThemeProvider theme = {theme}>
     <Layout/>
     <Switch>
       <Route exact path="/Alldoctors">
            <AllDoctors/>
       </Route>
       <Route exact path="/AllDoctors/:doctorId">
            <DoctorsInfo/>
       </Route>
     </Switch>
   </ThemeProvider>
 </Router>
</div>
  );
}

export default App;
