import { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
import useAuthentication from '@/hooks/useAuthentication';

const SocketContext = createContext();


function SocketProvider({children}) 
{
 
    const {user} = useAuthentication();
    const [socket, setSocket] = useState(null);

    
    useEffect(()=> {
        if (!user)
            return

    const baseUrl = import.meta.env.VITE_BASE_URL;
    // const baseUrl = window.location.origin
    
    const newSocket = io.connect(baseUrl);
    setSocket(newSocket);

    return () => {

    }
    },[])
    
    if (!user)
    return (
        <SocketContext.Provider>
            {children}
        </SocketContext.Provider>
        );

    // const baseUrl = import.meta.env.VITE_BASE_URL;
    // const socket = io.connect(baseUrl);
    
    


    // socket.on("connected", (data) => 
    // {
    //     console.log('connected');
    // });

    // socket.on('sign', data => 
    // {   
    // })
    // socket.on('error', ()=>
    // {
    //     console.log('error');
    // });
    
    const updateRecord = (updatedRecord) =>
    {
        updatedRecord.socketId = socket.id;
        socket.emit('updateRecord', updatedRecord);
    }

    const setConservation = (calendarId, newConservationStatus) => {
        socket.emit('conservation', {calendarId, conservation: newConservationStatus, senderId: socket.id});
    }

    const compareSocketId = (sendedId) => {
        return sendedId === socket.id;
    }
    // websocket.then(websocket => websocket.socket.emit('conservation', {id: calendar._id, conservation: !calendar.conservation}));
    // setCalendar({...calendar, conservation: !calendar.conservation})

    const toProvide = 
    {
        updateRecord,
        socket,
        setConservation,
        compareSocketId
    };
    return (
        <SocketContext.Provider value={toProvide}>
            {children}
        </SocketContext.Provider>
        );
}

export {SocketProvider};
export default SocketContext;