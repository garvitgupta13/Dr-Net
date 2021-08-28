import React,{useState, useCallback} from 'react';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core';

const dummyData = [
  {
    name:'Sabo'
  },
  {
    name:'Naomi'
  },
  {
    name:'Zoro'
  },
  {
    name:'Monkey D Luffy'
  },
  {
    name:'Hawkeye'
  },
  {
    name:'Sabo'
  },
  {
    name:'Naomi'
  },
  {
    name:'Zoro'
  },
  {
    name:'Monkey D Luffy'
  },
  {
    name:'Hawkeye'
  },
]

const drawerWidth = 220;
const useStyle = makeStyles(
  {
    'container':{
          float:'left',
          marginLeft:'220px',
          marginTop:'80px',
          padding:'6px',
          width:'50%',
          height:'88vh',
          overflow:'auto',
            ['@media (max-width:660px)']:{
              marginLeft:'0px',
            }
     },
});


const PatientList = () => {

  const classes = useStyle();
  const [text,setText] = useState('');
  const setRef = useCallback(node =>{
     if(node)
      node.scrollIntoView({smooth:true})
  },[])



      return (
             <div className={classes.container} item xs={12} sm={6}>
                <Typography gutterBottom variant="h5" style={{color:'#936B3D',marginLeft:'15%'}}>
                   Patient List
                </Typography>
                  {
                    dummyData.map((patient,id) => (
                      <Card className={classes.main} elevation={0} key={id}>
                         <CardHeader
                         avatar = {
                           <Avatar style={{height:'45px',width:'45px'}}>
                              {patient.name[0].toUpperCase()}
                           </Avatar>
                         }
                         title={
                         <div>
                           <Typography gutterBottom variant="h6" component="h2" style={{color:'#936B3D'}}>
                              {patient.name}
                           </Typography>
                         </div>
                         }
                         />
                      </Card>
                    ))
                  }
             </div>
  );
}

export default PatientList;
