import Accordion from "@/components/containers/Accordion";
import { useState, useEffect, useRef } from "react";
import LabelInput from '@/components/forms/LabelInput';
import MessagesHandler from "./MessagesHandler";

export default function ColumnHandler({column, columnIndex, dayIndex, weekIndex, monthIndex, children, calendar, setCalendar, translate, columns}) {
    
    const [erase, setErase] = useState(column.erase)
    const [messages, setMessages] = useState(column.messages)
    const isMounted = useRef(false);

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
    

        const updateColumns = columns => columns.map((column, index)=>
        {
            if (columnIndex !== index) return column

            return {...column, messages, erase}
        })


        const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== monthIndex) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = week.days.map((day, index)=>{
                    if (dayIndex !== index) return day

                    const updatedColumns = updateColumns(day.columns);

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
            <>
            <LabelInput 
            labelText={translate('removeColumn')} 
            value={erase} 
            setValue={setErase} 
            inputType={'checkbox'} 
            inputClassName='w-4 !m-1 !w-fit !h-fit' 
            inputContainerClassName=' border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer'
            />
             <Accordion
            label={translate('weekMessages')}
            labelClassName={` rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer`}
            contentClassName={`rounded-sm mb-2`}
            >
            <MessagesHandler
            messages={messages}
            setMessages={setMessages}
            translate={translate}
            boundaryArray={columns}
            />
            </Accordion>
            {children}
            </>
        )
}
