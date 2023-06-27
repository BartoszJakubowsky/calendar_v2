import { createContext, useMemo, useState } from 'react';
import {axiosInterceptor} from '@/api/interceptors/axiosInterceptor';
import {getExistingToken} from '@/api/authentication/tokenApi';

const AuthContext = createContext();

    // eslint-disable-next-line react/prop-types
    function AuthProvider({children}) 
    {
        
        axiosInterceptor();

        const initialUser = useMemo(()=>
        {
            const localToken = getExistingToken();
            
            if (localToken)
                return localToken.user;
            else
                return false;
        },[])
        
        const [user, setUser] = useState(initialUser);
        const isAdmin = user?.permissions?.includes('Admin');


        const handleUser = (token) => 
        {
            if (!token)
            {
                localStorage.removeItem('token');
                setUser(false);
            }
            else
            {
                localStorage.addItem('token', token);
                setUser(initialUser());
            }
        }

        const toProvide = {
            user,
            isAdmin,
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


        