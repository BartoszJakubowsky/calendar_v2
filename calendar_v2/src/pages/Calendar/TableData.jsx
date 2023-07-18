import Record from './Record'
export default function TableData({days, bannedDays, rowClassName, cellClassName, time, translate, websocket}) {

    const recordCell = (records) =>
    {
        return records.map((record, index) =>
            {
                return (
                    <Record key={index} record={record} translate={translate} websocket={websocket}/>
                )
            })
    }

    const slotCell = (slots) =>
    {

        return slots.map(slot=>
            {
                return (
                    <div key={slot.id} className="flex flex-col items-center justify-center">
                        {recordCell(slot.records)}
                    </div>
                )
            })
    }
    
    
    const cells = days.filter(cell => !bannedDays.includes(cell.name.toUpperCase()))
    const renderCells = cells.length > 0?  cells.map(cell => 
        {
            if (bannedDays.includes(cell.name.toUpperCase()))
                return false;
                
            return (
                <td key={cell.id} className={`${cellClassName} flex flex-row`}>
                    {/* {slotCell(cell.slots)} */}
                    {slotCell(cell.slots)}
                </td>
            )
        }) : false;

        return (
            <>
            {renderCells?
                <tr className={`${rowClassName}`}>
                <td className={`${cellClassName} border-l-0 border-r-2 sticky -left-[1px] w-16 bg-accentLight dark:bg-dark-accentLight text-dark-baseColor dark:text-baseColor justify-center flex`}>
                    {time}
                </td>
                {renderCells}
            </tr>
            :
            false }
            </>
        )
}




