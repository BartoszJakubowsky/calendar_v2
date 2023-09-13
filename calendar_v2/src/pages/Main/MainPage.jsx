import AnimatedContainer from '@/components/containers/AnimatedContainer';
import CalendarCard from './CalendarCard';
import LoadingMessage from '@/components/ui/LoadingMessage';
import MenuPage from '@/pages/menu/MenuPage';

import {translateMainPage} from '@/locales/translate';
import {getCalendars} from '@/api/calendars/calendarsApi';

import { AnimatePresence } from 'framer-motion';
import { useMemo, useState } from 'react';
import InfoModal from '@/components/ui/InfoModal';

export default function MainPage() {

const [calendars, setCalendars] = useState(false);

useMemo(()=>
{
   getCalendars().then(data => {
      setCalendars(data);
   });
}, [])


const calendarCards = useMemo(()=>
{
   if (!calendars)
      return

   if (calendars.length === 0)
      return <AnimatedContainer className={'relative'} animation={'ySwipeVariant'} transition={{duration:0.5, ease: 'easeOut'}}>
               <InfoModal 
                headerText={`😯`} 
                contentText={translateMainPage('noCalendars')}
               />
            </AnimatedContainer>
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
   <AnimatedContainer animation={'opacityVariant'} className=' flex items-start md:items-center justify-center background overflow-auto'>
   <MenuPage/>
      <AnimatePresence mode='wait'>  
         {calendarCards? 
            <div className=' mt-10 flex-wrap flex justify-center'>
               {calendarCards}
            </div>
            :
            <LoadingMessage message={translateMainPage('loading')} theme={'text-accentStrong dark:text-dark-accentStrong'} className=' self-center'/>}
      </AnimatePresence>
   </AnimatedContainer>
   </>
 )   
}
