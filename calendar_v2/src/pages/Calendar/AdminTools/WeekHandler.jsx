import { useEffect, useRef, useState } from "react";
import LabelInput from '@/components/forms/LabelInput';
import Accordion from "@/components/containers/Accordion";
import MessagesHandler from "./MessagesHandler";
import {translateCalendarPage} from "@/locales/translate"
import SelectOptions from '@/components/forms/SelectOptions';

export default function WeekHandler({week, weekIndex, monthIndex, children, calendar, setCalendar, translate, fixDate, days}) {

  const [erase, setErase] = useState(week.erase)
  const [messages, setMessages] = useState(week.messages)
  const [bannedDays, setBannedDays] = useState(week.bannedDays)
  const isMounted = useRef(false);

    const dayFrom= fixDate(week.days[0].date);
    const dayTo = week.days.length > 1? fixDate(week.days[week.days.length-1].date) : false;

    const dayFromTo = dayTo? dayFrom + " : " + dayTo : dayFrom; 
    useEffect(()=>
        {
            if(!isMounted.current)
            {
                isMounted.current = true;
                return;
            }

            handleCalendarUpdate();

    }, [erase, messages, bannedDays])
    
const handleCalendarUpdate = () => {
    

    const updateWeeks = (weeks) => weeks.map((week, index) => {

      if (weekIndex !== index) return week;

      return { ...week, messages, erase, bannedDays}; 
    })

    const updatedMonths = calendar.months.map((month, index) => {
        if (monthIndex !== index) return month;
      
        const updatedWeeks = updateWeeks(month.weeks);
        return { ...month, weeks: updatedWeeks}; 
      });

      const updatedCalendar = {...calendar, months : updatedMonths};

        setCalendar(updatedCalendar);
    }

const boundaryArrayForMessages = week.days.map(day => translateCalendarPage(day.name));
    
    return (
        <Accordion
        key={weekIndex}
        label={translate('weekLabel') + ' ' + dayFromTo}
        labelClassName={` p-2 bg-accentLight dark:bg-dark-accentLight  w-full text-dark-baseColor border-b-2 border-accentMedium dark:border-dark-accentMedium`}
        contentClassName={` p-2 text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium  w-full text-dark-baseColor border-2 border-accentLight dark:border-dark-accentLight`}
        >
            
            <LabelInput 
            labelText={translate('removeWeek')} 
            value={erase} 
            setValue={setErase} 
            inputType={'checkbox'} 
            inputClassName='w-4 !m-1 !w-fit !h-fit' 
            inputContainerClassName=' border-b-2 border-baseColor border-dark-baseColor dark:border-accentLight   flex flex-wrap  h-fit cursor-pointer'
            />
            <Accordion
            label={translate('weekBannedDays')}
            labelClassName={` rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer`}
            contentClassName={`rounded-sm`}
            initial={true}
            >
                <SelectOptions
                selectedOptions={bannedDays}
                setSelectedOptions={setBannedDays}
                optionsArr={days}
                translateOption={translateCalendarPage}
                />            
            </Accordion>
            <Accordion
            label={translate('weekMessages')}
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
            key={weekIndex}
            label={translate('daysLabel')}
            initial={true}
            accordionClassName={` text-dark-baseColor bg-accentLight dark:text-baseColor dark:bg-dark-accentLight w-full  ${erase? 'cursor-none pointer-events-none [&>*]:!text-red-300 [&>*]:line-through text-ellipsis ' : 'pointer-events-auto cursor-pointer'}`}
            contentClassName={`rounded-sm text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium border-2 border-accentLight dark:border-dark-accentLight`}
            >
                {children}
            </Accordion>
        </Accordion>
    )   
}
