/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo} from "react";
import useAuthentication from '../../hooks/useAuthentication';
import LabelInput from "../../components/forms/LabelInput";
import FormButtonMessage from "../../components/forms/FormButtonMessage";
import {getLogin} from '../../api/authentication/authenticationApi';
import { translateAuthentication, translateLoginForm } from "../../locales/translate";


export default function LoginForm({userFormData}) 
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
        <div className="w-11/12 md:w-[30rem] p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               {translateLoginForm('header')}
            </h1>
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
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
        </div>
    )
}
