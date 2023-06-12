import { useContext } from "react";
import AuthContext from "../context/auth";

function useAuthentication()
{
    return useContext(AuthContext);
}

export default useAuthentication;



