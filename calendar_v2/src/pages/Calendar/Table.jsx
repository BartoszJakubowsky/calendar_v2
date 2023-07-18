import TableHeader from "./TableHeader";
import TableData from "./TableData";
import { translateCalendarPage } from "@/locales/translate";


export default function Table({week, websocket}) {


const {name,days, bannedDays, time} = week;

 return (
    <table className="">
        <tbody>
            <TableHeader
             rowClassName='flex flex-row'
             cellClassName='bg-accentLight dark:bg-accentLight border-2 border-slate-700'
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
                    cellClassName='bg-accentLight dark:bg-dark-accentLight border-2 border-slate-700 text-dark-baseColor dark:text-baseColor'
                    days={days}
                    bannedDays={bannedDays}  
                    time={time}
                    translate={translateCalendarPage}
                    websocket={websocket}
                  />
                )
            })}
           
        </tbody>
    </table>
 )
}
