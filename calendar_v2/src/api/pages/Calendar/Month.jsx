
import classNames from "classnames";
import Week from "./Week";

export default function Month({calendar, date,  slotMessage, setSlotMessage}) 
{

  console.log(calendar);

    const className = classNames('');
    const thisYear = new Date().getFullYear();

    const [month, year] = date.split('.');
    const MONTHS = ['STYCZEŃ', 'LUTY', 'MARZEC', 'KWIECIEŃ', 'MAJ', 'CZERWIEC', 'LIPIEC', 'SIERPIEŃ', 'WRZESIEŃ', 'PAŹDZIERNIK', 'LISTOPAD', 'GRUDZIEŃ'];
    const DAYS_OF_WEEK = ['NIEDZIELA', 'PONIEDZIAŁEK', 'WTOREK', 'ŚRODA', 'CZWARTEK', 'PIĄTEK', 'SOBOTA'];
    function getDaysAndWeeksInMonth(dateStr) {
      const [monthStr, yearStr] = dateStr.split('.');
      const month = MONTHS.indexOf(monthStr.toUpperCase());
      const year = parseInt(yearStr, 10);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const currentDate = new Date();
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();
      const currentDay = currentDate.getDate();
      const firstDayOfMonth = new Date(year, month, 1).getDay();
      const allDaysInMonth = [];
      const allDaysLeftInMonth = [];
      const allWeeksInMonth = [];
      const allWeeksLeftInMonth = [];
    
      //days
      for (let i = 1; i <= daysInMonth; i++) 
      {
        const date = new Date(year, month, i);
        const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
        const day = 
        {
          day: dayOfWeek,
          date: date
        };

        if (calendar.bannedDays.includes(day.day))
          continue;

        allDaysInMonth.push(day)
        currentDate.setHours(0, 0, 0, 0);
        if (date.getTime() >= currentDate.getTime()) 
          allDaysLeftInMonth.push(day);
        else
          allDaysLeftInMonth.push(false)
      }
    
      let currentWeek = [];
      let currentWeekLeft = [];

      //weeks
      for (let i = 1; i <= daysInMonth; i++) 
      {
        const date = new Date(year, month, i);
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 1) 
        {
          allWeeksInMonth.push(currentWeek);
          allWeeksLeftInMonth.push(currentWeekLeft);
          currentWeek = [];
          currentWeekLeft = [];
        }
        const day = 
        {
          day: DAYS_OF_WEEK[dayOfWeek],
          date: date
        };

        if (calendar.bannedDays.includes(day.day))
          continue;

        currentWeek.push(day);
        currentDate.setHours(0, 0, 0, 0);
        if (date.getTime() >= currentDate.getTime()) 
        {
          currentWeekLeft.push(day);
        }
      }
        allWeeksInMonth.push(currentWeek);
        allWeeksLeftInMonth.push(currentWeek);

      return {
        allDaysInMonth: allDaysInMonth,
        allDaysLeftInMonth: allDaysLeftInMonth,
        allWeeksInMonth: allWeeksInMonth.filter(subarray => subarray.length > 0),
        allWeeksLeftInMonth: allWeeksLeftInMonth.filter(subarray => subarray.length > 0),
      };
    }


    const {allDaysInMonth, allDaysLeftInMonth, allWeeksInMonth, allWeeksLeftInMonth} = getDaysAndWeeksInMonth(date);

    if (allWeeksLeftInMonth.length === 0)
      return (
        <div className={`w-full h-full flex justify-center items-start mt-[10%] text-sm md:text-base underline pointer-events-none`}>
          <h3>Brak miesięcy do wyświetlenia</h3>
        </div>
      );

    return (
        <div className={`w-full h-full`}>
          {/* if padding will ever change remember to change padding in animated.div in MonthCarosuel to see the overflow x */}
          <h3 className="flex justify-center items-center p-2 border-b-2 border-black font-semibold sticky top-10 bg-gray-100">
            {date}
          </h3>

          <div className="w-full h-[calc(100%_-_4.60rem)]">
          <Week 
            allDaysInMonth={allDaysInMonth} 
            allDaysLeftInMonth={allDaysLeftInMonth} 
            allWeeksInMonth={allWeeksInMonth} 
            allWeeksLeftInMonth={allWeeksLeftInMonth} 
            calendar={calendar}
            date={date}
            slotMessage={slotMessage}
            setSlotMessage={setSlotMessage}
            />
            </div>
        </div>
    )

}