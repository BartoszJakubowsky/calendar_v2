import Close from "../../../components/ui/Close";
export default function MenageCalendarMessageSettings({handleSetSlotMessage, closeModal, dayDate, setDisplayedFrom, calendar}) 
{

    const slotMessages = calendar.slotMessages;
    const handleCloseClick = () =>
    {
        closeModal(false);
    }


     return (
        <div className="h-full w-full flex flex-col">
            <h3
            className=" bg-violet-200 py-2 uppercase font-semibold  mb-2 pl-2 w-full"
            >{'Wiadomości w dniu: '} {dayDate}
            <Close onClick={handleCloseClick}/>
            </h3>
        
        <div className="flex flex-wrap justify-center h-full overflow-auto">
            {slotMessages.map((slotMessage, index)=>
            {
                
                if (slotMessage.dayDate === dayDate)
                return <button key={index} onClick={()=>handleSetSlotMessage(slotMessage)} className="bg-gray-400 w-24 overflow-hidden h-24 p-2 cursor-pointer active:scale-110 duration-150 m-2">{slotMessage.thisSlotMessage}</button>
                else
                return false;

            })}
        </div>
    <div className=" flex justify-center h-fit w-full  ml-auto mr-auto sticky bottom-0 bg-white">
    <button onClick={()=>handleSetSlotMessage(false)} 
            className="self-end mb-2 rounded-md border-sky-500 h-12 w-fit  border-2 mx-1 hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold"
            >Dodaj nową wiadomość</button>
    </div>
    </div>
     )
};
