import React, { useState, useEffect, useCallback, useContext } from 'react';
import Container from '@material-ui/core/Container';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import { getConversations } from './../Services/chatService';
import { getCurrentUser } from './../Services/authService';
import ChatContext from './Contexts/chatContext';

const drawerWidth = 220;
const useStyle = makeStyles({
    container: {
        float: 'left',
        marginLeft: '220px',
        marginTop: '67px',
        padding: '6px',
        width: '50%',
        height: '88vh',
        overflow: 'auto',
        ['@media (max-width:660px)']: {
            marginLeft: '0px',
        },
    },
});

const UserList = () => {
    const classes = useStyle();
    const [text, setText] = useState('');
    const [conversations, setConversations] = useState([]);
    const chatContext = useContext(ChatContext);
    const token = localStorage.getItem('token');
    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);

    const user = getCurrentUser();

    useEffect(() => {
        getConversations()
            .then(({ data, status }) => {
                setConversations(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (conversations.length === 0) {
        return (
            <div className={classes.container} item xs={12} sm={6}>
                <Typography gutterBottom variant="h5" style={{ color: '#936B3D', marginLeft: '15%' }}>
                    Chats
                </Typography>
                <Typography gutterBottom variant="h6" component="h2" style={{ color: '#936B3D', fontSize: '15px' }}>
                    {user.role === 'patient' ? 'Please book a appointment to start conversation' : 'No patients yet'}{' '}
                </Typography>
            </div>
        );
    }

    return (
        <div className={classes.container} item xs={12} sm={6}>
            <Typography gutterBottom variant="h5" style={{ color: '#936B3D', marginLeft: '15%' }}>
                Chats
            </Typography>

            {conversations.map((conversation) => (
                <Card
                    className={classes.main}
                    elevation={0}
                    key={conversation._id}
                    onClick={() => {
                        chatContext.handleConversation(conversation);
                    }}
                >
                    <CardHeader
                        avatar={
                            <Avatar style={{ height: '30px', width: '30px' }}>
                                {conversation.doctor._id === user._id
                                    ? conversation.patient.name[0].toUpperCase()
                                    : conversation.doctor.name[0].toUpperCase()}
                            </Avatar>
                        }
                        title={
                            <div>
                                <Typography
                                    gutterBottom
                                    variant="h6"
                                    component="h2"
                                    style={{ color: '#936B3D', fontSize: '15px' }}
                                >
                                    {conversation.doctor._id === user._id
                                        ? conversation.patient.name
                                        : conversation.doctor.name}
                                </Typography>
                            </div>
                        }
                    />
                </Card>
            ))}
        </div>
    );
};

export default UserList;
