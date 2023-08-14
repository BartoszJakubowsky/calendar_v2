import LabelInput from '@/components/forms/LabelInput';
import Accordion from '@/components/containers/Accordion'
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import { useState } from 'react';
import {translateAdminPage} from '@/locales/translate'
import SelectOptions from '@/components/forms/SelectOptions';
import Modal from '@/components/ui/Modal';
import { updateUser, deleteUser } from '@/api/admin/adminApi';
import AccordionContent from './AccordionContent';

export default function UserConfirmed({users, updateUserConfirmed, deleteUserConfirmed}) {

    const [search, setSearch] = useState('');
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));

    const highlightMatch = (text, search) => {
        if (!search) return text;
    
        const regex = new RegExp(`(${search})`, "gi");
        return text.split(regex).map((part, index) => {
          if (part.toLowerCase() === search.toLowerCase()) {
            return <mark className="bg-accentMedium dark:bg-dark-accentMedium rounded-sm" key={index}>{part}</mark>;
          } else {
            return part;
          }
        });
      };
    return (
      <>
        <AnimatedContainer className={'w-full h-full relative'} animation={'ySwipeVariant'}>
            <LabelInput 
            labelText={translateAdminPage('findUser')} 
            value={search} 
            setValue={setSearch} 
            inputType={'text'} 
            inputContainerClassName=' mb-2 mt-2 bg-accentMedium dark:bg-dark-accentMedium p-2 rounded-md'
            />
            {
              users.length == 0?
                <h1 className='text-accentStrong dark:text-dark-accentStrong text-lg text-center'>
                    {translateAdminPage('noConfirmedUsers')}
                </h1>
                :
            filteredUsers.map(user=> {
                return (
                    <Accordion
                    key={user._id}
                    label={highlightMatch(user.name, search)}
                    labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2  cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium`}
                    contentClassName={`bg-accentLight border-accentMedium dark:bg-dark-accentLight rounded-b-sm p-1 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
                    >
                        <UserPanel 
                        user={user} 
                        updateUserConfirmed={updateUserConfirmed} 
                        deleteUserConfirmed={deleteUserConfirmed}
                        />
                    </Accordion>
                )
            })}
        </AnimatedContainer>
        </>
    )
}



function UserPanel ({user, updateUserConfirmed, deleteUserConfirmed}) {

  const [name, setName] = useState(user.name);
  const [mail, setMail] = useState(user.mail);
  const [permissions, setPermissions] = useState(user.permissions);
  
  const [fetchData, setFetchData] = useState(false);
  const [result, setResult] = useState(null);
  const [textOnTrue, setTextOnTrue] = useState('registerAddTrue')
  const [textOnFalse, setTextOnFalse] = useState('registerAddFalse');

  const permission = ['ADMIN'];

  const handleResponse = (res, action) => {


    setTimeout(() => {
       setResult(res)
   }, 500);

   setTimeout(() => {
     setFetchData(false)
     setResult(null)

     if (action === 'edit' && res)
        updateUserConfirmed({...user, name, mail, permissions});
     else if (action === 'delete' && res)
        deleteUserConfirmed(user)
   }, 1500);
 }

 const handleEditClick = () => {
  setTextOnTrue('confirmedEditTrue')
  setTextOnFalse('confirmedEditFalse')

  setFetchData(true)
  handleResponse(true)
  updateUser({...user, name, mail, permissions}).then(res => handleResponse(res.data, 'edit'))
}
const handleDeleteClick = () => {

  setTextOnTrue('confirmedDeleteTrue')
  setTextOnFalse('confirmedDeleteFalse')

  setFetchData(true)
  handleResponse(true)
  deleteUser(user).then(res => handleResponse(res.data, 'delete'))
}
  return (
    <AccordionContent
    buttonAddText={translateAdminPage('saveUserConfirmed')}
    buttonDeleteText={translateAdminPage('deleteUserConfirmed')}
    buttonAddOnClick={handleEditClick}
    buttonDeleteOnClick={handleDeleteClick}
    fetchData={fetchData}
    result={result}
    textOnTrue={translateAdminPage(textOnTrue)}
    textOnFalse={translateAdminPage(textOnFalse)}
    loadingMessage={translateAdminPage('loading')}
    >
       <LabelInput 
            labelText={translateAdminPage('userName')} 
            value={name} 
            setValue={setName} 
            inputType={'text'} 
            inputContainerClassName='p-2 rounded-md'
            />
        <LabelInput 
            labelText={translateAdminPage('userLogin')} 
            value={mail} 
            setValue={setMail} 
            inputType={'text'} 
            inputContainerClassName='p-2 rounded-md'
            />
        <SelectOptions
        selectedOptions={permissions}
        setSelectedOptions={setPermissions}
        optionsArr = {permission}
        labelText ={translateAdminPage('userPermissions')} 
        translateOption = {translateAdminPage}
        className='p-2'
        />
    </AccordionContent>   
  )
}


