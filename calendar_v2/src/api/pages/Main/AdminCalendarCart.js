import { useState } from 'react'
import {BiEditAlt as CalendarCartIcon} from 'react-icons/bi'
import Delete from '../../components/settings/Delete';
import useCalendars from '../../hooks/useCalendars';

export default function AdminCalendarCard({toggleIndex, calendar, navigation})
{

    const {setCalendarToEdit, setConfirm, deleteCalendar} = useCalendars();
    const [isToggled, setToggled] = useState(false);
    const handleMouseEnter = () => {setToggled(true)}
    const handleMouseLeave = () => {setToggled(false); };
    const handleSettings = (event) =>
    {
        event.stopPropagation();
        setCalendarToEdit(calendar);
        navigation('ustawienia');
        handleMouseLeave();
    }
    
    const handleDeleteSubmit = (deleteCalednar) =>
    {
        if (!deleteCalednar)
            return;
        
            deleteCalendar(calendar);
    }

    const handleDeleteClick = () =>
    {
        const message=`Czy na pewno chcesz usunąć ${calendar.name}?`;
        const additional='Operacji nie da się cofnąć';
        const submit='Usuń kalendarz';
        setConfirm({message, submit, additional, handleSubmit : handleDeleteSubmit})
    }












    const stopPropagation = event => event.stopPropagation();
    const settings = 
    <div onMouseLeave={handleMouseLeave} onClick={stopPropagation}
    className={`flex flex-col justify-center items-center absolute h-full w-full top-0 right-0 text-lg z-10 bg-yellow-200 overflow-hidden`}>
        <button onClick={handleSettings} className=' bg-transparent overflow-hidden '>Ustawienia</button>
        <button className={'bg-transparent'} onClick={handleDeleteClick}>Usuń</button>
    </div>

    return  (isToggled && settings) || <CalendarCartIcon className='absolute top-0 right-0' onMouseEnter={handleMouseEnter}/>
}

