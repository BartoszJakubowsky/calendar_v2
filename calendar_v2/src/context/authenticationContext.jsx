import { createContext, useState } from 'react';
import {axiosInterceptor} from '@/api/interceptors/axiosInterceptor';
import {getExistingToken} from '@/api/authentication/tokenApi';
import i18next from 'i18next';

const AuthContext = createContext();

    function AuthProvider({children}) 
    {
        
        axiosInterceptor();

        const getUserFromToken = () => {
            const localToken = getExistingToken();
            
            if (localToken)
                return localToken.user;
            else
                return false;
        }
       
        const getLanguageFromUser = (lng = false) => {

            const getLngFromLocalStorage = () => localStorage.getItem('lng');

            if (lng)
            {
                setUser({...user, lng})
                const localLng = getLanguageFromUser();

                if (localLng)
                    localStorage.removeItem('lng');

                localStorage.setItem('lng', lng)
                return setLanguage(lng);
            }

            if (user && user.lng)
                return user.lng
            else
            {
            const localLng = getLngFromLocalStorage();
            if (!localLng)
                return i18next.language
            else
                return localLng;
            }
        }

        const [user, setUser] = useState(getUserFromToken());
        const [language, setLanguage] = useState(getLanguageFromUser());
        const isAdmin = user?.permissions?.includes('ADMIN');

        
            
        const handleUser = (token) => 
        {
            if (!token)
            {
                localStorage.removeItem('token');
                setUser(false);
            }
            else
            {
                localStorage.setItem('token', token);
                setUser(getUserFromToken());
            }
        }

        const toProvide = {
            user,
            setUser,
            isAdmin,
            language, 
            getLanguageFromUser,
            handleUser
        };
        return (
            <AuthContext.Provider value={toProvide}>
                {children}
            </AuthContext.Provider>
            );
    }

    export {AuthProvider};
    export default AuthContext;


        