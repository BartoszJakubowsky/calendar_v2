import { useEffect, useRef, useState } from "react"
import Accordion from '@/components/containers/Accordion';
import LabelInput from '@/components/forms/LabelInput';
import MessagesHandler from './MessagesHandler';

export default function MainSettingsHandler({translate, calendar, setCalendar}) {
    const isMounted = useRef(false);
    const [messages, setMessages] = useState(calendar.messages);
    const [name, setName] = useState(calendar.name);
    const [description, setDescription] = useState(calendar.description);
    
    useEffect(()=>
    {
        if(!isMounted.current)
        {
            isMounted.current = true;
            return;
        }

        handleCalendarUpdate();

    }, [messages])
    const handleCalendarUpdate = () =>
    {
       setCalendar({...calendar, messages, name, description})
    }
    return (    
        <Accordion
        label={translate('mainSettings')}
        labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2 text-lg underline cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium`}
        contentClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-4 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
        >
            <LabelInput 
            labelText={translate('nameLabel')} 
            value={name} 
            setValue={setName} 
            inputType={'text'} 
            />
            <LabelInput 
            labelText={translate('descriptionLabel')} 
            value={description} 
            setValue={setDescription} 
            inputType={'textarea'} 
            inputContainerClassName='mt-2'
            />
            <Accordion
            label={translate('messagesLabel')}
            labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm mt-1 dark:text-baseColor font-medium cursor-pointer`}
            contentClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm`}
            initial={true}
            >
                <MessagesHandler
                messages={messages}
                setMessages={setMessages}
                translate={translate}
                inputContainerClassName='w-full h-full relative min-w-[full]'
                inputClassName='h-full'
                />
            </Accordion>
        </Accordion>
    )
}
