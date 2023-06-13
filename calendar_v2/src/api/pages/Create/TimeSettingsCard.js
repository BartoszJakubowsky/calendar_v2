import {useState } from "react";
import Close from '../../components/ui/Close';


export default function TimeSettingsCard({calendarTimeFrom, calendarTimeTo, calendarTimeSpace, onChange, close}) 
{

    //add max value to time space calculated from timeFrom - timeTo
    //add warnigns and 


    
    const [timeFrom, setTimeFrom] = useState(calendarTimeFrom || '');
    const [timeTo, setTimeTo] = useState(calendarTimeTo || '');
    const [timeSpace, setTimeSpace] = useState(calendarTimeSpace || '');

    const [timeFromError, setTimeFromError] = useState(false);
    const [timeToError, setTimeToError] = useState(false);
    const [timeSpaceError, setTimeSpaceError] = useState(false);

    const handleTimeFromChange = event => {setTimeFrom(event.target.value); if(timeToError) setTimeFromError(false)}
    const handleTimeToChange = event => {setTimeTo(event.target.value); if(timeToError) setTimeToError(false)}
    const handleTimeSpaceChange = event => 
    {
        const chosedTimeSpace = event.target.value;

        if (chosedTimeSpace !== timeTo)
        {
            if (timeSpaceError)
                setTimeSpaceError(false);
            
            setTimeSpace(chosedTimeSpace);
        }
        else
            return 
    }
    const handleCloseClick = () => close(false);

    const handleChangeClick = event => 
    {
        event.preventDefault();

        if (!checkTime())
            return;

        onChange({timeFrom,timeTo, timeSpace});
        handleCloseClick();
    };
    const checkTime = () => 
    {

        let timeFromFlag = false;
        let timeToFlag = false;
        let timesSpaceFlag = false;
        if (timeFrom === '')
        {
            setTimeFromError(true)
            timeFromFlag = true;
        }    

        if (timeTo === '')
        {
            setTimeToError(true)
            timeToFlag = true;
        }

        if (timeSpace === '')
        {
            setTimeSpaceError(true)
            timesSpaceFlag = true;
        }

        if (timeFromFlag || timeToFlag || timesSpaceFlag)
            return false;
        else
            return true;
    }
 
    const timeInputClassName = 'w-20 h-10 font-semibold'
    return (
        <div className="  bg-transparent absolute w-full h-full">
            <div className="bg-white md:w-72 w-5/6 h-fit mx-auto mt-24 border-2 border-black relative flex flex-col">
                <h3
                className=" bg-pink-200 py-2 uppercase font-semibold mb-2 pl-2"
                >Ustawienia czasu
                <Close onClick={handleCloseClick}/>
                    
                </h3>
                <div className="flex-row">
                    <label className={`mx-2 duration-75  ${timeFromError? 'valid text-red-300' : 'text-normal'}`}>Godziny od:</label>
                    <input 
                        className={timeInputClassName}
                        type='time' 
                        // min={6} 
                        // max={18} 
                        value={timeFrom} 
                        onChange={handleTimeFromChange}
                    />
                    </div>
                <div className="flex-row">
                    <label className={`mx-2 duration-75  ${timeToError? 'valid text-red-300' : 'text-normal'}`}>Godziny do:</label>
                    <input 
                        type='time' 
                        // min={6} 
                        // max={18} 
                        value={timeTo} 
                        onChange={handleTimeToChange}
                        className={timeInputClassName}
                    />
                 </div>

                 <div className="flex-row">
                    <label className={`mx-2 duration-75  ${timeSpaceError? 'valid text-red-300' : 'text-normal'}`}>Czas slotów:</label>
                    <input 
                        type='time' 
                        value={timeSpace} 
                        // max={(timeTo-timeFrom) || ''}
                        onChange={handleTimeSpaceChange}
                        className={timeInputClassName}
                    />
                </div>
                <div className="flex justify-center [&>button]:mx-1 my-2">
                <button 
                className="w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleChangeClick}>Ustaw</button>
                </div>
            </div>
        </div>
    )
}


// <input 
//                 type='time' 
//                 min={6} 
//                 max={18} 
//                 value={value} 
//                 onChange={handeTimeChange}
//                 className='w-20 h-10 border-grey-500 border-2'
//                 />} 