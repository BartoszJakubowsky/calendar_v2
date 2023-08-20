import AnimatedContainer from '@/components/containers/AnimatedContainer'
import {translateNotFoundPage} from '@/locales/translate'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function NotFoundPage() {

const navigate = useNavigate();
useEffect(() => {
    setTimeout(() => {
        navigate('/');
    }, 3500);
}, [])

 return (

    <AnimatedContainer animation='opacityVariant' className='flex justify-center items-start background-gradient'>
            <h1 className='absolute top-1/2 text-7xl text-accentStrong dark:text-dark-accentStrong'>
            {translateNotFoundPage('ups')}...
            </h1>
            <AnimatedContainer 
                className='relative mt-20'
                animation='ySwipeVariant'
                transition={{delay: 0.5, duration: 0.5, ease: "easeOut"}}>
                <div className=' w-80 h-64 bg-accentLight dark:bg-dark-accentLight shadow-lg text-center p-2'>
                    <h3 className='text-xl text-accentStrong dark:text-dark-accentStrong p-2'>
                        {translateNotFoundPage('notFound')}
                    </h3>
                    {translateNotFoundPage('moveMainPage')}
                </div>
            </AnimatedContainer>
    </AnimatedContainer>
 )   
}
