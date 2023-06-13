import {motion as m} from 'framer-motion';
import LoadingIcon from '../../components/ui/LoadingIcon';



export default function LoadingPage({theme}) 
{
    const variantsForSuspense = 
            {
                  hidden: { opacity: 0, x: -200, y: 0 },
                  enter: { opacity: 1, x: 0, y: 0 },
                  exit: { opacity: 0, x: 0, y: -100 },
            }
            
    return (
        <m.div className='absolute inset-0 justify-center items-center flex' variants={variantsForSuspense} initial='hidden' animate='enter' transition={{type: 'linear'}} exit={{x: 200, transition: 0.2 }}>
            <LoadingIcon classname={theme || ' fill-red-500'}></LoadingIcon>
        </m.div>
    )    
}