import classNames from "classnames"

export default function Time({timeArr, heigh, ...rest}) 
{

    const timeSlotClassName = classNames(`bg-white flex  md:h-full ${heigh} w-full flex-1 border-b-2 border-black items-center justify-center`)
    return (
        <div 
            className={`md:flex h-full min-w-[50px] flex-col bg-white sticky left-0 z-[3] pointer-events-none`}>
                <div className="h-20 border-b-2 border-black flex justify-center items-center ">Czas</div>
                {timeArr.map((time, index) => 
                {
                    return <div key={time} className={`${timeSlotClassName} ${index === timeArr.length - 1? 'border-none' : '' }` } time={time}>{time}</div>
                })}
        </div>)
}