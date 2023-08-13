import AnimatedContainer from '@/components/containers/AnimatedContainer';
import TableNav from './TableNav';
import MenuPage from '@/pages/menu/MenuPage'
import LoadingMessage from '@/components/ui/LoadingMessage';
import { useEffect, useState } from 'react';
import {getAllData} from '@/api/admin/adminApi'
import UserConfirmed from './UserConfirmed';
import { AnimatePresence } from 'framer-motion';
import UserRegister from './UserRegister';
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

const transformDate = (date) => {

    const formatNumber = (number) => {
        return number < 10 ? '0' + number : number;
    }

    const originalDate = new Date(date);
    const newDate = new Date(originalDate);
    newDate.setHours(newDate.getHours() + 2);

    const formattedDate = `${formatNumber(newDate.getUTCDate())}.${formatNumber(newDate.getUTCMonth() + 1)}.${newDate.getUTCFullYear()}, ${formatNumber(newDate.getUTCHours())}:${formatNumber(newDate.getUTCMinutes())}`;
    return (formattedDate);
}
 return (
    <AnimatedContainer key='calendarPageContainer' className={'background md:pt-0 pt-10 overflow-hidden'} animation={'opacityVariant'}>
       <MenuPage/>
    <TableNav currentPage={currentPage} setCurrentPage={setCurrentPage} links={links}/>
        <section className='flex md:w-2/3 w-11/12 justify-center h-full mx-auto overflow-y-auto no-scrollbar'>
        <AnimatePresence mode='wait'>
        {fetchStatus
        ? <LoadingMessage message={'Czekaj, pobieramy dla ciebie najświeższe dane'} theme={'text-accentStrong dark:text-dark-accentStrong'}/>
        : 
        currentPage === 0 && <UserConfirmed users={usersConfirmed} setUsersConfirmed={setUsersConfirmed}/> ||
        currentPage === 1 && <UserRegister users={usersRegister} setUsersRegister={setUsersRegister} setUsersConfirmed={setUsersConfirmed} transformDate={transformDate}/>  ||
        currentPage === 2 && <UserPassword users={usersPassword} setUsersPassword={setUsersPassword} transformDate={transformDate}/>
        }
        </AnimatePresence>
        </section>
    </AnimatedContainer>
 )   
}
