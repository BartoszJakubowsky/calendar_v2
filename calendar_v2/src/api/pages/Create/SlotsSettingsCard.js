import {useState } from "react";
import useCalendars from "../../hooks/useCalendars";
import Input from './Input';
import Close from '../../components/ui/Close';

let showRemoveButton;

export default function SlotsSettingsCard({name, space ,order, close, onChange, protectedSettings}) 
{


    const [slotName, setSlotName] = useState(name || '');
    const [slotNameError, setSlotNameError] = useState(false);

    const [slotSpace, setSlotSpace] = useState(space || 1);

    const [slotOrder, setSlotOrder] = useState(order || 1);
    const [slotOrderError, setSlotOrderError] = useState(false);

        if (name === slotName && space === slotSpace && order === slotOrder)
            showRemoveButton = true

        else if (name === '' && space === 1 && order === 1)
            showRemoveButton = false;
        else 
            showRemoveButton = false;


    const handleNameChange = event => {setSlotName(event.target.value); if (slotNameError) handleSlotNameError(false)}
    const handleSlotOrder = event => {setSlotOrder(event.target.value); if (slotOrderError) handleSlotOrderError(false)}


    const handleSlotNameError = (boolean) => setSlotNameError(boolean);
    const handleSlotOrderError = (boolean) => setSlotOrderError(boolean);

    const handleCloseClick = () => close(false);

    const handleSpaceChange = event => 
    {
        const slotNumber = event.target.value;
        if (slotNumber > 6 || slotNumber === 0)
            return
        else
            setSlotSpace(slotNumber);
    }
    const handleAddClick = event => 
    {
        event.preventDefault();

        let nameFlag = false;
        let orderFlag = false

        if (protectedSettings.some(item => item.slotName === slotName) || slotName === '')
            nameFlag = true;

        if (protectedSettings.some(item => item.slotOrder === slotOrder))
            orderFlag = true;

        if (nameFlag && orderFlag)
        {
            handleSlotNameError(true);
            handleSlotOrderError(true);
        } 
        else if (nameFlag)
            handleSlotNameError(true);
        else if (orderFlag)
            handleSlotOrderError(true);


        if (nameFlag || orderFlag )
            return;
            
        onChange({name: slotName, space: slotSpace, order: slotOrder});
        handleCloseClick()
    };
    const handleRemoveClick = event => 
    {
        event.preventDefault();
        onChange(false);
        handleCloseClick();
    }


    return (
        <div className="  bg-transparent absolute w-full h-full">
            <div className="bg-white md:w-96 w-5/6 h-fit mx-auto mt-24 border-2 border-black relative flex flex-col">
                <h3
                className=" bg-pink-200 py-2 uppercase font-semibold  mb-2 pl-2"
                >Dodatkowe ustawienia wózka
                <Close onClick={handleCloseClick}/>
                    
                </h3>
                <label className={`mx-2 duration-75  ${slotNameError? 'valid text-red-300' : 'text-normal'}`}>Nazwa dodatkowej opcji</label>
                <Input 
                className=" mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out "
                calendarName={slotName} 
                handleNameChange={handleNameChange}/>
                <label className="mx-2">Ilość miejsc</label>
                <input 
                type='number' 
                value={slotSpace} 
                onChange={handleSpaceChange}
                className='mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out'
                ></input>
                <label className={`mx-2 ${slotOrderError? 'valid text-red-300' : 'text-normal'}`}>Kolejność</label>
                <input 
                type='number' 
                value={slotOrder} 
                onChange={handleSlotOrder}
                className='mx-2 my-2 rounded-md box-border h-10 border-2 border-opacity-100 hover:border-gray-400 duration-300 ease-in-out'
                ></input>
                <div className="flex justify-center [&>button]:mx-1 my-2">
                <button 
                className="w-20 rounded-md border-sky-500  border-2 
                            hover:text-white hover:bg-sky-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleAddClick}>{name && space && order !== false? "Zmień" : "Dodaj"}</button>
                {showRemoveButton && <button 
                className="w-20 rounded-md border-red-400  border-2 
                            hover:text-white hover:bg-red-500 transition ease-linear duration-150 hover:font-semibold" 
                            onClick={handleRemoveClick}>Usuń</button>}
                </div>
            </div>
        </div>
    )
}