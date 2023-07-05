import SliderContainer from '@/components/containers/SliderContainer';
import FormContainer from '@/components/forms/FormContainer';
import FormHeader from '@/components/forms/FormHeader';
import LabelInput from "@/components/forms/LabelInput";
import FormButton from "@/components/forms/FormButton";
import { useEffect, useState } from 'react';

export default function SlotsForm({formSlot, slots, setSlots, translate, isOpen, setIsOpen}) {
    

    const translateText = (text) => translate('SlotsForm' + '.' + text);
    const headerText = formSlot === false ? translateText('header-create') : translateText('header-edit');
    

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [space, setSpace] = useState(1);


    useEffect(()=>
    {
        if(!formSlot)
        {
            setName('');
            setSpace(1);
        }
        else
        {
            setName(formSlot.name);
            setSpace(formSlot.space);
        }
        
            
        
    },[formSlot]);

    const handleSpaceChange = (number) =>
    {
        if (number < 1 || number >3)
            return
        
            setSpace(number);
    }
    const handleSave = () => {
        if(name.length <3)
        {
            setNameError(true);
            return
        }

        if (formSlot)
        {
            setSlots(slots.map(slot=> 
                {
                    if (slot.name === formSlot.name)
                        return {...slot, name, space}
                    else
                        return slot;
                }))
        }
        else
        setSlots([...slots, {name, space}]);


        setIsOpen(false);
    }

    const handleDelete = () =>
    {
        setSlots(slots.map(slot=> 
            {
                if (slot.name !== formSlot.name)
                    return slot
            }))
        setIsOpen(false);

    }

    return (
        <SliderContainer isOpen={isOpen} className='background z-10 ease-in'>
            <FormContainer className='h-full w-full'>
                <FormHeader text={headerText}/>
                <h3 onClick={()=>setIsOpen(false)} className=' text-center custom-text-accentStrong cursor-pointer '>{translateText('back')}</h3>
                
                <LabelInput
                 inputContainerClassName={"mb-2 mt-2"}
                 inputType='text' 
                 value={name}
                 setValue={setName}
                 setError={setNameError}
                 error={nameError}
                 labelText={translateText('nameLabel')}
                />

                <LabelInput
                 inputClassName={'w-[4rem]'}
                 inputType='number' 
                 value={space}
                 setValue={handleSpaceChange}
                 labelText={translateText('spaceLabel')}
                />
                <FormButton onClick={handleSave} className='absolute bottom-6 left-1/2 transform -translate-x-1/2 w-5/6 ' text={translateText('buttonSave')}/>
                {/* <FormButton onClick={handleDelete} ok={false} bg='bg-red-300' className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-5/' text={translateText('buttonDelete')}/> */}

            </FormContainer>
        </SliderContainer>
    )
}
