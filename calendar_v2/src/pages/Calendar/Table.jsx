import TableHeader from "./TableHeader";
import TableData from "./TableData";
import Message from './Message';

import { translateCalendarPage } from "@/locales/translate";


export default function Table({week, calendarId}) {

const {days, bannedDays, time, messages, erase} = week;

if (erase)
    return false;


 return (
    <table className="relative">
        {messages.length > 0 && <Message message={messages[0]}/>}
        <tbody>
            <TableHeader
             rowClassName='flex flex-row'
             cellClassName='bg-accentLight dark:bg-accentLight border-2 border-slate-700'
             days={days}
             bannedData={bannedDays}
             additionalFirstCol={'time'}
             translate={translateCalendarPage}
            />
            
            {time.map((singleTime, index)=>
            {
            return (
                <TableData
                key={singleTime}
                index={index}
                rowClassName='flex flex-row'
                cellClassName='bg-accentLight dark:bg-dark-accentLight border-2 border-slate-700 text-dark-baseColor dark:text-baseColor'
                days={days}
                bannedDays={bannedDays}  
                time={singleTime}
                translate={translateCalendarPage}
                calendarId = {calendarId}
                weekMessage={messages.length > 0}
                />
                )
            })}
           
        </tbody>
    </table>
 )
}
