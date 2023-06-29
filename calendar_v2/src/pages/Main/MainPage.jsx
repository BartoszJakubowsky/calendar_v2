import AnimatedContainer from '@/components/containers/AnimatedContainer';
import Background from '@/components/ui/Background';
import CalendarCard from './CalendarCard';
import LoadingMessage from '@/components/ui/LoadingMessage';

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
   return calendars.map(calendar => 
      {

         return (
            <AnimatedContainer key={calendar.name} className={'relative'} animation={'ySwipeVariant'} >
               <CalendarCard  calendar={calendar}/>   
            </AnimatedContainer>
         )
         
      })
}, [calendars])


const showCalendarCards = () => {
   

   setTimeout(() => {
   }, 3000);

   return 'siema';

}


console.log(showCalendarCards());


 return(
    <Background>
      <AnimatedContainer animation={'opacityVariant'} className='flex justify-center items-center flex-wrap'>
      <AnimatePresence mode='wait' > {calendarCards? calendarCards :<LoadingMessage message={translateMainPage('loading')} theme={'accentStrong'}/>}</AnimatePresence>
      </AnimatedContainer>
    </Background>
 )   
}
