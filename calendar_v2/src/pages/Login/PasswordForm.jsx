/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import LabelInput from "@/components/forms/LabelInput";
import FormButtonMessage from "@/components/forms/FormButtonMessage";
import {getPassword} from '@/api/authentication/authenticationApi';
import { translateAuthentication, translatePasswordForm } from "@/locales/translate";
import FormHeader from '@/components/forms/FormHeader';
import FormContainer from './FormContainer';
import NavigationText from '@/components/forms/NavigationText'

export default function PasswordForm({userFormData, setSwipe}) 
{
    const {
        mail, setMail, 
        password, setPassword, 
        secondPassword, setSecondPassword,
        mailCondition, passwordCondition,
        mailError, setMailError, 
        setPasswordError, passwordError, secondPasswordCondition, secondPasswordError, setSecondPasswordError,
        messageText, setMessageText
    
    } = userFormData;
    
    const checkError = () => 
    {
        //true == error
        if (mailCondition() | passwordCondition() | secondPasswordCondition())
            return true;

            getPassword(mail, password).then(res => setMessageText(translateAuthentication(res)));
        return false;

    }
    const swipeLogin = () => {
        setSwipe(1);
    }

  
    return (
        <FormContainer>
           <FormHeader text={translatePasswordForm('header')}/>
           <NavigationText text={translatePasswordForm('navigationText')} handleClick={swipeLogin} />
            <LabelInput 
                inputContainerClassName={"mb-2 mt-2"}
                inputType='mail' 
                value={mail}
                setValue={setMail}
                setError={setMailError}
                error={mailError}
                labelText={translatePasswordForm('mailLabel')}
                />
              <LabelInput 
                    inputContainerClassName={"mb-4"}
                    inputType='password' 
                    value={password}
                    setValue={setPassword}
                    setError={setPasswordError}
                    error={passwordError}
                    labelText={translatePasswordForm('passwordLabel')}
                />
                <LabelInput 
                    inputContainerClassName={"mb-8"}
                    inputType='password' 
                    value={secondPassword}
                    setValue={setSecondPassword}
                    setError={setSecondPasswordError}
                    error={secondPasswordError}
                    labelText={translatePasswordForm('secondPasswordLabel')}
                />
                <FormButtonMessage
                    buttonText={translatePasswordForm('button')}
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
        </FormContainer>
    )
}
