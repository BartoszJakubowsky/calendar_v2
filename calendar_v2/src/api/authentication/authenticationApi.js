
import CryptoJS from "crypto-js";
import axios from "axios";

const hashPassword = (password) => {
    const hashed = CryptoJS.SHA256(password).toString();
    return hashed;
  };

const handleInput = (mail, password) => {
    const _mail = mail.trim();
    const _password = hashPassword(password);

    return [_mail, _password];
}

const getLogin = async (mail, password) => {
    return postAxios('/login', mail, password)
}

const getRegister = async (mail, password) => {
    return postAxios('/register/submit', mail, password)
}

const postAxios = async (route, mail, password) => 
{
    const [_mail, _password] = handleInput(mail, password);
    return axios.post(route, {mail: _mail, password: _password}).then(response => 
        {
            const message =  response.data.message;
            const token = response.data.token;

            // if (token)
            //     handleUser(token);

            return(message);

        }).catch(err => 
            {
                console.log('login error', err);
                return 'error'
            })
}


export {getLogin, getRegister};