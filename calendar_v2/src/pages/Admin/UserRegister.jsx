import AnimatedContainer from '@/components/containers/AnimatedContainer';
import Accordion from '@/components/containers/Accordion'
import {translateAdminPage} from '@/locales/translate'
import AccordionContent from './AccordionContent';
import {useState} from 'react'
import {  addUserFromRegister, deleteUserFromRegister } from '@/api/admin/adminApi';

export default function UserRegister({users,transformDate, deleteUserRegister, addUserConfirmed}) {
    
    return (
        <>
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
                       <UserPanel 
                        user={user} 
                        transformDate={transformDate} 
                        deleteUserRegister={deleteUserRegister}
                        addUserConfirmed={addUserConfirmed}
                       />
                    </Accordion>
                )
            })}
        </AnimatedContainer>
        </>
  )
}

function UserPanel ({user, transformDate, addUserConfirmed, deleteUserRegister }) {
  const [fetchData, setFetchData] = useState(false);
  const [result, setResult] = useState(null);
  const [textOnTrue, setTextOnTrue] = useState('registerAddTrue')
  const [textOnFalse, setTextOnFalse] = useState('registerAddFalse');

  const handleResponse = (res, action) => {


     setTimeout(() => {
        setResult(res)
    }, 500);

    setTimeout(() => {
      setFetchData(false)
      setResult(null)

      if (action === 'add' && res)
      {
        addUserConfirmed(res);
        deleteUserRegister(user);
      }
      else if (action === 'delete' && res)
      {
        deleteUserRegister(user)
      }
    }, 1500);
  }
  

  const handleAddClick = () => {
    setTextOnTrue('registerAddTrue')
    setTextOnFalse('registerAddFalse')

    setFetchData(true)
    handleResponse(true)
    addUserFromRegister(user).then(res => handleResponse(res.data, 'add'))
  }
  const handleDeleteClick = () => {

    setTextOnTrue('registerDeleteTrue')
    setTextOnFalse('registerDeleteFalse')

    setFetchData(true)
    handleResponse(true)
    deleteUserFromRegister(user).then(res => handleResponse(res.data, 'delete'))
  }

  return (
    <AccordionContent
    buttonAddText={translateAdminPage('saveUserRegister')}
    buttonDeleteText={translateAdminPage('deleteUserRegister')}
    buttonAddOnClick={handleAddClick}
    buttonDeleteOnClick={handleDeleteClick}
    fetchData={fetchData}
    result={result}
    textOnTrue={translateAdminPage(textOnTrue)}
    textOnFalse={translateAdminPage(textOnFalse)}
    loadingMessage={translateAdminPage('loading')}
    >
        <div className='p-2'>
            <h3 className='text-accentStrong dark:text-baseColor font-semibold'>{translateAdminPage('userLogin')}</h3>
               <p className='w-full mb-1 ml-1'>{user.mail}</p>
            <h3 className='text-accentStrong dark:text-baseColor font-semibold'>{translateAdminPage('createdAt')}</h3>
                <p className='w-full ml-1 '>{transformDate(user.updatedAt)}</p>
        </div>
    </AccordionContent>
  )
}
