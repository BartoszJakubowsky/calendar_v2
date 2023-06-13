import AddCalendarMessageSettings from "./AddCalendarMessageSettings";
import {motion as m} from 'framer-motion';
import { useSprings, animated } from "react-spring";
import { useEffect, useState } from "react";

import MenageCalendarMessageSettings from "./MenageCalendarMessageSettings";
import { Socket } from "socket.io-client";

export default function CalendarMessageSettings({slotMessage, setSlotMessage, calendar}) 
{


    //messagestructure
    //{dayDate: '...', time: [...], }
    const [displayedFrom, setDisplayedFrom] = useState(0); 
    const [globalSlotMessage, setGlobalSlotMessage] = useState(false);
    const {timeArr, dayDate} = slotMessage;
    

    // if (timeArr && _dayDate)
    // {
    //     const allCalendarSlotsMessages = calendar.slotMessages;

    //     const slotMessagesForThisDay = allCalendarSlotsMessages.map((message, index)=>
    //     {
    //         if (message.dayDate === _dayDate)
    //         return message
    //     })
    //     setThisDayMessages(slotMessagesForThisDay);
    // }

    const handleSetSlotMessage = (slotMessage) =>
    {
        if (!slotMessage)
        {
            setGlobalSlotMessage(false);
        }
        else
        {
            setGlobalSlotMessage(slotMessage);
        }
            setDisplayedFrom(1)
    }


    const formToShow = [
    <MenageCalendarMessageSettings 
    timeArr={timeArr} 
    dayDate={dayDate} 
    closeModal={setSlotMessage} 
    handleSetSlotMessage={handleSetSlotMessage} 
    setDisplayedFrom={setDisplayedFrom} 
    calendar={calendar} />, 
    
    <AddCalendarMessageSettings 
    timeArr={timeArr} 
    dayDate={dayDate} 
    setDisplayedFrom={setDisplayedFrom} 
    calendar={calendar} 
    globalSlotMessage={globalSlotMessage} 
    setGlobalSlotMessage={setGlobalSlotMessage}
    displayedFrom={displayedFrom}
    />]

    const formCount = formToShow.length;

    const springs = useSprings(
        formCount,
        formToShow.map((form, index) => ({
        transform: `translateX(${(index - displayedFrom) * 100}%)`,
        position: "absolute",
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        zIndex: index === displayedFrom ? 1 : 0
        }))
    );


    if (!slotMessage)
    return false;

    return (
     <div className="bg-gray-900 bg-opacity-10 absolute w-full h-full z-[11]">
            <m.div className="bg-white md:w-96 w-5/6 h-[25em] mx-auto mt-24 md:mt-36 border-2 border-black relative flex flex-col z-20 overflow-hidden" initial={{y: '100%'}} animate={{y: "0%"}} transition={{type: 'spring', stiffness: 110, damping: 12}}>
            {springs.map((props, index) => (
                  <animated.div key={index} className=" w-full h-full" style={{ ...props }}>
                    {formToShow[index]}
                  </animated.div>
                ))}
            </m.div>
    </div>
        );


       
};
