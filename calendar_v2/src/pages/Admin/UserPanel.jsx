import LabelInput from '@/components/forms/LabelInput';
import SelectOptions from '@/components/forms/SelectOptions';
import ApiMessage from './ApiMessage';
import AccordionContent from './AccordionContent';
import {translateAdminPage} from '@/locales/translate'
import { useState } from 'react';


export default function UserPanel ({user, setOpenModal}) {

    const [name, setName] = useState(user.name);
    const [mail, setMail] = useState(user.mail);
    const [permissions, setPermissions] = useState(user.permissions ? user.permissions : false);
    const [fetchData, setFetchData] = useState(false);
  
    const permission = ['ADMIN'];
  
    const handleDeleteClick = () => {
      setOpenModal(true)
      setFetchData(true)
    }
    return (
      <AccordionContent
      buttonAddText={translateAdminPage('saveUser')}
      buttonDeleteText={translateAdminPage('deleteUser')}
      >
        {fetchData 
        && 
        <ApiMessage/>
        }
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
          {permission && <SelectOptions
          selectedOptions={permissions}
          setSelectedOptions={setPermissions}
          optionsArr = {permission}
          labelText ={translateAdminPage('userPermissions')} 
          translateOption = {translateAdminPage}
          className='p-2'
          />}
      </AccordionContent>   
    )
  }
