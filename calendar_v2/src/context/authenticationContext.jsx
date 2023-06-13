import { createContext, useState } from 'react';
import {axiosInterceptor} from '../api/interceptors/axiosInterceptor';
import { getExistingToken} from '../api/authentication/tokenApi';

const AuthContext = createContext();

    // eslint-disable-next-line react/prop-types
    function AuthProvider({children}) 
    {
        
        axiosInterceptor();

        const [user, setUser] = useState(false);
        const localToken = getExistingToken();

        if (localToken)
            setUser(localToken.user);
        
        const isAdmin = user?.permissions?.includes('Admin');

        const toProvide = {
            user,
            isAdmin
        };

        return (
            <AuthContext.Provider value={toProvide}>
                {children}
            </AuthContext.Provider>
            );
    }

    export {AuthProvider};
    export default AuthContext;


        