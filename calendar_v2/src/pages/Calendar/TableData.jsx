import Record from './Record'
import Message from './Message';
export default function TableData({days, bannedDays, rowClassName, cellClassName, time, translate, index, calendarId, weekMessage}) {
    const recordCell = (records) =>
    {
        return records.map(record =>
            {
                return (
                    <Record key={record.id} record={record} translate={translate} calendarId = {calendarId}/>
                )
            })
    }
    const renderCells = (slots) =>
    {
        const renderSlots =  slots.map((slot, slotIndex)=>
            {
                if (slotIndex === index)
                return (
                    <div key={slot.id} className="flex flex-col items-center justify-center relative">
                        {recordCell(slot.records)}
                    </div>
                )
                
            })
        return (
            <>
            {renderSlots}
            </>
        )
    }

    const renderColumn = (columns) => {

        return columns.map(column => 
            {
                return (
                    <div key={column.id} className='flex relative'>
                            {column.messages.length > 0 && <Message className='flex z-[2]' message={column.messages[0]} isVisible={weekMessage}/>}
                            {renderCells(column.slots)}
                    </div>
                )
            })
    }
    
    
    const filteredDays = days.filter(day => !bannedDays.includes(day.name.toUpperCase()))
    const renderDays = filteredDays.length > 0?  filteredDays.map(day => 
        {
            if (day.erase)
                return false
            return (
                <td key={day.id} className={`${cellClassName} flex flex-row grow relative`}>
                    {day.messages.length > 0 && <Message className='flex z-[3]' message={day.messages[0]} hide={weekMessage}/>}
                    {renderColumn(day.columns)}
                </td>
            )
        }) : false;

        
        return (
            <>
            {renderDays?
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




