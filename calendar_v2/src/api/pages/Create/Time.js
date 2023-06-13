import { useState } from 'react';
import {HiOutlineClock as AddTimeIcon} from 'react-icons/hi';
import classNames from 'classnames';

import TimeSettingsCard from './TimeSettingsCard';

export default function Time({value, onChange, timeCard}) 
{


    const [showDefaultWatch, setShowDefaultWatch] = useState(true);
    const [isWatchClicked, setIsWatchClicked] = useState(false);
    

    const handleTimeChange = calendarTime =>
    {
        onChange(calendarTime)
        //meaby here some animations with watch
    }



    const handleCloseClick = close => 
    {
        setIsWatchClicked(false);
        timeCard(close);
    }


    const handleWatchClick = event =>
    {
        event.preventDefault();
        setIsWatchClicked(!isWatchClicked);
        timeCard(<TimeSettingsCard calendarTimeFrom={value.timeFrom} calendarTimeTo={value.timeTo} calendarTimeSpace={value.timeSpace} onChange={handleTimeChange} close={handleCloseClick}/>);

    }



    const defaultTimeIconClassName = classNames('h-10 w-10 flex items-center justify-center hover:text-cyan-600 active:scale-110 duration-150  cursor-pointer text-lg ease-out', 
                                                isWatchClicked? 'text-cyan-600' : 'text-cyan-900' )
    


    return (
        <div className=' flex justify-center items-center cursor-pointer'>
            <button 
                onClick={handleWatchClick}
                className={defaultTimeIconClassName}>
                <AddTimeIcon/>
                {/* add here something like && value.time && value.time -> it will show small time for clock  */}
                </button>
        </div>
    )    
}