
import { useState } from "react";
import Carousel from "../../components/containers/Carousel";
import AnimatedContainer from "../../components/containers/AnimatedContainer";
import LoginForm from "./LoginForm";
import {t} from 'i18next';

export default function LoginPage() 
{
    const [swipe, setSwipe] = useState(0);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const translateText = (text) =>
    {
        const path = 'LoginPage';
        const finalPath = path + '.' + text;
        return t(finalPath);

    }

    const mailErrorLogic = () => mail.length < 3;
    const passwordErrorLogic = () => passwordErrorLogic.length < 3;

    const userFormData = 
    {
      mail, setMail, password, setPassword, secondPassword, setSecondPassword, mailErrorLogic, passwordErrorLogic
    }

    const forms = [
      <LoginForm 
        key='login' 
        userFormData={userFormData}
        setSwipe={setSwipe} 
        translateText={translateText}/>
    ]

    return (
      <AnimatedContainer animation={'opacityVariant'} className='flex justify-center items-center'>
        <Carousel 
          className='w-full h-full bg-indigo-100 dark:bg-slate-400'
          containerClassName={'w-full h-full flex justify-center items-center'}
          startPosition={0}
          pages = {forms}
          swipeToIndex={swipe}
        />
      </AnimatedContainer>
    );
}
