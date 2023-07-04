import { useState } from 'react';

import AnimatedContainer from '@/components/containers/AnimatedContainer';
import MenuPage from '@/pages/menu/MenuPage';
import FormContainer from '@/components/forms/FormContainer';
import FormHeader from '@/components/forms/FormHeader';
import {translateCreateCalendarPage} from "@/locales/translate";
import LabelInput from "@/components/forms/LabelInput";
import SelectYearMonth from './SelectYearMonth';
import SelectOptions from "@/components/forms/SelectOptions";
import Time from './Time';
import FormButtonMessage from '@/components/forms/FormButtonMessage';
import {createCalendar} from '@/api/calendars/calendarsApi';
import { useNavigate } from 'react-router-dom';

export default function CreateCalendarPage() {
    
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [selectedMonthsError, setSelectedMonthsError] = useState(false);
    const [bannedDays, setBannedDays] = useState([]);


    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [timeBetween, setTimeBetween] = useState('');

    const [timeFromError, setTimeFromError] = useState(false);
    const [timeToError, setTimeToError] = useState(false);
    const [timeBetweenError, setTimeBetweenError] = useState(false);

    const [messageText, setMessageText] = useState('');

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
    

    const checkError = () => 
    {
        //true == error
        if (nameCondition() | monthsCondition() | timeFromCondition() | timeToCondition() | timeBetweenCondition())
            return true;

        createCalendar({name ,time:{timeFrom, timeTo, timeBetween}, months: selectedMonths, bannedDays }).then(res => 
            {
                if (res)
                {
                    setMessageText(translateCreateCalendarPage(res.message));
                    
                    setTimeout(() => {
                        navigate('/');
                    }, 2500);
                    
                }
                else
                    setMessageText(translateCreateCalendarPage(res));
            });
        return false;
    }
    return (
        <>
        <MenuPage/>
        <AnimatedContainer animation={'opacityVariant'} className='background-gradient flex justify-center items-center'>
            <FormContainer>
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
                <SelectYearMonth
                    selectedMonths={selectedMonths} 
                    setSelectedMonths={setSelectedMonths}
                    selectedMonthsError={selectedMonthsError}
                    setSelectedMonthsError={setSelectedMonthsError}
                    translateOption={translateCreateCalendarPage}
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
                <SelectOptions
                 className='mb-2'
                 selectedOptions={bannedDays}
                 setSelectedOptions={setBannedDays}
                 optionsArr={days}
                 labelText={translateCreateCalendarPage('bannedDaysLabel')}
                 translateOption={translateCreateCalendarPage}
                />
                <FormButtonMessage
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
