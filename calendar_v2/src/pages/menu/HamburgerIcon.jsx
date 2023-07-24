import { motion as m } from "framer-motion";
import {IoMdLock as LockIcon} from 'react-icons/io';
export default function HamburgerIcon({isOpen, setIsOpen, lock,...rest}) 
{
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  
  return (
    <m.div className={`app flex items-center justify-center absolute left-1 top-1 ${rest.className}`} onClick={rest.onClick} transition={{duration:0.25, ease: 'easeOut'}} exit={{opacity: 0}} initial={{x: '-100%'}} animate={{x: "0%"}}>
      
      <button
        className="flex flex-col h-12 w-12 rounded justify-center items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={`absolute inset-0 w-full h-full flex justify-center items-start ${lock? 'opacity-100 pointer-events-none' : ' opacity-0'}`}>
          <LockIcon className={` text-gray-400 w-full h-full  transition-all duration-200 `}/>
        </div>
        <span
          className={`${genericHamburgerLine} ${
            isOpen
              ? "rotate-45 translate-y-3 option-off"
              : "option-on "
          }`}
        />
        <span
          className={`${genericHamburgerLine} ${
            isOpen ? "opacity-0" : "option-on"
          }`}
        />
        <span
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-rotate-45 -translate-y-3 option-off "
              : "option-on "
          }`}
        />
      </button>
    </m.div>
  );

}