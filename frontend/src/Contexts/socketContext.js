import React, { useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = React.createContext();

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({ children }) {
    const socket = useRef();

    useEffect(() => {
        socket.current = io('http://localhost:5003');
    }, []);

    return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
}
