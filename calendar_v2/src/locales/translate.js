import {t} from 'i18next';



const translate = (path, text) => {
       return t(path + '.' + text);

}

const translateLoginForm = (text) => 
{
    const path = 'LoginPage.LoginForm';
    return translate(path, text);
}

const translateAuthentication = (text) => 
{
    const path = 'Authentication';
       return translate(path, text);

}

const translateRegisterForm = (text) => 
{
    const path = 'LoginPage.RegisterForm';
       return translate(path, text);

}

const translatePasswordForm = (text) => 
{
    const path = 'LoginPage.PasswordForm';
       return translate(path, text);

}

const translateMainPage = (text) =>
{
    const path = 'MainPage';
    return translate(path, text);

}

const translateMenu = (text) => {
    const path = 'Menu';
    return translate(path, text);
}
export {
    translateLoginForm, 
    translateAuthentication, 
    translateRegisterForm, 
    translatePasswordForm, 
    translateMainPage,
    translateMenu
};