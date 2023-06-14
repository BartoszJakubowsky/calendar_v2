/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

/**
 * Highly customizable carousel 
 * @example
 * const startPosition = 0 | 1 | 2 ...
 * const pages = [<Children/>,<Children/>,<Children/>, ...]
 * const swipeToIndex = 0 | 1 | 2 ...
 * const swipeDuration = 0.5 | 1 ...
 * const swipeEase = 'easeOut' | [0.5, 0.5, 0, 1]
 * //default component
 * return (
 *   <Carousel 
 *      className='flex absolute inset-0 items-center flex-col overflow-hidden'
 *      startPosition={0} 
 *      pages={pages}
 *      swipeToIndex={swipeToIndex}
 *      swipeDuration = {0.7}
 *      swipeEase = {[0.32, 0.72, 0, 1]}
 * 
 *    />
 * )
 */

export default function Carousel({ startPosition = 0, pages, swipeToIndex, swipeDuration, swipeEase, ...rest }) 
{

    
    const [pageIndex, setPageIndex] = useState(startPosition);

    useEffect(()=>
    {
      setPageIndex(swipeToIndex);
    }, [swipeToIndex])




    return (
        <div className={`${rest.className? rest.className : ' absolute inset-0'} flex flex-col flex-wrap  overflow-hidden`}>
            {pages.map((page, index) => 
                {
                    return (
                    <m.div 
                      key={index} 
                      animate={{ x: `-${pageIndex * 100}%` }} 
                      className="w-full h-full" 
                      transition={{duration: swipeDuration? swipeDuration : 0.7, ease: swipeEase? swipeEase : [0.32, 0.72, 0, 1] }} 
                      exit={{ opacity:0}}>
                        {page}
                    </m.div>
                    )
                })}
      </div>
    );
}


