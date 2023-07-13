import { translateCalendarPage } from "@/locales/translate";
import TableHeader from "./TableHeader";
import TableData from "./TableData";
export default function MonthTable({month}) {
    
    

    const [yearName, monthName] = month.name.split('.').map(name => name.toLowerCase());

    const tableHeaderClassName = ' bg-red-200'

    const tables = month.weeks.map(week=>
    {
        const bannedDays = week.bannedDays;
        return (
            <table key={week.id} className="w-full h-full border-2 border-slate-700">
                <tbody>
                <TableHeader  data={week.days} bannedData={bannedDays} className={tableHeaderClassName}/>  
                    {week.time.map(time => <TableData key={time} time={time} data={week.days} bannedData={bannedDays}/>)}
                </tbody>
            </table>

        )
       
    });

    return (
        <div className="overflow-auto no-scrollbar w-full h-full">
        <h3 className="relative text-lg w-full h-7 text-center bg-accentStrongHover dark:bg-dark-accentStrongHover text-baseColor dark:text-baseColor">
            {translateCalendarPage(monthName)}
            <span className="absolute text-sm left-1 top-1">
                leftArrow
            </span>
            <span className="absolute text-sm right-1 top-1">
                rightArrow
            </span>
        </h3>
            {tables}
        </div>
    )
}
