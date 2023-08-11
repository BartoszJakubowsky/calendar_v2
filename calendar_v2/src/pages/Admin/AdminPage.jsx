import AnimatedContainer from '@/components/containers/AnimatedContainer';
import TableNav from './TableNav';
import MenuPage from '@/pages/menu/MenuPage'
import LoadingMessage from '@/components/ui/LoadingMessage';
import { useEffect, useState } from 'react';
import {getAllData} from '@/api/admin/adminApi'
import UserConfirmed from './UserConfirmed';
import { AnimatePresence } from 'framer-motion';
export default function AdminPage() {


const [currentPage, setCurrentPage] = useState(0);
const [usersConfirmed, setUsersConfirmed] = useState(false);
const [usersPassword, setUsersPassword] = useState(false);
const [usersRegister, setUsersRegister] = useState(false);
const [fetchStatus, setFetchStatus] = useState(true);

useEffect(()=>{
    getAllData().then(res => setTimeout(() => {
        const {userConfirmed, userRegister, userPassword} = res;    
        setUsersConfirmed(userConfirmed);
        setUsersPassword(userPassword);
        setUsersRegister(userRegister);
        setFetchStatus(false);
    }, 1000))
},[])


const links = [
    'Użytkownicy',
    "Rejestracja",
    'Hasło',
    'Kalendarze'
    ];
 return (
    <AnimatedContainer key='calendarPageContainer' className={'background flex justify-start items-center flex-col'} animation={'opacityVariant'}>
       <MenuPage/>
        <TableNav currentPage={currentPage} setCurrentPage={setCurrentPage} links={links}/>
        <section className='flex md:w-2/3 w-11/12 justify-center h-full overflow-hidden'>
        <AnimatePresence mode='wait'>
        {fetchStatus
        ? <LoadingMessage message={'Czekaj, pobieramy dla ciebie najświeższe dane'} theme={'text-accentStrong dark:text-dark-accentStrong'}/>
        : <UserConfirmed users={usersConfirmed} setUsersConfirmed={setUsersConfirmed}/>
        }
        </AnimatePresence>
        </section>
    </AnimatedContainer>
 )   
}
