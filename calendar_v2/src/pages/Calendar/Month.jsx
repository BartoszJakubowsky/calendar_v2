import { translateCalendarPage } from "@/locales/translate";
import Table from "./Table";
import Message from "./Message";
export default function MonthTable({month, swipe, setSwipe, maxIndex, calendarId}) {
    
    

    const [yearName, monthName] = month.name.split('.').map(name => name.toLowerCase());
    const message = month.messages.map((message, index) => <Message key={index} message={message}/>)
  
    const handleSwipeLeft = () => 
    {
        setSwipe(swipe-1);
    }

    const handleSwipeRight = () => 
    {
        setSwipe(swipe+1);
    }
    const weeks = month.weeks.map((week, index)=>
    {
        return (
            <Table key={index} week={week} calendarId = {calendarId}/>
        )
       
    });

    return (
        <div className="overflow-hidden w-full h-full border-2 border-slate-700 relative">
            {message}
        <h3 className="relative text-lg w-full md:h-[4%] h-[5%] text-center bg-accentStrongHover dark:bg-dark-accentStrongHover text-baseColor dark:text-baseColor">
            {translateCalendarPage(monthName)}
            <button onClick={handleSwipeLeft} className={`absolute text-sm left-1 top-1 transition-all duration-200 ${swipe === 0 ? ' opacity-50 pointer-events-none' : ''}`}>
                {translateCalendarPage('previousMonth')}
            </button>
            <button onClick={handleSwipeRight} className={`absolute text-sm right-1 top-1 transition-all duration-200 ${swipe === maxIndex? 'opacity-50 pointer-events-none':''}`}>
                {translateCalendarPage('nextMonth')}
            </button>
        </h3>
        <div className="flex flex-wrap flex-col md:h-[96%] h-[95%] w-full overflow-auto touch-auto bg-red-300">
            {weeks}
        </div>
        </div>
    )
}
