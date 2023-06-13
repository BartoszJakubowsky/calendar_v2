import SlotSettingsCard from './SlotsSettingsCard';
import {HiPlus as AddOptionIcon} from 'react-icons/hi';



export default function Slots({slotCard, onChange, slots}) 
{
    //in the future addidiotn settings with permisision

    const protectedSettings = slots.map(slot =>
        {
            const slotName = slot.name;
            const slotOrder = slot.order;

            return {slotName, slotOrder};
        });


    const handleCreateClick = event =>
    {
        event.preventDefault();
        slotCard(<SlotSettingsCard close={slotCard} onChange={onChange} protectedSettings={protectedSettings}/>)
    }


   
    return (
            <button 
                onClick={handleCreateClick} 
                className='h-10 w-10 flex items-center justify-center text-cyan-900 hover:text-cyan-600 active:scale-110 duration-150 cursor-pointer text-lg ease-out'
            ><AddOptionIcon/></button>
    )    
}