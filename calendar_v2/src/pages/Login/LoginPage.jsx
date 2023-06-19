
import { useEffect, useState } from "react";
import Carousel from "../../components/containers/Carousel";
import AnimatedContainer from "../../components/containers/AnimatedContainer";
import LoginForm from "./LoginForm";
import SwitchTheme from "../../components/ui/SwitchTheme";
export default function LoginPage() 
{
    const [swipe, setSwipe] = useState(0);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const [mailError, setMailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [secondPasswordError, setSecondPasswordError] = useState(false);

    const [messageText, setMessageText] = useState(false);

    //reset states each swipe
    useEffect(()=>
    {
        if (password !== '')
          setPassword('');

        if (secondPassword !== '')
          setSecondPassword('');

        if (mailError)
          setMail(false);
        
        if(passwordError)
          setPasswordError(false);
        
        if (secondPasswordError)
          setSecondPassword(false);

    }, [swipe])


     const mailCondition = () => 
    {
      if (mail.length < 3)
      {
        setMailError(true);
        return true;
      }

      setMailError(false);
      return false;
    }
    const passwordCondition = () =>
    {
      if (password.length < 3)
      {
        setPasswordError(true);
        return true;
      }

      setPasswordError(false);
      return false;
    }

    const userFormData = 
    {
      mail, setMail, 
      password, setPassword, 
      secondPassword, setSecondPassword, 
      mailError, setMailError,  mailCondition, 
      passwordError, setPasswordError, passwordCondition,
      secondPasswordError, setSecondPasswordError, 
      messageText, setMessageText
    }

    const forms = [
      <LoginForm 
        key='login' 
        userFormData={userFormData}
        setSwipe={setSwipe} 
        />
    ]

    return (
      <AnimatedContainer animation={'opacityVariant'} className='flex justify-center items-center'>
        <SwitchTheme className='absolute right-10 top-10 z-10'/>
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
