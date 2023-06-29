
import { useEffect, useState } from "react";
import Carousel from "@/components/containers/Carousel";
import AnimatedContainer from "@/components/containers/AnimatedContainer";
import LoginForm from "./LoginForm";
import SwitchTheme from "@/components/ui/SwitchTheme";
import RegisterForm from "./RegisterForm";
import PasswordForm from "./PasswordForm";

import Background from '@/components/ui/Background';

export default function LoginPage() 
{
    const [swipe, setSwipe] = useState(1);
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');



    const [mailError, setMailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [secondPasswordError, setSecondPasswordError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [surnameError, setSurnameError] = useState(false);


    const [messageText, setMessageText] = useState(false);


    //reset states each swipe
    useEffect(()=>
    {
          // !== ? , toSetWhat(?), array
          const resetValue = (valueCondition, valuesToCheck ) => {
            
            valuesToCheck.forEach(element => {
              const elementToCheck = element[0];
              const setElement = element[1];

              if (elementToCheck !== valueCondition)
                setElement(valueCondition);
            });

          }

          const stringCheck = [
            [password, setPassword], 
            [secondPassword, setSecondPassword], 
            [name, setName], 
            [surname, setSurname]
          ];

          const boolenCheck = [
            [mailError, setMailError],
            [passwordError, setPasswordError],
            [secondPasswordError, setSecondPasswordError]
          ]
          resetValue('', stringCheck);
          resetValue(false, boolenCheck)

    }, [swipe])


    const checkCondition = (condition, setState) => {
        
        if (condition)
        {
          setState(true);
          return true;
        }
        
        setState(false);
        return false;
    }  

    const mailCondition = () => checkCondition(mail.length < 3, setMailError);
    const passwordCondition = () => checkCondition(password.length < 3, setPasswordError)
    const secondPasswordCondition = () => checkCondition(password !== secondPassword || secondPassword === '', setPasswordError);
    const nameCondition = () => checkCondition(name.length <= 2, setNameError);
    const surnameCondition = () => checkCondition(surname.length <=2, setSurnameError);

    const userFormData = 
    {
      mail, setMail, 
      password, setPassword, 
      secondPassword, setSecondPassword, 
      mailError, setMailError,  mailCondition, 
      passwordError, setPasswordError, passwordCondition,
      secondPasswordError, setSecondPasswordError, 
      messageText, setMessageText, secondPasswordCondition,
      name, setName, nameError, setNameError, nameCondition,
      surname, setSurname, surnameError, setSurnameError, surnameCondition
    }

    const forms = [
      <PasswordForm 
      key='password' 
      userFormData={userFormData}
      setSwipe={setSwipe} 
      />,
      <LoginForm 
        key='login' 
        userFormData={userFormData}
        setSwipe={setSwipe} 
        />,
      <RegisterForm
      key='register'
      userFormData={userFormData}
      setSwipe={setSwipe} 
      />
    ]

    return (
      <div className="absolute inset-0 background-gradient">
      <AnimatedContainer animation={'opacityVariant'} className='flex justify-center items-center'>
      <Background bg="background-gradient">
        <SwitchTheme className='absolute right-10 top-10 z-10'/>
        <Carousel 
          className={`w-full h-full bg-transparent`}
          containerClassName={'w-full h-full flex justify-center items-center'}
          startPosition={0}
          pages = {forms}
          swipeToIndex={swipe}
        />
        </Background>
      </AnimatedContainer>
      </div>
    );
}
