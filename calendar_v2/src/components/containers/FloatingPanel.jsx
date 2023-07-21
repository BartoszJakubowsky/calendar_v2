import {motion as m} from 'framer-motion';
import { useState } from 'react';
import { useRef } from 'react';
export default function FloatingPanel({children, ...rest}) {
    
    const panelRef = useRef(null)
    const elementHeight = panelRef?.current?.clientHeight? panelRef.current.clientHeight : 0;
    const elementWidth = panelRef?.current?.clientWidth? panelRef.current.clientWidth : 0;

    const [width, setWidth] = useState(false);
    const [height, setHeight] = useState(false);

    const handleResize = (moveVal, direction) => 
    {
        
        if (direction === 'x')
            panelRef.current.style.width = `${(width? width : elementWidth )+ moveVal}px`;
        else if (direction === 'y')
            panelRef.current.style.height = `${(height? height : elementHeight )+ moveVal}px`;
        else
        {
            panelRef.current.style.width = `${(width? width : elementWidth )+ moveVal}px`;
            panelRef.current.style.height = `${(height? height : elementHeight )+ moveVal}px`;
        }
    }   

    const handleDragEnd = (direction) =>
    {

        if (direction == 'x')
            setWidth(panelRef.current.clientWidth);
        else if (direction == 'y')
            setHeight(panelRef.current.style.height);
        else
        {
            setWidth(panelRef.current.style.width);
            setHeight(panelRef.current.style.height);
        }
    }
    return (
        <m.div
         ref={panelRef}
         className={rest.className}
         drag
         dragConstraints={{top:0, left:0, right: window.innerWidth - elementWidth, bottom : window.innerHeight - elementHeight}}
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
         className='absolute top-1/2 bottom-1/2 right-1'
         direction={'x'}
         handleDragEnd={handleDragEnd}
         handleResize={handleResize}/>

        <DragElement 
         className='absolute bottom-1 right-1'
         direction={'xy'}
         handleDragEnd={handleDragEnd}
         handleResize={handleResize}/>
        </m.div>

        
    )

}


function DragElement({direction, handleResize, handleDragEnd,  ...rest}) {
    

    let moveX;
    let moveY;
    
    return (
        <m.div className={rest.className}
         drag={direction}
         dragConstraints={{ left: 0, right: 0}}
         dragMomentum={false}
         dragElastic={0.01}
         onDragEnd={()=>handleDragEnd(direction)}
         onDrag={(event, info) => 
        {
            const checkX = () => {
                const moveVal = info.offset.x;
                if (moveX === moveVal)
                    return false
                else
                    return moveVal
            }
            const checkY = () => {
                const moveVal = info.offset.y;
                if (moveY === moveVal)
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
            const setY = () => 
            {
                const y = checkY() ;

                if (!y)
                    return;

                moveY = y;
                handleResize(y, 'y')
            }
            
            if (direction == 'x')
                setX();
            else if (direction == 'y')
                setY();
            else
            {
                setX();
                setY();
            }
            

        }}
        >
            x
        </m.div>

    )
}