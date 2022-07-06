import React, { useState, useEffect, useCallback, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import { getConversations } from './../Services/chatService';
import { getCurrentUser } from './../Services/authService';
import ChatContext from '../Contexts/chatContext';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

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
    const setRef = useCallback((node) => {
        if (node) node.scrollIntoView({ smooth: true });
    }, []);

    const user = getCurrentUser();

    const isOnline = (userId) => {
        return chatContext.onlineUsers.find((user) => user.userId === userId);
    };

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

            {conversations.map((conversation) => {
                const receiver = conversation.doctor._id === user._id ? conversation.patient : conversation.doctor;
                return (
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
                                isOnline(receiver._id) ? (
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right',
                                        }}
                                        variant="dot"
                                    >
                                        <Avatar style={{ height: '30px', width: '30px' }}>
                                            {receiver.name[0].toUpperCase()}
                                        </Avatar>
                                    </StyledBadge>
                                ) : (
                                    <Avatar style={{ height: '30px', width: '30px' }}>
                                        {receiver.name[0].toUpperCase()}
                                    </Avatar>
                                )
                            }
                            title={
                                <div style={{ position: 'relative' }}>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                        style={{ color: '#936B3D', fontSize: '15px' }}
                                    >
                                        {receiver.name}
                                    </Typography>
                                </div>
                            }
                        />
                    </Card>
                );
            })}
        </div>
    );
};

export default UserList;
