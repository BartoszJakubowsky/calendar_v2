import { createContext, useState } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

    // eslint-disable-next-line react/prop-types
    function AuthProvider({children}) 
    {

      
        const [isAuthenticated, setAuthenticate] = useState(null);
        const [user, setUser] = useState(false);

        


        const toProvide = {};
        return (
            <AuthContext.Provider value={toProvide}>
                {children}
            </AuthContext.Provider>
            );
    }

    export {AuthProvider};
    export default AuthContext;


        