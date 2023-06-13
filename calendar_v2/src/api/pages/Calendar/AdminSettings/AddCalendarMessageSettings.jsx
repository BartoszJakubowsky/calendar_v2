import { useEffect, useState } from 'react';
import Close from '../../../components/ui/Close';
import SelectGroups from './SelectGroups';
import SelectTimes from './SelectTimes';
import useCalendars from '../../../hooks/useCalendars';
export default function AddCalendarMessageSettings({timeArr, dayDate, setDisplayedFrom, calendar, setGlobalSlotMessage, globalSlotMessage, displayedFrom}) 
{
    let showRemoveButton = false;
    if (globalSlotMessage)
        showRemoveButton = true;
    
    const {updateCalendar} = useCalendars();
    const [slotMessageError, setSlotMessageError] = useState(false);
    const [selectedTimesError, setTimesError] = useState(false);


    const [thisSlotMessage, setThisSlotMessage] = useState('');
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedTimes, setSelectedTimes] = useState([]);
    const [selectedSlots, setSelectedSlots] = useState()


    const [showDeleteButton, setDeleteButton] = useState(false);


    useEffect(()=>
    {
        setThisSlotMessage(globalSlotMessage.thisSlotMessage || '');
        setSelectedGroups(globalSlotMessage.selectedGroups || []);
        setSelectedTimes(globalSlotMessage.selectedTimes || []);

    },[globalSlotMessage, displayedFrom])


    useEffect(()=>
    {
        if (thisSlotMessage !== globalSlotMessage.thisSlotMessage 
            || selectedGroups !== globalSlotMessage.selectedGroups
            || selectedTimes !== globalSlotMessage.selectedTimes )
            setDeleteButton(false);
        else
            setDeleteButton(true);

            
    }, [thisSlotMessage, selectedGroups, , globalSlotMessage])


    


    const groups = ['GRUPA 1', 'GRUPA 2', 'GRUPA 3', 'GRUPA 4', 'GRUPA 5', 'GRUPA 6'];


    const handleSlotNameError = (boolean) => setSlotMessageError(boolean);

    // const handleCloseClick = () => close(false)
    const handleCloseClick = () => 
    {
        setDisplayedFrom(0);

        setTimeout(() => {
            setGlobalSlotMessage(false);
        }, 350);
    }

    const handleSlotNameChange = (event) => {

        if (slotMessageError)
            setSlotMessageError(false);
        
        setThisSlotMessage(event.target.value);
    }

    const handleChangeClick = (event) => 
    {
        event.preventDefault();
        
        const slotMessagesToUpdate = calendar.slotMessages.map((message, index)=>
        {
            const thisMessage = JSON.stringify(message);
            const messageToUpdate = JSON.stringify(globalSlotMessage);

            if (thisMessage === messageToUpdate)
                return {thisSlotMessage, selectedGroups, dayDate, selectedTimes}
            else
                return {...message}
        })
        const newCalendar = {...calendar, slotMessages : slotMessagesToUpdate}
        updateCalendar(calendar, newCalendar);

        handleCloseClick();
        
    }
    const handleAddClick = event => 
    {
        event.preventDefault();

        if (slotMessageError || selectedTimesError)
            return;
        
        if (thisSlotMessage === '' )
        {
            setSlotMessageError(true)
            return
        }

        if (selectedTimes.length === 0)
        {
            setTimesError(true);
            return
        }

        const slotMessagesToUpdate = [...calendar.slotMessages, {thisSlotMessage, selectedGroups, dayDate, selectedTimes}]
        const newCalendar = {...calendar, slotMessages : slotMessagesToUpdate}

        updateCalendar(calendar, newCalendar);

        handleCloseClick()
    };
    
    const handleRemoveClick = event => 
    {
        event.preventDefault();

        event.preventDefault();
        const slotMessagesToUpdate = calendar.slotMessages.filter(message => JSON.stringify(message) !== JSON.stringify(globalSlotMessage))
        const newCalendar = {...calendar, slotMessages : slotMessagesToUpdate}

        updateCalendar(calendar, newCalendar);
        handleCloseClick();
    }

    return (
        <div>
            <h3
            className=" bg-violet-200 py-2 uppercase font-semibold  mb-2 pl-2"
            >{globalSlotMessage !== false? 'Dodaj wiadomość' : 'Edytuj wiadomość'}
            <Close onClick={handleCloseClick}/>
                
            </h3>
            <form className=" bg-white w-full h-full flex flex-col [&>*]:mt-2 [&>*]:mx-2 [&>label]:uppercase ">
                <label className={`mx-2 duration-75  ${slotMessageError? 'valid text-red-300' : 'text-normal'}`} form='text'>Treść wiadomości</label>
                <textarea 
                type='text'
                className=" h-20 border-2 border-opacity-100 rounded-sm hover:border-gray-400 duration-300 ease-in-out"
                value={thisSlotMessage} 
                onChange={handleSlotNameChange}/>

                <label className={`mx-2 duration-75  ${selectedTimesError? 'valid text-red-300' : 'text-normal'}`}>Czas</label>
                <SelectTimes selectedTimes={selectedTimes} setSelectedTimes={setSelectedTimes} timeArr={timeArr} setTimesError={setTimesError} selectedTimesError={selectedTimesError}/>
               

                <label className="mx-2">Dla grup</label>
                    <SelectGroups selectedGroups={selectedGroups} setSelectedGroups={setSelectedGroups} groups={groups}/>
                
                <div className=' mt-14 mb-2 flex w-full justify-center flex-row'>

                {globalSlotMessage !== false? <button 
                className="w-20 rounded-md border-sky-500  border-2 mx-1
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleChangeClick}>{"Zmień"}</button>
                :
                <button 
                className="w-20 rounded-md border-sky-500  border-2 mx-1
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleAddClick}>{"Dodaj"}</button>}
                {showDeleteButton && <button 
                className="w-20 rounded-md border-red-400  border-2 mx-1
                            hover:text-white hover:bg-red-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleRemoveClick}>Usuń</button>}
                </div>
                </form>
        </div>
    );

};
