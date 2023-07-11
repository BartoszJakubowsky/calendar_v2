import useAuthentication from '@/hooks/useAuthentication';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import LoginPage from '@/pages/Login/LoginPage'
import MainPage from '@/pages/Main/MainPage'
import CreateCalendarPage from '@/pages/CreateCalendar/CreateCalendarPage'
import { AnimatePresence } from 'framer-motion';

const CalendarPage = lazy(()=> import('@/pages/Calendar/CalendarPage'));
    

export default function Router() {

    const {isAdmin, user} = useAuthentication();
    const location = useLocation();


    return(
    <AnimatePresence >
        <Routes key={location.pathname} location={location}>
        {user? 
        <>
            <Route path='/' element={<MainPage replace/>}/>
            <Route path='/kalendarz/*' element={ <Suspense fallback={<div className='absolute inset-0 bg-red-300'></div>}><CalendarPage/></Suspense>}/>
            <Route path='/logowanie' element={<LoginPage page={1} replace/>}/>
            <Route path='*' element={<div>not found</div>} replace/>

            {isAdmin? 
            <Route path='/tworzenie_kalendarza' element={<CreateCalendarPage/>}/>
            : false}
        </>
        : 
        <>
        <Route path='/logowanie' element={<LoginPage page={1} replace/>}/>
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
    {name: 'calendar', path: '/kalendarz'}
]

const userPaths = [
    {name: 'login', path:  '/logowanie'},
    {name: 'account', path: '/konto',}
]

const adminPaths = [
    {name: 'admin', path:  '/administator'},
    {name: 'createCalendar', path:  '/tworzenie_kalendarza'},
]

export {mainPaths, userPaths, adminPaths};
