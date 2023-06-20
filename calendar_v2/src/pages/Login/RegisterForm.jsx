/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import useAuthentication from '../../hooks/useAuthentication';
import LabelInput from "../../components/forms/LabelInput";
import FormButtonMessage from "../../components/forms/FormButtonMessage";
import {getRegister} from '../../api/authentication/authenticationApi';
import { translateAuthentication, translateRegisterForm } from "../../locales/translate";
import FormHeader from '../../components/forms/FormHeader';
import FormContainer from './FormContainer';


export default function RegisterForm({userFormData, setSwipe}) 
{
    const {handleUser} = useAuthentication();
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
        if (mailCondition() || passwordCondition() || secondPasswordCondition())
            return true;

        getRegister(mail, password).then(res => setMessageText(translateAuthentication(res)));
        return false;

    }

    return (
        <FormContainer>
           <FormHeader text={translateRegisterForm('header')}/>
           <div className="flex flex-col items-center">
                    <button onClick={()=>setSwipe(0)}>Wróć do logowania</button>
                </div>
            <LabelInput 
                    inputContainerClassName={"mb-2 mt-2"}
                    inputType='mail' 
                    value={mail}
                    setValue={setMail}
                    setError={setMailError}
                    error={mailError}
                    labelText={translateRegisterForm('mailLabel')}
                />
              <LabelInput 
                    inputContainerClassName={"mb-4"}
                    inputType='password' 
                    value={password}
                    setValue={setPassword}
                    setError={setPasswordError}
                    error={passwordError}
                    labelText={translateRegisterForm('passwordLabel')}
                />
                <LabelInput 
                    inputContainerClassName={"mb-8"}
                    inputType='password' 
                    value={secondPassword}
                    setValue={setSecondPassword}
                    setError={setSecondPasswordError}
                    error={secondPasswordError}
                    labelText={translateRegisterForm('secondPasswordLabel')}
                />
                <FormButtonMessage
                    buttonText={translateRegisterForm('button')}
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
        </FormContainer>
    )
}
