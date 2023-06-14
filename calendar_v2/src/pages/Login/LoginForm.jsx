import { useMemo } from "react";
import useAuthentication from '../../hooks/useAuthentication';
import {t} from 'i18next';
import Input from "../../components/forms/Input";

export default function LoginForm({mail, setMail}) 
{
    const {setUser} = useAuthentication();
    
    useMemo(()=>
    {
        localStorage.removeItem('token');
        setUser(false);
    }, [])

    const translateText = (text) =>
    {
        const path = 'LoginPage.LoginForm';
        const finalPath = path + '.' + text;
        return t(finalPath);

    }

    const mailErrorLogic = value => value.length < 3;

    return (
        <div className="w-11/12 md:w-[30rem] p-6 m-auto bg-white rounded-md shadow-md">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               {translateText('header')}
            </h1>
            <Input 
                inputType='mail' 
                inputClassName={`peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40`}
                value={mail}
                setValue={setMail}
                valueErrorLogic={mailErrorLogic}
                autoComplete={"on"}
                labelText={translateText('mailLabel')}
                />
        </div>
    )
}
