
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

const getRegister = async (mail, password, name, surname) => {

    const _name = name.trim() + ' ' + surname.trim();

    return postAxios('/register/submit', mail, password, _name)
}

const getPassword = async (mail, password) => {
    return postAxios('/password/submit', mail, password)
}

const postAxios = async (route, mail, password, name) => 
{
    const [_mail, _password] = handleInput(mail, password);
    return axios.post(route, {mail: _mail, password: _password, name}).then(response => 
        {
            const message =  response.data.message;
            const token = response.data.token;

            if (token)
                return ({message, token})
            return(message);

        }).catch(err => 
            {
                console.log('authentication error', err);
                return 'error'
            })
}



export {getLogin, getRegister, getPassword};