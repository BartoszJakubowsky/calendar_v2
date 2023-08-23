

export default function TableHeader({ days, bannedData, rowClassName, cellClassName, additionalFirstCol, translate, isPastDate}) {

    
    const filteredDays = days.filter(day => !bannedData.includes(day.name.toUpperCase()))
    const th = filteredDays.length > 0 ? filteredDays.map((day) =>
        {
            if (day.erase || isPastDate(day.date))
                return false;
            
            const verifyBannedData = (dataToVerify) => {
                const _dataToVerify = dataToVerify.toUpperCase();
                //bannedData -> global settings, data.bannedData -> localSettings
                return bannedData.includes(_dataToVerify)
            }

            if (verifyBannedData(day.name))
                return false;

            const date = day.date.split('T')[0].split('-').reverse().join("-");
            return (
                <th key={day.id} className={`${cellClassName} flex flex-col grow bg-accentMedium dark:bg-dark-accentMedium text-dark-baseColor dark:text-baseColor font-medium`}>
                    <h3 className="pb-1">{translate(day.name)}</h3>
                    <h4>{date}</h4>
                    <div className="flex justify-evenly w-full overflow-hidden">
                        {day.columns.map(column => 
                            {
                               return (<h4 
                                 key={column.id}
                                 className="h-14 w-16 text-sm text-center"
                                 >{column.name}</h4>)
                            })}
                    </div>
                </th>
            )
        }) : false;

    
    return (
        <>
        {th && th.some(header => header !== false)? 
            <tr className={`${rowClassName} sticky top-0 z-[6]`}>
                {additionalFirstCol? <th className={`${cellClassName}  sticky -left-[1px] w-16  bg-accentLight dark:bg-dark-accentLight text-dark-baseColor dark:text-baseColor`}>
                    {translate(additionalFirstCol) }
                </th> 
                :
                false}
            {th}
            </tr>
        :   
        false}
        </>
    )
   

}
