import { useEffect, useRef, useState } from "react"
import Accordion from '@/components/containers/Accordion';
import {translateCalendarPage} from "@/locales/translate"
import LabelInput from '@/components/forms/LabelInput';
import MessagesHandler from './MessagesHandler';

export default function MonthHandler({month, monthIndex ,translate, children, calendar, setCalendar}) {
    const isMounted = useRef(false);
    const [erase, setErase] = useState(month.erase || false);
    const [messages, setMessages] = useState(month.messages);

    useEffect(()=>{

    },[])
    useEffect(()=>
    {
        if(!isMounted.current)
        {
            isMounted.current = true;
            return;
        }

        handleCalendarUpdate();

    }, [erase, messages])
    const handleCalendarUpdate = () =>
    {

        const updatedMonths = calendar.months.map((month, index) =>
        {
            if (index === monthIndex)
            {
                return {...month, erase, ...messages}
            }
            else
                return month;
        })
       const updatedCalendar = {
        ...calendar,
        months : updatedMonths
       }
       setCalendar(updatedCalendar)
    }
    return (    
        <Accordion
        label={translateCalendarPage(month.name.split('.')[1].toLowerCase())}
        labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2 text-lg underline cursor-pointer w-full`}
        contentClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-4 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
        initial={true}
        >
            <LabelInput 
            labelText={translate('removeMonth')} 
            value={erase} 
            setValue={setErase} 
            inputType={'checkbox'} 
            inputClassName='w-4 !m-1 !w-fit !h-fit' 
            inputContainerClassName=' border-b-2 border-accentLight  flex flex-wrap  h-fit cursor-pointer'
            />
            <Accordion
            label={translate('monthMessages')}
            labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer`}
            contentClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm`}
            initial={true}
            >
                <MessagesHandler
                messages={messages}
                setMessages={setMessages}
                maxMessages={2}
                boundaryArray={['10', '11', '12']}
                translate={translate}
                />
            </Accordion>
            
            <Accordion
            label={translate('weeksLabel')}
            accordionClassName={`w-full  mt-1  ${erase? 'cursor-none pointer-events-none [&>*]:text-red-300 [&>*]:line-through text-ellipsis ' : 'pointer-events-auto cursor-pointer'}`}
            contentClassName={`p-2 rounded-sm text-dark-baseColor bg-accentMedium dark:text-baseColor dark:bg-dark-accentMedium`}
            >
                {children}
            </Accordion>
            
        </Accordion>
    )
}
