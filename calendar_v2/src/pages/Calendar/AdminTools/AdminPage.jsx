import FloatingPanel from "@/components/containers/FloatingPanel";
import Accordion from "@/components/containers/Accordion";
import {translateCalendarPage} from "@/locales/translate"
import MonthHandler from "./MonthHandler";
import WeekHandler from './WeekHandler'
import { useState } from "react";
export default function AdminPage({calendar, setCalendar}) {
  

    const [changedCalendar, setChangedCalendar] = useState(calendar);

    const translate = (text) => translateCalendarPage("AdminTools" + "." + text)
    const days = [
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    ]

    const borderRed = 'border border-b-0 border-t-0 border-l-1 border-red-300'
    const labelClassName = `${borderRed} bg-gray-400` 
    const contentClassName = `${borderRed} bg-slate-100 `
    console.log(changedCalendar.months);
    return (
        <div className="fixed inset-0 z-20 overflow-auto">
                        <FloatingPanel className='bg-gray-500 z-20 w-[300px] h-full right-0 absolute top-0 min-w-[150px]'>
                            <h3>Ustawienia globalne</h3>
                            <h3>Ustawienia lokalne</h3>
                            {changedCalendar.months.map((month, monthIndex)=>
                            {

                               return (
                                <Accordion
                                 key={monthIndex}
                                 label={translateCalendarPage(month.name.split('.')[1].toLowerCase())}
                                 contentClassName={`${contentClassName} `}
                                 labelClassName={labelClassName}
                                 initial={true}
                                 >
                                    <MonthHandler
                                    month={month}
                                    translate={translate}
                                    days={days}
                                    index={monthIndex}
                                    labelClassName={labelClassName}
                                    calendar={changedCalendar}
                                    setCalendar={setChangedCalendar}
                                    >
                                        <Accordion
                                        initial={true}
                                        label={translate('weeksLabel')}
                                        labelClassName={`${labelClassName} ml-2`}
                                        contentClassName={`${contentClassName} ml-2`}
                                        >
                                            {month.weeks.map((week, weekIndex)=>
                                            {

                                                return (
                                                    <Accordion
                                                     key={weekIndex}
                                                     label={translate('weekLabel') + ' ' + (++weekIndex)}
                                                     labelClassName={`${labelClassName} ml-3`}
                                                     contentClassName={`${contentClassName} ml-4`}
                                                    >
                                                        <WeekHandler
                                                         weekIndex={weekIndex}
                                                         monthIndex={monthIndex}
                                                         calendar={calendar}
                                                         setCalendar={setCalendar}
                                                        >
                                                            <Accordion
                                                            key={weekIndex}
                                                            label={translate('daysLabel')}
                                                            labelClassName={`${labelClassName} ml-3`}
                                                            contentClassName={`${contentClassName} ml-4`}
                                                        >
                                                            {week.days.map((day, dayIndex)=>
                                                            {
                                                               return  <Accordion
                                                                 key={dayIndex}
                                                                 label={translateCalendarPage(day.name)}
                                                                 labelClassName={`${labelClassName} ml-3`}
                                                                 contentClassName={`${contentClassName} ml-4`}
                                                                >

                                                                </Accordion>
                                                            })}
                                                        </Accordion>
                                                        </WeekHandler>
                                                    </Accordion>
                                                )
                                            })}
                                        </Accordion>
                                    </MonthHandler>

                                 </Accordion>
                               )
                            })}
                        </FloatingPanel>
        </div>
        

    )
}
