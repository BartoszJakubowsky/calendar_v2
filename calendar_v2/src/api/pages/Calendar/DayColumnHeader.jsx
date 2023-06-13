import {useRef} from 'react';
import useAuthentication from '../../hooks/useAuthentication';

export default function DayColumnHeader({dayDate, day, slots, isBlank, slotMessage, setSlotMessage, timeArr, calendar}) 
{

    const {isAdmin} = useAuthentication();

    const adminSettingsRef = useRef(null);
    let pressTimer = null;
  
    const handleMouseDown = () => {
    
        if (!isAdmin || isBlank)
            return;
    
      pressTimer = setTimeout(() => {
        setSlotMessage({ dayDate, timeArr})
      }, 1000);
    };
  
    const handleMouseUp = event => {
        event.preventDefault();
      clearTimeout(pressTimer);
    };




    return (
        <div className={`h-20 min-w-[10rem] w-full flex-none border-b-2 border-black ${isBlank? 'bg-gray-300' :  'bg-purple-100'} flex flex-col z-[2] sticky top-0 select-none cursor-pointer`}
                ref={adminSettingsRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
        >

                {/* day and date */}
                <div className='flex flex-col  justify-center items-center'>
                    <span className='font-semibold'>{day}</span>
                    <span>{dayDate}</span>
                </div>
                {isBlank? false : <div className='flex flex-row w-full h-full overflow-hidden'>
                {/* slots name holder */}
                {slots.map((slot, index) => {
                    return (

                        <span key={index} className="w-full h-full justify-center items-center overflow-hidden flex flex-wrap text-center border-[1px] border-t-black border-t-[3px] break-words border-gray-400">{slot.name}</span>
                    );
                })}
                </div>}
            </div>  
    )
}