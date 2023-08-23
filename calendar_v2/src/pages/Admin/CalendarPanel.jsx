import AnimatedContainer from '@/components/containers/AnimatedContainer';
import Accordion from '@/components/containers/Accordion'
import {translateAdminPage} from '@/locales/translate'
import AccordionContent from './AccordionContent';
import {useState} from 'react'
import {  deleteCalendar } from '@/api/admin/adminApi';

export default function CalendarPanel({calendars, transformDate, deleteCalendarFromCalendars}) {
    
    return (
        <>
        <AnimatedContainer className={'w-full h-full relative'} animation={'ySwipeVariant'}>
            {calendars.length == 0?
            <h1 className='text-accentStrong dark:text-dark-accentStrong text-lg text-center'>
                {translateAdminPage('noCalendars')}
            </h1>
            :
            calendars.map(calendar=> {
                return (
                    <Accordion
                    key={calendar._id}
                    label={calendar.name}
                    labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2  cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium`}
                    contentClassName={`bg-accentLight border-accentMedium dark:bg-dark-accentLight rounded-b-sm p-1 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
                    >
                       <PanelForCalendar 
                        calendar={calendar} 
                        transformDate={transformDate} 
                        deleteCalendarFromCalendars={deleteCalendarFromCalendars}
                       />
                    </Accordion>
                )
            })}
        </AnimatedContainer>
        </>
  )
}

function PanelForCalendar ({calendar, transformDate, deleteCalendarFromCalendars }) {
  const [fetchData, setFetchData] = useState(false);
  const [result, setResult] = useState(null);
  const [textOnTrue, setTextOnTrue] = useState('registerAddTrue')
  const [textOnFalse, setTextOnFalse] = useState('registerAddFalse');

  const handleResponse = (res) => {


     setTimeout(() => {
        setResult(res)
    }, 500);

    setTimeout(() => {
      setFetchData(false)
      setResult(null)

        if (res)
         deleteCalendarFromCalendars(calendar)
    }, 1500);
  }
  

  
  const handleDeleteClick = () => {

    setTextOnTrue('calendarDeleteTrue')
    setTextOnFalse('calendarDeleteFalse')

    setFetchData(true)
    handleResponse(true)
    deleteCalendar(calendar).then(res => handleResponse(res.data))
  }

  return (
    <AccordionContent
    buttonDeleteText={translateAdminPage('deleteCalendar')}
    buttonDeleteOnClick={handleDeleteClick}
    fetchData={fetchData}
    result={result}
    textOnTrue={translateAdminPage(textOnTrue)}
    textOnFalse={translateAdminPage(textOnFalse)}
    loadingMessage={translateAdminPage('loading')}
    >
        <div className='p-2'>
            <h3 className='text-accentStrong dark:text-baseColor font-semibold'>{translateAdminPage('calendarDesc')}</h3>
               <p className='w-full mb-1 ml-1'>{calendar.description}</p>
            <h3 className='text-accentStrong dark:text-baseColor font-semibold'>{translateAdminPage('calendarMonths')}</h3>
                {calendar.months.map(month => {
                    const [year, monthName] = month.name.split('.');
                    return <p key={month._id} className='w-full ml-1 '>{`${translateAdminPage(monthName.toLowerCase())}  ${year}`}</p>
                })}
        </div>
    </AccordionContent>
  )
}
