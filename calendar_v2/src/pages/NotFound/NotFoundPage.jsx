import AnimatedContainer from '@/components/containers/AnimatedContainer'
import {translateNotFoundPage} from '@/locales/translate'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import InfoModal from '@/components/ui/InfoModal';
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
            <InfoModal 
                headerText={`${translateNotFoundPage('ups')}...`} 
                contentText={translateNotFoundPage('moveMainPage')}
            />
    </AnimatedContainer>
 )   
}
