import { createContext } from "react";
import {io} from 'socket.io-client'


const SocketContext=createContext();
export const SocketContextProvider=({Children})=>{
    const socket = io(import.meta.env.VITE_BANEND_SOCKET_URL)
    return (
        <SocketContext.Provider  value={{socket}}>
            {Children}
        </SocketContext.Provider>
    )

}

export default SocketContext