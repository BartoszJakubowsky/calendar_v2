/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import LabelInput from "@/components/forms/LabelInput";
import FormButtonMessage from "@/components/forms/FormButtonMessage";
import {getRegister} from '@/api/authentication/authenticationApi';
import { translateAuthentication, translateRegisterForm } from "@/locales/translate";
import FormHeader from '@/components/forms/FormHeader';
import FormContainer from './FormContainer';
import NavigationText from '@/components/forms/NavigationText'


export default function RegisterForm({userFormData, setSwipe}) 
{
    const {
        mail, setMail, 
        password, setPassword, 
        secondPassword, setSecondPassword,
        mailCondition, passwordCondition,
        mailError, setMailError, 
        setPasswordError, passwordError, secondPasswordCondition, secondPasswordError, setSecondPasswordError,
        name, setName, setNameError, nameError, surname, setSurname, setSurnameError, surnameError, nameCondition, surnameCondition,
        messageText, setMessageText
    
    } = userFormData;
    
    const checkError = () => 
    {
        //true == error
        if (mailCondition() | passwordCondition() | secondPasswordCondition() | nameCondition() | surnameCondition())
            return true;

        getRegister(mail, password, name, surname).then(res => setMessageText(translateAuthentication(res)));
        return false;

    }
    const handleSwipe = () => {
        setSwipe(1);
    }
    
    return (
        <FormContainer>
           <FormHeader text={translateRegisterForm('header')}/>
            <NavigationText text={translateRegisterForm('navigationText')} handleClick={handleSwipe}/>
            <LabelInput 
                    inputContainerClassName={"mb-2 mt-2"}
                    inputType='mail' 
                    value={mail}
                    setValue={setMail}
                    setError={setMailError}
                    error={mailError}
                    labelText={translateRegisterForm('mailLabel')}
                />
                <LabelInput 
                    inputContainerClassName={"mb-4"}
                    inputType='text' 
                    value={name}
                    setValue={setName}
                    setError={setNameError}
                    error={nameError}
                    labelText={translateRegisterForm('nameLabel')}
                />
                <LabelInput 
                    inputContainerClassName={"mb-4"}
                    inputType='text' 
                    value={surname}
                    setValue={setSurname}
                    setError={setSurnameError}
                    error={surnameError}
                    labelText={translateRegisterForm('surnameLabel')}
                />
              <LabelInput 
                    inputContainerClassName={"mb-4"}
                    inputType='password' 
                    value={password}
                    setValue={setPassword}
                    setError={setPasswordError}
                    error={passwordError}
                    labelText={translateRegisterForm('passwordLabel')}
                />
                <LabelInput 
                    inputContainerClassName={"mb-8"}
                    inputType='password' 
                    value={secondPassword}
                    setValue={setSecondPassword}
                    setError={setSecondPasswordError}
                    error={secondPasswordError}
                    labelText={translateRegisterForm('secondPasswordLabel')}
                />
                <FormButtonMessage
                    buttonText={translateRegisterForm('button')}
                    checkError={checkError}
                    messageText={messageText}
                    setMessageText={setMessageText}
                />
        </FormContainer>
    )
}
