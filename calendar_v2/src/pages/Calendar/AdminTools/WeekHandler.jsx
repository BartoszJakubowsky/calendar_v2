import { useEffect, useRef, useState } from "react";
import LabelInput from '@/components/forms/LabelInput';
import Accordion from "@/components/containers/Accordion";

export default function WeekHandler({week, weekIndex, monthIndex, children, calendar, setCalendar, translate, fixDate}) {

  const [erase, setErase] = useState(week.erase)
  const [messages, setMessages] = useState(week.messages || [])
  const isMounted = useRef(false);

    const dayFrom= fixDate(week.days[0].date);
    const dayTo = week.days.length > 1? fixDate(week.days[week.days.length-1].date) : false;

const dayFromTo = dayTo? dayFrom + " : " + dayTo : dayFrom; 
    useEffect(()=>
    {
        if(!isMounted.current)
        {
            isMounted.current = true;
            return;
        }

        handleCalendarUpdate();

    }, [erase, messages])


  
const handleCalendarUpdate = () => {
    

    const updateWeeks = (weeks) => weeks.map((week, index) => {

      if (weekIndex !== index) return week;
      return { ...week,  }; 

    })

    const updatedMonths = calendar.months.map((month, index) => {
        if (monthIndex !== monthIndex) return month;
      
        const updatedWeeks = updateWeeks(month.weeks);
      
        return { ...month, weeks: updatedWeeks, messages, remove: erase}; 
      });

      const updatedCalendar = {...calendar, months : updatedMonths};

        setCalendar(updatedCalendar);
    }
    
    return (
        <Accordion
        key={weekIndex}
        label={translate('weekLabel') + ' ' + dayFromTo}
        labelClassName={``}
        contentClassName={``}
        >
            <LabelInput inputType={'checkbox'} value={erase} setValue={setErase} />
            <div>messages</div>
            <div>time</div>
            <div>indelibleDays</div>
            {children}
        </Accordion>
    )   
}
