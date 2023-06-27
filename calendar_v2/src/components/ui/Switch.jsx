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
      <div className={` ${rest.className} w-20 h-8 border-2 background-border flex ${isOn? 'justify-end' : 'justify-start'} items-center cursor-pointer rounded-3xl p-2 "`} 
      onClick={toggleSwitch}
      >
        <m.div className={`w-6 h-6 ${isOn? 'option-on' : 'option-off'} cursor-pointer rounded-3xl`} layout transition={spring} />
      </div>
    );
}

const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };