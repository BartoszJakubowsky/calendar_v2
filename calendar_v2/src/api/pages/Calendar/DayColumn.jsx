import { useEffect, useMemo, useState } from 'react';
import useSlots from '../../hooks/useSlots';
import DayColumnHeader from './DayColumnHeader';
import DaySlot from './DaySlot';
import CalendarColumnMessageSlot from './CalendarColumnMessageSlot';
import classNames from 'classnames';

export default function DayColumn({day, isActive, isBlank, timeArr, date, weekIndex, dayDate, calendar, heigh,  slotMessage, setSlotMessage,...rest}) 
{
    const {_id, name, slots, records, slotMessages} = calendar
    const {handleRecords} = useSlots();
    const calendarID = _id;

    



    //format dd.mm.yyyy
    const convertDate = (dayDate) =>
    {
        const data = dayDate
        const _day = data.getDate().toString().padStart(2, "0");
        const _month = (data.getMonth() + 1).toString().padStart(2, "0");
        const _year = data.getFullYear().toString();
        return `${_day}.${_month}.${_year}`;
    }

    const {removeAllSlots} = useSlots();
    
    useEffect(()=>
    {

        handleRecords(records);

        return ()=>
        {
            removeAllSlots();
        }
    },[])

    if (calendar.bannedDays.includes(day.toUpperCase()))
        return false;

    let _dayDate;

    if (dayDate)
        _dayDate = convertDate(dayDate);

    const filteredMessages = slotMessages.filter(message => message.dayDate === _dayDate);

    
    
    const daySlots = ()=>
    {   
        if (isBlank)
            return false;
            // return (
            //     <div className={`flex w-full h-full bg-red-200`}>
            //      </div>
            // )
        return (
            <>
            {timeArr.map((time, index) =>
            {   
                const slotMessage = filteredMessages.find(message => message.selectedTimes.includes(time));

                let showSlotMessage = false;
                if (slotMessage)
                {
                    const key = slotMessages.thisSlotMessage + time;
                    showSlotMessage =  <CalendarColumnMessageSlot key={key} slotMessage={slotMessage} time={time}/>

                }


                //cell day
                return (
                <div
                    key={index} 
                    className={`relative flex flex-row w-full h-full border-black`}>
                        {showSlotMessage}
                        {/* slots in cells / slots holder */}
                        {slots.map(slot =>
                        {   
                            let spaces = [];

                            // if (showSlotMessage)
                            // spaces.push(showSlotMessage)

                            for (let i = 0; i < slot.space; i++) 
                            {
                                const key = name + day+ slot.name + time + i;

                                const thisSlot = 
                                {
                                    calendar : name,
                                    date,
                                    weekIndex,
                                    day,
                                    time,
                                    slotName : slot.name,
                                    slotIndex : i,
                                    sign: '',
                                    calendarID,
                                    fullDate: _dayDate,
                                };
                                spaces.push(
                                   <DaySlot 
                                    key={key}
                                    dayDate={_dayDate}
                                    _thisSlot={thisSlot}
                                    />
                                )
                            }

                        //slot holder -> day
                        const slotHolderClassName = classNames(`relative flex flex-col w-full md:h-full order-${slot.order} overflow-hidden ${heigh.toString()}`)
                        return <div key={slot.name} className={slotHolderClassName}>
                                {spaces}
                                </div>
                           
                        })}
                </div>)
            })}
            </>

        )
    };

    return (
        //column
        <div className={`flex flex-col w-full h-fit md:h-full ${isBlank? ' ' : 'bg-zinc-100'}  border-l-[2px] border-black `}  key={day}>
            <DayColumnHeader dayDate={_dayDate} timeArr={timeArr} day={day} slots={slots} isBlank={isBlank}  slotMessage={slotMessage} setSlotMessage={setSlotMessage} calendar={calendar}/>
            {daySlots()}
        </div>
    )
}