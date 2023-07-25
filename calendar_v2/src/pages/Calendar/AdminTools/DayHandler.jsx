export default function DayHandler({day, dayIndex, weekIndex, monthIndex, children, calendar, setCalendar}) {
 

    const handleCalendarUpdate = () => {
    

        const updateDays = (days) => days.map((day, index)=>{
            if (dayIndex !== index) return day

            return {...day, jakisKlucz: 'x'}
        })

        const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== monthIndex) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = updateDays(week.days);
                
                return {...week, days: updatedDays};
            });
          
            return { ...month, weeks: updatedWeeks }; 
          });
    
        const updatedCalendar = {...calendar, months : updatedMonths};
    
        setCalendar(updatedCalendar);
        }

    return (
        <>
        <div>messageColumn</div>
        <div>delete</div>
        {children}
        </>
    )
}
