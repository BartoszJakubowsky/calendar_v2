

import { useEffect, useState } from "react";
import useCalendars from "../../hooks/useCalendars";
import {motion as m} from 'framer-motion';
import notFoundImage from "../../assets/not_found.png";

export default function NotFoundPate()
{
    const {navigate} = useCalendars();
    const [bounceAnimation, setBounceAnimation] = useState(false);
    useEffect(()=>
    {
        setTimeout(()=> navigate('/'),2500);
    })
    
    setTimeout(() => {
        setBounceAnimation(true);
    }, 800);
    const variantsForNotFoundPage = 
  {
        hidden: { opacity: 1, x: 0, y: -200},
        enter: { opacity: 1, x: 0, y: 0, transition:{delay: 0.5}},
        exit: { opacity: 0, x: 0, y: -100, transition:{delay: 0.5} },
  }

  const variantsForNotFoundImage = 
  {
        hidden: { opacity: 0, x: 0, y: 200},
        enter: { opacity: 1, x: 0, y: 0, transition:{delay: 0.5}},
        exit: { opacity: 0, x: 0, y: -100, transition:{delay: 0.5} },
  }
    return (
        <div className="flex w-screen h-screen justify-start items-center flex-col bg-amber-300 text-blue-900 font-semibold">
             <m.div variants={variantsForNotFoundPage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit' className=" relative w-11/12 md:w-90 shadow-lg mt-4 items-center flex flex-col justify-center text-ellipsis bg-amber-200 rounded-sm p-4 ">
                <h1 className="text-xl md:text-3xl  ">Ups...</h1>
                <h3 className="text-lg md:text-2xl">Strona, której szukasz nie istnieje!</h3>
                <h3 className="text-lg md:text-2xl">Zostaniesz przeniesiony na stronę główną</h3>
            </m.div>
            <m.img src={notFoundImage} alt="not found image" className={`w-40 mt-80`} variants={variantsForNotFoundImage} initial='hidden' animate='enter' transition={{type: 'linear'}} exit='exit'/>
        </div>
    )
}