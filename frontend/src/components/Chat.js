import React, { useState, useCallback } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core';
import { endConversation } from '../Services/chatService';
import { submitConsultant } from '../Services/consultService';
import { getCurrentUser } from './../Services/authService';
import { format } from 'timeago.js';
import Grid from '@material-ui/core/Grid';

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
    container2: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
    },
});

const Chat = ({ width, conversation, receiver, messages, receivedMessage, handleSendMessage }) => {
    const classes = useStyle();
    const [reccText, setReccTest] = useState('');
    const [prescription, setPrescription] = useState(' ');
    const [disease, setDisease] = useState('');
    const [text, setText] = useState('');
    const [open, setOpen] = useState(false);
    const user = getCurrentUser();
    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);

    if (!conversation) return null;

    const handleSendMessageInner = (e) => {
        e.preventDefault();
        handleSendMessage(text);
        setText('');
    };

    const handleEndConversation = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataFilled = {
            prescription: prescription,
            disease: disease,
            recommendedTests: reccText,
        };

        const response = submitConsultant(dataFilled, user._id, conversation.patient._id);
        setOpen(false);

        setPrescription('');
        setReccTest('');
        setDisease('');
        endConversation(conversation._id);
    };

    return (
        <div className={classes.container} style={{ width: '100%' }}>
            {receiver.name ? (
                <Card className={classes.main} elevation={0} key={1} style={{ position: 'fixed', width: '100%' }}>
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
                    <DialogContent style={{ height: '60vh' }}>
                        <form onSubmit={handleSubmit}>
                            <div
                                className={classes.label}
                                style={{
                                    color: '#936B3D',
                                    fontSize: '20px',
                                    position: 'relative',
                                    marginTop: '10px',
                                    marginLeft: '20px',
                                }}
                            >
                                <label>
                                    Prescription
                                    <textarea
                                        required
                                        className={classes.input}
                                        value={prescription}
                                        cols="50"
                                        style={{
                                            marginTop: '5px',
                                            height: '140px',
                                            marginLeft: '5px',
                                            fontSize: '20px',
                                        }}
                                        name="prescription"
                                        onChange={(e) => setPrescription(e.target.value)}
                                    />
                                </label>
                            </div>
                            <div
                                className={classes.label}
                                style={{
                                    color: '#936B3D',
                                    fontSize: '20px',
                                    position: 'relative',
                                    marginTop: '10px',
                                    marginLeft: '20px',
                                }}
                            >
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
                            <div
                                className={classes.label}
                                style={{
                                    color: '#936B3D',
                                    fontSize: '20px',
                                    position: 'relative',
                                    marginTop: '40px',
                                    marginLeft: '20px',
                                }}
                            >
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
                                style={{ color: '#FFF3E5', marginTop: '45px', marginLeft: '25px' }}
                            >
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', marginBottom: '15%' }}>
                {messages.length > 0 ? (
                    <div
                        style={{ display: 'flex', flexDirection: 'column', alignItem: 'start', justifyContent: 'end' }}
                    >
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
                ) : (
                    <div>
                        <br />
                        <br />
                        <br />
                        <br />
                    </div>
                )}
            </div>
            <div style={{ position: 'fixed', bottom: 0, width: '55%' }}>
                <form onSubmit={handleSendMessageInner} style={{ marginTop: '10px' }}>
                    <Grid container>
                        <Grid item xs={10}>
                            <textarea
                                style={{ width: '100%' }}
                                rows="4"
                                placeholder="Type a message"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            ></textarea>
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                disabled={!conversation.canChat}
                                style={{ color: '#FFF3E5', marginLeft: '10px', marginTop: '10px' }}
                            >
                                Send
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <br />
                {user.role === 'doctor' ? (
                    <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        disabled={!conversation.canChat}
                        onClick={handleEndConversation}
                        style={{ color: '#FFF3E5', width: '5%', marginLeft: '0px', marginTop: '-25px' }}
                    >
                        End
                    </Button>
                ) : (
                    <div />
                )}
            </div>
        </div>
    );
};

export default Chat;
