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

const translateRegisterForm = (text) => 
{
    const path = 'LoginPage.RegisterForm';
    return t(path + '.' + text);
}

const translatePasswordForm = (text) => 
{
    const path = 'LoginPage.PasswordForm';
    return t(path + '.' + text);
}

export {translateLoginForm, translateAuthentication, translateRegisterForm, translatePasswordForm};