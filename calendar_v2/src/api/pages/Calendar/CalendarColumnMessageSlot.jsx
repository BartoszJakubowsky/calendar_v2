
export default function CalendarColumnMessageSlot({slotMessage, time}) 
{


    const {thisSlotMessage : message,  selectedGroups : groups, dayDate : date} = slotMessage;


    return(
        <div className="w-full h-full absolute z-[1] bg-red-300 border-[1px] border-gray-400 flex justify-center items-center break-words cursor-default ">
            <p>{message}</p>
        </div>
    )
};
