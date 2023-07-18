

export default function TableHeader({data, bannedData, rowClassName, cellClassName, additionalFirstCol, translate}) {

    

    const filteredHeaders = data.filter(data => !bannedData.includes(data.name.toUpperCase()))
    const th = filteredHeaders.length > 0 ? filteredHeaders.map((data) =>
        {
            const verifyBannedData = (dataToVerify) => {
                const _dataToVerify = dataToVerify.toUpperCase();
                //bannedData -> global settings, data.bannedData -> localSettings
                return bannedData.includes(_dataToVerify)
            }

            if (verifyBannedData(data.name))
                return false;
            return (
                <th key={data.id} className={`${cellClassName} flex flex-col grow bg-accentMedium dark:bg-dark-accentMedium text-dark-baseColor dark:text-baseColor font-medium`}>
                    <h3 className="pb-1">{translate(data.name)}</h3>
                    <div className="flex justify-evenly overflow-hidden">
                        {data.slots.map(slot => 
                            {
                               return (<h4 
                                 key={slot.id}
                                //  className="w-24 h-14"
                                 className="h-14 w-16 text-sm text-center"
                                 >{slot.name} nieoficjalne</h4>)
                            })}
                    </div>
                </th>
            )
        }) : false;

    return (

        <>
        {th? 
            <tr className={`${rowClassName}`}>
                {additionalFirstCol? <th className={`${cellClassName} border-l-0 sticky -left-[1px] w-16  bg-accentLight dark:bg-dark-accentLight text-dark-baseColor dark:text-baseColor`}>
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
