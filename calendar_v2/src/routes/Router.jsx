import useAuthentication from '@/hooks/useAuthentication';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import { lazy } from 'react';
import LoginPage from '@/pages/Login/LoginPage'
import MainPage from '@/pages/Main/MainPage'
import CreateCalendarPage from '@/pages/CreateCalendar/CreateCalendarPage'
import { AnimatePresence } from 'framer-motion';
import AdminPage from '../pages/Admin/AdminPage';



const CalendarPage = lazy(()=> import('@/pages/Calendar/CalendarPage'));
    

export default function Router() {

    const {isAdmin, user} = useAuthentication();
    const location = useLocation();
    
    return(
    <AnimatePresence>
        <Routes key={location.pathname} location={location}>
        {user? 
        <>
            <Route key='mainpage' path='/' element={<MainPage replace/>}/>
            <Route path='/kalendarz/*' element={ <CalendarPage/>}/>
            <Route path='/administrator' element={ <AdminPage/>}/>
            <Route key='login' path='/logowanie' element={<LoginPage page={1} replace/>}/>
            <Route path='*' element={<div>not found</div>} replace/>

            {isAdmin? 
            <Route path='/tworzenie_kalendarza' element={<CreateCalendarPage/>}/>
            : false}
        </>
        : 
        <>
        <Route key='login' path='/logowanie' element={<LoginPage page={1} replace/>}/>
        <Route path='*' element={<Navigate to='/logowanie' replace/>}/>
        </>

}
    </Routes>
    </AnimatePresence>
    )
}

const mainPaths = 
[
    {name: 'main', path : '/',},
    {name: 'calendar', path: '/kalendarz' }
]

const userPaths = [
    {name: 'login', path:  '/logowanie'},
    {name: 'account', path: '/konto',}
]

const adminPaths = [
    {name: 'admin', path:  '/administrator' },
    {name: 'createCalendar', path:  '/tworzenie_kalendarza'},
]

export {mainPaths, userPaths, adminPaths};
