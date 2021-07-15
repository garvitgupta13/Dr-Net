import logo from './logo.svg';
import './App.css';
import React from 'react';
import Layout from './components/Layout';
import { createTheme,ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import AllDoctors from './Pages/AllDoctors';

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
});

function App() {
  return (
    // if !isLogged in than LandingPage
<React.Fragment>
 <Router>
   <ThemeProvider theme = {theme}>
     <Layout/>
     <Switch>
       <Route exact path="/patient">
            <AllDoctors/>
       </Route>
     </Switch>
   </ThemeProvider>
 </Router>
</React.Fragment>
  );
}

export default App;
