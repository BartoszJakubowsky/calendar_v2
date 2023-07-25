import { useEffect, useRef, useState } from "react";
import LabelInput from '@/components/forms/LabelInput';

export default function WeekHandler({week, weekIndex, monthIndex, children, calendar, setCalendar}) {


  const [deleteWeek, setDeleteWeek] = useState(week.delete? week.delete : false)
  const isMounted = useRef(false);

    useEffect(()=>
    {
        if(!isMounted.current)
        {
            isMounted.current = true;
            return;
        }

        handleCalendarUpdate();

    }, [])


  
const handleCalendarUpdate = () => {
    

    const updateWeeks = (weeks) => weeks.map((week, index) => {

      if (weekIndex !== index) return week;
      return { ...week, jakisKLicz : 'x' }; 

    })

    const updatedMonths = calendar.months.map((month, index) => {
        if (monthIndex !== monthIndex) return month;
      
        const updatedWeeks = updateWeeks(month.weeks);
      
        return { ...month, weeks: updatedWeeks }; 
      });

      const updatedCalendar = {...calendar, months : updatedMonths};

        setCalendar(updatedCalendar);
    }
    
    return (
        <div>
            <LabelInput inputType={'checkbox'} value={deleteWeek} setValue={setDeleteWeek} />
            <div>messages</div>
            <div>time</div>
            <div>indelibleDays</div>
            {children}
        </div>
    )   
}
