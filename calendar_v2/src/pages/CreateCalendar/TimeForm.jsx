
// //concept component -> 

// import SliderContainer from '@/components/containers/SliderContainer';
// import FormContainer from '@/components/forms/FormContainer';
// import FormHeader from '@/components/forms/FormHeader';
// import LabelInput from "@/components/forms/LabelInput";
// import FormButton from "@/components/forms/FormButton";
// import Label from "@/components/forms/Label";


// import { useEffect, useState } from 'react';


// export default function TimeFrom({formSlot, months, setMonths, translate, isOpen, setIsOpen}) {
    

//     const translateText = (text) => translate('TimeForm' + '.' + text);
//     const headerText = translateText('header');
    
//     const [selectAll, setSelectAll] = useState(false);
//     const [errorCheck, setErrorCheck] = useState(false);
//     const [send, setSend] = useState(false);


 
//     const handleSave = () => {

//         setIsOpen(false);
//     }

//     const handleDelete = () =>
//     {
//         // setSlots(slots.filter(slot => slot.name !== formSlot.name));
//         setIsOpen(false);

//     }

//     const handleTimeChange = (time, month) =>
//     {
  
//     }
    
//     return (
//         <SliderContainer isOpen={isOpen} className='background z-10 ease-in'>
//             <FormContainer className='h-full w-full'>
//                 <FormHeader text={headerText}/>
//                 <h3 onClick={()=>setIsOpen(false)} className=' text-center custom-text-accentStrong cursor-pointer '>{translateText('back')}</h3>
                
//                 {months.map(month => 
//                     {
//                         return <TimeInput
//                                 key={month.date}
//                                 value={month}
//                                 onChange={handleTimeChange}
//                                 />
//                     })}



//                 {formSlot? 
//                 <FormButton   
//                  onClick={handleDelete} 
//                  ok={'button-form-reject'}  
//                  className={`absolute pointer-events-auto -bottom-6 left-1/2 transform -translate-x-1/2 w-2/3  ${formSlot.name === name? 'opacity-100' : ' opacity-0'}`} 
//                  text={translateText('buttonDelete')}
//                  />
//                  : false}
//             </FormContainer>
//         </SliderContainer>
//     )
// }



// export function TimeInput({checkCondition, errorCheck, text, ...rest}) {

//     const [error, setError] = useState(false);
//     const [value, setValue] = useState('');

//     const onChange = event => 
//     {
//         if (error)
//             setError(false);
            
//         setValue(event.target.value);
//     }

//     useEffect(()=>
//     {
//         if (!errorCheck) 
//             return;

//         const isError = checkCondition(value);

//         if (isError)
//             setError(true)

//     },[errorCheck])
//     return (
//         <div className="flex-row">
//             <Label text={text} labelColor='text-dark-baseColor duration-300 ' error={error}/>
//           <input 
//             type='time' 
//             step='900'
//             value={value} 
//             onChange={onChange}
//             className={`text-form-input rounded-sm ${rest.className}`}
//            />
//          </div>
//     )
// }