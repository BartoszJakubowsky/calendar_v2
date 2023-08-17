import { useState, useEffect, useRef} from "react"
import {translateCalendarPage} from "@/locales/translate"
import Accordion from "@/components/containers/Accordion";
import LabelInput from '@/components/forms/LabelInput';
import MessagesHandler from "./MessagesHandler";

export default function DayHandler({day, dayIndex, weekIndex, monthIndex, children, calendar, setCalendar, date, translate, time}) {
 
    const [erase, setErase] = useState(day.erase)
    const [messages, setMessages] = useState(day.messages)
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
    

        const updateDays = (days) => days.map((day, index)=>{
            if (dayIndex !== index) return day

            return {...day, erase, messages}
        })

        const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== index) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = updateDays(week.days);
                
                return {...week, days: updatedDays};
            });
          
            return { ...month, weeks: updatedWeeks }; 
          });
    
        const updatedCalendar = {...calendar, months : updatedMonths};
    
        setCalendar(updatedCalendar);
        }

    return (
        <Accordion
        key={dayIndex}
        label={`${translateCalendarPage(day.name)}: ${date}`}
        labelClassName={` p-2 bg-accentMedium dark:bg-dark-accentMedium  w-full text-dark-baseColor border-b-2 `}
        contentClassName={` p-2  text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight  w-full text-dark-baseColor border-2 border-accentMedium dark:border-dark-accentMedium`}
        >
            <LabelInput 
            labelText={translate('removeDay')} 
            value={erase} 
            setValue={setErase} 
            inputType={'checkbox'} 
            inputClassName='w-4 !m-1 !w-fit !h-fit' 
            inputContainerClassName=' border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer'
            />
             <Accordion
            label={translate('dayMessages')}
            labelClassName={` rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer`}
            contentClassName={`rounded-sm mb-2`}
            initial={true}
            >
            <MessagesHandler
            messages={messages}
            setMessages={setMessages}
            translate={translate}
            maxMessages={1}
            />
            </Accordion>
            <Accordion
            label={translate('columnLabel')}
            accordionClassName={`${erase? 'cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ' : 'pointer-events-auto cursor-pointer'}`}
            labelClassName={` p-2 bg-accentMedium dark:bg-dark-accentMedium  w-full text-dark-baseColor border-b-2 `}
            contentClassName={` p-2  text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight  w-full text-dark-baseColor border-2 border-accentMedium dark:border-dark-accentMedium `}
            >
            {children}
            </Accordion>
        </Accordion>
    )
}
