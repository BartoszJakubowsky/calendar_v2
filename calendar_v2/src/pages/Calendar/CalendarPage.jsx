import AnimatedContainer from '@/components/containers/AnimatedContainer';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingMessage from '@/components/ui/LoadingMessage';
import {translateCalendarPage} from "@/locales/translate"
import {getCalendars} from '@/api/calendars/calendarsApi';
import { AnimatePresence } from 'framer-motion';
import MenuPage from '@/pages/menu/MenuPage';
import Carousel from '@/components/containers/Carousel';
import MonthTable from './MonthTable';
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
            <AnimatedContainer  className={'background flex justify-center items-center'} animation={'opacityVariant'}>
                <AnimatePresence mode='wait'>
                    {calendar?  
                    <>
                    <AnimatedContainer  className={'relative w-full h-full background'} animation={'opacityVariant'}>
                    <MenuPage/>
                        <h3 className='custom-text-accentStrong text-xl underline font-bold mt-3'>
                            {calendar.name}
                        </h3>
                        <Carousel 
                            // className={`bg-transparent`}
                            className={`bg-red-300 w-11/12 md:w-3/4 h-11/12  md:h-3/4  `}
                            containerClassName={'w-full h-full flex justify-center items-center'}
                            startPosition={0}
                            pages ={calendar.months.map((month, index)=> <MonthTable key={index} data={month}/>)}
                            swipeToIndex={swipe}
                            />
                    </AnimatedContainer>
                    </>
                    :
                    <LoadingMessage message={translateCalendarPage('loading')} theme={'accentStrong'} className=' self-center'/>
                    }
                </AnimatePresence>
            </AnimatedContainer>
    )
}
