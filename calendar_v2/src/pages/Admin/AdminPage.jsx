import AnimatedContainer from '@/components/containers/AnimatedContainer';
import TableNav from './TableNav';
import MenuPage from '@/pages/menu/MenuPage'
import LoadingMessage from '@/components/ui/LoadingMessage';
import { useEffect, useState } from 'react';
import {getAllData} from '@/api/admin/adminApi'
import UserConfirmed from './UserConfirmed';
import { AnimatePresence } from 'framer-motion';
import UserRegister from './UserRegister';
import UserPassword from './UserPassword';
import CalendarPanel from './CalendarPanel';
import {translateAdminPage} from '@/locales/translate'

export default function AdminPage() {


const [currentPage, setCurrentPage] = useState(0);
const [usersConfirmed, setUsersConfirmed] = useState(null);
const [usersPassword, setUsersPassword] = useState(null);
const [usersRegister, setUsersRegister] = useState(null);
const [calendars, setCalendars] = useState(null);
const [fetchStatus, setFetchStatus] = useState(true);

useEffect(()=>{
    getAllData().then(res => setTimeout(() => {
        const {userConfirmed, userRegister, userPassword, calendars} = res;    
        setUsersConfirmed(userConfirmed);
        setUsersPassword(userPassword);
        setUsersRegister(userRegister);
        setCalendars(calendars)
        setFetchStatus(false);
    }, 1000))
},[])
const links = [
    translateAdminPage("userLink"),
    translateAdminPage("registerLink"),
    translateAdminPage("passwordLink"),
    translateAdminPage("calendarLink")
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

const addUserConfirmed = (user) => setUsersConfirmed([...usersConfirmed, user]);
const updateUserConfirmed = (userToUpdate) => setUsersConfirmed(usersConfirmed.map(user => {
    if (user._id === userToUpdate._id)
        return {...userToUpdate}
    else
        return user
}))
const deleteUserConfirmed = (deleteUser) => setUsersConfirmed(usersConfirmed.filter(user => user._id !== deleteUser._id));
const deleteUserRegister = (deleteUser) => setUsersRegister(usersRegister.filter(user => user._id !== deleteUser._id));
const deleteUserPassword = (deleteUser) => setUsersPassword(usersPassword.filter(user => user._id !== deleteUser._id));
const deleteCalendarFromCalendars = (deleteCalendar) => setCalendars(calendars.filter(calendar => calendar._id !== deleteCalendar._id));
 return (
    <AnimatedContainer key='calendarPageContainer' className={'background md:pt-0 pt-10 overflow-hidden'} animation={'opacityVariant'}>
       <MenuPage/>
    <TableNav usersRegister={usersRegister} usersPassword={usersPassword} currentPage={currentPage} setCurrentPage={setCurrentPage} links={links}/>
        <section className='flex md:w-2/3 w-11/12 justify-center h-full mx-auto overflow-y-auto no-scrollbar'>
        <AnimatePresence mode='wait'>
        {fetchStatus
        ? <LoadingMessage message={translateAdminPage('loadingData')} theme={'text-accentStrong dark:text-dark-accentStrong text-center '}/>
        : 
        currentPage === 0 && <UserConfirmed users={usersConfirmed} updateUserConfirmed={updateUserConfirmed} deleteUserConfirmed={deleteUserConfirmed}/> ||
        currentPage === 1 && <UserRegister users={usersRegister} transformDate={transformDate} deleteUserRegister={deleteUserRegister} addUserConfirmed={addUserConfirmed} />   ||
        currentPage === 2 && <UserPassword users={usersPassword} deleteUserPassword={deleteUserPassword} transformDate={transformDate} updateUserConfirmed={updateUserConfirmed}/> ||
        currentPage === 3 && <CalendarPanel calendars={calendars} deleteCalendarFromCalendars={deleteCalendarFromCalendars} transformDate={transformDate} updateUserConfirmed={updateUserConfirmed}/>
        }
        </AnimatePresence>
        </section>
    </AnimatedContainer>
 )   
}
