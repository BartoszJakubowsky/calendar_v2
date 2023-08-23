import Record from './Record'
import Message from './Message';
export default function TableData({days, bannedDays, rowClassName, cellClassName, time, translate, index, calendarId, weekMessage, isPastDate}) {
    
    const recordCell = (records, date) =>
    {
        return records.map(record =>
            {   
                return (
                    <Record key={record.id} record={record} translate={translate} calendarId = {calendarId} date={date} time={time}/>
                )
            })
    }
    const renderCells = (slots, date) =>
    {
        const renderSlots =  slots.map((slot, slotIndex)=>
            {
                if (slotIndex === index)
                return (
                    <div key={slot.id} className="flex flex-col items-center justify-center relative grow ">
                        {recordCell(slot.records, date)}
                    </div>
                )
                
            })
        return (
            <>
            {renderSlots}
            </>
        )
    }

    const renderColumn = (columns, date) => {

        return columns.map(column => 
            {
                return (
                    <div key={column.id} className='flex relative grow'>
                            {column.messages.length > 0 && <Message className='flex z-[2]' message={column.messages[0]} isVisible={weekMessage}/>}
                            {renderCells(column.slots, date)}
                    </div>
                )
            })
    }
    
    
    const filteredDays = days.filter(day => !bannedDays.includes(day.name.toUpperCase()))
    const renderDays = filteredDays.length > 0?  filteredDays.map(day => 
        {
            if (day.erase || isPastDate(day.date))
                return false


            return (
                <td key={day.id} className={`${cellClassName} flex flex-row grow relative`}>
                    {day.messages.length > 0 && <Message className='flex z-[3]' message={day.messages[0]} hide={weekMessage}/>}
                    {renderColumn(day.columns, day.date)}
                </td>
            )
        }) : false;

        return (
            <>
            {renderDays && renderDays.some(day => day !== false) ?
                <tr className={`${rowClassName} relative`}>
                    <td className={`${cellClassName}border-l-0 border-r-2 sticky z-[5] -left-[1px] w-16 bg-accentLight dark:bg-dark-accentLight text-dark-baseColor dark:text-baseColor justify-center flex items-center`}>
                            <span className='sticky top-28'>
                                    {time}
                            </span>
                    </td>
                {renderDays}
            </tr>
            :
            false }
            </>
        )
}




