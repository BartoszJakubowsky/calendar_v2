import { translateCalendarPage } from "@/locales/translate";
import Table from "./Table";
export default function MonthTable({month}) {
    
    

    const [yearName, monthName] = month.name.split('.').map(name => name.toLowerCase());

  

    const weeks = month.weeks.map((week, index)=>
    {
        return (
            <Table key={index} week={week}/>
        )
       
    });

    return (
        <div className="overflow-hidden w-full h-full border-2 border-slate-700">
        <h3 className="relative text-lg w-full md:h-[4%] h-[5%] text-center bg-accentStrongHover dark:bg-dark-accentStrongHover text-baseColor dark:text-baseColor">
            {translateCalendarPage(monthName)}
            <span className="absolute text-sm left-1 top-1">
                leftArrow
            </span>
            <span className="absolute text-sm right-1 top-1">
                rightArrow
            </span>
        </h3>
        <div className="flex flex-wrap flex-col md:h-[96%] h-[95%] w-full overflow-auto touch-auto bg-red-300">
            {weeks}
        </div>
        </div>
    )
}
