import AnimatedContainer from '@/components/containers/AnimatedContainer';
import LoadingIcon from "./LoadingIcon";
import { useState, useEffect } from 'react';
export default function LoadingMessage({message, theme, ...rest}) {
    

    const [loadingDots, setLoadingDots] = useState('');
    useEffect(()=>
    {
    setTimeout(() => {
        if (loadingDots === '...')
            {
                setLoadingDots('.');
            }
        else
        {
            const dots = loadingDots + '.';
            setLoadingDots(dots);
        }
    }, 500);
    
    }, [loadingDots])

    return (
        <AnimatedContainer animation={'opacityVariant'} className={`relative ${rest.className}`}>
            <LoadingIcon />
            <span className={`text-${theme} `} >
            <span className=' opacity-0'>{loadingDots}</span>{message}{loadingDots}
            </span>
         </AnimatedContainer>
    )

}
