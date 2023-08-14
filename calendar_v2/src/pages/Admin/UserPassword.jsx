import AnimatedContainer from '@/components/containers/AnimatedContainer';
import Accordion from '@/components/containers/Accordion'
import {translateAdminPage} from '@/locales/translate'
import AccordionContent from './AccordionContent';
import {useState} from 'react'
import {  updateUserFromPassword, deleteUserFromPassword } from '@/api/admin/adminApi';

export default function UserPassword({users, transformDate, deleteUserPassword, updateUserConfirmed}) {
    
    return (
        <>
        <AnimatedContainer className={'w-full h-full relative'} animation={'ySwipeVariant'}>
            {users.length == 0?
            <h1 className='text-accentStrong dark:text-dark-accentStrong text-lg text-center'>
                {translateAdminPage('noPasswordUsers')}
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
                        deleteUserPassword={deleteUserPassword}
                        updateUserConfirmed={updateUserConfirmed}
                       />
                    </Accordion>
                )
            })}
        </AnimatedContainer>
        </>
  )
}

function UserPanel ({user, transformDate, deleteUserPassword, updateUserConfirmed }) {
  const [fetchData, setFetchData] = useState(false);
  const [result, setResult] = useState(null);
  const [textOnTrue, setTextOnTrue] = useState('registerAddTrue')
  const [textOnFalse, setTextOnFalse] = useState('registerAddFalse');

  const handleResponse = (res) => {


     setTimeout(() => {
        setResult(res)
    }, 500);

    setTimeout(() => {
      setFetchData(false)
      setResult(null)

        if (res)
        {
            updateUserConfirmed(res)
            deleteUserPassword(user)
        }
    }, 1500);
  }
  

  const handleAddClick = () => {
    setTextOnTrue('passwordAddTrue')
    setTextOnFalse('passwordAddFalse')

    setFetchData(true)
    handleResponse(true)
    updateUserFromPassword(user).then(res => handleResponse(res.data))
  }
  const handleDeleteClick = () => {

    setTextOnTrue('passwordDeleteTrue')
    setTextOnFalse('passwordDeleteFalse')

    setFetchData(true)
    handleResponse(true)
    deleteUserFromPassword(user).then(res => handleResponse(res.data))
  }

  return (
    <AccordionContent
    buttonAddText={translateAdminPage('saveUserPassword')}
    buttonDeleteText={translateAdminPage('deleteUserPassword')}
    buttonAddOnClick={handleAddClick}
    buttonDeleteOnClick={handleDeleteClick}
    fetchData={fetchData}
    result={result}
    textOnTrue={translateAdminPage(textOnTrue)}
    textOnFalse={translateAdminPage(textOnFalse)}
    loadingMessage={translateAdminPage('loading')}
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
