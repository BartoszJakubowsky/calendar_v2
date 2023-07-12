import AnimatedContainer from '@/components/containers/AnimatedContainer';
import CalendarCard from './CalendarCard';
import LoadingMessage from '@/components/ui/LoadingMessage';
import MenuPage from '@/pages/menu/MenuPage';

import {translateMainPage} from '@/locales/translate';
import {getCalendars} from '@/api/calendars/calendarsApi';

import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';

export default function MainPage() {

const [calendars, setCalendars] = useState(false);

useMemo(()=>
{

   getCalendars().then(data => setTimeout(() => {
      setCalendars(data);
   }, 1000));
}, [])


const calendarCards = useMemo(()=>
{
   if (!calendars)
      return;
   return calendars.map((calendar, index) => 
      {

         const delay = index-0.9*index;
         return (
            <AnimatedContainer key={calendar.name} className={'relative'} animation={'ySwipeVariant'} transition={{duration:0.5, ease: 'easeOut', delay: delay}}>
               <CalendarCard  calendar={calendar}/>   
            </AnimatedContainer>
         )
         
      })
}, [calendars])


 return(
   <>
   <AnimatedContainer animation={'opacityVariant'} className='flex items-start md:items-center justify-center background overflow-auto'>
   <MenuPage/>
      <AnimatePresence mode='wait'> 
         {calendarCards? 
            <div className=' mt-10 flex-wrap flex justify-center'>
               {calendarCards}
            </div>
            :
            <LoadingMessage message={translateMainPage('loading')} theme={'accentStrong dark:text-dark-accentStrong'} className=' self-center'/>}
      </AnimatePresence>
   </AnimatedContainer>
   </>
 )   
}
