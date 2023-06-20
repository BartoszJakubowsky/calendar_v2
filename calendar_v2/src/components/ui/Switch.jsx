/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion as m } from "framer-motion";

export default function Switch ({onClick, initial, ...rest})
{
    const [isOn, setIsOn] = useState(initial);

    const toggleSwitch = () => 
    {
        setIsOn(!isOn);
        onClick(!isOn)   
    }
  
    return (
      <div className={` ${rest.className} w-20 h-8 background border-2 border-slate-300 flex ${isOn? 'justify-end' : 'justify-start'} items-center cursor-pointer rounded-3xl p-2 "`} 
      onClick={toggleSwitch}
      >
        <m.div className={`w-6 h-6 ${isOn? 'bg-purple-700 dark:bg-blue-700' : 'dark:bg-blue-400 bg-purple-400 hover:bg-pink-400'} hover:bg-pink-400 dark:hover:bg-blue-300  cursor-pointer rounded-3xl`} layout transition={spring} />
      </div>
    );
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };