import Modal from '@/components/ui/Modal';
import AnimatedContainer from '@/components/containers/AnimatedContainer';
import Accordion from '@/components/containers/Accordion'
import {translateAdminPage} from '@/locales/translate'
import AccordionContent from './AccordionContent';
import {useState} from 'react'
import {  addUserFromRegister, deleteUserFromRegister } from '@/api/admin/adminApi';

export default function UserRegister({users, setUsersRegister, setUsersConfitmed, transformDate}) {
    
    const [openModal, setOpenModal] = useState(false);

  
    
    
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
            {users.length == 0?
            <h1 className='text-accentStrong dark:text-dark-accentStrong text-lg text-center'>
                {translateAdminPage('noRegisterUsers')}
            </h1>
            :
            users.map(user=> {
                return (
                    <Accordion
                    key={user._id}
                    label={user.name}
                    labelClassName={`bg-accentLight dark:bg-dark-accentLight rounded-sm p-2  cursor-pointer w-full border-b-2 border-accentMedium dark:border-dark-accentMedium`}
                    contentClassName={`bg-accentLight border-accentMedium dark:bg-dark-accentLight rounded-b-sm p-1 border-b-2  border-accentMedium dark:border-dark-accentMedium w-full  `}
                    >
                       <UserPanel user={user} transformDate={transformDate}/>
                    </Accordion>
                )
            })}
        </AnimatedContainer>
        </>
    )
}

function UserPanel ({user, transformDate}) {
  const [fetchData, setFetchData] = useState(false);
  const [result, setResult] = useState(null);

  const handleResponse = (res) => {
    setTimeout(() => {
        setFetchData(false)
        setResult(null)
    }, 5000);
    setResult(res)
  }
  
  const handleAddClick = () => {
    setFetchData(true)
    handleResponse(true)
    // addUserFromRegister(user).then(res => handleResponse(res.data))
  }
  const handleDeleteClick = () => {
    setFetchData(true)
    handleResponse(true)
    // deleteUserFromRegister(user).then(res => handleResponse(res.data))
  }

  return (
    <AccordionContent
    buttonAddText={translateAdminPage('saveUserRegister')}
    buttonDeleteText={translateAdminPage('deleteUserRegister')}
    buttonAddOnClick={handleAddClick}
    buttonDeleteOnClick={handleDeleteClick}
    fetchData={fetchData}
    result={result}
    >
        <div className='p-2'>
            <h3 className='text-accentStrong dark:text-dark-accentStrong'>{translateAdminPage('userLogin')}</h3>
               <p className='w-full mb-1'>{user.mail}</p>
            <h3 className='text-accentStrong dark:text-dark-accentStrong'>{translateAdminPage('createdAt')}</h3>
                <p className='w-full '>{transformDate(user.updatedAt)}</p>
        </div>
    </AccordionContent>
  )
}
