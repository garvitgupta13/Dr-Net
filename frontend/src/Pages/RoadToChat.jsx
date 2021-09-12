import React, { useState, useEffect,useRef } from 'react';
import UserList from '../components/UserList.js';
import Chat from '../components/Chat.js';
import ChatContext from '../Contexts/chatContext';
import { useSocket } from './../Contexts/socketContext';
import { getCurrentUser } from './../Services/authService';
import io from 'socket.io-client';


const RoadToChat = () => {

    const socket = useRef();
    const [currentConversation, setCurrentConversation] = useState(null);
    const handleConversation = (conversation) => {
        setCurrentConversation(conversation);
    };

    const user = getCurrentUser();
    console.log('current user is' + user);

    //console.log('socket is '+socket.current);
    const [onlineUsers, SetOnlineUsers] = useState([]);

    useEffect(() => {
        socket.current = io('http://localhost:5003');
        socket.current.emit('addUser', user._id);
        console.log('requesting to add user with id '+ user._id);
        socket.current.on('getUsers', (users) => {
            console.log('getting user '+users);
            SetOnlineUsers(users);
        });
    }, []);

    const width = 32;
    return (
        <ChatContext.Provider value={{ currentConversation, handleConversation, onlineUsers }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <UserList width={width} />
                <Chat width={100 - width} conversation={currentConversation} />
            </div>
        </ChatContext.Provider>
    );
};

export default RoadToChat;
