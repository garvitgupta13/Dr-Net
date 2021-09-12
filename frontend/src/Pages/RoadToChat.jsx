import React, { useState, useEffect,useRef } from 'react';
import UserList from '../components/UserList.js';
import Chat from '../components/Chat.js';
import ChatContext from '../Contexts/chatContext';
import { useSocket } from './../Contexts/socketContext';
import { getCurrentUser } from './../Services/authService';
import { endConversation, getMessages, sendMessage } from '../Services/chatService';
import io from 'socket.io-client';


const RoadToChat = () => {

    const socket = useRef();
    const [conversation, setCurrentConversation] = useState(null);

    const handleConversation = (conversation) => {
        setCurrentConversation(conversation);
    };

    const user = getCurrentUser();
    console.log('current user is' + user);

    //console.log('socket is '+socket.current);
    const [onlineUsers, SetOnlineUsers] = useState([]);
    //
    const [messages, setMessages] = useState([]);
    const [receiver, setReceiver] = useState({});
    const [receivedMessage, setReceivedMessage] = useState({});

    useEffect(() => {
        socket.current = io('http://localhost:5003');
        socket.current?.on('getMessage', (data) => {
           console.log('received message ',data);
            setReceivedMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    },[]);


    useEffect(() => {
        console.log('receive messages inside useEffect ',receivedMessage);
        receivedMessage && setMessages([...messages, receivedMessage]);
    }, [receivedMessage]);

    const handleSendMessage = ( text ) => {
      console.log('message to send ',text);
        if (text.trim()) {
            sendMessage(conversation._id, text)
                .then(({ data, status }) => {
                    if (status === 200) {
                        setMessages([...messages, data]);
                        console.log('sending message to ',receiver._id);
                        socket.current.emit('sendMessage', {
                            senderId: user._id,
                            receiverId: receiver._id,
                            text,
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
                        const msgReceiver =
                            conversation.patient._id === user._id ? conversation.doctor : conversation.patient;
                        setReceiver(msgReceiver);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [conversation]);


    useEffect(() => {
        socket.current.emit('addUser', user._id);
        console.log('requesting to add user with id '+ user._id);
        socket.current.on('getUsers', (users) => {
            console.log('getting user '+users);
            SetOnlineUsers(users);
        });
    }, [user]);

    const width = 32;
    return (
        <ChatContext.Provider value={{ conversation, handleConversation, onlineUsers }}>
            <div style={{ display: 'flex', height: '100%' }}>
                <UserList width={width} />
                <Chat
                width={100 - width}
                conversation={conversation}
                receiver = {receiver}
                messages = {messages}
                handleSendMessage = {handleSendMessage}
                receivedMessage = {receivedMessage}
                handleEndConversation = {handleEndConversation}
                />
            </div>
        </ChatContext.Provider>
    );
};

export default RoadToChat;
