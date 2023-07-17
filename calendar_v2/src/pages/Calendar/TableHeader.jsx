

export default function TableHeader({data, bannedData, rowClassName, cellClassName, additionalFirstCol, translate}) {

    

    const filteredHeaders = data.filter(data => !bannedData.includes(data.name.toUpperCase()))
    const th = filteredHeaders.length > 0 ? filteredHeaders.map((data, index) =>
        {
            const verifyBannedData = (dataToVerify) => {
                const _dataToVerify = dataToVerify.toUpperCase();
                //bannedData -> global settings, data.bannedData -> localSettings
                return bannedData.includes(_dataToVerify)
            }

            if (verifyBannedData(data.name))
                return false;
            return (
                <th key={data.id} className={`${cellClassName} ${index===0? 'border-l-0': ''}`}>
                    {translate(data.name)}
                    <div className="flex flex-row w-full justify-evenly">
                        <p>1</p>
                        <p>2</p>
                    </div>
                </th>
            )
        }) : false;

    return (
        <>
        {th? 
            <tr className={rowClassName}>
                {additionalFirstCol? <th className={`${cellClassName} border-l-0 border-r-2 sticky -left-[1px] `}>
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
