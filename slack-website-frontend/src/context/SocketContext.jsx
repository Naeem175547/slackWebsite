import { createContext, useCallback, useEffect, useState } from "react";
import {io} from 'socket.io-client'
import { useAuth } from "@/hooks/context/useAuth";


const SocketContext=createContext();
export const SocketContextProvider=({children})=>{
    const { auth } = useAuth();
    const [socket, setSocket] = useState(null);
    const [currentChannel,setCurrentChannel]=useState(null)

    // Create the socket once per login token, and close it on logout/unmount
    useEffect(() => {
        if (!auth?.token) return;
        const newSocket = io(import.meta.env.VITE_BACKEND_SOCKET_URL, {
            auth: { token: auth.token },
        });
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
            setSocket(null);
        };
    }, [auth?.token]);

    const joinChannel = useCallback((channelId) => {
        if (!socket) return;
        const id = Number(channelId);
        socket.emit('JoinChannel', { channelId: id }, (data) => {
            console.log('Successfully joined the channel', data);
            setCurrentChannel(id);
        });
    }, [socket]);

    return (
        <SocketContext.Provider  value={{socket,joinChannel,currentChannel}}>
            {children}
        </SocketContext.Provider>
    )

}

export default SocketContext
