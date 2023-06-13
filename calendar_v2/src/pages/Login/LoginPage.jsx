
import { MotionConfig, motion as m } from "framer-motion";
import { useState } from "react";

export default function LoginPage() 
{

    const [index, setIndex] = useState(1);


    const toShow = ["siema", "cześć", 'elo'];
    const handleClick = () => 
    {
        if (index === 1) 
        setIndex(0);
        else
        setIndex(1);
    }
    return (

        <div className=" flex absolute inset-0  items-center flex-col overflow-hidden">
        <MotionConfig
        transition={{
          duration: 0.7,
          ease: [0.32, 0.72, 0, 1],
        }}
      >
        <div className="h-52 w-52 bg-blue-300 flex flex-col flex-wrap overflow-hidden">
            {toShow.map(page => 
                {
                    return (
                    <m.div key={page} animate={{ x: `-${index * 100}%` }} className="w-full h-full">
                        {page}
                    </m.div>
                    )
                })}
        </div>
        <button onClick={handleClick}>tu</button>
        
      </MotionConfig>
      </div>
    );
}
