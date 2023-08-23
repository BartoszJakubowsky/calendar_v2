import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {createCalendar} from '@/api/calendars/calendarsApi';

import {translateCreateCalendarPage} from "@/locales/translate";

import MenuPage from '@/pages/menu/MenuPage';
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import FormContainer from '@/components/forms/FormContainer';
import FormHeader from '@/components/forms/FormHeader';
import LabelInput from "@/components/forms/LabelInput";
import SelectOptions from "@/components/forms/SelectOptions";
import FormButtonMessage from '@/components/forms/FormButtonMessage';

import SelectYearMonth from './SelectYearMonth';
import Time from './Time';
import AutoMonthSwitch from './AutoMonthSwitch';
import SlotsForm from './SlotsForm';
import SlotsSelect from './SlotsSelect'
import CalendarDescription from './CalendarDescription'
export default function CreateCalendarPage() {
    
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedMonthsError, setSelectedMonthsError] = useState(false);

    const [months, setMonths] = useState([]);

    const [bannedDays, setBannedDays] = useState([]);
    const [autoMonth, setAutoMonth] = useState(true);


    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [timeBetween, setTimeBetween] = useState('');

    const [timeFromError, setTimeFromError] = useState(false);
    const [timeToError, setTimeToError] = useState(false);
    const [timeBetweenError, setTimeBetweenError] = useState(false);


    const [slots, setSlots] = useState([]);
    const [slotsError, setSlotsError] = useState(false);
    const [formSlot, setFormSlot] = useState(null);


    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState(false);

    const [isOpenSlots, setIsOpenSlots] = useState(false);

    const [messageText, setMessageText] = useState('');


    useEffect(()=>
    {   

        if (months.length === 0 && selectedMonths.length === 0)
            return
        //add
        if (months.length < selectedMonths.length)
        {
            setMonths([...months, {date: selectedMonths.slice(-1)[0]}])
        }
            
        else
        {   
            const oldMonths = [...months];
            const newMonths = oldMonths.filter(month => month.date === selectedMonths.find(searchedMonth => searchedMonth === month.date))
            setMonths(newMonths);
        }
    },[selectedMonths])

    const days = [
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    ]


    const checkCondition = (condition, setState) => {
        if (condition)
        {
          setState(true);
          return true;
        }
        
        setState(false);
        return false;
    }  

    const nameCondition = () => checkCondition(name.length < 3, setNameError);
    const monthsCondition = () => checkCondition(selectedMonths.length === 0, setSelectedMonthsError);
    
    const timeFromCondition = () => checkCondition(timeFrom === '', setTimeFromError);
    const timeToCondition = () => checkCondition(timeTo === '', setTimeToError);
    const timeBetweenCondition= () => checkCondition(timeBetween === '', setTimeBetweenError);
    const slotsCondition= () => checkCondition(slots.length === 0, setSlotsError);
    const descriptionCondition = () => checkCondition(description === '' , setDescriptionError)

    const checkError = () => 
    {
        //true == error
        if (nameCondition() | monthsCondition() | timeFromCondition() | timeToCondition() | timeBetweenCondition() | slotsCondition() | descriptionCondition())
            return true;
        createCalendar({name, months, slots, bannedDays, autoMonth, description, time:{timeFrom, timeTo, timeBetween}}).then(res => 
            {
                if (res.data)
                {
                    setMessageText(translateCreateCalendarPage(res.message));
                    setTimeout(() => {
                        navigate('/');
                    }, 2500);
                    
                }
                else
                    setMessageText(translateCreateCalendarPage(res.message));
            });
        return false;
    }
    return (
        <>
        <MenuPage/>
        <AnimatedContainer animation={'opacityVariant'} className={`background-gradient h-screen flex justify-center items-center overflow-auto`}>
            <FormContainer className='relative overflow-hidden h-fit mt-12'>
                <FormHeader text={translateCreateCalendarPage('header')}/>
                <LabelInput 
                    inputContainerClassName={"mb-2 mt-2"}
                    inputType='text' 
                    value={name}
                    setValue={setName}
                    setError={setNameError}
                    error={nameError}
                    labelText={translateCreateCalendarPage('nameLabel')}
                    />
                <CalendarDescription
                    labelText={translateCreateCalendarPage('descriptionLabel')}
                    value={description}
                    setValue={setDescription}
                    setError={setDescriptionError}
                    error={descriptionError}
                />
                <SelectYearMonth
                    selectedMonths={selectedMonths} 
                    setSelectedMonths={setSelectedMonths}
                    selectedMonthsError={selectedMonthsError}
                    setSelectedMonthsError={setSelectedMonthsError}
                    translateOption={translateCreateCalendarPage}
                    labelText={translateCreateCalendarPage('monthsLabel')}
                />
                <Time 
                    timeFrom={timeFrom}
                    setTimeFrom={setTimeFrom}
                    timeTo={timeTo} 
                    setTimeTo={setTimeTo} 
                    timeBetween={timeBetween} 
                    setTimeBetween={setTimeBetween} 
                    timeFromError={timeFromError} 
                    timeToError={timeToError} 
                    setTimeFromError={setTimeFromError} 
                    setTimeToError={setTimeToError} 
                    timeBetweenError={timeBetweenError}
                    setTimeBetweenError={setTimeBetweenError}
                    translate={translateCreateCalendarPage}
                />
                <AutoMonthSwitch 
                 labelText={translateCreateCalendarPage('autoMonthLabel')}
                 value={autoMonth}
                 onChange={setAutoMonth}
                 />
                <SlotsSelect 
                 labelText={translateCreateCalendarPage('slotsLabel')}
                 addSlotText={translateCreateCalendarPage('addSlotText')}
                 slots={slots}
                 setSlots={setSlots}
                 slotsError={slotsError}
                 setSlotsError={setSlotsError}
                 setFormSlot={setFormSlot}
                 setIsOpen={setIsOpenSlots}
                 />
                <SlotsForm 
                 formSlot={formSlot}
                 slots={slots}
                 setSlots={setSlots}
                 isOpen={isOpenSlots}
                 setIsOpen={setIsOpenSlots}
                 translate={translateCreateCalendarPage}
                 />

                <SelectOptions
                 className='mb-2'
                 selectedOptions={bannedDays}
                 setSelectedOptions={setBannedDays}
                 optionsArr={days}
                 labelText={translateCreateCalendarPage('bannedDaysLabel')}
                 translateOption={translateCreateCalendarPage}
                />
                <FormButtonMessage
                    className='mt-4'
                    messageText={messageText}
                    setMessageText={setMessageText}
                    checkError={checkError}
                    buttonText={translateCreateCalendarPage('sendButton')}
                />
                </FormContainer>
        </AnimatedContainer>
        </>
    )
}
