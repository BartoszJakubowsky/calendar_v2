

import classNames from "classnames";

export default function SelectDays({bannedDays, setBannedDays}) 
{
    const daysNames = ['poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota', 'niedziela'];

    const handleDayClick = index =>
    {
        const chosedDay = daysNames[index].toUpperCase();
        if (bannedDays.includes(chosedDay))
            setBannedDays(bannedDays.filter(day => {return day !== chosedDay}))
        else
            setBannedDays([...bannedDays, chosedDay])
    }

    const renderDays = daysNames.map((day, index)=>
        {

            const classes = classNames("text-sm uppercase text-center px-1 py-2 m-1 cursor-pointer duration-150 active:bg-sky-400 active:scale-110 ",
            bannedDays.includes(day.toUpperCase())? 'bg-pink-200 hover:bg-pink-300' : 'bg-sky-200 hover:bg-sky-300'
            )
            
            return (
            <li 
                onClick={() => handleDayClick(index)}
                className={classes}
                key={day}
                >{day}</li>)
        })

    return (
        <div className="flex flex-col">
        <ul className="flex flex-row justify-start w-full  overflow-x-scroll  md:overflow-x-auto">
            {renderDays}
        </ul>
        </div>
    )


}