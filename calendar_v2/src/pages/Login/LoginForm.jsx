/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect} from "react";
import useAuthentication from '@/hooks/useAuthentication';
import LabelInput from "@/components/forms/LabelInput";
import FormButtonMessage from "@/components/forms/FormButtonMessage";
import {getLogin} from '@/api/authentication/authenticationApi';
import { translateAuthentication, translateLoginForm } from "@/locales/translate";
import FormHeader from '@/components/forms/FormHeader';
import FormContainer from './FormContainer';
import NavigationText from '@/components/forms/NavigationText'
import { useNavigate } from "react-router-dom";

export default function LoginForm({userFormData, setSwipe}) 
{
    const {handleUser} = useAuthentication();
    const navigate = useNavigate();
    const {
        mail, setMail, 
        password, setPassword, 
        mailCondition, passwordCondition,
        mailError, setMailError, 
        setPasswordError, passwordError,
        messageText, setMessageText
    
    } = userFormData;
    useEffect(()=>
    {
        handleUser(false);
    }, [])


    
    
    const checkError = () => 
    {
        //true == error
        if (mailCondition() | passwordCondition())
            return true;

        getLogin(mail, password).then(res => 
            {
                if (res.token)
                {
                    setMessageText(translateAuthentication(res.message));
                    handleUser(res.token);
                    
                    setTimeout(() => {
                        navigate('/');
                    }, 2500);
                    
                }
                else
                    setMessageText(translateAuthentication(res));
            });
        return false;

    }

    const swipeRegister = () => {
        setSwipe(2);
    }
    const swipePassword = () => {
        setSwipe(0);
    }
    return (
        <FormContainer>
           <FormHeader text={translateLoginForm('header')}/>
            <LabelInput 
                inputContainerClassName={"mb-2 mt-2"}
                inputType='mail' 
                value={mail}
                setValue={setMail}
                setError={setMailError}
                error={mailError}
                labelText={translateLoginForm('mailLabel')}
                />
              <LabelInput 
                inputContainerClassName={"mb-1"}
                inputType='password' 
                value={password}
                setValue={setPassword}
                setError={setPasswordError}
                error={passwordError}
                labelText={translateLoginForm('passwordLabel')}
                />
                <NavigationText className='text-sm mb-4'  header={translateLoginForm('navigationTextPasswordHeader')} text={translateLoginForm('navigationTextPassword')} handleClick={swipePassword} />
                <FormButtonMessage
                    buttonText={translateLoginForm('button')}
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
                <NavigationText header={translateLoginForm('navigationTextRegisterHeader')} text={translateLoginForm('navigationTextRegister')} handleClick={swipeRegister} />

        </FormContainer>
    )
}
