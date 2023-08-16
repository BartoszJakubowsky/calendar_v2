import Accordion from "@/components/containers/Accordion";
import { useState, useEffect, useRef } from "react";
import LabelInput from '@/components/forms/LabelInput';
import MessagesHandler from "./MessagesHandler";

export default function RecordHandler({record,recordIndex ,slotIndex, columnIndex, dayIndex, weekIndex, monthIndex, calendar, setCalendar, translate}) {
    
    const [erase, setErase] = useState(record.erase)
    const [messages, setMessages] = useState(record.messages)
    const [data, setData] = useState(record.data);
    const isMounted = useRef(false);
    console.log(record);
    useEffect(()=>
    {
        if(!isMounted.current)
        {
            isMounted.current = true;
            return;
        }

        handleCalendarUpdate();

}, [erase, messages])


    const handleCalendarUpdate = () => {
    
        const updateRecords = (records) => records.map((record, index)=> {
            if (recordIndex !== index) return record;

            return {...record, messages, erase}
        });

          const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== index) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = week.days.map((day, index)=>{
                    if (dayIndex !== index) return day

                    const updatedColumns = day.columns.map((column, index)=>
                    {
                        if (columnIndex !== index) return column

                            const updatedSlots = column.slots.map((slot, index)=>
                            {
                                if (slotIndex !== index) return slot;
                                const updatedRecords = updateRecords(slot.records);

                                return {...slot, records: updatedRecords}
                            })

                        return {...column, slots: updatedSlots}
                    })

                    return {...day, columns : updatedColumns}
                })
                
                return {...week, days: updatedDays};
            });
          
            return { ...month, weeks: updatedWeeks }; 
          });
    
        const updatedCalendar = {...calendar, months : updatedMonths};
    
        setCalendar(updatedCalendar);
        }

        return (
            <div className="dark:text-baseColor rounded-sm border-accentMedium dark:border-dark-accentMedium border-2 m-2 p-2">
             <LabelInput 
            labelText={translate('userRecord')} 
            value={data} 
            setValue={setData} 
            inputType={'text'} 
            inputClassName='w-4 !m-1 !w-full !h-fit' 
            inputContainerClassName=' border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer'
            />
            <LabelInput 
            labelText={translate('removeRecord')} 
            value={erase} 
            setValue={setErase} 
            inputType={'checkbox'} 
            inputClassName='w-4 !m-1 !w-fit !h-fit' 
            inputContainerClassName=' border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer'
            />
             <Accordion
            label={translate('recordMessage')}
            labelClassName={` rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer`}
            contentClassName={`rounded-sm mb-2`}
            initial={true}
            >
            <MessagesHandler
            messages={messages}
            setMessages={setMessages}
            maxMessages={1}
            translate={translate}
            />
            </Accordion>
            </div>
        )

}
