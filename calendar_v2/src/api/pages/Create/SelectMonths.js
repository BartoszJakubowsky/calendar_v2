

import { useState } from "react";
import { HiArrowSmLeft as ArrowLeft} from "react-icons/hi";
import { HiArrowSmRight as ArrowRight } from "react-icons/hi";
import classNames from "classnames";

export default function SelectMonths({year, handleYear, setDate, date}) 
{
    const monthsNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj',  'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', ' Grudzień' ];
    const thisYear = new Date().getFullYear();
    const chosedYear = year === thisYear;

    let avaibleMonths;

    if (year === thisYear)
    {
        const actualMonth = new Date().getMonth();
        avaibleMonths = monthsNames.slice(actualMonth);
    }
    else
        avaibleMonths = monthsNames;


    const handleMonthClick = event =>
    {
        const chosedMonth = event.target.innerText + '.' + year.toString();

        if (date.includes(chosedMonth))
        setDate(date.filter(month => {return month !== chosedMonth}))
        else
        setDate([...date, chosedMonth])
    }

    const renderMonths = avaibleMonths.map(month=>
        {

            const classes = classNames("text-sm uppercase text-center px-1 py-2 m-1 cursor-pointer duration-150 active:bg-sky-400 active:scale-110 ",
            date.includes(month.toUpperCase() + '.' +year.toString())? 'bg-pink-200 hover:bg-pink-300' : 'bg-sky-200 hover:bg-sky-300'
            )
            
            return (
            <li 
                onClick={handleMonthClick}
                className={classes}
                key={month}
                >{month}</li>)
        })

    const leftArrowClassName = 'hover:-translate-x-0.5 transition active:hover:-translate-x-1';
    const rightArrowClassName = 'hover:translate-x-0.5 transition active:hover:translate-x-1';
    const arrowClassName = classNames('text-cyan-900 cursor-pointer text-lg ease-out');


    return (
        <div className="flex flex-col">
            <div className="flex flex-row items-center">

            {((year === thisYear) && <ArrowLeft className=" pointer-events-none invisible"/> ) || 
            <ArrowLeft className={`${arrowClassName} ${leftArrowClassName}`} onClick={()=>handleYear(--year)}/>}
            <span className=" font-semibold text-cyan-900 pointer-events-none">{year}</span>
            <ArrowRight className={`${arrowClassName} ${rightArrowClassName}`} onClick={()=>handleYear(++year)}/>
            </div>
        <ul className="flex flex-row justify-start w-full overflow-hidden overflow-x-scroll  md:overflow-x-auto">
            {renderMonths}
        </ul>
        </div>
    )


}