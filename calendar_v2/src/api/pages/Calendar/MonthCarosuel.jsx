import {useMemo, useState } from "react";
import {useSprings, animated } from "react-spring";

import Month from "./Month";

export default function MonthCarosuel({calendar, displayedMonth, monthsCountForMonthCarousel, slotMessage,setSlotMessage}) 
{

    const {date} = calendar;
    const renderMonths = useMemo(()=>
    {
      return date.map((month, index) => <Month key={index} calendar={calendar} date={date[index]}  slotMessage={slotMessage} setSlotMessage={setSlotMessage}/>)
    }, [])

    const [months, setMonths] = useState(renderMonths);

    const monthCarousel = useSprings(
        monthsCountForMonthCarousel,
        date.map((month, index) => ({
          transform: `translateX(${(index - displayedMonth) * 100}%)`,
          position: "absolute",
          width: "full",
          height: "full",
          top: 0,
          left: 0,
          zIndex: index === displayedMonth ? 1 : 0,
        }))
      );
    return (
        <div className="relative w-full h-full">
            {monthCarousel.map((props, index) => (
              //pb for overflow x visibility
              <animated.div key={index} className="absolute w-full h-full" style={{ ...props }}>
                {months ? months[index] : null}
              </animated.div>
            ))}
    </div>
    )
}