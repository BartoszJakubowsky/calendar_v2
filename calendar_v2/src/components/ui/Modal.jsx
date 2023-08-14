import AnimatedContainer from '@/components/containers/AnimatedContainer'
import { AnimatePresence } from 'framer-motion';
import FormButton from '@/components/forms/FormButton'
import { useEffect } from 'react';
export default function Modal({modalText, buttonText, onClick, isOpen, setIsOpen, onlyButton = true}) {
    

    const spring = {
        type: "spring",
        stiffness: 700,
        damping: 30,
      };
      

      useEffect(() => {
        const handleEscapeKeyPress = (event) => {
          if (event.keyCode === 27) {

            handleGlobalClick()
          }
        };
    
        window.addEventListener('keydown', handleEscapeKeyPress);
    
        return () => {
            window.removeEventListener('keydown', handleEscapeKeyPress);
        };
      }, []); 
    

    const handleClick = () => {
        onClick && onClick();
        setIsOpen(!isOpen);
    }

    const handleGlobalClick = () => {
        if (onlyButton)
        return

        setIsOpen(false)
    }
    return (
        <AnimatePresence mode='wait'>
        {isOpen? 
            <AnimatedContainer onClick={handleGlobalClick} animation={'opacityVariant'} transition={{duration: 0.2}} className='fixed inset-0 bg-opacity-80 duration-200 transition-all bg-gray-900 z-50 flex justify-center items-center'>
            <AnimatedContainer 
             transition={spring} 
            animation={"scaleVariant"} 
            className='relative w-80 rounded-sm h-60 bg-red-100 mb-3/4 background p-4 overflow-hidden text-lg flex flex-wrap flex-col'>
               {modalText}
               <FormButton onClick={handleClick} text={buttonText} className='!w-fit !self-end mt-auto mb-2'/>
            </AnimatedContainer>
            </AnimatedContainer>
    :
    false}
    </AnimatePresence>
    )
}
