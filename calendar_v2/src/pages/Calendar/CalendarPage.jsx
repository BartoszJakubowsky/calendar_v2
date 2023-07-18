import AnimatedContainer from '@/components/containers/AnimatedContainer';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingMessage from '@/components/ui/LoadingMessage';
import {translateCalendarPage} from "@/locales/translate"
import {getCalendars} from '@/api/calendars/calendarsApi';
import { AnimatePresence } from 'framer-motion';
import MenuPage from '@/pages/menu/MenuPage';
import Carousel from '@/components/containers/Carousel';
import Month from './Month';
import io from 'socket.io-client';
export default function CalendarPage() {

    const location = useLocation();
    const navigate = useNavigate();


 

    const searchedCalendarName = location.pathname.split('/').pop()
    const [swipe, setSwipe] = useState(0);
    const compareLocationToCalendar = (calendars) => {
        const trim = (text) => {
          return JSON.parse(JSON.stringify(text.replaceAll(' ', '_').normalize("NFD").replace(/[\u0300-\u036f]/g, "")))
        }
      
        for (let i = 0; i < calendars.length; i++) {
          if (trim(calendars[i].name) === trim(searchedCalendarName)) 
            return calendars[i];
        }
        return false;
      }
      

const verifyCalendarExist = useMemo(()=>
    {

        const passedCalendars = location.state;
        if (passedCalendars)
        {
            const checkedCalendar = compareLocationToCalendar([passedCalendars]);
            if(!checkedCalendar)
                return false;
            else 
                return checkedCalendar
        }
        else
            return false;
    },[]);

    const [calendar, setCalendar] = useState(verifyCalendarExist);
    
    const websocket = useMemo(()=>
    {
        if (!calendar)
            return;

        return WebsocketProvider(calendar);
    },[calendar])

    useEffect(()=>
    {
        if (calendar)
            return;

        getCalendars().then(calendars => 
            {
                const checkedCalendar = compareLocationToCalendar(calendars);
                if (checkedCalendar)
                {
                    setTimeout(() => {
                        setCalendar(checkedCalendar)
                    }, 1000);
                    return
                }
                else
                setTimeout(() => {
                    navigate('/brak_strony', {state: location.pathname})
                }, 500);
            })
        
    },[])

    


    return (
        <AnimatedContainer  key='main' className={'background flex justify-center items-start overflow-auto'} animation={'opacityVariant'}>
                <AnimatePresence mode='wait'>
                    <MenuPage/>
                    {calendar?  
                    <>
                    <AnimatedContainer key='children' className={'relative w-full h-full flex justify-center flex-wrap'} animation={'opacityVariant'}>
                        <h3 className='custom-text-accentStrong text-center text-xl w-full underline font-bold md:pt-4 pt-4 '>
                            {calendar.name}
                        </h3>
                        <Carousel 
                            className={`w-11/12 md:w-3/4 h-5/6 md:h-3/4 md:-mt-28 -mt-4 rounded-sm`}
                            containerClassName={'w-full h-full bg-accentMedium dark:bg-dark-accentMedium'}
                            startPosition={0}
                            pages ={calendar.months.map((month, index)=> <Month key={index} month={month} websocket={websocket}/>)}
                            swipeToIndex={swipe}
                            />
                    </AnimatedContainer>
                    </>
                    :
                    <LoadingMessage message={translateCalendarPage('loading')} theme={'text-accentStrong dark:text-dark-accentStrong '} className=' self-center'/>
                    }
            </AnimatePresence>
            </AnimatedContainer>
    )
}


async function WebsocketProvider(calendar)
{
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const socket = io.connect(baseUrl);

    socket.on("connected", (data) => 
    {
        console.log('connected');
    });

    socket.on('sign', data => 
    {   
        console.log('signed', data.data);
    })
    socket.on('error', ()=>
    {
        console.log('error');
    });

    const emitMessage = updatedRecord =>
    {
        updatedRecord.calendarID = calendar._id;
        updatedRecord.socketID = socket.id;
        socket.emit('updateRecord', updatedRecord);
    }

    return (
        {emitMessage}
        );
}
