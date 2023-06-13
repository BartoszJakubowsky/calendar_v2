import useCalendars from "../../hooks/useCalendars"
import { useState } from "react";
import {motion as m} from 'framer-motion';
import axios from 'axios';
export default function Calendars({setMessage}) 
{

    const {calendars, setConfirm, setCalendarToEdit, navigate, deleteCalendar} = useCalendars();
    // const [calendarIndex, setCalendarIndex] = useState(false);
    const handleEditCalendar = (index) =>
    {
        setCalendarToEdit(calendars[index]);
        navigate('ustawienia');
    }

    const handleDeleteCalendar = (index) => 
    {
        console.log(index);
        const message = `Czy na pewno chcesz usunąć kalendarz ${calendars[index].name}?`
        const additional='Operacji nie da się cofnąć!';
        const submit = 'Usuń';


        const handleDeleteSubmit = (flag) =>
        {

            if (!flag)
                return;
            
            const resault = deleteCalendar(calendars[index]);

            if (resault)
                setMessage('Usunięto kalendarz');
            else
                setMessage('Wystąpił problem');
        }
        setConfirm({message, submit, additional, handleSubmit : handleDeleteSubmit})
    }

    

    const handleCreateCalendar = () =>
    {
        setCalendarToEdit(false);
        navigate('ustawienia');
    }

    const variantsForCalendars = 
    {
          hidden: { opacity: 0, y: -200},
          enter: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8}},
          exit: { opacity: 0, x: 0, y: -200},
    }
    return (
        <m.div className="w-full h-fit bg-blue-300" variants={variantsForCalendars} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'>
            <div className="w-full h-14 md:h-20 bg-white border-x border-b-blue-300 border-b border-blue-300 flex flex-col ">
                <button onClick={handleCreateCalendar} className="bg-slate-400 w-fit p-2 mt-2 h-fit ml-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-slate-100 duration-200">Stwórz nowy kalendarz</button>
            </div>
            <div className="overflow-auto h-full">
            {calendars.map((calendar, index) =>
            {
                return (
                    <div key={index} className='md:text-lg h-fit text-gray-700 border-b border-x border-gray-500 bg-slate-100 flex flex-row justify-between items-center py-2'>
                <div className='flex flex-col pl-2'>
                <p>{calendar.name}</p>
                </div>
                {/* <div className={`flex flex-row ${(calendarIndex === index)? 'pointer-events-none' : ''}`}> */}
                <div className={`flex flex-row`}>
                    <button onClick={() => handleEditCalendar(index)} className="bg-blue-400 w-fit p-2 h-fit mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-blue-100 duration-200">Edytuj</button>
                    <button onClick={()=>handleDeleteCalendar(index)} className="bg-red-400 w-fit p-2 h-fit mr-2 rounded-sm btn ripple  text-white  active:scale-110 hover:text-black hover:bg-red-100 duration-200">Usuń</button>
                </div>
                </div>
                )
            })}
            </div>
        </m.div>
    )
}