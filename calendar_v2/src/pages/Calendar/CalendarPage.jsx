import AnimatedContainer from '@/components/containers/AnimatedContainer';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoadingMessage from '@/components/ui/LoadingMessage';
import {translateCalendarPage} from "@/locales/translate"
import {getCalendars} from '@/api/calendars/calendarsApi';
import { AnimatePresence } from 'framer-motion';
export default function CalendarPage() {

    const location = useLocation();
    const navigate = useNavigate();
    
    const searchedCalendarName = location.pathname.split('/').pop()

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
            <AnimatedContainer  className={'background flex justify-center'} animation={'opacityVariant'}>
                <AnimatePresence mode='wait'>
                    {calendar?  
                    <AnimatedContainer  className={'relative flex w-fit h-fit'} animation={'opacityVariant'}>
                        <div>
                            siema
                        </div>
                    </AnimatedContainer>
                    :
                    <LoadingMessage message={translateCalendarPage('loading')} theme={'accentStrong'} className=' self-center'/>
                    }
                </AnimatePresence>
            </AnimatedContainer>
    )
}
