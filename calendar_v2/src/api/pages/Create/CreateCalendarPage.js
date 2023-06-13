import { useState } from "react";
import classNames from "classnames";
import {motion as m} from 'framer-motion';

import useCalendars from '../../hooks/useCalendars';

import Input from './Input';
import SelectMonths from "./SelectMonths";
import AdditionalSettings from "./AdditionalSettings";
import SelectDays from "./SelectDays";
import Menu from "../../components/menu/Menu";
import Switch from "../../components/ui/Switch";
import Message from "../../components/ui/Message";

export default function CreateCalendarPage({calendarName, calendarDate, calendarTime, calendarSlots, calendarId, calendarAutoMonth, calendarBannedDays}) 
{
    
    const entryCalendar = {name: calendarName, date: calendarDate, time: calendarTime, bannedDays: calendarBannedDays, autoMonth: calendarAutoMonth,  slots: calendarSlots, _id:calendarId};
    
    let canEdit;
    if (entryCalendar.name)
        canEdit = false;
    else
        canEdit = true;

    const {createCalendar, handleCalendarCreate, navigate, message, setMessage} = useCalendars();
    const [name, setName] = useState(calendarName || '');
    const [year, setYear] = useState(calendarDate? parseInt(calendarDate[0].split('.')[1], 10) : new Date().getFullYear());
    const [additional, setAdditional] = useState(false);
    const [slotSettingsCard, setSlotSettingsCard] = useState(false);
    const [timeSettingCard, setTimeSettingsCard] = useState(false);
    const [date, setDate] = useState(calendarDate || []);
    const [bannedDays, setBannedDays] = useState(calendarBannedDays || []);
    const [autoMonth, setAutoMonth] = useState(calendarAutoMonth || false);

    const [isHover, setIsHover] = useState(false);
    const handleAdditional = addSettings => setAdditional(addSettings);
    const handleNameChange = event => setName(event.target.value);
    const handleYear = (year) => setYear(year)
    const handleSendClick = event => 
    {
        event.preventDefault();
        const allSettings = {name, date: date, ...additional, bannedDays, autoMonth};
        //oldCalendar, newCalendar

        if (!checkCalendar(allSettings))
            return;
        
        handleCalendarCreate(entryCalendar, allSettings);
        navigate('/');
    }
        const handleMouseEnter = () => setIsHover(true);
        const handleMouseLeave = () => 
        {
            if (slotSettingsCard !== false || timeSettingCard !== false)
                return
            else
                setIsHover(false);   
        }


        const checkCalendar = (allSettings) =>
        {

            if (allSettings.name === '')
            {
                setMessage('Ups... nie dodałeś nazwy kalendarza!')            
                return false;
            }

            if (allSettings.date.length === 0)
            {
                setMessage('Ups... nie dodałeś ani jednego miesiąca!')            
                return false;
            }
            
            if (!allSettings.time)
            {
                setMessage('Ups... pominąłeś ustawienie czasu!')            
                return false;
            }

            if (!allSettings.slots.length === 0)
            {
                setMessage('Ups... pominąłeś ustawienie slotów!')            
                return false;
            }

            return true;

        }



        const handleAutoMonth = (switched) => 
        {
            setAutoMonth(switched);
        }

        const mainDivClassName = classNames(`md:w-3/4 w-11/12  mt-16 h-fit 
                                            flex flex-col justify-start items-center 
                                            border-black border-2 mt-10  shadow-[10px_10px_0px_0px_rgb(7_89_133)]
                                            duration-300 ease-in-out  `, 
                                            isHover ? 'shadow-[10px_10px_0px_0px_rgb(7_89_133)]' : 'md:shadow-none')



const variantsForCreateCalendarPage = 
  {
        hidden: { opacity: 0, x: 0, y: 200 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
  }
    return(
        <div className="flex w-screen h-screen bg-pink-300 overflow-hidden duration-75 justify-center items-start">
            <Message message={message} theme={'bg-sky-100'}/>
            <Menu className='flex' theme=' bg-blue-300'/>
            <m.div variants={variantsForCreateCalendarPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit' 
                className={mainDivClassName}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                    >
            <h3 className="text-white uppercase text-xl bold bg-sky-500 text-center 400 w-full p-3 select-none font-bold">
                Stwórz nowy wózek
            </h3>
            <form className=" bg-white w-full h-full flex flex-col [&>*]:mt-2 [&>*]:mx-2 [&>label]:uppercase [&>label]:font-semibold">
                
                <label>Nazwa wózka</label>
                <Input 
                className={`${canEdit? '' : 'pointer-events-none opacity-50'} h-10 border-2 border-opacity-100 rounded-sm hover:border-gray-400 duration-300 ease-in-out`}
                calendarName={name} 
                handleNameChange={handleNameChange}
                />

                <label className="">Wybierz miesiąc lub miesiące</label>    
                <SelectMonths
                year={year}
                setDate={setDate}                
                handleYear={handleYear}
                date={date}
                />
                <label className="">Ustawienia dodatkowe</label>
                <h5 className="text-sm">AUTOMATYCZNE DODAWANIE MIESIĘCY</h5>
                <Switch onClick={handleAutoMonth} onRender={autoMonth}/>

                <h5 className="text-sm">WYŁĄCZONE DNI</h5>
                <SelectDays bannedDays={bannedDays} setBannedDays={setBannedDays}/>

                <AdditionalSettings className={`${canEdit? '' : 'pointer-events-none opacity-50'}`} calendarTime={calendarTime} calendarSlots={calendarSlots} onChange={handleAdditional} slotCard={setSlotSettingsCard} timeCard={setTimeSettingsCard}/>
                <button 
                className="self-center my-2 w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                onClick={handleSendClick}>
                Ustaw
                </button>
            </form>
            </m.div>
            {slotSettingsCard}
            {timeSettingCard}
        </div>

    );
}