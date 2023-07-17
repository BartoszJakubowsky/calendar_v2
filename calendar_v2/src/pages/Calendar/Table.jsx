import TableHeader from "./TableHeader";
import TableData from "./TableData";
import { translateCalendarPage } from "@/locales/translate";


export default function Table({week}) {


const {name,days, bannedDays, time} = week;

 return (
    <table className="h-full w-full">
        <tbody>
            <TableHeader
             rowClassName='h-12 w-full flex flex-row'
             cellClassName='bg-accentLight dark:bg-accentLight border-2 border-slate-700 flex flex-col grow  '
             data={days}
             bannedData={bannedDays}
             additionalFirstCol={'time'}
             translate={translateCalendarPage}
            />
            
            {time.map(time=>
            {
                return (
                    <TableData
                    key={time}
                    rowClassName='flex flex-row'
                    cellClassName='bg-accentLight dark:bg-accentLight border-2 border-slate-700 '
                    days={days}
                    bannedDays={bannedDays}  
                    time={time}
                    translate={translateCalendarPage}
                  />
                )
            })}
           
        </tbody>
    </table>
 )
}
