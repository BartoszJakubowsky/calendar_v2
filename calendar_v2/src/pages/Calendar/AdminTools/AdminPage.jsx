import FloatingPanel from "@/components/containers/FloatingPanel";
import Accordion from "@/components/containers/Accordion";
import {translateCalendarPage} from "@/locales/translate"
import MonthHandler from "./MonthHandler";
import WeekHandler from './WeekHandler'
import { useState } from "react";
import DayHandler from "./DayHandler";
import ColumnHandler from './ColumnHandler';
import SlotHandler from "./SlotHandler";
import RecordHandler from './RecordHandler';
export default function AdminPage({calendar, setCalendar}) {
  

    const [changedCalendar, setChangedCalendar] = useState(calendar);

    const translate = (text) => translateCalendarPage("AdminTools" + "." + text)
    const days = [
        "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"
    ]

    const fixDate = (date) => date.split('T')[0].split('-').reverse().join("-");
    console.log(changedCalendar.months[0]);
    const labelClassName = `bg-slate-300` 
    const contentClassName = `bg-slate-200`
    return (
        <div className="fixed inset-0 z-20 overflow-auto">
                        <FloatingPanel className='bg-gray-500 z-20 w-[300px] h-full right-0 absolute top-0 min-w-[150px]'>
                            <h3>Ustawienia globalne</h3>
                            <h3>Ustawienia lokalne</h3>

                            {/* Month */}
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
                                            {/* Weeks */}
                                            {month.weeks.map((week, weekIndex)=>
                                            {
                                                const dayFrom= fixDate(week.days[0].date);
                                                const dayTo = week.days.length > 1? fixDate(week.days[week.days.length-1].date) : false;

                                                const dayFromTo = dayTo? dayFrom + " : " + dayTo : dayFrom; 
                                                return (
                                                    <Accordion
                                                     key={weekIndex}
                                                     label={translate('weekLabel') + ' ' + dayFromTo}
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
                                                            initial={true}
                                                            labelClassName={`${labelClassName}`}
                                                            contentClassName={`${contentClassName}`}
                                                            >
                                                            {/* days */}
                                                            {week.days.map((day, dayIndex)=>
                                                            {
                                                                const date = fixDate(day.date)
                                                                return <Accordion
                                                                    key={dayIndex}
                                                                    label={translateCalendarPage(day.name) + ' ' + date}
                                                                    labelClassName={`${labelClassName} ml-3`}
                                                                    contentClassName={`${contentClassName} ml-4`}
                                                                    >
                                                                    <DayHandler
                                                                     day={day}
                                                                     monthIndex={monthIndex}
                                                                     weekIndex={weekIndex}
                                                                     dayIndex={dayIndex}
                                                                     calendar={calendar}
                                                                     setCalendar={setCalendar}
                                                                    >
                                                                    {day.columns.map((column, columnIndex)=>
                                                                    {
                                                                        return  <Accordion
                                                                        key={columnIndex}
                                                                        label={column.name}
                                                                        labelClassName={`${labelClassName} ml-3`}
                                                                        contentClassName={`${contentClassName} ml-4`}
                                                                        >
                                                                            <ColumnHandler
                                                                             column={column}
                                                                             columnIndex={columnIndex}
                                                                             monthIndex={monthIndex}
                                                                             weekIndex={weekIndex}
                                                                             dayIndex={dayIndex}
                                                                             calendar={calendar}
                                                                             setCalendar={setCalendar}
                                                                            >
                                                                            {column.slots.map((slot, slotIndex)=>
                                                                            {
                                                                                return  <Accordion
                                                                                key={slotIndex}
                                                                                label={translate('slotLabel') + " " + week.time[slotIndex]}
                                                                                labelClassName={`${labelClassName} ml-3`}
                                                                                contentClassName={`${contentClassName} ml-4`}
                                                                                >
                                                                                <SlotHandler
                                                                                  slot={slot}
                                                                                  slotIndex={slotIndex}
                                                                                  columnIndex={columnIndex}
                                                                                  monthIndex={monthIndex}
                                                                                  weekIndex={weekIndex}
                                                                                  dayIndex={dayIndex}
                                                                                  calendar={calendar}
                                                                                >
                                                                                    {slot.records.map((record, recordIndex)=>
                                                                                    {
                                                                                        return  <Accordion
                                                                                        key={recordIndex}
                                                                                        label={translate('recordLabel') + ": " + record.data}
                                                                                        labelClassName={`${labelClassName} ml-3`}
                                                                                        contentClassName={`${contentClassName} ml-4`}
                                                                                        >
                                                                                            <RecordHandler
                                                                                              record={record}
                                                                                              recordIndex={recordIndex}
                                                                                              slotIndex={slotIndex}
                                                                                              columnIndex={columnIndex}
                                                                                              monthIndex={monthIndex}
                                                                                              weekIndex={weekIndex}
                                                                                              dayIndex={dayIndex}
                                                                                              calendar={calendar}
                                                                                            />
                                                                                        </Accordion>
                                                                                    })}
                                                                                </SlotHandler>
                                                                                </Accordion>
                                                                            })}
                                                                            </ColumnHandler>
                                                                        </Accordion>
                                                                    })}
                                                                    </DayHandler>
                                                                
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
