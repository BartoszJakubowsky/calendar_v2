import AnimatedContainer from '@/components/containers/AnimatedContainer'
import { AnimatePresence } from 'framer-motion';
import FormButton from '@/components/forms/FormButton'
export default function Modal({modalText, buttonText, onClick, isOpen, setIsOpen}) {
    

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
      };
      

    const handleClick = () => {
        onClick && onClick();
        setIsOpen(!isOpen);
    }
    return (
        <AnimatePresence mode='wait'>
        {isOpen? 
            <AnimatedContainer animation={'opacityVariant'} transition={{duration: 0.2}} className='fixed inset-0 bg-opacity-80 duration-200 transition-all bg-gray-900 z-50 flex justify-center items-center'>
            <AnimatedContainer 
             transition={spring} 
            animation={"scaleVariant"} 
            className='relative w-80 rounded-sm h-60 mb-3/4 background p-4 overflow-hidden text-lg'>
               {modalText}
               <FormButton onClick={handleClick} text={buttonText} className=' w-32 absolute -bottom-6 right-3'/>
            </AnimatedContainer>
            </AnimatedContainer>
    :
    false}
    </AnimatePresence>
    )
}
