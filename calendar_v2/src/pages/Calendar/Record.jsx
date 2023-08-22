import { useEffect, useState } from "react"
import useAuthentication from '@/hooks/useAuthentication'
import useSocket from '@/hooks/useSocket';
export default function Record({record, translate, calendarId, date, time}) {

    const {user} = useAuthentication();
    const {socket, updateRecord} = useSocket();
    const [name, setName] = useState(record.data);
    const id = record.id;
    const [hoverMessage, setHoverMessage] = useState(false);
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const recordDate = new Date(date);
    const dayName = daysOfWeek[recordDate.getUTCDay()];
    
    const formatDate = () => {
      const day = recordDate.getUTCDate().toString().padStart(2, '0');
      const month = (recordDate.getUTCMonth() + 1).toString().padStart(2, '0');
      const year = recordDate.getUTCFullYear();

      return `${day}-${month}-${year}`;
    }



    const handleSign = (data) =>
    {
      if (data.recordId === id)
        setName(data.data)
    }
    useEffect(()=>
    {
      socket && socket.on('sign', data => handleSign(data))
    },[])

    const handleMouseEnter = () => {
        if(name === '')
          setHoverMessage(translate('sign'))
        else
         setHoverMessage(translate('sign_out'))
      };
    
      const handleMouseLeave = () => {
        setHoverMessage(false);
      };

      const handleClick = () => {

        updateRecord({recordId: id, calendarId, data: name === '' ? user.name : '', userId: user._id, date: {fullDate: formatDate(), dayName, time }});
        if (name === '')
        {
            setHoverMessage(false);
        }
        else
        {
            handleMouseEnter();
        }

      }

    
    return (
        <button 
         className={`${name === '' ? 
         'dark:bg-dark-accentLight bg-accentLight ' 
         :
         'bg-accentMedium dark:bg-dark-accentMedium'}
         hover:bg-accentMedium dark:hover:bg-dark-accentStrongHover w-24 h-14 hover:shadow-lg transition-all active:bg-accentStrong dark:active:bg-dark-accentStrong active:text-baseColor duration-200 grow rounded-sm border-[1px] border-slate-700 m-1 overflow-hidden`}
         onMouseEnter={handleMouseEnter}
         onMouseLeave={handleMouseLeave}
         onClick={handleClick}
         >
            {hoverMessage? hoverMessage : name}
            </button>
    )
}
