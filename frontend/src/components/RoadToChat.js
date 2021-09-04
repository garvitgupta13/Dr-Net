import React, { useState } from 'react';
import UserList from './UserList.js';
import Chat from './Chat.js';
import ChatContext from './Contexts/chatContext';

const RoadToChat = () => {
    const [currentConversation, setCurrentConversation] = useState(null);
    const handleConversation = (conversation) => {
        setCurrentConversation(conversation);
    };
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
