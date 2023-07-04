import Label from "@/components/forms/Label";

export default function Time({timeFrom, setTimeFrom, timeTo, setTimeTo, timeBetween, setTimeBetween, timeFromError, timeToError, setTimeFromError, setTimeToError, timeBetweenError, setTimeBetweenError, translate}) {
 
    

    const getValueFromEvent = (event) => event.target.value;
    const resetError = (optionError, setOptionError) => optionError && setOptionError(false);
    const handleTimeFromChange = (event) => {
        const time = getValueFromEvent(event);

        setTimeFrom(time);
        resetError(timeFromError, setTimeFromError);
    }

    const handleTimeToChange = (event) => {
        const time = getValueFromEvent(event);
        
        setTimeTo(time);
        resetError(timeToError, setTimeToError);
    }

    const handleTimeBetweenChange = (event) => {
        const time = getValueFromEvent(event);
        
        setTimeBetween(time);
        resetError(timeBetweenError, setTimeBetweenError);
    }
    return (
        <div className="mb-2">
        <Label text={translate('timeLabel')}/>
        <div className=" flex flex-row justify-start gap-4 ">
        <TimeInput 
            value={timeFrom}
            onChange={handleTimeFromChange}
            error={timeFromError}
            text={translate('timeFrom')}
        />
        <TimeInput 
            value={timeTo}
            onChange={handleTimeToChange}
            error={timeToError}
            text={translate('timeTo')}
        />
        <TimeInput 
            value={timeBetween}
            onChange={handleTimeBetweenChange}
            error={timeBetweenError}
            text={translate('timeBetween')}
        />
        </div>
        </div>
    )
}


export function TimeInput({min, max, value, onChange, error, text, ...rest}) {


    return (
        <div className="flex-row">
            <Label text={text} labelColor='text-dark-baseColor duration-300 ' error={error}/>
          <input 
            type='time' 
            step='900'
            min={min}
            max={max}
            value={value} 
            onChange={onChange}
            className={`text-form-input rounded-sm ${rest.className}`}
           />
         </div>
    )
}