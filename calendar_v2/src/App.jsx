// import {t} from 'i18next';
import useAuthentication from '@/hooks/useAuthentication';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';
import LoginPage from './pages/Login/LoginPage'
import MainPage from './pages/Main/MainPage'
const CalendarPage = lazy(()=> import('@/pages/Calendar/CalendarPage'));


function App() {

    // <div>start {t('start')}</div>

    const {isAdmin, user} = useAuthentication();
    const location = useLocation();
    

return(
    <AnimatePresence mode='wait'>
        <Routes key={location.pathname} location={location}>
            {user? 
            <>
            {/* <Route path='/' element={<MainPage/>}/>     */}
           
                <Route path='/'element={<MainPage replace/>}/>
                <Route path='/kalendarz'element={ <Suspense fallback={<div className='absolute inset-0 bg-red-300'></div>}><CalendarPage/></Suspense>}/>

                <Route path='/logowanie'element={<LoginPage page={1} replace/>}/>
            </>
            : 
            <>
            <Route path='/logowanie'element={<LoginPage page={1} replace/>}/>
            <Route path='*'element={<Navigate to='/logowanie' replace/>}/>
            </>

            }
        </Routes>
    </AnimatePresence>
)




  
}

export default App
