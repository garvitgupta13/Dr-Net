import React, { useState, useCallback, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core';
import ChatContext from '../Contexts/chatContext';
import axios from "axios";
import { endConversation, getMessages, sendMessage } from '../Services/chatService';
import { getCurrentUser } from './../Services/authService';
import { format } from 'timeago.js';
import { io } from 'socket.io-client';

const drawerWidth = 220;
const useStyle = makeStyles({
    container: {
        marginTop: '70px',
        float: 'left',
        overflow: 'auto',
        height: '88vh',
        paddingLeft: '5px',
        ['@media (max-width:660px)']: {
            marginLeft: '0px',
        },
        main: {
            backgroundColor: '#F9F3EC',
            position: 'relative',
            marginTop: '20px',
        },
        label: {
            color: '#936B3D',
            fontSize: '20px',
            position: 'relative',
            marginTop: '30px',

            '& label': {
                marginLeft: '70px',
            },
        },
        input: {
            position: 'absolute',
            borderRadius: '20px',
            borderColor: '#DDD9D5',
            outline: 'none',
            height: '30px',
            fontSize: '20px',
            marginTop: '20px',
            width: '70%',
            left: '0px',
            top: '15px',
            marginLeft: '10%',
        },
    },
});

const Chat = ({
    width,
    conversation,
    receiver,
    messages,
    receivedMessage,
    handleSendMessage,
    handleEndConversation,
}) => {
    const classes = useStyle();
    const [reccText,setReccTest] = useState('');
    const [prescription,setPrescription] = useState(' ');
    const [disease,setDisease] = useState('');
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const user = getCurrentUser();
    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);

    if (!conversation) return null;
    if (!user) window.location = '/';

    const handleSendMessageInner = (e) => {
        e.preventDefault();
        handleSendMessage(text);
        setText('');
    };

    const handleEndConversationInner = () => {
      //  endConversation(conversation._id);
      setOpen(true);
    };

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
    setOpen(false);
    };

    const handleSubmit = (e) => {
         e.preventDefault();
         console.log('submitted');
         console.log(prescription,' ',reccText,' ',disease);

         const dataFilled = {
           'prescription':prescription,
           'disease':disease,
           'recommendedTests':reccText
         }

         try{
           const header = {
             "Content-Type": "application/json",
             Accept: "application/json",
             "X-Requested-With": "XMLHttpRequest"
           };

           const { data: response } = axios.post(
             `${process.env.REACT_APP_API_ENDPOINT}/users/doctor/signup`,  // FILL THIS
             dataFilled,
             header
           );

         }
         catch(error){
                console.log('error');
         }
         setOpen(false);

         setPrescription('');
         setReccTest('');
         setDisease('');
         endConversation(conversation._id);
         //now can end the conversation
    };

    return (
        <div className={classes.container} style={{ width: '100%' }}>
            {receiver.name ? (
                <Card className={classes.main} elevation={0} key={1}>
                    <CardHeader
                        avatar={
                            <Avatar style={{ height: '45px', width: '45px' }}>{receiver.name[0].toUpperCase()}</Avatar>
                        }
                        title={
                            <div>
                                <Typography gutterBottom variant="h6" component="h2" style={{ color: '#936B3D' }}>
                                    {receiver.name}
                                </Typography>
                            </div>
                        }
                    />
                </Card>
            ) : (
                <div></div>
            )}
            <div>
               <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth>
                 <DialogContent style = {{height:'60vh'}}>
                    <form onSubmit={handleSubmit}>
                      <div className={classes.label}
                      style={{  color: '#936B3D',
                        fontSize: '20px',
                        position: 'relative',
                        marginTop: '10px',
                        marginLeft:'20px'}}>
                        <label>
                          Prescription
                          <textarea
                             required
                             className={classes.input}
                             value = {prescription}
                             cols="50"
                             style={{marginTop:'5px',height:"140px",marginLeft:'5px',fontSize:'20px'}}

                             name="prescription"
                             onChange={(e) => setPrescription(e.target.value)}
                           />
                        </label>
                      </div>
                      <div className={classes.label}
                      style={{  color: '#936B3D',
                        fontSize: '20px',
                        position: 'relative',
                        marginTop: '10px',
                        marginLeft:'20px'}}>
                          <label>
                              Disease
                              <input
                                  required
                                  className={classes.input}
                                  style={{
                                    position: 'absolute',
                                    outline: 'none',
                                    height: '30px',
                                    fontSize: '20px',
                                    marginTop: '20px',
                                    width: '70%',
                                    left: '-55px',
                                    top: '15px',
                                    marginLeft: '10%',
                                  }}
                                  value={disease}
                                  type="text"
                                  name="disease"
                                  onChange={(e) => setDisease(e.target.value)}
                              />
                          </label>
                      </div>
                      <div className={classes.label}
                      style={{
                        color: '#936B3D',
                        fontSize: '20px',
                        position: 'relative',
                        marginTop: '40px',
                        marginLeft:'20px'}}>
                          <label>
                              Recommended Test
                              <input
                                  required
                                  className={classes.input}
                                  value={reccText}
                                  type="text"
                                  name="reccText"
                                  onChange={(e) => setReccTest(e.target.value)}
                                  style={{
                                    position: 'absolute',
                                    outline: 'none',
                                    height: '30px',
                                    fontSize: '20px',
                                    marginTop: '20px',
                                    width: '70%',
                                    left: '-55px',
                                    top: '15px',
                                    marginLeft: '10%',
                                  }}
                              />
                          </label>
                      </div>
                      <Button
                          type="submit"
                          className={classes.Button1}
                          color="secondary"
                          variant="contained"
                          style={{ color: '#FFF3E5',marginTop:'45px',marginLeft:'25px' }}
                      >
                          Submit
                      </Button>
                    </form>
                 </DialogContent>
               </Dialog>
           </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItem: 'start', justifyContent: 'end' }}>
                    {messages.map((message, index) => {
                        let lastMessage = messages.length - 1 === index;
                        let alignSelf = message.senderId === user._id ? 'flex-end' : '';
                        let color = message.senderId === user._id ? 'blue' : 'white';
                        let bgColor = message.senderId === user._id ? 'skyblue' : 'white';
                        let you = message.senderId === user._id ? 'You' : receiver.name;

                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                style={{ display: 'flex', flexDirection: 'column', alignSelf: `${alignSelf}` }}
                            >
                                <div
                                    style={{
                                        border: '1px solid',
                                        borderColor: `${color}`,
                                        backgroundColor: `${bgColor}`,
                                        padding: '10px',
                                        marginTop: '10px',
                                        borderRadius: '10px',
                                        fontSize: '17px',
                                    }}
                                >
                                    {message.text}
                                </div>
                                <div style={{ alignSelf: `${alignSelf}`, fontSize: '15px' }}>
                                    {format(message.createdAt)}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <form onSubmit={handleSendMessageInner} style={{ marginTop: '10px' }}>
                <textarea
                    style={{ width: '70%' }}
                    rows="4"
                    placeholder="Type a message"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></textarea>
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={!conversation.canChat}
                    style={{ color: '#FFF3E5', width: '25%', marginLeft: '10px', marginTop: '-60px' }}
                >
                    Send
                </Button>
            </form>
            <br />
            {user.role === 'doctor' ? (
                <Button
                    type="submit"
                    color="secondary"
                    variant="contained"
                    disabled={!conversation.canChat}
                    onClick={handleEndConversationInner}
                    style={{ color: '#FFF3E5', width: '5%', marginLeft: '0px', marginTop: '-25px' }}
                >
                    End
                </Button>
            ) : (
                <div />
            )}
        </div>
    );
};

export default Chat;
