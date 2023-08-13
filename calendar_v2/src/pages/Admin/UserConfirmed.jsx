import LabelInput from '@/components/forms/LabelInput';
import Accordion from '@/components/containers/Accordion'
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import { useState } from 'react';
import {translateAdminPage} from '@/locales/translate'
import SelectOptions from '@/components/forms/SelectOptions';
import FormButton from '@/components/forms/FormButton';
import Modal from '@/components/ui/Modal';
import { updateUser } from '@/api/admin/adminApi';
import AccordionContent from './AccordionContent';

export default function UserConfirmed({users, setUsers}) {

    const [search, setSearch] = useState('');
    const [openModal, setOpenModal] = useState(false);
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
      <Modal  
      isOpen={openModal} 
      modalText={translateAdminPage('modalDeleteUser')} 
      buttonText={translateAdminPage('modalDeleteUserButton')} 
      setIsOpen={setOpenModal} 
      onlyButton={false}
      />
        <AnimatedContainer className={'w-full h-full relative'} animation={'ySwipeVariant'}>
            <LabelInput 
            labelText={translateAdminPage('findUser')} 
            value={search} 
            setValue={setSearch} 
            inputType={'text'} 
            inputContainerClassName=' mb-2 mt-2 bg-accentMedium dark:bg-dark-accentMedium p-2 rounded-md'
            />
            {filteredUsers.map(user=> {
                return (
                    <Accordion
                    key={user._id}
                    label={highlightMatch(user.name, search)}
                    labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2  cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium`}
                    contentClassName={`bg-accentLight border-accentMedium dark:bg-dark-accentLight rounded-b-sm p-1 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
                    >
                        <UserPanel user={user} setOpenModal={setOpenModal}/>
                    </Accordion>
                )
            })}
        </AnimatedContainer>
        </>
    )
}



function UserPanel ({user, setOpenModal}) {

  const [name, setName] = useState(user.name);
  const [mail, setMail] = useState(user.mail);
  const [permissions, setPermissions] = useState(user.permissions);
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
    fetchData={fetchData}
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