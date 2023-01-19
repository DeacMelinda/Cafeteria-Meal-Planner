import { useAuth } from "./Auth"
import { Redirect } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const auth = useAuth();

    if(!auth.isValid) {
        return <Redirect to='/login' />
    }

    return children
}
