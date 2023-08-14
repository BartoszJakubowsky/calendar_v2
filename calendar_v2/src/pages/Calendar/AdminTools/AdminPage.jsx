import FloatingPanel from "@/components/containers/FloatingPanel";
import Accordion from "@/components/containers/Accordion";
import { translateCalendarPage } from "@/locales/translate";
import MonthHandler from "./MonthHandler";
import WeekHandler from "./WeekHandler";
import { useState } from "react";
import DayHandler from "./DayHandler";
import ColumnHandler from "./ColumnHandler";
import SlotHandler from "./SlotHandler";
import RecordHandler from "./RecordHandler";
export default function AdminPage({ calendar, setCalendar, turnOfConservation }) {
  const [changedCalendar, setChangedCalendar] = useState(calendar);

  const translate = (text) => translateCalendarPage("AdminTools" + "." + text);
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const fixDate = (date) => date.split("T")[0].split("-").reverse().join("-");
  const labelClassName = `bg-slate-300`;
  const contentClassName = `bg-slate-200`;
  return (
    <div className="fixed inset-0 z-20 overflow-auto">
      <FloatingPanel className="bg-accentMedium dark:bg-dark-accentMedium p-2 z-20 w-[400px] overflow-x-hidden h-full right-0 absolute top-0 min-w-[150px]  flex-wrap items-start flex-col">
        <h3 className="h-fit w-full">Ustawienia globalne</h3>
        <button onClick={()=>turnOfConservation()}>off</button>
        <h3 className="text-lg rounded-sm bg-accentLight dark:bg-dark-accentLight border-b-2  border-accentMedium dark:border-dark-accentMedium w-full h-fit">
          {translate("localSettings")}
        </h3>

        <div className=" w-full flex-row flex-wrap ">
          {/* Month */}
          {changedCalendar.months.map((month, monthIndex) => {
            return (
              <MonthHandler
                key={monthIndex}
                month={month}
                translate={translate}
                days={days}
                monthIndex={monthIndex}
                calendar={changedCalendar}
                setCalendar={setChangedCalendar}
              >
                {month.weeks.map((week, weekIndex) => {
                  return (
                    <WeekHandler
                      key={weekIndex}
                      week={week}
                      weekIndex={weekIndex}
                      monthIndex={monthIndex}
                      calendar={changedCalendar}
                      setCalendar={setChangedCalendar}
                      translate={translate}
                      fixDate={fixDate}
                      days={days}
                    >
                      {/* days */}
                      {week.days.map((day, dayIndex) => {
                        const date = fixDate(day.date);
                        return (
                          <DayHandler
                            key={dayIndex}
                            day={day}
                            monthIndex={monthIndex}
                            weekIndex={weekIndex}
                            dayIndex={dayIndex}
                            calendar={changedCalendar}
                            setCalendar={setChangedCalendar}
                            translate={translate}
                            date={date}
                            time={week.time}
                          >
                            {day.columns.map((column, columnIndex) => {
                              return (
                                  <ColumnHandler
                                    key={columnIndex}
                                    column={column}
                                    columnIndex={columnIndex}
                                    monthIndex={monthIndex}
                                    weekIndex={weekIndex}
                                    dayIndex={dayIndex}
                                    calendar={changedCalendar}
                                    setCalendar={setChangedCalendar}
                                    translate={translate}
                                    columns={day.columns.map(column => column.name)}
                                  >
                                    {column.slots.map((slot, slotIndex) => {
                                      return (
                                        <Accordion
                                          key={slotIndex}
                                          label={
                                            translate("slotLabel") +
                                            " " +
                                            week.time[slotIndex]
                                          }
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
                                            calendar={changedCalendar}
                                            setCalendar={setChangedCalendar}
                                          >
                                            {slot.records.map(
                                              (record, recordIndex) => {
                                                return (
                                                  <Accordion
                                                    key={recordIndex}
                                                    label={
                                                      translate("recordLabel") +
                                                      ": " +
                                                      record.data
                                                    }
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
                                                      calendar={changedCalendar}
                                                      setCalendar={
                                                        setChangedCalendar
                                                      }
                                                    />
                                                  </Accordion>
                                                );
                                              }
                                            )}
                                          </SlotHandler>
                                        </Accordion>
                                      );
                                    })}
                                  </ColumnHandler>
                              );
                            })}
                          </DayHandler>
                        );
                      })}
                    </WeekHandler>
                  );
                })}
              </MonthHandler>
            );
          })}
        </div>
      </FloatingPanel>
    </div>
  );
}
