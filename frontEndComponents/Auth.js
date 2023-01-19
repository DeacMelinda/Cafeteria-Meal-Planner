import axios from "axios";
import { useContext, useState, createContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [ user, setUser ] = useState({});
    const [ isValid, setIsValid ] = useState(false);

    const login = async (user) => {
        setUser(user);
        setIsValid(true);
    }

    const updateUser = async (user) => {
        setUser(user);
        setIsValid(true);
    }

    const logout = () => {
        setUser(null);
        setIsValid(false);
    }

    return(
        <AuthContext.Provider value = {{ user, isValid, login, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    ) 
}

export const useAuth = () => {
    return useContext(AuthContext)
}