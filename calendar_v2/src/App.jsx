// import {t} from 'i18next';
import useAuthentication from './hooks/useAuthentication';
import {Routes, Route, useLocation, Navigate} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';


import LoginPage from './pages/Login/LoginPage'

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
            <Route path='/innecos'element={<LoginPage replace/>}/>
            </>
            : 
            <>
            <Route path='/logowanie'element={<LoginPage replace/>}/>
            <Route path='*'element={<Navigate to='/logowanie' replace/>}/>
            </>

            }
        </Routes>
    </AnimatePresence>
)




  
}

export default App
