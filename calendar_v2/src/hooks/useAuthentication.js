import { useContext } from "react";
import AuthContext from "@/context/authenticationContext";

function useAuthentication()
{
    return useContext(AuthContext);
}

export default useAuthentication;



