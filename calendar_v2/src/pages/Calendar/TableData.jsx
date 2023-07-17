import { redirect } from "react-router-dom";

export default function TableData({days, bannedDays, rowClassName, cellClassName, time, translate}) {
 






    const recordCell = (records) =>
    {
        return records.map((record, index) =>
            {
                return (
                    <button key={index} className=" w-24 h-14 border-1 border-slate-700">
                        {record.data == '' ? "sign": record.data}
                    </button>
                )
            })
    }

    const slotCell = (slots) =>
    {

        return slots.map(slot=>
            {
                console.log(slot);
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
                <td className={`${cellClassName} border-l-0 border-r-2 sticky -left-[1px] w-16`}>
                    {time}
                </td>
                {renderCells}
            </tr>
            :
            false }
            </>
        )
}




