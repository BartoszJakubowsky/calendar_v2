import FloatingPanel from "@/components/containers/FloatingPanel";
import { translateCalendarPage } from "@/locales/translate";
import MonthHandler from "./MonthHandler";
import WeekHandler from "./WeekHandler";
import { useState } from "react";
import DayHandler from "./DayHandler";
import ColumnHandler from "./ColumnHandler";
import SlotHandler from "./SlotHandler";
import RecordHandler from "./RecordHandler";
import Modal from '@/components/ui/Modal'
import {updateCalendar} from '@/api/admin/adminApi';
import AnimatedContainer from "@/components/containers/AnimatedContainer";
import MainSettingsHandler from './MainSettingsHandler'
import LoadingMessage from '@/components/ui/LoadingMessage';

export default function AdminPage({ calendar, setCalendar, turnOffConservation }) {

  const [calendarBackup, setCalednarBackup] = useState(calendar);
  const [isFetching, setIsFetching] = useState(false);

  const [isOpenModalLeave, setOpenModalLeave] = useState(false);
  const [isOpenModalSave, setOpenModalSave] = useState(false);
  const [isOpenModalApiTrue, setOpenModalApiTrue] = useState(false);
  const [isOpenModalApiFalse, setOpenModalApiFalse] = useState(false);

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
  const fixDate = (date) => {
    // return date
    return date.split("T")[0].split("-").reverse().join("-");
  }

  const handleLeave = () => {
    setCalendar(calendarBackup);
    turnOffConservation();
  }
  const handleSave = () => {
    setIsFetching(true);
    
    updateCalendar(calendar._id, calendar).then(response => {
     
     
      setTimeout(() => {
        setIsFetching(false);

        if (response)
          setOpenModalApiTrue(true);
        else
          setOpenModalApiFalse(true);
     }, 1000);
      
    })
  }
  const handleLeaveClick = () => {
    setOpenModalLeave(true)
  }
  const handleSaveClick = () => {
    setOpenModalSave(true);
  }

  
  return (
    <>
    <Modal
    modalText={translate('modalLeave')}
    buttonText={translate('modalButtonLeave')}
    onClick={handleLeave}
    isOpen={isOpenModalLeave}
    setIsOpen={setOpenModalLeave}
    onlyButton={false}
    />
    <Modal
    modalText={translate('modalSave')}
    buttonText={translate('modalButtonSave')}
    onClick={handleSave}
    isOpen={isOpenModalSave}
    setIsOpen={setOpenModalSave}
    onlyButton={false}
    />
    <Modal
    modalText={translate('modalApiTrue')}
    buttonText={translate('modalButtonApiTrue')}
    onClick={turnOffConservation}
    isOpen={isOpenModalApiTrue}
    setIsOpen={setOpenModalApiTrue}
    />
    <Modal
    modalText={translate('modalApiFalse')}
    buttonText={translate('modalButtonApiFalse')}
    isOpen={isOpenModalApiFalse}
    setIsOpen={setOpenModalApiFalse}
    onlyButton={false}
    />
    {isFetching && 
     <AnimatedContainer className={'backdrop-blur-sm z-50 flex justify-center items-center'} animation={'opacityVariant'}>
      <LoadingMessage message={translate('loadingApi')} theme={'text-accentStrong dark:text-dark-accentStrong'} className={'w-fit h-fit'}/>
    </AnimatedContainer>
    }
    <AnimatedContainer className="fixed inset-0 z-20 overflow-auto" animation={'xSwipeVariant'}>
      <FloatingPanel className="bg-accentMedium dark:bg-dark-accentMedium p-2 z-20 w-10/12 md:w-[400px] overflow-x-hidden h-full max-w-full right-0 absolute top-0 min-w-[30px]  flex-wrap items-start flex-col">

    <div className="md:min-w-[400px] min-w-[300px]">
    <div className="flex">
        <button className="option-off p-2 rounded-sm border-2 border-accentLight dark:border-dark-accentLight my-2" 
        onClick={handleSaveClick}>
          {translate('buttonSave')}
        </button>
        <button 
        className="button-form-reject ml-1 !text-black p-2 rounded-sm border-2 border-accentLight dark:border-dark-accentLight my-2" 
        onClick={handleLeaveClick}>{translate('buttonLeave')}
        </button>
      </div>


        <div className=" w-full flex-row flex-wrap ">
          {/* Month */}

          <MainSettingsHandler
          translate={translate}
          calendar={calendar}
          setCalendar={setCalendar}
          />

          {calendar.months.map((month, monthIndex) => {
            return (
              <MonthHandler
                key={monthIndex}
                month={month}
                translate={translate}
                days={days}
                monthIndex={monthIndex}
                calendar={calendar}
                setCalendar={setCalendar}
              >
                {month.weeks.map((week, weekIndex) => {
                  return (
                    <WeekHandler
                      key={weekIndex}
                      week={week}
                      weekIndex={weekIndex}
                      monthIndex={monthIndex}
                      calendar={calendar}
                      setCalendar={setCalendar}
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
                            calendar={calendar}
                            setCalendar={setCalendar}
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
                                    calendar={calendar}
                                    setCalendar={setCalendar}
                                    translate={translate}
                                    columns={day.columns.map(column => column.name)}
                                  >
                                    {column.slots.map((slot, slotIndex) => {
                                      return (
                                          <SlotHandler
                                            key={slotIndex}
                                            slot={slot}
                                            slotIndex={slotIndex}
                                            columnIndex={columnIndex}
                                            monthIndex={monthIndex}
                                            weekIndex={weekIndex}
                                            dayIndex={dayIndex}
                                            calendar={calendar}
                                            setCalendar={setCalendar}
                                            translate={translate}
                                          >
                                            {slot.records.map(
                                              (record, recordIndex) => {
                                                return (
                                                    <RecordHandler
                                                      key={recordIndex}
                                                      record={record}
                                                      recordIndex={recordIndex}
                                                      slotIndex={slotIndex}
                                                      columnIndex={columnIndex}
                                                      monthIndex={monthIndex}
                                                      weekIndex={weekIndex}
                                                      dayIndex={dayIndex}
                                                      calendar={calendar}
                                                      setCalendar={
                                                        setCalendar
                                                      }
                                                      translate={translate}
                                                    />
                                                );
                                              }
                                            )}
                                          </SlotHandler>
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
        </div>
      </FloatingPanel>
    </AnimatedContainer>
    </>
  );
}
