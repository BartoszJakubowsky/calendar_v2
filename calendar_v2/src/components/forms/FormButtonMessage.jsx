/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FormButton from "./FormButton";
import {motion as m} from 'framer-motion';

export default function FormButtonMessage({messageText, setMessageText, checkError}) {

    const [index, setIndex] = useState(0);
    const [messageVisibility, setMessageVisibility] = useState(false);
    
    useEffect(()=>
    {
        if (!messageText)
            return;

        setTimeout(() => {
            setMessageVisibility(true)
            setIndex(1.5)
        }, 1500);

        setTimeout(() => {
            setIndex(0)
        }, 4000);

        setTimeout(() => {
            setMessageText(false);
            setMessageVisibility(false)
        }, 5300);
    }, [messageText])


    const handleClick = () => 
    {
        if (messageVisibility || checkError())
            return;

        setIndex(2.5);
    }   
    

    return (
        <div className={`overflow-hidden h-20 dark:bg-slate-200 `}>

            <m.div animate={{y: `-${index * 25}%`}} transition={ messageVisibility? {duration: 0.7, ease: 'easeOut'} :{duration: 0.7, ease: 'easeOut'}}>
                <FormButton onClick={handleClick} text='click'/>
                <div className={`w-full px-4 pt-2 tracking-wide text-center rounded-md ${messageVisibility? 'visible' : 'invisible'}`}>{messageText}</div>
                <div className={'w-full px-4 py-2 my-10 tracking-wide text-center flex justify-center flex-col'}>Jakaś ikona</div>
            </m.div>

        </div>
    )
}
