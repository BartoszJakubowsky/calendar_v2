export default function SlotHandler({slot, slotIndex, columnIndex, dayIndex, weekIndex, monthIndex, children, calendar, setCalendar}) {
    


    const handleCalendarUpdate = () => {
    

        const updateSlots = (slots) => slots.map((slot, index)=> {
            if (slotIndex !== slot) return slot;

            return {...slot, jakisKlucz : 'x'}
        })


        const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== monthIndex) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = week.days.map((day, index)=>{
                    if (dayIndex !== index) return day

                    const updatedColumns = day.columns.map((column, index)=>
                    {
                        if (columnIndex !== index) return column

                        const updatedSlots = updateSlots(column.slots);

                        return {...column, slots: updatedSlots}
                    })

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
