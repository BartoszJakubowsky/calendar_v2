import {motion as m} from 'framer-motion';
import { useState } from 'react';
import { useRef } from 'react';
import {IoIosReorder as DragIcon} from 'react-icons/io'
export default function FloatingPanel({children, ...rest}) {
    
    const panelRef = useRef(null)
    const elementHeight = panelRef?.current?.clientHeight? panelRef.current.clientHeight : 0;
    const elementWidth = panelRef?.current?.clientWidth? panelRef.current.clientWidth : 0;

    const [width, setWidth] = useState(false);

    const handleResize = (moveVal) => 
    {
        
            panelRef.current.style.width = `${(width? width : elementWidth )- moveVal}px`;
    }   

    const handleDragEnd = () =>
    {

            setWidth(panelRef.current.clientWidth);
    }
    return (
        <m.div
         ref={panelRef}
         className={rest.className}
         drag
        //  dragConstraints={{top:0, left:0, right: window.innerWidth - elementWidth, bottom : window.innerHeight - elementHeight}}
         dragConstraints={{top:0, left:0, right: 0, bottom : window.innerHeight - elementHeight}}
         dragMomentum={false}
         dragElastic={0.05}
        //  onDragEnd={(event, info) =>
        // {
        //     if (info.offset.x <= window.innerWidth )
        //         console.log('object');
        // }}
        >
        {children}

        <DragElement 
         className='absolute bottom-1/2 top-1/2 left-1'
         handleDragEnd={handleDragEnd}
         handleResize={handleResize}/>
        </m.div>

        
    )

}


function DragElement({handleResize, handleDragEnd,  ...rest}) {
    

    let moveX;
    
    return (
        <m.div className={rest.className}
         drag
         dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0}}
         dragMomentum={false}
         dragElastic={0.01}
         onDragEnd={()=>handleDragEnd()}
         onDrag={(event, info) => 
        {
            const checkX = () => {
                const moveVal = info.offset.x;
                if (moveX === moveVal)
                    return false
                else
                    return moveVal
            }
           

            const setX = () => {
                const x = checkX() ;

                if (!x)
                    return;
                moveX = x;
                handleResize(x, 'x')
            }
            setX();
        }}
        >
            <DragIcon className=' rotate-90 cursor-ew-resize'/>
        </m.div>

    )
}