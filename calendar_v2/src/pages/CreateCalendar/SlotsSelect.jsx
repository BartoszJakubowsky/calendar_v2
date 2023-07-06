import Label from "@/components/forms/Label";


export default function SlotsSelect({slots, slotsError, setSlotsError, labelText, addSlotText, setFormSlot, setIsOpen}) {
    

    const handleClick = (slot) => 
    {
        if (slotsError)
            setSlotsError(false);

            setFormSlot(slot);
            setIsOpen(true);

    }

    const slotClassName = 'text-xs flex justify-center items-center flex-wrap h-16 w-16 rounded-sm text-baseColor cursor-pointer overflow-hidden'
    return (
        <div className=" flex flex-col ">
            <Label error={slotsError} text={labelText}/>
            <ul className=" min-h-[5rem] flex gap-2 flex-row">
                <button onClick={()=>handleClick(false)} key={'createSlot'} className={`option-on ${slotClassName}`}>
                    <span className=" text-center -mt-1 px-1">
                        {addSlotText}
                    </span>
                </button>
                {slots.map(slot => <button key={slot.name} className={`option-off text-dark-baseColor dark:text-baseColor ${slotClassName}`} onClick={()=> handleClick(slot)}>{slot.name}</button>)}
            </ul>
        </div>
    )
}
