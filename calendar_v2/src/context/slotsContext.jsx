import { createContext} from "react";
import io from "socket.io-client";

import useAuthentication from "../hooks/useAuthentication";

const SlotsContext = createContext();

// eslint-disable-next-line react/prop-types
function SlotsProvider({children}) 
{
    const {user} = useAuthentication();
    
    
    if (!user)
    return (
        <SlotsContext.Provider value={null}>
            {children}
        </SlotsContext.Provider>
    )

    
    const baseUrl = import.meta.env.BASE_URL;
    const socket = io.connect(baseUrl? baseUrl : window.location.origin);

    socket.on('sign', data => 
    {   
        if(data.id === socket.id)
            return;
        
        
        updateSlot(data.message);
    })

    const emitMessage = message =>
    {
        console.log('emit');
        socket.emit('message', {message, id: socket.id});
    }

    let slotsArray = [];
    const updateSlotsArray = newSlots =>
    {
        slotsArray.push(...newSlots);
    }

    const removeAllSlots = () =>
    {
        if (slotsArray.length!==0)
        {
            slotsArray = [];
        }
        
    }
 
    const updateSlot = (newSlot) =>
    {   
            for (let i = 0; i < slotsArray.length; i++) 
            {
            const oldSlot = slotsArray[i];
            if(newSlot.calendar === oldSlot.calendar)
            if(newSlot.date === oldSlot.date)
            if(newSlot.weekIndex === oldSlot.weekIndex)
            if(newSlot.day === oldSlot.day)
            if(newSlot.time === oldSlot.time)
            if(newSlot.slotName === oldSlot.slotName) 
            if(newSlot.slotIndex === oldSlot.slotIndex) 
            {
                oldSlot.name = newSlot.name;
                oldSlot.handleSign(newSlot);
                return;
            }
        }
    }

    const handleRecords = (records) =>
    {
        for (let i = 0; i < records.length; i++) 
        {
            const slot = records[i];
            updateSlot(slot);
        }
    }

    const toProvide = 
    {slotsArray, updateSlot ,updateSlotsArray, removeAllSlots, emitMessage, handleRecords};
    return (
        <SlotsContext.Provider value={toProvide}>
            {children}
        </SlotsContext.Provider>
        );
}

export {SlotsProvider};
export default SlotsContext;

