export default function RecordHandler({record,recordIndex ,slotIndex, columnIndex, dayIndex, weekIndex, monthIndex, children, calendar, setCalendar}) {
    

    const handleCalendarUpdate = () => {
    
        const updateRecords = (records) => records.map((record, index)=> {
            if (recordIndex !== index) return record;

            return {...record, jakisKlicz: 'x'}
        });

          const updatedMonths = calendar.months.map((month, index) => {
            if (monthIndex !== monthIndex) return month;
          
            const updatedWeeks = month.weeks.map((week, index) => {
              if (weekIndex !== index) return week;
          
                const updatedDays = week.days.map((day, index)=>{
                    if (dayIndex !== index) return day

                    const updatedColumns = day.columns.map((column, index)=>
                    {
                        if (columnIndex !== index) return column

                            const updatedSlots = day.slot.map((slot, index)=>
                            {
                                if (slotIndex !== slot) return slot;

                                const updatedRecords = updateRecords(slot.records);

                                return {...slot, records: updatedRecords}
                            })

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
                <div>delete</div>
                <div>message</div>
            </>
        )

}
