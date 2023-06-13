import Time from './Time';
import Slots from './Slots';
import AddSlot from './AddSlot';

import { useState, useEffect } from 'react';




export default function AdditionalSettings({calendarTime, calendarSlots, onChange, slotCard, timeCard, ...rest}) 
{

    const [time, setTime] = useState(calendarTime || false);
    const [slots, setSlots] = useState(calendarSlots || []);

    const sendAdditional = useEffect(()=>
    {
        onChange({time, slots});
    }, [time, slots]);


    const handleSlotChange = slot =>
    {

        // new slot
        //slot
        if (!Array.isArray(slot))
        {
            const newSlots = [...slots, slot];
            setSlots(newSlots);
        }
        //update slot or delete slot
        else
        {
            const oldSlot = slot[0];
            const newSlot = slot[1];

            const oldSlotIndex = slots.indexOf(oldSlot);
            //delete slot
            //slot, false
            if (!newSlot)
            {
                const newSlots = slots.filter((oldSlot, index) =>
                {
                    return index !== oldSlotIndex
                })
                
                    setSlots(newSlots);
            }
            //update slot
            //slot, slot
            else
            {
                const newSlots = slots.map((oldSlot, index)=>
                {
                    if (index === oldSlotIndex)
                        return {...oldSlot, name:newSlot.name, space: newSlot.space, order:newSlot.order}
                    else
                        return oldSlot
                })
                setSlots(newSlots)
            }

        }
    }

    const handleTimeChange = calendarTime => 
    {
        setTime(calendarTime);
    }



    return (
        <div className={`flex  text-cyan-900 cursor-pointer text-lg ease-out ${rest.className}`}>
            <Time value={time} onChange={handleTimeChange} timeCard={timeCard}/>
            <AddSlot slotCard={slotCard} onChange={handleSlotChange} slots={slots} />
            <Slots slots={slots} slotCard={slotCard} onChange={handleSlotChange}/>
        </div>
    )
}
