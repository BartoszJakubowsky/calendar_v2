import AnimatedContainer from '@/components/containers/AnimatedContainer';
import LoadingIcon from "./LoadingIcon";
import { useState, useEffect } from 'react';
export default function LoadingMessage({message, theme, ...rest}) {
    

   

    return (
        <AnimatedContainer animation={'opacityVariant'} className={`relative ${rest.className}`}>
            <LoadingIcon />
            <span className={`${theme}`} >
                <LoadingDots visibility={false}/>
                    <span>
                        {message}
                    </span>
                <LoadingDots/>
            </span>
         </AnimatedContainer>
    )

}

function LoadingDots({visibility = true}) {
    
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
        <span className={`${visibility? 'opacity-100' : 'opacity-0'}`}>
            {loadingDots}
        </span>
    )
}
