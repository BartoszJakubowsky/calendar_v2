/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useMemo } from "react";
import useAuthentication from '../../hooks/useAuthentication';
import LabelInput from "../../components/forms/LabelInput";
import FormButtonMessage from "../../components/forms/FormButtonMessage";

export default function LoginForm({userFormData, translateText}) 
{
    const {setUser} = useAuthentication();
    const {mail, password, setMail, setPassword, mailErrorLogic, passwordErrorLogic} = userFormData;
    useMemo(()=>
    {
        localStorage.removeItem('token');
        setUser(false);
    }, [])
    
    const text = (text) => translateText('LoginForm' + '.' + text);
    const inputClassName = `peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`;
    const labelClassName = `block text-sm font-semibold `;
    const checkErrors = () =>
    {
        mailErrorLogic();
        passwordErrorLogic();
    }
    return (
        <div className="w-11/12 md:w-[30rem] p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               {text('header')}
            </h1>
            <LabelInput 
                inputContainerClassName={"mb-2 mt-2"}
                labelClassName={labelClassName}
                inputType='mail' 
                inputClassName={inputClassName}
                value={mail}
                setValue={setMail}
                valueErrorLogic={mailErrorLogic}
                autoComplete={"on"}
                labelText={text('mailLabel')}
                />
              <LabelInput 
                inputContainerClassName={"mb-8"}
                labelClassName={labelClassName}
                inputType='password' 
                inputClassName={inputClassName}
                value={password}
                setValue={setPassword}
                valueErrorLogic={passwordErrorLogic}
                autoComplete={"on"}
                labelText={text('passwordLabel')}
                />
                <FormButtonMessage
                    // checkErrors={}
                    // message={}
                />
        </div>
    )
}
