import classNames from "classnames";
export default function SelectTimes({selectedTimes, setSelectedTimes, timeArr, setTimesError, selectedTimesError}) 
{
    const handleDayClick = index =>
    {
        if (selectedTimesError)
            setTimesError(false);

        const chosedTime = timeArr[index].toUpperCase();
        if (selectedTimes.includes(chosedTime))
            setSelectedTimes(selectedTimes.filter(time => {return time !== chosedTime}))
        else
            setSelectedTimes([...selectedTimes, chosedTime])
    }

    const renderDays = timeArr.map((time, index)=>
        {

            const classes = classNames("text-sm uppercase text-center px-1 py-2 m-1 cursor-pointer duration-150 active:bg-sky-400 active:scale-110",
            selectedTimes.includes(time.toUpperCase())? 'bg-pink-200 hover:bg-pink-300' : 'bg-sky-200 hover:bg-sky-300'
            )
            
            return (
            <li 
                onClick={() => handleDayClick(index)}
                className={classes}
                key={time}
                >{time}</li>)
        })

    return (
        <div className="flex flex-col">
        <ul className="flex flex-row justify-start w-full  overflow-x-scroll  md:overflow-x-auto">
            {renderDays}
        </ul>
        </div>
    )


}