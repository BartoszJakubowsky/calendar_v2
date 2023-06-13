import { useState } from "react";
import { useSpring, animated } from 'react-spring';
import axios from "axios";
import CryptoJS from "crypto-js";

import LoadingIcon from "../../components/ui/LoadingIcon";


export default function Password({mail, setMail, moveBack}) 
{


    const [sent, setSent] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [password, setPassword] = useState('');
    const [secondPassword, setSecondPassword] = useState('');
    const mailCheck = mail === '';
    const [message, setMessage] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const passwordCheck = password.length <= 3 || password === '' || password !== secondPassword;

      const handlePasswordChange = (event) => 
    {

        if (passwordError && !passwordCheck)
            setPasswordError(false)
        
        setPassword(event.target.value);
    }
    const handleSecondPasswordChange = (event) => 
    {
            if (passwordError && !passwordCheck)
                setPasswordError(false)
            
        setSecondPassword(event.target.value);
    }

    const handleMailChange = (event) => 
    {

        if (mailCheck && mailCheck)
            setMailError(false);

        setMail(event.target.value);
    }

    const handleSendClick = (event) =>
    {
        event.preventDefault();
        if (mailCheck)
            setMailError(true)
        if (passwordCheck)
            setPasswordError(true);
        
        if(!mailCheck && !passwordCheck)
            setSent(true)

        
            const handleHashPassword = () => {
                const hashed = CryptoJS.SHA256(password).toString();
                return hashed;
              };

            const hashedPassword = handleHashPassword();
            axios.post('/password/submit', {mail: mail.trim(), password: hashedPassword}).then(response => 
            {
       
                setTimeout(() => 
                {
                setSent(false)
                setMessage(response.data)
                }, 1000);

            }).catch(err => console.log('Błąd podczas wysyłania', err))

    }


    const buttonAnimation = useSpring({
        opacity: sent ? 0 : 1,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)',
      });
    
      const messageAnimation = useSpring({
        opacity: sent ? 1 : 0,
        transform: sent ? 'translateY(0%)' : 'translateY(100%)',
      });


      
    return (
        <div className="w-11/12 md:w-[30rem] p-6 m-auto bg-white rounded-md shadow-md overflow-hidden">
            <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
               Zresetuj hasło
            </h1>
            <p className="mt-2 text-xs font-light text-center text-gray-700 flex flex-col ">
                    <p
                        className="font-medium text-purple-600 hover:underline cursor-pointer"
                        onClick={()=>moveBack(1)}
                    >
                        lub wróć do logowania
                    </p>
                </p>
            <form className="mt-6">
                <div className="mb-2">
                    <label
                        // for="email"
                        className={`block text-sm font-semibold ${mailError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Wporawdź swój email lub imię i nazwisko
                    </label>
                    <input
                        type="email"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleMailChange}
                        onBlur={handleMailChange}
                        value={mail}
                        required 
                        autoComplete="on"
                    />
                    {/* {mail !== '' ? <p class="invisible peer-invalid:visible text-red-700 font-light">
                    Please enter a valid email address
                    </p> : false} */}
                </div>
                    <label
                        // for="password"
                        className={`block text-sm font-semibold ${passwordError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Wpisz nowe hasło
                    </label>
                    <input
                        type="password"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handlePasswordChange}
                        onBlur={handlePasswordChange}
                        value={password}
                        required 
                        autoComplete="on"
                    />

                    <label
                        // for="password"
                        className={`block text-sm font-semibold ${passwordError? ' valid text-red-300' : 'text-gray-800'}`}
                    >
                        Powtórz nowe hasło
                    </label>
                    <input
                        type="password"
                        className="peer block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={handleSecondPasswordChange}
                        onBlur={handleSecondPasswordChange}
                        value={secondPassword}
                        required 
                        autoComplete="on"
                    />
              <div className="overflow-hidden">
                {message? 
                <animated.div style={buttonAnimation} className="w-full px-4 py-2 tracking-wide text-center rounded-md h-10">
                    {message}
                </animated.div>:<animated.button
                    style={buttonAnimation}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                    onClick={handleSendClick}
                >
                    {'Poproś o zresetowanie hasła'}
                </animated.button>}

                <animated.div style={messageAnimation} className="w-full px-4 py-2 tracking-wide text-center flex justify-center flex-col">
                    Poczekaj, sprawdzamy twoje dane
                  <LoadingIcon classname={`fill-purple-700`}/>
                </animated.div>
                </div>
               
            </form>
            
        </div>
);
}