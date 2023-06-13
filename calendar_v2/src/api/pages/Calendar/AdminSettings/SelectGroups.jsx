import classNames from "classnames";
export default function SelectGroups({selectedGroups, setSelectedGroups, groups}) 
{
    const handleDayClick = index =>
    {
        const chosedGroup = groups[index].toUpperCase();
        if (selectedGroups.includes(chosedGroup))
            setSelectedGroups(selectedGroups.filter(day => {return day !== chosedGroup}))
        else
            setSelectedGroups([...selectedGroups, chosedGroup])
    }

    const renderDays = groups.map((group, index)=>
        {

            const classes = classNames("text-sm uppercase text-center px-1 py-2 m-1 cursor-pointer duration-150 active:bg-sky-400 active:scale-110",
            selectedGroups.includes(group.toUpperCase())? 'bg-pink-200 hover:bg-pink-300' : 'bg-sky-200 hover:bg-sky-300'
            )
            
            return (
            <li 
                onClick={() => handleDayClick(index)}
                className={classes}
                key={group}
                >{group}</li>)
        })

    return (
        <div className="flex flex-col">
        <ul className="flex flex-row justify-start w-full  overflow-x-scroll  md:overflow-x-auto">
            {renderDays}
        </ul>
        </div>
    )


}