
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSprings, animated } from 'react-spring';
import useMobileDevice from '../../../hooks/useMobileDevice';
import Day from './Day';
import Time from './Time';
import MobileMenu from './menuComponents/MobileMenu';

export default function Week({ allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth, time }) 
{
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const isMobile = useMobileDevice();


  //useEffect for triggering isMobileDevice
  
  useEffect(() => {
    function handleResize() 
    {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [displayedWeek, setDisplayedWeek] = useState(0); 
  const [displayedDays, setDisplayedDays] = useState(0); 
  const [prevScrollTop, setPrevScrollTop] = useState(0);

  const weeksCount = allWeeksInMonth.length;
  const daysCount  = allDaysLeftInMonth.length
    const scrollWeeks = useSprings(
      weeksCount,
      allWeeksInMonth.map((month, index) => ({
        transform: `translateY(${(index - displayedWeek) * 100}%)`,
        position: "absolute",
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        zIndex: index === displayedWeek ? 1 : 0
      }))
    );


    const scrollDays = useSprings(
      daysCount,
      allWeeksInMonth.map((day, index) => ({
        transform: `translateY(${(index - displayedDays) * 100}%)`,
        position: "absolute",
        width: "full",
        height: "full",
        top: 0,
        left: 0,
        zIndex: index === displayedDays ? 1 : 0
      }))
    );


    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      console.log('działą?');
      //down
      if (scrollTop < prevScrollTop) 
      {
        if (isMobile)
         handleDaysPrevScroll();
        else
         handleWeekPrevScroll();
      //up
      } else if (scrollTop > prevScrollTop) 
      {
        if (isMobile)
          handleDaysNextScroll();
        else
          handleWeekNextScroll();
      }
  
      setPrevScrollTop(scrollTop);
    };
  
    const handleWeekPrevScroll = () => {
      setDisplayedWeek((displayedWeek - 1 + weeksCount) % weeksCount);
    };
  
    const handleWeekNextScroll = () => {
      setDisplayedWeek((displayedWeek + 1) % weeksCount);
    };
  

    const handleDaysPrevScroll = () => {
      setDisplayedDays((displayedDays - 1 + daysCount) % daysCount);
    };
  
    const handleDaysNextScroll = () => {
      setDisplayedDays((displayedDays + 1) % daysCount);
    };




  const weekClassName = classNames('w-full h-screen relative')
  // if (isMobile)
  // return (
  //   <div className={weekClassName} onScroll={handleScroll}>
  //    {scrollDays.map((props, index) =>
  //    {
  //     <animated.section key={index} className=' absolute w-full h-screen flex' style={{...props}}>
  //     <Time time={time}/>
  //           {/* check if array from object is empty (if object is === {})   */}
  //     <Day 
  //       className=''
  //       day={allDaysLeftInMonth[index]} 
  //       isActive={(Object.keys(allDaysLeftInMonth[index]).length === 0 ? false :true)}/>
  //     </animated.section>
  //    })}
  //   </div>
  // )
  // else
  return(
    <div className={weekClassName} onScroll={handleScroll}>
    {scrollWeeks.map((props, index) =>
    {
      console.log(index);
      <animated.section key={index} className='absolute w-full h-screen flex' style={{...props}}>
      <Time time={time}/>
            {/* check if array from object is empty (if object is === {})   */}
            <div className='flex felx-row w-full h-full'>
            {allWeeksInMonth[index].map((day, dayIndex) => 
            {
              return (
              <Day key={day.date} className='' day={day} isActive={!!(allWeeksLeftInMonth[index]?.[dayIndex])}/>
              )
            })}
            </div>
      </animated.section>
    })}
    </div>
  )

}
    