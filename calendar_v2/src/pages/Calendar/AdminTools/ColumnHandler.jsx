export default function ColumnHandler({column, columnIndex, dayIndex, weekIndex, monthIndex, children, calendar, setCalendar}) {
    

    const handleCalendarUpdate = () => {
    

        const updateColumns = columns => columns.map((column, index)=>
        {
            if (columnIndex !== index) return column

            return {...column, jakisKlucz: 'x'}
        })


        const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== monthIndex) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = week.days.map((day, index)=>{
                    if (dayIndex !== index) return day

                    const updatedColumns = updateColumns(day.columns);

                    return {...day, columns : updatedColumns}
                })
                
                return {...week, days: updatedDays};
            });
          
            return { ...month, weeks: updatedWeeks }; 
          });
    
          const updatedCalendar = {...calendar, months : updatedMonths};
    
            setCalendar(updatedCalendar);
        }


        return (
            <>
            <div>message</div>
            <div>delete</div>
            {children}
            </>
        )
}
