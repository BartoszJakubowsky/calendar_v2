/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import FormButton from "./FormButton";
import {motion as m} from 'framer-motion';

export default function FormButtonMessage({checkErrors, handleButtonClick, message}) {

    const [index, setIndex] = useState(0);
    const [messageVisibility, setMessageVisibility] = useState(false);

    useEffect(()=>
    {
        setTimeout(() => {
            setMessageVisibility(true)
            setIndex(1.5)
        }, 1000);

        setTimeout(() => {
            setIndex(0)
        }, 4000);

        setTimeout(() => {
            setMessageVisibility(false)
        }, 6000);
    }, [message])


    const handleClick = () => 
    {
        if (checkErrors())
            return;
        setIndex(2.5);
    }   
    

    const messageText = 'message';
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
