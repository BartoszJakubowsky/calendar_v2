/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo} from "react";
import useAuthentication from '../../hooks/useAuthentication';
import LabelInput from "../../components/forms/LabelInput";
import FormButtonMessage from "../../components/forms/FormButtonMessage";
import {getLogin} from '../../api/authentication/authenticationApi';
import { translateAuthentication, translateLoginForm } from "../../locales/translate";
import FormHeader from '../../components/forms/FormHeader';
import FormContainer from './FormContainer';
export default function LoginForm({userFormData, setSwipe}) 
{
    const {handleUser} = useAuthentication();
    const {
        mail, setMail, 
        password, setPassword, 
        mailCondition, passwordCondition,
        mailError, setMailError, 
        setPasswordError, passwordError,
        messageText, setMessageText
    
    } = userFormData;
    useMemo(()=>
    {
        handleUser(false);
    }, [])


    
    
    const checkError = () => 
    {
        //true == error
        if (mailCondition() || passwordCondition())
            return true;

        getLogin(mail, password).then(res => setMessageText(translateAuthentication(res)));
        return false;

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
                inputContainerClassName={"mb-8"}
                inputType='password' 
                value={password}
                setValue={setPassword}
                setError={setPasswordError}
                error={passwordError}
                labelText={translateLoginForm('passwordLabel')}
                />
                <FormButtonMessage
                    buttonText={translateLoginForm('button')}
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
                <div className="flex flex-col items-center">
                    Nie masz konta?
                    <button onClick={()=>setSwipe(1)}>Zarejestruj się</button>
                </div>
        </FormContainer>
    )
}
