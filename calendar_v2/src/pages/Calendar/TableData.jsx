export default function TableData({time, data, bannedData}) {
 
    console.log(data);



    const slotCell = (slots) =>
    {

        return slots.map(slot=>
            {
                return (
                    <div key={slot.id} className="">
                        {recordCell(slot.records)}
                    </div>
                )
            })
    }

    const recordCell = (records) =>
    {
        return records.map((record, index) =>
            {
                return (
                    <button key={index}>
                        {record.data == '' ? "sign": record.data}
                    </button>
                )
            })
    }

    
    const dayCell =  data.map(day => 
        {
            if (bannedData.includes(day.name.toUpperCase()))
                return false;
            return (
                <td key={day.id} className="border-x-2 border-slate-600 min-w-[1000px]">
                    {slotCell(day.slots)}
                </td>
            )
        });
    

   

        return (
            <tr className=' border-b-2 border-slate-600'>
                <td className=" sticky left-0 bg-red-200">
                    {time}
                </td>
                {dayCell}
            </tr>
        )
}




