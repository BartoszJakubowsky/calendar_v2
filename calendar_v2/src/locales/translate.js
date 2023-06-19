import {t} from 'i18next';


const translateLoginForm = (text) => 
{
    const path = 'LoginPage.LoginForm';
    return t(path + '.' + text);
}

const translateAuthentication = (text) => 
{
    const path = 'Authentication';
    return t(path + '.' + text);
}

export {translateLoginForm, translateAuthentication};