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
]

const dummyMessages = [

    {
      sender:'Dr.Luthra',
      message:"Hello Sabo what's your problem",
    },
    {
      sender:'Sabo',
      message:"My pain is unexpressable",
    },
    {
      sender:'Dr.Luthra',
      message:"How can I cure you when I don't know the cause",
    },
    {
      sender:"Sabo",
      message:"Are you sure!! You can cure my pain ....finally someone...",
    },
    {
       sender:"Dr.Luthra",
       message:"Ya sure go on tell me your problem",
    },
    {
      sender:"Sabo",
      message:"I am a young single and virgin boy ....snuffles.... I am in search of someone who could take my head ..blushes.. so  ..umgh... would you mind taking my head ",
    },
]
const drawerWidth = 220;
const useStyle = makeStyles(
  {
    'container':{
      marginTop:"90px",
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      ['@media (max-width:660px)']: {
       width:"100%",
       height:"100%",
       marginLeft:"0px",
     },
     'main':{
       backgroundColor: '#F9F3EC',
       position:'relative',
       marginTop:'20px',
     },
   },
});

const DChat = () => {

  const classes = useStyle();
  const [text,setText] = useState('');
  const setRef = useCallback(node =>{
     if(node)
      node.scrollIntoView({smooth:true})
  },[])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('submitting bruh');
    console.log(text);
  }

    return (
      <>
      <Container className={classes.container}>
          <Grid container  spacing={3}>
           <Grid style={{flexDirection:'column',width:'40%'}} item xs={12} sm={6}>
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
           </Grid>
           <Grid item xs={12} sm={6} style={{}}>
               <Card className={classes.main} elevation={0} key={1}>
                  <CardHeader
                  avatar = {
                    <Avatar style={{height:'45px',width:'45px'}}>
                       {dummyData[0].name[0].toUpperCase()}
                    </Avatar>
                  }
                  title={
                  <div>
                    <Typography gutterBottom variant="h6" component="h2" style={{color:'#936B3D'}}>
                       {dummyData[0].name}
                    </Typography>
                  </div>
                  }
                  />
               </Card>
               <div style={{display:'flex', flexDirection:'column',flexGrow:'1'}}>
                  <div style={{display:'flex',flexDirection:'column',alignItem:'start',justifyContent:'end'}}>
                    {dummyMessages.map((message,index) => {
                      const lastMessage = dummyMessages.length-1 === index
                      const alignSelf = message.sender === 'Dr.Luthra' ? 'flex-end': '' ;
                      const color = message.sender === 'Dr.Luthra' ? 'blue': 'white' ;
                      const bgColor =  message.sender === 'Dr.Luthra' ? 'skyblue': 'white' ;
                      const you = message.sender === 'Dr.Luthra' ? 'You': `${message.sender}` ;
                      return(
                        <div
                        ref = {lastMessage?setRef:null}
                        key={index}
                        style={{display:'flex',flexDirection:'column',alignSelf:`${alignSelf}`}}
                        >
                            <div style={{ border:'1px solid',borderColor:`${color}`,backgroundColor:`${bgColor}`,padding:'10px',marginTop:'10px',borderRadius:'10px',fontSize:'17px' }}>
                               {message.message}
                            </div>
                            <div style={{ alignSelf:`${alignSelf}`,fontSize:'15px'}}>
                               {you}
                            </div>
                        </div>
                      )
                      })
                    }
                  </div>
               </div>
               <form onSubmit = {submitHandler} style={{marginTop:'10px'}}>
                  <textarea style={{width:'70%'}} rows="4" onChange={e=> setText(e.target.value)}>
                  </textarea>
                  <Button type="submit" color="secondary" variant="contained" style={{color:'#FFF3E5',width:'25%',marginLeft:'10px',marginTop:'-60px'}} >
                      Submit
                  </Button>
               </form>
           </Grid>
         </Grid>
      </Container>
      </>
    )
};

export default DChat;
