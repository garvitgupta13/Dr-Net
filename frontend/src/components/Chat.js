import React, { useState, useCallback, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import ChatContext from '../Contexts/chatContext';
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
    },
});

const Chat = ({ width, conversation }) => {
    const classes = useStyle();
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [sender, setSender] = useState({});
    const socket = useRef();
    const user = getCurrentUser();
    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);

    useEffect(() => {
        socket.current = io('ws://localhost:5003');
    }, []);

    useEffect(() => {
        socket.current.emit('addUser', user._id);
        socket.current.on('getUsers', (users) => {
            console.log(users);
        });
    }, [user]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (text.trim()) {
            sendMessage(conversation._id, text)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setMessages([...messages, data]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setText('');
    };

    const handleEndConversation = () => {
        endConversation(conversation._id)
            .then(({ data, status }) => {
                if (status === 200) {
                    conversation.canChat = false;
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (conversation) {
            getMessages(conversation._id)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setMessages(data);
                        const msgSender =
                            conversation.patient._id === user._id ? conversation.doctor : conversation.patient;
                        setSender(msgSender);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [conversation]);

    if (!conversation) return null;
    if (!user) window.location = '/';

    return (
        <div className={classes.container} style={{ width: '100%' }}>
            {sender.name ? (
                <Card className={classes.main} elevation={0} key={1}>
                    <CardHeader
                        avatar={
                            <Avatar style={{ height: '45px', width: '45px' }}>{sender.name[0].toUpperCase()}</Avatar>
                        }
                        title={
                            <div>
                                <Typography gutterBottom variant="h6" component="h2" style={{ color: '#936B3D' }}>
                                    {sender.name}
                                </Typography>
                            </div>
                        }
                    />
                </Card>
            ) : (
                <div></div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: '1' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItem: 'start', justifyContent: 'end' }}>
                    {messages.map((message, index) => {
                        let senderRole = messages.senderId === conversation.patient._id ? 'patient' : 'doctor';
                        let lastMessage = messages.length - 1 === index;
                        let alignSelf = message.senderId === user._id ? 'flex-end' : '';
                        let color = message.senderId === user._id ? 'blue' : 'white';
                        let bgColor = message.senderId === user._id ? 'skyblue' : 'white';
                        let you = message.senderId === user._id ? 'You' : sender.name;

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
            <form onSubmit={handleSendMessage} style={{ marginTop: '10px' }}>
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
                    onClick={handleEndConversation}
                    style={{ color: '#FFF3E5', width: '5%', marginLeft: '10px', marginTop: '-60px' }}
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
