import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList.js';
import Chat from '../components/Chat.js';
import ChatContext from '../Contexts/chatContext';
import { useSocket } from './../Contexts/socketContext';
import { getCurrentUser } from './../Services/authService';

const RoadToChat = () => {
    const [currentConversation, setCurrentConversation] = useState(null);
    const handleConversation = (conversation) => {
        setCurrentConversation(conversation);
    };
    const socket = useSocket();
    const user = getCurrentUser();

    useEffect(() => {
        socket.current?.emit('addUser', user._id);
        socket.current?.on('getUsers', (users) => {
            // console.log(users);
        });
    }, []);

    const width = 32;
    return (
        <ChatContext.Provider value={{ currentConversation, handleConversation }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <UserList width={width} />
                <Chat width={100 - width} conversation={currentConversation} />
            </div>
        </ChatContext.Provider>
    );
};

export default RoadToChat;
