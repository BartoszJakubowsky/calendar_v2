/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo} from "react";
import useAuthentication from '../../hooks/useAuthentication';
import LabelInput from "../../components/forms/LabelInput";
import FormButtonMessage from "../../components/forms/FormButtonMessage";

export default function LoginForm({userFormData, translateText}) 
{
    const {setUser} = useAuthentication();
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
        localStorage.removeItem('token');
        setUser(false);
    }, [])


    const formText = (text) => translateText('LoginForm' + '.' + text);

    const checkError = () => 
    {
        //true == error
        if (mailCondition() || passwordCondition())
            return true;

        return false;

    }

    return (
        <div className="w-11/12 md:w-[30rem] p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               {formText('header')}
            </h1>
            <LabelInput 
                inputContainerClassName={"mb-2 mt-2"}
                inputType='mail' 
                value={mail}
                setValue={setMail}
                errorCondition={mailCondition}
                setError={setMailError}
                error={mailError}
                autoComplete={"on"}
                labelText={formText('mailLabel')}
                />
              <LabelInput 
                inputContainerClassName={"mb-8"}
                inputType='password' 
                value={password}
                setValue={setPassword}
                errorCondition={passwordCondition}
                setError={setPasswordError}
                error={passwordError}
                autoComplete={"on"}
                labelText={formText('passwordLabel')}
                />
                <FormButtonMessage
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
        </div>
    )
}
