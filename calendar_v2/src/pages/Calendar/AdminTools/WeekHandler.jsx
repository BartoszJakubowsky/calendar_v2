
export default function WeekHandler({week, weekIndex, monthIndex, children, calendar, setCalendar}) {

const handleCalendarUpdate = () => {
    
    const updatedMonths = calendar.months.map((month, index) => {
        if (monthIndex !== monthIndex) return month;
      
        const updatedWeeks = month.weeks.map((week, index) => {
          if (weekIndex !== index) return week;
      

          return { ...week, jakisKLicz : 'x' }; 
        });
      
        return { ...month, weeks: updatedWeeks }; 
      });

      const updatedCalendar = {...calendar, months : updatedMonths};

        setCalendar(updatedCalendar);
    }
    
    return (
        <div>
            <div>delete</div>
            <div>messages</div>
            <div>time</div>
            <div>indelibleDays</div>
            {children}
        </div>
    )   
}
