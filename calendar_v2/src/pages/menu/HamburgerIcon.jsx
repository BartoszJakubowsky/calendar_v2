import { motion as m } from "framer-motion";

export default function HamburgerIcon({isOpen, setIsOpen,...rest}) 
{
  const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-black transition ease transform duration-300`;
  
  
  return (
    <m.div className={`app flex items-center justify-center pt-10 ${rest.className}`} onClick={rest.onClick} transition={{duration:0.25, ease: 'easeOut'}} exit={{opacity: 0}} initial={{x: '-100%'}} animate={{x: "0%"}}>
      <button
        className="flex flex-col h-12 w-12 rounded justify-center items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${genericHamburgerLine} ${
            isOpen
              ? "rotate-45 translate-y-3 bg-gray-600 group-hover:bg-black"
              : "bg-gray-600 group-hover:bg-black"
          }`}
        />
        <span
          className={`${genericHamburgerLine} ${
            isOpen ? "opacity-0" : "bg-gray-600 group-hover:bg-black"
          }`}
        />
        <span
          className={`${genericHamburgerLine} ${
            isOpen
              ? "-rotate-45 -translate-y-3 bg-gray-600 group-hover:bg-black"
              : "bg-gray-600 group-hover:bg-black"
          }`}
        />
      </button>
    </m.div>
  );

}